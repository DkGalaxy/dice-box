var Kt = Object.defineProperty;
var qt = (c, e, t) => e in c ? Kt(c, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : c[e] = t;
var Ee = (c, e, t) => (qt(c, typeof e != "symbol" ? e + "" : e, t), t), ut = (c, e, t) => {
  if (!e.has(c))
    throw TypeError("Cannot " + t);
};
var M = (c, e, t) => (ut(c, e, "read from private field"), t ? t.call(c) : e.get(c)), q = (c, e, t) => {
  if (e.has(c))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(c) : e.set(c, t);
}, j = (c, e, t, i) => (ut(c, e, "write to private field"), i ? i.call(c, t) : e.set(c, t), t);
var De = (c, e, t, i) => ({
  set _(s) {
    j(c, e, s, t);
  },
  get _() {
    return M(c, e, i);
  }
}), Dt = (c, e, t) => (ut(c, e, "access private method"), t);
import { E as z, O as G, a as Mt, M as He, S as nt, C as Ve, b as F, V as C, _ as p, c as ie, d as Ge, Q as Re, e as Le, T as ne, A as Lt, s as Vt, f as E, g as Jt, N as Xt, h as ei, L as $e, i as ce, j as qe, k as fe, R as ti, l as ee, m as Ne, n as Ft, o as ii, I as ri, P as si, p as Xe, G as zt, q as ze, r as Ye, t as be, u as Wt, v as tt, w as x, x as ai, y as U, z as Ct, B as _e, F as ke, H as ni, J as xt, K as kt, U as oi, W as At, X as li, Y as hi, Z as D, $ as ot, a0 as Ht, a1 as lt, a2 as fi, a3 as di, a4 as it, a5 as We, a6 as ci, a7 as rt, a8 as ge, a9 as y, aa as pt, ab as Je, ac as ui, D as Fe } from "./Dice.js";
import { d as pi } from "./dice-box.es.js";
class Rt {
  /**
   * Creates a new instance
   * @param externalProperties list of external properties to inject into the object
   */
  constructor(e) {
    if (this._keys = [], this._isDirty = !0, this._areLightsDirty = !0, this._areLightsDisposed = !1, this._areAttributesDirty = !0, this._areTexturesDirty = !0, this._areFresnelDirty = !0, this._areMiscDirty = !0, this._arePrePassDirty = !0, this._areImageProcessingDirty = !0, this._normals = !1, this._uvs = !1, this._needNormals = !1, this._needUVs = !1, this._externalProperties = e, e)
      for (const t in e)
        Object.prototype.hasOwnProperty.call(e, t) && this._setDefaultValue(t);
  }
  /**
   * Specifies if the material needs to be re-calculated
   */
  get isDirty() {
    return this._isDirty;
  }
  /**
   * Marks the material to indicate that it has been re-calculated
   */
  markAsProcessed() {
    this._isDirty = !1, this._areAttributesDirty = !1, this._areTexturesDirty = !1, this._areFresnelDirty = !1, this._areLightsDirty = !1, this._areLightsDisposed = !1, this._areMiscDirty = !1, this._arePrePassDirty = !1, this._areImageProcessingDirty = !1;
  }
  /**
   * Marks the material to indicate that it needs to be re-calculated
   */
  markAsUnprocessed() {
    this._isDirty = !0;
  }
  /**
   * Marks the material to indicate all of its defines need to be re-calculated
   */
  markAllAsDirty() {
    this._areTexturesDirty = !0, this._areAttributesDirty = !0, this._areLightsDirty = !0, this._areFresnelDirty = !0, this._areMiscDirty = !0, this._areImageProcessingDirty = !0, this._isDirty = !0;
  }
  /**
   * Marks the material to indicate that image processing needs to be re-calculated
   */
  markAsImageProcessingDirty() {
    this._areImageProcessingDirty = !0, this._isDirty = !0;
  }
  /**
   * Marks the material to indicate the lights need to be re-calculated
   * @param disposed Defines whether the light is dirty due to dispose or not
   */
  markAsLightDirty(e = !1) {
    this._areLightsDirty = !0, this._areLightsDisposed = this._areLightsDisposed || e, this._isDirty = !0;
  }
  /**
   * Marks the attribute state as changed
   */
  markAsAttributesDirty() {
    this._areAttributesDirty = !0, this._isDirty = !0;
  }
  /**
   * Marks the texture state as changed
   */
  markAsTexturesDirty() {
    this._areTexturesDirty = !0, this._isDirty = !0;
  }
  /**
   * Marks the fresnel state as changed
   */
  markAsFresnelDirty() {
    this._areFresnelDirty = !0, this._isDirty = !0;
  }
  /**
   * Marks the misc state as changed
   */
  markAsMiscDirty() {
    this._areMiscDirty = !0, this._isDirty = !0;
  }
  /**
   * Marks the prepass state as changed
   */
  markAsPrePassDirty() {
    this._arePrePassDirty = !0, this._isDirty = !0;
  }
  /**
   * Rebuilds the material defines
   */
  rebuild() {
    this._keys.length = 0;
    for (const e of Object.keys(this))
      e[0] !== "_" && this._keys.push(e);
    if (this._externalProperties)
      for (const e in this._externalProperties)
        this._keys.indexOf(e) === -1 && this._keys.push(e);
  }
  /**
   * Specifies if two material defines are equal
   * @param other - A material define instance to compare to
   * @returns - Boolean indicating if the material defines are equal (true) or not (false)
   */
  isEqual(e) {
    if (this._keys.length !== e._keys.length)
      return !1;
    for (let t = 0; t < this._keys.length; t++) {
      const i = this._keys[t];
      if (this[i] !== e[i])
        return !1;
    }
    return !0;
  }
  /**
   * Clones this instance's defines to another instance
   * @param other - material defines to clone values to
   */
  cloneTo(e) {
    this._keys.length !== e._keys.length && (e._keys = this._keys.slice(0));
    for (let t = 0; t < this._keys.length; t++) {
      const i = this._keys[t];
      e[i] = this[i];
    }
  }
  /**
   * Resets the material define values
   */
  reset() {
    this._keys.forEach((e) => this._setDefaultValue(e));
  }
  _setDefaultValue(e) {
    var t, i, s, r, a;
    const n = (s = (i = (t = this._externalProperties) === null || t === void 0 ? void 0 : t[e]) === null || i === void 0 ? void 0 : i.type) !== null && s !== void 0 ? s : typeof this[e], o = (a = (r = this._externalProperties) === null || r === void 0 ? void 0 : r[e]) === null || a === void 0 ? void 0 : a.default;
    switch (n) {
      case "number":
        this[e] = o ?? 0;
        break;
      case "string":
        this[e] = o ?? "";
        break;
      default:
        this[e] = o ?? !1;
        break;
    }
  }
  /**
   * Converts the material define values to a string
   * @returns - String of material define information
   */
  toString() {
    let e = "";
    for (let t = 0; t < this._keys.length; t++) {
      const i = this._keys[t], s = this[i];
      switch (typeof s) {
        case "number":
        case "string":
          e += "#define " + i + " " + s + `
`;
          break;
        default:
          s && (e += "#define " + i + `
`);
          break;
      }
    }
    return e;
  }
}
function mi(c) {
  return new z(c, !0, {
    preserveDrawingBuffer: !0,
    stencil: !0
  });
}
class Se {
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
class mt extends Se {
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
      const a = r.getSize();
      Math.max(a.width, a.height) > this.maximumSize && (r.scale(this.step), i = !1);
    }
    return i;
  }
}
class wt extends Se {
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
class _t extends Se {
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
class gt extends Se {
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
class vt extends Se {
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
class _i extends Se {
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
class St extends Se {
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
class Ot extends Se {
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
class Ae extends Se {
  constructor() {
    super(...arguments), this._canBeMerged = (e) => {
      if (!(e instanceof He))
        return !1;
      const t = e;
      return !(t.isDisposed() || !t.isVisible || !t.isEnabled() || t.instances.length > 0 || t.skeleton || t.hasLODLevels || t.getTotalVertices() === 0);
    };
  }
  /**
   * Gets or sets a boolean which defines if optimization octree has to be updated
   */
  static get UpdateSelectionTree() {
    return Ae._UpdateSelectionTree;
  }
  /**
   * Gets or sets a boolean which defines if optimization octree has to be updated
   */
  static set UpdateSelectionTree(e) {
    Ae._UpdateSelectionTree = e;
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
    for (let n = 0; n < r; n++) {
      const o = new Array(), l = s[n];
      if (this._canBeMerged(l)) {
        o.push(l);
        for (let f = n + 1; f < r; f++) {
          const h = s[f];
          this._canBeMerged(h) && h.material === l.material && h.checkCollisions === l.checkCollisions && (o.push(h), r--, s.splice(f, 1), f--);
        }
        o.length < 2 || He.MergeMeshes(o, void 0, !0);
      }
    }
    const a = e;
    return a.createOrUpdateSelectionOctree && (i != null ? i && a.createOrUpdateSelectionOctree() : Ae.UpdateSelectionTree && a.createOrUpdateSelectionOctree()), !0;
  }
}
Ae._UpdateSelectionTree = !1;
class Ie {
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
    const s = new _i(i);
    return s.onApply = e, s.onGetDescription = t, this.optimizations.push(s), this;
  }
  /**
   * Creates a list of pre-defined optimizations aimed to reduce the visual impact on the scene
   * @param targetFrameRate defines the target frame rate (60 by default)
   * @returns a SceneOptimizerOptions object
   */
  static LowDegradationAllowed(e) {
    const t = new Ie(e);
    let i = 0;
    return t.addOptimization(new Ae(i)), t.addOptimization(new _t(i)), t.addOptimization(new vt(i)), i++, t.addOptimization(new gt(i)), t.addOptimization(new St(i)), i++, t.addOptimization(new mt(i, 1024)), t;
  }
  /**
   * Creates a list of pre-defined optimizations aimed to have a moderate impact on the scene visual
   * @param targetFrameRate defines the target frame rate (60 by default)
   * @returns a SceneOptimizerOptions object
   */
  static ModerateDegradationAllowed(e) {
    const t = new Ie(e);
    let i = 0;
    return t.addOptimization(new Ae(i)), t.addOptimization(new _t(i)), t.addOptimization(new vt(i)), i++, t.addOptimization(new gt(i)), t.addOptimization(new St(i)), i++, t.addOptimization(new mt(i, 512)), i++, t.addOptimization(new Ot(i)), i++, t.addOptimization(new wt(i, 2)), t;
  }
  /**
   * Creates a list of pre-defined optimizations aimed to have a big impact on the scene visual
   * @param targetFrameRate defines the target frame rate (60 by default)
   * @returns a SceneOptimizerOptions object
   */
  static HighDegradationAllowed(e) {
    const t = new Ie(e);
    let i = 0;
    return t.addOptimization(new Ae(i)), t.addOptimization(new _t(i)), t.addOptimization(new vt(i)), i++, t.addOptimization(new gt(i)), t.addOptimization(new St(i)), i++, t.addOptimization(new mt(i, 256)), i++, t.addOptimization(new Ot(i)), i++, t.addOptimization(new wt(i, 4)), t;
  }
}
class It {
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
    if (this._isRunning = !1, this._currentPriorityLevel = 0, this._targetFrameRate = 60, this._trackerDuration = 2e3, this._currentFrameRate = 0, this._improvementMode = !1, this.onSuccessObservable = new G(), this.onNewOptimizationAppliedObservable = new G(), this.onFailureObservable = new G(), t ? this._options = t : this._options = new Ie(), this._options.targetFrameRate && (this._targetFrameRate = this._options.targetFrameRate), this._options.trackerDuration && (this._trackerDuration = this._options.trackerDuration), i) {
      let r = 0;
      for (const a of this._options.optimizations)
        a.priority = r++;
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
      const a = t.optimizations[r];
      a.priority === this._currentPriorityLevel && (s = !1, i = i && a.apply(e, this), this.onNewOptimizationAppliedObservable.notifyObservers(a));
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
    const r = new It(e, t || Ie.ModerateDegradationAllowed(), !1);
    return i && r.onSuccessObservable.add(() => {
      i();
    }), s && r.onFailureObservable.add(() => {
      s();
    }), r.start(), r;
  }
}
function gi(c) {
  const { engine: e } = c, t = new nt(e);
  t.clearColor = new Ve(0, 0, 0, 0), t.pointerMovePredicate = () => !1, t.pointerDownPredicate = () => !1, t.pointerUpPredicate = () => !1, t.clearCachedVertexData(), t.themeData = {};
  const i = Ie.LowDegradationAllowed();
  return i.optimizations = i.optimizations.splice(1), i.targetFrameRate = 60, It.OptimizeAsync(t, i), t;
}
class Z extends ie {
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
    super(e, t, i, s), this._tmpUpVector = C.Zero(), this._tmpTargetVector = C.Zero(), this.cameraDirection = new C(0, 0, 0), this.cameraRotation = new Ge(0, 0), this.ignoreParentScaling = !1, this.updateUpVectorFromRotation = !1, this._tmpQuaternion = new Re(), this.rotation = new C(0, 0, 0), this.speed = 2, this.noRotationConstraint = !1, this.invertRotation = !1, this.inverseRotationSpeed = 0.2, this.lockedTarget = null, this._currentTarget = C.Zero(), this._initialFocalDistance = 1, this._viewMatrix = F.Zero(), this._camMatrix = F.Zero(), this._cameraTransformMatrix = F.Zero(), this._cameraRotationMatrix = F.Zero(), this._referencePoint = new C(0, 0, 1), this._transformedReferencePoint = C.Zero(), this._defaultUp = C.Up(), this._cachedRotationZ = 0, this._cachedQuaternionRotationZ = 0;
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
    super._initCache(), this._cache.lockedTarget = new C(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE), this._cache.rotation = new C(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE), this._cache.rotationQuaternion = new Re(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);
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
    this.upVector.normalize(), this._initialFocalDistance = e.subtract(this.position).length(), this.position.z === e.z && (this.position.z += Le), this._referencePoint.normalize().scaleInPlace(this._initialFocalDistance), F.LookAtLHToRef(this.position, e, this._defaultUp, this._camMatrix), this._camMatrix.invert(), this.rotation.x = Math.atan(this._camMatrix.m[6] / this._camMatrix.m[10]);
    const t = e.subtract(this.position);
    t.x >= 0 ? this.rotation.y = -Math.atan(t.z / t.x) + Math.PI / 2 : this.rotation.y = -Math.atan(t.z / t.x) - Math.PI / 2, this.rotation.z = 0, isNaN(this.rotation.x) && (this.rotation.x = 0), isNaN(this.rotation.y) && (this.rotation.y = 0), isNaN(this.rotation.z) && (this.rotation.z = 0), this.rotationQuaternion && Re.RotationYawPitchRollToRef(this.rotation.y, this.rotation.x, this.rotation.z, this.rotationQuaternion);
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
      this.parent.getWorldMatrix().invertToRef(ne.Matrix[0]), C.TransformNormalToRef(this.cameraDirection, ne.Matrix[0], ne.Vector3[0]), this.position.addInPlace(ne.Vector3[0]);
      return;
    }
    this.position.addInPlace(this.cameraDirection);
  }
  /** @internal */
  _checkInputs() {
    const e = this.invertRotation ? -this.inverseRotationSpeed : 1, t = this._decideIfNeedsToMove(), i = Math.abs(this.cameraRotation.x) > 0 || Math.abs(this.cameraRotation.y) > 0;
    t && this._updatePosition(), i && (this.rotationQuaternion && this.rotationQuaternion.toEulerAnglesToRef(this.rotation), this.rotation.x += this.cameraRotation.x * e, this.rotation.y += this.cameraRotation.y * e, this.noRotationConstraint || (this.rotation.x > 1.570796 && (this.rotation.x = 1.570796), this.rotation.x < -1.570796 && (this.rotation.x = -1.570796)), this.rotationQuaternion && this.rotation.lengthSquared() && Re.RotationYawPitchRollToRef(this.rotation.y, this.rotation.x, this.rotation.z, this.rotationQuaternion)), t && (Math.abs(this.cameraDirection.x) < this.speed * Le && (this.cameraDirection.x = 0), Math.abs(this.cameraDirection.y) < this.speed * Le && (this.cameraDirection.y = 0), Math.abs(this.cameraDirection.z) < this.speed * Le && (this.cameraDirection.z = 0), this.cameraDirection.scaleInPlace(this.inertia)), i && (Math.abs(this.cameraRotation.x) < this.speed * Le && (this.cameraRotation.x = 0), Math.abs(this.cameraRotation.y) < this.speed * Le && (this.cameraRotation.y = 0), this.cameraRotation.scaleInPlace(this.inertia)), super._checkInputs();
  }
  _updateCameraRotationMatrix() {
    this.rotationQuaternion ? this.rotationQuaternion.toRotationMatrix(this._cameraRotationMatrix) : F.RotationYawPitchRollToRef(this.rotation.y, this.rotation.x, this.rotation.z, this._cameraRotationMatrix);
  }
  /**
   * Update the up vector to apply the rotation of the camera (So if you changed the camera rotation.z this will let you update the up vector as well)
   * @returns the current camera
   */
  _rotateUpVectorWithCameraRotationMatrix() {
    return C.TransformNormalToRef(this._defaultUp, this._cameraRotationMatrix, this.upVector), this;
  }
  /** @internal */
  _getViewMatrix() {
    return this.lockedTarget && this.setTarget(this._getLockedTargetPosition()), this._updateCameraRotationMatrix(), this.rotationQuaternion && this._cachedQuaternionRotationZ != this.rotationQuaternion.z ? (this._rotateUpVectorWithCameraRotationMatrix(), this._cachedQuaternionRotationZ = this.rotationQuaternion.z) : this._cachedRotationZ !== this.rotation.z && (this._rotateUpVectorWithCameraRotationMatrix(), this._cachedRotationZ = this.rotation.z), C.TransformCoordinatesToRef(this._referencePoint, this._cameraRotationMatrix, this._transformedReferencePoint), this.position.addToRef(this._transformedReferencePoint, this._currentTarget), this.updateUpVectorFromRotation && (this.rotationQuaternion ? Lt.Y.rotateByQuaternionToRef(this.rotationQuaternion, this.upVector) : (Re.FromEulerVectorToRef(this.rotation, this._tmpQuaternion), Lt.Y.rotateByQuaternionToRef(this._tmpQuaternion, this.upVector))), this._computeViewMatrix(this.position, this._currentTarget, this.upVector), this._viewMatrix;
  }
  _computeViewMatrix(e, t, i) {
    if (this.ignoreParentScaling) {
      if (this.parent) {
        const s = this.parent.getWorldMatrix();
        C.TransformCoordinatesToRef(e, s, this._globalPosition), C.TransformCoordinatesToRef(t, s, this._tmpTargetVector), C.TransformNormalToRef(i, s, this._tmpUpVector), this._markSyncedWithParent();
      } else
        this._globalPosition.copyFrom(e), this._tmpTargetVector.copyFrom(t), this._tmpUpVector.copyFrom(i);
      this.getScene().useRightHandedSystem ? F.LookAtRHToRef(this._globalPosition, this._tmpTargetVector, this._tmpUpVector, this._viewMatrix) : F.LookAtLHToRef(this._globalPosition, this._tmpTargetVector, this._tmpUpVector, this._viewMatrix);
      return;
    }
    if (this.getScene().useRightHandedSystem ? F.LookAtRHToRef(e, t, i, this._viewMatrix) : F.LookAtLHToRef(e, t, i, this._viewMatrix), this.parent) {
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
    if (this.cameraRigMode !== ie.RIG_MODE_NONE) {
      const i = new Z(e, this.position.clone(), this.getScene());
      return i.isRigCamera = !0, i.rigParent = this, (this.cameraRigMode === ie.RIG_MODE_VR || this.cameraRigMode === ie.RIG_MODE_WEBVR) && (this.rotationQuaternion || (this.rotationQuaternion = new Re()), i._cameraRigParams = {}, i.rotationQuaternion = new Re()), i.mode = this.mode, i.orthoLeft = this.orthoLeft, i.orthoRight = this.orthoRight, i.orthoTop = this.orthoTop, i.orthoBottom = this.orthoBottom, i;
    }
    return null;
  }
  /**
   * @internal
   */
  _updateRigCameras() {
    const e = this._rigCameras[0], t = this._rigCameras[1];
    switch (this.computeWorldMatrix(), this.cameraRigMode) {
      case ie.RIG_MODE_STEREOSCOPIC_ANAGLYPH:
      case ie.RIG_MODE_STEREOSCOPIC_SIDEBYSIDE_PARALLEL:
      case ie.RIG_MODE_STEREOSCOPIC_SIDEBYSIDE_CROSSEYED:
      case ie.RIG_MODE_STEREOSCOPIC_OVERUNDER:
      case ie.RIG_MODE_STEREOSCOPIC_INTERLACED: {
        const i = this.cameraRigMode === ie.RIG_MODE_STEREOSCOPIC_SIDEBYSIDE_CROSSEYED ? 1 : -1, s = this.cameraRigMode === ie.RIG_MODE_STEREOSCOPIC_SIDEBYSIDE_CROSSEYED ? -1 : 1;
        this._getRigCamPositionAndTarget(this._cameraRigParams.stereoHalfAngle * i, e), this._getRigCamPositionAndTarget(this._cameraRigParams.stereoHalfAngle * s, t);
        break;
      }
      case ie.RIG_MODE_VR:
        e.rotationQuaternion ? (e.rotationQuaternion.copyFrom(this.rotationQuaternion), t.rotationQuaternion.copyFrom(this.rotationQuaternion)) : (e.rotation.copyFrom(this.rotation), t.rotation.copyFrom(this.rotation)), e.position.copyFrom(this.position), t.position.copyFrom(this.position);
        break;
    }
    super._updateRigCameras();
  }
  _getRigCamPositionAndTarget(e, t) {
    this.getTarget().subtractToRef(this.position, Z._TargetFocalPoint), Z._TargetFocalPoint.normalize().scaleInPlace(this._initialFocalDistance);
    const s = Z._TargetFocalPoint.addInPlace(this.position);
    F.TranslationToRef(-s.x, -s.y, -s.z, Z._TargetTransformMatrix), Z._TargetTransformMatrix.multiplyToRef(F.RotationAxis(t.upVector, e), Z._RigCamTransformMatrix), F.TranslationToRef(s.x, s.y, s.z, Z._TargetTransformMatrix), Z._RigCamTransformMatrix.multiplyToRef(Z._TargetTransformMatrix, Z._RigCamTransformMatrix), C.TransformCoordinatesToRef(this.position, Z._RigCamTransformMatrix, t.position), t.setTarget(s);
  }
  /**
   * Gets the current object class name.
   * @returns the class name
   */
  getClassName() {
    return "TargetCamera";
  }
}
Z._RigCamTransformMatrix = new F();
Z._TargetTransformMatrix = new F();
Z._TargetFocalPoint = new C();
p([
  Vt()
], Z.prototype, "rotation", void 0);
p([
  E()
], Z.prototype, "speed", void 0);
p([
  Jt("lockedTargetId")
], Z.prototype, "lockedTarget", void 0);
function vi(c) {
  const { scene: e } = c;
  let t;
  const i = 36.5;
  return t = new Z("TargetCamera1", new C(0, i, 0), e), t.fov = 0.25, t.minZ = 5, t.maxZ = i + 1, t.setTarget(C.Zero()), t;
}
Xt.AddNodeConstructor("Light_Type_1", (c, e) => () => new pe(c, C.Zero(), e));
class pe extends ei {
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
    return $e.LIGHTTYPEID_DIRECTIONALLIGHT;
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
    t && F.OrthoLHToRef(this.shadowFrustumSize, this.shadowFrustumSize, this.shadowMinZ !== void 0 ? this.shadowMinZ : t.minZ, this.shadowMaxZ !== void 0 ? this.shadowMaxZ : t.maxZ, e, this.getScene().getEngine().isNDCHalfZRange);
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
      const f = C.Zero();
      this._orthoLeft = Number.MAX_VALUE, this._orthoRight = Number.MIN_VALUE, this._orthoTop = Number.MIN_VALUE, this._orthoBottom = Number.MAX_VALUE;
      let h = Number.MAX_VALUE, d = Number.MIN_VALUE;
      for (let u = 0; u < i.length; u++) {
        const S = i[u];
        if (!S)
          continue;
        const m = S.getBoundingInfo().boundingBox;
        for (let T = 0; T < m.vectorsWorld.length; T++)
          C.TransformCoordinatesToRef(m.vectorsWorld[T], t, f), f.x < this._orthoLeft && (this._orthoLeft = f.x), f.y < this._orthoBottom && (this._orthoBottom = f.y), f.x > this._orthoRight && (this._orthoRight = f.x), f.y > this._orthoTop && (this._orthoTop = f.y), this.autoCalcShadowZBounds && (f.z < h && (h = f.z), f.z > d && (d = f.z));
      }
      this.autoCalcShadowZBounds && (this._shadowMinZ = h, this._shadowMaxZ = d);
    }
    const r = this._orthoRight - this._orthoLeft, a = this._orthoTop - this._orthoBottom, n = this.shadowMinZ !== void 0 ? this.shadowMinZ : s.minZ, o = this.shadowMaxZ !== void 0 ? this.shadowMaxZ : s.maxZ, l = this.getScene().getEngine().useReverseDepthBuffer;
    F.OrthoOffCenterLHToRef(this._orthoLeft - r * this.shadowOrthoScale, this._orthoRight + r * this.shadowOrthoScale, this._orthoBottom - a * this.shadowOrthoScale, this._orthoTop + a * this.shadowOrthoScale, l ? o : n, l ? n : o, e, this.getScene().getEngine().isNDCHalfZRange);
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
p([
  E()
], pe.prototype, "shadowFrustumSize", null);
p([
  E()
], pe.prototype, "shadowOrthoScale", null);
p([
  E()
], pe.prototype, "autoUpdateExtends", void 0);
p([
  E()
], pe.prototype, "autoCalcShadowZBounds", void 0);
p([
  E("orthoLeft")
], pe.prototype, "_orthoLeft", void 0);
p([
  E("orthoRight")
], pe.prototype, "_orthoRight", void 0);
p([
  E("orthoTop")
], pe.prototype, "_orthoTop", void 0);
p([
  E("orthoBottom")
], pe.prototype, "_orthoBottom", void 0);
Xt.AddNodeConstructor("Light_Type_3", (c, e) => () => new ht(c, C.Zero(), e));
class ht extends $e {
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
    super(e, i), this.groundColor = new ce(0, 0, 0), this.direction = t || C.Up();
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
    return this.direction = C.Normalize(e.subtract(C.Zero())), this.direction;
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
    const i = C.Normalize(this.direction);
    return this._uniformBuffer.updateFloat4("vLightData", i.x, i.y, i.z, 0, t), this._uniformBuffer.updateColor3("vLightGround", this.groundColor.scale(this.intensity), t), this;
  }
  transferToNodeMaterialEffect(e, t) {
    const i = C.Normalize(this.direction);
    return e.setFloat3(t, i.x, i.y, i.z), this;
  }
  /**
   * Computes the world matrix of the node
   * @returns the world matrix
   */
  computeWorldMatrix() {
    return this._worldMatrix || (this._worldMatrix = F.Identity()), this._worldMatrix;
  }
  /**
   * Returns the integer 3.
   * @returns The light Type id as a constant defines in Light.LIGHTTYPEID_x
   */
  getTypeID() {
    return $e.LIGHTTYPEID_HEMISPHERICLIGHT;
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
p([
  qe()
], ht.prototype, "groundColor", void 0);
p([
  Vt()
], ht.prototype, "direction", void 0);
class ve {
  /**
   * Creates a Size object from the given width and height (floats).
   * @param width width of the new size
   * @param height height of the new size
   */
  constructor(e, t) {
    this.width = e, this.height = t;
  }
  /**
   * Returns a string with the Size width and height
   * @returns a string with the Size width and height
   */
  toString() {
    return `{W: ${this.width}, H: ${this.height}}`;
  }
  /**
   * "Size"
   * @returns the string "Size"
   */
  getClassName() {
    return "Size";
  }
  /**
   * Returns the Size hash code.
   * @returns a hash code for a unique width and height
   */
  getHashCode() {
    let e = this.width | 0;
    return e = e * 397 ^ (this.height | 0), e;
  }
  /**
   * Updates the current size from the given one.
   * @param src the given size
   */
  copyFrom(e) {
    this.width = e.width, this.height = e.height;
  }
  /**
   * Updates in place the current Size from the given floats.
   * @param width width of the new size
   * @param height height of the new size
   * @returns the updated Size.
   */
  copyFromFloats(e, t) {
    return this.width = e, this.height = t, this;
  }
  /**
   * Updates in place the current Size from the given floats.
   * @param width width to set
   * @param height height to set
   * @returns the updated Size.
   */
  set(e, t) {
    return this.copyFromFloats(e, t);
  }
  /**
   * Multiplies the width and height by numbers
   * @param w factor to multiple the width by
   * @param h factor to multiple the height by
   * @returns a new Size set with the multiplication result of the current Size and the given floats.
   */
  multiplyByFloats(e, t) {
    return new ve(this.width * e, this.height * t);
  }
  /**
   * Clones the size
   * @returns a new Size copied from the given one.
   */
  clone() {
    return new ve(this.width, this.height);
  }
  /**
   * True if the current Size and the given one width and height are strictly equal.
   * @param other the other size to compare against
   * @returns True if the current Size and the given one width and height are strictly equal.
   */
  equals(e) {
    return e ? this.width === e.width && this.height === e.height : !1;
  }
  /**
   * The surface of the Size : width * height (float).
   */
  get surface() {
    return this.width * this.height;
  }
  /**
   * Create a new size of zero
   * @returns a new Size set to (0.0, 0.0)
   */
  static Zero() {
    return new ve(0, 0);
  }
  /**
   * Sums the width and height of two sizes
   * @param otherSize size to add to this size
   * @returns a new Size set as the addition result of the current Size and the given one.
   */
  add(e) {
    return new ve(this.width + e.width, this.height + e.height);
  }
  /**
   * Subtracts the width and height of two
   * @param otherSize size to subtract to this size
   * @returns a new Size set as the subtraction result of  the given one from the current Size.
   */
  subtract(e) {
    return new ve(this.width - e.width, this.height - e.height);
  }
  /**
   * Creates a new Size set at the linear interpolation "amount" between "start" and "end"
   * @param start starting size to lerp between
   * @param end end size to lerp between
   * @param amount amount to lerp between the start and end values
   * @returns a new Size set at the linear interpolation "amount" between "start" and "end"
   */
  static Lerp(e, t, i) {
    const s = e.width + (t.width - e.width) * i, r = e.height + (t.height - e.height) * i;
    return new ve(s, r);
  }
}
class bt {
  /**
   * | Value | Type               | Description |
   * | ----- | ------------------ | ----------- |
   * | 0     | CLAMP_ADDRESSMODE  |             |
   * | 1     | WRAP_ADDRESSMODE   |             |
   * | 2     | MIRROR_ADDRESSMODE |             |
   */
  get wrapU() {
    return this._wrapU;
  }
  set wrapU(e) {
    this._wrapU = e;
  }
  /**
   * | Value | Type               | Description |
   * | ----- | ------------------ | ----------- |
   * | 0     | CLAMP_ADDRESSMODE  |             |
   * | 1     | WRAP_ADDRESSMODE   |             |
   * | 2     | MIRROR_ADDRESSMODE |             |
   */
  get wrapV() {
    return this._wrapV;
  }
  set wrapV(e) {
    this._wrapV = e;
  }
  /**
   * How a texture is mapped.
   * Unused in thin texture mode.
   */
  get coordinatesMode() {
    return 0;
  }
  /**
   * Define if the texture is a cube texture or if false a 2d texture.
   */
  get isCube() {
    return this._texture ? this._texture.isCube : !1;
  }
  set isCube(e) {
    this._texture && (this._texture.isCube = e);
  }
  /**
   * Define if the texture is a 3d texture (webgl 2) or if false a 2d texture.
   */
  get is3D() {
    return this._texture ? this._texture.is3D : !1;
  }
  set is3D(e) {
    this._texture && (this._texture.is3D = e);
  }
  /**
   * Define if the texture is a 2d array texture (webgl 2) or if false a 2d texture.
   */
  get is2DArray() {
    return this._texture ? this._texture.is2DArray : !1;
  }
  set is2DArray(e) {
    this._texture && (this._texture.is2DArray = e);
  }
  /**
   * Get the class name of the texture.
   * @returns "ThinTexture"
   */
  getClassName() {
    return "ThinTexture";
  }
  static _IsRenderTargetWrapper(e) {
    return (e == null ? void 0 : e._shareDepth) !== void 0;
  }
  /**
   * Instantiates a new ThinTexture.
   * Base class of all the textures in babylon.
   * This can be used as an internal texture wrapper in ThinEngine to benefit from the cache
   * @param internalTexture Define the internalTexture to wrap. You can also pass a RenderTargetWrapper, in which case the texture will be the render target's texture
   */
  constructor(e) {
    this._wrapU = 1, this._wrapV = 1, this.wrapR = 1, this.anisotropicFilteringLevel = 4, this.delayLoadState = 0, this._texture = null, this._engine = null, this._cachedSize = ve.Zero(), this._cachedBaseSize = ve.Zero(), this._initialSamplingMode = 2, this._texture = bt._IsRenderTargetWrapper(e) ? e.texture : e, this._texture && (this._engine = this._texture.getEngine());
  }
  /**
   * Get if the texture is ready to be used (downloaded, converted, mip mapped...).
   * @returns true if fully ready
   */
  isReady() {
    return this.delayLoadState === 4 ? (this.delayLoad(), !1) : this._texture ? this._texture.isReady : !1;
  }
  /**
   * Triggers the load sequence in delayed load mode.
   */
  delayLoad() {
  }
  /**
   * Get the underlying lower level texture from Babylon.
   * @returns the internal texture
   */
  getInternalTexture() {
    return this._texture;
  }
  /**
   * Get the size of the texture.
   * @returns the texture size.
   */
  getSize() {
    if (this._texture) {
      if (this._texture.width)
        return this._cachedSize.width = this._texture.width, this._cachedSize.height = this._texture.height, this._cachedSize;
      if (this._texture._size)
        return this._cachedSize.width = this._texture._size, this._cachedSize.height = this._texture._size, this._cachedSize;
    }
    return this._cachedSize;
  }
  /**
   * Get the base size of the texture.
   * It can be different from the size if the texture has been resized for POT for instance
   * @returns the base size
   */
  getBaseSize() {
    return !this.isReady() || !this._texture ? (this._cachedBaseSize.width = 0, this._cachedBaseSize.height = 0, this._cachedBaseSize) : this._texture._size ? (this._cachedBaseSize.width = this._texture._size, this._cachedBaseSize.height = this._texture._size, this._cachedBaseSize) : (this._cachedBaseSize.width = this._texture.baseWidth, this._cachedBaseSize.height = this._texture.baseHeight, this._cachedBaseSize);
  }
  /**
   * Get the current sampling mode associated with the texture.
   */
  get samplingMode() {
    return this._texture ? this._texture.samplingMode : this._initialSamplingMode;
  }
  /**
   * Update the sampling mode of the texture.
   * Default is Trilinear mode.
   *
   * | Value | Type               | Description |
   * | ----- | ------------------ | ----------- |
   * | 1     | NEAREST_SAMPLINGMODE or NEAREST_NEAREST_MIPLINEAR  | Nearest is: mag = nearest, min = nearest, mip = linear |
   * | 2     | BILINEAR_SAMPLINGMODE or LINEAR_LINEAR_MIPNEAREST | Bilinear is: mag = linear, min = linear, mip = nearest |
   * | 3     | TRILINEAR_SAMPLINGMODE or LINEAR_LINEAR_MIPLINEAR | Trilinear is: mag = linear, min = linear, mip = linear |
   * | 4     | NEAREST_NEAREST_MIPNEAREST |             |
   * | 5    | NEAREST_LINEAR_MIPNEAREST |             |
   * | 6    | NEAREST_LINEAR_MIPLINEAR |             |
   * | 7    | NEAREST_LINEAR |             |
   * | 8    | NEAREST_NEAREST |             |
   * | 9   | LINEAR_NEAREST_MIPNEAREST |             |
   * | 10   | LINEAR_NEAREST_MIPLINEAR |             |
   * | 11   | LINEAR_LINEAR |             |
   * | 12   | LINEAR_NEAREST |             |
   *
   *    > _mag_: magnification filter (close to the viewer)
   *    > _min_: minification filter (far from the viewer)
   *    > _mip_: filter used between mip map levels
   *@param samplingMode Define the new sampling mode of the texture
   */
  updateSamplingMode(e) {
    this._texture && this._engine && this._engine.updateTextureSamplingMode(e, this._texture);
  }
  /**
   * Release and destroy the underlying lower level texture aka internalTexture.
   */
  releaseInternalTexture() {
    this._texture && (this._texture.dispose(), this._texture = null);
  }
  /**
   * Dispose the texture and release its associated resources.
   */
  dispose() {
    this._texture && (this.releaseInternalTexture(), this._engine = null);
  }
}
class X extends bt {
  /**
   * Define if the texture is having a usable alpha value (can be use for transparency or glossiness for instance).
   */
  set hasAlpha(e) {
    this._hasAlpha !== e && (this._hasAlpha = e, this._scene && this._scene.markAllMaterialsAsDirty(1, (t) => t.hasTexture(this)));
  }
  get hasAlpha() {
    return this._hasAlpha;
  }
  /**
   * Defines if the alpha value should be determined via the rgb values.
   * If true the luminance of the pixel might be used to find the corresponding alpha value.
   */
  set getAlphaFromRGB(e) {
    this._getAlphaFromRGB !== e && (this._getAlphaFromRGB = e, this._scene && this._scene.markAllMaterialsAsDirty(1, (t) => t.hasTexture(this)));
  }
  get getAlphaFromRGB() {
    return this._getAlphaFromRGB;
  }
  /**
   * Define the UV channel to use starting from 0 and defaulting to 0.
   * This is part of the texture as textures usually maps to one uv set.
   */
  set coordinatesIndex(e) {
    this._coordinatesIndex !== e && (this._coordinatesIndex = e, this._scene && this._scene.markAllMaterialsAsDirty(1, (t) => t.hasTexture(this)));
  }
  get coordinatesIndex() {
    return this._coordinatesIndex;
  }
  /**
   * How a texture is mapped.
   *
   * | Value | Type                                | Description |
   * | ----- | ----------------------------------- | ----------- |
   * | 0     | EXPLICIT_MODE                       |             |
   * | 1     | SPHERICAL_MODE                      |             |
   * | 2     | PLANAR_MODE                         |             |
   * | 3     | CUBIC_MODE                          |             |
   * | 4     | PROJECTION_MODE                     |             |
   * | 5     | SKYBOX_MODE                         |             |
   * | 6     | INVCUBIC_MODE                       |             |
   * | 7     | EQUIRECTANGULAR_MODE                |             |
   * | 8     | FIXED_EQUIRECTANGULAR_MODE          |             |
   * | 9     | FIXED_EQUIRECTANGULAR_MIRRORED_MODE |             |
   */
  set coordinatesMode(e) {
    this._coordinatesMode !== e && (this._coordinatesMode = e, this._scene && this._scene.markAllMaterialsAsDirty(1, (t) => t.hasTexture(this)));
  }
  get coordinatesMode() {
    return this._coordinatesMode;
  }
  /**
   * | Value | Type               | Description |
   * | ----- | ------------------ | ----------- |
   * | 0     | CLAMP_ADDRESSMODE  |             |
   * | 1     | WRAP_ADDRESSMODE   |             |
   * | 2     | MIRROR_ADDRESSMODE |             |
   */
  get wrapU() {
    return this._wrapU;
  }
  set wrapU(e) {
    this._wrapU = e;
  }
  /**
   * | Value | Type               | Description |
   * | ----- | ------------------ | ----------- |
   * | 0     | CLAMP_ADDRESSMODE  |             |
   * | 1     | WRAP_ADDRESSMODE   |             |
   * | 2     | MIRROR_ADDRESSMODE |             |
   */
  get wrapV() {
    return this._wrapV;
  }
  set wrapV(e) {
    this._wrapV = e;
  }
  /**
   * Define if the texture is a cube texture or if false a 2d texture.
   */
  get isCube() {
    return this._texture ? this._texture.isCube : this._isCube;
  }
  set isCube(e) {
    this._texture ? this._texture.isCube = e : this._isCube = e;
  }
  /**
   * Define if the texture is a 3d texture (webgl 2) or if false a 2d texture.
   */
  get is3D() {
    return this._texture ? this._texture.is3D : !1;
  }
  set is3D(e) {
    this._texture && (this._texture.is3D = e);
  }
  /**
   * Define if the texture is a 2d array texture (webgl 2) or if false a 2d texture.
   */
  get is2DArray() {
    return this._texture ? this._texture.is2DArray : !1;
  }
  set is2DArray(e) {
    this._texture && (this._texture.is2DArray = e);
  }
  /**
   * Define if the texture contains data in gamma space (most of the png/jpg aside bump).
   * HDR texture are usually stored in linear space.
   * This only impacts the PBR and Background materials
   */
  get gammaSpace() {
    if (this._texture)
      this._texture._gammaSpace === null && (this._texture._gammaSpace = this._gammaSpace);
    else
      return this._gammaSpace;
    return this._texture._gammaSpace && !this._texture._useSRGBBuffer;
  }
  set gammaSpace(e) {
    if (this._texture) {
      if (this._texture._gammaSpace === e)
        return;
      this._texture._gammaSpace = e;
    } else {
      if (this._gammaSpace === e)
        return;
      this._gammaSpace = e;
    }
    this._markAllSubMeshesAsTexturesDirty();
  }
  /**
   * Gets or sets whether or not the texture contains RGBD data.
   */
  get isRGBD() {
    return this._texture != null && this._texture._isRGBD;
  }
  set isRGBD(e) {
    this._texture && (this._texture._isRGBD = e);
  }
  /**
   * Are mip maps generated for this texture or not.
   */
  get noMipmap() {
    return !1;
  }
  /**
   * With prefiltered texture, defined the offset used during the prefiltering steps.
   */
  get lodGenerationOffset() {
    return this._texture ? this._texture._lodGenerationOffset : 0;
  }
  set lodGenerationOffset(e) {
    this._texture && (this._texture._lodGenerationOffset = e);
  }
  /**
   * With prefiltered texture, defined the scale used during the prefiltering steps.
   */
  get lodGenerationScale() {
    return this._texture ? this._texture._lodGenerationScale : 0;
  }
  set lodGenerationScale(e) {
    this._texture && (this._texture._lodGenerationScale = e);
  }
  /**
   * With prefiltered texture, defined if the specular generation is based on a linear ramp.
   * By default we are using a log2 of the linear roughness helping to keep a better resolution for
   * average roughness values.
   */
  get linearSpecularLOD() {
    return this._texture ? this._texture._linearSpecularLOD : !1;
  }
  set linearSpecularLOD(e) {
    this._texture && (this._texture._linearSpecularLOD = e);
  }
  /**
   * In case a better definition than spherical harmonics is required for the diffuse part of the environment.
   * You can set the irradiance texture to rely on a texture instead of the spherical approach.
   * This texture need to have the same characteristics than its parent (Cube vs 2d, coordinates mode, Gamma/Linear, RGBD).
   */
  get irradianceTexture() {
    return this._texture ? this._texture._irradianceTexture : null;
  }
  set irradianceTexture(e) {
    this._texture && (this._texture._irradianceTexture = e);
  }
  /**
   * Define the unique id of the texture in the scene.
   */
  get uid() {
    return this._uid || (this._uid = ti()), this._uid;
  }
  /**
   * Return a string representation of the texture.
   * @returns the texture as a string
   */
  toString() {
    return this.name;
  }
  /**
   * Get the class name of the texture.
   * @returns "BaseTexture"
   */
  getClassName() {
    return "BaseTexture";
  }
  /**
   * Callback triggered when the texture has been disposed.
   * Kept for back compatibility, you can use the onDisposeObservable instead.
   */
  set onDispose(e) {
    this._onDisposeObserver && this.onDisposeObservable.remove(this._onDisposeObserver), this._onDisposeObserver = this.onDisposeObservable.add(e);
  }
  /**
   * Define if the texture is preventing a material to render or not.
   * If not and the texture is not ready, the engine will use a default black texture instead.
   */
  get isBlocking() {
    return !0;
  }
  /**
   * Was there any loading error?
   */
  get loadingError() {
    return this._loadingError;
  }
  /**
   * If a loading error occurred this object will be populated with information about the error.
   */
  get errorObject() {
    return this._errorObject;
  }
  /**
   * Instantiates a new BaseTexture.
   * Base class of all the textures in babylon.
   * It groups all the common properties the materials, post process, lights... might need
   * in order to make a correct use of the texture.
   * @param sceneOrEngine Define the scene or engine the texture belongs to
   * @param internalTexture Define the internal texture associated with the texture
   */
  constructor(e, t = null) {
    super(null), this.metadata = null, this.reservedDataStore = null, this._hasAlpha = !1, this._getAlphaFromRGB = !1, this.level = 1, this._coordinatesIndex = 0, this.optimizeUVAllocation = !0, this._coordinatesMode = 0, this.wrapR = 1, this.anisotropicFilteringLevel = X.DEFAULT_ANISOTROPIC_FILTERING_LEVEL, this._isCube = !1, this._gammaSpace = !0, this.invertZ = !1, this.lodLevelInAlpha = !1, this.isRenderTarget = !1, this._prefiltered = !1, this._forceSerialize = !1, this.animations = new Array(), this.onDisposeObservable = new G(), this._onDisposeObserver = null, this._scene = null, this._uid = null, this._parentContainer = null, this._loadingError = !1, e ? X._IsScene(e) ? this._scene = e : this._engine = e : this._scene = Mt.LastCreatedScene, this._scene && (this.uniqueId = this._scene.getUniqueId(), this._scene.addTexture(this), this._engine = this._scene.getEngine()), this._texture = t, this._uid = null;
  }
  /**
   * Get the scene the texture belongs to.
   * @returns the scene or null if undefined
   */
  getScene() {
    return this._scene;
  }
  /** @internal */
  _getEngine() {
    return this._engine;
  }
  /**
   * Checks if the texture has the same transform matrix than another texture
   * @param texture texture to check against
   * @returns true if the transforms are the same, else false
   */
  checkTransformsAreIdentical(e) {
    return e !== null;
  }
  /**
   * Get the texture transform matrix used to offset tile the texture for instance.
   * @returns the transformation matrix
   */
  getTextureMatrix() {
    return F.IdentityReadOnly;
  }
  /**
   * Get the texture reflection matrix used to rotate/transform the reflection.
   * @returns the reflection matrix
   */
  getReflectionTextureMatrix() {
    return F.IdentityReadOnly;
  }
  /**
   * Get if the texture is ready to be consumed (either it is ready or it is not blocking)
   * @returns true if ready, not blocking or if there was an error loading the texture
   */
  isReadyOrNotBlocking() {
    return !this.isBlocking || this.isReady() || this.loadingError;
  }
  /**
   * Scales the texture if is `canRescale()`
   * @param ratio the resize factor we want to use to rescale
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  scale(e) {
  }
  /**
   * Get if the texture can rescale.
   */
  get canRescale() {
    return !1;
  }
  /**
   * @internal
   */
  _getFromCache(e, t, i, s, r, a) {
    const n = this._getEngine();
    if (!n)
      return null;
    const o = n._getUseSRGBBuffer(!!r, t), l = n.getLoadedTexturesCache();
    for (let f = 0; f < l.length; f++) {
      const h = l[f];
      if ((r === void 0 || o === h._useSRGBBuffer) && (s === void 0 || s === h.invertY) && h.url === e && h.generateMipMaps === !t && (!i || i === h.samplingMode) && (a === void 0 || a === h.isCube))
        return h.incrementReferences(), h;
    }
    return null;
  }
  /** @internal */
  _rebuild() {
  }
  /**
   * Clones the texture.
   * @returns the cloned texture
   */
  clone() {
    return null;
  }
  /**
   * Get the texture underlying type (INT, FLOAT...)
   */
  get textureType() {
    return this._texture && this._texture.type !== void 0 ? this._texture.type : 0;
  }
  /**
   * Get the texture underlying format (RGB, RGBA...)
   */
  get textureFormat() {
    return this._texture && this._texture.format !== void 0 ? this._texture.format : 5;
  }
  /**
   * Indicates that textures need to be re-calculated for all materials
   */
  _markAllSubMeshesAsTexturesDirty() {
    const e = this.getScene();
    e && e.markAllMaterialsAsDirty(1);
  }
  /**
   * Reads the pixels stored in the webgl texture and returns them as an ArrayBuffer.
   * This will returns an RGBA array buffer containing either in values (0-255) or
   * float values (0-1) depending of the underlying buffer type.
   * @param faceIndex defines the face of the texture to read (in case of cube texture)
   * @param level defines the LOD level of the texture to read (in case of Mip Maps)
   * @param buffer defines a user defined buffer to fill with data (can be null)
   * @param flushRenderer true to flush the renderer from the pending commands before reading the pixels
   * @param noDataConversion false to convert the data to Uint8Array (if texture type is UNSIGNED_BYTE) or to Float32Array (if texture type is anything but UNSIGNED_BYTE). If true, the type of the generated buffer (if buffer==null) will depend on the type of the texture
   * @param x defines the region x coordinates to start reading from (default to 0)
   * @param y defines the region y coordinates to start reading from (default to 0)
   * @param width defines the region width to read from (default to the texture size at level)
   * @param height defines the region width to read from (default to the texture size at level)
   * @returns The Array buffer promise containing the pixels data.
   */
  readPixels(e = 0, t = 0, i = null, s = !0, r = !1, a = 0, n = 0, o = Number.MAX_VALUE, l = Number.MAX_VALUE) {
    if (!this._texture)
      return null;
    const f = this._getEngine();
    if (!f)
      return null;
    const h = this.getSize();
    let d = h.width, u = h.height;
    t !== 0 && (d = d / Math.pow(2, t), u = u / Math.pow(2, t), d = Math.round(d), u = Math.round(u)), o = Math.min(d, o), l = Math.min(u, l);
    try {
      return this._texture.isCube ? f._readTexturePixels(this._texture, o, l, e, t, i, s, r, a, n) : f._readTexturePixels(this._texture, o, l, -1, t, i, s, r, a, n);
    } catch {
      return null;
    }
  }
  /**
   * @internal
   */
  _readPixelsSync(e = 0, t = 0, i = null, s = !0, r = !1) {
    if (!this._texture)
      return null;
    const a = this.getSize();
    let n = a.width, o = a.height;
    const l = this._getEngine();
    if (!l)
      return null;
    t != 0 && (n = n / Math.pow(2, t), o = o / Math.pow(2, t), n = Math.round(n), o = Math.round(o));
    try {
      return this._texture.isCube ? l._readTexturePixelsSync(this._texture, n, o, e, t, i, s, r) : l._readTexturePixelsSync(this._texture, n, o, -1, t, i, s, r);
    } catch {
      return null;
    }
  }
  /** @internal */
  get _lodTextureHigh() {
    return this._texture ? this._texture._lodTextureHigh : null;
  }
  /** @internal */
  get _lodTextureMid() {
    return this._texture ? this._texture._lodTextureMid : null;
  }
  /** @internal */
  get _lodTextureLow() {
    return this._texture ? this._texture._lodTextureLow : null;
  }
  /**
   * Dispose the texture and release its associated resources.
   */
  dispose() {
    if (this._scene) {
      this._scene.stopAnimation && this._scene.stopAnimation(this), this._scene.removePendingData(this);
      const e = this._scene.textures.indexOf(this);
      if (e >= 0 && this._scene.textures.splice(e, 1), this._scene.onTextureRemovedObservable.notifyObservers(this), this._scene = null, this._parentContainer) {
        const t = this._parentContainer.textures.indexOf(this);
        t > -1 && this._parentContainer.textures.splice(t, 1), this._parentContainer = null;
      }
    }
    this.onDisposeObservable.notifyObservers(this), this.onDisposeObservable.clear(), this.metadata = null, super.dispose();
  }
  /**
   * Serialize the texture into a JSON representation that can be parsed later on.
   * @param allowEmptyName True to force serialization even if name is empty. Default: false
   * @returns the JSON representation of the texture
   */
  serialize(e = !1) {
    if (!this.name && !e)
      return null;
    const t = ee.Serialize(this);
    return ee.AppendSerializedAnimations(this, t), t;
  }
  /**
   * Helper function to be called back once a list of texture contains only ready textures.
   * @param textures Define the list of textures to wait for
   * @param callback Define the callback triggered once the entire list will be ready
   */
  static WhenAllReady(e, t) {
    let i = e.length;
    if (i === 0) {
      t();
      return;
    }
    for (let s = 0; s < e.length; s++) {
      const r = e[s];
      if (r.isReady())
        --i === 0 && t();
      else {
        const a = r.onLoadObservable;
        a ? a.addOnce(() => {
          --i === 0 && t();
        }) : --i === 0 && t();
      }
    }
  }
  static _IsScene(e) {
    return e.getClassName() === "Scene";
  }
}
X.DEFAULT_ANISOTROPIC_FILTERING_LEVEL = 4;
p([
  E()
], X.prototype, "uniqueId", void 0);
p([
  E()
], X.prototype, "name", void 0);
p([
  E()
], X.prototype, "metadata", void 0);
p([
  E("hasAlpha")
], X.prototype, "_hasAlpha", void 0);
p([
  E("getAlphaFromRGB")
], X.prototype, "_getAlphaFromRGB", void 0);
p([
  E()
], X.prototype, "level", void 0);
p([
  E("coordinatesIndex")
], X.prototype, "_coordinatesIndex", void 0);
p([
  E()
], X.prototype, "optimizeUVAllocation", void 0);
p([
  E("coordinatesMode")
], X.prototype, "_coordinatesMode", void 0);
p([
  E()
], X.prototype, "wrapU", null);
p([
  E()
], X.prototype, "wrapV", null);
p([
  E()
], X.prototype, "wrapR", void 0);
p([
  E()
], X.prototype, "anisotropicFilteringLevel", void 0);
p([
  E()
], X.prototype, "isCube", null);
p([
  E()
], X.prototype, "is3D", null);
p([
  E()
], X.prototype, "is2DArray", null);
p([
  E()
], X.prototype, "gammaSpace", null);
p([
  E()
], X.prototype, "invertZ", void 0);
p([
  E()
], X.prototype, "lodLevelInAlpha", void 0);
p([
  E()
], X.prototype, "lodGenerationOffset", null);
p([
  E()
], X.prototype, "lodGenerationScale", null);
p([
  E()
], X.prototype, "linearSpecularLOD", null);
p([
  fe()
], X.prototype, "irradianceTexture", null);
p([
  E()
], X.prototype, "isRenderTarget", void 0);
function Gt(c, e, t = !1) {
  const i = e.width, s = e.height;
  if (c instanceof Float32Array) {
    let l = c.byteLength / c.BYTES_PER_ELEMENT;
    const f = new Uint8Array(l);
    for (; --l >= 0; ) {
      let h = c[l];
      h < 0 ? h = 0 : h > 1 && (h = 1), f[l] = h * 255;
    }
    c = f;
  }
  const r = document.createElement("canvas");
  r.width = i, r.height = s;
  const a = r.getContext("2d");
  if (!a)
    return null;
  const n = a.createImageData(i, s);
  if (n.data.set(c), a.putImageData(n, 0, 0), t) {
    const l = document.createElement("canvas");
    l.width = i, l.height = s;
    const f = l.getContext("2d");
    return f ? (f.translate(0, s), f.scale(1, -1), f.drawImage(r, 0, 0), l.toDataURL("image/png")) : null;
  }
  return r.toDataURL("image/png");
}
function Si(c, e = 0, t = 0) {
  const i = c.getInternalTexture();
  if (!i)
    return null;
  const s = c._readPixelsSync(e, t);
  return s ? Gt(s, c.getSize(), i.invertY) : null;
}
async function Ei(c, e = 0, t = 0) {
  const i = c.getInternalTexture();
  if (!i)
    return null;
  const s = await c.readPixels(e, t);
  return s ? Gt(s, c.getSize(), i.invertY) : null;
}
class v extends X {
  /**
   * Are mip maps generated for this texture or not.
   */
  get noMipmap() {
    return this._noMipmap;
  }
  /** Returns the texture mime type if it was defined by a loader (undefined else) */
  get mimeType() {
    return this._mimeType;
  }
  /**
   * Is the texture preventing material to render while loading.
   * If false, a default texture will be used instead of the loading one during the preparation step.
   */
  set isBlocking(e) {
    this._isBlocking = e;
  }
  get isBlocking() {
    return this._isBlocking;
  }
  /**
   * Gets a boolean indicating if the texture needs to be inverted on the y axis during loading
   */
  get invertY() {
    return this._invertY;
  }
  /**
   * Instantiates a new texture.
   * This represents a texture in babylon. It can be easily loaded from a network, base64 or html input.
   * @see https://doc.babylonjs.com/features/featuresDeepDive/materials/using/materials_introduction#texture
   * @param url defines the url of the picture to load as a texture
   * @param sceneOrEngine defines the scene or engine the texture will belong to
   * @param noMipmapOrOptions defines if the texture will require mip maps or not or set of all options to create the texture
   * @param invertY defines if the texture needs to be inverted on the y axis during loading
   * @param samplingMode defines the sampling mode we want for the texture while fetching from it (Texture.NEAREST_SAMPLINGMODE...)
   * @param onLoad defines a callback triggered when the texture has been loaded
   * @param onError defines a callback triggered when an error occurred during the loading session
   * @param buffer defines the buffer to load the texture from in case the texture is loaded from a buffer representation
   * @param deleteBuffer defines if the buffer we are loading the texture from should be deleted after load
   * @param format defines the format of the texture we are trying to load (Engine.TEXTUREFORMAT_RGBA...)
   * @param mimeType defines an optional mime type information
   * @param loaderOptions options to be passed to the loader
   * @param creationFlags specific flags to use when creating the texture (1 for storage textures, for eg)
   * @param forcedExtension defines the extension to use to pick the right loader
   */
  constructor(e, t, i, s, r = v.TRILINEAR_SAMPLINGMODE, a = null, n = null, o = null, l = !1, f, h, d, u, S) {
    var _, m, T, I, b, P, V, W, R;
    super(t), this.url = null, this.uOffset = 0, this.vOffset = 0, this.uScale = 1, this.vScale = 1, this.uAng = 0, this.vAng = 0, this.wAng = 0, this.uRotationCenter = 0.5, this.vRotationCenter = 0.5, this.wRotationCenter = 0.5, this.homogeneousRotationInUVTransform = !1, this.inspectableCustomProperties = null, this._noMipmap = !1, this._invertY = !1, this._rowGenerationMatrix = null, this._cachedTextureMatrix = null, this._projectionModeMatrix = null, this._t0 = null, this._t1 = null, this._t2 = null, this._cachedUOffset = -1, this._cachedVOffset = -1, this._cachedUScale = 0, this._cachedVScale = 0, this._cachedUAng = -1, this._cachedVAng = -1, this._cachedWAng = -1, this._cachedReflectionProjectionMatrixId = -1, this._cachedURotationCenter = -1, this._cachedVRotationCenter = -1, this._cachedWRotationCenter = -1, this._cachedHomogeneousRotationInUVTransform = !1, this._cachedReflectionTextureMatrix = null, this._cachedReflectionUOffset = -1, this._cachedReflectionVOffset = -1, this._cachedReflectionUScale = 0, this._cachedReflectionVScale = 0, this._cachedReflectionCoordinatesMode = -1, this._buffer = null, this._deleteBuffer = !1, this._format = null, this._delayedOnLoad = null, this._delayedOnError = null, this.onLoadObservable = new G(), this._isBlocking = !0, this.name = e || "", this.url = e;
    let w, N = !1, O = null;
    typeof i == "object" && i !== null ? (w = (_ = i.noMipmap) !== null && _ !== void 0 ? _ : !1, s = (m = i.invertY) !== null && m !== void 0 ? m : !Ne.UseOpenGLOrientationForUV, r = (T = i.samplingMode) !== null && T !== void 0 ? T : v.TRILINEAR_SAMPLINGMODE, a = (I = i.onLoad) !== null && I !== void 0 ? I : null, n = (b = i.onError) !== null && b !== void 0 ? b : null, o = (P = i.buffer) !== null && P !== void 0 ? P : null, l = (V = i.deleteBuffer) !== null && V !== void 0 ? V : !1, f = i.format, h = i.mimeType, d = i.loaderOptions, u = i.creationFlags, N = (W = i.useSRGBBuffer) !== null && W !== void 0 ? W : !1, O = (R = i.internalTexture) !== null && R !== void 0 ? R : null) : w = !!i, this._noMipmap = w, this._invertY = s === void 0 ? !Ne.UseOpenGLOrientationForUV : s, this._initialSamplingMode = r, this._buffer = o, this._deleteBuffer = l, this._mimeType = h, this._loaderOptions = d, this._creationFlags = u, this._useSRGBBuffer = N, this._forcedExtension = S, f && (this._format = f);
    const me = this.getScene(), k = this._getEngine();
    if (!k)
      return;
    k.onBeforeTextureInitObservable.notifyObservers(this);
    const te = () => {
      this._texture && (this._texture._invertVScale && (this.vScale *= -1, this.vOffset += 1), this._texture._cachedWrapU !== null && (this.wrapU = this._texture._cachedWrapU, this._texture._cachedWrapU = null), this._texture._cachedWrapV !== null && (this.wrapV = this._texture._cachedWrapV, this._texture._cachedWrapV = null), this._texture._cachedWrapR !== null && (this.wrapR = this._texture._cachedWrapR, this._texture._cachedWrapR = null)), this.onLoadObservable.hasObservers() && this.onLoadObservable.notifyObservers(this), a && a(), !this.isBlocking && me && me.resetCachedMaterial();
    }, oe = (K, de) => {
      this._loadingError = !0, this._errorObject = { message: K, exception: de }, n && n(K, de), v.OnTextureLoadErrorObservable.notifyObservers(this);
    };
    if (!this.url && !O) {
      this._delayedOnLoad = te, this._delayedOnError = oe;
      return;
    }
    if (this._texture = O ?? this._getFromCache(this.url, w, r, this._invertY, N), this._texture)
      if (this._texture.isReady)
        Ft.SetImmediate(() => te());
      else {
        const K = this._texture.onLoadedObservable.add(te);
        this._texture.onErrorObservable.add((de) => {
          var ct;
          oe(de.message, de.exception), (ct = this._texture) === null || ct === void 0 || ct.onLoadedObservable.remove(K);
        });
      }
    else if (!me || !me.useDelayedTextureLoading) {
      try {
        this._texture = k.createTexture(this.url, w, this._invertY, me, r, te, oe, this._buffer, void 0, this._format, this._forcedExtension, h, d, u, N);
      } catch (K) {
        throw oe("error loading", K), K;
      }
      l && (this._buffer = null);
    } else
      this.delayLoadState = 4, this._delayedOnLoad = te, this._delayedOnError = oe;
  }
  /**
   * Update the url (and optional buffer) of this texture if url was null during construction.
   * @param url the url of the texture
   * @param buffer the buffer of the texture (defaults to null)
   * @param onLoad callback called when the texture is loaded  (defaults to null)
   * @param forcedExtension defines the extension to use to pick the right loader
   */
  updateURL(e, t = null, i, s) {
    this.url && (this.releaseInternalTexture(), this.getScene().markAllMaterialsAsDirty(1)), (!this.name || this.name.startsWith("data:")) && (this.name = e), this.url = e, this._buffer = t, this._forcedExtension = s, this.delayLoadState = 4, i && (this._delayedOnLoad = i), this.delayLoad();
  }
  /**
   * Finish the loading sequence of a texture flagged as delayed load.
   * @internal
   */
  delayLoad() {
    if (this.delayLoadState !== 4)
      return;
    const e = this.getScene();
    e && (this.delayLoadState = 1, this._texture = this._getFromCache(this.url, this._noMipmap, this.samplingMode, this._invertY, this._useSRGBBuffer), this._texture ? this._delayedOnLoad && (this._texture.isReady ? Ft.SetImmediate(this._delayedOnLoad) : this._texture.onLoadedObservable.add(this._delayedOnLoad)) : (this._texture = e.getEngine().createTexture(this.url, this._noMipmap, this._invertY, e, this.samplingMode, this._delayedOnLoad, this._delayedOnError, this._buffer, null, this._format, this._forcedExtension, this._mimeType, this._loaderOptions, this._creationFlags, this._useSRGBBuffer), this._deleteBuffer && (this._buffer = null)), this._delayedOnLoad = null, this._delayedOnError = null);
  }
  _prepareRowForTextureGeneration(e, t, i, s) {
    e *= this._cachedUScale, t *= this._cachedVScale, e -= this.uRotationCenter * this._cachedUScale, t -= this.vRotationCenter * this._cachedVScale, i -= this.wRotationCenter, C.TransformCoordinatesFromFloatsToRef(e, t, i, this._rowGenerationMatrix, s), s.x += this.uRotationCenter * this._cachedUScale + this._cachedUOffset, s.y += this.vRotationCenter * this._cachedVScale + this._cachedVOffset, s.z += this.wRotationCenter;
  }
  /**
   * Checks if the texture has the same transform matrix than another texture
   * @param texture texture to check against
   * @returns true if the transforms are the same, else false
   */
  checkTransformsAreIdentical(e) {
    return e !== null && this.uOffset === e.uOffset && this.vOffset === e.vOffset && this.uScale === e.uScale && this.vScale === e.vScale && this.uAng === e.uAng && this.vAng === e.vAng && this.wAng === e.wAng;
  }
  /**
   * Get the current texture matrix which includes the requested offsetting, tiling and rotation components.
   * @param uBase
   * @returns the transform matrix of the texture.
   */
  getTextureMatrix(e = 1) {
    if (this.uOffset === this._cachedUOffset && this.vOffset === this._cachedVOffset && this.uScale * e === this._cachedUScale && this.vScale === this._cachedVScale && this.uAng === this._cachedUAng && this.vAng === this._cachedVAng && this.wAng === this._cachedWAng && this.uRotationCenter === this._cachedURotationCenter && this.vRotationCenter === this._cachedVRotationCenter && this.wRotationCenter === this._cachedWRotationCenter && this.homogeneousRotationInUVTransform === this._cachedHomogeneousRotationInUVTransform)
      return this._cachedTextureMatrix;
    this._cachedUOffset = this.uOffset, this._cachedVOffset = this.vOffset, this._cachedUScale = this.uScale * e, this._cachedVScale = this.vScale, this._cachedUAng = this.uAng, this._cachedVAng = this.vAng, this._cachedWAng = this.wAng, this._cachedURotationCenter = this.uRotationCenter, this._cachedVRotationCenter = this.vRotationCenter, this._cachedWRotationCenter = this.wRotationCenter, this._cachedHomogeneousRotationInUVTransform = this.homogeneousRotationInUVTransform, (!this._cachedTextureMatrix || !this._rowGenerationMatrix) && (this._cachedTextureMatrix = F.Zero(), this._rowGenerationMatrix = new F(), this._t0 = C.Zero(), this._t1 = C.Zero(), this._t2 = C.Zero()), F.RotationYawPitchRollToRef(this.vAng, this.uAng, this.wAng, this._rowGenerationMatrix), this.homogeneousRotationInUVTransform ? (F.TranslationToRef(-this._cachedURotationCenter, -this._cachedVRotationCenter, -this._cachedWRotationCenter, ne.Matrix[0]), F.TranslationToRef(this._cachedURotationCenter, this._cachedVRotationCenter, this._cachedWRotationCenter, ne.Matrix[1]), F.ScalingToRef(this._cachedUScale, this._cachedVScale, 0, ne.Matrix[2]), F.TranslationToRef(this._cachedUOffset, this._cachedVOffset, 0, ne.Matrix[3]), ne.Matrix[0].multiplyToRef(this._rowGenerationMatrix, this._cachedTextureMatrix), this._cachedTextureMatrix.multiplyToRef(ne.Matrix[1], this._cachedTextureMatrix), this._cachedTextureMatrix.multiplyToRef(ne.Matrix[2], this._cachedTextureMatrix), this._cachedTextureMatrix.multiplyToRef(ne.Matrix[3], this._cachedTextureMatrix), this._cachedTextureMatrix.setRowFromFloats(2, this._cachedTextureMatrix.m[12], this._cachedTextureMatrix.m[13], this._cachedTextureMatrix.m[14], 1)) : (this._prepareRowForTextureGeneration(0, 0, 0, this._t0), this._prepareRowForTextureGeneration(1, 0, 0, this._t1), this._prepareRowForTextureGeneration(0, 1, 0, this._t2), this._t1.subtractInPlace(this._t0), this._t2.subtractInPlace(this._t0), F.FromValuesToRef(this._t1.x, this._t1.y, this._t1.z, 0, this._t2.x, this._t2.y, this._t2.z, 0, this._t0.x, this._t0.y, this._t0.z, 0, 0, 0, 0, 1, this._cachedTextureMatrix));
    const t = this.getScene();
    return t ? (this.optimizeUVAllocation && t.markAllMaterialsAsDirty(1, (i) => i.hasTexture(this)), this._cachedTextureMatrix) : this._cachedTextureMatrix;
  }
  /**
   * Get the current matrix used to apply reflection. This is useful to rotate an environment texture for instance.
   * @returns The reflection texture transform
   */
  getReflectionTextureMatrix() {
    const e = this.getScene();
    if (!e)
      return this._cachedReflectionTextureMatrix;
    if (this.uOffset === this._cachedReflectionUOffset && this.vOffset === this._cachedReflectionVOffset && this.uScale === this._cachedReflectionUScale && this.vScale === this._cachedReflectionVScale && this.coordinatesMode === this._cachedReflectionCoordinatesMode)
      if (this.coordinatesMode === v.PROJECTION_MODE) {
        if (this._cachedReflectionProjectionMatrixId === e.getProjectionMatrix().updateFlag)
          return this._cachedReflectionTextureMatrix;
      } else
        return this._cachedReflectionTextureMatrix;
    this._cachedReflectionTextureMatrix || (this._cachedReflectionTextureMatrix = F.Zero()), this._projectionModeMatrix || (this._projectionModeMatrix = F.Zero());
    const t = this._cachedReflectionCoordinatesMode !== this.coordinatesMode;
    switch (this._cachedReflectionUOffset = this.uOffset, this._cachedReflectionVOffset = this.vOffset, this._cachedReflectionUScale = this.uScale, this._cachedReflectionVScale = this.vScale, this._cachedReflectionCoordinatesMode = this.coordinatesMode, this.coordinatesMode) {
      case v.PLANAR_MODE: {
        F.IdentityToRef(this._cachedReflectionTextureMatrix), this._cachedReflectionTextureMatrix[0] = this.uScale, this._cachedReflectionTextureMatrix[5] = this.vScale, this._cachedReflectionTextureMatrix[12] = this.uOffset, this._cachedReflectionTextureMatrix[13] = this.vOffset;
        break;
      }
      case v.PROJECTION_MODE: {
        F.FromValuesToRef(0.5, 0, 0, 0, 0, -0.5, 0, 0, 0, 0, 0, 0, 0.5, 0.5, 1, 1, this._projectionModeMatrix);
        const i = e.getProjectionMatrix();
        this._cachedReflectionProjectionMatrixId = i.updateFlag, i.multiplyToRef(this._projectionModeMatrix, this._cachedReflectionTextureMatrix);
        break;
      }
      default:
        F.IdentityToRef(this._cachedReflectionTextureMatrix);
        break;
    }
    return t && e.markAllMaterialsAsDirty(1, (i) => i.getActiveTextures().indexOf(this) !== -1), this._cachedReflectionTextureMatrix;
  }
  /**
   * Clones the texture.
   * @returns the cloned texture
   */
  clone() {
    const e = {
      noMipmap: this._noMipmap,
      invertY: this._invertY,
      samplingMode: this.samplingMode,
      onLoad: void 0,
      onError: void 0,
      buffer: this._texture ? this._texture._buffer : void 0,
      deleteBuffer: this._deleteBuffer,
      format: this.textureFormat,
      mimeType: this.mimeType,
      loaderOptions: this._loaderOptions,
      creationFlags: this._creationFlags,
      useSRGBBuffer: this._useSRGBBuffer
    };
    return ee.Clone(() => new v(this._texture ? this._texture.url : null, this.getScene(), e), this);
  }
  /**
   * Serialize the texture to a JSON representation we can easily use in the respective Parse function.
   * @returns The JSON representation of the texture
   */
  serialize() {
    var e, t;
    const i = this.name;
    v.SerializeBuffers || this.name.startsWith("data:") && (this.name = ""), this.name.startsWith("data:") && this.url === this.name && (this.url = "");
    const s = super.serialize(v._SerializeInternalTextureUniqueId);
    return s ? ((v.SerializeBuffers || v.ForceSerializeBuffers) && (typeof this._buffer == "string" && this._buffer.substr(0, 5) === "data:" ? (s.base64String = this._buffer, s.name = s.name.replace("data:", "")) : this.url && this.url.startsWith("data:") && this._buffer instanceof Uint8Array ? s.base64String = "data:image/png;base64," + ii(this._buffer) : (v.ForceSerializeBuffers || this.url && this.url.startsWith("blob:") || this._forceSerialize) && (s.base64String = !this._engine || this._engine._features.supportSyncTextureRead ? Si(this) : Ei(this))), s.invertY = this._invertY, s.samplingMode = this.samplingMode, s._creationFlags = this._creationFlags, s._useSRGBBuffer = this._useSRGBBuffer, v._SerializeInternalTextureUniqueId && (s.internalTextureUniqueId = (t = (e = this._texture) === null || e === void 0 ? void 0 : e.uniqueId) !== null && t !== void 0 ? t : void 0), this.name = i, s) : null;
  }
  /**
   * Get the current class name of the texture useful for serialization or dynamic coding.
   * @returns "Texture"
   */
  getClassName() {
    return "Texture";
  }
  /**
   * Dispose the texture and release its associated resources.
   */
  dispose() {
    super.dispose(), this.onLoadObservable.clear(), this._delayedOnLoad = null, this._delayedOnError = null, this._buffer = null;
  }
  /**
   * Parse the JSON representation of a texture in order to recreate the texture in the given scene.
   * @param parsedTexture Define the JSON representation of the texture
   * @param scene Define the scene the parsed texture should be instantiated in
   * @param rootUrl Define the root url of the parsing sequence in the case of relative dependencies
   * @returns The parsed texture if successful
   */
  static Parse(e, t, i) {
    if (e.customType) {
      const l = ri.Instantiate(e.customType).Parse(e, t, i);
      return e.samplingMode && l.updateSamplingMode && l._samplingMode && l._samplingMode !== e.samplingMode && l.updateSamplingMode(e.samplingMode), l;
    }
    if (e.isCube && !e.isRenderTarget)
      return v._CubeTextureParser(e, t, i);
    const s = e.internalTextureUniqueId !== void 0;
    if (!e.name && !e.isRenderTarget && !s)
      return null;
    let r;
    if (s) {
      const o = t.getEngine().getLoadedTexturesCache();
      for (const l of o)
        if (l.uniqueId === e.internalTextureUniqueId) {
          r = l;
          break;
        }
    }
    const a = (o) => {
      var l;
      if (o && o._texture && (o._texture._cachedWrapU = null, o._texture._cachedWrapV = null, o._texture._cachedWrapR = null), e.samplingMode) {
        const f = e.samplingMode;
        o && o.samplingMode !== f && o.updateSamplingMode(f);
      }
      if (o && e.animations)
        for (let f = 0; f < e.animations.length; f++) {
          const h = e.animations[f], d = zt("BABYLON.Animation");
          d && o.animations.push(d.Parse(h));
        }
      s && !r && ((l = o == null ? void 0 : o._texture) === null || l === void 0 || l._setUniqueId(e.internalTextureUniqueId));
    };
    return ee.Parse(() => {
      var o, l, f;
      let h = !0;
      if (e.noMipmap && (h = !1), e.mirrorPlane) {
        const d = v._CreateMirror(e.name, e.renderTargetSize, t, h);
        return d._waitingRenderList = e.renderList, d.mirrorPlane = si.FromArray(e.mirrorPlane), a(d), d;
      } else if (e.isRenderTarget) {
        let d = null;
        if (e.isCube) {
          if (t.reflectionProbes)
            for (let u = 0; u < t.reflectionProbes.length; u++) {
              const S = t.reflectionProbes[u];
              if (S.name === e.name)
                return S.cubeTexture;
            }
        } else
          d = v._CreateRenderTargetTexture(e.name, e.renderTargetSize, t, h, (o = e._creationFlags) !== null && o !== void 0 ? o : 0), d._waitingRenderList = e.renderList;
        return a(d), d;
      } else {
        let d;
        if (e.base64String && !r)
          d = v.CreateFromBase64String(e.base64String, e.base64String, t, !h, e.invertY, e.samplingMode, () => {
            a(d);
          }, (l = e._creationFlags) !== null && l !== void 0 ? l : 0, (f = e._useSRGBBuffer) !== null && f !== void 0 ? f : !1), d.name = e.name;
        else {
          let u;
          e.name && e.name.indexOf("://") > 0 ? u = e.name : u = i + e.name, e.url && (e.url.startsWith("data:") || v.UseSerializedUrlIfAny) && (u = e.url);
          const S = {
            noMipmap: !h,
            invertY: e.invertY,
            samplingMode: e.samplingMode,
            onLoad: () => {
              a(d);
            },
            internalTexture: r
          };
          d = new v(u, t, S);
        }
        return d;
      }
    }, e, t);
  }
  /**
   * Creates a texture from its base 64 representation.
   * @param data Define the base64 payload without the data: prefix
   * @param name Define the name of the texture in the scene useful fo caching purpose for instance
   * @param scene Define the scene the texture should belong to
   * @param noMipmapOrOptions defines if the texture will require mip maps or not or set of all options to create the texture
   * @param invertY define if the texture needs to be inverted on the y axis during loading
   * @param samplingMode define the sampling mode we want for the texture while fetching from it (Texture.NEAREST_SAMPLINGMODE...)
   * @param onLoad define a callback triggered when the texture has been loaded
   * @param onError define a callback triggered when an error occurred during the loading session
   * @param format define the format of the texture we are trying to load (Engine.TEXTUREFORMAT_RGBA...)
   * @param creationFlags specific flags to use when creating the texture (1 for storage textures, for eg)
   * @returns the created texture
   */
  static CreateFromBase64String(e, t, i, s, r, a = v.TRILINEAR_SAMPLINGMODE, n = null, o = null, l = 5, f) {
    return new v("data:" + t, i, s, r, a, n, o, e, !1, l, void 0, void 0, f);
  }
  /**
   * Creates a texture from its data: representation. (data: will be added in case only the payload has been passed in)
   * @param name Define the name of the texture in the scene useful fo caching purpose for instance
   * @param buffer define the buffer to load the texture from in case the texture is loaded from a buffer representation
   * @param scene Define the scene the texture should belong to
   * @param deleteBuffer define if the buffer we are loading the texture from should be deleted after load
   * @param noMipmapOrOptions defines if the texture will require mip maps or not or set of all options to create the texture
   * @param invertY define if the texture needs to be inverted on the y axis during loading
   * @param samplingMode define the sampling mode we want for the texture while fetching from it (Texture.NEAREST_SAMPLINGMODE...)
   * @param onLoad define a callback triggered when the texture has been loaded
   * @param onError define a callback triggered when an error occurred during the loading session
   * @param format define the format of the texture we are trying to load (Engine.TEXTUREFORMAT_RGBA...)
   * @param creationFlags specific flags to use when creating the texture (1 for storage textures, for eg)
   * @returns the created texture
   */
  static LoadFromDataString(e, t, i, s = !1, r, a = !0, n = v.TRILINEAR_SAMPLINGMODE, o = null, l = null, f = 5, h) {
    return e.substr(0, 5) !== "data:" && (e = "data:" + e), new v(e, i, r, a, n, o, l, t, s, f, void 0, void 0, h);
  }
}
v.SerializeBuffers = !0;
v.ForceSerializeBuffers = !1;
v.OnTextureLoadErrorObservable = new G();
v._SerializeInternalTextureUniqueId = !1;
v._CubeTextureParser = (c, e, t) => {
  throw Xe("CubeTexture");
};
v._CreateMirror = (c, e, t, i) => {
  throw Xe("MirrorTexture");
};
v._CreateRenderTargetTexture = (c, e, t, i, s) => {
  throw Xe("RenderTargetTexture");
};
v.NEAREST_SAMPLINGMODE = 1;
v.NEAREST_NEAREST_MIPLINEAR = 8;
v.BILINEAR_SAMPLINGMODE = 2;
v.LINEAR_LINEAR_MIPNEAREST = 11;
v.TRILINEAR_SAMPLINGMODE = 3;
v.LINEAR_LINEAR_MIPLINEAR = 3;
v.NEAREST_NEAREST_MIPNEAREST = 4;
v.NEAREST_LINEAR_MIPNEAREST = 5;
v.NEAREST_LINEAR_MIPLINEAR = 6;
v.NEAREST_LINEAR = 7;
v.NEAREST_NEAREST = 1;
v.LINEAR_NEAREST_MIPNEAREST = 9;
v.LINEAR_NEAREST_MIPLINEAR = 10;
v.LINEAR_LINEAR = 2;
v.LINEAR_NEAREST = 12;
v.EXPLICIT_MODE = 0;
v.SPHERICAL_MODE = 1;
v.PLANAR_MODE = 2;
v.CUBIC_MODE = 3;
v.PROJECTION_MODE = 4;
v.SKYBOX_MODE = 5;
v.INVCUBIC_MODE = 6;
v.EQUIRECTANGULAR_MODE = 7;
v.FIXED_EQUIRECTANGULAR_MODE = 8;
v.FIXED_EQUIRECTANGULAR_MIRRORED_MODE = 9;
v.CLAMP_ADDRESSMODE = 0;
v.WRAP_ADDRESSMODE = 1;
v.MIRROR_ADDRESSMODE = 2;
v.UseSerializedUrlIfAny = !1;
p([
  E()
], v.prototype, "url", void 0);
p([
  E()
], v.prototype, "uOffset", void 0);
p([
  E()
], v.prototype, "vOffset", void 0);
p([
  E()
], v.prototype, "uScale", void 0);
p([
  E()
], v.prototype, "vScale", void 0);
p([
  E()
], v.prototype, "uAng", void 0);
p([
  E()
], v.prototype, "vAng", void 0);
p([
  E()
], v.prototype, "wAng", void 0);
p([
  E()
], v.prototype, "uRotationCenter", void 0);
p([
  E()
], v.prototype, "vRotationCenter", void 0);
p([
  E()
], v.prototype, "wRotationCenter", void 0);
p([
  E()
], v.prototype, "homogeneousRotationInUVTransform", void 0);
p([
  E()
], v.prototype, "isBlocking", null);
ze("BABYLON.Texture", v);
ee._TextureParser = v.Parse;
class Ti {
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
  createDepthStencilTexture(e = 0, t = !0, i = !1, s = 1, r = 14, a) {
    var n;
    return (n = this._depthStencilTexture) === null || n === void 0 || n.dispose(), this._depthStencilTextureWithStencil = i, this._depthStencilTexture = this._engine.createDepthStencilTexture(this._size, {
      bilinearFiltering: t,
      comparisonFunction: e,
      generateStencil: i,
      isCube: this._isCube,
      samples: s,
      depthTextureFormat: r,
      label: a
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
    var e, t, i, s, r, a, n, o;
    let l = null;
    if (this._isMulti) {
      const f = this.textures;
      if (f && f.length > 0) {
        let h = !1, d = f.length;
        const u = f[f.length - 1]._source;
        (u === Ye.Depth || u === Ye.DepthStencil) && (h = !0, d--);
        const S = [], _ = [], m = [], T = [], I = [], b = [], P = [], V = {};
        for (let w = 0; w < d; ++w) {
          const N = f[w];
          S.push(N.samplingMode), _.push(N.type), m.push(N.format), V[N.uniqueId] !== void 0 ? (T.push(-1), P.push(0)) : (V[N.uniqueId] = w, N.is2DArray ? (T.push(35866), P.push(N.depth)) : N.isCube ? (T.push(34067), P.push(0)) : N.is3D ? (T.push(32879), P.push(N.depth)) : (T.push(3553), P.push(0))), this._faceIndices && I.push((e = this._faceIndices[w]) !== null && e !== void 0 ? e : 0), this._layerIndices && b.push((t = this._layerIndices[w]) !== null && t !== void 0 ? t : 0);
        }
        const W = {
          samplingModes: S,
          generateMipMaps: f[0].generateMipMaps,
          generateDepthBuffer: this._generateDepthBuffer,
          generateStencilBuffer: this._generateStencilBuffer,
          generateDepthTexture: h,
          types: _,
          formats: m,
          textureCount: d,
          targetTypes: T,
          faceIndex: I,
          layerIndex: b,
          layerCounts: P
        }, R = {
          width: this.width,
          height: this.height
        };
        l = this._engine.createMultipleRenderTarget(R, W);
        for (let w = 0; w < d; ++w) {
          if (T[w] !== -1)
            continue;
          const N = V[f[w].uniqueId];
          l.setTexture(l.textures[N], w);
        }
      }
    } else {
      const f = {};
      if (f.generateDepthBuffer = this._generateDepthBuffer, f.generateMipMaps = (s = (i = this.texture) === null || i === void 0 ? void 0 : i.generateMipMaps) !== null && s !== void 0 ? s : !1, f.generateStencilBuffer = this._generateStencilBuffer, f.samplingMode = (r = this.texture) === null || r === void 0 ? void 0 : r.samplingMode, f.type = (a = this.texture) === null || a === void 0 ? void 0 : a.type, f.format = (n = this.texture) === null || n === void 0 ? void 0 : n.format, this.isCube)
        l = this._engine.createRenderTargetCubeTexture(this.width, f);
      else {
        const h = {
          width: this.width,
          height: this.height,
          layers: this.is2DArray ? (o = this.texture) === null || o === void 0 ? void 0 : o.depth : void 0
        };
        l = this._engine.createRenderTargetTexture(h, f);
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
class xi extends Ti {
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
    var r, a, n, o;
    if (!e._hardwareTexture)
      return;
    const l = this._framebuffer, f = this._engine._currentFramebuffer;
    if (this._engine._bindUnboundFramebuffer(l), this._engine.webGLVersion > 1) {
      const h = this._context, d = h["COLOR_ATTACHMENT" + t];
      e.is2DArray || e.is3D ? (i = (a = i ?? ((r = this.layerIndices) === null || r === void 0 ? void 0 : r[t])) !== null && a !== void 0 ? a : 0, h.framebufferTextureLayer(h.FRAMEBUFFER, d, e._hardwareTexture.underlyingResource, s, i)) : e.isCube ? (i = (o = i ?? ((n = this.faceIndices) === null || n === void 0 ? void 0 : n[t])) !== null && o !== void 0 ? o : 0, h.framebufferTexture2D(h.FRAMEBUFFER, d, h.TEXTURE_CUBE_MAP_POSITIVE_X + i, e._hardwareTexture.underlyingResource, s)) : h.framebufferTexture2D(h.FRAMEBUFFER, d, h.TEXTURE_2D, e._hardwareTexture.underlyingResource, s);
    } else {
      const h = this._context, d = h["COLOR_ATTACHMENT" + t + "_WEBGL"], u = i !== void 0 ? h.TEXTURE_CUBE_MAP_POSITIVE_X + i : h.TEXTURE_2D;
      h.framebufferTexture2D(h.FRAMEBUFFER, d, u, e._hardwareTexture.underlyingResource, s);
    }
    this._engine._bindUnboundFramebuffer(f);
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
    for (let a = 0; a < r; a++) {
      const n = this.textures[a];
      n && (n.is2DArray || n.is3D ? this._bindTextureRenderTarget(n, a, this.layerIndices[a]) : n.isCube ? this._bindTextureRenderTarget(n, a, this.faceIndices[a]) : this._bindTextureRenderTarget(n, a));
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
be.prototype._createHardwareRenderTargetWrapper = function(c, e, t) {
  const i = new xi(c, e, t, this, this._gl);
  return this._renderTargetWrapperCache.push(i), i;
};
be.prototype.createRenderTargetTexture = function(c, e) {
  var t, i;
  const s = this._createHardwareRenderTargetWrapper(!1, !1, c);
  let r = !0, a = !1, n = !1, o, l = 1;
  e !== void 0 && typeof e == "object" && (r = (t = e.generateDepthBuffer) !== null && t !== void 0 ? t : !0, a = !!e.generateStencilBuffer, n = !!e.noColorAttachment, o = e.colorAttachment, l = (i = e.samples) !== null && i !== void 0 ? i : 1);
  const f = o || (n ? null : this._createInternalTexture(c, e, !0, Ye.RenderTarget)), h = c.width || c, d = c.height || c, u = this._currentFramebuffer, S = this._gl, _ = S.createFramebuffer();
  return this._bindUnboundFramebuffer(_), s._depthStencilBuffer = this._setupFramebufferDepthAttachments(a, r, h, d), f && !f.is2DArray && S.framebufferTexture2D(S.FRAMEBUFFER, S.COLOR_ATTACHMENT0, S.TEXTURE_2D, f._hardwareTexture.underlyingResource, 0), this._bindUnboundFramebuffer(u), s._framebuffer = _, s._generateDepthBuffer = r, s._generateStencilBuffer = a, s.setTextures(f), this.updateRenderTargetTextureSampleCount(s, l), s;
};
be.prototype.createDepthStencilTexture = function(c, e, t) {
  if (e.isCube) {
    const i = c.width || c;
    return this._createDepthStencilCubeTexture(i, e, t);
  } else
    return this._createDepthStencilTexture(c, e, t);
};
be.prototype._createDepthStencilTexture = function(c, e, t) {
  const i = this._gl, s = c.layers || 0, r = s !== 0 ? i.TEXTURE_2D_ARRAY : i.TEXTURE_2D, a = new Wt(this, Ye.DepthStencil);
  if (!this._caps.depthTextureExtension)
    return tt.Error("Depth texture is not supported by your browser or hardware."), a;
  const n = {
    bilinearFiltering: !1,
    comparisonFunction: 0,
    generateStencil: !1,
    ...e
  };
  if (this._bindTextureDirectly(r, a, !0), this._setupDepthStencilTexture(a, c, n.generateStencil, n.comparisonFunction === 0 ? !1 : n.bilinearFiltering, n.comparisonFunction, n.samples), n.depthTextureFormat !== void 0) {
    if (n.depthTextureFormat !== 15 && n.depthTextureFormat !== 16 && n.depthTextureFormat !== 17 && n.depthTextureFormat !== 13 && n.depthTextureFormat !== 14 && n.depthTextureFormat !== 18)
      return tt.Error("Depth texture format is not supported."), a;
    a.format = n.depthTextureFormat;
  } else
    a.format = n.generateStencil ? 13 : 16;
  const o = a.format === 17 || a.format === 13 || a.format === 18;
  t._depthStencilTexture = a, t._depthStencilTextureWithStencil = o;
  let l = i.UNSIGNED_INT;
  a.format === 15 ? l = i.UNSIGNED_SHORT : a.format === 17 || a.format === 13 ? l = i.UNSIGNED_INT_24_8 : a.format === 14 ? l = i.FLOAT : a.format === 18 && (l = i.FLOAT_32_UNSIGNED_INT_24_8_REV);
  const f = o ? i.DEPTH_STENCIL : i.DEPTH_COMPONENT;
  let h = f;
  this.webGLVersion > 1 && (a.format === 15 ? h = i.DEPTH_COMPONENT16 : a.format === 16 ? h = i.DEPTH_COMPONENT24 : a.format === 17 || a.format === 13 ? h = i.DEPTH24_STENCIL8 : a.format === 14 ? h = i.DEPTH_COMPONENT32F : a.format === 18 && (h = i.DEPTH32F_STENCIL8)), a.is2DArray ? i.texImage3D(r, 0, h, a.width, a.height, s, 0, f, l, null) : i.texImage2D(r, 0, h, a.width, a.height, 0, f, l, null), this._bindTextureDirectly(r, null), this._internalTexturesCache.push(a);
  const d = t;
  if (d._depthStencilBuffer) {
    const u = this._currentFramebuffer;
    this._bindUnboundFramebuffer(d._framebuffer), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.RENDERBUFFER, null), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.DEPTH_ATTACHMENT, i.RENDERBUFFER, null), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.STENCIL_ATTACHMENT, i.RENDERBUFFER, null), this._bindUnboundFramebuffer(u), i.deleteRenderbuffer(d._depthStencilBuffer), d._depthStencilBuffer = null;
  }
  return a;
};
be.prototype.updateRenderTargetTextureSampleCount = function(c, e) {
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
be.prototype.createRenderTargetCubeTexture = function(c, e) {
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
  const s = this._gl, r = new Wt(this, Ye.RenderTarget);
  this._bindTextureDirectly(s.TEXTURE_CUBE_MAP, r, !0);
  const a = this._getSamplingParameters(i.samplingMode, i.generateMipMaps);
  i.type === 1 && !this._caps.textureFloat && (i.type = 0, tt.Warn("Float textures are not supported. Cube render target forced to TEXTURETYPE_UNESIGNED_BYTE type")), s.texParameteri(s.TEXTURE_CUBE_MAP, s.TEXTURE_MAG_FILTER, a.mag), s.texParameteri(s.TEXTURE_CUBE_MAP, s.TEXTURE_MIN_FILTER, a.min), s.texParameteri(s.TEXTURE_CUBE_MAP, s.TEXTURE_WRAP_S, s.CLAMP_TO_EDGE), s.texParameteri(s.TEXTURE_CUBE_MAP, s.TEXTURE_WRAP_T, s.CLAMP_TO_EDGE);
  for (let o = 0; o < 6; o++)
    s.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X + o, 0, this._getRGBABufferInternalSizedFormat(i.type, i.format), c, c, 0, this._getInternalFormat(i.format), this._getWebGLTextureType(i.type), null);
  const n = s.createFramebuffer();
  return this._bindUnboundFramebuffer(n), t._depthStencilBuffer = this._setupFramebufferDepthAttachments(i.generateStencilBuffer, i.generateDepthBuffer, c, c), i.generateMipMaps && s.generateMipmap(s.TEXTURE_CUBE_MAP), this._bindTextureDirectly(s.TEXTURE_CUBE_MAP, null), this._bindUnboundFramebuffer(null), t._framebuffer = n, t._generateDepthBuffer = i.generateDepthBuffer, t._generateStencilBuffer = i.generateStencilBuffer, r.width = c, r.height = c, r.isReady = !0, r.isCube = !0, r.samples = 1, r.generateMipMaps = i.generateMipMaps, r.samplingMode = i.samplingMode, r.type = i.type, r.format = i.format, this._internalTexturesCache.push(r), t.setTextures(r), t;
};
const Ai = "postprocessVertexShader", Mi = `attribute vec2 position;
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
x.ShadersStore[Ai] = Mi;
const Et = {
  positions: [1, 1, -1, 1, -1, -1, 1, -1],
  indices: [0, 1, 2, 0, 2, 3]
};
class Ci {
  /**
   * Creates an effect renderer
   * @param engine the engine to use for rendering
   * @param options defines the options of the effect renderer
   */
  constructor(e, t = Et) {
    var i, s;
    this._fullscreenViewport = new ai(0, 0, 1, 1);
    const r = (i = t.positions) !== null && i !== void 0 ? i : Et.positions, a = (s = t.indices) !== null && s !== void 0 ? s : Et.indices;
    this.engine = e, this._vertexBuffers = {
      [U.PositionKind]: new U(e, r, U.PositionKind, !1, !1, 2)
    }, this._indexBuffer = e.createIndexBuffer(a), this._onContextRestoredObserver = e.onContextRestoredObservable.add(() => {
      this._indexBuffer = e.createIndexBuffer(a);
      for (const n in this._vertexBuffers)
        this._vertexBuffers[n]._rebuild();
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
    const e = this._vertexBuffers[U.PositionKind];
    e && (e.dispose(), delete this._vertexBuffers[U.PositionKind]), this._indexBuffer && this.engine._releaseBuffer(this._indexBuffer), this._onContextRestoredObserver && (this.engine.onContextRestoredObservable.remove(this._onContextRestoredObserver), this._onContextRestoredObserver = null);
  }
}
class Ri {
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
    this.onApplyObservable = new G();
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
    this._drawWrapper = new Ct(e.engine), e.useShaderStore ? (t.fragment = t.fragmentSource, t.vertex || (t.vertex = t.vertexSource), delete t.fragmentSource, delete t.vertexSource, this.effect = e.engine.createEffect(t, e.attributeNames || ["position"], i, e.samplerNames, s, void 0, e.onCompiled, void 0, void 0, e.shaderLanguage)) : (this.effect = new _e(t, e.attributeNames || ["position"], i, e.samplerNames, e.engine, s, void 0, e.onCompiled, void 0, void 0, void 0, e.shaderLanguage), this._onContextRestoredObserver = e.engine.onContextRestoredObservable.add(() => {
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
const $t = "passPixelShader", Yt = `varying vec2 vUV;
uniform sampler2D textureSampler;
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) 
{
gl_FragColor=texture2D(textureSampler,vUV);
}`;
x.ShadersStore[$t] = Yt;
const Nt = { name: $t, shader: Yt };
class J {
  static _CreateDumpRenderer() {
    if (!J._DumpToolsEngine) {
      const e = document.createElement("canvas"), t = new be(e, !1, {
        preserveDrawingBuffer: !0,
        depth: !1,
        stencil: !1,
        alpha: !0,
        premultipliedAlpha: !1,
        antialias: !1,
        failIfMajorPerformanceCaveat: !1
      });
      t.getCaps().parallelShaderCompile = void 0;
      const i = new Ci(t), s = new Ri({
        engine: t,
        name: Nt.name,
        fragmentShader: Nt.shader,
        samplerNames: ["textureSampler"]
      });
      J._DumpToolsEngine = {
        canvas: e,
        engine: t,
        renderer: i,
        wrapper: s
      };
    }
    return J._DumpToolsEngine;
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
  static async DumpFramebuffer(e, t, i, s, r = "image/png", a) {
    const n = await i.readPixels(0, 0, e, t), o = new Uint8Array(n.buffer);
    J.DumpData(e, t, o, s, r, a, !0);
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
  static DumpDataAsync(e, t, i, s = "image/png", r, a = !1, n = !1, o) {
    return new Promise((l) => {
      J.DumpData(e, t, i, (f) => l(f), s, r, a, n, o);
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
  static DumpData(e, t, i, s, r = "image/png", a, n = !1, o = !1, l) {
    const f = J._CreateDumpRenderer();
    if (f.engine.setSize(e, t, !0), i instanceof Float32Array) {
      const d = new Uint8Array(i.length);
      let u = i.length;
      for (; u--; ) {
        const S = i[u];
        d[u] = S < 0 ? 0 : S > 1 ? 1 : Math.round(S * 255);
      }
      i = d;
    }
    const h = f.engine.createRawTexture(i, e, t, 5, !1, !n, 1);
    f.renderer.setViewport(), f.renderer.applyEffectWrapper(f.wrapper), f.wrapper.effect._bindTexture("textureSampler", h), f.renderer.draw(), o ? ke.ToBlob(f.canvas, (d) => {
      const u = new FileReader();
      u.onload = (S) => {
        const _ = S.target.result;
        s && s(_);
      }, u.readAsArrayBuffer(d);
    }, r, l) : ke.EncodeScreenshotCanvasData(f.canvas, s, r, a, l), h.dispose();
  }
  /**
   * Dispose the dump tools associated resources
   */
  static Dispose() {
    J._DumpToolsEngine && (J._DumpToolsEngine.wrapper.dispose(), J._DumpToolsEngine.renderer.dispose(), J._DumpToolsEngine.engine.dispose()), J._DumpToolsEngine = null;
  }
}
const Ii = () => {
  ke.DumpData = J.DumpData, ke.DumpDataAsync = J.DumpDataAsync, ke.DumpFramebuffer = J.DumpFramebuffer;
};
Ii();
class ae extends v {
  /**
   * Use this list to define the list of mesh you want to render.
   */
  get renderList() {
    return this._renderList;
  }
  set renderList(e) {
    this._unObserveRenderList && (this._unObserveRenderList(), this._unObserveRenderList = null), e && (this._unObserveRenderList = ni(e, this._renderListHasChanged)), this._renderList = e;
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
  constructor(e, t, i, s = !1, r = !0, a = 0, n = !1, o = v.TRILINEAR_SAMPLINGMODE, l = !0, f = !1, h = !1, d = 5, u = !1, S, _, m = !1, T = !1) {
    var I, b, P, V, W, R;
    let w;
    if (typeof s == "object") {
      const O = s;
      s = !!O.generateMipMaps, r = (I = O.doNotChangeAspectRatio) !== null && I !== void 0 ? I : !0, a = (b = O.type) !== null && b !== void 0 ? b : 0, n = !!O.isCube, o = (P = O.samplingMode) !== null && P !== void 0 ? P : v.TRILINEAR_SAMPLINGMODE, l = (V = O.generateDepthBuffer) !== null && V !== void 0 ? V : !0, f = !!O.generateStencilBuffer, h = !!O.isMulti, d = (W = O.format) !== null && W !== void 0 ? W : 5, u = !!O.delayAllocation, S = O.samples, _ = O.creationFlags, m = !!O.noColorAttachment, T = !!O.useSRGBBuffer, w = O.colorAttachment;
    }
    if (super(null, i, !s, void 0, o, void 0, void 0, void 0, void 0, d), this._unObserveRenderList = null, this._renderListHasChanged = (O, me) => {
      var k;
      const te = this._renderList ? this._renderList.length : 0;
      (me === 0 && te > 0 || te === 0) && ((k = this.getScene()) === null || k === void 0 || k.meshes.forEach((oe) => {
        oe._markSubMeshesAsLightDirty();
      }));
    }, this.renderParticles = !0, this.renderSprites = !1, this.forceLayerMaskCheck = !1, this.ignoreCameraViewport = !1, this.onBeforeBindObservable = new G(), this.onAfterUnbindObservable = new G(), this.onBeforeRenderObservable = new G(), this.onAfterRenderObservable = new G(), this.onClearObservable = new G(), this.onResizeObservable = new G(), this._cleared = !1, this.skipInitialClear = !1, this._currentRefreshId = -1, this._refreshRate = 1, this._samples = 1, this._canRescale = !0, this._renderTarget = null, this.boundingBoxPosition = C.Zero(), i = this.getScene(), !i)
      return;
    const N = this.getScene().getEngine();
    this._coordinatesMode = v.PROJECTION_MODE, this.renderList = new Array(), this.name = e, this.isRenderTarget = !0, this._initialSizeParameter = t, this._renderPassIds = [], this._isCubeData = n, this._processSizeParameter(t), this.renderPassId = this._renderPassIds[0], this._resizeObserver = N.onResizeObservable.add(() => {
    }), this._generateMipMaps = !!s, this._doNotChangeAspectRatio = r, this._renderingManager = new xt(i), this._renderingManager._useSceneAutoClearSetup = !0, !h && (this._renderTargetOptions = {
      generateMipMaps: s,
      type: a,
      format: (R = this._format) !== null && R !== void 0 ? R : void 0,
      samplingMode: this.samplingMode,
      generateDepthBuffer: l,
      generateStencilBuffer: f,
      samples: S,
      creationFlags: _,
      noColorAttachment: m,
      useSRGBBuffer: T,
      colorAttachment: w,
      label: this.name
    }, this.samplingMode === v.NEAREST_SAMPLINGMODE && (this.wrapU = v.CLAMP_ADDRESSMODE, this.wrapV = v.CLAMP_ADDRESSMODE), u || (n ? (this._renderTarget = i.getEngine().createRenderTargetCubeTexture(this.getRenderSize(), this._renderTargetOptions), this.coordinatesMode = v.INVCUBIC_MODE, this._textureMatrix = F.Identity()) : this._renderTarget = i.getEngine().createRenderTargetTexture(this._size, this._renderTargetOptions), this._texture = this._renderTarget.texture, S !== void 0 && (this.samples = S)));
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
    var a;
    (a = this._renderTarget) === null || a === void 0 || a.createDepthStencilTexture(e, t, i, s, r);
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
      this._postProcessManager = new kt(t), this._postProcesses = new Array();
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
    const a = r.getEngine();
    if (this.useCameraPostProcesses !== void 0 && (e = this.useCameraPostProcesses), this._waitingRenderList) {
      this.renderList = [];
      for (let h = 0; h < this._waitingRenderList.length; h++) {
        const d = this._waitingRenderList[h], u = r.getMeshById(d);
        u && this.renderList.push(u);
      }
      this._waitingRenderList = void 0;
    }
    if (this.renderListPredicate) {
      this.renderList ? this.renderList.length = 0 : this.renderList = [];
      const h = this.getScene();
      if (!h)
        return i;
      const d = h.meshes;
      for (let u = 0; u < d.length; u++) {
        const S = d[u];
        this.renderListPredicate(S) && this.renderList.push(S);
      }
    }
    const n = a.currentRenderPassId;
    this.onBeforeBindObservable.notifyObservers(this);
    const o = (s = this.activeCamera) !== null && s !== void 0 ? s : r.activeCamera, l = r.activeCamera;
    o && (o !== r.activeCamera && (r.setTransformMatrix(o.getViewMatrix(), o.getProjectionMatrix(!0)), r.activeCamera = o), a.setViewport(o.viewport, this.getRenderWidth(), this.getRenderHeight())), this._defaultRenderListPrepared = !1;
    let f = i;
    if (i) {
      r.getViewMatrix() || r.updateTransformMatrix();
      const h = this.is2DArray ? this.getRenderLayers() : this.isCube ? 6 : 1;
      for (let d = 0; d < h && f; d++) {
        let u = null;
        const S = this.renderList ? this.renderList : r.getActiveMeshes().data, _ = this.renderList ? this.renderList.length : r.getActiveMeshes().length;
        a.currentRenderPassId = this._renderPassIds[d], this.onBeforeRenderObservable.notifyObservers(d), this.getCustomRenderList && (u = this.getCustomRenderList(d, S, _)), u || (u = S), this._doNotChangeAspectRatio || r.updateTransformMatrix(!0);
        for (let m = 0; m < u.length && f; ++m) {
          const T = u[m];
          if (!(!T.isEnabled() || T.isBlocked || !T.isVisible || !T.subMeshes)) {
            if (this.customIsReadyFunction) {
              if (!this.customIsReadyFunction(T, this.refreshRate, i)) {
                f = !1;
                continue;
              }
            } else if (!T.isReady(!0)) {
              f = !1;
              continue;
            }
          }
        }
        this.onAfterRenderObservable.notifyObservers(d), (this.is2DArray || this.isCube) && (r.incrementRenderId(), r.resetCachedMaterial());
      }
    } else if (this.is2DArray && !this.isMulti)
      for (let h = 0; h < this.getRenderLayers(); h++)
        this._renderToTarget(0, e, t, h, o), r.incrementRenderId(), r.resetCachedMaterial();
    else if (this.isCube && !this.isMulti)
      for (let h = 0; h < 6; h++)
        this._renderToTarget(h, e, t, void 0, o), r.incrementRenderId(), r.resetCachedMaterial();
    else
      this._renderToTarget(0, e, t, void 0, o);
    return this.onAfterUnbindObservable.notifyObservers(this), a.currentRenderPassId = n, l && (r.activeCamera = l, (r.getEngine().scenes.length > 1 || this.activeCamera && this.activeCamera !== r.activeCamera) && r.setTransformMatrix(r.activeCamera.getViewMatrix(), r.activeCamera.getProjectionMatrix(!0)), a.setViewport(r.activeCamera.viewport)), r.resetCachedMaterial(), f;
  }
  _bestReflectionRenderTargetDimension(e, t) {
    const s = e * t, r = z.NearestPOT(s + 128 * 128 / (128 + s));
    return Math.min(z.FloorPOT(e), r);
  }
  _prepareRenderingManager(e, t, i, s) {
    const r = this.getScene();
    if (!r)
      return;
    this._renderingManager.reset();
    const a = r.getRenderId();
    for (let n = 0; n < t; n++) {
      const o = e[n];
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
        l._preActivateForIntermediateRendering(a);
        let f;
        if (s && i ? f = (o.layerMask & i.layerMask) === 0 : f = !1, o.isEnabled() && o.isVisible && o.subMeshes && !f && (l !== o && l._activate(a, !0), o._activate(a, !0) && o.subMeshes.length)) {
          o.isAnInstance ? o._internalAbstractMeshDataInfo._actAsRegularMesh && (l = o) : l._internalAbstractMeshDataInfo._onlyForInstancesIntermediate = !1, l._internalAbstractMeshDataInfo._isActiveIntermediate = !0;
          for (let h = 0; h < l.subMeshes.length; h++) {
            const d = l.subMeshes[h];
            this._renderingManager.dispatch(d, l);
          }
        }
      }
    }
    for (let n = 0; n < r.particleSystems.length; n++) {
      const o = r.particleSystems[n], l = o.emitter;
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
    var a, n, o, l, f, h;
    const d = this.getScene();
    if (!d)
      return;
    const u = d.getEngine();
    if ((a = u._debugPushGroup) === null || a === void 0 || a.call(u, `render to face #${e} layer #${s}`, 1), this._prepareFrame(d, e, s, t), this.is2DArray ? (u.currentRenderPassId = this._renderPassIds[s], this.onBeforeRenderObservable.notifyObservers(s)) : (u.currentRenderPassId = this._renderPassIds[e], this.onBeforeRenderObservable.notifyObservers(e)), u.snapshotRendering && u.snapshotRenderingMode === 1)
      this.onClearObservable.hasObservers() ? this.onClearObservable.notifyObservers(u) : this.skipInitialClear || u.clear(this.clearColor || d.clearColor, !0, !0, !0);
    else {
      let _ = null;
      const m = this.renderList ? this.renderList : d.getActiveMeshes().data, T = this.renderList ? this.renderList.length : d.getActiveMeshes().length;
      this.getCustomRenderList && (_ = this.getCustomRenderList(this.is2DArray ? s : e, m, T)), _ ? this._prepareRenderingManager(_, _.length, r, this.forceLayerMaskCheck) : (this._defaultRenderListPrepared || (this._prepareRenderingManager(m, T, r, !this.renderList || this.forceLayerMaskCheck), this._defaultRenderListPrepared = !0), _ = m);
      for (const b of d._beforeRenderTargetClearStage)
        b.action(this, e, s);
      this.onClearObservable.hasObservers() ? this.onClearObservable.notifyObservers(u) : this.skipInitialClear || u.clear(this.clearColor || d.clearColor, !0, !0, !0), this._doNotChangeAspectRatio || d.updateTransformMatrix(!0);
      for (const b of d._beforeRenderTargetDrawStage)
        b.action(this, e, s);
      this._renderingManager.render(this.customRenderFunction, _, this.renderParticles, this.renderSprites);
      for (const b of d._afterRenderTargetDrawStage)
        b.action(this, e, s);
      const I = (o = (n = this._texture) === null || n === void 0 ? void 0 : n.generateMipMaps) !== null && o !== void 0 ? o : !1;
      this._texture && (this._texture.generateMipMaps = !1), this._postProcessManager ? this._postProcessManager._finalizeFrame(!1, (l = this._renderTarget) !== null && l !== void 0 ? l : void 0, e, this._postProcesses, this.ignoreCameraViewport) : t && d.postProcessManager._finalizeFrame(!1, (f = this._renderTarget) !== null && f !== void 0 ? f : void 0, e);
      for (const b of d._afterRenderTargetPostProcessStage)
        b.action(this, e, s);
      this._texture && (this._texture.generateMipMaps = I), this._doNotChangeAspectRatio || d.updateTransformMatrix(!0), i && J.DumpFramebuffer(this.getRenderWidth(), this.getRenderHeight(), u);
    }
    this._unbindFrameBuffer(u, e), this._texture && this.isCube && e === 5 && u.generateMipMapsForCubemap(this._texture), (h = u._debugPopGroup) === null || h === void 0 || h.call(u, 1);
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
    const e = this.getSize(), t = new ae(this.name, e, this.getScene(), this._renderTargetOptions.generateMipMaps, this._doNotChangeAspectRatio, this._renderTargetOptions.type, this.isCube, this._renderTargetOptions.samplingMode, this._renderTargetOptions.generateDepthBuffer, this._renderTargetOptions.generateStencilBuffer, void 0, this._renderTargetOptions.format, void 0, this._renderTargetOptions.samples);
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
    this.refreshRate === ae.REFRESHRATE_RENDER_ONCE && (this.refreshRate = ae.REFRESHRATE_RENDER_ONCE), this._postProcessManager && this._postProcessManager._rebuild();
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
ae.REFRESHRATE_RENDER_ONCE = 0;
ae.REFRESHRATE_RENDER_ONEVERYFRAME = 1;
ae.REFRESHRATE_RENDER_ONEVERYTWOFRAMES = 2;
v._CreateRenderTargetTexture = (c, e, t, i, s) => new ae(c, e, t, i);
class B {
  /**
   * Registers a shader code processing with a post process name.
   * @param postProcessName name of the post process. Use null for the fallback shader code processing. This is the shader code processing that will be used in case no specific shader code processing has been associated to a post process name
   * @param customShaderCodeProcessing shader code processing to associate to the post process name
   * @returns
   */
  static RegisterShaderCodeProcessing(e, t) {
    if (!t) {
      delete B._CustomShaderCodeProcessing[e ?? ""];
      return;
    }
    B._CustomShaderCodeProcessing[e ?? ""] = t;
  }
  static _GetShaderCodeProcessing(e) {
    var t;
    return (t = B._CustomShaderCodeProcessing[e]) !== null && t !== void 0 ? t : B._CustomShaderCodeProcessing[""];
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
  constructor(e, t, i, s, r, a, n = 1, o, l, f = null, h = 0, d = "postprocess", u, S = !1, _ = 5, m = li.GLSL) {
    this._parentContainer = null, this.width = -1, this.height = -1, this.nodeMaterialSource = null, this._outputTexture = null, this.autoClear = !0, this.forceAutoClearInAlphaMode = !1, this.alphaMode = 0, this.animations = new Array(), this.enablePixelPerfectMode = !1, this.forceFullscreenViewport = !0, this.scaleMode = 1, this.alwaysForcePOT = !1, this._samples = 1, this.adaptScaleToCurrentViewport = !1, this._reusable = !1, this._renderId = 0, this.externalTextureSamplerBinding = !1, this._textures = new At(2), this._textureCache = [], this._currentRenderTextureInd = 0, this._scaleRatio = new Ge(1, 1), this._texelSize = Ge.Zero(), this.onActivateObservable = new G(), this.onSizeChangedObservable = new G(), this.onApplyObservable = new G(), this.onBeforeRenderObservable = new G(), this.onAfterRenderObservable = new G(), this.name = e, a != null ? (this._camera = a, this._scene = a.getScene(), a.attachPostProcess(this), this._engine = this._scene.getEngine(), this._scene.postProcesses.push(this), this.uniqueId = this._scene.getUniqueId()) : o && (this._engine = o, this._engine.postProcesses.push(this)), this._options = r, this.renderTargetSamplingMode = n || 1, this._reusable = l || !1, this._textureType = h, this._textureFormat = _, this._shaderLanguage = m, this._samplers = s || [], this._samplers.push("textureSampler"), this._fragmentUrl = t, this._vertexUrl = d, this._parameters = i || [], this._parameters.push("scale"), this._indexParameters = u, this._drawWrapper = new Ct(this._engine), S || this.updateEffect(f);
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
    this._textures.length == 0 && (this._textures = new At(2)), this._shareOutputWithPostProcess = null;
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
  updateEffect(e = null, t = null, i = null, s, r, a, n, o) {
    var l, f;
    const h = B._GetShaderCodeProcessing(this.name);
    if (h != null && h.defineCustomBindings) {
      const d = (l = t == null ? void 0 : t.slice()) !== null && l !== void 0 ? l : [];
      d.push(...this._parameters);
      const u = (f = i == null ? void 0 : i.slice()) !== null && f !== void 0 ? f : [];
      u.push(...this._samplers), e = h.defineCustomBindings(this.name, e, d, u), t = d, i = u;
    }
    this._postProcessDefines = e, this._drawWrapper.effect = this._engine.createEffect({ vertex: n ?? this._vertexUrl, fragment: o ?? this._fragmentUrl }, {
      attributes: ["position"],
      uniformsNames: t || this._parameters,
      uniformBuffersNames: [],
      samplers: i || this._samplers,
      defines: e !== null ? e : "",
      fallbacks: null,
      onCompiled: r ?? null,
      onError: a ?? null,
      indexParameters: s || this._indexParameters,
      processCodeAfterIncludes: h != null && h.processCodeAfterIncludes ? (d, u) => h.processCodeAfterIncludes(this.name, d, u) : null,
      processFinalCode: h != null && h.processFinalCode ? (d, u) => h.processFinalCode(this.name, d, u) : null,
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
    let a = null;
    for (let l = 0; l < i._postProcesses.length; l++)
      if (i._postProcesses[l] !== null) {
        a = i._postProcesses[l];
        break;
      }
    const n = { width: this.width, height: this.height }, o = {
      generateMipMaps: s,
      generateDepthBuffer: r || a === this,
      generateStencilBuffer: (r || a === this) && this._engine.isStencilEnable,
      samplingMode: this.renderTargetSamplingMode,
      type: this._textureType,
      format: this._textureFormat,
      samples: this._samples,
      label: "PostProcessRTT-" + this.name
    };
    this._textures.push(this._createRenderTargetTexture(n, o, 0)), this._reusable && this._textures.push(this._createRenderTargetTexture(n, o, 1)), this._texelSize.copyFromFloats(1 / this.width, 1 / this.height), this.onSizeChangedObservable.notifyObservers(this);
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
    const a = e.getScene(), n = a.getEngine(), o = n.getCaps().maxTextureSize;
    let l = (t ? t.width : this._engine.getRenderWidth(!0)) * this._options | 0;
    const f = (t ? t.height : this._engine.getRenderHeight(!0)) * this._options | 0, h = e.parent;
    h && (h.leftCamera == e || h.rightCamera == e) && (l /= 2);
    let d = this._options.width || l, u = this._options.height || f;
    const S = this.renderTargetSamplingMode !== 7 && this.renderTargetSamplingMode !== 1 && this.renderTargetSamplingMode !== 2;
    if (!this._shareOutputWithPostProcess && !this._forcedOutputTexture) {
      if (this.adaptScaleToCurrentViewport) {
        const m = n.currentViewport;
        m && (d *= m.width, u *= m.height);
      }
      (S || this.alwaysForcePOT) && (this._options.width || (d = n.needPOTTextures ? z.GetExponentOfTwo(d, o, this.scaleMode) : d), this._options.height || (u = n.needPOTTextures ? z.GetExponentOfTwo(u, o, this.scaleMode) : u)), (this.width !== d || this.height !== u) && this._resize(d, u, e, S, i), this._textures.forEach((m) => {
        m.samples !== this.samples && this._engine.updateRenderTargetTextureSampleCount(m, this.samples);
      }), this._flushTextureCache(), this._renderId++;
    }
    let _;
    if (this._shareOutputWithPostProcess)
      _ = this._shareOutputWithPostProcess.inputTexture;
    else if (this._forcedOutputTexture)
      _ = this._forcedOutputTexture, this.width = this._forcedOutputTexture.width, this.height = this._forcedOutputTexture.height;
    else {
      _ = this.inputTexture;
      let m;
      for (let T = 0; T < this._textureCache.length; T++)
        if (this._textureCache[T].texture === _) {
          m = this._textureCache[T];
          break;
        }
      m && (m.lastUsedRenderId = this._renderId);
    }
    return this.enablePixelPerfectMode ? (this._scaleRatio.copyFromFloats(l / d, f / u), this._engine.bindFramebuffer(_, 0, l, f, this.forceFullscreenViewport)) : (this._scaleRatio.copyFromFloats(1, 1), this._engine.bindFramebuffer(_, 0, void 0, void 0, this.forceFullscreenViewport)), (r = (s = this._engine)._debugInsertMarker) === null || r === void 0 || r.call(s, `post process ${this.name} input`), this.onActivateObservable.notifyObservers(e), this.autoClear && (this.alphaMode === 0 || this.forceAutoClearInAlphaMode) && this._engine.clear(this.clearColor ? this.clearColor : a.clearColor, a._allowPostProcessClearColor, !0, !0), this._reusable && (this._currentRenderTextureInd = (this._currentRenderTextureInd + 1) % 2), _;
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
    return this._shareOutputWithPostProcess ? s = this._shareOutputWithPostProcess.inputTexture : this._forcedOutputTexture ? s = this._forcedOutputTexture : s = this.inputTexture, this.externalTextureSamplerBinding || this._drawWrapper.effect._bindTexture("textureSampler", s == null ? void 0 : s.texture), this._drawWrapper.effect.setVector2("scale", this._scaleRatio), this.onApplyObservable.notifyObservers(this._drawWrapper.effect), (i = (t = B._GetShaderCodeProcessing(this.name)) === null || t === void 0 ? void 0 : t.bindCustomBindings) === null || i === void 0 || i.call(t, this.name, this._drawWrapper.effect), this._drawWrapper.effect;
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
    const e = ee.Serialize(this), t = this.getCamera() || this._scene && this._scene.activeCamera;
    return e.customType = "BABYLON." + this.getClassName(), e.cameraId = t ? t.id : null, e.reusable = this._reusable, e.textureType = this._textureType, e.fragmentUrl = this._fragmentUrl, e.parameters = this._parameters, e.samplers = this._samplers, e.options = this._options, e.defines = this._postProcessDefines, e.textureFormat = this._textureFormat, e.vertexUrl = this._vertexUrl, e.indexParameters = this._indexParameters, e;
  }
  /**
   * Clones this post process
   * @returns a new post process similar to this one
   */
  clone() {
    const e = this.serialize();
    e._engine = this._engine, e.cameraId = null;
    const t = B.Parse(e, this._scene, "");
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
    const s = zt(e.customType);
    if (!s || !s._Parse)
      return null;
    const r = t ? t.getCameraById(e.cameraId) : null;
    return s._Parse(e, r, t, i);
  }
  /**
   * @internal
   */
  static _Parse(e, t, i, s) {
    return ee.Parse(() => new B(e.name, e.fragmentUrl, e.parameters, e.samplers, e.options, t, e.renderTargetSamplingMode, e._engine, e.reusable, e.defines, e.textureType, e.vertexUrl, e.indexParameters, !1, e.textureFormat), e, i, s);
  }
}
B._CustomShaderCodeProcessing = {};
p([
  E()
], B.prototype, "uniqueId", void 0);
p([
  E()
], B.prototype, "name", void 0);
p([
  E()
], B.prototype, "width", void 0);
p([
  E()
], B.prototype, "height", void 0);
p([
  E()
], B.prototype, "renderTargetSamplingMode", void 0);
p([
  oi()
], B.prototype, "clearColor", void 0);
p([
  E()
], B.prototype, "autoClear", void 0);
p([
  E()
], B.prototype, "forceAutoClearInAlphaMode", void 0);
p([
  E()
], B.prototype, "alphaMode", void 0);
p([
  E()
], B.prototype, "alphaConstants", void 0);
p([
  E()
], B.prototype, "enablePixelPerfectMode", void 0);
p([
  E()
], B.prototype, "forceFullscreenViewport", void 0);
p([
  E()
], B.prototype, "scaleMode", void 0);
p([
  E()
], B.prototype, "alwaysForcePOT", void 0);
p([
  E("samples")
], B.prototype, "_samples", void 0);
p([
  E()
], B.prototype, "adaptScaleToCurrentViewport", void 0);
ze("BABYLON.PostProcess", B);
const bi = "kernelBlurVaryingDeclaration", Pi = "varying vec2 sampleCoord{X};";
x.IncludesShadersStore[bi] = Pi;
const Di = "packingFunctions", Li = `vec4 pack(float depth)
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
x.IncludesShadersStore[Di] = Li;
const Fi = "kernelBlurFragment", wi = `#ifdef DOF
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
x.IncludesShadersStore[Fi] = wi;
const Oi = "kernelBlurFragment2", Ni = `#ifdef DOF
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
x.IncludesShadersStore[Oi] = Ni;
const yi = "kernelBlurPixelShader", Ui = `uniform sampler2D textureSampler;
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
x.ShadersStore[yi] = Ui;
const Bi = "kernelBlurVertex", Vi = "sampleCoord{X}=sampleCenter+delta*KERNEL_OFFSET{X};";
x.IncludesShadersStore[Bi] = Vi;
const Xi = "kernelBlurVertexShader", zi = `attribute vec2 position;
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
x.ShadersStore[Xi] = zi;
class Me extends B {
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
  constructor(e, t, i, s, r, a = v.BILINEAR_SAMPLINGMODE, n, o, l = 0, f = "", h = !1, d = 5) {
    super(e, "kernelBlur", ["delta", "direction"], ["circleOfConfusionSampler"], s, r, a, n, o, null, l, "kernelBlur", { varyingCount: 0, depCount: 0 }, !0, d), this._blockCompilation = h, this._packedFloat = !1, this._staticDefines = "", this._staticDefines = f, this.direction = t, this.onApplyObservable.add((u) => {
      this._outputTexture ? u.setFloat2("delta", 1 / this._outputTexture.width * this.direction.x, 1 / this._outputTexture.height * this.direction.y) : u.setFloat2("delta", 1 / this.width * this.direction.x, 1 / this.height * this.direction.y);
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
  updateEffect(e = null, t = null, i = null, s, r, a) {
    this._updateParameters(r, a);
  }
  _updateParameters(e, t) {
    const i = this._kernel, s = (i - 1) / 2;
    let r = [], a = [], n = 0;
    for (let m = 0; m < i; m++) {
      const T = m / (i - 1), I = this._gaussianWeight(T * 2 - 1);
      r[m] = m - s, a[m] = I, n += I;
    }
    for (let m = 0; m < a.length; m++)
      a[m] /= n;
    const o = [], l = [], f = [];
    for (let m = 0; m <= s; m += 2) {
      const T = Math.min(m + 1, Math.floor(s));
      if (m === T)
        f.push({ o: r[m], w: a[m] });
      else {
        const b = T === s, P = a[m] + a[T] * (b ? 0.5 : 1), V = r[m] + 1 / (1 + a[m] / a[T]);
        V === 0 ? (f.push({ o: r[m], w: a[m] }), f.push({ o: r[m + 1], w: a[m + 1] })) : (f.push({ o: V, w: P }), f.push({ o: -V, w: P }));
      }
    }
    for (let m = 0; m < f.length; m++)
      l[m] = f[m].o, o[m] = f[m].w;
    r = l, a = o;
    const h = this.getEngine().getCaps().maxVaryingVectors, d = Math.max(h, 0) - 1;
    let u = Math.min(r.length, d), S = "";
    S += this._staticDefines, this._staticDefines.indexOf("DOF") != -1 && (S += `#define CENTER_WEIGHT ${this._glslFloat(a[u - 1])}\r
`, u--);
    for (let m = 0; m < u; m++)
      S += `#define KERNEL_OFFSET${m} ${this._glslFloat(r[m])}\r
`, S += `#define KERNEL_WEIGHT${m} ${this._glslFloat(a[m])}\r
`;
    let _ = 0;
    for (let m = d; m < r.length; m++)
      S += `#define KERNEL_DEP_OFFSET${_} ${this._glslFloat(r[m])}\r
`, S += `#define KERNEL_DEP_WEIGHT${_} ${this._glslFloat(a[m])}\r
`, _++;
    this.packedFloat && (S += "#define PACKEDFLOAT 1"), this._blockCompilation = !1, super.updateEffect(S, null, null, {
      varyingCount: u,
      depCount: _
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
    return ee.Parse(() => new Me(e.name, e.direction, e.kernel, e.options, t, e.renderTargetSamplingMode, i.getEngine(), e.reusable, e.textureType, void 0, !1), e, i, s);
  }
}
p([
  E("kernel")
], Me.prototype, "_kernel", void 0);
p([
  E("packedFloat")
], Me.prototype, "_packedFloat", void 0);
p([
  hi()
], Me.prototype, "direction", void 0);
ze("BABYLON.BlurPostProcess", Me);
class Pt {
  constructor() {
    this._defines = {}, this._currentRank = 32, this._maxRank = -1, this._mesh = null;
  }
  /**
   * Removes the fallback from the bound mesh.
   */
  unBindMesh() {
    this._mesh = null;
  }
  /**
   * Adds a fallback on the specified property.
   * @param rank The rank of the fallback (Lower ranks will be fallbacked to first)
   * @param define The name of the define in the shader
   */
  addFallback(e, t) {
    this._defines[e] || (e < this._currentRank && (this._currentRank = e), e > this._maxRank && (this._maxRank = e), this._defines[e] = new Array()), this._defines[e].push(t);
  }
  /**
   * Sets the mesh to use CPU skinning when needing to fallback.
   * @param rank The rank of the fallback (Lower ranks will be fallbacked to first)
   * @param mesh The mesh to use the fallbacks.
   */
  addCPUSkinningFallback(e, t) {
    this._mesh = t, e < this._currentRank && (this._currentRank = e), e > this._maxRank && (this._maxRank = e);
  }
  /**
   * Checks to see if more fallbacks are still available.
   */
  get hasMoreFallbacks() {
    return this._currentRank <= this._maxRank;
  }
  /**
   * Removes the defines that should be removed when falling back.
   * @param currentDefines defines the current define statements for the shader.
   * @param effect defines the current effect we try to compile
   * @returns The resulting defines with defines of the current rank removed.
   */
  reduce(e, t) {
    if (this._mesh && this._mesh.computeBonesUsingShaders && this._mesh.numBoneInfluencers > 0) {
      this._mesh.computeBonesUsingShaders = !1, e = e.replace("#define NUM_BONE_INFLUENCERS " + this._mesh.numBoneInfluencers, "#define NUM_BONE_INFLUENCERS 0"), t._bonesComputationForcedToCPU = !0;
      const i = this._mesh.getScene();
      for (let s = 0; s < i.meshes.length; s++) {
        const r = i.meshes[s];
        if (!r.material) {
          !this._mesh.material && r.computeBonesUsingShaders && r.numBoneInfluencers > 0 && (r.computeBonesUsingShaders = !1);
          continue;
        }
        if (!(!r.computeBonesUsingShaders || r.numBoneInfluencers === 0)) {
          if (r.material.getEffect() === t)
            r.computeBonesUsingShaders = !1;
          else if (r.subMeshes) {
            for (const a of r.subMeshes)
              if (a.effect === t) {
                r.computeBonesUsingShaders = !1;
                break;
              }
          }
        }
      }
    } else {
      const i = this._defines[this._currentRank];
      if (i)
        for (let s = 0; s < i.length; s++)
          e = e.replace("#define " + i[s], "");
      this._currentRank++;
    }
    return e;
  }
}
const Wi = "bayerDitherFunctions", ki = `float bayerDither2(vec2 _P) {
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
x.IncludesShadersStore[Wi] = ki;
const Hi = "shadowMapFragmentExtraDeclaration", Gi = `#if SM_FLOAT==0
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
x.IncludesShadersStore[Hi] = Gi;
const $i = "clipPlaneFragmentDeclaration", Yi = `#ifdef CLIPPLANE
varying float fClipDistance;
#endif
#ifdef CLIPPLANE2
varying float fClipDistance2;
#endif
#ifdef CLIPPLANE3
varying float fClipDistance3;
#endif
#ifdef CLIPPLANE4
varying float fClipDistance4;
#endif
#ifdef CLIPPLANE5
varying float fClipDistance5;
#endif
#ifdef CLIPPLANE6
varying float fClipDistance6;
#endif
`;
x.IncludesShadersStore[$i] = Yi;
const Zi = "clipPlaneFragment", ji = `#if defined(CLIPPLANE) || defined(CLIPPLANE2) || defined(CLIPPLANE3) || defined(CLIPPLANE4) || defined(CLIPPLANE5) || defined(CLIPPLANE6)
if (false) {}
#endif
#ifdef CLIPPLANE
else if (fClipDistance>0.0)
{
discard;
}
#endif
#ifdef CLIPPLANE2
else if (fClipDistance2>0.0)
{
discard;
}
#endif
#ifdef CLIPPLANE3
else if (fClipDistance3>0.0)
{
discard;
}
#endif
#ifdef CLIPPLANE4
else if (fClipDistance4>0.0)
{
discard;
}
#endif
#ifdef CLIPPLANE5
else if (fClipDistance5>0.0)
{
discard;
}
#endif
#ifdef CLIPPLANE6
else if (fClipDistance6>0.0)
{
discard;
}
#endif
`;
x.IncludesShadersStore[Zi] = ji;
const Qi = "shadowMapFragment", Ki = `float depthSM=vDepthMetricSM;
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
x.IncludesShadersStore[Qi] = Ki;
const qi = "shadowMapPixelShader", Ji = `#include<shadowMapFragmentExtraDeclaration>
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
x.ShadersStore[qi] = Ji;
const er = "bonesDeclaration", tr = `#if NUM_BONE_INFLUENCERS>0
attribute vec4 matricesIndices;
attribute vec4 matricesWeights;
#if NUM_BONE_INFLUENCERS>4
attribute vec4 matricesIndicesExtra;
attribute vec4 matricesWeightsExtra;
#endif
#ifndef BAKED_VERTEX_ANIMATION_TEXTURE
#ifdef BONETEXTURE
uniform sampler2D boneSampler;
uniform float boneTextureWidth;
#else
uniform mat4 mBones[BonesPerMesh];
#ifdef BONES_VELOCITY_ENABLED
uniform mat4 mPreviousBones[BonesPerMesh];
#endif
#endif
#ifdef BONETEXTURE
#define inline
mat4 readMatrixFromRawSampler(sampler2D smp,float index)
{
float offset=index *4.0;
float dx=1.0/boneTextureWidth;
vec4 m0=texture2D(smp,vec2(dx*(offset+0.5),0.));
vec4 m1=texture2D(smp,vec2(dx*(offset+1.5),0.));
vec4 m2=texture2D(smp,vec2(dx*(offset+2.5),0.));
vec4 m3=texture2D(smp,vec2(dx*(offset+3.5),0.));
return mat4(m0,m1,m2,m3);
}
#endif
#endif
#endif
`;
x.IncludesShadersStore[er] = tr;
const ir = "bakedVertexAnimationDeclaration", rr = `#ifdef BAKED_VERTEX_ANIMATION_TEXTURE
uniform float bakedVertexAnimationTime;
uniform vec2 bakedVertexAnimationTextureSizeInverted;
uniform vec4 bakedVertexAnimationSettings;
uniform sampler2D bakedVertexAnimationTexture;
#ifdef INSTANCES
attribute vec4 bakedVertexAnimationSettingsInstanced;
#endif
#define inline
mat4 readMatrixFromRawSamplerVAT(sampler2D smp,float index,float frame)
{
float offset=index*4.0;
float frameUV=(frame+0.5)*bakedVertexAnimationTextureSizeInverted.y;
float dx=bakedVertexAnimationTextureSizeInverted.x;
vec4 m0=texture2D(smp,vec2(dx*(offset+0.5),frameUV));
vec4 m1=texture2D(smp,vec2(dx*(offset+1.5),frameUV));
vec4 m2=texture2D(smp,vec2(dx*(offset+2.5),frameUV));
vec4 m3=texture2D(smp,vec2(dx*(offset+3.5),frameUV));
return mat4(m0,m1,m2,m3);
}
#endif
`;
x.IncludesShadersStore[ir] = rr;
const sr = "morphTargetsVertexGlobalDeclaration", ar = `#ifdef MORPHTARGETS
uniform float morphTargetInfluences[NUM_MORPH_INFLUENCERS];
#ifdef MORPHTARGETS_TEXTURE 
precision mediump sampler2DArray; 
uniform float morphTargetTextureIndices[NUM_MORPH_INFLUENCERS];
uniform vec3 morphTargetTextureInfo;
uniform sampler2DArray morphTargets;
vec3 readVector3FromRawSampler(int targetIndex,float vertexIndex)
{ 
float y=floor(vertexIndex/morphTargetTextureInfo.y);
float x=vertexIndex-y*morphTargetTextureInfo.y;
vec3 textureUV=vec3((x+0.5)/morphTargetTextureInfo.y,(y+0.5)/morphTargetTextureInfo.z,morphTargetTextureIndices[targetIndex]);
return texture(morphTargets,textureUV).xyz;
}
#endif
#endif
`;
x.IncludesShadersStore[sr] = ar;
const nr = "morphTargetsVertexDeclaration", or = `#ifdef MORPHTARGETS
#ifndef MORPHTARGETS_TEXTURE
attribute vec3 position{X};
#ifdef MORPHTARGETS_NORMAL
attribute vec3 normal{X};
#endif
#ifdef MORPHTARGETS_TANGENT
attribute vec3 tangent{X};
#endif
#ifdef MORPHTARGETS_UV
attribute vec2 uv_{X};
#endif
#endif
#endif
`;
x.IncludesShadersStore[nr] = or;
const lr = "helperFunctions", hr = `const float PI=3.1415926535897932384626433832795;
const float HALF_MIN=5.96046448e-08; 
const float LinearEncodePowerApprox=2.2;
const float GammaEncodePowerApprox=1.0/LinearEncodePowerApprox;
const vec3 LuminanceEncodeApprox=vec3(0.2126,0.7152,0.0722);
const float Epsilon=0.0000001;
#define saturate(x) clamp(x,0.0,1.0)
#define absEps(x) abs(x)+Epsilon
#define maxEps(x) max(x,Epsilon)
#define saturateEps(x) clamp(x,Epsilon,1.0)
mat3 transposeMat3(mat3 inMatrix) {
vec3 i0=inMatrix[0];
vec3 i1=inMatrix[1];
vec3 i2=inMatrix[2];
mat3 outMatrix=mat3(
vec3(i0.x,i1.x,i2.x),
vec3(i0.y,i1.y,i2.y),
vec3(i0.z,i1.z,i2.z)
);
return outMatrix;
}
mat3 inverseMat3(mat3 inMatrix) {
float a00=inMatrix[0][0],a01=inMatrix[0][1],a02=inMatrix[0][2];
float a10=inMatrix[1][0],a11=inMatrix[1][1],a12=inMatrix[1][2];
float a20=inMatrix[2][0],a21=inMatrix[2][1],a22=inMatrix[2][2];
float b01=a22*a11-a12*a21;
float b11=-a22*a10+a12*a20;
float b21=a21*a10-a11*a20;
float det=a00*b01+a01*b11+a02*b21;
return mat3(b01,(-a22*a01+a02*a21),(a12*a01-a02*a11),
b11,(a22*a00-a02*a20),(-a12*a00+a02*a10),
b21,(-a21*a00+a01*a20),(a11*a00-a01*a10))/det;
}
#if USE_EXACT_SRGB_CONVERSIONS
vec3 toLinearSpaceExact(vec3 color)
{
vec3 nearZeroSection=0.0773993808*color;
vec3 remainingSection=pow(0.947867299*(color+vec3(0.055)),vec3(2.4));
#if defined(WEBGL2) || defined(WEBGPU) || defined(NATIVE)
return mix(remainingSection,nearZeroSection,lessThanEqual(color,vec3(0.04045)));
#else
return
vec3(
color.r<=0.04045 ? nearZeroSection.r : remainingSection.r,
color.g<=0.04045 ? nearZeroSection.g : remainingSection.g,
color.b<=0.04045 ? nearZeroSection.b : remainingSection.b);
#endif
}
vec3 toGammaSpaceExact(vec3 color)
{
vec3 nearZeroSection=12.92*color;
vec3 remainingSection=1.055*pow(color,vec3(0.41666))-vec3(0.055);
#if defined(WEBGL2) || defined(WEBGPU) || defined(NATIVE)
return mix(remainingSection,nearZeroSection,lessThanEqual(color,vec3(0.0031308)));
#else
return
vec3(
color.r<=0.0031308 ? nearZeroSection.r : remainingSection.r,
color.g<=0.0031308 ? nearZeroSection.g : remainingSection.g,
color.b<=0.0031308 ? nearZeroSection.b : remainingSection.b);
#endif
}
#endif
float toLinearSpace(float color)
{
#if USE_EXACT_SRGB_CONVERSIONS
float nearZeroSection=0.0773993808*color;
float remainingSection=pow(0.947867299*(color+0.055),2.4);
return color<=0.04045 ? nearZeroSection : remainingSection;
#else
return pow(color,LinearEncodePowerApprox);
#endif
}
vec3 toLinearSpace(vec3 color)
{
#if USE_EXACT_SRGB_CONVERSIONS
return toLinearSpaceExact(color);
#else
return pow(color,vec3(LinearEncodePowerApprox));
#endif
}
vec4 toLinearSpace(vec4 color)
{
#if USE_EXACT_SRGB_CONVERSIONS
return vec4(toLinearSpaceExact(color.rgb),color.a);
#else
return vec4(pow(color.rgb,vec3(LinearEncodePowerApprox)),color.a);
#endif
}
float toGammaSpace(float color)
{
#if USE_EXACT_SRGB_CONVERSIONS
float nearZeroSection=12.92*color;
float remainingSection=1.055*pow(color,0.41666)-0.055;
return color<=0.0031308 ? nearZeroSection : remainingSection;
#else
return pow(color,GammaEncodePowerApprox);
#endif
}
vec3 toGammaSpace(vec3 color)
{
#if USE_EXACT_SRGB_CONVERSIONS
return toGammaSpaceExact(color);
#else
return pow(color,vec3(GammaEncodePowerApprox));
#endif
}
vec4 toGammaSpace(vec4 color)
{
#if USE_EXACT_SRGB_CONVERSIONS
return vec4(toGammaSpaceExact(color.rgb),color.a);
#else
return vec4(pow(color.rgb,vec3(GammaEncodePowerApprox)),color.a);
#endif
}
float square(float value)
{
return value*value;
}
vec3 square(vec3 value)
{
return value*value;
}
float pow5(float value) {
float sq=value*value;
return sq*sq*value;
}
float getLuminance(vec3 color)
{
return clamp(dot(color,LuminanceEncodeApprox),0.,1.);
}
float getRand(vec2 seed) {
return fract(sin(dot(seed.xy ,vec2(12.9898,78.233)))*43758.5453);
}
float dither(vec2 seed,float varianceAmount) {
float rand=getRand(seed);
float normVariance=varianceAmount/255.0;
float dither=mix(-normVariance,normVariance,rand);
return dither;
}
const float rgbdMaxRange=255.0;
vec4 toRGBD(vec3 color) {
float maxRGB=maxEps(max(color.r,max(color.g,color.b)));
float D =max(rgbdMaxRange/maxRGB,1.);
D =clamp(floor(D)/255.0,0.,1.);
vec3 rgb=color.rgb*D;
rgb=toGammaSpace(rgb);
return vec4(clamp(rgb,0.,1.),D); 
}
vec3 fromRGBD(vec4 rgbd) {
rgbd.rgb=toLinearSpace(rgbd.rgb);
return rgbd.rgb/rgbd.a;
}
vec3 parallaxCorrectNormal( vec3 vertexPos,vec3 origVec,vec3 cubeSize,vec3 cubePos ) {
vec3 invOrigVec=vec3(1.0,1.0,1.0)/origVec;
vec3 halfSize=cubeSize*0.5;
vec3 intersecAtMaxPlane=(cubePos+halfSize-vertexPos)*invOrigVec;
vec3 intersecAtMinPlane=(cubePos-halfSize-vertexPos)*invOrigVec;
vec3 largestIntersec=max(intersecAtMaxPlane,intersecAtMinPlane);
float distance=min(min(largestIntersec.x,largestIntersec.y),largestIntersec.z);
vec3 intersectPositionWS=vertexPos+origVec*distance;
return intersectPositionWS-cubePos;
}
`;
x.IncludesShadersStore[lr] = hr;
const fr = "sceneVertexDeclaration", dr = `uniform mat4 viewProjection;
#ifdef MULTIVIEW
uniform mat4 viewProjectionR;
#endif
uniform mat4 view;
uniform mat4 projection;
uniform vec4 vEyePosition;
`;
x.IncludesShadersStore[fr] = dr;
const cr = "meshVertexDeclaration", ur = `uniform mat4 world;
uniform float visibility;
`;
x.IncludesShadersStore[cr] = ur;
const pr = "shadowMapVertexDeclaration", mr = `#include<sceneVertexDeclaration>
#include<meshVertexDeclaration>
`;
x.IncludesShadersStore[pr] = mr;
const _r = "sceneUboDeclaration", gr = `layout(std140,column_major) uniform;
uniform Scene {
mat4 viewProjection;
#ifdef MULTIVIEW
mat4 viewProjectionR;
#endif 
mat4 view;
mat4 projection;
vec4 vEyePosition;
};
`;
x.IncludesShadersStore[_r] = gr;
const vr = "meshUboDeclaration", Sr = `#ifdef WEBGL2
uniform mat4 world;
uniform float visibility;
#else
layout(std140,column_major) uniform;
uniform Mesh
{
mat4 world;
float visibility;
};
#endif
#define WORLD_UBO
`;
x.IncludesShadersStore[vr] = Sr;
const Er = "shadowMapUboDeclaration", Tr = `layout(std140,column_major) uniform;
#include<sceneUboDeclaration>
#include<meshUboDeclaration>
`;
x.IncludesShadersStore[Er] = Tr;
const xr = "shadowMapVertexExtraDeclaration", Ar = `#if SM_NORMALBIAS==1
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
x.IncludesShadersStore[xr] = Ar;
const Mr = "clipPlaneVertexDeclaration", Cr = `#ifdef CLIPPLANE
uniform vec4 vClipPlane;
varying float fClipDistance;
#endif
#ifdef CLIPPLANE2
uniform vec4 vClipPlane2;
varying float fClipDistance2;
#endif
#ifdef CLIPPLANE3
uniform vec4 vClipPlane3;
varying float fClipDistance3;
#endif
#ifdef CLIPPLANE4
uniform vec4 vClipPlane4;
varying float fClipDistance4;
#endif
#ifdef CLIPPLANE5
uniform vec4 vClipPlane5;
varying float fClipDistance5;
#endif
#ifdef CLIPPLANE6
uniform vec4 vClipPlane6;
varying float fClipDistance6;
#endif
`;
x.IncludesShadersStore[Mr] = Cr;
const Rr = "morphTargetsVertexGlobal", Ir = `#ifdef MORPHTARGETS
#ifdef MORPHTARGETS_TEXTURE
float vertexID;
#endif
#endif
`;
x.IncludesShadersStore[Rr] = Ir;
const br = "morphTargetsVertex", Pr = `#ifdef MORPHTARGETS
#ifdef MORPHTARGETS_TEXTURE 
vertexID=float(gl_VertexID)*morphTargetTextureInfo.x;
positionUpdated+=(readVector3FromRawSampler({X},vertexID)-position)*morphTargetInfluences[{X}];
vertexID+=1.0;
#ifdef MORPHTARGETS_NORMAL
normalUpdated+=(readVector3FromRawSampler({X},vertexID) -normal)*morphTargetInfluences[{X}];
vertexID+=1.0;
#endif
#ifdef MORPHTARGETS_UV
uvUpdated+=(readVector3FromRawSampler({X},vertexID).xy-uv)*morphTargetInfluences[{X}];
vertexID+=1.0;
#endif
#ifdef MORPHTARGETS_TANGENT
tangentUpdated.xyz+=(readVector3FromRawSampler({X},vertexID) -tangent.xyz)*morphTargetInfluences[{X}];
#endif
#else
positionUpdated+=(position{X}-position)*morphTargetInfluences[{X}];
#ifdef MORPHTARGETS_NORMAL
normalUpdated+=(normal{X}-normal)*morphTargetInfluences[{X}];
#endif
#ifdef MORPHTARGETS_TANGENT
tangentUpdated.xyz+=(tangent{X}-tangent.xyz)*morphTargetInfluences[{X}];
#endif
#ifdef MORPHTARGETS_UV
uvUpdated+=(uv_{X}-uv)*morphTargetInfluences[{X}];
#endif
#endif
#endif
`;
x.IncludesShadersStore[br] = Pr;
const Dr = "instancesVertex", Lr = `#ifdef INSTANCES
mat4 finalWorld=mat4(world0,world1,world2,world3);
#if defined(PREPASS_VELOCITY) || defined(VELOCITY)
mat4 finalPreviousWorld=mat4(previousWorld0,previousWorld1,previousWorld2,previousWorld3);
#endif
#ifdef THIN_INSTANCES
finalWorld=world*finalWorld;
#if defined(PREPASS_VELOCITY) || defined(VELOCITY)
finalPreviousWorld=previousWorld*finalPreviousWorld;
#endif
#endif
#else
mat4 finalWorld=world;
#if defined(PREPASS_VELOCITY) || defined(VELOCITY)
mat4 finalPreviousWorld=previousWorld;
#endif
#endif
`;
x.IncludesShadersStore[Dr] = Lr;
const Fr = "bonesVertex", wr = `#ifndef BAKED_VERTEX_ANIMATION_TEXTURE
#if NUM_BONE_INFLUENCERS>0
mat4 influence;
#ifdef BONETEXTURE
influence=readMatrixFromRawSampler(boneSampler,matricesIndices[0])*matricesWeights[0];
#if NUM_BONE_INFLUENCERS>1
influence+=readMatrixFromRawSampler(boneSampler,matricesIndices[1])*matricesWeights[1];
#endif
#if NUM_BONE_INFLUENCERS>2
influence+=readMatrixFromRawSampler(boneSampler,matricesIndices[2])*matricesWeights[2];
#endif
#if NUM_BONE_INFLUENCERS>3
influence+=readMatrixFromRawSampler(boneSampler,matricesIndices[3])*matricesWeights[3];
#endif
#if NUM_BONE_INFLUENCERS>4
influence+=readMatrixFromRawSampler(boneSampler,matricesIndicesExtra[0])*matricesWeightsExtra[0];
#endif
#if NUM_BONE_INFLUENCERS>5
influence+=readMatrixFromRawSampler(boneSampler,matricesIndicesExtra[1])*matricesWeightsExtra[1];
#endif
#if NUM_BONE_INFLUENCERS>6
influence+=readMatrixFromRawSampler(boneSampler,matricesIndicesExtra[2])*matricesWeightsExtra[2];
#endif
#if NUM_BONE_INFLUENCERS>7
influence+=readMatrixFromRawSampler(boneSampler,matricesIndicesExtra[3])*matricesWeightsExtra[3];
#endif
#else
influence=mBones[int(matricesIndices[0])]*matricesWeights[0];
#if NUM_BONE_INFLUENCERS>1
influence+=mBones[int(matricesIndices[1])]*matricesWeights[1];
#endif
#if NUM_BONE_INFLUENCERS>2
influence+=mBones[int(matricesIndices[2])]*matricesWeights[2];
#endif
#if NUM_BONE_INFLUENCERS>3
influence+=mBones[int(matricesIndices[3])]*matricesWeights[3];
#endif
#if NUM_BONE_INFLUENCERS>4
influence+=mBones[int(matricesIndicesExtra[0])]*matricesWeightsExtra[0];
#endif
#if NUM_BONE_INFLUENCERS>5
influence+=mBones[int(matricesIndicesExtra[1])]*matricesWeightsExtra[1];
#endif
#if NUM_BONE_INFLUENCERS>6
influence+=mBones[int(matricesIndicesExtra[2])]*matricesWeightsExtra[2];
#endif
#if NUM_BONE_INFLUENCERS>7
influence+=mBones[int(matricesIndicesExtra[3])]*matricesWeightsExtra[3];
#endif
#endif
finalWorld=finalWorld*influence;
#endif
#endif
`;
x.IncludesShadersStore[Fr] = wr;
const Or = "bakedVertexAnimation", Nr = `#ifdef BAKED_VERTEX_ANIMATION_TEXTURE
{
#ifdef INSTANCES
#define BVASNAME bakedVertexAnimationSettingsInstanced
#else
#define BVASNAME bakedVertexAnimationSettings
#endif
float VATStartFrame=BVASNAME.x;
float VATEndFrame=BVASNAME.y;
float VATOffsetFrame=BVASNAME.z;
float VATSpeed=BVASNAME.w;
float totalFrames=VATEndFrame-VATStartFrame+1.0;
float time=bakedVertexAnimationTime*VATSpeed/totalFrames;
float frameCorrection=time<1.0 ? 0.0 : 1.0;
float numOfFrames=totalFrames-frameCorrection;
float VATFrameNum=fract(time)*numOfFrames;
VATFrameNum=mod(VATFrameNum+VATOffsetFrame,numOfFrames);
VATFrameNum=floor(VATFrameNum);
VATFrameNum+=VATStartFrame+frameCorrection;
mat4 VATInfluence;
VATInfluence=readMatrixFromRawSamplerVAT(bakedVertexAnimationTexture,matricesIndices[0],VATFrameNum)*matricesWeights[0];
#if NUM_BONE_INFLUENCERS>1
VATInfluence+=readMatrixFromRawSamplerVAT(bakedVertexAnimationTexture,matricesIndices[1],VATFrameNum)*matricesWeights[1];
#endif
#if NUM_BONE_INFLUENCERS>2
VATInfluence+=readMatrixFromRawSamplerVAT(bakedVertexAnimationTexture,matricesIndices[2],VATFrameNum)*matricesWeights[2];
#endif
#if NUM_BONE_INFLUENCERS>3
VATInfluence+=readMatrixFromRawSamplerVAT(bakedVertexAnimationTexture,matricesIndices[3],VATFrameNum)*matricesWeights[3];
#endif
#if NUM_BONE_INFLUENCERS>4
VATInfluence+=readMatrixFromRawSamplerVAT(bakedVertexAnimationTexture,matricesIndicesExtra[0],VATFrameNum)*matricesWeightsExtra[0];
#endif
#if NUM_BONE_INFLUENCERS>5
VATInfluence+=readMatrixFromRawSamplerVAT(bakedVertexAnimationTexture,matricesIndicesExtra[1],VATFrameNum)*matricesWeightsExtra[1];
#endif
#if NUM_BONE_INFLUENCERS>6
VATInfluence+=readMatrixFromRawSamplerVAT(bakedVertexAnimationTexture,matricesIndicesExtra[2],VATFrameNum)*matricesWeightsExtra[2];
#endif
#if NUM_BONE_INFLUENCERS>7
VATInfluence+=readMatrixFromRawSamplerVAT(bakedVertexAnimationTexture,matricesIndicesExtra[3],VATFrameNum)*matricesWeightsExtra[3];
#endif
finalWorld=finalWorld*VATInfluence;
}
#endif
`;
x.IncludesShadersStore[Or] = Nr;
const yr = "shadowMapVertexNormalBias", Ur = `#if SM_NORMALBIAS==1
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
x.IncludesShadersStore[yr] = Ur;
const Br = "shadowMapVertexMetric", Vr = `#if SM_USEDISTANCE==1
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
x.IncludesShadersStore[Br] = Vr;
const Xr = "clipPlaneVertex", zr = `#ifdef CLIPPLANE
fClipDistance=dot(worldPos,vClipPlane);
#endif
#ifdef CLIPPLANE2
fClipDistance2=dot(worldPos,vClipPlane2);
#endif
#ifdef CLIPPLANE3
fClipDistance3=dot(worldPos,vClipPlane3);
#endif
#ifdef CLIPPLANE4
fClipDistance4=dot(worldPos,vClipPlane4);
#endif
#ifdef CLIPPLANE5
fClipDistance5=dot(worldPos,vClipPlane5);
#endif
#ifdef CLIPPLANE6
fClipDistance6=dot(worldPos,vClipPlane6);
#endif
`;
x.IncludesShadersStore[Xr] = zr;
const Wr = "shadowMapVertexShader", kr = `attribute vec3 position;
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
x.ShadersStore[Wr] = kr;
const Hr = "depthBoxBlurPixelShader", Gr = `varying vec2 vUV;
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
x.ShadersStore[Hr] = Gr;
const $r = "shadowMapFragmentSoftTransparentShadow", Yr = `#if SM_SOFTTRANSPARENTSHADOW==1
if ((bayerDither8(floor(mod(gl_FragCoord.xy,8.0))))/64.0>=softTransparentShadowSM*alpha) discard;
#endif
`;
x.IncludesShadersStore[$r] = Yr;
class A {
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
      if (e === A.FILTER_BLUREXPONENTIALSHADOWMAP) {
        this.useExponentialShadowMap = !0;
        return;
      } else if (e === A.FILTER_BLURCLOSEEXPONENTIALSHADOWMAP) {
        this.useCloseExponentialShadowMap = !0;
        return;
      } else if (e === A.FILTER_PCF || e === A.FILTER_PCSS) {
        this.usePoissonSampling = !0;
        return;
      }
    }
    if ((e === A.FILTER_PCF || e === A.FILTER_PCSS) && !this._scene.getEngine()._features.supportShadowSamplers) {
      this.usePoissonSampling = !0;
      return;
    }
    this._filter !== e && (this._filter = e, this._disposeBlurPostProcesses(), this._applyFilterValues(), this._light._markMeshesAsLightDirty());
  }
  /**
   * Gets if the current filter is set to Poisson Sampling.
   */
  get usePoissonSampling() {
    return this.filter === A.FILTER_POISSONSAMPLING;
  }
  /**
   * Sets the current filter to Poisson Sampling.
   */
  set usePoissonSampling(e) {
    const t = this._validateFilter(A.FILTER_POISSONSAMPLING);
    !e && this.filter !== A.FILTER_POISSONSAMPLING || (this.filter = e ? t : A.FILTER_NONE);
  }
  /**
   * Gets if the current filter is set to ESM.
   */
  get useExponentialShadowMap() {
    return this.filter === A.FILTER_EXPONENTIALSHADOWMAP;
  }
  /**
   * Sets the current filter is to ESM.
   */
  set useExponentialShadowMap(e) {
    const t = this._validateFilter(A.FILTER_EXPONENTIALSHADOWMAP);
    !e && this.filter !== A.FILTER_EXPONENTIALSHADOWMAP || (this.filter = e ? t : A.FILTER_NONE);
  }
  /**
   * Gets if the current filter is set to filtered ESM.
   */
  get useBlurExponentialShadowMap() {
    return this.filter === A.FILTER_BLUREXPONENTIALSHADOWMAP;
  }
  /**
   * Gets if the current filter is set to filtered  ESM.
   */
  set useBlurExponentialShadowMap(e) {
    const t = this._validateFilter(A.FILTER_BLUREXPONENTIALSHADOWMAP);
    !e && this.filter !== A.FILTER_BLUREXPONENTIALSHADOWMAP || (this.filter = e ? t : A.FILTER_NONE);
  }
  /**
   * Gets if the current filter is set to "close ESM" (using the inverse of the
   * exponential to prevent steep falloff artifacts).
   */
  get useCloseExponentialShadowMap() {
    return this.filter === A.FILTER_CLOSEEXPONENTIALSHADOWMAP;
  }
  /**
   * Sets the current filter to "close ESM" (using the inverse of the
   * exponential to prevent steep falloff artifacts).
   */
  set useCloseExponentialShadowMap(e) {
    const t = this._validateFilter(A.FILTER_CLOSEEXPONENTIALSHADOWMAP);
    !e && this.filter !== A.FILTER_CLOSEEXPONENTIALSHADOWMAP || (this.filter = e ? t : A.FILTER_NONE);
  }
  /**
   * Gets if the current filter is set to filtered "close ESM" (using the inverse of the
   * exponential to prevent steep falloff artifacts).
   */
  get useBlurCloseExponentialShadowMap() {
    return this.filter === A.FILTER_BLURCLOSEEXPONENTIALSHADOWMAP;
  }
  /**
   * Sets the current filter to filtered "close ESM" (using the inverse of the
   * exponential to prevent steep falloff artifacts).
   */
  set useBlurCloseExponentialShadowMap(e) {
    const t = this._validateFilter(A.FILTER_BLURCLOSEEXPONENTIALSHADOWMAP);
    !e && this.filter !== A.FILTER_BLURCLOSEEXPONENTIALSHADOWMAP || (this.filter = e ? t : A.FILTER_NONE);
  }
  /**
   * Gets if the current filter is set to "PCF" (percentage closer filtering).
   */
  get usePercentageCloserFiltering() {
    return this.filter === A.FILTER_PCF;
  }
  /**
   * Sets the current filter to "PCF" (percentage closer filtering).
   */
  set usePercentageCloserFiltering(e) {
    const t = this._validateFilter(A.FILTER_PCF);
    !e && this.filter !== A.FILTER_PCF || (this.filter = e ? t : A.FILTER_NONE);
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
    return this.filter === A.FILTER_PCSS;
  }
  /**
   * Sets the current filter to "PCSS" (contact hardening).
   */
  set useContactHardeningShadow(e) {
    const t = this._validateFilter(A.FILTER_PCSS);
    !e && this.filter !== A.FILTER_PCSS || (this.filter = e ? t : A.FILTER_NONE);
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
    return A.CLASSNAME;
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
    this.onBeforeShadowMapRenderObservable = new G(), this.onAfterShadowMapRenderObservable = new G(), this.onBeforeShadowMapRenderMeshObservable = new G(), this.onAfterShadowMapRenderMeshObservable = new G(), this._bias = 5e-5, this._normalBias = 0, this._blurBoxOffset = 1, this._blurScale = 2, this._blurKernel = 1, this._useKernelBlur = !1, this._filter = A.FILTER_NONE, this._filteringQuality = A.QUALITY_HIGH, this._contactHardeningLightSizeUVRatio = 0.1, this._darkness = 0, this._transparencyShadow = !1, this.enableSoftTransparentShadow = !1, this.useOpacityTextureForTransparentShadow = !1, this.frustumEdgeFalloff = 0, this.forceBackFacesOnly = !1, this._lightDirection = C.Zero(), this._viewMatrix = F.Zero(), this._projectionMatrix = F.Zero(), this._transformMatrix = F.Zero(), this._cachedPosition = new C(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE), this._cachedDirection = new C(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE), this._currentFaceIndex = 0, this._currentFaceIndexCache = 0, this._defaultTextureMatrix = F.Identity(), this._mapSize = e, this._light = t, this._scene = t.getScene(), this._camera = s ?? null;
    let r = t._shadowGenerators;
    r || (r = t._shadowGenerators = /* @__PURE__ */ new Map()), r.set(this._camera, this), this.id = t.id, this._useUBO = this._scene.getEngine().supportsUniformBuffers, this._useUBO && (this._sceneUBOs = [], this._sceneUBOs.push(this._scene.createSceneUniformBuffer(`Scene for Shadow Generator (light "${this._light.name}")`))), A._SceneComponentInitialization(this._scene);
    const a = this._scene.getEngine().getCaps();
    i ? a.textureFloatRender && a.textureFloatLinearFiltering ? this._textureType = 1 : a.textureHalfFloatRender && a.textureHalfFloatLinearFiltering ? this._textureType = 2 : this._textureType = 0 : a.textureHalfFloatRender && a.textureHalfFloatLinearFiltering ? this._textureType = 2 : a.textureFloatRender && a.textureFloatLinearFiltering ? this._textureType = 1 : this._textureType = 0, this._initializeGenerator(), this._applyFilterValues();
  }
  _initializeGenerator() {
    this._light._markMeshesAsLightDirty(), this._initializeShadowMap();
  }
  _createTargetRenderTexture() {
    const e = this._scene.getEngine();
    e._features.supportDepthStencilTexture ? (this._shadowMap = new ae(this._light.name + "_shadowMap", this._mapSize, this._scene, !1, !0, this._textureType, this._light.needCube(), void 0, !1, !1), this._shadowMap.createDepthStencilTexture(e.useReverseDepthBuffer ? 516 : 513, !0)) : this._shadowMap = new ae(this._light.name + "_shadowMap", this._mapSize, this._scene, !1, !0, this._textureType, this._light.needCube());
  }
  _initializeShadowMap() {
    if (this._createTargetRenderTexture(), this._shadowMap === null)
      return;
    this._shadowMap.wrapU = v.CLAMP_ADDRESSMODE, this._shadowMap.wrapV = v.CLAMP_ADDRESSMODE, this._shadowMap.anisotropicFilteringLevel = 1, this._shadowMap.updateSamplingMode(v.BILINEAR_SAMPLINGMODE), this._shadowMap.renderParticles = !1, this._shadowMap.ignoreCameraViewport = !0, this._storedUniqueId && (this._shadowMap.uniqueId = this._storedUniqueId), this._shadowMap.customRenderFunction = this._renderForShadowMap.bind(this), this._shadowMap.customIsReadyFunction = () => !0;
    const e = this._scene.getEngine();
    this._shadowMap.onBeforeBindObservable.add(() => {
      var s;
      this._currentSceneUBO = this._scene.getSceneUniformBuffer(), (s = e._debugPushGroup) === null || s === void 0 || s.call(e, `shadow map generation for pass id ${e.currentRenderPassId}`, 1);
    }), this._shadowMap.onBeforeRenderObservable.add((s) => {
      this._sceneUBOs && this._scene.setSceneUniformBuffer(this._sceneUBOs[0]), this._currentFaceIndex = s, this._filter === A.FILTER_PCF && e.setColorWrite(!1), this.getTransformMatrix(), this._scene.setTransformMatrix(this._viewMatrix, this._projectionMatrix), this._useUBO && (this._scene.getSceneUniformBuffer().unbindEffect(), this._scene.finalizeSceneUbo());
    }), this._shadowMap.onAfterUnbindObservable.add(() => {
      var s, r;
      if (this._sceneUBOs && this._scene.setSceneUniformBuffer(this._currentSceneUBO), this._scene.updateTransformMatrix(), this._filter === A.FILTER_PCF && e.setColorWrite(!0), !this.useBlurExponentialShadowMap && !this.useBlurCloseExponentialShadowMap) {
        (s = e._debugPopGroup) === null || s === void 0 || s.call(e, 1);
        return;
      }
      const a = this.getShadowMapForRendering();
      a && (this._scene.postProcessManager.directRender(this._blurPostProcesses, a.renderTarget, !0), e.unBindFramebuffer(a.renderTarget, !0), (r = e._debugPopGroup) === null || r === void 0 || r.call(e, 1));
    });
    const t = new Ve(0, 0, 0, 0), i = new Ve(1, 1, 1, 1);
    this._shadowMap.onClearObservable.add((s) => {
      this._filter === A.FILTER_PCF ? s.clear(i, !1, !0, !1) : this.useExponentialShadowMap || this.useBlurExponentialShadowMap ? s.clear(t, !0, !0, !1) : s.clear(i, !0, !0, !1);
    }), this._shadowMap.onResizeObservable.add((s) => {
      this._storedUniqueId = this._shadowMap.uniqueId, this._mapSize = s.getRenderSize(), this._light._markMeshesAsLightDirty(), this.recreateShadowMap();
    });
    for (let s = xt.MIN_RENDERINGGROUPS; s < xt.MAX_RENDERINGGROUPS; s++)
      this._shadowMap.setRenderingAutoClearDepthStencil(s, !1);
  }
  _initializeBlurRTTAndPostProcesses() {
    const e = this._scene.getEngine(), t = this._mapSize / this.blurScale;
    (!this.useKernelBlur || this.blurScale !== 1) && (this._shadowMap2 = new ae(this._light.name + "_shadowMap2", t, this._scene, !1, !0, this._textureType, void 0, void 0, !1), this._shadowMap2.wrapU = v.CLAMP_ADDRESSMODE, this._shadowMap2.wrapV = v.CLAMP_ADDRESSMODE, this._shadowMap2.updateSamplingMode(v.BILINEAR_SAMPLINGMODE)), this.useKernelBlur ? (this._kernelBlurXPostprocess = new Me(this._light.name + "KernelBlurX", new Ge(1, 0), this.blurKernel, 1, null, v.BILINEAR_SAMPLINGMODE, e, !1, this._textureType), this._kernelBlurXPostprocess.width = t, this._kernelBlurXPostprocess.height = t, this._kernelBlurXPostprocess.externalTextureSamplerBinding = !0, this._kernelBlurXPostprocess.onApplyObservable.add((i) => {
      i.setTexture("textureSampler", this._shadowMap);
    }), this._kernelBlurYPostprocess = new Me(this._light.name + "KernelBlurY", new Ge(0, 1), this.blurKernel, 1, null, v.BILINEAR_SAMPLINGMODE, e, !1, this._textureType), this._kernelBlurXPostprocess.autoClear = !1, this._kernelBlurYPostprocess.autoClear = !1, this._textureType === 0 && (this._kernelBlurXPostprocess.packedFloat = !0, this._kernelBlurYPostprocess.packedFloat = !0), this._blurPostProcesses = [this._kernelBlurXPostprocess, this._kernelBlurYPostprocess]) : (this._boxBlurPostprocess = new B(this._light.name + "DepthBoxBlur", "depthBoxBlur", ["screenSize", "boxOffset"], [], 1, null, v.BILINEAR_SAMPLINGMODE, e, !1, "#define OFFSET " + this._blurBoxOffset, this._textureType), this._boxBlurPostprocess.externalTextureSamplerBinding = !0, this._boxBlurPostprocess.onApplyObservable.add((i) => {
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
    const r = e.getRenderingMesh(), a = e.getEffectiveMesh(), n = this._scene, o = n.getEngine(), l = e.getMaterial();
    if (a._internalAbstractMeshDataInfo._isActiveIntermediate = !1, !l || e.verticesCount === 0 || e._renderId === n.getRenderId())
      return;
    const f = a._getWorldMatrixDeterminant() < 0;
    let h = (i = r.overrideMaterialSideOrientation) !== null && i !== void 0 ? i : l.sideOrientation;
    f && (h = h === 0 ? 1 : 0);
    const d = h === 0;
    o.setState(l.backFaceCulling, void 0, void 0, d, l.cullBackFaces);
    const u = r._getInstancesRenderList(e._id, !!e.getReplacementMesh());
    if (u.mustReturn)
      return;
    const S = o.getCaps().instancedArrays && (u.visibleInstances[e._id] !== null && u.visibleInstances[e._id] !== void 0 || r.hasThinInstances);
    if (!(this.customAllowRendering && !this.customAllowRendering(e)))
      if (this.isReady(e, S, t)) {
        e._renderId = n.getRenderId();
        const _ = l.shadowDepthWrapper, m = (s = _ == null ? void 0 : _.getEffect(e, this, o.currentRenderPassId)) !== null && s !== void 0 ? s : e._getDrawWrapper(), T = Ct.GetEffect(m);
        o.enableEffect(m), S || r._bind(e, T, l.fillMode), this.getTransformMatrix(), T.setFloat3("biasAndScaleSM", this.bias, this.normalBias, this.depthScale), this.getLight().getTypeID() === $e.LIGHTTYPEID_DIRECTIONALLIGHT ? T.setVector3("lightDataSM", this._cachedDirection) : T.setVector3("lightDataSM", this._cachedPosition);
        const I = this._getCamera();
        if (I && T.setFloat2("depthValuesSM", this.getLight().getDepthMinZ(I), this.getLight().getDepthMinZ(I) + this.getLight().getDepthMaxZ(I)), t && this.enableSoftTransparentShadow && T.setFloat("softTransparentShadowSM", a.visibility * l.alpha), _)
          e._setMainDrawWrapperOverride(m), _.standalone ? _.baseMaterial.bindForSubMesh(a.getWorldMatrix(), r, e) : l.bindForSubMesh(a.getWorldMatrix(), r, e), e._setMainDrawWrapperOverride(null);
        else {
          if (this._opacityTexture && (T.setTexture("diffuseSampler", this._opacityTexture), T.setMatrix("diffuseMatrix", this._opacityTexture.getTextureMatrix() || this._defaultTextureMatrix)), r.useBones && r.computeBonesUsingShaders && r.skeleton) {
            const P = r.skeleton;
            if (P.isUsingTextureForMatrices) {
              const V = P.getTransformMatrixTexture(r);
              if (!V)
                return;
              T.setTexture("boneSampler", V), T.setFloat("boneTextureWidth", 4 * (P.bones.length + 1));
            } else
              T.setMatrices("mBones", P.getTransformMatrices(r));
          }
          D.BindMorphTargetParameters(r, T), r.morphTargetManager && r.morphTargetManager.isUsingTextureForTargets && r.morphTargetManager._bind(T), ot(T, l, n);
        }
        !this._useUBO && !_ && this._bindCustomEffectForRenderSubMeshForShadowMap(e, T, a), D.BindSceneUniformBuffer(T, this._scene.getSceneUniformBuffer()), this._scene.getSceneUniformBuffer().bindUniformBuffer();
        const b = a.getWorldMatrix();
        S && (a.getMeshUniformBuffer().bindToEffect(T, "Mesh"), a.transferToEffect(b)), this.forceBackFacesOnly && o.setState(!0, 0, !1, !0, l.cullBackFaces), this.onBeforeShadowMapRenderMeshObservable.notifyObservers(r), this.onBeforeShadowMapRenderObservable.notifyObservers(T), r._processRendering(a, e, T, l.fillMode, u, S, (P, V) => {
          a !== r && !P ? (r.getMeshUniformBuffer().bindToEffect(T, "Mesh"), r.transferToEffect(V)) : (a.getMeshUniformBuffer().bindToEffect(T, "Mesh"), a.transferToEffect(P ? V : b));
        }), this.forceBackFacesOnly && o.setState(!0, 0, !1, !1, l.cullBackFaces), this.onAfterShadowMapRenderObservable.notifyObservers(T), this.onAfterShadowMapRenderMeshObservable.notifyObservers(r);
      } else
        this._shadowMap && this._shadowMap.resetRefreshCounter();
  }
  _applyFilterValues() {
    this._shadowMap && (this.filter === A.FILTER_NONE || this.filter === A.FILTER_PCSS ? this._shadowMap.updateSamplingMode(v.NEAREST_SAMPLINGMODE) : this._shadowMap.updateSamplingMode(v.BILINEAR_SAMPLINGMODE));
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
    const a = new Array();
    for (const l of r)
      a.push(...l.subMeshes);
    if (a.length === 0) {
      e && e(this);
      return;
    }
    let n = 0;
    const o = () => {
      var l, f;
      if (!(!this._scene || !this._scene.getEngine())) {
        for (; this.isReady(a[n], i.useInstances, (f = (l = a[n].getMaterial()) === null || l === void 0 ? void 0 : l.needAlphaBlendingForMesh(a[n].getMesh())) !== null && f !== void 0 ? f : !1); )
          if (n++, n >= a.length) {
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
    return i.push("#define SM_NORMALBIAS " + (this.normalBias && r.isVerticesDataPresent(U.NormalKind) ? "1" : "0")), i.push("#define SM_DIRECTIONINLIGHTDATA " + (this.getLight().getTypeID() === $e.LIGHTTYPEID_DIRECTIONALLIGHT ? "1" : "0")), i.push("#define SM_USEDISTANCE " + (this._light.needCube() ? "1" : "0")), i.push("#define SM_SOFTTRANSPARENTSHADOW " + (this.enableSoftTransparentShadow && s ? "1" : "0")), this._isReadyCustomDefines(i, e, t), i;
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
    const r = e.getMaterial(), a = r == null ? void 0 : r.shadowDepthWrapper;
    if (this._opacityTexture = null, !r)
      return !1;
    const n = [];
    if (this._prepareShadowDefines(e, t, n, i), a) {
      if (!a.isReadyForSubMesh(e, n, this, t, this._scene.getEngine().currentRenderPassId))
        return !1;
    } else {
      const o = e._getDrawWrapper(void 0, !0);
      let l = o.effect, f = o.defines;
      const h = [U.PositionKind], d = e.getMesh();
      this.normalBias && d.isVerticesDataPresent(U.NormalKind) && (h.push(U.NormalKind), n.push("#define NORMAL"), d.nonUniformScaling && n.push("#define NONUNIFORMSCALING"));
      const u = r.needAlphaTesting();
      if ((u || r.needAlphaBlending()) && (this.useOpacityTextureForTransparentShadow ? this._opacityTexture = r.opacityTexture : this._opacityTexture = r.getAlphaTestTexture(), this._opacityTexture)) {
        if (!this._opacityTexture.isReady())
          return !1;
        const I = (s = r.alphaCutOff) !== null && s !== void 0 ? s : A.DEFAULT_ALPHA_CUTOFF;
        n.push("#define ALPHATEXTURE"), u && n.push(`#define ALPHATESTVALUE ${I}${I % 1 === 0 ? "." : ""}`), d.isVerticesDataPresent(U.UVKind) && (h.push(U.UVKind), n.push("#define UV1")), d.isVerticesDataPresent(U.UV2Kind) && this._opacityTexture.coordinatesIndex === 1 && (h.push(U.UV2Kind), n.push("#define UV2"));
      }
      const S = new Pt();
      if (d.useBones && d.computeBonesUsingShaders && d.skeleton) {
        h.push(U.MatricesIndicesKind), h.push(U.MatricesWeightsKind), d.numBoneInfluencers > 4 && (h.push(U.MatricesIndicesExtraKind), h.push(U.MatricesWeightsExtraKind));
        const I = d.skeleton;
        n.push("#define NUM_BONE_INFLUENCERS " + d.numBoneInfluencers), d.numBoneInfluencers > 0 && S.addCPUSkinningFallback(0, d), I.isUsingTextureForMatrices ? n.push("#define BONETEXTURE") : n.push("#define BonesPerMesh " + (I.bones.length + 1));
      } else
        n.push("#define NUM_BONE_INFLUENCERS 0");
      const _ = d.morphTargetManager;
      let m = 0;
      if (_ && _.numInfluencers > 0 && (n.push("#define MORPHTARGETS"), m = _.numInfluencers, n.push("#define NUM_MORPH_INFLUENCERS " + m), _.isUsingTextureForTargets && n.push("#define MORPHTARGETS_TEXTURE"), D.PrepareAttributesForMorphTargetsInfluencers(h, d, m)), Ht(r, this._scene, n), t && (n.push("#define INSTANCES"), D.PushAttributesForInstances(h), e.getRenderingMesh().hasThinInstances && n.push("#define THIN_INSTANCES")), this.customShaderOptions && this.customShaderOptions.defines)
        for (const I of this.customShaderOptions.defines)
          n.indexOf(I) === -1 && n.push(I);
      const T = n.join(`
`);
      if (f !== T) {
        f = T;
        let I = "shadowMap";
        const b = [
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
        ], P = ["diffuseSampler", "boneSampler", "morphTargets"], V = ["Scene", "Mesh"];
        if (lt(b), this.customShaderOptions) {
          if (I = this.customShaderOptions.shaderName, this.customShaderOptions.attributes)
            for (const R of this.customShaderOptions.attributes)
              h.indexOf(R) === -1 && h.push(R);
          if (this.customShaderOptions.uniforms)
            for (const R of this.customShaderOptions.uniforms)
              b.indexOf(R) === -1 && b.push(R);
          if (this.customShaderOptions.samplers)
            for (const R of this.customShaderOptions.samplers)
              P.indexOf(R) === -1 && P.push(R);
        }
        const W = this._scene.getEngine();
        l = W.createEffect(I, {
          attributes: h,
          uniformsNames: b,
          uniformBuffersNames: V,
          samplers: P,
          defines: T,
          fallbacks: S,
          onCompiled: null,
          onError: null,
          indexParameters: { maxSimultaneousMorphTargets: m }
        }, W), o.setEffect(l, f);
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
    !i.shadowsEnabled || !s.shadowEnabled || (e["SHADOW" + t] = !0, this.useContactHardeningShadow ? (e["SHADOWPCSS" + t] = !0, this._filteringQuality === A.QUALITY_LOW ? e["SHADOWLOWQUALITY" + t] = !0 : this._filteringQuality === A.QUALITY_MEDIUM && (e["SHADOWMEDIUMQUALITY" + t] = !0)) : this.usePercentageCloserFiltering ? (e["SHADOWPCF" + t] = !0, this._filteringQuality === A.QUALITY_LOW ? e["SHADOWLOWQUALITY" + t] = !0 : this._filteringQuality === A.QUALITY_MEDIUM && (e["SHADOWMEDIUMQUALITY" + t] = !0)) : this.usePoissonSampling ? e["SHADOWPOISSON" + t] = !0 : this.useExponentialShadowMap || this.useBlurExponentialShadowMap ? e["SHADOWESM" + t] = !0 : (this.useCloseExponentialShadowMap || this.useBlurCloseExponentialShadowMap) && (e["SHADOWCLOSEESM" + t] = !0), s.needCube() && (e["SHADOWCUBE" + t] = !0));
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
    const a = this.getShadowMap();
    a && (i.needCube() || t.setMatrix("lightMatrix" + e, this.getTransformMatrix()), this._filter === A.FILTER_PCF ? (t.setDepthStencilTexture("shadowSampler" + e, this.getShadowMapForRendering()), i._uniformBuffer.updateFloat4("shadowsInfo", this.getDarkness(), a.getSize().width, 1 / a.getSize().width, this.frustumEdgeFalloff, e)) : this._filter === A.FILTER_PCSS ? (t.setDepthStencilTexture("shadowSampler" + e, this.getShadowMapForRendering()), t.setTexture("depthSampler" + e, this.getShadowMapForRendering()), i._uniformBuffer.updateFloat4("shadowsInfo", this.getDarkness(), 1 / a.getSize().width, this._contactHardeningLightSizeUVRatio * a.getSize().width, this.frustumEdgeFalloff, e)) : (t.setTexture("shadowSampler" + e, this.getShadowMapForRendering()), i._uniformBuffer.updateFloat4("shadowsInfo", this.getDarkness(), this.blurScale / a.getSize().width, this.depthScale, this.frustumEdgeFalloff, e)), i._uniformBuffer.updateFloat2("depthValues", this.getLight().getDepthMinZ(r), this.getLight().getDepthMinZ(r) + this.getLight().getDepthMaxZ(r), e));
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
    if (this._light.computeTransformedInformation() && (t = this._light.transformedPosition), C.NormalizeToRef(this._light.getShadowDirection(this._currentFaceIndex), this._lightDirection), Math.abs(C.Dot(this._lightDirection, C.Up())) === 1 && (this._lightDirection.z = 1e-13), this._light.needProjectionMatrixCompute() || !this._cachedPosition || !this._cachedDirection || !t.equals(this._cachedPosition) || !this._lightDirection.equals(this._cachedDirection)) {
      this._cachedPosition.copyFrom(t), this._cachedDirection.copyFrom(this._lightDirection), F.LookAtLHToRef(t, t.add(this._lightDirection), C.Up(), this._viewMatrix);
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
    const s = t.getLightById(e.lightId), r = e.cameraId !== void 0 ? t.getCameraById(e.cameraId) : null, a = i ? i(e.mapSize, s, r) : new A(e.mapSize, s, void 0, r), n = a.getShadowMap();
    for (let o = 0; o < e.renderList.length; o++)
      t.getMeshesById(e.renderList[o]).forEach(function(f) {
        n && (n.renderList || (n.renderList = []), n.renderList.push(f));
      });
    return e.id !== void 0 && (a.id = e.id), a.forceBackFacesOnly = !!e.forceBackFacesOnly, e.darkness !== void 0 && a.setDarkness(e.darkness), e.transparencyShadow && a.setTransparencyShadow(!0), e.frustumEdgeFalloff !== void 0 && (a.frustumEdgeFalloff = e.frustumEdgeFalloff), e.bias !== void 0 && (a.bias = e.bias), e.normalBias !== void 0 && (a.normalBias = e.normalBias), e.usePercentageCloserFiltering ? a.usePercentageCloserFiltering = !0 : e.useContactHardeningShadow ? a.useContactHardeningShadow = !0 : e.usePoissonSampling ? a.usePoissonSampling = !0 : e.useExponentialShadowMap ? a.useExponentialShadowMap = !0 : e.useBlurExponentialShadowMap ? a.useBlurExponentialShadowMap = !0 : e.useCloseExponentialShadowMap ? a.useCloseExponentialShadowMap = !0 : e.useBlurCloseExponentialShadowMap ? a.useBlurCloseExponentialShadowMap = !0 : e.useVarianceShadowMap ? a.useExponentialShadowMap = !0 : e.useBlurVarianceShadowMap && (a.useBlurExponentialShadowMap = !0), e.contactHardeningLightSizeUVRatio !== void 0 && (a.contactHardeningLightSizeUVRatio = e.contactHardeningLightSizeUVRatio), e.filteringQuality !== void 0 && (a.filteringQuality = e.filteringQuality), e.depthScale && (a.depthScale = e.depthScale), e.blurScale && (a.blurScale = e.blurScale), e.blurBoxOffset && (a.blurBoxOffset = e.blurBoxOffset), e.useKernelBlur && (a.useKernelBlur = e.useKernelBlur), e.blurKernel && (a.blurKernel = e.blurKernel), a;
  }
}
A.CLASSNAME = "ShadowGenerator";
A.FILTER_NONE = 0;
A.FILTER_EXPONENTIALSHADOWMAP = 1;
A.FILTER_POISSONSAMPLING = 2;
A.FILTER_BLUREXPONENTIALSHADOWMAP = 3;
A.FILTER_CLOSEEXPONENTIALSHADOWMAP = 4;
A.FILTER_BLURCLOSEEXPONENTIALSHADOWMAP = 5;
A.FILTER_PCF = 6;
A.FILTER_PCSS = 7;
A.QUALITY_HIGH = 0;
A.QUALITY_MEDIUM = 1;
A.QUALITY_LOW = 2;
A.DEFAULT_ALPHA_CUTOFF = 0.5;
A._SceneComponentInitialization = (c) => {
  throw Xe("ShadowGeneratorSceneComponent");
};
const Zr = "depthPixelShader", jr = `#ifdef ALPHATEST
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
x.ShadersStore[Zr] = jr;
const Qr = "instancesDeclaration", Kr = `#ifdef INSTANCES
attribute vec4 world0;
attribute vec4 world1;
attribute vec4 world2;
attribute vec4 world3;
#ifdef INSTANCESCOLOR
attribute vec4 instanceColor;
#endif
#if defined(THIN_INSTANCES) && !defined(WORLD_UBO)
uniform mat4 world;
#endif
#if defined(VELOCITY) || defined(PREPASS_VELOCITY)
attribute vec4 previousWorld0;
attribute vec4 previousWorld1;
attribute vec4 previousWorld2;
attribute vec4 previousWorld3;
#ifdef THIN_INSTANCES
uniform mat4 previousWorld;
#endif
#endif
#else
#if !defined(WORLD_UBO)
uniform mat4 world;
#endif
#if defined(VELOCITY) || defined(PREPASS_VELOCITY)
uniform mat4 previousWorld;
#endif
#endif
`;
x.IncludesShadersStore[Qr] = Kr;
const qr = "depthVertexShader", Jr = `attribute vec3 position;
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
x.ShadersStore[qr] = Jr;
class ft {
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
  constructor(e, t = 1, i = null, s = !1, r = v.TRILINEAR_SAMPLINGMODE, a = !1, n) {
    this.enabled = !0, this.forceDepthWriteTransparentMeshes = !1, this.useOnlyInActiveCamera = !1, this.reverseCulling = !1, this._scene = e, this._storeNonLinearDepth = s, this._storeCameraSpaceZ = a, this.isPacked = t === 0, this.isPacked ? this.clearColor = new Ve(1, 1, 1, 1) : this.clearColor = new Ve(a ? 1e8 : 1, 0, 0, 1), ft._SceneComponentInitialization(this._scene);
    const o = e.getEngine();
    this._camera = i, r !== v.NEAREST_SAMPLINGMODE && (t === 1 && !o._caps.textureFloatLinearFiltering && (r = v.NEAREST_SAMPLINGMODE), t === 2 && !o._caps.textureHalfFloatLinearFiltering && (r = v.NEAREST_SAMPLINGMODE));
    const l = this.isPacked || !o._features.supportExtendedTextureFormats ? 5 : 6;
    this._depthMap = new ae(n ?? "DepthRenderer", { width: o.getRenderWidth(), height: o.getRenderHeight() }, this._scene, !1, !0, t, !1, r, void 0, void 0, void 0, l), this._depthMap.wrapU = v.CLAMP_ADDRESSMODE, this._depthMap.wrapV = v.CLAMP_ADDRESSMODE, this._depthMap.refreshRate = 1, this._depthMap.renderParticles = !1, this._depthMap.renderList = null, this._depthMap.activeCamera = this._camera, this._depthMap.ignoreCameraViewport = !0, this._depthMap.useCameraPostProcesses = !1, this._depthMap.onClearObservable.add((h) => {
      h.clear(this.clearColor, !0, !0, !0);
    }), this._depthMap.onBeforeBindObservable.add(() => {
      var h;
      (h = o._debugPushGroup) === null || h === void 0 || h.call(o, "depth renderer", 1);
    }), this._depthMap.onAfterUnbindObservable.add(() => {
      var h;
      (h = o._debugPopGroup) === null || h === void 0 || h.call(o, 1);
    }), this._depthMap.customIsReadyFunction = (h, d, u) => {
      if ((u || d === 0) && h.subMeshes)
        for (let S = 0; S < h.subMeshes.length; ++S) {
          const _ = h.subMeshes[S], m = _.getRenderingMesh(), T = m._getInstancesRenderList(_._id, !!_.getReplacementMesh()), I = o.getCaps().instancedArrays && (T.visibleInstances[_._id] !== null && T.visibleInstances[_._id] !== void 0 || m.hasThinInstances);
          if (!this.isReady(_, I))
            return !1;
        }
      return !0;
    };
    const f = (h) => {
      var d, u;
      const S = h.getRenderingMesh(), _ = h.getEffectiveMesh(), m = this._scene, T = m.getEngine(), I = h.getMaterial();
      if (_._internalAbstractMeshDataInfo._isActiveIntermediate = !1, !I || _.infiniteDistance || I.disableDepthWrite || h.verticesCount === 0 || h._renderId === m.getRenderId())
        return;
      const b = _._getWorldMatrixDeterminant() < 0;
      let P = (d = S.overrideMaterialSideOrientation) !== null && d !== void 0 ? d : I.sideOrientation;
      b && (P = P === 0 ? 1 : 0);
      const V = P === 0;
      T.setState(I.backFaceCulling, 0, !1, V, this.reverseCulling ? !I.cullBackFaces : I.cullBackFaces);
      const W = S._getInstancesRenderList(h._id, !!h.getReplacementMesh());
      if (W.mustReturn)
        return;
      const R = T.getCaps().instancedArrays && (W.visibleInstances[h._id] !== null && W.visibleInstances[h._id] !== void 0 || S.hasThinInstances), w = this._camera || m.activeCamera;
      if (this.isReady(h, R) && w) {
        h._renderId = m.getRenderId();
        const N = (u = _._internalAbstractMeshDataInfo._materialForRenderPass) === null || u === void 0 ? void 0 : u[T.currentRenderPassId];
        let O = h._getDrawWrapper();
        !O && N && (O = N._getDrawWrapper());
        const me = w.mode === ie.ORTHOGRAPHIC_CAMERA;
        if (!O)
          return;
        const k = O.effect;
        T.enableEffect(O), R || S._bind(h, k, I.fillMode), N ? N.bindForSubMesh(_.getWorldMatrix(), _, h) : (k.setMatrix("viewProjection", m.getTransformMatrix()), k.setMatrix("world", _.getWorldMatrix()), this._storeCameraSpaceZ && k.setMatrix("view", m.getViewMatrix()));
        let te, oe;
        if (me ? (te = !T.useReverseDepthBuffer && T.isNDCHalfZRange ? 0 : 1, oe = T.useReverseDepthBuffer && T.isNDCHalfZRange ? 0 : 1) : (te = T.useReverseDepthBuffer && T.isNDCHalfZRange ? w.minZ : T.isNDCHalfZRange ? 0 : w.minZ, oe = T.useReverseDepthBuffer && T.isNDCHalfZRange ? 0 : w.maxZ), k.setFloat2("depthValues", te, te + oe), !N) {
          if (I.needAlphaTesting()) {
            const K = I.getAlphaTestTexture();
            K && (k.setTexture("diffuseSampler", K), k.setMatrix("diffuseMatrix", K.getTextureMatrix()));
          }
          if (S.useBones && S.computeBonesUsingShaders && S.skeleton) {
            const K = S.skeleton;
            if (K.isUsingTextureForMatrices) {
              const de = K.getTransformMatrixTexture(S);
              if (!de)
                return;
              k.setTexture("boneSampler", de), k.setFloat("boneTextureWidth", 4 * (K.bones.length + 1));
            } else
              k.setMatrices("mBones", K.getTransformMatrices(S));
          }
          ot(k, I, m), D.BindMorphTargetParameters(S, k), S.morphTargetManager && S.morphTargetManager.isUsingTextureForTargets && S.morphTargetManager._bind(k);
        }
        S._processRendering(_, h, k, I.fillMode, W, R, (K, de) => k.setMatrix("world", de));
      }
    };
    this._depthMap.customRenderFunction = (h, d, u, S) => {
      let _;
      if (S.length)
        for (_ = 0; _ < S.length; _++)
          f(S.data[_]);
      for (_ = 0; _ < h.length; _++)
        f(h.data[_]);
      for (_ = 0; _ < d.length; _++)
        f(d.data[_]);
      if (this.forceDepthWriteTransparentMeshes)
        for (_ = 0; _ < u.length; _++)
          f(u.data[_]);
      else
        for (_ = 0; _ < u.length; _++)
          u.data[_].getEffectiveMesh()._internalAbstractMeshDataInfo._isActiveIntermediate = !1;
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
    const s = this._scene.getEngine(), r = e.getMesh(), a = r.getScene(), n = (i = r._internalAbstractMeshDataInfo._materialForRenderPass) === null || i === void 0 ? void 0 : i[s.currentRenderPassId];
    if (n)
      return n.isReadyForSubMesh(r, e, t);
    const o = e.getMaterial();
    if (!o || o.disableDepthWrite)
      return !1;
    const l = [], f = [U.PositionKind];
    if (o && o.needAlphaTesting() && o.getAlphaTestTexture() && (l.push("#define ALPHATEST"), r.isVerticesDataPresent(U.UVKind) && (f.push(U.UVKind), l.push("#define UV1")), r.isVerticesDataPresent(U.UV2Kind) && (f.push(U.UV2Kind), l.push("#define UV2"))), r.useBones && r.computeBonesUsingShaders) {
      f.push(U.MatricesIndicesKind), f.push(U.MatricesWeightsKind), r.numBoneInfluencers > 4 && (f.push(U.MatricesIndicesExtraKind), f.push(U.MatricesWeightsExtraKind)), l.push("#define NUM_BONE_INFLUENCERS " + r.numBoneInfluencers), l.push("#define BonesPerMesh " + (r.skeleton ? r.skeleton.bones.length + 1 : 0));
      const m = e.getRenderingMesh().skeleton;
      m != null && m.isUsingTextureForMatrices && l.push("#define BONETEXTURE");
    } else
      l.push("#define NUM_BONE_INFLUENCERS 0");
    const h = r.morphTargetManager;
    let d = 0;
    h && h.numInfluencers > 0 && (d = h.numInfluencers, l.push("#define MORPHTARGETS"), l.push("#define NUM_MORPH_INFLUENCERS " + d), h.isUsingTextureForTargets && l.push("#define MORPHTARGETS_TEXTURE"), D.PrepareAttributesForMorphTargetsInfluencers(f, r, d)), t && (l.push("#define INSTANCES"), D.PushAttributesForInstances(f), e.getRenderingMesh().hasThinInstances && l.push("#define THIN_INSTANCES")), this._storeNonLinearDepth && l.push("#define NONLINEARDEPTH"), this._storeCameraSpaceZ && l.push("#define STORE_CAMERASPACE_Z"), this.isPacked && l.push("#define PACKED"), Ht(o, a, l);
    const u = e._getDrawWrapper(void 0, !0), S = u.defines, _ = l.join(`
`);
    if (S !== _) {
      const m = [
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
      lt(m), u.setEffect(s.createEffect("depth", f, m, ["diffuseSampler", "morphTargets", "boneSampler"], _, void 0, void 0, void 0, {
        maxSimultaneousMorphTargets: d
      }), _);
    }
    return u.effect.isReady();
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
ft._SceneComponentInitialization = (c) => {
  throw Xe("DepthRendererSceneComponent");
};
const es = "minmaxReduxPixelShader", ts = `varying vec2 vUV;
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
x.ShadersStore[es] = ts;
class is {
  /**
   * Creates a min/max reducer
   * @param camera The camera to use for the post processes
   */
  constructor(e) {
    this.onAfterReductionPerformed = new G(), this._forceFullscreenViewport = !0, this._activated = !1, this._camera = e, this._postProcessManager = new kt(e.getScene()), this._onContextRestoredObserver = e.getEngine().onContextRestoredObservable.add(() => {
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
    const r = this._camera.getScene(), a = new B(
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
    a.autoClear = !1, a.forceFullscreenViewport = s;
    let n = this._sourceTexture.getRenderWidth(), o = this._sourceTexture.getRenderHeight();
    a.onApply = ((f, h) => (d) => {
      d.setTexture("sourceTexture", this._sourceTexture), d.setFloat2("texSize", f, h);
    })(n, o), this._reductionSteps.push(a);
    let l = 1;
    for (; n > 1 || o > 1; ) {
      n = Math.max(Math.round(n / 2), 1), o = Math.max(Math.round(o / 2), 1);
      const f = new B(
        "Reduction phase " + l,
        "minmaxRedux",
        // shader
        ["texSize"],
        null,
        { width: n, height: o },
        // options
        null,
        // camera
        1,
        // sampling
        r.getEngine(),
        // engine
        !1,
        // reusable
        "#define " + (n == 1 && o == 1 ? "LAST" : n == 1 || o == 1 ? "ONEBEFORELAST" : "MAIN"),
        // defines
        i,
        void 0,
        void 0,
        void 0,
        7
      );
      if (f.autoClear = !1, f.forceFullscreenViewport = s, f.onApply = ((h, d) => (u) => {
        h == 1 || d == 1 ? u.setInt2("texSize", h, d) : u.setFloat2("texSize", h, d);
      })(n, o), this._reductionSteps.push(f), l++, n == 1 && o == 1) {
        const h = (d, u, S) => {
          const _ = new Float32Array(4 * d * u), m = { min: 0, max: 0 };
          return () => {
            r.getEngine()._readTexturePixels(S.inputTexture.texture, d, u, -1, 0, _, !1), m.min = _[0], m.max = _[1], this.onAfterReductionPerformed.notifyObservers(m);
          };
        };
        f.onAfterRenderObservable.add(h(n, o, f));
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
class rs extends is {
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
    this._depthRenderer && (delete s._depthRenderer[this._depthRendererId], this._depthRenderer.dispose(), this._depthRenderer = null), e === null && (s._depthRenderer || (s._depthRenderer = {}), e = this._depthRenderer = new ft(s, t, this._camera, !1, 1), e.enabled = !1, this._depthRendererId = "minmax" + this._camera.id, s._depthRenderer[this._depthRendererId] = e), super.setSourceTexture(e.getDepthMap(), !0, t, i);
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
const yt = C.Up(), ss = C.Zero(), H = new C(), we = new C(), et = new F();
class $ extends A {
  _validateFilter(e) {
    return e === A.FILTER_NONE || e === A.FILTER_PCF || e === A.FILTER_PCSS ? e : (console.error('Unsupported filter "' + e + '"!'), A.FILTER_NONE);
  }
  /**
   * Gets or set the number of cascades used by the CSM.
   */
  get numCascades() {
    return this._numCascades;
  }
  set numCascades(e) {
    e = Math.min(Math.max(e, $.MIN_CASCADES_COUNT), $.MAX_CASCADES_COUNT), e !== this._numCascades && (this._numCascades = e, this.recreateShadowMap(), this._recreateSceneUBOs());
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
        const r = s.getBoundingInfo(), a = r.boundingBox;
        this._scbiMin.minimizeInPlace(a.minimumWorld), this._scbiMax.maximizeInPlace(a.maximumWorld);
      }
      const t = this._scene.meshes;
      for (let i = 0; i < t.length; i++) {
        const s = t[i];
        if (!s || !s.isVisible || !s.isEnabled || !s.receiveShadows)
          continue;
        const r = s.getBoundingInfo(), a = r.boundingBox;
        this._scbiMin.minimizeInPlace(a.minimumWorld), this._scbiMax.maximizeInPlace(a.maximumWorld);
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
    return $.CLASSNAME;
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
      this._depthReducer || (this._depthReducer = new rs(t), this._depthReducer.onAfterReductionPerformed.add((i) => {
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
    const t = e.minZ, i = e.maxZ, s = i - t, r = this._minDistance, a = this._shadowMaxZ < i && this._shadowMaxZ >= t ? Math.min((this._shadowMaxZ - t) / (i - t), this._maxDistance) : this._maxDistance, n = t + r * s, o = t + a * s, l = o - n, f = o / n;
    for (let h = 0; h < this._cascades.length; ++h) {
      const d = (h + 1) / this._numCascades, u = n * f ** d, S = n + l * d, _ = this._lambda * (u - S) + S;
      this._cascades[h].prevBreakDistance = h === 0 ? r : this._cascades[h - 1].breakDistance, this._cascades[h].breakDistance = (_ - t) / s, this._viewSpaceFrustumsZ[h] = _, this._frustumLengths[h] = (this._cascades[h].breakDistance - this._cascades[h].prevBreakDistance) * s;
    }
    this._breaksAreDirty = !1;
  }
  _computeMatrices() {
    const e = this._scene;
    if (!this._getCamera())
      return;
    C.NormalizeToRef(this._light.getShadowDirection(0), this._lightDirection), Math.abs(C.Dot(this._lightDirection, C.Up())) === 1 && (this._lightDirection.z = 1e-13), this._cachedDirection.copyFrom(this._lightDirection);
    const i = e.getEngine().useReverseDepthBuffer;
    for (let s = 0; s < this._numCascades; ++s) {
      this._computeFrustumInWorldSpace(s), this._computeCascadeFrustum(s), this._cascadeMaxExtents[s].subtractToRef(this._cascadeMinExtents[s], H), this._frustumCenter[s].addToRef(this._lightDirection.scale(this._cascadeMinExtents[s].z), this._shadowCameraPos[s]), F.LookAtLHToRef(this._shadowCameraPos[s], this._frustumCenter[s], yt, this._viewMatrices[s]);
      let r = 0, a = H.z;
      const n = this._shadowCastersBoundingInfo;
      n.update(this._viewMatrices[s]), a = Math.min(a, n.boundingBox.maximumWorld.z), !this._depthClamp || this.filter === A.FILTER_PCSS ? r = Math.min(r, n.boundingBox.minimumWorld.z) : r = Math.max(r, n.boundingBox.minimumWorld.z), F.OrthoOffCenterLHToRef(this._cascadeMinExtents[s].x, this._cascadeMaxExtents[s].x, this._cascadeMinExtents[s].y, this._cascadeMaxExtents[s].y, i ? a : r, i ? r : a, this._projectionMatrices[s], e.getEngine().isNDCHalfZRange), this._cascadeMinExtents[s].z = r, this._cascadeMaxExtents[s].z = a, this._viewMatrices[s].multiplyToRef(this._projectionMatrices[s], this._transformMatrices[s]), C.TransformCoordinatesToRef(ss, this._transformMatrices[s], H), H.scaleInPlace(this._mapSize / 2), we.copyFromFloats(Math.round(H.x), Math.round(H.y), Math.round(H.z)), we.subtractInPlace(H).scaleInPlace(2 / this._mapSize), F.TranslationToRef(we.x, we.y, 0, et), this._projectionMatrices[s].multiplyToRef(et, this._projectionMatrices[s]), this._viewMatrices[s].multiplyToRef(this._projectionMatrices[s], this._transformMatrices[s]), this._transformMatrices[s].copyToArray(this._transformMatricesAsArray, s * 16);
    }
  }
  // Get the 8 points of the view frustum in world space
  _computeFrustumInWorldSpace(e) {
    const t = this._getCamera();
    if (!t)
      return;
    const i = this._cascades[e].prevBreakDistance, s = this._cascades[e].breakDistance, r = this._scene.getEngine().isNDCHalfZRange;
    t.getViewMatrix();
    const a = F.Invert(t.getTransformationMatrix()), n = this._scene.getEngine().useReverseDepthBuffer ? 4 : 0;
    for (let o = 0; o < $._FrustumCornersNDCSpace.length; ++o)
      H.copyFrom($._FrustumCornersNDCSpace[(o + n) % $._FrustumCornersNDCSpace.length]), r && H.z === -1 && (H.z = 0), C.TransformCoordinatesToRef(H, a, this._frustumCornersWorldSpace[e][o]);
    for (let o = 0; o < $._FrustumCornersNDCSpace.length / 2; ++o)
      H.copyFrom(this._frustumCornersWorldSpace[e][o + 4]).subtractInPlace(this._frustumCornersWorldSpace[e][o]), we.copyFrom(H).scaleInPlace(i), H.scaleInPlace(s), H.addInPlace(this._frustumCornersWorldSpace[e][o]), this._frustumCornersWorldSpace[e][o + 4].copyFrom(H), this._frustumCornersWorldSpace[e][o].addInPlace(we);
  }
  _computeCascadeFrustum(e) {
    if (this._cascadeMinExtents[e].copyFromFloats(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE), this._cascadeMaxExtents[e].copyFromFloats(Number.MIN_VALUE, Number.MIN_VALUE, Number.MIN_VALUE), this._frustumCenter[e].copyFromFloats(0, 0, 0), !!this._getCamera()) {
      for (let i = 0; i < this._frustumCornersWorldSpace[e].length; ++i)
        this._frustumCenter[e].addInPlace(this._frustumCornersWorldSpace[e][i]);
      if (this._frustumCenter[e].scaleInPlace(1 / this._frustumCornersWorldSpace[e].length), this.stabilizeCascades) {
        let i = 0;
        for (let s = 0; s < this._frustumCornersWorldSpace[e].length; ++s) {
          const r = this._frustumCornersWorldSpace[e][s].subtractToRef(this._frustumCenter[e], H).length();
          i = Math.max(i, r);
        }
        i = Math.ceil(i * 16) / 16, this._cascadeMaxExtents[e].copyFromFloats(i, i, i), this._cascadeMinExtents[e].copyFromFloats(-i, -i, -i);
      } else {
        const i = this._frustumCenter[e];
        this._frustumCenter[e].addToRef(this._lightDirection, H), F.LookAtLHToRef(i, H, yt, et);
        for (let s = 0; s < this._frustumCornersWorldSpace[e].length; ++s)
          C.TransformCoordinatesToRef(this._frustumCornersWorldSpace[e][s], et, H), this._cascadeMinExtents[e].minimizeInPlace(H), this._cascadeMaxExtents[e].maximizeInPlace(H);
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
    if (!$.IsSupported) {
      tt.Error("CascadedShadowMap is not supported by the current engine.");
      return;
    }
    super(e, t, i, s), this.usePercentageCloserFiltering = !0;
  }
  _initializeGenerator() {
    var e, t, i, s, r, a, n, o, l, f, h, d, u, S, _, m, T, I, b, P;
    this.penumbraDarkness = (e = this.penumbraDarkness) !== null && e !== void 0 ? e : 1, this._numCascades = (t = this._numCascades) !== null && t !== void 0 ? t : $.DEFAULT_CASCADES_COUNT, this.stabilizeCascades = (i = this.stabilizeCascades) !== null && i !== void 0 ? i : !1, this._freezeShadowCastersBoundingInfoObservable = (s = this._freezeShadowCastersBoundingInfoObservable) !== null && s !== void 0 ? s : null, this.freezeShadowCastersBoundingInfo = (r = this.freezeShadowCastersBoundingInfo) !== null && r !== void 0 ? r : !1, this._scbiMin = (a = this._scbiMin) !== null && a !== void 0 ? a : new C(0, 0, 0), this._scbiMax = (n = this._scbiMax) !== null && n !== void 0 ? n : new C(0, 0, 0), this._shadowCastersBoundingInfo = (o = this._shadowCastersBoundingInfo) !== null && o !== void 0 ? o : new fi(new C(0, 0, 0), new C(0, 0, 0)), this._breaksAreDirty = (l = this._breaksAreDirty) !== null && l !== void 0 ? l : !0, this._minDistance = (f = this._minDistance) !== null && f !== void 0 ? f : 0, this._maxDistance = (h = this._maxDistance) !== null && h !== void 0 ? h : 1, this._currentLayer = (d = this._currentLayer) !== null && d !== void 0 ? d : 0, this._shadowMaxZ = (_ = (u = this._shadowMaxZ) !== null && u !== void 0 ? u : (S = this._getCamera()) === null || S === void 0 ? void 0 : S.maxZ) !== null && _ !== void 0 ? _ : 1e4, this._debug = (m = this._debug) !== null && m !== void 0 ? m : !1, this._depthClamp = (T = this._depthClamp) !== null && T !== void 0 ? T : !0, this._cascadeBlendPercentage = (I = this._cascadeBlendPercentage) !== null && I !== void 0 ? I : 0.1, this._lambda = (b = this._lambda) !== null && b !== void 0 ? b : 0.5, this._autoCalcDepthBounds = (P = this._autoCalcDepthBounds) !== null && P !== void 0 ? P : !1, this._recreateSceneUBOs(), super._initializeGenerator();
  }
  _createTargetRenderTexture() {
    const e = this._scene.getEngine(), t = { width: this._mapSize, height: this._mapSize, layers: this.numCascades };
    this._shadowMap = new ae(
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
      }, this._viewMatrices[t] = F.Zero(), this._projectionMatrices[t] = F.Zero(), this._transformMatrices[t] = F.Zero(), this._cascadeMinExtents[t] = new C(), this._cascadeMaxExtents[t] = new C(), this._frustumCenter[t] = new C(), this._shadowCameraPos[t] = new C(), this._frustumCornersWorldSpace[t] = new Array($._FrustumCornersNDCSpace.length);
      for (let i = 0; i < $._FrustumCornersNDCSpace.length; ++i)
        this._frustumCornersWorldSpace[t][i] = new C();
    }
    const e = this._scene.getEngine();
    this._shadowMap.onBeforeBindObservable.clear(), this._shadowMap.onBeforeRenderObservable.clear(), this._shadowMap.onBeforeRenderObservable.add((t) => {
      this._sceneUBOs && this._scene.setSceneUniformBuffer(this._sceneUBOs[t]), this._currentLayer = t, this._filter === A.FILTER_PCF && e.setColorWrite(!1), this._scene.setTransformMatrix(this.getCascadeViewMatrix(t), this.getCascadeProjectionMatrix(t)), this._useUBO && (this._scene.getSceneUniformBuffer().unbindEffect(), this._scene.finalizeSceneUbo());
    }), this._shadowMap.onBeforeBindObservable.add(() => {
      var t;
      this._currentSceneUBO = this._scene.getSceneUniformBuffer(), (t = e._debugPushGroup) === null || t === void 0 || t.call(e, `cascaded shadow map generation for pass id ${e.currentRenderPassId}`, 1), this._breaksAreDirty && this._splitFrustum(), this._computeMatrices();
    }), this._splitFrustum();
  }
  _bindCustomEffectForRenderSubMeshForShadowMap(e, t) {
    t.setMatrix("viewProjection", this.getCascadeTransformMatrix(this._currentLayer));
  }
  _isReadyCustomDefines(e) {
    e.push("#define SM_DEPTHCLAMP " + (this._depthClamp && this._filter !== A.FILTER_PCSS ? "1" : "0"));
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
    const a = this.getShadowMap();
    if (!a)
      return;
    const n = a.getSize().width;
    if (t.setMatrices("lightMatrix" + e, this._transformMatricesAsArray), t.setArray("viewFrustumZ" + e, this._viewSpaceFrustumsZ), t.setFloat("cascadeBlendFactor" + e, this.cascadeBlendPercentage === 0 ? 1e4 : 1 / this.cascadeBlendPercentage), t.setArray("frustumLengths" + e, this._frustumLengths), this._filter === A.FILTER_PCF)
      t.setDepthStencilTexture("shadowSampler" + e, a), i._uniformBuffer.updateFloat4("shadowsInfo", this.getDarkness(), n, 1 / n, this.frustumEdgeFalloff, e);
    else if (this._filter === A.FILTER_PCSS) {
      for (let o = 0; o < this._numCascades; ++o)
        this._lightSizeUVCorrection[o * 2 + 0] = o === 0 ? 1 : (this._cascadeMaxExtents[0].x - this._cascadeMinExtents[0].x) / (this._cascadeMaxExtents[o].x - this._cascadeMinExtents[o].x), this._lightSizeUVCorrection[o * 2 + 1] = o === 0 ? 1 : (this._cascadeMaxExtents[0].y - this._cascadeMinExtents[0].y) / (this._cascadeMaxExtents[o].y - this._cascadeMinExtents[o].y), this._depthCorrection[o] = o === 0 ? 1 : (this._cascadeMaxExtents[o].z - this._cascadeMinExtents[o].z) / (this._cascadeMaxExtents[0].z - this._cascadeMinExtents[0].z);
      t.setDepthStencilTexture("shadowSampler" + e, a), t.setTexture("depthSampler" + e, a), t.setArray2("lightSizeUVCorrection" + e, this._lightSizeUVCorrection), t.setArray("depthCorrection" + e, this._depthCorrection), t.setFloat("penumbraDarkness" + e, this.penumbraDarkness), i._uniformBuffer.updateFloat4("shadowsInfo", this.getDarkness(), 1 / n, this._contactHardeningLightSizeUVRatio * n, this.frustumEdgeFalloff, e);
    } else
      t.setTexture("shadowSampler" + e, a), i._uniformBuffer.updateFloat4("shadowsInfo", this.getDarkness(), n, 1 / n, this.frustumEdgeFalloff, e);
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
    const i = A.Parse(e, t, (s, r, a) => new $(s, r, void 0, a));
    return e.numCascades !== void 0 && (i.numCascades = e.numCascades), e.debug !== void 0 && (i.debug = e.debug), e.stabilizeCascades !== void 0 && (i.stabilizeCascades = e.stabilizeCascades), e.lambda !== void 0 && (i.lambda = e.lambda), e.cascadeBlendPercentage !== void 0 && (i.cascadeBlendPercentage = e.cascadeBlendPercentage), e.depthClamp !== void 0 && (i.depthClamp = e.depthClamp), e.autoCalcDepthBounds !== void 0 && (i.autoCalcDepthBounds = e.autoCalcDepthBounds), e.shadowMaxZ !== void 0 && (i.shadowMaxZ = e.shadowMaxZ), e.penumbraDarkness !== void 0 && (i.penumbraDarkness = e.penumbraDarkness), e.freezeShadowCastersBoundingInfo !== void 0 && (i.freezeShadowCastersBoundingInfo = e.freezeShadowCastersBoundingInfo), e.minDistance !== void 0 && e.maxDistance !== void 0 && i.setMinMaxDistance(e.minDistance, e.maxDistance), i;
  }
}
$._FrustumCornersNDCSpace = [
  new C(-1, 1, -1),
  new C(1, 1, -1),
  new C(1, -1, -1),
  new C(-1, -1, -1),
  new C(-1, 1, 1),
  new C(1, 1, 1),
  new C(1, -1, 1),
  new C(-1, -1, 1)
];
$.CLASSNAME = "CascadedShadowGenerator";
$.DEFAULT_CASCADES_COUNT = 4;
$.MIN_CASCADES_COUNT = 2;
$.MAX_CASCADES_COUNT = 4;
$._SceneComponentInitialization = (c) => {
  throw Xe("ShadowGeneratorSceneComponent");
};
di.AddParser(it.NAME_SHADOWGENERATOR, (c, e) => {
  if (c.shadowGenerators !== void 0 && c.shadowGenerators !== null)
    for (let t = 0, i = c.shadowGenerators.length; t < i; t++) {
      const s = c.shadowGenerators[t];
      s.className === $.CLASSNAME ? $.Parse(s, e) : A.Parse(s, e);
    }
});
class as {
  /**
   * Creates a new instance of the component for the given scene
   * @param scene Defines the scene to register the component in
   */
  constructor(e) {
    this.name = it.NAME_SHADOWGENERATOR, this.scene = e;
  }
  /**
   * Registers the component in a given scene
   */
  register() {
    this.scene._gatherRenderTargetsStage.registerStep(it.STEP_GATHERRENDERTARGETS_SHADOWGENERATOR, this, this._gatherRenderTargets);
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
        for (let a = r.next(); a.done !== !0; a = r.next()) {
          const n = a.value;
          e.shadowGenerators.push(n.serialize());
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
          const a = r.values();
          for (let n = a.next(); n.done !== !0; n = a.next()) {
            const l = n.value.getShadowMap();
            t.textures.indexOf(l) !== -1 && e.push(l);
          }
        }
      }
  }
}
A._SceneComponentInitialization = (c) => {
  let e = c._getComponent(it.NAME_SHADOWGENERATOR);
  e || (e = new as(c), c._addComponent(e));
};
const ns = {
  enableShadows: !0
};
function Ut(c = ns) {
  const { enableShadows: e, shadowTransparency: t, intensity: i, scene: s } = c, r = new pe("DirectionalLight", new C(-0.3, -1, 0.4), s);
  r.position = new C(-50, 65, -50), r.intensity = 0.65 * i;
  const a = new ht("HemisphericLight", new C(1, 1, 0), s);
  return a.intensity = 0.4 * i, e && (r.shadowMinZ = 1, r.shadowMaxZ = 70, r.shadowGenerator = new A(2048, r), r.shadowGenerator.useCloseExponentialShadowMap = !0, r.shadowGenerator.darkness = t), { directional: r, hemispheric: a };
}
function Zt(c) {
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
  const a = c.width || c.size || 1, n = c.height || c.size || 1, o = c.depth || c.size || 1, l = c.wrap || !1;
  let f = c.topBaseAt === void 0 ? 1 : c.topBaseAt, h = c.bottomBaseAt === void 0 ? 0 : c.bottomBaseAt;
  f = (f + 4) % 4, h = (h + 4) % 4;
  const d = [2, 0, 3, 1], u = [2, 0, 1, 3];
  let S = d[f], _ = u[h], m = [
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
  if (l) {
    t = [2, 3, 0, 2, 0, 1, 4, 5, 6, 4, 6, 7, 9, 10, 11, 9, 11, 8, 12, 14, 15, 12, 13, 14], m = [
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
    let R = [
      [1, 1, 1],
      [-1, 1, 1],
      [-1, 1, -1],
      [1, 1, -1]
    ], w = [
      [-1, -1, 1],
      [1, -1, 1],
      [1, -1, -1],
      [-1, -1, -1]
    ];
    const N = [17, 18, 19, 16], O = [22, 23, 20, 21];
    for (; S > 0; )
      R.unshift(R.pop()), N.unshift(N.pop()), S--;
    for (; _ > 0; )
      w.unshift(w.pop()), O.unshift(O.pop()), _--;
    R = R.flat(), w = w.flat(), m = m.concat(R).concat(w), t.push(N[0], N[2], N[3], N[0], N[1], N[2]), t.push(O[0], O[2], O[3], O[0], O[1], O[2]);
  }
  const T = [a / 2, n / 2, o / 2];
  r = m.reduce((R, w, N) => R.concat(w * T[N % 3]), []);
  const I = c.sideOrientation === 0 ? 0 : c.sideOrientation || We.DEFAULTSIDE, b = c.faceUV || new Array(6), P = c.faceColors, V = [];
  for (let R = 0; R < 6; R++)
    b[R] === void 0 && (b[R] = new ci(0, 0, 1, 1)), P && P[R] === void 0 && (P[R] = new Ve(1, 1, 1, 1));
  for (let R = 0; R < 6; R++)
    if (s.push(b[R].z, Ne.UseOpenGLOrientationForUV ? 1 - b[R].w : b[R].w), s.push(b[R].x, Ne.UseOpenGLOrientationForUV ? 1 - b[R].w : b[R].w), s.push(b[R].x, Ne.UseOpenGLOrientationForUV ? 1 - b[R].y : b[R].y), s.push(b[R].z, Ne.UseOpenGLOrientationForUV ? 1 - b[R].y : b[R].y), P)
      for (let w = 0; w < 4; w++)
        V.push(P[R].r, P[R].g, P[R].b, P[R].a);
  We._ComputeSides(I, r, t, i, s, c.frontUVs, c.backUVs);
  const W = new We();
  if (W.indices = t, W.positions = r, W.normals = i, W.uvs = s, P) {
    const R = I === We.DOUBLESIDE ? V.concat(V) : V;
    W.colors = R;
  }
  return W;
}
function Oe(c, e = {}, t = null) {
  const i = new He(c, t);
  return e.sideOrientation = He._GetDefaultSideOrientation(e.sideOrientation), i._originalBuilderSideOrientation = e.sideOrientation, Zt(e).applyToMesh(i, e.updatable), i;
}
We.CreateBox = Zt;
He.CreateBox = (c, e, t = null, i, s) => Oe(c, {
  size: e,
  sideOrientation: s,
  updatable: i
}, t);
class Bt {
  constructor() {
    this.previousWorldMatrices = {}, this.previousBones = {};
  }
  /**
   * Add the required uniforms to the current list.
   * @param uniforms defines the current uniform list.
   */
  static AddUniforms(e) {
    e.push("previousWorld", "previousViewProjection", "mPreviousBones");
  }
  /**
   * Add the required samplers to the current list.
   * @param samplers defines the current sampler list.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static AddSamplers(e) {
  }
  /**
   * Binds the material data.
   * @param effect defines the effect to update
   * @param scene defines the scene the material belongs to.
   * @param mesh The mesh
   * @param world World matrix of this mesh
   * @param isFrozen Is the material frozen
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  bindForSubMesh(e, t, i, s, r) {
    if (t.prePassRenderer && t.prePassRenderer.enabled && t.prePassRenderer.currentRTisSceneRT && t.prePassRenderer.getIndex(2) !== -1) {
      this.previousWorldMatrices[i.uniqueId] || (this.previousWorldMatrices[i.uniqueId] = s.clone()), this.previousViewProjection || (this.previousViewProjection = t.getTransformMatrix().clone(), this.currentViewProjection = t.getTransformMatrix().clone());
      const a = t.getEngine();
      this.currentViewProjection.updateFlag !== t.getTransformMatrix().updateFlag ? (this._lastUpdateFrameId = a.frameId, this.previousViewProjection.copyFrom(this.currentViewProjection), this.currentViewProjection.copyFrom(t.getTransformMatrix())) : this._lastUpdateFrameId !== a.frameId && (this._lastUpdateFrameId = a.frameId, this.previousViewProjection.copyFrom(this.currentViewProjection)), e.setMatrix("previousWorld", this.previousWorldMatrices[i.uniqueId]), e.setMatrix("previousViewProjection", this.previousViewProjection), this.previousWorldMatrices[i.uniqueId] = s.clone();
    }
  }
}
class jt extends rt {
  constructor(e, t, i = !0) {
    super(e, t), this._normalMatrix = new F(), this._storeEffectOnSubMeshes = i;
  }
  getEffect() {
    return this._storeEffectOnSubMeshes ? this._activeEffect : super.getEffect();
  }
  isReady(e, t) {
    return e ? !this._storeEffectOnSubMeshes || !e.subMeshes || e.subMeshes.length === 0 ? !0 : this.isReadyForSubMesh(e, e.subMeshes[0], t) : !1;
  }
  _isReadyForSubMesh(e) {
    const t = e.materialDefines;
    return !!(!this.checkReadyOnEveryCall && e.effect && t && t._renderId === this.getScene().getRenderId());
  }
  /**
   * Binds the given world matrix to the active effect
   *
   * @param world the matrix to bind
   */
  bindOnlyWorldMatrix(e) {
    this._activeEffect.setMatrix("world", e);
  }
  /**
   * Binds the given normal matrix to the active effect
   *
   * @param normalMatrix the matrix to bind
   */
  bindOnlyNormalMatrix(e) {
    this._activeEffect.setMatrix("normalMatrix", e);
  }
  bind(e, t) {
    t && this.bindForSubMesh(e, t, t.subMeshes[0]);
  }
  _afterBind(e, t = null) {
    super._afterBind(e, t), this.getScene()._cachedEffect = t, t && (t._forceRebindOnNextCall = !1);
  }
  _mustRebind(e, t, i = 1) {
    return e.isCachedMaterialInvalid(this, t, i);
  }
  dispose(e, t, i) {
    this._activeEffect = void 0, super.dispose(e, t, i);
  }
}
class L {
  /**
   * Are diffuse textures enabled in the application.
   */
  static get DiffuseTextureEnabled() {
    return this._DiffuseTextureEnabled;
  }
  static set DiffuseTextureEnabled(e) {
    this._DiffuseTextureEnabled !== e && (this._DiffuseTextureEnabled = e, z.MarkAllMaterialsAsDirty(1));
  }
  /**
   * Are detail textures enabled in the application.
   */
  static get DetailTextureEnabled() {
    return this._DetailTextureEnabled;
  }
  static set DetailTextureEnabled(e) {
    this._DetailTextureEnabled !== e && (this._DetailTextureEnabled = e, z.MarkAllMaterialsAsDirty(1));
  }
  /**
   * Are decal maps enabled in the application.
   */
  static get DecalMapEnabled() {
    return this._DecalMapEnabled;
  }
  static set DecalMapEnabled(e) {
    this._DecalMapEnabled !== e && (this._DecalMapEnabled = e, z.MarkAllMaterialsAsDirty(1));
  }
  /**
   * Are ambient textures enabled in the application.
   */
  static get AmbientTextureEnabled() {
    return this._AmbientTextureEnabled;
  }
  static set AmbientTextureEnabled(e) {
    this._AmbientTextureEnabled !== e && (this._AmbientTextureEnabled = e, z.MarkAllMaterialsAsDirty(1));
  }
  /**
   * Are opacity textures enabled in the application.
   */
  static get OpacityTextureEnabled() {
    return this._OpacityTextureEnabled;
  }
  static set OpacityTextureEnabled(e) {
    this._OpacityTextureEnabled !== e && (this._OpacityTextureEnabled = e, z.MarkAllMaterialsAsDirty(1));
  }
  /**
   * Are reflection textures enabled in the application.
   */
  static get ReflectionTextureEnabled() {
    return this._ReflectionTextureEnabled;
  }
  static set ReflectionTextureEnabled(e) {
    this._ReflectionTextureEnabled !== e && (this._ReflectionTextureEnabled = e, z.MarkAllMaterialsAsDirty(1));
  }
  /**
   * Are emissive textures enabled in the application.
   */
  static get EmissiveTextureEnabled() {
    return this._EmissiveTextureEnabled;
  }
  static set EmissiveTextureEnabled(e) {
    this._EmissiveTextureEnabled !== e && (this._EmissiveTextureEnabled = e, z.MarkAllMaterialsAsDirty(1));
  }
  /**
   * Are specular textures enabled in the application.
   */
  static get SpecularTextureEnabled() {
    return this._SpecularTextureEnabled;
  }
  static set SpecularTextureEnabled(e) {
    this._SpecularTextureEnabled !== e && (this._SpecularTextureEnabled = e, z.MarkAllMaterialsAsDirty(1));
  }
  /**
   * Are bump textures enabled in the application.
   */
  static get BumpTextureEnabled() {
    return this._BumpTextureEnabled;
  }
  static set BumpTextureEnabled(e) {
    this._BumpTextureEnabled !== e && (this._BumpTextureEnabled = e, z.MarkAllMaterialsAsDirty(1));
  }
  /**
   * Are lightmap textures enabled in the application.
   */
  static get LightmapTextureEnabled() {
    return this._LightmapTextureEnabled;
  }
  static set LightmapTextureEnabled(e) {
    this._LightmapTextureEnabled !== e && (this._LightmapTextureEnabled = e, z.MarkAllMaterialsAsDirty(1));
  }
  /**
   * Are refraction textures enabled in the application.
   */
  static get RefractionTextureEnabled() {
    return this._RefractionTextureEnabled;
  }
  static set RefractionTextureEnabled(e) {
    this._RefractionTextureEnabled !== e && (this._RefractionTextureEnabled = e, z.MarkAllMaterialsAsDirty(1));
  }
  /**
   * Are color grading textures enabled in the application.
   */
  static get ColorGradingTextureEnabled() {
    return this._ColorGradingTextureEnabled;
  }
  static set ColorGradingTextureEnabled(e) {
    this._ColorGradingTextureEnabled !== e && (this._ColorGradingTextureEnabled = e, z.MarkAllMaterialsAsDirty(1));
  }
  /**
   * Are fresnels enabled in the application.
   */
  static get FresnelEnabled() {
    return this._FresnelEnabled;
  }
  static set FresnelEnabled(e) {
    this._FresnelEnabled !== e && (this._FresnelEnabled = e, z.MarkAllMaterialsAsDirty(4));
  }
  /**
   * Are clear coat textures enabled in the application.
   */
  static get ClearCoatTextureEnabled() {
    return this._ClearCoatTextureEnabled;
  }
  static set ClearCoatTextureEnabled(e) {
    this._ClearCoatTextureEnabled !== e && (this._ClearCoatTextureEnabled = e, z.MarkAllMaterialsAsDirty(1));
  }
  /**
   * Are clear coat bump textures enabled in the application.
   */
  static get ClearCoatBumpTextureEnabled() {
    return this._ClearCoatBumpTextureEnabled;
  }
  static set ClearCoatBumpTextureEnabled(e) {
    this._ClearCoatBumpTextureEnabled !== e && (this._ClearCoatBumpTextureEnabled = e, z.MarkAllMaterialsAsDirty(1));
  }
  /**
   * Are clear coat tint textures enabled in the application.
   */
  static get ClearCoatTintTextureEnabled() {
    return this._ClearCoatTintTextureEnabled;
  }
  static set ClearCoatTintTextureEnabled(e) {
    this._ClearCoatTintTextureEnabled !== e && (this._ClearCoatTintTextureEnabled = e, z.MarkAllMaterialsAsDirty(1));
  }
  /**
   * Are sheen textures enabled in the application.
   */
  static get SheenTextureEnabled() {
    return this._SheenTextureEnabled;
  }
  static set SheenTextureEnabled(e) {
    this._SheenTextureEnabled !== e && (this._SheenTextureEnabled = e, z.MarkAllMaterialsAsDirty(1));
  }
  /**
   * Are anisotropic textures enabled in the application.
   */
  static get AnisotropicTextureEnabled() {
    return this._AnisotropicTextureEnabled;
  }
  static set AnisotropicTextureEnabled(e) {
    this._AnisotropicTextureEnabled !== e && (this._AnisotropicTextureEnabled = e, z.MarkAllMaterialsAsDirty(1));
  }
  /**
   * Are thickness textures enabled in the application.
   */
  static get ThicknessTextureEnabled() {
    return this._ThicknessTextureEnabled;
  }
  static set ThicknessTextureEnabled(e) {
    this._ThicknessTextureEnabled !== e && (this._ThicknessTextureEnabled = e, z.MarkAllMaterialsAsDirty(1));
  }
  /**
   * Are refraction intensity textures enabled in the application.
   */
  static get RefractionIntensityTextureEnabled() {
    return this._ThicknessTextureEnabled;
  }
  static set RefractionIntensityTextureEnabled(e) {
    this._RefractionIntensityTextureEnabled !== e && (this._RefractionIntensityTextureEnabled = e, z.MarkAllMaterialsAsDirty(1));
  }
  /**
   * Are translucency intensity textures enabled in the application.
   */
  static get TranslucencyIntensityTextureEnabled() {
    return this._ThicknessTextureEnabled;
  }
  static set TranslucencyIntensityTextureEnabled(e) {
    this._TranslucencyIntensityTextureEnabled !== e && (this._TranslucencyIntensityTextureEnabled = e, z.MarkAllMaterialsAsDirty(1));
  }
  /**
   * Are translucency intensity textures enabled in the application.
   */
  static get IridescenceTextureEnabled() {
    return this._IridescenceTextureEnabled;
  }
  static set IridescenceTextureEnabled(e) {
    this._IridescenceTextureEnabled !== e && (this._IridescenceTextureEnabled = e, z.MarkAllMaterialsAsDirty(1));
  }
}
L._DiffuseTextureEnabled = !0;
L._DetailTextureEnabled = !0;
L._DecalMapEnabled = !0;
L._AmbientTextureEnabled = !0;
L._OpacityTextureEnabled = !0;
L._ReflectionTextureEnabled = !0;
L._EmissiveTextureEnabled = !0;
L._SpecularTextureEnabled = !0;
L._BumpTextureEnabled = !0;
L._LightmapTextureEnabled = !0;
L._RefractionTextureEnabled = !0;
L._ColorGradingTextureEnabled = !0;
L._FresnelEnabled = !0;
L._ClearCoatTextureEnabled = !0;
L._ClearCoatBumpTextureEnabled = !0;
L._ClearCoatTintTextureEnabled = !0;
L._SheenTextureEnabled = !0;
L._AnisotropicTextureEnabled = !0;
L._ThicknessTextureEnabled = !0;
L._RefractionIntensityTextureEnabled = !0;
L._TranslucencyIntensityTextureEnabled = !0;
L._IridescenceTextureEnabled = !0;
const os = "decalFragmentDeclaration", ls = `#ifdef DECAL
uniform vec4 vDecalInfos;
#endif
`;
x.IncludesShadersStore[os] = ls;
const hs = "defaultFragmentDeclaration", fs = `uniform vec4 vEyePosition;
uniform vec4 vDiffuseColor;
#ifdef SPECULARTERM
uniform vec4 vSpecularColor;
#endif
uniform vec3 vEmissiveColor;
uniform vec3 vAmbientColor;
uniform float visibility;
#ifdef DIFFUSE
uniform vec2 vDiffuseInfos;
#endif
#ifdef AMBIENT
uniform vec2 vAmbientInfos;
#endif
#ifdef OPACITY 
uniform vec2 vOpacityInfos;
#endif
#ifdef EMISSIVE
uniform vec2 vEmissiveInfos;
#endif
#ifdef LIGHTMAP
uniform vec2 vLightmapInfos;
#endif
#ifdef BUMP
uniform vec3 vBumpInfos;
uniform vec2 vTangentSpaceParams;
#endif
#ifdef ALPHATEST
uniform float alphaCutOff;
#endif
#if defined(REFLECTIONMAP_SPHERICAL) || defined(REFLECTIONMAP_PROJECTION) || defined(REFRACTION) || defined(PREPASS)
uniform mat4 view;
#endif
#ifdef REFRACTION
uniform vec4 vRefractionInfos;
#ifndef REFRACTIONMAP_3D
uniform mat4 refractionMatrix;
#endif
#ifdef REFRACTIONFRESNEL
uniform vec4 refractionLeftColor;
uniform vec4 refractionRightColor;
#endif
#if defined(USE_LOCAL_REFRACTIONMAP_CUBIC) && defined(REFRACTIONMAP_3D)
uniform vec3 vRefractionPosition;
uniform vec3 vRefractionSize; 
#endif
#endif
#if defined(SPECULAR) && defined(SPECULARTERM)
uniform vec2 vSpecularInfos;
#endif
#ifdef DIFFUSEFRESNEL
uniform vec4 diffuseLeftColor;
uniform vec4 diffuseRightColor;
#endif
#ifdef OPACITYFRESNEL
uniform vec4 opacityParts;
#endif
#ifdef EMISSIVEFRESNEL
uniform vec4 emissiveLeftColor;
uniform vec4 emissiveRightColor;
#endif
#ifdef REFLECTION
uniform vec2 vReflectionInfos;
#if defined(REFLECTIONMAP_PLANAR) || defined(REFLECTIONMAP_CUBIC) || defined(REFLECTIONMAP_PROJECTION) || defined(REFLECTIONMAP_EQUIRECTANGULAR) || defined(REFLECTIONMAP_SPHERICAL) || defined(REFLECTIONMAP_SKYBOX)
uniform mat4 reflectionMatrix;
#endif
#ifndef REFLECTIONMAP_SKYBOX
#if defined(USE_LOCAL_REFLECTIONMAP_CUBIC) && defined(REFLECTIONMAP_CUBIC)
uniform vec3 vReflectionPosition;
uniform vec3 vReflectionSize; 
#endif
#endif
#ifdef REFLECTIONFRESNEL
uniform vec4 reflectionLeftColor;
uniform vec4 reflectionRightColor;
#endif
#endif
#ifdef DETAIL
uniform vec4 vDetailInfos;
#endif
#include<decalFragmentDeclaration>
#define ADDITIONAL_FRAGMENT_DECLARATION
`;
x.IncludesShadersStore[hs] = fs;
const ds = "defaultUboDeclaration", cs = `layout(std140,column_major) uniform;
uniform Material
{
vec4 diffuseLeftColor;
vec4 diffuseRightColor;
vec4 opacityParts;
vec4 reflectionLeftColor;
vec4 reflectionRightColor;
vec4 refractionLeftColor;
vec4 refractionRightColor;
vec4 emissiveLeftColor;
vec4 emissiveRightColor;
vec2 vDiffuseInfos;
vec2 vAmbientInfos;
vec2 vOpacityInfos;
vec2 vReflectionInfos;
vec3 vReflectionPosition;
vec3 vReflectionSize;
vec2 vEmissiveInfos;
vec2 vLightmapInfos;
vec2 vSpecularInfos;
vec3 vBumpInfos;
mat4 diffuseMatrix;
mat4 ambientMatrix;
mat4 opacityMatrix;
mat4 reflectionMatrix;
mat4 emissiveMatrix;
mat4 lightmapMatrix;
mat4 specularMatrix;
mat4 bumpMatrix;
vec2 vTangentSpaceParams;
float pointSize;
float alphaCutOff;
mat4 refractionMatrix;
vec4 vRefractionInfos;
vec3 vRefractionPosition;
vec3 vRefractionSize;
vec4 vSpecularColor;
vec3 vEmissiveColor;
vec4 vDiffuseColor;
vec3 vAmbientColor;
#define ADDITIONAL_UBO_DECLARATION
};
#include<sceneUboDeclaration>
#include<meshUboDeclaration>
`;
x.IncludesShadersStore[ds] = cs;
const us = "prePassDeclaration", ps = `#ifdef PREPASS
#extension GL_EXT_draw_buffers : require
layout(location=0) out highp vec4 glFragData[{X}];highp vec4 gl_FragColor;
#ifdef PREPASS_DEPTH
varying highp vec3 vViewPos;
#endif
#ifdef PREPASS_VELOCITY
varying highp vec4 vCurrentPosition;varying highp vec4 vPreviousPosition;
#endif
#endif
`;
x.IncludesShadersStore[us] = ps;
const ms = "oitDeclaration", _s = `#ifdef ORDER_INDEPENDENT_TRANSPARENCY
#extension GL_EXT_draw_buffers : require
layout(location=0) out vec2 depth; 
layout(location=1) out vec4 frontColor;
layout(location=2) out vec4 backColor;
#define MAX_DEPTH 99999.0
highp vec4 gl_FragColor;
uniform sampler2D oitDepthSampler;
uniform sampler2D oitFrontColorSampler;
#endif
`;
x.IncludesShadersStore[ms] = _s;
const gs = "mainUVVaryingDeclaration", vs = `#ifdef MAINUV{X}
varying vec2 vMainUV{X};
#endif
`;
x.IncludesShadersStore[gs] = vs;
const Ss = "lightFragmentDeclaration", Es = `#ifdef LIGHT{X}
uniform vec4 vLightData{X};
uniform vec4 vLightDiffuse{X};
#ifdef SPECULARTERM
uniform vec4 vLightSpecular{X};
#else
vec4 vLightSpecular{X}=vec4(0.);
#endif
#ifdef SHADOW{X}
#ifdef SHADOWCSM{X}
uniform mat4 lightMatrix{X}[SHADOWCSMNUM_CASCADES{X}];
uniform float viewFrustumZ{X}[SHADOWCSMNUM_CASCADES{X}];
uniform float frustumLengths{X}[SHADOWCSMNUM_CASCADES{X}];
uniform float cascadeBlendFactor{X};
varying vec4 vPositionFromLight{X}[SHADOWCSMNUM_CASCADES{X}];
varying float vDepthMetric{X}[SHADOWCSMNUM_CASCADES{X}];
varying vec4 vPositionFromCamera{X};
#if defined(SHADOWPCSS{X})
uniform highp sampler2DArrayShadow shadowSampler{X};
uniform highp sampler2DArray depthSampler{X};
uniform vec2 lightSizeUVCorrection{X}[SHADOWCSMNUM_CASCADES{X}];
uniform float depthCorrection{X}[SHADOWCSMNUM_CASCADES{X}];
uniform float penumbraDarkness{X};
#elif defined(SHADOWPCF{X})
uniform highp sampler2DArrayShadow shadowSampler{X};
#else
uniform highp sampler2DArray shadowSampler{X};
#endif
#ifdef SHADOWCSMDEBUG{X}
const vec3 vCascadeColorsMultiplier{X}[8]=vec3[8]
(
vec3 ( 1.5,0.0,0.0 ),
vec3 ( 0.0,1.5,0.0 ),
vec3 ( 0.0,0.0,5.5 ),
vec3 ( 1.5,0.0,5.5 ),
vec3 ( 1.5,1.5,0.0 ),
vec3 ( 1.0,1.0,1.0 ),
vec3 ( 0.0,1.0,5.5 ),
vec3 ( 0.5,3.5,0.75 )
);
vec3 shadowDebug{X};
#endif
#ifdef SHADOWCSMUSESHADOWMAXZ{X}
int index{X}=-1;
#else
int index{X}=SHADOWCSMNUM_CASCADES{X}-1;
#endif
float diff{X}=0.;
#elif defined(SHADOWCUBE{X})
uniform samplerCube shadowSampler{X};
#else
varying vec4 vPositionFromLight{X};
varying float vDepthMetric{X};
#if defined(SHADOWPCSS{X})
uniform highp sampler2DShadow shadowSampler{X};
uniform highp sampler2D depthSampler{X};
#elif defined(SHADOWPCF{X})
uniform highp sampler2DShadow shadowSampler{X};
#else
uniform sampler2D shadowSampler{X};
#endif
uniform mat4 lightMatrix{X};
#endif
uniform vec4 shadowsInfo{X};
uniform vec2 depthValues{X};
#endif
#ifdef SPOTLIGHT{X}
uniform vec4 vLightDirection{X};
uniform vec4 vLightFalloff{X};
#elif defined(POINTLIGHT{X})
uniform vec4 vLightFalloff{X};
#elif defined(HEMILIGHT{X})
uniform vec3 vLightGround{X};
#endif
#ifdef PROJECTEDLIGHTTEXTURE{X}
uniform mat4 textureProjectionMatrix{X};
uniform sampler2D projectionLightSampler{X};
#endif
#endif
`;
x.IncludesShadersStore[Ss] = Es;
const Ts = "lightUboDeclaration", xs = `#ifdef LIGHT{X}
uniform Light{X}
{
vec4 vLightData;
vec4 vLightDiffuse;
vec4 vLightSpecular;
#ifdef SPOTLIGHT{X}
vec4 vLightDirection;
vec4 vLightFalloff;
#elif defined(POINTLIGHT{X})
vec4 vLightFalloff;
#elif defined(HEMILIGHT{X})
vec3 vLightGround;
#endif
vec4 shadowsInfo;
vec2 depthValues;
} light{X};
#ifdef PROJECTEDLIGHTTEXTURE{X}
uniform mat4 textureProjectionMatrix{X};
uniform sampler2D projectionLightSampler{X};
#endif
#ifdef SHADOW{X}
#ifdef SHADOWCSM{X}
uniform mat4 lightMatrix{X}[SHADOWCSMNUM_CASCADES{X}];
uniform float viewFrustumZ{X}[SHADOWCSMNUM_CASCADES{X}];
uniform float frustumLengths{X}[SHADOWCSMNUM_CASCADES{X}];
uniform float cascadeBlendFactor{X};
varying vec4 vPositionFromLight{X}[SHADOWCSMNUM_CASCADES{X}];
varying float vDepthMetric{X}[SHADOWCSMNUM_CASCADES{X}];
varying vec4 vPositionFromCamera{X};
#if defined(SHADOWPCSS{X})
uniform highp sampler2DArrayShadow shadowSampler{X};
uniform highp sampler2DArray depthSampler{X};
uniform vec2 lightSizeUVCorrection{X}[SHADOWCSMNUM_CASCADES{X}];
uniform float depthCorrection{X}[SHADOWCSMNUM_CASCADES{X}];
uniform float penumbraDarkness{X};
#elif defined(SHADOWPCF{X})
uniform highp sampler2DArrayShadow shadowSampler{X};
#else
uniform highp sampler2DArray shadowSampler{X};
#endif
#ifdef SHADOWCSMDEBUG{X}
const vec3 vCascadeColorsMultiplier{X}[8]=vec3[8]
(
vec3 ( 1.5,0.0,0.0 ),
vec3 ( 0.0,1.5,0.0 ),
vec3 ( 0.0,0.0,5.5 ),
vec3 ( 1.5,0.0,5.5 ),
vec3 ( 1.5,1.5,0.0 ),
vec3 ( 1.0,1.0,1.0 ),
vec3 ( 0.0,1.0,5.5 ),
vec3 ( 0.5,3.5,0.75 )
);
vec3 shadowDebug{X};
#endif
#ifdef SHADOWCSMUSESHADOWMAXZ{X}
int index{X}=-1;
#else
int index{X}=SHADOWCSMNUM_CASCADES{X}-1;
#endif
float diff{X}=0.;
#elif defined(SHADOWCUBE{X})
uniform samplerCube shadowSampler{X}; 
#else
varying vec4 vPositionFromLight{X};
varying float vDepthMetric{X};
#if defined(SHADOWPCSS{X})
uniform highp sampler2DShadow shadowSampler{X};
uniform highp sampler2D depthSampler{X};
#elif defined(SHADOWPCF{X})
uniform highp sampler2DShadow shadowSampler{X};
#else
uniform sampler2D shadowSampler{X};
#endif
uniform mat4 lightMatrix{X};
#endif
#endif
#endif
`;
x.IncludesShadersStore[Ts] = xs;
const As = "lightsFragmentFunctions", Ms = `struct lightingInfo
{
vec3 diffuse;
#ifdef SPECULARTERM
vec3 specular;
#endif
#ifdef NDOTL
float ndl;
#endif
};
lightingInfo computeLighting(vec3 viewDirectionW,vec3 vNormal,vec4 lightData,vec3 diffuseColor,vec3 specularColor,float range,float glossiness) {
lightingInfo result;
vec3 lightVectorW;
float attenuation=1.0;
if (lightData.w==0.)
{
vec3 direction=lightData.xyz-vPositionW;
attenuation=max(0.,1.0-length(direction)/range);
lightVectorW=normalize(direction);
}
else
{
lightVectorW=normalize(-lightData.xyz);
}
float ndl=max(0.,dot(vNormal,lightVectorW));
#ifdef NDOTL
result.ndl=ndl;
#endif
result.diffuse=ndl*diffuseColor*attenuation;
#ifdef SPECULARTERM
vec3 angleW=normalize(viewDirectionW+lightVectorW);
float specComp=max(0.,dot(vNormal,angleW));
specComp=pow(specComp,max(1.,glossiness));
result.specular=specComp*specularColor*attenuation;
#endif
return result;
}
lightingInfo computeSpotLighting(vec3 viewDirectionW,vec3 vNormal,vec4 lightData,vec4 lightDirection,vec3 diffuseColor,vec3 specularColor,float range,float glossiness) {
lightingInfo result;
vec3 direction=lightData.xyz-vPositionW;
vec3 lightVectorW=normalize(direction);
float attenuation=max(0.,1.0-length(direction)/range);
float cosAngle=max(0.,dot(lightDirection.xyz,-lightVectorW));
if (cosAngle>=lightDirection.w)
{
cosAngle=max(0.,pow(cosAngle,lightData.w));
attenuation*=cosAngle;
float ndl=max(0.,dot(vNormal,lightVectorW));
#ifdef NDOTL
result.ndl=ndl;
#endif
result.diffuse=ndl*diffuseColor*attenuation;
#ifdef SPECULARTERM
vec3 angleW=normalize(viewDirectionW+lightVectorW);
float specComp=max(0.,dot(vNormal,angleW));
specComp=pow(specComp,max(1.,glossiness));
result.specular=specComp*specularColor*attenuation;
#endif
return result;
}
result.diffuse=vec3(0.);
#ifdef SPECULARTERM
result.specular=vec3(0.);
#endif
#ifdef NDOTL
result.ndl=0.;
#endif
return result;
}
lightingInfo computeHemisphericLighting(vec3 viewDirectionW,vec3 vNormal,vec4 lightData,vec3 diffuseColor,vec3 specularColor,vec3 groundColor,float glossiness) {
lightingInfo result;
float ndl=dot(vNormal,lightData.xyz)*0.5+0.5;
#ifdef NDOTL
result.ndl=ndl;
#endif
result.diffuse=mix(groundColor,diffuseColor,ndl);
#ifdef SPECULARTERM
vec3 angleW=normalize(viewDirectionW+lightData.xyz);
float specComp=max(0.,dot(vNormal,angleW));
specComp=pow(specComp,max(1.,glossiness));
result.specular=specComp*specularColor;
#endif
return result;
}
#define inline
vec3 computeProjectionTextureDiffuseLighting(sampler2D projectionLightSampler,mat4 textureProjectionMatrix){
vec4 strq=textureProjectionMatrix*vec4(vPositionW,1.0);
strq/=strq.w;
vec3 textureColor=texture2D(projectionLightSampler,strq.xy).rgb;
return textureColor;
}`;
x.IncludesShadersStore[As] = Ms;
const Cs = "shadowsFragmentFunctions", Rs = `#ifdef SHADOWS
#if defined(WEBGL2) || defined(WEBGPU) || defined(NATIVE)
#define TEXTUREFUNC(s,c,l) texture2DLodEXT(s,c,l)
#else
#define TEXTUREFUNC(s,c,b) texture2D(s,c,b)
#endif
#ifndef SHADOWFLOAT
float unpack(vec4 color)
{
const vec4 bit_shift=vec4(1.0/(255.0*255.0*255.0),1.0/(255.0*255.0),1.0/255.0,1.0);
return dot(color,bit_shift);
}
#endif
float computeFallOff(float value,vec2 clipSpace,float frustumEdgeFalloff)
{
float mask=smoothstep(1.0-frustumEdgeFalloff,1.00000012,clamp(dot(clipSpace,clipSpace),0.,1.));
return mix(value,1.0,mask);
}
#define inline
float computeShadowCube(vec3 lightPosition,samplerCube shadowSampler,float darkness,vec2 depthValues)
{
vec3 directionToLight=vPositionW-lightPosition;
float depth=length(directionToLight);
depth=(depth+depthValues.x)/(depthValues.y);
depth=clamp(depth,0.,1.0);
directionToLight=normalize(directionToLight);
directionToLight.y=-directionToLight.y;
#ifndef SHADOWFLOAT
float shadow=unpack(textureCube(shadowSampler,directionToLight));
#else
float shadow=textureCube(shadowSampler,directionToLight).x;
#endif
return depth>shadow ? darkness : 1.0;
}
#define inline
float computeShadowWithPoissonSamplingCube(vec3 lightPosition,samplerCube shadowSampler,float mapSize,float darkness,vec2 depthValues)
{
vec3 directionToLight=vPositionW-lightPosition;
float depth=length(directionToLight);
depth=(depth+depthValues.x)/(depthValues.y);
depth=clamp(depth,0.,1.0);
directionToLight=normalize(directionToLight);
directionToLight.y=-directionToLight.y;
float visibility=1.;
vec3 poissonDisk[4];
poissonDisk[0]=vec3(-1.0,1.0,-1.0);
poissonDisk[1]=vec3(1.0,-1.0,-1.0);
poissonDisk[2]=vec3(-1.0,-1.0,-1.0);
poissonDisk[3]=vec3(1.0,-1.0,1.0);
#ifndef SHADOWFLOAT
if (unpack(textureCube(shadowSampler,directionToLight+poissonDisk[0]*mapSize))<depth) visibility-=0.25;
if (unpack(textureCube(shadowSampler,directionToLight+poissonDisk[1]*mapSize))<depth) visibility-=0.25;
if (unpack(textureCube(shadowSampler,directionToLight+poissonDisk[2]*mapSize))<depth) visibility-=0.25;
if (unpack(textureCube(shadowSampler,directionToLight+poissonDisk[3]*mapSize))<depth) visibility-=0.25;
#else
if (textureCube(shadowSampler,directionToLight+poissonDisk[0]*mapSize).x<depth) visibility-=0.25;
if (textureCube(shadowSampler,directionToLight+poissonDisk[1]*mapSize).x<depth) visibility-=0.25;
if (textureCube(shadowSampler,directionToLight+poissonDisk[2]*mapSize).x<depth) visibility-=0.25;
if (textureCube(shadowSampler,directionToLight+poissonDisk[3]*mapSize).x<depth) visibility-=0.25;
#endif
return min(1.0,visibility+darkness);
}
#define inline
float computeShadowWithESMCube(vec3 lightPosition,samplerCube shadowSampler,float darkness,float depthScale,vec2 depthValues)
{
vec3 directionToLight=vPositionW-lightPosition;
float depth=length(directionToLight);
depth=(depth+depthValues.x)/(depthValues.y);
float shadowPixelDepth=clamp(depth,0.,1.0);
directionToLight=normalize(directionToLight);
directionToLight.y=-directionToLight.y;
#ifndef SHADOWFLOAT
float shadowMapSample=unpack(textureCube(shadowSampler,directionToLight));
#else
float shadowMapSample=textureCube(shadowSampler,directionToLight).x;
#endif
float esm=1.0-clamp(exp(min(87.,depthScale*shadowPixelDepth))*shadowMapSample,0.,1.-darkness); 
return esm;
}
#define inline
float computeShadowWithCloseESMCube(vec3 lightPosition,samplerCube shadowSampler,float darkness,float depthScale,vec2 depthValues)
{
vec3 directionToLight=vPositionW-lightPosition;
float depth=length(directionToLight);
depth=(depth+depthValues.x)/(depthValues.y);
float shadowPixelDepth=clamp(depth,0.,1.0);
directionToLight=normalize(directionToLight);
directionToLight.y=-directionToLight.y;
#ifndef SHADOWFLOAT
float shadowMapSample=unpack(textureCube(shadowSampler,directionToLight));
#else
float shadowMapSample=textureCube(shadowSampler,directionToLight).x;
#endif
float esm=clamp(exp(min(87.,-depthScale*(shadowPixelDepth-shadowMapSample))),darkness,1.);
return esm;
}
#if defined(WEBGL2) || defined(WEBGPU) || defined(NATIVE)
#define inline
float computeShadowCSM(float layer,vec4 vPositionFromLight,float depthMetric,highp sampler2DArray shadowSampler,float darkness,float frustumEdgeFalloff)
{
vec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;
vec2 uv=0.5*clipSpace.xy+vec2(0.5);
vec3 uvLayer=vec3(uv.x,uv.y,layer);
float shadowPixelDepth=clamp(depthMetric,0.,1.0);
#ifndef SHADOWFLOAT
float shadow=unpack(texture2D(shadowSampler,uvLayer));
#else
float shadow=texture2D(shadowSampler,uvLayer).x;
#endif
return shadowPixelDepth>shadow ? computeFallOff(darkness,clipSpace.xy,frustumEdgeFalloff) : 1.;
}
#endif
#define inline
float computeShadow(vec4 vPositionFromLight,float depthMetric,sampler2D shadowSampler,float darkness,float frustumEdgeFalloff)
{
vec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;
vec2 uv=0.5*clipSpace.xy+vec2(0.5);
if (uv.x<0. || uv.x>1.0 || uv.y<0. || uv.y>1.0)
{
return 1.0;
}
else
{
float shadowPixelDepth=clamp(depthMetric,0.,1.0);
#ifndef SHADOWFLOAT
float shadow=unpack(TEXTUREFUNC(shadowSampler,uv,0.));
#else
float shadow=TEXTUREFUNC(shadowSampler,uv,0.).x;
#endif
return shadowPixelDepth>shadow ? computeFallOff(darkness,clipSpace.xy,frustumEdgeFalloff) : 1.;
}
}
#define inline
float computeShadowWithPoissonSampling(vec4 vPositionFromLight,float depthMetric,sampler2D shadowSampler,float mapSize,float darkness,float frustumEdgeFalloff)
{
vec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;
vec2 uv=0.5*clipSpace.xy+vec2(0.5);
if (uv.x<0. || uv.x>1.0 || uv.y<0. || uv.y>1.0)
{
return 1.0;
}
else
{
float shadowPixelDepth=clamp(depthMetric,0.,1.0);
float visibility=1.;
vec2 poissonDisk[4];
poissonDisk[0]=vec2(-0.94201624,-0.39906216);
poissonDisk[1]=vec2(0.94558609,-0.76890725);
poissonDisk[2]=vec2(-0.094184101,-0.92938870);
poissonDisk[3]=vec2(0.34495938,0.29387760);
#ifndef SHADOWFLOAT
if (unpack(TEXTUREFUNC(shadowSampler,uv+poissonDisk[0]*mapSize,0.))<shadowPixelDepth) visibility-=0.25;
if (unpack(TEXTUREFUNC(shadowSampler,uv+poissonDisk[1]*mapSize,0.))<shadowPixelDepth) visibility-=0.25;
if (unpack(TEXTUREFUNC(shadowSampler,uv+poissonDisk[2]*mapSize,0.))<shadowPixelDepth) visibility-=0.25;
if (unpack(TEXTUREFUNC(shadowSampler,uv+poissonDisk[3]*mapSize,0.))<shadowPixelDepth) visibility-=0.25;
#else
if (TEXTUREFUNC(shadowSampler,uv+poissonDisk[0]*mapSize,0.).x<shadowPixelDepth) visibility-=0.25;
if (TEXTUREFUNC(shadowSampler,uv+poissonDisk[1]*mapSize,0.).x<shadowPixelDepth) visibility-=0.25;
if (TEXTUREFUNC(shadowSampler,uv+poissonDisk[2]*mapSize,0.).x<shadowPixelDepth) visibility-=0.25;
if (TEXTUREFUNC(shadowSampler,uv+poissonDisk[3]*mapSize,0.).x<shadowPixelDepth) visibility-=0.25;
#endif
return computeFallOff(min(1.0,visibility+darkness),clipSpace.xy,frustumEdgeFalloff);
}
}
#define inline
float computeShadowWithESM(vec4 vPositionFromLight,float depthMetric,sampler2D shadowSampler,float darkness,float depthScale,float frustumEdgeFalloff)
{
vec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;
vec2 uv=0.5*clipSpace.xy+vec2(0.5);
if (uv.x<0. || uv.x>1.0 || uv.y<0. || uv.y>1.0)
{
return 1.0;
}
else
{
float shadowPixelDepth=clamp(depthMetric,0.,1.0);
#ifndef SHADOWFLOAT
float shadowMapSample=unpack(TEXTUREFUNC(shadowSampler,uv,0.));
#else
float shadowMapSample=TEXTUREFUNC(shadowSampler,uv,0.).x;
#endif
float esm=1.0-clamp(exp(min(87.,depthScale*shadowPixelDepth))*shadowMapSample,0.,1.-darkness);
return computeFallOff(esm,clipSpace.xy,frustumEdgeFalloff);
}
}
#define inline
float computeShadowWithCloseESM(vec4 vPositionFromLight,float depthMetric,sampler2D shadowSampler,float darkness,float depthScale,float frustumEdgeFalloff)
{
vec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;
vec2 uv=0.5*clipSpace.xy+vec2(0.5);
if (uv.x<0. || uv.x>1.0 || uv.y<0. || uv.y>1.0)
{
return 1.0;
}
else
{
float shadowPixelDepth=clamp(depthMetric,0.,1.0); 
#ifndef SHADOWFLOAT
float shadowMapSample=unpack(TEXTUREFUNC(shadowSampler,uv,0.));
#else
float shadowMapSample=TEXTUREFUNC(shadowSampler,uv,0.).x;
#endif
float esm=clamp(exp(min(87.,-depthScale*(shadowPixelDepth-shadowMapSample))),darkness,1.);
return computeFallOff(esm,clipSpace.xy,frustumEdgeFalloff);
}
}
#ifdef IS_NDC_HALF_ZRANGE
#define ZINCLIP clipSpace.z
#else
#define ZINCLIP uvDepth.z
#endif
#if defined(WEBGL2) || defined(WEBGPU) || defined(NATIVE)
#define GREATEST_LESS_THAN_ONE 0.99999994
#define inline
float computeShadowWithCSMPCF1(float layer,vec4 vPositionFromLight,float depthMetric,highp sampler2DArrayShadow shadowSampler,float darkness,float frustumEdgeFalloff)
{
vec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;
vec3 uvDepth=vec3(0.5*clipSpace.xyz+vec3(0.5));
uvDepth.z=clamp(ZINCLIP,0.,GREATEST_LESS_THAN_ONE);
vec4 uvDepthLayer=vec4(uvDepth.x,uvDepth.y,layer,uvDepth.z);
float shadow=texture2D(shadowSampler,uvDepthLayer);
shadow=mix(darkness,1.,shadow);
return computeFallOff(shadow,clipSpace.xy,frustumEdgeFalloff);
}
#define inline
float computeShadowWithCSMPCF3(float layer,vec4 vPositionFromLight,float depthMetric,highp sampler2DArrayShadow shadowSampler,vec2 shadowMapSizeAndInverse,float darkness,float frustumEdgeFalloff)
{
vec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;
vec3 uvDepth=vec3(0.5*clipSpace.xyz+vec3(0.5));
uvDepth.z=clamp(ZINCLIP,0.,GREATEST_LESS_THAN_ONE);
vec2 uv=uvDepth.xy*shadowMapSizeAndInverse.x; 
uv+=0.5; 
vec2 st=fract(uv); 
vec2 base_uv=floor(uv)-0.5; 
base_uv*=shadowMapSizeAndInverse.y; 
vec2 uvw0=3.-2.*st;
vec2 uvw1=1.+2.*st;
vec2 u=vec2((2.-st.x)/uvw0.x-1.,st.x/uvw1.x+1.)*shadowMapSizeAndInverse.y;
vec2 v=vec2((2.-st.y)/uvw0.y-1.,st.y/uvw1.y+1.)*shadowMapSizeAndInverse.y;
float shadow=0.;
shadow+=uvw0.x*uvw0.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[0],v[0]),layer,uvDepth.z));
shadow+=uvw1.x*uvw0.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[1],v[0]),layer,uvDepth.z));
shadow+=uvw0.x*uvw1.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[0],v[1]),layer,uvDepth.z));
shadow+=uvw1.x*uvw1.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[1],v[1]),layer,uvDepth.z));
shadow=shadow/16.;
shadow=mix(darkness,1.,shadow);
return computeFallOff(shadow,clipSpace.xy,frustumEdgeFalloff);
}
#define inline
float computeShadowWithCSMPCF5(float layer,vec4 vPositionFromLight,float depthMetric,highp sampler2DArrayShadow shadowSampler,vec2 shadowMapSizeAndInverse,float darkness,float frustumEdgeFalloff)
{
vec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;
vec3 uvDepth=vec3(0.5*clipSpace.xyz+vec3(0.5));
uvDepth.z=clamp(ZINCLIP,0.,GREATEST_LESS_THAN_ONE);
vec2 uv=uvDepth.xy*shadowMapSizeAndInverse.x; 
uv+=0.5; 
vec2 st=fract(uv); 
vec2 base_uv=floor(uv)-0.5; 
base_uv*=shadowMapSizeAndInverse.y; 
vec2 uvw0=4.-3.*st;
vec2 uvw1=vec2(7.);
vec2 uvw2=1.+3.*st;
vec3 u=vec3((3.-2.*st.x)/uvw0.x-2.,(3.+st.x)/uvw1.x,st.x/uvw2.x+2.)*shadowMapSizeAndInverse.y;
vec3 v=vec3((3.-2.*st.y)/uvw0.y-2.,(3.+st.y)/uvw1.y,st.y/uvw2.y+2.)*shadowMapSizeAndInverse.y;
float shadow=0.;
shadow+=uvw0.x*uvw0.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[0],v[0]),layer,uvDepth.z));
shadow+=uvw1.x*uvw0.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[1],v[0]),layer,uvDepth.z));
shadow+=uvw2.x*uvw0.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[2],v[0]),layer,uvDepth.z));
shadow+=uvw0.x*uvw1.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[0],v[1]),layer,uvDepth.z));
shadow+=uvw1.x*uvw1.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[1],v[1]),layer,uvDepth.z));
shadow+=uvw2.x*uvw1.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[2],v[1]),layer,uvDepth.z));
shadow+=uvw0.x*uvw2.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[0],v[2]),layer,uvDepth.z));
shadow+=uvw1.x*uvw2.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[1],v[2]),layer,uvDepth.z));
shadow+=uvw2.x*uvw2.y*texture2D(shadowSampler,vec4(base_uv.xy+vec2(u[2],v[2]),layer,uvDepth.z));
shadow=shadow/144.;
shadow=mix(darkness,1.,shadow);
return computeFallOff(shadow,clipSpace.xy,frustumEdgeFalloff);
}
#define inline
float computeShadowWithPCF1(vec4 vPositionFromLight,float depthMetric,highp sampler2DShadow shadowSampler,float darkness,float frustumEdgeFalloff)
{
if (depthMetric>1.0 || depthMetric<0.0) {
return 1.0;
}
else
{
vec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;
vec3 uvDepth=vec3(0.5*clipSpace.xyz+vec3(0.5));
uvDepth.z=ZINCLIP;
float shadow=TEXTUREFUNC(shadowSampler,uvDepth,0.);
shadow=mix(darkness,1.,shadow);
return computeFallOff(shadow,clipSpace.xy,frustumEdgeFalloff);
}
}
#define inline
float computeShadowWithPCF3(vec4 vPositionFromLight,float depthMetric,highp sampler2DShadow shadowSampler,vec2 shadowMapSizeAndInverse,float darkness,float frustumEdgeFalloff)
{
if (depthMetric>1.0 || depthMetric<0.0) {
return 1.0;
}
else
{
vec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;
vec3 uvDepth=vec3(0.5*clipSpace.xyz+vec3(0.5));
uvDepth.z=ZINCLIP;
vec2 uv=uvDepth.xy*shadowMapSizeAndInverse.x; 
uv+=0.5; 
vec2 st=fract(uv); 
vec2 base_uv=floor(uv)-0.5; 
base_uv*=shadowMapSizeAndInverse.y; 
vec2 uvw0=3.-2.*st;
vec2 uvw1=1.+2.*st;
vec2 u=vec2((2.-st.x)/uvw0.x-1.,st.x/uvw1.x+1.)*shadowMapSizeAndInverse.y;
vec2 v=vec2((2.-st.y)/uvw0.y-1.,st.y/uvw1.y+1.)*shadowMapSizeAndInverse.y;
float shadow=0.;
shadow+=uvw0.x*uvw0.y*TEXTUREFUNC(shadowSampler,vec3(base_uv.xy+vec2(u[0],v[0]),uvDepth.z),0.);
shadow+=uvw1.x*uvw0.y*TEXTUREFUNC(shadowSampler,vec3(base_uv.xy+vec2(u[1],v[0]),uvDepth.z),0.);
shadow+=uvw0.x*uvw1.y*TEXTUREFUNC(shadowSampler,vec3(base_uv.xy+vec2(u[0],v[1]),uvDepth.z),0.);
shadow+=uvw1.x*uvw1.y*TEXTUREFUNC(shadowSampler,vec3(base_uv.xy+vec2(u[1],v[1]),uvDepth.z),0.);
shadow=shadow/16.;
shadow=mix(darkness,1.,shadow);
return computeFallOff(shadow,clipSpace.xy,frustumEdgeFalloff);
}
}
#define inline
float computeShadowWithPCF5(vec4 vPositionFromLight,float depthMetric,highp sampler2DShadow shadowSampler,vec2 shadowMapSizeAndInverse,float darkness,float frustumEdgeFalloff)
{
if (depthMetric>1.0 || depthMetric<0.0) {
return 1.0;
}
else
{
vec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;
vec3 uvDepth=vec3(0.5*clipSpace.xyz+vec3(0.5));
uvDepth.z=ZINCLIP;
vec2 uv=uvDepth.xy*shadowMapSizeAndInverse.x; 
uv+=0.5; 
vec2 st=fract(uv); 
vec2 base_uv=floor(uv)-0.5; 
base_uv*=shadowMapSizeAndInverse.y; 
vec2 uvw0=4.-3.*st;
vec2 uvw1=vec2(7.);
vec2 uvw2=1.+3.*st;
vec3 u=vec3((3.-2.*st.x)/uvw0.x-2.,(3.+st.x)/uvw1.x,st.x/uvw2.x+2.)*shadowMapSizeAndInverse.y;
vec3 v=vec3((3.-2.*st.y)/uvw0.y-2.,(3.+st.y)/uvw1.y,st.y/uvw2.y+2.)*shadowMapSizeAndInverse.y;
float shadow=0.;
shadow+=uvw0.x*uvw0.y*TEXTUREFUNC(shadowSampler,vec3(base_uv.xy+vec2(u[0],v[0]),uvDepth.z),0.);
shadow+=uvw1.x*uvw0.y*TEXTUREFUNC(shadowSampler,vec3(base_uv.xy+vec2(u[1],v[0]),uvDepth.z),0.);
shadow+=uvw2.x*uvw0.y*TEXTUREFUNC(shadowSampler,vec3(base_uv.xy+vec2(u[2],v[0]),uvDepth.z),0.);
shadow+=uvw0.x*uvw1.y*TEXTUREFUNC(shadowSampler,vec3(base_uv.xy+vec2(u[0],v[1]),uvDepth.z),0.);
shadow+=uvw1.x*uvw1.y*TEXTUREFUNC(shadowSampler,vec3(base_uv.xy+vec2(u[1],v[1]),uvDepth.z),0.);
shadow+=uvw2.x*uvw1.y*TEXTUREFUNC(shadowSampler,vec3(base_uv.xy+vec2(u[2],v[1]),uvDepth.z),0.);
shadow+=uvw0.x*uvw2.y*TEXTUREFUNC(shadowSampler,vec3(base_uv.xy+vec2(u[0],v[2]),uvDepth.z),0.);
shadow+=uvw1.x*uvw2.y*TEXTUREFUNC(shadowSampler,vec3(base_uv.xy+vec2(u[1],v[2]),uvDepth.z),0.);
shadow+=uvw2.x*uvw2.y*TEXTUREFUNC(shadowSampler,vec3(base_uv.xy+vec2(u[2],v[2]),uvDepth.z),0.);
shadow=shadow/144.;
shadow=mix(darkness,1.,shadow);
return computeFallOff(shadow,clipSpace.xy,frustumEdgeFalloff);
}
}
const vec3 PoissonSamplers32[64]=vec3[64](
vec3(0.06407013,0.05409927,0.),
vec3(0.7366577,0.5789394,0.),
vec3(-0.6270542,-0.5320278,0.),
vec3(-0.4096107,0.8411095,0.),
vec3(0.6849564,-0.4990818,0.),
vec3(-0.874181,-0.04579735,0.),
vec3(0.9989998,0.0009880066,0.),
vec3(-0.004920578,-0.9151649,0.),
vec3(0.1805763,0.9747483,0.),
vec3(-0.2138451,0.2635818,0.),
vec3(0.109845,0.3884785,0.),
vec3(0.06876755,-0.3581074,0.),
vec3(0.374073,-0.7661266,0.),
vec3(0.3079132,-0.1216763,0.),
vec3(-0.3794335,-0.8271583,0.),
vec3(-0.203878,-0.07715034,0.),
vec3(0.5912697,0.1469799,0.),
vec3(-0.88069,0.3031784,0.),
vec3(0.5040108,0.8283722,0.),
vec3(-0.5844124,0.5494877,0.),
vec3(0.6017799,-0.1726654,0.),
vec3(-0.5554981,0.1559997,0.),
vec3(-0.3016369,-0.3900928,0.),
vec3(-0.5550632,-0.1723762,0.),
vec3(0.925029,0.2995041,0.),
vec3(-0.2473137,0.5538505,0.),
vec3(0.9183037,-0.2862392,0.),
vec3(0.2469421,0.6718712,0.),
vec3(0.3916397,-0.4328209,0.),
vec3(-0.03576927,-0.6220032,0.),
vec3(-0.04661255,0.7995201,0.),
vec3(0.4402924,0.3640312,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.),
vec3(0.,0.,0.)
);
const vec3 PoissonSamplers64[64]=vec3[64](
vec3(-0.613392,0.617481,0.),
vec3(0.170019,-0.040254,0.),
vec3(-0.299417,0.791925,0.),
vec3(0.645680,0.493210,0.),
vec3(-0.651784,0.717887,0.),
vec3(0.421003,0.027070,0.),
vec3(-0.817194,-0.271096,0.),
vec3(-0.705374,-0.668203,0.),
vec3(0.977050,-0.108615,0.),
vec3(0.063326,0.142369,0.),
vec3(0.203528,0.214331,0.),
vec3(-0.667531,0.326090,0.),
vec3(-0.098422,-0.295755,0.),
vec3(-0.885922,0.215369,0.),
vec3(0.566637,0.605213,0.),
vec3(0.039766,-0.396100,0.),
vec3(0.751946,0.453352,0.),
vec3(0.078707,-0.715323,0.),
vec3(-0.075838,-0.529344,0.),
vec3(0.724479,-0.580798,0.),
vec3(0.222999,-0.215125,0.),
vec3(-0.467574,-0.405438,0.),
vec3(-0.248268,-0.814753,0.),
vec3(0.354411,-0.887570,0.),
vec3(0.175817,0.382366,0.),
vec3(0.487472,-0.063082,0.),
vec3(-0.084078,0.898312,0.),
vec3(0.488876,-0.783441,0.),
vec3(0.470016,0.217933,0.),
vec3(-0.696890,-0.549791,0.),
vec3(-0.149693,0.605762,0.),
vec3(0.034211,0.979980,0.),
vec3(0.503098,-0.308878,0.),
vec3(-0.016205,-0.872921,0.),
vec3(0.385784,-0.393902,0.),
vec3(-0.146886,-0.859249,0.),
vec3(0.643361,0.164098,0.),
vec3(0.634388,-0.049471,0.),
vec3(-0.688894,0.007843,0.),
vec3(0.464034,-0.188818,0.),
vec3(-0.440840,0.137486,0.),
vec3(0.364483,0.511704,0.),
vec3(0.034028,0.325968,0.),
vec3(0.099094,-0.308023,0.),
vec3(0.693960,-0.366253,0.),
vec3(0.678884,-0.204688,0.),
vec3(0.001801,0.780328,0.),
vec3(0.145177,-0.898984,0.),
vec3(0.062655,-0.611866,0.),
vec3(0.315226,-0.604297,0.),
vec3(-0.780145,0.486251,0.),
vec3(-0.371868,0.882138,0.),
vec3(0.200476,0.494430,0.),
vec3(-0.494552,-0.711051,0.),
vec3(0.612476,0.705252,0.),
vec3(-0.578845,-0.768792,0.),
vec3(-0.772454,-0.090976,0.),
vec3(0.504440,0.372295,0.),
vec3(0.155736,0.065157,0.),
vec3(0.391522,0.849605,0.),
vec3(-0.620106,-0.328104,0.),
vec3(0.789239,-0.419965,0.),
vec3(-0.545396,0.538133,0.),
vec3(-0.178564,-0.596057,0.)
);
#define inline
float computeShadowWithCSMPCSS(float layer,vec4 vPositionFromLight,float depthMetric,highp sampler2DArray depthSampler,highp sampler2DArrayShadow shadowSampler,float shadowMapSizeInverse,float lightSizeUV,float darkness,float frustumEdgeFalloff,int searchTapCount,int pcfTapCount,vec3[64] poissonSamplers,vec2 lightSizeUVCorrection,float depthCorrection,float penumbraDarkness)
{
vec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;
vec3 uvDepth=vec3(0.5*clipSpace.xyz+vec3(0.5));
uvDepth.z=clamp(ZINCLIP,0.,GREATEST_LESS_THAN_ONE);
vec4 uvDepthLayer=vec4(uvDepth.x,uvDepth.y,layer,uvDepth.z);
float blockerDepth=0.0;
float sumBlockerDepth=0.0;
float numBlocker=0.0;
for (int i=0; i<searchTapCount; i ++) {
blockerDepth=texture2D(depthSampler,vec3(uvDepth.xy+(lightSizeUV*lightSizeUVCorrection*shadowMapSizeInverse*PoissonSamplers32[i].xy),layer)).r;
if (blockerDepth<depthMetric) {
sumBlockerDepth+=blockerDepth;
numBlocker++;
}
}
float avgBlockerDepth=sumBlockerDepth/numBlocker;
float AAOffset=shadowMapSizeInverse*10.;
float penumbraRatio=((depthMetric-avgBlockerDepth)*depthCorrection+AAOffset);
vec4 filterRadius=vec4(penumbraRatio*lightSizeUV*lightSizeUVCorrection*shadowMapSizeInverse,0.,0.);
float random=getRand(vPositionFromLight.xy);
float rotationAngle=random*3.1415926;
vec2 rotationVector=vec2(cos(rotationAngle),sin(rotationAngle));
float shadow=0.;
for (int i=0; i<pcfTapCount; i++) {
vec4 offset=vec4(poissonSamplers[i],0.);
offset=vec4(offset.x*rotationVector.x-offset.y*rotationVector.y,offset.y*rotationVector.x+offset.x*rotationVector.y,0.,0.);
shadow+=texture2D(shadowSampler,uvDepthLayer+offset*filterRadius);
}
shadow/=float(pcfTapCount);
shadow=mix(shadow,1.,min((depthMetric-avgBlockerDepth)*depthCorrection*penumbraDarkness,1.));
shadow=mix(darkness,1.,shadow);
if (numBlocker<1.0) {
return 1.0;
}
else
{
return computeFallOff(shadow,clipSpace.xy,frustumEdgeFalloff);
}
}
#define inline
float computeShadowWithPCSS(vec4 vPositionFromLight,float depthMetric,sampler2D depthSampler,highp sampler2DShadow shadowSampler,float shadowMapSizeInverse,float lightSizeUV,float darkness,float frustumEdgeFalloff,int searchTapCount,int pcfTapCount,vec3[64] poissonSamplers)
{
if (depthMetric>1.0 || depthMetric<0.0) {
return 1.0;
}
else
{
vec3 clipSpace=vPositionFromLight.xyz/vPositionFromLight.w;
vec3 uvDepth=vec3(0.5*clipSpace.xyz+vec3(0.5));
uvDepth.z=ZINCLIP;
float blockerDepth=0.0;
float sumBlockerDepth=0.0;
float numBlocker=0.0;
for (int i=0; i<searchTapCount; i ++) {
blockerDepth=TEXTUREFUNC(depthSampler,uvDepth.xy+(lightSizeUV*shadowMapSizeInverse*PoissonSamplers32[i].xy),0.).r;
if (blockerDepth<depthMetric) {
sumBlockerDepth+=blockerDepth;
numBlocker++;
}
}
if (numBlocker<1.0) {
return 1.0;
}
else
{
float avgBlockerDepth=sumBlockerDepth/numBlocker;
float AAOffset=shadowMapSizeInverse*10.;
float penumbraRatio=((depthMetric-avgBlockerDepth)+AAOffset);
float filterRadius=penumbraRatio*lightSizeUV*shadowMapSizeInverse;
float random=getRand(vPositionFromLight.xy);
float rotationAngle=random*3.1415926;
vec2 rotationVector=vec2(cos(rotationAngle),sin(rotationAngle));
float shadow=0.;
for (int i=0; i<pcfTapCount; i++) {
vec3 offset=poissonSamplers[i];
offset=vec3(offset.x*rotationVector.x-offset.y*rotationVector.y,offset.y*rotationVector.x+offset.x*rotationVector.y,0.);
shadow+=TEXTUREFUNC(shadowSampler,uvDepth+offset*filterRadius,0.);
}
shadow/=float(pcfTapCount);
shadow=mix(shadow,1.,depthMetric-avgBlockerDepth);
shadow=mix(darkness,1.,shadow);
return computeFallOff(shadow,clipSpace.xy,frustumEdgeFalloff);
}
}
}
#define inline
float computeShadowWithPCSS16(vec4 vPositionFromLight,float depthMetric,sampler2D depthSampler,highp sampler2DShadow shadowSampler,float shadowMapSizeInverse,float lightSizeUV,float darkness,float frustumEdgeFalloff)
{
return computeShadowWithPCSS(vPositionFromLight,depthMetric,depthSampler,shadowSampler,shadowMapSizeInverse,lightSizeUV,darkness,frustumEdgeFalloff,16,16,PoissonSamplers32);
}
#define inline
float computeShadowWithPCSS32(vec4 vPositionFromLight,float depthMetric,sampler2D depthSampler,highp sampler2DShadow shadowSampler,float shadowMapSizeInverse,float lightSizeUV,float darkness,float frustumEdgeFalloff)
{
return computeShadowWithPCSS(vPositionFromLight,depthMetric,depthSampler,shadowSampler,shadowMapSizeInverse,lightSizeUV,darkness,frustumEdgeFalloff,16,32,PoissonSamplers32);
}
#define inline
float computeShadowWithPCSS64(vec4 vPositionFromLight,float depthMetric,sampler2D depthSampler,highp sampler2DShadow shadowSampler,float shadowMapSizeInverse,float lightSizeUV,float darkness,float frustumEdgeFalloff)
{
return computeShadowWithPCSS(vPositionFromLight,depthMetric,depthSampler,shadowSampler,shadowMapSizeInverse,lightSizeUV,darkness,frustumEdgeFalloff,32,64,PoissonSamplers64);
}
#define inline
float computeShadowWithCSMPCSS16(float layer,vec4 vPositionFromLight,float depthMetric,highp sampler2DArray depthSampler,highp sampler2DArrayShadow shadowSampler,float shadowMapSizeInverse,float lightSizeUV,float darkness,float frustumEdgeFalloff,vec2 lightSizeUVCorrection,float depthCorrection,float penumbraDarkness)
{
return computeShadowWithCSMPCSS(layer,vPositionFromLight,depthMetric,depthSampler,shadowSampler,shadowMapSizeInverse,lightSizeUV,darkness,frustumEdgeFalloff,16,16,PoissonSamplers32,lightSizeUVCorrection,depthCorrection,penumbraDarkness);
}
#define inline
float computeShadowWithCSMPCSS32(float layer,vec4 vPositionFromLight,float depthMetric,highp sampler2DArray depthSampler,highp sampler2DArrayShadow shadowSampler,float shadowMapSizeInverse,float lightSizeUV,float darkness,float frustumEdgeFalloff,vec2 lightSizeUVCorrection,float depthCorrection,float penumbraDarkness)
{
return computeShadowWithCSMPCSS(layer,vPositionFromLight,depthMetric,depthSampler,shadowSampler,shadowMapSizeInverse,lightSizeUV,darkness,frustumEdgeFalloff,16,32,PoissonSamplers32,lightSizeUVCorrection,depthCorrection,penumbraDarkness);
}
#define inline
float computeShadowWithCSMPCSS64(float layer,vec4 vPositionFromLight,float depthMetric,highp sampler2DArray depthSampler,highp sampler2DArrayShadow shadowSampler,float shadowMapSizeInverse,float lightSizeUV,float darkness,float frustumEdgeFalloff,vec2 lightSizeUVCorrection,float depthCorrection,float penumbraDarkness)
{
return computeShadowWithCSMPCSS(layer,vPositionFromLight,depthMetric,depthSampler,shadowSampler,shadowMapSizeInverse,lightSizeUV,darkness,frustumEdgeFalloff,32,64,PoissonSamplers64,lightSizeUVCorrection,depthCorrection,penumbraDarkness);
}
#endif
#endif
`;
x.IncludesShadersStore[Cs] = Rs;
const Is = "samplerFragmentDeclaration", bs = `#ifdef _DEFINENAME_
#if _DEFINENAME_DIRECTUV==1
#define v_VARYINGNAME_UV vMainUV1
#elif _DEFINENAME_DIRECTUV==2
#define v_VARYINGNAME_UV vMainUV2
#elif _DEFINENAME_DIRECTUV==3
#define v_VARYINGNAME_UV vMainUV3
#elif _DEFINENAME_DIRECTUV==4
#define v_VARYINGNAME_UV vMainUV4
#elif _DEFINENAME_DIRECTUV==5
#define v_VARYINGNAME_UV vMainUV5
#elif _DEFINENAME_DIRECTUV==6
#define v_VARYINGNAME_UV vMainUV6
#else
varying vec2 v_VARYINGNAME_UV;
#endif
uniform sampler2D _SAMPLERNAME_Sampler;
#endif
`;
x.IncludesShadersStore[Is] = bs;
const Ps = "fresnelFunction", Ds = `#ifdef FRESNEL
float computeFresnelTerm(vec3 viewDirection,vec3 worldNormal,float bias,float power)
{
float fresnelTerm=pow(bias+abs(dot(viewDirection,worldNormal)),power);
return clamp(fresnelTerm,0.,1.);
}
#endif
`;
x.IncludesShadersStore[Ps] = Ds;
const Ls = "reflectionFunction", Fs = `vec3 computeFixedEquirectangularCoords(vec4 worldPos,vec3 worldNormal,vec3 direction)
{
float lon=atan(direction.z,direction.x);
float lat=acos(direction.y);
vec2 sphereCoords=vec2(lon,lat)*RECIPROCAL_PI2*2.0;
float s=sphereCoords.x*0.5+0.5;
float t=sphereCoords.y;
return vec3(s,t,0); 
}
vec3 computeMirroredFixedEquirectangularCoords(vec4 worldPos,vec3 worldNormal,vec3 direction)
{
float lon=atan(direction.z,direction.x);
float lat=acos(direction.y);
vec2 sphereCoords=vec2(lon,lat)*RECIPROCAL_PI2*2.0;
float s=sphereCoords.x*0.5+0.5;
float t=sphereCoords.y;
return vec3(1.0-s,t,0); 
}
vec3 computeEquirectangularCoords(vec4 worldPos,vec3 worldNormal,vec3 eyePosition,mat4 reflectionMatrix)
{
vec3 cameraToVertex=normalize(worldPos.xyz-eyePosition);
vec3 r=normalize(reflect(cameraToVertex,worldNormal));
r=vec3(reflectionMatrix*vec4(r,0));
float lon=atan(r.z,r.x);
float lat=acos(r.y);
vec2 sphereCoords=vec2(lon,lat)*RECIPROCAL_PI2*2.0;
float s=sphereCoords.x*0.5+0.5;
float t=sphereCoords.y;
return vec3(s,t,0);
}
vec3 computeSphericalCoords(vec4 worldPos,vec3 worldNormal,mat4 view,mat4 reflectionMatrix)
{
vec3 viewDir=normalize(vec3(view*worldPos));
vec3 viewNormal=normalize(vec3(view*vec4(worldNormal,0.0)));
vec3 r=reflect(viewDir,viewNormal);
r=vec3(reflectionMatrix*vec4(r,0));
r.z=r.z-1.0;
float m=2.0*length(r);
return vec3(r.x/m+0.5,1.0-r.y/m-0.5,0);
}
vec3 computePlanarCoords(vec4 worldPos,vec3 worldNormal,vec3 eyePosition,mat4 reflectionMatrix)
{
vec3 viewDir=worldPos.xyz-eyePosition;
vec3 coords=normalize(reflect(viewDir,worldNormal));
return vec3(reflectionMatrix*vec4(coords,1));
}
vec3 computeCubicCoords(vec4 worldPos,vec3 worldNormal,vec3 eyePosition,mat4 reflectionMatrix)
{
vec3 viewDir=normalize(worldPos.xyz-eyePosition);
vec3 coords=reflect(viewDir,worldNormal);
coords=vec3(reflectionMatrix*vec4(coords,0));
#ifdef INVERTCUBICMAP
coords.y*=-1.0;
#endif
return coords;
}
vec3 computeCubicLocalCoords(vec4 worldPos,vec3 worldNormal,vec3 eyePosition,mat4 reflectionMatrix,vec3 reflectionSize,vec3 reflectionPosition)
{
vec3 viewDir=normalize(worldPos.xyz-eyePosition);
vec3 coords=reflect(viewDir,worldNormal);
coords=parallaxCorrectNormal(worldPos.xyz,coords,reflectionSize,reflectionPosition);
coords=vec3(reflectionMatrix*vec4(coords,0));
#ifdef INVERTCUBICMAP
coords.y*=-1.0;
#endif
return coords;
}
vec3 computeProjectionCoords(vec4 worldPos,mat4 view,mat4 reflectionMatrix)
{
return vec3(reflectionMatrix*(view*worldPos));
}
vec3 computeSkyBoxCoords(vec3 positionW,mat4 reflectionMatrix)
{
return vec3(reflectionMatrix*vec4(positionW,1.));
}
#ifdef REFLECTION
vec3 computeReflectionCoords(vec4 worldPos,vec3 worldNormal)
{
#ifdef REFLECTIONMAP_MIRROREDEQUIRECTANGULAR_FIXED
vec3 direction=normalize(vDirectionW);
return computeMirroredFixedEquirectangularCoords(worldPos,worldNormal,direction);
#endif
#ifdef REFLECTIONMAP_EQUIRECTANGULAR_FIXED
vec3 direction=normalize(vDirectionW);
return computeFixedEquirectangularCoords(worldPos,worldNormal,direction);
#endif
#ifdef REFLECTIONMAP_EQUIRECTANGULAR
return computeEquirectangularCoords(worldPos,worldNormal,vEyePosition.xyz,reflectionMatrix);
#endif
#ifdef REFLECTIONMAP_SPHERICAL
return computeSphericalCoords(worldPos,worldNormal,view,reflectionMatrix);
#endif
#ifdef REFLECTIONMAP_PLANAR
return computePlanarCoords(worldPos,worldNormal,vEyePosition.xyz,reflectionMatrix);
#endif
#ifdef REFLECTIONMAP_CUBIC
#ifdef USE_LOCAL_REFLECTIONMAP_CUBIC
return computeCubicLocalCoords(worldPos,worldNormal,vEyePosition.xyz,reflectionMatrix,vReflectionSize,vReflectionPosition);
#else
return computeCubicCoords(worldPos,worldNormal,vEyePosition.xyz,reflectionMatrix);
#endif
#endif
#ifdef REFLECTIONMAP_PROJECTION
return computeProjectionCoords(worldPos,view,reflectionMatrix);
#endif
#ifdef REFLECTIONMAP_SKYBOX
return computeSkyBoxCoords(vPositionUVW,reflectionMatrix);
#endif
#ifdef REFLECTIONMAP_EXPLICIT
return vec3(0,0,0);
#endif
}
#endif
`;
x.IncludesShadersStore[Ls] = Fs;
const ws = "imageProcessingDeclaration", Os = `#ifdef EXPOSURE
uniform float exposureLinear;
#endif
#ifdef CONTRAST
uniform float contrast;
#endif
#if defined(VIGNETTE) || defined(DITHER)
uniform vec2 vInverseScreenSize;
#endif
#ifdef VIGNETTE
uniform vec4 vignetteSettings1;
uniform vec4 vignetteSettings2;
#endif
#ifdef COLORCURVES
uniform vec4 vCameraColorCurveNegative;
uniform vec4 vCameraColorCurveNeutral;
uniform vec4 vCameraColorCurvePositive;
#endif
#ifdef COLORGRADING
#ifdef COLORGRADING3D
uniform highp sampler3D txColorTransform;
#else
uniform sampler2D txColorTransform;
#endif
uniform vec4 colorTransformSettings;
#endif
#ifdef DITHER
uniform float ditherIntensity;
#endif
`;
x.IncludesShadersStore[ws] = Os;
const Ns = "imageProcessingFunctions", ys = `#if defined(COLORGRADING) && !defined(COLORGRADING3D)
/** 
* Polyfill for SAMPLE_TEXTURE_3D,which is unsupported in WebGL.
* sampler3dSetting.x=textureOffset (0.5/textureSize).
* sampler3dSetting.y=textureSize.
*/
#define inline
vec3 sampleTexture3D(sampler2D colorTransform,vec3 color,vec2 sampler3dSetting)
{
float sliceSize=2.0*sampler3dSetting.x; 
#ifdef SAMPLER3DGREENDEPTH
float sliceContinuous=(color.g-sampler3dSetting.x)*sampler3dSetting.y;
#else
float sliceContinuous=(color.b-sampler3dSetting.x)*sampler3dSetting.y;
#endif
float sliceInteger=floor(sliceContinuous);
float sliceFraction=sliceContinuous-sliceInteger;
#ifdef SAMPLER3DGREENDEPTH
vec2 sliceUV=color.rb;
#else
vec2 sliceUV=color.rg;
#endif
sliceUV.x*=sliceSize;
sliceUV.x+=sliceInteger*sliceSize;
sliceUV=saturate(sliceUV);
vec4 slice0Color=texture2D(colorTransform,sliceUV);
sliceUV.x+=sliceSize;
sliceUV=saturate(sliceUV);
vec4 slice1Color=texture2D(colorTransform,sliceUV);
vec3 result=mix(slice0Color.rgb,slice1Color.rgb,sliceFraction);
#ifdef SAMPLER3DBGRMAP
color.rgb=result.rgb;
#else
color.rgb=result.bgr;
#endif
return color;
}
#endif
#ifdef TONEMAPPING_ACES
const mat3 ACESInputMat=mat3(
vec3(0.59719,0.07600,0.02840),
vec3(0.35458,0.90834,0.13383),
vec3(0.04823,0.01566,0.83777)
);
const mat3 ACESOutputMat=mat3(
vec3( 1.60475,-0.10208,-0.00327),
vec3(-0.53108, 1.10813,-0.07276),
vec3(-0.07367,-0.00605, 1.07602)
);
vec3 RRTAndODTFit(vec3 v)
{
vec3 a=v*(v+0.0245786)-0.000090537;
vec3 b=v*(0.983729*v+0.4329510)+0.238081;
return a/b;
}
vec3 ACESFitted(vec3 color)
{
color=ACESInputMat*color;
color=RRTAndODTFit(color);
color=ACESOutputMat*color;
color=saturate(color);
return color;
}
#endif
#define CUSTOM_IMAGEPROCESSINGFUNCTIONS_DEFINITIONS
vec4 applyImageProcessing(vec4 result) {
#define CUSTOM_IMAGEPROCESSINGFUNCTIONS_UPDATERESULT_ATSTART
#ifdef EXPOSURE
result.rgb*=exposureLinear;
#endif
#ifdef VIGNETTE
vec2 viewportXY=gl_FragCoord.xy*vInverseScreenSize;
viewportXY=viewportXY*2.0-1.0;
vec3 vignetteXY1=vec3(viewportXY*vignetteSettings1.xy+vignetteSettings1.zw,1.0);
float vignetteTerm=dot(vignetteXY1,vignetteXY1);
float vignette=pow(vignetteTerm,vignetteSettings2.w);
vec3 vignetteColor=vignetteSettings2.rgb;
#ifdef VIGNETTEBLENDMODEMULTIPLY
vec3 vignetteColorMultiplier=mix(vignetteColor,vec3(1,1,1),vignette);
result.rgb*=vignetteColorMultiplier;
#endif
#ifdef VIGNETTEBLENDMODEOPAQUE
result.rgb=mix(vignetteColor,result.rgb,vignette);
#endif
#endif
#ifdef TONEMAPPING
#ifdef TONEMAPPING_ACES
result.rgb=ACESFitted(result.rgb);
#else
const float tonemappingCalibration=1.590579;
result.rgb=1.0-exp2(-tonemappingCalibration*result.rgb);
#endif
#endif
result.rgb=toGammaSpace(result.rgb);
result.rgb=saturate(result.rgb);
#ifdef CONTRAST
vec3 resultHighContrast=result.rgb*result.rgb*(3.0-2.0*result.rgb);
if (contrast<1.0) {
result.rgb=mix(vec3(0.5,0.5,0.5),result.rgb,contrast);
} else {
result.rgb=mix(result.rgb,resultHighContrast,contrast-1.0);
}
#endif
#ifdef COLORGRADING
vec3 colorTransformInput=result.rgb*colorTransformSettings.xxx+colorTransformSettings.yyy;
#ifdef COLORGRADING3D
vec3 colorTransformOutput=texture(txColorTransform,colorTransformInput).rgb;
#else
vec3 colorTransformOutput=sampleTexture3D(txColorTransform,colorTransformInput,colorTransformSettings.yz).rgb;
#endif
result.rgb=mix(result.rgb,colorTransformOutput,colorTransformSettings.www);
#endif
#ifdef COLORCURVES
float luma=getLuminance(result.rgb);
vec2 curveMix=clamp(vec2(luma*3.0-1.5,luma*-3.0+1.5),vec2(0.0),vec2(1.0));
vec4 colorCurve=vCameraColorCurveNeutral+curveMix.x*vCameraColorCurvePositive-curveMix.y*vCameraColorCurveNegative;
result.rgb*=colorCurve.rgb;
result.rgb=mix(vec3(luma),result.rgb,colorCurve.a);
#endif
#ifdef DITHER
float rand=getRand(gl_FragCoord.xy*vInverseScreenSize);
float dither=mix(-ditherIntensity,ditherIntensity,rand);
result.rgb=saturate(result.rgb+vec3(dither));
#endif
#define CUSTOM_IMAGEPROCESSINGFUNCTIONS_UPDATERESULT_ATEND
return result;
}`;
x.IncludesShadersStore[Ns] = ys;
const Us = "bumpFragmentMainFunctions", Bs = `#if defined(BUMP) || defined(CLEARCOAT_BUMP) || defined(ANISOTROPIC) || defined(DETAIL)
#if defined(TANGENT) && defined(NORMAL) 
varying mat3 vTBN;
#endif
#ifdef OBJECTSPACE_NORMALMAP
uniform mat4 normalMatrix;
#if defined(WEBGL2) || defined(WEBGPU)
mat4 toNormalMatrix(mat4 wMatrix)
{
mat4 ret=inverse(wMatrix);
ret=transpose(ret);
ret[0][3]=0.;
ret[1][3]=0.;
ret[2][3]=0.;
ret[3]=vec4(0.,0.,0.,1.);
return ret;
}
#else
mat4 toNormalMatrix(mat4 m)
{
float
a00=m[0][0],a01=m[0][1],a02=m[0][2],a03=m[0][3],
a10=m[1][0],a11=m[1][1],a12=m[1][2],a13=m[1][3],
a20=m[2][0],a21=m[2][1],a22=m[2][2],a23=m[2][3],
a30=m[3][0],a31=m[3][1],a32=m[3][2],a33=m[3][3],
b00=a00*a11-a01*a10,
b01=a00*a12-a02*a10,
b02=a00*a13-a03*a10,
b03=a01*a12-a02*a11,
b04=a01*a13-a03*a11,
b05=a02*a13-a03*a12,
b06=a20*a31-a21*a30,
b07=a20*a32-a22*a30,
b08=a20*a33-a23*a30,
b09=a21*a32-a22*a31,
b10=a21*a33-a23*a31,
b11=a22*a33-a23*a32,
det=b00*b11-b01*b10+b02*b09+b03*b08-b04*b07+b05*b06;
mat4 mi=mat4(
a11*b11-a12*b10+a13*b09,
a02*b10-a01*b11-a03*b09,
a31*b05-a32*b04+a33*b03,
a22*b04-a21*b05-a23*b03,
a12*b08-a10*b11-a13*b07,
a00*b11-a02*b08+a03*b07,
a32*b02-a30*b05-a33*b01,
a20*b05-a22*b02+a23*b01,
a10*b10-a11*b08+a13*b06,
a01*b08-a00*b10-a03*b06,
a30*b04-a31*b02+a33*b00,
a21*b02-a20*b04-a23*b00,
a11*b07-a10*b09-a12*b06,
a00*b09-a01*b07+a02*b06,
a31*b01-a30*b03-a32*b00,
a20*b03-a21*b01+a22*b00)/det;
return mat4(mi[0][0],mi[1][0],mi[2][0],mi[3][0],
mi[0][1],mi[1][1],mi[2][1],mi[3][1],
mi[0][2],mi[1][2],mi[2][2],mi[3][2],
mi[0][3],mi[1][3],mi[2][3],mi[3][3]);
}
#endif
#endif
vec3 perturbNormalBase(mat3 cotangentFrame,vec3 normal,float scale)
{
#ifdef NORMALXYSCALE
normal=normalize(normal*vec3(scale,scale,1.0));
#endif
return normalize(cotangentFrame*normal);
}
vec3 perturbNormal(mat3 cotangentFrame,vec3 textureSample,float scale)
{
return perturbNormalBase(cotangentFrame,textureSample*2.0-1.0,scale);
}
mat3 cotangent_frame(vec3 normal,vec3 p,vec2 uv,vec2 tangentSpaceParams)
{
vec3 dp1=dFdx(p);
vec3 dp2=dFdy(p);
vec2 duv1=dFdx(uv);
vec2 duv2=dFdy(uv);
vec3 dp2perp=cross(dp2,normal);
vec3 dp1perp=cross(normal,dp1);
vec3 tangent=dp2perp*duv1.x+dp1perp*duv2.x;
vec3 bitangent=dp2perp*duv1.y+dp1perp*duv2.y;
tangent*=tangentSpaceParams.x;
bitangent*=tangentSpaceParams.y;
float det=max(dot(tangent,tangent),dot(bitangent,bitangent));
float invmax=det==0.0 ? 0.0 : inversesqrt(det);
return mat3(tangent*invmax,bitangent*invmax,normal);
}
#endif
`;
x.IncludesShadersStore[Us] = Bs;
const Vs = "bumpFragmentFunctions", Xs = `#if defined(BUMP)
#include<samplerFragmentDeclaration>(_DEFINENAME_,BUMP,_VARYINGNAME_,Bump,_SAMPLERNAME_,bump)
#endif
#if defined(DETAIL)
#include<samplerFragmentDeclaration>(_DEFINENAME_,DETAIL,_VARYINGNAME_,Detail,_SAMPLERNAME_,detail)
#endif
#if defined(BUMP) && defined(PARALLAX)
const float minSamples=4.;
const float maxSamples=15.;
const int iMaxSamples=15;
vec2 parallaxOcclusion(vec3 vViewDirCoT,vec3 vNormalCoT,vec2 texCoord,float parallaxScale) {
float parallaxLimit=length(vViewDirCoT.xy)/vViewDirCoT.z;
parallaxLimit*=parallaxScale;
vec2 vOffsetDir=normalize(vViewDirCoT.xy);
vec2 vMaxOffset=vOffsetDir*parallaxLimit;
float numSamples=maxSamples+(dot(vViewDirCoT,vNormalCoT)*(minSamples-maxSamples));
float stepSize=1.0/numSamples;
float currRayHeight=1.0;
vec2 vCurrOffset=vec2(0,0);
vec2 vLastOffset=vec2(0,0);
float lastSampledHeight=1.0;
float currSampledHeight=1.0;
bool keepWorking=true;
for (int i=0; i<iMaxSamples; i++)
{
currSampledHeight=texture2D(bumpSampler,texCoord+vCurrOffset).w;
if (!keepWorking)
{
}
else if (currSampledHeight>currRayHeight)
{
float delta1=currSampledHeight-currRayHeight;
float delta2=(currRayHeight+stepSize)-lastSampledHeight;
float ratio=delta1/(delta1+delta2);
vCurrOffset=(ratio)* vLastOffset+(1.0-ratio)*vCurrOffset;
keepWorking=false;
}
else
{
currRayHeight-=stepSize;
vLastOffset=vCurrOffset;
vCurrOffset+=stepSize*vMaxOffset;
lastSampledHeight=currSampledHeight;
}
}
return vCurrOffset;
}
vec2 parallaxOffset(vec3 viewDir,float heightScale)
{
float height=texture2D(bumpSampler,vBumpUV).w;
vec2 texCoordOffset=heightScale*viewDir.xy*height;
return -texCoordOffset;
}
#endif
`;
x.IncludesShadersStore[Vs] = Xs;
const zs = "logDepthDeclaration", Ws = `#ifdef LOGARITHMICDEPTH
uniform float logarithmicDepthConstant;
varying float vFragmentDepth;
#endif
`;
x.IncludesShadersStore[zs] = Ws;
const ks = "fogFragmentDeclaration", Hs = `#ifdef FOG
#define FOGMODE_NONE 0.
#define FOGMODE_EXP 1.
#define FOGMODE_EXP2 2.
#define FOGMODE_LINEAR 3.
#define E 2.71828
uniform vec4 vFogInfos;
uniform vec3 vFogColor;
varying vec3 vFogDistance;
float CalcFogFactor()
{
float fogCoeff=1.0;
float fogStart=vFogInfos.y;
float fogEnd=vFogInfos.z;
float fogDensity=vFogInfos.w;
float fogDistance=length(vFogDistance);
if (FOGMODE_LINEAR==vFogInfos.x)
{
fogCoeff=(fogEnd-fogDistance)/(fogEnd-fogStart);
}
else if (FOGMODE_EXP==vFogInfos.x)
{
fogCoeff=1.0/pow(E,fogDistance*fogDensity);
}
else if (FOGMODE_EXP2==vFogInfos.x)
{
fogCoeff=1.0/pow(E,fogDistance*fogDistance*fogDensity*fogDensity);
}
return clamp(fogCoeff,0.0,1.0);
}
#endif
`;
x.IncludesShadersStore[ks] = Hs;
const Gs = "bumpFragment", $s = `vec2 uvOffset=vec2(0.0,0.0);
#if defined(BUMP) || defined(PARALLAX) || defined(DETAIL)
#ifdef NORMALXYSCALE
float normalScale=1.0;
#elif defined(BUMP)
float normalScale=vBumpInfos.y;
#else
float normalScale=1.0;
#endif
#if defined(TANGENT) && defined(NORMAL)
mat3 TBN=vTBN;
#elif defined(BUMP)
vec2 TBNUV=gl_FrontFacing ? vBumpUV : -vBumpUV;
mat3 TBN=cotangent_frame(normalW*normalScale,vPositionW,TBNUV,vTangentSpaceParams);
#else
vec2 TBNUV=gl_FrontFacing ? vDetailUV : -vDetailUV;
mat3 TBN=cotangent_frame(normalW*normalScale,vPositionW,TBNUV,vec2(1.,1.));
#endif
#elif defined(ANISOTROPIC)
#if defined(TANGENT) && defined(NORMAL)
mat3 TBN=vTBN;
#else
vec2 TBNUV=gl_FrontFacing ? vMainUV1 : -vMainUV1;
mat3 TBN=cotangent_frame(normalW,vPositionW,TBNUV,vec2(1.,1.));
#endif
#endif
#ifdef PARALLAX
mat3 invTBN=transposeMat3(TBN);
#ifdef PARALLAXOCCLUSION
uvOffset=parallaxOcclusion(invTBN*-viewDirectionW,invTBN*normalW,vBumpUV,vBumpInfos.z);
#else
uvOffset=parallaxOffset(invTBN*viewDirectionW,vBumpInfos.z);
#endif
#endif
#ifdef DETAIL
vec4 detailColor=texture2D(detailSampler,vDetailUV+uvOffset);
vec2 detailNormalRG=detailColor.wy*2.0-1.0;
float detailNormalB=sqrt(1.-saturate(dot(detailNormalRG,detailNormalRG)));
vec3 detailNormal=vec3(detailNormalRG,detailNormalB);
#endif
#ifdef BUMP
#ifdef OBJECTSPACE_NORMALMAP
#define CUSTOM_FRAGMENT_BUMP_FRAGMENT
normalW=normalize(texture2D(bumpSampler,vBumpUV).xyz *2.0-1.0);
normalW=normalize(mat3(normalMatrix)*normalW);
#elif !defined(DETAIL)
normalW=perturbNormal(TBN,texture2D(bumpSampler,vBumpUV+uvOffset).xyz,vBumpInfos.y);
#else
vec3 bumpNormal=texture2D(bumpSampler,vBumpUV+uvOffset).xyz*2.0-1.0;
#if DETAIL_NORMALBLENDMETHOD==0 
detailNormal.xy*=vDetailInfos.z;
vec3 blendedNormal=normalize(vec3(bumpNormal.xy+detailNormal.xy,bumpNormal.z*detailNormal.z));
#elif DETAIL_NORMALBLENDMETHOD==1 
detailNormal.xy*=vDetailInfos.z;
bumpNormal+=vec3(0.0,0.0,1.0);
detailNormal*=vec3(-1.0,-1.0,1.0);
vec3 blendedNormal=bumpNormal*dot(bumpNormal,detailNormal)/bumpNormal.z-detailNormal;
#endif
normalW=perturbNormalBase(TBN,blendedNormal,vBumpInfos.y);
#endif
#elif defined(DETAIL)
detailNormal.xy*=vDetailInfos.z;
normalW=perturbNormalBase(TBN,detailNormal,vDetailInfos.z);
#endif
`;
x.IncludesShadersStore[Gs] = $s;
const Ys = "decalFragment", Zs = `#ifdef DECAL
#ifdef GAMMADECAL
decalColor.rgb=toLinearSpace(decalColor.rgb);
#endif
#ifdef DECAL_SMOOTHALPHA
decalColor.a*=decalColor.a;
#endif
surfaceAlbedo.rgb=mix(surfaceAlbedo.rgb,decalColor.rgb,decalColor.a);
#endif
`;
x.IncludesShadersStore[Ys] = Zs;
const js = "depthPrePass", Qs = `#ifdef DEPTHPREPASS
gl_FragColor=vec4(0.,0.,0.,1.0);
return;
#endif
`;
x.IncludesShadersStore[js] = Qs;
const Ks = "lightFragment", qs = `#ifdef LIGHT{X}
#if defined(SHADOWONLY) || defined(LIGHTMAP) && defined(LIGHTMAPEXCLUDED{X}) && defined(LIGHTMAPNOSPECULAR{X})
#else
#ifdef PBR
#ifdef SPOTLIGHT{X}
preInfo=computePointAndSpotPreLightingInfo(light{X}.vLightData,viewDirectionW,normalW);
#elif defined(POINTLIGHT{X})
preInfo=computePointAndSpotPreLightingInfo(light{X}.vLightData,viewDirectionW,normalW);
#elif defined(HEMILIGHT{X})
preInfo=computeHemisphericPreLightingInfo(light{X}.vLightData,viewDirectionW,normalW);
#elif defined(DIRLIGHT{X})
preInfo=computeDirectionalPreLightingInfo(light{X}.vLightData,viewDirectionW,normalW);
#endif
preInfo.NdotV=NdotV;
#ifdef SPOTLIGHT{X}
#ifdef LIGHT_FALLOFF_GLTF{X}
preInfo.attenuation=computeDistanceLightFalloff_GLTF(preInfo.lightDistanceSquared,light{X}.vLightFalloff.y);
preInfo.attenuation*=computeDirectionalLightFalloff_GLTF(light{X}.vLightDirection.xyz,preInfo.L,light{X}.vLightFalloff.z,light{X}.vLightFalloff.w);
#elif defined(LIGHT_FALLOFF_PHYSICAL{X})
preInfo.attenuation=computeDistanceLightFalloff_Physical(preInfo.lightDistanceSquared);
preInfo.attenuation*=computeDirectionalLightFalloff_Physical(light{X}.vLightDirection.xyz,preInfo.L,light{X}.vLightDirection.w);
#elif defined(LIGHT_FALLOFF_STANDARD{X})
preInfo.attenuation=computeDistanceLightFalloff_Standard(preInfo.lightOffset,light{X}.vLightFalloff.x);
preInfo.attenuation*=computeDirectionalLightFalloff_Standard(light{X}.vLightDirection.xyz,preInfo.L,light{X}.vLightDirection.w,light{X}.vLightData.w);
#else
preInfo.attenuation=computeDistanceLightFalloff(preInfo.lightOffset,preInfo.lightDistanceSquared,light{X}.vLightFalloff.x,light{X}.vLightFalloff.y);
preInfo.attenuation*=computeDirectionalLightFalloff(light{X}.vLightDirection.xyz,preInfo.L,light{X}.vLightDirection.w,light{X}.vLightData.w,light{X}.vLightFalloff.z,light{X}.vLightFalloff.w);
#endif
#elif defined(POINTLIGHT{X})
#ifdef LIGHT_FALLOFF_GLTF{X}
preInfo.attenuation=computeDistanceLightFalloff_GLTF(preInfo.lightDistanceSquared,light{X}.vLightFalloff.y);
#elif defined(LIGHT_FALLOFF_PHYSICAL{X})
preInfo.attenuation=computeDistanceLightFalloff_Physical(preInfo.lightDistanceSquared);
#elif defined(LIGHT_FALLOFF_STANDARD{X})
preInfo.attenuation=computeDistanceLightFalloff_Standard(preInfo.lightOffset,light{X}.vLightFalloff.x);
#else
preInfo.attenuation=computeDistanceLightFalloff(preInfo.lightOffset,preInfo.lightDistanceSquared,light{X}.vLightFalloff.x,light{X}.vLightFalloff.y);
#endif
#else
preInfo.attenuation=1.0;
#endif
#ifdef HEMILIGHT{X}
preInfo.roughness=roughness;
#else
preInfo.roughness=adjustRoughnessFromLightProperties(roughness,light{X}.vLightSpecular.a,preInfo.lightDistance);
#endif
#ifdef IRIDESCENCE
preInfo.iridescenceIntensity=iridescenceIntensity;
#endif
#ifdef HEMILIGHT{X}
info.diffuse=computeHemisphericDiffuseLighting(preInfo,light{X}.vLightDiffuse.rgb,light{X}.vLightGround);
#elif defined(SS_TRANSLUCENCY)
info.diffuse=computeDiffuseAndTransmittedLighting(preInfo,light{X}.vLightDiffuse.rgb,subSurfaceOut.transmittance);
#else
info.diffuse=computeDiffuseLighting(preInfo,light{X}.vLightDiffuse.rgb);
#endif
#ifdef SPECULARTERM
#ifdef ANISOTROPIC
info.specular=computeAnisotropicSpecularLighting(preInfo,viewDirectionW,normalW,anisotropicOut.anisotropicTangent,anisotropicOut.anisotropicBitangent,anisotropicOut.anisotropy,clearcoatOut.specularEnvironmentR0,specularEnvironmentR90,AARoughnessFactors.x,light{X}.vLightDiffuse.rgb);
#else
info.specular=computeSpecularLighting(preInfo,normalW,clearcoatOut.specularEnvironmentR0,specularEnvironmentR90,AARoughnessFactors.x,light{X}.vLightDiffuse.rgb);
#endif
#endif
#ifdef SHEEN
#ifdef SHEEN_LINKWITHALBEDO
preInfo.roughness=sheenOut.sheenIntensity;
#else
#ifdef HEMILIGHT{X}
preInfo.roughness=sheenOut.sheenRoughness;
#else
preInfo.roughness=adjustRoughnessFromLightProperties(sheenOut.sheenRoughness,light{X}.vLightSpecular.a,preInfo.lightDistance);
#endif
#endif
info.sheen=computeSheenLighting(preInfo,normalW,sheenOut.sheenColor,specularEnvironmentR90,AARoughnessFactors.x,light{X}.vLightDiffuse.rgb);
#endif
#ifdef CLEARCOAT
#ifdef HEMILIGHT{X}
preInfo.roughness=clearcoatOut.clearCoatRoughness;
#else
preInfo.roughness=adjustRoughnessFromLightProperties(clearcoatOut.clearCoatRoughness,light{X}.vLightSpecular.a,preInfo.lightDistance);
#endif
info.clearCoat=computeClearCoatLighting(preInfo,clearcoatOut.clearCoatNormalW,clearcoatOut.clearCoatAARoughnessFactors.x,clearcoatOut.clearCoatIntensity,light{X}.vLightDiffuse.rgb);
#ifdef CLEARCOAT_TINT
absorption=computeClearCoatLightingAbsorption(clearcoatOut.clearCoatNdotVRefract,preInfo.L,clearcoatOut.clearCoatNormalW,clearcoatOut.clearCoatColor,clearcoatOut.clearCoatThickness,clearcoatOut.clearCoatIntensity);
info.diffuse*=absorption;
#ifdef SPECULARTERM
info.specular*=absorption;
#endif
#endif
info.diffuse*=info.clearCoat.w;
#ifdef SPECULARTERM
info.specular*=info.clearCoat.w;
#endif
#ifdef SHEEN
info.sheen*=info.clearCoat.w;
#endif
#endif
#else
#ifdef SPOTLIGHT{X}
info=computeSpotLighting(viewDirectionW,normalW,light{X}.vLightData,light{X}.vLightDirection,light{X}.vLightDiffuse.rgb,light{X}.vLightSpecular.rgb,light{X}.vLightDiffuse.a,glossiness);
#elif defined(HEMILIGHT{X})
info=computeHemisphericLighting(viewDirectionW,normalW,light{X}.vLightData,light{X}.vLightDiffuse.rgb,light{X}.vLightSpecular.rgb,light{X}.vLightGround,glossiness);
#elif defined(POINTLIGHT{X}) || defined(DIRLIGHT{X})
info=computeLighting(viewDirectionW,normalW,light{X}.vLightData,light{X}.vLightDiffuse.rgb,light{X}.vLightSpecular.rgb,light{X}.vLightDiffuse.a,glossiness);
#endif
#endif
#ifdef PROJECTEDLIGHTTEXTURE{X}
info.diffuse*=computeProjectionTextureDiffuseLighting(projectionLightSampler{X},textureProjectionMatrix{X});
#endif
#endif
#ifdef SHADOW{X}
#ifdef SHADOWCSM{X}
for (int i=0; i<SHADOWCSMNUM_CASCADES{X}; i++) 
{
#ifdef SHADOWCSM_RIGHTHANDED{X}
diff{X}=viewFrustumZ{X}[i]+vPositionFromCamera{X}.z;
#else
diff{X}=viewFrustumZ{X}[i]-vPositionFromCamera{X}.z;
#endif
if (diff{X}>=0.) {
index{X}=i;
break;
}
}
#ifdef SHADOWCSMUSESHADOWMAXZ{X}
if (index{X}>=0)
#endif
{
#if defined(SHADOWPCF{X})
#if defined(SHADOWLOWQUALITY{X})
shadow=computeShadowWithCSMPCF1(float(index{X}),vPositionFromLight{X}[index{X}],vDepthMetric{X}[index{X}],shadowSampler{X},light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);
#elif defined(SHADOWMEDIUMQUALITY{X})
shadow=computeShadowWithCSMPCF3(float(index{X}),vPositionFromLight{X}[index{X}],vDepthMetric{X}[index{X}],shadowSampler{X},light{X}.shadowsInfo.yz,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);
#else
shadow=computeShadowWithCSMPCF5(float(index{X}),vPositionFromLight{X}[index{X}],vDepthMetric{X}[index{X}],shadowSampler{X},light{X}.shadowsInfo.yz,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);
#endif
#elif defined(SHADOWPCSS{X})
#if defined(SHADOWLOWQUALITY{X})
shadow=computeShadowWithCSMPCSS16(float(index{X}),vPositionFromLight{X}[index{X}],vDepthMetric{X}[index{X}],depthSampler{X},shadowSampler{X},light{X}.shadowsInfo.y,light{X}.shadowsInfo.z,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w,lightSizeUVCorrection{X}[index{X}],depthCorrection{X}[index{X}],penumbraDarkness{X});
#elif defined(SHADOWMEDIUMQUALITY{X})
shadow=computeShadowWithCSMPCSS32(float(index{X}),vPositionFromLight{X}[index{X}],vDepthMetric{X}[index{X}],depthSampler{X},shadowSampler{X},light{X}.shadowsInfo.y,light{X}.shadowsInfo.z,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w,lightSizeUVCorrection{X}[index{X}],depthCorrection{X}[index{X}],penumbraDarkness{X});
#else
shadow=computeShadowWithCSMPCSS64(float(index{X}),vPositionFromLight{X}[index{X}],vDepthMetric{X}[index{X}],depthSampler{X},shadowSampler{X},light{X}.shadowsInfo.y,light{X}.shadowsInfo.z,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w,lightSizeUVCorrection{X}[index{X}],depthCorrection{X}[index{X}],penumbraDarkness{X});
#endif
#else
shadow=computeShadowCSM(float(index{X}),vPositionFromLight{X}[index{X}],vDepthMetric{X}[index{X}],shadowSampler{X},light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);
#endif
#ifdef SHADOWCSMDEBUG{X}
shadowDebug{X}=vec3(shadow)*vCascadeColorsMultiplier{X}[index{X}];
#endif
#ifndef SHADOWCSMNOBLEND{X}
float frustumLength=frustumLengths{X}[index{X}];
float diffRatio=clamp(diff{X}/frustumLength,0.,1.)*cascadeBlendFactor{X};
if (index{X}<(SHADOWCSMNUM_CASCADES{X}-1) && diffRatio<1.)
{
index{X}+=1;
float nextShadow=0.;
#if defined(SHADOWPCF{X})
#if defined(SHADOWLOWQUALITY{X})
nextShadow=computeShadowWithCSMPCF1(float(index{X}),vPositionFromLight{X}[index{X}],vDepthMetric{X}[index{X}],shadowSampler{X},light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);
#elif defined(SHADOWMEDIUMQUALITY{X})
nextShadow=computeShadowWithCSMPCF3(float(index{X}),vPositionFromLight{X}[index{X}],vDepthMetric{X}[index{X}],shadowSampler{X},light{X}.shadowsInfo.yz,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);
#else
nextShadow=computeShadowWithCSMPCF5(float(index{X}),vPositionFromLight{X}[index{X}],vDepthMetric{X}[index{X}],shadowSampler{X},light{X}.shadowsInfo.yz,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);
#endif
#elif defined(SHADOWPCSS{X})
#if defined(SHADOWLOWQUALITY{X})
nextShadow=computeShadowWithCSMPCSS16(float(index{X}),vPositionFromLight{X}[index{X}],vDepthMetric{X}[index{X}],depthSampler{X},shadowSampler{X},light{X}.shadowsInfo.y,light{X}.shadowsInfo.z,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w,lightSizeUVCorrection{X}[index{X}],depthCorrection{X}[index{X}],penumbraDarkness{X});
#elif defined(SHADOWMEDIUMQUALITY{X})
nextShadow=computeShadowWithCSMPCSS32(float(index{X}),vPositionFromLight{X}[index{X}],vDepthMetric{X}[index{X}],depthSampler{X},shadowSampler{X},light{X}.shadowsInfo.y,light{X}.shadowsInfo.z,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w,lightSizeUVCorrection{X}[index{X}],depthCorrection{X}[index{X}],penumbraDarkness{X});
#else
nextShadow=computeShadowWithCSMPCSS64(float(index{X}),vPositionFromLight{X}[index{X}],vDepthMetric{X}[index{X}],depthSampler{X},shadowSampler{X},light{X}.shadowsInfo.y,light{X}.shadowsInfo.z,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w,lightSizeUVCorrection{X}[index{X}],depthCorrection{X}[index{X}],penumbraDarkness{X});
#endif
#else
nextShadow=computeShadowCSM(float(index{X}),vPositionFromLight{X}[index{X}],vDepthMetric{X}[index{X}],shadowSampler{X},light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);
#endif
shadow=mix(nextShadow,shadow,diffRatio);
#ifdef SHADOWCSMDEBUG{X}
shadowDebug{X}=mix(vec3(nextShadow)*vCascadeColorsMultiplier{X}[index{X}],shadowDebug{X},diffRatio);
#endif
}
#endif
}
#elif defined(SHADOWCLOSEESM{X})
#if defined(SHADOWCUBE{X})
shadow=computeShadowWithCloseESMCube(light{X}.vLightData.xyz,shadowSampler{X},light{X}.shadowsInfo.x,light{X}.shadowsInfo.z,light{X}.depthValues);
#else
shadow=computeShadowWithCloseESM(vPositionFromLight{X},vDepthMetric{X},shadowSampler{X},light{X}.shadowsInfo.x,light{X}.shadowsInfo.z,light{X}.shadowsInfo.w);
#endif
#elif defined(SHADOWESM{X})
#if defined(SHADOWCUBE{X})
shadow=computeShadowWithESMCube(light{X}.vLightData.xyz,shadowSampler{X},light{X}.shadowsInfo.x,light{X}.shadowsInfo.z,light{X}.depthValues);
#else
shadow=computeShadowWithESM(vPositionFromLight{X},vDepthMetric{X},shadowSampler{X},light{X}.shadowsInfo.x,light{X}.shadowsInfo.z,light{X}.shadowsInfo.w);
#endif
#elif defined(SHADOWPOISSON{X})
#if defined(SHADOWCUBE{X})
shadow=computeShadowWithPoissonSamplingCube(light{X}.vLightData.xyz,shadowSampler{X},light{X}.shadowsInfo.y,light{X}.shadowsInfo.x,light{X}.depthValues);
#else
shadow=computeShadowWithPoissonSampling(vPositionFromLight{X},vDepthMetric{X},shadowSampler{X},light{X}.shadowsInfo.y,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);
#endif
#elif defined(SHADOWPCF{X})
#if defined(SHADOWLOWQUALITY{X})
shadow=computeShadowWithPCF1(vPositionFromLight{X},vDepthMetric{X},shadowSampler{X},light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);
#elif defined(SHADOWMEDIUMQUALITY{X})
shadow=computeShadowWithPCF3(vPositionFromLight{X},vDepthMetric{X},shadowSampler{X},light{X}.shadowsInfo.yz,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);
#else
shadow=computeShadowWithPCF5(vPositionFromLight{X},vDepthMetric{X},shadowSampler{X},light{X}.shadowsInfo.yz,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);
#endif
#elif defined(SHADOWPCSS{X})
#if defined(SHADOWLOWQUALITY{X})
shadow=computeShadowWithPCSS16(vPositionFromLight{X},vDepthMetric{X},depthSampler{X},shadowSampler{X},light{X}.shadowsInfo.y,light{X}.shadowsInfo.z,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);
#elif defined(SHADOWMEDIUMQUALITY{X})
shadow=computeShadowWithPCSS32(vPositionFromLight{X},vDepthMetric{X},depthSampler{X},shadowSampler{X},light{X}.shadowsInfo.y,light{X}.shadowsInfo.z,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);
#else
shadow=computeShadowWithPCSS64(vPositionFromLight{X},vDepthMetric{X},depthSampler{X},shadowSampler{X},light{X}.shadowsInfo.y,light{X}.shadowsInfo.z,light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);
#endif
#else
#if defined(SHADOWCUBE{X})
shadow=computeShadowCube(light{X}.vLightData.xyz,shadowSampler{X},light{X}.shadowsInfo.x,light{X}.depthValues);
#else
shadow=computeShadow(vPositionFromLight{X},vDepthMetric{X},shadowSampler{X},light{X}.shadowsInfo.x,light{X}.shadowsInfo.w);
#endif
#endif
#ifdef SHADOWONLY
#ifndef SHADOWINUSE
#define SHADOWINUSE
#endif
globalShadow+=shadow;
shadowLightCount+=1.0;
#endif
#else
shadow=1.;
#endif
#ifndef SHADOWONLY
#ifdef CUSTOMUSERLIGHTING
diffuseBase+=computeCustomDiffuseLighting(info,diffuseBase,shadow);
#ifdef SPECULARTERM
specularBase+=computeCustomSpecularLighting(info,specularBase,shadow);
#endif
#elif defined(LIGHTMAP) && defined(LIGHTMAPEXCLUDED{X})
diffuseBase+=lightmapColor.rgb*shadow;
#ifdef SPECULARTERM
#ifndef LIGHTMAPNOSPECULAR{X}
specularBase+=info.specular*shadow*lightmapColor.rgb;
#endif
#endif
#ifdef CLEARCOAT
#ifndef LIGHTMAPNOSPECULAR{X}
clearCoatBase+=info.clearCoat.rgb*shadow*lightmapColor.rgb;
#endif
#endif
#ifdef SHEEN
#ifndef LIGHTMAPNOSPECULAR{X}
sheenBase+=info.sheen.rgb*shadow;
#endif
#endif
#else
#ifdef SHADOWCSMDEBUG{X}
diffuseBase+=info.diffuse*shadowDebug{X};
#else 
diffuseBase+=info.diffuse*shadow;
#endif
#ifdef SPECULARTERM
specularBase+=info.specular*shadow;
#endif
#ifdef CLEARCOAT
clearCoatBase+=info.clearCoat.rgb*shadow;
#endif
#ifdef SHEEN
sheenBase+=info.sheen.rgb*shadow;
#endif
#endif
#endif
#endif
`;
x.IncludesShadersStore[Ks] = qs;
const Js = "logDepthFragment", ea = `#ifdef LOGARITHMICDEPTH
gl_FragDepthEXT=log2(vFragmentDepth)*logarithmicDepthConstant*0.5;
#endif
`;
x.IncludesShadersStore[Js] = ea;
const ta = "fogFragment", ia = `#ifdef FOG
float fog=CalcFogFactor();
#ifdef PBR
fog=toLinearSpace(fog);
#endif
color.rgb=mix(vFogColor,color.rgb,fog);
#endif
`;
x.IncludesShadersStore[ta] = ia;
const ra = "oitFragment", sa = `#ifdef ORDER_INDEPENDENT_TRANSPARENCY
float fragDepth=gl_FragCoord.z; 
#ifdef ORDER_INDEPENDENT_TRANSPARENCY_16BITS
uint halfFloat=packHalf2x16(vec2(fragDepth));
vec2 full=unpackHalf2x16(halfFloat);
fragDepth=full.x;
#endif
ivec2 fragCoord=ivec2(gl_FragCoord.xy);
vec2 lastDepth=texelFetch(oitDepthSampler,fragCoord,0).rg;
vec4 lastFrontColor=texelFetch(oitFrontColorSampler,fragCoord,0);
depth.rg=vec2(-MAX_DEPTH);
frontColor=lastFrontColor;
backColor=vec4(0.0);
#ifdef USE_REVERSE_DEPTHBUFFER
float furthestDepth=-lastDepth.x;
float nearestDepth=lastDepth.y;
#else
float nearestDepth=-lastDepth.x;
float furthestDepth=lastDepth.y;
#endif
float alphaMultiplier=1.0-lastFrontColor.a;
#ifdef USE_REVERSE_DEPTHBUFFER
if (fragDepth>nearestDepth || fragDepth<furthestDepth) {
#else
if (fragDepth<nearestDepth || fragDepth>furthestDepth) {
#endif
return;
}
#ifdef USE_REVERSE_DEPTHBUFFER
if (fragDepth<nearestDepth && fragDepth>furthestDepth) {
#else
if (fragDepth>nearestDepth && fragDepth<furthestDepth) {
#endif
depth.rg=vec2(-fragDepth,fragDepth);
return;
}
#endif
`;
x.IncludesShadersStore[ra] = sa;
const aa = "defaultPixelShader", na = `#include<__decl__defaultFragment>
#if defined(BUMP) || !defined(NORMAL)
#extension GL_OES_standard_derivatives : enable
#endif
#include<prePassDeclaration>[SCENE_MRT_COUNT]
#include<oitDeclaration>
#define CUSTOM_FRAGMENT_BEGIN
#ifdef LOGARITHMICDEPTH
#extension GL_EXT_frag_depth : enable
#endif
#define RECIPROCAL_PI2 0.15915494
varying vec3 vPositionW;
#ifdef NORMAL
varying vec3 vNormalW;
#endif
#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
varying vec4 vColor;
#endif
#include<mainUVVaryingDeclaration>[1..7]
#include<helperFunctions>
#include<__decl__lightFragment>[0..maxSimultaneousLights]
#include<lightsFragmentFunctions>
#include<shadowsFragmentFunctions>
#include<samplerFragmentDeclaration>(_DEFINENAME_,DIFFUSE,_VARYINGNAME_,Diffuse,_SAMPLERNAME_,diffuse)
#include<samplerFragmentDeclaration>(_DEFINENAME_,AMBIENT,_VARYINGNAME_,Ambient,_SAMPLERNAME_,ambient)
#include<samplerFragmentDeclaration>(_DEFINENAME_,OPACITY,_VARYINGNAME_,Opacity,_SAMPLERNAME_,opacity)
#include<samplerFragmentDeclaration>(_DEFINENAME_,EMISSIVE,_VARYINGNAME_,Emissive,_SAMPLERNAME_,emissive)
#include<samplerFragmentDeclaration>(_DEFINENAME_,LIGHTMAP,_VARYINGNAME_,Lightmap,_SAMPLERNAME_,lightmap)
#include<samplerFragmentDeclaration>(_DEFINENAME_,DECAL,_VARYINGNAME_,Decal,_SAMPLERNAME_,decal)
#ifdef REFRACTION
#ifdef REFRACTIONMAP_3D
uniform samplerCube refractionCubeSampler;
#else
uniform sampler2D refraction2DSampler;
#endif
#endif
#if defined(SPECULARTERM)
#include<samplerFragmentDeclaration>(_DEFINENAME_,SPECULAR,_VARYINGNAME_,Specular,_SAMPLERNAME_,specular)
#endif
#include<fresnelFunction>
#ifdef REFLECTION
#ifdef REFLECTIONMAP_3D
uniform samplerCube reflectionCubeSampler;
#else
uniform sampler2D reflection2DSampler;
#endif
#ifdef REFLECTIONMAP_SKYBOX
varying vec3 vPositionUVW;
#else
#if defined(REFLECTIONMAP_EQUIRECTANGULAR_FIXED) || defined(REFLECTIONMAP_MIRROREDEQUIRECTANGULAR_FIXED)
varying vec3 vDirectionW;
#endif
#endif
#include<reflectionFunction>
#endif
#include<imageProcessingDeclaration>
#include<imageProcessingFunctions>
#include<bumpFragmentMainFunctions>
#include<bumpFragmentFunctions>
#include<clipPlaneFragmentDeclaration>
#include<logDepthDeclaration>
#include<fogFragmentDeclaration>
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
#include<clipPlaneFragment>
vec3 viewDirectionW=normalize(vEyePosition.xyz-vPositionW);
vec4 baseColor=vec4(1.,1.,1.,1.);
vec3 diffuseColor=vDiffuseColor.rgb;
float alpha=vDiffuseColor.a;
#ifdef NORMAL
vec3 normalW=normalize(vNormalW);
#else
vec3 normalW=normalize(-cross(dFdx(vPositionW),dFdy(vPositionW)));
#endif
#include<bumpFragment>
#ifdef TWOSIDEDLIGHTING
normalW=gl_FrontFacing ? normalW : -normalW;
#endif
#ifdef DIFFUSE
baseColor=texture2D(diffuseSampler,vDiffuseUV+uvOffset);
#if defined(ALPHATEST) && !defined(ALPHATEST_AFTERALLALPHACOMPUTATIONS)
if (baseColor.a<alphaCutOff)
discard;
#endif
#ifdef ALPHAFROMDIFFUSE
alpha*=baseColor.a;
#endif
#define CUSTOM_FRAGMENT_UPDATE_ALPHA
baseColor.rgb*=vDiffuseInfos.y;
#endif
#ifdef DECAL
vec4 decalColor=texture2D(decalSampler,vDecalUV+uvOffset);
#include<decalFragment>(surfaceAlbedo,baseColor,GAMMADECAL,_GAMMADECAL_NOTUSED_)
#endif
#include<depthPrePass>
#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
baseColor.rgb*=vColor.rgb;
#endif
#ifdef DETAIL
baseColor.rgb=baseColor.rgb*2.0*mix(0.5,detailColor.r,vDetailInfos.y);
#endif
#define CUSTOM_FRAGMENT_UPDATE_DIFFUSE
vec3 baseAmbientColor=vec3(1.,1.,1.);
#ifdef AMBIENT
baseAmbientColor=texture2D(ambientSampler,vAmbientUV+uvOffset).rgb*vAmbientInfos.y;
#endif
#define CUSTOM_FRAGMENT_BEFORE_LIGHTS
#ifdef SPECULARTERM
float glossiness=vSpecularColor.a;
vec3 specularColor=vSpecularColor.rgb;
#ifdef SPECULAR
vec4 specularMapColor=texture2D(specularSampler,vSpecularUV+uvOffset);
specularColor=specularMapColor.rgb;
#ifdef GLOSSINESS
glossiness=glossiness*specularMapColor.a;
#endif
#endif
#else
float glossiness=0.;
#endif
vec3 diffuseBase=vec3(0.,0.,0.);
lightingInfo info;
#ifdef SPECULARTERM
vec3 specularBase=vec3(0.,0.,0.);
#endif
float shadow=1.;
#ifdef LIGHTMAP
vec4 lightmapColor=texture2D(lightmapSampler,vLightmapUV+uvOffset);
#ifdef RGBDLIGHTMAP
lightmapColor.rgb=fromRGBD(lightmapColor);
#endif
lightmapColor.rgb*=vLightmapInfos.y;
#endif
#include<lightFragment>[0..maxSimultaneousLights]
vec4 refractionColor=vec4(0.,0.,0.,1.);
#ifdef REFRACTION
vec3 refractionVector=normalize(refract(-viewDirectionW,normalW,vRefractionInfos.y));
#ifdef REFRACTIONMAP_3D
#ifdef USE_LOCAL_REFRACTIONMAP_CUBIC
refractionVector=parallaxCorrectNormal(vPositionW,refractionVector,vRefractionSize,vRefractionPosition);
#endif
refractionVector.y=refractionVector.y*vRefractionInfos.w;
vec4 refractionLookup=textureCube(refractionCubeSampler,refractionVector);
if (dot(refractionVector,viewDirectionW)<1.0) {
refractionColor=refractionLookup;
}
#else
vec3 vRefractionUVW=vec3(refractionMatrix*(view*vec4(vPositionW+refractionVector*vRefractionInfos.z,1.0)));
vec2 refractionCoords=vRefractionUVW.xy/vRefractionUVW.z;
refractionCoords.y=1.0-refractionCoords.y;
refractionColor=texture2D(refraction2DSampler,refractionCoords);
#endif
#ifdef RGBDREFRACTION
refractionColor.rgb=fromRGBD(refractionColor);
#endif
#ifdef IS_REFRACTION_LINEAR
refractionColor.rgb=toGammaSpace(refractionColor.rgb);
#endif
refractionColor.rgb*=vRefractionInfos.x;
#endif
vec4 reflectionColor=vec4(0.,0.,0.,1.);
#ifdef REFLECTION
vec3 vReflectionUVW=computeReflectionCoords(vec4(vPositionW,1.0),normalW);
#ifdef REFLECTIONMAP_OPPOSITEZ
vReflectionUVW.z*=-1.0;
#endif
#ifdef REFLECTIONMAP_3D
#ifdef ROUGHNESS
float bias=vReflectionInfos.y;
#ifdef SPECULARTERM
#ifdef SPECULAR
#ifdef GLOSSINESS
bias*=(1.0-specularMapColor.a);
#endif
#endif
#endif
reflectionColor=textureCube(reflectionCubeSampler,vReflectionUVW,bias);
#else
reflectionColor=textureCube(reflectionCubeSampler,vReflectionUVW);
#endif
#else
vec2 coords=vReflectionUVW.xy;
#ifdef REFLECTIONMAP_PROJECTION
coords/=vReflectionUVW.z;
#endif
coords.y=1.0-coords.y;
reflectionColor=texture2D(reflection2DSampler,coords);
#endif
#ifdef RGBDREFLECTION
reflectionColor.rgb=fromRGBD(reflectionColor);
#endif
#ifdef IS_REFLECTION_LINEAR
reflectionColor.rgb=toGammaSpace(reflectionColor.rgb);
#endif
reflectionColor.rgb*=vReflectionInfos.x;
#ifdef REFLECTIONFRESNEL
float reflectionFresnelTerm=computeFresnelTerm(viewDirectionW,normalW,reflectionRightColor.a,reflectionLeftColor.a);
#ifdef REFLECTIONFRESNELFROMSPECULAR
#ifdef SPECULARTERM
reflectionColor.rgb*=specularColor.rgb*(1.0-reflectionFresnelTerm)+reflectionFresnelTerm*reflectionRightColor.rgb;
#else
reflectionColor.rgb*=reflectionLeftColor.rgb*(1.0-reflectionFresnelTerm)+reflectionFresnelTerm*reflectionRightColor.rgb;
#endif
#else
reflectionColor.rgb*=reflectionLeftColor.rgb*(1.0-reflectionFresnelTerm)+reflectionFresnelTerm*reflectionRightColor.rgb;
#endif
#endif
#endif
#ifdef REFRACTIONFRESNEL
float refractionFresnelTerm=computeFresnelTerm(viewDirectionW,normalW,refractionRightColor.a,refractionLeftColor.a);
refractionColor.rgb*=refractionLeftColor.rgb*(1.0-refractionFresnelTerm)+refractionFresnelTerm*refractionRightColor.rgb;
#endif
#ifdef OPACITY
vec4 opacityMap=texture2D(opacitySampler,vOpacityUV+uvOffset);
#ifdef OPACITYRGB
opacityMap.rgb=opacityMap.rgb*vec3(0.3,0.59,0.11);
alpha*=(opacityMap.x+opacityMap.y+opacityMap.z)* vOpacityInfos.y;
#else
alpha*=opacityMap.a*vOpacityInfos.y;
#endif
#endif
#if defined(VERTEXALPHA) || defined(INSTANCESCOLOR) && defined(INSTANCES)
alpha*=vColor.a;
#endif
#ifdef OPACITYFRESNEL
float opacityFresnelTerm=computeFresnelTerm(viewDirectionW,normalW,opacityParts.z,opacityParts.w);
alpha+=opacityParts.x*(1.0-opacityFresnelTerm)+opacityFresnelTerm*opacityParts.y;
#endif
#ifdef ALPHATEST
#ifdef ALPHATEST_AFTERALLALPHACOMPUTATIONS
if (alpha<alphaCutOff)
discard;
#endif
#ifndef ALPHABLEND
alpha=1.0;
#endif
#endif
vec3 emissiveColor=vEmissiveColor;
#ifdef EMISSIVE
emissiveColor+=texture2D(emissiveSampler,vEmissiveUV+uvOffset).rgb*vEmissiveInfos.y;
#endif
#ifdef EMISSIVEFRESNEL
float emissiveFresnelTerm=computeFresnelTerm(viewDirectionW,normalW,emissiveRightColor.a,emissiveLeftColor.a);
emissiveColor*=emissiveLeftColor.rgb*(1.0-emissiveFresnelTerm)+emissiveFresnelTerm*emissiveRightColor.rgb;
#endif
#ifdef DIFFUSEFRESNEL
float diffuseFresnelTerm=computeFresnelTerm(viewDirectionW,normalW,diffuseRightColor.a,diffuseLeftColor.a);
diffuseBase*=diffuseLeftColor.rgb*(1.0-diffuseFresnelTerm)+diffuseFresnelTerm*diffuseRightColor.rgb;
#endif
#ifdef EMISSIVEASILLUMINATION
vec3 finalDiffuse=clamp(diffuseBase*diffuseColor+vAmbientColor,0.0,1.0)*baseColor.rgb;
#else
#ifdef LINKEMISSIVEWITHDIFFUSE
vec3 finalDiffuse=clamp((diffuseBase+emissiveColor)*diffuseColor+vAmbientColor,0.0,1.0)*baseColor.rgb;
#else
vec3 finalDiffuse=clamp(diffuseBase*diffuseColor+emissiveColor+vAmbientColor,0.0,1.0)*baseColor.rgb;
#endif
#endif
#ifdef SPECULARTERM
vec3 finalSpecular=specularBase*specularColor;
#ifdef SPECULAROVERALPHA
alpha=clamp(alpha+dot(finalSpecular,vec3(0.3,0.59,0.11)),0.,1.);
#endif
#else
vec3 finalSpecular=vec3(0.0);
#endif
#ifdef REFLECTIONOVERALPHA
alpha=clamp(alpha+dot(reflectionColor.rgb,vec3(0.3,0.59,0.11)),0.,1.);
#endif
#ifdef EMISSIVEASILLUMINATION
vec4 color=vec4(clamp(finalDiffuse*baseAmbientColor+finalSpecular+reflectionColor.rgb+emissiveColor+refractionColor.rgb,0.0,1.0),alpha);
#else
vec4 color=vec4(finalDiffuse*baseAmbientColor+finalSpecular+reflectionColor.rgb+refractionColor.rgb,alpha);
#endif
#ifdef LIGHTMAP
#ifndef LIGHTMAPEXCLUDED
#ifdef USELIGHTMAPASSHADOWMAP
color.rgb*=lightmapColor.rgb;
#else
color.rgb+=lightmapColor.rgb;
#endif
#endif
#endif
#define CUSTOM_FRAGMENT_BEFORE_FOG
color.rgb=max(color.rgb,0.);
#include<logDepthFragment>
#include<fogFragment>
#ifdef IMAGEPROCESSINGPOSTPROCESS
color.rgb=toLinearSpace(color.rgb);
#else
#ifdef IMAGEPROCESSING
color.rgb=toLinearSpace(color.rgb);
color=applyImageProcessing(color);
#endif
#endif
color.a*=visibility;
#ifdef PREMULTIPLYALPHA
color.rgb*=color.a;
#endif
#define CUSTOM_FRAGMENT_BEFORE_FRAGCOLOR
#ifdef PREPASS
float writeGeometryInfo=color.a>0.4 ? 1.0 : 0.0;
gl_FragData[0]=color; 
#ifdef PREPASS_POSITION
gl_FragData[PREPASS_POSITION_INDEX]=vec4(vPositionW,writeGeometryInfo);
#endif
#ifdef PREPASS_VELOCITY
vec2 a=(vCurrentPosition.xy/vCurrentPosition.w)*0.5+0.5;
vec2 b=(vPreviousPosition.xy/vPreviousPosition.w)*0.5+0.5;
vec2 velocity=abs(a-b);
velocity=vec2(pow(velocity.x,1.0/3.0),pow(velocity.y,1.0/3.0))*sign(a-b)*0.5+0.5;
gl_FragData[PREPASS_VELOCITY_INDEX]=vec4(velocity,0.0,writeGeometryInfo);
#endif
#ifdef PREPASS_IRRADIANCE
gl_FragData[PREPASS_IRRADIANCE_INDEX]=vec4(0.0,0.0,0.0,writeGeometryInfo); 
#endif
#ifdef PREPASS_DEPTH
gl_FragData[PREPASS_DEPTH_INDEX]=vec4(vViewPos.z,0.0,0.0,writeGeometryInfo); 
#endif
#ifdef PREPASS_NORMAL
gl_FragData[PREPASS_NORMAL_INDEX]=vec4(normalize((view*vec4(normalW,0.0)).rgb),writeGeometryInfo); 
#endif
#ifdef PREPASS_ALBEDO_SQRT
gl_FragData[PREPASS_ALBEDO_SQRT_INDEX]=vec4(0.0,0.0,0.0,writeGeometryInfo); 
#endif
#ifdef PREPASS_REFLECTIVITY
#if defined(SPECULARTERM)
#if defined(SPECULAR)
gl_FragData[PREPASS_REFLECTIVITY_INDEX]=vec4(toLinearSpace(specularMapColor))*writeGeometryInfo; 
#else
gl_FragData[PREPASS_REFLECTIVITY_INDEX]=vec4(toLinearSpace(specularColor),1.0)*writeGeometryInfo;
#endif
#else
gl_FragData[PREPASS_REFLECTIVITY_INDEX]=vec4(0.0,0.0,0.0,1.0)*writeGeometryInfo;
#endif
#endif
#endif
#if !defined(PREPASS) || defined(WEBGL2)
gl_FragColor=color;
#endif
#include<oitFragment>
#if ORDER_INDEPENDENT_TRANSPARENCY
if (fragDepth==nearestDepth) {
frontColor.rgb+=color.rgb*color.a*alphaMultiplier;
frontColor.a=1.0-alphaMultiplier*(1.0-color.a);
} else {
backColor+=color;
}
#endif
#define CUSTOM_FRAGMENT_MAIN_END
}
`;
x.ShadersStore[aa] = na;
const oa = "decalVertexDeclaration", la = `#ifdef DECAL
uniform vec4 vDecalInfos;
uniform mat4 decalMatrix;
#endif
`;
x.IncludesShadersStore[oa] = la;
const ha = "defaultVertexDeclaration", fa = `uniform mat4 viewProjection;
uniform mat4 view;
#ifdef DIFFUSE
uniform mat4 diffuseMatrix;
uniform vec2 vDiffuseInfos;
#endif
#ifdef AMBIENT
uniform mat4 ambientMatrix;
uniform vec2 vAmbientInfos;
#endif
#ifdef OPACITY
uniform mat4 opacityMatrix;
uniform vec2 vOpacityInfos;
#endif
#ifdef EMISSIVE
uniform vec2 vEmissiveInfos;
uniform mat4 emissiveMatrix;
#endif
#ifdef LIGHTMAP
uniform vec2 vLightmapInfos;
uniform mat4 lightmapMatrix;
#endif
#if defined(SPECULAR) && defined(SPECULARTERM)
uniform vec2 vSpecularInfos;
uniform mat4 specularMatrix;
#endif
#ifdef BUMP
uniform vec3 vBumpInfos;
uniform mat4 bumpMatrix;
#endif
#ifdef REFLECTION
uniform mat4 reflectionMatrix;
#endif
#ifdef POINTSIZE
uniform float pointSize;
#endif
#ifdef DETAIL
uniform vec4 vDetailInfos;
uniform mat4 detailMatrix;
#endif
#include<decalVertexDeclaration>
#define ADDITIONAL_VERTEX_DECLARATION
`;
x.IncludesShadersStore[ha] = fa;
const da = "uvAttributeDeclaration", ca = `#ifdef UV{X}
attribute vec2 uv{X};
#endif
`;
x.IncludesShadersStore[da] = ca;
const ua = "prePassVertexDeclaration", pa = `#ifdef PREPASS
#ifdef PREPASS_DEPTH
varying vec3 vViewPos;
#endif
#ifdef PREPASS_VELOCITY
uniform mat4 previousViewProjection;
varying vec4 vCurrentPosition;
varying vec4 vPreviousPosition;
#endif
#endif
`;
x.IncludesShadersStore[ua] = pa;
const ma = "samplerVertexDeclaration", _a = `#if defined(_DEFINENAME_) && _DEFINENAME_DIRECTUV==0
varying vec2 v_VARYINGNAME_UV;
#endif
`;
x.IncludesShadersStore[ma] = _a;
const ga = "bumpVertexDeclaration", va = `#if defined(BUMP) || defined(PARALLAX) || defined(CLEARCOAT_BUMP) || defined(ANISOTROPIC)
#if defined(TANGENT) && defined(NORMAL) 
varying mat3 vTBN;
#endif
#endif
`;
x.IncludesShadersStore[ga] = va;
const Sa = "fogVertexDeclaration", Ea = `#ifdef FOG
varying vec3 vFogDistance;
#endif
`;
x.IncludesShadersStore[Sa] = Ea;
const Ta = "lightVxFragmentDeclaration", xa = `#ifdef LIGHT{X}
uniform vec4 vLightData{X};
uniform vec4 vLightDiffuse{X};
#ifdef SPECULARTERM
uniform vec4 vLightSpecular{X};
#else
vec4 vLightSpecular{X}=vec4(0.);
#endif
#ifdef SHADOW{X}
#ifdef SHADOWCSM{X}
uniform mat4 lightMatrix{X}[SHADOWCSMNUM_CASCADES{X}];
varying vec4 vPositionFromLight{X}[SHADOWCSMNUM_CASCADES{X}];
varying float vDepthMetric{X}[SHADOWCSMNUM_CASCADES{X}];
varying vec4 vPositionFromCamera{X};
#elif defined(SHADOWCUBE{X})
#else
varying vec4 vPositionFromLight{X};
varying float vDepthMetric{X};
uniform mat4 lightMatrix{X};
#endif
uniform vec4 shadowsInfo{X};
uniform vec2 depthValues{X};
#endif
#ifdef SPOTLIGHT{X}
uniform vec4 vLightDirection{X};
uniform vec4 vLightFalloff{X};
#elif defined(POINTLIGHT{X})
uniform vec4 vLightFalloff{X};
#elif defined(HEMILIGHT{X})
uniform vec3 vLightGround{X};
#endif
#endif
`;
x.IncludesShadersStore[Ta] = xa;
const Aa = "lightVxUboDeclaration", Ma = `#ifdef LIGHT{X}
uniform Light{X}
{
vec4 vLightData;
vec4 vLightDiffuse;
vec4 vLightSpecular;
#ifdef SPOTLIGHT{X}
vec4 vLightDirection;
vec4 vLightFalloff;
#elif defined(POINTLIGHT{X})
vec4 vLightFalloff;
#elif defined(HEMILIGHT{X})
vec3 vLightGround;
#endif
vec4 shadowsInfo;
vec2 depthValues;
} light{X};
#ifdef SHADOW{X}
#ifdef SHADOWCSM{X}
uniform mat4 lightMatrix{X}[SHADOWCSMNUM_CASCADES{X}];
varying vec4 vPositionFromLight{X}[SHADOWCSMNUM_CASCADES{X}];
varying float vDepthMetric{X}[SHADOWCSMNUM_CASCADES{X}];
varying vec4 vPositionFromCamera{X};
#elif defined(SHADOWCUBE{X})
#else
varying vec4 vPositionFromLight{X};
varying float vDepthMetric{X};
uniform mat4 lightMatrix{X};
#endif
#endif
#endif
`;
x.IncludesShadersStore[Aa] = Ma;
const Ca = "prePassVertex", Ra = `#ifdef PREPASS_DEPTH
vViewPos=(view*worldPos).rgb;
#endif
#if defined(PREPASS_VELOCITY) && defined(BONES_VELOCITY_ENABLED)
vCurrentPosition=viewProjection*worldPos;
#if NUM_BONE_INFLUENCERS>0
mat4 previousInfluence;
previousInfluence=mPreviousBones[int(matricesIndices[0])]*matricesWeights[0];
#if NUM_BONE_INFLUENCERS>1
previousInfluence+=mPreviousBones[int(matricesIndices[1])]*matricesWeights[1];
#endif 
#if NUM_BONE_INFLUENCERS>2
previousInfluence+=mPreviousBones[int(matricesIndices[2])]*matricesWeights[2];
#endif 
#if NUM_BONE_INFLUENCERS>3
previousInfluence+=mPreviousBones[int(matricesIndices[3])]*matricesWeights[3];
#endif
#if NUM_BONE_INFLUENCERS>4
previousInfluence+=mPreviousBones[int(matricesIndicesExtra[0])]*matricesWeightsExtra[0];
#endif 
#if NUM_BONE_INFLUENCERS>5
previousInfluence+=mPreviousBones[int(matricesIndicesExtra[1])]*matricesWeightsExtra[1];
#endif 
#if NUM_BONE_INFLUENCERS>6
previousInfluence+=mPreviousBones[int(matricesIndicesExtra[2])]*matricesWeightsExtra[2];
#endif 
#if NUM_BONE_INFLUENCERS>7
previousInfluence+=mPreviousBones[int(matricesIndicesExtra[3])]*matricesWeightsExtra[3];
#endif
vPreviousPosition=previousViewProjection*finalPreviousWorld*previousInfluence*vec4(positionUpdated,1.0);
#else
vPreviousPosition=previousViewProjection*finalPreviousWorld*vec4(positionUpdated,1.0);
#endif
#endif
`;
x.IncludesShadersStore[Ca] = Ra;
const Ia = "uvVariableDeclaration", ba = `#if !defined(UV{X}) && defined(MAINUV{X})
vec2 uv{X}=vec2(0.,0.);
#endif
#ifdef MAINUV{X}
vMainUV{X}=uv{X};
#endif
`;
x.IncludesShadersStore[Ia] = ba;
const Pa = "samplerVertexImplementation", Da = `#if defined(_DEFINENAME_) && _DEFINENAME_DIRECTUV==0
if (v_INFONAME_==0.)
{
v_VARYINGNAME_UV=vec2(_MATRIXNAME_Matrix*vec4(uvUpdated,1.0,0.0));
}
#ifdef UV2
else if (v_INFONAME_==1.)
{
v_VARYINGNAME_UV=vec2(_MATRIXNAME_Matrix*vec4(uv2,1.0,0.0));
}
#endif
#ifdef UV3
else if (v_INFONAME_==2.)
{
v_VARYINGNAME_UV=vec2(_MATRIXNAME_Matrix*vec4(uv3,1.0,0.0));
}
#endif
#ifdef UV4
else if (v_INFONAME_==3.)
{
v_VARYINGNAME_UV=vec2(_MATRIXNAME_Matrix*vec4(uv4,1.0,0.0));
}
#endif
#ifdef UV5
else if (v_INFONAME_==4.)
{
v_VARYINGNAME_UV=vec2(_MATRIXNAME_Matrix*vec4(uv5,1.0,0.0));
}
#endif
#ifdef UV6
else if (v_INFONAME_==5.)
{
v_VARYINGNAME_UV=vec2(_MATRIXNAME_Matrix*vec4(uv6,1.0,0.0));
}
#endif
#endif
`;
x.IncludesShadersStore[Pa] = Da;
const La = "bumpVertex", Fa = `#if defined(BUMP) || defined(PARALLAX) || defined(CLEARCOAT_BUMP) || defined(ANISOTROPIC)
#if defined(TANGENT) && defined(NORMAL)
vec3 tbnNormal=normalize(normalUpdated);
vec3 tbnTangent=normalize(tangentUpdated.xyz);
vec3 tbnBitangent=cross(tbnNormal,tbnTangent)*tangentUpdated.w;
vTBN=mat3(finalWorld)*mat3(tbnTangent,tbnBitangent,tbnNormal);
#endif
#endif
`;
x.IncludesShadersStore[La] = Fa;
const wa = "fogVertex", Oa = `#ifdef FOG
vFogDistance=(view*worldPos).xyz;
#endif
`;
x.IncludesShadersStore[wa] = Oa;
const Na = "shadowsVertex", ya = `#ifdef SHADOWS
#if defined(SHADOWCSM{X})
vPositionFromCamera{X}=view*worldPos;
for (int i=0; i<SHADOWCSMNUM_CASCADES{X}; i++) {
vPositionFromLight{X}[i]=lightMatrix{X}[i]*worldPos;
#ifdef USE_REVERSE_DEPTHBUFFER
vDepthMetric{X}[i]=(-vPositionFromLight{X}[i].z+light{X}.depthValues.x)/light{X}.depthValues.y;
#else
vDepthMetric{X}[i]=(vPositionFromLight{X}[i].z+light{X}.depthValues.x)/light{X}.depthValues.y;
#endif
}
#elif defined(SHADOW{X}) && !defined(SHADOWCUBE{X})
vPositionFromLight{X}=lightMatrix{X}*worldPos;
#ifdef USE_REVERSE_DEPTHBUFFER
vDepthMetric{X}=(-vPositionFromLight{X}.z+light{X}.depthValues.x)/light{X}.depthValues.y;
#else
vDepthMetric{X}=(vPositionFromLight{X}.z+light{X}.depthValues.x)/light{X}.depthValues.y;
#endif
#endif
#endif
`;
x.IncludesShadersStore[Na] = ya;
const Ua = "vertexColorMixing", Ba = `#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
vColor=vec4(1.0);
#ifdef VERTEXCOLOR
#ifdef VERTEXALPHA
vColor*=color;
#else
vColor.rgb*=color.rgb;
#endif
#endif
#ifdef INSTANCESCOLOR
vColor*=instanceColor;
#endif
#endif
`;
x.IncludesShadersStore[Ua] = Ba;
const Va = "pointCloudVertex", Xa = `#if defined(POINTSIZE) && !defined(WEBGPU)
gl_PointSize=pointSize;
#endif
`;
x.IncludesShadersStore[Va] = Xa;
const za = "logDepthVertex", Wa = `#ifdef LOGARITHMICDEPTH
vFragmentDepth=1.0+gl_Position.w;
gl_Position.z=log2(max(0.000001,vFragmentDepth))*logarithmicDepthConstant;
#endif
`;
x.IncludesShadersStore[za] = Wa;
const ka = "defaultVertexShader", Ha = `#include<__decl__defaultVertex>
#define CUSTOM_VERTEX_BEGIN
attribute vec3 position;
#ifdef NORMAL
attribute vec3 normal;
#endif
#ifdef TANGENT
attribute vec4 tangent;
#endif
#ifdef UV1
attribute vec2 uv;
#endif
#include<uvAttributeDeclaration>[2..7]
#ifdef VERTEXCOLOR
attribute vec4 color;
#endif
#include<helperFunctions>
#include<bonesDeclaration>
#include<bakedVertexAnimationDeclaration>
#include<instancesDeclaration>
#include<prePassVertexDeclaration>
#include<mainUVVaryingDeclaration>[1..7]
#include<samplerVertexDeclaration>(_DEFINENAME_,DIFFUSE,_VARYINGNAME_,Diffuse)
#include<samplerVertexDeclaration>(_DEFINENAME_,DETAIL,_VARYINGNAME_,Detail)
#include<samplerVertexDeclaration>(_DEFINENAME_,AMBIENT,_VARYINGNAME_,Ambient)
#include<samplerVertexDeclaration>(_DEFINENAME_,OPACITY,_VARYINGNAME_,Opacity)
#include<samplerVertexDeclaration>(_DEFINENAME_,EMISSIVE,_VARYINGNAME_,Emissive)
#include<samplerVertexDeclaration>(_DEFINENAME_,LIGHTMAP,_VARYINGNAME_,Lightmap)
#if defined(SPECULARTERM)
#include<samplerVertexDeclaration>(_DEFINENAME_,SPECULAR,_VARYINGNAME_,Specular)
#endif
#include<samplerVertexDeclaration>(_DEFINENAME_,BUMP,_VARYINGNAME_,Bump)
#include<samplerVertexDeclaration>(_DEFINENAME_,DECAL,_VARYINGNAME_,Decal)
varying vec3 vPositionW;
#ifdef NORMAL
varying vec3 vNormalW;
#endif
#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
varying vec4 vColor;
#endif
#include<bumpVertexDeclaration>
#include<clipPlaneVertexDeclaration>
#include<fogVertexDeclaration>
#include<__decl__lightVxFragment>[0..maxSimultaneousLights]
#include<morphTargetsVertexGlobalDeclaration>
#include<morphTargetsVertexDeclaration>[0..maxSimultaneousMorphTargets]
#ifdef REFLECTIONMAP_SKYBOX
varying vec3 vPositionUVW;
#endif
#if defined(REFLECTIONMAP_EQUIRECTANGULAR_FIXED) || defined(REFLECTIONMAP_MIRROREDEQUIRECTANGULAR_FIXED)
varying vec3 vDirectionW;
#endif
#include<logDepthDeclaration>
#define CUSTOM_VERTEX_DEFINITIONS
void main(void) {
#define CUSTOM_VERTEX_MAIN_BEGIN
vec3 positionUpdated=position;
#ifdef NORMAL
vec3 normalUpdated=normal;
#endif
#ifdef TANGENT
vec4 tangentUpdated=tangent;
#endif
#ifdef UV1
vec2 uvUpdated=uv;
#endif
#include<morphTargetsVertexGlobal>
#include<morphTargetsVertex>[0..maxSimultaneousMorphTargets]
#ifdef REFLECTIONMAP_SKYBOX
vPositionUVW=positionUpdated;
#endif
#define CUSTOM_VERTEX_UPDATE_POSITION
#define CUSTOM_VERTEX_UPDATE_NORMAL
#include<instancesVertex>
#if defined(PREPASS) && defined(PREPASS_VELOCITY) && !defined(BONES_VELOCITY_ENABLED)
vCurrentPosition=viewProjection*finalWorld*vec4(positionUpdated,1.0);
vPreviousPosition=previousViewProjection*finalPreviousWorld*vec4(positionUpdated,1.0);
#endif
#include<bonesVertex>
#include<bakedVertexAnimation>
vec4 worldPos=finalWorld*vec4(positionUpdated,1.0);
#ifdef NORMAL
mat3 normalWorld=mat3(finalWorld);
#if defined(INSTANCES) && defined(THIN_INSTANCES)
vNormalW=normalUpdated/vec3(dot(normalWorld[0],normalWorld[0]),dot(normalWorld[1],normalWorld[1]),dot(normalWorld[2],normalWorld[2]));
vNormalW=normalize(normalWorld*vNormalW);
#else
#ifdef NONUNIFORMSCALING
normalWorld=transposeMat3(inverseMat3(normalWorld));
#endif
vNormalW=normalize(normalWorld*normalUpdated);
#endif
#endif
#define CUSTOM_VERTEX_UPDATE_WORLDPOS
#ifdef MULTIVIEW
if (gl_ViewID_OVR==0u) {
gl_Position=viewProjection*worldPos;
} else {
gl_Position=viewProjectionR*worldPos;
}
#else
gl_Position=viewProjection*worldPos;
#endif
vPositionW=vec3(worldPos);
#include<prePassVertex>
#if defined(REFLECTIONMAP_EQUIRECTANGULAR_FIXED) || defined(REFLECTIONMAP_MIRROREDEQUIRECTANGULAR_FIXED)
vDirectionW=normalize(vec3(finalWorld*vec4(positionUpdated,0.0)));
#endif
#ifndef UV1
vec2 uvUpdated=vec2(0.,0.);
#endif
#ifdef MAINUV1
vMainUV1=uvUpdated;
#endif
#include<uvVariableDeclaration>[2..7]
#include<samplerVertexImplementation>(_DEFINENAME_,DIFFUSE,_VARYINGNAME_,Diffuse,_MATRIXNAME_,diffuse,_INFONAME_,DiffuseInfos.x)
#include<samplerVertexImplementation>(_DEFINENAME_,DETAIL,_VARYINGNAME_,Detail,_MATRIXNAME_,detail,_INFONAME_,DetailInfos.x)
#include<samplerVertexImplementation>(_DEFINENAME_,AMBIENT,_VARYINGNAME_,Ambient,_MATRIXNAME_,ambient,_INFONAME_,AmbientInfos.x)
#include<samplerVertexImplementation>(_DEFINENAME_,OPACITY,_VARYINGNAME_,Opacity,_MATRIXNAME_,opacity,_INFONAME_,OpacityInfos.x)
#include<samplerVertexImplementation>(_DEFINENAME_,EMISSIVE,_VARYINGNAME_,Emissive,_MATRIXNAME_,emissive,_INFONAME_,EmissiveInfos.x)
#include<samplerVertexImplementation>(_DEFINENAME_,LIGHTMAP,_VARYINGNAME_,Lightmap,_MATRIXNAME_,lightmap,_INFONAME_,LightmapInfos.x)
#if defined(SPECULARTERM)
#include<samplerVertexImplementation>(_DEFINENAME_,SPECULAR,_VARYINGNAME_,Specular,_MATRIXNAME_,specular,_INFONAME_,SpecularInfos.x)
#endif
#include<samplerVertexImplementation>(_DEFINENAME_,BUMP,_VARYINGNAME_,Bump,_MATRIXNAME_,bump,_INFONAME_,BumpInfos.x)
#include<samplerVertexImplementation>(_DEFINENAME_,DECAL,_VARYINGNAME_,Decal,_MATRIXNAME_,decal,_INFONAME_,DecalInfos.x)
#include<bumpVertex>
#include<clipPlaneVertex>
#include<fogVertex>
#include<shadowsVertex>[0..maxSimultaneousLights]
#include<vertexColorMixing>
#include<pointCloudVertex>
#include<logDepthVertex>
#define CUSTOM_VERTEX_MAIN_END
}
`;
x.ShadersStore[ka] = Ha;
const Ga = new RegExp("^([gimus]+)!");
class xe {
  /**
   * Creates a new instance of the plugin manager
   * @param material material that this manager will manage the plugins for
   */
  constructor(e) {
    this._plugins = [], this._activePlugins = [], this._activePluginsForExtraEvents = [], this._material = e, this._scene = e.getScene(), this._engine = this._scene.getEngine();
  }
  /**
   * @internal
   */
  _addPlugin(e) {
    for (let s = 0; s < this._plugins.length; ++s)
      if (this._plugins[s].name === e.name)
        throw `Plugin "${e.name}" already added to the material "${this._material.name}"!`;
    if (this._material._uniformBufferLayoutBuilt)
      throw `The plugin "${e.name}" can't be added to the material "${this._material.name}" because this material has already been used for rendering! Please add plugins to materials before any rendering with this material occurs.`;
    const t = e.getClassName();
    xe._MaterialPluginClassToMainDefine[t] || (xe._MaterialPluginClassToMainDefine[t] = "MATERIALPLUGIN_" + ++xe._MaterialPluginCounter), this._material._callbackPluginEventGeneric = this._handlePluginEvent.bind(this), this._plugins.push(e), this._plugins.sort((s, r) => s.priority - r.priority), this._codeInjectionPoints = {};
    const i = {};
    i[xe._MaterialPluginClassToMainDefine[t]] = {
      type: "boolean",
      default: !0
    };
    for (const s of this._plugins)
      s.collectDefines(i), this._collectPointNames("vertex", s.getCustomCode("vertex")), this._collectPointNames("fragment", s.getCustomCode("fragment"));
    this._defineNamesFromPlugins = i;
  }
  /**
   * @internal
   */
  _activatePlugin(e) {
    this._activePlugins.indexOf(e) === -1 && (this._activePlugins.push(e), this._activePlugins.sort((t, i) => t.priority - i.priority), this._material._callbackPluginEventIsReadyForSubMesh = this._handlePluginEventIsReadyForSubMesh.bind(this), this._material._callbackPluginEventPrepareDefinesBeforeAttributes = this._handlePluginEventPrepareDefinesBeforeAttributes.bind(this), this._material._callbackPluginEventPrepareDefines = this._handlePluginEventPrepareDefines.bind(this), this._material._callbackPluginEventBindForSubMesh = this._handlePluginEventBindForSubMesh.bind(this), e.registerForExtraEvents && (this._activePluginsForExtraEvents.push(e), this._activePluginsForExtraEvents.sort((t, i) => t.priority - i.priority), this._material._callbackPluginEventHasRenderTargetTextures = this._handlePluginEventHasRenderTargetTextures.bind(this), this._material._callbackPluginEventFillRenderTargetTextures = this._handlePluginEventFillRenderTargetTextures.bind(this), this._material._callbackPluginEventHardBindForSubMesh = this._handlePluginEventHardBindForSubMesh.bind(this)));
  }
  /**
   * Gets a plugin from the list of plugins managed by this manager
   * @param name name of the plugin
   * @returns the plugin if found, else null
   */
  getPlugin(e) {
    for (let t = 0; t < this._plugins.length; ++t)
      if (this._plugins[t].name === e)
        return this._plugins[t];
    return null;
  }
  _handlePluginEventIsReadyForSubMesh(e) {
    let t = !0;
    for (const i of this._activePlugins)
      t = t && i.isReadyForSubMesh(e.defines, this._scene, this._engine, e.subMesh);
    e.isReadyForSubMesh = t;
  }
  _handlePluginEventPrepareDefinesBeforeAttributes(e) {
    for (const t of this._activePlugins)
      t.prepareDefinesBeforeAttributes(e.defines, this._scene, e.mesh);
  }
  _handlePluginEventPrepareDefines(e) {
    for (const t of this._activePlugins)
      t.prepareDefines(e.defines, this._scene, e.mesh);
  }
  _handlePluginEventHardBindForSubMesh(e) {
    for (const t of this._activePluginsForExtraEvents)
      t.hardBindForSubMesh(this._material._uniformBuffer, this._scene, this._engine, e.subMesh);
  }
  _handlePluginEventBindForSubMesh(e) {
    for (const t of this._activePlugins)
      t.bindForSubMesh(this._material._uniformBuffer, this._scene, this._engine, e.subMesh);
  }
  _handlePluginEventHasRenderTargetTextures(e) {
    let t = !1;
    for (const i of this._activePluginsForExtraEvents)
      if (t = i.hasRenderTargetTextures(), t)
        break;
    e.hasRenderTargetTextures = t;
  }
  _handlePluginEventFillRenderTargetTextures(e) {
    for (const t of this._activePluginsForExtraEvents)
      t.fillRenderTargetTextures(e.renderTargets);
  }
  _handlePluginEvent(e, t) {
    var i;
    switch (e) {
      case ge.GetActiveTextures: {
        const s = t;
        for (const r of this._activePlugins)
          r.getActiveTextures(s.activeTextures);
        break;
      }
      case ge.GetAnimatables: {
        const s = t;
        for (const r of this._activePlugins)
          r.getAnimatables(s.animatables);
        break;
      }
      case ge.HasTexture: {
        const s = t;
        let r = !1;
        for (const a of this._activePlugins)
          if (r = a.hasTexture(s.texture), r)
            break;
        s.hasTexture = r;
        break;
      }
      case ge.Disposed: {
        const s = t;
        for (const r of this._plugins)
          r.dispose(s.forceDisposeTextures);
        break;
      }
      case ge.GetDefineNames: {
        const s = t;
        s.defineNames = this._defineNamesFromPlugins;
        break;
      }
      case ge.PrepareEffect: {
        const s = t;
        for (const r of this._activePlugins)
          s.fallbackRank = r.addFallbacks(s.defines, s.fallbacks, s.fallbackRank), r.getAttributes(s.attributes, this._scene, s.mesh);
        this._uniformList.length > 0 && s.uniforms.push(...this._uniformList), this._samplerList.length > 0 && s.samplers.push(...this._samplerList), this._uboList.length > 0 && s.uniformBuffersNames.push(...this._uboList), s.customCode = this._injectCustomCode(s.customCode);
        break;
      }
      case ge.PrepareUniformBuffer: {
        const s = t;
        this._uboDeclaration = "", this._vertexDeclaration = "", this._fragmentDeclaration = "", this._uniformList = [], this._samplerList = [], this._uboList = [];
        for (const r of this._plugins) {
          const a = r.getUniforms();
          if (a) {
            if (a.ubo)
              for (const n of a.ubo) {
                if (n.size && n.type) {
                  const o = (i = n.arraySize) !== null && i !== void 0 ? i : 0;
                  s.ubo.addUniform(n.name, n.size, o), this._uboDeclaration += `${n.type} ${n.name}${o > 0 ? `[${o}]` : ""};\r
`;
                }
                this._uniformList.push(n.name);
              }
            a.vertex && (this._vertexDeclaration += a.vertex + `\r
`), a.fragment && (this._fragmentDeclaration += a.fragment + `\r
`);
          }
          r.getSamplers(this._samplerList), r.getUniformBuffersNames(this._uboList);
        }
        break;
      }
    }
  }
  _collectPointNames(e, t) {
    if (t)
      for (const i in t)
        this._codeInjectionPoints[e] || (this._codeInjectionPoints[e] = {}), this._codeInjectionPoints[e][i] = !0;
  }
  _injectCustomCode(e) {
    return (t, i) => {
      var s;
      e && (i = e(t, i)), this._uboDeclaration && (i = i.replace("#define ADDITIONAL_UBO_DECLARATION", this._uboDeclaration)), this._vertexDeclaration && (i = i.replace("#define ADDITIONAL_VERTEX_DECLARATION", this._vertexDeclaration)), this._fragmentDeclaration && (i = i.replace("#define ADDITIONAL_FRAGMENT_DECLARATION", this._fragmentDeclaration));
      const r = (s = this._codeInjectionPoints) === null || s === void 0 ? void 0 : s[t];
      if (!r)
        return i;
      for (let a in r) {
        let n = "";
        for (const o of this._activePlugins) {
          const l = o.getCustomCode(t);
          l != null && l[a] && (n += l[a] + `\r
`);
        }
        if (n.length > 0)
          if (a.charAt(0) === "!") {
            a = a.substring(1);
            let o = "g";
            if (a.charAt(0) === "!")
              o = "", a = a.substring(1);
            else {
              const d = Ga.exec(a);
              d && d.length >= 2 && (o = d[1], a = a.substring(o.length + 1));
            }
            o.indexOf("g") < 0 && (o += "g");
            const l = i, f = new RegExp(a, o);
            let h = f.exec(l);
            for (; h !== null; ) {
              let d = n;
              for (let u = 0; u < h.length; ++u)
                d = d.replace("$" + u, h[u]);
              i = i.replace(h[0], d), h = f.exec(l);
            }
          } else {
            const o = "#define " + a;
            i = i.replace(o, `\r
` + n + `\r
` + o);
          }
      }
      return i;
    };
  }
}
xe._MaterialPluginClassToMainDefine = {};
xe._MaterialPluginCounter = 0;
class dt {
  _enable(e) {
    e && this._pluginManager._activatePlugin(this);
  }
  /**
   * Creates a new material plugin
   * @param material parent material of the plugin
   * @param name name of the plugin
   * @param priority priority of the plugin
   * @param defines list of defines used by the plugin. The value of the property is the default value for this property
   * @param addToPluginList true to add the plugin to the list of plugins managed by the material plugin manager of the material (default: true)
   * @param enable true to enable the plugin (it is handy if the plugin does not handle properties to switch its current activation)
   */
  constructor(e, t, i, s, r = !0, a = !1) {
    this.priority = 500, this.registerForExtraEvents = !1, this._material = e, this.name = t, this.priority = i, e.pluginManager || (e.pluginManager = new xe(e), e.onDisposeObservable.add(() => {
      e.pluginManager = void 0;
    })), this._pluginDefineNames = s, this._pluginManager = e.pluginManager, r && this._pluginManager._addPlugin(this), a && this._enable(!0), this.markAllDefinesAsDirty = e._dirtyCallbacks[63];
  }
  /**
   * Gets the current class name useful for serialization or dynamic coding.
   * @returns The class name.
   */
  getClassName() {
    return "MaterialPluginBase";
  }
  /**
   * Specifies that the submesh is ready to be used.
   * @param defines the list of "defines" to update.
   * @param scene defines the scene the material belongs to.
   * @param engine the engine this scene belongs to.
   * @param subMesh the submesh to check for readiness
   * @returns - boolean indicating that the submesh is ready or not.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isReadyForSubMesh(e, t, i, s) {
    return !0;
  }
  /**
   * Binds the material data (this function is called even if mustRebind() returns false)
   * @param uniformBuffer defines the Uniform buffer to fill in.
   * @param scene defines the scene the material belongs to.
   * @param engine defines the engine the material belongs to.
   * @param subMesh the submesh to bind data for
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  hardBindForSubMesh(e, t, i, s) {
  }
  /**
   * Binds the material data.
   * @param uniformBuffer defines the Uniform buffer to fill in.
   * @param scene defines the scene the material belongs to.
   * @param engine the engine this scene belongs to.
   * @param subMesh the submesh to bind data for
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  bindForSubMesh(e, t, i, s) {
  }
  /**
   * Disposes the resources of the material.
   * @param forceDisposeTextures - Forces the disposal of all textures.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  dispose(e) {
  }
  /**
   * Returns a list of custom shader code fragments to customize the shader.
   * @param shaderType "vertex" or "fragment"
   * @returns null if no code to be added, or a list of pointName => code.
   * Note that `pointName` can also be a regular expression if it starts with a `!`.
   * In that case, the string found by the regular expression (if any) will be
   * replaced by the code provided.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getCustomCode(e) {
    return null;
  }
  /**
   * Collects all defines.
   * @param defines The object to append to.
   */
  collectDefines(e) {
    if (this._pluginDefineNames)
      for (const t of Object.keys(this._pluginDefineNames)) {
        if (t[0] === "_")
          continue;
        const i = typeof this._pluginDefineNames[t];
        e[t] = {
          type: i === "number" ? "number" : i === "string" ? "string" : i === "boolean" ? "boolean" : "object",
          default: this._pluginDefineNames[t]
        };
      }
  }
  /**
   * Sets the defines for the next rendering. Called before MaterialHelper.PrepareDefinesForAttributes is called.
   * @param defines the list of "defines" to update.
   * @param scene defines the scene to the material belongs to.
   * @param mesh the mesh being rendered
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  prepareDefinesBeforeAttributes(e, t, i) {
  }
  /**
   * Sets the defines for the next rendering
   * @param defines the list of "defines" to update.
   * @param scene defines the scene to the material belongs to.
   * @param mesh the mesh being rendered
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  prepareDefines(e, t, i) {
  }
  /**
   * Checks to see if a texture is used in the material.
   * @param texture - Base texture to use.
   * @returns - Boolean specifying if a texture is used in the material.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  hasTexture(e) {
    return !1;
  }
  /**
   * Gets a boolean indicating that current material needs to register RTT
   * @returns true if this uses a render target otherwise false.
   */
  hasRenderTargetTextures() {
    return !1;
  }
  /**
   * Fills the list of render target textures.
   * @param renderTargets the list of render targets to update
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fillRenderTargetTextures(e) {
  }
  /**
   * Returns an array of the actively used textures.
   * @param activeTextures Array of BaseTextures
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getActiveTextures(e) {
  }
  /**
   * Returns the animatable textures.
   * @param animatables Array of animatable textures.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getAnimatables(e) {
  }
  /**
   * Add fallbacks to the effect fallbacks list.
   * @param defines defines the Base texture to use.
   * @param fallbacks defines the current fallback list.
   * @param currentRank defines the current fallback rank.
   * @returns the new fallback rank.
   */
  addFallbacks(e, t, i) {
    return i;
  }
  /**
   * Gets the samplers used by the plugin.
   * @param samplers list that the sampler names should be added to.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getSamplers(e) {
  }
  /**
   * Gets the attributes used by the plugin.
   * @param attributes list that the attribute names should be added to.
   * @param scene the scene that the material belongs to.
   * @param mesh the mesh being rendered.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getAttributes(e, t, i) {
  }
  /**
   * Gets the uniform buffers names added by the plugin.
   * @param ubos list that the ubo names should be added to.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getUniformBuffersNames(e) {
  }
  /**
   * Gets the description of the uniforms to add to the ubo (if engine supports ubos) or to inject directly in the vertex/fragment shaders (if engine does not support ubos)
   * @returns the description of the uniforms
   */
  getUniforms() {
    return {};
  }
  /**
   * Makes a duplicate of the current configuration into another one.
   * @param plugin define the config where to copy the info
   */
  copyTo(e) {
    ee.Clone(() => e, this);
  }
  /**
   * Serializes this clear coat configuration.
   * @returns - An object with the serialized config.
   */
  serialize() {
    return ee.Serialize(this);
  }
  /**
   * Parses a anisotropy Configuration from a serialized object.
   * @param source - Serialized object.
   * @param scene Defines the scene we are parsing for
   * @param rootUrl Defines the rootUrl to load from
   */
  parse(e, t, i) {
    ee.Parse(() => this, e, t, i);
  }
}
p([
  E()
], dt.prototype, "name", void 0);
p([
  E()
], dt.prototype, "priority", void 0);
p([
  E()
], dt.prototype, "registerForExtraEvents", void 0);
class $a extends Rt {
  constructor() {
    super(...arguments), this.DETAIL = !1, this.DETAILDIRECTUV = 0, this.DETAIL_NORMALBLENDMETHOD = 0;
  }
}
class Pe extends dt {
  /** @internal */
  _markAllSubMeshesAsTexturesDirty() {
    this._enable(this._isEnabled), this._internalMarkAllSubMeshesAsTexturesDirty();
  }
  constructor(e, t = !0) {
    super(e, "DetailMap", 140, new $a(), t), this._texture = null, this.diffuseBlendLevel = 1, this.roughnessBlendLevel = 1, this.bumpLevel = 1, this._normalBlendMethod = rt.MATERIAL_NORMALBLENDMETHOD_WHITEOUT, this._isEnabled = !1, this.isEnabled = !1, this._internalMarkAllSubMeshesAsTexturesDirty = e._dirtyCallbacks[1];
  }
  isReadyForSubMesh(e, t, i) {
    return this._isEnabled ? !(e._areTexturesDirty && t.texturesEnabled && i.getCaps().standardDerivatives && this._texture && L.DetailTextureEnabled && !this._texture.isReady()) : !0;
  }
  prepareDefines(e, t) {
    if (this._isEnabled) {
      e.DETAIL_NORMALBLENDMETHOD = this._normalBlendMethod;
      const i = t.getEngine();
      e._areTexturesDirty && (i.getCaps().standardDerivatives && this._texture && L.DetailTextureEnabled && this._isEnabled ? (D.PrepareDefinesForMergedUV(this._texture, e, "DETAIL"), e.DETAIL_NORMALBLENDMETHOD = this._normalBlendMethod) : e.DETAIL = !1);
    } else
      e.DETAIL = !1;
  }
  bindForSubMesh(e, t) {
    if (!this._isEnabled)
      return;
    const i = this._material.isFrozen;
    (!e.useUbo || !i || !e.isSync) && this._texture && L.DetailTextureEnabled && (e.updateFloat4("vDetailInfos", this._texture.coordinatesIndex, this.diffuseBlendLevel, this.bumpLevel, this.roughnessBlendLevel), D.BindTextureMatrix(this._texture, e, "detail")), t.texturesEnabled && this._texture && L.DetailTextureEnabled && e.setTexture("detailSampler", this._texture);
  }
  hasTexture(e) {
    return this._texture === e;
  }
  getActiveTextures(e) {
    this._texture && e.push(this._texture);
  }
  getAnimatables(e) {
    this._texture && this._texture.animations && this._texture.animations.length > 0 && e.push(this._texture);
  }
  dispose(e) {
    var t;
    e && ((t = this._texture) === null || t === void 0 || t.dispose());
  }
  getClassName() {
    return "DetailMapConfiguration";
  }
  getSamplers(e) {
    e.push("detailSampler");
  }
  getUniforms() {
    return {
      ubo: [
        { name: "vDetailInfos", size: 4, type: "vec4" },
        { name: "detailMatrix", size: 16, type: "mat4" }
      ]
    };
  }
}
p([
  fe("detailTexture"),
  y("_markAllSubMeshesAsTexturesDirty")
], Pe.prototype, "texture", void 0);
p([
  E()
], Pe.prototype, "diffuseBlendLevel", void 0);
p([
  E()
], Pe.prototype, "roughnessBlendLevel", void 0);
p([
  E()
], Pe.prototype, "bumpLevel", void 0);
p([
  E(),
  y("_markAllSubMeshesAsTexturesDirty")
], Pe.prototype, "normalBlendMethod", void 0);
p([
  E(),
  y("_markAllSubMeshesAsTexturesDirty")
], Pe.prototype, "isEnabled", void 0);
const Tt = { effect: null, subMesh: null };
class Ya extends Rt {
  /**
   * Initializes the Standard Material defines.
   * @param externalProperties The external properties
   */
  constructor(e) {
    super(e), this.MAINUV1 = !1, this.MAINUV2 = !1, this.MAINUV3 = !1, this.MAINUV4 = !1, this.MAINUV5 = !1, this.MAINUV6 = !1, this.DIFFUSE = !1, this.DIFFUSEDIRECTUV = 0, this.BAKED_VERTEX_ANIMATION_TEXTURE = !1, this.AMBIENT = !1, this.AMBIENTDIRECTUV = 0, this.OPACITY = !1, this.OPACITYDIRECTUV = 0, this.OPACITYRGB = !1, this.REFLECTION = !1, this.EMISSIVE = !1, this.EMISSIVEDIRECTUV = 0, this.SPECULAR = !1, this.SPECULARDIRECTUV = 0, this.BUMP = !1, this.BUMPDIRECTUV = 0, this.PARALLAX = !1, this.PARALLAXOCCLUSION = !1, this.SPECULAROVERALPHA = !1, this.CLIPPLANE = !1, this.CLIPPLANE2 = !1, this.CLIPPLANE3 = !1, this.CLIPPLANE4 = !1, this.CLIPPLANE5 = !1, this.CLIPPLANE6 = !1, this.ALPHATEST = !1, this.DEPTHPREPASS = !1, this.ALPHAFROMDIFFUSE = !1, this.POINTSIZE = !1, this.FOG = !1, this.SPECULARTERM = !1, this.DIFFUSEFRESNEL = !1, this.OPACITYFRESNEL = !1, this.REFLECTIONFRESNEL = !1, this.REFRACTIONFRESNEL = !1, this.EMISSIVEFRESNEL = !1, this.FRESNEL = !1, this.NORMAL = !1, this.TANGENT = !1, this.UV1 = !1, this.UV2 = !1, this.UV3 = !1, this.UV4 = !1, this.UV5 = !1, this.UV6 = !1, this.VERTEXCOLOR = !1, this.VERTEXALPHA = !1, this.NUM_BONE_INFLUENCERS = 0, this.BonesPerMesh = 0, this.BONETEXTURE = !1, this.BONES_VELOCITY_ENABLED = !1, this.INSTANCES = !1, this.THIN_INSTANCES = !1, this.INSTANCESCOLOR = !1, this.GLOSSINESS = !1, this.ROUGHNESS = !1, this.EMISSIVEASILLUMINATION = !1, this.LINKEMISSIVEWITHDIFFUSE = !1, this.REFLECTIONFRESNELFROMSPECULAR = !1, this.LIGHTMAP = !1, this.LIGHTMAPDIRECTUV = 0, this.OBJECTSPACE_NORMALMAP = !1, this.USELIGHTMAPASSHADOWMAP = !1, this.REFLECTIONMAP_3D = !1, this.REFLECTIONMAP_SPHERICAL = !1, this.REFLECTIONMAP_PLANAR = !1, this.REFLECTIONMAP_CUBIC = !1, this.USE_LOCAL_REFLECTIONMAP_CUBIC = !1, this.USE_LOCAL_REFRACTIONMAP_CUBIC = !1, this.REFLECTIONMAP_PROJECTION = !1, this.REFLECTIONMAP_SKYBOX = !1, this.REFLECTIONMAP_EXPLICIT = !1, this.REFLECTIONMAP_EQUIRECTANGULAR = !1, this.REFLECTIONMAP_EQUIRECTANGULAR_FIXED = !1, this.REFLECTIONMAP_MIRROREDEQUIRECTANGULAR_FIXED = !1, this.REFLECTIONMAP_OPPOSITEZ = !1, this.INVERTCUBICMAP = !1, this.LOGARITHMICDEPTH = !1, this.REFRACTION = !1, this.REFRACTIONMAP_3D = !1, this.REFLECTIONOVERALPHA = !1, this.TWOSIDEDLIGHTING = !1, this.SHADOWFLOAT = !1, this.MORPHTARGETS = !1, this.MORPHTARGETS_NORMAL = !1, this.MORPHTARGETS_TANGENT = !1, this.MORPHTARGETS_UV = !1, this.NUM_MORPH_INFLUENCERS = 0, this.MORPHTARGETS_TEXTURE = !1, this.NONUNIFORMSCALING = !1, this.PREMULTIPLYALPHA = !1, this.ALPHATEST_AFTERALLALPHACOMPUTATIONS = !1, this.ALPHABLEND = !0, this.PREPASS = !1, this.PREPASS_IRRADIANCE = !1, this.PREPASS_IRRADIANCE_INDEX = -1, this.PREPASS_ALBEDO_SQRT = !1, this.PREPASS_ALBEDO_SQRT_INDEX = -1, this.PREPASS_DEPTH = !1, this.PREPASS_DEPTH_INDEX = -1, this.PREPASS_NORMAL = !1, this.PREPASS_NORMAL_INDEX = -1, this.PREPASS_POSITION = !1, this.PREPASS_POSITION_INDEX = -1, this.PREPASS_VELOCITY = !1, this.PREPASS_VELOCITY_INDEX = -1, this.PREPASS_REFLECTIVITY = !1, this.PREPASS_REFLECTIVITY_INDEX = -1, this.SCENE_MRT_COUNT = 0, this.RGBDLIGHTMAP = !1, this.RGBDREFLECTION = !1, this.RGBDREFRACTION = !1, this.IMAGEPROCESSING = !1, this.VIGNETTE = !1, this.VIGNETTEBLENDMODEMULTIPLY = !1, this.VIGNETTEBLENDMODEOPAQUE = !1, this.TONEMAPPING = !1, this.TONEMAPPING_ACES = !1, this.CONTRAST = !1, this.COLORCURVES = !1, this.COLORGRADING = !1, this.COLORGRADING3D = !1, this.SAMPLER3DGREENDEPTH = !1, this.SAMPLER3DBGRMAP = !1, this.DITHER = !1, this.IMAGEPROCESSINGPOSTPROCESS = !1, this.SKIPFINALCOLORCLAMP = !1, this.MULTIVIEW = !1, this.ORDER_INDEPENDENT_TRANSPARENCY = !1, this.ORDER_INDEPENDENT_TRANSPARENCY_16BITS = !1, this.CAMERA_ORTHOGRAPHIC = !1, this.CAMERA_PERSPECTIVE = !1, this.IS_REFLECTION_LINEAR = !1, this.IS_REFRACTION_LINEAR = !1, this.EXPOSURE = !1, this.rebuild();
  }
  setReflectionMode(e) {
    const t = [
      "REFLECTIONMAP_CUBIC",
      "REFLECTIONMAP_EXPLICIT",
      "REFLECTIONMAP_PLANAR",
      "REFLECTIONMAP_PROJECTION",
      "REFLECTIONMAP_PROJECTION",
      "REFLECTIONMAP_SKYBOX",
      "REFLECTIONMAP_SPHERICAL",
      "REFLECTIONMAP_EQUIRECTANGULAR",
      "REFLECTIONMAP_EQUIRECTANGULAR_FIXED",
      "REFLECTIONMAP_MIRROREDEQUIRECTANGULAR_FIXED"
    ];
    for (const i of t)
      this[i] = i === e;
  }
}
class g extends jt {
  /**
   * Gets the image processing configuration used either in this material.
   */
  get imageProcessingConfiguration() {
    return this._imageProcessingConfiguration;
  }
  /**
   * Sets the Default image processing configuration used either in the this material.
   *
   * If sets to null, the scene one is in use.
   */
  set imageProcessingConfiguration(e) {
    this._attachImageProcessingConfiguration(e), this._markAllSubMeshesAsTexturesDirty();
  }
  /**
   * Attaches a new image processing configuration to the Standard Material.
   * @param configuration
   */
  _attachImageProcessingConfiguration(e) {
    e !== this._imageProcessingConfiguration && (this._imageProcessingConfiguration && this._imageProcessingObserver && this._imageProcessingConfiguration.onUpdateParameters.remove(this._imageProcessingObserver), e ? this._imageProcessingConfiguration = e : this._imageProcessingConfiguration = this.getScene().imageProcessingConfiguration, this._imageProcessingConfiguration && (this._imageProcessingObserver = this._imageProcessingConfiguration.onUpdateParameters.add(() => {
      this._markAllSubMeshesAsImageProcessingDirty();
    })));
  }
  /**
   * Can this material render to prepass
   */
  get isPrePassCapable() {
    return !this.disableDepthWrite;
  }
  /**
   * Gets whether the color curves effect is enabled.
   */
  get cameraColorCurvesEnabled() {
    return this.imageProcessingConfiguration.colorCurvesEnabled;
  }
  /**
   * Sets whether the color curves effect is enabled.
   */
  set cameraColorCurvesEnabled(e) {
    this.imageProcessingConfiguration.colorCurvesEnabled = e;
  }
  /**
   * Gets whether the color grading effect is enabled.
   */
  get cameraColorGradingEnabled() {
    return this.imageProcessingConfiguration.colorGradingEnabled;
  }
  /**
   * Gets whether the color grading effect is enabled.
   */
  set cameraColorGradingEnabled(e) {
    this.imageProcessingConfiguration.colorGradingEnabled = e;
  }
  /**
   * Gets whether tonemapping is enabled or not.
   */
  get cameraToneMappingEnabled() {
    return this._imageProcessingConfiguration.toneMappingEnabled;
  }
  /**
   * Sets whether tonemapping is enabled or not
   */
  set cameraToneMappingEnabled(e) {
    this._imageProcessingConfiguration.toneMappingEnabled = e;
  }
  /**
   * The camera exposure used on this material.
   * This property is here and not in the camera to allow controlling exposure without full screen post process.
   * This corresponds to a photographic exposure.
   */
  get cameraExposure() {
    return this._imageProcessingConfiguration.exposure;
  }
  /**
   * The camera exposure used on this material.
   * This property is here and not in the camera to allow controlling exposure without full screen post process.
   * This corresponds to a photographic exposure.
   */
  set cameraExposure(e) {
    this._imageProcessingConfiguration.exposure = e;
  }
  /**
   * Gets The camera contrast used on this material.
   */
  get cameraContrast() {
    return this._imageProcessingConfiguration.contrast;
  }
  /**
   * Sets The camera contrast used on this material.
   */
  set cameraContrast(e) {
    this._imageProcessingConfiguration.contrast = e;
  }
  /**
   * Gets the Color Grading 2D Lookup Texture.
   */
  get cameraColorGradingTexture() {
    return this._imageProcessingConfiguration.colorGradingTexture;
  }
  /**
   * Sets the Color Grading 2D Lookup Texture.
   */
  set cameraColorGradingTexture(e) {
    this._imageProcessingConfiguration.colorGradingTexture = e;
  }
  /**
   * The color grading curves provide additional color adjustmnent that is applied after any color grading transform (3D LUT).
   * They allow basic adjustment of saturation and small exposure adjustments, along with color filter tinting to provide white balance adjustment or more stylistic effects.
   * These are similar to controls found in many professional imaging or colorist software. The global controls are applied to the entire image. For advanced tuning, extra controls are provided to adjust the shadow, midtone and highlight areas of the image;
   * corresponding to low luminance, medium luminance, and high luminance areas respectively.
   */
  get cameraColorCurves() {
    return this._imageProcessingConfiguration.colorCurves;
  }
  /**
   * The color grading curves provide additional color adjustment that is applied after any color grading transform (3D LUT).
   * They allow basic adjustment of saturation and small exposure adjustments, along with color filter tinting to provide white balance adjustment or more stylistic effects.
   * These are similar to controls found in many professional imaging or colorist software. The global controls are applied to the entire image. For advanced tuning, extra controls are provided to adjust the shadow, midtone and highlight areas of the image;
   * corresponding to low luminance, medium luminance, and high luminance areas respectively.
   */
  set cameraColorCurves(e) {
    this._imageProcessingConfiguration.colorCurves = e;
  }
  /**
   * Can this material render to several textures at once
   */
  get canRenderToMRT() {
    return !0;
  }
  /**
   * Instantiates a new standard material.
   * This is the default material used in Babylon. It is the best trade off between quality
   * and performances.
   * @see https://doc.babylonjs.com/features/featuresDeepDive/materials/using/materials_introduction
   * @param name Define the name of the material in the scene
   * @param scene Define the scene the material belong to
   */
  constructor(e, t) {
    super(e, t), this._diffuseTexture = null, this._ambientTexture = null, this._opacityTexture = null, this._reflectionTexture = null, this._emissiveTexture = null, this._specularTexture = null, this._bumpTexture = null, this._lightmapTexture = null, this._refractionTexture = null, this.ambientColor = new ce(0, 0, 0), this.diffuseColor = new ce(1, 1, 1), this.specularColor = new ce(1, 1, 1), this.emissiveColor = new ce(0, 0, 0), this.specularPower = 64, this._useAlphaFromDiffuseTexture = !1, this._useEmissiveAsIllumination = !1, this._linkEmissiveWithDiffuse = !1, this._useSpecularOverAlpha = !1, this._useReflectionOverAlpha = !1, this._disableLighting = !1, this._useObjectSpaceNormalMap = !1, this._useParallax = !1, this._useParallaxOcclusion = !1, this.parallaxScaleBias = 0.05, this._roughness = 0, this.indexOfRefraction = 0.98, this.invertRefractionY = !0, this.alphaCutOff = 0.4, this._useLightmapAsShadowmap = !1, this._useReflectionFresnelFromSpecular = !1, this._useGlossinessFromSpecularMapAlpha = !1, this._maxSimultaneousLights = 4, this._invertNormalMapX = !1, this._invertNormalMapY = !1, this._twoSidedLighting = !1, this._renderTargets = new At(16), this._worldViewProjectionMatrix = F.Zero(), this._globalAmbientColor = new ce(0, 0, 0), this._cacheHasRenderTargetTextures = !1, this.detailMap = new Pe(this), this._attachImageProcessingConfiguration(null), this.prePassConfiguration = new Bt(), this.getRenderTargetTextures = () => (this._renderTargets.reset(), g.ReflectionTextureEnabled && this._reflectionTexture && this._reflectionTexture.isRenderTarget && this._renderTargets.push(this._reflectionTexture), g.RefractionTextureEnabled && this._refractionTexture && this._refractionTexture.isRenderTarget && this._renderTargets.push(this._refractionTexture), this._eventInfo.renderTargets = this._renderTargets, this._callbackPluginEventFillRenderTargetTextures(this._eventInfo), this._renderTargets);
  }
  /**
   * Gets a boolean indicating that current material needs to register RTT
   */
  get hasRenderTargetTextures() {
    return g.ReflectionTextureEnabled && this._reflectionTexture && this._reflectionTexture.isRenderTarget || g.RefractionTextureEnabled && this._refractionTexture && this._refractionTexture.isRenderTarget ? !0 : this._cacheHasRenderTargetTextures;
  }
  /**
   * Gets the current class name of the material e.g. "StandardMaterial"
   * Mainly use in serialization.
   * @returns the class name
   */
  getClassName() {
    return "StandardMaterial";
  }
  /**
   * In case the depth buffer does not allow enough depth precision for your scene (might be the case in large scenes)
   * You can try switching to logarithmic depth.
   * @see https://doc.babylonjs.com/features/featuresDeepDive/materials/advanced/logarithmicDepthBuffer
   */
  get useLogarithmicDepth() {
    return this._useLogarithmicDepth;
  }
  set useLogarithmicDepth(e) {
    this._useLogarithmicDepth = e && this.getScene().getEngine().getCaps().fragmentDepthSupported, this._markAllSubMeshesAsMiscDirty();
  }
  /**
   * Specifies if the material will require alpha blending
   * @returns a boolean specifying if alpha blending is needed
   */
  needAlphaBlending() {
    return this._disableAlphaBlending ? !1 : this.alpha < 1 || this._opacityTexture != null || this._shouldUseAlphaFromDiffuseTexture() || this._opacityFresnelParameters && this._opacityFresnelParameters.isEnabled;
  }
  /**
   * Specifies if this material should be rendered in alpha test mode
   * @returns a boolean specifying if an alpha test is needed.
   */
  needAlphaTesting() {
    return this._forceAlphaTest ? !0 : this._hasAlphaChannel() && (this._transparencyMode == null || this._transparencyMode === rt.MATERIAL_ALPHATEST);
  }
  /**
   * Specifies whether or not the alpha value of the diffuse texture should be used for alpha blending.
   */
  _shouldUseAlphaFromDiffuseTexture() {
    return this._diffuseTexture != null && this._diffuseTexture.hasAlpha && this._useAlphaFromDiffuseTexture && this._transparencyMode !== rt.MATERIAL_OPAQUE;
  }
  /**
   * Specifies whether or not there is a usable alpha channel for transparency.
   */
  _hasAlphaChannel() {
    return this._diffuseTexture != null && this._diffuseTexture.hasAlpha || this._opacityTexture != null;
  }
  /**
   * Get the texture used for alpha test purpose.
   * @returns the diffuse texture in case of the standard material.
   */
  getAlphaTestTexture() {
    return this._diffuseTexture;
  }
  /**
   * Get if the submesh is ready to be used and all its information available.
   * Child classes can use it to update shaders
   * @param mesh defines the mesh to check
   * @param subMesh defines which submesh to check
   * @param useInstances specifies that instances should be used
   * @returns a boolean indicating that the submesh is ready or not
   */
  isReadyForSubMesh(e, t, i = !1) {
    if (this._uniformBufferLayoutBuilt || this.buildUniformLayout(), t.effect && this.isFrozen && t.effect._wasPreviouslyReady && t.effect._wasPreviouslyUsingInstances === i)
      return !0;
    t.materialDefines || (this._callbackPluginEventGeneric(ge.GetDefineNames, this._eventInfo), t.materialDefines = new Ya(this._eventInfo.defineNames));
    const s = this.getScene(), r = t.materialDefines;
    if (this._isReadyForSubMesh(t))
      return !0;
    const a = s.getEngine();
    r._needNormals = D.PrepareDefinesForLights(s, e, r, !0, this._maxSimultaneousLights, this._disableLighting), D.PrepareDefinesForMultiview(s, r);
    const n = this.needAlphaBlendingForMesh(e) && this.getScene().useOrderIndependentTransparency;
    if (D.PrepareDefinesForPrePass(s, r, this.canRenderToMRT && !n), D.PrepareDefinesForOIT(s, r, n), r._areTexturesDirty) {
      this._eventInfo.hasRenderTargetTextures = !1, this._callbackPluginEventHasRenderTargetTextures(this._eventInfo), this._cacheHasRenderTargetTextures = this._eventInfo.hasRenderTargetTextures, r._needUVs = !1;
      for (let l = 1; l <= 6; ++l)
        r["MAINUV" + l] = !1;
      if (s.texturesEnabled) {
        if (r.DIFFUSEDIRECTUV = 0, r.BUMPDIRECTUV = 0, r.AMBIENTDIRECTUV = 0, r.OPACITYDIRECTUV = 0, r.EMISSIVEDIRECTUV = 0, r.SPECULARDIRECTUV = 0, r.LIGHTMAPDIRECTUV = 0, this._diffuseTexture && g.DiffuseTextureEnabled)
          if (this._diffuseTexture.isReadyOrNotBlocking())
            D.PrepareDefinesForMergedUV(this._diffuseTexture, r, "DIFFUSE");
          else
            return !1;
        else
          r.DIFFUSE = !1;
        if (this._ambientTexture && g.AmbientTextureEnabled)
          if (this._ambientTexture.isReadyOrNotBlocking())
            D.PrepareDefinesForMergedUV(this._ambientTexture, r, "AMBIENT");
          else
            return !1;
        else
          r.AMBIENT = !1;
        if (this._opacityTexture && g.OpacityTextureEnabled)
          if (this._opacityTexture.isReadyOrNotBlocking())
            D.PrepareDefinesForMergedUV(this._opacityTexture, r, "OPACITY"), r.OPACITYRGB = this._opacityTexture.getAlphaFromRGB;
          else
            return !1;
        else
          r.OPACITY = !1;
        if (this._reflectionTexture && g.ReflectionTextureEnabled)
          if (this._reflectionTexture.isReadyOrNotBlocking()) {
            switch (r._needNormals = !0, r.REFLECTION = !0, r.ROUGHNESS = this._roughness > 0, r.REFLECTIONOVERALPHA = this._useReflectionOverAlpha, r.INVERTCUBICMAP = this._reflectionTexture.coordinatesMode === v.INVCUBIC_MODE, r.REFLECTIONMAP_3D = this._reflectionTexture.isCube, r.REFLECTIONMAP_OPPOSITEZ = r.REFLECTIONMAP_3D && this.getScene().useRightHandedSystem ? !this._reflectionTexture.invertZ : this._reflectionTexture.invertZ, r.RGBDREFLECTION = this._reflectionTexture.isRGBD, this._reflectionTexture.coordinatesMode) {
              case v.EXPLICIT_MODE:
                r.setReflectionMode("REFLECTIONMAP_EXPLICIT");
                break;
              case v.PLANAR_MODE:
                r.setReflectionMode("REFLECTIONMAP_PLANAR");
                break;
              case v.PROJECTION_MODE:
                r.setReflectionMode("REFLECTIONMAP_PROJECTION");
                break;
              case v.SKYBOX_MODE:
                r.setReflectionMode("REFLECTIONMAP_SKYBOX");
                break;
              case v.SPHERICAL_MODE:
                r.setReflectionMode("REFLECTIONMAP_SPHERICAL");
                break;
              case v.EQUIRECTANGULAR_MODE:
                r.setReflectionMode("REFLECTIONMAP_EQUIRECTANGULAR");
                break;
              case v.FIXED_EQUIRECTANGULAR_MODE:
                r.setReflectionMode("REFLECTIONMAP_EQUIRECTANGULAR_FIXED");
                break;
              case v.FIXED_EQUIRECTANGULAR_MIRRORED_MODE:
                r.setReflectionMode("REFLECTIONMAP_MIRROREDEQUIRECTANGULAR_FIXED");
                break;
              case v.CUBIC_MODE:
              case v.INVCUBIC_MODE:
              default:
                r.setReflectionMode("REFLECTIONMAP_CUBIC");
                break;
            }
            r.USE_LOCAL_REFLECTIONMAP_CUBIC = !!this._reflectionTexture.boundingBoxSize;
          } else
            return !1;
        else
          r.REFLECTION = !1, r.REFLECTIONMAP_OPPOSITEZ = !1;
        if (this._emissiveTexture && g.EmissiveTextureEnabled)
          if (this._emissiveTexture.isReadyOrNotBlocking())
            D.PrepareDefinesForMergedUV(this._emissiveTexture, r, "EMISSIVE");
          else
            return !1;
        else
          r.EMISSIVE = !1;
        if (this._lightmapTexture && g.LightmapTextureEnabled)
          if (this._lightmapTexture.isReadyOrNotBlocking())
            D.PrepareDefinesForMergedUV(this._lightmapTexture, r, "LIGHTMAP"), r.USELIGHTMAPASSHADOWMAP = this._useLightmapAsShadowmap, r.RGBDLIGHTMAP = this._lightmapTexture.isRGBD;
          else
            return !1;
        else
          r.LIGHTMAP = !1;
        if (this._specularTexture && g.SpecularTextureEnabled)
          if (this._specularTexture.isReadyOrNotBlocking())
            D.PrepareDefinesForMergedUV(this._specularTexture, r, "SPECULAR"), r.GLOSSINESS = this._useGlossinessFromSpecularMapAlpha;
          else
            return !1;
        else
          r.SPECULAR = !1;
        if (s.getEngine().getCaps().standardDerivatives && this._bumpTexture && g.BumpTextureEnabled) {
          if (this._bumpTexture.isReady())
            D.PrepareDefinesForMergedUV(this._bumpTexture, r, "BUMP"), r.PARALLAX = this._useParallax, r.PARALLAXOCCLUSION = this._useParallaxOcclusion;
          else
            return !1;
          r.OBJECTSPACE_NORMALMAP = this._useObjectSpaceNormalMap;
        } else
          r.BUMP = !1, r.PARALLAX = !1, r.PARALLAXOCCLUSION = !1;
        if (this._refractionTexture && g.RefractionTextureEnabled)
          if (this._refractionTexture.isReadyOrNotBlocking())
            r._needUVs = !0, r.REFRACTION = !0, r.REFRACTIONMAP_3D = this._refractionTexture.isCube, r.RGBDREFRACTION = this._refractionTexture.isRGBD, r.USE_LOCAL_REFRACTIONMAP_CUBIC = !!this._refractionTexture.boundingBoxSize;
          else
            return !1;
        else
          r.REFRACTION = !1;
        r.TWOSIDEDLIGHTING = !this._backFaceCulling && this._twoSidedLighting;
      } else
        r.DIFFUSE = !1, r.AMBIENT = !1, r.OPACITY = !1, r.REFLECTION = !1, r.EMISSIVE = !1, r.LIGHTMAP = !1, r.BUMP = !1, r.REFRACTION = !1;
      r.ALPHAFROMDIFFUSE = this._shouldUseAlphaFromDiffuseTexture(), r.EMISSIVEASILLUMINATION = this._useEmissiveAsIllumination, r.LINKEMISSIVEWITHDIFFUSE = this._linkEmissiveWithDiffuse, r.SPECULAROVERALPHA = this._useSpecularOverAlpha, r.PREMULTIPLYALPHA = this.alphaMode === 7 || this.alphaMode === 8, r.ALPHATEST_AFTERALLALPHACOMPUTATIONS = this.transparencyMode !== null, r.ALPHABLEND = this.transparencyMode === null || this.needAlphaBlendingForMesh(e);
    }
    if (this._eventInfo.isReadyForSubMesh = !0, this._eventInfo.defines = r, this._eventInfo.subMesh = t, this._callbackPluginEventIsReadyForSubMesh(this._eventInfo), !this._eventInfo.isReadyForSubMesh)
      return !1;
    if (r._areImageProcessingDirty && this._imageProcessingConfiguration) {
      if (!this._imageProcessingConfiguration.isReady())
        return !1;
      this._imageProcessingConfiguration.prepareDefines(r), r.IS_REFLECTION_LINEAR = this.reflectionTexture != null && !this.reflectionTexture.gammaSpace, r.IS_REFRACTION_LINEAR = this.refractionTexture != null && !this.refractionTexture.gammaSpace;
    }
    r._areFresnelDirty && (g.FresnelEnabled ? (this._diffuseFresnelParameters || this._opacityFresnelParameters || this._emissiveFresnelParameters || this._refractionFresnelParameters || this._reflectionFresnelParameters) && (r.DIFFUSEFRESNEL = this._diffuseFresnelParameters && this._diffuseFresnelParameters.isEnabled, r.OPACITYFRESNEL = this._opacityFresnelParameters && this._opacityFresnelParameters.isEnabled, r.REFLECTIONFRESNEL = this._reflectionFresnelParameters && this._reflectionFresnelParameters.isEnabled, r.REFLECTIONFRESNELFROMSPECULAR = this._useReflectionFresnelFromSpecular, r.REFRACTIONFRESNEL = this._refractionFresnelParameters && this._refractionFresnelParameters.isEnabled, r.EMISSIVEFRESNEL = this._emissiveFresnelParameters && this._emissiveFresnelParameters.isEnabled, r._needNormals = !0, r.FRESNEL = !0) : r.FRESNEL = !1), D.PrepareDefinesForMisc(e, s, this._useLogarithmicDepth, this.pointsCloud, this.fogEnabled, this._shouldTurnAlphaTestOn(e) || this._forceAlphaTest, r), D.PrepareDefinesForFrameBoundValues(s, a, this, r, i, null, t.getRenderingMesh().hasThinInstances), this._eventInfo.defines = r, this._eventInfo.mesh = e, this._callbackPluginEventPrepareDefinesBeforeAttributes(this._eventInfo), D.PrepareDefinesForAttributes(e, r, !0, !0, !0), this._callbackPluginEventPrepareDefines(this._eventInfo);
    let o = !1;
    if (r.isDirty) {
      const l = r._areLightsDisposed;
      r.markAsProcessed();
      const f = new Pt();
      r.REFLECTION && f.addFallback(0, "REFLECTION"), r.SPECULAR && f.addFallback(0, "SPECULAR"), r.BUMP && f.addFallback(0, "BUMP"), r.PARALLAX && f.addFallback(1, "PARALLAX"), r.PARALLAXOCCLUSION && f.addFallback(0, "PARALLAXOCCLUSION"), r.SPECULAROVERALPHA && f.addFallback(0, "SPECULAROVERALPHA"), r.FOG && f.addFallback(1, "FOG"), r.POINTSIZE && f.addFallback(0, "POINTSIZE"), r.LOGARITHMICDEPTH && f.addFallback(0, "LOGARITHMICDEPTH"), D.HandleFallbacksForShadows(r, f, this._maxSimultaneousLights), r.SPECULARTERM && f.addFallback(0, "SPECULARTERM"), r.DIFFUSEFRESNEL && f.addFallback(1, "DIFFUSEFRESNEL"), r.OPACITYFRESNEL && f.addFallback(2, "OPACITYFRESNEL"), r.REFLECTIONFRESNEL && f.addFallback(3, "REFLECTIONFRESNEL"), r.EMISSIVEFRESNEL && f.addFallback(4, "EMISSIVEFRESNEL"), r.FRESNEL && f.addFallback(4, "FRESNEL"), r.MULTIVIEW && f.addFallback(0, "MULTIVIEW");
      const h = [U.PositionKind];
      r.NORMAL && h.push(U.NormalKind), r.TANGENT && h.push(U.TangentKind);
      for (let P = 1; P <= 6; ++P)
        r["UV" + P] && h.push(`uv${P === 1 ? "" : P}`);
      r.VERTEXCOLOR && h.push(U.ColorKind), D.PrepareAttributesForBones(h, e, r, f), D.PrepareAttributesForInstances(h, r), D.PrepareAttributesForMorphTargets(h, e, r), D.PrepareAttributesForBakedVertexAnimation(h, e, r);
      let d = "default";
      const u = [
        "world",
        "view",
        "viewProjection",
        "vEyePosition",
        "vLightsType",
        "vAmbientColor",
        "vDiffuseColor",
        "vSpecularColor",
        "vEmissiveColor",
        "visibility",
        "vFogInfos",
        "vFogColor",
        "pointSize",
        "vDiffuseInfos",
        "vAmbientInfos",
        "vOpacityInfos",
        "vReflectionInfos",
        "vEmissiveInfos",
        "vSpecularInfos",
        "vBumpInfos",
        "vLightmapInfos",
        "vRefractionInfos",
        "mBones",
        "diffuseMatrix",
        "ambientMatrix",
        "opacityMatrix",
        "reflectionMatrix",
        "emissiveMatrix",
        "specularMatrix",
        "bumpMatrix",
        "normalMatrix",
        "lightmapMatrix",
        "refractionMatrix",
        "diffuseLeftColor",
        "diffuseRightColor",
        "opacityParts",
        "reflectionLeftColor",
        "reflectionRightColor",
        "emissiveLeftColor",
        "emissiveRightColor",
        "refractionLeftColor",
        "refractionRightColor",
        "vReflectionPosition",
        "vReflectionSize",
        "vRefractionPosition",
        "vRefractionSize",
        "logarithmicDepthConstant",
        "vTangentSpaceParams",
        "alphaCutOff",
        "boneTextureWidth",
        "morphTargetTextureInfo",
        "morphTargetTextureIndices"
      ], S = [
        "diffuseSampler",
        "ambientSampler",
        "opacitySampler",
        "reflectionCubeSampler",
        "reflection2DSampler",
        "emissiveSampler",
        "specularSampler",
        "bumpSampler",
        "lightmapSampler",
        "refractionCubeSampler",
        "refraction2DSampler",
        "boneSampler",
        "morphTargets",
        "oitDepthSampler",
        "oitFrontColorSampler"
      ], _ = ["Material", "Scene", "Mesh"];
      this._eventInfo.fallbacks = f, this._eventInfo.fallbackRank = 0, this._eventInfo.defines = r, this._eventInfo.uniforms = u, this._eventInfo.attributes = h, this._eventInfo.samplers = S, this._eventInfo.uniformBuffersNames = _, this._eventInfo.customCode = void 0, this._eventInfo.mesh = e, this._callbackPluginEventGeneric(ge.PrepareEffect, this._eventInfo), Bt.AddUniforms(u), pt && (pt.PrepareUniforms(u, r), pt.PrepareSamplers(S, r)), D.PrepareUniformsAndSamplersList({
        uniformsNames: u,
        uniformBuffersNames: _,
        samplers: S,
        defines: r,
        maxSimultaneousLights: this._maxSimultaneousLights
      }), lt(u);
      const m = {};
      this.customShaderNameResolve && (d = this.customShaderNameResolve(d, u, _, S, r, h, m));
      const T = r.toString(), I = t.effect;
      let b = s.getEngine().createEffect(d, {
        attributes: h,
        uniformsNames: u,
        uniformBuffersNames: _,
        samplers: S,
        defines: T,
        fallbacks: f,
        onCompiled: this.onCompiled,
        onError: this.onError,
        indexParameters: { maxSimultaneousLights: this._maxSimultaneousLights, maxSimultaneousMorphTargets: r.NUM_MORPH_INFLUENCERS },
        processFinalCode: m.processFinalCode,
        processCodeAfterIncludes: this._eventInfo.customCode,
        multiTarget: r.PREPASS
      }, a);
      if (this._eventInfo.customCode = void 0, b)
        if (this._onEffectCreatedObservable && (Tt.effect = b, Tt.subMesh = t, this._onEffectCreatedObservable.notifyObservers(Tt)), this.allowShaderHotSwapping && I && !b.isReady()) {
          if (b = I, r.markAsUnprocessed(), o = this.isFrozen, l)
            return r._areLightsDisposed = !0, !1;
        } else
          s.resetCachedMaterial(), t.setEffect(b, r, this._materialContext);
    }
    return !t.effect || !t.effect.isReady() ? !1 : (r._renderId = s.getRenderId(), t.effect._wasPreviouslyReady = !o, t.effect._wasPreviouslyUsingInstances = i, this._checkScenePerformancePriority(), !0);
  }
  /**
   * Builds the material UBO layouts.
   * Used internally during the effect preparation.
   */
  buildUniformLayout() {
    const e = this._uniformBuffer;
    e.addUniform("diffuseLeftColor", 4), e.addUniform("diffuseRightColor", 4), e.addUniform("opacityParts", 4), e.addUniform("reflectionLeftColor", 4), e.addUniform("reflectionRightColor", 4), e.addUniform("refractionLeftColor", 4), e.addUniform("refractionRightColor", 4), e.addUniform("emissiveLeftColor", 4), e.addUniform("emissiveRightColor", 4), e.addUniform("vDiffuseInfos", 2), e.addUniform("vAmbientInfos", 2), e.addUniform("vOpacityInfos", 2), e.addUniform("vReflectionInfos", 2), e.addUniform("vReflectionPosition", 3), e.addUniform("vReflectionSize", 3), e.addUniform("vEmissiveInfos", 2), e.addUniform("vLightmapInfos", 2), e.addUniform("vSpecularInfos", 2), e.addUniform("vBumpInfos", 3), e.addUniform("diffuseMatrix", 16), e.addUniform("ambientMatrix", 16), e.addUniform("opacityMatrix", 16), e.addUniform("reflectionMatrix", 16), e.addUniform("emissiveMatrix", 16), e.addUniform("lightmapMatrix", 16), e.addUniform("specularMatrix", 16), e.addUniform("bumpMatrix", 16), e.addUniform("vTangentSpaceParams", 2), e.addUniform("pointSize", 1), e.addUniform("alphaCutOff", 1), e.addUniform("refractionMatrix", 16), e.addUniform("vRefractionInfos", 4), e.addUniform("vRefractionPosition", 3), e.addUniform("vRefractionSize", 3), e.addUniform("vSpecularColor", 4), e.addUniform("vEmissiveColor", 3), e.addUniform("vDiffuseColor", 4), e.addUniform("vAmbientColor", 3), super.buildUniformLayout();
  }
  /**
   * Binds the submesh to this material by preparing the effect and shader to draw
   * @param world defines the world transformation matrix
   * @param mesh defines the mesh containing the submesh
   * @param subMesh defines the submesh to bind the material to
   */
  bindForSubMesh(e, t, i) {
    var s;
    const r = this.getScene(), a = i.materialDefines;
    if (!a)
      return;
    const n = i.effect;
    if (!n)
      return;
    this._activeEffect = n, t.getMeshUniformBuffer().bindToEffect(n, "Mesh"), t.transferToEffect(e), this._uniformBuffer.bindToEffect(n, "Material"), this.prePassConfiguration.bindForSubMesh(this._activeEffect, r, t, e, this.isFrozen), this._eventInfo.subMesh = i, this._callbackPluginEventHardBindForSubMesh(this._eventInfo), a.OBJECTSPACE_NORMALMAP && (e.toNormalMatrix(this._normalMatrix), this.bindOnlyNormalMatrix(this._normalMatrix));
    const o = n._forceRebindOnNextCall || this._mustRebind(r, n, t.visibility);
    D.BindBonesParameters(t, n);
    const l = this._uniformBuffer;
    if (o) {
      if (this.bindViewProjection(n), !l.useUbo || !this.isFrozen || !l.isSync || n._forceRebindOnNextCall) {
        if (g.FresnelEnabled && a.FRESNEL && (this.diffuseFresnelParameters && this.diffuseFresnelParameters.isEnabled && (l.updateColor4("diffuseLeftColor", this.diffuseFresnelParameters.leftColor, this.diffuseFresnelParameters.power), l.updateColor4("diffuseRightColor", this.diffuseFresnelParameters.rightColor, this.diffuseFresnelParameters.bias)), this.opacityFresnelParameters && this.opacityFresnelParameters.isEnabled && l.updateColor4("opacityParts", new ce(this.opacityFresnelParameters.leftColor.toLuminance(), this.opacityFresnelParameters.rightColor.toLuminance(), this.opacityFresnelParameters.bias), this.opacityFresnelParameters.power), this.reflectionFresnelParameters && this.reflectionFresnelParameters.isEnabled && (l.updateColor4("reflectionLeftColor", this.reflectionFresnelParameters.leftColor, this.reflectionFresnelParameters.power), l.updateColor4("reflectionRightColor", this.reflectionFresnelParameters.rightColor, this.reflectionFresnelParameters.bias)), this.refractionFresnelParameters && this.refractionFresnelParameters.isEnabled && (l.updateColor4("refractionLeftColor", this.refractionFresnelParameters.leftColor, this.refractionFresnelParameters.power), l.updateColor4("refractionRightColor", this.refractionFresnelParameters.rightColor, this.refractionFresnelParameters.bias)), this.emissiveFresnelParameters && this.emissiveFresnelParameters.isEnabled && (l.updateColor4("emissiveLeftColor", this.emissiveFresnelParameters.leftColor, this.emissiveFresnelParameters.power), l.updateColor4("emissiveRightColor", this.emissiveFresnelParameters.rightColor, this.emissiveFresnelParameters.bias))), r.texturesEnabled) {
          if (this._diffuseTexture && g.DiffuseTextureEnabled && (l.updateFloat2("vDiffuseInfos", this._diffuseTexture.coordinatesIndex, this._diffuseTexture.level), D.BindTextureMatrix(this._diffuseTexture, l, "diffuse")), this._ambientTexture && g.AmbientTextureEnabled && (l.updateFloat2("vAmbientInfos", this._ambientTexture.coordinatesIndex, this._ambientTexture.level), D.BindTextureMatrix(this._ambientTexture, l, "ambient")), this._opacityTexture && g.OpacityTextureEnabled && (l.updateFloat2("vOpacityInfos", this._opacityTexture.coordinatesIndex, this._opacityTexture.level), D.BindTextureMatrix(this._opacityTexture, l, "opacity")), this._hasAlphaChannel() && l.updateFloat("alphaCutOff", this.alphaCutOff), this._reflectionTexture && g.ReflectionTextureEnabled && (l.updateFloat2("vReflectionInfos", this._reflectionTexture.level, this.roughness), l.updateMatrix("reflectionMatrix", this._reflectionTexture.getReflectionTextureMatrix()), this._reflectionTexture.boundingBoxSize)) {
            const f = this._reflectionTexture;
            l.updateVector3("vReflectionPosition", f.boundingBoxPosition), l.updateVector3("vReflectionSize", f.boundingBoxSize);
          }
          if (this._emissiveTexture && g.EmissiveTextureEnabled && (l.updateFloat2("vEmissiveInfos", this._emissiveTexture.coordinatesIndex, this._emissiveTexture.level), D.BindTextureMatrix(this._emissiveTexture, l, "emissive")), this._lightmapTexture && g.LightmapTextureEnabled && (l.updateFloat2("vLightmapInfos", this._lightmapTexture.coordinatesIndex, this._lightmapTexture.level), D.BindTextureMatrix(this._lightmapTexture, l, "lightmap")), this._specularTexture && g.SpecularTextureEnabled && (l.updateFloat2("vSpecularInfos", this._specularTexture.coordinatesIndex, this._specularTexture.level), D.BindTextureMatrix(this._specularTexture, l, "specular")), this._bumpTexture && r.getEngine().getCaps().standardDerivatives && g.BumpTextureEnabled && (l.updateFloat3("vBumpInfos", this._bumpTexture.coordinatesIndex, 1 / this._bumpTexture.level, this.parallaxScaleBias), D.BindTextureMatrix(this._bumpTexture, l, "bump"), r._mirroredCameraPosition ? l.updateFloat2("vTangentSpaceParams", this._invertNormalMapX ? 1 : -1, this._invertNormalMapY ? 1 : -1) : l.updateFloat2("vTangentSpaceParams", this._invertNormalMapX ? -1 : 1, this._invertNormalMapY ? -1 : 1)), this._refractionTexture && g.RefractionTextureEnabled) {
            let f = 1;
            if (this._refractionTexture.isCube || (l.updateMatrix("refractionMatrix", this._refractionTexture.getReflectionTextureMatrix()), this._refractionTexture.depth && (f = this._refractionTexture.depth)), l.updateFloat4("vRefractionInfos", this._refractionTexture.level, this.indexOfRefraction, f, this.invertRefractionY ? -1 : 1), this._refractionTexture.boundingBoxSize) {
              const h = this._refractionTexture;
              l.updateVector3("vRefractionPosition", h.boundingBoxPosition), l.updateVector3("vRefractionSize", h.boundingBoxSize);
            }
          }
        }
        this.pointsCloud && l.updateFloat("pointSize", this.pointSize), a.SPECULARTERM && l.updateColor4("vSpecularColor", this.specularColor, this.specularPower), l.updateColor3("vEmissiveColor", g.EmissiveTextureEnabled ? this.emissiveColor : ce.BlackReadOnly), l.updateColor4("vDiffuseColor", this.diffuseColor, this.alpha), r.ambientColor.multiplyToRef(this.ambientColor, this._globalAmbientColor), l.updateColor3("vAmbientColor", this._globalAmbientColor);
      }
      r.texturesEnabled && (this._diffuseTexture && g.DiffuseTextureEnabled && n.setTexture("diffuseSampler", this._diffuseTexture), this._ambientTexture && g.AmbientTextureEnabled && n.setTexture("ambientSampler", this._ambientTexture), this._opacityTexture && g.OpacityTextureEnabled && n.setTexture("opacitySampler", this._opacityTexture), this._reflectionTexture && g.ReflectionTextureEnabled && (this._reflectionTexture.isCube ? n.setTexture("reflectionCubeSampler", this._reflectionTexture) : n.setTexture("reflection2DSampler", this._reflectionTexture)), this._emissiveTexture && g.EmissiveTextureEnabled && n.setTexture("emissiveSampler", this._emissiveTexture), this._lightmapTexture && g.LightmapTextureEnabled && n.setTexture("lightmapSampler", this._lightmapTexture), this._specularTexture && g.SpecularTextureEnabled && n.setTexture("specularSampler", this._specularTexture), this._bumpTexture && r.getEngine().getCaps().standardDerivatives && g.BumpTextureEnabled && n.setTexture("bumpSampler", this._bumpTexture), this._refractionTexture && g.RefractionTextureEnabled && (this._refractionTexture.isCube ? n.setTexture("refractionCubeSampler", this._refractionTexture) : n.setTexture("refraction2DSampler", this._refractionTexture))), this.getScene().useOrderIndependentTransparency && this.needAlphaBlendingForMesh(t) && this.getScene().depthPeelingRenderer.bind(n), this._eventInfo.subMesh = i, this._callbackPluginEventBindForSubMesh(this._eventInfo), ot(n, this, r), this.bindEyePosition(n);
    } else
      r.getEngine()._features.needToAlwaysBindUniformBuffers && (this._needToBindSceneUbo = !0);
    (o || !this.isFrozen) && (r.lightsEnabled && !this._disableLighting && D.BindLights(r, t, n, a, this._maxSimultaneousLights), (r.fogEnabled && t.applyFog && r.fogMode !== nt.FOGMODE_NONE || this._reflectionTexture || this._refractionTexture || t.receiveShadows || a.PREPASS) && this.bindView(n), D.BindFogParameters(r, t, n), a.NUM_MORPH_INFLUENCERS && D.BindMorphTargetParameters(t, n), a.BAKED_VERTEX_ANIMATION_TEXTURE && ((s = t.bakedVertexAnimationManager) === null || s === void 0 || s.bind(n, a.INSTANCES)), this.useLogarithmicDepth && D.BindLogDepth(a, n, r), this._imageProcessingConfiguration && !this._imageProcessingConfiguration.applyByPostProcess && this._imageProcessingConfiguration.bind(this._activeEffect)), this._afterBind(t, this._activeEffect), l.update();
  }
  /**
   * Get the list of animatables in the material.
   * @returns the list of animatables object used in the material
   */
  getAnimatables() {
    const e = super.getAnimatables();
    return this._diffuseTexture && this._diffuseTexture.animations && this._diffuseTexture.animations.length > 0 && e.push(this._diffuseTexture), this._ambientTexture && this._ambientTexture.animations && this._ambientTexture.animations.length > 0 && e.push(this._ambientTexture), this._opacityTexture && this._opacityTexture.animations && this._opacityTexture.animations.length > 0 && e.push(this._opacityTexture), this._reflectionTexture && this._reflectionTexture.animations && this._reflectionTexture.animations.length > 0 && e.push(this._reflectionTexture), this._emissiveTexture && this._emissiveTexture.animations && this._emissiveTexture.animations.length > 0 && e.push(this._emissiveTexture), this._specularTexture && this._specularTexture.animations && this._specularTexture.animations.length > 0 && e.push(this._specularTexture), this._bumpTexture && this._bumpTexture.animations && this._bumpTexture.animations.length > 0 && e.push(this._bumpTexture), this._lightmapTexture && this._lightmapTexture.animations && this._lightmapTexture.animations.length > 0 && e.push(this._lightmapTexture), this._refractionTexture && this._refractionTexture.animations && this._refractionTexture.animations.length > 0 && e.push(this._refractionTexture), e;
  }
  /**
   * Gets the active textures from the material
   * @returns an array of textures
   */
  getActiveTextures() {
    const e = super.getActiveTextures();
    return this._diffuseTexture && e.push(this._diffuseTexture), this._ambientTexture && e.push(this._ambientTexture), this._opacityTexture && e.push(this._opacityTexture), this._reflectionTexture && e.push(this._reflectionTexture), this._emissiveTexture && e.push(this._emissiveTexture), this._specularTexture && e.push(this._specularTexture), this._bumpTexture && e.push(this._bumpTexture), this._lightmapTexture && e.push(this._lightmapTexture), this._refractionTexture && e.push(this._refractionTexture), e;
  }
  /**
   * Specifies if the material uses a texture
   * @param texture defines the texture to check against the material
   * @returns a boolean specifying if the material uses the texture
   */
  hasTexture(e) {
    return !!(super.hasTexture(e) || this._diffuseTexture === e || this._ambientTexture === e || this._opacityTexture === e || this._reflectionTexture === e || this._emissiveTexture === e || this._specularTexture === e || this._bumpTexture === e || this._lightmapTexture === e || this._refractionTexture === e);
  }
  /**
   * Disposes the material
   * @param forceDisposeEffect specifies if effects should be forcefully disposed
   * @param forceDisposeTextures specifies if textures should be forcefully disposed
   */
  dispose(e, t) {
    var i, s, r, a, n, o, l, f, h;
    t && ((i = this._diffuseTexture) === null || i === void 0 || i.dispose(), (s = this._ambientTexture) === null || s === void 0 || s.dispose(), (r = this._opacityTexture) === null || r === void 0 || r.dispose(), (a = this._reflectionTexture) === null || a === void 0 || a.dispose(), (n = this._emissiveTexture) === null || n === void 0 || n.dispose(), (o = this._specularTexture) === null || o === void 0 || o.dispose(), (l = this._bumpTexture) === null || l === void 0 || l.dispose(), (f = this._lightmapTexture) === null || f === void 0 || f.dispose(), (h = this._refractionTexture) === null || h === void 0 || h.dispose()), this._imageProcessingConfiguration && this._imageProcessingObserver && this._imageProcessingConfiguration.onUpdateParameters.remove(this._imageProcessingObserver), super.dispose(e, t);
  }
  /**
   * Makes a duplicate of the material, and gives it a new name
   * @param name defines the new name for the duplicated material
   * @returns the cloned material
   */
  clone(e) {
    const t = ee.Clone(() => new g(e, this.getScene()), this);
    return t.name = e, t.id = e, this.stencil.copyTo(t.stencil), t;
  }
  /**
   * Creates a standard material from parsed material data
   * @param source defines the JSON representation of the material
   * @param scene defines the hosting scene
   * @param rootUrl defines the root URL to use to load textures and relative dependencies
   * @returns a new standard material
   */
  static Parse(e, t, i) {
    const s = ee.Parse(() => new g(e.name, t), e, t, i);
    return e.stencil && s.stencil.parse(e.stencil, t, i), s;
  }
  // Flags used to enable or disable a type of texture for all Standard Materials
  /**
   * Are diffuse textures enabled in the application.
   */
  static get DiffuseTextureEnabled() {
    return L.DiffuseTextureEnabled;
  }
  static set DiffuseTextureEnabled(e) {
    L.DiffuseTextureEnabled = e;
  }
  /**
   * Are detail textures enabled in the application.
   */
  static get DetailTextureEnabled() {
    return L.DetailTextureEnabled;
  }
  static set DetailTextureEnabled(e) {
    L.DetailTextureEnabled = e;
  }
  /**
   * Are ambient textures enabled in the application.
   */
  static get AmbientTextureEnabled() {
    return L.AmbientTextureEnabled;
  }
  static set AmbientTextureEnabled(e) {
    L.AmbientTextureEnabled = e;
  }
  /**
   * Are opacity textures enabled in the application.
   */
  static get OpacityTextureEnabled() {
    return L.OpacityTextureEnabled;
  }
  static set OpacityTextureEnabled(e) {
    L.OpacityTextureEnabled = e;
  }
  /**
   * Are reflection textures enabled in the application.
   */
  static get ReflectionTextureEnabled() {
    return L.ReflectionTextureEnabled;
  }
  static set ReflectionTextureEnabled(e) {
    L.ReflectionTextureEnabled = e;
  }
  /**
   * Are emissive textures enabled in the application.
   */
  static get EmissiveTextureEnabled() {
    return L.EmissiveTextureEnabled;
  }
  static set EmissiveTextureEnabled(e) {
    L.EmissiveTextureEnabled = e;
  }
  /**
   * Are specular textures enabled in the application.
   */
  static get SpecularTextureEnabled() {
    return L.SpecularTextureEnabled;
  }
  static set SpecularTextureEnabled(e) {
    L.SpecularTextureEnabled = e;
  }
  /**
   * Are bump textures enabled in the application.
   */
  static get BumpTextureEnabled() {
    return L.BumpTextureEnabled;
  }
  static set BumpTextureEnabled(e) {
    L.BumpTextureEnabled = e;
  }
  /**
   * Are lightmap textures enabled in the application.
   */
  static get LightmapTextureEnabled() {
    return L.LightmapTextureEnabled;
  }
  static set LightmapTextureEnabled(e) {
    L.LightmapTextureEnabled = e;
  }
  /**
   * Are refraction textures enabled in the application.
   */
  static get RefractionTextureEnabled() {
    return L.RefractionTextureEnabled;
  }
  static set RefractionTextureEnabled(e) {
    L.RefractionTextureEnabled = e;
  }
  /**
   * Are color grading textures enabled in the application.
   */
  static get ColorGradingTextureEnabled() {
    return L.ColorGradingTextureEnabled;
  }
  static set ColorGradingTextureEnabled(e) {
    L.ColorGradingTextureEnabled = e;
  }
  /**
   * Are fresnels enabled in the application.
   */
  static get FresnelEnabled() {
    return L.FresnelEnabled;
  }
  static set FresnelEnabled(e) {
    L.FresnelEnabled = e;
  }
}
p([
  fe("diffuseTexture")
], g.prototype, "_diffuseTexture", void 0);
p([
  y("_markAllSubMeshesAsTexturesAndMiscDirty")
], g.prototype, "diffuseTexture", void 0);
p([
  fe("ambientTexture")
], g.prototype, "_ambientTexture", void 0);
p([
  y("_markAllSubMeshesAsTexturesDirty")
], g.prototype, "ambientTexture", void 0);
p([
  fe("opacityTexture")
], g.prototype, "_opacityTexture", void 0);
p([
  y("_markAllSubMeshesAsTexturesAndMiscDirty")
], g.prototype, "opacityTexture", void 0);
p([
  fe("reflectionTexture")
], g.prototype, "_reflectionTexture", void 0);
p([
  y("_markAllSubMeshesAsTexturesDirty")
], g.prototype, "reflectionTexture", void 0);
p([
  fe("emissiveTexture")
], g.prototype, "_emissiveTexture", void 0);
p([
  y("_markAllSubMeshesAsTexturesDirty")
], g.prototype, "emissiveTexture", void 0);
p([
  fe("specularTexture")
], g.prototype, "_specularTexture", void 0);
p([
  y("_markAllSubMeshesAsTexturesDirty")
], g.prototype, "specularTexture", void 0);
p([
  fe("bumpTexture")
], g.prototype, "_bumpTexture", void 0);
p([
  y("_markAllSubMeshesAsTexturesDirty")
], g.prototype, "bumpTexture", void 0);
p([
  fe("lightmapTexture")
], g.prototype, "_lightmapTexture", void 0);
p([
  y("_markAllSubMeshesAsTexturesDirty")
], g.prototype, "lightmapTexture", void 0);
p([
  fe("refractionTexture")
], g.prototype, "_refractionTexture", void 0);
p([
  y("_markAllSubMeshesAsTexturesDirty")
], g.prototype, "refractionTexture", void 0);
p([
  qe("ambient")
], g.prototype, "ambientColor", void 0);
p([
  qe("diffuse")
], g.prototype, "diffuseColor", void 0);
p([
  qe("specular")
], g.prototype, "specularColor", void 0);
p([
  qe("emissive")
], g.prototype, "emissiveColor", void 0);
p([
  E()
], g.prototype, "specularPower", void 0);
p([
  E("useAlphaFromDiffuseTexture")
], g.prototype, "_useAlphaFromDiffuseTexture", void 0);
p([
  y("_markAllSubMeshesAsTexturesAndMiscDirty")
], g.prototype, "useAlphaFromDiffuseTexture", void 0);
p([
  E("useEmissiveAsIllumination")
], g.prototype, "_useEmissiveAsIllumination", void 0);
p([
  y("_markAllSubMeshesAsTexturesDirty")
], g.prototype, "useEmissiveAsIllumination", void 0);
p([
  E("linkEmissiveWithDiffuse")
], g.prototype, "_linkEmissiveWithDiffuse", void 0);
p([
  y("_markAllSubMeshesAsTexturesDirty")
], g.prototype, "linkEmissiveWithDiffuse", void 0);
p([
  E("useSpecularOverAlpha")
], g.prototype, "_useSpecularOverAlpha", void 0);
p([
  y("_markAllSubMeshesAsTexturesDirty")
], g.prototype, "useSpecularOverAlpha", void 0);
p([
  E("useReflectionOverAlpha")
], g.prototype, "_useReflectionOverAlpha", void 0);
p([
  y("_markAllSubMeshesAsTexturesDirty")
], g.prototype, "useReflectionOverAlpha", void 0);
p([
  E("disableLighting")
], g.prototype, "_disableLighting", void 0);
p([
  y("_markAllSubMeshesAsLightsDirty")
], g.prototype, "disableLighting", void 0);
p([
  E("useObjectSpaceNormalMap")
], g.prototype, "_useObjectSpaceNormalMap", void 0);
p([
  y("_markAllSubMeshesAsTexturesDirty")
], g.prototype, "useObjectSpaceNormalMap", void 0);
p([
  E("useParallax")
], g.prototype, "_useParallax", void 0);
p([
  y("_markAllSubMeshesAsTexturesDirty")
], g.prototype, "useParallax", void 0);
p([
  E("useParallaxOcclusion")
], g.prototype, "_useParallaxOcclusion", void 0);
p([
  y("_markAllSubMeshesAsTexturesDirty")
], g.prototype, "useParallaxOcclusion", void 0);
p([
  E()
], g.prototype, "parallaxScaleBias", void 0);
p([
  E("roughness")
], g.prototype, "_roughness", void 0);
p([
  y("_markAllSubMeshesAsTexturesDirty")
], g.prototype, "roughness", void 0);
p([
  E()
], g.prototype, "indexOfRefraction", void 0);
p([
  E()
], g.prototype, "invertRefractionY", void 0);
p([
  E()
], g.prototype, "alphaCutOff", void 0);
p([
  E("useLightmapAsShadowmap")
], g.prototype, "_useLightmapAsShadowmap", void 0);
p([
  y("_markAllSubMeshesAsTexturesDirty")
], g.prototype, "useLightmapAsShadowmap", void 0);
p([
  Je("diffuseFresnelParameters")
], g.prototype, "_diffuseFresnelParameters", void 0);
p([
  y("_markAllSubMeshesAsFresnelDirty")
], g.prototype, "diffuseFresnelParameters", void 0);
p([
  Je("opacityFresnelParameters")
], g.prototype, "_opacityFresnelParameters", void 0);
p([
  y("_markAllSubMeshesAsFresnelAndMiscDirty")
], g.prototype, "opacityFresnelParameters", void 0);
p([
  Je("reflectionFresnelParameters")
], g.prototype, "_reflectionFresnelParameters", void 0);
p([
  y("_markAllSubMeshesAsFresnelDirty")
], g.prototype, "reflectionFresnelParameters", void 0);
p([
  Je("refractionFresnelParameters")
], g.prototype, "_refractionFresnelParameters", void 0);
p([
  y("_markAllSubMeshesAsFresnelDirty")
], g.prototype, "refractionFresnelParameters", void 0);
p([
  Je("emissiveFresnelParameters")
], g.prototype, "_emissiveFresnelParameters", void 0);
p([
  y("_markAllSubMeshesAsFresnelDirty")
], g.prototype, "emissiveFresnelParameters", void 0);
p([
  E("useReflectionFresnelFromSpecular")
], g.prototype, "_useReflectionFresnelFromSpecular", void 0);
p([
  y("_markAllSubMeshesAsFresnelDirty")
], g.prototype, "useReflectionFresnelFromSpecular", void 0);
p([
  E("useGlossinessFromSpecularMapAlpha")
], g.prototype, "_useGlossinessFromSpecularMapAlpha", void 0);
p([
  y("_markAllSubMeshesAsTexturesDirty")
], g.prototype, "useGlossinessFromSpecularMapAlpha", void 0);
p([
  E("maxSimultaneousLights")
], g.prototype, "_maxSimultaneousLights", void 0);
p([
  y("_markAllSubMeshesAsLightsDirty")
], g.prototype, "maxSimultaneousLights", void 0);
p([
  E("invertNormalMapX")
], g.prototype, "_invertNormalMapX", void 0);
p([
  y("_markAllSubMeshesAsTexturesDirty")
], g.prototype, "invertNormalMapX", void 0);
p([
  E("invertNormalMapY")
], g.prototype, "_invertNormalMapY", void 0);
p([
  y("_markAllSubMeshesAsTexturesDirty")
], g.prototype, "invertNormalMapY", void 0);
p([
  E("twoSidedLighting")
], g.prototype, "_twoSidedLighting", void 0);
p([
  y("_markAllSubMeshesAsTexturesDirty")
], g.prototype, "twoSidedLighting", void 0);
p([
  E()
], g.prototype, "useLogarithmicDepth", null);
ze("BABYLON.StandardMaterial", g);
nt.DefaultMaterialFactory = (c) => new g("default material", c);
const Za = "imageProcessingCompatibility", ja = `#ifdef IMAGEPROCESSINGPOSTPROCESS
gl_FragColor.rgb=pow(gl_FragColor.rgb,vec3(2.2));
#endif
`;
x.IncludesShadersStore[Za] = ja;
const Qa = "shadowOnlyPixelShader", Ka = `precision highp float;
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
x.ShadersStore[Qa] = Ka;
const qa = "shadowOnlyVertexShader", Ja = `precision highp float;
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
x.ShadersStore[qa] = Ja;
class en extends Rt {
  constructor() {
    super(), this.CLIPPLANE = !1, this.CLIPPLANE2 = !1, this.CLIPPLANE3 = !1, this.CLIPPLANE4 = !1, this.CLIPPLANE5 = !1, this.CLIPPLANE6 = !1, this.POINTSIZE = !1, this.FOG = !1, this.NORMAL = !1, this.NUM_BONE_INFLUENCERS = 0, this.BonesPerMesh = 0, this.INSTANCES = !1, this.IMAGEPROCESSINGPOSTPROCESS = !1, this.SKIPFINALCOLORCLAMP = !1, this.rebuild();
  }
}
class Ze extends jt {
  constructor(e, t) {
    super(e, t), this._needAlphaBlending = !0, this.shadowColor = ce.Black();
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
    t.materialDefines || (t.materialDefines = new en());
    const r = t.materialDefines, a = this.getScene();
    if (this._isReadyForSubMesh(t))
      return !0;
    const n = a.getEngine();
    if (this._activeLight) {
      for (const l of e.lightSources)
        if (l.shadowEnabled) {
          if (this._activeLight === l)
            break;
          const f = e.lightSources.indexOf(this._activeLight);
          f !== -1 && (e.lightSources.splice(f, 1), e.lightSources.splice(0, 0, this._activeLight));
          break;
        }
    }
    D.PrepareDefinesForFrameBoundValues(a, n, this, r, !!i), D.PrepareDefinesForMisc(e, a, !1, this.pointsCloud, this.fogEnabled, this._shouldTurnAlphaTestOn(e), r), r._needNormals = D.PrepareDefinesForLights(a, e, r, !1, 1);
    const o = (s = this._getFirstShadowLightForMesh(e)) === null || s === void 0 ? void 0 : s.getShadowGenerator();
    if (this._needAlphaBlending = !0, o && o.getClassName && o.getClassName() === "CascadedShadowGenerator") {
      const l = o;
      this._needAlphaBlending = !l.autoCalcDepthBounds;
    }
    if (D.PrepareDefinesForAttributes(e, r, !1, !0), r.isDirty) {
      r.markAsProcessed(), a.resetCachedMaterial();
      const l = new Pt();
      r.FOG && l.addFallback(1, "FOG"), D.HandleFallbacksForShadows(r, l, 1), r.NUM_BONE_INFLUENCERS > 0 && l.addCPUSkinningFallback(0, e), r.IMAGEPROCESSINGPOSTPROCESS = a.imageProcessingConfiguration.applyByPostProcess;
      const f = [U.PositionKind];
      r.NORMAL && f.push(U.NormalKind), D.PrepareAttributesForBones(f, e, r, l), D.PrepareAttributesForInstances(f, r);
      const h = "shadowOnly", d = r.toString(), u = ["world", "view", "viewProjection", "vEyePosition", "vLightsType", "vFogInfos", "vFogColor", "pointSize", "alpha", "shadowColor", "mBones"], S = new Array(), _ = new Array();
      lt(u), D.PrepareUniformsAndSamplersList({
        uniformsNames: u,
        uniformBuffersNames: _,
        samplers: S,
        defines: r,
        maxSimultaneousLights: 1
      }), t.setEffect(a.getEngine().createEffect(h, {
        attributes: f,
        uniformsNames: u,
        uniformBuffersNames: _,
        samplers: S,
        defines: d,
        fallbacks: l,
        onCompiled: this.onCompiled,
        onError: this.onError,
        indexParameters: { maxSimultaneousLights: 1 }
      }, n), r, this._materialContext);
    }
    return !t.effect || !t.effect.isReady() ? !1 : (r._renderId = a.getRenderId(), t.effect._wasPreviouslyReady = !0, t.effect._wasPreviouslyUsingInstances = !!i, !0);
  }
  bindForSubMesh(e, t, i) {
    const s = this.getScene(), r = i.materialDefines;
    if (!r)
      return;
    const a = i.effect;
    if (a) {
      if (this._activeEffect = a, this.bindOnlyWorldMatrix(e), this._activeEffect.setMatrix("viewProjection", s.getTransformMatrix()), D.BindBonesParameters(t, this._activeEffect), this._mustRebind(s, a) && (ot(a, this, s), this.pointsCloud && this._activeEffect.setFloat("pointSize", this.pointSize), this._activeEffect.setFloat("alpha", this.alpha), this._activeEffect.setColor3("shadowColor", this.shadowColor), s.bindEyePosition(a)), s.lightsEnabled) {
        D.BindLights(s, t, this._activeEffect, r, 1);
        const n = this._getFirstShadowLightForMesh(t);
        n && (n._renderId = -1);
      }
      (s.fogEnabled && t.applyFog && s.fogMode !== nt.FOGMODE_NONE || r.SHADOWCSM0) && this._activeEffect.setMatrix("view", s.getViewMatrix()), D.BindFogParameters(s, t, this._activeEffect), this._afterBind(t, this._activeEffect);
    }
  }
  clone(e) {
    return ee.Clone(() => new Ze(e, this.getScene()), this);
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
    return ee.Parse(() => new Ze(e.name, t), e, t, i);
  }
}
ze("BABYLON.ShadowOnlyMaterial", Ze);
const tn = {
  aspect: 300 / 150,
  enableDebugging: !1,
  enableShadows: !0
};
class rn {
  constructor(e) {
    Ee(this, "size", 9.5);
    this.config = { ...tn, ...e }, this.create();
  }
  create(e) {
    this.destroy(), Object.assign(this.config, e);
    const { aspect: t, enableDebugging: i, enableShadows: s } = this.config, r = 30;
    this.box = new ui("diceBox");
    let a = new Ze("shadowOnly", this.config.scene);
    a.alpha = s ? 1 : 0, i && (a = new g("diceBox_material"), a.alpha = 0.7, a.diffuseColor = new ce(1, 1, 0));
    const n = Oe("ground", {
      width: this.size * 2,
      height: 1,
      depth: this.size * 2
    }, this.config.scene);
    if (n.scaling = new C(t, 1, 1), n.material = a, n.receiveShadows = !0, n.setParent(this.box), i) {
      const o = Oe("wallTop", {
        width: this.size,
        height: r,
        depth: 1
      }, this.config.scene);
      o.position.y = r / 2, o.position.z = this.size / -2, o.scaling = new C(t, 1, 1), o.material = a, o.setParent(this.box);
      const l = Oe("wallRight", {
        width: 1,
        height: r,
        depth: this.size
      }, this.config.scene);
      l.position.x = this.size * t / 2, l.position.y = r / 2, l.material = a, l.setParent(this.box);
      const f = Oe("wallBottom", {
        width: this.size,
        height: r,
        depth: 1
      }, this.config.scene);
      f.position.y = r / 2, f.position.z = this.size / 2, f.scaling = new C(t, 1, 1), f.material = a, f.setParent(this.box);
      const h = Oe("wallLeft", {
        width: 1,
        height: r,
        depth: this.size
      }, this.config.scene);
      h.position.x = this.size * t / -2, h.position.y = r / 2, h.material = a, h.setParent(this.box);
    }
  }
  destroy() {
    this.box && this.box.dispose();
  }
}
class sn {
  constructor() {
  }
}
class Ce extends g {
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
  Builder(e, t, i, s, r, a) {
    if (a && this._customAttributes && this._customAttributes.length > 0 && a.push(...this._customAttributes), this.ReviewUniform("uniform", t), this.ReviewUniform("sampler", s), this._isCreatedShader)
      return this._createdShaderName;
    this._isCreatedShader = !1, Ce.ShaderIndexer++;
    const n = "custom_" + Ce.ShaderIndexer, o = this._afterBind.bind(this);
    return this._afterBind = (l, f) => {
      if (f) {
        this.AttachAfterBind(l, f);
        try {
          o(l, f);
        } catch {
        }
      }
    }, _e.ShadersStore[n + "VertexShader"] = this.VertexShader.replace("#define CUSTOM_VERTEX_BEGIN", this.CustomParts.Vertex_Begin ? this.CustomParts.Vertex_Begin : "").replace("#define CUSTOM_VERTEX_DEFINITIONS", (this._customUniform ? this._customUniform.join(`
`) : "") + (this.CustomParts.Vertex_Definitions ? this.CustomParts.Vertex_Definitions : "")).replace("#define CUSTOM_VERTEX_MAIN_BEGIN", this.CustomParts.Vertex_MainBegin ? this.CustomParts.Vertex_MainBegin : "").replace("#define CUSTOM_VERTEX_UPDATE_POSITION", this.CustomParts.Vertex_Before_PositionUpdated ? this.CustomParts.Vertex_Before_PositionUpdated : "").replace("#define CUSTOM_VERTEX_UPDATE_NORMAL", this.CustomParts.Vertex_Before_NormalUpdated ? this.CustomParts.Vertex_Before_NormalUpdated : "").replace("#define CUSTOM_VERTEX_MAIN_END", this.CustomParts.Vertex_MainEnd ? this.CustomParts.Vertex_MainEnd : ""), this.CustomParts.Vertex_After_WorldPosComputed && (_e.ShadersStore[n + "VertexShader"] = _e.ShadersStore[n + "VertexShader"].replace("#define CUSTOM_VERTEX_UPDATE_WORLDPOS", this.CustomParts.Vertex_After_WorldPosComputed)), _e.ShadersStore[n + "PixelShader"] = this.FragmentShader.replace("#define CUSTOM_FRAGMENT_BEGIN", this.CustomParts.Fragment_Begin ? this.CustomParts.Fragment_Begin : "").replace("#define CUSTOM_FRAGMENT_MAIN_BEGIN", this.CustomParts.Fragment_MainBegin ? this.CustomParts.Fragment_MainBegin : "").replace("#define CUSTOM_FRAGMENT_DEFINITIONS", (this._customUniform ? this._customUniform.join(`
`) : "") + (this.CustomParts.Fragment_Definitions ? this.CustomParts.Fragment_Definitions : "")).replace("#define CUSTOM_FRAGMENT_UPDATE_DIFFUSE", this.CustomParts.Fragment_Custom_Diffuse ? this.CustomParts.Fragment_Custom_Diffuse : "").replace("#define CUSTOM_FRAGMENT_UPDATE_ALPHA", this.CustomParts.Fragment_Custom_Alpha ? this.CustomParts.Fragment_Custom_Alpha : "").replace("#define CUSTOM_FRAGMENT_BEFORE_LIGHTS", this.CustomParts.Fragment_Before_Lights ? this.CustomParts.Fragment_Before_Lights : "").replace("#define CUSTOM_FRAGMENT_BEFORE_FRAGCOLOR", this.CustomParts.Fragment_Before_FragColor ? this.CustomParts.Fragment_Before_FragColor : "").replace("#define CUSTOM_FRAGMENT_MAIN_END", this.CustomParts.Fragment_MainEnd ? this.CustomParts.Fragment_MainEnd : ""), this.CustomParts.Fragment_Before_Fog && (_e.ShadersStore[n + "PixelShader"] = _e.ShadersStore[n + "PixelShader"].replace("#define CUSTOM_FRAGMENT_BEFORE_FOG", this.CustomParts.Fragment_Before_Fog)), this._isCreatedShader = !0, this._createdShaderName = n, n;
  }
  constructor(e, t) {
    super(e, t), this.CustomParts = new sn(), this.customShaderNameResolve = this.Builder, this.FragmentShader = _e.ShadersStore.defaultPixelShader, this.VertexShader = _e.ShadersStore.defaultVertexShader;
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
Ce.ShaderIndexer = 1;
ze("BABYLON.CustomMaterial", Ce);
Ce.prototype.clone = function(c) {
  const e = this, t = ee.Clone(() => new Ce(c, this.getScene()), this);
  return t.name = c, t.id = c, t.CustomParts.Fragment_Begin = e.CustomParts.Fragment_Begin, t.CustomParts.Fragment_Definitions = e.CustomParts.Fragment_Definitions, t.CustomParts.Fragment_MainBegin = e.CustomParts.Fragment_MainBegin, t.CustomParts.Fragment_Custom_Diffuse = e.CustomParts.Fragment_Custom_Diffuse, t.CustomParts.Fragment_Before_Lights = e.CustomParts.Fragment_Before_Lights, t.CustomParts.Fragment_Before_Fog = e.CustomParts.Fragment_Before_Fog, t.CustomParts.Fragment_Custom_Alpha = e.CustomParts.Fragment_Custom_Alpha, t.CustomParts.Fragment_Before_FragColor = e.CustomParts.Fragment_Before_FragColor, t.CustomParts.Vertex_Begin = e.CustomParts.Vertex_Begin, t.CustomParts.Vertex_Definitions = e.CustomParts.Vertex_Definitions, t.CustomParts.Vertex_MainBegin = e.CustomParts.Vertex_MainBegin, t.CustomParts.Vertex_Before_PositionUpdated = e.CustomParts.Vertex_Before_PositionUpdated, t.CustomParts.Vertex_Before_NormalUpdated = e.CustomParts.Vertex_Before_NormalUpdated, t.CustomParts.Vertex_After_WorldPosComputed = e.CustomParts.Vertex_After_WorldPosComputed, t.CustomParts.Vertex_MainEnd = e.CustomParts.Vertex_MainEnd, t;
};
class an {
  constructor(e) {
    Ee(this, "loadedThemes", {});
    Ee(this, "themeData", {});
    this.scene = e.scene;
  }
  async loadStandardMaterial(e) {
    const { theme: t, material: i } = e, s = new g(t, this.scene);
    i.diffuseTexture && (s.diffuseTexture = await this.getTexture("diffuse", e)), i.bumpTexture && (s.bumpTexture = await this.getTexture("bump", e)), i.specularTexture && (s.specularTexture = await this.getTexture("specular", e)), s.allowShaderHotSwapping = !1;
  }
  // this will create two materials - one with light text and one with dark text, the underlying color can be changed by color instance buffers
  async loadColorMaterial(e) {
    const { theme: t, material: i } = e, s = new Ce(t + "_light", this.scene), r = pi(e);
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
    const a = s.clone(t + "_dark");
    i.diffuseTexture && i.diffuseTexture.dark && (r.material.diffuseTexture = e.material.diffuseTexture.dark, a.diffuseTexture = await this.getTexture("diffuse", r)), a.AddAttribute("customColor");
  }
  async getTexture(e, t) {
    const { basePath: i, material: s, theme: r } = t;
    let a;
    const n = e + "Level", o = e + "Texture";
    try {
      switch (e) {
        case "diffuse":
          a = await this.importTextureAsync(`${i}/${s[o]}`, r), s[n] && (a.level = s[n]);
          break;
        case "bump":
          a = await this.importTextureAsync(`${i}/${s[o]}`, r), s[n] && (a.level = s[n]);
          break;
        case "specular":
          a = await this.importTextureAsync(`${i}/${s[o]}`, r), s.specularPower && (a.specularPower = s.specularPower);
          break;
        default:
          throw new Error(`Texture type: ${e} is not supported`);
      }
    } catch (l) {
      console.error(l);
    }
    return a;
  }
  async importTextureAsync(e, t) {
    return new Promise((i, s) => {
      let r = e.match(/^(.*\/)(.*)$/), a = new v(
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
        () => i(a),
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
var Y, ye, ue, Ue, Te, Be, le, re, Q, st, he, je, Qe, se, Ke, at, Qt;
class hn {
  constructor(e) {
    // add a die to the scene
    q(this, at);
    Ee(this, "config");
    Ee(this, "initialized", !1);
    q(this, Y, {});
    q(this, ye, 0);
    q(this, ue, 0);
    q(this, Ue, !1);
    q(this, Te, null);
    q(this, Be, []);
    q(this, le, void 0);
    q(this, re, void 0);
    q(this, Q, void 0);
    q(this, st, void 0);
    q(this, he, void 0);
    q(this, je, void 0);
    q(this, Qe, void 0);
    q(this, se, void 0);
    q(this, Ke, {});
    Ee(this, "noop", () => {
    });
    Ee(this, "diceBufferView", new Float32Array(8e3));
    this.onInitComplete = e.onInitComplete || this.noop, this.onThemeLoaded = e.onThemeLoaded || this.noop, this.onRollResult = e.onRollResult || this.noop, this.onRollComplete = e.onRollComplete || this.noop, this.onDieRemoved = e.onDieRemoved || this.noop, this.initialized = this.initScene(e);
  }
  // initialize the babylon scene
  async initScene(e) {
    j(this, le, e.canvas), M(this, le).width = e.width, M(this, le).height = e.height, this.config = e.options, j(this, re, mi(M(this, le))), j(this, Q, gi({ engine: M(this, re) })), j(this, st, vi({ engine: M(this, re), scene: M(this, Q) })), j(this, he, Ut({
      enableShadows: this.config.enableShadows,
      shadowTransparency: this.config.shadowTransparency,
      intensity: this.config.lightIntensity,
      scene: M(this, Q)
    })), j(this, je, new rn({
      enableShadows: this.config.enableShadows,
      aspect: M(this, le).width / M(this, le).height,
      lights: M(this, he),
      scene: M(this, Q)
    })), j(this, Qe, new an({ scene: M(this, Q) })), this.onInitComplete();
  }
  connect(e) {
    j(this, se, e), M(this, se).postMessage({
      action: "initBuffer",
      diceBuffer: this.diceBufferView.buffer
    }, [this.diceBufferView.buffer]), M(this, se).onmessage = (t) => {
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
    this.config = e, t.enableShadows !== this.config.enableShadows && (Object.values(M(this, he)).forEach((i) => i.dispose()), j(this, he, Ut(
      {
        enableShadows: this.config.enableShadows,
        shadowTransparency: this.config.shadowTransparency,
        intensity: this.config.lightIntensity,
        scene: M(this, Q)
      }
    ))), t.scale !== this.config.scale && Object.values(M(this, Y)).forEach(({ mesh: i }) => {
      var s;
      if (i) {
        const { x: r = 1, y: a = 1, z: n = 1 } = (s = i == null ? void 0 : i.metadata) == null ? void 0 : s.baseScale;
        i.scaling = new C(
          this.config.scale * r,
          this.config.scale * a,
          this.config.scale * n
        );
      }
    }), t.shadowTransparency !== this.config.shadowTransparency && (M(this, he).directional.shadowGenerator.darkness = this.config.shadowTransparency), t.lightIntensity !== this.config.lightIntensity && (M(this, he).directional.intensity = 0.65 * this.config.lightIntensity, M(this, he).hemispheric.intensity = 0.4 * this.config.lightIntensity);
  }
  // all this does is start the render engine.
  render(e) {
    M(this, re).runRenderLoop(this.renderLoop.bind(this)), M(this, se).postMessage({
      action: "resumeSimulation",
      newStartPoint: e
    });
  }
  renderLoop() {
    if (M(this, ue) && M(this, ue) === Object.keys(M(this, Y)).length) {
      if (!M(this, Ue))
        if (j(this, Ue, !0), M(this, se).postMessage({ action: "stopSimulation" }), this.onRollComplete(), this.config.highlightResult) {
          const e = typeof this.config.highlightResult == "object" && this.config.highlightResult !== null ? this.config.highlightResult.durationMs ?? 3500 : 3500;
          j(this, Te, setTimeout(() => {
            M(this, re).stopRenderLoop(), j(this, Te, null);
          }, e + 200));
        } else {
          M(this, re).stopRenderLoop();
          return;
        }
      M(this, Q).render();
    } else
      M(this, Q).render();
  }
  async loadTheme(e) {
    const { theme: t, basePath: i, material: s, meshFilePath: r, meshName: a } = e;
    if (await M(this, Qe).load({ theme: t, basePath: i, material: s }), !Object.keys(M(this, Ke)).includes(a)) {
      M(this, Ke)[a] = r;
      const n = await Fe.loadModels({ meshFilePath: r, meshName: a }, M(this, Q));
      if (!n)
        throw new Error("No colliders returned from the 3D mesh file. Low poly colliders are expected to be in the same file as the high poly dice and the mesh name contains the word 'collider'");
      M(this, se).postMessage({
        action: "loadModels",
        options: {
          colliders: n,
          meshName: a
        }
      });
    }
    this.onThemeLoaded({ id: t });
  }
  clear() {
    !Object.keys(M(this, Y)).length && !M(this, ue) || (M(this, Te) && (clearTimeout(M(this, Te)), j(this, Te, null)), j(this, Ue, !1), this.diceBufferView.byteLength && this.diceBufferView.fill(0), M(this, Be).forEach((e) => clearTimeout(e)), M(this, re).stopRenderLoop(), Object.values(M(this, Y)).forEach((e) => {
      var t;
      (t = e.glowCleanup) == null || t.call(e), e.mesh && e.mesh.dispose();
    }), j(this, Y, {}), j(this, ye, 0), j(this, ue, 0), M(this, Q).render());
  }
  add(e) {
    Fe.loadDie(e, M(this, Q)).then((t) => {
      M(this, Be).push(setTimeout(() => {
        Dt(this, at, Qt).call(this, t);
      }, De(this, ye)._++ * this.config.delay));
    });
  }
  addNonDie(e) {
    M(this, re).activeRenderLoops.length === 0 && this.render(!1);
    const { id: t, value: i, ...s } = e, r = {
      id: t,
      value: i,
      config: s
    };
    M(this, Y)[t] = r, setTimeout(() => {
      M(this, Be).push(setTimeout(() => {
        this.handleAsleep(r);
      }, De(this, ye)._++ * this.config.delay));
    }, 10);
  }
  remove(e) {
    const t = M(this, Y)[e.id];
    t.hasOwnProperty("d10Instance") && (M(this, Y)[t.d10Instance.id].mesh && (M(this, Y)[t.d10Instance.id].mesh.dispose(), M(this, se).postMessage({
      action: "removeDie",
      id: t.d10Instance.id
    })), delete M(this, Y)[t.d10Instance.id], De(this, ue)._--), M(this, Y)[e.id].mesh && M(this, Y)[e.id].mesh.dispose(), delete M(this, Y)[e.id], De(this, ue)._--, M(this, Q).render(), this.onDieRemoved(e.rollId);
  }
  updatesFromPhysics(e) {
    this.diceBufferView = new Float32Array(e);
    let t = 1;
    for (let i = 0, s = this.diceBufferView[0]; i < s; i++) {
      if (!Object.keys(M(this, Y)).length)
        continue;
      const r = M(this, Y)[`${this.diceBufferView[t]}`];
      if (!r) {
        console.log("Error: die not available in scene to animate");
        break;
      }
      if (this.diceBufferView[t + 1] === -1)
        this.handleAsleep(r);
      else {
        const a = this.diceBufferView[t + 1], n = this.diceBufferView[t + 2], o = this.diceBufferView[t + 3], l = this.diceBufferView[t + 4], f = this.diceBufferView[t + 5], h = this.diceBufferView[t + 6], d = this.diceBufferView[t + 7];
        r.mesh.position.set(a, n, o), r.mesh.rotationQuaternion.set(l, f, h, d);
      }
      t = t + 8;
    }
    requestAnimationFrame(() => {
      M(this, se).postMessage({
        action: "stepSimulation",
        diceBuffer: this.diceBufferView.buffer
      }, [this.diceBufferView.buffer]);
    });
  }
  // handle the position updates from the physics worker. It's a simple flat array of numbers for quick and easy transfer
  async handleAsleep(e) {
    var t, i;
    if (e.asleep = !0, await Fe.getRollResult(e, M(this, Q), this.config), e.d10Instance || e.dieParent) {
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
    De(this, ue)._++;
  }
  resize(e) {
    const t = M(this, le).width = e.width, i = M(this, le).height = e.height;
    M(this, je).create({ aspect: t / i }), M(this, re).resize();
  }
}
Y = new WeakMap(), ye = new WeakMap(), ue = new WeakMap(), Ue = new WeakMap(), Te = new WeakMap(), Be = new WeakMap(), le = new WeakMap(), re = new WeakMap(), Q = new WeakMap(), st = new WeakMap(), he = new WeakMap(), je = new WeakMap(), Qe = new WeakMap(), se = new WeakMap(), Ke = new WeakMap(), at = new WeakSet(), Qt = async function(e) {
  M(this, re).activeRenderLoops.length === 0 && this.render(e.newStartPoint);
  const t = {
    ...e,
    assetPath: this.config.assetPath,
    enableShadows: this.config.enableShadows,
    scale: this.config.scale,
    lights: M(this, he)
  }, i = new Fe(t, M(this, Q));
  return M(this, Y)[i.id] = i, M(this, se).postMessage({
    action: "addDie",
    options: {
      sides: e.sides,
      scale: this.config.scale,
      id: i.id,
      newStartPoint: e.newStartPoint,
      theme: e.theme,
      meshName: e.meshName
    }
  }), e.sides === 100 && e.data !== "single" && (i.d10Instance = await Fe.loadDie({ ...t, dieType: "d10", sides: 10, id: i.id + 1e4 }, M(this, Q)).then((s) => {
    const r = new Fe(s, M(this, Q));
    return r.dieParent = i, r;
  }), M(this, Y)[`${i.d10Instance.id}`] = i.d10Instance, M(this, se).postMessage({
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
  hn as default
};
//# sourceMappingURL=world.onscreen.js.map
