var wt = Object.defineProperty;
var Dt = (c, e, t) => e in c ? wt(c, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : c[e] = t;
var he = (c, e, t) => (Dt(c, typeof e != "symbol" ? e + "" : e, t), t), je = (c, e, t) => {
  if (!e.has(c))
    throw TypeError("Cannot " + t);
};
var T = (c, e, t) => (je(c, e, "read from private field"), t ? t.call(c) : e.get(c)), $ = (c, e, t) => {
  if (e.has(c))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(c) : e.set(c, t);
}, Y = (c, e, t, i) => (je(c, e, "write to private field"), i ? i.call(c, t) : e.set(c, t), t);
var ge = (c, e, t, i) => ({
  set _(s) {
    Y(c, e, s, t);
  },
  get _() {
    return T(c, e, i);
  }
}), ut = (c, e, t) => (je(c, e, "access private method"), t);
import { E as ve, O as V, a as Mt, M as ct, S as Tt, C as Pe, b as C, V as S, _ as E, c as Q, d as Ae, Q as fe, e as me, T as Ne, A as it, s as Ze, f as R, g as It, N as Re, h as we, U as Ot, i as Ue, j as se, L as G, k as rt, l as Ft, G as xt, I as De, m as pe, n as Et, o as Ve, p as w, q as yt, r as D, t as nt, u as ae, v as Ce, w as I, x as Lt, R as st, P as bt, y as Bt, z as ft, B as Nt, F as Xe, H as Ut, J as Z, K as at, W as Rt, X as ot, Y as ht, Z as Ct, $ as zt, a0 as Vt, a1 as ke, a2 as kt, a3 as Wt, a4 as Ht, a5 as lt, a6 as be, D as Se } from "./Dice.js";
import { d as Zt } from "./dice-box.es.js";
function Xt(c) {
  return new ve(c, !0, {
    preserveDrawingBuffer: !0,
    stencil: !0
  });
}
class oe {
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
class Ke extends oe {
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
class _t extends oe {
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
class Qe extends oe {
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
class qe extends oe {
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
class Je extends oe {
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
class Gt extends oe {
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
class et extends oe {
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
class pt extends oe {
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
class le extends oe {
  constructor() {
    super(...arguments), this._canBeMerged = (e) => {
      if (!(e instanceof ct))
        return !1;
      const t = e;
      return !(t.isDisposed() || !t.isVisible || !t.isEnabled() || t.instances.length > 0 || t.skeleton || t.hasLODLevels || t.getTotalVertices() === 0);
    };
  }
  /**
   * Gets or sets a boolean which defines if optimization octree has to be updated
   */
  static get UpdateSelectionTree() {
    return le._UpdateSelectionTree;
  }
  /**
   * Gets or sets a boolean which defines if optimization octree has to be updated
   */
  static set UpdateSelectionTree(e) {
    le._UpdateSelectionTree = e;
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
      const o = new Array(), l = s[a];
      if (this._canBeMerged(l)) {
        o.push(l);
        for (let d = a + 1; d < r; d++) {
          const h = s[d];
          this._canBeMerged(h) && h.material === l.material && h.checkCollisions === l.checkCollisions && (o.push(h), r--, s.splice(d, 1), d--);
        }
        o.length < 2 || ct.MergeMeshes(o, void 0, !0);
      }
    }
    const n = e;
    return n.createOrUpdateSelectionOctree && (i != null ? i && n.createOrUpdateSelectionOctree() : le.UpdateSelectionTree && n.createOrUpdateSelectionOctree()), !0;
  }
}
le._UpdateSelectionTree = !1;
class _e {
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
    const s = new Gt(i);
    return s.onApply = e, s.onGetDescription = t, this.optimizations.push(s), this;
  }
  /**
   * Creates a list of pre-defined optimizations aimed to reduce the visual impact on the scene
   * @param targetFrameRate defines the target frame rate (60 by default)
   * @returns a SceneOptimizerOptions object
   */
  static LowDegradationAllowed(e) {
    const t = new _e(e);
    let i = 0;
    return t.addOptimization(new le(i)), t.addOptimization(new Qe(i)), t.addOptimization(new Je(i)), i++, t.addOptimization(new qe(i)), t.addOptimization(new et(i)), i++, t.addOptimization(new Ke(i, 1024)), t;
  }
  /**
   * Creates a list of pre-defined optimizations aimed to have a moderate impact on the scene visual
   * @param targetFrameRate defines the target frame rate (60 by default)
   * @returns a SceneOptimizerOptions object
   */
  static ModerateDegradationAllowed(e) {
    const t = new _e(e);
    let i = 0;
    return t.addOptimization(new le(i)), t.addOptimization(new Qe(i)), t.addOptimization(new Je(i)), i++, t.addOptimization(new qe(i)), t.addOptimization(new et(i)), i++, t.addOptimization(new Ke(i, 512)), i++, t.addOptimization(new pt(i)), i++, t.addOptimization(new _t(i, 2)), t;
  }
  /**
   * Creates a list of pre-defined optimizations aimed to have a big impact on the scene visual
   * @param targetFrameRate defines the target frame rate (60 by default)
   * @returns a SceneOptimizerOptions object
   */
  static HighDegradationAllowed(e) {
    const t = new _e(e);
    let i = 0;
    return t.addOptimization(new le(i)), t.addOptimization(new Qe(i)), t.addOptimization(new Je(i)), i++, t.addOptimization(new qe(i)), t.addOptimization(new et(i)), i++, t.addOptimization(new Ke(i, 256)), i++, t.addOptimization(new pt(i)), i++, t.addOptimization(new _t(i, 4)), t;
  }
}
class dt {
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
    if (this._isRunning = !1, this._currentPriorityLevel = 0, this._targetFrameRate = 60, this._trackerDuration = 2e3, this._currentFrameRate = 0, this._improvementMode = !1, this.onSuccessObservable = new V(), this.onNewOptimizationAppliedObservable = new V(), this.onFailureObservable = new V(), t ? this._options = t : this._options = new _e(), this._options.targetFrameRate && (this._targetFrameRate = this._options.targetFrameRate), this._options.trackerDuration && (this._trackerDuration = this._options.trackerDuration), i) {
      let r = 0;
      for (const n of this._options.optimizations)
        n.priority = r++;
    }
    this._improvementMode = s, this._scene = e || Mt.LastCreatedScene, this._sceneDisposeObserver = this._scene.onDisposeObservable.add(() => {
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
    const r = new dt(e, t || _e.ModerateDegradationAllowed(), !1);
    return i && r.onSuccessObservable.add(() => {
      i();
    }), s && r.onFailureObservable.add(() => {
      s();
    }), r.start(), r;
  }
}
function $t(c) {
  const { engine: e } = c, t = new Tt(e);
  t.clearColor = new Pe(0, 0, 0, 0), t.pointerMovePredicate = () => !1, t.pointerDownPredicate = () => !1, t.pointerUpPredicate = () => !1, t.clearCachedVertexData(), t.themeData = {};
  const i = _e.LowDegradationAllowed();
  return i.optimizations = i.optimizations.splice(1), i.targetFrameRate = 60, dt.OptimizeAsync(t, i), t;
}
class z extends Q {
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
    super(e, t, i, s), this._tmpUpVector = S.Zero(), this._tmpTargetVector = S.Zero(), this.cameraDirection = new S(0, 0, 0), this.cameraRotation = new Ae(0, 0), this.ignoreParentScaling = !1, this.updateUpVectorFromRotation = !1, this._tmpQuaternion = new fe(), this.rotation = new S(0, 0, 0), this.speed = 2, this.noRotationConstraint = !1, this.invertRotation = !1, this.inverseRotationSpeed = 0.2, this.lockedTarget = null, this._currentTarget = S.Zero(), this._initialFocalDistance = 1, this._viewMatrix = C.Zero(), this._camMatrix = C.Zero(), this._cameraTransformMatrix = C.Zero(), this._cameraRotationMatrix = C.Zero(), this._referencePoint = new S(0, 0, 1), this._transformedReferencePoint = S.Zero(), this._defaultUp = S.Up(), this._cachedRotationZ = 0, this._cachedQuaternionRotationZ = 0;
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
    super._initCache(), this._cache.lockedTarget = new S(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE), this._cache.rotation = new S(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE), this._cache.rotationQuaternion = new fe(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);
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
    this.upVector.normalize(), this._initialFocalDistance = e.subtract(this.position).length(), this.position.z === e.z && (this.position.z += me), this._referencePoint.normalize().scaleInPlace(this._initialFocalDistance), C.LookAtLHToRef(this.position, e, this._defaultUp, this._camMatrix), this._camMatrix.invert(), this.rotation.x = Math.atan(this._camMatrix.m[6] / this._camMatrix.m[10]);
    const t = e.subtract(this.position);
    t.x >= 0 ? this.rotation.y = -Math.atan(t.z / t.x) + Math.PI / 2 : this.rotation.y = -Math.atan(t.z / t.x) - Math.PI / 2, this.rotation.z = 0, isNaN(this.rotation.x) && (this.rotation.x = 0), isNaN(this.rotation.y) && (this.rotation.y = 0), isNaN(this.rotation.z) && (this.rotation.z = 0), this.rotationQuaternion && fe.RotationYawPitchRollToRef(this.rotation.y, this.rotation.x, this.rotation.z, this.rotationQuaternion);
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
      this.parent.getWorldMatrix().invertToRef(Ne.Matrix[0]), S.TransformNormalToRef(this.cameraDirection, Ne.Matrix[0], Ne.Vector3[0]), this.position.addInPlace(Ne.Vector3[0]);
      return;
    }
    this.position.addInPlace(this.cameraDirection);
  }
  /** @internal */
  _checkInputs() {
    const e = this.invertRotation ? -this.inverseRotationSpeed : 1, t = this._decideIfNeedsToMove(), i = Math.abs(this.cameraRotation.x) > 0 || Math.abs(this.cameraRotation.y) > 0;
    t && this._updatePosition(), i && (this.rotationQuaternion && this.rotationQuaternion.toEulerAnglesToRef(this.rotation), this.rotation.x += this.cameraRotation.x * e, this.rotation.y += this.cameraRotation.y * e, this.noRotationConstraint || (this.rotation.x > 1.570796 && (this.rotation.x = 1.570796), this.rotation.x < -1.570796 && (this.rotation.x = -1.570796)), this.rotationQuaternion && this.rotation.lengthSquared() && fe.RotationYawPitchRollToRef(this.rotation.y, this.rotation.x, this.rotation.z, this.rotationQuaternion)), t && (Math.abs(this.cameraDirection.x) < this.speed * me && (this.cameraDirection.x = 0), Math.abs(this.cameraDirection.y) < this.speed * me && (this.cameraDirection.y = 0), Math.abs(this.cameraDirection.z) < this.speed * me && (this.cameraDirection.z = 0), this.cameraDirection.scaleInPlace(this.inertia)), i && (Math.abs(this.cameraRotation.x) < this.speed * me && (this.cameraRotation.x = 0), Math.abs(this.cameraRotation.y) < this.speed * me && (this.cameraRotation.y = 0), this.cameraRotation.scaleInPlace(this.inertia)), super._checkInputs();
  }
  _updateCameraRotationMatrix() {
    this.rotationQuaternion ? this.rotationQuaternion.toRotationMatrix(this._cameraRotationMatrix) : C.RotationYawPitchRollToRef(this.rotation.y, this.rotation.x, this.rotation.z, this._cameraRotationMatrix);
  }
  /**
   * Update the up vector to apply the rotation of the camera (So if you changed the camera rotation.z this will let you update the up vector as well)
   * @returns the current camera
   */
  _rotateUpVectorWithCameraRotationMatrix() {
    return S.TransformNormalToRef(this._defaultUp, this._cameraRotationMatrix, this.upVector), this;
  }
  /** @internal */
  _getViewMatrix() {
    return this.lockedTarget && this.setTarget(this._getLockedTargetPosition()), this._updateCameraRotationMatrix(), this.rotationQuaternion && this._cachedQuaternionRotationZ != this.rotationQuaternion.z ? (this._rotateUpVectorWithCameraRotationMatrix(), this._cachedQuaternionRotationZ = this.rotationQuaternion.z) : this._cachedRotationZ !== this.rotation.z && (this._rotateUpVectorWithCameraRotationMatrix(), this._cachedRotationZ = this.rotation.z), S.TransformCoordinatesToRef(this._referencePoint, this._cameraRotationMatrix, this._transformedReferencePoint), this.position.addToRef(this._transformedReferencePoint, this._currentTarget), this.updateUpVectorFromRotation && (this.rotationQuaternion ? it.Y.rotateByQuaternionToRef(this.rotationQuaternion, this.upVector) : (fe.FromEulerVectorToRef(this.rotation, this._tmpQuaternion), it.Y.rotateByQuaternionToRef(this._tmpQuaternion, this.upVector))), this._computeViewMatrix(this.position, this._currentTarget, this.upVector), this._viewMatrix;
  }
  _computeViewMatrix(e, t, i) {
    if (this.ignoreParentScaling) {
      if (this.parent) {
        const s = this.parent.getWorldMatrix();
        S.TransformCoordinatesToRef(e, s, this._globalPosition), S.TransformCoordinatesToRef(t, s, this._tmpTargetVector), S.TransformNormalToRef(i, s, this._tmpUpVector), this._markSyncedWithParent();
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
    if (this.cameraRigMode !== Q.RIG_MODE_NONE) {
      const i = new z(e, this.position.clone(), this.getScene());
      return i.isRigCamera = !0, i.rigParent = this, (this.cameraRigMode === Q.RIG_MODE_VR || this.cameraRigMode === Q.RIG_MODE_WEBVR) && (this.rotationQuaternion || (this.rotationQuaternion = new fe()), i._cameraRigParams = {}, i.rotationQuaternion = new fe()), i.mode = this.mode, i.orthoLeft = this.orthoLeft, i.orthoRight = this.orthoRight, i.orthoTop = this.orthoTop, i.orthoBottom = this.orthoBottom, i;
    }
    return null;
  }
  /**
   * @internal
   */
  _updateRigCameras() {
    const e = this._rigCameras[0], t = this._rigCameras[1];
    switch (this.computeWorldMatrix(), this.cameraRigMode) {
      case Q.RIG_MODE_STEREOSCOPIC_ANAGLYPH:
      case Q.RIG_MODE_STEREOSCOPIC_SIDEBYSIDE_PARALLEL:
      case Q.RIG_MODE_STEREOSCOPIC_SIDEBYSIDE_CROSSEYED:
      case Q.RIG_MODE_STEREOSCOPIC_OVERUNDER:
      case Q.RIG_MODE_STEREOSCOPIC_INTERLACED: {
        const i = this.cameraRigMode === Q.RIG_MODE_STEREOSCOPIC_SIDEBYSIDE_CROSSEYED ? 1 : -1, s = this.cameraRigMode === Q.RIG_MODE_STEREOSCOPIC_SIDEBYSIDE_CROSSEYED ? -1 : 1;
        this._getRigCamPositionAndTarget(this._cameraRigParams.stereoHalfAngle * i, e), this._getRigCamPositionAndTarget(this._cameraRigParams.stereoHalfAngle * s, t);
        break;
      }
      case Q.RIG_MODE_VR:
        e.rotationQuaternion ? (e.rotationQuaternion.copyFrom(this.rotationQuaternion), t.rotationQuaternion.copyFrom(this.rotationQuaternion)) : (e.rotation.copyFrom(this.rotation), t.rotation.copyFrom(this.rotation)), e.position.copyFrom(this.position), t.position.copyFrom(this.position);
        break;
    }
    super._updateRigCameras();
  }
  _getRigCamPositionAndTarget(e, t) {
    this.getTarget().subtractToRef(this.position, z._TargetFocalPoint), z._TargetFocalPoint.normalize().scaleInPlace(this._initialFocalDistance);
    const s = z._TargetFocalPoint.addInPlace(this.position);
    C.TranslationToRef(-s.x, -s.y, -s.z, z._TargetTransformMatrix), z._TargetTransformMatrix.multiplyToRef(C.RotationAxis(t.upVector, e), z._RigCamTransformMatrix), C.TranslationToRef(s.x, s.y, s.z, z._TargetTransformMatrix), z._RigCamTransformMatrix.multiplyToRef(z._TargetTransformMatrix, z._RigCamTransformMatrix), S.TransformCoordinatesToRef(this.position, z._RigCamTransformMatrix, t.position), t.setTarget(s);
  }
  /**
   * Gets the current object class name.
   * @returns the class name
   */
  getClassName() {
    return "TargetCamera";
  }
}
z._RigCamTransformMatrix = new C();
z._TargetTransformMatrix = new C();
z._TargetFocalPoint = new S();
E([
  Ze()
], z.prototype, "rotation", void 0);
E([
  R()
], z.prototype, "speed", void 0);
E([
  It("lockedTargetId")
], z.prototype, "lockedTarget", void 0);
function Yt(c) {
  const { scene: e } = c;
  let t;
  const i = 36.5;
  return t = new z("TargetCamera1", new S(0, i, 0), e), t.fov = 0.25, t.minZ = 5, t.maxZ = i + 1, t.setTarget(S.Zero()), t;
}
class x extends Re {
  /**
   * Defines how far from the source the light is impacting in scene units.
   * Note: Unused in PBR material as the distance light falloff is defined following the inverse squared falloff.
   */
  get range() {
    return this._range;
  }
  /**
   * Defines how far from the source the light is impacting in scene units.
   * Note: Unused in PBR material as the distance light falloff is defined following the inverse squared falloff.
   */
  set range(e) {
    this._range = e, this._inverseSquaredRange = 1 / (this.range * this.range);
  }
  /**
   * Gets the photometric scale used to interpret the intensity.
   * This is only relevant with PBR Materials where the light intensity can be defined in a physical way.
   */
  get intensityMode() {
    return this._intensityMode;
  }
  /**
   * Sets the photometric scale used to interpret the intensity.
   * This is only relevant with PBR Materials where the light intensity can be defined in a physical way.
   */
  set intensityMode(e) {
    this._intensityMode = e, this._computePhotometricScale();
  }
  /**
   * Gets the light radius used by PBR Materials to simulate soft area lights.
   */
  get radius() {
    return this._radius;
  }
  /**
   * sets the light radius used by PBR Materials to simulate soft area lights.
   */
  set radius(e) {
    this._radius = e, this._computePhotometricScale();
  }
  /**
   * Gets whether or not the shadows are enabled for this light. This can help turning off/on shadow without detaching
   * the current shadow generator.
   */
  get shadowEnabled() {
    return this._shadowEnabled;
  }
  /**
   * Sets whether or not the shadows are enabled for this light. This can help turning off/on shadow without detaching
   * the current shadow generator.
   */
  set shadowEnabled(e) {
    this._shadowEnabled !== e && (this._shadowEnabled = e, this._markMeshesAsLightDirty());
  }
  /**
   * Gets the only meshes impacted by this light.
   */
  get includedOnlyMeshes() {
    return this._includedOnlyMeshes;
  }
  /**
   * Sets the only meshes impacted by this light.
   */
  set includedOnlyMeshes(e) {
    this._includedOnlyMeshes = e, this._hookArrayForIncludedOnly(e);
  }
  /**
   * Gets the meshes not impacted by this light.
   */
  get excludedMeshes() {
    return this._excludedMeshes;
  }
  /**
   * Sets the meshes not impacted by this light.
   */
  set excludedMeshes(e) {
    this._excludedMeshes = e, this._hookArrayForExcluded(e);
  }
  /**
   * Gets the layer id use to find what meshes are not impacted by the light.
   * Inactive if 0
   */
  get excludeWithLayerMask() {
    return this._excludeWithLayerMask;
  }
  /**
   * Sets the layer id use to find what meshes are not impacted by the light.
   * Inactive if 0
   */
  set excludeWithLayerMask(e) {
    this._excludeWithLayerMask = e, this._resyncMeshes();
  }
  /**
   * Gets the layer id use to find what meshes are impacted by the light.
   * Inactive if 0
   */
  get includeOnlyWithLayerMask() {
    return this._includeOnlyWithLayerMask;
  }
  /**
   * Sets the layer id use to find what meshes are impacted by the light.
   * Inactive if 0
   */
  set includeOnlyWithLayerMask(e) {
    this._includeOnlyWithLayerMask = e, this._resyncMeshes();
  }
  /**
   * Gets the lightmap mode of this light (should be one of the constants defined by Light.LIGHTMAP_x)
   */
  get lightmapMode() {
    return this._lightmapMode;
  }
  /**
   * Sets the lightmap mode of this light (should be one of the constants defined by Light.LIGHTMAP_x)
   */
  set lightmapMode(e) {
    this._lightmapMode !== e && (this._lightmapMode = e, this._markMeshesAsLightDirty());
  }
  /**
   * Creates a Light object in the scene.
   * Documentation : https://doc.babylonjs.com/features/featuresDeepDive/lights/lights_introduction
   * @param name The friendly name of the light
   * @param scene The scene the light belongs too
   */
  constructor(e, t) {
    super(e, t), this.diffuse = new we(1, 1, 1), this.specular = new we(1, 1, 1), this.falloffType = x.FALLOFF_DEFAULT, this.intensity = 1, this._range = Number.MAX_VALUE, this._inverseSquaredRange = 0, this._photometricScale = 1, this._intensityMode = x.INTENSITYMODE_AUTOMATIC, this._radius = 1e-5, this.renderPriority = 0, this._shadowEnabled = !0, this._excludeWithLayerMask = 0, this._includeOnlyWithLayerMask = 0, this._lightmapMode = 0, this._shadowGenerators = null, this._excludedMeshesIds = new Array(), this._includedOnlyMeshesIds = new Array(), this._isLight = !0, this.getScene().addLight(this), this._uniformBuffer = new Ot(this.getScene().getEngine(), void 0, void 0, e), this._buildUniformLayout(), this.includedOnlyMeshes = new Array(), this.excludedMeshes = new Array(), this._resyncMeshes();
  }
  /**
   * Sets the passed Effect "effect" with the Light textures.
   * @param effect The effect to update
   * @param lightIndex The index of the light in the effect to update
   * @returns The light
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transferTexturesToEffect(e, t) {
    return this;
  }
  /**
   * Binds the lights information from the scene to the effect for the given mesh.
   * @param lightIndex Light index
   * @param scene The scene where the light belongs to
   * @param effect The effect we are binding the data to
   * @param useSpecular Defines if specular is supported
   * @param receiveShadows Defines if the effect (mesh) we bind the light for receives shadows
   */
  _bindLight(e, t, i, s, r = !0) {
    var n;
    const a = e.toString();
    let o = !1;
    if (this._uniformBuffer.bindToEffect(i, "Light" + a), this._renderId !== t.getRenderId() || this._lastUseSpecular !== s || !this._uniformBuffer.useUbo) {
      this._renderId = t.getRenderId(), this._lastUseSpecular = s;
      const l = this.getScaledIntensity();
      this.transferToEffect(i, a), this.diffuse.scaleToRef(l, Ue.Color3[0]), this._uniformBuffer.updateColor4("vLightDiffuse", Ue.Color3[0], this.range, a), s && (this.specular.scaleToRef(l, Ue.Color3[1]), this._uniformBuffer.updateColor4("vLightSpecular", Ue.Color3[1], this.radius, a)), o = !0;
    }
    if (this.transferTexturesToEffect(i, a), t.shadowsEnabled && this.shadowEnabled && r) {
      const l = (n = this.getShadowGenerator(t.activeCamera)) !== null && n !== void 0 ? n : this.getShadowGenerator();
      l && (l.bindShadowLight(a, i), o = !0);
    }
    o ? this._uniformBuffer.update() : this._uniformBuffer.bindUniformBuffer();
  }
  /**
   * Returns the string "Light".
   * @returns the class name
   */
  getClassName() {
    return "Light";
  }
  /**
   * Converts the light information to a readable string for debug purpose.
   * @param fullDetails Supports for multiple levels of logging within scene loading
   * @returns the human readable light info
   */
  toString(e) {
    let t = "Name: " + this.name;
    if (t += ", type: " + ["Point", "Directional", "Spot", "Hemispheric"][this.getTypeID()], this.animations)
      for (let i = 0; i < this.animations.length; i++)
        t += ", animation[0]: " + this.animations[i].toString(e);
    return t;
  }
  /** @internal */
  _syncParentEnabledState() {
    super._syncParentEnabledState(), this.isDisposed() || this._resyncMeshes();
  }
  /**
   * Set the enabled state of this node.
   * @param value - the new enabled state
   */
  setEnabled(e) {
    super.setEnabled(e), this._resyncMeshes();
  }
  /**
   * Returns the Light associated shadow generator if any.
   * @param camera Camera for which the shadow generator should be retrieved (default: null). If null, retrieves the default shadow generator
   * @returns the associated shadow generator.
   */
  getShadowGenerator(e = null) {
    var t;
    return this._shadowGenerators === null ? null : (t = this._shadowGenerators.get(e)) !== null && t !== void 0 ? t : null;
  }
  /**
   * Returns all the shadow generators associated to this light
   * @returns
   */
  getShadowGenerators() {
    return this._shadowGenerators;
  }
  /**
   * Returns a Vector3, the absolute light position in the World.
   * @returns the world space position of the light
   */
  getAbsolutePosition() {
    return S.Zero();
  }
  /**
   * Specifies if the light will affect the passed mesh.
   * @param mesh The mesh to test against the light
   * @returns true the mesh is affected otherwise, false.
   */
  canAffectMesh(e) {
    return e ? !(this.includedOnlyMeshes && this.includedOnlyMeshes.length > 0 && this.includedOnlyMeshes.indexOf(e) === -1 || this.excludedMeshes && this.excludedMeshes.length > 0 && this.excludedMeshes.indexOf(e) !== -1 || this.includeOnlyWithLayerMask !== 0 && !(this.includeOnlyWithLayerMask & e.layerMask) || this.excludeWithLayerMask !== 0 && this.excludeWithLayerMask & e.layerMask) : !0;
  }
  /**
   * Releases resources associated with this node.
   * @param doNotRecurse Set to true to not recurse into each children (recurse into each children by default)
   * @param disposeMaterialAndTextures Set to true to also dispose referenced materials and textures (false by default)
   */
  dispose(e, t = !1) {
    if (this._shadowGenerators) {
      const i = this._shadowGenerators.values();
      for (let s = i.next(); s.done !== !0; s = i.next())
        s.value.dispose();
      this._shadowGenerators = null;
    }
    if (this.getScene().stopAnimation(this), this._parentContainer) {
      const i = this._parentContainer.lights.indexOf(this);
      i > -1 && this._parentContainer.lights.splice(i, 1), this._parentContainer = null;
    }
    for (const i of this.getScene().meshes)
      i._removeLightSource(this, !0);
    this._uniformBuffer.dispose(), this.getScene().removeLight(this), super.dispose(e, t);
  }
  /**
   * Returns the light type ID (integer).
   * @returns The light Type id as a constant defines in Light.LIGHTTYPEID_x
   */
  getTypeID() {
    return 0;
  }
  /**
   * Returns the intensity scaled by the Photometric Scale according to the light type and intensity mode.
   * @returns the scaled intensity in intensity mode unit
   */
  getScaledIntensity() {
    return this._photometricScale * this.intensity;
  }
  /**
   * Returns a new Light object, named "name", from the current one.
   * @param name The name of the cloned light
   * @param newParent The parent of this light, if it has one
   * @returns the new created light
   */
  clone(e, t = null) {
    const i = x.GetConstructorFromName(this.getTypeID(), e, this.getScene());
    if (!i)
      return null;
    const s = se.Clone(i, this);
    return e && (s.name = e), t && (s.parent = t), s.setEnabled(this.isEnabled()), this.onClonedObservable.notifyObservers(s), s;
  }
  /**
   * Serializes the current light into a Serialization object.
   * @returns the serialized object.
   */
  serialize() {
    const e = se.Serialize(this);
    return e.uniqueId = this.uniqueId, e.type = this.getTypeID(), this.parent && this.parent._serializeAsParent(e), this.excludedMeshes.length > 0 && (e.excludedMeshesIds = [], this.excludedMeshes.forEach((t) => {
      e.excludedMeshesIds.push(t.id);
    })), this.includedOnlyMeshes.length > 0 && (e.includedOnlyMeshesIds = [], this.includedOnlyMeshes.forEach((t) => {
      e.includedOnlyMeshesIds.push(t.id);
    })), se.AppendSerializedAnimations(this, e), e.ranges = this.serializeAnimationRanges(), e.isEnabled = this.isEnabled(), e;
  }
  /**
   * Creates a new typed light from the passed type (integer) : point light = 0, directional light = 1, spot light = 2, hemispheric light = 3.
   * This new light is named "name" and added to the passed scene.
   * @param type Type according to the types available in Light.LIGHTTYPEID_x
   * @param name The friendly name of the light
   * @param scene The scene the new light will belong to
   * @returns the constructor function
   */
  static GetConstructorFromName(e, t, i) {
    const s = Re.Construct("Light_Type_" + e, t, i);
    return s || null;
  }
  /**
   * Parses the passed "parsedLight" and returns a new instanced Light from this parsing.
   * @param parsedLight The JSON representation of the light
   * @param scene The scene to create the parsed light in
   * @returns the created light after parsing
   */
  static Parse(e, t) {
    const i = x.GetConstructorFromName(e.type, e.name, t);
    if (!i)
      return null;
    const s = se.Parse(i, e, t);
    if (e.excludedMeshesIds && (s._excludedMeshesIds = e.excludedMeshesIds), e.includedOnlyMeshesIds && (s._includedOnlyMeshesIds = e.includedOnlyMeshesIds), e.parentId !== void 0 && (s._waitingParentId = e.parentId), e.parentInstanceIndex !== void 0 && (s._waitingParentInstanceIndex = e.parentInstanceIndex), e.falloffType !== void 0 && (s.falloffType = e.falloffType), e.lightmapMode !== void 0 && (s.lightmapMode = e.lightmapMode), e.animations) {
      for (let r = 0; r < e.animations.length; r++) {
        const n = e.animations[r], a = xt("BABYLON.Animation");
        a && s.animations.push(a.Parse(n));
      }
      Re.ParseAnimationRanges(s, e, t);
    }
    return e.autoAnimate && t.beginAnimation(s, e.autoAnimateFrom, e.autoAnimateTo, e.autoAnimateLoop, e.autoAnimateSpeed || 1), e.isEnabled !== void 0 && s.setEnabled(e.isEnabled), s;
  }
  _hookArrayForExcluded(e) {
    const t = e.push;
    e.push = (...s) => {
      const r = t.apply(e, s);
      for (const n of s)
        n._resyncLightSource(this);
      return r;
    };
    const i = e.splice;
    e.splice = (s, r) => {
      const n = i.apply(e, [s, r]);
      for (const a of n)
        a._resyncLightSource(this);
      return n;
    };
    for (const s of e)
      s._resyncLightSource(this);
  }
  _hookArrayForIncludedOnly(e) {
    const t = e.push;
    e.push = (...s) => {
      const r = t.apply(e, s);
      return this._resyncMeshes(), r;
    };
    const i = e.splice;
    e.splice = (s, r) => {
      const n = i.apply(e, [s, r]);
      return this._resyncMeshes(), n;
    }, this._resyncMeshes();
  }
  _resyncMeshes() {
    for (const e of this.getScene().meshes)
      e._resyncLightSource(this);
  }
  /**
   * Forces the meshes to update their light related information in their rendering used effects
   * @internal Internal Use Only
   */
  _markMeshesAsLightDirty() {
    for (const e of this.getScene().meshes)
      e.lightSources.indexOf(this) !== -1 && e._markSubMeshesAsLightDirty();
  }
  /**
   * Recomputes the cached photometric scale if needed.
   */
  _computePhotometricScale() {
    this._photometricScale = this._getPhotometricScale(), this.getScene().resetCachedMaterial();
  }
  /**
   * Returns the Photometric Scale according to the light type and intensity mode.
   */
  _getPhotometricScale() {
    let e = 0;
    const t = this.getTypeID();
    let i = this.intensityMode;
    switch (i === x.INTENSITYMODE_AUTOMATIC && (t === x.LIGHTTYPEID_DIRECTIONALLIGHT ? i = x.INTENSITYMODE_ILLUMINANCE : i = x.INTENSITYMODE_LUMINOUSINTENSITY), t) {
      case x.LIGHTTYPEID_POINTLIGHT:
      case x.LIGHTTYPEID_SPOTLIGHT:
        switch (i) {
          case x.INTENSITYMODE_LUMINOUSPOWER:
            e = 1 / (4 * Math.PI);
            break;
          case x.INTENSITYMODE_LUMINOUSINTENSITY:
            e = 1;
            break;
          case x.INTENSITYMODE_LUMINANCE:
            e = this.radius * this.radius;
            break;
        }
        break;
      case x.LIGHTTYPEID_DIRECTIONALLIGHT:
        switch (i) {
          case x.INTENSITYMODE_ILLUMINANCE:
            e = 1;
            break;
          case x.INTENSITYMODE_LUMINANCE: {
            let s = this.radius;
            s = Math.max(s, 1e-3), e = 2 * Math.PI * (1 - Math.cos(s));
            break;
          }
        }
        break;
      case x.LIGHTTYPEID_HEMISPHERICLIGHT:
        e = 1;
        break;
    }
    return e;
  }
  /**
   * Reorder the light in the scene according to their defined priority.
   * @internal Internal Use Only
   */
  _reorderLightsInScene() {
    const e = this.getScene();
    this._renderPriority != 0 && (e.requireLightSorting = !0), this.getScene().sortLightsByPriority();
  }
}
x.FALLOFF_DEFAULT = G.FALLOFF_DEFAULT;
x.FALLOFF_PHYSICAL = G.FALLOFF_PHYSICAL;
x.FALLOFF_GLTF = G.FALLOFF_GLTF;
x.FALLOFF_STANDARD = G.FALLOFF_STANDARD;
x.LIGHTMAP_DEFAULT = G.LIGHTMAP_DEFAULT;
x.LIGHTMAP_SPECULAR = G.LIGHTMAP_SPECULAR;
x.LIGHTMAP_SHADOWSONLY = G.LIGHTMAP_SHADOWSONLY;
x.INTENSITYMODE_AUTOMATIC = G.INTENSITYMODE_AUTOMATIC;
x.INTENSITYMODE_LUMINOUSPOWER = G.INTENSITYMODE_LUMINOUSPOWER;
x.INTENSITYMODE_LUMINOUSINTENSITY = G.INTENSITYMODE_LUMINOUSINTENSITY;
x.INTENSITYMODE_ILLUMINANCE = G.INTENSITYMODE_ILLUMINANCE;
x.INTENSITYMODE_LUMINANCE = G.INTENSITYMODE_LUMINANCE;
x.LIGHTTYPEID_POINTLIGHT = G.LIGHTTYPEID_POINTLIGHT;
x.LIGHTTYPEID_DIRECTIONALLIGHT = G.LIGHTTYPEID_DIRECTIONALLIGHT;
x.LIGHTTYPEID_SPOTLIGHT = G.LIGHTTYPEID_SPOTLIGHT;
x.LIGHTTYPEID_HEMISPHERICLIGHT = G.LIGHTTYPEID_HEMISPHERICLIGHT;
E([
  rt()
], x.prototype, "diffuse", void 0);
E([
  rt()
], x.prototype, "specular", void 0);
E([
  R()
], x.prototype, "falloffType", void 0);
E([
  R()
], x.prototype, "intensity", void 0);
E([
  R()
], x.prototype, "range", null);
E([
  R()
], x.prototype, "intensityMode", null);
E([
  R()
], x.prototype, "radius", null);
E([
  R()
], x.prototype, "_renderPriority", void 0);
E([
  Ft("_reorderLightsInScene")
], x.prototype, "renderPriority", void 0);
E([
  R("shadowEnabled")
], x.prototype, "_shadowEnabled", void 0);
E([
  R("excludeWithLayerMask")
], x.prototype, "_excludeWithLayerMask", void 0);
E([
  R("includeOnlyWithLayerMask")
], x.prototype, "_includeOnlyWithLayerMask", void 0);
E([
  R("lightmapMode")
], x.prototype, "_lightmapMode", void 0);
class Le extends x {
  constructor() {
    super(...arguments), this._needProjectionMatrixCompute = !0;
  }
  _setPosition(e) {
    this._position = e;
  }
  /**
   * Sets the position the shadow will be casted from. Also use as the light position for both
   * point and spot lights.
   */
  get position() {
    return this._position;
  }
  /**
   * Sets the position the shadow will be casted from. Also use as the light position for both
   * point and spot lights.
   */
  set position(e) {
    this._setPosition(e);
  }
  _setDirection(e) {
    this._direction = e;
  }
  /**
   * In 2d mode (needCube being false), gets the direction used to cast the shadow.
   * Also use as the light direction on spot and directional lights.
   */
  get direction() {
    return this._direction;
  }
  /**
   * In 2d mode (needCube being false), sets the direction used to cast the shadow.
   * Also use as the light direction on spot and directional lights.
   */
  set direction(e) {
    this._setDirection(e);
  }
  /**
   * Gets the shadow projection clipping minimum z value.
   */
  get shadowMinZ() {
    return this._shadowMinZ;
  }
  /**
   * Sets the shadow projection clipping minimum z value.
   */
  set shadowMinZ(e) {
    this._shadowMinZ = e, this.forceProjectionMatrixCompute();
  }
  /**
   * Sets the shadow projection clipping maximum z value.
   */
  get shadowMaxZ() {
    return this._shadowMaxZ;
  }
  /**
   * Gets the shadow projection clipping maximum z value.
   */
  set shadowMaxZ(e) {
    this._shadowMaxZ = e, this.forceProjectionMatrixCompute();
  }
  /**
   * Computes the transformed information (transformedPosition and transformedDirection in World space) of the current light
   * @returns true if the information has been computed, false if it does not need to (no parenting)
   */
  computeTransformedInformation() {
    return this.parent && this.parent.getWorldMatrix ? (this.transformedPosition || (this.transformedPosition = S.Zero()), S.TransformCoordinatesToRef(this.position, this.parent.getWorldMatrix(), this.transformedPosition), this.direction && (this.transformedDirection || (this.transformedDirection = S.Zero()), S.TransformNormalToRef(this.direction, this.parent.getWorldMatrix(), this.transformedDirection)), !0) : !1;
  }
  /**
   * Return the depth scale used for the shadow map.
   * @returns the depth scale.
   */
  getDepthScale() {
    return 50;
  }
  /**
   * Get the direction to use to render the shadow map. In case of cube texture, the face index can be passed.
   * @param faceIndex The index of the face we are computed the direction to generate shadow
   * @returns The set direction in 2d mode otherwise the direction to the cubemap face if needCube() is true
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getShadowDirection(e) {
    return this.transformedDirection ? this.transformedDirection : this.direction;
  }
  /**
   * Returns the ShadowLight absolute position in the World.
   * @returns the position vector in world space
   */
  getAbsolutePosition() {
    return this.transformedPosition ? this.transformedPosition : this.position;
  }
  /**
   * Sets the ShadowLight direction toward the passed target.
   * @param target The point to target in local space
   * @returns the updated ShadowLight direction
   */
  setDirectionToTarget(e) {
    return this.direction = S.Normalize(e.subtract(this.position)), this.direction;
  }
  /**
   * Returns the light rotation in euler definition.
   * @returns the x y z rotation in local space.
   */
  getRotation() {
    this.direction.normalize();
    const e = S.Cross(this.direction, it.Y), t = S.Cross(e, this.direction);
    return S.RotationFromAxis(e, t, this.direction);
  }
  /**
   * Returns whether or not the shadow generation require a cube texture or a 2d texture.
   * @returns true if a cube texture needs to be use
   */
  needCube() {
    return !1;
  }
  /**
   * Detects if the projection matrix requires to be recomputed this frame.
   * @returns true if it requires to be recomputed otherwise, false.
   */
  needProjectionMatrixCompute() {
    return this._needProjectionMatrixCompute;
  }
  /**
   * Forces the shadow generator to recompute the projection matrix even if position and direction did not changed.
   */
  forceProjectionMatrixCompute() {
    this._needProjectionMatrixCompute = !0;
  }
  /** @internal */
  _initCache() {
    super._initCache(), this._cache.position = S.Zero();
  }
  /** @internal */
  _isSynchronized() {
    return !!this._cache.position.equals(this.position);
  }
  /**
   * Computes the world matrix of the node
   * @param force defines if the cache version should be invalidated forcing the world matrix to be created from scratch
   * @returns the world matrix
   */
  computeWorldMatrix(e) {
    return !e && this.isSynchronized() ? (this._currentRenderId = this.getScene().getRenderId(), this._worldMatrix) : (this._updateCache(), this._cache.position.copyFrom(this.position), this._worldMatrix || (this._worldMatrix = C.Identity()), C.TranslationToRef(this.position.x, this.position.y, this.position.z, this._worldMatrix), this.parent && this.parent.getWorldMatrix && (this._worldMatrix.multiplyToRef(this.parent.getWorldMatrix(), this._worldMatrix), this._markSyncedWithParent()), this._worldMatrixDeterminantIsDirty = !0, this._worldMatrix);
  }
  /**
   * Gets the minZ used for shadow according to both the scene and the light.
   * @param activeCamera The camera we are returning the min for
   * @returns the depth min z
   */
  getDepthMinZ(e) {
    return this.shadowMinZ !== void 0 ? this.shadowMinZ : e.minZ;
  }
  /**
   * Gets the maxZ used for shadow according to both the scene and the light.
   * @param activeCamera The camera we are returning the max for
   * @returns the depth max z
   */
  getDepthMaxZ(e) {
    return this.shadowMaxZ !== void 0 ? this.shadowMaxZ : e.maxZ;
  }
  /**
   * Sets the shadow projection matrix in parameter to the generated projection matrix.
   * @param matrix The matrix to updated with the projection information
   * @param viewMatrix The transform matrix of the light
   * @param renderList The list of mesh to render in the map
   * @returns The current light
   */
  setShadowProjectionMatrix(e, t, i) {
    return this.customProjectionMatrixBuilder ? this.customProjectionMatrixBuilder(t, i, e) : this._setDefaultShadowProjectionMatrix(e, t, i), this;
  }
  /** @internal */
  _syncParentEnabledState() {
    super._syncParentEnabledState(), (!this.parent || !this.parent.getWorldMatrix) && (this.transformedPosition = null, this.transformedDirection = null);
  }
}
E([
  Ze()
], Le.prototype, "position", null);
E([
  Ze()
], Le.prototype, "direction", null);
E([
  R()
], Le.prototype, "shadowMinZ", null);
E([
  R()
], Le.prototype, "shadowMaxZ", null);
Re.AddNodeConstructor("Light_Type_1", (c, e) => () => new re(c, S.Zero(), e));
class re extends Le {
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
    return x.LIGHTTYPEID_DIRECTIONALLIGHT;
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
      const d = S.Zero();
      this._orthoLeft = Number.MAX_VALUE, this._orthoRight = Number.MIN_VALUE, this._orthoTop = Number.MIN_VALUE, this._orthoBottom = Number.MAX_VALUE;
      let h = Number.MAX_VALUE, u = Number.MIN_VALUE;
      for (let f = 0; f < i.length; f++) {
        const g = i[f];
        if (!g)
          continue;
        const _ = g.getBoundingInfo().boundingBox;
        for (let m = 0; m < _.vectorsWorld.length; m++)
          S.TransformCoordinatesToRef(_.vectorsWorld[m], t, d), d.x < this._orthoLeft && (this._orthoLeft = d.x), d.y < this._orthoBottom && (this._orthoBottom = d.y), d.x > this._orthoRight && (this._orthoRight = d.x), d.y > this._orthoTop && (this._orthoTop = d.y), this.autoCalcShadowZBounds && (d.z < h && (h = d.z), d.z > u && (u = d.z));
      }
      this.autoCalcShadowZBounds && (this._shadowMinZ = h, this._shadowMaxZ = u);
    }
    const r = this._orthoRight - this._orthoLeft, n = this._orthoTop - this._orthoBottom, a = this.shadowMinZ !== void 0 ? this.shadowMinZ : s.minZ, o = this.shadowMaxZ !== void 0 ? this.shadowMaxZ : s.maxZ, l = this.getScene().getEngine().useReverseDepthBuffer;
    C.OrthoOffCenterLHToRef(this._orthoLeft - r * this.shadowOrthoScale, this._orthoRight + r * this.shadowOrthoScale, this._orthoBottom - n * this.shadowOrthoScale, this._orthoTop + n * this.shadowOrthoScale, l ? o : a, l ? a : o, e, this.getScene().getEngine().isNDCHalfZRange);
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
E([
  R()
], re.prototype, "shadowFrustumSize", null);
E([
  R()
], re.prototype, "shadowOrthoScale", null);
E([
  R()
], re.prototype, "autoUpdateExtends", void 0);
E([
  R()
], re.prototype, "autoCalcShadowZBounds", void 0);
E([
  R("orthoLeft")
], re.prototype, "_orthoLeft", void 0);
E([
  R("orthoRight")
], re.prototype, "_orthoRight", void 0);
E([
  R("orthoTop")
], re.prototype, "_orthoTop", void 0);
E([
  R("orthoBottom")
], re.prototype, "_orthoBottom", void 0);
Re.AddNodeConstructor("Light_Type_3", (c, e) => () => new Ge(c, S.Zero(), e));
class Ge extends x {
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
    super(e, i), this.groundColor = new we(0, 0, 0), this.direction = t || S.Up();
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
    return this.direction = S.Normalize(e.subtract(S.Zero())), this.direction;
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
    const i = S.Normalize(this.direction);
    return this._uniformBuffer.updateFloat4("vLightData", i.x, i.y, i.z, 0, t), this._uniformBuffer.updateColor3("vLightGround", this.groundColor.scale(this.intensity), t), this;
  }
  transferToNodeMaterialEffect(e, t) {
    const i = S.Normalize(this.direction);
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
    return x.LIGHTTYPEID_HEMISPHERICLIGHT;
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
E([
  rt()
], Ge.prototype, "groundColor", void 0);
E([
  Ze()
], Ge.prototype, "direction", void 0);
class jt {
  /**
   * Gets the depth/stencil texture (if created by a createDepthStencilTexture() call)
   */
  get depthStencilTexture() {
    return this._depthStencilTexture;
  }
  /**
   * Indicates if the depth/stencil texture has a stencil aspect
   */
  get depthStencilTextureWithStencil() {
    return this._depthStencilTextureWithStencil;
  }
  /**
   * Defines if the render target wrapper is for a cube texture or if false a 2d texture
   */
  get isCube() {
    return this._isCube;
  }
  /**
   * Defines if the render target wrapper is for a single or multi target render wrapper
   */
  get isMulti() {
    return this._isMulti;
  }
  /**
   * Defines if the render target wrapper is for a single or an array of textures
   */
  get is2DArray() {
    return this.layers > 0;
  }
  /**
   * Gets the size of the render target wrapper (used for cubes, as width=height in this case)
   */
  get size() {
    return this.width;
  }
  /**
   * Gets the width of the render target wrapper
   */
  get width() {
    return this._size.width || this._size;
  }
  /**
   * Gets the height of the render target wrapper
   */
  get height() {
    return this._size.height || this._size;
  }
  /**
   * Gets the number of layers of the render target wrapper (only used if is2DArray is true and wrapper is not a multi render target)
   */
  get layers() {
    return this._size.layers || 0;
  }
  /**
   * Gets the render texture. If this is a multi render target, gets the first texture
   */
  get texture() {
    var e, t;
    return (t = (e = this._textures) === null || e === void 0 ? void 0 : e[0]) !== null && t !== void 0 ? t : null;
  }
  /**
   * Gets the list of render textures. If we are not in a multi render target, the list will be null (use the texture getter instead)
   */
  get textures() {
    return this._textures;
  }
  /**
   * Gets the face indices that correspond to the list of render textures. If we are not in a multi render target, the list will be null
   */
  get faceIndices() {
    return this._faceIndices;
  }
  /**
   * Gets the layer indices that correspond to the list of render textures. If we are not in a multi render target, the list will be null
   */
  get layerIndices() {
    return this._layerIndices;
  }
  /**
   * Gets the sample count of the render target
   */
  get samples() {
    return this._samples;
  }
  /**
   * Sets the sample count of the render target
   * @param value sample count
   * @param initializeBuffers If set to true, the engine will make an initializing call to drawBuffers (only used when isMulti=true).
   * @param force true to force calling the update sample count engine function even if the current sample count is equal to value
   * @returns the sample count that has been set
   */
  setSamples(e, t = !0, i = !1) {
    if (this.samples === e && !i)
      return e;
    const s = this._isMulti ? this._engine.updateMultipleRenderTargetTextureSampleCount(this, e, t) : this._engine.updateRenderTargetTextureSampleCount(this, e);
    return this._samples = e, s;
  }
  /**
   * Initializes the render target wrapper
   * @param isMulti true if the wrapper is a multi render target
   * @param isCube true if the wrapper should render to a cube texture
   * @param size size of the render target (width/height/layers)
   * @param engine engine used to create the render target
   */
  constructor(e, t, i, s) {
    this._textures = null, this._faceIndices = null, this._layerIndices = null, this._samples = 1, this._attachments = null, this._generateStencilBuffer = !1, this._generateDepthBuffer = !1, this._depthStencilTextureWithStencil = !1, this._isMulti = e, this._isCube = t, this._size = i, this._engine = s, this._depthStencilTexture = null;
  }
  /**
   * Sets the render target texture(s)
   * @param textures texture(s) to set
   */
  setTextures(e) {
    Array.isArray(e) ? this._textures = e : e ? this._textures = [e] : this._textures = null;
  }
  /**
   * Set a texture in the textures array
   * @param texture The texture to set
   * @param index The index in the textures array to set
   * @param disposePrevious If this function should dispose the previous texture
   */
  setTexture(e, t = 0, i = !0) {
    this._textures || (this._textures = []), this._textures[t] && i && this._textures[t].dispose(), this._textures[t] = e;
  }
  /**
   * Sets the layer and face indices of every render target texture bound to each color attachment
   * @param layers The layers of each texture to be set
   * @param faces The faces of each texture to be set
   */
  setLayerAndFaceIndices(e, t) {
    this._layerIndices = e, this._faceIndices = t;
  }
  /**
   * Sets the layer and face indices of a texture in the textures array that should be bound to each color attachment
   * @param index The index of the texture in the textures array to modify
   * @param layer The layer of the texture to be set
   * @param face The face of the texture to be set
   */
  setLayerAndFaceIndex(e = 0, t, i) {
    this._layerIndices || (this._layerIndices = []), this._faceIndices || (this._faceIndices = []), t !== void 0 && t >= 0 && (this._layerIndices[e] = t), i !== void 0 && i >= 0 && (this._faceIndices[e] = i);
  }
  /**
   * Creates the depth/stencil texture
   * @param comparisonFunction Comparison function to use for the texture
   * @param bilinearFiltering true if bilinear filtering should be used when sampling the texture
   * @param generateStencil true if the stencil aspect should also be created
   * @param samples sample count to use when creating the texture
   * @param format format of the depth texture
   * @param label defines the label to use for the texture (for debugging purpose only)
   * @returns the depth/stencil created texture
   */
  createDepthStencilTexture(e = 0, t = !0, i = !1, s = 1, r = 14, n) {
    var a;
    return (a = this._depthStencilTexture) === null || a === void 0 || a.dispose(), this._depthStencilTextureWithStencil = i, this._depthStencilTexture = this._engine.createDepthStencilTexture(this._size, {
      bilinearFiltering: t,
      comparisonFunction: e,
      generateStencil: i,
      isCube: this._isCube,
      samples: s,
      depthTextureFormat: r,
      label: n
    }, this), this._depthStencilTexture;
  }
  /**
   * Shares the depth buffer of this render target with another render target.
   * @internal
   * @param renderTarget Destination renderTarget
   */
  _shareDepth(e) {
    this._depthStencilTexture && (e._depthStencilTexture && e._depthStencilTexture.dispose(), e._depthStencilTexture = this._depthStencilTexture, this._depthStencilTexture.incrementReferences());
  }
  /**
   * @internal
   */
  _swapAndDie(e) {
    this.texture && this.texture._swapAndDie(e), this._textures = null, this.dispose(!0);
  }
  _cloneRenderTargetWrapper() {
    var e, t, i, s, r, n, a, o;
    let l = null;
    if (this._isMulti) {
      const d = this.textures;
      if (d && d.length > 0) {
        let h = !1, u = d.length;
        const f = d[d.length - 1]._source;
        (f === De.Depth || f === De.DepthStencil) && (h = !0, u--);
        const g = [], p = [], _ = [], m = [], b = [], A = [], v = [], y = {};
        for (let L = 0; L < u; ++L) {
          const N = d[L];
          g.push(N.samplingMode), p.push(N.type), _.push(N.format), y[N.uniqueId] !== void 0 ? (m.push(-1), v.push(0)) : (y[N.uniqueId] = L, N.is2DArray ? (m.push(35866), v.push(N.depth)) : N.isCube ? (m.push(34067), v.push(0)) : N.is3D ? (m.push(32879), v.push(N.depth)) : (m.push(3553), v.push(0))), this._faceIndices && b.push((e = this._faceIndices[L]) !== null && e !== void 0 ? e : 0), this._layerIndices && A.push((t = this._layerIndices[L]) !== null && t !== void 0 ? t : 0);
        }
        const K = {
          samplingModes: g,
          generateMipMaps: d[0].generateMipMaps,
          generateDepthBuffer: this._generateDepthBuffer,
          generateStencilBuffer: this._generateStencilBuffer,
          generateDepthTexture: h,
          types: p,
          formats: _,
          textureCount: u,
          targetTypes: m,
          faceIndex: b,
          layerIndex: A,
          layerCounts: v
        }, H = {
          width: this.width,
          height: this.height
        };
        l = this._engine.createMultipleRenderTarget(H, K);
        for (let L = 0; L < u; ++L) {
          if (m[L] !== -1)
            continue;
          const N = y[d[L].uniqueId];
          l.setTexture(l.textures[N], L);
        }
      }
    } else {
      const d = {};
      if (d.generateDepthBuffer = this._generateDepthBuffer, d.generateMipMaps = (s = (i = this.texture) === null || i === void 0 ? void 0 : i.generateMipMaps) !== null && s !== void 0 ? s : !1, d.generateStencilBuffer = this._generateStencilBuffer, d.samplingMode = (r = this.texture) === null || r === void 0 ? void 0 : r.samplingMode, d.type = (n = this.texture) === null || n === void 0 ? void 0 : n.type, d.format = (a = this.texture) === null || a === void 0 ? void 0 : a.format, this.isCube)
        l = this._engine.createRenderTargetCubeTexture(this.width, d);
      else {
        const h = {
          width: this.width,
          height: this.height,
          layers: this.is2DArray ? (o = this.texture) === null || o === void 0 ? void 0 : o.depth : void 0
        };
        l = this._engine.createRenderTargetTexture(h, d);
      }
      l.texture.isReady = !0;
    }
    return l;
  }
  _swapRenderTargetWrapper(e) {
    if (this._textures && e._textures)
      for (let t = 0; t < this._textures.length; ++t)
        this._textures[t]._swapAndDie(e._textures[t], !1), e._textures[t].isReady = !0;
    this._depthStencilTexture && e._depthStencilTexture && (this._depthStencilTexture._swapAndDie(e._depthStencilTexture), e._depthStencilTexture.isReady = !0), this._textures = null, this._depthStencilTexture = null;
  }
  /** @internal */
  _rebuild() {
    const e = this._cloneRenderTargetWrapper();
    if (e) {
      if (this._depthStencilTexture) {
        const t = this._depthStencilTexture.samplingMode, i = t === 2 || t === 3 || t === 11;
        e.createDepthStencilTexture(this._depthStencilTexture._comparisonFunction, i, this._depthStencilTextureWithStencil, this._depthStencilTexture.samples);
      }
      this.samples > 1 && e.setSamples(this.samples), e._swapRenderTargetWrapper(this), e.dispose();
    }
  }
  /**
   * Releases the internal render textures
   */
  releaseTextures() {
    var e, t;
    if (this._textures)
      for (let i = 0; (t = i < ((e = this._textures) === null || e === void 0 ? void 0 : e.length)) !== null && t !== void 0 && t; ++i)
        this._textures[i].dispose();
    this._textures = null;
  }
  /**
   * Disposes the whole render target wrapper
   * @param disposeOnlyFramebuffers true if only the frame buffers should be released (used for the WebGL engine). If false, all the textures will also be released
   */
  dispose(e = !1) {
    var t;
    e || ((t = this._depthStencilTexture) === null || t === void 0 || t.dispose(), this._depthStencilTexture = null, this.releaseTextures()), this._engine._releaseRenderTargetWrapper(this);
  }
}
class Kt extends jt {
  constructor(e, t, i, s, r) {
    super(e, t, i, s), this._framebuffer = null, this._depthStencilBuffer = null, this._MSAAFramebuffer = null, this._colorTextureArray = null, this._depthStencilTextureArray = null, this._context = r;
  }
  _cloneRenderTargetWrapper() {
    let e = null;
    return this._colorTextureArray && this._depthStencilTextureArray ? (e = this._engine.createMultiviewRenderTargetTexture(this.width, this.height), e.texture.isReady = !0) : e = super._cloneRenderTargetWrapper(), e;
  }
  _swapRenderTargetWrapper(e) {
    super._swapRenderTargetWrapper(e), e._framebuffer = this._framebuffer, e._depthStencilBuffer = this._depthStencilBuffer, e._MSAAFramebuffer = this._MSAAFramebuffer, e._colorTextureArray = this._colorTextureArray, e._depthStencilTextureArray = this._depthStencilTextureArray, this._framebuffer = this._depthStencilBuffer = this._MSAAFramebuffer = this._colorTextureArray = this._depthStencilTextureArray = null;
  }
  /**
   * Shares the depth buffer of this render target with another render target.
   * @internal
   * @param renderTarget Destination renderTarget
   */
  _shareDepth(e) {
    super._shareDepth(e);
    const t = this._context, i = this._depthStencilBuffer, s = e._MSAAFramebuffer || e._framebuffer;
    e._depthStencilBuffer && t.deleteRenderbuffer(e._depthStencilBuffer), e._depthStencilBuffer = this._depthStencilBuffer, this._engine._bindUnboundFramebuffer(s), t.framebufferRenderbuffer(t.FRAMEBUFFER, t.DEPTH_ATTACHMENT, t.RENDERBUFFER, i), this._engine._bindUnboundFramebuffer(null);
  }
  /**
   * Binds a texture to this render target on a specific attachment
   * @param texture The texture to bind to the framebuffer
   * @param attachmentIndex Index of the attachment
   * @param faceIndexOrLayer The face or layer of the texture to render to in case of cube texture or array texture
   * @param lodLevel defines the lod level to bind to the frame buffer
   */
  _bindTextureRenderTarget(e, t = 0, i, s = 0) {
    var r, n, a, o;
    if (!e._hardwareTexture)
      return;
    const l = this._framebuffer, d = this._engine._currentFramebuffer;
    if (this._engine._bindUnboundFramebuffer(l), this._engine.webGLVersion > 1) {
      const h = this._context, u = h["COLOR_ATTACHMENT" + t];
      e.is2DArray || e.is3D ? (i = (n = i ?? ((r = this.layerIndices) === null || r === void 0 ? void 0 : r[t])) !== null && n !== void 0 ? n : 0, h.framebufferTextureLayer(h.FRAMEBUFFER, u, e._hardwareTexture.underlyingResource, s, i)) : e.isCube ? (i = (o = i ?? ((a = this.faceIndices) === null || a === void 0 ? void 0 : a[t])) !== null && o !== void 0 ? o : 0, h.framebufferTexture2D(h.FRAMEBUFFER, u, h.TEXTURE_CUBE_MAP_POSITIVE_X + i, e._hardwareTexture.underlyingResource, s)) : h.framebufferTexture2D(h.FRAMEBUFFER, u, h.TEXTURE_2D, e._hardwareTexture.underlyingResource, s);
    } else {
      const h = this._context, u = h["COLOR_ATTACHMENT" + t + "_WEBGL"], f = i !== void 0 ? h.TEXTURE_CUBE_MAP_POSITIVE_X + i : h.TEXTURE_2D;
      h.framebufferTexture2D(h.FRAMEBUFFER, u, f, e._hardwareTexture.underlyingResource, s);
    }
    this._engine._bindUnboundFramebuffer(d);
  }
  /**
   * Set a texture in the textures array
   * @param texture the texture to set
   * @param index the index in the textures array to set
   * @param disposePrevious If this function should dispose the previous texture
   */
  setTexture(e, t = 0, i = !0) {
    super.setTexture(e, t, i), this._bindTextureRenderTarget(e, t);
  }
  /**
   * Sets the layer and face indices of every render target texture
   * @param layers The layer of the texture to be set (make negative to not modify)
   * @param faces The face of the texture to be set (make negative to not modify)
   */
  setLayerAndFaceIndices(e, t) {
    var i, s;
    if (super.setLayerAndFaceIndices(e, t), !this.textures || !this.layerIndices || !this.faceIndices)
      return;
    const r = (s = (i = this._attachments) === null || i === void 0 ? void 0 : i.length) !== null && s !== void 0 ? s : this.textures.length;
    for (let n = 0; n < r; n++) {
      const a = this.textures[n];
      a && (a.is2DArray || a.is3D ? this._bindTextureRenderTarget(a, n, this.layerIndices[n]) : a.isCube ? this._bindTextureRenderTarget(a, n, this.faceIndices[n]) : this._bindTextureRenderTarget(a, n));
    }
  }
  /**
   * Set the face and layer indices of a texture in the textures array
   * @param index The index of the texture in the textures array to modify
   * @param layer The layer of the texture to be set
   * @param face The face of the texture to be set
   */
  setLayerAndFaceIndex(e = 0, t, i) {
    if (super.setLayerAndFaceIndex(e, t, i), !this.textures || !this.layerIndices || !this.faceIndices)
      return;
    const s = this.textures[e];
    s.is2DArray || s.is3D ? this._bindTextureRenderTarget(this.textures[e], e, this.layerIndices[e]) : s.isCube && this._bindTextureRenderTarget(this.textures[e], e, this.faceIndices[e]);
  }
  dispose(e = !1) {
    const t = this._context;
    e || (this._colorTextureArray && (this._context.deleteTexture(this._colorTextureArray), this._colorTextureArray = null), this._depthStencilTextureArray && (this._context.deleteTexture(this._depthStencilTextureArray), this._depthStencilTextureArray = null)), this._framebuffer && (t.deleteFramebuffer(this._framebuffer), this._framebuffer = null), this._depthStencilBuffer && (t.deleteRenderbuffer(this._depthStencilBuffer), this._depthStencilBuffer = null), this._MSAAFramebuffer && (t.deleteFramebuffer(this._MSAAFramebuffer), this._MSAAFramebuffer = null), super.dispose(e);
  }
}
pe.prototype._createHardwareRenderTargetWrapper = function(c, e, t) {
  const i = new Kt(c, e, t, this, this._gl);
  return this._renderTargetWrapperCache.push(i), i;
};
pe.prototype.createRenderTargetTexture = function(c, e) {
  var t, i;
  const s = this._createHardwareRenderTargetWrapper(!1, !1, c);
  let r = !0, n = !1, a = !1, o, l = 1;
  e !== void 0 && typeof e == "object" && (r = (t = e.generateDepthBuffer) !== null && t !== void 0 ? t : !0, n = !!e.generateStencilBuffer, a = !!e.noColorAttachment, o = e.colorAttachment, l = (i = e.samples) !== null && i !== void 0 ? i : 1);
  const d = o || (a ? null : this._createInternalTexture(c, e, !0, De.RenderTarget)), h = c.width || c, u = c.height || c, f = this._currentFramebuffer, g = this._gl, p = g.createFramebuffer();
  return this._bindUnboundFramebuffer(p), s._depthStencilBuffer = this._setupFramebufferDepthAttachments(n, r, h, u), d && !d.is2DArray && g.framebufferTexture2D(g.FRAMEBUFFER, g.COLOR_ATTACHMENT0, g.TEXTURE_2D, d._hardwareTexture.underlyingResource, 0), this._bindUnboundFramebuffer(f), s._framebuffer = p, s._generateDepthBuffer = r, s._generateStencilBuffer = n, s.setTextures(d), this.updateRenderTargetTextureSampleCount(s, l), s;
};
pe.prototype.createDepthStencilTexture = function(c, e, t) {
  if (e.isCube) {
    const i = c.width || c;
    return this._createDepthStencilCubeTexture(i, e, t);
  } else
    return this._createDepthStencilTexture(c, e, t);
};
pe.prototype._createDepthStencilTexture = function(c, e, t) {
  const i = this._gl, s = c.layers || 0, r = s !== 0 ? i.TEXTURE_2D_ARRAY : i.TEXTURE_2D, n = new Et(this, De.DepthStencil);
  if (!this._caps.depthTextureExtension)
    return Ve.Error("Depth texture is not supported by your browser or hardware."), n;
  const a = {
    bilinearFiltering: !1,
    comparisonFunction: 0,
    generateStencil: !1,
    ...e
  };
  if (this._bindTextureDirectly(r, n, !0), this._setupDepthStencilTexture(n, c, a.generateStencil, a.comparisonFunction === 0 ? !1 : a.bilinearFiltering, a.comparisonFunction, a.samples), a.depthTextureFormat !== void 0) {
    if (a.depthTextureFormat !== 15 && a.depthTextureFormat !== 16 && a.depthTextureFormat !== 17 && a.depthTextureFormat !== 13 && a.depthTextureFormat !== 14 && a.depthTextureFormat !== 18)
      return Ve.Error("Depth texture format is not supported."), n;
    n.format = a.depthTextureFormat;
  } else
    n.format = a.generateStencil ? 13 : 16;
  const o = n.format === 17 || n.format === 13 || n.format === 18;
  t._depthStencilTexture = n, t._depthStencilTextureWithStencil = o;
  let l = i.UNSIGNED_INT;
  n.format === 15 ? l = i.UNSIGNED_SHORT : n.format === 17 || n.format === 13 ? l = i.UNSIGNED_INT_24_8 : n.format === 14 ? l = i.FLOAT : n.format === 18 && (l = i.FLOAT_32_UNSIGNED_INT_24_8_REV);
  const d = o ? i.DEPTH_STENCIL : i.DEPTH_COMPONENT;
  let h = d;
  this.webGLVersion > 1 && (n.format === 15 ? h = i.DEPTH_COMPONENT16 : n.format === 16 ? h = i.DEPTH_COMPONENT24 : n.format === 17 || n.format === 13 ? h = i.DEPTH24_STENCIL8 : n.format === 14 ? h = i.DEPTH_COMPONENT32F : n.format === 18 && (h = i.DEPTH32F_STENCIL8)), n.is2DArray ? i.texImage3D(r, 0, h, n.width, n.height, s, 0, d, l, null) : i.texImage2D(r, 0, h, n.width, n.height, 0, d, l, null), this._bindTextureDirectly(r, null), this._internalTexturesCache.push(n);
  const u = t;
  if (u._depthStencilBuffer) {
    const f = this._currentFramebuffer;
    this._bindUnboundFramebuffer(u._framebuffer), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.RENDERBUFFER, null), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.DEPTH_ATTACHMENT, i.RENDERBUFFER, null), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.STENCIL_ATTACHMENT, i.RENDERBUFFER, null), this._bindUnboundFramebuffer(f), i.deleteRenderbuffer(u._depthStencilBuffer), u._depthStencilBuffer = null;
  }
  return n;
};
pe.prototype.updateRenderTargetTextureSampleCount = function(c, e) {
  if (this.webGLVersion < 2 || !c || !c.texture)
    return 1;
  if (c.samples === e)
    return e;
  const t = this._gl;
  e = Math.min(e, this.getCaps().maxMSAASamples), c._depthStencilBuffer && (t.deleteRenderbuffer(c._depthStencilBuffer), c._depthStencilBuffer = null), c._MSAAFramebuffer && (t.deleteFramebuffer(c._MSAAFramebuffer), c._MSAAFramebuffer = null);
  const i = c.texture._hardwareTexture;
  if (i.releaseMSAARenderBuffers(), e > 1 && typeof t.renderbufferStorageMultisample == "function") {
    const s = t.createFramebuffer();
    if (!s)
      throw new Error("Unable to create multi sampled framebuffer");
    c._MSAAFramebuffer = s, this._bindUnboundFramebuffer(c._MSAAFramebuffer);
    const r = this._createRenderBuffer(c.texture.width, c.texture.height, e, -1, this._getRGBAMultiSampleBufferFormat(c.texture.type), t.COLOR_ATTACHMENT0, !1);
    if (!r)
      throw new Error("Unable to create multi sampled framebuffer");
    i.addMSAARenderBuffer(r);
  } else
    this._bindUnboundFramebuffer(c._framebuffer);
  return c.texture.samples = e, c._samples = e, c._depthStencilBuffer = this._setupFramebufferDepthAttachments(c._generateStencilBuffer, c._generateDepthBuffer, c.texture.width, c.texture.height, e), this._bindUnboundFramebuffer(null), e;
};
pe.prototype.createRenderTargetCubeTexture = function(c, e) {
  const t = this._createHardwareRenderTargetWrapper(!1, !0, c), i = {
    generateMipMaps: !0,
    generateDepthBuffer: !0,
    generateStencilBuffer: !1,
    type: 0,
    samplingMode: 3,
    format: 5,
    ...e
  };
  i.generateStencilBuffer = i.generateDepthBuffer && i.generateStencilBuffer, (i.type === 1 && !this._caps.textureFloatLinearFiltering || i.type === 2 && !this._caps.textureHalfFloatLinearFiltering) && (i.samplingMode = 1);
  const s = this._gl, r = new Et(this, De.RenderTarget);
  this._bindTextureDirectly(s.TEXTURE_CUBE_MAP, r, !0);
  const n = this._getSamplingParameters(i.samplingMode, i.generateMipMaps);
  i.type === 1 && !this._caps.textureFloat && (i.type = 0, Ve.Warn("Float textures are not supported. Cube render target forced to TEXTURETYPE_UNESIGNED_BYTE type")), s.texParameteri(s.TEXTURE_CUBE_MAP, s.TEXTURE_MAG_FILTER, n.mag), s.texParameteri(s.TEXTURE_CUBE_MAP, s.TEXTURE_MIN_FILTER, n.min), s.texParameteri(s.TEXTURE_CUBE_MAP, s.TEXTURE_WRAP_S, s.CLAMP_TO_EDGE), s.texParameteri(s.TEXTURE_CUBE_MAP, s.TEXTURE_WRAP_T, s.CLAMP_TO_EDGE);
  for (let o = 0; o < 6; o++)
    s.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X + o, 0, this._getRGBABufferInternalSizedFormat(i.type, i.format), c, c, 0, this._getInternalFormat(i.format), this._getWebGLTextureType(i.type), null);
  const a = s.createFramebuffer();
  return this._bindUnboundFramebuffer(a), t._depthStencilBuffer = this._setupFramebufferDepthAttachments(i.generateStencilBuffer, i.generateDepthBuffer, c, c), i.generateMipMaps && s.generateMipmap(s.TEXTURE_CUBE_MAP), this._bindTextureDirectly(s.TEXTURE_CUBE_MAP, null), this._bindUnboundFramebuffer(null), t._framebuffer = a, t._generateDepthBuffer = i.generateDepthBuffer, t._generateStencilBuffer = i.generateStencilBuffer, r.width = c, r.height = c, r.isReady = !0, r.isCube = !0, r.samples = 1, r.generateMipMaps = i.generateMipMaps, r.samplingMode = i.samplingMode, r.type = i.type, r.format = i.format, this._internalTexturesCache.push(r), t.setTextures(r), t;
};
const Qt = "postprocessVertexShader", qt = `attribute vec2 position;
uniform vec2 scale;
varying vec2 vUV;
const vec2 madd=vec2(0.5,0.5);
#define CUSTOM_VERTEX_DEFINITIONS
void main(void) {
#define CUSTOM_VERTEX_MAIN_BEGIN
vUV=(position*madd+madd)*scale;
gl_Position=vec4(position,0.0,1.0);
#define CUSTOM_VERTEX_MAIN_END
}`;
w.ShadersStore[Qt] = qt;
const tt = {
  positions: [1, 1, -1, 1, -1, -1, 1, -1],
  indices: [0, 1, 2, 0, 2, 3]
};
class Jt {
  /**
   * Creates an effect renderer
   * @param engine the engine to use for rendering
   * @param options defines the options of the effect renderer
   */
  constructor(e, t = tt) {
    var i, s;
    this._fullscreenViewport = new yt(0, 0, 1, 1);
    const r = (i = t.positions) !== null && i !== void 0 ? i : tt.positions, n = (s = t.indices) !== null && s !== void 0 ? s : tt.indices;
    this.engine = e, this._vertexBuffers = {
      [D.PositionKind]: new D(e, r, D.PositionKind, !1, !1, 2)
    }, this._indexBuffer = e.createIndexBuffer(n), this._onContextRestoredObserver = e.onContextRestoredObservable.add(() => {
      this._indexBuffer = e.createIndexBuffer(n);
      for (const a in this._vertexBuffers)
        this._vertexBuffers[a]._rebuild();
    });
  }
  /**
   * Sets the current viewport in normalized coordinates 0-1
   * @param viewport Defines the viewport to set (defaults to 0 0 1 1)
   */
  setViewport(e = this._fullscreenViewport) {
    this.engine.setViewport(e);
  }
  /**
   * Binds the embedded attributes buffer to the effect.
   * @param effect Defines the effect to bind the attributes for
   */
  bindBuffers(e) {
    this.engine.bindBuffers(this._vertexBuffers, this._indexBuffer, e);
  }
  /**
   * Sets the current effect wrapper to use during draw.
   * The effect needs to be ready before calling this api.
   * This also sets the default full screen position attribute.
   * @param effectWrapper Defines the effect to draw with
   */
  applyEffectWrapper(e) {
    this.engine.setState(!0), this.engine.depthCullingState.depthTest = !1, this.engine.stencilState.stencilTest = !1, this.engine.enableEffect(e._drawWrapper), this.bindBuffers(e.effect), e.onApplyObservable.notifyObservers({});
  }
  /**
   * Restores engine states
   */
  restoreStates() {
    this.engine.depthCullingState.depthTest = !0, this.engine.stencilState.stencilTest = !0;
  }
  /**
   * Draws a full screen quad.
   */
  draw() {
    this.engine.drawElementsType(0, 0, 6);
  }
  _isRenderTargetTexture(e) {
    return e.renderTarget !== void 0;
  }
  /**
   * renders one or more effects to a specified texture
   * @param effectWrapper the effect to renderer
   * @param outputTexture texture to draw to, if null it will render to the screen.
   */
  render(e, t = null) {
    if (!e.effect.isReady())
      return;
    this.setViewport();
    const i = t === null ? null : this._isRenderTargetTexture(t) ? t.renderTarget : t;
    i && this.engine.bindFramebuffer(i), this.applyEffectWrapper(e), this.draw(), i && this.engine.unBindFramebuffer(i), this.restoreStates();
  }
  /**
   * Disposes of the effect renderer
   */
  dispose() {
    const e = this._vertexBuffers[D.PositionKind];
    e && (e.dispose(), delete this._vertexBuffers[D.PositionKind]), this._indexBuffer && this.engine._releaseBuffer(this._indexBuffer), this._onContextRestoredObserver && (this.engine.onContextRestoredObservable.remove(this._onContextRestoredObserver), this._onContextRestoredObserver = null);
  }
}
class ei {
  /**
   * The underlying effect
   */
  get effect() {
    return this._drawWrapper.effect;
  }
  set effect(e) {
    this._drawWrapper.effect = e;
  }
  /**
   * Creates an effect to be renderer
   * @param creationOptions options to create the effect
   */
  constructor(e) {
    this.onApplyObservable = new V();
    let t;
    const i = e.uniformNames || [];
    e.vertexShader ? t = {
      fragmentSource: e.fragmentShader,
      vertexSource: e.vertexShader,
      spectorName: e.name || "effectWrapper"
    } : (i.push("scale"), t = {
      fragmentSource: e.fragmentShader,
      vertex: "postprocess",
      spectorName: e.name || "effectWrapper"
    }, this.onApplyObservable.add(() => {
      this.effect.setFloat2("scale", 1, 1);
    }));
    const s = e.defines ? e.defines.join(`
`) : "";
    this._drawWrapper = new nt(e.engine), e.useShaderStore ? (t.fragment = t.fragmentSource, t.vertex || (t.vertex = t.vertexSource), delete t.fragmentSource, delete t.vertexSource, this.effect = e.engine.createEffect(t, e.attributeNames || ["position"], i, e.samplerNames, s, void 0, e.onCompiled, void 0, void 0, e.shaderLanguage)) : (this.effect = new ae(t, e.attributeNames || ["position"], i, e.samplerNames, e.engine, s, void 0, e.onCompiled, void 0, void 0, void 0, e.shaderLanguage), this._onContextRestoredObserver = e.engine.onContextRestoredObservable.add(() => {
      this.effect._pipelineContext = null, this.effect._wasPreviouslyReady = !1, this.effect._prepareEffect();
    }));
  }
  /**
   * Disposes of the effect wrapper
   */
  dispose() {
    this._onContextRestoredObserver && (this.effect.getEngine().onContextRestoredObservable.remove(this._onContextRestoredObserver), this._onContextRestoredObserver = null), this.effect.dispose();
  }
}
const vt = "passPixelShader", Pt = `varying vec2 vUV;
uniform sampler2D textureSampler;
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) 
{
gl_FragColor=texture2D(textureSampler,vUV);
}`;
w.ShadersStore[vt] = Pt;
const gt = { name: vt, shader: Pt };
class X {
  static _CreateDumpRenderer() {
    if (!X._DumpToolsEngine) {
      const e = document.createElement("canvas"), t = new pe(e, !1, {
        preserveDrawingBuffer: !0,
        depth: !1,
        stencil: !1,
        alpha: !0,
        premultipliedAlpha: !1,
        antialias: !1,
        failIfMajorPerformanceCaveat: !1
      });
      t.getCaps().parallelShaderCompile = void 0;
      const i = new Jt(t), s = new ei({
        engine: t,
        name: gt.name,
        fragmentShader: gt.shader,
        samplerNames: ["textureSampler"]
      });
      X._DumpToolsEngine = {
        canvas: e,
        engine: t,
        renderer: i,
        wrapper: s
      };
    }
    return X._DumpToolsEngine;
  }
  /**
   * Dumps the current bound framebuffer
   * @param width defines the rendering width
   * @param height defines the rendering height
   * @param engine defines the hosting engine
   * @param successCallback defines the callback triggered once the data are available
   * @param mimeType defines the mime type of the result
   * @param fileName defines the filename to download. If present, the result will automatically be downloaded
   * @returns a void promise
   */
  static async DumpFramebuffer(e, t, i, s, r = "image/png", n) {
    const a = await i.readPixels(0, 0, e, t), o = new Uint8Array(a.buffer);
    X.DumpData(e, t, o, s, r, n, !0);
  }
  /**
   * Dumps an array buffer
   * @param width defines the rendering width
   * @param height defines the rendering height
   * @param data the data array
   * @param mimeType defines the mime type of the result
   * @param fileName defines the filename to download. If present, the result will automatically be downloaded
   * @param invertY true to invert the picture in the Y dimension
   * @param toArrayBuffer true to convert the data to an ArrayBuffer (encoded as `mimeType`) instead of a base64 string
   * @param quality defines the quality of the result
   * @returns a promise that resolve to the final data
   */
  static DumpDataAsync(e, t, i, s = "image/png", r, n = !1, a = !1, o) {
    return new Promise((l) => {
      X.DumpData(e, t, i, (d) => l(d), s, r, n, a, o);
    });
  }
  /**
   * Dumps an array buffer
   * @param width defines the rendering width
   * @param height defines the rendering height
   * @param data the data array
   * @param successCallback defines the callback triggered once the data are available
   * @param mimeType defines the mime type of the result
   * @param fileName defines the filename to download. If present, the result will automatically be downloaded
   * @param invertY true to invert the picture in the Y dimension
   * @param toArrayBuffer true to convert the data to an ArrayBuffer (encoded as `mimeType`) instead of a base64 string
   * @param quality defines the quality of the result
   */
  static DumpData(e, t, i, s, r = "image/png", n, a = !1, o = !1, l) {
    const d = X._CreateDumpRenderer();
    if (d.engine.setSize(e, t, !0), i instanceof Float32Array) {
      const u = new Uint8Array(i.length);
      let f = i.length;
      for (; f--; ) {
        const g = i[f];
        u[f] = g < 0 ? 0 : g > 1 ? 1 : Math.round(g * 255);
      }
      i = u;
    }
    const h = d.engine.createRawTexture(i, e, t, 5, !1, !a, 1);
    d.renderer.setViewport(), d.renderer.applyEffectWrapper(d.wrapper), d.wrapper.effect._bindTexture("textureSampler", h), d.renderer.draw(), o ? Ce.ToBlob(d.canvas, (u) => {
      const f = new FileReader();
      f.onload = (g) => {
        const p = g.target.result;
        s && s(p);
      }, f.readAsArrayBuffer(u);
    }, r, l) : Ce.EncodeScreenshotCanvasData(d.canvas, s, r, n, l), h.dispose();
  }
  /**
   * Dispose the dump tools associated resources
   */
  static Dispose() {
    X._DumpToolsEngine && (X._DumpToolsEngine.wrapper.dispose(), X._DumpToolsEngine.renderer.dispose(), X._DumpToolsEngine.engine.dispose()), X._DumpToolsEngine = null;
  }
}
const ti = () => {
  Ce.DumpData = X.DumpData, Ce.DumpDataAsync = X.DumpDataAsync, Ce.DumpFramebuffer = X.DumpFramebuffer;
};
ti();
class J extends I {
  /**
   * Use this list to define the list of mesh you want to render.
   */
  get renderList() {
    return this._renderList;
  }
  set renderList(e) {
    this._unObserveRenderList && (this._unObserveRenderList(), this._unObserveRenderList = null), e && (this._unObserveRenderList = Lt(e, this._renderListHasChanged)), this._renderList = e;
  }
  /**
   * Post-processes for this render target
   */
  get postProcesses() {
    return this._postProcesses;
  }
  get _prePassEnabled() {
    return !!this._prePassRenderTarget && this._prePassRenderTarget.enabled;
  }
  /**
   * Set a after unbind callback in the texture.
   * This has been kept for backward compatibility and use of onAfterUnbindObservable is recommended.
   */
  set onAfterUnbind(e) {
    this._onAfterUnbindObserver && this.onAfterUnbindObservable.remove(this._onAfterUnbindObserver), this._onAfterUnbindObserver = this.onAfterUnbindObservable.add(e);
  }
  /**
   * Set a before render callback in the texture.
   * This has been kept for backward compatibility and use of onBeforeRenderObservable is recommended.
   */
  set onBeforeRender(e) {
    this._onBeforeRenderObserver && this.onBeforeRenderObservable.remove(this._onBeforeRenderObserver), this._onBeforeRenderObserver = this.onBeforeRenderObservable.add(e);
  }
  /**
   * Set a after render callback in the texture.
   * This has been kept for backward compatibility and use of onAfterRenderObservable is recommended.
   */
  set onAfterRender(e) {
    this._onAfterRenderObserver && this.onAfterRenderObservable.remove(this._onAfterRenderObserver), this._onAfterRenderObserver = this.onAfterRenderObservable.add(e);
  }
  /**
   * Set a clear callback in the texture.
   * This has been kept for backward compatibility and use of onClearObservable is recommended.
   */
  set onClear(e) {
    this._onClearObserver && this.onClearObservable.remove(this._onClearObserver), this._onClearObserver = this.onClearObservable.add(e);
  }
  /**
   * Gets the render pass ids used by the render target texture. For a single render target the array length will be 1, for a cube texture it will be 6 and for
   * a 2D texture array it will return an array of ids the size of the 2D texture array
   */
  get renderPassIds() {
    return this._renderPassIds;
  }
  /**
   * Gets the current value of the refreshId counter
   */
  get currentRefreshId() {
    return this._currentRefreshId;
  }
  /**
   * Sets a specific material to be used to render a mesh/a list of meshes in this render target texture
   * @param mesh mesh or array of meshes
   * @param material material or array of materials to use for this render pass. If undefined is passed, no specific material will be used but the regular material instead (mesh.material). It's possible to provide an array of materials to use a different material for each rendering in the case of a cube texture (6 rendering) and a 2D texture array (as many rendering as the length of the array)
   */
  setMaterialForRendering(e, t) {
    let i;
    Array.isArray(e) ? i = e : i = [e];
    for (let s = 0; s < i.length; ++s)
      for (let r = 0; r < this._renderPassIds.length; ++r)
        i[s].setMaterialForRenderPass(this._renderPassIds[r], t !== void 0 ? Array.isArray(t) ? t[r] : t : void 0);
  }
  /**
   * Define if the texture has multiple draw buffers or if false a single draw buffer.
   */
  get isMulti() {
    var e, t;
    return (t = (e = this._renderTarget) === null || e === void 0 ? void 0 : e.isMulti) !== null && t !== void 0 ? t : !1;
  }
  /**
   * Gets render target creation options that were used.
   */
  get renderTargetOptions() {
    return this._renderTargetOptions;
  }
  /**
   * Gets the render target wrapper associated with this render target
   */
  get renderTarget() {
    return this._renderTarget;
  }
  _onRatioRescale() {
    this._sizeRatio && this.resize(this._initialSizeParameter);
  }
  /**
   * Gets or sets the size of the bounding box associated with the texture (when in cube mode)
   * When defined, the cubemap will switch to local mode
   * @see https://community.arm.com/graphics/b/blog/posts/reflections-based-on-local-cubemaps-in-unity
   * @example https://www.babylonjs-playground.com/#RNASML
   */
  set boundingBoxSize(e) {
    if (this._boundingBoxSize && this._boundingBoxSize.equals(e))
      return;
    this._boundingBoxSize = e;
    const t = this.getScene();
    t && t.markAllMaterialsAsDirty(1);
  }
  get boundingBoxSize() {
    return this._boundingBoxSize;
  }
  /**
   * In case the RTT has been created with a depth texture, get the associated
   * depth texture.
   * Otherwise, return null.
   */
  get depthStencilTexture() {
    var e, t;
    return (t = (e = this._renderTarget) === null || e === void 0 ? void 0 : e._depthStencilTexture) !== null && t !== void 0 ? t : null;
  }
  /** @internal */
  constructor(e, t, i, s = !1, r = !0, n = 0, a = !1, o = I.TRILINEAR_SAMPLINGMODE, l = !0, d = !1, h = !1, u = 5, f = !1, g, p, _ = !1, m = !1) {
    var b, A, v, y, K, H;
    let L;
    if (typeof s == "object") {
      const O = s;
      s = !!O.generateMipMaps, r = (b = O.doNotChangeAspectRatio) !== null && b !== void 0 ? b : !0, n = (A = O.type) !== null && A !== void 0 ? A : 0, a = !!O.isCube, o = (v = O.samplingMode) !== null && v !== void 0 ? v : I.TRILINEAR_SAMPLINGMODE, l = (y = O.generateDepthBuffer) !== null && y !== void 0 ? y : !0, d = !!O.generateStencilBuffer, h = !!O.isMulti, u = (K = O.format) !== null && K !== void 0 ? K : 5, f = !!O.delayAllocation, g = O.samples, p = O.creationFlags, _ = !!O.noColorAttachment, m = !!O.useSRGBBuffer, L = O.colorAttachment;
    }
    if (super(null, i, !s, void 0, o, void 0, void 0, void 0, void 0, u), this._unObserveRenderList = null, this._renderListHasChanged = (O, Ye) => {
      var k;
      const ce = this._renderList ? this._renderList.length : 0;
      (Ye === 0 && ce > 0 || ce === 0) && ((k = this.getScene()) === null || k === void 0 || k.meshes.forEach((Ee) => {
        Ee._markSubMeshesAsLightDirty();
      }));
    }, this.renderParticles = !0, this.renderSprites = !1, this.forceLayerMaskCheck = !1, this.ignoreCameraViewport = !1, this.onBeforeBindObservable = new V(), this.onAfterUnbindObservable = new V(), this.onBeforeRenderObservable = new V(), this.onAfterRenderObservable = new V(), this.onClearObservable = new V(), this.onResizeObservable = new V(), this._cleared = !1, this.skipInitialClear = !1, this._currentRefreshId = -1, this._refreshRate = 1, this._samples = 1, this._canRescale = !0, this._renderTarget = null, this.boundingBoxPosition = S.Zero(), i = this.getScene(), !i)
      return;
    const N = this.getScene().getEngine();
    this._coordinatesMode = I.PROJECTION_MODE, this.renderList = new Array(), this.name = e, this.isRenderTarget = !0, this._initialSizeParameter = t, this._renderPassIds = [], this._isCubeData = a, this._processSizeParameter(t), this.renderPassId = this._renderPassIds[0], this._resizeObserver = N.onResizeObservable.add(() => {
    }), this._generateMipMaps = !!s, this._doNotChangeAspectRatio = r, this._renderingManager = new st(i), this._renderingManager._useSceneAutoClearSetup = !0, !h && (this._renderTargetOptions = {
      generateMipMaps: s,
      type: n,
      format: (H = this._format) !== null && H !== void 0 ? H : void 0,
      samplingMode: this.samplingMode,
      generateDepthBuffer: l,
      generateStencilBuffer: d,
      samples: g,
      creationFlags: p,
      noColorAttachment: _,
      useSRGBBuffer: m,
      colorAttachment: L,
      label: this.name
    }, this.samplingMode === I.NEAREST_SAMPLINGMODE && (this.wrapU = I.CLAMP_ADDRESSMODE, this.wrapV = I.CLAMP_ADDRESSMODE), f || (a ? (this._renderTarget = i.getEngine().createRenderTargetCubeTexture(this.getRenderSize(), this._renderTargetOptions), this.coordinatesMode = I.INVCUBIC_MODE, this._textureMatrix = C.Identity()) : this._renderTarget = i.getEngine().createRenderTargetTexture(this._size, this._renderTargetOptions), this._texture = this._renderTarget.texture, g !== void 0 && (this.samples = g)));
  }
  /**
   * Creates a depth stencil texture.
   * This is only available in WebGL 2 or with the depth texture extension available.
   * @param comparisonFunction Specifies the comparison function to set on the texture. If 0 or undefined, the texture is not in comparison mode (default: 0)
   * @param bilinearFiltering Specifies whether or not bilinear filtering is enable on the texture (default: true)
   * @param generateStencil Specifies whether or not a stencil should be allocated in the texture (default: false)
   * @param samples sample count of the depth/stencil texture (default: 1)
   * @param format format of the depth texture (default: 14)
   */
  createDepthStencilTexture(e = 0, t = !0, i = !1, s = 1, r = 14) {
    var n;
    (n = this._renderTarget) === null || n === void 0 || n.createDepthStencilTexture(e, t, i, s, r);
  }
  _releaseRenderPassId() {
    if (this._scene) {
      const e = this._scene.getEngine();
      for (let t = 0; t < this._renderPassIds.length; ++t)
        e.releaseRenderPassId(this._renderPassIds[t]);
    }
    this._renderPassIds = [];
  }
  _createRenderPassId() {
    this._releaseRenderPassId();
    const e = this._scene.getEngine(), t = this._isCubeData ? 6 : this.getRenderLayers() || 1;
    for (let i = 0; i < t; ++i)
      this._renderPassIds[i] = e.createRenderPassId(`RenderTargetTexture - ${this.name}#${i}`);
  }
  _processSizeParameter(e) {
    if (e.ratio) {
      this._sizeRatio = e.ratio;
      const t = this._getEngine();
      this._size = {
        width: this._bestReflectionRenderTargetDimension(t.getRenderWidth(), this._sizeRatio),
        height: this._bestReflectionRenderTargetDimension(t.getRenderHeight(), this._sizeRatio)
      };
    } else
      this._size = e;
    this._createRenderPassId();
  }
  /**
   * Define the number of samples to use in case of MSAA.
   * It defaults to one meaning no MSAA has been enabled.
   */
  get samples() {
    var e, t;
    return (t = (e = this._renderTarget) === null || e === void 0 ? void 0 : e.samples) !== null && t !== void 0 ? t : this._samples;
  }
  set samples(e) {
    this._renderTarget && (this._samples = this._renderTarget.setSamples(e));
  }
  /**
   * Resets the refresh counter of the texture and start bak from scratch.
   * Could be useful to regenerate the texture if it is setup to render only once.
   */
  resetRefreshCounter() {
    this._currentRefreshId = -1;
  }
  /**
   * Define the refresh rate of the texture or the rendering frequency.
   * Use 0 to render just once, 1 to render on every frame, 2 to render every two frames and so on...
   */
  get refreshRate() {
    return this._refreshRate;
  }
  set refreshRate(e) {
    this._refreshRate = e, this.resetRefreshCounter();
  }
  /**
   * Adds a post process to the render target rendering passes.
   * @param postProcess define the post process to add
   */
  addPostProcess(e) {
    if (!this._postProcessManager) {
      const t = this.getScene();
      if (!t)
        return;
      this._postProcessManager = new bt(t), this._postProcesses = new Array();
    }
    this._postProcesses.push(e), this._postProcesses[0].autoClear = !1;
  }
  /**
   * Clear all the post processes attached to the render target
   * @param dispose define if the cleared post processes should also be disposed (false by default)
   */
  clearPostProcesses(e = !1) {
    if (this._postProcesses) {
      if (e)
        for (const t of this._postProcesses)
          t.dispose();
      this._postProcesses = [];
    }
  }
  /**
   * Remove one of the post process from the list of attached post processes to the texture
   * @param postProcess define the post process to remove from the list
   */
  removePostProcess(e) {
    if (!this._postProcesses)
      return;
    const t = this._postProcesses.indexOf(e);
    t !== -1 && (this._postProcesses.splice(t, 1), this._postProcesses.length > 0 && (this._postProcesses[0].autoClear = !1));
  }
  /** @internal */
  _shouldRender() {
    return this._currentRefreshId === -1 ? (this._currentRefreshId = 1, !0) : this.refreshRate === this._currentRefreshId ? (this._currentRefreshId = 1, !0) : (this._currentRefreshId++, !1);
  }
  /**
   * Gets the actual render size of the texture.
   * @returns the width of the render size
   */
  getRenderSize() {
    return this.getRenderWidth();
  }
  /**
   * Gets the actual render width of the texture.
   * @returns the width of the render size
   */
  getRenderWidth() {
    return this._size.width ? this._size.width : this._size;
  }
  /**
   * Gets the actual render height of the texture.
   * @returns the height of the render size
   */
  getRenderHeight() {
    return this._size.width ? this._size.height : this._size;
  }
  /**
   * Gets the actual number of layers of the texture.
   * @returns the number of layers
   */
  getRenderLayers() {
    const e = this._size.layers;
    return e || 0;
  }
  /**
   * Don't allow this render target texture to rescale. Mainly used to prevent rescaling by the scene optimizer.
   */
  disableRescaling() {
    this._canRescale = !1;
  }
  /**
   * Get if the texture can be rescaled or not.
   */
  get canRescale() {
    return this._canRescale;
  }
  /**
   * Resize the texture using a ratio.
   * @param ratio the ratio to apply to the texture size in order to compute the new target size
   */
  scale(e) {
    const t = Math.max(1, this.getRenderSize() * e);
    this.resize(t);
  }
  /**
   * Get the texture reflection matrix used to rotate/transform the reflection.
   * @returns the reflection matrix
   */
  getReflectionTextureMatrix() {
    return this.isCube ? this._textureMatrix : super.getReflectionTextureMatrix();
  }
  /**
   * Resize the texture to a new desired size.
   * Be careful as it will recreate all the data in the new texture.
   * @param size Define the new size. It can be:
   *   - a number for squared texture,
   *   - an object containing { width: number, height: number }
   *   - or an object containing a ratio { ratio: number }
   */
  resize(e) {
    var t;
    const i = this.isCube;
    (t = this._renderTarget) === null || t === void 0 || t.dispose(), this._renderTarget = null;
    const s = this.getScene();
    s && (this._processSizeParameter(e), i ? this._renderTarget = s.getEngine().createRenderTargetCubeTexture(this.getRenderSize(), this._renderTargetOptions) : this._renderTarget = s.getEngine().createRenderTargetTexture(this._size, this._renderTargetOptions), this._texture = this._renderTarget.texture, this._renderTargetOptions.samples !== void 0 && (this.samples = this._renderTargetOptions.samples), this.onResizeObservable.hasObservers() && this.onResizeObservable.notifyObservers(this));
  }
  /**
   * Renders all the objects from the render list into the texture.
   * @param useCameraPostProcess Define if camera post processes should be used during the rendering
   * @param dumpForDebug Define if the rendering result should be dumped (copied) for debugging purpose
   */
  render(e = !1, t = !1) {
    this._render(e, t);
  }
  /**
   * This function will check if the render target texture can be rendered (textures are loaded, shaders are compiled)
   * @returns true if all required resources are ready
   */
  isReadyForRendering() {
    return this._render(!1, !1, !0);
  }
  _render(e = !1, t = !1, i = !1) {
    var s;
    const r = this.getScene();
    if (!r)
      return i;
    const n = r.getEngine();
    if (this.useCameraPostProcesses !== void 0 && (e = this.useCameraPostProcesses), this._waitingRenderList) {
      this.renderList = [];
      for (let h = 0; h < this._waitingRenderList.length; h++) {
        const u = this._waitingRenderList[h], f = r.getMeshById(u);
        f && this.renderList.push(f);
      }
      this._waitingRenderList = void 0;
    }
    if (this.renderListPredicate) {
      this.renderList ? this.renderList.length = 0 : this.renderList = [];
      const h = this.getScene();
      if (!h)
        return i;
      const u = h.meshes;
      for (let f = 0; f < u.length; f++) {
        const g = u[f];
        this.renderListPredicate(g) && this.renderList.push(g);
      }
    }
    const a = n.currentRenderPassId;
    this.onBeforeBindObservable.notifyObservers(this);
    const o = (s = this.activeCamera) !== null && s !== void 0 ? s : r.activeCamera, l = r.activeCamera;
    o && (o !== r.activeCamera && (r.setTransformMatrix(o.getViewMatrix(), o.getProjectionMatrix(!0)), r.activeCamera = o), n.setViewport(o.viewport, this.getRenderWidth(), this.getRenderHeight())), this._defaultRenderListPrepared = !1;
    let d = i;
    if (i) {
      r.getViewMatrix() || r.updateTransformMatrix();
      const h = this.is2DArray ? this.getRenderLayers() : this.isCube ? 6 : 1;
      for (let u = 0; u < h && d; u++) {
        let f = null;
        const g = this.renderList ? this.renderList : r.getActiveMeshes().data, p = this.renderList ? this.renderList.length : r.getActiveMeshes().length;
        n.currentRenderPassId = this._renderPassIds[u], this.onBeforeRenderObservable.notifyObservers(u), this.getCustomRenderList && (f = this.getCustomRenderList(u, g, p)), f || (f = g), this._doNotChangeAspectRatio || r.updateTransformMatrix(!0);
        for (let _ = 0; _ < f.length && d; ++_) {
          const m = f[_];
          if (!(!m.isEnabled() || m.isBlocked || !m.isVisible || !m.subMeshes)) {
            if (this.customIsReadyFunction) {
              if (!this.customIsReadyFunction(m, this.refreshRate, i)) {
                d = !1;
                continue;
              }
            } else if (!m.isReady(!0)) {
              d = !1;
              continue;
            }
          }
        }
        this.onAfterRenderObservable.notifyObservers(u), (this.is2DArray || this.isCube) && (r.incrementRenderId(), r.resetCachedMaterial());
      }
    } else if (this.is2DArray && !this.isMulti)
      for (let h = 0; h < this.getRenderLayers(); h++)
        this._renderToTarget(0, e, t, h, o), r.incrementRenderId(), r.resetCachedMaterial();
    else if (this.isCube && !this.isMulti)
      for (let h = 0; h < 6; h++)
        this._renderToTarget(h, e, t, void 0, o), r.incrementRenderId(), r.resetCachedMaterial();
    else
      this._renderToTarget(0, e, t, void 0, o);
    return this.onAfterUnbindObservable.notifyObservers(this), n.currentRenderPassId = a, l && (r.activeCamera = l, (r.getEngine().scenes.length > 1 || this.activeCamera && this.activeCamera !== r.activeCamera) && r.setTransformMatrix(r.activeCamera.getViewMatrix(), r.activeCamera.getProjectionMatrix(!0)), n.setViewport(r.activeCamera.viewport)), r.resetCachedMaterial(), d;
  }
  _bestReflectionRenderTargetDimension(e, t) {
    const s = e * t, r = ve.NearestPOT(s + 128 * 128 / (128 + s));
    return Math.min(ve.FloorPOT(e), r);
  }
  _prepareRenderingManager(e, t, i, s) {
    const r = this.getScene();
    if (!r)
      return;
    this._renderingManager.reset();
    const n = r.getRenderId();
    for (let a = 0; a < t; a++) {
      const o = e[a];
      if (o && !o.isBlocked) {
        if (this.customIsReadyFunction) {
          if (!this.customIsReadyFunction(o, this.refreshRate, !1)) {
            this.resetRefreshCounter();
            continue;
          }
        } else if (!o.isReady(this.refreshRate === 0)) {
          this.resetRefreshCounter();
          continue;
        }
        if (!o._internalAbstractMeshDataInfo._currentLODIsUpToDate && r.activeCamera && (o._internalAbstractMeshDataInfo._currentLOD = r.customLODSelector ? r.customLODSelector(o, this.activeCamera || r.activeCamera) : o.getLOD(this.activeCamera || r.activeCamera), o._internalAbstractMeshDataInfo._currentLODIsUpToDate = !0), !o._internalAbstractMeshDataInfo._currentLOD)
          continue;
        let l = o._internalAbstractMeshDataInfo._currentLOD;
        l._preActivateForIntermediateRendering(n);
        let d;
        if (s && i ? d = (o.layerMask & i.layerMask) === 0 : d = !1, o.isEnabled() && o.isVisible && o.subMeshes && !d && (l !== o && l._activate(n, !0), o._activate(n, !0) && o.subMeshes.length)) {
          o.isAnInstance ? o._internalAbstractMeshDataInfo._actAsRegularMesh && (l = o) : l._internalAbstractMeshDataInfo._onlyForInstancesIntermediate = !1, l._internalAbstractMeshDataInfo._isActiveIntermediate = !0;
          for (let h = 0; h < l.subMeshes.length; h++) {
            const u = l.subMeshes[h];
            this._renderingManager.dispatch(u, l);
          }
        }
      }
    }
    for (let a = 0; a < r.particleSystems.length; a++) {
      const o = r.particleSystems[a], l = o.emitter;
      !o.isStarted() || !l || l.position && !l.isEnabled() || this._renderingManager.dispatchParticles(o);
    }
  }
  /**
   * @internal
   * @param faceIndex face index to bind to if this is a cubetexture
   * @param layer defines the index of the texture to bind in the array
   */
  _bindFrameBuffer(e = 0, t = 0) {
    const i = this.getScene();
    if (!i)
      return;
    const s = i.getEngine();
    this._renderTarget && s.bindFramebuffer(this._renderTarget, this.isCube ? e : void 0, void 0, void 0, this.ignoreCameraViewport, 0, t);
  }
  _unbindFrameBuffer(e, t) {
    this._renderTarget && e.unBindFramebuffer(this._renderTarget, this.isCube, () => {
      this.onAfterRenderObservable.notifyObservers(t);
    });
  }
  /**
   * @internal
   */
  _prepareFrame(e, t, i, s) {
    this._postProcessManager ? this._prePassEnabled || this._postProcessManager._prepareFrame(this._texture, this._postProcesses) : (!s || !e.postProcessManager._prepareFrame(this._texture)) && this._bindFrameBuffer(t, i);
  }
  _renderToTarget(e, t, i, s = 0, r = null) {
    var n, a, o, l, d, h;
    const u = this.getScene();
    if (!u)
      return;
    const f = u.getEngine();
    if ((n = f._debugPushGroup) === null || n === void 0 || n.call(f, `render to face #${e} layer #${s}`, 1), this._prepareFrame(u, e, s, t), this.is2DArray ? (f.currentRenderPassId = this._renderPassIds[s], this.onBeforeRenderObservable.notifyObservers(s)) : (f.currentRenderPassId = this._renderPassIds[e], this.onBeforeRenderObservable.notifyObservers(e)), f.snapshotRendering && f.snapshotRenderingMode === 1)
      this.onClearObservable.hasObservers() ? this.onClearObservable.notifyObservers(f) : this.skipInitialClear || f.clear(this.clearColor || u.clearColor, !0, !0, !0);
    else {
      let p = null;
      const _ = this.renderList ? this.renderList : u.getActiveMeshes().data, m = this.renderList ? this.renderList.length : u.getActiveMeshes().length;
      this.getCustomRenderList && (p = this.getCustomRenderList(this.is2DArray ? s : e, _, m)), p ? this._prepareRenderingManager(p, p.length, r, this.forceLayerMaskCheck) : (this._defaultRenderListPrepared || (this._prepareRenderingManager(_, m, r, !this.renderList || this.forceLayerMaskCheck), this._defaultRenderListPrepared = !0), p = _);
      for (const A of u._beforeRenderTargetClearStage)
        A.action(this, e, s);
      this.onClearObservable.hasObservers() ? this.onClearObservable.notifyObservers(f) : this.skipInitialClear || f.clear(this.clearColor || u.clearColor, !0, !0, !0), this._doNotChangeAspectRatio || u.updateTransformMatrix(!0);
      for (const A of u._beforeRenderTargetDrawStage)
        A.action(this, e, s);
      this._renderingManager.render(this.customRenderFunction, p, this.renderParticles, this.renderSprites);
      for (const A of u._afterRenderTargetDrawStage)
        A.action(this, e, s);
      const b = (o = (a = this._texture) === null || a === void 0 ? void 0 : a.generateMipMaps) !== null && o !== void 0 ? o : !1;
      this._texture && (this._texture.generateMipMaps = !1), this._postProcessManager ? this._postProcessManager._finalizeFrame(!1, (l = this._renderTarget) !== null && l !== void 0 ? l : void 0, e, this._postProcesses, this.ignoreCameraViewport) : t && u.postProcessManager._finalizeFrame(!1, (d = this._renderTarget) !== null && d !== void 0 ? d : void 0, e);
      for (const A of u._afterRenderTargetPostProcessStage)
        A.action(this, e, s);
      this._texture && (this._texture.generateMipMaps = b), this._doNotChangeAspectRatio || u.updateTransformMatrix(!0), i && X.DumpFramebuffer(this.getRenderWidth(), this.getRenderHeight(), f);
    }
    this._unbindFrameBuffer(f, e), this._texture && this.isCube && e === 5 && f.generateMipMapsForCubemap(this._texture), (h = f._debugPopGroup) === null || h === void 0 || h.call(f, 1);
  }
  /**
   * Overrides the default sort function applied in the rendering group to prepare the meshes.
   * This allowed control for front to back rendering or reversely depending of the special needs.
   *
   * @param renderingGroupId The rendering group id corresponding to its index
   * @param opaqueSortCompareFn The opaque queue comparison function use to sort.
   * @param alphaTestSortCompareFn The alpha test queue comparison function use to sort.
   * @param transparentSortCompareFn The transparent queue comparison function use to sort.
   */
  setRenderingOrder(e, t = null, i = null, s = null) {
    this._renderingManager.setRenderingOrder(e, t, i, s);
  }
  /**
   * Specifies whether or not the stencil and depth buffer are cleared between two rendering groups.
   *
   * @param renderingGroupId The rendering group id corresponding to its index
   * @param autoClearDepthStencil Automatically clears depth and stencil between groups if true.
   */
  setRenderingAutoClearDepthStencil(e, t) {
    this._renderingManager.setRenderingAutoClearDepthStencil(e, t), this._renderingManager._useSceneAutoClearSetup = !1;
  }
  /**
   * Clones the texture.
   * @returns the cloned texture
   */
  clone() {
    const e = this.getSize(), t = new J(this.name, e, this.getScene(), this._renderTargetOptions.generateMipMaps, this._doNotChangeAspectRatio, this._renderTargetOptions.type, this.isCube, this._renderTargetOptions.samplingMode, this._renderTargetOptions.generateDepthBuffer, this._renderTargetOptions.generateStencilBuffer, void 0, this._renderTargetOptions.format, void 0, this._renderTargetOptions.samples);
    return t.hasAlpha = this.hasAlpha, t.level = this.level, t.coordinatesMode = this.coordinatesMode, this.renderList && (t.renderList = this.renderList.slice(0)), t;
  }
  /**
   * Serialize the texture to a JSON representation we can easily use in the respective Parse function.
   * @returns The JSON representation of the texture
   */
  serialize() {
    if (!this.name)
      return null;
    const e = super.serialize();
    if (e.renderTargetSize = this.getRenderSize(), e.renderList = [], this.renderList)
      for (let t = 0; t < this.renderList.length; t++)
        e.renderList.push(this.renderList[t].id);
    return e;
  }
  /**
   *  This will remove the attached framebuffer objects. The texture will not be able to be used as render target anymore
   */
  disposeFramebufferObjects() {
    var e;
    (e = this._renderTarget) === null || e === void 0 || e.dispose(!0);
  }
  /**
   * Release and destroy the underlying lower level texture aka internalTexture.
   */
  releaseInternalTexture() {
    var e;
    (e = this._renderTarget) === null || e === void 0 || e.releaseTextures(), this._texture = null;
  }
  /**
   * Dispose the texture and release its associated resources.
   */
  dispose() {
    var e;
    this.onResizeObservable.clear(), this.onClearObservable.clear(), this.onAfterRenderObservable.clear(), this.onAfterUnbindObservable.clear(), this.onBeforeBindObservable.clear(), this.onBeforeRenderObservable.clear(), this._postProcessManager && (this._postProcessManager.dispose(), this._postProcessManager = null), this._prePassRenderTarget && this._prePassRenderTarget.dispose(), this._releaseRenderPassId(), this.clearPostProcesses(!0), this._resizeObserver && (this.getScene().getEngine().onResizeObservable.remove(this._resizeObserver), this._resizeObserver = null), this.renderList = null;
    const t = this.getScene();
    if (!t)
      return;
    let i = t.customRenderTargets.indexOf(this);
    i >= 0 && t.customRenderTargets.splice(i, 1);
    for (const s of t.cameras)
      i = s.customRenderTargets.indexOf(this), i >= 0 && s.customRenderTargets.splice(i, 1);
    (e = this._renderTarget) === null || e === void 0 || e.dispose(), this._renderTarget = null, this._texture = null, super.dispose();
  }
  /** @internal */
  _rebuild() {
    this.refreshRate === J.REFRESHRATE_RENDER_ONCE && (this.refreshRate = J.REFRESHRATE_RENDER_ONCE), this._postProcessManager && this._postProcessManager._rebuild();
  }
  /**
   * Clear the info related to rendering groups preventing retention point in material dispose.
   */
  freeRenderingGroups() {
    this._renderingManager && this._renderingManager.freeRenderingGroups();
  }
  /**
   * Gets the number of views the corresponding to the texture (eg. a MultiviewRenderTarget will have > 1)
   * @returns the view count
   */
  getViewCount() {
    return 1;
  }
}
J.REFRESHRATE_RENDER_ONCE = 0;
J.REFRESHRATE_RENDER_ONEVERYFRAME = 1;
J.REFRESHRATE_RENDER_ONEVERYTWOFRAMES = 2;
I._CreateRenderTargetTexture = (c, e, t, i, s) => new J(c, e, t, i);
class P {
  /**
   * Registers a shader code processing with a post process name.
   * @param postProcessName name of the post process. Use null for the fallback shader code processing. This is the shader code processing that will be used in case no specific shader code processing has been associated to a post process name
   * @param customShaderCodeProcessing shader code processing to associate to the post process name
   * @returns
   */
  static RegisterShaderCodeProcessing(e, t) {
    if (!t) {
      delete P._CustomShaderCodeProcessing[e ?? ""];
      return;
    }
    P._CustomShaderCodeProcessing[e ?? ""] = t;
  }
  static _GetShaderCodeProcessing(e) {
    var t;
    return (t = P._CustomShaderCodeProcessing[e]) !== null && t !== void 0 ? t : P._CustomShaderCodeProcessing[""];
  }
  /**
   * Number of sample textures (default: 1)
   */
  get samples() {
    return this._samples;
  }
  set samples(e) {
    this._samples = Math.min(e, this._engine.getCaps().maxMSAASamples), this._textures.forEach((t) => {
      t.setSamples(this._samples);
    });
  }
  /**
   * Returns the fragment url or shader name used in the post process.
   * @returns the fragment url or name in the shader store.
   */
  getEffectName() {
    return this._fragmentUrl;
  }
  /**
   * A function that is added to the onActivateObservable
   */
  set onActivate(e) {
    this._onActivateObserver && this.onActivateObservable.remove(this._onActivateObserver), e && (this._onActivateObserver = this.onActivateObservable.add(e));
  }
  /**
   * A function that is added to the onSizeChangedObservable
   */
  set onSizeChanged(e) {
    this._onSizeChangedObserver && this.onSizeChangedObservable.remove(this._onSizeChangedObserver), this._onSizeChangedObserver = this.onSizeChangedObservable.add(e);
  }
  /**
   * A function that is added to the onApplyObservable
   */
  set onApply(e) {
    this._onApplyObserver && this.onApplyObservable.remove(this._onApplyObserver), this._onApplyObserver = this.onApplyObservable.add(e);
  }
  /**
   * A function that is added to the onBeforeRenderObservable
   */
  set onBeforeRender(e) {
    this._onBeforeRenderObserver && this.onBeforeRenderObservable.remove(this._onBeforeRenderObserver), this._onBeforeRenderObserver = this.onBeforeRenderObservable.add(e);
  }
  /**
   * A function that is added to the onAfterRenderObservable
   */
  set onAfterRender(e) {
    this._onAfterRenderObserver && this.onAfterRenderObservable.remove(this._onAfterRenderObserver), this._onAfterRenderObserver = this.onAfterRenderObservable.add(e);
  }
  /**
   * The input texture for this post process and the output texture of the previous post process. When added to a pipeline the previous post process will
   * render it's output into this texture and this texture will be used as textureSampler in the fragment shader of this post process.
   */
  get inputTexture() {
    return this._textures.data[this._currentRenderTextureInd];
  }
  set inputTexture(e) {
    this._forcedOutputTexture = e;
  }
  /**
   * Since inputTexture should always be defined, if we previously manually set `inputTexture`,
   * the only way to unset it is to use this function to restore its internal state
   */
  restoreDefaultInputTexture() {
    this._forcedOutputTexture && (this._forcedOutputTexture = null, this.markTextureDirty());
  }
  /**
   * Gets the camera which post process is applied to.
   * @returns The camera the post process is applied to.
   */
  getCamera() {
    return this._camera;
  }
  /**
   * Gets the texel size of the postprocess.
   * See https://en.wikipedia.org/wiki/Texel_(graphics)
   */
  get texelSize() {
    return this._shareOutputWithPostProcess ? this._shareOutputWithPostProcess.texelSize : (this._forcedOutputTexture && this._texelSize.copyFromFloats(1 / this._forcedOutputTexture.width, 1 / this._forcedOutputTexture.height), this._texelSize);
  }
  /**
   * Creates a new instance PostProcess
   * @param name The name of the PostProcess.
   * @param fragmentUrl The url of the fragment shader to be used.
   * @param parameters Array of the names of uniform non-sampler2D variables that will be passed to the shader.
   * @param samplers Array of the names of uniform sampler2D variables that will be passed to the shader.
   * @param options The required width/height ratio to downsize to before computing the render pass. (Use 1.0 for full size)
   * @param camera The camera to apply the render pass to.
   * @param samplingMode The sampling mode to be used when computing the pass. (default: 0)
   * @param engine The engine which the post process will be applied. (default: current engine)
   * @param reusable If the post process can be reused on the same frame. (default: false)
   * @param defines String of defines that will be set when running the fragment shader. (default: null)
   * @param textureType Type of textures used when performing the post process. (default: 0)
   * @param vertexUrl The url of the vertex shader to be used. (default: "postprocess")
   * @param indexParameters The index parameters to be used for babylons include syntax "#include<kernelBlurVaryingDeclaration>[0..varyingCount]". (default: undefined) See usage in babylon.blurPostProcess.ts and kernelBlur.vertex.fx
   * @param blockCompilation If the shader should not be compiled immediatly. (default: false)
   * @param textureFormat Format of textures used when performing the post process. (default: TEXTUREFORMAT_RGBA)
   */
  constructor(e, t, i, s, r, n, a = 1, o, l, d = null, h = 0, u = "postprocess", f, g = !1, p = 5, _ = Nt.GLSL) {
    this._parentContainer = null, this.width = -1, this.height = -1, this.nodeMaterialSource = null, this._outputTexture = null, this.autoClear = !0, this.forceAutoClearInAlphaMode = !1, this.alphaMode = 0, this.animations = new Array(), this.enablePixelPerfectMode = !1, this.forceFullscreenViewport = !0, this.scaleMode = 1, this.alwaysForcePOT = !1, this._samples = 1, this.adaptScaleToCurrentViewport = !1, this._reusable = !1, this._renderId = 0, this.externalTextureSamplerBinding = !1, this._textures = new ft(2), this._textureCache = [], this._currentRenderTextureInd = 0, this._scaleRatio = new Ae(1, 1), this._texelSize = Ae.Zero(), this.onActivateObservable = new V(), this.onSizeChangedObservable = new V(), this.onApplyObservable = new V(), this.onBeforeRenderObservable = new V(), this.onAfterRenderObservable = new V(), this.name = e, n != null ? (this._camera = n, this._scene = n.getScene(), n.attachPostProcess(this), this._engine = this._scene.getEngine(), this._scene.postProcesses.push(this), this.uniqueId = this._scene.getUniqueId()) : o && (this._engine = o, this._engine.postProcesses.push(this)), this._options = r, this.renderTargetSamplingMode = a || 1, this._reusable = l || !1, this._textureType = h, this._textureFormat = p, this._shaderLanguage = _, this._samplers = s || [], this._samplers.push("textureSampler"), this._fragmentUrl = t, this._vertexUrl = u, this._parameters = i || [], this._parameters.push("scale"), this._indexParameters = f, this._drawWrapper = new nt(this._engine), g || this.updateEffect(d);
  }
  /**
   * Gets a string identifying the name of the class
   * @returns "PostProcess" string
   */
  getClassName() {
    return "PostProcess";
  }
  /**
   * Gets the engine which this post process belongs to.
   * @returns The engine the post process was enabled with.
   */
  getEngine() {
    return this._engine;
  }
  /**
   * The effect that is created when initializing the post process.
   * @returns The created effect corresponding the the postprocess.
   */
  getEffect() {
    return this._drawWrapper.effect;
  }
  /**
   * To avoid multiple redundant textures for multiple post process, the output the output texture for this post process can be shared with another.
   * @param postProcess The post process to share the output with.
   * @returns This post process.
   */
  shareOutputWith(e) {
    return this._disposeTextures(), this._shareOutputWithPostProcess = e, this;
  }
  /**
   * Reverses the effect of calling shareOutputWith and returns the post process back to its original state.
   * This should be called if the post process that shares output with this post process is disabled/disposed.
   */
  useOwnOutput() {
    this._textures.length == 0 && (this._textures = new ft(2)), this._shareOutputWithPostProcess = null;
  }
  /**
   * Updates the effect with the current post process compile time values and recompiles the shader.
   * @param defines Define statements that should be added at the beginning of the shader. (default: null)
   * @param uniforms Set of uniform variables that will be passed to the shader. (default: null)
   * @param samplers Set of Texture2D variables that will be passed to the shader. (default: null)
   * @param indexParameters The index parameters to be used for babylons include syntax "#include<kernelBlurVaryingDeclaration>[0..varyingCount]". (default: undefined) See usage in babylon.blurPostProcess.ts and kernelBlur.vertex.fx
   * @param onCompiled Called when the shader has been compiled.
   * @param onError Called if there is an error when compiling a shader.
   * @param vertexUrl The url of the vertex shader to be used (default: the one given at construction time)
   * @param fragmentUrl The url of the fragment shader to be used (default: the one given at construction time)
   */
  updateEffect(e = null, t = null, i = null, s, r, n, a, o) {
    var l, d;
    const h = P._GetShaderCodeProcessing(this.name);
    if (h != null && h.defineCustomBindings) {
      const u = (l = t == null ? void 0 : t.slice()) !== null && l !== void 0 ? l : [];
      u.push(...this._parameters);
      const f = (d = i == null ? void 0 : i.slice()) !== null && d !== void 0 ? d : [];
      f.push(...this._samplers), e = h.defineCustomBindings(this.name, e, u, f), t = u, i = f;
    }
    this._postProcessDefines = e, this._drawWrapper.effect = this._engine.createEffect({ vertex: a ?? this._vertexUrl, fragment: o ?? this._fragmentUrl }, {
      attributes: ["position"],
      uniformsNames: t || this._parameters,
      uniformBuffersNames: [],
      samplers: i || this._samplers,
      defines: e !== null ? e : "",
      fallbacks: null,
      onCompiled: r ?? null,
      onError: n ?? null,
      indexParameters: s || this._indexParameters,
      processCodeAfterIncludes: h != null && h.processCodeAfterIncludes ? (u, f) => h.processCodeAfterIncludes(this.name, u, f) : null,
      processFinalCode: h != null && h.processFinalCode ? (u, f) => h.processFinalCode(this.name, u, f) : null,
      shaderLanguage: this._shaderLanguage
    }, this._engine);
  }
  /**
   * The post process is reusable if it can be used multiple times within one frame.
   * @returns If the post process is reusable
   */
  isReusable() {
    return this._reusable;
  }
  /** invalidate frameBuffer to hint the postprocess to create a depth buffer */
  markTextureDirty() {
    this.width = -1;
  }
  _createRenderTargetTexture(e, t, i = 0) {
    for (let r = 0; r < this._textureCache.length; r++)
      if (this._textureCache[r].texture.width === e.width && this._textureCache[r].texture.height === e.height && this._textureCache[r].postProcessChannel === i && this._textureCache[r].texture._generateDepthBuffer === t.generateDepthBuffer && this._textureCache[r].texture.samples === t.samples)
        return this._textureCache[r].texture;
    const s = this._engine.createRenderTargetTexture(e, t);
    return this._textureCache.push({ texture: s, postProcessChannel: i, lastUsedRenderId: -1 }), s;
  }
  _flushTextureCache() {
    const e = this._renderId;
    for (let t = this._textureCache.length - 1; t >= 0; t--)
      if (e - this._textureCache[t].lastUsedRenderId > 100) {
        let i = !1;
        for (let s = 0; s < this._textures.length; s++)
          if (this._textures.data[s] === this._textureCache[t].texture) {
            i = !0;
            break;
          }
        i || (this._textureCache[t].texture.dispose(), this._textureCache.splice(t, 1));
      }
  }
  _resize(e, t, i, s, r) {
    this._textures.length > 0 && this._textures.reset(), this.width = e, this.height = t;
    let n = null;
    for (let l = 0; l < i._postProcesses.length; l++)
      if (i._postProcesses[l] !== null) {
        n = i._postProcesses[l];
        break;
      }
    const a = { width: this.width, height: this.height }, o = {
      generateMipMaps: s,
      generateDepthBuffer: r || n === this,
      generateStencilBuffer: (r || n === this) && this._engine.isStencilEnable,
      samplingMode: this.renderTargetSamplingMode,
      type: this._textureType,
      format: this._textureFormat,
      samples: this._samples,
      label: "PostProcessRTT-" + this.name
    };
    this._textures.push(this._createRenderTargetTexture(a, o, 0)), this._reusable && this._textures.push(this._createRenderTargetTexture(a, o, 1)), this._texelSize.copyFromFloats(1 / this.width, 1 / this.height), this.onSizeChangedObservable.notifyObservers(this);
  }
  /**
   * Activates the post process by intializing the textures to be used when executed. Notifies onActivateObservable.
   * When this post process is used in a pipeline, this is call will bind the input texture of this post process to the output of the previous.
   * @param camera The camera that will be used in the post process. This camera will be used when calling onActivateObservable.
   * @param sourceTexture The source texture to be inspected to get the width and height if not specified in the post process constructor. (default: null)
   * @param forceDepthStencil If true, a depth and stencil buffer will be generated. (default: false)
   * @returns The render target wrapper that was bound to be written to.
   */
  activate(e, t = null, i) {
    var s, r;
    e = e || this._camera;
    const n = e.getScene(), a = n.getEngine(), o = a.getCaps().maxTextureSize;
    let l = (t ? t.width : this._engine.getRenderWidth(!0)) * this._options | 0;
    const d = (t ? t.height : this._engine.getRenderHeight(!0)) * this._options | 0, h = e.parent;
    h && (h.leftCamera == e || h.rightCamera == e) && (l /= 2);
    let u = this._options.width || l, f = this._options.height || d;
    const g = this.renderTargetSamplingMode !== 7 && this.renderTargetSamplingMode !== 1 && this.renderTargetSamplingMode !== 2;
    if (!this._shareOutputWithPostProcess && !this._forcedOutputTexture) {
      if (this.adaptScaleToCurrentViewport) {
        const _ = a.currentViewport;
        _ && (u *= _.width, f *= _.height);
      }
      (g || this.alwaysForcePOT) && (this._options.width || (u = a.needPOTTextures ? ve.GetExponentOfTwo(u, o, this.scaleMode) : u), this._options.height || (f = a.needPOTTextures ? ve.GetExponentOfTwo(f, o, this.scaleMode) : f)), (this.width !== u || this.height !== f) && this._resize(u, f, e, g, i), this._textures.forEach((_) => {
        _.samples !== this.samples && this._engine.updateRenderTargetTextureSampleCount(_, this.samples);
      }), this._flushTextureCache(), this._renderId++;
    }
    let p;
    if (this._shareOutputWithPostProcess)
      p = this._shareOutputWithPostProcess.inputTexture;
    else if (this._forcedOutputTexture)
      p = this._forcedOutputTexture, this.width = this._forcedOutputTexture.width, this.height = this._forcedOutputTexture.height;
    else {
      p = this.inputTexture;
      let _;
      for (let m = 0; m < this._textureCache.length; m++)
        if (this._textureCache[m].texture === p) {
          _ = this._textureCache[m];
          break;
        }
      _ && (_.lastUsedRenderId = this._renderId);
    }
    return this.enablePixelPerfectMode ? (this._scaleRatio.copyFromFloats(l / u, d / f), this._engine.bindFramebuffer(p, 0, l, d, this.forceFullscreenViewport)) : (this._scaleRatio.copyFromFloats(1, 1), this._engine.bindFramebuffer(p, 0, void 0, void 0, this.forceFullscreenViewport)), (r = (s = this._engine)._debugInsertMarker) === null || r === void 0 || r.call(s, `post process ${this.name} input`), this.onActivateObservable.notifyObservers(e), this.autoClear && (this.alphaMode === 0 || this.forceAutoClearInAlphaMode) && this._engine.clear(this.clearColor ? this.clearColor : n.clearColor, n._allowPostProcessClearColor, !0, !0), this._reusable && (this._currentRenderTextureInd = (this._currentRenderTextureInd + 1) % 2), p;
  }
  /**
   * If the post process is supported.
   */
  get isSupported() {
    return this._drawWrapper.effect.isSupported;
  }
  /**
   * The aspect ratio of the output texture.
   */
  get aspectRatio() {
    return this._shareOutputWithPostProcess ? this._shareOutputWithPostProcess.aspectRatio : this._forcedOutputTexture ? this._forcedOutputTexture.width / this._forcedOutputTexture.height : this.width / this.height;
  }
  /**
   * Get a value indicating if the post-process is ready to be used
   * @returns true if the post-process is ready (shader is compiled)
   */
  isReady() {
    var e, t;
    return (t = (e = this._drawWrapper.effect) === null || e === void 0 ? void 0 : e.isReady()) !== null && t !== void 0 ? t : !1;
  }
  /**
   * Binds all textures and uniforms to the shader, this will be run on every pass.
   * @returns the effect corresponding to this post process. Null if not compiled or not ready.
   */
  apply() {
    var e, t, i;
    if (!(!((e = this._drawWrapper.effect) === null || e === void 0) && e.isReady()))
      return null;
    this._engine.enableEffect(this._drawWrapper), this._engine.setState(!1), this._engine.setDepthBuffer(!1), this._engine.setDepthWrite(!1), this._engine.setAlphaMode(this.alphaMode), this.alphaConstants && this.getEngine().setAlphaConstants(this.alphaConstants.r, this.alphaConstants.g, this.alphaConstants.b, this.alphaConstants.a);
    let s;
    return this._shareOutputWithPostProcess ? s = this._shareOutputWithPostProcess.inputTexture : this._forcedOutputTexture ? s = this._forcedOutputTexture : s = this.inputTexture, this.externalTextureSamplerBinding || this._drawWrapper.effect._bindTexture("textureSampler", s == null ? void 0 : s.texture), this._drawWrapper.effect.setVector2("scale", this._scaleRatio), this.onApplyObservable.notifyObservers(this._drawWrapper.effect), (i = (t = P._GetShaderCodeProcessing(this.name)) === null || t === void 0 ? void 0 : t.bindCustomBindings) === null || i === void 0 || i.call(t, this.name, this._drawWrapper.effect), this._drawWrapper.effect;
  }
  _disposeTextures() {
    if (this._shareOutputWithPostProcess || this._forcedOutputTexture) {
      this._disposeTextureCache();
      return;
    }
    this._disposeTextureCache(), this._textures.dispose();
  }
  _disposeTextureCache() {
    for (let e = this._textureCache.length - 1; e >= 0; e--)
      this._textureCache[e].texture.dispose();
    this._textureCache.length = 0;
  }
  /**
   * Sets the required values to the prepass renderer.
   * @param prePassRenderer defines the prepass renderer to setup.
   * @returns true if the pre pass is needed.
   */
  setPrePassRenderer(e) {
    return this._prePassEffectConfiguration ? (this._prePassEffectConfiguration = e.addEffectConfiguration(this._prePassEffectConfiguration), this._prePassEffectConfiguration.enabled = !0, !0) : !1;
  }
  /**
   * Disposes the post process.
   * @param camera The camera to dispose the post process on.
   */
  dispose(e) {
    e = e || this._camera, this._disposeTextures();
    let t;
    if (this._scene && (t = this._scene.postProcesses.indexOf(this), t !== -1 && this._scene.postProcesses.splice(t, 1)), this._parentContainer) {
      const i = this._parentContainer.postProcesses.indexOf(this);
      i > -1 && this._parentContainer.postProcesses.splice(i, 1), this._parentContainer = null;
    }
    if (t = this._engine.postProcesses.indexOf(this), t !== -1 && this._engine.postProcesses.splice(t, 1), !!e) {
      if (e.detachPostProcess(this), t = e._postProcesses.indexOf(this), t === 0 && e._postProcesses.length > 0) {
        const i = this._camera._getFirstPostProcess();
        i && i.markTextureDirty();
      }
      this.onActivateObservable.clear(), this.onAfterRenderObservable.clear(), this.onApplyObservable.clear(), this.onBeforeRenderObservable.clear(), this.onSizeChangedObservable.clear();
    }
  }
  /**
   * Serializes the post process to a JSON object
   * @returns the JSON object
   */
  serialize() {
    const e = se.Serialize(this), t = this.getCamera() || this._scene && this._scene.activeCamera;
    return e.customType = "BABYLON." + this.getClassName(), e.cameraId = t ? t.id : null, e.reusable = this._reusable, e.textureType = this._textureType, e.fragmentUrl = this._fragmentUrl, e.parameters = this._parameters, e.samplers = this._samplers, e.options = this._options, e.defines = this._postProcessDefines, e.textureFormat = this._textureFormat, e.vertexUrl = this._vertexUrl, e.indexParameters = this._indexParameters, e;
  }
  /**
   * Clones this post process
   * @returns a new post process similar to this one
   */
  clone() {
    const e = this.serialize();
    e._engine = this._engine, e.cameraId = null;
    const t = P.Parse(e, this._scene, "");
    return t ? (t.onActivateObservable = this.onActivateObservable.clone(), t.onSizeChangedObservable = this.onSizeChangedObservable.clone(), t.onApplyObservable = this.onApplyObservable.clone(), t.onBeforeRenderObservable = this.onBeforeRenderObservable.clone(), t.onAfterRenderObservable = this.onAfterRenderObservable.clone(), t._prePassEffectConfiguration = this._prePassEffectConfiguration, t) : null;
  }
  /**
   * Creates a material from parsed material data
   * @param parsedPostProcess defines parsed post process data
   * @param scene defines the hosting scene
   * @param rootUrl defines the root URL to use to load textures
   * @returns a new post process
   */
  static Parse(e, t, i) {
    const s = xt(e.customType);
    if (!s || !s._Parse)
      return null;
    const r = t ? t.getCameraById(e.cameraId) : null;
    return s._Parse(e, r, t, i);
  }
  /**
   * @internal
   */
  static _Parse(e, t, i, s) {
    return se.Parse(() => new P(e.name, e.fragmentUrl, e.parameters, e.samplers, e.options, t, e.renderTargetSamplingMode, e._engine, e.reusable, e.defines, e.textureType, e.vertexUrl, e.indexParameters, !1, e.textureFormat), e, i, s);
  }
}
P._CustomShaderCodeProcessing = {};
E([
  R()
], P.prototype, "uniqueId", void 0);
E([
  R()
], P.prototype, "name", void 0);
E([
  R()
], P.prototype, "width", void 0);
E([
  R()
], P.prototype, "height", void 0);
E([
  R()
], P.prototype, "renderTargetSamplingMode", void 0);
E([
  Bt()
], P.prototype, "clearColor", void 0);
E([
  R()
], P.prototype, "autoClear", void 0);
E([
  R()
], P.prototype, "forceAutoClearInAlphaMode", void 0);
E([
  R()
], P.prototype, "alphaMode", void 0);
E([
  R()
], P.prototype, "alphaConstants", void 0);
E([
  R()
], P.prototype, "enablePixelPerfectMode", void 0);
E([
  R()
], P.prototype, "forceFullscreenViewport", void 0);
E([
  R()
], P.prototype, "scaleMode", void 0);
E([
  R()
], P.prototype, "alwaysForcePOT", void 0);
E([
  R("samples")
], P.prototype, "_samples", void 0);
E([
  R()
], P.prototype, "adaptScaleToCurrentViewport", void 0);
Xe("BABYLON.PostProcess", P);
const ii = "kernelBlurVaryingDeclaration", si = "varying vec2 sampleCoord{X};";
w.IncludesShadersStore[ii] = si;
const ri = "packingFunctions", ni = `vec4 pack(float depth)
{
const vec4 bit_shift=vec4(255.0*255.0*255.0,255.0*255.0,255.0,1.0);
const vec4 bit_mask=vec4(0.0,1.0/255.0,1.0/255.0,1.0/255.0);
vec4 res=fract(depth*bit_shift);
res-=res.xxyz*bit_mask;
return res;
}
float unpack(vec4 color)
{
const vec4 bit_shift=vec4(1.0/(255.0*255.0*255.0),1.0/(255.0*255.0),1.0/255.0,1.0);
return dot(color,bit_shift);
}`;
w.IncludesShadersStore[ri] = ni;
const ai = "kernelBlurFragment", oi = `#ifdef DOF
factor=sampleCoC(sampleCoord{X}); 
computedWeight=KERNEL_WEIGHT{X}*factor;
sumOfWeights+=computedWeight;
#else
computedWeight=KERNEL_WEIGHT{X};
#endif
#ifdef PACKEDFLOAT
blend+=unpack(texture2D(textureSampler,sampleCoord{X}))*computedWeight;
#else
blend+=texture2D(textureSampler,sampleCoord{X})*computedWeight;
#endif
`;
w.IncludesShadersStore[ai] = oi;
const hi = "kernelBlurFragment2", li = `#ifdef DOF
factor=sampleCoC(sampleCenter+delta*KERNEL_DEP_OFFSET{X});
computedWeight=KERNEL_DEP_WEIGHT{X}*factor;
sumOfWeights+=computedWeight;
#else
computedWeight=KERNEL_DEP_WEIGHT{X};
#endif
#ifdef PACKEDFLOAT
blend+=unpack(texture2D(textureSampler,sampleCenter+delta*KERNEL_DEP_OFFSET{X}))*computedWeight;
#else
blend+=texture2D(textureSampler,sampleCenter+delta*KERNEL_DEP_OFFSET{X})*computedWeight;
#endif
`;
w.IncludesShadersStore[hi] = li;
const di = "kernelBlurPixelShader", ui = `uniform sampler2D textureSampler;
uniform vec2 delta;
varying vec2 sampleCenter;
#ifdef DOF
uniform sampler2D circleOfConfusionSampler;
float sampleCoC(in vec2 offset) {
float coc=texture2D(circleOfConfusionSampler,offset).r;
return coc; 
}
#endif
#include<kernelBlurVaryingDeclaration>[0..varyingCount]
#ifdef PACKEDFLOAT
#include<packingFunctions>
#endif
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void)
{
float computedWeight=0.0;
#ifdef PACKEDFLOAT
float blend=0.;
#else
vec4 blend=vec4(0.);
#endif
#ifdef DOF
float sumOfWeights=CENTER_WEIGHT; 
float factor=0.0;
#ifdef PACKEDFLOAT
blend+=unpack(texture2D(textureSampler,sampleCenter))*CENTER_WEIGHT;
#else
blend+=texture2D(textureSampler,sampleCenter)*CENTER_WEIGHT;
#endif
#endif
#include<kernelBlurFragment>[0..varyingCount]
#include<kernelBlurFragment2>[0..depCount]
#ifdef PACKEDFLOAT
gl_FragColor=pack(blend);
#else
gl_FragColor=blend;
#endif
#ifdef DOF
gl_FragColor/=sumOfWeights;
#endif
}`;
w.ShadersStore[di] = ui;
const ci = "kernelBlurVertex", fi = "sampleCoord{X}=sampleCenter+delta*KERNEL_OFFSET{X};";
w.IncludesShadersStore[ci] = fi;
const _i = "kernelBlurVertexShader", pi = `attribute vec2 position;
uniform vec2 delta;
varying vec2 sampleCenter;
#include<kernelBlurVaryingDeclaration>[0..varyingCount]
const vec2 madd=vec2(0.5,0.5);
#define CUSTOM_VERTEX_DEFINITIONS
void main(void) {
#define CUSTOM_VERTEX_MAIN_BEGIN
sampleCenter=(position*madd+madd);
#include<kernelBlurVertex>[0..varyingCount]
gl_Position=vec4(position,0.0,1.0);
#define CUSTOM_VERTEX_MAIN_END
}`;
w.ShadersStore[_i] = pi;
class de extends P {
  /**
   * Sets the length in pixels of the blur sample region
   */
  set kernel(e) {
    this._idealKernel !== e && (e = Math.max(e, 1), this._idealKernel = e, this._kernel = this._nearestBestKernel(e), this._blockCompilation || this._updateParameters());
  }
  /**
   * Gets the length in pixels of the blur sample region
   */
  get kernel() {
    return this._idealKernel;
  }
  /**
   * Sets whether or not the blur needs to unpack/repack floats
   */
  set packedFloat(e) {
    this._packedFloat !== e && (this._packedFloat = e, this._blockCompilation || this._updateParameters());
  }
  /**
   * Gets whether or not the blur is unpacking/repacking floats
   */
  get packedFloat() {
    return this._packedFloat;
  }
  /**
   * Gets a string identifying the name of the class
   * @returns "BlurPostProcess" string
   */
  getClassName() {
    return "BlurPostProcess";
  }
  /**
   * Creates a new instance BlurPostProcess
   * @param name The name of the effect.
   * @param direction The direction in which to blur the image.
   * @param kernel The size of the kernel to be used when computing the blur. eg. Size of 3 will blur the center pixel by 2 pixels surrounding it.
   * @param options The required width/height ratio to downsize to before computing the render pass. (Use 1.0 for full size)
   * @param camera The camera to apply the render pass to.
   * @param samplingMode The sampling mode to be used when computing the pass. (default: 0)
   * @param engine The engine which the post process will be applied. (default: current engine)
   * @param reusable If the post process can be reused on the same frame. (default: false)
   * @param textureType Type of textures used when performing the post process. (default: 0)
   * @param defines
   * @param _blockCompilation If compilation of the shader should not be done in the constructor. The updateEffect method can be used to compile the shader at a later time. (default: false)
   * @param textureFormat Format of textures used when performing the post process. (default: TEXTUREFORMAT_RGBA)
   */
  constructor(e, t, i, s, r, n = I.BILINEAR_SAMPLINGMODE, a, o, l = 0, d = "", h = !1, u = 5) {
    super(e, "kernelBlur", ["delta", "direction"], ["circleOfConfusionSampler"], s, r, n, a, o, null, l, "kernelBlur", { varyingCount: 0, depCount: 0 }, !0, u), this._blockCompilation = h, this._packedFloat = !1, this._staticDefines = "", this._staticDefines = d, this.direction = t, this.onApplyObservable.add((f) => {
      this._outputTexture ? f.setFloat2("delta", 1 / this._outputTexture.width * this.direction.x, 1 / this._outputTexture.height * this.direction.y) : f.setFloat2("delta", 1 / this.width * this.direction.x, 1 / this.height * this.direction.y);
    }), this.kernel = i;
  }
  /**
   * Updates the effect with the current post process compile time values and recompiles the shader.
   * @param defines Define statements that should be added at the beginning of the shader. (default: null)
   * @param uniforms Set of uniform variables that will be passed to the shader. (default: null)
   * @param samplers Set of Texture2D variables that will be passed to the shader. (default: null)
   * @param indexParameters The index parameters to be used for babylons include syntax "#include<kernelBlurVaryingDeclaration>[0..varyingCount]". (default: undefined) See usage in babylon.blurPostProcess.ts and kernelBlur.vertex.fx
   * @param onCompiled Called when the shader has been compiled.
   * @param onError Called if there is an error when compiling a shader.
   */
  updateEffect(e = null, t = null, i = null, s, r, n) {
    this._updateParameters(r, n);
  }
  _updateParameters(e, t) {
    const i = this._kernel, s = (i - 1) / 2;
    let r = [], n = [], a = 0;
    for (let _ = 0; _ < i; _++) {
      const m = _ / (i - 1), b = this._gaussianWeight(m * 2 - 1);
      r[_] = _ - s, n[_] = b, a += b;
    }
    for (let _ = 0; _ < n.length; _++)
      n[_] /= a;
    const o = [], l = [], d = [];
    for (let _ = 0; _ <= s; _ += 2) {
      const m = Math.min(_ + 1, Math.floor(s));
      if (_ === m)
        d.push({ o: r[_], w: n[_] });
      else {
        const A = m === s, v = n[_] + n[m] * (A ? 0.5 : 1), y = r[_] + 1 / (1 + n[_] / n[m]);
        y === 0 ? (d.push({ o: r[_], w: n[_] }), d.push({ o: r[_ + 1], w: n[_ + 1] })) : (d.push({ o: y, w: v }), d.push({ o: -y, w: v }));
      }
    }
    for (let _ = 0; _ < d.length; _++)
      l[_] = d[_].o, o[_] = d[_].w;
    r = l, n = o;
    const h = this.getEngine().getCaps().maxVaryingVectors, u = Math.max(h, 0) - 1;
    let f = Math.min(r.length, u), g = "";
    g += this._staticDefines, this._staticDefines.indexOf("DOF") != -1 && (g += `#define CENTER_WEIGHT ${this._glslFloat(n[f - 1])}\r
`, f--);
    for (let _ = 0; _ < f; _++)
      g += `#define KERNEL_OFFSET${_} ${this._glslFloat(r[_])}\r
`, g += `#define KERNEL_WEIGHT${_} ${this._glslFloat(n[_])}\r
`;
    let p = 0;
    for (let _ = u; _ < r.length; _++)
      g += `#define KERNEL_DEP_OFFSET${p} ${this._glslFloat(r[_])}\r
`, g += `#define KERNEL_DEP_WEIGHT${p} ${this._glslFloat(n[_])}\r
`, p++;
    this.packedFloat && (g += "#define PACKEDFLOAT 1"), this._blockCompilation = !1, super.updateEffect(g, null, null, {
      varyingCount: f,
      depCount: p
    }, e, t);
  }
  /**
   * Best kernels are odd numbers that when divided by 2, their integer part is even, so 5, 9 or 13.
   * Other odd kernels optimize correctly but require proportionally more samples, even kernels are
   * possible but will produce minor visual artifacts. Since each new kernel requires a new shader we
   * want to minimize kernel changes, having gaps between physical kernels is helpful in that regard.
   * The gaps between physical kernels are compensated for in the weighting of the samples
   * @param idealKernel Ideal blur kernel.
   * @returns Nearest best kernel.
   */
  _nearestBestKernel(e) {
    const t = Math.round(e);
    for (const i of [t, t - 1, t + 1, t - 2, t + 2])
      if (i % 2 !== 0 && Math.floor(i / 2) % 2 === 0 && i > 0)
        return Math.max(i, 3);
    return Math.max(t, 3);
  }
  /**
   * Calculates the value of a Gaussian distribution with sigma 3 at a given point.
   * @param x The point on the Gaussian distribution to sample.
   * @returns the value of the Gaussian function at x.
   */
  _gaussianWeight(e) {
    const t = 0.3333333333333333, i = Math.sqrt(2 * Math.PI) * t, s = -(e * e / (2 * t * t));
    return 1 / i * Math.exp(s);
  }
  /**
   * Generates a string that can be used as a floating point number in GLSL.
   * @param x Value to print.
   * @param decimalFigures Number of decimal places to print the number to (excluding trailing 0s).
   * @returns GLSL float string.
   */
  _glslFloat(e, t = 8) {
    return e.toFixed(t).replace(/0+$/, "");
  }
  /**
   * @internal
   */
  static _Parse(e, t, i, s) {
    return se.Parse(() => new de(e.name, e.direction, e.kernel, e.options, t, e.renderTargetSamplingMode, i.getEngine(), e.reusable, e.textureType, void 0, !1), e, i, s);
  }
}
E([
  R("kernel")
], de.prototype, "_kernel", void 0);
E([
  R("packedFloat")
], de.prototype, "_packedFloat", void 0);
E([
  Ut()
], de.prototype, "direction", void 0);
Xe("BABYLON.BlurPostProcess", de);
const gi = "bayerDitherFunctions", mi = `float bayerDither2(vec2 _P) {
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
w.IncludesShadersStore[gi] = mi;
const Si = "shadowMapFragmentExtraDeclaration", Mi = `#if SM_FLOAT==0
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
w.IncludesShadersStore[Si] = Mi;
const Ti = "shadowMapFragment", xi = `float depthSM=vDepthMetricSM;
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
w.IncludesShadersStore[Ti] = xi;
const Ei = "shadowMapPixelShader", bi = `#include<shadowMapFragmentExtraDeclaration>
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
w.ShadersStore[Ei] = bi;
const Ri = "sceneVertexDeclaration", Ci = `uniform mat4 viewProjection;
#ifdef MULTIVIEW
uniform mat4 viewProjectionR;
#endif
uniform mat4 view;
uniform mat4 projection;
uniform vec4 vEyePosition;
`;
w.IncludesShadersStore[Ri] = Ci;
const vi = "meshVertexDeclaration", Pi = `uniform mat4 world;
uniform float visibility;
`;
w.IncludesShadersStore[vi] = Pi;
const Ai = "shadowMapVertexDeclaration", wi = `#include<sceneVertexDeclaration>
#include<meshVertexDeclaration>
`;
w.IncludesShadersStore[Ai] = wi;
const Di = "shadowMapUboDeclaration", Ii = `layout(std140,column_major) uniform;
#include<sceneUboDeclaration>
#include<meshUboDeclaration>
`;
w.IncludesShadersStore[Di] = Ii;
const Oi = "shadowMapVertexExtraDeclaration", Fi = `#if SM_NORMALBIAS==1
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
w.IncludesShadersStore[Oi] = Fi;
const yi = "shadowMapVertexNormalBias", Li = `#if SM_NORMALBIAS==1
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
w.IncludesShadersStore[yi] = Li;
const Bi = "shadowMapVertexMetric", Ni = `#if SM_USEDISTANCE==1
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
w.IncludesShadersStore[Bi] = Ni;
const Ui = "shadowMapVertexShader", zi = `attribute vec3 position;
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
w.ShadersStore[Ui] = zi;
const Vi = "depthBoxBlurPixelShader", ki = `varying vec2 vUV;
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
w.ShadersStore[Vi] = ki;
const Wi = "shadowMapFragmentSoftTransparentShadow", Hi = `#if SM_SOFTTRANSPARENTSHADOW==1
if ((bayerDither8(floor(mod(gl_FragCoord.xy,8.0))))/64.0>=softTransparentShadowSM*alpha) discard;
#endif
`;
w.IncludesShadersStore[Wi] = Hi;
class M {
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
      if (e === M.FILTER_BLUREXPONENTIALSHADOWMAP) {
        this.useExponentialShadowMap = !0;
        return;
      } else if (e === M.FILTER_BLURCLOSEEXPONENTIALSHADOWMAP) {
        this.useCloseExponentialShadowMap = !0;
        return;
      } else if (e === M.FILTER_PCF || e === M.FILTER_PCSS) {
        this.usePoissonSampling = !0;
        return;
      }
    }
    if ((e === M.FILTER_PCF || e === M.FILTER_PCSS) && !this._scene.getEngine()._features.supportShadowSamplers) {
      this.usePoissonSampling = !0;
      return;
    }
    this._filter !== e && (this._filter = e, this._disposeBlurPostProcesses(), this._applyFilterValues(), this._light._markMeshesAsLightDirty());
  }
  /**
   * Gets if the current filter is set to Poisson Sampling.
   */
  get usePoissonSampling() {
    return this.filter === M.FILTER_POISSONSAMPLING;
  }
  /**
   * Sets the current filter to Poisson Sampling.
   */
  set usePoissonSampling(e) {
    const t = this._validateFilter(M.FILTER_POISSONSAMPLING);
    !e && this.filter !== M.FILTER_POISSONSAMPLING || (this.filter = e ? t : M.FILTER_NONE);
  }
  /**
   * Gets if the current filter is set to ESM.
   */
  get useExponentialShadowMap() {
    return this.filter === M.FILTER_EXPONENTIALSHADOWMAP;
  }
  /**
   * Sets the current filter is to ESM.
   */
  set useExponentialShadowMap(e) {
    const t = this._validateFilter(M.FILTER_EXPONENTIALSHADOWMAP);
    !e && this.filter !== M.FILTER_EXPONENTIALSHADOWMAP || (this.filter = e ? t : M.FILTER_NONE);
  }
  /**
   * Gets if the current filter is set to filtered ESM.
   */
  get useBlurExponentialShadowMap() {
    return this.filter === M.FILTER_BLUREXPONENTIALSHADOWMAP;
  }
  /**
   * Gets if the current filter is set to filtered  ESM.
   */
  set useBlurExponentialShadowMap(e) {
    const t = this._validateFilter(M.FILTER_BLUREXPONENTIALSHADOWMAP);
    !e && this.filter !== M.FILTER_BLUREXPONENTIALSHADOWMAP || (this.filter = e ? t : M.FILTER_NONE);
  }
  /**
   * Gets if the current filter is set to "close ESM" (using the inverse of the
   * exponential to prevent steep falloff artifacts).
   */
  get useCloseExponentialShadowMap() {
    return this.filter === M.FILTER_CLOSEEXPONENTIALSHADOWMAP;
  }
  /**
   * Sets the current filter to "close ESM" (using the inverse of the
   * exponential to prevent steep falloff artifacts).
   */
  set useCloseExponentialShadowMap(e) {
    const t = this._validateFilter(M.FILTER_CLOSEEXPONENTIALSHADOWMAP);
    !e && this.filter !== M.FILTER_CLOSEEXPONENTIALSHADOWMAP || (this.filter = e ? t : M.FILTER_NONE);
  }
  /**
   * Gets if the current filter is set to filtered "close ESM" (using the inverse of the
   * exponential to prevent steep falloff artifacts).
   */
  get useBlurCloseExponentialShadowMap() {
    return this.filter === M.FILTER_BLURCLOSEEXPONENTIALSHADOWMAP;
  }
  /**
   * Sets the current filter to filtered "close ESM" (using the inverse of the
   * exponential to prevent steep falloff artifacts).
   */
  set useBlurCloseExponentialShadowMap(e) {
    const t = this._validateFilter(M.FILTER_BLURCLOSEEXPONENTIALSHADOWMAP);
    !e && this.filter !== M.FILTER_BLURCLOSEEXPONENTIALSHADOWMAP || (this.filter = e ? t : M.FILTER_NONE);
  }
  /**
   * Gets if the current filter is set to "PCF" (percentage closer filtering).
   */
  get usePercentageCloserFiltering() {
    return this.filter === M.FILTER_PCF;
  }
  /**
   * Sets the current filter to "PCF" (percentage closer filtering).
   */
  set usePercentageCloserFiltering(e) {
    const t = this._validateFilter(M.FILTER_PCF);
    !e && this.filter !== M.FILTER_PCF || (this.filter = e ? t : M.FILTER_NONE);
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
    return this.filter === M.FILTER_PCSS;
  }
  /**
   * Sets the current filter to "PCSS" (contact hardening).
   */
  set useContactHardeningShadow(e) {
    const t = this._validateFilter(M.FILTER_PCSS);
    !e && this.filter !== M.FILTER_PCSS || (this.filter = e ? t : M.FILTER_NONE);
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
    return M.CLASSNAME;
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
    this.onBeforeShadowMapRenderObservable = new V(), this.onAfterShadowMapRenderObservable = new V(), this.onBeforeShadowMapRenderMeshObservable = new V(), this.onAfterShadowMapRenderMeshObservable = new V(), this._bias = 5e-5, this._normalBias = 0, this._blurBoxOffset = 1, this._blurScale = 2, this._blurKernel = 1, this._useKernelBlur = !1, this._filter = M.FILTER_NONE, this._filteringQuality = M.QUALITY_HIGH, this._contactHardeningLightSizeUVRatio = 0.1, this._darkness = 0, this._transparencyShadow = !1, this.enableSoftTransparentShadow = !1, this.useOpacityTextureForTransparentShadow = !1, this.frustumEdgeFalloff = 0, this.forceBackFacesOnly = !1, this._lightDirection = S.Zero(), this._viewMatrix = C.Zero(), this._projectionMatrix = C.Zero(), this._transformMatrix = C.Zero(), this._cachedPosition = new S(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE), this._cachedDirection = new S(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE), this._currentFaceIndex = 0, this._currentFaceIndexCache = 0, this._defaultTextureMatrix = C.Identity(), this._mapSize = e, this._light = t, this._scene = t.getScene(), this._camera = s ?? null;
    let r = t._shadowGenerators;
    r || (r = t._shadowGenerators = /* @__PURE__ */ new Map()), r.set(this._camera, this), this.id = t.id, this._useUBO = this._scene.getEngine().supportsUniformBuffers, this._useUBO && (this._sceneUBOs = [], this._sceneUBOs.push(this._scene.createSceneUniformBuffer(`Scene for Shadow Generator (light "${this._light.name}")`))), M._SceneComponentInitialization(this._scene);
    const n = this._scene.getEngine().getCaps();
    i ? n.textureFloatRender && n.textureFloatLinearFiltering ? this._textureType = 1 : n.textureHalfFloatRender && n.textureHalfFloatLinearFiltering ? this._textureType = 2 : this._textureType = 0 : n.textureHalfFloatRender && n.textureHalfFloatLinearFiltering ? this._textureType = 2 : n.textureFloatRender && n.textureFloatLinearFiltering ? this._textureType = 1 : this._textureType = 0, this._initializeGenerator(), this._applyFilterValues();
  }
  _initializeGenerator() {
    this._light._markMeshesAsLightDirty(), this._initializeShadowMap();
  }
  _createTargetRenderTexture() {
    const e = this._scene.getEngine();
    e._features.supportDepthStencilTexture ? (this._shadowMap = new J(this._light.name + "_shadowMap", this._mapSize, this._scene, !1, !0, this._textureType, this._light.needCube(), void 0, !1, !1), this._shadowMap.createDepthStencilTexture(e.useReverseDepthBuffer ? 516 : 513, !0)) : this._shadowMap = new J(this._light.name + "_shadowMap", this._mapSize, this._scene, !1, !0, this._textureType, this._light.needCube());
  }
  _initializeShadowMap() {
    if (this._createTargetRenderTexture(), this._shadowMap === null)
      return;
    this._shadowMap.wrapU = I.CLAMP_ADDRESSMODE, this._shadowMap.wrapV = I.CLAMP_ADDRESSMODE, this._shadowMap.anisotropicFilteringLevel = 1, this._shadowMap.updateSamplingMode(I.BILINEAR_SAMPLINGMODE), this._shadowMap.renderParticles = !1, this._shadowMap.ignoreCameraViewport = !0, this._storedUniqueId && (this._shadowMap.uniqueId = this._storedUniqueId), this._shadowMap.customRenderFunction = this._renderForShadowMap.bind(this), this._shadowMap.customIsReadyFunction = () => !0;
    const e = this._scene.getEngine();
    this._shadowMap.onBeforeBindObservable.add(() => {
      var s;
      this._currentSceneUBO = this._scene.getSceneUniformBuffer(), (s = e._debugPushGroup) === null || s === void 0 || s.call(e, `shadow map generation for pass id ${e.currentRenderPassId}`, 1);
    }), this._shadowMap.onBeforeRenderObservable.add((s) => {
      this._sceneUBOs && this._scene.setSceneUniformBuffer(this._sceneUBOs[0]), this._currentFaceIndex = s, this._filter === M.FILTER_PCF && e.setColorWrite(!1), this.getTransformMatrix(), this._scene.setTransformMatrix(this._viewMatrix, this._projectionMatrix), this._useUBO && (this._scene.getSceneUniformBuffer().unbindEffect(), this._scene.finalizeSceneUbo());
    }), this._shadowMap.onAfterUnbindObservable.add(() => {
      var s, r;
      if (this._sceneUBOs && this._scene.setSceneUniformBuffer(this._currentSceneUBO), this._scene.updateTransformMatrix(), this._filter === M.FILTER_PCF && e.setColorWrite(!0), !this.useBlurExponentialShadowMap && !this.useBlurCloseExponentialShadowMap) {
        (s = e._debugPopGroup) === null || s === void 0 || s.call(e, 1);
        return;
      }
      const n = this.getShadowMapForRendering();
      n && (this._scene.postProcessManager.directRender(this._blurPostProcesses, n.renderTarget, !0), e.unBindFramebuffer(n.renderTarget, !0), (r = e._debugPopGroup) === null || r === void 0 || r.call(e, 1));
    });
    const t = new Pe(0, 0, 0, 0), i = new Pe(1, 1, 1, 1);
    this._shadowMap.onClearObservable.add((s) => {
      this._filter === M.FILTER_PCF ? s.clear(i, !1, !0, !1) : this.useExponentialShadowMap || this.useBlurExponentialShadowMap ? s.clear(t, !0, !0, !1) : s.clear(i, !0, !0, !1);
    }), this._shadowMap.onResizeObservable.add((s) => {
      this._storedUniqueId = this._shadowMap.uniqueId, this._mapSize = s.getRenderSize(), this._light._markMeshesAsLightDirty(), this.recreateShadowMap();
    });
    for (let s = st.MIN_RENDERINGGROUPS; s < st.MAX_RENDERINGGROUPS; s++)
      this._shadowMap.setRenderingAutoClearDepthStencil(s, !1);
  }
  _initializeBlurRTTAndPostProcesses() {
    const e = this._scene.getEngine(), t = this._mapSize / this.blurScale;
    (!this.useKernelBlur || this.blurScale !== 1) && (this._shadowMap2 = new J(this._light.name + "_shadowMap2", t, this._scene, !1, !0, this._textureType, void 0, void 0, !1), this._shadowMap2.wrapU = I.CLAMP_ADDRESSMODE, this._shadowMap2.wrapV = I.CLAMP_ADDRESSMODE, this._shadowMap2.updateSamplingMode(I.BILINEAR_SAMPLINGMODE)), this.useKernelBlur ? (this._kernelBlurXPostprocess = new de(this._light.name + "KernelBlurX", new Ae(1, 0), this.blurKernel, 1, null, I.BILINEAR_SAMPLINGMODE, e, !1, this._textureType), this._kernelBlurXPostprocess.width = t, this._kernelBlurXPostprocess.height = t, this._kernelBlurXPostprocess.externalTextureSamplerBinding = !0, this._kernelBlurXPostprocess.onApplyObservable.add((i) => {
      i.setTexture("textureSampler", this._shadowMap);
    }), this._kernelBlurYPostprocess = new de(this._light.name + "KernelBlurY", new Ae(0, 1), this.blurKernel, 1, null, I.BILINEAR_SAMPLINGMODE, e, !1, this._textureType), this._kernelBlurXPostprocess.autoClear = !1, this._kernelBlurYPostprocess.autoClear = !1, this._textureType === 0 && (this._kernelBlurXPostprocess.packedFloat = !0, this._kernelBlurYPostprocess.packedFloat = !0), this._blurPostProcesses = [this._kernelBlurXPostprocess, this._kernelBlurYPostprocess]) : (this._boxBlurPostprocess = new P(this._light.name + "DepthBoxBlur", "depthBoxBlur", ["screenSize", "boxOffset"], [], 1, null, I.BILINEAR_SAMPLINGMODE, e, !1, "#define OFFSET " + this._blurBoxOffset, this._textureType), this._boxBlurPostprocess.externalTextureSamplerBinding = !0, this._boxBlurPostprocess.onApplyObservable.add((i) => {
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
    const r = e.getRenderingMesh(), n = e.getEffectiveMesh(), a = this._scene, o = a.getEngine(), l = e.getMaterial();
    if (n._internalAbstractMeshDataInfo._isActiveIntermediate = !1, !l || e.verticesCount === 0 || e._renderId === a.getRenderId())
      return;
    const d = n._getWorldMatrixDeterminant() < 0;
    let h = (i = r.overrideMaterialSideOrientation) !== null && i !== void 0 ? i : l.sideOrientation;
    d && (h = h === 0 ? 1 : 0);
    const u = h === 0;
    o.setState(l.backFaceCulling, void 0, void 0, u, l.cullBackFaces);
    const f = r._getInstancesRenderList(e._id, !!e.getReplacementMesh());
    if (f.mustReturn)
      return;
    const g = o.getCaps().instancedArrays && (f.visibleInstances[e._id] !== null && f.visibleInstances[e._id] !== void 0 || r.hasThinInstances);
    if (!(this.customAllowRendering && !this.customAllowRendering(e)))
      if (this.isReady(e, g, t)) {
        e._renderId = a.getRenderId();
        const p = l.shadowDepthWrapper, _ = (s = p == null ? void 0 : p.getEffect(e, this, o.currentRenderPassId)) !== null && s !== void 0 ? s : e._getDrawWrapper(), m = nt.GetEffect(_);
        o.enableEffect(_), g || r._bind(e, m, l.fillMode), this.getTransformMatrix(), m.setFloat3("biasAndScaleSM", this.bias, this.normalBias, this.depthScale), this.getLight().getTypeID() === x.LIGHTTYPEID_DIRECTIONALLIGHT ? m.setVector3("lightDataSM", this._cachedDirection) : m.setVector3("lightDataSM", this._cachedPosition);
        const b = this._getCamera();
        if (b && m.setFloat2("depthValuesSM", this.getLight().getDepthMinZ(b), this.getLight().getDepthMinZ(b) + this.getLight().getDepthMaxZ(b)), t && this.enableSoftTransparentShadow && m.setFloat("softTransparentShadowSM", n.visibility * l.alpha), p)
          e._setMainDrawWrapperOverride(_), p.standalone ? p.baseMaterial.bindForSubMesh(n.getWorldMatrix(), r, e) : l.bindForSubMesh(n.getWorldMatrix(), r, e), e._setMainDrawWrapperOverride(null);
        else {
          if (this._opacityTexture && (m.setTexture("diffuseSampler", this._opacityTexture), m.setMatrix("diffuseMatrix", this._opacityTexture.getTextureMatrix() || this._defaultTextureMatrix)), r.useBones && r.computeBonesUsingShaders && r.skeleton) {
            const v = r.skeleton;
            if (v.isUsingTextureForMatrices) {
              const y = v.getTransformMatrixTexture(r);
              if (!y)
                return;
              m.setTexture("boneSampler", y), m.setFloat("boneTextureWidth", 4 * (v.bones.length + 1));
            } else
              m.setMatrices("mBones", v.getTransformMatrices(r));
          }
          Z.BindMorphTargetParameters(r, m), r.morphTargetManager && r.morphTargetManager.isUsingTextureForTargets && r.morphTargetManager._bind(m), at(m, l, a);
        }
        !this._useUBO && !p && this._bindCustomEffectForRenderSubMeshForShadowMap(e, m, n), Z.BindSceneUniformBuffer(m, this._scene.getSceneUniformBuffer()), this._scene.getSceneUniformBuffer().bindUniformBuffer();
        const A = n.getWorldMatrix();
        g && (n.getMeshUniformBuffer().bindToEffect(m, "Mesh"), n.transferToEffect(A)), this.forceBackFacesOnly && o.setState(!0, 0, !1, !0, l.cullBackFaces), this.onBeforeShadowMapRenderMeshObservable.notifyObservers(r), this.onBeforeShadowMapRenderObservable.notifyObservers(m), r._processRendering(n, e, m, l.fillMode, f, g, (v, y) => {
          n !== r && !v ? (r.getMeshUniformBuffer().bindToEffect(m, "Mesh"), r.transferToEffect(y)) : (n.getMeshUniformBuffer().bindToEffect(m, "Mesh"), n.transferToEffect(v ? y : A));
        }), this.forceBackFacesOnly && o.setState(!0, 0, !1, !1, l.cullBackFaces), this.onAfterShadowMapRenderObservable.notifyObservers(m), this.onAfterShadowMapRenderMeshObservable.notifyObservers(r);
      } else
        this._shadowMap && this._shadowMap.resetRefreshCounter();
  }
  _applyFilterValues() {
    this._shadowMap && (this.filter === M.FILTER_NONE || this.filter === M.FILTER_PCSS ? this._shadowMap.updateSamplingMode(I.NEAREST_SAMPLINGMODE) : this._shadowMap.updateSamplingMode(I.BILINEAR_SAMPLINGMODE));
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
    for (const l of r)
      n.push(...l.subMeshes);
    if (n.length === 0) {
      e && e(this);
      return;
    }
    let a = 0;
    const o = () => {
      var l, d;
      if (!(!this._scene || !this._scene.getEngine())) {
        for (; this.isReady(n[a], i.useInstances, (d = (l = n[a].getMaterial()) === null || l === void 0 ? void 0 : l.needAlphaBlendingForMesh(n[a].getMesh())) !== null && d !== void 0 ? d : !1); )
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
    return i.push("#define SM_NORMALBIAS " + (this.normalBias && r.isVerticesDataPresent(D.NormalKind) ? "1" : "0")), i.push("#define SM_DIRECTIONINLIGHTDATA " + (this.getLight().getTypeID() === x.LIGHTTYPEID_DIRECTIONALLIGHT ? "1" : "0")), i.push("#define SM_USEDISTANCE " + (this._light.needCube() ? "1" : "0")), i.push("#define SM_SOFTTRANSPARENTSHADOW " + (this.enableSoftTransparentShadow && s ? "1" : "0")), this._isReadyCustomDefines(i, e, t), i;
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
      let l = o.effect, d = o.defines;
      const h = [D.PositionKind], u = e.getMesh();
      this.normalBias && u.isVerticesDataPresent(D.NormalKind) && (h.push(D.NormalKind), a.push("#define NORMAL"), u.nonUniformScaling && a.push("#define NONUNIFORMSCALING"));
      const f = r.needAlphaTesting();
      if ((f || r.needAlphaBlending()) && (this.useOpacityTextureForTransparentShadow ? this._opacityTexture = r.opacityTexture : this._opacityTexture = r.getAlphaTestTexture(), this._opacityTexture)) {
        if (!this._opacityTexture.isReady())
          return !1;
        const b = (s = r.alphaCutOff) !== null && s !== void 0 ? s : M.DEFAULT_ALPHA_CUTOFF;
        a.push("#define ALPHATEXTURE"), f && a.push(`#define ALPHATESTVALUE ${b}${b % 1 === 0 ? "." : ""}`), u.isVerticesDataPresent(D.UVKind) && (h.push(D.UVKind), a.push("#define UV1")), u.isVerticesDataPresent(D.UV2Kind) && this._opacityTexture.coordinatesIndex === 1 && (h.push(D.UV2Kind), a.push("#define UV2"));
      }
      const g = new Ct();
      if (u.useBones && u.computeBonesUsingShaders && u.skeleton) {
        h.push(D.MatricesIndicesKind), h.push(D.MatricesWeightsKind), u.numBoneInfluencers > 4 && (h.push(D.MatricesIndicesExtraKind), h.push(D.MatricesWeightsExtraKind));
        const b = u.skeleton;
        a.push("#define NUM_BONE_INFLUENCERS " + u.numBoneInfluencers), u.numBoneInfluencers > 0 && g.addCPUSkinningFallback(0, u), b.isUsingTextureForMatrices ? a.push("#define BONETEXTURE") : a.push("#define BonesPerMesh " + (b.bones.length + 1));
      } else
        a.push("#define NUM_BONE_INFLUENCERS 0");
      const p = u.morphTargetManager;
      let _ = 0;
      if (p && p.numInfluencers > 0 && (a.push("#define MORPHTARGETS"), _ = p.numInfluencers, a.push("#define NUM_MORPH_INFLUENCERS " + _), p.isUsingTextureForTargets && a.push("#define MORPHTARGETS_TEXTURE"), Z.PrepareAttributesForMorphTargetsInfluencers(h, u, _)), Rt(r, this._scene, a), t && (a.push("#define INSTANCES"), Z.PushAttributesForInstances(h), e.getRenderingMesh().hasThinInstances && a.push("#define THIN_INSTANCES")), this.customShaderOptions && this.customShaderOptions.defines)
        for (const b of this.customShaderOptions.defines)
          a.indexOf(b) === -1 && a.push(b);
      const m = a.join(`
`);
      if (d !== m) {
        d = m;
        let b = "shadowMap";
        const A = [
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
        ], v = ["diffuseSampler", "boneSampler", "morphTargets"], y = ["Scene", "Mesh"];
        if (ot(A), this.customShaderOptions) {
          if (b = this.customShaderOptions.shaderName, this.customShaderOptions.attributes)
            for (const H of this.customShaderOptions.attributes)
              h.indexOf(H) === -1 && h.push(H);
          if (this.customShaderOptions.uniforms)
            for (const H of this.customShaderOptions.uniforms)
              A.indexOf(H) === -1 && A.push(H);
          if (this.customShaderOptions.samplers)
            for (const H of this.customShaderOptions.samplers)
              v.indexOf(H) === -1 && v.push(H);
        }
        const K = this._scene.getEngine();
        l = K.createEffect(b, {
          attributes: h,
          uniformsNames: A,
          uniformBuffersNames: y,
          samplers: v,
          defines: m,
          fallbacks: g,
          onCompiled: null,
          onError: null,
          indexParameters: { maxSimultaneousMorphTargets: _ }
        }, K), o.setEffect(l, d);
      }
      if (!l.isReady())
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
    !i.shadowsEnabled || !s.shadowEnabled || (e["SHADOW" + t] = !0, this.useContactHardeningShadow ? (e["SHADOWPCSS" + t] = !0, this._filteringQuality === M.QUALITY_LOW ? e["SHADOWLOWQUALITY" + t] = !0 : this._filteringQuality === M.QUALITY_MEDIUM && (e["SHADOWMEDIUMQUALITY" + t] = !0)) : this.usePercentageCloserFiltering ? (e["SHADOWPCF" + t] = !0, this._filteringQuality === M.QUALITY_LOW ? e["SHADOWLOWQUALITY" + t] = !0 : this._filteringQuality === M.QUALITY_MEDIUM && (e["SHADOWMEDIUMQUALITY" + t] = !0)) : this.usePoissonSampling ? e["SHADOWPOISSON" + t] = !0 : this.useExponentialShadowMap || this.useBlurExponentialShadowMap ? e["SHADOWESM" + t] = !0 : (this.useCloseExponentialShadowMap || this.useBlurCloseExponentialShadowMap) && (e["SHADOWCLOSEESM" + t] = !0), s.needCube() && (e["SHADOWCUBE" + t] = !0));
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
    n && (i.needCube() || t.setMatrix("lightMatrix" + e, this.getTransformMatrix()), this._filter === M.FILTER_PCF ? (t.setDepthStencilTexture("shadowSampler" + e, this.getShadowMapForRendering()), i._uniformBuffer.updateFloat4("shadowsInfo", this.getDarkness(), n.getSize().width, 1 / n.getSize().width, this.frustumEdgeFalloff, e)) : this._filter === M.FILTER_PCSS ? (t.setDepthStencilTexture("shadowSampler" + e, this.getShadowMapForRendering()), t.setTexture("depthSampler" + e, this.getShadowMapForRendering()), i._uniformBuffer.updateFloat4("shadowsInfo", this.getDarkness(), 1 / n.getSize().width, this._contactHardeningLightSizeUVRatio * n.getSize().width, this.frustumEdgeFalloff, e)) : (t.setTexture("shadowSampler" + e, this.getShadowMapForRendering()), i._uniformBuffer.updateFloat4("shadowsInfo", this.getDarkness(), this.blurScale / n.getSize().width, this.depthScale, this.frustumEdgeFalloff, e)), i._uniformBuffer.updateFloat2("depthValues", this.getLight().getDepthMinZ(r), this.getLight().getDepthMinZ(r) + this.getLight().getDepthMaxZ(r), e));
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
    if (this._light.computeTransformedInformation() && (t = this._light.transformedPosition), S.NormalizeToRef(this._light.getShadowDirection(this._currentFaceIndex), this._lightDirection), Math.abs(S.Dot(this._lightDirection, S.Up())) === 1 && (this._lightDirection.z = 1e-13), this._light.needProjectionMatrixCompute() || !this._cachedPosition || !this._cachedDirection || !t.equals(this._cachedPosition) || !this._lightDirection.equals(this._cachedDirection)) {
      this._cachedPosition.copyFrom(t), this._cachedDirection.copyFrom(this._lightDirection), C.LookAtLHToRef(t, t.add(this._lightDirection), S.Up(), this._viewMatrix);
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
    const s = t.getLightById(e.lightId), r = e.cameraId !== void 0 ? t.getCameraById(e.cameraId) : null, n = i ? i(e.mapSize, s, r) : new M(e.mapSize, s, void 0, r), a = n.getShadowMap();
    for (let o = 0; o < e.renderList.length; o++)
      t.getMeshesById(e.renderList[o]).forEach(function(d) {
        a && (a.renderList || (a.renderList = []), a.renderList.push(d));
      });
    return e.id !== void 0 && (n.id = e.id), n.forceBackFacesOnly = !!e.forceBackFacesOnly, e.darkness !== void 0 && n.setDarkness(e.darkness), e.transparencyShadow && n.setTransparencyShadow(!0), e.frustumEdgeFalloff !== void 0 && (n.frustumEdgeFalloff = e.frustumEdgeFalloff), e.bias !== void 0 && (n.bias = e.bias), e.normalBias !== void 0 && (n.normalBias = e.normalBias), e.usePercentageCloserFiltering ? n.usePercentageCloserFiltering = !0 : e.useContactHardeningShadow ? n.useContactHardeningShadow = !0 : e.usePoissonSampling ? n.usePoissonSampling = !0 : e.useExponentialShadowMap ? n.useExponentialShadowMap = !0 : e.useBlurExponentialShadowMap ? n.useBlurExponentialShadowMap = !0 : e.useCloseExponentialShadowMap ? n.useCloseExponentialShadowMap = !0 : e.useBlurCloseExponentialShadowMap ? n.useBlurCloseExponentialShadowMap = !0 : e.useVarianceShadowMap ? n.useExponentialShadowMap = !0 : e.useBlurVarianceShadowMap && (n.useBlurExponentialShadowMap = !0), e.contactHardeningLightSizeUVRatio !== void 0 && (n.contactHardeningLightSizeUVRatio = e.contactHardeningLightSizeUVRatio), e.filteringQuality !== void 0 && (n.filteringQuality = e.filteringQuality), e.depthScale && (n.depthScale = e.depthScale), e.blurScale && (n.blurScale = e.blurScale), e.blurBoxOffset && (n.blurBoxOffset = e.blurBoxOffset), e.useKernelBlur && (n.useKernelBlur = e.useKernelBlur), e.blurKernel && (n.blurKernel = e.blurKernel), n;
  }
}
M.CLASSNAME = "ShadowGenerator";
M.FILTER_NONE = 0;
M.FILTER_EXPONENTIALSHADOWMAP = 1;
M.FILTER_POISSONSAMPLING = 2;
M.FILTER_BLUREXPONENTIALSHADOWMAP = 3;
M.FILTER_CLOSEEXPONENTIALSHADOWMAP = 4;
M.FILTER_BLURCLOSEEXPONENTIALSHADOWMAP = 5;
M.FILTER_PCF = 6;
M.FILTER_PCSS = 7;
M.QUALITY_HIGH = 0;
M.QUALITY_MEDIUM = 1;
M.QUALITY_LOW = 2;
M.DEFAULT_ALPHA_CUTOFF = 0.5;
M._SceneComponentInitialization = (c) => {
  throw ht("ShadowGeneratorSceneComponent");
};
const Zi = "depthPixelShader", Xi = `#ifdef ALPHATEST
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
w.ShadersStore[Zi] = Xi;
const Gi = "depthVertexShader", $i = `attribute vec3 position;
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
w.ShadersStore[Gi] = $i;
class $e {
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
  constructor(e, t = 1, i = null, s = !1, r = I.TRILINEAR_SAMPLINGMODE, n = !1, a) {
    this.enabled = !0, this.forceDepthWriteTransparentMeshes = !1, this.useOnlyInActiveCamera = !1, this.reverseCulling = !1, this._scene = e, this._storeNonLinearDepth = s, this._storeCameraSpaceZ = n, this.isPacked = t === 0, this.isPacked ? this.clearColor = new Pe(1, 1, 1, 1) : this.clearColor = new Pe(n ? 1e8 : 1, 0, 0, 1), $e._SceneComponentInitialization(this._scene);
    const o = e.getEngine();
    this._camera = i, r !== I.NEAREST_SAMPLINGMODE && (t === 1 && !o._caps.textureFloatLinearFiltering && (r = I.NEAREST_SAMPLINGMODE), t === 2 && !o._caps.textureHalfFloatLinearFiltering && (r = I.NEAREST_SAMPLINGMODE));
    const l = this.isPacked || !o._features.supportExtendedTextureFormats ? 5 : 6;
    this._depthMap = new J(a ?? "DepthRenderer", { width: o.getRenderWidth(), height: o.getRenderHeight() }, this._scene, !1, !0, t, !1, r, void 0, void 0, void 0, l), this._depthMap.wrapU = I.CLAMP_ADDRESSMODE, this._depthMap.wrapV = I.CLAMP_ADDRESSMODE, this._depthMap.refreshRate = 1, this._depthMap.renderParticles = !1, this._depthMap.renderList = null, this._depthMap.activeCamera = this._camera, this._depthMap.ignoreCameraViewport = !0, this._depthMap.useCameraPostProcesses = !1, this._depthMap.onClearObservable.add((h) => {
      h.clear(this.clearColor, !0, !0, !0);
    }), this._depthMap.onBeforeBindObservable.add(() => {
      var h;
      (h = o._debugPushGroup) === null || h === void 0 || h.call(o, "depth renderer", 1);
    }), this._depthMap.onAfterUnbindObservable.add(() => {
      var h;
      (h = o._debugPopGroup) === null || h === void 0 || h.call(o, 1);
    }), this._depthMap.customIsReadyFunction = (h, u, f) => {
      if ((f || u === 0) && h.subMeshes)
        for (let g = 0; g < h.subMeshes.length; ++g) {
          const p = h.subMeshes[g], _ = p.getRenderingMesh(), m = _._getInstancesRenderList(p._id, !!p.getReplacementMesh()), b = o.getCaps().instancedArrays && (m.visibleInstances[p._id] !== null && m.visibleInstances[p._id] !== void 0 || _.hasThinInstances);
          if (!this.isReady(p, b))
            return !1;
        }
      return !0;
    };
    const d = (h) => {
      var u, f;
      const g = h.getRenderingMesh(), p = h.getEffectiveMesh(), _ = this._scene, m = _.getEngine(), b = h.getMaterial();
      if (p._internalAbstractMeshDataInfo._isActiveIntermediate = !1, !b || p.infiniteDistance || b.disableDepthWrite || h.verticesCount === 0 || h._renderId === _.getRenderId())
        return;
      const A = p._getWorldMatrixDeterminant() < 0;
      let v = (u = g.overrideMaterialSideOrientation) !== null && u !== void 0 ? u : b.sideOrientation;
      A && (v = v === 0 ? 1 : 0);
      const y = v === 0;
      m.setState(b.backFaceCulling, 0, !1, y, this.reverseCulling ? !b.cullBackFaces : b.cullBackFaces);
      const K = g._getInstancesRenderList(h._id, !!h.getReplacementMesh());
      if (K.mustReturn)
        return;
      const H = m.getCaps().instancedArrays && (K.visibleInstances[h._id] !== null && K.visibleInstances[h._id] !== void 0 || g.hasThinInstances), L = this._camera || _.activeCamera;
      if (this.isReady(h, H) && L) {
        h._renderId = _.getRenderId();
        const N = (f = p._internalAbstractMeshDataInfo._materialForRenderPass) === null || f === void 0 ? void 0 : f[m.currentRenderPassId];
        let O = h._getDrawWrapper();
        !O && N && (O = N._getDrawWrapper());
        const Ye = L.mode === Q.ORTHOGRAPHIC_CAMERA;
        if (!O)
          return;
        const k = O.effect;
        m.enableEffect(O), H || g._bind(h, k, b.fillMode), N ? N.bindForSubMesh(p.getWorldMatrix(), p, h) : (k.setMatrix("viewProjection", _.getTransformMatrix()), k.setMatrix("world", p.getWorldMatrix()), this._storeCameraSpaceZ && k.setMatrix("view", _.getViewMatrix()));
        let ce, Ee;
        if (Ye ? (ce = !m.useReverseDepthBuffer && m.isNDCHalfZRange ? 0 : 1, Ee = m.useReverseDepthBuffer && m.isNDCHalfZRange ? 0 : 1) : (ce = m.useReverseDepthBuffer && m.isNDCHalfZRange ? L.minZ : m.isNDCHalfZRange ? 0 : L.minZ, Ee = m.useReverseDepthBuffer && m.isNDCHalfZRange ? 0 : L.maxZ), k.setFloat2("depthValues", ce, ce + Ee), !N) {
          if (b.needAlphaTesting()) {
            const ne = b.getAlphaTestTexture();
            ne && (k.setTexture("diffuseSampler", ne), k.setMatrix("diffuseMatrix", ne.getTextureMatrix()));
          }
          if (g.useBones && g.computeBonesUsingShaders && g.skeleton) {
            const ne = g.skeleton;
            if (ne.isUsingTextureForMatrices) {
              const Be = ne.getTransformMatrixTexture(g);
              if (!Be)
                return;
              k.setTexture("boneSampler", Be), k.setFloat("boneTextureWidth", 4 * (ne.bones.length + 1));
            } else
              k.setMatrices("mBones", ne.getTransformMatrices(g));
          }
          at(k, b, _), Z.BindMorphTargetParameters(g, k), g.morphTargetManager && g.morphTargetManager.isUsingTextureForTargets && g.morphTargetManager._bind(k);
        }
        g._processRendering(p, h, k, b.fillMode, K, H, (ne, Be) => k.setMatrix("world", Be));
      }
    };
    this._depthMap.customRenderFunction = (h, u, f, g) => {
      let p;
      if (g.length)
        for (p = 0; p < g.length; p++)
          d(g.data[p]);
      for (p = 0; p < h.length; p++)
        d(h.data[p]);
      for (p = 0; p < u.length; p++)
        d(u.data[p]);
      if (this.forceDepthWriteTransparentMeshes)
        for (p = 0; p < f.length; p++)
          d(f.data[p]);
      else
        for (p = 0; p < f.length; p++)
          f.data[p].getEffectiveMesh()._internalAbstractMeshDataInfo._isActiveIntermediate = !1;
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
    const l = [], d = [D.PositionKind];
    if (o && o.needAlphaTesting() && o.getAlphaTestTexture() && (l.push("#define ALPHATEST"), r.isVerticesDataPresent(D.UVKind) && (d.push(D.UVKind), l.push("#define UV1")), r.isVerticesDataPresent(D.UV2Kind) && (d.push(D.UV2Kind), l.push("#define UV2"))), r.useBones && r.computeBonesUsingShaders) {
      d.push(D.MatricesIndicesKind), d.push(D.MatricesWeightsKind), r.numBoneInfluencers > 4 && (d.push(D.MatricesIndicesExtraKind), d.push(D.MatricesWeightsExtraKind)), l.push("#define NUM_BONE_INFLUENCERS " + r.numBoneInfluencers), l.push("#define BonesPerMesh " + (r.skeleton ? r.skeleton.bones.length + 1 : 0));
      const _ = e.getRenderingMesh().skeleton;
      _ != null && _.isUsingTextureForMatrices && l.push("#define BONETEXTURE");
    } else
      l.push("#define NUM_BONE_INFLUENCERS 0");
    const h = r.morphTargetManager;
    let u = 0;
    h && h.numInfluencers > 0 && (u = h.numInfluencers, l.push("#define MORPHTARGETS"), l.push("#define NUM_MORPH_INFLUENCERS " + u), h.isUsingTextureForTargets && l.push("#define MORPHTARGETS_TEXTURE"), Z.PrepareAttributesForMorphTargetsInfluencers(d, r, u)), t && (l.push("#define INSTANCES"), Z.PushAttributesForInstances(d), e.getRenderingMesh().hasThinInstances && l.push("#define THIN_INSTANCES")), this._storeNonLinearDepth && l.push("#define NONLINEARDEPTH"), this._storeCameraSpaceZ && l.push("#define STORE_CAMERASPACE_Z"), this.isPacked && l.push("#define PACKED"), Rt(o, n, l);
    const f = e._getDrawWrapper(void 0, !0), g = f.defines, p = l.join(`
`);
    if (g !== p) {
      const _ = [
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
      ot(_), f.setEffect(s.createEffect("depth", d, _, ["diffuseSampler", "morphTargets", "boneSampler"], p, void 0, void 0, void 0, {
        maxSimultaneousMorphTargets: u
      }), p);
    }
    return f.effect.isReady();
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
$e._SceneComponentInitialization = (c) => {
  throw ht("DepthRendererSceneComponent");
};
const Yi = "minmaxReduxPixelShader", ji = `varying vec2 vUV;
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
w.ShadersStore[Yi] = ji;
class Ki {
  /**
   * Creates a min/max reducer
   * @param camera The camera to use for the post processes
   */
  constructor(e) {
    this.onAfterReductionPerformed = new V(), this._forceFullscreenViewport = !0, this._activated = !1, this._camera = e, this._postProcessManager = new bt(e.getScene()), this._onContextRestoredObserver = e.getEngine().onContextRestoredObservable.add(() => {
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
    const r = this._camera.getScene(), n = new P(
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
    n.onApply = ((d, h) => (u) => {
      u.setTexture("sourceTexture", this._sourceTexture), u.setFloat2("texSize", d, h);
    })(a, o), this._reductionSteps.push(n);
    let l = 1;
    for (; a > 1 || o > 1; ) {
      a = Math.max(Math.round(a / 2), 1), o = Math.max(Math.round(o / 2), 1);
      const d = new P(
        "Reduction phase " + l,
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
      if (d.autoClear = !1, d.forceFullscreenViewport = s, d.onApply = ((h, u) => (f) => {
        h == 1 || u == 1 ? f.setInt2("texSize", h, u) : f.setFloat2("texSize", h, u);
      })(a, o), this._reductionSteps.push(d), l++, a == 1 && o == 1) {
        const h = (u, f, g) => {
          const p = new Float32Array(4 * u * f), _ = { min: 0, max: 0 };
          return () => {
            r.getEngine()._readTexturePixels(g.inputTexture.texture, u, f, -1, 0, p, !1), _.min = p[0], _.max = p[1], this.onAfterReductionPerformed.notifyObservers(_);
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
class Qi extends Ki {
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
    this._depthRenderer && (delete s._depthRenderer[this._depthRendererId], this._depthRenderer.dispose(), this._depthRenderer = null), e === null && (s._depthRenderer || (s._depthRenderer = {}), e = this._depthRenderer = new $e(s, t, this._camera, !1, 1), e.enabled = !1, this._depthRendererId = "minmax" + this._camera.id, s._depthRenderer[this._depthRendererId] = e), super.setSourceTexture(e.getDepthMap(), !0, t, i);
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
const mt = S.Up(), qi = S.Zero(), F = new S(), Me = new S(), ze = new C();
class B extends M {
  _validateFilter(e) {
    return e === M.FILTER_NONE || e === M.FILTER_PCF || e === M.FILTER_PCSS ? e : (console.error('Unsupported filter "' + e + '"!'), M.FILTER_NONE);
  }
  /**
   * Gets or set the number of cascades used by the CSM.
   */
  get numCascades() {
    return this._numCascades;
  }
  set numCascades(e) {
    e = Math.min(Math.max(e, B.MIN_CASCADES_COUNT), B.MAX_CASCADES_COUNT), e !== this._numCascades && (this._numCascades = e, this.recreateShadowMap(), this._recreateSceneUBOs());
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
    return B.CLASSNAME;
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
      this._depthReducer || (this._depthReducer = new Qi(t), this._depthReducer.onAfterReductionPerformed.add((i) => {
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
    const t = e.minZ, i = e.maxZ, s = i - t, r = this._minDistance, n = this._shadowMaxZ < i && this._shadowMaxZ >= t ? Math.min((this._shadowMaxZ - t) / (i - t), this._maxDistance) : this._maxDistance, a = t + r * s, o = t + n * s, l = o - a, d = o / a;
    for (let h = 0; h < this._cascades.length; ++h) {
      const u = (h + 1) / this._numCascades, f = a * d ** u, g = a + l * u, p = this._lambda * (f - g) + g;
      this._cascades[h].prevBreakDistance = h === 0 ? r : this._cascades[h - 1].breakDistance, this._cascades[h].breakDistance = (p - t) / s, this._viewSpaceFrustumsZ[h] = p, this._frustumLengths[h] = (this._cascades[h].breakDistance - this._cascades[h].prevBreakDistance) * s;
    }
    this._breaksAreDirty = !1;
  }
  _computeMatrices() {
    const e = this._scene;
    if (!this._getCamera())
      return;
    S.NormalizeToRef(this._light.getShadowDirection(0), this._lightDirection), Math.abs(S.Dot(this._lightDirection, S.Up())) === 1 && (this._lightDirection.z = 1e-13), this._cachedDirection.copyFrom(this._lightDirection);
    const i = e.getEngine().useReverseDepthBuffer;
    for (let s = 0; s < this._numCascades; ++s) {
      this._computeFrustumInWorldSpace(s), this._computeCascadeFrustum(s), this._cascadeMaxExtents[s].subtractToRef(this._cascadeMinExtents[s], F), this._frustumCenter[s].addToRef(this._lightDirection.scale(this._cascadeMinExtents[s].z), this._shadowCameraPos[s]), C.LookAtLHToRef(this._shadowCameraPos[s], this._frustumCenter[s], mt, this._viewMatrices[s]);
      let r = 0, n = F.z;
      const a = this._shadowCastersBoundingInfo;
      a.update(this._viewMatrices[s]), n = Math.min(n, a.boundingBox.maximumWorld.z), !this._depthClamp || this.filter === M.FILTER_PCSS ? r = Math.min(r, a.boundingBox.minimumWorld.z) : r = Math.max(r, a.boundingBox.minimumWorld.z), C.OrthoOffCenterLHToRef(this._cascadeMinExtents[s].x, this._cascadeMaxExtents[s].x, this._cascadeMinExtents[s].y, this._cascadeMaxExtents[s].y, i ? n : r, i ? r : n, this._projectionMatrices[s], e.getEngine().isNDCHalfZRange), this._cascadeMinExtents[s].z = r, this._cascadeMaxExtents[s].z = n, this._viewMatrices[s].multiplyToRef(this._projectionMatrices[s], this._transformMatrices[s]), S.TransformCoordinatesToRef(qi, this._transformMatrices[s], F), F.scaleInPlace(this._mapSize / 2), Me.copyFromFloats(Math.round(F.x), Math.round(F.y), Math.round(F.z)), Me.subtractInPlace(F).scaleInPlace(2 / this._mapSize), C.TranslationToRef(Me.x, Me.y, 0, ze), this._projectionMatrices[s].multiplyToRef(ze, this._projectionMatrices[s]), this._viewMatrices[s].multiplyToRef(this._projectionMatrices[s], this._transformMatrices[s]), this._transformMatrices[s].copyToArray(this._transformMatricesAsArray, s * 16);
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
    for (let o = 0; o < B._FrustumCornersNDCSpace.length; ++o)
      F.copyFrom(B._FrustumCornersNDCSpace[(o + a) % B._FrustumCornersNDCSpace.length]), r && F.z === -1 && (F.z = 0), S.TransformCoordinatesToRef(F, n, this._frustumCornersWorldSpace[e][o]);
    for (let o = 0; o < B._FrustumCornersNDCSpace.length / 2; ++o)
      F.copyFrom(this._frustumCornersWorldSpace[e][o + 4]).subtractInPlace(this._frustumCornersWorldSpace[e][o]), Me.copyFrom(F).scaleInPlace(i), F.scaleInPlace(s), F.addInPlace(this._frustumCornersWorldSpace[e][o]), this._frustumCornersWorldSpace[e][o + 4].copyFrom(F), this._frustumCornersWorldSpace[e][o].addInPlace(Me);
  }
  _computeCascadeFrustum(e) {
    if (this._cascadeMinExtents[e].copyFromFloats(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE), this._cascadeMaxExtents[e].copyFromFloats(Number.MIN_VALUE, Number.MIN_VALUE, Number.MIN_VALUE), this._frustumCenter[e].copyFromFloats(0, 0, 0), !!this._getCamera()) {
      for (let i = 0; i < this._frustumCornersWorldSpace[e].length; ++i)
        this._frustumCenter[e].addInPlace(this._frustumCornersWorldSpace[e][i]);
      if (this._frustumCenter[e].scaleInPlace(1 / this._frustumCornersWorldSpace[e].length), this.stabilizeCascades) {
        let i = 0;
        for (let s = 0; s < this._frustumCornersWorldSpace[e].length; ++s) {
          const r = this._frustumCornersWorldSpace[e][s].subtractToRef(this._frustumCenter[e], F).length();
          i = Math.max(i, r);
        }
        i = Math.ceil(i * 16) / 16, this._cascadeMaxExtents[e].copyFromFloats(i, i, i), this._cascadeMinExtents[e].copyFromFloats(-i, -i, -i);
      } else {
        const i = this._frustumCenter[e];
        this._frustumCenter[e].addToRef(this._lightDirection, F), C.LookAtLHToRef(i, F, mt, ze);
        for (let s = 0; s < this._frustumCornersWorldSpace[e].length; ++s)
          S.TransformCoordinatesToRef(this._frustumCornersWorldSpace[e][s], ze, F), this._cascadeMinExtents[e].minimizeInPlace(F), this._cascadeMaxExtents[e].maximizeInPlace(F);
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
    const e = Mt.LastCreatedEngine;
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
    if (!B.IsSupported) {
      Ve.Error("CascadedShadowMap is not supported by the current engine.");
      return;
    }
    super(e, t, i, s), this.usePercentageCloserFiltering = !0;
  }
  _initializeGenerator() {
    var e, t, i, s, r, n, a, o, l, d, h, u, f, g, p, _, m, b, A, v;
    this.penumbraDarkness = (e = this.penumbraDarkness) !== null && e !== void 0 ? e : 1, this._numCascades = (t = this._numCascades) !== null && t !== void 0 ? t : B.DEFAULT_CASCADES_COUNT, this.stabilizeCascades = (i = this.stabilizeCascades) !== null && i !== void 0 ? i : !1, this._freezeShadowCastersBoundingInfoObservable = (s = this._freezeShadowCastersBoundingInfoObservable) !== null && s !== void 0 ? s : null, this.freezeShadowCastersBoundingInfo = (r = this.freezeShadowCastersBoundingInfo) !== null && r !== void 0 ? r : !1, this._scbiMin = (n = this._scbiMin) !== null && n !== void 0 ? n : new S(0, 0, 0), this._scbiMax = (a = this._scbiMax) !== null && a !== void 0 ? a : new S(0, 0, 0), this._shadowCastersBoundingInfo = (o = this._shadowCastersBoundingInfo) !== null && o !== void 0 ? o : new zt(new S(0, 0, 0), new S(0, 0, 0)), this._breaksAreDirty = (l = this._breaksAreDirty) !== null && l !== void 0 ? l : !0, this._minDistance = (d = this._minDistance) !== null && d !== void 0 ? d : 0, this._maxDistance = (h = this._maxDistance) !== null && h !== void 0 ? h : 1, this._currentLayer = (u = this._currentLayer) !== null && u !== void 0 ? u : 0, this._shadowMaxZ = (p = (f = this._shadowMaxZ) !== null && f !== void 0 ? f : (g = this._getCamera()) === null || g === void 0 ? void 0 : g.maxZ) !== null && p !== void 0 ? p : 1e4, this._debug = (_ = this._debug) !== null && _ !== void 0 ? _ : !1, this._depthClamp = (m = this._depthClamp) !== null && m !== void 0 ? m : !0, this._cascadeBlendPercentage = (b = this._cascadeBlendPercentage) !== null && b !== void 0 ? b : 0.1, this._lambda = (A = this._lambda) !== null && A !== void 0 ? A : 0.5, this._autoCalcDepthBounds = (v = this._autoCalcDepthBounds) !== null && v !== void 0 ? v : !1, this._recreateSceneUBOs(), super._initializeGenerator();
  }
  _createTargetRenderTexture() {
    const e = this._scene.getEngine(), t = { width: this._mapSize, height: this._mapSize, layers: this.numCascades };
    this._shadowMap = new J(
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
      }, this._viewMatrices[t] = C.Zero(), this._projectionMatrices[t] = C.Zero(), this._transformMatrices[t] = C.Zero(), this._cascadeMinExtents[t] = new S(), this._cascadeMaxExtents[t] = new S(), this._frustumCenter[t] = new S(), this._shadowCameraPos[t] = new S(), this._frustumCornersWorldSpace[t] = new Array(B._FrustumCornersNDCSpace.length);
      for (let i = 0; i < B._FrustumCornersNDCSpace.length; ++i)
        this._frustumCornersWorldSpace[t][i] = new S();
    }
    const e = this._scene.getEngine();
    this._shadowMap.onBeforeBindObservable.clear(), this._shadowMap.onBeforeRenderObservable.clear(), this._shadowMap.onBeforeRenderObservable.add((t) => {
      this._sceneUBOs && this._scene.setSceneUniformBuffer(this._sceneUBOs[t]), this._currentLayer = t, this._filter === M.FILTER_PCF && e.setColorWrite(!1), this._scene.setTransformMatrix(this.getCascadeViewMatrix(t), this.getCascadeProjectionMatrix(t)), this._useUBO && (this._scene.getSceneUniformBuffer().unbindEffect(), this._scene.finalizeSceneUbo());
    }), this._shadowMap.onBeforeBindObservable.add(() => {
      var t;
      this._currentSceneUBO = this._scene.getSceneUniformBuffer(), (t = e._debugPushGroup) === null || t === void 0 || t.call(e, `cascaded shadow map generation for pass id ${e.currentRenderPassId}`, 1), this._breaksAreDirty && this._splitFrustum(), this._computeMatrices();
    }), this._splitFrustum();
  }
  _bindCustomEffectForRenderSubMeshForShadowMap(e, t) {
    t.setMatrix("viewProjection", this.getCascadeTransformMatrix(this._currentLayer));
  }
  _isReadyCustomDefines(e) {
    e.push("#define SM_DEPTHCLAMP " + (this._depthClamp && this._filter !== M.FILTER_PCSS ? "1" : "0"));
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
    if (t.setMatrices("lightMatrix" + e, this._transformMatricesAsArray), t.setArray("viewFrustumZ" + e, this._viewSpaceFrustumsZ), t.setFloat("cascadeBlendFactor" + e, this.cascadeBlendPercentage === 0 ? 1e4 : 1 / this.cascadeBlendPercentage), t.setArray("frustumLengths" + e, this._frustumLengths), this._filter === M.FILTER_PCF)
      t.setDepthStencilTexture("shadowSampler" + e, n), i._uniformBuffer.updateFloat4("shadowsInfo", this.getDarkness(), a, 1 / a, this.frustumEdgeFalloff, e);
    else if (this._filter === M.FILTER_PCSS) {
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
    const i = M.Parse(e, t, (s, r, n) => new B(s, r, void 0, n));
    return e.numCascades !== void 0 && (i.numCascades = e.numCascades), e.debug !== void 0 && (i.debug = e.debug), e.stabilizeCascades !== void 0 && (i.stabilizeCascades = e.stabilizeCascades), e.lambda !== void 0 && (i.lambda = e.lambda), e.cascadeBlendPercentage !== void 0 && (i.cascadeBlendPercentage = e.cascadeBlendPercentage), e.depthClamp !== void 0 && (i.depthClamp = e.depthClamp), e.autoCalcDepthBounds !== void 0 && (i.autoCalcDepthBounds = e.autoCalcDepthBounds), e.shadowMaxZ !== void 0 && (i.shadowMaxZ = e.shadowMaxZ), e.penumbraDarkness !== void 0 && (i.penumbraDarkness = e.penumbraDarkness), e.freezeShadowCastersBoundingInfo !== void 0 && (i.freezeShadowCastersBoundingInfo = e.freezeShadowCastersBoundingInfo), e.minDistance !== void 0 && e.maxDistance !== void 0 && i.setMinMaxDistance(e.minDistance, e.maxDistance), i;
  }
}
B._FrustumCornersNDCSpace = [
  new S(-1, 1, -1),
  new S(1, 1, -1),
  new S(1, -1, -1),
  new S(-1, -1, -1),
  new S(-1, 1, 1),
  new S(1, 1, 1),
  new S(1, -1, 1),
  new S(-1, -1, 1)
];
B.CLASSNAME = "CascadedShadowGenerator";
B.DEFAULT_CASCADES_COUNT = 4;
B.MIN_CASCADES_COUNT = 2;
B.MAX_CASCADES_COUNT = 4;
B._SceneComponentInitialization = (c) => {
  throw ht("ShadowGeneratorSceneComponent");
};
Vt.AddParser(ke.NAME_SHADOWGENERATOR, (c, e) => {
  if (c.shadowGenerators !== void 0 && c.shadowGenerators !== null)
    for (let t = 0, i = c.shadowGenerators.length; t < i; t++) {
      const s = c.shadowGenerators[t];
      s.className === B.CLASSNAME ? B.Parse(s, e) : M.Parse(s, e);
    }
});
class Ji {
  /**
   * Creates a new instance of the component for the given scene
   * @param scene Defines the scene to register the component in
   */
  constructor(e) {
    this.name = ke.NAME_SHADOWGENERATOR, this.scene = e;
  }
  /**
   * Registers the component in a given scene
   */
  register() {
    this.scene._gatherRenderTargetsStage.registerStep(ke.STEP_GATHERRENDERTARGETS_SHADOWGENERATOR, this, this._gatherRenderTargets);
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
            const l = a.value.getShadowMap();
            t.textures.indexOf(l) !== -1 && e.push(l);
          }
        }
      }
  }
}
M._SceneComponentInitialization = (c) => {
  let e = c._getComponent(ke.NAME_SHADOWGENERATOR);
  e || (e = new Ji(c), c._addComponent(e));
};
const es = {
  enableShadows: !0
};
function St(c = es) {
  const { enableShadows: e, shadowTransparency: t, intensity: i, scene: s } = c, r = new re("DirectionalLight", new S(-0.3, -1, 0.4), s);
  r.position = new S(-50, 65, -50), r.intensity = 0.65 * i;
  const n = new Ge("HemisphericLight", new S(1, 1, 0), s);
  return n.intensity = 0.4 * i, e && (r.shadowMinZ = 1, r.shadowMaxZ = 70, r.shadowGenerator = new M(2048, r), r.shadowGenerator.useCloseExponentialShadowMap = !0, r.shadowGenerator.darkness = t), { directional: r, hemispheric: n };
}
const ts = "imageProcessingCompatibility", is = `#ifdef IMAGEPROCESSINGPOSTPROCESS
gl_FragColor.rgb=pow(gl_FragColor.rgb,vec3(2.2));
#endif
`;
w.IncludesShadersStore[ts] = is;
const ss = "shadowOnlyPixelShader", rs = `precision highp float;
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
w.ShadersStore[ss] = rs;
const ns = "shadowOnlyVertexShader", as = `precision highp float;
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
w.ShadersStore[ns] = as;
class os extends Wt {
  constructor() {
    super(), this.CLIPPLANE = !1, this.CLIPPLANE2 = !1, this.CLIPPLANE3 = !1, this.CLIPPLANE4 = !1, this.CLIPPLANE5 = !1, this.CLIPPLANE6 = !1, this.POINTSIZE = !1, this.FOG = !1, this.NORMAL = !1, this.NUM_BONE_INFLUENCERS = 0, this.BonesPerMesh = 0, this.INSTANCES = !1, this.IMAGEPROCESSINGPOSTPROCESS = !1, this.SKIPFINALCOLORCLAMP = !1, this.rebuild();
  }
}
class Ie extends kt {
  constructor(e, t) {
    super(e, t), this._needAlphaBlending = !0, this.shadowColor = we.Black();
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
    t.materialDefines || (t.materialDefines = new os());
    const r = t.materialDefines, n = this.getScene();
    if (this._isReadyForSubMesh(t))
      return !0;
    const a = n.getEngine();
    if (this._activeLight) {
      for (const l of e.lightSources)
        if (l.shadowEnabled) {
          if (this._activeLight === l)
            break;
          const d = e.lightSources.indexOf(this._activeLight);
          d !== -1 && (e.lightSources.splice(d, 1), e.lightSources.splice(0, 0, this._activeLight));
          break;
        }
    }
    Z.PrepareDefinesForFrameBoundValues(n, a, this, r, !!i), Z.PrepareDefinesForMisc(e, n, !1, this.pointsCloud, this.fogEnabled, this._shouldTurnAlphaTestOn(e), r), r._needNormals = Z.PrepareDefinesForLights(n, e, r, !1, 1);
    const o = (s = this._getFirstShadowLightForMesh(e)) === null || s === void 0 ? void 0 : s.getShadowGenerator();
    if (this._needAlphaBlending = !0, o && o.getClassName && o.getClassName() === "CascadedShadowGenerator") {
      const l = o;
      this._needAlphaBlending = !l.autoCalcDepthBounds;
    }
    if (Z.PrepareDefinesForAttributes(e, r, !1, !0), r.isDirty) {
      r.markAsProcessed(), n.resetCachedMaterial();
      const l = new Ct();
      r.FOG && l.addFallback(1, "FOG"), Z.HandleFallbacksForShadows(r, l, 1), r.NUM_BONE_INFLUENCERS > 0 && l.addCPUSkinningFallback(0, e), r.IMAGEPROCESSINGPOSTPROCESS = n.imageProcessingConfiguration.applyByPostProcess;
      const d = [D.PositionKind];
      r.NORMAL && d.push(D.NormalKind), Z.PrepareAttributesForBones(d, e, r, l), Z.PrepareAttributesForInstances(d, r);
      const h = "shadowOnly", u = r.toString(), f = ["world", "view", "viewProjection", "vEyePosition", "vLightsType", "vFogInfos", "vFogColor", "pointSize", "alpha", "shadowColor", "mBones"], g = new Array(), p = new Array();
      ot(f), Z.PrepareUniformsAndSamplersList({
        uniformsNames: f,
        uniformBuffersNames: p,
        samplers: g,
        defines: r,
        maxSimultaneousLights: 1
      }), t.setEffect(n.getEngine().createEffect(h, {
        attributes: d,
        uniformsNames: f,
        uniformBuffersNames: p,
        samplers: g,
        defines: u,
        fallbacks: l,
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
      if (this._activeEffect = n, this.bindOnlyWorldMatrix(e), this._activeEffect.setMatrix("viewProjection", s.getTransformMatrix()), Z.BindBonesParameters(t, this._activeEffect), this._mustRebind(s, n) && (at(n, this, s), this.pointsCloud && this._activeEffect.setFloat("pointSize", this.pointSize), this._activeEffect.setFloat("alpha", this.alpha), this._activeEffect.setColor3("shadowColor", this.shadowColor), s.bindEyePosition(n)), s.lightsEnabled) {
        Z.BindLights(s, t, this._activeEffect, r, 1);
        const a = this._getFirstShadowLightForMesh(t);
        a && (a._renderId = -1);
      }
      (s.fogEnabled && t.applyFog && s.fogMode !== Tt.FOGMODE_NONE || r.SHADOWCSM0) && this._activeEffect.setMatrix("view", s.getViewMatrix()), Z.BindFogParameters(s, t, this._activeEffect), this._afterBind(t, this._activeEffect);
    }
  }
  clone(e) {
    return se.Clone(() => new Ie(e, this.getScene()), this);
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
    return se.Parse(() => new Ie(e.name, t), e, t, i);
  }
}
Xe("BABYLON.ShadowOnlyMaterial", Ie);
const hs = {
  aspect: 300 / 150,
  enableDebugging: !1,
  enableShadows: !0
};
class ls {
  constructor(e) {
    he(this, "size", 9.5);
    this.config = { ...hs, ...e }, this.create();
  }
  create(e) {
    this.destroy(), Object.assign(this.config, e);
    const { aspect: t, enableDebugging: i, enableShadows: s } = this.config, r = 30;
    this.box = new Ht("diceBox");
    let n = new Ie("shadowOnly", this.config.scene);
    n.alpha = s ? 1 : 0, i && (n = new lt("diceBox_material"), n.alpha = 0.7, n.diffuseColor = new we(1, 1, 0));
    const a = be("ground", {
      width: this.size * 2,
      height: 1,
      depth: this.size * 2
    }, this.config.scene);
    if (a.scaling = new S(t, 1, 1), a.material = n, a.receiveShadows = !0, a.setParent(this.box), i) {
      const o = be("wallTop", {
        width: this.size,
        height: r,
        depth: 1
      }, this.config.scene);
      o.position.y = r / 2, o.position.z = this.size / -2, o.scaling = new S(t, 1, 1), o.material = n, o.setParent(this.box);
      const l = be("wallRight", {
        width: 1,
        height: r,
        depth: this.size
      }, this.config.scene);
      l.position.x = this.size * t / 2, l.position.y = r / 2, l.material = n, l.setParent(this.box);
      const d = be("wallBottom", {
        width: this.size,
        height: r,
        depth: 1
      }, this.config.scene);
      d.position.y = r / 2, d.position.z = this.size / 2, d.scaling = new S(t, 1, 1), d.material = n, d.setParent(this.box);
      const h = be("wallLeft", {
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
class ds {
  constructor() {
  }
}
class ue extends lt {
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
    this._isCreatedShader = !1, ue.ShaderIndexer++;
    const a = "custom_" + ue.ShaderIndexer, o = this._afterBind.bind(this);
    return this._afterBind = (l, d) => {
      if (d) {
        this.AttachAfterBind(l, d);
        try {
          o(l, d);
        } catch {
        }
      }
    }, ae.ShadersStore[a + "VertexShader"] = this.VertexShader.replace("#define CUSTOM_VERTEX_BEGIN", this.CustomParts.Vertex_Begin ? this.CustomParts.Vertex_Begin : "").replace("#define CUSTOM_VERTEX_DEFINITIONS", (this._customUniform ? this._customUniform.join(`
`) : "") + (this.CustomParts.Vertex_Definitions ? this.CustomParts.Vertex_Definitions : "")).replace("#define CUSTOM_VERTEX_MAIN_BEGIN", this.CustomParts.Vertex_MainBegin ? this.CustomParts.Vertex_MainBegin : "").replace("#define CUSTOM_VERTEX_UPDATE_POSITION", this.CustomParts.Vertex_Before_PositionUpdated ? this.CustomParts.Vertex_Before_PositionUpdated : "").replace("#define CUSTOM_VERTEX_UPDATE_NORMAL", this.CustomParts.Vertex_Before_NormalUpdated ? this.CustomParts.Vertex_Before_NormalUpdated : "").replace("#define CUSTOM_VERTEX_MAIN_END", this.CustomParts.Vertex_MainEnd ? this.CustomParts.Vertex_MainEnd : ""), this.CustomParts.Vertex_After_WorldPosComputed && (ae.ShadersStore[a + "VertexShader"] = ae.ShadersStore[a + "VertexShader"].replace("#define CUSTOM_VERTEX_UPDATE_WORLDPOS", this.CustomParts.Vertex_After_WorldPosComputed)), ae.ShadersStore[a + "PixelShader"] = this.FragmentShader.replace("#define CUSTOM_FRAGMENT_BEGIN", this.CustomParts.Fragment_Begin ? this.CustomParts.Fragment_Begin : "").replace("#define CUSTOM_FRAGMENT_MAIN_BEGIN", this.CustomParts.Fragment_MainBegin ? this.CustomParts.Fragment_MainBegin : "").replace("#define CUSTOM_FRAGMENT_DEFINITIONS", (this._customUniform ? this._customUniform.join(`
`) : "") + (this.CustomParts.Fragment_Definitions ? this.CustomParts.Fragment_Definitions : "")).replace("#define CUSTOM_FRAGMENT_UPDATE_DIFFUSE", this.CustomParts.Fragment_Custom_Diffuse ? this.CustomParts.Fragment_Custom_Diffuse : "").replace("#define CUSTOM_FRAGMENT_UPDATE_ALPHA", this.CustomParts.Fragment_Custom_Alpha ? this.CustomParts.Fragment_Custom_Alpha : "").replace("#define CUSTOM_FRAGMENT_BEFORE_LIGHTS", this.CustomParts.Fragment_Before_Lights ? this.CustomParts.Fragment_Before_Lights : "").replace("#define CUSTOM_FRAGMENT_BEFORE_FRAGCOLOR", this.CustomParts.Fragment_Before_FragColor ? this.CustomParts.Fragment_Before_FragColor : "").replace("#define CUSTOM_FRAGMENT_MAIN_END", this.CustomParts.Fragment_MainEnd ? this.CustomParts.Fragment_MainEnd : ""), this.CustomParts.Fragment_Before_Fog && (ae.ShadersStore[a + "PixelShader"] = ae.ShadersStore[a + "PixelShader"].replace("#define CUSTOM_FRAGMENT_BEFORE_FOG", this.CustomParts.Fragment_Before_Fog)), this._isCreatedShader = !0, this._createdShaderName = a, a;
  }
  constructor(e, t) {
    super(e, t), this.CustomParts = new ds(), this.customShaderNameResolve = this.Builder, this.FragmentShader = ae.ShadersStore.defaultPixelShader, this.VertexShader = ae.ShadersStore.defaultVertexShader;
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
ue.ShaderIndexer = 1;
Xe("BABYLON.CustomMaterial", ue);
ue.prototype.clone = function(c) {
  const e = this, t = se.Clone(() => new ue(c, this.getScene()), this);
  return t.name = c, t.id = c, t.CustomParts.Fragment_Begin = e.CustomParts.Fragment_Begin, t.CustomParts.Fragment_Definitions = e.CustomParts.Fragment_Definitions, t.CustomParts.Fragment_MainBegin = e.CustomParts.Fragment_MainBegin, t.CustomParts.Fragment_Custom_Diffuse = e.CustomParts.Fragment_Custom_Diffuse, t.CustomParts.Fragment_Before_Lights = e.CustomParts.Fragment_Before_Lights, t.CustomParts.Fragment_Before_Fog = e.CustomParts.Fragment_Before_Fog, t.CustomParts.Fragment_Custom_Alpha = e.CustomParts.Fragment_Custom_Alpha, t.CustomParts.Fragment_Before_FragColor = e.CustomParts.Fragment_Before_FragColor, t.CustomParts.Vertex_Begin = e.CustomParts.Vertex_Begin, t.CustomParts.Vertex_Definitions = e.CustomParts.Vertex_Definitions, t.CustomParts.Vertex_MainBegin = e.CustomParts.Vertex_MainBegin, t.CustomParts.Vertex_Before_PositionUpdated = e.CustomParts.Vertex_Before_PositionUpdated, t.CustomParts.Vertex_Before_NormalUpdated = e.CustomParts.Vertex_Before_NormalUpdated, t.CustomParts.Vertex_After_WorldPosComputed = e.CustomParts.Vertex_After_WorldPosComputed, t.CustomParts.Vertex_MainEnd = e.CustomParts.Vertex_MainEnd, t;
};
class us {
  constructor(e) {
    he(this, "loadedThemes", {});
    he(this, "themeData", {});
    this.scene = e.scene;
  }
  async loadStandardMaterial(e) {
    const { theme: t, material: i } = e, s = new lt(t, this.scene);
    i.diffuseTexture && (s.diffuseTexture = await this.getTexture("diffuse", e)), i.bumpTexture && (s.bumpTexture = await this.getTexture("bump", e)), i.specularTexture && (s.specularTexture = await this.getTexture("specular", e)), s.allowShaderHotSwapping = !1;
  }
  // this will create two materials - one with light text and one with dark text, the underlying color can be changed by color instance buffers
  async loadColorMaterial(e) {
    const { theme: t, material: i } = e, s = new ue(t + "_light", this.scene), r = Zt(e);
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
    } catch (l) {
      console.error(l);
    }
    return n;
  }
  async importTextureAsync(e, t) {
    return new Promise((i, s) => {
      let r = e.match(/^(.*\/)(.*)$/), n = new I(
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
var U, Te, ie, xe, ee, j, W, We, te, Oe, Fe, q, ye, He, At;
class ps {
  constructor(e) {
    // add a die to the scene
    $(this, He);
    he(this, "config");
    he(this, "initialized", !1);
    $(this, U, {});
    $(this, Te, 0);
    $(this, ie, 0);
    $(this, xe, []);
    $(this, ee, void 0);
    $(this, j, void 0);
    $(this, W, void 0);
    $(this, We, void 0);
    $(this, te, void 0);
    $(this, Oe, void 0);
    $(this, Fe, void 0);
    $(this, q, void 0);
    $(this, ye, {});
    he(this, "noop", () => {
    });
    he(this, "diceBufferView", new Float32Array(8e3));
    this.onInitComplete = e.onInitComplete || this.noop, this.onThemeLoaded = e.onThemeLoaded || this.noop, this.onRollResult = e.onRollResult || this.noop, this.onRollComplete = e.onRollComplete || this.noop, this.onDieRemoved = e.onDieRemoved || this.noop, this.initialized = this.initScene(e);
  }
  // initialize the babylon scene
  async initScene(e) {
    Y(this, ee, e.canvas), T(this, ee).width = e.width, T(this, ee).height = e.height, this.config = e.options, Y(this, j, Xt(T(this, ee))), Y(this, W, $t({ engine: T(this, j) })), Y(this, We, Yt({ engine: T(this, j), scene: T(this, W) })), Y(this, te, St({
      enableShadows: this.config.enableShadows,
      shadowTransparency: this.config.shadowTransparency,
      intensity: this.config.lightIntensity,
      scene: T(this, W)
    })), Y(this, Oe, new ls({
      enableShadows: this.config.enableShadows,
      aspect: T(this, ee).width / T(this, ee).height,
      lights: T(this, te),
      scene: T(this, W)
    })), Y(this, Fe, new us({ scene: T(this, W) })), this.onInitComplete();
  }
  connect(e) {
    Y(this, q, e), T(this, q).postMessage({
      action: "initBuffer",
      diceBuffer: this.diceBufferView.buffer
    }, [this.diceBufferView.buffer]), T(this, q).onmessage = (t) => {
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
    this.config = e, t.enableShadows !== this.config.enableShadows && (Object.values(T(this, te)).forEach((i) => i.dispose()), Y(this, te, St(
      {
        enableShadows: this.config.enableShadows,
        shadowTransparency: this.config.shadowTransparency,
        intensity: this.config.lightIntensity,
        scene: T(this, W)
      }
    ))), t.scale !== this.config.scale && Object.values(T(this, U)).forEach(({ mesh: i }) => {
      var s;
      if (i) {
        const { x: r = 1, y: n = 1, z: a = 1 } = (s = i == null ? void 0 : i.metadata) == null ? void 0 : s.baseScale;
        i.scaling = new S(
          this.config.scale * r,
          this.config.scale * n,
          this.config.scale * a
        );
      }
    }), t.shadowTransparency !== this.config.shadowTransparency && (T(this, te).directional.shadowGenerator.darkness = this.config.shadowTransparency), t.lightIntensity !== this.config.lightIntensity && (T(this, te).directional.intensity = 0.65 * this.config.lightIntensity, T(this, te).hemispheric.intensity = 0.4 * this.config.lightIntensity);
  }
  // all this does is start the render engine.
  render(e) {
    T(this, j).runRenderLoop(this.renderLoop.bind(this)), T(this, q).postMessage({
      action: "resumeSimulation",
      newStartPoint: e
    });
  }
  renderLoop() {
    if (T(this, ie) && T(this, ie) === Object.keys(T(this, U)).length) {
      if (T(this, j).stopRenderLoop(), T(this, q).postMessage({
        action: "stopSimulation"
      }), this.onRollComplete(), this.config.highlightResult) {
        const e = typeof this.config.highlightResult == "object" && this.config.highlightResult !== null ? this.config.highlightResult.durationMs ?? 3500 : 3500, t = () => T(this, W).render();
        T(this, j).runRenderLoop(t), setTimeout(() => T(this, j).stopRenderLoop(), e + 200);
      }
    } else
      T(this, W).render();
  }
  async loadTheme(e) {
    const { theme: t, basePath: i, material: s, meshFilePath: r, meshName: n } = e;
    if (await T(this, Fe).load({ theme: t, basePath: i, material: s }), !Object.keys(T(this, ye)).includes(n)) {
      T(this, ye)[n] = r;
      const a = await Se.loadModels({ meshFilePath: r, meshName: n }, T(this, W));
      if (!a)
        throw new Error("No colliders returned from the 3D mesh file. Low poly colliders are expected to be in the same file as the high poly dice and the mesh name contains the word 'collider'");
      T(this, q).postMessage({
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
    !Object.keys(T(this, U)).length && !T(this, ie) || (this.diceBufferView.byteLength && this.diceBufferView.fill(0), T(this, xe).forEach((e) => clearTimeout(e)), T(this, j).stopRenderLoop(), Object.values(T(this, U)).forEach((e) => {
      e.mesh && e.mesh.dispose();
    }), Y(this, U, {}), Y(this, Te, 0), Y(this, ie, 0), T(this, W).render());
  }
  add(e) {
    Se.loadDie(e, T(this, W)).then((t) => {
      T(this, xe).push(setTimeout(() => {
        ut(this, He, At).call(this, t);
      }, ge(this, Te)._++ * this.config.delay));
    });
  }
  addNonDie(e) {
    T(this, j).activeRenderLoops.length === 0 && this.render(!1);
    const { id: t, value: i, ...s } = e, r = {
      id: t,
      value: i,
      config: s
    };
    T(this, U)[t] = r, setTimeout(() => {
      T(this, xe).push(setTimeout(() => {
        this.handleAsleep(r);
      }, ge(this, Te)._++ * this.config.delay));
    }, 10);
  }
  remove(e) {
    const t = T(this, U)[e.id];
    t.hasOwnProperty("d10Instance") && (T(this, U)[t.d10Instance.id].mesh && (T(this, U)[t.d10Instance.id].mesh.dispose(), T(this, q).postMessage({
      action: "removeDie",
      id: t.d10Instance.id
    })), delete T(this, U)[t.d10Instance.id], ge(this, ie)._--), T(this, U)[e.id].mesh && T(this, U)[e.id].mesh.dispose(), delete T(this, U)[e.id], ge(this, ie)._--, T(this, W).render(), this.onDieRemoved(e.rollId);
  }
  updatesFromPhysics(e) {
    this.diceBufferView = new Float32Array(e);
    let t = 1;
    for (let i = 0, s = this.diceBufferView[0]; i < s; i++) {
      if (!Object.keys(T(this, U)).length)
        continue;
      const r = T(this, U)[`${this.diceBufferView[t]}`];
      if (!r) {
        console.log("Error: die not available in scene to animate");
        break;
      }
      if (this.diceBufferView[t + 1] === -1)
        this.handleAsleep(r);
      else {
        const n = this.diceBufferView[t + 1], a = this.diceBufferView[t + 2], o = this.diceBufferView[t + 3], l = this.diceBufferView[t + 4], d = this.diceBufferView[t + 5], h = this.diceBufferView[t + 6], u = this.diceBufferView[t + 7];
        r.mesh.position.set(n, a, o), r.mesh.rotationQuaternion.set(l, d, h, u);
      }
      t = t + 8;
    }
    requestAnimationFrame(() => {
      T(this, q).postMessage({
        action: "stepSimulation",
        diceBuffer: this.diceBufferView.buffer
      }, [this.diceBufferView.buffer]);
    });
  }
  // handle the position updates from the physics worker. It's a simple flat array of numbers for quick and easy transfer
  async handleAsleep(e) {
    var t, i;
    if (e.asleep = !0, await Se.getRollResult(e, T(this, W), this.config), e.d10Instance || e.dieParent) {
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
    ge(this, ie)._++;
  }
  resize(e) {
    const t = T(this, ee).width = e.width, i = T(this, ee).height = e.height;
    T(this, Oe).create({ aspect: t / i }), T(this, j).resize();
  }
}
U = new WeakMap(), Te = new WeakMap(), ie = new WeakMap(), xe = new WeakMap(), ee = new WeakMap(), j = new WeakMap(), W = new WeakMap(), We = new WeakMap(), te = new WeakMap(), Oe = new WeakMap(), Fe = new WeakMap(), q = new WeakMap(), ye = new WeakMap(), He = new WeakSet(), At = async function(e) {
  T(this, j).activeRenderLoops.length === 0 && this.render(e.newStartPoint);
  const t = {
    ...e,
    assetPath: this.config.assetPath,
    enableShadows: this.config.enableShadows,
    scale: this.config.scale,
    lights: T(this, te)
  }, i = new Se(t, T(this, W));
  return T(this, U)[i.id] = i, T(this, q).postMessage({
    action: "addDie",
    options: {
      sides: e.sides,
      scale: this.config.scale,
      id: i.id,
      newStartPoint: e.newStartPoint,
      theme: e.theme,
      meshName: e.meshName
    }
  }), e.sides === 100 && e.data !== "single" && (i.d10Instance = await Se.loadDie({ ...t, dieType: "d10", sides: 10, id: i.id + 1e4 }, T(this, W)).then((s) => {
    const r = new Se(s, T(this, W));
    return r.dieParent = i, r;
  }), T(this, U)[`${i.d10Instance.id}`] = i.d10Instance, T(this, q).postMessage({
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
  ps as default
};
//# sourceMappingURL=world.onscreen.js.map
