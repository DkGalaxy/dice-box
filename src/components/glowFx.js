/**
 * glowFx.js — derived bevel + glyph-shaped result flare for dice-box (Babylon.js)
 *
 *  1. BEVEL — at load time we read the theme's existing diffuse texture,
 *     isolate the number glyphs (alpha channel if the theme uses transparent
 *     number overlays, otherwise minority-luminance), blur that mask into a
 *     height field, Sobel it into a tangent-space normal map, and assign it
 *     as material.bumpTexture. The numbers read as engraved with beveled
 *     walls under the scene lights.
 *
 *  2. FLARE — when a die settles as a winner, we spawn a cheap overlay
 *     clone of the die at the winner's transform with an emissive-only,
 *     additive material whose emissiveTexture is the glyph mask tinted to
 *     the flare color. Only that overlay is added to the GlowLayer
 *     (addIncludedOnlyMesh), so the bloom is winner-only and shaped exactly
 *     like the numbers. The envelope is a fast attack then ease-out, and the
 *     overlay disposes itself when done.
 */

import { RawTexture } from '@babylonjs/core/Materials/Textures/rawTexture'
import { Texture } from '@babylonjs/core/Materials/Textures/texture'
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial'
import { Color3 } from '@babylonjs/core/Maths/math.color'
import { Constants } from '@babylonjs/core/Engines/constants'
import { GlowLayer } from '@babylonjs/core/Layers/glowLayer'
import '@babylonjs/core/Layers/effectLayerSceneComponent'

// ─────────────────────────────────────────────────────────────────────────────
// Tunables. Edit here, or mutate at runtime via globalThis.__diceGlowFx
// ─────────────────────────────────────────────────────────────────────────────
export const glowFxDefaults = {
  // bevel
  bumpLevel: 1.3,        // engraving depth illusion; 0.6 subtle → 2.0 deep
  bevelStrength: 2.2,    // slope steepness of the carved walls
  blurDivisor: 256,      // blur radius = textureWidth / blurDivisor (min 2)
  engrave: true,         // true = numbers recessed, false = embossed
  invertNormalMapX: false,
  invertNormalMapY: false,
  // flare
  attackMs: 140,         // ramp-up before the ease-out
  glowMaxLevel: 4,       // emissive level at flare peak (scaled by intensity)
  glowBlurKernel: 48,    // GlowLayer halo size
  overlayScale: 1.015,   // overlay sits a hair above the die surface
}
try { globalThis.__diceGlowFx = glowFxDefaults } catch (e) { /* noop */ }

// material.uniqueId -> { pending, maskData:{mask,w,h}, tinted:Map<hex,Texture> }
const fxCache = new Map()
// scene.uid -> GlowLayer
let _glowLayer = null

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Derive the bevel normal map + glyph mask from the material's diffuse
 * texture and apply the bump map. Idempotent and cached per material —
 * safe to call from Dice.loadDie on every die load.
 */
export async function applyDerivedBevel(material, scene, opts = {}) {
  if (!material) return null

  // MultiMaterial: process each sub-material independently
  if (material.subMaterials && Array.isArray(material.subMaterials)) {
    for (const sub of material.subMaterials) {
      if (sub) await applyDerivedBevel(sub, scene, opts)
    }
    return null
  }

  if (fxCache.has(material.uniqueId)) return fxCache.get(material.uniqueId)
  const entry = { pending: true, maskData: null, tinted: new Map() }
  fxCache.set(material.uniqueId, entry)

  const o = { ...glowFxDefaults, ...opts }
  const srcTex = material.diffuseTexture || material.albedoTexture
  if (!srcTex) { entry.pending = false; return entry }

  try {
    const { rgba, width: w, height: h } = await readTextureRGBA(srcTex)
    if (!rgba || !w || !h) { entry.pending = false; return entry }

    // 1. glyph mask (sharp, light AA) — reused later as the emissive shape
    const mask = buildGlyphMask(rgba, w, h)
    entry.maskData = { mask, w, h }

    // 2. height field: blur the mask so the Sobel produces sloped bevel walls
    const radius = Math.max(2, Math.round(w / o.blurDivisor))
    const height = boxBlur(mask, w, h, radius)
    boxBlurInPlace(height, w, h, Math.max(1, radius >> 1)) // second softer pass

    // 3. normal map
    const normals = buildNormalMap(height, w, h, o.bevelStrength, o.engrave)
    const bump = new RawTexture(
      normals, w, h,
      Constants.TEXTUREFORMAT_RGBA, scene,
      true,            // generateMipMaps
      false,           // invertY: pixel rows are already in GPU (bottom-up) order
      Texture.TRILINEAR_SAMPLINGMODE
    )
    bump.name = `${material.name || 'theme'}_derivedBump`
    bump.coordinatesIndex = srcTex.coordinatesIndex
    bump.wrapU = srcTex.wrapU
    bump.wrapV = srcTex.wrapV

    material.bumpTexture = bump
    material.bumpTexture.level = o.bumpLevel
    material.invertNormalMapX = !!o.invertNormalMapX
    material.invertNormalMapY = !!o.invertNormalMapY
  } catch (err) {
    console.warn('[glowFx] bevel derivation failed for', material.name, err)
  }
  entry.pending = false
  return entry
}

