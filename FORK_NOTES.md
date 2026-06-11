# Fork Notes — `feature/glow-and-sounds`

Based on `@3d-dice/dice-box` v1.1.4  
Branch: `feature/glow-and-sounds`

---

## Codebase map

| Concern | File |
|---|---|
| Public entry point | `src/index.js` → re-exports `WorldFacade` |
| Main-thread orchestration | `src/WorldFacade.js` |
| Babylon.js render world | `src/components/world.onscreen.js` (used directly for onscreen path; wrapped by `offscreenCanvas.worker.js` for the OffscreenCanvas path) |
| Die mesh / value resolution | `src/components/Dice.js` |
| Physics simulation | `src/components/physics.worker.js` (Ammo.js in a dedicated Web Worker) |

### Value-resolution point
`Dice.getRollResult()` in `src/components/Dice.js` (static method).  
Called by `WorldOnscreen.handleAsleep()` when the physics worker flags a body as settled.  
The method casts an upward ray from the die centre, picks the hit face on the low-poly collider hitbox, and maps `faceId → value` via `colliderFaceMap` from the mesh JSON.  
At this point you have: the settled die mesh, its world transform, and the winning face's hit position (`picked.pickedPoint`). This is the anchor for Feature 1.

### Physics-step point
`update()` in `src/components/physics.worker.js`.  
Called once per animation frame inside `loop()`.  
Calls `physicsWorld.stepSimulation(...)`, then reads Ammo manifolds for contacts.  
This is the anchor for Feature 2.

### Worker ↔ main message contract
- **physics worker → WorldFacade**: `self.postMessage({action, ...})` — handled by `WorldFacade.#DicePhysics.onmessage`.
- **physics worker → world worker**: `worldWorkerPort.postMessage({action, ...})` — handled by `WorldOnscreen.connect()`.
- **world worker → WorldFacade**: `self.postMessage({action, ...})` via `world.offscreen.js` wrapper — handled by `WorldFacade.#DiceWorld.*` callbacks.

---

## Feature 1 — Winning-face glow (`highlightResult`)

### Config key
```js
highlightResult: true
// or with tuning:
highlightResult: { color: '#ffeecc', intensity: 0.9, durationMs: 3500 }
```
Defaults: `color '#ffeecc'`, `intensity 0.9`, `durationMs 3500`.

### Implementation
**`src/components/Dice.js`**
- New private static method `Dice.#spawnFaceGlow(d, picked, d4FaceDown, scene, hlOption)`.
- Placed at the value-resolution point: called from `getDieRoll` right after `d.value` is assigned, guarded by `if (config?.highlightResult)`.
- `getRollResult` gains an optional third parameter `config` (no breaking change — callers that omit it get the same behaviour as before).
- A `Babylon.MeshBuilder.CreatePlane` billboard is spawned at `picked.pickedPoint` (exact face centroid from the ray pick), or a die-centre + half-scale offset as fallback.
- `billboardMode = 7` (BILLBOARDMODE_ALL) — plane always faces the camera.
- `StandardMaterial` with `alphaMode = 6` (Engine.ALPHA_ADD) for additive in-scene blending — correctly occluded/composited by Babylon's render pipeline.
- Fade registered via `scene.registerBeforeRender`; quadratic ease-out over `durationMs`; mesh + material disposed on completion.

**`src/components/world.onscreen.js`**
- `handleAsleep` now calls `Dice.getRollResult(die, this.#scene, this.config)` — threads the config through.

---

## Feature 2 — Collision events (`emitCollisionEvents`)

### Config keys
```js
emitCollisionEvents: true,
onCollision: (event) => { /* event.strength, event.position, event.bodies */ }
```

### Event shape
```js
{
  type: 'collision',
  strength: Number,      // 0..1, normalised from contact impulse (cap ~20 for default config)
  position: [x, y, z],  // world-space contact point
  bodies: [
    'die' | 'floor' | 'wall',  // body 0
    'die' | 'floor' | 'wall'   // body 1
  ]
}
```

### Implementation
**`src/components/physics.worker.js`**
- `emitCollisionEvents: false` added to `defaultOptions` (config propagated from WorldFacade on `init` / `updateConfig`).
- `let activeContacts = new Set()` at module scope tracks contacts from the previous tick for deduplication.
- Inside `update()`, the entire manifold-read block is guarded: `if (config.emitCollisionEvents) { ... }` — **zero cost when the flag is off**.
- Per tick: max **4 events** emitted; contacts with `maxImpulse < 0.3` are filtered; resting contacts (same pair key active last tick) are skipped.
- Strength: `Math.min(1, maxImpulse / 20)` — `getAppliedImpulse()` on the highest-impulse contact point.
- Body categories: `id.startsWith('box_') → 'floor'/'wall'`; numeric id → `'die'`.
- `clearDice()` now also resets `activeContacts`.

**`src/WorldFacade.js`**
- `collision` case in `#DicePhysics.onmessage` now forwards the structured event object to `this.onCollision(event)`.
- `onCollision` is already extracted from constructor options (from the merged upstream PR).

---

## Dev / build scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Vite dev server with live reload |
| `npm run build` | Production build → `dist/` |
| `npm run serve` | Preview the production build |

---

## Consuming app integration

```jsonc
// package.json — point to the fork
"@3d-dice/dice-box": "github:<your-account>/dice-box#feature/glow-and-sounds"
```

```js
// DiceBox config
new DiceBox({
  /* ...existing config... */
  highlightResult: true,           // Feature 1: face glow (bare true uses defaults)
  emitCollisionEvents: true,       // Feature 2: physics collision events
  onCollision: (e) => playClack(e.strength),  // wire to existing audio
})
```

The `postinstall` asset copy in the consuming app is unaffected — `dist/` layout is identical to upstream 1.1.4.
