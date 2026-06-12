var pt = Object.defineProperty;
var mt = (l, e, t) => e in l ? pt(l, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : l[e] = t;
var ee = (l, e, t) => (mt(l, typeof e != "symbol" ? e + "" : e, t), t), ye = (l, e, t) => {
  if (!e.has(l))
    throw TypeError("Cannot " + t);
};
var f = (l, e, t) => (ye(l, e, "read from private field"), t ? t.call(l) : e.get(l)), y = (l, e, t) => {
  if (e.has(l))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(l) : e.set(l, t);
}, O = (l, e, t, i) => (ye(l, e, "write to private field"), i ? i.call(l, t) : e.set(l, t), t);
var he = (l, e, t, i) => ({
  set _(s) {
    O(l, e, s, t);
  },
  get _() {
    return f(l, e, i);
  }
}), Ge = (l, e, t) => (ye(l, e, "access private method"), t);
import { E as gt, O as se, a as nt, M as Me, S as at, C as me, b as C, V as p, _ as Q, c as W, d as He, Q as ae, e as le, T as ve, A as qe, s as ot, f as q, g as St, N as ht, h as Mt, L as xe, i as Xe, j as xt, k as F, R as Se, l as B, m as Je, B as et, P as We, n as Tt, o as L, p as Qe, q as v, r as lt, t as je, u as $e, v as ct, w as Et, x as Ct, y as wt, z as Pt, F as be, G as ge, H as Rt, I as Ae, J as vt, K as Ze, U as At, W as dt, X as Dt, Y as Ke, Z as te, D as ce } from "./Dice.js";
import { d as bt } from "./dice-box.es.js";
function Ft(l) {
  return new gt(l, !0, {
    preserveDrawingBuffer: !0,
    stencil: !0
  });
}
class J {
  /**
   * Gets a string describing the action executed by the current optimization
   * @returns description string
   */
  getDescription() {
    return "";
  }
  /**
   * This function will be called by the SceneOptimizer when its priority is reached in order to apply the change required by the current optimization
   * @param scene defines the current scene where to apply this optimization
   * @param optimizer defines the current optimizer
   * @returns true if everything that can be done was applied
   */
  apply(e, t) {
    return !0;
  }
  /**
   * Creates the SceneOptimization object
   * @param priority defines the priority of this optimization (0 by default which means first in the list)
   */
  constructor(e = 0) {
    this.priority = e;
  }
}
class Ne extends J {
  /**
   * Gets a string describing the action executed by the current optimization
   * @returns description string
   */
  getDescription() {
    return "Reducing render target texture size to " + this.maximumSize;
  }
  /**
   * Creates the TextureOptimization object
   * @param priority defines the priority of this optimization (0 by default which means first in the list)
   * @param maximumSize defines the maximum sized allowed for textures (1024 is the default value). If a texture is bigger, it will be scaled down using a factor defined by the step parameter
   * @param step defines the factor (0.5 by default) used to scale down textures bigger than maximum sized allowed.
   */
  constructor(e = 0, t = 1024, i = 0.5) {
    super(e), this.priority = e, this.maximumSize = t, this.step = i;
  }
  /**
   * This function will be called by the SceneOptimizer when its priority is reached in order to apply the change required by the current optimization
   * @param scene defines the current scene where to apply this optimization
   * @param optimizer defines the current optimizer
   * @returns true if everything that can be done was applied
   */
  apply(e, t) {
    let i = !0;
    for (let s = 0; s < e.textures.length; s++) {
      const r = e.textures[s];
      if (!r.canRescale || r.getContext)
        continue;
      const n = r.getSize();
      Math.max(n.width, n.height) > this.maximumSize && (r.scale(this.step), i = !1);
    }
    return i;
  }
}
class tt extends J {
  /**
   * Gets a string describing the action executed by the current optimization
   * @returns description string
   */
  getDescription() {
    return "Setting hardware scaling level to " + this._currentScale;
  }
  /**
   * Creates the HardwareScalingOptimization object
   * @param priority defines the priority of this optimization (0 by default which means first in the list)
   * @param maximumScale defines the maximum scale to use (2 by default)
   * @param step defines the step to use between two passes (0.5 by default)
   */
  constructor(e = 0, t = 2, i = 0.25) {
    super(e), this.priority = e, this.maximumScale = t, this.step = i, this._currentScale = -1, this._directionOffset = 1;
  }
  /**
   * This function will be called by the SceneOptimizer when its priority is reached in order to apply the change required by the current optimization
   * @param scene defines the current scene where to apply this optimization
   * @param optimizer defines the current optimizer
   * @returns true if everything that can be done was applied
   */
  apply(e, t) {
    return this._currentScale === -1 && (this._currentScale = e.getEngine().getHardwareScalingLevel(), this._currentScale > this.maximumScale && (this._directionOffset = -1)), this._currentScale += this._directionOffset * this.step, e.getEngine().setHardwareScalingLevel(this._currentScale), this._directionOffset === 1 ? this._currentScale >= this.maximumScale : this._currentScale <= this.maximumScale;
  }
}
class Ue extends J {
  /**
   * Gets a string describing the action executed by the current optimization
   * @returns description string
   */
  getDescription() {
    return "Turning shadows on/off";
  }
  /**
   * This function will be called by the SceneOptimizer when its priority is reached in order to apply the change required by the current optimization
   * @param scene defines the current scene where to apply this optimization
   * @param optimizer defines the current optimizer
   * @returns true if everything that can be done was applied
   */
  apply(e, t) {
    return e.shadowsEnabled = t.isInImprovementMode, !0;
  }
}
class Ve extends J {
  /**
   * Gets a string describing the action executed by the current optimization
   * @returns description string
   */
  getDescription() {
    return "Turning post-processes on/off";
  }
  /**
   * This function will be called by the SceneOptimizer when its priority is reached in order to apply the change required by the current optimization
   * @param scene defines the current scene where to apply this optimization
   * @param optimizer defines the current optimizer
   * @returns true if everything that can be done was applied
   */
  apply(e, t) {
    return e.postProcessesEnabled = t.isInImprovementMode, !0;
  }
}
class ze extends J {
  /**
   * Gets a string describing the action executed by the current optimization
   * @returns description string
   */
  getDescription() {
    return "Turning lens flares on/off";
  }
  /**
   * This function will be called by the SceneOptimizer when its priority is reached in order to apply the change required by the current optimization
   * @param scene defines the current scene where to apply this optimization
   * @param optimizer defines the current optimizer
   * @returns true if everything that can be done was applied
   */
  apply(e, t) {
    return e.lensFlaresEnabled = t.isInImprovementMode, !0;
  }
}
class Ot extends J {
  /**
   * Gets a string describing the action executed by the current optimization
   * @returns description string
   */
  getDescription() {
    return this.onGetDescription ? this.onGetDescription() : "Running user defined callback";
  }
  /**
   * This function will be called by the SceneOptimizer when its priority is reached in order to apply the change required by the current optimization
   * @param scene defines the current scene where to apply this optimization
   * @param optimizer defines the current optimizer
   * @returns true if everything that can be done was applied
   */
  apply(e, t) {
    return this.onApply ? this.onApply(e, t) : !0;
  }
}
class ke extends J {
  /**
   * Gets a string describing the action executed by the current optimization
   * @returns description string
   */
  getDescription() {
    return "Turning particles on/off";
  }
  /**
   * This function will be called by the SceneOptimizer when its priority is reached in order to apply the change required by the current optimization
   * @param scene defines the current scene where to apply this optimization
   * @param optimizer defines the current optimizer
   * @returns true if everything that can be done was applied
   */
  apply(e, t) {
    return e.particlesEnabled = t.isInImprovementMode, !0;
  }
}
class it extends J {
  /**
   * Gets a string describing the action executed by the current optimization
   * @returns description string
   */
  getDescription() {
    return "Turning render targets off";
  }
  /**
   * This function will be called by the SceneOptimizer when its priority is reached in order to apply the change required by the current optimization
   * @param scene defines the current scene where to apply this optimization
   * @param optimizer defines the current optimizer
   * @returns true if everything that can be done was applied
   */
  apply(e, t) {
    return e.renderTargetsEnabled = t.isInImprovementMode, !0;
  }
}
class re extends J {
  constructor() {
    super(...arguments), this._canBeMerged = (e) => {
      if (!(e instanceof Me))
        return !1;
      const t = e;
      return !(t.isDisposed() || !t.isVisible || !t.isEnabled() || t.instances.length > 0 || t.skeleton || t.hasLODLevels || t.getTotalVertices() === 0);
    };
  }
  /**
   * Gets or sets a boolean which defines if optimization octree has to be updated
   */
  static get UpdateSelectionTree() {
    return re._UpdateSelectionTree;
  }
  /**
   * Gets or sets a boolean which defines if optimization octree has to be updated
   */
  static set UpdateSelectionTree(e) {
    re._UpdateSelectionTree = e;
  }
  /**
   * Gets a string describing the action executed by the current optimization
   * @returns description string
   */
  getDescription() {
    return "Merging similar meshes together";
  }
  /**
   * This function will be called by the SceneOptimizer when its priority is reached in order to apply the change required by the current optimization
   * @param scene defines the current scene where to apply this optimization
   * @param optimizer defines the current optimizer
   * @param updateSelectionTree defines that the selection octree has to be updated (false by default)
   * @returns true if everything that can be done was applied
   */
  apply(e, t, i) {
    const s = e.meshes.slice(0);
    let r = s.length;
    for (let a = 0; a < r; a++) {
      const o = new Array(), c = s[a];
      if (this._canBeMerged(c)) {
        o.push(c);
        for (let d = a + 1; d < r; d++) {
          const h = s[d];
          this._canBeMerged(h) && h.material === c.material && h.checkCollisions === c.checkCollisions && (o.push(h), r--, s.splice(d, 1), d--);
        }
        o.length < 2 || Me.MergeMeshes(o, void 0, !0);
      }
    }
    const n = e;
    return n.createOrUpdateSelectionOctree && (i != null ? i && n.createOrUpdateSelectionOctree() : re.UpdateSelectionTree && n.createOrUpdateSelectionOctree()), !0;
  }
}
re._UpdateSelectionTree = !1;
class oe {
  /**
   * Creates a new list of options used by SceneOptimizer
   * @param targetFrameRate defines the target frame rate to reach (60 by default)
   * @param trackerDuration defines the interval between two checks (2000ms by default)
   */
  constructor(e = 60, t = 2e3) {
    this.targetFrameRate = e, this.trackerDuration = t, this.optimizations = new Array();
  }
  /**
   * Add a new optimization
   * @param optimization defines the SceneOptimization to add to the list of active optimizations
   * @returns the current SceneOptimizerOptions
   */
  addOptimization(e) {
    return this.optimizations.push(e), this;
  }
  /**
   * Add a new custom optimization
   * @param onApply defines the callback called to apply the custom optimization (true if everything that can be done was applied)
   * @param onGetDescription defines the callback called to get the description attached with the optimization.
   * @param priority defines the priority of this optimization (0 by default which means first in the list)
   * @returns the current SceneOptimizerOptions
   */
  addCustomOptimization(e, t, i = 0) {
    const s = new Ot(i);
    return s.onApply = e, s.onGetDescription = t, this.optimizations.push(s), this;
  }
  /**
   * Creates a list of pre-defined optimizations aimed to reduce the visual impact on the scene
   * @param targetFrameRate defines the target frame rate (60 by default)
   * @returns a SceneOptimizerOptions object
   */
  static LowDegradationAllowed(e) {
    const t = new oe(e);
    let i = 0;
    return t.addOptimization(new re(i)), t.addOptimization(new Ue(i)), t.addOptimization(new ze(i)), i++, t.addOptimization(new Ve(i)), t.addOptimization(new ke(i)), i++, t.addOptimization(new Ne(i, 1024)), t;
  }
  /**
   * Creates a list of pre-defined optimizations aimed to have a moderate impact on the scene visual
   * @param targetFrameRate defines the target frame rate (60 by default)
   * @returns a SceneOptimizerOptions object
   */
  static ModerateDegradationAllowed(e) {
    const t = new oe(e);
    let i = 0;
    return t.addOptimization(new re(i)), t.addOptimization(new Ue(i)), t.addOptimization(new ze(i)), i++, t.addOptimization(new Ve(i)), t.addOptimization(new ke(i)), i++, t.addOptimization(new Ne(i, 512)), i++, t.addOptimization(new it(i)), i++, t.addOptimization(new tt(i, 2)), t;
  }
  /**
   * Creates a list of pre-defined optimizations aimed to have a big impact on the scene visual
   * @param targetFrameRate defines the target frame rate (60 by default)
   * @returns a SceneOptimizerOptions object
   */
  static HighDegradationAllowed(e) {
    const t = new oe(e);
    let i = 0;
    return t.addOptimization(new re(i)), t.addOptimization(new Ue(i)), t.addOptimization(new ze(i)), i++, t.addOptimization(new Ve(i)), t.addOptimization(new ke(i)), i++, t.addOptimization(new Ne(i, 256)), i++, t.addOptimization(new it(i)), i++, t.addOptimization(new tt(i, 4)), t;
  }
}
class Ye {
  /**
   * Gets or sets a boolean indicating if the optimizer is in improvement mode
   */
  get isInImprovementMode() {
    return this._improvementMode;
  }
  set isInImprovementMode(e) {
    this._improvementMode = e;
  }
  /**
   * Gets the current priority level (0 at start)
   */
  get currentPriorityLevel() {
    return this._currentPriorityLevel;
  }
  /**
   * Gets the current frame rate checked by the SceneOptimizer
   */
  get currentFrameRate() {
    return this._currentFrameRate;
  }
  /**
   * Gets or sets the current target frame rate (60 by default)
   */
  get targetFrameRate() {
    return this._targetFrameRate;
  }
  /**
   * Gets or sets the current target frame rate (60 by default)
   */
  set targetFrameRate(e) {
    this._targetFrameRate = e;
  }
  /**
   * Gets or sets the current interval between two checks (every 2000ms by default)
   */
  get trackerDuration() {
    return this._trackerDuration;
  }
  /**
   * Gets or sets the current interval between two checks (every 2000ms by default)
   */
  set trackerDuration(e) {
    this._trackerDuration = e;
  }
  /**
   * Gets the list of active optimizations
   */
  get optimizations() {
    return this._options.optimizations;
  }
  /**
   * Creates a new SceneOptimizer
   * @param scene defines the scene to work on
   * @param options defines the options to use with the SceneOptimizer
   * @param autoGeneratePriorities defines if priorities must be generated and not read from SceneOptimization property (true by default)
   * @param improvementMode defines if the scene optimizer must run the maximum optimization while staying over a target frame instead of trying to reach the target framerate (false by default)
   */
  constructor(e, t, i = !0, s = !1) {
    if (this._isRunning = !1, this._currentPriorityLevel = 0, this._targetFrameRate = 60, this._trackerDuration = 2e3, this._currentFrameRate = 0, this._improvementMode = !1, this.onSuccessObservable = new se(), this.onNewOptimizationAppliedObservable = new se(), this.onFailureObservable = new se(), t ? this._options = t : this._options = new oe(), this._options.targetFrameRate && (this._targetFrameRate = this._options.targetFrameRate), this._options.trackerDuration && (this._trackerDuration = this._options.trackerDuration), i) {
      let r = 0;
      for (const n of this._options.optimizations)
        n.priority = r++;
    }
    this._improvementMode = s, this._scene = e || nt.LastCreatedScene, this._sceneDisposeObserver = this._scene.onDisposeObservable.add(() => {
      this._sceneDisposeObserver = null, this.dispose();
    });
  }
  /**
   * Stops the current optimizer
   */
  stop() {
    this._isRunning = !1;
  }
  /**
   * Reset the optimizer to initial step (current priority level = 0)
   */
  reset() {
    this._currentPriorityLevel = 0;
  }
  /**
   * Start the optimizer. By default it will try to reach a specific framerate
   * but if the optimizer is set with improvementMode === true then it will run all optimization while frame rate is above the target frame rate
   */
  start() {
    this._isRunning || (this._isRunning = !0, this._scene.executeWhenReady(() => {
      setTimeout(() => {
        this._checkCurrentState();
      }, this._trackerDuration);
    }));
  }
  _checkCurrentState() {
    if (!this._isRunning)
      return;
    const e = this._scene, t = this._options;
    if (this._currentFrameRate = Math.round(e.getEngine().getFps()), this._improvementMode && this._currentFrameRate <= this._targetFrameRate || !this._improvementMode && this._currentFrameRate >= this._targetFrameRate) {
      this._isRunning = !1, this.onSuccessObservable.notifyObservers(this);
      return;
    }
    let i = !0, s = !0;
    for (let r = 0; r < t.optimizations.length; r++) {
      const n = t.optimizations[r];
      n.priority === this._currentPriorityLevel && (s = !1, i = i && n.apply(e, this), this.onNewOptimizationAppliedObservable.notifyObservers(n));
    }
    if (s) {
      this._isRunning = !1, this.onFailureObservable.notifyObservers(this);
      return;
    }
    i && this._currentPriorityLevel++, e.executeWhenReady(() => {
      setTimeout(() => {
        this._checkCurrentState();
      }, this._trackerDuration);
    });
  }
  /**
   * Release all resources
   */
  dispose() {
    this.stop(), this.onSuccessObservable.clear(), this.onFailureObservable.clear(), this.onNewOptimizationAppliedObservable.clear(), this._sceneDisposeObserver && this._scene.onDisposeObservable.remove(this._sceneDisposeObserver);
  }
  /**
   * Helper function to create a SceneOptimizer with one single line of code
   * @param scene defines the scene to work on
   * @param options defines the options to use with the SceneOptimizer
   * @param onSuccess defines a callback to call on success
   * @param onFailure defines a callback to call on failure
   * @returns the new SceneOptimizer object
   */
  static OptimizeAsync(e, t, i, s) {
    const r = new Ye(e, t || oe.ModerateDegradationAllowed(), !1);
    return i && r.onSuccessObservable.add(() => {
      i();
    }), s && r.onFailureObservable.add(() => {
      s();
    }), r.start(), r;
  }
}
function It(l) {
  const { engine: e } = l, t = new at(e);
  t.clearColor = new me(0, 0, 0, 0), t.pointerMovePredicate = () => !1, t.pointerDownPredicate = () => !1, t.pointerUpPredicate = () => !1, t.clearCachedVertexData(), t.themeData = {};
  const i = oe.LowDegradationAllowed();
  return i.optimizations = i.optimizations.splice(1), i.targetFrameRate = 60, Ye.OptimizeAsync(t, i), t;
}
class b extends W {
  /**
   * Instantiates a target camera that takes a mesh or position as a target and continues to look at it while it moves.
   * This is the base of the follow, arc rotate cameras and Free camera
   * @see https://doc.babylonjs.com/features/featuresDeepDive/cameras
   * @param name Defines the name of the camera in the scene
   * @param position Defines the start position of the camera in the scene
   * @param scene Defines the scene the camera belongs to
   * @param setActiveOnSceneIfNoneActive Defines whether the camera should be marked as active if not other active cameras have been defined
   */
  constructor(e, t, i, s = !0) {
    super(e, t, i, s), this._tmpUpVector = p.Zero(), this._tmpTargetVector = p.Zero(), this.cameraDirection = new p(0, 0, 0), this.cameraRotation = new He(0, 0), this.ignoreParentScaling = !1, this.updateUpVectorFromRotation = !1, this._tmpQuaternion = new ae(), this.rotation = new p(0, 0, 0), this.speed = 2, this.noRotationConstraint = !1, this.invertRotation = !1, this.inverseRotationSpeed = 0.2, this.lockedTarget = null, this._currentTarget = p.Zero(), this._initialFocalDistance = 1, this._viewMatrix = C.Zero(), this._camMatrix = C.Zero(), this._cameraTransformMatrix = C.Zero(), this._cameraRotationMatrix = C.Zero(), this._referencePoint = new p(0, 0, 1), this._transformedReferencePoint = p.Zero(), this._defaultUp = p.Up(), this._cachedRotationZ = 0, this._cachedQuaternionRotationZ = 0;
  }
  /**
   * Gets the position in front of the camera at a given distance.
   * @param distance The distance from the camera we want the position to be
   * @returns the position
   */
  getFrontPosition(e) {
    this.getWorldMatrix();
    const t = this.getTarget().subtract(this.position);
    return t.normalize(), t.scaleInPlace(e), this.globalPosition.add(t);
  }
  /** @internal */
  _getLockedTargetPosition() {
    if (!this.lockedTarget)
      return null;
    if (this.lockedTarget.absolutePosition) {
      const e = this.lockedTarget;
      e.computeWorldMatrix().getTranslationToRef(e.absolutePosition);
    }
    return this.lockedTarget.absolutePosition || this.lockedTarget;
  }
  /**
   * Store current camera state of the camera (fov, position, rotation, etc..)
   * @returns the camera
   */
  storeState() {
    return this._storedPosition = this.position.clone(), this._storedRotation = this.rotation.clone(), this.rotationQuaternion && (this._storedRotationQuaternion = this.rotationQuaternion.clone()), super.storeState();
  }
  /**
   * Restored camera state. You must call storeState() first
   * @returns whether it was successful or not
   * @internal
   */
  _restoreStateValues() {
    return super._restoreStateValues() ? (this.position = this._storedPosition.clone(), this.rotation = this._storedRotation.clone(), this.rotationQuaternion && (this.rotationQuaternion = this._storedRotationQuaternion.clone()), this.cameraDirection.copyFromFloats(0, 0, 0), this.cameraRotation.copyFromFloats(0, 0), !0) : !1;
  }
  /** @internal */
  _initCache() {
    super._initCache(), this._cache.lockedTarget = new p(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE), this._cache.rotation = new p(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE), this._cache.rotationQuaternion = new ae(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);
  }
  /**
   * @internal
   */
  _updateCache(e) {
    e || super._updateCache();
    const t = this._getLockedTargetPosition();
    t ? this._cache.lockedTarget ? this._cache.lockedTarget.copyFrom(t) : this._cache.lockedTarget = t.clone() : this._cache.lockedTarget = null, this._cache.rotation.copyFrom(this.rotation), this.rotationQuaternion && this._cache.rotationQuaternion.copyFrom(this.rotationQuaternion);
  }
  // Synchronized
  /** @internal */
  _isSynchronizedViewMatrix() {
    if (!super._isSynchronizedViewMatrix())
      return !1;
    const e = this._getLockedTargetPosition();
    return (this._cache.lockedTarget ? this._cache.lockedTarget.equals(e) : !e) && (this.rotationQuaternion ? this.rotationQuaternion.equals(this._cache.rotationQuaternion) : this._cache.rotation.equals(this.rotation));
  }
  // Methods
  /** @internal */
  _computeLocalCameraSpeed() {
    const e = this.getEngine();
    return this.speed * Math.sqrt(e.getDeltaTime() / (e.getFps() * 100));
  }
  // Target
  /**
   * Defines the target the camera should look at.
   * @param target Defines the new target as a Vector
   */
  setTarget(e) {
    this.upVector.normalize(), this._initialFocalDistance = e.subtract(this.position).length(), this.position.z === e.z && (this.position.z += le), this._referencePoint.normalize().scaleInPlace(this._initialFocalDistance), C.LookAtLHToRef(this.position, e, this._defaultUp, this._camMatrix), this._camMatrix.invert(), this.rotation.x = Math.atan(this._camMatrix.m[6] / this._camMatrix.m[10]);
    const t = e.subtract(this.position);
    t.x >= 0 ? this.rotation.y = -Math.atan(t.z / t.x) + Math.PI / 2 : this.rotation.y = -Math.atan(t.z / t.x) - Math.PI / 2, this.rotation.z = 0, isNaN(this.rotation.x) && (this.rotation.x = 0), isNaN(this.rotation.y) && (this.rotation.y = 0), isNaN(this.rotation.z) && (this.rotation.z = 0), this.rotationQuaternion && ae.RotationYawPitchRollToRef(this.rotation.y, this.rotation.x, this.rotation.z, this.rotationQuaternion);
  }
  /**
   * Defines the target point of the camera.
   * The camera looks towards it form the radius distance.
   */
  get target() {
    return this.getTarget();
  }
  set target(e) {
    this.setTarget(e);
  }
  /**
   * Return the current target position of the camera. This value is expressed in local space.
   * @returns the target position
   */
  getTarget() {
    return this._currentTarget;
  }
  /** @internal */
  _decideIfNeedsToMove() {
    return Math.abs(this.cameraDirection.x) > 0 || Math.abs(this.cameraDirection.y) > 0 || Math.abs(this.cameraDirection.z) > 0;
  }
  /** @internal */
  _updatePosition() {
    if (this.parent) {
      this.parent.getWorldMatrix().invertToRef(ve.Matrix[0]), p.TransformNormalToRef(this.cameraDirection, ve.Matrix[0], ve.Vector3[0]), this.position.addInPlace(ve.Vector3[0]);
      return;
    }
    this.position.addInPlace(this.cameraDirection);
  }
  /** @internal */
  _checkInputs() {
    const e = this.invertRotation ? -this.inverseRotationSpeed : 1, t = this._decideIfNeedsToMove(), i = Math.abs(this.cameraRotation.x) > 0 || Math.abs(this.cameraRotation.y) > 0;
    t && this._updatePosition(), i && (this.rotationQuaternion && this.rotationQuaternion.toEulerAnglesToRef(this.rotation), this.rotation.x += this.cameraRotation.x * e, this.rotation.y += this.cameraRotation.y * e, this.noRotationConstraint || (this.rotation.x > 1.570796 && (this.rotation.x = 1.570796), this.rotation.x < -1.570796 && (this.rotation.x = -1.570796)), this.rotationQuaternion && this.rotation.lengthSquared() && ae.RotationYawPitchRollToRef(this.rotation.y, this.rotation.x, this.rotation.z, this.rotationQuaternion)), t && (Math.abs(this.cameraDirection.x) < this.speed * le && (this.cameraDirection.x = 0), Math.abs(this.cameraDirection.y) < this.speed * le && (this.cameraDirection.y = 0), Math.abs(this.cameraDirection.z) < this.speed * le && (this.cameraDirection.z = 0), this.cameraDirection.scaleInPlace(this.inertia)), i && (Math.abs(this.cameraRotation.x) < this.speed * le && (this.cameraRotation.x = 0), Math.abs(this.cameraRotation.y) < this.speed * le && (this.cameraRotation.y = 0), this.cameraRotation.scaleInPlace(this.inertia)), super._checkInputs();
  }
  _updateCameraRotationMatrix() {
    this.rotationQuaternion ? this.rotationQuaternion.toRotationMatrix(this._cameraRotationMatrix) : C.RotationYawPitchRollToRef(this.rotation.y, this.rotation.x, this.rotation.z, this._cameraRotationMatrix);
  }
  /**
   * Update the up vector to apply the rotation of the camera (So if you changed the camera rotation.z this will let you update the up vector as well)
   * @returns the current camera
   */
  _rotateUpVectorWithCameraRotationMatrix() {
    return p.TransformNormalToRef(this._defaultUp, this._cameraRotationMatrix, this.upVector), this;
  }
  /** @internal */
  _getViewMatrix() {
    return this.lockedTarget && this.setTarget(this._getLockedTargetPosition()), this._updateCameraRotationMatrix(), this.rotationQuaternion && this._cachedQuaternionRotationZ != this.rotationQuaternion.z ? (this._rotateUpVectorWithCameraRotationMatrix(), this._cachedQuaternionRotationZ = this.rotationQuaternion.z) : this._cachedRotationZ !== this.rotation.z && (this._rotateUpVectorWithCameraRotationMatrix(), this._cachedRotationZ = this.rotation.z), p.TransformCoordinatesToRef(this._referencePoint, this._cameraRotationMatrix, this._transformedReferencePoint), this.position.addToRef(this._transformedReferencePoint, this._currentTarget), this.updateUpVectorFromRotation && (this.rotationQuaternion ? qe.Y.rotateByQuaternionToRef(this.rotationQuaternion, this.upVector) : (ae.FromEulerVectorToRef(this.rotation, this._tmpQuaternion), qe.Y.rotateByQuaternionToRef(this._tmpQuaternion, this.upVector))), this._computeViewMatrix(this.position, this._currentTarget, this.upVector), this._viewMatrix;
  }
  _computeViewMatrix(e, t, i) {
    if (this.ignoreParentScaling) {
      if (this.parent) {
        const s = this.parent.getWorldMatrix();
        p.TransformCoordinatesToRef(e, s, this._globalPosition), p.TransformCoordinatesToRef(t, s, this._tmpTargetVector), p.TransformNormalToRef(i, s, this._tmpUpVector), this._markSyncedWithParent();
      } else
        this._globalPosition.copyFrom(e), this._tmpTargetVector.copyFrom(t), this._tmpUpVector.copyFrom(i);
      this.getScene().useRightHandedSystem ? C.LookAtRHToRef(this._globalPosition, this._tmpTargetVector, this._tmpUpVector, this._viewMatrix) : C.LookAtLHToRef(this._globalPosition, this._tmpTargetVector, this._tmpUpVector, this._viewMatrix);
      return;
    }
    if (this.getScene().useRightHandedSystem ? C.LookAtRHToRef(e, t, i, this._viewMatrix) : C.LookAtLHToRef(e, t, i, this._viewMatrix), this.parent) {
      const s = this.parent.getWorldMatrix();
      this._viewMatrix.invert(), this._viewMatrix.multiplyToRef(s, this._viewMatrix), this._viewMatrix.getTranslationToRef(this._globalPosition), this._viewMatrix.invert(), this._markSyncedWithParent();
    } else
      this._globalPosition.copyFrom(e);
  }
  /**
   * @internal
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createRigCamera(e, t) {
    if (this.cameraRigMode !== W.RIG_MODE_NONE) {
      const i = new b(e, this.position.clone(), this.getScene());
      return i.isRigCamera = !0, i.rigParent = this, (this.cameraRigMode === W.RIG_MODE_VR || this.cameraRigMode === W.RIG_MODE_WEBVR) && (this.rotationQuaternion || (this.rotationQuaternion = new ae()), i._cameraRigParams = {}, i.rotationQuaternion = new ae()), i.mode = this.mode, i.orthoLeft = this.orthoLeft, i.orthoRight = this.orthoRight, i.orthoTop = this.orthoTop, i.orthoBottom = this.orthoBottom, i;
    }
    return null;
  }
  /**
   * @internal
   */
  _updateRigCameras() {
    const e = this._rigCameras[0], t = this._rigCameras[1];
    switch (this.computeWorldMatrix(), this.cameraRigMode) {
      case W.RIG_MODE_STEREOSCOPIC_ANAGLYPH:
      case W.RIG_MODE_STEREOSCOPIC_SIDEBYSIDE_PARALLEL:
      case W.RIG_MODE_STEREOSCOPIC_SIDEBYSIDE_CROSSEYED:
      case W.RIG_MODE_STEREOSCOPIC_OVERUNDER:
      case W.RIG_MODE_STEREOSCOPIC_INTERLACED: {
        const i = this.cameraRigMode === W.RIG_MODE_STEREOSCOPIC_SIDEBYSIDE_CROSSEYED ? 1 : -1, s = this.cameraRigMode === W.RIG_MODE_STEREOSCOPIC_SIDEBYSIDE_CROSSEYED ? -1 : 1;
        this._getRigCamPositionAndTarget(this._cameraRigParams.stereoHalfAngle * i, e), this._getRigCamPositionAndTarget(this._cameraRigParams.stereoHalfAngle * s, t);
        break;
      }
      case W.RIG_MODE_VR:
        e.rotationQuaternion ? (e.rotationQuaternion.copyFrom(this.rotationQuaternion), t.rotationQuaternion.copyFrom(this.rotationQuaternion)) : (e.rotation.copyFrom(this.rotation), t.rotation.copyFrom(this.rotation)), e.position.copyFrom(this.position), t.position.copyFrom(this.position);
        break;
    }
    super._updateRigCameras();
  }
  _getRigCamPositionAndTarget(e, t) {
    this.getTarget().subtractToRef(this.position, b._TargetFocalPoint), b._TargetFocalPoint.normalize().scaleInPlace(this._initialFocalDistance);
    const s = b._TargetFocalPoint.addInPlace(this.position);
    C.TranslationToRef(-s.x, -s.y, -s.z, b._TargetTransformMatrix), b._TargetTransformMatrix.multiplyToRef(C.RotationAxis(t.upVector, e), b._RigCamTransformMatrix), C.TranslationToRef(s.x, s.y, s.z, b._TargetTransformMatrix), b._RigCamTransformMatrix.multiplyToRef(b._TargetTransformMatrix, b._RigCamTransformMatrix), p.TransformCoordinatesToRef(this.position, b._RigCamTransformMatrix, t.position), t.setTarget(s);
  }
  /**
   * Gets the current object class name.
   * @returns the class name
   */
  getClassName() {
    return "TargetCamera";
  }
}
b._RigCamTransformMatrix = new C();
b._TargetTransformMatrix = new C();
b._TargetFocalPoint = new p();
Q([
  ot()
], b.prototype, "rotation", void 0);
Q([
  q()
], b.prototype, "speed", void 0);
Q([
  St("lockedTargetId")
], b.prototype, "lockedTarget", void 0);
function Bt(l) {
  const { scene: e } = l;
  let t;
  const i = 36.5;
  return t = new b("TargetCamera1", new p(0, i, 0), e), t.fov = 0.25, t.minZ = 5, t.maxZ = i + 1, t.setTarget(p.Zero()), t;
}
ht.AddNodeConstructor("Light_Type_1", (l, e) => () => new Y(l, p.Zero(), e));
class Y extends Mt {
  /**
   * Fix frustum size for the shadow generation. This is disabled if the value is 0.
   */
  get shadowFrustumSize() {
    return this._shadowFrustumSize;
  }
  /**
   * Specifies a fix frustum size for the shadow generation.
   */
  set shadowFrustumSize(e) {
    this._shadowFrustumSize = e, this.forceProjectionMatrixCompute();
  }
  /**
   * Gets the shadow projection scale against the optimal computed one.
   * 0.1 by default which means that the projection window is increase by 10% from the optimal size.
   * This does not impact in fixed frustum size (shadowFrustumSize being set)
   */
  get shadowOrthoScale() {
    return this._shadowOrthoScale;
  }
  /**
   * Sets the shadow projection scale against the optimal computed one.
   * 0.1 by default which means that the projection window is increase by 10% from the optimal size.
   * This does not impact in fixed frustum size (shadowFrustumSize being set)
   */
  set shadowOrthoScale(e) {
    this._shadowOrthoScale = e, this.forceProjectionMatrixCompute();
  }
  /**
   * Gets or sets the orthoLeft property used to build the light frustum
   */
  get orthoLeft() {
    return this._orthoLeft;
  }
  set orthoLeft(e) {
    this._orthoLeft = e;
  }
  /**
   * Gets or sets the orthoRight property used to build the light frustum
   */
  get orthoRight() {
    return this._orthoRight;
  }
  set orthoRight(e) {
    this._orthoRight = e;
  }
  /**
   * Gets or sets the orthoTop property used to build the light frustum
   */
  get orthoTop() {
    return this._orthoTop;
  }
  set orthoTop(e) {
    this._orthoTop = e;
  }
  /**
   * Gets or sets the orthoBottom property used to build the light frustum
   */
  get orthoBottom() {
    return this._orthoBottom;
  }
  set orthoBottom(e) {
    this._orthoBottom = e;
  }
  /**
   * Creates a DirectionalLight object in the scene, oriented towards the passed direction (Vector3).
   * The directional light is emitted from everywhere in the given direction.
   * It can cast shadows.
   * Documentation : https://doc.babylonjs.com/features/featuresDeepDive/lights/lights_introduction
   * @param name The friendly name of the light
   * @param direction The direction of the light
   * @param scene The scene the light belongs to
   */
  constructor(e, t, i) {
    super(e, i), this._shadowFrustumSize = 0, this._shadowOrthoScale = 0.1, this.autoUpdateExtends = !0, this.autoCalcShadowZBounds = !1, this._orthoLeft = Number.MAX_VALUE, this._orthoRight = Number.MIN_VALUE, this._orthoTop = Number.MIN_VALUE, this._orthoBottom = Number.MAX_VALUE, this.position = t.scale(-1), this.direction = t;
  }
  /**
   * Returns the string "DirectionalLight".
   * @returns The class name
   */
  getClassName() {
    return "DirectionalLight";
  }
  /**
   * Returns the integer 1.
   * @returns The light Type id as a constant defines in Light.LIGHTTYPEID_x
   */
  getTypeID() {
    return xe.LIGHTTYPEID_DIRECTIONALLIGHT;
  }
  /**
   * Sets the passed matrix "matrix" as projection matrix for the shadows cast by the light according to the passed view matrix.
   * Returns the DirectionalLight Shadow projection matrix.
   * @param matrix
   * @param viewMatrix
   * @param renderList
   */
  _setDefaultShadowProjectionMatrix(e, t, i) {
    this.shadowFrustumSize > 0 ? this._setDefaultFixedFrustumShadowProjectionMatrix(e) : this._setDefaultAutoExtendShadowProjectionMatrix(e, t, i);
  }
  /**
   * Sets the passed matrix "matrix" as fixed frustum projection matrix for the shadows cast by the light according to the passed view matrix.
   * Returns the DirectionalLight Shadow projection matrix.
   * @param matrix
   */
  _setDefaultFixedFrustumShadowProjectionMatrix(e) {
    const t = this.getScene().activeCamera;
    t && C.OrthoLHToRef(this.shadowFrustumSize, this.shadowFrustumSize, this.shadowMinZ !== void 0 ? this.shadowMinZ : t.minZ, this.shadowMaxZ !== void 0 ? this.shadowMaxZ : t.maxZ, e, this.getScene().getEngine().isNDCHalfZRange);
  }
  /**
   * Sets the passed matrix "matrix" as auto extend projection matrix for the shadows cast by the light according to the passed view matrix.
   * Returns the DirectionalLight Shadow projection matrix.
   * @param matrix
   * @param viewMatrix
   * @param renderList
   */
  _setDefaultAutoExtendShadowProjectionMatrix(e, t, i) {
    const s = this.getScene().activeCamera;
    if (!s)
      return;
    if (this.autoUpdateExtends || this._orthoLeft === Number.MAX_VALUE) {
      const d = p.Zero();
      this._orthoLeft = Number.MAX_VALUE, this._orthoRight = Number.MIN_VALUE, this._orthoTop = Number.MIN_VALUE, this._orthoBottom = Number.MAX_VALUE;
      let h = Number.MAX_VALUE, m = Number.MIN_VALUE;
      for (let x = 0; x < i.length; x++) {
        const S = i[x];
        if (!S)
          continue;
        const T = S.getBoundingInfo().boundingBox;
        for (let g = 0; g < T.vectorsWorld.length; g++)
          p.TransformCoordinatesToRef(T.vectorsWorld[g], t, d), d.x < this._orthoLeft && (this._orthoLeft = d.x), d.y < this._orthoBottom && (this._orthoBottom = d.y), d.x > this._orthoRight && (this._orthoRight = d.x), d.y > this._orthoTop && (this._orthoTop = d.y), this.autoCalcShadowZBounds && (d.z < h && (h = d.z), d.z > m && (m = d.z));
      }
      this.autoCalcShadowZBounds && (this._shadowMinZ = h, this._shadowMaxZ = m);
    }
    const r = this._orthoRight - this._orthoLeft, n = this._orthoTop - this._orthoBottom, a = this.shadowMinZ !== void 0 ? this.shadowMinZ : s.minZ, o = this.shadowMaxZ !== void 0 ? this.shadowMaxZ : s.maxZ, c = this.getScene().getEngine().useReverseDepthBuffer;
    C.OrthoOffCenterLHToRef(this._orthoLeft - r * this.shadowOrthoScale, this._orthoRight + r * this.shadowOrthoScale, this._orthoBottom - n * this.shadowOrthoScale, this._orthoTop + n * this.shadowOrthoScale, c ? o : a, c ? a : o, e, this.getScene().getEngine().isNDCHalfZRange);
  }
  _buildUniformLayout() {
    this._uniformBuffer.addUniform("vLightData", 4), this._uniformBuffer.addUniform("vLightDiffuse", 4), this._uniformBuffer.addUniform("vLightSpecular", 4), this._uniformBuffer.addUniform("shadowsInfo", 3), this._uniformBuffer.addUniform("depthValues", 2), this._uniformBuffer.create();
  }
  /**
   * Sets the passed Effect object with the DirectionalLight transformed position (or position if not parented) and the passed name.
   * @param effect The effect to update
   * @param lightIndex The index of the light in the effect to update
   * @returns The directional light
   */
  transferToEffect(e, t) {
    return this.computeTransformedInformation() ? (this._uniformBuffer.updateFloat4("vLightData", this.transformedDirection.x, this.transformedDirection.y, this.transformedDirection.z, 1, t), this) : (this._uniformBuffer.updateFloat4("vLightData", this.direction.x, this.direction.y, this.direction.z, 1, t), this);
  }
  transferToNodeMaterialEffect(e, t) {
    return this.computeTransformedInformation() ? (e.setFloat3(t, this.transformedDirection.x, this.transformedDirection.y, this.transformedDirection.z), this) : (e.setFloat3(t, this.direction.x, this.direction.y, this.direction.z), this);
  }
  /**
   * Gets the minZ used for shadow according to both the scene and the light.
   *
   * Values are fixed on directional lights as it relies on an ortho projection hence the need to convert being
   * -1 and 1 to 0 and 1 doing (depth + min) / (min + max) -> (depth + 1) / (1 + 1) -> (depth * 0.5) + 0.5.
   * (when not using reverse depth buffer / NDC half Z range)
   * @param activeCamera The camera we are returning the min for
   * @returns the depth min z
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getDepthMinZ(e) {
    const t = this._scene.getEngine();
    return !t.useReverseDepthBuffer && t.isNDCHalfZRange ? 0 : 1;
  }
  /**
   * Gets the maxZ used for shadow according to both the scene and the light.
   *
   * Values are fixed on directional lights as it relies on an ortho projection hence the need to convert being
   * -1 and 1 to 0 and 1 doing (depth + min) / (min + max) -> (depth + 1) / (1 + 1) -> (depth * 0.5) + 0.5.
   * (when not using reverse depth buffer / NDC half Z range)
   * @param activeCamera The camera we are returning the max for
   * @returns the depth max z
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getDepthMaxZ(e) {
    const t = this._scene.getEngine();
    return t.useReverseDepthBuffer && t.isNDCHalfZRange ? 0 : 1;
  }
  /**
   * Prepares the list of defines specific to the light type.
   * @param defines the list of defines
   * @param lightIndex defines the index of the light for the effect
   */
  prepareLightSpecificDefines(e, t) {
    e["DIRLIGHT" + t] = !0;
  }
}
Q([
  q()
], Y.prototype, "shadowFrustumSize", null);
Q([
  q()
], Y.prototype, "shadowOrthoScale", null);
Q([
  q()
], Y.prototype, "autoUpdateExtends", void 0);
Q([
  q()
], Y.prototype, "autoCalcShadowZBounds", void 0);
Q([
  q("orthoLeft")
], Y.prototype, "_orthoLeft", void 0);
Q([
  q("orthoRight")
], Y.prototype, "_orthoRight", void 0);
Q([
  q("orthoTop")
], Y.prototype, "_orthoTop", void 0);
Q([
  q("orthoBottom")
], Y.prototype, "_orthoBottom", void 0);
ht.AddNodeConstructor("Light_Type_3", (l, e) => () => new Ie(l, p.Zero(), e));
class Ie extends xe {
  /**
   * Creates a HemisphericLight object in the scene according to the passed direction (Vector3).
   * The HemisphericLight simulates the ambient environment light, so the passed direction is the light reflection direction, not the incoming direction.
   * The HemisphericLight can't cast shadows.
   * Documentation : https://doc.babylonjs.com/features/featuresDeepDive/lights/lights_introduction
   * @param name The friendly name of the light
   * @param direction The direction of the light reflection
   * @param scene The scene the light belongs to
   */
  constructor(e, t, i) {
    super(e, i), this.groundColor = new Xe(0, 0, 0), this.direction = t || p.Up();
  }
  _buildUniformLayout() {
    this._uniformBuffer.addUniform("vLightData", 4), this._uniformBuffer.addUniform("vLightDiffuse", 4), this._uniformBuffer.addUniform("vLightSpecular", 4), this._uniformBuffer.addUniform("vLightGround", 3), this._uniformBuffer.addUniform("shadowsInfo", 3), this._uniformBuffer.addUniform("depthValues", 2), this._uniformBuffer.create();
  }
  /**
   * Returns the string "HemisphericLight".
   * @returns The class name
   */
  getClassName() {
    return "HemisphericLight";
  }
  /**
   * Sets the HemisphericLight direction towards the passed target (Vector3).
   * Returns the updated direction.
   * @param target The target the direction should point to
   * @returns The computed direction
   */
  setDirectionToTarget(e) {
    return this.direction = p.Normalize(e.subtract(p.Zero())), this.direction;
  }
  /**
   * Returns the shadow generator associated to the light.
   * @returns Always null for hemispheric lights because it does not support shadows.
   */
  getShadowGenerator() {
    return null;
  }
  /**
   * Sets the passed Effect object with the HemisphericLight normalized direction and color and the passed name (string).
   * @param _effect The effect to update
   * @param lightIndex The index of the light in the effect to update
   * @returns The hemispheric light
   */
  transferToEffect(e, t) {
    const i = p.Normalize(this.direction);
    return this._uniformBuffer.updateFloat4("vLightData", i.x, i.y, i.z, 0, t), this._uniformBuffer.updateColor3("vLightGround", this.groundColor.scale(this.intensity), t), this;
  }
  transferToNodeMaterialEffect(e, t) {
    const i = p.Normalize(this.direction);
    return e.setFloat3(t, i.x, i.y, i.z), this;
  }
  /**
   * Computes the world matrix of the node
   * @returns the world matrix
   */
  computeWorldMatrix() {
    return this._worldMatrix || (this._worldMatrix = C.Identity()), this._worldMatrix;
  }
  /**
   * Returns the integer 3.
   * @returns The light Type id as a constant defines in Light.LIGHTTYPEID_x
   */
  getTypeID() {
    return xe.LIGHTTYPEID_HEMISPHERICLIGHT;
  }
  /**
   * Prepares the list of defines specific to the light type.
   * @param defines the list of defines
   * @param lightIndex defines the index of the light for the effect
   */
  prepareLightSpecificDefines(e, t) {
    e["HEMILIGHT" + t] = !0;
  }
}
Q([
  xt()
], Ie.prototype, "groundColor", void 0);
Q([
  ot()
], Ie.prototype, "direction", void 0);
const Lt = "bayerDitherFunctions", yt = `float bayerDither2(vec2 _P) {
return mod(2.0*_P.y+_P.x+1.0,4.0);
}
float bayerDither4(vec2 _P) {
vec2 P1=mod(_P,2.0); 
vec2 P2=floor(0.5*mod(_P,4.0)); 
return 4.0*bayerDither2(P1)+bayerDither2(P2);
}
float bayerDither8(vec2 _P) {
vec2 P1=mod(_P,2.0); 
vec2 P2=floor(0.5 *mod(_P,4.0)); 
vec2 P4=floor(0.25*mod(_P,8.0)); 
return 4.0*(4.0*bayerDither2(P1)+bayerDither2(P2))+bayerDither2(P4);
}
`;
F.IncludesShadersStore[Lt] = yt;
const Nt = "shadowMapFragmentExtraDeclaration", Ut = `#if SM_FLOAT==0
#include<packingFunctions>
#endif
#if SM_SOFTTRANSPARENTSHADOW==1
#include<bayerDitherFunctions>
uniform float softTransparentShadowSM;
#endif
varying float vDepthMetricSM;
#if SM_USEDISTANCE==1
uniform vec3 lightDataSM;
varying vec3 vPositionWSM;
#endif
uniform vec3 biasAndScaleSM;
uniform vec2 depthValuesSM;
#if defined(SM_DEPTHCLAMP) && SM_DEPTHCLAMP==1
varying float zSM;
#endif
`;
F.IncludesShadersStore[Nt] = Ut;
const Vt = "shadowMapFragment", zt = `float depthSM=vDepthMetricSM;
#if defined(SM_DEPTHCLAMP) && SM_DEPTHCLAMP==1
#if SM_USEDISTANCE==1
depthSM=(length(vPositionWSM-lightDataSM)+depthValuesSM.x)/depthValuesSM.y+biasAndScaleSM.x;
#else
#ifdef USE_REVERSE_DEPTHBUFFER
depthSM=(-zSM+depthValuesSM.x)/depthValuesSM.y+biasAndScaleSM.x;
#else
depthSM=(zSM+depthValuesSM.x)/depthValuesSM.y+biasAndScaleSM.x;
#endif
#endif
#ifdef USE_REVERSE_DEPTHBUFFER
gl_FragDepth=clamp(1.0-depthSM,0.0,1.0);
#else
gl_FragDepth=clamp(depthSM,0.0,1.0); 
#endif
#elif SM_USEDISTANCE==1
depthSM=(length(vPositionWSM-lightDataSM)+depthValuesSM.x)/depthValuesSM.y+biasAndScaleSM.x;
#endif
#if SM_ESM==1
depthSM=clamp(exp(-min(87.,biasAndScaleSM.z*depthSM)),0.,1.);
#endif
#if SM_FLOAT==1
gl_FragColor=vec4(depthSM,1.0,1.0,1.0);
#else
gl_FragColor=pack(depthSM);
#endif
return;`;
F.IncludesShadersStore[Vt] = zt;
const kt = "shadowMapPixelShader", Ht = `#include<shadowMapFragmentExtraDeclaration>
#ifdef ALPHATEXTURE
varying vec2 vUV;
uniform sampler2D diffuseSampler;
#endif
#include<clipPlaneFragmentDeclaration>
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void)
{
#include<clipPlaneFragment>
#ifdef ALPHATEXTURE
float alphaFromAlphaTexture=texture2D(diffuseSampler,vUV).a;
#ifdef ALPHATESTVALUE
if (alphaFromAlphaTexture<ALPHATESTVALUE)
discard;
#endif
#endif
#if SM_SOFTTRANSPARENTSHADOW==1
#ifdef ALPHATEXTURE
if ((bayerDither8(floor(mod(gl_FragCoord.xy,8.0))))/64.0>=softTransparentShadowSM*alphaFromAlphaTexture) discard;
#else
if ((bayerDither8(floor(mod(gl_FragCoord.xy,8.0))))/64.0>=softTransparentShadowSM) discard;
#endif
#endif
#include<shadowMapFragment>
}`;
F.ShadersStore[kt] = Ht;
const Wt = "sceneVertexDeclaration", Zt = `uniform mat4 viewProjection;
#ifdef MULTIVIEW
uniform mat4 viewProjectionR;
#endif
uniform mat4 view;
uniform mat4 projection;
uniform vec4 vEyePosition;
`;
F.IncludesShadersStore[Wt] = Zt;
const Xt = "meshVertexDeclaration", Qt = `uniform mat4 world;
uniform float visibility;
`;
F.IncludesShadersStore[Xt] = Qt;
const jt = "shadowMapVertexDeclaration", $t = `#include<sceneVertexDeclaration>
#include<meshVertexDeclaration>
`;
F.IncludesShadersStore[jt] = $t;
const Kt = "shadowMapUboDeclaration", Yt = `layout(std140,column_major) uniform;
#include<sceneUboDeclaration>
#include<meshUboDeclaration>
`;
F.IncludesShadersStore[Kt] = Yt;
const Gt = "shadowMapVertexExtraDeclaration", qt = `#if SM_NORMALBIAS==1
uniform vec3 lightDataSM;
#endif
uniform vec3 biasAndScaleSM;
uniform vec2 depthValuesSM;
varying float vDepthMetricSM;
#if SM_USEDISTANCE==1
varying vec3 vPositionWSM;
#endif
#if defined(SM_DEPTHCLAMP) && SM_DEPTHCLAMP==1
varying float zSM;
#endif
`;
F.IncludesShadersStore[Gt] = qt;
const Jt = "shadowMapVertexNormalBias", ei = `#if SM_NORMALBIAS==1
#if SM_DIRECTIONINLIGHTDATA==1
vec3 worldLightDirSM=normalize(-lightDataSM.xyz);
#else
vec3 directionToLightSM=lightDataSM.xyz-worldPos.xyz;
vec3 worldLightDirSM=normalize(directionToLightSM);
#endif
float ndlSM=dot(vNormalW,worldLightDirSM);
float sinNLSM=sqrt(1.0-ndlSM*ndlSM);
float normalBiasSM=biasAndScaleSM.y*sinNLSM;
worldPos.xyz-=vNormalW*normalBiasSM;
#endif
`;
F.IncludesShadersStore[Jt] = ei;
const ti = "shadowMapVertexMetric", ii = `#if SM_USEDISTANCE==1
vPositionWSM=worldPos.xyz;
#endif
#if SM_DEPTHTEXTURE==1
#ifdef IS_NDC_HALF_ZRANGE
#define BIASFACTOR 0.5
#else
#define BIASFACTOR 1.0
#endif
#ifdef USE_REVERSE_DEPTHBUFFER
gl_Position.z-=biasAndScaleSM.x*gl_Position.w*BIASFACTOR;
#else
gl_Position.z+=biasAndScaleSM.x*gl_Position.w*BIASFACTOR;
#endif
#endif
#if defined(SM_DEPTHCLAMP) && SM_DEPTHCLAMP==1
zSM=gl_Position.z;
gl_Position.z=0.0;
#elif SM_USEDISTANCE==0
#ifdef USE_REVERSE_DEPTHBUFFER
vDepthMetricSM=(-gl_Position.z+depthValuesSM.x)/depthValuesSM.y+biasAndScaleSM.x;
#else
vDepthMetricSM=(gl_Position.z+depthValuesSM.x)/depthValuesSM.y+biasAndScaleSM.x;
#endif
#endif
`;
F.IncludesShadersStore[ti] = ii;
const si = "shadowMapVertexShader", ri = `attribute vec3 position;
#ifdef NORMAL
attribute vec3 normal;
#endif
#include<bonesDeclaration>
#include<bakedVertexAnimationDeclaration>
#include<morphTargetsVertexGlobalDeclaration>
#include<morphTargetsVertexDeclaration>[0..maxSimultaneousMorphTargets]
#ifdef INSTANCES
attribute vec4 world0;
attribute vec4 world1;
attribute vec4 world2;
attribute vec4 world3;
#endif
#include<helperFunctions>
#include<__decl__shadowMapVertex>
#ifdef ALPHATEXTURE
varying vec2 vUV;
uniform mat4 diffuseMatrix;
#ifdef UV1
attribute vec2 uv;
#endif
#ifdef UV2
attribute vec2 uv2;
#endif
#endif
#include<shadowMapVertexExtraDeclaration>
#include<clipPlaneVertexDeclaration>
#define CUSTOM_VERTEX_DEFINITIONS
void main(void)
{
vec3 positionUpdated=position;
#ifdef UV1
vec2 uvUpdated=uv;
#endif
#ifdef NORMAL
vec3 normalUpdated=normal;
#endif
#include<morphTargetsVertexGlobal>
#include<morphTargetsVertex>[0..maxSimultaneousMorphTargets]
#include<instancesVertex>
#include<bonesVertex>
#include<bakedVertexAnimation>
vec4 worldPos=finalWorld*vec4(positionUpdated,1.0);
#ifdef NORMAL
mat3 normWorldSM=mat3(finalWorld);
#if defined(INSTANCES) && defined(THIN_INSTANCES)
vec3 vNormalW=normalUpdated/vec3(dot(normWorldSM[0],normWorldSM[0]),dot(normWorldSM[1],normWorldSM[1]),dot(normWorldSM[2],normWorldSM[2]));
vNormalW=normalize(normWorldSM*vNormalW);
#else
#ifdef NONUNIFORMSCALING
normWorldSM=transposeMat3(inverseMat3(normWorldSM));
#endif
vec3 vNormalW=normalize(normWorldSM*normalUpdated);
#endif
#endif
#include<shadowMapVertexNormalBias>
gl_Position=viewProjection*worldPos;
#include<shadowMapVertexMetric>
#ifdef ALPHATEXTURE
#ifdef UV1
vUV=vec2(diffuseMatrix*vec4(uvUpdated,1.0,0.0));
#endif
#ifdef UV2
vUV=vec2(diffuseMatrix*vec4(uv2,1.0,0.0));
#endif
#endif
#include<clipPlaneVertex>
}`;
F.ShadersStore[si] = ri;
const ni = "depthBoxBlurPixelShader", ai = `varying vec2 vUV;
uniform sampler2D textureSampler;
uniform vec2 screenSize;
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void)
{
vec4 colorDepth=vec4(0.0);
for (int x=-OFFSET; x<=OFFSET; x++)
for (int y=-OFFSET; y<=OFFSET; y++)
colorDepth+=texture2D(textureSampler,vUV+vec2(x,y)/screenSize);
gl_FragColor=(colorDepth/float((OFFSET*2+1)*(OFFSET*2+1)));
}`;
F.ShadersStore[ni] = ai;
const oi = "shadowMapFragmentSoftTransparentShadow", hi = `#if SM_SOFTTRANSPARENTSHADOW==1
if ((bayerDither8(floor(mod(gl_FragCoord.xy,8.0))))/64.0>=softTransparentShadowSM*alpha) discard;
#endif
`;
F.IncludesShadersStore[oi] = hi;
class u {
  /**
   * Gets the bias: offset applied on the depth preventing acnea (in light direction).
   */
  get bias() {
    return this._bias;
  }
  /**
   * Sets the bias: offset applied on the depth preventing acnea (in light direction).
   */
  set bias(e) {
    this._bias = e;
  }
  /**
   * Gets the normalBias: offset applied on the depth preventing acnea (along side the normal direction and proportional to the light/normal angle).
   */
  get normalBias() {
    return this._normalBias;
  }
  /**
   * Sets the normalBias: offset applied on the depth preventing acnea (along side the normal direction and proportional to the light/normal angle).
   */
  set normalBias(e) {
    this._normalBias = e;
  }
  /**
   * Gets the blur box offset: offset applied during the blur pass.
   * Only useful if useKernelBlur = false
   */
  get blurBoxOffset() {
    return this._blurBoxOffset;
  }
  /**
   * Sets the blur box offset: offset applied during the blur pass.
   * Only useful if useKernelBlur = false
   */
  set blurBoxOffset(e) {
    this._blurBoxOffset !== e && (this._blurBoxOffset = e, this._disposeBlurPostProcesses());
  }
  /**
   * Gets the blur scale: scale of the blurred texture compared to the main shadow map.
   * 2 means half of the size.
   */
  get blurScale() {
    return this._blurScale;
  }
  /**
   * Sets the blur scale: scale of the blurred texture compared to the main shadow map.
   * 2 means half of the size.
   */
  set blurScale(e) {
    this._blurScale !== e && (this._blurScale = e, this._disposeBlurPostProcesses());
  }
  /**
   * Gets the blur kernel: kernel size of the blur pass.
   * Only useful if useKernelBlur = true
   */
  get blurKernel() {
    return this._blurKernel;
  }
  /**
   * Sets the blur kernel: kernel size of the blur pass.
   * Only useful if useKernelBlur = true
   */
  set blurKernel(e) {
    this._blurKernel !== e && (this._blurKernel = e, this._disposeBlurPostProcesses());
  }
  /**
   * Gets whether the blur pass is a kernel blur (if true) or box blur.
   * Only useful in filtered mode (useBlurExponentialShadowMap...)
   */
  get useKernelBlur() {
    return this._useKernelBlur;
  }
  /**
   * Sets whether the blur pass is a kernel blur (if true) or box blur.
   * Only useful in filtered mode (useBlurExponentialShadowMap...)
   */
  set useKernelBlur(e) {
    this._useKernelBlur !== e && (this._useKernelBlur = e, this._disposeBlurPostProcesses());
  }
  /**
   * Gets the depth scale used in ESM mode.
   */
  get depthScale() {
    return this._depthScale !== void 0 ? this._depthScale : this._light.getDepthScale();
  }
  /**
   * Sets the depth scale used in ESM mode.
   * This can override the scale stored on the light.
   */
  set depthScale(e) {
    this._depthScale = e;
  }
  _validateFilter(e) {
    return e;
  }
  /**
   * Gets the current mode of the shadow generator (normal, PCF, ESM...).
   * The returned value is a number equal to one of the available mode defined in ShadowMap.FILTER_x like _FILTER_NONE
   */
  get filter() {
    return this._filter;
  }
  /**
   * Sets the current mode of the shadow generator (normal, PCF, ESM...).
   * The returned value is a number equal to one of the available mode defined in ShadowMap.FILTER_x like _FILTER_NONE
   */
  set filter(e) {
    if (e = this._validateFilter(e), this._light.needCube()) {
      if (e === u.FILTER_BLUREXPONENTIALSHADOWMAP) {
        this.useExponentialShadowMap = !0;
        return;
      } else if (e === u.FILTER_BLURCLOSEEXPONENTIALSHADOWMAP) {
        this.useCloseExponentialShadowMap = !0;
        return;
      } else if (e === u.FILTER_PCF || e === u.FILTER_PCSS) {
        this.usePoissonSampling = !0;
        return;
      }
    }
    if ((e === u.FILTER_PCF || e === u.FILTER_PCSS) && !this._scene.getEngine()._features.supportShadowSamplers) {
      this.usePoissonSampling = !0;
      return;
    }
    this._filter !== e && (this._filter = e, this._disposeBlurPostProcesses(), this._applyFilterValues(), this._light._markMeshesAsLightDirty());
  }
  /**
   * Gets if the current filter is set to Poisson Sampling.
   */
  get usePoissonSampling() {
    return this.filter === u.FILTER_POISSONSAMPLING;
  }
  /**
   * Sets the current filter to Poisson Sampling.
   */
  set usePoissonSampling(e) {
    const t = this._validateFilter(u.FILTER_POISSONSAMPLING);
    !e && this.filter !== u.FILTER_POISSONSAMPLING || (this.filter = e ? t : u.FILTER_NONE);
  }
  /**
   * Gets if the current filter is set to ESM.
   */
  get useExponentialShadowMap() {
    return this.filter === u.FILTER_EXPONENTIALSHADOWMAP;
  }
  /**
   * Sets the current filter is to ESM.
   */
  set useExponentialShadowMap(e) {
    const t = this._validateFilter(u.FILTER_EXPONENTIALSHADOWMAP);
    !e && this.filter !== u.FILTER_EXPONENTIALSHADOWMAP || (this.filter = e ? t : u.FILTER_NONE);
  }
  /**
   * Gets if the current filter is set to filtered ESM.
   */
  get useBlurExponentialShadowMap() {
    return this.filter === u.FILTER_BLUREXPONENTIALSHADOWMAP;
  }
  /**
   * Gets if the current filter is set to filtered  ESM.
   */
  set useBlurExponentialShadowMap(e) {
    const t = this._validateFilter(u.FILTER_BLUREXPONENTIALSHADOWMAP);
    !e && this.filter !== u.FILTER_BLUREXPONENTIALSHADOWMAP || (this.filter = e ? t : u.FILTER_NONE);
  }
  /**
   * Gets if the current filter is set to "close ESM" (using the inverse of the
   * exponential to prevent steep falloff artifacts).
   */
  get useCloseExponentialShadowMap() {
    return this.filter === u.FILTER_CLOSEEXPONENTIALSHADOWMAP;
  }
  /**
   * Sets the current filter to "close ESM" (using the inverse of the
   * exponential to prevent steep falloff artifacts).
   */
  set useCloseExponentialShadowMap(e) {
    const t = this._validateFilter(u.FILTER_CLOSEEXPONENTIALSHADOWMAP);
    !e && this.filter !== u.FILTER_CLOSEEXPONENTIALSHADOWMAP || (this.filter = e ? t : u.FILTER_NONE);
  }
  /**
   * Gets if the current filter is set to filtered "close ESM" (using the inverse of the
   * exponential to prevent steep falloff artifacts).
   */
  get useBlurCloseExponentialShadowMap() {
    return this.filter === u.FILTER_BLURCLOSEEXPONENTIALSHADOWMAP;
  }
  /**
   * Sets the current filter to filtered "close ESM" (using the inverse of the
   * exponential to prevent steep falloff artifacts).
   */
  set useBlurCloseExponentialShadowMap(e) {
    const t = this._validateFilter(u.FILTER_BLURCLOSEEXPONENTIALSHADOWMAP);
    !e && this.filter !== u.FILTER_BLURCLOSEEXPONENTIALSHADOWMAP || (this.filter = e ? t : u.FILTER_NONE);
  }
  /**
   * Gets if the current filter is set to "PCF" (percentage closer filtering).
   */
  get usePercentageCloserFiltering() {
    return this.filter === u.FILTER_PCF;
  }
  /**
   * Sets the current filter to "PCF" (percentage closer filtering).
   */
  set usePercentageCloserFiltering(e) {
    const t = this._validateFilter(u.FILTER_PCF);
    !e && this.filter !== u.FILTER_PCF || (this.filter = e ? t : u.FILTER_NONE);
  }
  /**
   * Gets the PCF or PCSS Quality.
   * Only valid if usePercentageCloserFiltering or usePercentageCloserFiltering is true.
   */
  get filteringQuality() {
    return this._filteringQuality;
  }
  /**
   * Sets the PCF or PCSS Quality.
   * Only valid if usePercentageCloserFiltering or usePercentageCloserFiltering is true.
   */
  set filteringQuality(e) {
    this._filteringQuality !== e && (this._filteringQuality = e, this._disposeBlurPostProcesses(), this._applyFilterValues(), this._light._markMeshesAsLightDirty());
  }
  /**
   * Gets if the current filter is set to "PCSS" (contact hardening).
   */
  get useContactHardeningShadow() {
    return this.filter === u.FILTER_PCSS;
  }
  /**
   * Sets the current filter to "PCSS" (contact hardening).
   */
  set useContactHardeningShadow(e) {
    const t = this._validateFilter(u.FILTER_PCSS);
    !e && this.filter !== u.FILTER_PCSS || (this.filter = e ? t : u.FILTER_NONE);
  }
  /**
   * Gets the Light Size (in shadow map uv unit) used in PCSS to determine the blocker search area and the penumbra size.
   * Using a ratio helps keeping shape stability independently of the map size.
   *
   * It does not account for the light projection as it was having too much
   * instability during the light setup or during light position changes.
   *
   * Only valid if useContactHardeningShadow is true.
   */
  get contactHardeningLightSizeUVRatio() {
    return this._contactHardeningLightSizeUVRatio;
  }
  /**
   * Sets the Light Size (in shadow map uv unit) used in PCSS to determine the blocker search area and the penumbra size.
   * Using a ratio helps keeping shape stability independently of the map size.
   *
   * It does not account for the light projection as it was having too much
   * instability during the light setup or during light position changes.
   *
   * Only valid if useContactHardeningShadow is true.
   */
  set contactHardeningLightSizeUVRatio(e) {
    this._contactHardeningLightSizeUVRatio = e;
  }
  /** Gets or sets the actual darkness of a shadow */
  get darkness() {
    return this._darkness;
  }
  set darkness(e) {
    this.setDarkness(e);
  }
  /**
   * Returns the darkness value (float). This can only decrease the actual darkness of a shadow.
   * 0 means strongest and 1 would means no shadow.
   * @returns the darkness.
   */
  getDarkness() {
    return this._darkness;
  }
  /**
   * Sets the darkness value (float). This can only decrease the actual darkness of a shadow.
   * @param darkness The darkness value 0 means strongest and 1 would means no shadow.
   * @returns the shadow generator allowing fluent coding.
   */
  setDarkness(e) {
    return e >= 1 ? this._darkness = 1 : e <= 0 ? this._darkness = 0 : this._darkness = e, this;
  }
  /** Gets or sets the ability to have transparent shadow  */
  get transparencyShadow() {
    return this._transparencyShadow;
  }
  set transparencyShadow(e) {
    this.setTransparencyShadow(e);
  }
  /**
   * Sets the ability to have transparent shadow (boolean).
   * @param transparent True if transparent else False
   * @returns the shadow generator allowing fluent coding
   */
  setTransparencyShadow(e) {
    return this._transparencyShadow = e, this;
  }
  /**
   * Gets the main RTT containing the shadow map (usually storing depth from the light point of view).
   * @returns The render target texture if present otherwise, null
   */
  getShadowMap() {
    return this._shadowMap;
  }
  /**
   * Gets the RTT used during rendering (can be a blurred version of the shadow map or the shadow map itself).
   * @returns The render target texture if the shadow map is present otherwise, null
   */
  getShadowMapForRendering() {
    return this._shadowMap2 ? this._shadowMap2 : this._shadowMap;
  }
  /**
   * Gets the class name of that object
   * @returns "ShadowGenerator"
   */
  getClassName() {
    return u.CLASSNAME;
  }
  /**
   * Helper function to add a mesh and its descendants to the list of shadow casters.
   * @param mesh Mesh to add
   * @param includeDescendants boolean indicating if the descendants should be added. Default to true
   * @returns the Shadow Generator itself
   */
  addShadowCaster(e, t = !0) {
    if (!this._shadowMap)
      return this;
    if (this._shadowMap.renderList || (this._shadowMap.renderList = []), this._shadowMap.renderList.indexOf(e) === -1 && this._shadowMap.renderList.push(e), t)
      for (const i of e.getChildMeshes())
        this._shadowMap.renderList.indexOf(i) === -1 && this._shadowMap.renderList.push(i);
    return this;
  }
  /**
   * Helper function to remove a mesh and its descendants from the list of shadow casters
   * @param mesh Mesh to remove
   * @param includeDescendants boolean indicating if the descendants should be removed. Default to true
   * @returns the Shadow Generator itself
   */
  removeShadowCaster(e, t = !0) {
    if (!this._shadowMap || !this._shadowMap.renderList)
      return this;
    const i = this._shadowMap.renderList.indexOf(e);
    if (i !== -1 && this._shadowMap.renderList.splice(i, 1), t)
      for (const s of e.getChildren())
        this.removeShadowCaster(s);
    return this;
  }
  /**
   * Returns the associated light object.
   * @returns the light generating the shadow
   */
  getLight() {
    return this._light;
  }
  _getCamera() {
    var e;
    return (e = this._camera) !== null && e !== void 0 ? e : this._scene.activeCamera;
  }
  /**
   * Gets or sets the size of the texture what stores the shadows
   */
  get mapSize() {
    return this._mapSize;
  }
  set mapSize(e) {
    this._mapSize = e, this._light._markMeshesAsLightDirty(), this.recreateShadowMap();
  }
  /**
   * Creates a ShadowGenerator object.
   * A ShadowGenerator is the required tool to use the shadows.
   * Each light casting shadows needs to use its own ShadowGenerator.
   * Documentation : https://doc.babylonjs.com/features/featuresDeepDive/lights/shadows
   * @param mapSize The size of the texture what stores the shadows. Example : 1024.
   * @param light The light object generating the shadows.
   * @param usefullFloatFirst By default the generator will try to use half float textures but if you need precision (for self shadowing for instance), you can use this option to enforce full float texture.
   * @param camera Camera associated with this shadow generator (default: null). If null, takes the scene active camera at the time we need to access it
   */
  constructor(e, t, i, s) {
    this.onBeforeShadowMapRenderObservable = new se(), this.onAfterShadowMapRenderObservable = new se(), this.onBeforeShadowMapRenderMeshObservable = new se(), this.onAfterShadowMapRenderMeshObservable = new se(), this._bias = 5e-5, this._normalBias = 0, this._blurBoxOffset = 1, this._blurScale = 2, this._blurKernel = 1, this._useKernelBlur = !1, this._filter = u.FILTER_NONE, this._filteringQuality = u.QUALITY_HIGH, this._contactHardeningLightSizeUVRatio = 0.1, this._darkness = 0, this._transparencyShadow = !1, this.enableSoftTransparentShadow = !1, this.useOpacityTextureForTransparentShadow = !1, this.frustumEdgeFalloff = 0, this.forceBackFacesOnly = !1, this._lightDirection = p.Zero(), this._viewMatrix = C.Zero(), this._projectionMatrix = C.Zero(), this._transformMatrix = C.Zero(), this._cachedPosition = new p(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE), this._cachedDirection = new p(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE), this._currentFaceIndex = 0, this._currentFaceIndexCache = 0, this._defaultTextureMatrix = C.Identity(), this._mapSize = e, this._light = t, this._scene = t.getScene(), this._camera = s ?? null;
    let r = t._shadowGenerators;
    r || (r = t._shadowGenerators = /* @__PURE__ */ new Map()), r.set(this._camera, this), this.id = t.id, this._useUBO = this._scene.getEngine().supportsUniformBuffers, this._useUBO && (this._sceneUBOs = [], this._sceneUBOs.push(this._scene.createSceneUniformBuffer(`Scene for Shadow Generator (light "${this._light.name}")`))), u._SceneComponentInitialization(this._scene);
    const n = this._scene.getEngine().getCaps();
    i ? n.textureFloatRender && n.textureFloatLinearFiltering ? this._textureType = 1 : n.textureHalfFloatRender && n.textureHalfFloatLinearFiltering ? this._textureType = 2 : this._textureType = 0 : n.textureHalfFloatRender && n.textureHalfFloatLinearFiltering ? this._textureType = 2 : n.textureFloatRender && n.textureFloatLinearFiltering ? this._textureType = 1 : this._textureType = 0, this._initializeGenerator(), this._applyFilterValues();
  }
  _initializeGenerator() {
    this._light._markMeshesAsLightDirty(), this._initializeShadowMap();
  }
  _createTargetRenderTexture() {
    const e = this._scene.getEngine();
    e._features.supportDepthStencilTexture ? (this._shadowMap = new Se(this._light.name + "_shadowMap", this._mapSize, this._scene, !1, !0, this._textureType, this._light.needCube(), void 0, !1, !1), this._shadowMap.createDepthStencilTexture(e.useReverseDepthBuffer ? 516 : 513, !0)) : this._shadowMap = new Se(this._light.name + "_shadowMap", this._mapSize, this._scene, !1, !0, this._textureType, this._light.needCube());
  }
  _initializeShadowMap() {
    if (this._createTargetRenderTexture(), this._shadowMap === null)
      return;
    this._shadowMap.wrapU = B.CLAMP_ADDRESSMODE, this._shadowMap.wrapV = B.CLAMP_ADDRESSMODE, this._shadowMap.anisotropicFilteringLevel = 1, this._shadowMap.updateSamplingMode(B.BILINEAR_SAMPLINGMODE), this._shadowMap.renderParticles = !1, this._shadowMap.ignoreCameraViewport = !0, this._storedUniqueId && (this._shadowMap.uniqueId = this._storedUniqueId), this._shadowMap.customRenderFunction = this._renderForShadowMap.bind(this), this._shadowMap.customIsReadyFunction = () => !0;
    const e = this._scene.getEngine();
    this._shadowMap.onBeforeBindObservable.add(() => {
      var s;
      this._currentSceneUBO = this._scene.getSceneUniformBuffer(), (s = e._debugPushGroup) === null || s === void 0 || s.call(e, `shadow map generation for pass id ${e.currentRenderPassId}`, 1);
    }), this._shadowMap.onBeforeRenderObservable.add((s) => {
      this._sceneUBOs && this._scene.setSceneUniformBuffer(this._sceneUBOs[0]), this._currentFaceIndex = s, this._filter === u.FILTER_PCF && e.setColorWrite(!1), this.getTransformMatrix(), this._scene.setTransformMatrix(this._viewMatrix, this._projectionMatrix), this._useUBO && (this._scene.getSceneUniformBuffer().unbindEffect(), this._scene.finalizeSceneUbo());
    }), this._shadowMap.onAfterUnbindObservable.add(() => {
      var s, r;
      if (this._sceneUBOs && this._scene.setSceneUniformBuffer(this._currentSceneUBO), this._scene.updateTransformMatrix(), this._filter === u.FILTER_PCF && e.setColorWrite(!0), !this.useBlurExponentialShadowMap && !this.useBlurCloseExponentialShadowMap) {
        (s = e._debugPopGroup) === null || s === void 0 || s.call(e, 1);
        return;
      }
      const n = this.getShadowMapForRendering();
      n && (this._scene.postProcessManager.directRender(this._blurPostProcesses, n.renderTarget, !0), e.unBindFramebuffer(n.renderTarget, !0), (r = e._debugPopGroup) === null || r === void 0 || r.call(e, 1));
    });
    const t = new me(0, 0, 0, 0), i = new me(1, 1, 1, 1);
    this._shadowMap.onClearObservable.add((s) => {
      this._filter === u.FILTER_PCF ? s.clear(i, !1, !0, !1) : this.useExponentialShadowMap || this.useBlurExponentialShadowMap ? s.clear(t, !0, !0, !1) : s.clear(i, !0, !0, !1);
    }), this._shadowMap.onResizeObservable.add((s) => {
      this._storedUniqueId = this._shadowMap.uniqueId, this._mapSize = s.getRenderSize(), this._light._markMeshesAsLightDirty(), this.recreateShadowMap();
    });
    for (let s = Je.MIN_RENDERINGGROUPS; s < Je.MAX_RENDERINGGROUPS; s++)
      this._shadowMap.setRenderingAutoClearDepthStencil(s, !1);
  }
  _initializeBlurRTTAndPostProcesses() {
    const e = this._scene.getEngine(), t = this._mapSize / this.blurScale;
    (!this.useKernelBlur || this.blurScale !== 1) && (this._shadowMap2 = new Se(this._light.name + "_shadowMap2", t, this._scene, !1, !0, this._textureType, void 0, void 0, !1), this._shadowMap2.wrapU = B.CLAMP_ADDRESSMODE, this._shadowMap2.wrapV = B.CLAMP_ADDRESSMODE, this._shadowMap2.updateSamplingMode(B.BILINEAR_SAMPLINGMODE)), this.useKernelBlur ? (this._kernelBlurXPostprocess = new et(this._light.name + "KernelBlurX", new He(1, 0), this.blurKernel, 1, null, B.BILINEAR_SAMPLINGMODE, e, !1, this._textureType), this._kernelBlurXPostprocess.width = t, this._kernelBlurXPostprocess.height = t, this._kernelBlurXPostprocess.externalTextureSamplerBinding = !0, this._kernelBlurXPostprocess.onApplyObservable.add((i) => {
      i.setTexture("textureSampler", this._shadowMap);
    }), this._kernelBlurYPostprocess = new et(this._light.name + "KernelBlurY", new He(0, 1), this.blurKernel, 1, null, B.BILINEAR_SAMPLINGMODE, e, !1, this._textureType), this._kernelBlurXPostprocess.autoClear = !1, this._kernelBlurYPostprocess.autoClear = !1, this._textureType === 0 && (this._kernelBlurXPostprocess.packedFloat = !0, this._kernelBlurYPostprocess.packedFloat = !0), this._blurPostProcesses = [this._kernelBlurXPostprocess, this._kernelBlurYPostprocess]) : (this._boxBlurPostprocess = new We(this._light.name + "DepthBoxBlur", "depthBoxBlur", ["screenSize", "boxOffset"], [], 1, null, B.BILINEAR_SAMPLINGMODE, e, !1, "#define OFFSET " + this._blurBoxOffset, this._textureType), this._boxBlurPostprocess.externalTextureSamplerBinding = !0, this._boxBlurPostprocess.onApplyObservable.add((i) => {
      i.setFloat2("screenSize", t, t), i.setTexture("textureSampler", this._shadowMap);
    }), this._boxBlurPostprocess.autoClear = !1, this._blurPostProcesses = [this._boxBlurPostprocess]);
  }
  _renderForShadowMap(e, t, i, s) {
    let r;
    if (s.length)
      for (r = 0; r < s.length; r++)
        this._renderSubMeshForShadowMap(s.data[r]);
    for (r = 0; r < e.length; r++)
      this._renderSubMeshForShadowMap(e.data[r]);
    for (r = 0; r < t.length; r++)
      this._renderSubMeshForShadowMap(t.data[r]);
    if (this._transparencyShadow)
      for (r = 0; r < i.length; r++)
        this._renderSubMeshForShadowMap(i.data[r], !0);
    else
      for (r = 0; r < i.length; r++)
        i.data[r].getEffectiveMesh()._internalAbstractMeshDataInfo._isActiveIntermediate = !1;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _bindCustomEffectForRenderSubMeshForShadowMap(e, t, i) {
    t.setMatrix("viewProjection", this.getTransformMatrix());
  }
  _renderSubMeshForShadowMap(e, t = !1) {
    var i, s;
    const r = e.getRenderingMesh(), n = e.getEffectiveMesh(), a = this._scene, o = a.getEngine(), c = e.getMaterial();
    if (n._internalAbstractMeshDataInfo._isActiveIntermediate = !1, !c || e.verticesCount === 0 || e._renderId === a.getRenderId())
      return;
    const d = n._getWorldMatrixDeterminant() < 0;
    let h = (i = r.overrideMaterialSideOrientation) !== null && i !== void 0 ? i : c.sideOrientation;
    d && (h = h === 0 ? 1 : 0);
    const m = h === 0;
    o.setState(c.backFaceCulling, void 0, void 0, m, c.cullBackFaces);
    const x = r._getInstancesRenderList(e._id, !!e.getReplacementMesh());
    if (x.mustReturn)
      return;
    const S = o.getCaps().instancedArrays && (x.visibleInstances[e._id] !== null && x.visibleInstances[e._id] !== void 0 || r.hasThinInstances);
    if (!(this.customAllowRendering && !this.customAllowRendering(e)))
      if (this.isReady(e, S, t)) {
        e._renderId = a.getRenderId();
        const _ = c.shadowDepthWrapper, T = (s = _ == null ? void 0 : _.getEffect(e, this, o.currentRenderPassId)) !== null && s !== void 0 ? s : e._getDrawWrapper(), g = Tt.GetEffect(T);
        o.enableEffect(T), S || r._bind(e, g, c.fillMode), this.getTransformMatrix(), g.setFloat3("biasAndScaleSM", this.bias, this.normalBias, this.depthScale), this.getLight().getTypeID() === xe.LIGHTTYPEID_DIRECTIONALLIGHT ? g.setVector3("lightDataSM", this._cachedDirection) : g.setVector3("lightDataSM", this._cachedPosition);
        const E = this._getCamera();
        if (E && g.setFloat2("depthValuesSM", this.getLight().getDepthMinZ(E), this.getLight().getDepthMinZ(E) + this.getLight().getDepthMaxZ(E)), t && this.enableSoftTransparentShadow && g.setFloat("softTransparentShadowSM", n.visibility * c.alpha), _)
          e._setMainDrawWrapperOverride(T), _.standalone ? _.baseMaterial.bindForSubMesh(n.getWorldMatrix(), r, e) : c.bindForSubMesh(n.getWorldMatrix(), r, e), e._setMainDrawWrapperOverride(null);
        else {
          if (this._opacityTexture && (g.setTexture("diffuseSampler", this._opacityTexture), g.setMatrix("diffuseMatrix", this._opacityTexture.getTextureMatrix() || this._defaultTextureMatrix)), r.useBones && r.computeBonesUsingShaders && r.skeleton) {
            const w = r.skeleton;
            if (w.isUsingTextureForMatrices) {
              const z = w.getTransformMatrixTexture(r);
              if (!z)
                return;
              g.setTexture("boneSampler", z), g.setFloat("boneTextureWidth", 4 * (w.bones.length + 1));
            } else
              g.setMatrices("mBones", w.getTransformMatrices(r));
          }
          L.BindMorphTargetParameters(r, g), r.morphTargetManager && r.morphTargetManager.isUsingTextureForTargets && r.morphTargetManager._bind(g), Qe(g, c, a);
        }
        !this._useUBO && !_ && this._bindCustomEffectForRenderSubMeshForShadowMap(e, g, n), L.BindSceneUniformBuffer(g, this._scene.getSceneUniformBuffer()), this._scene.getSceneUniformBuffer().bindUniformBuffer();
        const P = n.getWorldMatrix();
        S && (n.getMeshUniformBuffer().bindToEffect(g, "Mesh"), n.transferToEffect(P)), this.forceBackFacesOnly && o.setState(!0, 0, !1, !0, c.cullBackFaces), this.onBeforeShadowMapRenderMeshObservable.notifyObservers(r), this.onBeforeShadowMapRenderObservable.notifyObservers(g), r._processRendering(n, e, g, c.fillMode, x, S, (w, z) => {
          n !== r && !w ? (r.getMeshUniformBuffer().bindToEffect(g, "Mesh"), r.transferToEffect(z)) : (n.getMeshUniformBuffer().bindToEffect(g, "Mesh"), n.transferToEffect(w ? z : P));
        }), this.forceBackFacesOnly && o.setState(!0, 0, !1, !1, c.cullBackFaces), this.onAfterShadowMapRenderObservable.notifyObservers(g), this.onAfterShadowMapRenderMeshObservable.notifyObservers(r);
      } else
        this._shadowMap && this._shadowMap.resetRefreshCounter();
  }
  _applyFilterValues() {
    this._shadowMap && (this.filter === u.FILTER_NONE || this.filter === u.FILTER_PCSS ? this._shadowMap.updateSamplingMode(B.NEAREST_SAMPLINGMODE) : this._shadowMap.updateSamplingMode(B.BILINEAR_SAMPLINGMODE));
  }
  /**
   * Forces all the attached effect to compile to enable rendering only once ready vs. lazily compiling effects.
   * @param onCompiled Callback triggered at the and of the effects compilation
   * @param options Sets of optional options forcing the compilation with different modes
   */
  forceCompilation(e, t) {
    const i = {
      useInstances: !1,
      ...t
    }, s = this.getShadowMap();
    if (!s) {
      e && e(this);
      return;
    }
    const r = s.renderList;
    if (!r) {
      e && e(this);
      return;
    }
    const n = new Array();
    for (const c of r)
      n.push(...c.subMeshes);
    if (n.length === 0) {
      e && e(this);
      return;
    }
    let a = 0;
    const o = () => {
      var c, d;
      if (!(!this._scene || !this._scene.getEngine())) {
        for (; this.isReady(n[a], i.useInstances, (d = (c = n[a].getMaterial()) === null || c === void 0 ? void 0 : c.needAlphaBlendingForMesh(n[a].getMesh())) !== null && d !== void 0 ? d : !1); )
          if (a++, a >= n.length) {
            e && e(this);
            return;
          }
        setTimeout(o, 16);
      }
    };
    o();
  }
  /**
   * Forces all the attached effect to compile to enable rendering only once ready vs. lazily compiling effects.
   * @param options Sets of optional options forcing the compilation with different modes
   * @returns A promise that resolves when the compilation completes
   */
  forceCompilationAsync(e) {
    return new Promise((t) => {
      this.forceCompilation(() => {
        t();
      }, e);
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _isReadyCustomDefines(e, t, i) {
  }
  _prepareShadowDefines(e, t, i, s) {
    i.push("#define SM_LIGHTTYPE_" + this._light.getClassName().toUpperCase()), i.push("#define SM_FLOAT " + (this._textureType !== 0 ? "1" : "0")), i.push("#define SM_ESM " + (this.useExponentialShadowMap || this.useBlurExponentialShadowMap ? "1" : "0")), i.push("#define SM_DEPTHTEXTURE " + (this.usePercentageCloserFiltering || this.useContactHardeningShadow ? "1" : "0"));
    const r = e.getMesh();
    return i.push("#define SM_NORMALBIAS " + (this.normalBias && r.isVerticesDataPresent(v.NormalKind) ? "1" : "0")), i.push("#define SM_DIRECTIONINLIGHTDATA " + (this.getLight().getTypeID() === xe.LIGHTTYPEID_DIRECTIONALLIGHT ? "1" : "0")), i.push("#define SM_USEDISTANCE " + (this._light.needCube() ? "1" : "0")), i.push("#define SM_SOFTTRANSPARENTSHADOW " + (this.enableSoftTransparentShadow && s ? "1" : "0")), this._isReadyCustomDefines(i, e, t), i;
  }
  /**
   * Determine whether the shadow generator is ready or not (mainly all effects and related post processes needs to be ready).
   * @param subMesh The submesh we want to render in the shadow map
   * @param useInstances Defines whether will draw in the map using instances
   * @param isTransparent Indicates that isReady is called for a transparent subMesh
   * @returns true if ready otherwise, false
   */
  isReady(e, t, i) {
    var s;
    const r = e.getMaterial(), n = r == null ? void 0 : r.shadowDepthWrapper;
    if (this._opacityTexture = null, !r)
      return !1;
    const a = [];
    if (this._prepareShadowDefines(e, t, a, i), n) {
      if (!n.isReadyForSubMesh(e, a, this, t, this._scene.getEngine().currentRenderPassId))
        return !1;
    } else {
      const o = e._getDrawWrapper(void 0, !0);
      let c = o.effect, d = o.defines;
      const h = [v.PositionKind], m = e.getMesh();
      this.normalBias && m.isVerticesDataPresent(v.NormalKind) && (h.push(v.NormalKind), a.push("#define NORMAL"), m.nonUniformScaling && a.push("#define NONUNIFORMSCALING"));
      const x = r.needAlphaTesting();
      if ((x || r.needAlphaBlending()) && (this.useOpacityTextureForTransparentShadow ? this._opacityTexture = r.opacityTexture : this._opacityTexture = r.getAlphaTestTexture(), this._opacityTexture)) {
        if (!this._opacityTexture.isReady())
          return !1;
        const E = (s = r.alphaCutOff) !== null && s !== void 0 ? s : u.DEFAULT_ALPHA_CUTOFF;
        a.push("#define ALPHATEXTURE"), x && a.push(`#define ALPHATESTVALUE ${E}${E % 1 === 0 ? "." : ""}`), m.isVerticesDataPresent(v.UVKind) && (h.push(v.UVKind), a.push("#define UV1")), m.isVerticesDataPresent(v.UV2Kind) && this._opacityTexture.coordinatesIndex === 1 && (h.push(v.UV2Kind), a.push("#define UV2"));
      }
      const S = new ct();
      if (m.useBones && m.computeBonesUsingShaders && m.skeleton) {
        h.push(v.MatricesIndicesKind), h.push(v.MatricesWeightsKind), m.numBoneInfluencers > 4 && (h.push(v.MatricesIndicesExtraKind), h.push(v.MatricesWeightsExtraKind));
        const E = m.skeleton;
        a.push("#define NUM_BONE_INFLUENCERS " + m.numBoneInfluencers), m.numBoneInfluencers > 0 && S.addCPUSkinningFallback(0, m), E.isUsingTextureForMatrices ? a.push("#define BONETEXTURE") : a.push("#define BonesPerMesh " + (E.bones.length + 1));
      } else
        a.push("#define NUM_BONE_INFLUENCERS 0");
      const _ = m.morphTargetManager;
      let T = 0;
      if (_ && _.numInfluencers > 0 && (a.push("#define MORPHTARGETS"), T = _.numInfluencers, a.push("#define NUM_MORPH_INFLUENCERS " + T), _.isUsingTextureForTargets && a.push("#define MORPHTARGETS_TEXTURE"), L.PrepareAttributesForMorphTargetsInfluencers(h, m, T)), lt(r, this._scene, a), t && (a.push("#define INSTANCES"), L.PushAttributesForInstances(h), e.getRenderingMesh().hasThinInstances && a.push("#define THIN_INSTANCES")), this.customShaderOptions && this.customShaderOptions.defines)
        for (const E of this.customShaderOptions.defines)
          a.indexOf(E) === -1 && a.push(E);
      const g = a.join(`
`);
      if (d !== g) {
        d = g;
        let E = "shadowMap";
        const P = [
          "world",
          "mBones",
          "viewProjection",
          "diffuseMatrix",
          "lightDataSM",
          "depthValuesSM",
          "biasAndScaleSM",
          "morphTargetInfluences",
          "boneTextureWidth",
          "softTransparentShadowSM",
          "morphTargetTextureInfo",
          "morphTargetTextureIndices"
        ], w = ["diffuseSampler", "boneSampler", "morphTargets"], z = ["Scene", "Mesh"];
        if (je(P), this.customShaderOptions) {
          if (E = this.customShaderOptions.shaderName, this.customShaderOptions.attributes)
            for (const M of this.customShaderOptions.attributes)
              h.indexOf(M) === -1 && h.push(M);
          if (this.customShaderOptions.uniforms)
            for (const M of this.customShaderOptions.uniforms)
              P.indexOf(M) === -1 && P.push(M);
          if (this.customShaderOptions.samplers)
            for (const M of this.customShaderOptions.samplers)
              w.indexOf(M) === -1 && w.push(M);
        }
        const k = this._scene.getEngine();
        c = k.createEffect(E, {
          attributes: h,
          uniformsNames: P,
          uniformBuffersNames: z,
          samplers: w,
          defines: g,
          fallbacks: S,
          onCompiled: null,
          onError: null,
          indexParameters: { maxSimultaneousMorphTargets: T }
        }, k), o.setEffect(c, d);
      }
      if (!c.isReady())
        return !1;
    }
    return (this.useBlurExponentialShadowMap || this.useBlurCloseExponentialShadowMap) && (!this._blurPostProcesses || !this._blurPostProcesses.length) && this._initializeBlurRTTAndPostProcesses(), !(this._kernelBlurXPostprocess && !this._kernelBlurXPostprocess.isReady() || this._kernelBlurYPostprocess && !this._kernelBlurYPostprocess.isReady() || this._boxBlurPostprocess && !this._boxBlurPostprocess.isReady());
  }
  /**
   * Prepare all the defines in a material relying on a shadow map at the specified light index.
   * @param defines Defines of the material we want to update
   * @param lightIndex Index of the light in the enabled light list of the material
   */
  prepareDefines(e, t) {
    const i = this._scene, s = this._light;
    !i.shadowsEnabled || !s.shadowEnabled || (e["SHADOW" + t] = !0, this.useContactHardeningShadow ? (e["SHADOWPCSS" + t] = !0, this._filteringQuality === u.QUALITY_LOW ? e["SHADOWLOWQUALITY" + t] = !0 : this._filteringQuality === u.QUALITY_MEDIUM && (e["SHADOWMEDIUMQUALITY" + t] = !0)) : this.usePercentageCloserFiltering ? (e["SHADOWPCF" + t] = !0, this._filteringQuality === u.QUALITY_LOW ? e["SHADOWLOWQUALITY" + t] = !0 : this._filteringQuality === u.QUALITY_MEDIUM && (e["SHADOWMEDIUMQUALITY" + t] = !0)) : this.usePoissonSampling ? e["SHADOWPOISSON" + t] = !0 : this.useExponentialShadowMap || this.useBlurExponentialShadowMap ? e["SHADOWESM" + t] = !0 : (this.useCloseExponentialShadowMap || this.useBlurCloseExponentialShadowMap) && (e["SHADOWCLOSEESM" + t] = !0), s.needCube() && (e["SHADOWCUBE" + t] = !0));
  }
  /**
   * Binds the shadow related information inside of an effect (information like near, far, darkness...
   * defined in the generator but impacting the effect).
   * @param lightIndex Index of the light in the enabled light list of the material owning the effect
   * @param effect The effect we are binding the information for
   */
  bindShadowLight(e, t) {
    const i = this._light;
    if (!this._scene.shadowsEnabled || !i.shadowEnabled)
      return;
    const r = this._getCamera();
    if (!r)
      return;
    const n = this.getShadowMap();
    n && (i.needCube() || t.setMatrix("lightMatrix" + e, this.getTransformMatrix()), this._filter === u.FILTER_PCF ? (t.setDepthStencilTexture("shadowSampler" + e, this.getShadowMapForRendering()), i._uniformBuffer.updateFloat4("shadowsInfo", this.getDarkness(), n.getSize().width, 1 / n.getSize().width, this.frustumEdgeFalloff, e)) : this._filter === u.FILTER_PCSS ? (t.setDepthStencilTexture("shadowSampler" + e, this.getShadowMapForRendering()), t.setTexture("depthSampler" + e, this.getShadowMapForRendering()), i._uniformBuffer.updateFloat4("shadowsInfo", this.getDarkness(), 1 / n.getSize().width, this._contactHardeningLightSizeUVRatio * n.getSize().width, this.frustumEdgeFalloff, e)) : (t.setTexture("shadowSampler" + e, this.getShadowMapForRendering()), i._uniformBuffer.updateFloat4("shadowsInfo", this.getDarkness(), this.blurScale / n.getSize().width, this.depthScale, this.frustumEdgeFalloff, e)), i._uniformBuffer.updateFloat2("depthValues", this.getLight().getDepthMinZ(r), this.getLight().getDepthMinZ(r) + this.getLight().getDepthMaxZ(r), e));
  }
  /**
   * Gets the transformation matrix used to project the meshes into the map from the light point of view.
   * (eq to shadow projection matrix * light transform matrix)
   * @returns The transform matrix used to create the shadow map
   */
  getTransformMatrix() {
    const e = this._scene;
    if (this._currentRenderId === e.getRenderId() && this._currentFaceIndexCache === this._currentFaceIndex)
      return this._transformMatrix;
    this._currentRenderId = e.getRenderId(), this._currentFaceIndexCache = this._currentFaceIndex;
    let t = this._light.position;
    if (this._light.computeTransformedInformation() && (t = this._light.transformedPosition), p.NormalizeToRef(this._light.getShadowDirection(this._currentFaceIndex), this._lightDirection), Math.abs(p.Dot(this._lightDirection, p.Up())) === 1 && (this._lightDirection.z = 1e-13), this._light.needProjectionMatrixCompute() || !this._cachedPosition || !this._cachedDirection || !t.equals(this._cachedPosition) || !this._lightDirection.equals(this._cachedDirection)) {
      this._cachedPosition.copyFrom(t), this._cachedDirection.copyFrom(this._lightDirection), C.LookAtLHToRef(t, t.add(this._lightDirection), p.Up(), this._viewMatrix);
      const i = this.getShadowMap();
      if (i) {
        const s = i.renderList;
        s && this._light.setShadowProjectionMatrix(this._projectionMatrix, this._viewMatrix, s);
      }
      this._viewMatrix.multiplyToRef(this._projectionMatrix, this._transformMatrix);
    }
    return this._transformMatrix;
  }
  /**
   * Recreates the shadow map dependencies like RTT and post processes. This can be used during the switch between
   * Cube and 2D textures for instance.
   */
  recreateShadowMap() {
    const e = this._shadowMap;
    if (!e)
      return;
    const t = e.renderList;
    if (this._disposeRTTandPostProcesses(), this._initializeGenerator(), this.filter = this._filter, this._applyFilterValues(), t) {
      this._shadowMap.renderList || (this._shadowMap.renderList = []);
      for (const i of t)
        this._shadowMap.renderList.push(i);
    } else
      this._shadowMap.renderList = null;
  }
  _disposeBlurPostProcesses() {
    this._shadowMap2 && (this._shadowMap2.dispose(), this._shadowMap2 = null), this._boxBlurPostprocess && (this._boxBlurPostprocess.dispose(), this._boxBlurPostprocess = null), this._kernelBlurXPostprocess && (this._kernelBlurXPostprocess.dispose(), this._kernelBlurXPostprocess = null), this._kernelBlurYPostprocess && (this._kernelBlurYPostprocess.dispose(), this._kernelBlurYPostprocess = null), this._blurPostProcesses = [];
  }
  _disposeRTTandPostProcesses() {
    this._shadowMap && (this._shadowMap.dispose(), this._shadowMap = null), this._disposeBlurPostProcesses();
  }
  _disposeSceneUBOs() {
    if (this._sceneUBOs) {
      for (const e of this._sceneUBOs)
        e.dispose();
      this._sceneUBOs = [];
    }
  }
  /**
   * Disposes the ShadowGenerator.
   * Returns nothing.
   */
  dispose() {
    if (this._disposeRTTandPostProcesses(), this._disposeSceneUBOs(), this._light) {
      if (this._light._shadowGenerators) {
        const e = this._light._shadowGenerators.entries();
        for (let t = e.next(); t.done !== !0; t = e.next()) {
          const [i, s] = t.value;
          s === this && this._light._shadowGenerators.delete(i);
        }
        this._light._shadowGenerators.size === 0 && (this._light._shadowGenerators = null);
      }
      this._light._markMeshesAsLightDirty();
    }
    this.onBeforeShadowMapRenderMeshObservable.clear(), this.onBeforeShadowMapRenderObservable.clear(), this.onAfterShadowMapRenderMeshObservable.clear(), this.onAfterShadowMapRenderObservable.clear();
  }
  /**
   * Serializes the shadow generator setup to a json object.
   * @returns The serialized JSON object
   */
  serialize() {
    var e;
    const t = {}, i = this.getShadowMap();
    if (!i)
      return t;
    if (t.className = this.getClassName(), t.lightId = this._light.id, t.cameraId = (e = this._camera) === null || e === void 0 ? void 0 : e.id, t.id = this.id, t.mapSize = i.getRenderSize(), t.forceBackFacesOnly = this.forceBackFacesOnly, t.darkness = this.getDarkness(), t.transparencyShadow = this._transparencyShadow, t.frustumEdgeFalloff = this.frustumEdgeFalloff, t.bias = this.bias, t.normalBias = this.normalBias, t.usePercentageCloserFiltering = this.usePercentageCloserFiltering, t.useContactHardeningShadow = this.useContactHardeningShadow, t.contactHardeningLightSizeUVRatio = this.contactHardeningLightSizeUVRatio, t.filteringQuality = this.filteringQuality, t.useExponentialShadowMap = this.useExponentialShadowMap, t.useBlurExponentialShadowMap = this.useBlurExponentialShadowMap, t.useCloseExponentialShadowMap = this.useBlurExponentialShadowMap, t.useBlurCloseExponentialShadowMap = this.useBlurExponentialShadowMap, t.usePoissonSampling = this.usePoissonSampling, t.depthScale = this.depthScale, t.blurBoxOffset = this.blurBoxOffset, t.blurKernel = this.blurKernel, t.blurScale = this.blurScale, t.useKernelBlur = this.useKernelBlur, t.renderList = [], i.renderList)
      for (let s = 0; s < i.renderList.length; s++) {
        const r = i.renderList[s];
        t.renderList.push(r.id);
      }
    return t;
  }
  /**
   * Parses a serialized ShadowGenerator and returns a new ShadowGenerator.
   * @param parsedShadowGenerator The JSON object to parse
   * @param scene The scene to create the shadow map for
   * @param constr A function that builds a shadow generator or undefined to create an instance of the default shadow generator
   * @returns The parsed shadow generator
   */
  static Parse(e, t, i) {
    const s = t.getLightById(e.lightId), r = e.cameraId !== void 0 ? t.getCameraById(e.cameraId) : null, n = i ? i(e.mapSize, s, r) : new u(e.mapSize, s, void 0, r), a = n.getShadowMap();
    for (let o = 0; o < e.renderList.length; o++)
      t.getMeshesById(e.renderList[o]).forEach(function(d) {
        a && (a.renderList || (a.renderList = []), a.renderList.push(d));
      });
    return e.id !== void 0 && (n.id = e.id), n.forceBackFacesOnly = !!e.forceBackFacesOnly, e.darkness !== void 0 && n.setDarkness(e.darkness), e.transparencyShadow && n.setTransparencyShadow(!0), e.frustumEdgeFalloff !== void 0 && (n.frustumEdgeFalloff = e.frustumEdgeFalloff), e.bias !== void 0 && (n.bias = e.bias), e.normalBias !== void 0 && (n.normalBias = e.normalBias), e.usePercentageCloserFiltering ? n.usePercentageCloserFiltering = !0 : e.useContactHardeningShadow ? n.useContactHardeningShadow = !0 : e.usePoissonSampling ? n.usePoissonSampling = !0 : e.useExponentialShadowMap ? n.useExponentialShadowMap = !0 : e.useBlurExponentialShadowMap ? n.useBlurExponentialShadowMap = !0 : e.useCloseExponentialShadowMap ? n.useCloseExponentialShadowMap = !0 : e.useBlurCloseExponentialShadowMap ? n.useBlurCloseExponentialShadowMap = !0 : e.useVarianceShadowMap ? n.useExponentialShadowMap = !0 : e.useBlurVarianceShadowMap && (n.useBlurExponentialShadowMap = !0), e.contactHardeningLightSizeUVRatio !== void 0 && (n.contactHardeningLightSizeUVRatio = e.contactHardeningLightSizeUVRatio), e.filteringQuality !== void 0 && (n.filteringQuality = e.filteringQuality), e.depthScale && (n.depthScale = e.depthScale), e.blurScale && (n.blurScale = e.blurScale), e.blurBoxOffset && (n.blurBoxOffset = e.blurBoxOffset), e.useKernelBlur && (n.useKernelBlur = e.useKernelBlur), e.blurKernel && (n.blurKernel = e.blurKernel), n;
  }
}
u.CLASSNAME = "ShadowGenerator";
u.FILTER_NONE = 0;
u.FILTER_EXPONENTIALSHADOWMAP = 1;
u.FILTER_POISSONSAMPLING = 2;
u.FILTER_BLUREXPONENTIALSHADOWMAP = 3;
u.FILTER_CLOSEEXPONENTIALSHADOWMAP = 4;
u.FILTER_BLURCLOSEEXPONENTIALSHADOWMAP = 5;
u.FILTER_PCF = 6;
u.FILTER_PCSS = 7;
u.QUALITY_HIGH = 0;
u.QUALITY_MEDIUM = 1;
u.QUALITY_LOW = 2;
u.DEFAULT_ALPHA_CUTOFF = 0.5;
u._SceneComponentInitialization = (l) => {
  throw $e("ShadowGeneratorSceneComponent");
};
const li = "depthPixelShader", ci = `#ifdef ALPHATEST
varying vec2 vUV;
uniform sampler2D diffuseSampler;
#endif
#include<clipPlaneFragmentDeclaration>
varying float vDepthMetric;
#ifdef PACKED
#include<packingFunctions>
#endif
#ifdef STORE_CAMERASPACE_Z
varying vec4 vViewPos;
#endif
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void)
{
#include<clipPlaneFragment>
#ifdef ALPHATEST
if (texture2D(diffuseSampler,vUV).a<0.4)
discard;
#endif
#ifdef STORE_CAMERASPACE_Z
#ifdef PACKED
gl_FragColor=pack(vViewPos.z);
#else
gl_FragColor=vec4(vViewPos.z,0.0,0.0,1.0);
#endif
#else
#ifdef NONLINEARDEPTH
#ifdef PACKED
gl_FragColor=pack(gl_FragCoord.z);
#else
gl_FragColor=vec4(gl_FragCoord.z,0.0,0.0,0.0);
#endif
#else
#ifdef PACKED
gl_FragColor=pack(vDepthMetric);
#else
gl_FragColor=vec4(vDepthMetric,0.0,0.0,1.0);
#endif
#endif
#endif
}`;
F.ShadersStore[li] = ci;
const di = "depthVertexShader", ui = `attribute vec3 position;
#include<bonesDeclaration>
#include<bakedVertexAnimationDeclaration>
#include<morphTargetsVertexGlobalDeclaration>
#include<morphTargetsVertexDeclaration>[0..maxSimultaneousMorphTargets]
#include<clipPlaneVertexDeclaration>
#include<instancesDeclaration>
uniform mat4 viewProjection;
uniform vec2 depthValues;
#if defined(ALPHATEST) || defined(NEED_UV)
varying vec2 vUV;
uniform mat4 diffuseMatrix;
#ifdef UV1
attribute vec2 uv;
#endif
#ifdef UV2
attribute vec2 uv2;
#endif
#endif
#ifdef STORE_CAMERASPACE_Z
uniform mat4 view;
varying vec4 vViewPos;
#endif
varying float vDepthMetric;
#define CUSTOM_VERTEX_DEFINITIONS
void main(void)
{
vec3 positionUpdated=position;
#ifdef UV1
vec2 uvUpdated=uv;
#endif
#include<morphTargetsVertexGlobal>
#include<morphTargetsVertex>[0..maxSimultaneousMorphTargets]
#include<instancesVertex>
#include<bonesVertex>
#include<bakedVertexAnimation>
vec4 worldPos=finalWorld*vec4(positionUpdated,1.0);
#include<clipPlaneVertex>
gl_Position=viewProjection*worldPos;
#ifdef STORE_CAMERASPACE_Z
vViewPos=view*worldPos;
#else
#ifdef USE_REVERSE_DEPTHBUFFER
vDepthMetric=((-gl_Position.z+depthValues.x)/(depthValues.y));
#else
vDepthMetric=((gl_Position.z+depthValues.x)/(depthValues.y));
#endif
#endif
#if defined(ALPHATEST) || defined(BASIC_RENDER)
#ifdef UV1
vUV=vec2(diffuseMatrix*vec4(uvUpdated,1.0,0.0));
#endif
#ifdef UV2
vUV=vec2(diffuseMatrix*vec4(uv2,1.0,0.0));
#endif
#endif
}
`;
F.ShadersStore[di] = ui;
class Be {
  /**
   * Sets a specific material to be used to render a mesh/a list of meshes by the depth renderer
   * @param mesh mesh or array of meshes
   * @param material material to use by the depth render when rendering the mesh(es). If undefined is passed, the specific material created by the depth renderer will be used.
   */
  setMaterialForRendering(e, t) {
    this._depthMap.setMaterialForRendering(e, t);
  }
  /**
   * Instantiates a depth renderer
   * @param scene The scene the renderer belongs to
   * @param type The texture type of the depth map (default: Engine.TEXTURETYPE_FLOAT)
   * @param camera The camera to be used to render the depth map (default: scene's active camera)
   * @param storeNonLinearDepth Defines whether the depth is stored linearly like in Babylon Shadows or directly like glFragCoord.z
   * @param samplingMode The sampling mode to be used with the render target (Linear, Nearest...) (default: TRILINEAR_SAMPLINGMODE)
   * @param storeCameraSpaceZ Defines whether the depth stored is the Z coordinate in camera space. If true, storeNonLinearDepth has no effect. (Default: false)
   * @param name Name of the render target (default: DepthRenderer)
   */
  constructor(e, t = 1, i = null, s = !1, r = B.TRILINEAR_SAMPLINGMODE, n = !1, a) {
    this.enabled = !0, this.forceDepthWriteTransparentMeshes = !1, this.useOnlyInActiveCamera = !1, this.reverseCulling = !1, this._scene = e, this._storeNonLinearDepth = s, this._storeCameraSpaceZ = n, this.isPacked = t === 0, this.isPacked ? this.clearColor = new me(1, 1, 1, 1) : this.clearColor = new me(n ? 1e8 : 1, 0, 0, 1), Be._SceneComponentInitialization(this._scene);
    const o = e.getEngine();
    this._camera = i, r !== B.NEAREST_SAMPLINGMODE && (t === 1 && !o._caps.textureFloatLinearFiltering && (r = B.NEAREST_SAMPLINGMODE), t === 2 && !o._caps.textureHalfFloatLinearFiltering && (r = B.NEAREST_SAMPLINGMODE));
    const c = this.isPacked || !o._features.supportExtendedTextureFormats ? 5 : 6;
    this._depthMap = new Se(a ?? "DepthRenderer", { width: o.getRenderWidth(), height: o.getRenderHeight() }, this._scene, !1, !0, t, !1, r, void 0, void 0, void 0, c), this._depthMap.wrapU = B.CLAMP_ADDRESSMODE, this._depthMap.wrapV = B.CLAMP_ADDRESSMODE, this._depthMap.refreshRate = 1, this._depthMap.renderParticles = !1, this._depthMap.renderList = null, this._depthMap.activeCamera = this._camera, this._depthMap.ignoreCameraViewport = !0, this._depthMap.useCameraPostProcesses = !1, this._depthMap.onClearObservable.add((h) => {
      h.clear(this.clearColor, !0, !0, !0);
    }), this._depthMap.onBeforeBindObservable.add(() => {
      var h;
      (h = o._debugPushGroup) === null || h === void 0 || h.call(o, "depth renderer", 1);
    }), this._depthMap.onAfterUnbindObservable.add(() => {
      var h;
      (h = o._debugPopGroup) === null || h === void 0 || h.call(o, 1);
    }), this._depthMap.customIsReadyFunction = (h, m, x) => {
      if ((x || m === 0) && h.subMeshes)
        for (let S = 0; S < h.subMeshes.length; ++S) {
          const _ = h.subMeshes[S], T = _.getRenderingMesh(), g = T._getInstancesRenderList(_._id, !!_.getReplacementMesh()), E = o.getCaps().instancedArrays && (g.visibleInstances[_._id] !== null && g.visibleInstances[_._id] !== void 0 || T.hasThinInstances);
          if (!this.isReady(_, E))
            return !1;
        }
      return !0;
    };
    const d = (h) => {
      var m, x;
      const S = h.getRenderingMesh(), _ = h.getEffectiveMesh(), T = this._scene, g = T.getEngine(), E = h.getMaterial();
      if (_._internalAbstractMeshDataInfo._isActiveIntermediate = !1, !E || _.infiniteDistance || E.disableDepthWrite || h.verticesCount === 0 || h._renderId === T.getRenderId())
        return;
      const P = _._getWorldMatrixDeterminant() < 0;
      let w = (m = S.overrideMaterialSideOrientation) !== null && m !== void 0 ? m : E.sideOrientation;
      P && (w = w === 0 ? 1 : 0);
      const z = w === 0;
      g.setState(E.backFaceCulling, 0, !1, z, this.reverseCulling ? !E.cullBackFaces : E.cullBackFaces);
      const k = S._getInstancesRenderList(h._id, !!h.getReplacementMesh());
      if (k.mustReturn)
        return;
      const M = g.getCaps().instancedArrays && (k.visibleInstances[h._id] !== null && k.visibleInstances[h._id] !== void 0 || S.hasThinInstances), N = this._camera || T.activeCamera;
      if (this.isReady(h, M) && N) {
        h._renderId = T.getRenderId();
        const U = (x = _._internalAbstractMeshDataInfo._materialForRenderPass) === null || x === void 0 ? void 0 : x[g.currentRenderPassId];
        let H = h._getDrawWrapper();
        !H && U && (H = U._getDrawWrapper());
        const _t = N.mode === W.ORTHOGRAPHIC_CAMERA;
        if (!H)
          return;
        const V = H.effect;
        g.enableEffect(H), M || S._bind(h, V, E.fillMode), U ? U.bindForSubMesh(_.getWorldMatrix(), _, h) : (V.setMatrix("viewProjection", T.getTransformMatrix()), V.setMatrix("world", _.getWorldMatrix()), this._storeCameraSpaceZ && V.setMatrix("view", T.getViewMatrix()));
        let Pe, Le;
        if (_t ? (Pe = !g.useReverseDepthBuffer && g.isNDCHalfZRange ? 0 : 1, Le = g.useReverseDepthBuffer && g.isNDCHalfZRange ? 0 : 1) : (Pe = g.useReverseDepthBuffer && g.isNDCHalfZRange ? N.minZ : g.isNDCHalfZRange ? 0 : N.minZ, Le = g.useReverseDepthBuffer && g.isNDCHalfZRange ? 0 : N.maxZ), V.setFloat2("depthValues", Pe, Pe + Le), !U) {
          if (E.needAlphaTesting()) {
            const G = E.getAlphaTestTexture();
            G && (V.setTexture("diffuseSampler", G), V.setMatrix("diffuseMatrix", G.getTextureMatrix()));
          }
          if (S.useBones && S.computeBonesUsingShaders && S.skeleton) {
            const G = S.skeleton;
            if (G.isUsingTextureForMatrices) {
              const Re = G.getTransformMatrixTexture(S);
              if (!Re)
                return;
              V.setTexture("boneSampler", Re), V.setFloat("boneTextureWidth", 4 * (G.bones.length + 1));
            } else
              V.setMatrices("mBones", G.getTransformMatrices(S));
          }
          Qe(V, E, T), L.BindMorphTargetParameters(S, V), S.morphTargetManager && S.morphTargetManager.isUsingTextureForTargets && S.morphTargetManager._bind(V);
        }
        S._processRendering(_, h, V, E.fillMode, k, M, (G, Re) => V.setMatrix("world", Re));
      }
    };
    this._depthMap.customRenderFunction = (h, m, x, S) => {
      let _;
      if (S.length)
        for (_ = 0; _ < S.length; _++)
          d(S.data[_]);
      for (_ = 0; _ < h.length; _++)
        d(h.data[_]);
      for (_ = 0; _ < m.length; _++)
        d(m.data[_]);
      if (this.forceDepthWriteTransparentMeshes)
        for (_ = 0; _ < x.length; _++)
          d(x.data[_]);
      else
        for (_ = 0; _ < x.length; _++)
          x.data[_].getEffectiveMesh()._internalAbstractMeshDataInfo._isActiveIntermediate = !1;
    };
  }
  /**
   * Creates the depth rendering effect and checks if the effect is ready.
   * @param subMesh The submesh to be used to render the depth map of
   * @param useInstances If multiple world instances should be used
   * @returns if the depth renderer is ready to render the depth map
   */
  isReady(e, t) {
    var i;
    const s = this._scene.getEngine(), r = e.getMesh(), n = r.getScene(), a = (i = r._internalAbstractMeshDataInfo._materialForRenderPass) === null || i === void 0 ? void 0 : i[s.currentRenderPassId];
    if (a)
      return a.isReadyForSubMesh(r, e, t);
    const o = e.getMaterial();
    if (!o || o.disableDepthWrite)
      return !1;
    const c = [], d = [v.PositionKind];
    if (o && o.needAlphaTesting() && o.getAlphaTestTexture() && (c.push("#define ALPHATEST"), r.isVerticesDataPresent(v.UVKind) && (d.push(v.UVKind), c.push("#define UV1")), r.isVerticesDataPresent(v.UV2Kind) && (d.push(v.UV2Kind), c.push("#define UV2"))), r.useBones && r.computeBonesUsingShaders) {
      d.push(v.MatricesIndicesKind), d.push(v.MatricesWeightsKind), r.numBoneInfluencers > 4 && (d.push(v.MatricesIndicesExtraKind), d.push(v.MatricesWeightsExtraKind)), c.push("#define NUM_BONE_INFLUENCERS " + r.numBoneInfluencers), c.push("#define BonesPerMesh " + (r.skeleton ? r.skeleton.bones.length + 1 : 0));
      const T = e.getRenderingMesh().skeleton;
      T != null && T.isUsingTextureForMatrices && c.push("#define BONETEXTURE");
    } else
      c.push("#define NUM_BONE_INFLUENCERS 0");
    const h = r.morphTargetManager;
    let m = 0;
    h && h.numInfluencers > 0 && (m = h.numInfluencers, c.push("#define MORPHTARGETS"), c.push("#define NUM_MORPH_INFLUENCERS " + m), h.isUsingTextureForTargets && c.push("#define MORPHTARGETS_TEXTURE"), L.PrepareAttributesForMorphTargetsInfluencers(d, r, m)), t && (c.push("#define INSTANCES"), L.PushAttributesForInstances(d), e.getRenderingMesh().hasThinInstances && c.push("#define THIN_INSTANCES")), this._storeNonLinearDepth && c.push("#define NONLINEARDEPTH"), this._storeCameraSpaceZ && c.push("#define STORE_CAMERASPACE_Z"), this.isPacked && c.push("#define PACKED"), lt(o, n, c);
    const x = e._getDrawWrapper(void 0, !0), S = x.defines, _ = c.join(`
`);
    if (S !== _) {
      const T = [
        "world",
        "mBones",
        "boneTextureWidth",
        "viewProjection",
        "view",
        "diffuseMatrix",
        "depthValues",
        "morphTargetInfluences",
        "morphTargetTextureInfo",
        "morphTargetTextureIndices"
      ];
      je(T), x.setEffect(s.createEffect("depth", d, T, ["diffuseSampler", "morphTargets", "boneSampler"], _, void 0, void 0, void 0, {
        maxSimultaneousMorphTargets: m
      }), _);
    }
    return x.effect.isReady();
  }
  /**
   * Gets the texture which the depth map will be written to.
   * @returns The depth map texture
   */
  getDepthMap() {
    return this._depthMap;
  }
  /**
   * Disposes of the depth renderer.
   */
  dispose() {
    const e = [];
    for (const t in this._scene._depthRenderer)
      this._scene._depthRenderer[t] === this && e.push(t);
    if (e.length > 0) {
      this._depthMap.dispose();
      for (const t of e)
        delete this._scene._depthRenderer[t];
    }
  }
}
Be._SceneComponentInitialization = (l) => {
  throw $e("DepthRendererSceneComponent");
};
const fi = "minmaxReduxPixelShader", _i = `varying vec2 vUV;
uniform sampler2D textureSampler;
#if defined(INITIAL)
uniform sampler2D sourceTexture;
uniform vec2 texSize;
void main(void)
{
ivec2 coord=ivec2(vUV*(texSize-1.0));
float f1=texelFetch(sourceTexture,coord,0).r;
float f2=texelFetch(sourceTexture,coord+ivec2(1,0),0).r;
float f3=texelFetch(sourceTexture,coord+ivec2(1,1),0).r;
float f4=texelFetch(sourceTexture,coord+ivec2(0,1),0).r;
float minz=min(min(min(f1,f2),f3),f4);
#ifdef DEPTH_REDUX
float maxz=max(max(max(sign(1.0-f1)*f1,sign(1.0-f2)*f2),sign(1.0-f3)*f3),sign(1.0-f4)*f4);
#else
float maxz=max(max(max(f1,f2),f3),f4);
#endif
glFragColor=vec4(minz,maxz,0.,0.);
}
#elif defined(MAIN)
uniform vec2 texSize;
void main(void)
{
ivec2 coord=ivec2(vUV*(texSize-1.0));
vec2 f1=texelFetch(textureSampler,coord,0).rg;
vec2 f2=texelFetch(textureSampler,coord+ivec2(1,0),0).rg;
vec2 f3=texelFetch(textureSampler,coord+ivec2(1,1),0).rg;
vec2 f4=texelFetch(textureSampler,coord+ivec2(0,1),0).rg;
float minz=min(min(min(f1.x,f2.x),f3.x),f4.x);
float maxz=max(max(max(f1.y,f2.y),f3.y),f4.y);
glFragColor=vec4(minz,maxz,0.,0.);
}
#elif defined(ONEBEFORELAST)
uniform ivec2 texSize;
void main(void)
{
ivec2 coord=ivec2(vUV*vec2(texSize-1));
vec2 f1=texelFetch(textureSampler,coord % texSize,0).rg;
vec2 f2=texelFetch(textureSampler,(coord+ivec2(1,0)) % texSize,0).rg;
vec2 f3=texelFetch(textureSampler,(coord+ivec2(1,1)) % texSize,0).rg;
vec2 f4=texelFetch(textureSampler,(coord+ivec2(0,1)) % texSize,0).rg;
float minz=min(f1.x,f2.x);
float maxz=max(f1.y,f2.y);
glFragColor=vec4(minz,maxz,0.,0.);
}
#elif defined(LAST)
void main(void)
{
glFragColor=vec4(0.);
if (true) { 
discard;
}
}
#endif
`;
F.ShadersStore[fi] = _i;
class pi {
  /**
   * Creates a min/max reducer
   * @param camera The camera to use for the post processes
   */
  constructor(e) {
    this.onAfterReductionPerformed = new se(), this._forceFullscreenViewport = !0, this._activated = !1, this._camera = e, this._postProcessManager = new Et(e.getScene()), this._onContextRestoredObserver = e.getEngine().onContextRestoredObservable.add(() => {
      this._postProcessManager._rebuild();
    });
  }
  /**
   * Gets the texture used to read the values from.
   */
  get sourceTexture() {
    return this._sourceTexture;
  }
  /**
   * Sets the source texture to read the values from.
   * One must indicate if the texture is a depth texture or not through the depthRedux parameter
   * because in such textures '1' value must not be taken into account to compute the maximum
   * as this value is used to clear the texture.
   * Note that the computation is not activated by calling this function, you must call activate() for that!
   * @param sourceTexture The texture to read the values from. The values should be in the red channel.
   * @param depthRedux Indicates if the texture is a depth texture or not
   * @param type The type of the textures created for the reduction (defaults to TEXTURETYPE_HALF_FLOAT)
   * @param forceFullscreenViewport Forces the post processes used for the reduction to be applied without taking into account viewport (defaults to true)
   */
  setSourceTexture(e, t, i = 2, s = !0) {
    if (e === this._sourceTexture)
      return;
    this.dispose(!1), this._sourceTexture = e, this._reductionSteps = [], this._forceFullscreenViewport = s;
    const r = this._camera.getScene(), n = new We(
      "Initial reduction phase",
      "minmaxRedux",
      // shader
      ["texSize"],
      ["sourceTexture"],
      // textures
      1,
      // options
      null,
      // camera
      1,
      // sampling
      r.getEngine(),
      // engine
      !1,
      // reusable
      "#define INITIAL" + (t ? `
#define DEPTH_REDUX` : ""),
      // defines
      i,
      void 0,
      void 0,
      void 0,
      7
    );
    n.autoClear = !1, n.forceFullscreenViewport = s;
    let a = this._sourceTexture.getRenderWidth(), o = this._sourceTexture.getRenderHeight();
    n.onApply = ((d, h) => (m) => {
      m.setTexture("sourceTexture", this._sourceTexture), m.setFloat2("texSize", d, h);
    })(a, o), this._reductionSteps.push(n);
    let c = 1;
    for (; a > 1 || o > 1; ) {
      a = Math.max(Math.round(a / 2), 1), o = Math.max(Math.round(o / 2), 1);
      const d = new We(
        "Reduction phase " + c,
        "minmaxRedux",
        // shader
        ["texSize"],
        null,
        { width: a, height: o },
        // options
        null,
        // camera
        1,
        // sampling
        r.getEngine(),
        // engine
        !1,
        // reusable
        "#define " + (a == 1 && o == 1 ? "LAST" : a == 1 || o == 1 ? "ONEBEFORELAST" : "MAIN"),
        // defines
        i,
        void 0,
        void 0,
        void 0,
        7
      );
      if (d.autoClear = !1, d.forceFullscreenViewport = s, d.onApply = ((h, m) => (x) => {
        h == 1 || m == 1 ? x.setInt2("texSize", h, m) : x.setFloat2("texSize", h, m);
      })(a, o), this._reductionSteps.push(d), c++, a == 1 && o == 1) {
        const h = (m, x, S) => {
          const _ = new Float32Array(4 * m * x), T = { min: 0, max: 0 };
          return () => {
            r.getEngine()._readTexturePixels(S.inputTexture.texture, m, x, -1, 0, _, !1), T.min = _[0], T.max = _[1], this.onAfterReductionPerformed.notifyObservers(T);
          };
        };
        d.onAfterRenderObservable.add(h(a, o, d));
      }
    }
  }
  /**
   * Defines the refresh rate of the computation.
   * Use 0 to compute just once, 1 to compute on every frame, 2 to compute every two frames and so on...
   */
  get refreshRate() {
    return this._sourceTexture ? this._sourceTexture.refreshRate : -1;
  }
  set refreshRate(e) {
    this._sourceTexture && (this._sourceTexture.refreshRate = e);
  }
  /**
   * Gets the activation status of the reducer
   */
  get activated() {
    return this._activated;
  }
  /**
   * Activates the reduction computation.
   * When activated, the observers registered in onAfterReductionPerformed are
   * called after the computation is performed
   */
  activate() {
    this._onAfterUnbindObserver || !this._sourceTexture || (this._onAfterUnbindObserver = this._sourceTexture.onAfterUnbindObservable.add(() => {
      var e, t;
      const i = this._camera.getScene().getEngine();
      (e = i._debugPushGroup) === null || e === void 0 || e.call(i, "min max reduction", 1), this._reductionSteps[0].activate(this._camera), this._postProcessManager.directRender(this._reductionSteps, this._reductionSteps[0].inputTexture, this._forceFullscreenViewport), i.unBindFramebuffer(this._reductionSteps[0].inputTexture, !1), (t = i._debugPopGroup) === null || t === void 0 || t.call(i, 1);
    }), this._activated = !0);
  }
  /**
   * Deactivates the reduction computation.
   */
  deactivate() {
    !this._onAfterUnbindObserver || !this._sourceTexture || (this._sourceTexture.onAfterUnbindObservable.remove(this._onAfterUnbindObserver), this._onAfterUnbindObserver = null, this._activated = !1);
  }
  /**
   * Disposes the min/max reducer
   * @param disposeAll true to dispose all the resources. You should always call this function with true as the parameter (or without any parameter as it is the default one). This flag is meant to be used internally.
   */
  dispose(e = !0) {
    if (e && (this.onAfterReductionPerformed.clear(), this._onContextRestoredObserver && (this._camera.getEngine().onContextRestoredObservable.remove(this._onContextRestoredObserver), this._onContextRestoredObserver = null)), this.deactivate(), this._reductionSteps) {
      for (let t = 0; t < this._reductionSteps.length; ++t)
        this._reductionSteps[t].dispose();
      this._reductionSteps = null;
    }
    this._postProcessManager && e && this._postProcessManager.dispose(), this._sourceTexture = null;
  }
}
class mi extends pi {
  /**
   * Gets the depth renderer used for the computation.
   * Note that the result is null if you provide your own renderer when calling setDepthRenderer.
   */
  get depthRenderer() {
    return this._depthRenderer;
  }
  /**
   * Creates a depth reducer
   * @param camera The camera used to render the depth texture
   */
  constructor(e) {
    super(e);
  }
  /**
   * Sets the depth renderer to use to generate the depth map
   * @param depthRenderer The depth renderer to use. If not provided, a new one will be created automatically
   * @param type The texture type of the depth map (default: TEXTURETYPE_HALF_FLOAT)
   * @param forceFullscreenViewport Forces the post processes used for the reduction to be applied without taking into account viewport (defaults to true)
   */
  setDepthRenderer(e = null, t = 2, i = !0) {
    const s = this._camera.getScene();
    this._depthRenderer && (delete s._depthRenderer[this._depthRendererId], this._depthRenderer.dispose(), this._depthRenderer = null), e === null && (s._depthRenderer || (s._depthRenderer = {}), e = this._depthRenderer = new Be(s, t, this._camera, !1, 1), e.enabled = !1, this._depthRendererId = "minmax" + this._camera.id, s._depthRenderer[this._depthRendererId] = e), super.setSourceTexture(e.getDepthMap(), !0, t, i);
  }
  /**
   * @internal
   */
  setSourceTexture(e, t, i = 2, s = !0) {
    super.setSourceTexture(e, t, i, s);
  }
  /**
   * Activates the reduction computation.
   * When activated, the observers registered in onAfterReductionPerformed are
   * called after the computation is performed
   */
  activate() {
    this._depthRenderer && (this._depthRenderer.enabled = !0), super.activate();
  }
  /**
   * Deactivates the reduction computation.
   */
  deactivate() {
    super.deactivate(), this._depthRenderer && (this._depthRenderer.enabled = !1);
  }
  /**
   * Disposes the depth reducer
   * @param disposeAll true to dispose all the resources. You should always call this function with true as the parameter (or without any parameter as it is the default one). This flag is meant to be used internally.
   */
  dispose(e = !0) {
    if (super.dispose(e), this._depthRenderer && e) {
      const t = this._depthRenderer.getDepthMap().getScene();
      t && delete t._depthRenderer[this._depthRendererId], this._depthRenderer.dispose(), this._depthRenderer = null;
    }
  }
}
const st = p.Up(), gi = p.Zero(), R = new p(), de = new p(), De = new C();
class A extends u {
  _validateFilter(e) {
    return e === u.FILTER_NONE || e === u.FILTER_PCF || e === u.FILTER_PCSS ? e : (console.error('Unsupported filter "' + e + '"!'), u.FILTER_NONE);
  }
  /**
   * Gets or set the number of cascades used by the CSM.
   */
  get numCascades() {
    return this._numCascades;
  }
  set numCascades(e) {
    e = Math.min(Math.max(e, A.MIN_CASCADES_COUNT), A.MAX_CASCADES_COUNT), e !== this._numCascades && (this._numCascades = e, this.recreateShadowMap(), this._recreateSceneUBOs());
  }
  /**
   * Enables or disables the shadow casters bounding info computation.
   * If your shadow casters don't move, you can disable this feature.
   * If it is enabled, the bounding box computation is done every frame.
   */
  get freezeShadowCastersBoundingInfo() {
    return this._freezeShadowCastersBoundingInfo;
  }
  set freezeShadowCastersBoundingInfo(e) {
    this._freezeShadowCastersBoundingInfoObservable && e && (this._scene.onBeforeRenderObservable.remove(this._freezeShadowCastersBoundingInfoObservable), this._freezeShadowCastersBoundingInfoObservable = null), !this._freezeShadowCastersBoundingInfoObservable && !e && (this._freezeShadowCastersBoundingInfoObservable = this._scene.onBeforeRenderObservable.add(this._computeShadowCastersBoundingInfo.bind(this))), this._freezeShadowCastersBoundingInfo = e, e && this._computeShadowCastersBoundingInfo();
  }
  _computeShadowCastersBoundingInfo() {
    if (this._scbiMin.copyFromFloats(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE), this._scbiMax.copyFromFloats(Number.MIN_VALUE, Number.MIN_VALUE, Number.MIN_VALUE), this._shadowMap && this._shadowMap.renderList) {
      const e = this._shadowMap.renderList;
      for (let i = 0; i < e.length; i++) {
        const s = e[i];
        if (!s)
          continue;
        const r = s.getBoundingInfo(), n = r.boundingBox;
        this._scbiMin.minimizeInPlace(n.minimumWorld), this._scbiMax.maximizeInPlace(n.maximumWorld);
      }
      const t = this._scene.meshes;
      for (let i = 0; i < t.length; i++) {
        const s = t[i];
        if (!s || !s.isVisible || !s.isEnabled || !s.receiveShadows)
          continue;
        const r = s.getBoundingInfo(), n = r.boundingBox;
        this._scbiMin.minimizeInPlace(n.minimumWorld), this._scbiMax.maximizeInPlace(n.maximumWorld);
      }
    }
    this._shadowCastersBoundingInfo.reConstruct(this._scbiMin, this._scbiMax);
  }
  /**
   * Gets or sets the shadow casters bounding info.
   * If you provide your own shadow casters bounding info, first enable freezeShadowCastersBoundingInfo
   * so that the system won't overwrite the bounds you provide
   */
  get shadowCastersBoundingInfo() {
    return this._shadowCastersBoundingInfo;
  }
  set shadowCastersBoundingInfo(e) {
    this._shadowCastersBoundingInfo = e;
  }
  /**
   * Sets the minimal and maximal distances to use when computing the cascade breaks.
   *
   * The values of min / max are typically the depth zmin and zmax values of your scene, for a given frame.
   * If you don't know these values, simply leave them to their defaults and don't call this function.
   * @param min minimal distance for the breaks (default to 0.)
   * @param max maximal distance for the breaks (default to 1.)
   */
  setMinMaxDistance(e, t) {
    this._minDistance === e && this._maxDistance === t || (e > t && (e = 0, t = 1), e < 0 && (e = 0), t > 1 && (t = 1), this._minDistance = e, this._maxDistance = t, this._breaksAreDirty = !0);
  }
  /** Gets the minimal distance used in the cascade break computation */
  get minDistance() {
    return this._minDistance;
  }
  /** Gets the maximal distance used in the cascade break computation */
  get maxDistance() {
    return this._maxDistance;
  }
  /**
   * Gets the class name of that object
   * @returns "CascadedShadowGenerator"
   */
  getClassName() {
    return A.CLASSNAME;
  }
  /**
   * Gets a cascade minimum extents
   * @param cascadeIndex index of the cascade
   * @returns the minimum cascade extents
   */
  getCascadeMinExtents(e) {
    return e >= 0 && e < this._numCascades ? this._cascadeMinExtents[e] : null;
  }
  /**
   * Gets a cascade maximum extents
   * @param cascadeIndex index of the cascade
   * @returns the maximum cascade extents
   */
  getCascadeMaxExtents(e) {
    return e >= 0 && e < this._numCascades ? this._cascadeMaxExtents[e] : null;
  }
  /**
   * Gets the shadow max z distance. It's the limit beyond which shadows are not displayed.
   * It defaults to camera.maxZ
   */
  get shadowMaxZ() {
    return this._getCamera() ? this._shadowMaxZ : 0;
  }
  /**
   * Sets the shadow max z distance.
   */
  set shadowMaxZ(e) {
    const t = this._getCamera();
    if (!t) {
      this._shadowMaxZ = e;
      return;
    }
    this._shadowMaxZ === e || e < t.minZ || e > t.maxZ || (this._shadowMaxZ = e, this._light._markMeshesAsLightDirty(), this._breaksAreDirty = !0);
  }
  /**
   * Gets or sets the debug flag.
   * When enabled, the cascades are materialized by different colors on the screen.
   */
  get debug() {
    return this._debug;
  }
  set debug(e) {
    this._debug = e, this._light._markMeshesAsLightDirty();
  }
  /**
   * Gets or sets the depth clamping value.
   *
   * When enabled, it improves the shadow quality because the near z plane of the light frustum don't need to be adjusted
   * to account for the shadow casters far away.
   *
   * Note that this property is incompatible with PCSS filtering, so it won't be used in that case.
   */
  get depthClamp() {
    return this._depthClamp;
  }
  set depthClamp(e) {
    this._depthClamp = e;
  }
  /**
   * Gets or sets the percentage of blending between two cascades (value between 0. and 1.).
   * It defaults to 0.1 (10% blending).
   */
  get cascadeBlendPercentage() {
    return this._cascadeBlendPercentage;
  }
  set cascadeBlendPercentage(e) {
    this._cascadeBlendPercentage = e, this._light._markMeshesAsLightDirty();
  }
  /**
   * Gets or set the lambda parameter.
   * This parameter is used to split the camera frustum and create the cascades.
   * It's a value between 0. and 1.: If 0, the split is a uniform split of the frustum, if 1 it is a logarithmic split.
   * For all values in-between, it's a linear combination of the uniform and logarithm split algorithm.
   */
  get lambda() {
    return this._lambda;
  }
  set lambda(e) {
    const t = Math.min(Math.max(e, 0), 1);
    this._lambda != t && (this._lambda = t, this._breaksAreDirty = !0);
  }
  /**
   * Gets the view matrix corresponding to a given cascade
   * @param cascadeNum cascade to retrieve the view matrix from
   * @returns the cascade view matrix
   */
  getCascadeViewMatrix(e) {
    return e >= 0 && e < this._numCascades ? this._viewMatrices[e] : null;
  }
  /**
   * Gets the projection matrix corresponding to a given cascade
   * @param cascadeNum cascade to retrieve the projection matrix from
   * @returns the cascade projection matrix
   */
  getCascadeProjectionMatrix(e) {
    return e >= 0 && e < this._numCascades ? this._projectionMatrices[e] : null;
  }
  /**
   * Gets the transformation matrix corresponding to a given cascade
   * @param cascadeNum cascade to retrieve the transformation matrix from
   * @returns the cascade transformation matrix
   */
  getCascadeTransformMatrix(e) {
    return e >= 0 && e < this._numCascades ? this._transformMatrices[e] : null;
  }
  /**
   * Sets the depth renderer to use when autoCalcDepthBounds is enabled.
   *
   * Note that if no depth renderer is set, a new one will be automatically created internally when necessary.
   *
   * You should call this function if you already have a depth renderer enabled in your scene, to avoid
   * doing multiple depth rendering each frame. If you provide your own depth renderer, make sure it stores linear depth!
   * @param depthRenderer The depth renderer to use when autoCalcDepthBounds is enabled. If you pass null or don't call this function at all, a depth renderer will be automatically created
   */
  setDepthRenderer(e) {
    this._depthRenderer = e, this._depthReducer && this._depthReducer.setDepthRenderer(this._depthRenderer);
  }
  /**
   * Gets or sets the autoCalcDepthBounds property.
   *
   * When enabled, a depth rendering pass is first performed (with an internally created depth renderer or with the one
   * you provide by calling setDepthRenderer). Then, a min/max reducing is applied on the depth map to compute the
   * minimal and maximal depth of the map and those values are used as inputs for the setMinMaxDistance() function.
   * It can greatly enhance the shadow quality, at the expense of more GPU works.
   * When using this option, you should increase the value of the lambda parameter, and even set it to 1 for best results.
   */
  get autoCalcDepthBounds() {
    return this._autoCalcDepthBounds;
  }
  set autoCalcDepthBounds(e) {
    const t = this._getCamera();
    if (t) {
      if (this._autoCalcDepthBounds = e, !e) {
        this._depthReducer && this._depthReducer.deactivate(), this.setMinMaxDistance(0, 1);
        return;
      }
      this._depthReducer || (this._depthReducer = new mi(t), this._depthReducer.onAfterReductionPerformed.add((i) => {
        let s = i.min, r = i.max;
        s >= r && (s = 0, r = 1), (s != this._minDistance || r != this._maxDistance) && this.setMinMaxDistance(s, r);
      }), this._depthReducer.setDepthRenderer(this._depthRenderer)), this._depthReducer.activate();
    }
  }
  /**
   * Defines the refresh rate of the min/max computation used when autoCalcDepthBounds is set to true
   * Use 0 to compute just once, 1 to compute on every frame, 2 to compute every two frames and so on...
   * Note that if you provided your own depth renderer through a call to setDepthRenderer, you are responsible
   * for setting the refresh rate on the renderer yourself!
   */
  get autoCalcDepthBoundsRefreshRate() {
    var e, t, i;
    return (i = (t = (e = this._depthReducer) === null || e === void 0 ? void 0 : e.depthRenderer) === null || t === void 0 ? void 0 : t.getDepthMap().refreshRate) !== null && i !== void 0 ? i : -1;
  }
  set autoCalcDepthBoundsRefreshRate(e) {
    var t;
    !((t = this._depthReducer) === null || t === void 0) && t.depthRenderer && (this._depthReducer.depthRenderer.getDepthMap().refreshRate = e);
  }
  /**
   * Create the cascade breaks according to the lambda, shadowMaxZ and min/max distance properties, as well as the camera near and far planes.
   * This function is automatically called when updating lambda, shadowMaxZ and min/max distances, however you should call it yourself if
   * you change the camera near/far planes!
   */
  splitFrustum() {
    this._breaksAreDirty = !0;
  }
  _splitFrustum() {
    const e = this._getCamera();
    if (!e)
      return;
    const t = e.minZ, i = e.maxZ, s = i - t, r = this._minDistance, n = this._shadowMaxZ < i && this._shadowMaxZ >= t ? Math.min((this._shadowMaxZ - t) / (i - t), this._maxDistance) : this._maxDistance, a = t + r * s, o = t + n * s, c = o - a, d = o / a;
    for (let h = 0; h < this._cascades.length; ++h) {
      const m = (h + 1) / this._numCascades, x = a * d ** m, S = a + c * m, _ = this._lambda * (x - S) + S;
      this._cascades[h].prevBreakDistance = h === 0 ? r : this._cascades[h - 1].breakDistance, this._cascades[h].breakDistance = (_ - t) / s, this._viewSpaceFrustumsZ[h] = _, this._frustumLengths[h] = (this._cascades[h].breakDistance - this._cascades[h].prevBreakDistance) * s;
    }
    this._breaksAreDirty = !1;
  }
  _computeMatrices() {
    const e = this._scene;
    if (!this._getCamera())
      return;
    p.NormalizeToRef(this._light.getShadowDirection(0), this._lightDirection), Math.abs(p.Dot(this._lightDirection, p.Up())) === 1 && (this._lightDirection.z = 1e-13), this._cachedDirection.copyFrom(this._lightDirection);
    const i = e.getEngine().useReverseDepthBuffer;
    for (let s = 0; s < this._numCascades; ++s) {
      this._computeFrustumInWorldSpace(s), this._computeCascadeFrustum(s), this._cascadeMaxExtents[s].subtractToRef(this._cascadeMinExtents[s], R), this._frustumCenter[s].addToRef(this._lightDirection.scale(this._cascadeMinExtents[s].z), this._shadowCameraPos[s]), C.LookAtLHToRef(this._shadowCameraPos[s], this._frustumCenter[s], st, this._viewMatrices[s]);
      let r = 0, n = R.z;
      const a = this._shadowCastersBoundingInfo;
      a.update(this._viewMatrices[s]), n = Math.min(n, a.boundingBox.maximumWorld.z), !this._depthClamp || this.filter === u.FILTER_PCSS ? r = Math.min(r, a.boundingBox.minimumWorld.z) : r = Math.max(r, a.boundingBox.minimumWorld.z), C.OrthoOffCenterLHToRef(this._cascadeMinExtents[s].x, this._cascadeMaxExtents[s].x, this._cascadeMinExtents[s].y, this._cascadeMaxExtents[s].y, i ? n : r, i ? r : n, this._projectionMatrices[s], e.getEngine().isNDCHalfZRange), this._cascadeMinExtents[s].z = r, this._cascadeMaxExtents[s].z = n, this._viewMatrices[s].multiplyToRef(this._projectionMatrices[s], this._transformMatrices[s]), p.TransformCoordinatesToRef(gi, this._transformMatrices[s], R), R.scaleInPlace(this._mapSize / 2), de.copyFromFloats(Math.round(R.x), Math.round(R.y), Math.round(R.z)), de.subtractInPlace(R).scaleInPlace(2 / this._mapSize), C.TranslationToRef(de.x, de.y, 0, De), this._projectionMatrices[s].multiplyToRef(De, this._projectionMatrices[s]), this._viewMatrices[s].multiplyToRef(this._projectionMatrices[s], this._transformMatrices[s]), this._transformMatrices[s].copyToArray(this._transformMatricesAsArray, s * 16);
    }
  }
  // Get the 8 points of the view frustum in world space
  _computeFrustumInWorldSpace(e) {
    const t = this._getCamera();
    if (!t)
      return;
    const i = this._cascades[e].prevBreakDistance, s = this._cascades[e].breakDistance, r = this._scene.getEngine().isNDCHalfZRange;
    t.getViewMatrix();
    const n = C.Invert(t.getTransformationMatrix()), a = this._scene.getEngine().useReverseDepthBuffer ? 4 : 0;
    for (let o = 0; o < A._FrustumCornersNDCSpace.length; ++o)
      R.copyFrom(A._FrustumCornersNDCSpace[(o + a) % A._FrustumCornersNDCSpace.length]), r && R.z === -1 && (R.z = 0), p.TransformCoordinatesToRef(R, n, this._frustumCornersWorldSpace[e][o]);
    for (let o = 0; o < A._FrustumCornersNDCSpace.length / 2; ++o)
      R.copyFrom(this._frustumCornersWorldSpace[e][o + 4]).subtractInPlace(this._frustumCornersWorldSpace[e][o]), de.copyFrom(R).scaleInPlace(i), R.scaleInPlace(s), R.addInPlace(this._frustumCornersWorldSpace[e][o]), this._frustumCornersWorldSpace[e][o + 4].copyFrom(R), this._frustumCornersWorldSpace[e][o].addInPlace(de);
  }
  _computeCascadeFrustum(e) {
    if (this._cascadeMinExtents[e].copyFromFloats(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE), this._cascadeMaxExtents[e].copyFromFloats(Number.MIN_VALUE, Number.MIN_VALUE, Number.MIN_VALUE), this._frustumCenter[e].copyFromFloats(0, 0, 0), !!this._getCamera()) {
      for (let i = 0; i < this._frustumCornersWorldSpace[e].length; ++i)
        this._frustumCenter[e].addInPlace(this._frustumCornersWorldSpace[e][i]);
      if (this._frustumCenter[e].scaleInPlace(1 / this._frustumCornersWorldSpace[e].length), this.stabilizeCascades) {
        let i = 0;
        for (let s = 0; s < this._frustumCornersWorldSpace[e].length; ++s) {
          const r = this._frustumCornersWorldSpace[e][s].subtractToRef(this._frustumCenter[e], R).length();
          i = Math.max(i, r);
        }
        i = Math.ceil(i * 16) / 16, this._cascadeMaxExtents[e].copyFromFloats(i, i, i), this._cascadeMinExtents[e].copyFromFloats(-i, -i, -i);
      } else {
        const i = this._frustumCenter[e];
        this._frustumCenter[e].addToRef(this._lightDirection, R), C.LookAtLHToRef(i, R, st, De);
        for (let s = 0; s < this._frustumCornersWorldSpace[e].length; ++s)
          p.TransformCoordinatesToRef(this._frustumCornersWorldSpace[e][s], De, R), this._cascadeMinExtents[e].minimizeInPlace(R), this._cascadeMaxExtents[e].maximizeInPlace(R);
      }
    }
  }
  _recreateSceneUBOs() {
    if (this._disposeSceneUBOs(), this._sceneUBOs)
      for (let e = 0; e < this._numCascades; ++e)
        this._sceneUBOs.push(this._scene.createSceneUniformBuffer(`Scene for CSM Shadow Generator (light "${this._light.name}" cascade #${e})`));
  }
  /**
   *  Support test.
   */
  static get IsSupported() {
    const e = nt.LastCreatedEngine;
    return e ? e._features.supportCSM : !1;
  }
  /**
   * Creates a Cascaded Shadow Generator object.
   * A ShadowGenerator is the required tool to use the shadows.
   * Each directional light casting shadows needs to use its own ShadowGenerator.
   * Documentation : https://doc.babylonjs.com/babylon101/cascadedShadows
   * @param mapSize The size of the texture what stores the shadows. Example : 1024.
   * @param light The directional light object generating the shadows.
   * @param usefulFloatFirst By default the generator will try to use half float textures but if you need precision (for self shadowing for instance), you can use this option to enforce full float texture.
   * @param camera Camera associated with this shadow generator (default: null). If null, takes the scene active camera at the time we need to access it
   */
  constructor(e, t, i, s) {
    if (!A.IsSupported) {
      Ct.Error("CascadedShadowMap is not supported by the current engine.");
      return;
    }
    super(e, t, i, s), this.usePercentageCloserFiltering = !0;
  }
  _initializeGenerator() {
    var e, t, i, s, r, n, a, o, c, d, h, m, x, S, _, T, g, E, P, w;
    this.penumbraDarkness = (e = this.penumbraDarkness) !== null && e !== void 0 ? e : 1, this._numCascades = (t = this._numCascades) !== null && t !== void 0 ? t : A.DEFAULT_CASCADES_COUNT, this.stabilizeCascades = (i = this.stabilizeCascades) !== null && i !== void 0 ? i : !1, this._freezeShadowCastersBoundingInfoObservable = (s = this._freezeShadowCastersBoundingInfoObservable) !== null && s !== void 0 ? s : null, this.freezeShadowCastersBoundingInfo = (r = this.freezeShadowCastersBoundingInfo) !== null && r !== void 0 ? r : !1, this._scbiMin = (n = this._scbiMin) !== null && n !== void 0 ? n : new p(0, 0, 0), this._scbiMax = (a = this._scbiMax) !== null && a !== void 0 ? a : new p(0, 0, 0), this._shadowCastersBoundingInfo = (o = this._shadowCastersBoundingInfo) !== null && o !== void 0 ? o : new wt(new p(0, 0, 0), new p(0, 0, 0)), this._breaksAreDirty = (c = this._breaksAreDirty) !== null && c !== void 0 ? c : !0, this._minDistance = (d = this._minDistance) !== null && d !== void 0 ? d : 0, this._maxDistance = (h = this._maxDistance) !== null && h !== void 0 ? h : 1, this._currentLayer = (m = this._currentLayer) !== null && m !== void 0 ? m : 0, this._shadowMaxZ = (_ = (x = this._shadowMaxZ) !== null && x !== void 0 ? x : (S = this._getCamera()) === null || S === void 0 ? void 0 : S.maxZ) !== null && _ !== void 0 ? _ : 1e4, this._debug = (T = this._debug) !== null && T !== void 0 ? T : !1, this._depthClamp = (g = this._depthClamp) !== null && g !== void 0 ? g : !0, this._cascadeBlendPercentage = (E = this._cascadeBlendPercentage) !== null && E !== void 0 ? E : 0.1, this._lambda = (P = this._lambda) !== null && P !== void 0 ? P : 0.5, this._autoCalcDepthBounds = (w = this._autoCalcDepthBounds) !== null && w !== void 0 ? w : !1, this._recreateSceneUBOs(), super._initializeGenerator();
  }
  _createTargetRenderTexture() {
    const e = this._scene.getEngine(), t = { width: this._mapSize, height: this._mapSize, layers: this.numCascades };
    this._shadowMap = new Se(
      this._light.name + "_CSMShadowMap",
      t,
      this._scene,
      !1,
      !0,
      this._textureType,
      !1,
      void 0,
      !1,
      !1,
      void 0
      /*, 6*/
    ), this._shadowMap.createDepthStencilTexture(e.useReverseDepthBuffer ? 516 : 513, !0);
  }
  _initializeShadowMap() {
    if (super._initializeShadowMap(), this._shadowMap === null)
      return;
    this._transformMatricesAsArray = new Float32Array(this._numCascades * 16), this._viewSpaceFrustumsZ = new Array(this._numCascades), this._frustumLengths = new Array(this._numCascades), this._lightSizeUVCorrection = new Array(this._numCascades * 2), this._depthCorrection = new Array(this._numCascades), this._cascades = [], this._viewMatrices = [], this._projectionMatrices = [], this._transformMatrices = [], this._cascadeMinExtents = [], this._cascadeMaxExtents = [], this._frustumCenter = [], this._shadowCameraPos = [], this._frustumCornersWorldSpace = [];
    for (let t = 0; t < this._numCascades; ++t) {
      this._cascades[t] = {
        prevBreakDistance: 0,
        breakDistance: 0
      }, this._viewMatrices[t] = C.Zero(), this._projectionMatrices[t] = C.Zero(), this._transformMatrices[t] = C.Zero(), this._cascadeMinExtents[t] = new p(), this._cascadeMaxExtents[t] = new p(), this._frustumCenter[t] = new p(), this._shadowCameraPos[t] = new p(), this._frustumCornersWorldSpace[t] = new Array(A._FrustumCornersNDCSpace.length);
      for (let i = 0; i < A._FrustumCornersNDCSpace.length; ++i)
        this._frustumCornersWorldSpace[t][i] = new p();
    }
    const e = this._scene.getEngine();
    this._shadowMap.onBeforeBindObservable.clear(), this._shadowMap.onBeforeRenderObservable.clear(), this._shadowMap.onBeforeRenderObservable.add((t) => {
      this._sceneUBOs && this._scene.setSceneUniformBuffer(this._sceneUBOs[t]), this._currentLayer = t, this._filter === u.FILTER_PCF && e.setColorWrite(!1), this._scene.setTransformMatrix(this.getCascadeViewMatrix(t), this.getCascadeProjectionMatrix(t)), this._useUBO && (this._scene.getSceneUniformBuffer().unbindEffect(), this._scene.finalizeSceneUbo());
    }), this._shadowMap.onBeforeBindObservable.add(() => {
      var t;
      this._currentSceneUBO = this._scene.getSceneUniformBuffer(), (t = e._debugPushGroup) === null || t === void 0 || t.call(e, `cascaded shadow map generation for pass id ${e.currentRenderPassId}`, 1), this._breaksAreDirty && this._splitFrustum(), this._computeMatrices();
    }), this._splitFrustum();
  }
  _bindCustomEffectForRenderSubMeshForShadowMap(e, t) {
    t.setMatrix("viewProjection", this.getCascadeTransformMatrix(this._currentLayer));
  }
  _isReadyCustomDefines(e) {
    e.push("#define SM_DEPTHCLAMP " + (this._depthClamp && this._filter !== u.FILTER_PCSS ? "1" : "0"));
  }
  /**
   * Prepare all the defines in a material relying on a shadow map at the specified light index.
   * @param defines Defines of the material we want to update
   * @param lightIndex Index of the light in the enabled light list of the material
   */
  prepareDefines(e, t) {
    super.prepareDefines(e, t);
    const i = this._scene, s = this._light;
    if (!i.shadowsEnabled || !s.shadowEnabled)
      return;
    e["SHADOWCSM" + t] = !0, e["SHADOWCSMDEBUG" + t] = this.debug, e["SHADOWCSMNUM_CASCADES" + t] = this.numCascades, e["SHADOWCSM_RIGHTHANDED" + t] = i.useRightHandedSystem;
    const r = this._getCamera();
    r && this._shadowMaxZ < r.maxZ && (e["SHADOWCSMUSESHADOWMAXZ" + t] = !0), this.cascadeBlendPercentage === 0 && (e["SHADOWCSMNOBLEND" + t] = !0);
  }
  /**
   * Binds the shadow related information inside of an effect (information like near, far, darkness...
   * defined in the generator but impacting the effect).
   * @param lightIndex Index of the light in the enabled light list of the material owning the effect
   * @param effect The effect we are binfing the information for
   */
  bindShadowLight(e, t) {
    const i = this._light;
    if (!this._scene.shadowsEnabled || !i.shadowEnabled)
      return;
    const r = this._getCamera();
    if (!r)
      return;
    const n = this.getShadowMap();
    if (!n)
      return;
    const a = n.getSize().width;
    if (t.setMatrices("lightMatrix" + e, this._transformMatricesAsArray), t.setArray("viewFrustumZ" + e, this._viewSpaceFrustumsZ), t.setFloat("cascadeBlendFactor" + e, this.cascadeBlendPercentage === 0 ? 1e4 : 1 / this.cascadeBlendPercentage), t.setArray("frustumLengths" + e, this._frustumLengths), this._filter === u.FILTER_PCF)
      t.setDepthStencilTexture("shadowSampler" + e, n), i._uniformBuffer.updateFloat4("shadowsInfo", this.getDarkness(), a, 1 / a, this.frustumEdgeFalloff, e);
    else if (this._filter === u.FILTER_PCSS) {
      for (let o = 0; o < this._numCascades; ++o)
        this._lightSizeUVCorrection[o * 2 + 0] = o === 0 ? 1 : (this._cascadeMaxExtents[0].x - this._cascadeMinExtents[0].x) / (this._cascadeMaxExtents[o].x - this._cascadeMinExtents[o].x), this._lightSizeUVCorrection[o * 2 + 1] = o === 0 ? 1 : (this._cascadeMaxExtents[0].y - this._cascadeMinExtents[0].y) / (this._cascadeMaxExtents[o].y - this._cascadeMinExtents[o].y), this._depthCorrection[o] = o === 0 ? 1 : (this._cascadeMaxExtents[o].z - this._cascadeMinExtents[o].z) / (this._cascadeMaxExtents[0].z - this._cascadeMinExtents[0].z);
      t.setDepthStencilTexture("shadowSampler" + e, n), t.setTexture("depthSampler" + e, n), t.setArray2("lightSizeUVCorrection" + e, this._lightSizeUVCorrection), t.setArray("depthCorrection" + e, this._depthCorrection), t.setFloat("penumbraDarkness" + e, this.penumbraDarkness), i._uniformBuffer.updateFloat4("shadowsInfo", this.getDarkness(), 1 / a, this._contactHardeningLightSizeUVRatio * a, this.frustumEdgeFalloff, e);
    } else
      t.setTexture("shadowSampler" + e, n), i._uniformBuffer.updateFloat4("shadowsInfo", this.getDarkness(), a, 1 / a, this.frustumEdgeFalloff, e);
    i._uniformBuffer.updateFloat2("depthValues", this.getLight().getDepthMinZ(r), this.getLight().getDepthMinZ(r) + this.getLight().getDepthMaxZ(r), e);
  }
  /**
   * Gets the transformation matrix of the first cascade used to project the meshes into the map from the light point of view.
   * (eq to view projection * shadow projection matrices)
   * @returns The transform matrix used to create the shadow map
   */
  getTransformMatrix() {
    return this.getCascadeTransformMatrix(0);
  }
  /**
   * Disposes the ShadowGenerator.
   * Returns nothing.
   */
  dispose() {
    super.dispose(), this._freezeShadowCastersBoundingInfoObservable && (this._scene.onBeforeRenderObservable.remove(this._freezeShadowCastersBoundingInfoObservable), this._freezeShadowCastersBoundingInfoObservable = null), this._depthReducer && (this._depthReducer.dispose(), this._depthReducer = null);
  }
  /**
   * Serializes the shadow generator setup to a json object.
   * @returns The serialized JSON object
   */
  serialize() {
    const e = super.serialize(), t = this.getShadowMap();
    if (!t)
      return e;
    if (e.numCascades = this._numCascades, e.debug = this._debug, e.stabilizeCascades = this.stabilizeCascades, e.lambda = this._lambda, e.cascadeBlendPercentage = this.cascadeBlendPercentage, e.depthClamp = this._depthClamp, e.autoCalcDepthBounds = this.autoCalcDepthBounds, e.shadowMaxZ = this._shadowMaxZ, e.penumbraDarkness = this.penumbraDarkness, e.freezeShadowCastersBoundingInfo = this._freezeShadowCastersBoundingInfo, e.minDistance = this.minDistance, e.maxDistance = this.maxDistance, e.renderList = [], t.renderList)
      for (let i = 0; i < t.renderList.length; i++) {
        const s = t.renderList[i];
        e.renderList.push(s.id);
      }
    return e;
  }
  /**
   * Parses a serialized ShadowGenerator and returns a new ShadowGenerator.
   * @param parsedShadowGenerator The JSON object to parse
   * @param scene The scene to create the shadow map for
   * @returns The parsed shadow generator
   */
  static Parse(e, t) {
    const i = u.Parse(e, t, (s, r, n) => new A(s, r, void 0, n));
    return e.numCascades !== void 0 && (i.numCascades = e.numCascades), e.debug !== void 0 && (i.debug = e.debug), e.stabilizeCascades !== void 0 && (i.stabilizeCascades = e.stabilizeCascades), e.lambda !== void 0 && (i.lambda = e.lambda), e.cascadeBlendPercentage !== void 0 && (i.cascadeBlendPercentage = e.cascadeBlendPercentage), e.depthClamp !== void 0 && (i.depthClamp = e.depthClamp), e.autoCalcDepthBounds !== void 0 && (i.autoCalcDepthBounds = e.autoCalcDepthBounds), e.shadowMaxZ !== void 0 && (i.shadowMaxZ = e.shadowMaxZ), e.penumbraDarkness !== void 0 && (i.penumbraDarkness = e.penumbraDarkness), e.freezeShadowCastersBoundingInfo !== void 0 && (i.freezeShadowCastersBoundingInfo = e.freezeShadowCastersBoundingInfo), e.minDistance !== void 0 && e.maxDistance !== void 0 && i.setMinMaxDistance(e.minDistance, e.maxDistance), i;
  }
}
A._FrustumCornersNDCSpace = [
  new p(-1, 1, -1),
  new p(1, 1, -1),
  new p(1, -1, -1),
  new p(-1, -1, -1),
  new p(-1, 1, 1),
  new p(1, 1, 1),
  new p(1, -1, 1),
  new p(-1, -1, 1)
];
A.CLASSNAME = "CascadedShadowGenerator";
A.DEFAULT_CASCADES_COUNT = 4;
A.MIN_CASCADES_COUNT = 2;
A.MAX_CASCADES_COUNT = 4;
A._SceneComponentInitialization = (l) => {
  throw $e("ShadowGeneratorSceneComponent");
};
Pt.AddParser(be.NAME_SHADOWGENERATOR, (l, e) => {
  if (l.shadowGenerators !== void 0 && l.shadowGenerators !== null)
    for (let t = 0, i = l.shadowGenerators.length; t < i; t++) {
      const s = l.shadowGenerators[t];
      s.className === A.CLASSNAME ? A.Parse(s, e) : u.Parse(s, e);
    }
});
class Si {
  /**
   * Creates a new instance of the component for the given scene
   * @param scene Defines the scene to register the component in
   */
  constructor(e) {
    this.name = be.NAME_SHADOWGENERATOR, this.scene = e;
  }
  /**
   * Registers the component in a given scene
   */
  register() {
    this.scene._gatherRenderTargetsStage.registerStep(be.STEP_GATHERRENDERTARGETS_SHADOWGENERATOR, this, this._gatherRenderTargets);
  }
  /**
   * Rebuilds the elements related to this component in case of
   * context lost for instance.
   */
  rebuild() {
  }
  /**
   * Serializes the component data to the specified json object
   * @param serializationObject The object to serialize to
   */
  serialize(e) {
    e.shadowGenerators = [];
    const t = this.scene.lights;
    for (const i of t) {
      const s = i.getShadowGenerators();
      if (s) {
        const r = s.values();
        for (let n = r.next(); n.done !== !0; n = r.next()) {
          const a = n.value;
          e.shadowGenerators.push(a.serialize());
        }
      }
    }
  }
  /**
   * Adds all the elements from the container to the scene
   * @param container the container holding the elements
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addFromContainer(e) {
  }
  /**
   * Removes all the elements in the container from the scene
   * @param container contains the elements to remove
   * @param dispose if the removed element should be disposed (default: false)
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeFromContainer(e, t) {
  }
  /**
   * Rebuilds the elements related to this component in case of
   * context lost for instance.
   */
  dispose() {
  }
  _gatherRenderTargets(e) {
    const t = this.scene;
    if (this.scene.shadowsEnabled)
      for (let i = 0; i < t.lights.length; i++) {
        const s = t.lights[i], r = s.getShadowGenerators();
        if (s.isEnabled() && s.shadowEnabled && r) {
          const n = r.values();
          for (let a = n.next(); a.done !== !0; a = n.next()) {
            const c = a.value.getShadowMap();
            t.textures.indexOf(c) !== -1 && e.push(c);
          }
        }
      }
  }
}
u._SceneComponentInitialization = (l) => {
  let e = l._getComponent(be.NAME_SHADOWGENERATOR);
  e || (e = new Si(l), l._addComponent(e));
};
const Mi = {
  enableShadows: !0
};
function rt(l = Mi) {
  const { enableShadows: e, shadowTransparency: t, intensity: i, scene: s } = l, r = new Y("DirectionalLight", new p(-0.3, -1, 0.4), s);
  r.position = new p(-50, 65, -50), r.intensity = 0.65 * i;
  const n = new Ie("HemisphericLight", new p(1, 1, 0), s);
  return n.intensity = 0.4 * i, e && (r.shadowMinZ = 1, r.shadowMaxZ = 70, r.shadowGenerator = new u(2048, r), r.shadowGenerator.useCloseExponentialShadowMap = !0, r.shadowGenerator.darkness = t), { directional: r, hemispheric: n };
}
function ut(l) {
  let t = [0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23];
  const i = [
    0,
    0,
    1,
    0,
    0,
    1,
    0,
    0,
    1,
    0,
    0,
    1,
    0,
    0,
    -1,
    0,
    0,
    -1,
    0,
    0,
    -1,
    0,
    0,
    -1,
    1,
    0,
    0,
    1,
    0,
    0,
    1,
    0,
    0,
    1,
    0,
    0,
    -1,
    0,
    0,
    -1,
    0,
    0,
    -1,
    0,
    0,
    -1,
    0,
    0,
    0,
    1,
    0,
    0,
    1,
    0,
    0,
    1,
    0,
    0,
    1,
    0,
    0,
    -1,
    0,
    0,
    -1,
    0,
    0,
    -1,
    0,
    0,
    -1,
    0
  ], s = [];
  let r = [];
  const n = l.width || l.size || 1, a = l.height || l.size || 1, o = l.depth || l.size || 1, c = l.wrap || !1;
  let d = l.topBaseAt === void 0 ? 1 : l.topBaseAt, h = l.bottomBaseAt === void 0 ? 0 : l.bottomBaseAt;
  d = (d + 4) % 4, h = (h + 4) % 4;
  const m = [2, 0, 3, 1], x = [2, 0, 1, 3];
  let S = m[d], _ = x[h], T = [
    1,
    -1,
    1,
    -1,
    -1,
    1,
    -1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    -1,
    -1,
    1,
    -1,
    -1,
    -1,
    -1,
    1,
    -1,
    -1,
    1,
    1,
    -1,
    1,
    -1,
    -1,
    1,
    -1,
    1,
    1,
    1,
    1,
    -1,
    1,
    1,
    -1,
    -1,
    1,
    -1,
    -1,
    -1,
    -1,
    1,
    -1,
    -1,
    1,
    1,
    -1,
    1,
    -1,
    1,
    1,
    -1,
    1,
    1,
    1,
    1,
    -1,
    1,
    1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1
  ];
  if (c) {
    t = [2, 3, 0, 2, 0, 1, 4, 5, 6, 4, 6, 7, 9, 10, 11, 9, 11, 8, 12, 14, 15, 12, 13, 14], T = [
      -1,
      1,
      1,
      1,
      1,
      1,
      1,
      -1,
      1,
      -1,
      -1,
      1,
      1,
      1,
      -1,
      -1,
      1,
      -1,
      -1,
      -1,
      -1,
      1,
      -1,
      -1,
      1,
      1,
      1,
      1,
      1,
      -1,
      1,
      -1,
      -1,
      1,
      -1,
      1,
      -1,
      1,
      -1,
      -1,
      1,
      1,
      -1,
      -1,
      1,
      -1,
      -1,
      -1
    ];
    let M = [
      [1, 1, 1],
      [-1, 1, 1],
      [-1, 1, -1],
      [1, 1, -1]
    ], N = [
      [-1, -1, 1],
      [1, -1, 1],
      [1, -1, -1],
      [-1, -1, -1]
    ];
    const U = [17, 18, 19, 16], H = [22, 23, 20, 21];
    for (; S > 0; )
      M.unshift(M.pop()), U.unshift(U.pop()), S--;
    for (; _ > 0; )
      N.unshift(N.pop()), H.unshift(H.pop()), _--;
    M = M.flat(), N = N.flat(), T = T.concat(M).concat(N), t.push(U[0], U[2], U[3], U[0], U[1], U[2]), t.push(H[0], H[2], H[3], H[0], H[1], H[2]);
  }
  const g = [n / 2, a / 2, o / 2];
  r = T.reduce((M, N, U) => M.concat(N * g[U % 3]), []);
  const E = l.sideOrientation === 0 ? 0 : l.sideOrientation || ge.DEFAULTSIDE, P = l.faceUV || new Array(6), w = l.faceColors, z = [];
  for (let M = 0; M < 6; M++)
    P[M] === void 0 && (P[M] = new Rt(0, 0, 1, 1)), w && w[M] === void 0 && (w[M] = new me(1, 1, 1, 1));
  for (let M = 0; M < 6; M++)
    if (s.push(P[M].z, Ae.UseOpenGLOrientationForUV ? 1 - P[M].w : P[M].w), s.push(P[M].x, Ae.UseOpenGLOrientationForUV ? 1 - P[M].w : P[M].w), s.push(P[M].x, Ae.UseOpenGLOrientationForUV ? 1 - P[M].y : P[M].y), s.push(P[M].z, Ae.UseOpenGLOrientationForUV ? 1 - P[M].y : P[M].y), w)
      for (let N = 0; N < 4; N++)
        z.push(w[M].r, w[M].g, w[M].b, w[M].a);
  ge._ComputeSides(E, r, t, i, s, l.frontUVs, l.backUVs);
  const k = new ge();
  if (k.indices = t, k.positions = r, k.normals = i, k.uvs = s, w) {
    const M = E === ge.DOUBLESIDE ? z.concat(z) : z;
    k.colors = M;
  }
  return k;
}
function ue(l, e = {}, t = null) {
  const i = new Me(l, t);
  return e.sideOrientation = Me._GetDefaultSideOrientation(e.sideOrientation), i._originalBuilderSideOrientation = e.sideOrientation, ut(e).applyToMesh(i, e.updatable), i;
}
ge.CreateBox = ut;
Me.CreateBox = (l, e, t = null, i, s) => ue(l, {
  size: e,
  sideOrientation: s,
  updatable: i
}, t);
const xi = "imageProcessingCompatibility", Ti = `#ifdef IMAGEPROCESSINGPOSTPROCESS
gl_FragColor.rgb=pow(gl_FragColor.rgb,vec3(2.2));
#endif
`;
F.IncludesShadersStore[xi] = Ti;
const Ei = "shadowOnlyPixelShader", Ci = `precision highp float;
uniform vec4 vEyePosition;
uniform float alpha;
uniform vec3 shadowColor;
varying vec3 vPositionW;
#ifdef NORMAL
varying vec3 vNormalW;
#endif
#include<helperFunctions>
#include<__decl__lightFragment>[0..maxSimultaneousLights]
#include<lightsFragmentFunctions>
#include<shadowsFragmentFunctions>
#include<clipPlaneFragmentDeclaration>
#include<fogFragmentDeclaration>
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
#include<clipPlaneFragment>
vec3 viewDirectionW=normalize(vEyePosition.xyz-vPositionW);
#ifdef NORMAL
vec3 normalW=normalize(vNormalW);
#else
vec3 normalW=vec3(1.0,1.0,1.0);
#endif
vec3 diffuseBase=vec3(0.,0.,0.);
lightingInfo info;
float shadow=1.;
float glossiness=0.;
#include<lightFragment>[0..1]
vec4 color=vec4(shadowColor,(1.0-clamp(shadow,0.,1.))*alpha);
#include<fogFragment>
gl_FragColor=color;
#include<imageProcessingCompatibility>
#define CUSTOM_FRAGMENT_MAIN_END
}`;
F.ShadersStore[Ei] = Ci;
const wi = "shadowOnlyVertexShader", Pi = `precision highp float;
attribute vec3 position;
#ifdef NORMAL
attribute vec3 normal;
#endif
#include<bonesDeclaration>
#include<bakedVertexAnimationDeclaration>
#include<instancesDeclaration>
uniform mat4 view;
uniform mat4 viewProjection;
#ifdef POINTSIZE
uniform float pointSize;
#endif
varying vec3 vPositionW;
#ifdef NORMAL
varying vec3 vNormalW;
#endif
#ifdef VERTEXCOLOR
varying vec4 vColor;
#endif
#include<clipPlaneVertexDeclaration>
#include<fogVertexDeclaration>
#include<__decl__lightFragment>[0..maxSimultaneousLights]
#define CUSTOM_VERTEX_DEFINITIONS
void main(void) {
#define CUSTOM_VERTEX_MAIN_BEGIN
#include<instancesVertex>
#include<bonesVertex>
#include<bakedVertexAnimation>
vec4 worldPos=finalWorld*vec4(position,1.0);
gl_Position=viewProjection*worldPos;
vPositionW=vec3(worldPos);
#ifdef NORMAL
vNormalW=normalize(vec3(finalWorld*vec4(normal,0.0)));
#endif
#include<clipPlaneVertex>
#include<fogVertex>
#include<shadowsVertex>[0..maxSimultaneousLights]
#if defined(POINTSIZE) && !defined(WEBGPU)
gl_PointSize=pointSize;
#endif
#define CUSTOM_VERTEX_MAIN_END
}
`;
F.ShadersStore[wi] = Pi;
class Ri extends At {
  constructor() {
    super(), this.CLIPPLANE = !1, this.CLIPPLANE2 = !1, this.CLIPPLANE3 = !1, this.CLIPPLANE4 = !1, this.CLIPPLANE5 = !1, this.CLIPPLANE6 = !1, this.POINTSIZE = !1, this.FOG = !1, this.NORMAL = !1, this.NUM_BONE_INFLUENCERS = 0, this.BonesPerMesh = 0, this.INSTANCES = !1, this.IMAGEPROCESSINGPOSTPROCESS = !1, this.SKIPFINALCOLORCLAMP = !1, this.rebuild();
  }
}
class Te extends vt {
  constructor(e, t) {
    super(e, t), this._needAlphaBlending = !0, this.shadowColor = Xe.Black();
  }
  needAlphaBlending() {
    return this._needAlphaBlending;
  }
  needAlphaTesting() {
    return !1;
  }
  getAlphaTestTexture() {
    return null;
  }
  get activeLight() {
    return this._activeLight;
  }
  set activeLight(e) {
    this._activeLight = e;
  }
  _getFirstShadowLightForMesh(e) {
    for (const t of e.lightSources)
      if (t.shadowEnabled)
        return t;
    return null;
  }
  // Methods
  isReadyForSubMesh(e, t, i) {
    var s;
    if (this.isFrozen && t.effect && t.effect._wasPreviouslyReady && t.effect._wasPreviouslyUsingInstances === i)
      return !0;
    t.materialDefines || (t.materialDefines = new Ri());
    const r = t.materialDefines, n = this.getScene();
    if (this._isReadyForSubMesh(t))
      return !0;
    const a = n.getEngine();
    if (this._activeLight) {
      for (const c of e.lightSources)
        if (c.shadowEnabled) {
          if (this._activeLight === c)
            break;
          const d = e.lightSources.indexOf(this._activeLight);
          d !== -1 && (e.lightSources.splice(d, 1), e.lightSources.splice(0, 0, this._activeLight));
          break;
        }
    }
    L.PrepareDefinesForFrameBoundValues(n, a, this, r, !!i), L.PrepareDefinesForMisc(e, n, !1, this.pointsCloud, this.fogEnabled, this._shouldTurnAlphaTestOn(e), r), r._needNormals = L.PrepareDefinesForLights(n, e, r, !1, 1);
    const o = (s = this._getFirstShadowLightForMesh(e)) === null || s === void 0 ? void 0 : s.getShadowGenerator();
    if (this._needAlphaBlending = !0, o && o.getClassName && o.getClassName() === "CascadedShadowGenerator") {
      const c = o;
      this._needAlphaBlending = !c.autoCalcDepthBounds;
    }
    if (L.PrepareDefinesForAttributes(e, r, !1, !0), r.isDirty) {
      r.markAsProcessed(), n.resetCachedMaterial();
      const c = new ct();
      r.FOG && c.addFallback(1, "FOG"), L.HandleFallbacksForShadows(r, c, 1), r.NUM_BONE_INFLUENCERS > 0 && c.addCPUSkinningFallback(0, e), r.IMAGEPROCESSINGPOSTPROCESS = n.imageProcessingConfiguration.applyByPostProcess;
      const d = [v.PositionKind];
      r.NORMAL && d.push(v.NormalKind), L.PrepareAttributesForBones(d, e, r, c), L.PrepareAttributesForInstances(d, r);
      const h = "shadowOnly", m = r.toString(), x = ["world", "view", "viewProjection", "vEyePosition", "vLightsType", "vFogInfos", "vFogColor", "pointSize", "alpha", "shadowColor", "mBones"], S = new Array(), _ = new Array();
      je(x), L.PrepareUniformsAndSamplersList({
        uniformsNames: x,
        uniformBuffersNames: _,
        samplers: S,
        defines: r,
        maxSimultaneousLights: 1
      }), t.setEffect(n.getEngine().createEffect(h, {
        attributes: d,
        uniformsNames: x,
        uniformBuffersNames: _,
        samplers: S,
        defines: m,
        fallbacks: c,
        onCompiled: this.onCompiled,
        onError: this.onError,
        indexParameters: { maxSimultaneousLights: 1 }
      }, a), r, this._materialContext);
    }
    return !t.effect || !t.effect.isReady() ? !1 : (r._renderId = n.getRenderId(), t.effect._wasPreviouslyReady = !0, t.effect._wasPreviouslyUsingInstances = !!i, !0);
  }
  bindForSubMesh(e, t, i) {
    const s = this.getScene(), r = i.materialDefines;
    if (!r)
      return;
    const n = i.effect;
    if (n) {
      if (this._activeEffect = n, this.bindOnlyWorldMatrix(e), this._activeEffect.setMatrix("viewProjection", s.getTransformMatrix()), L.BindBonesParameters(t, this._activeEffect), this._mustRebind(s, n) && (Qe(n, this, s), this.pointsCloud && this._activeEffect.setFloat("pointSize", this.pointSize), this._activeEffect.setFloat("alpha", this.alpha), this._activeEffect.setColor3("shadowColor", this.shadowColor), s.bindEyePosition(n)), s.lightsEnabled) {
        L.BindLights(s, t, this._activeEffect, r, 1);
        const a = this._getFirstShadowLightForMesh(t);
        a && (a._renderId = -1);
      }
      (s.fogEnabled && t.applyFog && s.fogMode !== at.FOGMODE_NONE || r.SHADOWCSM0) && this._activeEffect.setMatrix("view", s.getViewMatrix()), L.BindFogParameters(s, t, this._activeEffect), this._afterBind(t, this._activeEffect);
    }
  }
  clone(e) {
    return Ze.Clone(() => new Te(e, this.getScene()), this);
  }
  serialize() {
    const e = super.serialize();
    return e.customType = "BABYLON.ShadowOnlyMaterial", e;
  }
  getClassName() {
    return "ShadowOnlyMaterial";
  }
  // Statics
  static Parse(e, t, i) {
    return Ze.Parse(() => new Te(e.name, t), e, t, i);
  }
}
dt("BABYLON.ShadowOnlyMaterial", Te);
const vi = {
  aspect: 300 / 150,
  enableDebugging: !1,
  enableShadows: !0
};
class Ai {
  constructor(e) {
    ee(this, "size", 9.5);
    this.config = { ...vi, ...e }, this.create();
  }
  create(e) {
    this.destroy(), Object.assign(this.config, e);
    const { aspect: t, enableDebugging: i, enableShadows: s } = this.config, r = 30;
    this.box = new Dt("diceBox");
    let n = new Te("shadowOnly", this.config.scene);
    n.alpha = s ? 1 : 0, i && (n = new Ke("diceBox_material"), n.alpha = 0.7, n.diffuseColor = new Xe(1, 1, 0));
    const a = ue("ground", {
      width: this.size * 2,
      height: 1,
      depth: this.size * 2
    }, this.config.scene);
    if (a.scaling = new p(t, 1, 1), a.material = n, a.receiveShadows = !0, a.setParent(this.box), i) {
      const o = ue("wallTop", {
        width: this.size,
        height: r,
        depth: 1
      }, this.config.scene);
      o.position.y = r / 2, o.position.z = this.size / -2, o.scaling = new p(t, 1, 1), o.material = n, o.setParent(this.box);
      const c = ue("wallRight", {
        width: 1,
        height: r,
        depth: this.size
      }, this.config.scene);
      c.position.x = this.size * t / 2, c.position.y = r / 2, c.material = n, c.setParent(this.box);
      const d = ue("wallBottom", {
        width: this.size,
        height: r,
        depth: 1
      }, this.config.scene);
      d.position.y = r / 2, d.position.z = this.size / 2, d.scaling = new p(t, 1, 1), d.material = n, d.setParent(this.box);
      const h = ue("wallLeft", {
        width: 1,
        height: r,
        depth: this.size
      }, this.config.scene);
      h.position.x = this.size * t / -2, h.position.y = r / 2, h.material = n, h.setParent(this.box);
    }
  }
  destroy() {
    this.box && this.box.dispose();
  }
}
class Di {
  constructor() {
  }
}
class ne extends Ke {
  AttachAfterBind(e, t) {
    if (this._newUniformInstances)
      for (const i in this._newUniformInstances) {
        const s = i.toString().split("-");
        s[0] == "vec2" ? t.setVector2(s[1], this._newUniformInstances[i]) : s[0] == "vec3" ? t.setVector3(s[1], this._newUniformInstances[i]) : s[0] == "vec4" ? t.setVector4(s[1], this._newUniformInstances[i]) : s[0] == "mat4" ? t.setMatrix(s[1], this._newUniformInstances[i]) : s[0] == "float" && t.setFloat(s[1], this._newUniformInstances[i]);
      }
    if (this._newSamplerInstances)
      for (const i in this._newSamplerInstances) {
        const s = i.toString().split("-");
        s[0] == "sampler2D" && this._newSamplerInstances[i].isReady && this._newSamplerInstances[i].isReady() && t.setTexture(s[1], this._newSamplerInstances[i]);
      }
  }
  ReviewUniform(e, t) {
    if (e == "uniform" && this._newUniforms)
      for (let i = 0; i < this._newUniforms.length; i++)
        this._customUniform[i].indexOf("sampler") == -1 && t.push(this._newUniforms[i].replace(/\[\d*\]/g, ""));
    if (e == "sampler" && this._newUniforms)
      for (let i = 0; i < this._newUniforms.length; i++)
        this._customUniform[i].indexOf("sampler") != -1 && t.push(this._newUniforms[i].replace(/\[\d*\]/g, ""));
    return t;
  }
  Builder(e, t, i, s, r, n) {
    if (n && this._customAttributes && this._customAttributes.length > 0 && n.push(...this._customAttributes), this.ReviewUniform("uniform", t), this.ReviewUniform("sampler", s), this._isCreatedShader)
      return this._createdShaderName;
    this._isCreatedShader = !1, ne.ShaderIndexer++;
    const a = "custom_" + ne.ShaderIndexer, o = this._afterBind.bind(this);
    return this._afterBind = (c, d) => {
      if (d) {
        this.AttachAfterBind(c, d);
        try {
          o(c, d);
        } catch {
        }
      }
    }, te.ShadersStore[a + "VertexShader"] = this.VertexShader.replace("#define CUSTOM_VERTEX_BEGIN", this.CustomParts.Vertex_Begin ? this.CustomParts.Vertex_Begin : "").replace("#define CUSTOM_VERTEX_DEFINITIONS", (this._customUniform ? this._customUniform.join(`
`) : "") + (this.CustomParts.Vertex_Definitions ? this.CustomParts.Vertex_Definitions : "")).replace("#define CUSTOM_VERTEX_MAIN_BEGIN", this.CustomParts.Vertex_MainBegin ? this.CustomParts.Vertex_MainBegin : "").replace("#define CUSTOM_VERTEX_UPDATE_POSITION", this.CustomParts.Vertex_Before_PositionUpdated ? this.CustomParts.Vertex_Before_PositionUpdated : "").replace("#define CUSTOM_VERTEX_UPDATE_NORMAL", this.CustomParts.Vertex_Before_NormalUpdated ? this.CustomParts.Vertex_Before_NormalUpdated : "").replace("#define CUSTOM_VERTEX_MAIN_END", this.CustomParts.Vertex_MainEnd ? this.CustomParts.Vertex_MainEnd : ""), this.CustomParts.Vertex_After_WorldPosComputed && (te.ShadersStore[a + "VertexShader"] = te.ShadersStore[a + "VertexShader"].replace("#define CUSTOM_VERTEX_UPDATE_WORLDPOS", this.CustomParts.Vertex_After_WorldPosComputed)), te.ShadersStore[a + "PixelShader"] = this.FragmentShader.replace("#define CUSTOM_FRAGMENT_BEGIN", this.CustomParts.Fragment_Begin ? this.CustomParts.Fragment_Begin : "").replace("#define CUSTOM_FRAGMENT_MAIN_BEGIN", this.CustomParts.Fragment_MainBegin ? this.CustomParts.Fragment_MainBegin : "").replace("#define CUSTOM_FRAGMENT_DEFINITIONS", (this._customUniform ? this._customUniform.join(`
`) : "") + (this.CustomParts.Fragment_Definitions ? this.CustomParts.Fragment_Definitions : "")).replace("#define CUSTOM_FRAGMENT_UPDATE_DIFFUSE", this.CustomParts.Fragment_Custom_Diffuse ? this.CustomParts.Fragment_Custom_Diffuse : "").replace("#define CUSTOM_FRAGMENT_UPDATE_ALPHA", this.CustomParts.Fragment_Custom_Alpha ? this.CustomParts.Fragment_Custom_Alpha : "").replace("#define CUSTOM_FRAGMENT_BEFORE_LIGHTS", this.CustomParts.Fragment_Before_Lights ? this.CustomParts.Fragment_Before_Lights : "").replace("#define CUSTOM_FRAGMENT_BEFORE_FRAGCOLOR", this.CustomParts.Fragment_Before_FragColor ? this.CustomParts.Fragment_Before_FragColor : "").replace("#define CUSTOM_FRAGMENT_MAIN_END", this.CustomParts.Fragment_MainEnd ? this.CustomParts.Fragment_MainEnd : ""), this.CustomParts.Fragment_Before_Fog && (te.ShadersStore[a + "PixelShader"] = te.ShadersStore[a + "PixelShader"].replace("#define CUSTOM_FRAGMENT_BEFORE_FOG", this.CustomParts.Fragment_Before_Fog)), this._isCreatedShader = !0, this._createdShaderName = a, a;
  }
  constructor(e, t) {
    super(e, t), this.CustomParts = new Di(), this.customShaderNameResolve = this.Builder, this.FragmentShader = te.ShadersStore.defaultPixelShader, this.VertexShader = te.ShadersStore.defaultVertexShader;
  }
  AddUniform(e, t, i) {
    return this._customUniform || (this._customUniform = new Array(), this._newUniforms = new Array(), this._newSamplerInstances = {}, this._newUniformInstances = {}), i && (t.indexOf("sampler") != -1 ? this._newSamplerInstances[t + "-" + e] = i : this._newUniformInstances[t + "-" + e] = i), this._customUniform.push("uniform " + t + " " + e + ";"), this._newUniforms.push(e), this;
  }
  AddAttribute(e) {
    return this._customAttributes || (this._customAttributes = []), this._customAttributes.push(e), this;
  }
  Fragment_Begin(e) {
    return this.CustomParts.Fragment_Begin = e, this;
  }
  Fragment_Definitions(e) {
    return this.CustomParts.Fragment_Definitions = e, this;
  }
  Fragment_MainBegin(e) {
    return this.CustomParts.Fragment_MainBegin = e, this;
  }
  Fragment_MainEnd(e) {
    return this.CustomParts.Fragment_MainEnd = e, this;
  }
  Fragment_Custom_Diffuse(e) {
    return this.CustomParts.Fragment_Custom_Diffuse = e.replace("result", "diffuseColor"), this;
  }
  Fragment_Custom_Alpha(e) {
    return this.CustomParts.Fragment_Custom_Alpha = e.replace("result", "alpha"), this;
  }
  Fragment_Before_Lights(e) {
    return this.CustomParts.Fragment_Before_Lights = e, this;
  }
  Fragment_Before_Fog(e) {
    return this.CustomParts.Fragment_Before_Fog = e, this;
  }
  Fragment_Before_FragColor(e) {
    return this.CustomParts.Fragment_Before_FragColor = e.replace("result", "color"), this;
  }
  Vertex_Begin(e) {
    return this.CustomParts.Vertex_Begin = e, this;
  }
  Vertex_Definitions(e) {
    return this.CustomParts.Vertex_Definitions = e, this;
  }
  Vertex_MainBegin(e) {
    return this.CustomParts.Vertex_MainBegin = e, this;
  }
  Vertex_Before_PositionUpdated(e) {
    return this.CustomParts.Vertex_Before_PositionUpdated = e.replace("result", "positionUpdated"), this;
  }
  Vertex_Before_NormalUpdated(e) {
    return this.CustomParts.Vertex_Before_NormalUpdated = e.replace("result", "normalUpdated"), this;
  }
  Vertex_After_WorldPosComputed(e) {
    return this.CustomParts.Vertex_After_WorldPosComputed = e, this;
  }
  Vertex_MainEnd(e) {
    return this.CustomParts.Vertex_MainEnd = e, this;
  }
}
ne.ShaderIndexer = 1;
dt("BABYLON.CustomMaterial", ne);
ne.prototype.clone = function(l) {
  const e = this, t = Ze.Clone(() => new ne(l, this.getScene()), this);
  return t.name = l, t.id = l, t.CustomParts.Fragment_Begin = e.CustomParts.Fragment_Begin, t.CustomParts.Fragment_Definitions = e.CustomParts.Fragment_Definitions, t.CustomParts.Fragment_MainBegin = e.CustomParts.Fragment_MainBegin, t.CustomParts.Fragment_Custom_Diffuse = e.CustomParts.Fragment_Custom_Diffuse, t.CustomParts.Fragment_Before_Lights = e.CustomParts.Fragment_Before_Lights, t.CustomParts.Fragment_Before_Fog = e.CustomParts.Fragment_Before_Fog, t.CustomParts.Fragment_Custom_Alpha = e.CustomParts.Fragment_Custom_Alpha, t.CustomParts.Fragment_Before_FragColor = e.CustomParts.Fragment_Before_FragColor, t.CustomParts.Vertex_Begin = e.CustomParts.Vertex_Begin, t.CustomParts.Vertex_Definitions = e.CustomParts.Vertex_Definitions, t.CustomParts.Vertex_MainBegin = e.CustomParts.Vertex_MainBegin, t.CustomParts.Vertex_Before_PositionUpdated = e.CustomParts.Vertex_Before_PositionUpdated, t.CustomParts.Vertex_Before_NormalUpdated = e.CustomParts.Vertex_Before_NormalUpdated, t.CustomParts.Vertex_After_WorldPosComputed = e.CustomParts.Vertex_After_WorldPosComputed, t.CustomParts.Vertex_MainEnd = e.CustomParts.Vertex_MainEnd, t;
};
class bi {
  constructor(e) {
    ee(this, "loadedThemes", {});
    ee(this, "themeData", {});
    this.scene = e.scene;
  }
  async loadStandardMaterial(e) {
    const { theme: t, material: i } = e, s = new Ke(t, this.scene);
    i.diffuseTexture && (s.diffuseTexture = await this.getTexture("diffuse", e)), i.bumpTexture && (s.bumpTexture = await this.getTexture("bump", e)), i.specularTexture && (s.specularTexture = await this.getTexture("specular", e)), s.allowShaderHotSwapping = !1;
  }
  // this will create two materials - one with light text and one with dark text, the underlying color can be changed by color instance buffers
  async loadColorMaterial(e) {
    const { theme: t, material: i } = e, s = new ne(t + "_light", this.scene), r = bt(e);
    i.diffuseTexture && i.diffuseTexture.light && (r.material.diffuseTexture = e.material.diffuseTexture.light, s.diffuseTexture = await this.getTexture("diffuse", r)), i.bumpTexture && (s.bumpTexture = await this.getTexture("bump", e)), i.specularTexture && (s.specularTexture = await this.getTexture("specular", e)), s.allowShaderHotSwapping = !1, s.Vertex_Definitions(`
      attribute vec3 customColor;
      varying vec3 vColor;
    `).Vertex_MainEnd(`
      vColor = customColor;
    `).Fragment_Definitions(`
      varying vec3 vColor;
    `).Fragment_Custom_Diffuse(`
      baseColor.rgb = mix(vColor.rgb, baseColor.rgb, baseColor.a);
    `), s.AddAttribute("customColor");
    const n = s.clone(t + "_dark");
    i.diffuseTexture && i.diffuseTexture.dark && (r.material.diffuseTexture = e.material.diffuseTexture.dark, n.diffuseTexture = await this.getTexture("diffuse", r)), n.AddAttribute("customColor");
  }
  async getTexture(e, t) {
    const { basePath: i, material: s, theme: r } = t;
    let n;
    const a = e + "Level", o = e + "Texture";
    try {
      switch (e) {
        case "diffuse":
          n = await this.importTextureAsync(`${i}/${s[o]}`, r), s[a] && (n.level = s[a]);
          break;
        case "bump":
          n = await this.importTextureAsync(`${i}/${s[o]}`, r), s[a] && (n.level = s[a]);
          break;
        case "specular":
          n = await this.importTextureAsync(`${i}/${s[o]}`, r), s.specularPower && (n.specularPower = s.specularPower);
          break;
        default:
          throw new Error(`Texture type: ${e} is not supported`);
      }
    } catch (c) {
      console.error(c);
    }
    return n;
  }
  async importTextureAsync(e, t) {
    return new Promise((i, s) => {
      let r = e.match(/^(.*\/)(.*)$/), n = new B(
        e,
        // url: Nullable<string>
        this.scene,
        // sceneOrEngine: Nullable<Scene | ThinEngine>
        void 0,
        // noMipmapOrOptions?: boolean | ITextureCreationOptions
        !0,
        // invertY?: boolean
        void 0,
        // samplingMode?: number
        () => i(n),
        // onLoad?: Nullable<() => void>
        () => s(`Unable to load texture '${r[2]}' for theme: '${t}'. Check that your assetPath is configured correctly and that the files exist at path: '${r[1]}'`)
        // onError?: Nullable<(message?: string
      );
    }).catch((i) => console.error(i));
  }
  async load(e) {
    const { material: t } = e;
    t.type === "color" ? await this.loadColorMaterial(e) : t.type === "standard" ? await this.loadStandardMaterial(e) : console.error(`Material type: ${t.type} not supported`);
  }
}
var D, fe, K, _e, ie, pe, j, Z, I, Fe, $, Ee, Ce, X, we, Oe, ft;
class Bi {
  constructor(e) {
    // add a die to the scene
    y(this, Oe);
    ee(this, "config");
    ee(this, "initialized", !1);
    y(this, D, {});
    y(this, fe, 0);
    y(this, K, 0);
    y(this, _e, !1);
    y(this, ie, null);
    y(this, pe, []);
    y(this, j, void 0);
    y(this, Z, void 0);
    y(this, I, void 0);
    y(this, Fe, void 0);
    y(this, $, void 0);
    y(this, Ee, void 0);
    y(this, Ce, void 0);
    y(this, X, void 0);
    y(this, we, {});
    ee(this, "noop", () => {
    });
    ee(this, "diceBufferView", new Float32Array(8e3));
    this.onInitComplete = e.onInitComplete || this.noop, this.onThemeLoaded = e.onThemeLoaded || this.noop, this.onRollResult = e.onRollResult || this.noop, this.onRollComplete = e.onRollComplete || this.noop, this.onDieRemoved = e.onDieRemoved || this.noop, this.initialized = this.initScene(e);
  }
  // initialize the babylon scene
  async initScene(e) {
    O(this, j, e.canvas), f(this, j).width = e.width, f(this, j).height = e.height, this.config = e.options, O(this, Z, Ft(f(this, j))), O(this, I, It({ engine: f(this, Z) })), O(this, Fe, Bt({ engine: f(this, Z), scene: f(this, I) })), O(this, $, rt({
      enableShadows: this.config.enableShadows,
      shadowTransparency: this.config.shadowTransparency,
      intensity: this.config.lightIntensity,
      scene: f(this, I)
    })), O(this, Ee, new Ai({
      enableShadows: this.config.enableShadows,
      aspect: f(this, j).width / f(this, j).height,
      lights: f(this, $),
      scene: f(this, I)
    })), O(this, Ce, new bi({ scene: f(this, I) })), this.onInitComplete();
  }
  connect(e) {
    O(this, X, e), f(this, X).postMessage({
      action: "initBuffer",
      diceBuffer: this.diceBufferView.buffer
    }, [this.diceBufferView.buffer]), f(this, X).onmessage = (t) => {
      switch (t.data.action) {
        case "updates":
          this.updatesFromPhysics(t.data.diceBuffer);
          break;
        default:
          console.error("action from physicsWorker not found in offscreen worker");
          break;
      }
    };
  }
  updateConfig(e) {
    const t = this.config;
    this.config = e, t.enableShadows !== this.config.enableShadows && (Object.values(f(this, $)).forEach((i) => i.dispose()), O(this, $, rt(
      {
        enableShadows: this.config.enableShadows,
        shadowTransparency: this.config.shadowTransparency,
        intensity: this.config.lightIntensity,
        scene: f(this, I)
      }
    ))), t.scale !== this.config.scale && Object.values(f(this, D)).forEach(({ mesh: i }) => {
      var s;
      if (i) {
        const { x: r = 1, y: n = 1, z: a = 1 } = (s = i == null ? void 0 : i.metadata) == null ? void 0 : s.baseScale;
        i.scaling = new p(
          this.config.scale * r,
          this.config.scale * n,
          this.config.scale * a
        );
      }
    }), t.shadowTransparency !== this.config.shadowTransparency && (f(this, $).directional.shadowGenerator.darkness = this.config.shadowTransparency), t.lightIntensity !== this.config.lightIntensity && (f(this, $).directional.intensity = 0.65 * this.config.lightIntensity, f(this, $).hemispheric.intensity = 0.4 * this.config.lightIntensity);
  }
  // all this does is start the render engine.
  render(e) {
    f(this, Z).runRenderLoop(this.renderLoop.bind(this)), f(this, X).postMessage({
      action: "resumeSimulation",
      newStartPoint: e
    });
  }
  renderLoop() {
    if (f(this, K) && f(this, K) === Object.keys(f(this, D)).length) {
      if (!f(this, _e))
        if (O(this, _e, !0), f(this, X).postMessage({ action: "stopSimulation" }), this.onRollComplete(), this.config.highlightResult) {
          const e = typeof this.config.highlightResult == "object" && this.config.highlightResult !== null ? this.config.highlightResult.durationMs ?? 3500 : 3500;
          O(this, ie, setTimeout(() => {
            f(this, Z).stopRenderLoop(), O(this, ie, null);
          }, e + 200));
        } else {
          f(this, Z).stopRenderLoop();
          return;
        }
      f(this, I).render();
    } else
      f(this, I).render();
  }
  async loadTheme(e) {
    const { theme: t, basePath: i, material: s, meshFilePath: r, meshName: n } = e;
    if (await f(this, Ce).load({ theme: t, basePath: i, material: s }), !Object.keys(f(this, we)).includes(n)) {
      f(this, we)[n] = r;
      const a = await ce.loadModels({ meshFilePath: r, meshName: n }, f(this, I));
      if (!a)
        throw new Error("No colliders returned from the 3D mesh file. Low poly colliders are expected to be in the same file as the high poly dice and the mesh name contains the word 'collider'");
      f(this, X).postMessage({
        action: "loadModels",
        options: {
          colliders: a,
          meshName: n
        }
      });
    }
    this.onThemeLoaded({ id: t });
  }
  clear() {
    !Object.keys(f(this, D)).length && !f(this, K) || (f(this, ie) && (clearTimeout(f(this, ie)), O(this, ie, null)), O(this, _e, !1), this.diceBufferView.byteLength && this.diceBufferView.fill(0), f(this, pe).forEach((e) => clearTimeout(e)), f(this, Z).stopRenderLoop(), Object.values(f(this, D)).forEach((e) => {
      var t;
      (t = e.glowCleanup) == null || t.call(e), e.mesh && e.mesh.dispose();
    }), O(this, D, {}), O(this, fe, 0), O(this, K, 0), f(this, I).render());
  }
  add(e) {
    ce.loadDie(e, f(this, I)).then((t) => {
      f(this, pe).push(setTimeout(() => {
        Ge(this, Oe, ft).call(this, t);
      }, he(this, fe)._++ * this.config.delay));
    });
  }
  addNonDie(e) {
    f(this, Z).activeRenderLoops.length === 0 && this.render(!1);
    const { id: t, value: i, ...s } = e, r = {
      id: t,
      value: i,
      config: s
    };
    f(this, D)[t] = r, setTimeout(() => {
      f(this, pe).push(setTimeout(() => {
        this.handleAsleep(r);
      }, he(this, fe)._++ * this.config.delay));
    }, 10);
  }
  remove(e) {
    const t = f(this, D)[e.id];
    t.hasOwnProperty("d10Instance") && (f(this, D)[t.d10Instance.id].mesh && (f(this, D)[t.d10Instance.id].mesh.dispose(), f(this, X).postMessage({
      action: "removeDie",
      id: t.d10Instance.id
    })), delete f(this, D)[t.d10Instance.id], he(this, K)._--), f(this, D)[e.id].mesh && f(this, D)[e.id].mesh.dispose(), delete f(this, D)[e.id], he(this, K)._--, f(this, I).render(), this.onDieRemoved(e.rollId);
  }
  updatesFromPhysics(e) {
    this.diceBufferView = new Float32Array(e);
    let t = 1;
    for (let i = 0, s = this.diceBufferView[0]; i < s; i++) {
      if (!Object.keys(f(this, D)).length)
        continue;
      const r = f(this, D)[`${this.diceBufferView[t]}`];
      if (!r) {
        console.log("Error: die not available in scene to animate");
        break;
      }
      if (this.diceBufferView[t + 1] === -1)
        this.handleAsleep(r);
      else {
        const n = this.diceBufferView[t + 1], a = this.diceBufferView[t + 2], o = this.diceBufferView[t + 3], c = this.diceBufferView[t + 4], d = this.diceBufferView[t + 5], h = this.diceBufferView[t + 6], m = this.diceBufferView[t + 7];
        r.mesh.position.set(n, a, o), r.mesh.rotationQuaternion.set(c, d, h, m);
      }
      t = t + 8;
    }
    requestAnimationFrame(() => {
      f(this, X).postMessage({
        action: "stepSimulation",
        diceBuffer: this.diceBufferView.buffer
      }, [this.diceBufferView.buffer]);
    });
  }
  async handleAsleep(e) {
    var t, i;
    if (e.asleep = !0, await ce.getRollResult(e, f(this, I), this.config), e.d10Instance || e.dieParent) {
      if ((t = e == null ? void 0 : e.d10Instance) != null && t.asleep || (i = e == null ? void 0 : e.dieParent) != null && i.asleep) {
        const s = e.config.sides === 100 ? e : e.dieParent, r = e.config.sides === 10 ? e : e.d10Instance;
        s.rawValue && (s.value = s.rawValue), s.rawValue = s.value, s.value = s.value + r.value, this.onRollResult({
          rollId: s.config.rollId,
          value: s.value
        });
      }
    } else
      e.config.sides === 10 && e.value === 0 && (e.value = 10), this.onRollResult({
        rollId: e.config.rollId,
        value: e.value
      });
    he(this, K)._++;
  }
  resize(e) {
    const t = f(this, j).width = e.width, i = f(this, j).height = e.height;
    f(this, Ee).create({ aspect: t / i }), f(this, Z).resize();
  }
}
D = new WeakMap(), fe = new WeakMap(), K = new WeakMap(), _e = new WeakMap(), ie = new WeakMap(), pe = new WeakMap(), j = new WeakMap(), Z = new WeakMap(), I = new WeakMap(), Fe = new WeakMap(), $ = new WeakMap(), Ee = new WeakMap(), Ce = new WeakMap(), X = new WeakMap(), we = new WeakMap(), Oe = new WeakSet(), ft = async function(e) {
  f(this, Z).activeRenderLoops.length === 0 && this.render(e.newStartPoint);
  const t = {
    ...e,
    assetPath: this.config.assetPath,
    enableShadows: this.config.enableShadows,
    scale: this.config.scale,
    lights: f(this, $)
  }, i = new ce(t, f(this, I));
  return f(this, D)[i.id] = i, f(this, X).postMessage({
    action: "addDie",
    options: {
      sides: e.sides,
      scale: this.config.scale,
      id: i.id,
      newStartPoint: e.newStartPoint,
      theme: e.theme,
      meshName: e.meshName
    }
  }), e.sides === 100 && e.data !== "single" && (i.d10Instance = await ce.loadDie({ ...t, dieType: "d10", sides: 10, id: i.id + 1e4 }, f(this, I)).then((s) => {
    const r = new ce(s, f(this, I));
    return r.dieParent = i, r;
  }), f(this, D)[`${i.d10Instance.id}`] = i.d10Instance, f(this, X).postMessage({
    action: "addDie",
    options: {
      sides: 10,
      scale: this.config.scale,
      id: i.d10Instance.id,
      theme: e.theme,
      meshName: e.meshName
    }
  })), i;
};
export {
  Bi as default
};
//# sourceMappingURL=world.onscreen.js.map