/**
 * Flare the winning die: glyph-shaped, winner-only bloom with
 * attack → ease-out envelope. Reads color/intensity/durationMs from the
 * highlightResult config object. Sets die.glowCleanup (chained with any
 * existing cleanup) so DiceBox.clear() can cancel it early.
 */
export function flareWinner(die, scene, hlOption) {
  const cfg = (typeof hlOption === 'object' && hlOption !== null) ? hlOption : {}
  const colorHex = cfg.color ?? '#ffeecc'
  const intensity = cfg.intensity ?? 0.9
  const durationMs = cfg.durationMs ?? 3500
  const o = glowFxDefaults

  const mesh = die.mesh
  if (!mesh || mesh.isDisposed?.()) return
  const source = mesh.sourceMesh || mesh
  const baseMaterial = source.material
  const fx = baseMaterial ? resolveFxEntry(baseMaterial) : null

  // — overlay clone (real mesh — immune to the instancing/GlowLayer issue) —
  let overlay
  try {
    overlay = source.clone(`_flare_${die.id}`, null, true)
  } catch (e) {
    console.warn('[glowFx] could not clone die mesh for flare', e)
    return
  }
  overlay.setEnabled(true)
  overlay.isPickable = false
  overlay.doNotSyncBoundingInfo = false
  if (overlay.unfreezeWorldMatrix) overlay.unfreezeWorldMatrix()
  overlay.alwaysSelectAsActiveMesh = true
  overlay.position = mesh.position.clone()
  overlay.rotationQuaternion = mesh.rotationQuaternion
    ? mesh.rotationQuaternion.clone()
    : null
  if (!overlay.rotationQuaternion) overlay.rotation = mesh.rotation.clone()
  overlay.scaling = mesh.scaling.scale(o.overlayScale)

  const mat = new StandardMaterial(`_flareMat_${die.id}`, scene)
  mat.disableLighting = true
  mat.diffuseColor = Color3.Black()
  mat.specularColor = Color3.Black()
  mat.emissiveColor = Color3.Black()
  mat.backFaceCulling = true
  mat.disableDepthWrite = true
  mat.alphaMode = Constants.ALPHA_ADD

  // Whole-die flat glow: the overlay adds a warm additive bloom to the winning
  // die as a unit. Glyph-texture was removed because the UV atlas contains all
  // face numbers — applying it lit up every number on every visible face, not
  // just the rolled result. A whole-die halo is the correct "winner" indicator.
  const flatTint = Color3.FromHexString(colorHex)
  mat.alpha = 0.99 // force alpha blending path
  overlay.material = mat

  const glow = getGlowLayer(scene, o)
  glow.addIncludedOnlyMesh(overlay)

  // — envelope: linear attack, cubic ease-out —
  const engine = scene.getEngine()
  const start = (typeof performance !== 'undefined' ? performance.now() : Date.now())
  const now = () => (typeof performance !== 'undefined' ? performance.now() : Date.now())
  const attack = Math.min(o.attackMs, durationMs * 0.2)
  const maxLevel = o.glowMaxLevel * intensity
  let disposed = false
  let rafId = 0

  const cleanup = () => {
    if (disposed) return
    disposed = true
    scene.unregisterBeforeRender(tick)
    if (rafId && typeof cancelAnimationFrame !== 'undefined') cancelAnimationFrame(rafId)
    try { glow.removeIncludedOnlyMesh(overlay) } catch (e) { /* noop */ }
    overlay.dispose()
    mat.dispose()
    if (die.glowCleanup === chained) die.glowCleanup = prevCleanup || null
  }

  const tick = () => {
    if (disposed) return
    if (!die.mesh || die.mesh.isDisposed?.()) { cleanup(); return }
    // follow the die in case physics nudges it post-settle
    overlay.position.copyFrom(die.mesh.position)
    if (overlay.rotationQuaternion && die.mesh.rotationQuaternion) {
      overlay.rotationQuaternion.copyFrom(die.mesh.rotationQuaternion)
    }
    const e = now() - start
    let env
    if (e < attack) {
      env = e / attack
    } else {
      const t = Math.min(1, (e - attack) / Math.max(1, durationMs - attack))
      env = (1 - t) * (1 - t) * (1 - t) // cubic ease-out
    }
    mat.emissiveColor = flatTint.scale(maxLevel * env)
    if (e >= durationMs) cleanup()
  }
  scene.registerBeforeRender(tick)

  // safety net: if the host stopped its render loop after the dice settled,
  // keep frames coming for the duration of the flare
  if (typeof requestAnimationFrame !== 'undefined') {
    const pump = () => {
      if (disposed) return
      const loops = engine.activeRenderLoops
      if (!loops || loops.length === 0) scene.render()
      rafId = requestAnimationFrame(pump)
    }
    rafId = requestAnimationFrame(pump)
  }

  // chain cleanup so DiceBox.clear() cancels both light + glow modes
  const prevCleanup = die.glowCleanup
  const chained = () => { try { prevCleanup?.() } catch (e) { /* noop */ } cleanup() }
  die.glowCleanup = chained
}

// ─────────────────────────────────────────────────────────────────────────────
// Internals
// ─────────────────────────────────────────────────────────────────────────────

function getGlowLayer(scene, o) {
  if (_glowLayer && _glowLayer._scene === scene && !_glowLayer.isDisposed) return _glowLayer
  _glowLayer = new GlowLayer('_diceFlareGlow', scene, {
    blurKernelSize: o.glowBlurKernel,
  })
  _glowLayer.intensity = 1
  return _glowLayer
}

// the die's material may be a clone of the one we derived from — fall back to
// any cache entry that already has mask data if uniqueId lookup misses
function resolveFxEntry(material) {
  const direct = fxCache.get(material.uniqueId)
  if (direct && direct.maskData) return direct
  for (const entry of fxCache.values()) {
    if (entry.maskData) return entry
  }
  return direct || null
}

function getTintedMaskTexture(fx, colorHex, scene) {
  let tex = fx.tinted.get(colorHex)
  if (tex && !tex.isDisposed?.()) return tex
  const { mask, w, h } = fx.maskData
  const c = Color3.FromHexString(colorHex)
  const data = new Uint8Array(w * h * 4)
  for (let i = 0; i < mask.length; i++) {
    const m = mask[i]
    data[i * 4] = (c.r * m * 255) | 0
    data[i * 4 + 1] = (c.g * m * 255) | 0
    data[i * 4 + 2] = (c.b * m * 255) | 0
    data[i * 4 + 3] = (m * 255) | 0
  }
  tex = new RawTexture(
    data, w, h,
    Constants.TEXTUREFORMAT_RGBA, scene,
    true, false, Texture.TRILINEAR_SAMPLINGMODE
  )
  tex.name = `_flareMask_${colorHex}`
  tex.hasAlpha = true
  fx.tinted.set(colorHex, tex)
  return tex
}

/** Read texture pixels in canonical bottom-up (GPU) row order. */
async function readTextureRGBA(tex) {
  await new Promise((resolve) => {
    if (tex.isReady()) resolve()
    else tex.onLoadObservable.addOnce(() => resolve())
  })
  const size = tex.getSize()
  const width = size.width
  const height = size.height

  // primary: GPU readback
  try {
    const buf = await tex.readPixels()
    if (buf && buf.byteLength >= width * height * 4) {
      const rgba = new Uint8Array(buf.buffer, buf.byteOffset, width * height * 4)
      return { rgba, width, height }
    }
  } catch (e) { /* fall through to URL decode */ }

  // fallback: decode the source url (compressed/non-readable textures)
  try {
    if (tex.url) {
      const resp = await fetch(tex.url)
      const blob = await resp.blob()
      const bmp = await createImageBitmap(blob)
      const cnv = (typeof OffscreenCanvas !== 'undefined')
        ? new OffscreenCanvas(bmp.width, bmp.height)
        : Object.assign(document.createElement('canvas'), { width: bmp.width, height: bmp.height })
      const ctx = cnv.getContext('2d')
      ctx.drawImage(bmp, 0, 0)
      const img = ctx.getImageData(0, 0, bmp.width, bmp.height)
      // flip top-down canvas rows to bottom-up canonical order
      const flipped = new Uint8Array(img.data.length)
      const rowBytes = bmp.width * 4
      for (let y = 0; y < bmp.height; y++) {
        flipped.set(
          img.data.subarray(y * rowBytes, (y + 1) * rowBytes),
          (bmp.height - 1 - y) * rowBytes
        )
      }
      return { rgba: flipped, width: bmp.width, height: bmp.height }
    }
  } catch (e) {
    console.warn('[glowFx] texture pixel read failed', e)
  }
  return { rgba: null, width: 0, height: 0 }
}

/**
 * Isolate the number glyphs as a 0..1 mask.
 * - If the texture has a meaningful alpha range (transparent number overlays
 *   used by diffuse-color themes) — alpha IS the mask.
 * - Otherwise — normalized luminance; the glyphs are assumed to be the
 *   minority-coverage side (white-on-black or black-on-white both work).
 */
function buildGlyphMask(rgba, w, h) {
  const n = w * h
  const mask = new Float32Array(n)

  let aMin = 255, aMax = 0
  for (let i = 0; i < n; i++) {
    const a = rgba[i * 4 + 3]
    if (a < aMin) aMin = a
    if (a > aMax) aMax = a
  }
  if (aMax - aMin > 64) {
    const span = aMax - aMin
    for (let i = 0; i < n; i++) mask[i] = (rgba[i * 4 + 3] - aMin) / span
    return mask
  }

  let lMin = 1, lMax = 0
  const lum = new Float32Array(n)
  for (let i = 0; i < n; i++) {
    const l = (0.299 * rgba[i * 4] + 0.587 * rgba[i * 4 + 1] + 0.114 * rgba[i * 4 + 2]) / 255
    lum[i] = l
    if (l < lMin) lMin = l
    if (l > lMax) lMax = l
  }
  const span = Math.max(1e-5, lMax - lMin)
  let brightCount = 0
  for (let i = 0; i < n; i++) {
    lum[i] = (lum[i] - lMin) / span
    if (lum[i] > 0.5) brightCount++
  }
  const glyphsAreBright = brightCount <= n / 2 // glyphs = minority coverage
  for (let i = 0; i < n; i++) {
    const v = glyphsAreBright ? lum[i] : 1 - lum[i]
    // soft threshold keeps the glyph edge anti-aliasing
    mask[i] = Math.min(1, Math.max(0, (v - 0.45) * 4))
  }
  return mask
}

function boxBlur(src, w, h, radius) {
  const out = new Float32Array(src)
  boxBlurInPlace(out, w, h, radius)
  return out
}

function boxBlurInPlace(data, w, h, radius) {
  if (radius < 1) return
  const tmp = new Float32Array(data.length)
  const div = radius * 2 + 1
  // horizontal
  for (let y = 0; y < h; y++) {
    let sum = 0
    const row = y * w
    for (let x = -radius; x <= radius; x++) sum += data[row + clampI(x, w)]
    for (let x = 0; x < w; x++) {
      tmp[row + x] = sum / div
      sum += data[row + clampI(x + radius + 1, w)] - data[row + clampI(x - radius, w)]
    }
  }
  // vertical
  for (let x = 0; x < w; x++) {
    let sum = 0
    for (let y = -radius; y <= radius; y++) sum += tmp[clampI(y, h) * w + x]
    for (let y = 0; y < h; y++) {
      data[y * w + x] = sum / div
      sum += tmp[clampI(y + radius + 1, h) * w + x] - tmp[clampI(y - radius, h) * w + x]
    }
  }
}

function clampI(v, max) {
  return v < 0 ? 0 : (v >= max ? max - 1 : v)
}

/** Sobel-style central differences → tangent-space normal map (RGBA bytes). */
function buildNormalMap(height, w, h, strength, engrave) {
  const out = new Uint8Array(w * h * 4)
  const s = engrave ? -strength : strength // engraved = glyphs read as recessed
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = y * w + x
      const xl = height[y * w + clampI(x - 1, w)]
      const xr = height[y * w + clampI(x + 1, w)]
      const yd = height[clampI(y - 1, h) * w + x]
      const yu = height[clampI(y + 1, h) * w + x]
      let nx = (xl - xr) * s
      let ny = (yd - yu) * s
      let nz = 1
      const inv = 1 / Math.sqrt(nx * nx + ny * ny + nz * nz)
      nx *= inv; ny *= inv; nz *= inv
      out[i * 4] = ((nx * 0.5 + 0.5) * 255) | 0
      out[i * 4 + 1] = ((ny * 0.5 + 0.5) * 255) | 0
      out[i * 4 + 2] = ((nz * 0.5 + 0.5) * 255) | 0
      out[i * 4 + 3] = 255
    }
  }
  return out
}
