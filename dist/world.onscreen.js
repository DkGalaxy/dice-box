var oi = Object.defineProperty;
var li = (d, e, t) => e in d ? oi(d, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : d[e] = t;
var Ie = (d, e, t) => (li(d, typeof e != "symbol" ? e + "" : e, t), t), At = (d, e, t) => {
  if (!e.has(d))
    throw TypeError("Cannot " + t);
};
var A = (d, e, t) => (At(d, e, "read from private field"), t ? t.call(d) : e.get(d)), Y = (d, e, t) => {
  if (e.has(d))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(d) : e.set(d, t);
}, Z = (d, e, t, i) => (At(d, e, "write to private field"), i ? i.call(d, t) : e.set(d, t), t);
var Ve = (d, e, t, i) => ({
  set _(s) {
    Z(d, e, s, t);
  },
  get _() {
    return A(d, e, i);
  }
}), ft = (d, e, t) => (At(d, e, "access private method"), t);
import { _ as u, s as T, a as pe, R as hi, O as z, E as st, M as F, S as q, C as He, T as Vt, V as R, b as le, c as fi, I as di, P as ci, d as Ne, G as $t, e as ye, f as Qe, g as Ue, h as Zt, L as ct, i as x, j as ui, k as L, l as gt, m as Te, n as Ge, o as pi, p as Ft, q as jt, r as V, t as Kt, u as Ot, v as Ae, w as _i, x as mi, y as Ce, z as ve, A as D, B as Nt, F as nt, H as at, J as gi, K as ot, N as ae, Q as ie, U as qe, W as vt, X as we, Y as Xe, Z as Xt, $ as Qt, a0 as vi, a1 as qt, a2 as Ei, a3 as Je, a4 as me, a5 as lt, a6 as Si, a7 as Ke, a8 as Ti, a9 as xe, aa as B, ab as Ct, ac as ht, ad as xi, D as ze } from "./Dice.js";
import { d as Mi } from "./dice-box.es.js";
class yt {
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
    var t, i, s, r, n;
    const a = (s = (i = (t = this._externalProperties) === null || t === void 0 ? void 0 : t[e]) === null || i === void 0 ? void 0 : i.type) !== null && s !== void 0 ? s : typeof this[e], o = (n = (r = this._externalProperties) === null || r === void 0 ? void 0 : r[e]) === null || n === void 0 ? void 0 : n.default;
    switch (a) {
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
class Me {
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
    return new Me(this.width * e, this.height * t);
  }
  /**
   * Clones the size
   * @returns a new Size copied from the given one.
   */
  clone() {
    return new Me(this.width, this.height);
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
    return new Me(0, 0);
  }
  /**
   * Sums the width and height of two sizes
   * @param otherSize size to add to this size
   * @returns a new Size set as the addition result of the current Size and the given one.
   */
  add(e) {
    return new Me(this.width + e.width, this.height + e.height);
  }
  /**
   * Subtracts the width and height of two
   * @param otherSize size to subtract to this size
   * @returns a new Size set as the subtraction result of  the given one from the current Size.
   */
  subtract(e) {
    return new Me(this.width - e.width, this.height - e.height);
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
    return new Me(s, r);
  }
}
class Ut {
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
    this._wrapU = 1, this._wrapV = 1, this.wrapR = 1, this.anisotropicFilteringLevel = 4, this.delayLoadState = 0, this._texture = null, this._engine = null, this._cachedSize = Me.Zero(), this._cachedBaseSize = Me.Zero(), this._initialSamplingMode = 2, this._texture = Ut._IsRenderTargetWrapper(e) ? e.texture : e, this._texture && (this._engine = this._texture.getEngine());
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
class k extends Ut {
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
    return this._uid || (this._uid = hi()), this._uid;
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
    super(null), this.metadata = null, this.reservedDataStore = null, this._hasAlpha = !1, this._getAlphaFromRGB = !1, this.level = 1, this._coordinatesIndex = 0, this.optimizeUVAllocation = !0, this._coordinatesMode = 0, this.wrapR = 1, this.anisotropicFilteringLevel = k.DEFAULT_ANISOTROPIC_FILTERING_LEVEL, this._isCube = !1, this._gammaSpace = !0, this.invertZ = !1, this.lodLevelInAlpha = !1, this.isRenderTarget = !1, this._prefiltered = !1, this._forceSerialize = !1, this.animations = new Array(), this.onDisposeObservable = new z(), this._onDisposeObserver = null, this._scene = null, this._uid = null, this._parentContainer = null, this._loadingError = !1, e ? k._IsScene(e) ? this._scene = e : this._engine = e : this._scene = st.LastCreatedScene, this._scene && (this.uniqueId = this._scene.getUniqueId(), this._scene.addTexture(this), this._engine = this._scene.getEngine()), this._texture = t, this._uid = null;
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
  _getFromCache(e, t, i, s, r, n) {
    const a = this._getEngine();
    if (!a)
      return null;
    const o = a._getUseSRGBBuffer(!!r, t), l = a.getLoadedTexturesCache();
    for (let f = 0; f < l.length; f++) {
      const h = l[f];
      if ((r === void 0 || o === h._useSRGBBuffer) && (s === void 0 || s === h.invertY) && h.url === e && h.generateMipMaps === !t && (!i || i === h.samplingMode) && (n === void 0 || n === h.isCube))
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
  readPixels(e = 0, t = 0, i = null, s = !0, r = !1, n = 0, a = 0, o = Number.MAX_VALUE, l = Number.MAX_VALUE) {
    if (!this._texture)
      return null;
    const f = this._getEngine();
    if (!f)
      return null;
    const h = this.getSize();
    let c = h.width, p = h.height;
    t !== 0 && (c = c / Math.pow(2, t), p = p / Math.pow(2, t), c = Math.round(c), p = Math.round(p)), o = Math.min(c, o), l = Math.min(p, l);
    try {
      return this._texture.isCube ? f._readTexturePixels(this._texture, o, l, e, t, i, s, r, n, a) : f._readTexturePixels(this._texture, o, l, -1, t, i, s, r, n, a);
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
    const n = this.getSize();
    let a = n.width, o = n.height;
    const l = this._getEngine();
    if (!l)
      return null;
    t != 0 && (a = a / Math.pow(2, t), o = o / Math.pow(2, t), a = Math.round(a), o = Math.round(o));
    try {
      return this._texture.isCube ? l._readTexturePixelsSync(this._texture, a, o, e, t, i, s, r) : l._readTexturePixelsSync(this._texture, a, o, -1, t, i, s, r);
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
    const t = q.Serialize(this);
    return q.AppendSerializedAnimations(this, t), t;
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
        const n = r.onLoadObservable;
        n ? n.addOnce(() => {
          --i === 0 && t();
        }) : --i === 0 && t();
      }
    }
  }
  static _IsScene(e) {
    return e.getClassName() === "Scene";
  }
}
k.DEFAULT_ANISOTROPIC_FILTERING_LEVEL = 4;
u([
  T()
], k.prototype, "uniqueId", void 0);
u([
  T()
], k.prototype, "name", void 0);
u([
  T()
], k.prototype, "metadata", void 0);
u([
  T("hasAlpha")
], k.prototype, "_hasAlpha", void 0);
u([
  T("getAlphaFromRGB")
], k.prototype, "_getAlphaFromRGB", void 0);
u([
  T()
], k.prototype, "level", void 0);
u([
  T("coordinatesIndex")
], k.prototype, "_coordinatesIndex", void 0);
u([
  T()
], k.prototype, "optimizeUVAllocation", void 0);
u([
  T("coordinatesMode")
], k.prototype, "_coordinatesMode", void 0);
u([
  T()
], k.prototype, "wrapU", null);
u([
  T()
], k.prototype, "wrapV", null);
u([
  T()
], k.prototype, "wrapR", void 0);
u([
  T()
], k.prototype, "anisotropicFilteringLevel", void 0);
u([
  T()
], k.prototype, "isCube", null);
u([
  T()
], k.prototype, "is3D", null);
u([
  T()
], k.prototype, "is2DArray", null);
u([
  T()
], k.prototype, "gammaSpace", null);
u([
  T()
], k.prototype, "invertZ", void 0);
u([
  T()
], k.prototype, "lodLevelInAlpha", void 0);
u([
  T()
], k.prototype, "lodGenerationOffset", null);
u([
  T()
], k.prototype, "lodGenerationScale", null);
u([
  T()
], k.prototype, "linearSpecularLOD", null);
u([
  pe()
], k.prototype, "irradianceTexture", null);
u([
  T()
], k.prototype, "isRenderTarget", void 0);
function Jt(d, e, t = !1) {
  const i = e.width, s = e.height;
  if (d instanceof Float32Array) {
    let l = d.byteLength / d.BYTES_PER_ELEMENT;
    const f = new Uint8Array(l);
    for (; --l >= 0; ) {
      let h = d[l];
      h < 0 ? h = 0 : h > 1 && (h = 1), f[l] = h * 255;
    }
    d = f;
  }
  const r = document.createElement("canvas");
  r.width = i, r.height = s;
  const n = r.getContext("2d");
  if (!n)
    return null;
  const a = n.createImageData(i, s);
  if (a.data.set(d), n.putImageData(a, 0, 0), t) {
    const l = document.createElement("canvas");
    l.width = i, l.height = s;
    const f = l.getContext("2d");
    return f ? (f.translate(0, s), f.scale(1, -1), f.drawImage(r, 0, 0), l.toDataURL("image/png")) : null;
  }
  return r.toDataURL("image/png");
}
function Ai(d, e = 0, t = 0) {
  const i = d.getInternalTexture();
  if (!i)
    return null;
  const s = d._readPixelsSync(e, t);
  return s ? Jt(s, d.getSize(), i.invertY) : null;
}
async function Ci(d, e = 0, t = 0) {
  const i = d.getInternalTexture();
  if (!i)
    return null;
  const s = await d.readPixels(e, t);
  return s ? Jt(s, d.getSize(), i.invertY) : null;
}
class m extends k {
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
  constructor(e, t, i, s, r = m.TRILINEAR_SAMPLINGMODE, n = null, a = null, o = null, l = !1, f, h, c, p, E) {
    var g, _, S, I, M, P, N, W, b;
    super(t), this.url = null, this.uOffset = 0, this.vOffset = 0, this.uScale = 1, this.vScale = 1, this.uAng = 0, this.vAng = 0, this.wAng = 0, this.uRotationCenter = 0.5, this.vRotationCenter = 0.5, this.wRotationCenter = 0.5, this.homogeneousRotationInUVTransform = !1, this.inspectableCustomProperties = null, this._noMipmap = !1, this._invertY = !1, this._rowGenerationMatrix = null, this._cachedTextureMatrix = null, this._projectionModeMatrix = null, this._t0 = null, this._t1 = null, this._t2 = null, this._cachedUOffset = -1, this._cachedVOffset = -1, this._cachedUScale = 0, this._cachedVScale = 0, this._cachedUAng = -1, this._cachedVAng = -1, this._cachedWAng = -1, this._cachedReflectionProjectionMatrixId = -1, this._cachedURotationCenter = -1, this._cachedVRotationCenter = -1, this._cachedWRotationCenter = -1, this._cachedHomogeneousRotationInUVTransform = !1, this._cachedReflectionTextureMatrix = null, this._cachedReflectionUOffset = -1, this._cachedReflectionVOffset = -1, this._cachedReflectionUScale = 0, this._cachedReflectionVScale = 0, this._cachedReflectionCoordinatesMode = -1, this._buffer = null, this._deleteBuffer = !1, this._format = null, this._delayedOnLoad = null, this._delayedOnError = null, this.onLoadObservable = new z(), this._isBlocking = !0, this.name = e || "", this.url = e;
    let O, y = !1, U = null;
    typeof i == "object" && i !== null ? (O = (g = i.noMipmap) !== null && g !== void 0 ? g : !1, s = (_ = i.invertY) !== null && _ !== void 0 ? _ : !He.UseOpenGLOrientationForUV, r = (S = i.samplingMode) !== null && S !== void 0 ? S : m.TRILINEAR_SAMPLINGMODE, n = (I = i.onLoad) !== null && I !== void 0 ? I : null, a = (M = i.onError) !== null && M !== void 0 ? M : null, o = (P = i.buffer) !== null && P !== void 0 ? P : null, l = (N = i.deleteBuffer) !== null && N !== void 0 ? N : !1, f = i.format, h = i.mimeType, c = i.loaderOptions, p = i.creationFlags, y = (W = i.useSRGBBuffer) !== null && W !== void 0 ? W : !1, U = (b = i.internalTexture) !== null && b !== void 0 ? b : null) : O = !!i, this._noMipmap = O, this._invertY = s === void 0 ? !He.UseOpenGLOrientationForUV : s, this._initialSamplingMode = r, this._buffer = o, this._deleteBuffer = l, this._mimeType = h, this._loaderOptions = c, this._creationFlags = p, this._useSRGBBuffer = y, this._forcedExtension = E, f && (this._format = f);
    const Se = this.getScene(), H = this._getEngine();
    if (!H)
      return;
    H.onBeforeTextureInitObservable.notifyObservers(this);
    const re = () => {
      this._texture && (this._texture._invertVScale && (this.vScale *= -1, this.vOffset += 1), this._texture._cachedWrapU !== null && (this.wrapU = this._texture._cachedWrapU, this._texture._cachedWrapU = null), this._texture._cachedWrapV !== null && (this.wrapV = this._texture._cachedWrapV, this._texture._cachedWrapV = null), this._texture._cachedWrapR !== null && (this.wrapR = this._texture._cachedWrapR, this._texture._cachedWrapR = null)), this.onLoadObservable.hasObservers() && this.onLoadObservable.notifyObservers(this), n && n(), !this.isBlocking && Se && Se.resetCachedMaterial();
    }, de = (J, _e) => {
      this._loadingError = !0, this._errorObject = { message: J, exception: _e }, a && a(J, _e), m.OnTextureLoadErrorObservable.notifyObservers(this);
    };
    if (!this.url && !U) {
      this._delayedOnLoad = re, this._delayedOnError = de;
      return;
    }
    if (this._texture = U ?? this._getFromCache(this.url, O, r, this._invertY, y), this._texture)
      if (this._texture.isReady)
        Vt.SetImmediate(() => re());
      else {
        const J = this._texture.onLoadedObservable.add(re);
        this._texture.onErrorObservable.add((_e) => {
          var Mt;
          de(_e.message, _e.exception), (Mt = this._texture) === null || Mt === void 0 || Mt.onLoadedObservable.remove(J);
        });
      }
    else if (!Se || !Se.useDelayedTextureLoading) {
      try {
        this._texture = H.createTexture(this.url, O, this._invertY, Se, r, re, de, this._buffer, void 0, this._format, this._forcedExtension, h, c, p, y);
      } catch (J) {
        throw de("error loading", J), J;
      }
      l && (this._buffer = null);
    } else
      this.delayLoadState = 4, this._delayedOnLoad = re, this._delayedOnError = de;
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
    e && (this.delayLoadState = 1, this._texture = this._getFromCache(this.url, this._noMipmap, this.samplingMode, this._invertY, this._useSRGBBuffer), this._texture ? this._delayedOnLoad && (this._texture.isReady ? Vt.SetImmediate(this._delayedOnLoad) : this._texture.onLoadedObservable.add(this._delayedOnLoad)) : (this._texture = e.getEngine().createTexture(this.url, this._noMipmap, this._invertY, e, this.samplingMode, this._delayedOnLoad, this._delayedOnError, this._buffer, null, this._format, this._forcedExtension, this._mimeType, this._loaderOptions, this._creationFlags, this._useSRGBBuffer), this._deleteBuffer && (this._buffer = null)), this._delayedOnLoad = null, this._delayedOnError = null);
  }
  _prepareRowForTextureGeneration(e, t, i, s) {
    e *= this._cachedUScale, t *= this._cachedVScale, e -= this.uRotationCenter * this._cachedUScale, t -= this.vRotationCenter * this._cachedVScale, i -= this.wRotationCenter, R.TransformCoordinatesFromFloatsToRef(e, t, i, this._rowGenerationMatrix, s), s.x += this.uRotationCenter * this._cachedUScale + this._cachedUOffset, s.y += this.vRotationCenter * this._cachedVScale + this._cachedVOffset, s.z += this.wRotationCenter;
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
    this._cachedUOffset = this.uOffset, this._cachedVOffset = this.vOffset, this._cachedUScale = this.uScale * e, this._cachedVScale = this.vScale, this._cachedUAng = this.uAng, this._cachedVAng = this.vAng, this._cachedWAng = this.wAng, this._cachedURotationCenter = this.uRotationCenter, this._cachedVRotationCenter = this.vRotationCenter, this._cachedWRotationCenter = this.wRotationCenter, this._cachedHomogeneousRotationInUVTransform = this.homogeneousRotationInUVTransform, (!this._cachedTextureMatrix || !this._rowGenerationMatrix) && (this._cachedTextureMatrix = F.Zero(), this._rowGenerationMatrix = new F(), this._t0 = R.Zero(), this._t1 = R.Zero(), this._t2 = R.Zero()), F.RotationYawPitchRollToRef(this.vAng, this.uAng, this.wAng, this._rowGenerationMatrix), this.homogeneousRotationInUVTransform ? (F.TranslationToRef(-this._cachedURotationCenter, -this._cachedVRotationCenter, -this._cachedWRotationCenter, le.Matrix[0]), F.TranslationToRef(this._cachedURotationCenter, this._cachedVRotationCenter, this._cachedWRotationCenter, le.Matrix[1]), F.ScalingToRef(this._cachedUScale, this._cachedVScale, 0, le.Matrix[2]), F.TranslationToRef(this._cachedUOffset, this._cachedVOffset, 0, le.Matrix[3]), le.Matrix[0].multiplyToRef(this._rowGenerationMatrix, this._cachedTextureMatrix), this._cachedTextureMatrix.multiplyToRef(le.Matrix[1], this._cachedTextureMatrix), this._cachedTextureMatrix.multiplyToRef(le.Matrix[2], this._cachedTextureMatrix), this._cachedTextureMatrix.multiplyToRef(le.Matrix[3], this._cachedTextureMatrix), this._cachedTextureMatrix.setRowFromFloats(2, this._cachedTextureMatrix.m[12], this._cachedTextureMatrix.m[13], this._cachedTextureMatrix.m[14], 1)) : (this._prepareRowForTextureGeneration(0, 0, 0, this._t0), this._prepareRowForTextureGeneration(1, 0, 0, this._t1), this._prepareRowForTextureGeneration(0, 1, 0, this._t2), this._t1.subtractInPlace(this._t0), this._t2.subtractInPlace(this._t0), F.FromValuesToRef(this._t1.x, this._t1.y, this._t1.z, 0, this._t2.x, this._t2.y, this._t2.z, 0, this._t0.x, this._t0.y, this._t0.z, 0, 0, 0, 0, 1, this._cachedTextureMatrix));
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
      if (this.coordinatesMode === m.PROJECTION_MODE) {
        if (this._cachedReflectionProjectionMatrixId === e.getProjectionMatrix().updateFlag)
          return this._cachedReflectionTextureMatrix;
      } else
        return this._cachedReflectionTextureMatrix;
    this._cachedReflectionTextureMatrix || (this._cachedReflectionTextureMatrix = F.Zero()), this._projectionModeMatrix || (this._projectionModeMatrix = F.Zero());
    const t = this._cachedReflectionCoordinatesMode !== this.coordinatesMode;
    switch (this._cachedReflectionUOffset = this.uOffset, this._cachedReflectionVOffset = this.vOffset, this._cachedReflectionUScale = this.uScale, this._cachedReflectionVScale = this.vScale, this._cachedReflectionCoordinatesMode = this.coordinatesMode, this.coordinatesMode) {
      case m.PLANAR_MODE: {
        F.IdentityToRef(this._cachedReflectionTextureMatrix), this._cachedReflectionTextureMatrix[0] = this.uScale, this._cachedReflectionTextureMatrix[5] = this.vScale, this._cachedReflectionTextureMatrix[12] = this.uOffset, this._cachedReflectionTextureMatrix[13] = this.vOffset;
        break;
      }
      case m.PROJECTION_MODE: {
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
    return q.Clone(() => new m(this._texture ? this._texture.url : null, this.getScene(), e), this);
  }
  /**
   * Serialize the texture to a JSON representation we can easily use in the respective Parse function.
   * @returns The JSON representation of the texture
   */
  serialize() {
    var e, t;
    const i = this.name;
    m.SerializeBuffers || this.name.startsWith("data:") && (this.name = ""), this.name.startsWith("data:") && this.url === this.name && (this.url = "");
    const s = super.serialize(m._SerializeInternalTextureUniqueId);
    return s ? ((m.SerializeBuffers || m.ForceSerializeBuffers) && (typeof this._buffer == "string" && this._buffer.substr(0, 5) === "data:" ? (s.base64String = this._buffer, s.name = s.name.replace("data:", "")) : this.url && this.url.startsWith("data:") && this._buffer instanceof Uint8Array ? s.base64String = "data:image/png;base64," + fi(this._buffer) : (m.ForceSerializeBuffers || this.url && this.url.startsWith("blob:") || this._forceSerialize) && (s.base64String = !this._engine || this._engine._features.supportSyncTextureRead ? Ai(this) : Ci(this))), s.invertY = this._invertY, s.samplingMode = this.samplingMode, s._creationFlags = this._creationFlags, s._useSRGBBuffer = this._useSRGBBuffer, m._SerializeInternalTextureUniqueId && (s.internalTextureUniqueId = (t = (e = this._texture) === null || e === void 0 ? void 0 : e.uniqueId) !== null && t !== void 0 ? t : void 0), this.name = i, s) : null;
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
      const l = di.Instantiate(e.customType).Parse(e, t, i);
      return e.samplingMode && l.updateSamplingMode && l._samplingMode && l._samplingMode !== e.samplingMode && l.updateSamplingMode(e.samplingMode), l;
    }
    if (e.isCube && !e.isRenderTarget)
      return m._CubeTextureParser(e, t, i);
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
    const n = (o) => {
      var l;
      if (o && o._texture && (o._texture._cachedWrapU = null, o._texture._cachedWrapV = null, o._texture._cachedWrapR = null), e.samplingMode) {
        const f = e.samplingMode;
        o && o.samplingMode !== f && o.updateSamplingMode(f);
      }
      if (o && e.animations)
        for (let f = 0; f < e.animations.length; f++) {
          const h = e.animations[f], c = $t("BABYLON.Animation");
          c && o.animations.push(c.Parse(h));
        }
      s && !r && ((l = o == null ? void 0 : o._texture) === null || l === void 0 || l._setUniqueId(e.internalTextureUniqueId));
    };
    return q.Parse(() => {
      var o, l, f;
      let h = !0;
      if (e.noMipmap && (h = !1), e.mirrorPlane) {
        const c = m._CreateMirror(e.name, e.renderTargetSize, t, h);
        return c._waitingRenderList = e.renderList, c.mirrorPlane = ci.FromArray(e.mirrorPlane), n(c), c;
      } else if (e.isRenderTarget) {
        let c = null;
        if (e.isCube) {
          if (t.reflectionProbes)
            for (let p = 0; p < t.reflectionProbes.length; p++) {
              const E = t.reflectionProbes[p];
              if (E.name === e.name)
                return E.cubeTexture;
            }
        } else
          c = m._CreateRenderTargetTexture(e.name, e.renderTargetSize, t, h, (o = e._creationFlags) !== null && o !== void 0 ? o : 0), c._waitingRenderList = e.renderList;
        return n(c), c;
      } else {
        let c;
        if (e.base64String && !r)
          c = m.CreateFromBase64String(e.base64String, e.base64String, t, !h, e.invertY, e.samplingMode, () => {
            n(c);
          }, (l = e._creationFlags) !== null && l !== void 0 ? l : 0, (f = e._useSRGBBuffer) !== null && f !== void 0 ? f : !1), c.name = e.name;
        else {
          let p;
          e.name && e.name.indexOf("://") > 0 ? p = e.name : p = i + e.name, e.url && (e.url.startsWith("data:") || m.UseSerializedUrlIfAny) && (p = e.url);
          const E = {
            noMipmap: !h,
            invertY: e.invertY,
            samplingMode: e.samplingMode,
            onLoad: () => {
              n(c);
            },
            internalTexture: r
          };
          c = new m(p, t, E);
        }
        return c;
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
  static CreateFromBase64String(e, t, i, s, r, n = m.TRILINEAR_SAMPLINGMODE, a = null, o = null, l = 5, f) {
    return new m("data:" + t, i, s, r, n, a, o, e, !1, l, void 0, void 0, f);
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
  static LoadFromDataString(e, t, i, s = !1, r, n = !0, a = m.TRILINEAR_SAMPLINGMODE, o = null, l = null, f = 5, h) {
    return e.substr(0, 5) !== "data:" && (e = "data:" + e), new m(e, i, r, n, a, o, l, t, s, f, void 0, void 0, h);
  }
}
m.SerializeBuffers = !0;
m.ForceSerializeBuffers = !1;
m.OnTextureLoadErrorObservable = new z();
m._SerializeInternalTextureUniqueId = !1;
m._CubeTextureParser = (d, e, t) => {
  throw Ne("CubeTexture");
};
m._CreateMirror = (d, e, t, i) => {
  throw Ne("MirrorTexture");
};
m._CreateRenderTargetTexture = (d, e, t, i, s) => {
  throw Ne("RenderTargetTexture");
};
m.NEAREST_SAMPLINGMODE = 1;
m.NEAREST_NEAREST_MIPLINEAR = 8;
m.BILINEAR_SAMPLINGMODE = 2;
m.LINEAR_LINEAR_MIPNEAREST = 11;
m.TRILINEAR_SAMPLINGMODE = 3;
m.LINEAR_LINEAR_MIPLINEAR = 3;
m.NEAREST_NEAREST_MIPNEAREST = 4;
m.NEAREST_LINEAR_MIPNEAREST = 5;
m.NEAREST_LINEAR_MIPLINEAR = 6;
m.NEAREST_LINEAR = 7;
m.NEAREST_NEAREST = 1;
m.LINEAR_NEAREST_MIPNEAREST = 9;
m.LINEAR_NEAREST_MIPLINEAR = 10;
m.LINEAR_LINEAR = 2;
m.LINEAR_NEAREST = 12;
m.EXPLICIT_MODE = 0;
m.SPHERICAL_MODE = 1;
m.PLANAR_MODE = 2;
m.CUBIC_MODE = 3;
m.PROJECTION_MODE = 4;
m.SKYBOX_MODE = 5;
m.INVCUBIC_MODE = 6;
m.EQUIRECTANGULAR_MODE = 7;
m.FIXED_EQUIRECTANGULAR_MODE = 8;
m.FIXED_EQUIRECTANGULAR_MIRRORED_MODE = 9;
m.CLAMP_ADDRESSMODE = 0;
m.WRAP_ADDRESSMODE = 1;
m.MIRROR_ADDRESSMODE = 2;
m.UseSerializedUrlIfAny = !1;
u([
  T()
], m.prototype, "url", void 0);
u([
  T()
], m.prototype, "uOffset", void 0);
u([
  T()
], m.prototype, "vOffset", void 0);
u([
  T()
], m.prototype, "uScale", void 0);
u([
  T()
], m.prototype, "vScale", void 0);
u([
  T()
], m.prototype, "uAng", void 0);
u([
  T()
], m.prototype, "vAng", void 0);
u([
  T()
], m.prototype, "wAng", void 0);
u([
  T()
], m.prototype, "uRotationCenter", void 0);
u([
  T()
], m.prototype, "vRotationCenter", void 0);
u([
  T()
], m.prototype, "wRotationCenter", void 0);
u([
  T()
], m.prototype, "homogeneousRotationInUVTransform", void 0);
u([
  T()
], m.prototype, "isBlocking", null);
ye("BABYLON.Texture", m);
q._TextureParser = m.Parse;
class Ri {
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
      const f = this.textures;
      if (f && f.length > 0) {
        let h = !1, c = f.length;
        const p = f[f.length - 1]._source;
        (p === Qe.Depth || p === Qe.DepthStencil) && (h = !0, c--);
        const E = [], g = [], _ = [], S = [], I = [], M = [], P = [], N = {};
        for (let O = 0; O < c; ++O) {
          const y = f[O];
          E.push(y.samplingMode), g.push(y.type), _.push(y.format), N[y.uniqueId] !== void 0 ? (S.push(-1), P.push(0)) : (N[y.uniqueId] = O, y.is2DArray ? (S.push(35866), P.push(y.depth)) : y.isCube ? (S.push(34067), P.push(0)) : y.is3D ? (S.push(32879), P.push(y.depth)) : (S.push(3553), P.push(0))), this._faceIndices && I.push((e = this._faceIndices[O]) !== null && e !== void 0 ? e : 0), this._layerIndices && M.push((t = this._layerIndices[O]) !== null && t !== void 0 ? t : 0);
        }
        const W = {
          samplingModes: E,
          generateMipMaps: f[0].generateMipMaps,
          generateDepthBuffer: this._generateDepthBuffer,
          generateStencilBuffer: this._generateStencilBuffer,
          generateDepthTexture: h,
          types: g,
          formats: _,
          textureCount: c,
          targetTypes: S,
          faceIndex: I,
          layerIndex: M,
          layerCounts: P
        }, b = {
          width: this.width,
          height: this.height
        };
        l = this._engine.createMultipleRenderTarget(b, W);
        for (let O = 0; O < c; ++O) {
          if (S[O] !== -1)
            continue;
          const y = N[f[O].uniqueId];
          l.setTexture(l.textures[y], O);
        }
      }
    } else {
      const f = {};
      if (f.generateDepthBuffer = this._generateDepthBuffer, f.generateMipMaps = (s = (i = this.texture) === null || i === void 0 ? void 0 : i.generateMipMaps) !== null && s !== void 0 ? s : !1, f.generateStencilBuffer = this._generateStencilBuffer, f.samplingMode = (r = this.texture) === null || r === void 0 ? void 0 : r.samplingMode, f.type = (n = this.texture) === null || n === void 0 ? void 0 : n.type, f.format = (a = this.texture) === null || a === void 0 ? void 0 : a.format, this.isCube)
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
class Ii extends Ri {
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
    const l = this._framebuffer, f = this._engine._currentFramebuffer;
    if (this._engine._bindUnboundFramebuffer(l), this._engine.webGLVersion > 1) {
      const h = this._context, c = h["COLOR_ATTACHMENT" + t];
      e.is2DArray || e.is3D ? (i = (n = i ?? ((r = this.layerIndices) === null || r === void 0 ? void 0 : r[t])) !== null && n !== void 0 ? n : 0, h.framebufferTextureLayer(h.FRAMEBUFFER, c, e._hardwareTexture.underlyingResource, s, i)) : e.isCube ? (i = (o = i ?? ((a = this.faceIndices) === null || a === void 0 ? void 0 : a[t])) !== null && o !== void 0 ? o : 0, h.framebufferTexture2D(h.FRAMEBUFFER, c, h.TEXTURE_CUBE_MAP_POSITIVE_X + i, e._hardwareTexture.underlyingResource, s)) : h.framebufferTexture2D(h.FRAMEBUFFER, c, h.TEXTURE_2D, e._hardwareTexture.underlyingResource, s);
    } else {
      const h = this._context, c = h["COLOR_ATTACHMENT" + t + "_WEBGL"], p = i !== void 0 ? h.TEXTURE_CUBE_MAP_POSITIVE_X + i : h.TEXTURE_2D;
      h.framebufferTexture2D(h.FRAMEBUFFER, c, p, e._hardwareTexture.underlyingResource, s);
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
Ue.prototype._createHardwareRenderTargetWrapper = function(d, e, t) {
  const i = new Ii(d, e, t, this, this._gl);
  return this._renderTargetWrapperCache.push(i), i;
};
Ue.prototype.createRenderTargetTexture = function(d, e) {
  var t, i;
  const s = this._createHardwareRenderTargetWrapper(!1, !1, d);
  let r = !0, n = !1, a = !1, o, l = 1;
  e !== void 0 && typeof e == "object" && (r = (t = e.generateDepthBuffer) !== null && t !== void 0 ? t : !0, n = !!e.generateStencilBuffer, a = !!e.noColorAttachment, o = e.colorAttachment, l = (i = e.samples) !== null && i !== void 0 ? i : 1);
  const f = o || (a ? null : this._createInternalTexture(d, e, !0, Qe.RenderTarget)), h = d.width || d, c = d.height || d, p = this._currentFramebuffer, E = this._gl, g = E.createFramebuffer();
  return this._bindUnboundFramebuffer(g), s._depthStencilBuffer = this._setupFramebufferDepthAttachments(n, r, h, c), f && !f.is2DArray && E.framebufferTexture2D(E.FRAMEBUFFER, E.COLOR_ATTACHMENT0, E.TEXTURE_2D, f._hardwareTexture.underlyingResource, 0), this._bindUnboundFramebuffer(p), s._framebuffer = g, s._generateDepthBuffer = r, s._generateStencilBuffer = n, s.setTextures(f), this.updateRenderTargetTextureSampleCount(s, l), s;
};
Ue.prototype.createDepthStencilTexture = function(d, e, t) {
  if (e.isCube) {
    const i = d.width || d;
    return this._createDepthStencilCubeTexture(i, e, t);
  } else
    return this._createDepthStencilTexture(d, e, t);
};
Ue.prototype._createDepthStencilTexture = function(d, e, t) {
  const i = this._gl, s = d.layers || 0, r = s !== 0 ? i.TEXTURE_2D_ARRAY : i.TEXTURE_2D, n = new Zt(this, Qe.DepthStencil);
  if (!this._caps.depthTextureExtension)
    return ct.Error("Depth texture is not supported by your browser or hardware."), n;
  const a = {
    bilinearFiltering: !1,
    comparisonFunction: 0,
    generateStencil: !1,
    ...e
  };
  if (this._bindTextureDirectly(r, n, !0), this._setupDepthStencilTexture(n, d, a.generateStencil, a.comparisonFunction === 0 ? !1 : a.bilinearFiltering, a.comparisonFunction, a.samples), a.depthTextureFormat !== void 0) {
    if (a.depthTextureFormat !== 15 && a.depthTextureFormat !== 16 && a.depthTextureFormat !== 17 && a.depthTextureFormat !== 13 && a.depthTextureFormat !== 14 && a.depthTextureFormat !== 18)
      return ct.Error("Depth texture format is not supported."), n;
    n.format = a.depthTextureFormat;
  } else
    n.format = a.generateStencil ? 13 : 16;
  const o = n.format === 17 || n.format === 13 || n.format === 18;
  t._depthStencilTexture = n, t._depthStencilTextureWithStencil = o;
  let l = i.UNSIGNED_INT;
  n.format === 15 ? l = i.UNSIGNED_SHORT : n.format === 17 || n.format === 13 ? l = i.UNSIGNED_INT_24_8 : n.format === 14 ? l = i.FLOAT : n.format === 18 && (l = i.FLOAT_32_UNSIGNED_INT_24_8_REV);
  const f = o ? i.DEPTH_STENCIL : i.DEPTH_COMPONENT;
  let h = f;
  this.webGLVersion > 1 && (n.format === 15 ? h = i.DEPTH_COMPONENT16 : n.format === 16 ? h = i.DEPTH_COMPONENT24 : n.format === 17 || n.format === 13 ? h = i.DEPTH24_STENCIL8 : n.format === 14 ? h = i.DEPTH_COMPONENT32F : n.format === 18 && (h = i.DEPTH32F_STENCIL8)), n.is2DArray ? i.texImage3D(r, 0, h, n.width, n.height, s, 0, f, l, null) : i.texImage2D(r, 0, h, n.width, n.height, 0, f, l, null), this._bindTextureDirectly(r, null), this._internalTexturesCache.push(n);
  const c = t;
  if (c._depthStencilBuffer) {
    const p = this._currentFramebuffer;
    this._bindUnboundFramebuffer(c._framebuffer), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.RENDERBUFFER, null), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.DEPTH_ATTACHMENT, i.RENDERBUFFER, null), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.STENCIL_ATTACHMENT, i.RENDERBUFFER, null), this._bindUnboundFramebuffer(p), i.deleteRenderbuffer(c._depthStencilBuffer), c._depthStencilBuffer = null;
  }
  return n;
};
Ue.prototype.updateRenderTargetTextureSampleCount = function(d, e) {
  if (this.webGLVersion < 2 || !d || !d.texture)
    return 1;
  if (d.samples === e)
    return e;
  const t = this._gl;
  e = Math.min(e, this.getCaps().maxMSAASamples), d._depthStencilBuffer && (t.deleteRenderbuffer(d._depthStencilBuffer), d._depthStencilBuffer = null), d._MSAAFramebuffer && (t.deleteFramebuffer(d._MSAAFramebuffer), d._MSAAFramebuffer = null);
  const i = d.texture._hardwareTexture;
  if (i.releaseMSAARenderBuffers(), e > 1 && typeof t.renderbufferStorageMultisample == "function") {
    const s = t.createFramebuffer();
    if (!s)
      throw new Error("Unable to create multi sampled framebuffer");
    d._MSAAFramebuffer = s, this._bindUnboundFramebuffer(d._MSAAFramebuffer);
    const r = this._createRenderBuffer(d.texture.width, d.texture.height, e, -1, this._getRGBAMultiSampleBufferFormat(d.texture.type), t.COLOR_ATTACHMENT0, !1);
    if (!r)
      throw new Error("Unable to create multi sampled framebuffer");
    i.addMSAARenderBuffer(r);
  } else
    this._bindUnboundFramebuffer(d._framebuffer);
  return d.texture.samples = e, d._samples = e, d._depthStencilBuffer = this._setupFramebufferDepthAttachments(d._generateStencilBuffer, d._generateDepthBuffer, d.texture.width, d.texture.height, e), this._bindUnboundFramebuffer(null), e;
};
Ue.prototype.createRenderTargetCubeTexture = function(d, e) {
  const t = this._createHardwareRenderTargetWrapper(!1, !0, d), i = {
    generateMipMaps: !0,
    generateDepthBuffer: !0,
    generateStencilBuffer: !1,
    type: 0,
    samplingMode: 3,
    format: 5,
    ...e
  };
  i.generateStencilBuffer = i.generateDepthBuffer && i.generateStencilBuffer, (i.type === 1 && !this._caps.textureFloatLinearFiltering || i.type === 2 && !this._caps.textureHalfFloatLinearFiltering) && (i.samplingMode = 1);
  const s = this._gl, r = new Zt(this, Qe.RenderTarget);
  this._bindTextureDirectly(s.TEXTURE_CUBE_MAP, r, !0);
  const n = this._getSamplingParameters(i.samplingMode, i.generateMipMaps);
  i.type === 1 && !this._caps.textureFloat && (i.type = 0, ct.Warn("Float textures are not supported. Cube render target forced to TEXTURETYPE_UNESIGNED_BYTE type")), s.texParameteri(s.TEXTURE_CUBE_MAP, s.TEXTURE_MAG_FILTER, n.mag), s.texParameteri(s.TEXTURE_CUBE_MAP, s.TEXTURE_MIN_FILTER, n.min), s.texParameteri(s.TEXTURE_CUBE_MAP, s.TEXTURE_WRAP_S, s.CLAMP_TO_EDGE), s.texParameteri(s.TEXTURE_CUBE_MAP, s.TEXTURE_WRAP_T, s.CLAMP_TO_EDGE);
  for (let o = 0; o < 6; o++)
    s.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X + o, 0, this._getRGBABufferInternalSizedFormat(i.type, i.format), d, d, 0, this._getInternalFormat(i.format), this._getWebGLTextureType(i.type), null);
  const a = s.createFramebuffer();
  return this._bindUnboundFramebuffer(a), t._depthStencilBuffer = this._setupFramebufferDepthAttachments(i.generateStencilBuffer, i.generateDepthBuffer, d, d), i.generateMipMaps && s.generateMipmap(s.TEXTURE_CUBE_MAP), this._bindTextureDirectly(s.TEXTURE_CUBE_MAP, null), this._bindUnboundFramebuffer(null), t._framebuffer = a, t._generateDepthBuffer = i.generateDepthBuffer, t._generateStencilBuffer = i.generateStencilBuffer, r.width = d, r.height = d, r.isReady = !0, r.isCube = !0, r.samples = 1, r.generateMipMaps = i.generateMipMaps, r.samplingMode = i.samplingMode, r.type = i.type, r.format = i.format, this._internalTexturesCache.push(r), t.setTextures(r), t;
};
const bi = "postprocessVertexShader", Pi = `attribute vec2 position;
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
x.ShadersStore[bi] = Pi;
const Rt = {
  positions: [1, 1, -1, 1, -1, -1, 1, -1],
  indices: [0, 1, 2, 0, 2, 3]
};
class Di {
  /**
   * Creates an effect renderer
   * @param engine the engine to use for rendering
   * @param options defines the options of the effect renderer
   */
  constructor(e, t = Rt) {
    var i, s;
    this._fullscreenViewport = new ui(0, 0, 1, 1);
    const r = (i = t.positions) !== null && i !== void 0 ? i : Rt.positions, n = (s = t.indices) !== null && s !== void 0 ? s : Rt.indices;
    this.engine = e, this._vertexBuffers = {
      [L.PositionKind]: new L(e, r, L.PositionKind, !1, !1, 2)
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
    const e = this._vertexBuffers[L.PositionKind];
    e && (e.dispose(), delete this._vertexBuffers[L.PositionKind]), this._indexBuffer && this.engine._releaseBuffer(this._indexBuffer), this._onContextRestoredObserver && (this.engine.onContextRestoredObservable.remove(this._onContextRestoredObserver), this._onContextRestoredObserver = null);
  }
}
class Li {
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
    this.onApplyObservable = new z();
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
    this._drawWrapper = new gt(e.engine), e.useShaderStore ? (t.fragment = t.fragmentSource, t.vertex || (t.vertex = t.vertexSource), delete t.fragmentSource, delete t.vertexSource, this.effect = e.engine.createEffect(t, e.attributeNames || ["position"], i, e.samplerNames, s, void 0, e.onCompiled, void 0, void 0, e.shaderLanguage)) : (this.effect = new Te(t, e.attributeNames || ["position"], i, e.samplerNames, e.engine, s, void 0, e.onCompiled, void 0, void 0, void 0, e.shaderLanguage), this._onContextRestoredObserver = e.engine.onContextRestoredObservable.add(() => {
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
const ei = "passPixelShader", ti = `varying vec2 vUV;
uniform sampler2D textureSampler;
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) 
{
gl_FragColor=texture2D(textureSampler,vUV);
}`;
x.ShadersStore[ei] = ti;
const zt = { name: ei, shader: ti };
class ee {
  static _CreateDumpRenderer() {
    if (!ee._DumpToolsEngine) {
      const e = document.createElement("canvas"), t = new Ue(e, !1, {
        preserveDrawingBuffer: !0,
        depth: !1,
        stencil: !1,
        alpha: !0,
        premultipliedAlpha: !1,
        antialias: !1,
        failIfMajorPerformanceCaveat: !1
      });
      t.getCaps().parallelShaderCompile = void 0;
      const i = new Di(t), s = new Li({
        engine: t,
        name: zt.name,
        fragmentShader: zt.shader,
        samplerNames: ["textureSampler"]
      });
      ee._DumpToolsEngine = {
        canvas: e,
        engine: t,
        renderer: i,
        wrapper: s
      };
    }
    return ee._DumpToolsEngine;
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
    ee.DumpData(e, t, o, s, r, n, !0);
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
      ee.DumpData(e, t, i, (f) => l(f), s, r, n, a, o);
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
    const f = ee._CreateDumpRenderer();
    if (f.engine.setSize(e, t, !0), i instanceof Float32Array) {
      const c = new Uint8Array(i.length);
      let p = i.length;
      for (; p--; ) {
        const E = i[p];
        c[p] = E < 0 ? 0 : E > 1 ? 1 : Math.round(E * 255);
      }
      i = c;
    }
    const h = f.engine.createRawTexture(i, e, t, 5, !1, !a, 1);
    f.renderer.setViewport(), f.renderer.applyEffectWrapper(f.wrapper), f.wrapper.effect._bindTexture("textureSampler", h), f.renderer.draw(), o ? Ge.ToBlob(f.canvas, (c) => {
      const p = new FileReader();
      p.onload = (E) => {
        const g = E.target.result;
        s && s(g);
      }, p.readAsArrayBuffer(c);
    }, r, l) : Ge.EncodeScreenshotCanvasData(f.canvas, s, r, n, l), h.dispose();
  }
  /**
   * Dispose the dump tools associated resources
   */
  static Dispose() {
    ee._DumpToolsEngine && (ee._DumpToolsEngine.wrapper.dispose(), ee._DumpToolsEngine.renderer.dispose(), ee._DumpToolsEngine.engine.dispose()), ee._DumpToolsEngine = null;
  }
}
const wi = () => {
  Ge.DumpData = ee.DumpData, Ge.DumpDataAsync = ee.DumpDataAsync, Ge.DumpFramebuffer = ee.DumpFramebuffer;
};
wi();
class te extends m {
  /**
   * Use this list to define the list of mesh you want to render.
   */
  get renderList() {
    return this._renderList;
  }
  set renderList(e) {
    this._unObserveRenderList && (this._unObserveRenderList(), this._unObserveRenderList = null), e && (this._unObserveRenderList = pi(e, this._renderListHasChanged)), this._renderList = e;
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
  constructor(e, t, i, s = !1, r = !0, n = 0, a = !1, o = m.TRILINEAR_SAMPLINGMODE, l = !0, f = !1, h = !1, c = 5, p = !1, E, g, _ = !1, S = !1) {
    var I, M, P, N, W, b;
    let O;
    if (typeof s == "object") {
      const U = s;
      s = !!U.generateMipMaps, r = (I = U.doNotChangeAspectRatio) !== null && I !== void 0 ? I : !0, n = (M = U.type) !== null && M !== void 0 ? M : 0, a = !!U.isCube, o = (P = U.samplingMode) !== null && P !== void 0 ? P : m.TRILINEAR_SAMPLINGMODE, l = (N = U.generateDepthBuffer) !== null && N !== void 0 ? N : !0, f = !!U.generateStencilBuffer, h = !!U.isMulti, c = (W = U.format) !== null && W !== void 0 ? W : 5, p = !!U.delayAllocation, E = U.samples, g = U.creationFlags, _ = !!U.noColorAttachment, S = !!U.useSRGBBuffer, O = U.colorAttachment;
    }
    if (super(null, i, !s, void 0, o, void 0, void 0, void 0, void 0, c), this._unObserveRenderList = null, this._renderListHasChanged = (U, Se) => {
      var H;
      const re = this._renderList ? this._renderList.length : 0;
      (Se === 0 && re > 0 || re === 0) && ((H = this.getScene()) === null || H === void 0 || H.meshes.forEach((de) => {
        de._markSubMeshesAsLightDirty();
      }));
    }, this.renderParticles = !0, this.renderSprites = !1, this.forceLayerMaskCheck = !1, this.ignoreCameraViewport = !1, this.onBeforeBindObservable = new z(), this.onAfterUnbindObservable = new z(), this.onBeforeRenderObservable = new z(), this.onAfterRenderObservable = new z(), this.onClearObservable = new z(), this.onResizeObservable = new z(), this._cleared = !1, this.skipInitialClear = !1, this._currentRefreshId = -1, this._refreshRate = 1, this._samples = 1, this._canRescale = !0, this._renderTarget = null, this.boundingBoxPosition = R.Zero(), i = this.getScene(), !i)
      return;
    const y = this.getScene().getEngine();
    this._coordinatesMode = m.PROJECTION_MODE, this.renderList = new Array(), this.name = e, this.isRenderTarget = !0, this._initialSizeParameter = t, this._renderPassIds = [], this._isCubeData = a, this._processSizeParameter(t), this.renderPassId = this._renderPassIds[0], this._resizeObserver = y.onResizeObservable.add(() => {
    }), this._generateMipMaps = !!s, this._doNotChangeAspectRatio = r, this._renderingManager = new Ft(i), this._renderingManager._useSceneAutoClearSetup = !0, !h && (this._renderTargetOptions = {
      generateMipMaps: s,
      type: n,
      format: (b = this._format) !== null && b !== void 0 ? b : void 0,
      samplingMode: this.samplingMode,
      generateDepthBuffer: l,
      generateStencilBuffer: f,
      samples: E,
      creationFlags: g,
      noColorAttachment: _,
      useSRGBBuffer: S,
      colorAttachment: O,
      label: this.name
    }, this.samplingMode === m.NEAREST_SAMPLINGMODE && (this.wrapU = m.CLAMP_ADDRESSMODE, this.wrapV = m.CLAMP_ADDRESSMODE), p || (a ? (this._renderTarget = i.getEngine().createRenderTargetCubeTexture(this.getRenderSize(), this._renderTargetOptions), this.coordinatesMode = m.INVCUBIC_MODE, this._textureMatrix = F.Identity()) : this._renderTarget = i.getEngine().createRenderTargetTexture(this._size, this._renderTargetOptions), this._texture = this._renderTarget.texture, E !== void 0 && (this.samples = E)));
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
      this._postProcessManager = new jt(t), this._postProcesses = new Array();
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
        const c = this._waitingRenderList[h], p = r.getMeshById(c);
        p && this.renderList.push(p);
      }
      this._waitingRenderList = void 0;
    }
    if (this.renderListPredicate) {
      this.renderList ? this.renderList.length = 0 : this.renderList = [];
      const h = this.getScene();
      if (!h)
        return i;
      const c = h.meshes;
      for (let p = 0; p < c.length; p++) {
        const E = c[p];
        this.renderListPredicate(E) && this.renderList.push(E);
      }
    }
    const a = n.currentRenderPassId;
    this.onBeforeBindObservable.notifyObservers(this);
    const o = (s = this.activeCamera) !== null && s !== void 0 ? s : r.activeCamera, l = r.activeCamera;
    o && (o !== r.activeCamera && (r.setTransformMatrix(o.getViewMatrix(), o.getProjectionMatrix(!0)), r.activeCamera = o), n.setViewport(o.viewport, this.getRenderWidth(), this.getRenderHeight())), this._defaultRenderListPrepared = !1;
    let f = i;
    if (i) {
      r.getViewMatrix() || r.updateTransformMatrix();
      const h = this.is2DArray ? this.getRenderLayers() : this.isCube ? 6 : 1;
      for (let c = 0; c < h && f; c++) {
        let p = null;
        const E = this.renderList ? this.renderList : r.getActiveMeshes().data, g = this.renderList ? this.renderList.length : r.getActiveMeshes().length;
        n.currentRenderPassId = this._renderPassIds[c], this.onBeforeRenderObservable.notifyObservers(c), this.getCustomRenderList && (p = this.getCustomRenderList(c, E, g)), p || (p = E), this._doNotChangeAspectRatio || r.updateTransformMatrix(!0);
        for (let _ = 0; _ < p.length && f; ++_) {
          const S = p[_];
          if (!(!S.isEnabled() || S.isBlocked || !S.isVisible || !S.subMeshes)) {
            if (this.customIsReadyFunction) {
              if (!this.customIsReadyFunction(S, this.refreshRate, i)) {
                f = !1;
                continue;
              }
            } else if (!S.isReady(!0)) {
              f = !1;
              continue;
            }
          }
        }
        this.onAfterRenderObservable.notifyObservers(c), (this.is2DArray || this.isCube) && (r.incrementRenderId(), r.resetCachedMaterial());
      }
    } else if (this.is2DArray && !this.isMulti)
      for (let h = 0; h < this.getRenderLayers(); h++)
        this._renderToTarget(0, e, t, h, o), r.incrementRenderId(), r.resetCachedMaterial();
    else if (this.isCube && !this.isMulti)
      for (let h = 0; h < 6; h++)
        this._renderToTarget(h, e, t, void 0, o), r.incrementRenderId(), r.resetCachedMaterial();
    else
      this._renderToTarget(0, e, t, void 0, o);
    return this.onAfterUnbindObservable.notifyObservers(this), n.currentRenderPassId = a, l && (r.activeCamera = l, (r.getEngine().scenes.length > 1 || this.activeCamera && this.activeCamera !== r.activeCamera) && r.setTransformMatrix(r.activeCamera.getViewMatrix(), r.activeCamera.getProjectionMatrix(!0)), n.setViewport(r.activeCamera.viewport)), r.resetCachedMaterial(), f;
  }
  _bestReflectionRenderTargetDimension(e, t) {
    const s = e * t, r = V.NearestPOT(s + 128 * 128 / (128 + s));
    return Math.min(V.FloorPOT(e), r);
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
        let f;
        if (s && i ? f = (o.layerMask & i.layerMask) === 0 : f = !1, o.isEnabled() && o.isVisible && o.subMeshes && !f && (l !== o && l._activate(n, !0), o._activate(n, !0) && o.subMeshes.length)) {
          o.isAnInstance ? o._internalAbstractMeshDataInfo._actAsRegularMesh && (l = o) : l._internalAbstractMeshDataInfo._onlyForInstancesIntermediate = !1, l._internalAbstractMeshDataInfo._isActiveIntermediate = !0;
          for (let h = 0; h < l.subMeshes.length; h++) {
            const c = l.subMeshes[h];
            this._renderingManager.dispatch(c, l);
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
    var n, a, o, l, f, h;
    const c = this.getScene();
    if (!c)
      return;
    const p = c.getEngine();
    if ((n = p._debugPushGroup) === null || n === void 0 || n.call(p, `render to face #${e} layer #${s}`, 1), this._prepareFrame(c, e, s, t), this.is2DArray ? (p.currentRenderPassId = this._renderPassIds[s], this.onBeforeRenderObservable.notifyObservers(s)) : (p.currentRenderPassId = this._renderPassIds[e], this.onBeforeRenderObservable.notifyObservers(e)), p.snapshotRendering && p.snapshotRenderingMode === 1)
      this.onClearObservable.hasObservers() ? this.onClearObservable.notifyObservers(p) : this.skipInitialClear || p.clear(this.clearColor || c.clearColor, !0, !0, !0);
    else {
      let g = null;
      const _ = this.renderList ? this.renderList : c.getActiveMeshes().data, S = this.renderList ? this.renderList.length : c.getActiveMeshes().length;
      this.getCustomRenderList && (g = this.getCustomRenderList(this.is2DArray ? s : e, _, S)), g ? this._prepareRenderingManager(g, g.length, r, this.forceLayerMaskCheck) : (this._defaultRenderListPrepared || (this._prepareRenderingManager(_, S, r, !this.renderList || this.forceLayerMaskCheck), this._defaultRenderListPrepared = !0), g = _);
      for (const M of c._beforeRenderTargetClearStage)
        M.action(this, e, s);
      this.onClearObservable.hasObservers() ? this.onClearObservable.notifyObservers(p) : this.skipInitialClear || p.clear(this.clearColor || c.clearColor, !0, !0, !0), this._doNotChangeAspectRatio || c.updateTransformMatrix(!0);
      for (const M of c._beforeRenderTargetDrawStage)
        M.action(this, e, s);
      this._renderingManager.render(this.customRenderFunction, g, this.renderParticles, this.renderSprites);
      for (const M of c._afterRenderTargetDrawStage)
        M.action(this, e, s);
      const I = (o = (a = this._texture) === null || a === void 0 ? void 0 : a.generateMipMaps) !== null && o !== void 0 ? o : !1;
      this._texture && (this._texture.generateMipMaps = !1), this._postProcessManager ? this._postProcessManager._finalizeFrame(!1, (l = this._renderTarget) !== null && l !== void 0 ? l : void 0, e, this._postProcesses, this.ignoreCameraViewport) : t && c.postProcessManager._finalizeFrame(!1, (f = this._renderTarget) !== null && f !== void 0 ? f : void 0, e);
      for (const M of c._afterRenderTargetPostProcessStage)
        M.action(this, e, s);
      this._texture && (this._texture.generateMipMaps = I), this._doNotChangeAspectRatio || c.updateTransformMatrix(!0), i && ee.DumpFramebuffer(this.getRenderWidth(), this.getRenderHeight(), p);
    }
    this._unbindFrameBuffer(p, e), this._texture && this.isCube && e === 5 && p.generateMipMapsForCubemap(this._texture), (h = p._debugPopGroup) === null || h === void 0 || h.call(p, 1);
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
    const e = this.getSize(), t = new te(this.name, e, this.getScene(), this._renderTargetOptions.generateMipMaps, this._doNotChangeAspectRatio, this._renderTargetOptions.type, this.isCube, this._renderTargetOptions.samplingMode, this._renderTargetOptions.generateDepthBuffer, this._renderTargetOptions.generateStencilBuffer, void 0, this._renderTargetOptions.format, void 0, this._renderTargetOptions.samples);
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
    this.refreshRate === te.REFRESHRATE_RENDER_ONCE && (this.refreshRate = te.REFRESHRATE_RENDER_ONCE), this._postProcessManager && this._postProcessManager._rebuild();
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
te.REFRESHRATE_RENDER_ONCE = 0;
te.REFRESHRATE_RENDER_ONEVERYFRAME = 1;
te.REFRESHRATE_RENDER_ONEVERYTWOFRAMES = 2;
m._CreateRenderTargetTexture = (d, e, t, i, s) => new te(d, e, t, i);
class X {
  /**
   * Registers a shader code processing with a post process name.
   * @param postProcessName name of the post process. Use null for the fallback shader code processing. This is the shader code processing that will be used in case no specific shader code processing has been associated to a post process name
   * @param customShaderCodeProcessing shader code processing to associate to the post process name
   * @returns
   */
  static RegisterShaderCodeProcessing(e, t) {
    if (!t) {
      delete X._CustomShaderCodeProcessing[e ?? ""];
      return;
    }
    X._CustomShaderCodeProcessing[e ?? ""] = t;
  }
  static _GetShaderCodeProcessing(e) {
    var t;
    return (t = X._CustomShaderCodeProcessing[e]) !== null && t !== void 0 ? t : X._CustomShaderCodeProcessing[""];
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
  constructor(e, t, i, s, r, n, a = 1, o, l, f = null, h = 0, c = "postprocess", p, E = !1, g = 5, _ = _i.GLSL) {
    this._parentContainer = null, this.width = -1, this.height = -1, this.nodeMaterialSource = null, this._outputTexture = null, this.autoClear = !0, this.forceAutoClearInAlphaMode = !1, this.alphaMode = 0, this.animations = new Array(), this.enablePixelPerfectMode = !1, this.forceFullscreenViewport = !0, this.scaleMode = 1, this.alwaysForcePOT = !1, this._samples = 1, this.adaptScaleToCurrentViewport = !1, this._reusable = !1, this._renderId = 0, this.externalTextureSamplerBinding = !1, this._textures = new Ot(2), this._textureCache = [], this._currentRenderTextureInd = 0, this._scaleRatio = new Ae(1, 1), this._texelSize = Ae.Zero(), this.onActivateObservable = new z(), this.onSizeChangedObservable = new z(), this.onApplyObservable = new z(), this.onBeforeRenderObservable = new z(), this.onAfterRenderObservable = new z(), this.name = e, n != null ? (this._camera = n, this._scene = n.getScene(), n.attachPostProcess(this), this._engine = this._scene.getEngine(), this._scene.postProcesses.push(this), this.uniqueId = this._scene.getUniqueId()) : o && (this._engine = o, this._engine.postProcesses.push(this)), this._options = r, this.renderTargetSamplingMode = a || 1, this._reusable = l || !1, this._textureType = h, this._textureFormat = g, this._shaderLanguage = _, this._samplers = s || [], this._samplers.push("textureSampler"), this._fragmentUrl = t, this._vertexUrl = c, this._parameters = i || [], this._parameters.push("scale"), this._indexParameters = p, this._drawWrapper = new gt(this._engine), E || this.updateEffect(f);
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
    this._textures.length == 0 && (this._textures = new Ot(2)), this._shareOutputWithPostProcess = null;
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
    var l, f;
    const h = X._GetShaderCodeProcessing(this.name);
    if (h != null && h.defineCustomBindings) {
      const c = (l = t == null ? void 0 : t.slice()) !== null && l !== void 0 ? l : [];
      c.push(...this._parameters);
      const p = (f = i == null ? void 0 : i.slice()) !== null && f !== void 0 ? f : [];
      p.push(...this._samplers), e = h.defineCustomBindings(this.name, e, c, p), t = c, i = p;
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
      processCodeAfterIncludes: h != null && h.processCodeAfterIncludes ? (c, p) => h.processCodeAfterIncludes(this.name, c, p) : null,
      processFinalCode: h != null && h.processFinalCode ? (c, p) => h.processFinalCode(this.name, c, p) : null,
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
    const f = (t ? t.height : this._engine.getRenderHeight(!0)) * this._options | 0, h = e.parent;
    h && (h.leftCamera == e || h.rightCamera == e) && (l /= 2);
    let c = this._options.width || l, p = this._options.height || f;
    const E = this.renderTargetSamplingMode !== 7 && this.renderTargetSamplingMode !== 1 && this.renderTargetSamplingMode !== 2;
    if (!this._shareOutputWithPostProcess && !this._forcedOutputTexture) {
      if (this.adaptScaleToCurrentViewport) {
        const _ = a.currentViewport;
        _ && (c *= _.width, p *= _.height);
      }
      (E || this.alwaysForcePOT) && (this._options.width || (c = a.needPOTTextures ? V.GetExponentOfTwo(c, o, this.scaleMode) : c), this._options.height || (p = a.needPOTTextures ? V.GetExponentOfTwo(p, o, this.scaleMode) : p)), (this.width !== c || this.height !== p) && this._resize(c, p, e, E, i), this._textures.forEach((_) => {
        _.samples !== this.samples && this._engine.updateRenderTargetTextureSampleCount(_, this.samples);
      }), this._flushTextureCache(), this._renderId++;
    }
    let g;
    if (this._shareOutputWithPostProcess)
      g = this._shareOutputWithPostProcess.inputTexture;
    else if (this._forcedOutputTexture)
      g = this._forcedOutputTexture, this.width = this._forcedOutputTexture.width, this.height = this._forcedOutputTexture.height;
    else {
      g = this.inputTexture;
      let _;
      for (let S = 0; S < this._textureCache.length; S++)
        if (this._textureCache[S].texture === g) {
          _ = this._textureCache[S];
          break;
        }
      _ && (_.lastUsedRenderId = this._renderId);
    }
    return this.enablePixelPerfectMode ? (this._scaleRatio.copyFromFloats(l / c, f / p), this._engine.bindFramebuffer(g, 0, l, f, this.forceFullscreenViewport)) : (this._scaleRatio.copyFromFloats(1, 1), this._engine.bindFramebuffer(g, 0, void 0, void 0, this.forceFullscreenViewport)), (r = (s = this._engine)._debugInsertMarker) === null || r === void 0 || r.call(s, `post process ${this.name} input`), this.onActivateObservable.notifyObservers(e), this.autoClear && (this.alphaMode === 0 || this.forceAutoClearInAlphaMode) && this._engine.clear(this.clearColor ? this.clearColor : n.clearColor, n._allowPostProcessClearColor, !0, !0), this._reusable && (this._currentRenderTextureInd = (this._currentRenderTextureInd + 1) % 2), g;
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
    return this._shareOutputWithPostProcess ? s = this._shareOutputWithPostProcess.inputTexture : this._forcedOutputTexture ? s = this._forcedOutputTexture : s = this.inputTexture, this.externalTextureSamplerBinding || this._drawWrapper.effect._bindTexture("textureSampler", s == null ? void 0 : s.texture), this._drawWrapper.effect.setVector2("scale", this._scaleRatio), this.onApplyObservable.notifyObservers(this._drawWrapper.effect), (i = (t = X._GetShaderCodeProcessing(this.name)) === null || t === void 0 ? void 0 : t.bindCustomBindings) === null || i === void 0 || i.call(t, this.name, this._drawWrapper.effect), this._drawWrapper.effect;
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
    const e = q.Serialize(this), t = this.getCamera() || this._scene && this._scene.activeCamera;
    return e.customType = "BABYLON." + this.getClassName(), e.cameraId = t ? t.id : null, e.reusable = this._reusable, e.textureType = this._textureType, e.fragmentUrl = this._fragmentUrl, e.parameters = this._parameters, e.samplers = this._samplers, e.options = this._options, e.defines = this._postProcessDefines, e.textureFormat = this._textureFormat, e.vertexUrl = this._vertexUrl, e.indexParameters = this._indexParameters, e;
  }
  /**
   * Clones this post process
   * @returns a new post process similar to this one
   */
  clone() {
    const e = this.serialize();
    e._engine = this._engine, e.cameraId = null;
    const t = X.Parse(e, this._scene, "");
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
    const s = $t(e.customType);
    if (!s || !s._Parse)
      return null;
    const r = t ? t.getCameraById(e.cameraId) : null;
    return s._Parse(e, r, t, i);
  }
  /**
   * @internal
   */
  static _Parse(e, t, i, s) {
    return q.Parse(() => new X(e.name, e.fragmentUrl, e.parameters, e.samplers, e.options, t, e.renderTargetSamplingMode, e._engine, e.reusable, e.defines, e.textureType, e.vertexUrl, e.indexParameters, !1, e.textureFormat), e, i, s);
  }
}
X._CustomShaderCodeProcessing = {};
u([
  T()
], X.prototype, "uniqueId", void 0);
u([
  T()
], X.prototype, "name", void 0);
u([
  T()
], X.prototype, "width", void 0);
u([
  T()
], X.prototype, "height", void 0);
u([
  T()
], X.prototype, "renderTargetSamplingMode", void 0);
u([
  Kt()
], X.prototype, "clearColor", void 0);
u([
  T()
], X.prototype, "autoClear", void 0);
u([
  T()
], X.prototype, "forceAutoClearInAlphaMode", void 0);
u([
  T()
], X.prototype, "alphaMode", void 0);
u([
  T()
], X.prototype, "alphaConstants", void 0);
u([
  T()
], X.prototype, "enablePixelPerfectMode", void 0);
u([
  T()
], X.prototype, "forceFullscreenViewport", void 0);
u([
  T()
], X.prototype, "scaleMode", void 0);
u([
  T()
], X.prototype, "alwaysForcePOT", void 0);
u([
  T("samples")
], X.prototype, "_samples", void 0);
u([
  T()
], X.prototype, "adaptScaleToCurrentViewport", void 0);
ye("BABYLON.PostProcess", X);
const Fi = "kernelBlurVaryingDeclaration", Oi = "varying vec2 sampleCoord{X};";
x.IncludesShadersStore[Fi] = Oi;
const Ni = "packingFunctions", yi = `vec4 pack(float depth)
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
x.IncludesShadersStore[Ni] = yi;
const Ui = "kernelBlurFragment", Bi = `#ifdef DOF
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
x.IncludesShadersStore[Ui] = Bi;
const Vi = "kernelBlurFragment2", Xi = `#ifdef DOF
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
x.IncludesShadersStore[Vi] = Xi;
const zi = "kernelBlurPixelShader", Wi = `uniform sampler2D textureSampler;
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
x.ShadersStore[zi] = Wi;
const ki = "kernelBlurVertex", Hi = "sampleCoord{X}=sampleCenter+delta*KERNEL_OFFSET{X};";
x.IncludesShadersStore[ki] = Hi;
const Gi = "kernelBlurVertexShader", Yi = `attribute vec2 position;
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
x.ShadersStore[Gi] = Yi;
class he extends X {
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
  constructor(e, t, i, s, r, n = m.BILINEAR_SAMPLINGMODE, a, o, l = 0, f = "", h = !1, c = 5) {
    super(e, "kernelBlur", ["delta", "direction"], ["circleOfConfusionSampler"], s, r, n, a, o, null, l, "kernelBlur", { varyingCount: 0, depCount: 0 }, !0, c), this._blockCompilation = h, this._packedFloat = !1, this._staticDefines = "", this._staticDefines = f, this.direction = t, this.onApplyObservable.add((p) => {
      this._outputTexture ? p.setFloat2("delta", 1 / this._outputTexture.width * this.direction.x, 1 / this._outputTexture.height * this.direction.y) : p.setFloat2("delta", 1 / this.width * this.direction.x, 1 / this.height * this.direction.y);
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
      const S = _ / (i - 1), I = this._gaussianWeight(S * 2 - 1);
      r[_] = _ - s, n[_] = I, a += I;
    }
    for (let _ = 0; _ < n.length; _++)
      n[_] /= a;
    const o = [], l = [], f = [];
    for (let _ = 0; _ <= s; _ += 2) {
      const S = Math.min(_ + 1, Math.floor(s));
      if (_ === S)
        f.push({ o: r[_], w: n[_] });
      else {
        const M = S === s, P = n[_] + n[S] * (M ? 0.5 : 1), N = r[_] + 1 / (1 + n[_] / n[S]);
        N === 0 ? (f.push({ o: r[_], w: n[_] }), f.push({ o: r[_ + 1], w: n[_ + 1] })) : (f.push({ o: N, w: P }), f.push({ o: -N, w: P }));
      }
    }
    for (let _ = 0; _ < f.length; _++)
      l[_] = f[_].o, o[_] = f[_].w;
    r = l, n = o;
    const h = this.getEngine().getCaps().maxVaryingVectors, c = Math.max(h, 0) - 1;
    let p = Math.min(r.length, c), E = "";
    E += this._staticDefines, this._staticDefines.indexOf("DOF") != -1 && (E += `#define CENTER_WEIGHT ${this._glslFloat(n[p - 1])}\r
`, p--);
    for (let _ = 0; _ < p; _++)
      E += `#define KERNEL_OFFSET${_} ${this._glslFloat(r[_])}\r
`, E += `#define KERNEL_WEIGHT${_} ${this._glslFloat(n[_])}\r
`;
    let g = 0;
    for (let _ = c; _ < r.length; _++)
      E += `#define KERNEL_DEP_OFFSET${g} ${this._glslFloat(r[_])}\r
`, E += `#define KERNEL_DEP_WEIGHT${g} ${this._glslFloat(n[_])}\r
`, g++;
    this.packedFloat && (E += "#define PACKEDFLOAT 1"), this._blockCompilation = !1, super.updateEffect(E, null, null, {
      varyingCount: p,
      depCount: g
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
    return q.Parse(() => new he(e.name, e.direction, e.kernel, e.options, t, e.renderTargetSamplingMode, i.getEngine(), e.reusable, e.textureType, void 0, !1), e, i, s);
  }
}
u([
  T("kernel")
], he.prototype, "_kernel", void 0);
u([
  T("packedFloat")
], he.prototype, "_packedFloat", void 0);
u([
  mi()
], he.prototype, "direction", void 0);
ye("BABYLON.BlurPostProcess", he);
const $i = "helperFunctions", Zi = `const float PI=3.1415926535897932384626433832795;
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
x.IncludesShadersStore[$i] = Zi;
const ji = "clipPlaneFragmentDeclaration", Ki = `#ifdef CLIPPLANE
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
x.IncludesShadersStore[ji] = Ki;
const Qi = "clipPlaneFragment", qi = `#if defined(CLIPPLANE) || defined(CLIPPLANE2) || defined(CLIPPLANE3) || defined(CLIPPLANE4) || defined(CLIPPLANE5) || defined(CLIPPLANE6)
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
x.IncludesShadersStore[Qi] = qi;
const Ji = "glowMapGenerationPixelShader", er = `#if defined(DIFFUSE_ISLINEAR) || defined(EMISSIVE_ISLINEAR)
#include<helperFunctions>
#endif
#ifdef DIFFUSE
varying vec2 vUVDiffuse;
uniform sampler2D diffuseSampler;
#endif
#ifdef OPACITY
varying vec2 vUVOpacity;
uniform sampler2D opacitySampler;
uniform float opacityIntensity;
#endif
#ifdef EMISSIVE
varying vec2 vUVEmissive;
uniform sampler2D emissiveSampler;
#endif
#ifdef VERTEXALPHA
varying vec4 vColor;
#endif
uniform vec4 glowColor;
#include<clipPlaneFragmentDeclaration>
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void)
{
#include<clipPlaneFragment>
vec4 finalColor=glowColor;
#ifdef DIFFUSE
vec4 albedoTexture=texture2D(diffuseSampler,vUVDiffuse);
#ifdef DIFFUSE_ISLINEAR
albedoTexture=toGammaSpace(albedoTexture);
#endif
#ifdef GLOW
finalColor.a*=albedoTexture.a;
#endif
#ifdef HIGHLIGHT
finalColor.a=albedoTexture.a;
#endif
#endif
#ifdef OPACITY
vec4 opacityMap=texture2D(opacitySampler,vUVOpacity);
#ifdef OPACITYRGB
finalColor.a*=getLuminance(opacityMap.rgb);
#else
finalColor.a*=opacityMap.a;
#endif
finalColor.a*=opacityIntensity;
#endif
#ifdef VERTEXALPHA
finalColor.a*=vColor.a;
#endif
#ifdef ALPHATEST
if (finalColor.a<ALPHATESTVALUE)
discard;
#endif
#ifdef EMISSIVE
vec4 emissive=texture2D(emissiveSampler,vUVEmissive);
#ifdef EMISSIVE_ISLINEAR
emissive=toGammaSpace(emissive);
#endif
gl_FragColor=emissive*finalColor;
#else
gl_FragColor=finalColor;
#endif
#ifdef HIGHLIGHT
gl_FragColor.a=glowColor.a;
#endif
}`;
x.ShadersStore[Ji] = er;
const tr = "bonesDeclaration", ir = `#if NUM_BONE_INFLUENCERS>0
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
x.IncludesShadersStore[tr] = ir;
const rr = "bakedVertexAnimationDeclaration", sr = `#ifdef BAKED_VERTEX_ANIMATION_TEXTURE
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
x.IncludesShadersStore[rr] = sr;
const nr = "morphTargetsVertexGlobalDeclaration", ar = `#ifdef MORPHTARGETS
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
x.IncludesShadersStore[nr] = ar;
const or = "morphTargetsVertexDeclaration", lr = `#ifdef MORPHTARGETS
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
x.IncludesShadersStore[or] = lr;
const hr = "clipPlaneVertexDeclaration", fr = `#ifdef CLIPPLANE
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
x.IncludesShadersStore[hr] = fr;
const dr = "instancesDeclaration", cr = `#ifdef INSTANCES
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
x.IncludesShadersStore[dr] = cr;
const ur = "morphTargetsVertexGlobal", pr = `#ifdef MORPHTARGETS
#ifdef MORPHTARGETS_TEXTURE
float vertexID;
#endif
#endif
`;
x.IncludesShadersStore[ur] = pr;
const _r = "morphTargetsVertex", mr = `#ifdef MORPHTARGETS
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
x.IncludesShadersStore[_r] = mr;
const gr = "instancesVertex", vr = `#ifdef INSTANCES
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
x.IncludesShadersStore[gr] = vr;
const Er = "bonesVertex", Sr = `#ifndef BAKED_VERTEX_ANIMATION_TEXTURE
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
x.IncludesShadersStore[Er] = Sr;
const Tr = "bakedVertexAnimation", xr = `#ifdef BAKED_VERTEX_ANIMATION_TEXTURE
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
x.IncludesShadersStore[Tr] = xr;
const Mr = "clipPlaneVertex", Ar = `#ifdef CLIPPLANE
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
x.IncludesShadersStore[Mr] = Ar;
const Cr = "glowMapGenerationVertexShader", Rr = `attribute vec3 position;
#include<bonesDeclaration>
#include<bakedVertexAnimationDeclaration>
#include<morphTargetsVertexGlobalDeclaration>
#include<morphTargetsVertexDeclaration>[0..maxSimultaneousMorphTargets]
#include<clipPlaneVertexDeclaration>
#include<instancesDeclaration>
uniform mat4 viewProjection;
varying vec4 vPosition;
#ifdef UV1
attribute vec2 uv;
#endif
#ifdef UV2
attribute vec2 uv2;
#endif
#ifdef DIFFUSE
varying vec2 vUVDiffuse;
uniform mat4 diffuseMatrix;
#endif
#ifdef OPACITY
varying vec2 vUVOpacity;
uniform mat4 opacityMatrix;
#endif
#ifdef EMISSIVE
varying vec2 vUVEmissive;
uniform mat4 emissiveMatrix;
#endif
#ifdef VERTEXALPHA
attribute vec4 color;
varying vec4 vColor;
#endif
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
#ifdef CUBEMAP
vPosition=worldPos;
gl_Position=viewProjection*finalWorld*vec4(position,1.0);
#else
vPosition=viewProjection*worldPos;
gl_Position=vPosition;
#endif
#ifdef DIFFUSE
#ifdef DIFFUSEUV1
vUVDiffuse=vec2(diffuseMatrix*vec4(uvUpdated,1.0,0.0));
#endif
#ifdef DIFFUSEUV2
vUVDiffuse=vec2(diffuseMatrix*vec4(uv2,1.0,0.0));
#endif
#endif
#ifdef OPACITY
#ifdef OPACITYUV1
vUVOpacity=vec2(opacityMatrix*vec4(uvUpdated,1.0,0.0));
#endif
#ifdef OPACITYUV2
vUVOpacity=vec2(opacityMatrix*vec4(uv2,1.0,0.0));
#endif
#endif
#ifdef EMISSIVE
#ifdef EMISSIVEUV1
vUVEmissive=vec2(emissiveMatrix*vec4(uvUpdated,1.0,0.0));
#endif
#ifdef EMISSIVEUV2
vUVEmissive=vec2(emissiveMatrix*vec4(uv2,1.0,0.0));
#endif
#endif
#ifdef VERTEXALPHA
vColor=color;
#endif
#include<clipPlaneVertex>
}`;
x.ShadersStore[Cr] = Rr;
class Et {
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
            for (const n of r.subMeshes)
              if (n.effect === t) {
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
class fe {
  /**
   * Gets the camera attached to the layer.
   */
  get camera() {
    return this._effectLayerOptions.camera;
  }
  /**
   * Gets the rendering group id the layer should render in.
   */
  get renderingGroupId() {
    return this._effectLayerOptions.renderingGroupId;
  }
  set renderingGroupId(e) {
    this._effectLayerOptions.renderingGroupId = e;
  }
  /**
   * Gets the main texture where the effect is rendered
   */
  get mainTexture() {
    return this._mainTexture;
  }
  /**
   * Sets a specific material to be used to render a mesh/a list of meshes in the layer
   * @param mesh mesh or array of meshes
   * @param material material to use by the layer when rendering the mesh(es). If undefined is passed, the specific material created by the layer will be used.
   */
  setMaterialForRendering(e, t) {
    if (this._mainTexture.setMaterialForRendering(e, t), Array.isArray(e))
      for (let i = 0; i < e.length; ++i) {
        const s = e[i];
        t ? this._materialForRendering[s.uniqueId] = [s, t] : delete this._materialForRendering[s.uniqueId];
      }
    else
      t ? this._materialForRendering[e.uniqueId] = [e, t] : delete this._materialForRendering[e.uniqueId];
  }
  /**
   * Instantiates a new effect Layer and references it in the scene.
   * @param name The name of the layer
   * @param scene The scene to use the layer in
   */
  constructor(e, t) {
    this._vertexBuffers = {}, this._maxSize = 0, this._mainTextureDesiredSize = { width: 0, height: 0 }, this._shouldRender = !0, this._postProcesses = [], this._textures = [], this._emissiveTextureAndColor = { texture: null, color: new Ce() }, this.neutralColor = new Ce(), this.isEnabled = !0, this.disableBoundingBoxesFromEffectLayer = !1, this.onDisposeObservable = new z(), this.onBeforeRenderMainTextureObservable = new z(), this.onBeforeComposeObservable = new z(), this.onBeforeRenderMeshToEffect = new z(), this.onAfterRenderMeshToEffect = new z(), this.onAfterComposeObservable = new z(), this.onSizeChangedObservable = new z(), this._materialForRendering = {}, this.name = e, this._scene = t || st.LastCreatedScene, fe._SceneComponentInitialization(this._scene), this._engine = this._scene.getEngine(), this._maxSize = this._engine.getCaps().maxTextureSize, this._scene.effectLayers.push(this), this._mergeDrawWrapper = [], this._generateIndexBuffer(), this._generateVertexBuffer();
  }
  /**
   * Number of times _internalRender will be called. Some effect layers need to render the mesh several times, so they should override this method with the number of times the mesh should be rendered
   * @returns Number of times a mesh must be rendered in the layer
   */
  _numInternalDraws() {
    return 1;
  }
  /**
   * Initializes the effect layer with the required options.
   * @param options Sets of none mandatory options to use with the layer (see IEffectLayerOptions for more information)
   */
  _init(e) {
    this._effectLayerOptions = {
      mainTextureRatio: 0.5,
      alphaBlendingMode: 2,
      camera: null,
      renderingGroupId: -1,
      mainTextureType: 0,
      ...e
    }, this._setMainTextureSize(), this._createMainTexture(), this._createTextureAndPostProcesses();
  }
  /**
   * Generates the index buffer of the full screen quad blending to the main canvas.
   */
  _generateIndexBuffer() {
    const e = [];
    e.push(0), e.push(1), e.push(2), e.push(0), e.push(2), e.push(3), this._indexBuffer = this._engine.createIndexBuffer(e);
  }
  /**
   * Generates the vertex buffer of the full screen quad blending to the main canvas.
   */
  _generateVertexBuffer() {
    const e = [];
    e.push(1, 1), e.push(-1, 1), e.push(-1, -1), e.push(1, -1);
    const t = new L(this._engine, e, L.PositionKind, !1, !1, 2);
    this._vertexBuffers[L.PositionKind] = t;
  }
  /**
   * Sets the main texture desired size which is the closest power of two
   * of the engine canvas size.
   */
  _setMainTextureSize() {
    this._effectLayerOptions.mainTextureFixedSize ? (this._mainTextureDesiredSize.width = this._effectLayerOptions.mainTextureFixedSize, this._mainTextureDesiredSize.height = this._effectLayerOptions.mainTextureFixedSize) : (this._mainTextureDesiredSize.width = this._engine.getRenderWidth() * this._effectLayerOptions.mainTextureRatio, this._mainTextureDesiredSize.height = this._engine.getRenderHeight() * this._effectLayerOptions.mainTextureRatio, this._mainTextureDesiredSize.width = this._engine.needPOTTextures ? V.GetExponentOfTwo(this._mainTextureDesiredSize.width, this._maxSize) : this._mainTextureDesiredSize.width, this._mainTextureDesiredSize.height = this._engine.needPOTTextures ? V.GetExponentOfTwo(this._mainTextureDesiredSize.height, this._maxSize) : this._mainTextureDesiredSize.height), this._mainTextureDesiredSize.width = Math.floor(this._mainTextureDesiredSize.width), this._mainTextureDesiredSize.height = Math.floor(this._mainTextureDesiredSize.height);
  }
  /**
   * Creates the main texture for the effect layer.
   */
  _createMainTexture() {
    this._mainTexture = new te("EffectLayerMainRTT", {
      width: this._mainTextureDesiredSize.width,
      height: this._mainTextureDesiredSize.height
    }, this._scene, !1, !0, this._effectLayerOptions.mainTextureType), this._mainTexture.activeCamera = this._effectLayerOptions.camera, this._mainTexture.wrapU = m.CLAMP_ADDRESSMODE, this._mainTexture.wrapV = m.CLAMP_ADDRESSMODE, this._mainTexture.anisotropicFilteringLevel = 1, this._mainTexture.updateSamplingMode(m.BILINEAR_SAMPLINGMODE), this._mainTexture.renderParticles = !1, this._mainTexture.renderList = null, this._mainTexture.ignoreCameraViewport = !0;
    for (const e in this._materialForRendering) {
      const [t, i] = this._materialForRendering[e];
      this._mainTexture.setMaterialForRendering(t, i);
    }
    if (this._mainTexture.customIsReadyFunction = (e, t, i) => {
      if ((i || t === 0) && e.subMeshes)
        for (let s = 0; s < e.subMeshes.length; ++s) {
          const r = e.subMeshes[s], n = r.getMaterial(), a = r.getRenderingMesh();
          if (!n)
            continue;
          const l = a._getInstancesRenderList(r._id, !!r.getReplacementMesh()).hardwareInstancedRendering[r._id] || a.hasThinInstances;
          if (this._setEmissiveTextureAndColor(a, r, n), !this._isReady(r, l, this._emissiveTextureAndColor.texture))
            return !1;
        }
      return !0;
    }, this._mainTexture.customRenderFunction = (e, t, i, s) => {
      this.onBeforeRenderMainTextureObservable.notifyObservers(this);
      let r;
      const n = this._scene.getEngine();
      if (s.length) {
        for (n.setColorWrite(!1), r = 0; r < s.length; r++)
          this._renderSubMesh(s.data[r]);
        n.setColorWrite(!0);
      }
      for (r = 0; r < e.length; r++)
        this._renderSubMesh(e.data[r]);
      for (r = 0; r < t.length; r++)
        this._renderSubMesh(t.data[r]);
      const a = n.getAlphaMode();
      for (r = 0; r < i.length; r++)
        this._renderSubMesh(i.data[r], !0);
      n.setAlphaMode(a);
    }, this._mainTexture.onClearObservable.add((e) => {
      e.clear(this.neutralColor, !0, !0, !0);
    }), this._scene.getBoundingBoxRenderer) {
      const e = this._scene.getBoundingBoxRenderer().enabled;
      this._mainTexture.onBeforeBindObservable.add(() => {
        this._scene.getBoundingBoxRenderer().enabled = !this.disableBoundingBoxesFromEffectLayer && e;
      }), this._mainTexture.onAfterUnbindObservable.add(() => {
        this._scene.getBoundingBoxRenderer().enabled = e;
      });
    }
  }
  /**
   * Adds specific effects defines.
   * @param defines The defines to add specifics to.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _addCustomEffectDefines(e) {
  }
  /**
   * Checks for the readiness of the element composing the layer.
   * @param subMesh the mesh to check for
   * @param useInstances specify whether or not to use instances to render the mesh
   * @param emissiveTexture the associated emissive texture used to generate the glow
   * @returns true if ready otherwise, false
   */
  _isReady(e, t, i) {
    var s;
    const r = this._scene.getEngine(), n = e.getMesh(), a = (s = n._internalAbstractMeshDataInfo._materialForRenderPass) === null || s === void 0 ? void 0 : s[r.currentRenderPassId];
    if (a)
      return a.isReadyForSubMesh(n, e, t);
    const o = e.getMaterial();
    if (!o)
      return !1;
    if (this._useMeshMaterial(e.getRenderingMesh()))
      return o.isReadyForSubMesh(e.getMesh(), e, t);
    const l = [], f = [L.PositionKind];
    let h = !1, c = !1;
    if (o) {
      const M = o.needAlphaTesting(), P = o.getAlphaTestTexture(), N = P && P.hasAlpha && (o.useAlphaFromDiffuseTexture || o._useAlphaFromAlbedoTexture);
      P && (M || N) && (l.push("#define DIFFUSE"), n.isVerticesDataPresent(L.UV2Kind) && P.coordinatesIndex === 1 ? (l.push("#define DIFFUSEUV2"), c = !0) : n.isVerticesDataPresent(L.UVKind) && (l.push("#define DIFFUSEUV1"), h = !0), M && (l.push("#define ALPHATEST"), l.push("#define ALPHATESTVALUE 0.4")), P.gammaSpace || l.push("#define DIFFUSE_ISLINEAR"));
      const W = o.opacityTexture;
      W && (l.push("#define OPACITY"), n.isVerticesDataPresent(L.UV2Kind) && W.coordinatesIndex === 1 ? (l.push("#define OPACITYUV2"), c = !0) : n.isVerticesDataPresent(L.UVKind) && (l.push("#define OPACITYUV1"), h = !0));
    }
    i && (l.push("#define EMISSIVE"), n.isVerticesDataPresent(L.UV2Kind) && i.coordinatesIndex === 1 ? (l.push("#define EMISSIVEUV2"), c = !0) : n.isVerticesDataPresent(L.UVKind) && (l.push("#define EMISSIVEUV1"), h = !0), i.gammaSpace || l.push("#define EMISSIVE_ISLINEAR")), n.useVertexColors && n.isVerticesDataPresent(L.ColorKind) && n.hasVertexAlpha && o.transparencyMode !== ve.MATERIAL_OPAQUE && (f.push(L.ColorKind), l.push("#define VERTEXALPHA")), h && (f.push(L.UVKind), l.push("#define UV1")), c && (f.push(L.UV2Kind), l.push("#define UV2"));
    const p = new Et();
    if (n.useBones && n.computeBonesUsingShaders) {
      f.push(L.MatricesIndicesKind), f.push(L.MatricesWeightsKind), n.numBoneInfluencers > 4 && (f.push(L.MatricesIndicesExtraKind), f.push(L.MatricesWeightsExtraKind)), l.push("#define NUM_BONE_INFLUENCERS " + n.numBoneInfluencers);
      const M = n.skeleton;
      M && M.isUsingTextureForMatrices ? l.push("#define BONETEXTURE") : l.push("#define BonesPerMesh " + (M ? M.bones.length + 1 : 0)), n.numBoneInfluencers > 0 && p.addCPUSkinningFallback(0, n);
    } else
      l.push("#define NUM_BONE_INFLUENCERS 0");
    const E = n.morphTargetManager;
    let g = 0;
    E && E.numInfluencers > 0 && (l.push("#define MORPHTARGETS"), g = E.numInfluencers, l.push("#define NUM_MORPH_INFLUENCERS " + g), E.isUsingTextureForTargets && l.push("#define MORPHTARGETS_TEXTURE"), D.PrepareAttributesForMorphTargetsInfluencers(f, n, g)), t && (l.push("#define INSTANCES"), D.PushAttributesForInstances(f), e.getRenderingMesh().hasThinInstances && l.push("#define THIN_INSTANCES")), Nt(o, this._scene, l), this._addCustomEffectDefines(l);
    const _ = e._getDrawWrapper(void 0, !0), S = _.defines, I = l.join(`
`);
    if (S !== I) {
      const M = [
        "world",
        "mBones",
        "viewProjection",
        "glowColor",
        "morphTargetInfluences",
        "boneTextureWidth",
        "diffuseMatrix",
        "emissiveMatrix",
        "opacityMatrix",
        "opacityIntensity",
        "morphTargetTextureInfo",
        "morphTargetTextureIndices"
      ];
      nt(M), _.setEffect(this._engine.createEffect("glowMapGeneration", f, M, ["diffuseSampler", "emissiveSampler", "opacitySampler", "boneSampler", "morphTargets"], I, p, void 0, void 0, { maxSimultaneousMorphTargets: g }), I);
    }
    return _.effect.isReady();
  }
  /**
   * Renders the glowing part of the scene by blending the blurred glowing meshes on top of the rendered scene.
   */
  render() {
    for (let n = 0; n < this._postProcesses.length; n++)
      if (!this._postProcesses[n].isReady())
        return;
    const e = this._scene.getEngine(), t = this._numInternalDraws();
    let i = !0;
    for (let n = 0; n < t; ++n) {
      let a = this._mergeDrawWrapper[n];
      a || (a = this._mergeDrawWrapper[n] = new gt(this._engine), a.setEffect(this._createMergeEffect())), i = i && a.effect.isReady();
    }
    if (!i)
      return;
    this.onBeforeComposeObservable.notifyObservers(this);
    const s = e.getAlphaMode();
    for (let n = 0; n < t; ++n) {
      const a = this._mergeDrawWrapper[n];
      e.enableEffect(a), e.setState(!1), e.bindBuffers(this._vertexBuffers, this._indexBuffer, a.effect), e.setAlphaMode(this._effectLayerOptions.alphaBlendingMode), this._internalRender(a.effect, n);
    }
    e.setAlphaMode(s), this.onAfterComposeObservable.notifyObservers(this);
    const r = this._mainTexture.getSize();
    this._setMainTextureSize(), (r.width !== this._mainTextureDesiredSize.width || r.height !== this._mainTextureDesiredSize.height) && this._mainTextureDesiredSize.width !== 0 && this._mainTextureDesiredSize.height !== 0 && (this.onSizeChangedObservable.notifyObservers(this), this._disposeTextureAndPostProcesses(), this._createMainTexture(), this._createTextureAndPostProcesses());
  }
  /**
   * Determine if a given mesh will be used in the current effect.
   * @param mesh mesh to test
   * @returns true if the mesh will be used
   */
  hasMesh(e) {
    return this.renderingGroupId === -1 || e.renderingGroupId === this.renderingGroupId;
  }
  /**
   * Returns true if the layer contains information to display, otherwise false.
   * @returns true if the glow layer should be rendered
   */
  shouldRender() {
    return this.isEnabled && this._shouldRender;
  }
  /**
   * Returns true if the mesh should render, otherwise false.
   * @param mesh The mesh to render
   * @returns true if it should render otherwise false
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _shouldRenderMesh(e) {
    return !0;
  }
  /**
   * Returns true if the mesh can be rendered, otherwise false.
   * @param mesh The mesh to render
   * @param material The material used on the mesh
   * @returns true if it can be rendered otherwise false
   */
  _canRenderMesh(e, t) {
    return !t.needAlphaBlendingForMesh(e);
  }
  /**
   * Returns true if the mesh should render, otherwise false.
   * @returns true if it should render otherwise false
   */
  _shouldRenderEmissiveTextureForMesh() {
    return !0;
  }
  /**
   * Renders the submesh passed in parameter to the generation map.
   * @param subMesh
   * @param enableAlphaMode
   */
  _renderSubMesh(e, t = !1) {
    var i, s;
    if (!this.shouldRender())
      return;
    const r = e.getMaterial(), n = e.getMesh(), a = e.getReplacementMesh(), o = e.getRenderingMesh(), l = e.getEffectiveMesh(), f = this._scene, h = f.getEngine();
    if (l._internalAbstractMeshDataInfo._isActiveIntermediate = !1, !r || !this._canRenderMesh(o, r))
      return;
    let c = (i = o.overrideMaterialSideOrientation) !== null && i !== void 0 ? i : r.sideOrientation;
    l._getWorldMatrixDeterminant() < 0 && (c = c === ve.ClockWiseSideOrientation ? ve.CounterClockWiseSideOrientation : ve.ClockWiseSideOrientation);
    const E = c === ve.ClockWiseSideOrientation;
    h.setState(r.backFaceCulling, r.zOffset, void 0, E, r.cullBackFaces, void 0, r.zOffsetUnits);
    const g = o._getInstancesRenderList(e._id, !!a);
    if (g.mustReturn || !this._shouldRenderMesh(o))
      return;
    const _ = g.hardwareInstancedRendering[e._id] || o.hasThinInstances;
    if (this._setEmissiveTextureAndColor(o, e, r), this.onBeforeRenderMeshToEffect.notifyObservers(n), this._useMeshMaterial(o))
      o.render(e, t, a || void 0);
    else if (this._isReady(e, _, this._emissiveTextureAndColor.texture)) {
      const S = (s = l._internalAbstractMeshDataInfo._materialForRenderPass) === null || s === void 0 ? void 0 : s[h.currentRenderPassId];
      let I = e._getDrawWrapper();
      if (!I && S && (I = S._getDrawWrapper()), !I)
        return;
      const M = I.effect;
      if (h.enableEffect(I), _ || o._bind(e, M, r.fillMode), S ? S.bindForSubMesh(l.getWorldMatrix(), l, e) : (M.setMatrix("viewProjection", f.getTransformMatrix()), M.setMatrix("world", l.getWorldMatrix()), M.setFloat4("glowColor", this._emissiveTextureAndColor.color.r, this._emissiveTextureAndColor.color.g, this._emissiveTextureAndColor.color.b, this._emissiveTextureAndColor.color.a)), !S) {
        const P = r.needAlphaTesting(), N = r.getAlphaTestTexture(), W = N && N.hasAlpha && (r.useAlphaFromDiffuseTexture || r._useAlphaFromAlbedoTexture);
        if (N && (P || W)) {
          M.setTexture("diffuseSampler", N);
          const O = N.getTextureMatrix();
          O && M.setMatrix("diffuseMatrix", O);
        }
        const b = r.opacityTexture;
        if (b) {
          M.setTexture("opacitySampler", b), M.setFloat("opacityIntensity", b.level);
          const O = b.getTextureMatrix();
          O && M.setMatrix("opacityMatrix", O);
        }
        if (this._emissiveTextureAndColor.texture && (M.setTexture("emissiveSampler", this._emissiveTextureAndColor.texture), M.setMatrix("emissiveMatrix", this._emissiveTextureAndColor.texture.getTextureMatrix())), o.useBones && o.computeBonesUsingShaders && o.skeleton) {
          const O = o.skeleton;
          if (O.isUsingTextureForMatrices) {
            const y = O.getTransformMatrixTexture(o);
            if (!y)
              return;
            M.setTexture("boneSampler", y), M.setFloat("boneTextureWidth", 4 * (O.bones.length + 1));
          } else
            M.setMatrices("mBones", O.getTransformMatrices(o));
        }
        D.BindMorphTargetParameters(o, M), o.morphTargetManager && o.morphTargetManager.isUsingTextureForTargets && o.morphTargetManager._bind(M), t && h.setAlphaMode(r.alphaMode), at(M, r, f);
      }
      o._processRendering(l, e, M, r.fillMode, g, _, (P, N) => M.setMatrix("world", N));
    } else
      this._mainTexture.resetRefreshCounter();
    this.onAfterRenderMeshToEffect.notifyObservers(n);
  }
  /**
   * Defines whether the current material of the mesh should be use to render the effect.
   * @param mesh defines the current mesh to render
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _useMeshMaterial(e) {
    return !1;
  }
  /**
   * Rebuild the required buffers.
   * @internal Internal use only.
   */
  _rebuild() {
    const e = this._vertexBuffers[L.PositionKind];
    e && e._rebuild(), this._generateIndexBuffer();
  }
  /**
   * Dispose only the render target textures and post process.
   */
  _disposeTextureAndPostProcesses() {
    this._mainTexture.dispose();
    for (let e = 0; e < this._postProcesses.length; e++)
      this._postProcesses[e] && this._postProcesses[e].dispose();
    this._postProcesses = [];
    for (let e = 0; e < this._textures.length; e++)
      this._textures[e] && this._textures[e].dispose();
    this._textures = [];
  }
  /**
   * Dispose the highlight layer and free resources.
   */
  dispose() {
    const e = this._vertexBuffers[L.PositionKind];
    e && (e.dispose(), this._vertexBuffers[L.PositionKind] = null), this._indexBuffer && (this._scene.getEngine()._releaseBuffer(this._indexBuffer), this._indexBuffer = null);
    for (const i of this._mergeDrawWrapper)
      i.dispose();
    this._mergeDrawWrapper = [], this._disposeTextureAndPostProcesses();
    const t = this._scene.effectLayers.indexOf(this, 0);
    t > -1 && this._scene.effectLayers.splice(t, 1), this.onDisposeObservable.notifyObservers(this), this.onDisposeObservable.clear(), this.onBeforeRenderMainTextureObservable.clear(), this.onBeforeComposeObservable.clear(), this.onBeforeRenderMeshToEffect.clear(), this.onAfterRenderMeshToEffect.clear(), this.onAfterComposeObservable.clear(), this.onSizeChangedObservable.clear();
  }
  /**
   * Gets the class name of the effect layer
   * @returns the string with the class name of the effect layer
   */
  getClassName() {
    return "EffectLayer";
  }
  /**
   * Creates an effect layer from parsed effect layer data
   * @param parsedEffectLayer defines effect layer data
   * @param scene defines the current scene
   * @param rootUrl defines the root URL containing the effect layer information
   * @returns a parsed effect Layer
   */
  static Parse(e, t, i) {
    return Ge.Instantiate(e.customType).Parse(e, t, i);
  }
}
fe._SceneComponentInitialization = (d) => {
  throw Ne("EffectLayerSceneComponent");
};
u([
  T()
], fe.prototype, "name", void 0);
u([
  Kt()
], fe.prototype, "neutralColor", void 0);
u([
  T()
], fe.prototype, "isEnabled", void 0);
u([
  gi()
], fe.prototype, "camera", null);
u([
  T()
], fe.prototype, "renderingGroupId", null);
u([
  T()
], fe.prototype, "disableBoundingBoxesFromEffectLayer", void 0);
const Ir = "glowMapMergePixelShader", br = `varying vec2 vUV;
uniform sampler2D textureSampler;
#ifdef EMISSIVE
uniform sampler2D textureSampler2;
#endif
uniform float offset;
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
vec4 baseColor=texture2D(textureSampler,vUV);
#ifdef EMISSIVE
baseColor+=texture2D(textureSampler2,vUV);
baseColor*=offset;
#else
baseColor.a=abs(offset-baseColor.a);
#ifdef STROKE
float alpha=smoothstep(.0,.1,baseColor.a);
baseColor.a=alpha;
baseColor.rgb=baseColor.rgb*alpha;
#endif
#endif
#if LDR
baseColor=clamp(baseColor,0.,1.0);
#endif
gl_FragColor=baseColor;
#define CUSTOM_FRAGMENT_MAIN_END
}`;
x.ShadersStore[Ir] = br;
const Pr = "glowMapMergeVertexShader", Dr = `attribute vec2 position;
varying vec2 vUV;
const vec2 madd=vec2(0.5,0.5);
#define CUSTOM_VERTEX_DEFINITIONS
void main(void) {
#define CUSTOM_VERTEX_MAIN_BEGIN
vUV=position*madd+madd;
gl_Position=vec4(position,0.0,1.0);
#define CUSTOM_VERTEX_MAIN_END
}`;
x.ShadersStore[Pr] = Dr;
ot.AddParser(ae.NAME_EFFECTLAYER, (d, e, t, i) => {
  if (d.effectLayers) {
    t.effectLayers || (t.effectLayers = new Array());
    for (let s = 0; s < d.effectLayers.length; s++) {
      const r = fe.Parse(d.effectLayers[s], e, i);
      t.effectLayers.push(r);
    }
  }
});
ot.prototype.removeEffectLayer = function(d) {
  const e = this.effectLayers.indexOf(d);
  return e !== -1 && this.effectLayers.splice(e, 1), e;
};
ot.prototype.addEffectLayer = function(d) {
  this.effectLayers.push(d);
};
class Lr {
  /**
   * Creates a new instance of the component for the given scene
   * @param scene Defines the scene to register the component in
   */
  constructor(e) {
    this.name = ae.NAME_EFFECTLAYER, this._renderEffects = !1, this._needStencil = !1, this._previousStencilState = !1, this.scene = e || st.LastCreatedScene, this.scene && (this._engine = this.scene.getEngine(), this.scene.effectLayers = new Array());
  }
  /**
   * Registers the component in a given scene
   */
  register() {
    this.scene._isReadyForMeshStage.registerStep(ae.STEP_ISREADYFORMESH_EFFECTLAYER, this, this._isReadyForMesh), this.scene._cameraDrawRenderTargetStage.registerStep(ae.STEP_CAMERADRAWRENDERTARGET_EFFECTLAYER, this, this._renderMainTexture), this.scene._beforeCameraDrawStage.registerStep(ae.STEP_BEFORECAMERADRAW_EFFECTLAYER, this, this._setStencil), this.scene._afterRenderingGroupDrawStage.registerStep(ae.STEP_AFTERRENDERINGGROUPDRAW_EFFECTLAYER_DRAW, this, this._drawRenderingGroup), this.scene._afterCameraDrawStage.registerStep(ae.STEP_AFTERCAMERADRAW_EFFECTLAYER, this, this._setStencilBack), this.scene._afterCameraDrawStage.registerStep(ae.STEP_AFTERCAMERADRAW_EFFECTLAYER_DRAW, this, this._drawCamera);
  }
  /**
   * Rebuilds the elements related to this component in case of
   * context lost for instance.
   */
  rebuild() {
    const e = this.scene.effectLayers;
    for (const t of e)
      t._rebuild();
  }
  /**
   * Serializes the component data to the specified json object
   * @param serializationObject The object to serialize to
   */
  serialize(e) {
    e.effectLayers = [];
    const t = this.scene.effectLayers;
    for (const i of t)
      i.serialize && e.effectLayers.push(i.serialize());
  }
  /**
   * Adds all the elements from the container to the scene
   * @param container the container holding the elements
   */
  addFromContainer(e) {
    e.effectLayers && e.effectLayers.forEach((t) => {
      this.scene.addEffectLayer(t);
    });
  }
  /**
   * Removes all the elements in the container from the scene
   * @param container contains the elements to remove
   * @param dispose if the removed element should be disposed (default: false)
   */
  removeFromContainer(e, t) {
    e.effectLayers && e.effectLayers.forEach((i) => {
      this.scene.removeEffectLayer(i), t && i.dispose();
    });
  }
  /**
   * Disposes the component and the associated resources.
   */
  dispose() {
    const e = this.scene.effectLayers;
    for (; e.length; )
      e[0].dispose();
  }
  _isReadyForMesh(e, t) {
    const i = this._engine.currentRenderPassId, s = this.scene.effectLayers;
    for (const r of s) {
      if (!r.hasMesh(e))
        continue;
      const n = r._mainTexture;
      this._engine.currentRenderPassId = n.renderPassId;
      for (const a of e.subMeshes)
        if (!r.isReady(a, t))
          return this._engine.currentRenderPassId = i, !1;
    }
    return this._engine.currentRenderPassId = i, !0;
  }
  _renderMainTexture(e) {
    this._renderEffects = !1, this._needStencil = !1;
    let t = !1;
    const i = this.scene.effectLayers;
    if (i && i.length > 0) {
      this._previousStencilState = this._engine.getStencilBuffer();
      for (const s of i)
        if (s.shouldRender() && (!s.camera || s.camera.cameraRigMode === ie.RIG_MODE_NONE && e === s.camera || s.camera.cameraRigMode !== ie.RIG_MODE_NONE && s.camera._rigCameras.indexOf(e) > -1)) {
          this._renderEffects = !0, this._needStencil = this._needStencil || s.needStencil();
          const r = s._mainTexture;
          r._shouldRender() && (this.scene.incrementRenderId(), r.render(!1, !1), t = !0);
        }
      this.scene.incrementRenderId();
    }
    return t;
  }
  _setStencil() {
    this._needStencil && this._engine.setStencilBuffer(!0);
  }
  _setStencilBack() {
    this._needStencil && this._engine.setStencilBuffer(this._previousStencilState);
  }
  _draw(e) {
    if (this._renderEffects) {
      this._engine.setDepthBuffer(!1);
      const t = this.scene.effectLayers;
      for (let i = 0; i < t.length; i++) {
        const s = t[i];
        s.renderingGroupId === e && s.shouldRender() && s.render();
      }
      this._engine.setDepthBuffer(!0);
    }
  }
  _drawCamera() {
    this._renderEffects && this._draw(-1);
  }
  _drawRenderingGroup(e) {
    !this.scene._isInIntermediateRendering() && this._renderEffects && this._draw(e);
  }
}
fe._SceneComponentInitialization = (d) => {
  let e = d._getComponent(ae.NAME_EFFECTLAYER);
  e || (e = new Lr(d), d._addComponent(e));
};
ot.prototype.getGlowLayerByName = function(d) {
  var e;
  for (let t = 0; t < ((e = this.effectLayers) === null || e === void 0 ? void 0 : e.length); t++)
    if (this.effectLayers[t].name === d && this.effectLayers[t].getEffectName() === oe.EffectName)
      return this.effectLayers[t];
  return null;
};
class oe extends fe {
  /**
   * Sets the kernel size of the blur.
   */
  set blurKernelSize(e) {
    if (e === this._options.blurKernelSize)
      return;
    this._options.blurKernelSize = e;
    const t = this._getEffectiveBlurKernelSize();
    this._horizontalBlurPostprocess1.kernel = t, this._verticalBlurPostprocess1.kernel = t, this._horizontalBlurPostprocess2.kernel = t, this._verticalBlurPostprocess2.kernel = t;
  }
  /**
   * Gets the kernel size of the blur.
   */
  get blurKernelSize() {
    return this._options.blurKernelSize;
  }
  /**
   * Sets the glow intensity.
   */
  set intensity(e) {
    this._intensity = e;
  }
  /**
   * Gets the glow intensity.
   */
  get intensity() {
    return this._intensity;
  }
  /**
   * Instantiates a new glow Layer and references it to the scene.
   * @param name The name of the layer
   * @param scene The scene to use the layer in
   * @param options Sets of none mandatory options to use with the layer (see IGlowLayerOptions for more information)
   */
  constructor(e, t, i) {
    super(e, t), this._intensity = 1, this._includedOnlyMeshes = [], this._excludedMeshes = [], this._meshesUsingTheirOwnMaterials = [], this.neutralColor = new Ce(0, 0, 0, 1), this._options = {
      mainTextureRatio: oe.DefaultTextureRatio,
      blurKernelSize: 32,
      mainTextureFixedSize: void 0,
      camera: null,
      mainTextureSamples: 1,
      renderingGroupId: -1,
      ldrMerge: !1,
      alphaBlendingMode: 1,
      mainTextureType: 0,
      ...i
    }, this._init({
      alphaBlendingMode: this._options.alphaBlendingMode,
      camera: this._options.camera,
      mainTextureFixedSize: this._options.mainTextureFixedSize,
      mainTextureRatio: this._options.mainTextureRatio,
      renderingGroupId: this._options.renderingGroupId,
      mainTextureType: this._options.mainTextureType
    });
  }
  /**
   * Get the effect name of the layer.
   * @returns The effect name
   */
  getEffectName() {
    return oe.EffectName;
  }
  /**
   * Create the merge effect. This is the shader use to blit the information back
   * to the main canvas at the end of the scene rendering.
   */
  _createMergeEffect() {
    let e = `#define EMISSIVE 
`;
    return this._options.ldrMerge && (e += `#define LDR 
`), this._engine.createEffect("glowMapMerge", [L.PositionKind], ["offset"], ["textureSampler", "textureSampler2"], e);
  }
  /**
   * Creates the render target textures and post processes used in the glow layer.
   */
  _createTextureAndPostProcesses() {
    let e = this._mainTextureDesiredSize.width, t = this._mainTextureDesiredSize.height;
    e = this._engine.needPOTTextures ? V.GetExponentOfTwo(e, this._maxSize) : e, t = this._engine.needPOTTextures ? V.GetExponentOfTwo(t, this._maxSize) : t;
    let i = 0;
    this._engine.getCaps().textureHalfFloatRender ? i = 2 : i = 0, this._blurTexture1 = new te("GlowLayerBlurRTT", {
      width: e,
      height: t
    }, this._scene, !1, !0, i), this._blurTexture1.wrapU = m.CLAMP_ADDRESSMODE, this._blurTexture1.wrapV = m.CLAMP_ADDRESSMODE, this._blurTexture1.updateSamplingMode(m.BILINEAR_SAMPLINGMODE), this._blurTexture1.renderParticles = !1, this._blurTexture1.ignoreCameraViewport = !0;
    const s = Math.floor(e / 2), r = Math.floor(t / 2);
    this._blurTexture2 = new te("GlowLayerBlurRTT2", {
      width: s,
      height: r
    }, this._scene, !1, !0, i), this._blurTexture2.wrapU = m.CLAMP_ADDRESSMODE, this._blurTexture2.wrapV = m.CLAMP_ADDRESSMODE, this._blurTexture2.updateSamplingMode(m.BILINEAR_SAMPLINGMODE), this._blurTexture2.renderParticles = !1, this._blurTexture2.ignoreCameraViewport = !0, this._textures = [this._blurTexture1, this._blurTexture2];
    const n = this._getEffectiveBlurKernelSize();
    this._horizontalBlurPostprocess1 = new he("GlowLayerHBP1", new Ae(1, 0), n, {
      width: e,
      height: t
    }, null, m.BILINEAR_SAMPLINGMODE, this._scene.getEngine(), !1, i), this._horizontalBlurPostprocess1.width = e, this._horizontalBlurPostprocess1.height = t, this._horizontalBlurPostprocess1.externalTextureSamplerBinding = !0, this._horizontalBlurPostprocess1.onApplyObservable.add((a) => {
      a.setTexture("textureSampler", this._mainTexture);
    }), this._verticalBlurPostprocess1 = new he("GlowLayerVBP1", new Ae(0, 1), n, {
      width: e,
      height: t
    }, null, m.BILINEAR_SAMPLINGMODE, this._scene.getEngine(), !1, i), this._horizontalBlurPostprocess2 = new he("GlowLayerHBP2", new Ae(1, 0), n, {
      width: s,
      height: r
    }, null, m.BILINEAR_SAMPLINGMODE, this._scene.getEngine(), !1, i), this._horizontalBlurPostprocess2.width = s, this._horizontalBlurPostprocess2.height = r, this._horizontalBlurPostprocess2.externalTextureSamplerBinding = !0, this._horizontalBlurPostprocess2.onApplyObservable.add((a) => {
      a.setTexture("textureSampler", this._blurTexture1);
    }), this._verticalBlurPostprocess2 = new he("GlowLayerVBP2", new Ae(0, 1), n, {
      width: s,
      height: r
    }, null, m.BILINEAR_SAMPLINGMODE, this._scene.getEngine(), !1, i), this._postProcesses = [this._horizontalBlurPostprocess1, this._verticalBlurPostprocess1, this._horizontalBlurPostprocess2, this._verticalBlurPostprocess2], this._postProcesses1 = [this._horizontalBlurPostprocess1, this._verticalBlurPostprocess1], this._postProcesses2 = [this._horizontalBlurPostprocess2, this._verticalBlurPostprocess2], this._mainTexture.samples = this._options.mainTextureSamples, this._mainTexture.onAfterUnbindObservable.add(() => {
      const a = this._blurTexture1.renderTarget;
      if (a) {
        this._scene.postProcessManager.directRender(this._postProcesses1, a, !0);
        const o = this._blurTexture2.renderTarget;
        o && this._scene.postProcessManager.directRender(this._postProcesses2, o, !0), this._engine.unBindFramebuffer(o ?? a, !0);
      }
    }), this._postProcesses.map((a) => {
      a.autoClear = !1;
    });
  }
  /**
   * @returns The blur kernel size used by the glow.
   * Note: The value passed in the options is divided by 2 for back compatibility.
   */
  _getEffectiveBlurKernelSize() {
    return this._options.blurKernelSize / 2;
  }
  /**
   * Checks for the readiness of the element composing the layer.
   * @param subMesh the mesh to check for
   * @param useInstances specify whether or not to use instances to render the mesh
   * @returns true if ready otherwise, false
   */
  isReady(e, t) {
    const i = e.getMaterial(), s = e.getRenderingMesh();
    if (!i || !s)
      return !1;
    const r = i.emissiveTexture;
    return super._isReady(e, t, r);
  }
  /**
   * Returns whether or not the layer needs stencil enabled during the mesh rendering.
   */
  needStencil() {
    return !1;
  }
  /**
   * Returns true if the mesh can be rendered, otherwise false.
   * @param mesh The mesh to render
   * @param material The material used on the mesh
   * @returns true if it can be rendered otherwise false
   */
  _canRenderMesh(e, t) {
    return !0;
  }
  /**
   * Implementation specific of rendering the generating effect on the main canvas.
   * @param effect The effect used to render through
   */
  _internalRender(e) {
    e.setTexture("textureSampler", this._blurTexture1), e.setTexture("textureSampler2", this._blurTexture2), e.setFloat("offset", this._intensity);
    const t = this._engine, i = t.getStencilBuffer();
    t.setStencilBuffer(!1), t.drawElementsType(ve.TriangleFillMode, 0, 6), t.setStencilBuffer(i);
  }
  /**
   * Sets the required values for both the emissive texture and and the main color.
   * @param mesh
   * @param subMesh
   * @param material
   */
  _setEmissiveTextureAndColor(e, t, i) {
    var s;
    let r = 1;
    if (this.customEmissiveTextureSelector ? this._emissiveTextureAndColor.texture = this.customEmissiveTextureSelector(e, t, i) : i ? (this._emissiveTextureAndColor.texture = i.emissiveTexture, this._emissiveTextureAndColor.texture && (r = this._emissiveTextureAndColor.texture.level)) : this._emissiveTextureAndColor.texture = null, this.customEmissiveColorSelector)
      this.customEmissiveColorSelector(e, t, i, this._emissiveTextureAndColor.color);
    else if (i.emissiveColor) {
      const n = (s = i.emissiveIntensity) !== null && s !== void 0 ? s : 1;
      r *= n, this._emissiveTextureAndColor.color.set(i.emissiveColor.r * r, i.emissiveColor.g * r, i.emissiveColor.b * r, i.alpha);
    } else
      this._emissiveTextureAndColor.color.set(this.neutralColor.r, this.neutralColor.g, this.neutralColor.b, this.neutralColor.a);
  }
  /**
   * Returns true if the mesh should render, otherwise false.
   * @param mesh The mesh to render
   * @returns true if it should render otherwise false
   */
  _shouldRenderMesh(e) {
    return this.hasMesh(e);
  }
  /**
   * Adds specific effects defines.
   * @param defines The defines to add specifics to.
   */
  _addCustomEffectDefines(e) {
    e.push("#define GLOW");
  }
  /**
   * Add a mesh in the exclusion list to prevent it to impact or being impacted by the glow layer.
   * @param mesh The mesh to exclude from the glow layer
   */
  addExcludedMesh(e) {
    this._excludedMeshes.indexOf(e.uniqueId) === -1 && this._excludedMeshes.push(e.uniqueId);
  }
  /**
   * Remove a mesh from the exclusion list to let it impact or being impacted by the glow layer.
   * @param mesh The mesh to remove
   */
  removeExcludedMesh(e) {
    const t = this._excludedMeshes.indexOf(e.uniqueId);
    t !== -1 && this._excludedMeshes.splice(t, 1);
  }
  /**
   * Add a mesh in the inclusion list to impact or being impacted by the glow layer.
   * @param mesh The mesh to include in the glow layer
   */
  addIncludedOnlyMesh(e) {
    this._includedOnlyMeshes.indexOf(e.uniqueId) === -1 && this._includedOnlyMeshes.push(e.uniqueId);
  }
  /**
   * Remove a mesh from the Inclusion list to prevent it to impact or being impacted by the glow layer.
   * @param mesh The mesh to remove
   */
  removeIncludedOnlyMesh(e) {
    const t = this._includedOnlyMeshes.indexOf(e.uniqueId);
    t !== -1 && this._includedOnlyMeshes.splice(t, 1);
  }
  /**
   * Determine if a given mesh will be used in the glow layer
   * @param mesh The mesh to test
   * @returns true if the mesh will be highlighted by the current glow layer
   */
  hasMesh(e) {
    return super.hasMesh(e) ? this._includedOnlyMeshes.length ? this._includedOnlyMeshes.indexOf(e.uniqueId) !== -1 : this._excludedMeshes.length ? this._excludedMeshes.indexOf(e.uniqueId) === -1 : !0 : !1;
  }
  /**
   * Defines whether the current material of the mesh should be use to render the effect.
   * @param mesh defines the current mesh to render
   */
  _useMeshMaterial(e) {
    return this._meshesUsingTheirOwnMaterials.length == 0 ? !1 : this._meshesUsingTheirOwnMaterials.indexOf(e.uniqueId) > -1;
  }
  /**
   * Add a mesh to be rendered through its own material and not with emissive only.
   * @param mesh The mesh for which we need to use its material
   */
  referenceMeshToUseItsOwnMaterial(e) {
    e.resetDrawCache(this._mainTexture.renderPassId), this._meshesUsingTheirOwnMaterials.push(e.uniqueId), e.onDisposeObservable.add(() => {
      this._disposeMesh(e);
    });
  }
  /**
   * Remove a mesh from being rendered through its own material and not with emissive only.
   * @param mesh The mesh for which we need to not use its material
   */
  unReferenceMeshFromUsingItsOwnMaterial(e) {
    let t = this._meshesUsingTheirOwnMaterials.indexOf(e.uniqueId);
    for (; t >= 0; )
      this._meshesUsingTheirOwnMaterials.splice(t, 1), t = this._meshesUsingTheirOwnMaterials.indexOf(e.uniqueId);
    e.resetDrawCache(this._mainTexture.renderPassId);
  }
  /**
   * Free any resources and references associated to a mesh.
   * Internal use
   * @param mesh The mesh to free.
   * @internal
   */
  _disposeMesh(e) {
    this.removeIncludedOnlyMesh(e), this.removeExcludedMesh(e);
  }
  /**
   * Gets the class name of the effect layer
   * @returns the string with the class name of the effect layer
   */
  getClassName() {
    return "GlowLayer";
  }
  /**
   * Serializes this glow layer
   * @returns a serialized glow layer object
   */
  serialize() {
    const e = q.Serialize(this);
    e.customType = "BABYLON.GlowLayer";
    let t;
    if (e.includedMeshes = [], this._includedOnlyMeshes.length)
      for (t = 0; t < this._includedOnlyMeshes.length; t++) {
        const i = this._scene.getMeshByUniqueId(this._includedOnlyMeshes[t]);
        i && e.includedMeshes.push(i.id);
      }
    if (e.excludedMeshes = [], this._excludedMeshes.length)
      for (t = 0; t < this._excludedMeshes.length; t++) {
        const i = this._scene.getMeshByUniqueId(this._excludedMeshes[t]);
        i && e.excludedMeshes.push(i.id);
      }
    return e;
  }
  /**
   * Creates a Glow Layer from parsed glow layer data
   * @param parsedGlowLayer defines glow layer data
   * @param scene defines the current scene
   * @param rootUrl defines the root URL containing the glow layer information
   * @returns a parsed Glow Layer
   */
  static Parse(e, t, i) {
    const s = q.Parse(() => new oe(e.name, t, e.options), e, t, i);
    let r;
    for (r = 0; r < e.excludedMeshes.length; r++) {
      const n = t.getMeshById(e.excludedMeshes[r]);
      n && s.addExcludedMesh(n);
    }
    for (r = 0; r < e.includedMeshes.length; r++) {
      const n = t.getMeshById(e.includedMeshes[r]);
      n && s.addIncludedOnlyMesh(n);
    }
    return s;
  }
}
oe.EffectName = "GlowLayer";
oe.DefaultBlurKernelSize = 32;
oe.DefaultTextureRatio = 0.5;
u([
  T()
], oe.prototype, "blurKernelSize", null);
u([
  T()
], oe.prototype, "intensity", null);
u([
  T("options")
], oe.prototype, "_options", void 0);
ye("BABYLON.GlowLayer", oe);
function wr(d) {
  return new V(d, !0, {
    preserveDrawingBuffer: !0,
    stencil: !0
  });
}
class Re {
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
class It extends Re {
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
class Wt extends Re {
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
class bt extends Re {
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
class Pt extends Re {
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
class Dt extends Re {
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
class Fr extends Re {
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
class Lt extends Re {
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
class kt extends Re {
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
class De extends Re {
  constructor() {
    super(...arguments), this._canBeMerged = (e) => {
      if (!(e instanceof qe))
        return !1;
      const t = e;
      return !(t.isDisposed() || !t.isVisible || !t.isEnabled() || t.instances.length > 0 || t.skeleton || t.hasLODLevels || t.getTotalVertices() === 0);
    };
  }
  /**
   * Gets or sets a boolean which defines if optimization octree has to be updated
   */
  static get UpdateSelectionTree() {
    return De._UpdateSelectionTree;
  }
  /**
   * Gets or sets a boolean which defines if optimization octree has to be updated
   */
  static set UpdateSelectionTree(e) {
    De._UpdateSelectionTree = e;
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
        for (let f = a + 1; f < r; f++) {
          const h = s[f];
          this._canBeMerged(h) && h.material === l.material && h.checkCollisions === l.checkCollisions && (o.push(h), r--, s.splice(f, 1), f--);
        }
        o.length < 2 || qe.MergeMeshes(o, void 0, !0);
      }
    }
    const n = e;
    return n.createOrUpdateSelectionOctree && (i != null ? i && n.createOrUpdateSelectionOctree() : De.UpdateSelectionTree && n.createOrUpdateSelectionOctree()), !0;
  }
}
De._UpdateSelectionTree = !1;
class Oe {
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
    const s = new Fr(i);
    return s.onApply = e, s.onGetDescription = t, this.optimizations.push(s), this;
  }
  /**
   * Creates a list of pre-defined optimizations aimed to reduce the visual impact on the scene
   * @param targetFrameRate defines the target frame rate (60 by default)
   * @returns a SceneOptimizerOptions object
   */
  static LowDegradationAllowed(e) {
    const t = new Oe(e);
    let i = 0;
    return t.addOptimization(new De(i)), t.addOptimization(new bt(i)), t.addOptimization(new Dt(i)), i++, t.addOptimization(new Pt(i)), t.addOptimization(new Lt(i)), i++, t.addOptimization(new It(i, 1024)), t;
  }
  /**
   * Creates a list of pre-defined optimizations aimed to have a moderate impact on the scene visual
   * @param targetFrameRate defines the target frame rate (60 by default)
   * @returns a SceneOptimizerOptions object
   */
  static ModerateDegradationAllowed(e) {
    const t = new Oe(e);
    let i = 0;
    return t.addOptimization(new De(i)), t.addOptimization(new bt(i)), t.addOptimization(new Dt(i)), i++, t.addOptimization(new Pt(i)), t.addOptimization(new Lt(i)), i++, t.addOptimization(new It(i, 512)), i++, t.addOptimization(new kt(i)), i++, t.addOptimization(new Wt(i, 2)), t;
  }
  /**
   * Creates a list of pre-defined optimizations aimed to have a big impact on the scene visual
   * @param targetFrameRate defines the target frame rate (60 by default)
   * @returns a SceneOptimizerOptions object
   */
  static HighDegradationAllowed(e) {
    const t = new Oe(e);
    let i = 0;
    return t.addOptimization(new De(i)), t.addOptimization(new bt(i)), t.addOptimization(new Dt(i)), i++, t.addOptimization(new Pt(i)), t.addOptimization(new Lt(i)), i++, t.addOptimization(new It(i, 256)), i++, t.addOptimization(new kt(i)), i++, t.addOptimization(new Wt(i, 4)), t;
  }
}
class Bt {
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
    if (this._isRunning = !1, this._currentPriorityLevel = 0, this._targetFrameRate = 60, this._trackerDuration = 2e3, this._currentFrameRate = 0, this._improvementMode = !1, this.onSuccessObservable = new z(), this.onNewOptimizationAppliedObservable = new z(), this.onFailureObservable = new z(), t ? this._options = t : this._options = new Oe(), this._options.targetFrameRate && (this._targetFrameRate = this._options.targetFrameRate), this._options.trackerDuration && (this._trackerDuration = this._options.trackerDuration), i) {
      let r = 0;
      for (const n of this._options.optimizations)
        n.priority = r++;
    }
    this._improvementMode = s, this._scene = e || st.LastCreatedScene, this._sceneDisposeObserver = this._scene.onDisposeObservable.add(() => {
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
    const r = new Bt(e, t || Oe.ModerateDegradationAllowed(), !1);
    return i && r.onSuccessObservable.add(() => {
      i();
    }), s && r.onFailureObservable.add(() => {
      s();
    }), r.start(), r;
  }
}
function Or(d) {
  const { engine: e } = d, t = new vt(e);
  t.clearColor = new Ce(0, 0, 0, 0), t.pointerMovePredicate = () => !1, t.pointerDownPredicate = () => !1, t.pointerUpPredicate = () => !1, t.clearCachedVertexData(), t.themeData = {};
  const i = Oe.LowDegradationAllowed();
  return i.optimizations = i.optimizations.splice(1), i.targetFrameRate = 60, Bt.OptimizeAsync(t, i), t;
}
class Q extends ie {
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
    super(e, t, i, s), this._tmpUpVector = R.Zero(), this._tmpTargetVector = R.Zero(), this.cameraDirection = new R(0, 0, 0), this.cameraRotation = new Ae(0, 0), this.ignoreParentScaling = !1, this.updateUpVectorFromRotation = !1, this._tmpQuaternion = new we(), this.rotation = new R(0, 0, 0), this.speed = 2, this.noRotationConstraint = !1, this.invertRotation = !1, this.inverseRotationSpeed = 0.2, this.lockedTarget = null, this._currentTarget = R.Zero(), this._initialFocalDistance = 1, this._viewMatrix = F.Zero(), this._camMatrix = F.Zero(), this._cameraTransformMatrix = F.Zero(), this._cameraRotationMatrix = F.Zero(), this._referencePoint = new R(0, 0, 1), this._transformedReferencePoint = R.Zero(), this._defaultUp = R.Up(), this._cachedRotationZ = 0, this._cachedQuaternionRotationZ = 0;
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
    super._initCache(), this._cache.lockedTarget = new R(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE), this._cache.rotation = new R(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE), this._cache.rotationQuaternion = new we(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);
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
    this.upVector.normalize(), this._initialFocalDistance = e.subtract(this.position).length(), this.position.z === e.z && (this.position.z += Xe), this._referencePoint.normalize().scaleInPlace(this._initialFocalDistance), F.LookAtLHToRef(this.position, e, this._defaultUp, this._camMatrix), this._camMatrix.invert(), this.rotation.x = Math.atan(this._camMatrix.m[6] / this._camMatrix.m[10]);
    const t = e.subtract(this.position);
    t.x >= 0 ? this.rotation.y = -Math.atan(t.z / t.x) + Math.PI / 2 : this.rotation.y = -Math.atan(t.z / t.x) - Math.PI / 2, this.rotation.z = 0, isNaN(this.rotation.x) && (this.rotation.x = 0), isNaN(this.rotation.y) && (this.rotation.y = 0), isNaN(this.rotation.z) && (this.rotation.z = 0), this.rotationQuaternion && we.RotationYawPitchRollToRef(this.rotation.y, this.rotation.x, this.rotation.z, this.rotationQuaternion);
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
      this.parent.getWorldMatrix().invertToRef(le.Matrix[0]), R.TransformNormalToRef(this.cameraDirection, le.Matrix[0], le.Vector3[0]), this.position.addInPlace(le.Vector3[0]);
      return;
    }
    this.position.addInPlace(this.cameraDirection);
  }
  /** @internal */
  _checkInputs() {
    const e = this.invertRotation ? -this.inverseRotationSpeed : 1, t = this._decideIfNeedsToMove(), i = Math.abs(this.cameraRotation.x) > 0 || Math.abs(this.cameraRotation.y) > 0;
    t && this._updatePosition(), i && (this.rotationQuaternion && this.rotationQuaternion.toEulerAnglesToRef(this.rotation), this.rotation.x += this.cameraRotation.x * e, this.rotation.y += this.cameraRotation.y * e, this.noRotationConstraint || (this.rotation.x > 1.570796 && (this.rotation.x = 1.570796), this.rotation.x < -1.570796 && (this.rotation.x = -1.570796)), this.rotationQuaternion && this.rotation.lengthSquared() && we.RotationYawPitchRollToRef(this.rotation.y, this.rotation.x, this.rotation.z, this.rotationQuaternion)), t && (Math.abs(this.cameraDirection.x) < this.speed * Xe && (this.cameraDirection.x = 0), Math.abs(this.cameraDirection.y) < this.speed * Xe && (this.cameraDirection.y = 0), Math.abs(this.cameraDirection.z) < this.speed * Xe && (this.cameraDirection.z = 0), this.cameraDirection.scaleInPlace(this.inertia)), i && (Math.abs(this.cameraRotation.x) < this.speed * Xe && (this.cameraRotation.x = 0), Math.abs(this.cameraRotation.y) < this.speed * Xe && (this.cameraRotation.y = 0), this.cameraRotation.scaleInPlace(this.inertia)), super._checkInputs();
  }
  _updateCameraRotationMatrix() {
    this.rotationQuaternion ? this.rotationQuaternion.toRotationMatrix(this._cameraRotationMatrix) : F.RotationYawPitchRollToRef(this.rotation.y, this.rotation.x, this.rotation.z, this._cameraRotationMatrix);
  }
  /**
   * Update the up vector to apply the rotation of the camera (So if you changed the camera rotation.z this will let you update the up vector as well)
   * @returns the current camera
   */
  _rotateUpVectorWithCameraRotationMatrix() {
    return R.TransformNormalToRef(this._defaultUp, this._cameraRotationMatrix, this.upVector), this;
  }
  /** @internal */
  _getViewMatrix() {
    return this.lockedTarget && this.setTarget(this._getLockedTargetPosition()), this._updateCameraRotationMatrix(), this.rotationQuaternion && this._cachedQuaternionRotationZ != this.rotationQuaternion.z ? (this._rotateUpVectorWithCameraRotationMatrix(), this._cachedQuaternionRotationZ = this.rotationQuaternion.z) : this._cachedRotationZ !== this.rotation.z && (this._rotateUpVectorWithCameraRotationMatrix(), this._cachedRotationZ = this.rotation.z), R.TransformCoordinatesToRef(this._referencePoint, this._cameraRotationMatrix, this._transformedReferencePoint), this.position.addToRef(this._transformedReferencePoint, this._currentTarget), this.updateUpVectorFromRotation && (this.rotationQuaternion ? Xt.Y.rotateByQuaternionToRef(this.rotationQuaternion, this.upVector) : (we.FromEulerVectorToRef(this.rotation, this._tmpQuaternion), Xt.Y.rotateByQuaternionToRef(this._tmpQuaternion, this.upVector))), this._computeViewMatrix(this.position, this._currentTarget, this.upVector), this._viewMatrix;
  }
  _computeViewMatrix(e, t, i) {
    if (this.ignoreParentScaling) {
      if (this.parent) {
        const s = this.parent.getWorldMatrix();
        R.TransformCoordinatesToRef(e, s, this._globalPosition), R.TransformCoordinatesToRef(t, s, this._tmpTargetVector), R.TransformNormalToRef(i, s, this._tmpUpVector), this._markSyncedWithParent();
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
      const i = new Q(e, this.position.clone(), this.getScene());
      return i.isRigCamera = !0, i.rigParent = this, (this.cameraRigMode === ie.RIG_MODE_VR || this.cameraRigMode === ie.RIG_MODE_WEBVR) && (this.rotationQuaternion || (this.rotationQuaternion = new we()), i._cameraRigParams = {}, i.rotationQuaternion = new we()), i.mode = this.mode, i.orthoLeft = this.orthoLeft, i.orthoRight = this.orthoRight, i.orthoTop = this.orthoTop, i.orthoBottom = this.orthoBottom, i;
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
    this.getTarget().subtractToRef(this.position, Q._TargetFocalPoint), Q._TargetFocalPoint.normalize().scaleInPlace(this._initialFocalDistance);
    const s = Q._TargetFocalPoint.addInPlace(this.position);
    F.TranslationToRef(-s.x, -s.y, -s.z, Q._TargetTransformMatrix), Q._TargetTransformMatrix.multiplyToRef(F.RotationAxis(t.upVector, e), Q._RigCamTransformMatrix), F.TranslationToRef(s.x, s.y, s.z, Q._TargetTransformMatrix), Q._RigCamTransformMatrix.multiplyToRef(Q._TargetTransformMatrix, Q._RigCamTransformMatrix), R.TransformCoordinatesToRef(this.position, Q._RigCamTransformMatrix, t.position), t.setTarget(s);
  }
  /**
   * Gets the current object class name.
   * @returns the class name
   */
  getClassName() {
    return "TargetCamera";
  }
}
Q._RigCamTransformMatrix = new F();
Q._TargetTransformMatrix = new F();
Q._TargetFocalPoint = new R();
u([
  Qt()
], Q.prototype, "rotation", void 0);
u([
  T()
], Q.prototype, "speed", void 0);
u([
  vi("lockedTargetId")
], Q.prototype, "lockedTarget", void 0);
function Nr(d) {
  const { scene: e } = d;
  let t;
  const i = 36.5;
  return t = new Q("TargetCamera1", new R(0, i, 0), e), t.fov = 0.25, t.minZ = 5, t.maxZ = i + 1, t.setTarget(R.Zero()), t;
}
qt.AddNodeConstructor("Light_Type_1", (d, e) => () => new Ee(d, R.Zero(), e));
class Ee extends Ei {
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
    return Je.LIGHTTYPEID_DIRECTIONALLIGHT;
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
      const f = R.Zero();
      this._orthoLeft = Number.MAX_VALUE, this._orthoRight = Number.MIN_VALUE, this._orthoTop = Number.MIN_VALUE, this._orthoBottom = Number.MAX_VALUE;
      let h = Number.MAX_VALUE, c = Number.MIN_VALUE;
      for (let p = 0; p < i.length; p++) {
        const E = i[p];
        if (!E)
          continue;
        const _ = E.getBoundingInfo().boundingBox;
        for (let S = 0; S < _.vectorsWorld.length; S++)
          R.TransformCoordinatesToRef(_.vectorsWorld[S], t, f), f.x < this._orthoLeft && (this._orthoLeft = f.x), f.y < this._orthoBottom && (this._orthoBottom = f.y), f.x > this._orthoRight && (this._orthoRight = f.x), f.y > this._orthoTop && (this._orthoTop = f.y), this.autoCalcShadowZBounds && (f.z < h && (h = f.z), f.z > c && (c = f.z));
      }
      this.autoCalcShadowZBounds && (this._shadowMinZ = h, this._shadowMaxZ = c);
    }
    const r = this._orthoRight - this._orthoLeft, n = this._orthoTop - this._orthoBottom, a = this.shadowMinZ !== void 0 ? this.shadowMinZ : s.minZ, o = this.shadowMaxZ !== void 0 ? this.shadowMaxZ : s.maxZ, l = this.getScene().getEngine().useReverseDepthBuffer;
    F.OrthoOffCenterLHToRef(this._orthoLeft - r * this.shadowOrthoScale, this._orthoRight + r * this.shadowOrthoScale, this._orthoBottom - n * this.shadowOrthoScale, this._orthoTop + n * this.shadowOrthoScale, l ? o : a, l ? a : o, e, this.getScene().getEngine().isNDCHalfZRange);
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
u([
  T()
], Ee.prototype, "shadowFrustumSize", null);
u([
  T()
], Ee.prototype, "shadowOrthoScale", null);
u([
  T()
], Ee.prototype, "autoUpdateExtends", void 0);
u([
  T()
], Ee.prototype, "autoCalcShadowZBounds", void 0);
u([
  T("orthoLeft")
], Ee.prototype, "_orthoLeft", void 0);
u([
  T("orthoRight")
], Ee.prototype, "_orthoRight", void 0);
u([
  T("orthoTop")
], Ee.prototype, "_orthoTop", void 0);
u([
  T("orthoBottom")
], Ee.prototype, "_orthoBottom", void 0);
qt.AddNodeConstructor("Light_Type_3", (d, e) => () => new St(d, R.Zero(), e));
class St extends Je {
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
    super(e, i), this.groundColor = new me(0, 0, 0), this.direction = t || R.Up();
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
    return this.direction = R.Normalize(e.subtract(R.Zero())), this.direction;
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
    const i = R.Normalize(this.direction);
    return this._uniformBuffer.updateFloat4("vLightData", i.x, i.y, i.z, 0, t), this._uniformBuffer.updateColor3("vLightGround", this.groundColor.scale(this.intensity), t), this;
  }
  transferToNodeMaterialEffect(e, t) {
    const i = R.Normalize(this.direction);
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
    return Je.LIGHTTYPEID_HEMISPHERICLIGHT;
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
u([
  lt()
], St.prototype, "groundColor", void 0);
u([
  Qt()
], St.prototype, "direction", void 0);
const yr = "bayerDitherFunctions", Ur = `float bayerDither2(vec2 _P) {
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
x.IncludesShadersStore[yr] = Ur;
const Br = "shadowMapFragmentExtraDeclaration", Vr = `#if SM_FLOAT==0
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
x.IncludesShadersStore[Br] = Vr;
const Xr = "shadowMapFragment", zr = `float depthSM=vDepthMetricSM;
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
x.IncludesShadersStore[Xr] = zr;
const Wr = "shadowMapPixelShader", kr = `#include<shadowMapFragmentExtraDeclaration>
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
x.ShadersStore[Wr] = kr;
const Hr = "sceneVertexDeclaration", Gr = `uniform mat4 viewProjection;
#ifdef MULTIVIEW
uniform mat4 viewProjectionR;
#endif
uniform mat4 view;
uniform mat4 projection;
uniform vec4 vEyePosition;
`;
x.IncludesShadersStore[Hr] = Gr;
const Yr = "meshVertexDeclaration", $r = `uniform mat4 world;
uniform float visibility;
`;
x.IncludesShadersStore[Yr] = $r;
const Zr = "shadowMapVertexDeclaration", jr = `#include<sceneVertexDeclaration>
#include<meshVertexDeclaration>
`;
x.IncludesShadersStore[Zr] = jr;
const Kr = "sceneUboDeclaration", Qr = `layout(std140,column_major) uniform;
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
x.IncludesShadersStore[Kr] = Qr;
const qr = "meshUboDeclaration", Jr = `#ifdef WEBGL2
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
x.IncludesShadersStore[qr] = Jr;
const es = "shadowMapUboDeclaration", ts = `layout(std140,column_major) uniform;
#include<sceneUboDeclaration>
#include<meshUboDeclaration>
`;
x.IncludesShadersStore[es] = ts;
const is = "shadowMapVertexExtraDeclaration", rs = `#if SM_NORMALBIAS==1
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
x.IncludesShadersStore[is] = rs;
const ss = "shadowMapVertexNormalBias", ns = `#if SM_NORMALBIAS==1
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
x.IncludesShadersStore[ss] = ns;
const as = "shadowMapVertexMetric", os = `#if SM_USEDISTANCE==1
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
x.IncludesShadersStore[as] = os;
const ls = "shadowMapVertexShader", hs = `attribute vec3 position;
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
x.ShadersStore[ls] = hs;
const fs = "depthBoxBlurPixelShader", ds = `varying vec2 vUV;
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
x.ShadersStore[fs] = ds;
const cs = "shadowMapFragmentSoftTransparentShadow", us = `#if SM_SOFTTRANSPARENTSHADOW==1
if ((bayerDither8(floor(mod(gl_FragCoord.xy,8.0))))/64.0>=softTransparentShadowSM*alpha) discard;
#endif
`;
x.IncludesShadersStore[cs] = us;
class C {
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
      if (e === C.FILTER_BLUREXPONENTIALSHADOWMAP) {
        this.useExponentialShadowMap = !0;
        return;
      } else if (e === C.FILTER_BLURCLOSEEXPONENTIALSHADOWMAP) {
        this.useCloseExponentialShadowMap = !0;
        return;
      } else if (e === C.FILTER_PCF || e === C.FILTER_PCSS) {
        this.usePoissonSampling = !0;
        return;
      }
    }
    if ((e === C.FILTER_PCF || e === C.FILTER_PCSS) && !this._scene.getEngine()._features.supportShadowSamplers) {
      this.usePoissonSampling = !0;
      return;
    }
    this._filter !== e && (this._filter = e, this._disposeBlurPostProcesses(), this._applyFilterValues(), this._light._markMeshesAsLightDirty());
  }
  /**
   * Gets if the current filter is set to Poisson Sampling.
   */
  get usePoissonSampling() {
    return this.filter === C.FILTER_POISSONSAMPLING;
  }
  /**
   * Sets the current filter to Poisson Sampling.
   */
  set usePoissonSampling(e) {
    const t = this._validateFilter(C.FILTER_POISSONSAMPLING);
    !e && this.filter !== C.FILTER_POISSONSAMPLING || (this.filter = e ? t : C.FILTER_NONE);
  }
  /**
   * Gets if the current filter is set to ESM.
   */
  get useExponentialShadowMap() {
    return this.filter === C.FILTER_EXPONENTIALSHADOWMAP;
  }
  /**
   * Sets the current filter is to ESM.
   */
  set useExponentialShadowMap(e) {
    const t = this._validateFilter(C.FILTER_EXPONENTIALSHADOWMAP);
    !e && this.filter !== C.FILTER_EXPONENTIALSHADOWMAP || (this.filter = e ? t : C.FILTER_NONE);
  }
  /**
   * Gets if the current filter is set to filtered ESM.
   */
  get useBlurExponentialShadowMap() {
    return this.filter === C.FILTER_BLUREXPONENTIALSHADOWMAP;
  }
  /**
   * Gets if the current filter is set to filtered  ESM.
   */
  set useBlurExponentialShadowMap(e) {
    const t = this._validateFilter(C.FILTER_BLUREXPONENTIALSHADOWMAP);
    !e && this.filter !== C.FILTER_BLUREXPONENTIALSHADOWMAP || (this.filter = e ? t : C.FILTER_NONE);
  }
  /**
   * Gets if the current filter is set to "close ESM" (using the inverse of the
   * exponential to prevent steep falloff artifacts).
   */
  get useCloseExponentialShadowMap() {
    return this.filter === C.FILTER_CLOSEEXPONENTIALSHADOWMAP;
  }
  /**
   * Sets the current filter to "close ESM" (using the inverse of the
   * exponential to prevent steep falloff artifacts).
   */
  set useCloseExponentialShadowMap(e) {
    const t = this._validateFilter(C.FILTER_CLOSEEXPONENTIALSHADOWMAP);
    !e && this.filter !== C.FILTER_CLOSEEXPONENTIALSHADOWMAP || (this.filter = e ? t : C.FILTER_NONE);
  }
  /**
   * Gets if the current filter is set to filtered "close ESM" (using the inverse of the
   * exponential to prevent steep falloff artifacts).
   */
  get useBlurCloseExponentialShadowMap() {
    return this.filter === C.FILTER_BLURCLOSEEXPONENTIALSHADOWMAP;
  }
  /**
   * Sets the current filter to filtered "close ESM" (using the inverse of the
   * exponential to prevent steep falloff artifacts).
   */
  set useBlurCloseExponentialShadowMap(e) {
    const t = this._validateFilter(C.FILTER_BLURCLOSEEXPONENTIALSHADOWMAP);
    !e && this.filter !== C.FILTER_BLURCLOSEEXPONENTIALSHADOWMAP || (this.filter = e ? t : C.FILTER_NONE);
  }
  /**
   * Gets if the current filter is set to "PCF" (percentage closer filtering).
   */
  get usePercentageCloserFiltering() {
    return this.filter === C.FILTER_PCF;
  }
  /**
   * Sets the current filter to "PCF" (percentage closer filtering).
   */
  set usePercentageCloserFiltering(e) {
    const t = this._validateFilter(C.FILTER_PCF);
    !e && this.filter !== C.FILTER_PCF || (this.filter = e ? t : C.FILTER_NONE);
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
    return this.filter === C.FILTER_PCSS;
  }
  /**
   * Sets the current filter to "PCSS" (contact hardening).
   */
  set useContactHardeningShadow(e) {
    const t = this._validateFilter(C.FILTER_PCSS);
    !e && this.filter !== C.FILTER_PCSS || (this.filter = e ? t : C.FILTER_NONE);
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
    return C.CLASSNAME;
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
    this.onBeforeShadowMapRenderObservable = new z(), this.onAfterShadowMapRenderObservable = new z(), this.onBeforeShadowMapRenderMeshObservable = new z(), this.onAfterShadowMapRenderMeshObservable = new z(), this._bias = 5e-5, this._normalBias = 0, this._blurBoxOffset = 1, this._blurScale = 2, this._blurKernel = 1, this._useKernelBlur = !1, this._filter = C.FILTER_NONE, this._filteringQuality = C.QUALITY_HIGH, this._contactHardeningLightSizeUVRatio = 0.1, this._darkness = 0, this._transparencyShadow = !1, this.enableSoftTransparentShadow = !1, this.useOpacityTextureForTransparentShadow = !1, this.frustumEdgeFalloff = 0, this.forceBackFacesOnly = !1, this._lightDirection = R.Zero(), this._viewMatrix = F.Zero(), this._projectionMatrix = F.Zero(), this._transformMatrix = F.Zero(), this._cachedPosition = new R(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE), this._cachedDirection = new R(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE), this._currentFaceIndex = 0, this._currentFaceIndexCache = 0, this._defaultTextureMatrix = F.Identity(), this._mapSize = e, this._light = t, this._scene = t.getScene(), this._camera = s ?? null;
    let r = t._shadowGenerators;
    r || (r = t._shadowGenerators = /* @__PURE__ */ new Map()), r.set(this._camera, this), this.id = t.id, this._useUBO = this._scene.getEngine().supportsUniformBuffers, this._useUBO && (this._sceneUBOs = [], this._sceneUBOs.push(this._scene.createSceneUniformBuffer(`Scene for Shadow Generator (light "${this._light.name}")`))), C._SceneComponentInitialization(this._scene);
    const n = this._scene.getEngine().getCaps();
    i ? n.textureFloatRender && n.textureFloatLinearFiltering ? this._textureType = 1 : n.textureHalfFloatRender && n.textureHalfFloatLinearFiltering ? this._textureType = 2 : this._textureType = 0 : n.textureHalfFloatRender && n.textureHalfFloatLinearFiltering ? this._textureType = 2 : n.textureFloatRender && n.textureFloatLinearFiltering ? this._textureType = 1 : this._textureType = 0, this._initializeGenerator(), this._applyFilterValues();
  }
  _initializeGenerator() {
    this._light._markMeshesAsLightDirty(), this._initializeShadowMap();
  }
  _createTargetRenderTexture() {
    const e = this._scene.getEngine();
    e._features.supportDepthStencilTexture ? (this._shadowMap = new te(this._light.name + "_shadowMap", this._mapSize, this._scene, !1, !0, this._textureType, this._light.needCube(), void 0, !1, !1), this._shadowMap.createDepthStencilTexture(e.useReverseDepthBuffer ? 516 : 513, !0)) : this._shadowMap = new te(this._light.name + "_shadowMap", this._mapSize, this._scene, !1, !0, this._textureType, this._light.needCube());
  }
  _initializeShadowMap() {
    if (this._createTargetRenderTexture(), this._shadowMap === null)
      return;
    this._shadowMap.wrapU = m.CLAMP_ADDRESSMODE, this._shadowMap.wrapV = m.CLAMP_ADDRESSMODE, this._shadowMap.anisotropicFilteringLevel = 1, this._shadowMap.updateSamplingMode(m.BILINEAR_SAMPLINGMODE), this._shadowMap.renderParticles = !1, this._shadowMap.ignoreCameraViewport = !0, this._storedUniqueId && (this._shadowMap.uniqueId = this._storedUniqueId), this._shadowMap.customRenderFunction = this._renderForShadowMap.bind(this), this._shadowMap.customIsReadyFunction = () => !0;
    const e = this._scene.getEngine();
    this._shadowMap.onBeforeBindObservable.add(() => {
      var s;
      this._currentSceneUBO = this._scene.getSceneUniformBuffer(), (s = e._debugPushGroup) === null || s === void 0 || s.call(e, `shadow map generation for pass id ${e.currentRenderPassId}`, 1);
    }), this._shadowMap.onBeforeRenderObservable.add((s) => {
      this._sceneUBOs && this._scene.setSceneUniformBuffer(this._sceneUBOs[0]), this._currentFaceIndex = s, this._filter === C.FILTER_PCF && e.setColorWrite(!1), this.getTransformMatrix(), this._scene.setTransformMatrix(this._viewMatrix, this._projectionMatrix), this._useUBO && (this._scene.getSceneUniformBuffer().unbindEffect(), this._scene.finalizeSceneUbo());
    }), this._shadowMap.onAfterUnbindObservable.add(() => {
      var s, r;
      if (this._sceneUBOs && this._scene.setSceneUniformBuffer(this._currentSceneUBO), this._scene.updateTransformMatrix(), this._filter === C.FILTER_PCF && e.setColorWrite(!0), !this.useBlurExponentialShadowMap && !this.useBlurCloseExponentialShadowMap) {
        (s = e._debugPopGroup) === null || s === void 0 || s.call(e, 1);
        return;
      }
      const n = this.getShadowMapForRendering();
      n && (this._scene.postProcessManager.directRender(this._blurPostProcesses, n.renderTarget, !0), e.unBindFramebuffer(n.renderTarget, !0), (r = e._debugPopGroup) === null || r === void 0 || r.call(e, 1));
    });
    const t = new Ce(0, 0, 0, 0), i = new Ce(1, 1, 1, 1);
    this._shadowMap.onClearObservable.add((s) => {
      this._filter === C.FILTER_PCF ? s.clear(i, !1, !0, !1) : this.useExponentialShadowMap || this.useBlurExponentialShadowMap ? s.clear(t, !0, !0, !1) : s.clear(i, !0, !0, !1);
    }), this._shadowMap.onResizeObservable.add((s) => {
      this._storedUniqueId = this._shadowMap.uniqueId, this._mapSize = s.getRenderSize(), this._light._markMeshesAsLightDirty(), this.recreateShadowMap();
    });
    for (let s = Ft.MIN_RENDERINGGROUPS; s < Ft.MAX_RENDERINGGROUPS; s++)
      this._shadowMap.setRenderingAutoClearDepthStencil(s, !1);
  }
  _initializeBlurRTTAndPostProcesses() {
    const e = this._scene.getEngine(), t = this._mapSize / this.blurScale;
    (!this.useKernelBlur || this.blurScale !== 1) && (this._shadowMap2 = new te(this._light.name + "_shadowMap2", t, this._scene, !1, !0, this._textureType, void 0, void 0, !1), this._shadowMap2.wrapU = m.CLAMP_ADDRESSMODE, this._shadowMap2.wrapV = m.CLAMP_ADDRESSMODE, this._shadowMap2.updateSamplingMode(m.BILINEAR_SAMPLINGMODE)), this.useKernelBlur ? (this._kernelBlurXPostprocess = new he(this._light.name + "KernelBlurX", new Ae(1, 0), this.blurKernel, 1, null, m.BILINEAR_SAMPLINGMODE, e, !1, this._textureType), this._kernelBlurXPostprocess.width = t, this._kernelBlurXPostprocess.height = t, this._kernelBlurXPostprocess.externalTextureSamplerBinding = !0, this._kernelBlurXPostprocess.onApplyObservable.add((i) => {
      i.setTexture("textureSampler", this._shadowMap);
    }), this._kernelBlurYPostprocess = new he(this._light.name + "KernelBlurY", new Ae(0, 1), this.blurKernel, 1, null, m.BILINEAR_SAMPLINGMODE, e, !1, this._textureType), this._kernelBlurXPostprocess.autoClear = !1, this._kernelBlurYPostprocess.autoClear = !1, this._textureType === 0 && (this._kernelBlurXPostprocess.packedFloat = !0, this._kernelBlurYPostprocess.packedFloat = !0), this._blurPostProcesses = [this._kernelBlurXPostprocess, this._kernelBlurYPostprocess]) : (this._boxBlurPostprocess = new X(this._light.name + "DepthBoxBlur", "depthBoxBlur", ["screenSize", "boxOffset"], [], 1, null, m.BILINEAR_SAMPLINGMODE, e, !1, "#define OFFSET " + this._blurBoxOffset, this._textureType), this._boxBlurPostprocess.externalTextureSamplerBinding = !0, this._boxBlurPostprocess.onApplyObservable.add((i) => {
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
    const f = n._getWorldMatrixDeterminant() < 0;
    let h = (i = r.overrideMaterialSideOrientation) !== null && i !== void 0 ? i : l.sideOrientation;
    f && (h = h === 0 ? 1 : 0);
    const c = h === 0;
    o.setState(l.backFaceCulling, void 0, void 0, c, l.cullBackFaces);
    const p = r._getInstancesRenderList(e._id, !!e.getReplacementMesh());
    if (p.mustReturn)
      return;
    const E = o.getCaps().instancedArrays && (p.visibleInstances[e._id] !== null && p.visibleInstances[e._id] !== void 0 || r.hasThinInstances);
    if (!(this.customAllowRendering && !this.customAllowRendering(e)))
      if (this.isReady(e, E, t)) {
        e._renderId = a.getRenderId();
        const g = l.shadowDepthWrapper, _ = (s = g == null ? void 0 : g.getEffect(e, this, o.currentRenderPassId)) !== null && s !== void 0 ? s : e._getDrawWrapper(), S = gt.GetEffect(_);
        o.enableEffect(_), E || r._bind(e, S, l.fillMode), this.getTransformMatrix(), S.setFloat3("biasAndScaleSM", this.bias, this.normalBias, this.depthScale), this.getLight().getTypeID() === Je.LIGHTTYPEID_DIRECTIONALLIGHT ? S.setVector3("lightDataSM", this._cachedDirection) : S.setVector3("lightDataSM", this._cachedPosition);
        const I = this._getCamera();
        if (I && S.setFloat2("depthValuesSM", this.getLight().getDepthMinZ(I), this.getLight().getDepthMinZ(I) + this.getLight().getDepthMaxZ(I)), t && this.enableSoftTransparentShadow && S.setFloat("softTransparentShadowSM", n.visibility * l.alpha), g)
          e._setMainDrawWrapperOverride(_), g.standalone ? g.baseMaterial.bindForSubMesh(n.getWorldMatrix(), r, e) : l.bindForSubMesh(n.getWorldMatrix(), r, e), e._setMainDrawWrapperOverride(null);
        else {
          if (this._opacityTexture && (S.setTexture("diffuseSampler", this._opacityTexture), S.setMatrix("diffuseMatrix", this._opacityTexture.getTextureMatrix() || this._defaultTextureMatrix)), r.useBones && r.computeBonesUsingShaders && r.skeleton) {
            const P = r.skeleton;
            if (P.isUsingTextureForMatrices) {
              const N = P.getTransformMatrixTexture(r);
              if (!N)
                return;
              S.setTexture("boneSampler", N), S.setFloat("boneTextureWidth", 4 * (P.bones.length + 1));
            } else
              S.setMatrices("mBones", P.getTransformMatrices(r));
          }
          D.BindMorphTargetParameters(r, S), r.morphTargetManager && r.morphTargetManager.isUsingTextureForTargets && r.morphTargetManager._bind(S), at(S, l, a);
        }
        !this._useUBO && !g && this._bindCustomEffectForRenderSubMeshForShadowMap(e, S, n), D.BindSceneUniformBuffer(S, this._scene.getSceneUniformBuffer()), this._scene.getSceneUniformBuffer().bindUniformBuffer();
        const M = n.getWorldMatrix();
        E && (n.getMeshUniformBuffer().bindToEffect(S, "Mesh"), n.transferToEffect(M)), this.forceBackFacesOnly && o.setState(!0, 0, !1, !0, l.cullBackFaces), this.onBeforeShadowMapRenderMeshObservable.notifyObservers(r), this.onBeforeShadowMapRenderObservable.notifyObservers(S), r._processRendering(n, e, S, l.fillMode, p, E, (P, N) => {
          n !== r && !P ? (r.getMeshUniformBuffer().bindToEffect(S, "Mesh"), r.transferToEffect(N)) : (n.getMeshUniformBuffer().bindToEffect(S, "Mesh"), n.transferToEffect(P ? N : M));
        }), this.forceBackFacesOnly && o.setState(!0, 0, !1, !1, l.cullBackFaces), this.onAfterShadowMapRenderObservable.notifyObservers(S), this.onAfterShadowMapRenderMeshObservable.notifyObservers(r);
      } else
        this._shadowMap && this._shadowMap.resetRefreshCounter();
  }
  _applyFilterValues() {
    this._shadowMap && (this.filter === C.FILTER_NONE || this.filter === C.FILTER_PCSS ? this._shadowMap.updateSamplingMode(m.NEAREST_SAMPLINGMODE) : this._shadowMap.updateSamplingMode(m.BILINEAR_SAMPLINGMODE));
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
      var l, f;
      if (!(!this._scene || !this._scene.getEngine())) {
        for (; this.isReady(n[a], i.useInstances, (f = (l = n[a].getMaterial()) === null || l === void 0 ? void 0 : l.needAlphaBlendingForMesh(n[a].getMesh())) !== null && f !== void 0 ? f : !1); )
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
    return i.push("#define SM_NORMALBIAS " + (this.normalBias && r.isVerticesDataPresent(L.NormalKind) ? "1" : "0")), i.push("#define SM_DIRECTIONINLIGHTDATA " + (this.getLight().getTypeID() === Je.LIGHTTYPEID_DIRECTIONALLIGHT ? "1" : "0")), i.push("#define SM_USEDISTANCE " + (this._light.needCube() ? "1" : "0")), i.push("#define SM_SOFTTRANSPARENTSHADOW " + (this.enableSoftTransparentShadow && s ? "1" : "0")), this._isReadyCustomDefines(i, e, t), i;
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
      let l = o.effect, f = o.defines;
      const h = [L.PositionKind], c = e.getMesh();
      this.normalBias && c.isVerticesDataPresent(L.NormalKind) && (h.push(L.NormalKind), a.push("#define NORMAL"), c.nonUniformScaling && a.push("#define NONUNIFORMSCALING"));
      const p = r.needAlphaTesting();
      if ((p || r.needAlphaBlending()) && (this.useOpacityTextureForTransparentShadow ? this._opacityTexture = r.opacityTexture : this._opacityTexture = r.getAlphaTestTexture(), this._opacityTexture)) {
        if (!this._opacityTexture.isReady())
          return !1;
        const I = (s = r.alphaCutOff) !== null && s !== void 0 ? s : C.DEFAULT_ALPHA_CUTOFF;
        a.push("#define ALPHATEXTURE"), p && a.push(`#define ALPHATESTVALUE ${I}${I % 1 === 0 ? "." : ""}`), c.isVerticesDataPresent(L.UVKind) && (h.push(L.UVKind), a.push("#define UV1")), c.isVerticesDataPresent(L.UV2Kind) && this._opacityTexture.coordinatesIndex === 1 && (h.push(L.UV2Kind), a.push("#define UV2"));
      }
      const E = new Et();
      if (c.useBones && c.computeBonesUsingShaders && c.skeleton) {
        h.push(L.MatricesIndicesKind), h.push(L.MatricesWeightsKind), c.numBoneInfluencers > 4 && (h.push(L.MatricesIndicesExtraKind), h.push(L.MatricesWeightsExtraKind));
        const I = c.skeleton;
        a.push("#define NUM_BONE_INFLUENCERS " + c.numBoneInfluencers), c.numBoneInfluencers > 0 && E.addCPUSkinningFallback(0, c), I.isUsingTextureForMatrices ? a.push("#define BONETEXTURE") : a.push("#define BonesPerMesh " + (I.bones.length + 1));
      } else
        a.push("#define NUM_BONE_INFLUENCERS 0");
      const g = c.morphTargetManager;
      let _ = 0;
      if (g && g.numInfluencers > 0 && (a.push("#define MORPHTARGETS"), _ = g.numInfluencers, a.push("#define NUM_MORPH_INFLUENCERS " + _), g.isUsingTextureForTargets && a.push("#define MORPHTARGETS_TEXTURE"), D.PrepareAttributesForMorphTargetsInfluencers(h, c, _)), Nt(r, this._scene, a), t && (a.push("#define INSTANCES"), D.PushAttributesForInstances(h), e.getRenderingMesh().hasThinInstances && a.push("#define THIN_INSTANCES")), this.customShaderOptions && this.customShaderOptions.defines)
        for (const I of this.customShaderOptions.defines)
          a.indexOf(I) === -1 && a.push(I);
      const S = a.join(`
`);
      if (f !== S) {
        f = S;
        let I = "shadowMap";
        const M = [
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
        ], P = ["diffuseSampler", "boneSampler", "morphTargets"], N = ["Scene", "Mesh"];
        if (nt(M), this.customShaderOptions) {
          if (I = this.customShaderOptions.shaderName, this.customShaderOptions.attributes)
            for (const b of this.customShaderOptions.attributes)
              h.indexOf(b) === -1 && h.push(b);
          if (this.customShaderOptions.uniforms)
            for (const b of this.customShaderOptions.uniforms)
              M.indexOf(b) === -1 && M.push(b);
          if (this.customShaderOptions.samplers)
            for (const b of this.customShaderOptions.samplers)
              P.indexOf(b) === -1 && P.push(b);
        }
        const W = this._scene.getEngine();
        l = W.createEffect(I, {
          attributes: h,
          uniformsNames: M,
          uniformBuffersNames: N,
          samplers: P,
          defines: S,
          fallbacks: E,
          onCompiled: null,
          onError: null,
          indexParameters: { maxSimultaneousMorphTargets: _ }
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
    !i.shadowsEnabled || !s.shadowEnabled || (e["SHADOW" + t] = !0, this.useContactHardeningShadow ? (e["SHADOWPCSS" + t] = !0, this._filteringQuality === C.QUALITY_LOW ? e["SHADOWLOWQUALITY" + t] = !0 : this._filteringQuality === C.QUALITY_MEDIUM && (e["SHADOWMEDIUMQUALITY" + t] = !0)) : this.usePercentageCloserFiltering ? (e["SHADOWPCF" + t] = !0, this._filteringQuality === C.QUALITY_LOW ? e["SHADOWLOWQUALITY" + t] = !0 : this._filteringQuality === C.QUALITY_MEDIUM && (e["SHADOWMEDIUMQUALITY" + t] = !0)) : this.usePoissonSampling ? e["SHADOWPOISSON" + t] = !0 : this.useExponentialShadowMap || this.useBlurExponentialShadowMap ? e["SHADOWESM" + t] = !0 : (this.useCloseExponentialShadowMap || this.useBlurCloseExponentialShadowMap) && (e["SHADOWCLOSEESM" + t] = !0), s.needCube() && (e["SHADOWCUBE" + t] = !0));
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
    n && (i.needCube() || t.setMatrix("lightMatrix" + e, this.getTransformMatrix()), this._filter === C.FILTER_PCF ? (t.setDepthStencilTexture("shadowSampler" + e, this.getShadowMapForRendering()), i._uniformBuffer.updateFloat4("shadowsInfo", this.getDarkness(), n.getSize().width, 1 / n.getSize().width, this.frustumEdgeFalloff, e)) : this._filter === C.FILTER_PCSS ? (t.setDepthStencilTexture("shadowSampler" + e, this.getShadowMapForRendering()), t.setTexture("depthSampler" + e, this.getShadowMapForRendering()), i._uniformBuffer.updateFloat4("shadowsInfo", this.getDarkness(), 1 / n.getSize().width, this._contactHardeningLightSizeUVRatio * n.getSize().width, this.frustumEdgeFalloff, e)) : (t.setTexture("shadowSampler" + e, this.getShadowMapForRendering()), i._uniformBuffer.updateFloat4("shadowsInfo", this.getDarkness(), this.blurScale / n.getSize().width, this.depthScale, this.frustumEdgeFalloff, e)), i._uniformBuffer.updateFloat2("depthValues", this.getLight().getDepthMinZ(r), this.getLight().getDepthMinZ(r) + this.getLight().getDepthMaxZ(r), e));
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
    if (this._light.computeTransformedInformation() && (t = this._light.transformedPosition), R.NormalizeToRef(this._light.getShadowDirection(this._currentFaceIndex), this._lightDirection), Math.abs(R.Dot(this._lightDirection, R.Up())) === 1 && (this._lightDirection.z = 1e-13), this._light.needProjectionMatrixCompute() || !this._cachedPosition || !this._cachedDirection || !t.equals(this._cachedPosition) || !this._lightDirection.equals(this._cachedDirection)) {
      this._cachedPosition.copyFrom(t), this._cachedDirection.copyFrom(this._lightDirection), F.LookAtLHToRef(t, t.add(this._lightDirection), R.Up(), this._viewMatrix);
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
    const s = t.getLightById(e.lightId), r = e.cameraId !== void 0 ? t.getCameraById(e.cameraId) : null, n = i ? i(e.mapSize, s, r) : new C(e.mapSize, s, void 0, r), a = n.getShadowMap();
    for (let o = 0; o < e.renderList.length; o++)
      t.getMeshesById(e.renderList[o]).forEach(function(f) {
        a && (a.renderList || (a.renderList = []), a.renderList.push(f));
      });
    return e.id !== void 0 && (n.id = e.id), n.forceBackFacesOnly = !!e.forceBackFacesOnly, e.darkness !== void 0 && n.setDarkness(e.darkness), e.transparencyShadow && n.setTransparencyShadow(!0), e.frustumEdgeFalloff !== void 0 && (n.frustumEdgeFalloff = e.frustumEdgeFalloff), e.bias !== void 0 && (n.bias = e.bias), e.normalBias !== void 0 && (n.normalBias = e.normalBias), e.usePercentageCloserFiltering ? n.usePercentageCloserFiltering = !0 : e.useContactHardeningShadow ? n.useContactHardeningShadow = !0 : e.usePoissonSampling ? n.usePoissonSampling = !0 : e.useExponentialShadowMap ? n.useExponentialShadowMap = !0 : e.useBlurExponentialShadowMap ? n.useBlurExponentialShadowMap = !0 : e.useCloseExponentialShadowMap ? n.useCloseExponentialShadowMap = !0 : e.useBlurCloseExponentialShadowMap ? n.useBlurCloseExponentialShadowMap = !0 : e.useVarianceShadowMap ? n.useExponentialShadowMap = !0 : e.useBlurVarianceShadowMap && (n.useBlurExponentialShadowMap = !0), e.contactHardeningLightSizeUVRatio !== void 0 && (n.contactHardeningLightSizeUVRatio = e.contactHardeningLightSizeUVRatio), e.filteringQuality !== void 0 && (n.filteringQuality = e.filteringQuality), e.depthScale && (n.depthScale = e.depthScale), e.blurScale && (n.blurScale = e.blurScale), e.blurBoxOffset && (n.blurBoxOffset = e.blurBoxOffset), e.useKernelBlur && (n.useKernelBlur = e.useKernelBlur), e.blurKernel && (n.blurKernel = e.blurKernel), n;
  }
}
C.CLASSNAME = "ShadowGenerator";
C.FILTER_NONE = 0;
C.FILTER_EXPONENTIALSHADOWMAP = 1;
C.FILTER_POISSONSAMPLING = 2;
C.FILTER_BLUREXPONENTIALSHADOWMAP = 3;
C.FILTER_CLOSEEXPONENTIALSHADOWMAP = 4;
C.FILTER_BLURCLOSEEXPONENTIALSHADOWMAP = 5;
C.FILTER_PCF = 6;
C.FILTER_PCSS = 7;
C.QUALITY_HIGH = 0;
C.QUALITY_MEDIUM = 1;
C.QUALITY_LOW = 2;
C.DEFAULT_ALPHA_CUTOFF = 0.5;
C._SceneComponentInitialization = (d) => {
  throw Ne("ShadowGeneratorSceneComponent");
};
const ps = "depthPixelShader", _s = `#ifdef ALPHATEST
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
x.ShadersStore[ps] = _s;
const ms = "depthVertexShader", gs = `attribute vec3 position;
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
x.ShadersStore[ms] = gs;
class Tt {
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
  constructor(e, t = 1, i = null, s = !1, r = m.TRILINEAR_SAMPLINGMODE, n = !1, a) {
    this.enabled = !0, this.forceDepthWriteTransparentMeshes = !1, this.useOnlyInActiveCamera = !1, this.reverseCulling = !1, this._scene = e, this._storeNonLinearDepth = s, this._storeCameraSpaceZ = n, this.isPacked = t === 0, this.isPacked ? this.clearColor = new Ce(1, 1, 1, 1) : this.clearColor = new Ce(n ? 1e8 : 1, 0, 0, 1), Tt._SceneComponentInitialization(this._scene);
    const o = e.getEngine();
    this._camera = i, r !== m.NEAREST_SAMPLINGMODE && (t === 1 && !o._caps.textureFloatLinearFiltering && (r = m.NEAREST_SAMPLINGMODE), t === 2 && !o._caps.textureHalfFloatLinearFiltering && (r = m.NEAREST_SAMPLINGMODE));
    const l = this.isPacked || !o._features.supportExtendedTextureFormats ? 5 : 6;
    this._depthMap = new te(a ?? "DepthRenderer", { width: o.getRenderWidth(), height: o.getRenderHeight() }, this._scene, !1, !0, t, !1, r, void 0, void 0, void 0, l), this._depthMap.wrapU = m.CLAMP_ADDRESSMODE, this._depthMap.wrapV = m.CLAMP_ADDRESSMODE, this._depthMap.refreshRate = 1, this._depthMap.renderParticles = !1, this._depthMap.renderList = null, this._depthMap.activeCamera = this._camera, this._depthMap.ignoreCameraViewport = !0, this._depthMap.useCameraPostProcesses = !1, this._depthMap.onClearObservable.add((h) => {
      h.clear(this.clearColor, !0, !0, !0);
    }), this._depthMap.onBeforeBindObservable.add(() => {
      var h;
      (h = o._debugPushGroup) === null || h === void 0 || h.call(o, "depth renderer", 1);
    }), this._depthMap.onAfterUnbindObservable.add(() => {
      var h;
      (h = o._debugPopGroup) === null || h === void 0 || h.call(o, 1);
    }), this._depthMap.customIsReadyFunction = (h, c, p) => {
      if ((p || c === 0) && h.subMeshes)
        for (let E = 0; E < h.subMeshes.length; ++E) {
          const g = h.subMeshes[E], _ = g.getRenderingMesh(), S = _._getInstancesRenderList(g._id, !!g.getReplacementMesh()), I = o.getCaps().instancedArrays && (S.visibleInstances[g._id] !== null && S.visibleInstances[g._id] !== void 0 || _.hasThinInstances);
          if (!this.isReady(g, I))
            return !1;
        }
      return !0;
    };
    const f = (h) => {
      var c, p;
      const E = h.getRenderingMesh(), g = h.getEffectiveMesh(), _ = this._scene, S = _.getEngine(), I = h.getMaterial();
      if (g._internalAbstractMeshDataInfo._isActiveIntermediate = !1, !I || g.infiniteDistance || I.disableDepthWrite || h.verticesCount === 0 || h._renderId === _.getRenderId())
        return;
      const M = g._getWorldMatrixDeterminant() < 0;
      let P = (c = E.overrideMaterialSideOrientation) !== null && c !== void 0 ? c : I.sideOrientation;
      M && (P = P === 0 ? 1 : 0);
      const N = P === 0;
      S.setState(I.backFaceCulling, 0, !1, N, this.reverseCulling ? !I.cullBackFaces : I.cullBackFaces);
      const W = E._getInstancesRenderList(h._id, !!h.getReplacementMesh());
      if (W.mustReturn)
        return;
      const b = S.getCaps().instancedArrays && (W.visibleInstances[h._id] !== null && W.visibleInstances[h._id] !== void 0 || E.hasThinInstances), O = this._camera || _.activeCamera;
      if (this.isReady(h, b) && O) {
        h._renderId = _.getRenderId();
        const y = (p = g._internalAbstractMeshDataInfo._materialForRenderPass) === null || p === void 0 ? void 0 : p[S.currentRenderPassId];
        let U = h._getDrawWrapper();
        !U && y && (U = y._getDrawWrapper());
        const Se = O.mode === ie.ORTHOGRAPHIC_CAMERA;
        if (!U)
          return;
        const H = U.effect;
        S.enableEffect(U), b || E._bind(h, H, I.fillMode), y ? y.bindForSubMesh(g.getWorldMatrix(), g, h) : (H.setMatrix("viewProjection", _.getTransformMatrix()), H.setMatrix("world", g.getWorldMatrix()), this._storeCameraSpaceZ && H.setMatrix("view", _.getViewMatrix()));
        let re, de;
        if (Se ? (re = !S.useReverseDepthBuffer && S.isNDCHalfZRange ? 0 : 1, de = S.useReverseDepthBuffer && S.isNDCHalfZRange ? 0 : 1) : (re = S.useReverseDepthBuffer && S.isNDCHalfZRange ? O.minZ : S.isNDCHalfZRange ? 0 : O.minZ, de = S.useReverseDepthBuffer && S.isNDCHalfZRange ? 0 : O.maxZ), H.setFloat2("depthValues", re, re + de), !y) {
          if (I.needAlphaTesting()) {
            const J = I.getAlphaTestTexture();
            J && (H.setTexture("diffuseSampler", J), H.setMatrix("diffuseMatrix", J.getTextureMatrix()));
          }
          if (E.useBones && E.computeBonesUsingShaders && E.skeleton) {
            const J = E.skeleton;
            if (J.isUsingTextureForMatrices) {
              const _e = J.getTransformMatrixTexture(E);
              if (!_e)
                return;
              H.setTexture("boneSampler", _e), H.setFloat("boneTextureWidth", 4 * (J.bones.length + 1));
            } else
              H.setMatrices("mBones", J.getTransformMatrices(E));
          }
          at(H, I, _), D.BindMorphTargetParameters(E, H), E.morphTargetManager && E.morphTargetManager.isUsingTextureForTargets && E.morphTargetManager._bind(H);
        }
        E._processRendering(g, h, H, I.fillMode, W, b, (J, _e) => H.setMatrix("world", _e));
      }
    };
    this._depthMap.customRenderFunction = (h, c, p, E) => {
      let g;
      if (E.length)
        for (g = 0; g < E.length; g++)
          f(E.data[g]);
      for (g = 0; g < h.length; g++)
        f(h.data[g]);
      for (g = 0; g < c.length; g++)
        f(c.data[g]);
      if (this.forceDepthWriteTransparentMeshes)
        for (g = 0; g < p.length; g++)
          f(p.data[g]);
      else
        for (g = 0; g < p.length; g++)
          p.data[g].getEffectiveMesh()._internalAbstractMeshDataInfo._isActiveIntermediate = !1;
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
    const l = [], f = [L.PositionKind];
    if (o && o.needAlphaTesting() && o.getAlphaTestTexture() && (l.push("#define ALPHATEST"), r.isVerticesDataPresent(L.UVKind) && (f.push(L.UVKind), l.push("#define UV1")), r.isVerticesDataPresent(L.UV2Kind) && (f.push(L.UV2Kind), l.push("#define UV2"))), r.useBones && r.computeBonesUsingShaders) {
      f.push(L.MatricesIndicesKind), f.push(L.MatricesWeightsKind), r.numBoneInfluencers > 4 && (f.push(L.MatricesIndicesExtraKind), f.push(L.MatricesWeightsExtraKind)), l.push("#define NUM_BONE_INFLUENCERS " + r.numBoneInfluencers), l.push("#define BonesPerMesh " + (r.skeleton ? r.skeleton.bones.length + 1 : 0));
      const _ = e.getRenderingMesh().skeleton;
      _ != null && _.isUsingTextureForMatrices && l.push("#define BONETEXTURE");
    } else
      l.push("#define NUM_BONE_INFLUENCERS 0");
    const h = r.morphTargetManager;
    let c = 0;
    h && h.numInfluencers > 0 && (c = h.numInfluencers, l.push("#define MORPHTARGETS"), l.push("#define NUM_MORPH_INFLUENCERS " + c), h.isUsingTextureForTargets && l.push("#define MORPHTARGETS_TEXTURE"), D.PrepareAttributesForMorphTargetsInfluencers(f, r, c)), t && (l.push("#define INSTANCES"), D.PushAttributesForInstances(f), e.getRenderingMesh().hasThinInstances && l.push("#define THIN_INSTANCES")), this._storeNonLinearDepth && l.push("#define NONLINEARDEPTH"), this._storeCameraSpaceZ && l.push("#define STORE_CAMERASPACE_Z"), this.isPacked && l.push("#define PACKED"), Nt(o, n, l);
    const p = e._getDrawWrapper(void 0, !0), E = p.defines, g = l.join(`
`);
    if (E !== g) {
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
      nt(_), p.setEffect(s.createEffect("depth", f, _, ["diffuseSampler", "morphTargets", "boneSampler"], g, void 0, void 0, void 0, {
        maxSimultaneousMorphTargets: c
      }), g);
    }
    return p.effect.isReady();
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
Tt._SceneComponentInitialization = (d) => {
  throw Ne("DepthRendererSceneComponent");
};
const vs = "minmaxReduxPixelShader", Es = `varying vec2 vUV;
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
x.ShadersStore[vs] = Es;
class Ss {
  /**
   * Creates a min/max reducer
   * @param camera The camera to use for the post processes
   */
  constructor(e) {
    this.onAfterReductionPerformed = new z(), this._forceFullscreenViewport = !0, this._activated = !1, this._camera = e, this._postProcessManager = new jt(e.getScene()), this._onContextRestoredObserver = e.getEngine().onContextRestoredObservable.add(() => {
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
    const r = this._camera.getScene(), n = new X(
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
    n.onApply = ((f, h) => (c) => {
      c.setTexture("sourceTexture", this._sourceTexture), c.setFloat2("texSize", f, h);
    })(a, o), this._reductionSteps.push(n);
    let l = 1;
    for (; a > 1 || o > 1; ) {
      a = Math.max(Math.round(a / 2), 1), o = Math.max(Math.round(o / 2), 1);
      const f = new X(
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
      if (f.autoClear = !1, f.forceFullscreenViewport = s, f.onApply = ((h, c) => (p) => {
        h == 1 || c == 1 ? p.setInt2("texSize", h, c) : p.setFloat2("texSize", h, c);
      })(a, o), this._reductionSteps.push(f), l++, a == 1 && o == 1) {
        const h = (c, p, E) => {
          const g = new Float32Array(4 * c * p), _ = { min: 0, max: 0 };
          return () => {
            r.getEngine()._readTexturePixels(E.inputTexture.texture, c, p, -1, 0, g, !1), _.min = g[0], _.max = g[1], this.onAfterReductionPerformed.notifyObservers(_);
          };
        };
        f.onAfterRenderObservable.add(h(a, o, f));
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
class Ts extends Ss {
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
    this._depthRenderer && (delete s._depthRenderer[this._depthRendererId], this._depthRenderer.dispose(), this._depthRenderer = null), e === null && (s._depthRenderer || (s._depthRenderer = {}), e = this._depthRenderer = new Tt(s, t, this._camera, !1, 1), e.enabled = !1, this._depthRendererId = "minmax" + this._camera.id, s._depthRenderer[this._depthRendererId] = e), super.setSourceTexture(e.getDepthMap(), !0, t, i);
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
const Ht = R.Up(), xs = R.Zero(), G = new R(), We = new R(), dt = new F();
class $ extends C {
  _validateFilter(e) {
    return e === C.FILTER_NONE || e === C.FILTER_PCF || e === C.FILTER_PCSS ? e : (console.error('Unsupported filter "' + e + '"!'), C.FILTER_NONE);
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
      this._depthReducer || (this._depthReducer = new Ts(t), this._depthReducer.onAfterReductionPerformed.add((i) => {
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
    const t = e.minZ, i = e.maxZ, s = i - t, r = this._minDistance, n = this._shadowMaxZ < i && this._shadowMaxZ >= t ? Math.min((this._shadowMaxZ - t) / (i - t), this._maxDistance) : this._maxDistance, a = t + r * s, o = t + n * s, l = o - a, f = o / a;
    for (let h = 0; h < this._cascades.length; ++h) {
      const c = (h + 1) / this._numCascades, p = a * f ** c, E = a + l * c, g = this._lambda * (p - E) + E;
      this._cascades[h].prevBreakDistance = h === 0 ? r : this._cascades[h - 1].breakDistance, this._cascades[h].breakDistance = (g - t) / s, this._viewSpaceFrustumsZ[h] = g, this._frustumLengths[h] = (this._cascades[h].breakDistance - this._cascades[h].prevBreakDistance) * s;
    }
    this._breaksAreDirty = !1;
  }
  _computeMatrices() {
    const e = this._scene;
    if (!this._getCamera())
      return;
    R.NormalizeToRef(this._light.getShadowDirection(0), this._lightDirection), Math.abs(R.Dot(this._lightDirection, R.Up())) === 1 && (this._lightDirection.z = 1e-13), this._cachedDirection.copyFrom(this._lightDirection);
    const i = e.getEngine().useReverseDepthBuffer;
    for (let s = 0; s < this._numCascades; ++s) {
      this._computeFrustumInWorldSpace(s), this._computeCascadeFrustum(s), this._cascadeMaxExtents[s].subtractToRef(this._cascadeMinExtents[s], G), this._frustumCenter[s].addToRef(this._lightDirection.scale(this._cascadeMinExtents[s].z), this._shadowCameraPos[s]), F.LookAtLHToRef(this._shadowCameraPos[s], this._frustumCenter[s], Ht, this._viewMatrices[s]);
      let r = 0, n = G.z;
      const a = this._shadowCastersBoundingInfo;
      a.update(this._viewMatrices[s]), n = Math.min(n, a.boundingBox.maximumWorld.z), !this._depthClamp || this.filter === C.FILTER_PCSS ? r = Math.min(r, a.boundingBox.minimumWorld.z) : r = Math.max(r, a.boundingBox.minimumWorld.z), F.OrthoOffCenterLHToRef(this._cascadeMinExtents[s].x, this._cascadeMaxExtents[s].x, this._cascadeMinExtents[s].y, this._cascadeMaxExtents[s].y, i ? n : r, i ? r : n, this._projectionMatrices[s], e.getEngine().isNDCHalfZRange), this._cascadeMinExtents[s].z = r, this._cascadeMaxExtents[s].z = n, this._viewMatrices[s].multiplyToRef(this._projectionMatrices[s], this._transformMatrices[s]), R.TransformCoordinatesToRef(xs, this._transformMatrices[s], G), G.scaleInPlace(this._mapSize / 2), We.copyFromFloats(Math.round(G.x), Math.round(G.y), Math.round(G.z)), We.subtractInPlace(G).scaleInPlace(2 / this._mapSize), F.TranslationToRef(We.x, We.y, 0, dt), this._projectionMatrices[s].multiplyToRef(dt, this._projectionMatrices[s]), this._viewMatrices[s].multiplyToRef(this._projectionMatrices[s], this._transformMatrices[s]), this._transformMatrices[s].copyToArray(this._transformMatricesAsArray, s * 16);
    }
  }
  // Get the 8 points of the view frustum in world space
  _computeFrustumInWorldSpace(e) {
    const t = this._getCamera();
    if (!t)
      return;
    const i = this._cascades[e].prevBreakDistance, s = this._cascades[e].breakDistance, r = this._scene.getEngine().isNDCHalfZRange;
    t.getViewMatrix();
    const n = F.Invert(t.getTransformationMatrix()), a = this._scene.getEngine().useReverseDepthBuffer ? 4 : 0;
    for (let o = 0; o < $._FrustumCornersNDCSpace.length; ++o)
      G.copyFrom($._FrustumCornersNDCSpace[(o + a) % $._FrustumCornersNDCSpace.length]), r && G.z === -1 && (G.z = 0), R.TransformCoordinatesToRef(G, n, this._frustumCornersWorldSpace[e][o]);
    for (let o = 0; o < $._FrustumCornersNDCSpace.length / 2; ++o)
      G.copyFrom(this._frustumCornersWorldSpace[e][o + 4]).subtractInPlace(this._frustumCornersWorldSpace[e][o]), We.copyFrom(G).scaleInPlace(i), G.scaleInPlace(s), G.addInPlace(this._frustumCornersWorldSpace[e][o]), this._frustumCornersWorldSpace[e][o + 4].copyFrom(G), this._frustumCornersWorldSpace[e][o].addInPlace(We);
  }
  _computeCascadeFrustum(e) {
    if (this._cascadeMinExtents[e].copyFromFloats(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE), this._cascadeMaxExtents[e].copyFromFloats(Number.MIN_VALUE, Number.MIN_VALUE, Number.MIN_VALUE), this._frustumCenter[e].copyFromFloats(0, 0, 0), !!this._getCamera()) {
      for (let i = 0; i < this._frustumCornersWorldSpace[e].length; ++i)
        this._frustumCenter[e].addInPlace(this._frustumCornersWorldSpace[e][i]);
      if (this._frustumCenter[e].scaleInPlace(1 / this._frustumCornersWorldSpace[e].length), this.stabilizeCascades) {
        let i = 0;
        for (let s = 0; s < this._frustumCornersWorldSpace[e].length; ++s) {
          const r = this._frustumCornersWorldSpace[e][s].subtractToRef(this._frustumCenter[e], G).length();
          i = Math.max(i, r);
        }
        i = Math.ceil(i * 16) / 16, this._cascadeMaxExtents[e].copyFromFloats(i, i, i), this._cascadeMinExtents[e].copyFromFloats(-i, -i, -i);
      } else {
        const i = this._frustumCenter[e];
        this._frustumCenter[e].addToRef(this._lightDirection, G), F.LookAtLHToRef(i, G, Ht, dt);
        for (let s = 0; s < this._frustumCornersWorldSpace[e].length; ++s)
          R.TransformCoordinatesToRef(this._frustumCornersWorldSpace[e][s], dt, G), this._cascadeMinExtents[e].minimizeInPlace(G), this._cascadeMaxExtents[e].maximizeInPlace(G);
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
    const e = st.LastCreatedEngine;
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
      ct.Error("CascadedShadowMap is not supported by the current engine.");
      return;
    }
    super(e, t, i, s), this.usePercentageCloserFiltering = !0;
  }
  _initializeGenerator() {
    var e, t, i, s, r, n, a, o, l, f, h, c, p, E, g, _, S, I, M, P;
    this.penumbraDarkness = (e = this.penumbraDarkness) !== null && e !== void 0 ? e : 1, this._numCascades = (t = this._numCascades) !== null && t !== void 0 ? t : $.DEFAULT_CASCADES_COUNT, this.stabilizeCascades = (i = this.stabilizeCascades) !== null && i !== void 0 ? i : !1, this._freezeShadowCastersBoundingInfoObservable = (s = this._freezeShadowCastersBoundingInfoObservable) !== null && s !== void 0 ? s : null, this.freezeShadowCastersBoundingInfo = (r = this.freezeShadowCastersBoundingInfo) !== null && r !== void 0 ? r : !1, this._scbiMin = (n = this._scbiMin) !== null && n !== void 0 ? n : new R(0, 0, 0), this._scbiMax = (a = this._scbiMax) !== null && a !== void 0 ? a : new R(0, 0, 0), this._shadowCastersBoundingInfo = (o = this._shadowCastersBoundingInfo) !== null && o !== void 0 ? o : new Si(new R(0, 0, 0), new R(0, 0, 0)), this._breaksAreDirty = (l = this._breaksAreDirty) !== null && l !== void 0 ? l : !0, this._minDistance = (f = this._minDistance) !== null && f !== void 0 ? f : 0, this._maxDistance = (h = this._maxDistance) !== null && h !== void 0 ? h : 1, this._currentLayer = (c = this._currentLayer) !== null && c !== void 0 ? c : 0, this._shadowMaxZ = (g = (p = this._shadowMaxZ) !== null && p !== void 0 ? p : (E = this._getCamera()) === null || E === void 0 ? void 0 : E.maxZ) !== null && g !== void 0 ? g : 1e4, this._debug = (_ = this._debug) !== null && _ !== void 0 ? _ : !1, this._depthClamp = (S = this._depthClamp) !== null && S !== void 0 ? S : !0, this._cascadeBlendPercentage = (I = this._cascadeBlendPercentage) !== null && I !== void 0 ? I : 0.1, this._lambda = (M = this._lambda) !== null && M !== void 0 ? M : 0.5, this._autoCalcDepthBounds = (P = this._autoCalcDepthBounds) !== null && P !== void 0 ? P : !1, this._recreateSceneUBOs(), super._initializeGenerator();
  }
  _createTargetRenderTexture() {
    const e = this._scene.getEngine(), t = { width: this._mapSize, height: this._mapSize, layers: this.numCascades };
    this._shadowMap = new te(
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
      }, this._viewMatrices[t] = F.Zero(), this._projectionMatrices[t] = F.Zero(), this._transformMatrices[t] = F.Zero(), this._cascadeMinExtents[t] = new R(), this._cascadeMaxExtents[t] = new R(), this._frustumCenter[t] = new R(), this._shadowCameraPos[t] = new R(), this._frustumCornersWorldSpace[t] = new Array($._FrustumCornersNDCSpace.length);
      for (let i = 0; i < $._FrustumCornersNDCSpace.length; ++i)
        this._frustumCornersWorldSpace[t][i] = new R();
    }
    const e = this._scene.getEngine();
    this._shadowMap.onBeforeBindObservable.clear(), this._shadowMap.onBeforeRenderObservable.clear(), this._shadowMap.onBeforeRenderObservable.add((t) => {
      this._sceneUBOs && this._scene.setSceneUniformBuffer(this._sceneUBOs[t]), this._currentLayer = t, this._filter === C.FILTER_PCF && e.setColorWrite(!1), this._scene.setTransformMatrix(this.getCascadeViewMatrix(t), this.getCascadeProjectionMatrix(t)), this._useUBO && (this._scene.getSceneUniformBuffer().unbindEffect(), this._scene.finalizeSceneUbo());
    }), this._shadowMap.onBeforeBindObservable.add(() => {
      var t;
      this._currentSceneUBO = this._scene.getSceneUniformBuffer(), (t = e._debugPushGroup) === null || t === void 0 || t.call(e, `cascaded shadow map generation for pass id ${e.currentRenderPassId}`, 1), this._breaksAreDirty && this._splitFrustum(), this._computeMatrices();
    }), this._splitFrustum();
  }
  _bindCustomEffectForRenderSubMeshForShadowMap(e, t) {
    t.setMatrix("viewProjection", this.getCascadeTransformMatrix(this._currentLayer));
  }
  _isReadyCustomDefines(e) {
    e.push("#define SM_DEPTHCLAMP " + (this._depthClamp && this._filter !== C.FILTER_PCSS ? "1" : "0"));
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
    if (t.setMatrices("lightMatrix" + e, this._transformMatricesAsArray), t.setArray("viewFrustumZ" + e, this._viewSpaceFrustumsZ), t.setFloat("cascadeBlendFactor" + e, this.cascadeBlendPercentage === 0 ? 1e4 : 1 / this.cascadeBlendPercentage), t.setArray("frustumLengths" + e, this._frustumLengths), this._filter === C.FILTER_PCF)
      t.setDepthStencilTexture("shadowSampler" + e, n), i._uniformBuffer.updateFloat4("shadowsInfo", this.getDarkness(), a, 1 / a, this.frustumEdgeFalloff, e);
    else if (this._filter === C.FILTER_PCSS) {
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
    const i = C.Parse(e, t, (s, r, n) => new $(s, r, void 0, n));
    return e.numCascades !== void 0 && (i.numCascades = e.numCascades), e.debug !== void 0 && (i.debug = e.debug), e.stabilizeCascades !== void 0 && (i.stabilizeCascades = e.stabilizeCascades), e.lambda !== void 0 && (i.lambda = e.lambda), e.cascadeBlendPercentage !== void 0 && (i.cascadeBlendPercentage = e.cascadeBlendPercentage), e.depthClamp !== void 0 && (i.depthClamp = e.depthClamp), e.autoCalcDepthBounds !== void 0 && (i.autoCalcDepthBounds = e.autoCalcDepthBounds), e.shadowMaxZ !== void 0 && (i.shadowMaxZ = e.shadowMaxZ), e.penumbraDarkness !== void 0 && (i.penumbraDarkness = e.penumbraDarkness), e.freezeShadowCastersBoundingInfo !== void 0 && (i.freezeShadowCastersBoundingInfo = e.freezeShadowCastersBoundingInfo), e.minDistance !== void 0 && e.maxDistance !== void 0 && i.setMinMaxDistance(e.minDistance, e.maxDistance), i;
  }
}
$._FrustumCornersNDCSpace = [
  new R(-1, 1, -1),
  new R(1, 1, -1),
  new R(1, -1, -1),
  new R(-1, -1, -1),
  new R(-1, 1, 1),
  new R(1, 1, 1),
  new R(1, -1, 1),
  new R(-1, -1, 1)
];
$.CLASSNAME = "CascadedShadowGenerator";
$.DEFAULT_CASCADES_COUNT = 4;
$.MIN_CASCADES_COUNT = 2;
$.MAX_CASCADES_COUNT = 4;
$._SceneComponentInitialization = (d) => {
  throw Ne("ShadowGeneratorSceneComponent");
};
ot.AddParser(ae.NAME_SHADOWGENERATOR, (d, e) => {
  if (d.shadowGenerators !== void 0 && d.shadowGenerators !== null)
    for (let t = 0, i = d.shadowGenerators.length; t < i; t++) {
      const s = d.shadowGenerators[t];
      s.className === $.CLASSNAME ? $.Parse(s, e) : C.Parse(s, e);
    }
});
class Ms {
  /**
   * Creates a new instance of the component for the given scene
   * @param scene Defines the scene to register the component in
   */
  constructor(e) {
    this.name = ae.NAME_SHADOWGENERATOR, this.scene = e;
  }
  /**
   * Registers the component in a given scene
   */
  register() {
    this.scene._gatherRenderTargetsStage.registerStep(ae.STEP_GATHERRENDERTARGETS_SHADOWGENERATOR, this, this._gatherRenderTargets);
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
C._SceneComponentInitialization = (d) => {
  let e = d._getComponent(ae.NAME_SHADOWGENERATOR);
  e || (e = new Ms(d), d._addComponent(e));
};
const As = {
  enableShadows: !0
};
function Gt(d = As) {
  const { enableShadows: e, shadowTransparency: t, intensity: i, scene: s } = d, r = new Ee("DirectionalLight", new R(-0.3, -1, 0.4), s);
  r.position = new R(-50, 65, -50), r.intensity = 0.65 * i;
  const n = new St("HemisphericLight", new R(1, 1, 0), s);
  return n.intensity = 0.4 * i, e && (r.shadowMinZ = 1, r.shadowMaxZ = 70, r.shadowGenerator = new C(2048, r), r.shadowGenerator.useCloseExponentialShadowMap = !0, r.shadowGenerator.darkness = t), { directional: r, hemispheric: n };
}
function ii(d) {
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
  const n = d.width || d.size || 1, a = d.height || d.size || 1, o = d.depth || d.size || 1, l = d.wrap || !1;
  let f = d.topBaseAt === void 0 ? 1 : d.topBaseAt, h = d.bottomBaseAt === void 0 ? 0 : d.bottomBaseAt;
  f = (f + 4) % 4, h = (h + 4) % 4;
  const c = [2, 0, 3, 1], p = [2, 0, 1, 3];
  let E = c[f], g = p[h], _ = [
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
    t = [2, 3, 0, 2, 0, 1, 4, 5, 6, 4, 6, 7, 9, 10, 11, 9, 11, 8, 12, 14, 15, 12, 13, 14], _ = [
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
    let b = [
      [1, 1, 1],
      [-1, 1, 1],
      [-1, 1, -1],
      [1, 1, -1]
    ], O = [
      [-1, -1, 1],
      [1, -1, 1],
      [1, -1, -1],
      [-1, -1, -1]
    ];
    const y = [17, 18, 19, 16], U = [22, 23, 20, 21];
    for (; E > 0; )
      b.unshift(b.pop()), y.unshift(y.pop()), E--;
    for (; g > 0; )
      O.unshift(O.pop()), U.unshift(U.pop()), g--;
    b = b.flat(), O = O.flat(), _ = _.concat(b).concat(O), t.push(y[0], y[2], y[3], y[0], y[1], y[2]), t.push(U[0], U[2], U[3], U[0], U[1], U[2]);
  }
  const S = [n / 2, a / 2, o / 2];
  r = _.reduce((b, O, y) => b.concat(O * S[y % 3]), []);
  const I = d.sideOrientation === 0 ? 0 : d.sideOrientation || Ke.DEFAULTSIDE, M = d.faceUV || new Array(6), P = d.faceColors, N = [];
  for (let b = 0; b < 6; b++)
    M[b] === void 0 && (M[b] = new Ti(0, 0, 1, 1)), P && P[b] === void 0 && (P[b] = new Ce(1, 1, 1, 1));
  for (let b = 0; b < 6; b++)
    if (s.push(M[b].z, He.UseOpenGLOrientationForUV ? 1 - M[b].w : M[b].w), s.push(M[b].x, He.UseOpenGLOrientationForUV ? 1 - M[b].w : M[b].w), s.push(M[b].x, He.UseOpenGLOrientationForUV ? 1 - M[b].y : M[b].y), s.push(M[b].z, He.UseOpenGLOrientationForUV ? 1 - M[b].y : M[b].y), P)
      for (let O = 0; O < 4; O++)
        N.push(P[b].r, P[b].g, P[b].b, P[b].a);
  Ke._ComputeSides(I, r, t, i, s, d.frontUVs, d.backUVs);
  const W = new Ke();
  if (W.indices = t, W.positions = r, W.normals = i, W.uvs = s, P) {
    const b = I === Ke.DOUBLESIDE ? N.concat(N) : N;
    W.colors = b;
  }
  return W;
}
function ke(d, e = {}, t = null) {
  const i = new qe(d, t);
  return e.sideOrientation = qe._GetDefaultSideOrientation(e.sideOrientation), i._originalBuilderSideOrientation = e.sideOrientation, ii(e).applyToMesh(i, e.updatable), i;
}
Ke.CreateBox = ii;
qe.CreateBox = (d, e, t = null, i, s) => ke(d, {
  size: e,
  sideOrientation: s,
  updatable: i
}, t);
class Yt {
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
      const n = t.getEngine();
      this.currentViewProjection.updateFlag !== t.getTransformMatrix().updateFlag ? (this._lastUpdateFrameId = n.frameId, this.previousViewProjection.copyFrom(this.currentViewProjection), this.currentViewProjection.copyFrom(t.getTransformMatrix())) : this._lastUpdateFrameId !== n.frameId && (this._lastUpdateFrameId = n.frameId, this.previousViewProjection.copyFrom(this.currentViewProjection)), e.setMatrix("previousWorld", this.previousWorldMatrices[i.uniqueId]), e.setMatrix("previousViewProjection", this.previousViewProjection), this.previousWorldMatrices[i.uniqueId] = s.clone();
    }
  }
}
class ri extends ve {
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
class w {
  /**
   * Are diffuse textures enabled in the application.
   */
  static get DiffuseTextureEnabled() {
    return this._DiffuseTextureEnabled;
  }
  static set DiffuseTextureEnabled(e) {
    this._DiffuseTextureEnabled !== e && (this._DiffuseTextureEnabled = e, V.MarkAllMaterialsAsDirty(1));
  }
  /**
   * Are detail textures enabled in the application.
   */
  static get DetailTextureEnabled() {
    return this._DetailTextureEnabled;
  }
  static set DetailTextureEnabled(e) {
    this._DetailTextureEnabled !== e && (this._DetailTextureEnabled = e, V.MarkAllMaterialsAsDirty(1));
  }
  /**
   * Are decal maps enabled in the application.
   */
  static get DecalMapEnabled() {
    return this._DecalMapEnabled;
  }
  static set DecalMapEnabled(e) {
    this._DecalMapEnabled !== e && (this._DecalMapEnabled = e, V.MarkAllMaterialsAsDirty(1));
  }
  /**
   * Are ambient textures enabled in the application.
   */
  static get AmbientTextureEnabled() {
    return this._AmbientTextureEnabled;
  }
  static set AmbientTextureEnabled(e) {
    this._AmbientTextureEnabled !== e && (this._AmbientTextureEnabled = e, V.MarkAllMaterialsAsDirty(1));
  }
  /**
   * Are opacity textures enabled in the application.
   */
  static get OpacityTextureEnabled() {
    return this._OpacityTextureEnabled;
  }
  static set OpacityTextureEnabled(e) {
    this._OpacityTextureEnabled !== e && (this._OpacityTextureEnabled = e, V.MarkAllMaterialsAsDirty(1));
  }
  /**
   * Are reflection textures enabled in the application.
   */
  static get ReflectionTextureEnabled() {
    return this._ReflectionTextureEnabled;
  }
  static set ReflectionTextureEnabled(e) {
    this._ReflectionTextureEnabled !== e && (this._ReflectionTextureEnabled = e, V.MarkAllMaterialsAsDirty(1));
  }
  /**
   * Are emissive textures enabled in the application.
   */
  static get EmissiveTextureEnabled() {
    return this._EmissiveTextureEnabled;
  }
  static set EmissiveTextureEnabled(e) {
    this._EmissiveTextureEnabled !== e && (this._EmissiveTextureEnabled = e, V.MarkAllMaterialsAsDirty(1));
  }
  /**
   * Are specular textures enabled in the application.
   */
  static get SpecularTextureEnabled() {
    return this._SpecularTextureEnabled;
  }
  static set SpecularTextureEnabled(e) {
    this._SpecularTextureEnabled !== e && (this._SpecularTextureEnabled = e, V.MarkAllMaterialsAsDirty(1));
  }
  /**
   * Are bump textures enabled in the application.
   */
  static get BumpTextureEnabled() {
    return this._BumpTextureEnabled;
  }
  static set BumpTextureEnabled(e) {
    this._BumpTextureEnabled !== e && (this._BumpTextureEnabled = e, V.MarkAllMaterialsAsDirty(1));
  }
  /**
   * Are lightmap textures enabled in the application.
   */
  static get LightmapTextureEnabled() {
    return this._LightmapTextureEnabled;
  }
  static set LightmapTextureEnabled(e) {
    this._LightmapTextureEnabled !== e && (this._LightmapTextureEnabled = e, V.MarkAllMaterialsAsDirty(1));
  }
  /**
   * Are refraction textures enabled in the application.
   */
  static get RefractionTextureEnabled() {
    return this._RefractionTextureEnabled;
  }
  static set RefractionTextureEnabled(e) {
    this._RefractionTextureEnabled !== e && (this._RefractionTextureEnabled = e, V.MarkAllMaterialsAsDirty(1));
  }
  /**
   * Are color grading textures enabled in the application.
   */
  static get ColorGradingTextureEnabled() {
    return this._ColorGradingTextureEnabled;
  }
  static set ColorGradingTextureEnabled(e) {
    this._ColorGradingTextureEnabled !== e && (this._ColorGradingTextureEnabled = e, V.MarkAllMaterialsAsDirty(1));
  }
  /**
   * Are fresnels enabled in the application.
   */
  static get FresnelEnabled() {
    return this._FresnelEnabled;
  }
  static set FresnelEnabled(e) {
    this._FresnelEnabled !== e && (this._FresnelEnabled = e, V.MarkAllMaterialsAsDirty(4));
  }
  /**
   * Are clear coat textures enabled in the application.
   */
  static get ClearCoatTextureEnabled() {
    return this._ClearCoatTextureEnabled;
  }
  static set ClearCoatTextureEnabled(e) {
    this._ClearCoatTextureEnabled !== e && (this._ClearCoatTextureEnabled = e, V.MarkAllMaterialsAsDirty(1));
  }
  /**
   * Are clear coat bump textures enabled in the application.
   */
  static get ClearCoatBumpTextureEnabled() {
    return this._ClearCoatBumpTextureEnabled;
  }
  static set ClearCoatBumpTextureEnabled(e) {
    this._ClearCoatBumpTextureEnabled !== e && (this._ClearCoatBumpTextureEnabled = e, V.MarkAllMaterialsAsDirty(1));
  }
  /**
   * Are clear coat tint textures enabled in the application.
   */
  static get ClearCoatTintTextureEnabled() {
    return this._ClearCoatTintTextureEnabled;
  }
  static set ClearCoatTintTextureEnabled(e) {
    this._ClearCoatTintTextureEnabled !== e && (this._ClearCoatTintTextureEnabled = e, V.MarkAllMaterialsAsDirty(1));
  }
  /**
   * Are sheen textures enabled in the application.
   */
  static get SheenTextureEnabled() {
    return this._SheenTextureEnabled;
  }
  static set SheenTextureEnabled(e) {
    this._SheenTextureEnabled !== e && (this._SheenTextureEnabled = e, V.MarkAllMaterialsAsDirty(1));
  }
  /**
   * Are anisotropic textures enabled in the application.
   */
  static get AnisotropicTextureEnabled() {
    return this._AnisotropicTextureEnabled;
  }
  static set AnisotropicTextureEnabled(e) {
    this._AnisotropicTextureEnabled !== e && (this._AnisotropicTextureEnabled = e, V.MarkAllMaterialsAsDirty(1));
  }
  /**
   * Are thickness textures enabled in the application.
   */
  static get ThicknessTextureEnabled() {
    return this._ThicknessTextureEnabled;
  }
  static set ThicknessTextureEnabled(e) {
    this._ThicknessTextureEnabled !== e && (this._ThicknessTextureEnabled = e, V.MarkAllMaterialsAsDirty(1));
  }
  /**
   * Are refraction intensity textures enabled in the application.
   */
  static get RefractionIntensityTextureEnabled() {
    return this._ThicknessTextureEnabled;
  }
  static set RefractionIntensityTextureEnabled(e) {
    this._RefractionIntensityTextureEnabled !== e && (this._RefractionIntensityTextureEnabled = e, V.MarkAllMaterialsAsDirty(1));
  }
  /**
   * Are translucency intensity textures enabled in the application.
   */
  static get TranslucencyIntensityTextureEnabled() {
    return this._ThicknessTextureEnabled;
  }
  static set TranslucencyIntensityTextureEnabled(e) {
    this._TranslucencyIntensityTextureEnabled !== e && (this._TranslucencyIntensityTextureEnabled = e, V.MarkAllMaterialsAsDirty(1));
  }
  /**
   * Are translucency intensity textures enabled in the application.
   */
  static get IridescenceTextureEnabled() {
    return this._IridescenceTextureEnabled;
  }
  static set IridescenceTextureEnabled(e) {
    this._IridescenceTextureEnabled !== e && (this._IridescenceTextureEnabled = e, V.MarkAllMaterialsAsDirty(1));
  }
}
w._DiffuseTextureEnabled = !0;
w._DetailTextureEnabled = !0;
w._DecalMapEnabled = !0;
w._AmbientTextureEnabled = !0;
w._OpacityTextureEnabled = !0;
w._ReflectionTextureEnabled = !0;
w._EmissiveTextureEnabled = !0;
w._SpecularTextureEnabled = !0;
w._BumpTextureEnabled = !0;
w._LightmapTextureEnabled = !0;
w._RefractionTextureEnabled = !0;
w._ColorGradingTextureEnabled = !0;
w._FresnelEnabled = !0;
w._ClearCoatTextureEnabled = !0;
w._ClearCoatBumpTextureEnabled = !0;
w._ClearCoatTintTextureEnabled = !0;
w._SheenTextureEnabled = !0;
w._AnisotropicTextureEnabled = !0;
w._ThicknessTextureEnabled = !0;
w._RefractionIntensityTextureEnabled = !0;
w._TranslucencyIntensityTextureEnabled = !0;
w._IridescenceTextureEnabled = !0;
const Cs = "decalFragmentDeclaration", Rs = `#ifdef DECAL
uniform vec4 vDecalInfos;
#endif
`;
x.IncludesShadersStore[Cs] = Rs;
const Is = "defaultFragmentDeclaration", bs = `uniform vec4 vEyePosition;
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
x.IncludesShadersStore[Is] = bs;
const Ps = "defaultUboDeclaration", Ds = `layout(std140,column_major) uniform;
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
x.IncludesShadersStore[Ps] = Ds;
const Ls = "prePassDeclaration", ws = `#ifdef PREPASS
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
x.IncludesShadersStore[Ls] = ws;
const Fs = "oitDeclaration", Os = `#ifdef ORDER_INDEPENDENT_TRANSPARENCY
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
x.IncludesShadersStore[Fs] = Os;
const Ns = "mainUVVaryingDeclaration", ys = `#ifdef MAINUV{X}
varying vec2 vMainUV{X};
#endif
`;
x.IncludesShadersStore[Ns] = ys;
const Us = "lightFragmentDeclaration", Bs = `#ifdef LIGHT{X}
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
x.IncludesShadersStore[Us] = Bs;
const Vs = "lightUboDeclaration", Xs = `#ifdef LIGHT{X}
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
x.IncludesShadersStore[Vs] = Xs;
const zs = "lightsFragmentFunctions", Ws = `struct lightingInfo
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
x.IncludesShadersStore[zs] = Ws;
const ks = "shadowsFragmentFunctions", Hs = `#ifdef SHADOWS
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
x.IncludesShadersStore[ks] = Hs;
const Gs = "samplerFragmentDeclaration", Ys = `#ifdef _DEFINENAME_
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
x.IncludesShadersStore[Gs] = Ys;
const $s = "fresnelFunction", Zs = `#ifdef FRESNEL
float computeFresnelTerm(vec3 viewDirection,vec3 worldNormal,float bias,float power)
{
float fresnelTerm=pow(bias+abs(dot(viewDirection,worldNormal)),power);
return clamp(fresnelTerm,0.,1.);
}
#endif
`;
x.IncludesShadersStore[$s] = Zs;
const js = "reflectionFunction", Ks = `vec3 computeFixedEquirectangularCoords(vec4 worldPos,vec3 worldNormal,vec3 direction)
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
x.IncludesShadersStore[js] = Ks;
const Qs = "imageProcessingDeclaration", qs = `#ifdef EXPOSURE
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
x.IncludesShadersStore[Qs] = qs;
const Js = "imageProcessingFunctions", en = `#if defined(COLORGRADING) && !defined(COLORGRADING3D)
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
x.IncludesShadersStore[Js] = en;
const tn = "bumpFragmentMainFunctions", rn = `#if defined(BUMP) || defined(CLEARCOAT_BUMP) || defined(ANISOTROPIC) || defined(DETAIL)
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
x.IncludesShadersStore[tn] = rn;
const sn = "bumpFragmentFunctions", nn = `#if defined(BUMP)
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
x.IncludesShadersStore[sn] = nn;
const an = "logDepthDeclaration", on = `#ifdef LOGARITHMICDEPTH
uniform float logarithmicDepthConstant;
varying float vFragmentDepth;
#endif
`;
x.IncludesShadersStore[an] = on;
const ln = "fogFragmentDeclaration", hn = `#ifdef FOG
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
x.IncludesShadersStore[ln] = hn;
const fn = "bumpFragment", dn = `vec2 uvOffset=vec2(0.0,0.0);
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
x.IncludesShadersStore[fn] = dn;
const cn = "decalFragment", un = `#ifdef DECAL
#ifdef GAMMADECAL
decalColor.rgb=toLinearSpace(decalColor.rgb);
#endif
#ifdef DECAL_SMOOTHALPHA
decalColor.a*=decalColor.a;
#endif
surfaceAlbedo.rgb=mix(surfaceAlbedo.rgb,decalColor.rgb,decalColor.a);
#endif
`;
x.IncludesShadersStore[cn] = un;
const pn = "depthPrePass", _n = `#ifdef DEPTHPREPASS
gl_FragColor=vec4(0.,0.,0.,1.0);
return;
#endif
`;
x.IncludesShadersStore[pn] = _n;
const mn = "lightFragment", gn = `#ifdef LIGHT{X}
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
x.IncludesShadersStore[mn] = gn;
const vn = "logDepthFragment", En = `#ifdef LOGARITHMICDEPTH
gl_FragDepthEXT=log2(vFragmentDepth)*logarithmicDepthConstant*0.5;
#endif
`;
x.IncludesShadersStore[vn] = En;
const Sn = "fogFragment", Tn = `#ifdef FOG
float fog=CalcFogFactor();
#ifdef PBR
fog=toLinearSpace(fog);
#endif
color.rgb=mix(vFogColor,color.rgb,fog);
#endif
`;
x.IncludesShadersStore[Sn] = Tn;
const xn = "oitFragment", Mn = `#ifdef ORDER_INDEPENDENT_TRANSPARENCY
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
x.IncludesShadersStore[xn] = Mn;
const An = "defaultPixelShader", Cn = `#include<__decl__defaultFragment>
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
x.ShadersStore[An] = Cn;
const Rn = "decalVertexDeclaration", In = `#ifdef DECAL
uniform vec4 vDecalInfos;
uniform mat4 decalMatrix;
#endif
`;
x.IncludesShadersStore[Rn] = In;
const bn = "defaultVertexDeclaration", Pn = `uniform mat4 viewProjection;
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
x.IncludesShadersStore[bn] = Pn;
const Dn = "uvAttributeDeclaration", Ln = `#ifdef UV{X}
attribute vec2 uv{X};
#endif
`;
x.IncludesShadersStore[Dn] = Ln;
const wn = "prePassVertexDeclaration", Fn = `#ifdef PREPASS
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
x.IncludesShadersStore[wn] = Fn;
const On = "samplerVertexDeclaration", Nn = `#if defined(_DEFINENAME_) && _DEFINENAME_DIRECTUV==0
varying vec2 v_VARYINGNAME_UV;
#endif
`;
x.IncludesShadersStore[On] = Nn;
const yn = "bumpVertexDeclaration", Un = `#if defined(BUMP) || defined(PARALLAX) || defined(CLEARCOAT_BUMP) || defined(ANISOTROPIC)
#if defined(TANGENT) && defined(NORMAL) 
varying mat3 vTBN;
#endif
#endif
`;
x.IncludesShadersStore[yn] = Un;
const Bn = "fogVertexDeclaration", Vn = `#ifdef FOG
varying vec3 vFogDistance;
#endif
`;
x.IncludesShadersStore[Bn] = Vn;
const Xn = "lightVxFragmentDeclaration", zn = `#ifdef LIGHT{X}
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
x.IncludesShadersStore[Xn] = zn;
const Wn = "lightVxUboDeclaration", kn = `#ifdef LIGHT{X}
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
x.IncludesShadersStore[Wn] = kn;
const Hn = "prePassVertex", Gn = `#ifdef PREPASS_DEPTH
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
x.IncludesShadersStore[Hn] = Gn;
const Yn = "uvVariableDeclaration", $n = `#if !defined(UV{X}) && defined(MAINUV{X})
vec2 uv{X}=vec2(0.,0.);
#endif
#ifdef MAINUV{X}
vMainUV{X}=uv{X};
#endif
`;
x.IncludesShadersStore[Yn] = $n;
const Zn = "samplerVertexImplementation", jn = `#if defined(_DEFINENAME_) && _DEFINENAME_DIRECTUV==0
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
x.IncludesShadersStore[Zn] = jn;
const Kn = "bumpVertex", Qn = `#if defined(BUMP) || defined(PARALLAX) || defined(CLEARCOAT_BUMP) || defined(ANISOTROPIC)
#if defined(TANGENT) && defined(NORMAL)
vec3 tbnNormal=normalize(normalUpdated);
vec3 tbnTangent=normalize(tangentUpdated.xyz);
vec3 tbnBitangent=cross(tbnNormal,tbnTangent)*tangentUpdated.w;
vTBN=mat3(finalWorld)*mat3(tbnTangent,tbnBitangent,tbnNormal);
#endif
#endif
`;
x.IncludesShadersStore[Kn] = Qn;
const qn = "fogVertex", Jn = `#ifdef FOG
vFogDistance=(view*worldPos).xyz;
#endif
`;
x.IncludesShadersStore[qn] = Jn;
const ea = "shadowsVertex", ta = `#ifdef SHADOWS
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
x.IncludesShadersStore[ea] = ta;
const ia = "vertexColorMixing", ra = `#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
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
x.IncludesShadersStore[ia] = ra;
const sa = "pointCloudVertex", na = `#if defined(POINTSIZE) && !defined(WEBGPU)
gl_PointSize=pointSize;
#endif
`;
x.IncludesShadersStore[sa] = na;
const aa = "logDepthVertex", oa = `#ifdef LOGARITHMICDEPTH
vFragmentDepth=1.0+gl_Position.w;
gl_Position.z=log2(max(0.000001,vFragmentDepth))*logarithmicDepthConstant;
#endif
`;
x.IncludesShadersStore[aa] = oa;
const la = "defaultVertexShader", ha = `#include<__decl__defaultVertex>
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
x.ShadersStore[la] = ha;
const fa = new RegExp("^([gimus]+)!");
class Pe {
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
    Pe._MaterialPluginClassToMainDefine[t] || (Pe._MaterialPluginClassToMainDefine[t] = "MATERIALPLUGIN_" + ++Pe._MaterialPluginCounter), this._material._callbackPluginEventGeneric = this._handlePluginEvent.bind(this), this._plugins.push(e), this._plugins.sort((s, r) => s.priority - r.priority), this._codeInjectionPoints = {};
    const i = {};
    i[Pe._MaterialPluginClassToMainDefine[t]] = {
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
      case xe.GetActiveTextures: {
        const s = t;
        for (const r of this._activePlugins)
          r.getActiveTextures(s.activeTextures);
        break;
      }
      case xe.GetAnimatables: {
        const s = t;
        for (const r of this._activePlugins)
          r.getAnimatables(s.animatables);
        break;
      }
      case xe.HasTexture: {
        const s = t;
        let r = !1;
        for (const n of this._activePlugins)
          if (r = n.hasTexture(s.texture), r)
            break;
        s.hasTexture = r;
        break;
      }
      case xe.Disposed: {
        const s = t;
        for (const r of this._plugins)
          r.dispose(s.forceDisposeTextures);
        break;
      }
      case xe.GetDefineNames: {
        const s = t;
        s.defineNames = this._defineNamesFromPlugins;
        break;
      }
      case xe.PrepareEffect: {
        const s = t;
        for (const r of this._activePlugins)
          s.fallbackRank = r.addFallbacks(s.defines, s.fallbacks, s.fallbackRank), r.getAttributes(s.attributes, this._scene, s.mesh);
        this._uniformList.length > 0 && s.uniforms.push(...this._uniformList), this._samplerList.length > 0 && s.samplers.push(...this._samplerList), this._uboList.length > 0 && s.uniformBuffersNames.push(...this._uboList), s.customCode = this._injectCustomCode(s.customCode);
        break;
      }
      case xe.PrepareUniformBuffer: {
        const s = t;
        this._uboDeclaration = "", this._vertexDeclaration = "", this._fragmentDeclaration = "", this._uniformList = [], this._samplerList = [], this._uboList = [];
        for (const r of this._plugins) {
          const n = r.getUniforms();
          if (n) {
            if (n.ubo)
              for (const a of n.ubo) {
                if (a.size && a.type) {
                  const o = (i = a.arraySize) !== null && i !== void 0 ? i : 0;
                  s.ubo.addUniform(a.name, a.size, o), this._uboDeclaration += `${a.type} ${a.name}${o > 0 ? `[${o}]` : ""};\r
`;
                }
                this._uniformList.push(a.name);
              }
            n.vertex && (this._vertexDeclaration += n.vertex + `\r
`), n.fragment && (this._fragmentDeclaration += n.fragment + `\r
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
      for (let n in r) {
        let a = "";
        for (const o of this._activePlugins) {
          const l = o.getCustomCode(t);
          l != null && l[n] && (a += l[n] + `\r
`);
        }
        if (a.length > 0)
          if (n.charAt(0) === "!") {
            n = n.substring(1);
            let o = "g";
            if (n.charAt(0) === "!")
              o = "", n = n.substring(1);
            else {
              const c = fa.exec(n);
              c && c.length >= 2 && (o = c[1], n = n.substring(o.length + 1));
            }
            o.indexOf("g") < 0 && (o += "g");
            const l = i, f = new RegExp(n, o);
            let h = f.exec(l);
            for (; h !== null; ) {
              let c = a;
              for (let p = 0; p < h.length; ++p)
                c = c.replace("$" + p, h[p]);
              i = i.replace(h[0], c), h = f.exec(l);
            }
          } else {
            const o = "#define " + n;
            i = i.replace(o, `\r
` + a + `\r
` + o);
          }
      }
      return i;
    };
  }
}
Pe._MaterialPluginClassToMainDefine = {};
Pe._MaterialPluginCounter = 0;
class xt {
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
  constructor(e, t, i, s, r = !0, n = !1) {
    this.priority = 500, this.registerForExtraEvents = !1, this._material = e, this.name = t, this.priority = i, e.pluginManager || (e.pluginManager = new Pe(e), e.onDisposeObservable.add(() => {
      e.pluginManager = void 0;
    })), this._pluginDefineNames = s, this._pluginManager = e.pluginManager, r && this._pluginManager._addPlugin(this), n && this._enable(!0), this.markAllDefinesAsDirty = e._dirtyCallbacks[63];
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
    q.Clone(() => e, this);
  }
  /**
   * Serializes this clear coat configuration.
   * @returns - An object with the serialized config.
   */
  serialize() {
    return q.Serialize(this);
  }
  /**
   * Parses a anisotropy Configuration from a serialized object.
   * @param source - Serialized object.
   * @param scene Defines the scene we are parsing for
   * @param rootUrl Defines the rootUrl to load from
   */
  parse(e, t, i) {
    q.Parse(() => this, e, t, i);
  }
}
u([
  T()
], xt.prototype, "name", void 0);
u([
  T()
], xt.prototype, "priority", void 0);
u([
  T()
], xt.prototype, "registerForExtraEvents", void 0);
class da extends yt {
  constructor() {
    super(...arguments), this.DETAIL = !1, this.DETAILDIRECTUV = 0, this.DETAIL_NORMALBLENDMETHOD = 0;
  }
}
class Be extends xt {
  /** @internal */
  _markAllSubMeshesAsTexturesDirty() {
    this._enable(this._isEnabled), this._internalMarkAllSubMeshesAsTexturesDirty();
  }
  constructor(e, t = !0) {
    super(e, "DetailMap", 140, new da(), t), this._texture = null, this.diffuseBlendLevel = 1, this.roughnessBlendLevel = 1, this.bumpLevel = 1, this._normalBlendMethod = ve.MATERIAL_NORMALBLENDMETHOD_WHITEOUT, this._isEnabled = !1, this.isEnabled = !1, this._internalMarkAllSubMeshesAsTexturesDirty = e._dirtyCallbacks[1];
  }
  isReadyForSubMesh(e, t, i) {
    return this._isEnabled ? !(e._areTexturesDirty && t.texturesEnabled && i.getCaps().standardDerivatives && this._texture && w.DetailTextureEnabled && !this._texture.isReady()) : !0;
  }
  prepareDefines(e, t) {
    if (this._isEnabled) {
      e.DETAIL_NORMALBLENDMETHOD = this._normalBlendMethod;
      const i = t.getEngine();
      e._areTexturesDirty && (i.getCaps().standardDerivatives && this._texture && w.DetailTextureEnabled && this._isEnabled ? (D.PrepareDefinesForMergedUV(this._texture, e, "DETAIL"), e.DETAIL_NORMALBLENDMETHOD = this._normalBlendMethod) : e.DETAIL = !1);
    } else
      e.DETAIL = !1;
  }
  bindForSubMesh(e, t) {
    if (!this._isEnabled)
      return;
    const i = this._material.isFrozen;
    (!e.useUbo || !i || !e.isSync) && this._texture && w.DetailTextureEnabled && (e.updateFloat4("vDetailInfos", this._texture.coordinatesIndex, this.diffuseBlendLevel, this.bumpLevel, this.roughnessBlendLevel), D.BindTextureMatrix(this._texture, e, "detail")), t.texturesEnabled && this._texture && w.DetailTextureEnabled && e.setTexture("detailSampler", this._texture);
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
u([
  pe("detailTexture"),
  B("_markAllSubMeshesAsTexturesDirty")
], Be.prototype, "texture", void 0);
u([
  T()
], Be.prototype, "diffuseBlendLevel", void 0);
u([
  T()
], Be.prototype, "roughnessBlendLevel", void 0);
u([
  T()
], Be.prototype, "bumpLevel", void 0);
u([
  T(),
  B("_markAllSubMeshesAsTexturesDirty")
], Be.prototype, "normalBlendMethod", void 0);
u([
  T(),
  B("_markAllSubMeshesAsTexturesDirty")
], Be.prototype, "isEnabled", void 0);
const wt = { effect: null, subMesh: null };
class ca extends yt {
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
class v extends ri {
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
    super(e, t), this._diffuseTexture = null, this._ambientTexture = null, this._opacityTexture = null, this._reflectionTexture = null, this._emissiveTexture = null, this._specularTexture = null, this._bumpTexture = null, this._lightmapTexture = null, this._refractionTexture = null, this.ambientColor = new me(0, 0, 0), this.diffuseColor = new me(1, 1, 1), this.specularColor = new me(1, 1, 1), this.emissiveColor = new me(0, 0, 0), this.specularPower = 64, this._useAlphaFromDiffuseTexture = !1, this._useEmissiveAsIllumination = !1, this._linkEmissiveWithDiffuse = !1, this._useSpecularOverAlpha = !1, this._useReflectionOverAlpha = !1, this._disableLighting = !1, this._useObjectSpaceNormalMap = !1, this._useParallax = !1, this._useParallaxOcclusion = !1, this.parallaxScaleBias = 0.05, this._roughness = 0, this.indexOfRefraction = 0.98, this.invertRefractionY = !0, this.alphaCutOff = 0.4, this._useLightmapAsShadowmap = !1, this._useReflectionFresnelFromSpecular = !1, this._useGlossinessFromSpecularMapAlpha = !1, this._maxSimultaneousLights = 4, this._invertNormalMapX = !1, this._invertNormalMapY = !1, this._twoSidedLighting = !1, this._renderTargets = new Ot(16), this._worldViewProjectionMatrix = F.Zero(), this._globalAmbientColor = new me(0, 0, 0), this._cacheHasRenderTargetTextures = !1, this.detailMap = new Be(this), this._attachImageProcessingConfiguration(null), this.prePassConfiguration = new Yt(), this.getRenderTargetTextures = () => (this._renderTargets.reset(), v.ReflectionTextureEnabled && this._reflectionTexture && this._reflectionTexture.isRenderTarget && this._renderTargets.push(this._reflectionTexture), v.RefractionTextureEnabled && this._refractionTexture && this._refractionTexture.isRenderTarget && this._renderTargets.push(this._refractionTexture), this._eventInfo.renderTargets = this._renderTargets, this._callbackPluginEventFillRenderTargetTextures(this._eventInfo), this._renderTargets);
  }
  /**
   * Gets a boolean indicating that current material needs to register RTT
   */
  get hasRenderTargetTextures() {
    return v.ReflectionTextureEnabled && this._reflectionTexture && this._reflectionTexture.isRenderTarget || v.RefractionTextureEnabled && this._refractionTexture && this._refractionTexture.isRenderTarget ? !0 : this._cacheHasRenderTargetTextures;
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
    return this._forceAlphaTest ? !0 : this._hasAlphaChannel() && (this._transparencyMode == null || this._transparencyMode === ve.MATERIAL_ALPHATEST);
  }
  /**
   * Specifies whether or not the alpha value of the diffuse texture should be used for alpha blending.
   */
  _shouldUseAlphaFromDiffuseTexture() {
    return this._diffuseTexture != null && this._diffuseTexture.hasAlpha && this._useAlphaFromDiffuseTexture && this._transparencyMode !== ve.MATERIAL_OPAQUE;
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
    t.materialDefines || (this._callbackPluginEventGeneric(xe.GetDefineNames, this._eventInfo), t.materialDefines = new ca(this._eventInfo.defineNames));
    const s = this.getScene(), r = t.materialDefines;
    if (this._isReadyForSubMesh(t))
      return !0;
    const n = s.getEngine();
    r._needNormals = D.PrepareDefinesForLights(s, e, r, !0, this._maxSimultaneousLights, this._disableLighting), D.PrepareDefinesForMultiview(s, r);
    const a = this.needAlphaBlendingForMesh(e) && this.getScene().useOrderIndependentTransparency;
    if (D.PrepareDefinesForPrePass(s, r, this.canRenderToMRT && !a), D.PrepareDefinesForOIT(s, r, a), r._areTexturesDirty) {
      this._eventInfo.hasRenderTargetTextures = !1, this._callbackPluginEventHasRenderTargetTextures(this._eventInfo), this._cacheHasRenderTargetTextures = this._eventInfo.hasRenderTargetTextures, r._needUVs = !1;
      for (let l = 1; l <= 6; ++l)
        r["MAINUV" + l] = !1;
      if (s.texturesEnabled) {
        if (r.DIFFUSEDIRECTUV = 0, r.BUMPDIRECTUV = 0, r.AMBIENTDIRECTUV = 0, r.OPACITYDIRECTUV = 0, r.EMISSIVEDIRECTUV = 0, r.SPECULARDIRECTUV = 0, r.LIGHTMAPDIRECTUV = 0, this._diffuseTexture && v.DiffuseTextureEnabled)
          if (this._diffuseTexture.isReadyOrNotBlocking())
            D.PrepareDefinesForMergedUV(this._diffuseTexture, r, "DIFFUSE");
          else
            return !1;
        else
          r.DIFFUSE = !1;
        if (this._ambientTexture && v.AmbientTextureEnabled)
          if (this._ambientTexture.isReadyOrNotBlocking())
            D.PrepareDefinesForMergedUV(this._ambientTexture, r, "AMBIENT");
          else
            return !1;
        else
          r.AMBIENT = !1;
        if (this._opacityTexture && v.OpacityTextureEnabled)
          if (this._opacityTexture.isReadyOrNotBlocking())
            D.PrepareDefinesForMergedUV(this._opacityTexture, r, "OPACITY"), r.OPACITYRGB = this._opacityTexture.getAlphaFromRGB;
          else
            return !1;
        else
          r.OPACITY = !1;
        if (this._reflectionTexture && v.ReflectionTextureEnabled)
          if (this._reflectionTexture.isReadyOrNotBlocking()) {
            switch (r._needNormals = !0, r.REFLECTION = !0, r.ROUGHNESS = this._roughness > 0, r.REFLECTIONOVERALPHA = this._useReflectionOverAlpha, r.INVERTCUBICMAP = this._reflectionTexture.coordinatesMode === m.INVCUBIC_MODE, r.REFLECTIONMAP_3D = this._reflectionTexture.isCube, r.REFLECTIONMAP_OPPOSITEZ = r.REFLECTIONMAP_3D && this.getScene().useRightHandedSystem ? !this._reflectionTexture.invertZ : this._reflectionTexture.invertZ, r.RGBDREFLECTION = this._reflectionTexture.isRGBD, this._reflectionTexture.coordinatesMode) {
              case m.EXPLICIT_MODE:
                r.setReflectionMode("REFLECTIONMAP_EXPLICIT");
                break;
              case m.PLANAR_MODE:
                r.setReflectionMode("REFLECTIONMAP_PLANAR");
                break;
              case m.PROJECTION_MODE:
                r.setReflectionMode("REFLECTIONMAP_PROJECTION");
                break;
              case m.SKYBOX_MODE:
                r.setReflectionMode("REFLECTIONMAP_SKYBOX");
                break;
              case m.SPHERICAL_MODE:
                r.setReflectionMode("REFLECTIONMAP_SPHERICAL");
                break;
              case m.EQUIRECTANGULAR_MODE:
                r.setReflectionMode("REFLECTIONMAP_EQUIRECTANGULAR");
                break;
              case m.FIXED_EQUIRECTANGULAR_MODE:
                r.setReflectionMode("REFLECTIONMAP_EQUIRECTANGULAR_FIXED");
                break;
              case m.FIXED_EQUIRECTANGULAR_MIRRORED_MODE:
                r.setReflectionMode("REFLECTIONMAP_MIRROREDEQUIRECTANGULAR_FIXED");
                break;
              case m.CUBIC_MODE:
              case m.INVCUBIC_MODE:
              default:
                r.setReflectionMode("REFLECTIONMAP_CUBIC");
                break;
            }
            r.USE_LOCAL_REFLECTIONMAP_CUBIC = !!this._reflectionTexture.boundingBoxSize;
          } else
            return !1;
        else
          r.REFLECTION = !1, r.REFLECTIONMAP_OPPOSITEZ = !1;
        if (this._emissiveTexture && v.EmissiveTextureEnabled)
          if (this._emissiveTexture.isReadyOrNotBlocking())
            D.PrepareDefinesForMergedUV(this._emissiveTexture, r, "EMISSIVE");
          else
            return !1;
        else
          r.EMISSIVE = !1;
        if (this._lightmapTexture && v.LightmapTextureEnabled)
          if (this._lightmapTexture.isReadyOrNotBlocking())
            D.PrepareDefinesForMergedUV(this._lightmapTexture, r, "LIGHTMAP"), r.USELIGHTMAPASSHADOWMAP = this._useLightmapAsShadowmap, r.RGBDLIGHTMAP = this._lightmapTexture.isRGBD;
          else
            return !1;
        else
          r.LIGHTMAP = !1;
        if (this._specularTexture && v.SpecularTextureEnabled)
          if (this._specularTexture.isReadyOrNotBlocking())
            D.PrepareDefinesForMergedUV(this._specularTexture, r, "SPECULAR"), r.GLOSSINESS = this._useGlossinessFromSpecularMapAlpha;
          else
            return !1;
        else
          r.SPECULAR = !1;
        if (s.getEngine().getCaps().standardDerivatives && this._bumpTexture && v.BumpTextureEnabled) {
          if (this._bumpTexture.isReady())
            D.PrepareDefinesForMergedUV(this._bumpTexture, r, "BUMP"), r.PARALLAX = this._useParallax, r.PARALLAXOCCLUSION = this._useParallaxOcclusion;
          else
            return !1;
          r.OBJECTSPACE_NORMALMAP = this._useObjectSpaceNormalMap;
        } else
          r.BUMP = !1, r.PARALLAX = !1, r.PARALLAXOCCLUSION = !1;
        if (this._refractionTexture && v.RefractionTextureEnabled)
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
    r._areFresnelDirty && (v.FresnelEnabled ? (this._diffuseFresnelParameters || this._opacityFresnelParameters || this._emissiveFresnelParameters || this._refractionFresnelParameters || this._reflectionFresnelParameters) && (r.DIFFUSEFRESNEL = this._diffuseFresnelParameters && this._diffuseFresnelParameters.isEnabled, r.OPACITYFRESNEL = this._opacityFresnelParameters && this._opacityFresnelParameters.isEnabled, r.REFLECTIONFRESNEL = this._reflectionFresnelParameters && this._reflectionFresnelParameters.isEnabled, r.REFLECTIONFRESNELFROMSPECULAR = this._useReflectionFresnelFromSpecular, r.REFRACTIONFRESNEL = this._refractionFresnelParameters && this._refractionFresnelParameters.isEnabled, r.EMISSIVEFRESNEL = this._emissiveFresnelParameters && this._emissiveFresnelParameters.isEnabled, r._needNormals = !0, r.FRESNEL = !0) : r.FRESNEL = !1), D.PrepareDefinesForMisc(e, s, this._useLogarithmicDepth, this.pointsCloud, this.fogEnabled, this._shouldTurnAlphaTestOn(e) || this._forceAlphaTest, r), D.PrepareDefinesForFrameBoundValues(s, n, this, r, i, null, t.getRenderingMesh().hasThinInstances), this._eventInfo.defines = r, this._eventInfo.mesh = e, this._callbackPluginEventPrepareDefinesBeforeAttributes(this._eventInfo), D.PrepareDefinesForAttributes(e, r, !0, !0, !0), this._callbackPluginEventPrepareDefines(this._eventInfo);
    let o = !1;
    if (r.isDirty) {
      const l = r._areLightsDisposed;
      r.markAsProcessed();
      const f = new Et();
      r.REFLECTION && f.addFallback(0, "REFLECTION"), r.SPECULAR && f.addFallback(0, "SPECULAR"), r.BUMP && f.addFallback(0, "BUMP"), r.PARALLAX && f.addFallback(1, "PARALLAX"), r.PARALLAXOCCLUSION && f.addFallback(0, "PARALLAXOCCLUSION"), r.SPECULAROVERALPHA && f.addFallback(0, "SPECULAROVERALPHA"), r.FOG && f.addFallback(1, "FOG"), r.POINTSIZE && f.addFallback(0, "POINTSIZE"), r.LOGARITHMICDEPTH && f.addFallback(0, "LOGARITHMICDEPTH"), D.HandleFallbacksForShadows(r, f, this._maxSimultaneousLights), r.SPECULARTERM && f.addFallback(0, "SPECULARTERM"), r.DIFFUSEFRESNEL && f.addFallback(1, "DIFFUSEFRESNEL"), r.OPACITYFRESNEL && f.addFallback(2, "OPACITYFRESNEL"), r.REFLECTIONFRESNEL && f.addFallback(3, "REFLECTIONFRESNEL"), r.EMISSIVEFRESNEL && f.addFallback(4, "EMISSIVEFRESNEL"), r.FRESNEL && f.addFallback(4, "FRESNEL"), r.MULTIVIEW && f.addFallback(0, "MULTIVIEW");
      const h = [L.PositionKind];
      r.NORMAL && h.push(L.NormalKind), r.TANGENT && h.push(L.TangentKind);
      for (let P = 1; P <= 6; ++P)
        r["UV" + P] && h.push(`uv${P === 1 ? "" : P}`);
      r.VERTEXCOLOR && h.push(L.ColorKind), D.PrepareAttributesForBones(h, e, r, f), D.PrepareAttributesForInstances(h, r), D.PrepareAttributesForMorphTargets(h, e, r), D.PrepareAttributesForBakedVertexAnimation(h, e, r);
      let c = "default";
      const p = [
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
      ], E = [
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
      ], g = ["Material", "Scene", "Mesh"];
      this._eventInfo.fallbacks = f, this._eventInfo.fallbackRank = 0, this._eventInfo.defines = r, this._eventInfo.uniforms = p, this._eventInfo.attributes = h, this._eventInfo.samplers = E, this._eventInfo.uniformBuffersNames = g, this._eventInfo.customCode = void 0, this._eventInfo.mesh = e, this._callbackPluginEventGeneric(xe.PrepareEffect, this._eventInfo), Yt.AddUniforms(p), Ct && (Ct.PrepareUniforms(p, r), Ct.PrepareSamplers(E, r)), D.PrepareUniformsAndSamplersList({
        uniformsNames: p,
        uniformBuffersNames: g,
        samplers: E,
        defines: r,
        maxSimultaneousLights: this._maxSimultaneousLights
      }), nt(p);
      const _ = {};
      this.customShaderNameResolve && (c = this.customShaderNameResolve(c, p, g, E, r, h, _));
      const S = r.toString(), I = t.effect;
      let M = s.getEngine().createEffect(c, {
        attributes: h,
        uniformsNames: p,
        uniformBuffersNames: g,
        samplers: E,
        defines: S,
        fallbacks: f,
        onCompiled: this.onCompiled,
        onError: this.onError,
        indexParameters: { maxSimultaneousLights: this._maxSimultaneousLights, maxSimultaneousMorphTargets: r.NUM_MORPH_INFLUENCERS },
        processFinalCode: _.processFinalCode,
        processCodeAfterIncludes: this._eventInfo.customCode,
        multiTarget: r.PREPASS
      }, n);
      if (this._eventInfo.customCode = void 0, M)
        if (this._onEffectCreatedObservable && (wt.effect = M, wt.subMesh = t, this._onEffectCreatedObservable.notifyObservers(wt)), this.allowShaderHotSwapping && I && !M.isReady()) {
          if (M = I, r.markAsUnprocessed(), o = this.isFrozen, l)
            return r._areLightsDisposed = !0, !1;
        } else
          s.resetCachedMaterial(), t.setEffect(M, r, this._materialContext);
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
    const r = this.getScene(), n = i.materialDefines;
    if (!n)
      return;
    const a = i.effect;
    if (!a)
      return;
    this._activeEffect = a, t.getMeshUniformBuffer().bindToEffect(a, "Mesh"), t.transferToEffect(e), this._uniformBuffer.bindToEffect(a, "Material"), this.prePassConfiguration.bindForSubMesh(this._activeEffect, r, t, e, this.isFrozen), this._eventInfo.subMesh = i, this._callbackPluginEventHardBindForSubMesh(this._eventInfo), n.OBJECTSPACE_NORMALMAP && (e.toNormalMatrix(this._normalMatrix), this.bindOnlyNormalMatrix(this._normalMatrix));
    const o = a._forceRebindOnNextCall || this._mustRebind(r, a, t.visibility);
    D.BindBonesParameters(t, a);
    const l = this._uniformBuffer;
    if (o) {
      if (this.bindViewProjection(a), !l.useUbo || !this.isFrozen || !l.isSync || a._forceRebindOnNextCall) {
        if (v.FresnelEnabled && n.FRESNEL && (this.diffuseFresnelParameters && this.diffuseFresnelParameters.isEnabled && (l.updateColor4("diffuseLeftColor", this.diffuseFresnelParameters.leftColor, this.diffuseFresnelParameters.power), l.updateColor4("diffuseRightColor", this.diffuseFresnelParameters.rightColor, this.diffuseFresnelParameters.bias)), this.opacityFresnelParameters && this.opacityFresnelParameters.isEnabled && l.updateColor4("opacityParts", new me(this.opacityFresnelParameters.leftColor.toLuminance(), this.opacityFresnelParameters.rightColor.toLuminance(), this.opacityFresnelParameters.bias), this.opacityFresnelParameters.power), this.reflectionFresnelParameters && this.reflectionFresnelParameters.isEnabled && (l.updateColor4("reflectionLeftColor", this.reflectionFresnelParameters.leftColor, this.reflectionFresnelParameters.power), l.updateColor4("reflectionRightColor", this.reflectionFresnelParameters.rightColor, this.reflectionFresnelParameters.bias)), this.refractionFresnelParameters && this.refractionFresnelParameters.isEnabled && (l.updateColor4("refractionLeftColor", this.refractionFresnelParameters.leftColor, this.refractionFresnelParameters.power), l.updateColor4("refractionRightColor", this.refractionFresnelParameters.rightColor, this.refractionFresnelParameters.bias)), this.emissiveFresnelParameters && this.emissiveFresnelParameters.isEnabled && (l.updateColor4("emissiveLeftColor", this.emissiveFresnelParameters.leftColor, this.emissiveFresnelParameters.power), l.updateColor4("emissiveRightColor", this.emissiveFresnelParameters.rightColor, this.emissiveFresnelParameters.bias))), r.texturesEnabled) {
          if (this._diffuseTexture && v.DiffuseTextureEnabled && (l.updateFloat2("vDiffuseInfos", this._diffuseTexture.coordinatesIndex, this._diffuseTexture.level), D.BindTextureMatrix(this._diffuseTexture, l, "diffuse")), this._ambientTexture && v.AmbientTextureEnabled && (l.updateFloat2("vAmbientInfos", this._ambientTexture.coordinatesIndex, this._ambientTexture.level), D.BindTextureMatrix(this._ambientTexture, l, "ambient")), this._opacityTexture && v.OpacityTextureEnabled && (l.updateFloat2("vOpacityInfos", this._opacityTexture.coordinatesIndex, this._opacityTexture.level), D.BindTextureMatrix(this._opacityTexture, l, "opacity")), this._hasAlphaChannel() && l.updateFloat("alphaCutOff", this.alphaCutOff), this._reflectionTexture && v.ReflectionTextureEnabled && (l.updateFloat2("vReflectionInfos", this._reflectionTexture.level, this.roughness), l.updateMatrix("reflectionMatrix", this._reflectionTexture.getReflectionTextureMatrix()), this._reflectionTexture.boundingBoxSize)) {
            const f = this._reflectionTexture;
            l.updateVector3("vReflectionPosition", f.boundingBoxPosition), l.updateVector3("vReflectionSize", f.boundingBoxSize);
          }
          if (this._emissiveTexture && v.EmissiveTextureEnabled && (l.updateFloat2("vEmissiveInfos", this._emissiveTexture.coordinatesIndex, this._emissiveTexture.level), D.BindTextureMatrix(this._emissiveTexture, l, "emissive")), this._lightmapTexture && v.LightmapTextureEnabled && (l.updateFloat2("vLightmapInfos", this._lightmapTexture.coordinatesIndex, this._lightmapTexture.level), D.BindTextureMatrix(this._lightmapTexture, l, "lightmap")), this._specularTexture && v.SpecularTextureEnabled && (l.updateFloat2("vSpecularInfos", this._specularTexture.coordinatesIndex, this._specularTexture.level), D.BindTextureMatrix(this._specularTexture, l, "specular")), this._bumpTexture && r.getEngine().getCaps().standardDerivatives && v.BumpTextureEnabled && (l.updateFloat3("vBumpInfos", this._bumpTexture.coordinatesIndex, 1 / this._bumpTexture.level, this.parallaxScaleBias), D.BindTextureMatrix(this._bumpTexture, l, "bump"), r._mirroredCameraPosition ? l.updateFloat2("vTangentSpaceParams", this._invertNormalMapX ? 1 : -1, this._invertNormalMapY ? 1 : -1) : l.updateFloat2("vTangentSpaceParams", this._invertNormalMapX ? -1 : 1, this._invertNormalMapY ? -1 : 1)), this._refractionTexture && v.RefractionTextureEnabled) {
            let f = 1;
            if (this._refractionTexture.isCube || (l.updateMatrix("refractionMatrix", this._refractionTexture.getReflectionTextureMatrix()), this._refractionTexture.depth && (f = this._refractionTexture.depth)), l.updateFloat4("vRefractionInfos", this._refractionTexture.level, this.indexOfRefraction, f, this.invertRefractionY ? -1 : 1), this._refractionTexture.boundingBoxSize) {
              const h = this._refractionTexture;
              l.updateVector3("vRefractionPosition", h.boundingBoxPosition), l.updateVector3("vRefractionSize", h.boundingBoxSize);
            }
          }
        }
        this.pointsCloud && l.updateFloat("pointSize", this.pointSize), n.SPECULARTERM && l.updateColor4("vSpecularColor", this.specularColor, this.specularPower), l.updateColor3("vEmissiveColor", v.EmissiveTextureEnabled ? this.emissiveColor : me.BlackReadOnly), l.updateColor4("vDiffuseColor", this.diffuseColor, this.alpha), r.ambientColor.multiplyToRef(this.ambientColor, this._globalAmbientColor), l.updateColor3("vAmbientColor", this._globalAmbientColor);
      }
      r.texturesEnabled && (this._diffuseTexture && v.DiffuseTextureEnabled && a.setTexture("diffuseSampler", this._diffuseTexture), this._ambientTexture && v.AmbientTextureEnabled && a.setTexture("ambientSampler", this._ambientTexture), this._opacityTexture && v.OpacityTextureEnabled && a.setTexture("opacitySampler", this._opacityTexture), this._reflectionTexture && v.ReflectionTextureEnabled && (this._reflectionTexture.isCube ? a.setTexture("reflectionCubeSampler", this._reflectionTexture) : a.setTexture("reflection2DSampler", this._reflectionTexture)), this._emissiveTexture && v.EmissiveTextureEnabled && a.setTexture("emissiveSampler", this._emissiveTexture), this._lightmapTexture && v.LightmapTextureEnabled && a.setTexture("lightmapSampler", this._lightmapTexture), this._specularTexture && v.SpecularTextureEnabled && a.setTexture("specularSampler", this._specularTexture), this._bumpTexture && r.getEngine().getCaps().standardDerivatives && v.BumpTextureEnabled && a.setTexture("bumpSampler", this._bumpTexture), this._refractionTexture && v.RefractionTextureEnabled && (this._refractionTexture.isCube ? a.setTexture("refractionCubeSampler", this._refractionTexture) : a.setTexture("refraction2DSampler", this._refractionTexture))), this.getScene().useOrderIndependentTransparency && this.needAlphaBlendingForMesh(t) && this.getScene().depthPeelingRenderer.bind(a), this._eventInfo.subMesh = i, this._callbackPluginEventBindForSubMesh(this._eventInfo), at(a, this, r), this.bindEyePosition(a);
    } else
      r.getEngine()._features.needToAlwaysBindUniformBuffers && (this._needToBindSceneUbo = !0);
    (o || !this.isFrozen) && (r.lightsEnabled && !this._disableLighting && D.BindLights(r, t, a, n, this._maxSimultaneousLights), (r.fogEnabled && t.applyFog && r.fogMode !== vt.FOGMODE_NONE || this._reflectionTexture || this._refractionTexture || t.receiveShadows || n.PREPASS) && this.bindView(a), D.BindFogParameters(r, t, a), n.NUM_MORPH_INFLUENCERS && D.BindMorphTargetParameters(t, a), n.BAKED_VERTEX_ANIMATION_TEXTURE && ((s = t.bakedVertexAnimationManager) === null || s === void 0 || s.bind(a, n.INSTANCES)), this.useLogarithmicDepth && D.BindLogDepth(n, a, r), this._imageProcessingConfiguration && !this._imageProcessingConfiguration.applyByPostProcess && this._imageProcessingConfiguration.bind(this._activeEffect)), this._afterBind(t, this._activeEffect), l.update();
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
    var i, s, r, n, a, o, l, f, h;
    t && ((i = this._diffuseTexture) === null || i === void 0 || i.dispose(), (s = this._ambientTexture) === null || s === void 0 || s.dispose(), (r = this._opacityTexture) === null || r === void 0 || r.dispose(), (n = this._reflectionTexture) === null || n === void 0 || n.dispose(), (a = this._emissiveTexture) === null || a === void 0 || a.dispose(), (o = this._specularTexture) === null || o === void 0 || o.dispose(), (l = this._bumpTexture) === null || l === void 0 || l.dispose(), (f = this._lightmapTexture) === null || f === void 0 || f.dispose(), (h = this._refractionTexture) === null || h === void 0 || h.dispose()), this._imageProcessingConfiguration && this._imageProcessingObserver && this._imageProcessingConfiguration.onUpdateParameters.remove(this._imageProcessingObserver), super.dispose(e, t);
  }
  /**
   * Makes a duplicate of the material, and gives it a new name
   * @param name defines the new name for the duplicated material
   * @returns the cloned material
   */
  clone(e) {
    const t = q.Clone(() => new v(e, this.getScene()), this);
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
    const s = q.Parse(() => new v(e.name, t), e, t, i);
    return e.stencil && s.stencil.parse(e.stencil, t, i), s;
  }
  // Flags used to enable or disable a type of texture for all Standard Materials
  /**
   * Are diffuse textures enabled in the application.
   */
  static get DiffuseTextureEnabled() {
    return w.DiffuseTextureEnabled;
  }
  static set DiffuseTextureEnabled(e) {
    w.DiffuseTextureEnabled = e;
  }
  /**
   * Are detail textures enabled in the application.
   */
  static get DetailTextureEnabled() {
    return w.DetailTextureEnabled;
  }
  static set DetailTextureEnabled(e) {
    w.DetailTextureEnabled = e;
  }
  /**
   * Are ambient textures enabled in the application.
   */
  static get AmbientTextureEnabled() {
    return w.AmbientTextureEnabled;
  }
  static set AmbientTextureEnabled(e) {
    w.AmbientTextureEnabled = e;
  }
  /**
   * Are opacity textures enabled in the application.
   */
  static get OpacityTextureEnabled() {
    return w.OpacityTextureEnabled;
  }
  static set OpacityTextureEnabled(e) {
    w.OpacityTextureEnabled = e;
  }
  /**
   * Are reflection textures enabled in the application.
   */
  static get ReflectionTextureEnabled() {
    return w.ReflectionTextureEnabled;
  }
  static set ReflectionTextureEnabled(e) {
    w.ReflectionTextureEnabled = e;
  }
  /**
   * Are emissive textures enabled in the application.
   */
  static get EmissiveTextureEnabled() {
    return w.EmissiveTextureEnabled;
  }
  static set EmissiveTextureEnabled(e) {
    w.EmissiveTextureEnabled = e;
  }
  /**
   * Are specular textures enabled in the application.
   */
  static get SpecularTextureEnabled() {
    return w.SpecularTextureEnabled;
  }
  static set SpecularTextureEnabled(e) {
    w.SpecularTextureEnabled = e;
  }
  /**
   * Are bump textures enabled in the application.
   */
  static get BumpTextureEnabled() {
    return w.BumpTextureEnabled;
  }
  static set BumpTextureEnabled(e) {
    w.BumpTextureEnabled = e;
  }
  /**
   * Are lightmap textures enabled in the application.
   */
  static get LightmapTextureEnabled() {
    return w.LightmapTextureEnabled;
  }
  static set LightmapTextureEnabled(e) {
    w.LightmapTextureEnabled = e;
  }
  /**
   * Are refraction textures enabled in the application.
   */
  static get RefractionTextureEnabled() {
    return w.RefractionTextureEnabled;
  }
  static set RefractionTextureEnabled(e) {
    w.RefractionTextureEnabled = e;
  }
  /**
   * Are color grading textures enabled in the application.
   */
  static get ColorGradingTextureEnabled() {
    return w.ColorGradingTextureEnabled;
  }
  static set ColorGradingTextureEnabled(e) {
    w.ColorGradingTextureEnabled = e;
  }
  /**
   * Are fresnels enabled in the application.
   */
  static get FresnelEnabled() {
    return w.FresnelEnabled;
  }
  static set FresnelEnabled(e) {
    w.FresnelEnabled = e;
  }
}
u([
  pe("diffuseTexture")
], v.prototype, "_diffuseTexture", void 0);
u([
  B("_markAllSubMeshesAsTexturesAndMiscDirty")
], v.prototype, "diffuseTexture", void 0);
u([
  pe("ambientTexture")
], v.prototype, "_ambientTexture", void 0);
u([
  B("_markAllSubMeshesAsTexturesDirty")
], v.prototype, "ambientTexture", void 0);
u([
  pe("opacityTexture")
], v.prototype, "_opacityTexture", void 0);
u([
  B("_markAllSubMeshesAsTexturesAndMiscDirty")
], v.prototype, "opacityTexture", void 0);
u([
  pe("reflectionTexture")
], v.prototype, "_reflectionTexture", void 0);
u([
  B("_markAllSubMeshesAsTexturesDirty")
], v.prototype, "reflectionTexture", void 0);
u([
  pe("emissiveTexture")
], v.prototype, "_emissiveTexture", void 0);
u([
  B("_markAllSubMeshesAsTexturesDirty")
], v.prototype, "emissiveTexture", void 0);
u([
  pe("specularTexture")
], v.prototype, "_specularTexture", void 0);
u([
  B("_markAllSubMeshesAsTexturesDirty")
], v.prototype, "specularTexture", void 0);
u([
  pe("bumpTexture")
], v.prototype, "_bumpTexture", void 0);
u([
  B("_markAllSubMeshesAsTexturesDirty")
], v.prototype, "bumpTexture", void 0);
u([
  pe("lightmapTexture")
], v.prototype, "_lightmapTexture", void 0);
u([
  B("_markAllSubMeshesAsTexturesDirty")
], v.prototype, "lightmapTexture", void 0);
u([
  pe("refractionTexture")
], v.prototype, "_refractionTexture", void 0);
u([
  B("_markAllSubMeshesAsTexturesDirty")
], v.prototype, "refractionTexture", void 0);
u([
  lt("ambient")
], v.prototype, "ambientColor", void 0);
u([
  lt("diffuse")
], v.prototype, "diffuseColor", void 0);
u([
  lt("specular")
], v.prototype, "specularColor", void 0);
u([
  lt("emissive")
], v.prototype, "emissiveColor", void 0);
u([
  T()
], v.prototype, "specularPower", void 0);
u([
  T("useAlphaFromDiffuseTexture")
], v.prototype, "_useAlphaFromDiffuseTexture", void 0);
u([
  B("_markAllSubMeshesAsTexturesAndMiscDirty")
], v.prototype, "useAlphaFromDiffuseTexture", void 0);
u([
  T("useEmissiveAsIllumination")
], v.prototype, "_useEmissiveAsIllumination", void 0);
u([
  B("_markAllSubMeshesAsTexturesDirty")
], v.prototype, "useEmissiveAsIllumination", void 0);
u([
  T("linkEmissiveWithDiffuse")
], v.prototype, "_linkEmissiveWithDiffuse", void 0);
u([
  B("_markAllSubMeshesAsTexturesDirty")
], v.prototype, "linkEmissiveWithDiffuse", void 0);
u([
  T("useSpecularOverAlpha")
], v.prototype, "_useSpecularOverAlpha", void 0);
u([
  B("_markAllSubMeshesAsTexturesDirty")
], v.prototype, "useSpecularOverAlpha", void 0);
u([
  T("useReflectionOverAlpha")
], v.prototype, "_useReflectionOverAlpha", void 0);
u([
  B("_markAllSubMeshesAsTexturesDirty")
], v.prototype, "useReflectionOverAlpha", void 0);
u([
  T("disableLighting")
], v.prototype, "_disableLighting", void 0);
u([
  B("_markAllSubMeshesAsLightsDirty")
], v.prototype, "disableLighting", void 0);
u([
  T("useObjectSpaceNormalMap")
], v.prototype, "_useObjectSpaceNormalMap", void 0);
u([
  B("_markAllSubMeshesAsTexturesDirty")
], v.prototype, "useObjectSpaceNormalMap", void 0);
u([
  T("useParallax")
], v.prototype, "_useParallax", void 0);
u([
  B("_markAllSubMeshesAsTexturesDirty")
], v.prototype, "useParallax", void 0);
u([
  T("useParallaxOcclusion")
], v.prototype, "_useParallaxOcclusion", void 0);
u([
  B("_markAllSubMeshesAsTexturesDirty")
], v.prototype, "useParallaxOcclusion", void 0);
u([
  T()
], v.prototype, "parallaxScaleBias", void 0);
u([
  T("roughness")
], v.prototype, "_roughness", void 0);
u([
  B("_markAllSubMeshesAsTexturesDirty")
], v.prototype, "roughness", void 0);
u([
  T()
], v.prototype, "indexOfRefraction", void 0);
u([
  T()
], v.prototype, "invertRefractionY", void 0);
u([
  T()
], v.prototype, "alphaCutOff", void 0);
u([
  T("useLightmapAsShadowmap")
], v.prototype, "_useLightmapAsShadowmap", void 0);
u([
  B("_markAllSubMeshesAsTexturesDirty")
], v.prototype, "useLightmapAsShadowmap", void 0);
u([
  ht("diffuseFresnelParameters")
], v.prototype, "_diffuseFresnelParameters", void 0);
u([
  B("_markAllSubMeshesAsFresnelDirty")
], v.prototype, "diffuseFresnelParameters", void 0);
u([
  ht("opacityFresnelParameters")
], v.prototype, "_opacityFresnelParameters", void 0);
u([
  B("_markAllSubMeshesAsFresnelAndMiscDirty")
], v.prototype, "opacityFresnelParameters", void 0);
u([
  ht("reflectionFresnelParameters")
], v.prototype, "_reflectionFresnelParameters", void 0);
u([
  B("_markAllSubMeshesAsFresnelDirty")
], v.prototype, "reflectionFresnelParameters", void 0);
u([
  ht("refractionFresnelParameters")
], v.prototype, "_refractionFresnelParameters", void 0);
u([
  B("_markAllSubMeshesAsFresnelDirty")
], v.prototype, "refractionFresnelParameters", void 0);
u([
  ht("emissiveFresnelParameters")
], v.prototype, "_emissiveFresnelParameters", void 0);
u([
  B("_markAllSubMeshesAsFresnelDirty")
], v.prototype, "emissiveFresnelParameters", void 0);
u([
  T("useReflectionFresnelFromSpecular")
], v.prototype, "_useReflectionFresnelFromSpecular", void 0);
u([
  B("_markAllSubMeshesAsFresnelDirty")
], v.prototype, "useReflectionFresnelFromSpecular", void 0);
u([
  T("useGlossinessFromSpecularMapAlpha")
], v.prototype, "_useGlossinessFromSpecularMapAlpha", void 0);
u([
  B("_markAllSubMeshesAsTexturesDirty")
], v.prototype, "useGlossinessFromSpecularMapAlpha", void 0);
u([
  T("maxSimultaneousLights")
], v.prototype, "_maxSimultaneousLights", void 0);
u([
  B("_markAllSubMeshesAsLightsDirty")
], v.prototype, "maxSimultaneousLights", void 0);
u([
  T("invertNormalMapX")
], v.prototype, "_invertNormalMapX", void 0);
u([
  B("_markAllSubMeshesAsTexturesDirty")
], v.prototype, "invertNormalMapX", void 0);
u([
  T("invertNormalMapY")
], v.prototype, "_invertNormalMapY", void 0);
u([
  B("_markAllSubMeshesAsTexturesDirty")
], v.prototype, "invertNormalMapY", void 0);
u([
  T("twoSidedLighting")
], v.prototype, "_twoSidedLighting", void 0);
u([
  B("_markAllSubMeshesAsTexturesDirty")
], v.prototype, "twoSidedLighting", void 0);
u([
  T()
], v.prototype, "useLogarithmicDepth", null);
ye("BABYLON.StandardMaterial", v);
vt.DefaultMaterialFactory = (d) => new v("default material", d);
const ua = "imageProcessingCompatibility", pa = `#ifdef IMAGEPROCESSINGPOSTPROCESS
gl_FragColor.rgb=pow(gl_FragColor.rgb,vec3(2.2));
#endif
`;
x.IncludesShadersStore[ua] = pa;
const _a = "shadowOnlyPixelShader", ma = `precision highp float;
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
x.ShadersStore[_a] = ma;
const ga = "shadowOnlyVertexShader", va = `precision highp float;
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
x.ShadersStore[ga] = va;
class Ea extends yt {
  constructor() {
    super(), this.CLIPPLANE = !1, this.CLIPPLANE2 = !1, this.CLIPPLANE3 = !1, this.CLIPPLANE4 = !1, this.CLIPPLANE5 = !1, this.CLIPPLANE6 = !1, this.POINTSIZE = !1, this.FOG = !1, this.NORMAL = !1, this.NUM_BONE_INFLUENCERS = 0, this.BonesPerMesh = 0, this.INSTANCES = !1, this.IMAGEPROCESSINGPOSTPROCESS = !1, this.SKIPFINALCOLORCLAMP = !1, this.rebuild();
  }
}
class et extends ri {
  constructor(e, t) {
    super(e, t), this._needAlphaBlending = !0, this.shadowColor = me.Black();
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
    t.materialDefines || (t.materialDefines = new Ea());
    const r = t.materialDefines, n = this.getScene();
    if (this._isReadyForSubMesh(t))
      return !0;
    const a = n.getEngine();
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
    D.PrepareDefinesForFrameBoundValues(n, a, this, r, !!i), D.PrepareDefinesForMisc(e, n, !1, this.pointsCloud, this.fogEnabled, this._shouldTurnAlphaTestOn(e), r), r._needNormals = D.PrepareDefinesForLights(n, e, r, !1, 1);
    const o = (s = this._getFirstShadowLightForMesh(e)) === null || s === void 0 ? void 0 : s.getShadowGenerator();
    if (this._needAlphaBlending = !0, o && o.getClassName && o.getClassName() === "CascadedShadowGenerator") {
      const l = o;
      this._needAlphaBlending = !l.autoCalcDepthBounds;
    }
    if (D.PrepareDefinesForAttributes(e, r, !1, !0), r.isDirty) {
      r.markAsProcessed(), n.resetCachedMaterial();
      const l = new Et();
      r.FOG && l.addFallback(1, "FOG"), D.HandleFallbacksForShadows(r, l, 1), r.NUM_BONE_INFLUENCERS > 0 && l.addCPUSkinningFallback(0, e), r.IMAGEPROCESSINGPOSTPROCESS = n.imageProcessingConfiguration.applyByPostProcess;
      const f = [L.PositionKind];
      r.NORMAL && f.push(L.NormalKind), D.PrepareAttributesForBones(f, e, r, l), D.PrepareAttributesForInstances(f, r);
      const h = "shadowOnly", c = r.toString(), p = ["world", "view", "viewProjection", "vEyePosition", "vLightsType", "vFogInfos", "vFogColor", "pointSize", "alpha", "shadowColor", "mBones"], E = new Array(), g = new Array();
      nt(p), D.PrepareUniformsAndSamplersList({
        uniformsNames: p,
        uniformBuffersNames: g,
        samplers: E,
        defines: r,
        maxSimultaneousLights: 1
      }), t.setEffect(n.getEngine().createEffect(h, {
        attributes: f,
        uniformsNames: p,
        uniformBuffersNames: g,
        samplers: E,
        defines: c,
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
      if (this._activeEffect = n, this.bindOnlyWorldMatrix(e), this._activeEffect.setMatrix("viewProjection", s.getTransformMatrix()), D.BindBonesParameters(t, this._activeEffect), this._mustRebind(s, n) && (at(n, this, s), this.pointsCloud && this._activeEffect.setFloat("pointSize", this.pointSize), this._activeEffect.setFloat("alpha", this.alpha), this._activeEffect.setColor3("shadowColor", this.shadowColor), s.bindEyePosition(n)), s.lightsEnabled) {
        D.BindLights(s, t, this._activeEffect, r, 1);
        const a = this._getFirstShadowLightForMesh(t);
        a && (a._renderId = -1);
      }
      (s.fogEnabled && t.applyFog && s.fogMode !== vt.FOGMODE_NONE || r.SHADOWCSM0) && this._activeEffect.setMatrix("view", s.getViewMatrix()), D.BindFogParameters(s, t, this._activeEffect), this._afterBind(t, this._activeEffect);
    }
  }
  clone(e) {
    return q.Clone(() => new et(e, this.getScene()), this);
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
    return q.Parse(() => new et(e.name, t), e, t, i);
  }
}
ye("BABYLON.ShadowOnlyMaterial", et);
const Sa = {
  aspect: 300 / 150,
  enableDebugging: !1,
  enableShadows: !0
};
class Ta {
  constructor(e) {
    Ie(this, "size", 9.5);
    this.config = { ...Sa, ...e }, this.create();
  }
  create(e) {
    this.destroy(), Object.assign(this.config, e);
    const { aspect: t, enableDebugging: i, enableShadows: s } = this.config, r = 30;
    this.box = new xi("diceBox");
    let n = new et("shadowOnly", this.config.scene);
    n.alpha = s ? 1 : 0, i && (n = new v("diceBox_material"), n.alpha = 0.7, n.diffuseColor = new me(1, 1, 0));
    const a = ke("ground", {
      width: this.size * 2,
      height: 1,
      depth: this.size * 2
    }, this.config.scene);
    if (a.scaling = new R(t, 1, 1), a.material = n, a.receiveShadows = !0, a.setParent(this.box), i) {
      const o = ke("wallTop", {
        width: this.size,
        height: r,
        depth: 1
      }, this.config.scene);
      o.position.y = r / 2, o.position.z = this.size / -2, o.scaling = new R(t, 1, 1), o.material = n, o.setParent(this.box);
      const l = ke("wallRight", {
        width: 1,
        height: r,
        depth: this.size
      }, this.config.scene);
      l.position.x = this.size * t / 2, l.position.y = r / 2, l.material = n, l.setParent(this.box);
      const f = ke("wallBottom", {
        width: this.size,
        height: r,
        depth: 1
      }, this.config.scene);
      f.position.y = r / 2, f.position.z = this.size / 2, f.scaling = new R(t, 1, 1), f.material = n, f.setParent(this.box);
      const h = ke("wallLeft", {
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
class xa {
  constructor() {
  }
}
class Le extends v {
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
    this._isCreatedShader = !1, Le.ShaderIndexer++;
    const a = "custom_" + Le.ShaderIndexer, o = this._afterBind.bind(this);
    return this._afterBind = (l, f) => {
      if (f) {
        this.AttachAfterBind(l, f);
        try {
          o(l, f);
        } catch {
        }
      }
    }, Te.ShadersStore[a + "VertexShader"] = this.VertexShader.replace("#define CUSTOM_VERTEX_BEGIN", this.CustomParts.Vertex_Begin ? this.CustomParts.Vertex_Begin : "").replace("#define CUSTOM_VERTEX_DEFINITIONS", (this._customUniform ? this._customUniform.join(`
`) : "") + (this.CustomParts.Vertex_Definitions ? this.CustomParts.Vertex_Definitions : "")).replace("#define CUSTOM_VERTEX_MAIN_BEGIN", this.CustomParts.Vertex_MainBegin ? this.CustomParts.Vertex_MainBegin : "").replace("#define CUSTOM_VERTEX_UPDATE_POSITION", this.CustomParts.Vertex_Before_PositionUpdated ? this.CustomParts.Vertex_Before_PositionUpdated : "").replace("#define CUSTOM_VERTEX_UPDATE_NORMAL", this.CustomParts.Vertex_Before_NormalUpdated ? this.CustomParts.Vertex_Before_NormalUpdated : "").replace("#define CUSTOM_VERTEX_MAIN_END", this.CustomParts.Vertex_MainEnd ? this.CustomParts.Vertex_MainEnd : ""), this.CustomParts.Vertex_After_WorldPosComputed && (Te.ShadersStore[a + "VertexShader"] = Te.ShadersStore[a + "VertexShader"].replace("#define CUSTOM_VERTEX_UPDATE_WORLDPOS", this.CustomParts.Vertex_After_WorldPosComputed)), Te.ShadersStore[a + "PixelShader"] = this.FragmentShader.replace("#define CUSTOM_FRAGMENT_BEGIN", this.CustomParts.Fragment_Begin ? this.CustomParts.Fragment_Begin : "").replace("#define CUSTOM_FRAGMENT_MAIN_BEGIN", this.CustomParts.Fragment_MainBegin ? this.CustomParts.Fragment_MainBegin : "").replace("#define CUSTOM_FRAGMENT_DEFINITIONS", (this._customUniform ? this._customUniform.join(`
`) : "") + (this.CustomParts.Fragment_Definitions ? this.CustomParts.Fragment_Definitions : "")).replace("#define CUSTOM_FRAGMENT_UPDATE_DIFFUSE", this.CustomParts.Fragment_Custom_Diffuse ? this.CustomParts.Fragment_Custom_Diffuse : "").replace("#define CUSTOM_FRAGMENT_UPDATE_ALPHA", this.CustomParts.Fragment_Custom_Alpha ? this.CustomParts.Fragment_Custom_Alpha : "").replace("#define CUSTOM_FRAGMENT_BEFORE_LIGHTS", this.CustomParts.Fragment_Before_Lights ? this.CustomParts.Fragment_Before_Lights : "").replace("#define CUSTOM_FRAGMENT_BEFORE_FRAGCOLOR", this.CustomParts.Fragment_Before_FragColor ? this.CustomParts.Fragment_Before_FragColor : "").replace("#define CUSTOM_FRAGMENT_MAIN_END", this.CustomParts.Fragment_MainEnd ? this.CustomParts.Fragment_MainEnd : ""), this.CustomParts.Fragment_Before_Fog && (Te.ShadersStore[a + "PixelShader"] = Te.ShadersStore[a + "PixelShader"].replace("#define CUSTOM_FRAGMENT_BEFORE_FOG", this.CustomParts.Fragment_Before_Fog)), this._isCreatedShader = !0, this._createdShaderName = a, a;
  }
  constructor(e, t) {
    super(e, t), this.CustomParts = new xa(), this.customShaderNameResolve = this.Builder, this.FragmentShader = Te.ShadersStore.defaultPixelShader, this.VertexShader = Te.ShadersStore.defaultVertexShader;
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
Le.ShaderIndexer = 1;
ye("BABYLON.CustomMaterial", Le);
Le.prototype.clone = function(d) {
  const e = this, t = q.Clone(() => new Le(d, this.getScene()), this);
  return t.name = d, t.id = d, t.CustomParts.Fragment_Begin = e.CustomParts.Fragment_Begin, t.CustomParts.Fragment_Definitions = e.CustomParts.Fragment_Definitions, t.CustomParts.Fragment_MainBegin = e.CustomParts.Fragment_MainBegin, t.CustomParts.Fragment_Custom_Diffuse = e.CustomParts.Fragment_Custom_Diffuse, t.CustomParts.Fragment_Before_Lights = e.CustomParts.Fragment_Before_Lights, t.CustomParts.Fragment_Before_Fog = e.CustomParts.Fragment_Before_Fog, t.CustomParts.Fragment_Custom_Alpha = e.CustomParts.Fragment_Custom_Alpha, t.CustomParts.Fragment_Before_FragColor = e.CustomParts.Fragment_Before_FragColor, t.CustomParts.Vertex_Begin = e.CustomParts.Vertex_Begin, t.CustomParts.Vertex_Definitions = e.CustomParts.Vertex_Definitions, t.CustomParts.Vertex_MainBegin = e.CustomParts.Vertex_MainBegin, t.CustomParts.Vertex_Before_PositionUpdated = e.CustomParts.Vertex_Before_PositionUpdated, t.CustomParts.Vertex_Before_NormalUpdated = e.CustomParts.Vertex_Before_NormalUpdated, t.CustomParts.Vertex_After_WorldPosComputed = e.CustomParts.Vertex_After_WorldPosComputed, t.CustomParts.Vertex_MainEnd = e.CustomParts.Vertex_MainEnd, t;
};
class Ma {
  constructor(e) {
    Ie(this, "loadedThemes", {});
    Ie(this, "themeData", {});
    this.scene = e.scene;
  }
  async loadStandardMaterial(e) {
    const { theme: t, material: i } = e, s = new v(t, this.scene);
    i.diffuseTexture && (s.diffuseTexture = await this.getTexture("diffuse", e)), i.bumpTexture && (s.bumpTexture = await this.getTexture("bump", e)), i.specularTexture && (s.specularTexture = await this.getTexture("specular", e)), s.allowShaderHotSwapping = !1;
  }
  // this will create two materials - one with light text and one with dark text, the underlying color can be changed by color instance buffers
  async loadColorMaterial(e) {
    const { theme: t, material: i } = e, s = new Le(t + "_light", this.scene), r = Mi(e);
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
      let r = e.match(/^(.*\/)(.*)$/), n = new m(
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
const Aa = (d) => {
  const e = d.replace("#", "");
  return {
    r: parseInt(e.slice(0, 2), 16) / 255,
    g: parseInt(e.slice(2, 4), 16) / 255,
    b: parseInt(e.slice(4, 6), 16) / 255
  };
};
var j, Ye, ge, $e, be, Ze, Fe, je, ce, se, K, ut, ue, tt, it, ne, rt, pt, si, _t, ni, mt, ai;
class ba {
  constructor(e) {
    // add a die to the scene
    Y(this, pt);
    // Feature: number flare — lazily create the GlowLayer the first time a flare fires.
    // The selector runs per rendered mesh during the glow pass; non-flaring meshes
    // return transparent (cheap) so only winning dice bloom. The envelope gives a
    // fast attack then a long quadratic ease-out — that's the "flare" shape.
    Y(this, _t);
    // Register a winning die to flare. color / intensity / durationMs reuse highlightResult.
    Y(this, mt);
    Ie(this, "config");
    Ie(this, "initialized", !1);
    Y(this, j, {});
    Y(this, Ye, 0);
    Y(this, ge, 0);
    Y(this, $e, !1);
    Y(this, be, null);
    Y(this, Ze, null);
    Y(this, Fe, /* @__PURE__ */ new Map());
    Y(this, je, []);
    Y(this, ce, void 0);
    Y(this, se, void 0);
    Y(this, K, void 0);
    Y(this, ut, void 0);
    Y(this, ue, void 0);
    Y(this, tt, void 0);
    Y(this, it, void 0);
    Y(this, ne, void 0);
    Y(this, rt, {});
    Ie(this, "noop", () => {
    });
    Ie(this, "diceBufferView", new Float32Array(8e3));
    this.onInitComplete = e.onInitComplete || this.noop, this.onThemeLoaded = e.onThemeLoaded || this.noop, this.onRollResult = e.onRollResult || this.noop, this.onRollComplete = e.onRollComplete || this.noop, this.onDieRemoved = e.onDieRemoved || this.noop, this.initialized = this.initScene(e);
  }
  // initialize the babylon scene
  async initScene(e) {
    Z(this, ce, e.canvas), A(this, ce).width = e.width, A(this, ce).height = e.height, this.config = e.options, Z(this, se, wr(A(this, ce))), Z(this, K, Or({ engine: A(this, se) })), Z(this, ut, Nr({ engine: A(this, se), scene: A(this, K) })), Z(this, ue, Gt({
      enableShadows: this.config.enableShadows,
      shadowTransparency: this.config.shadowTransparency,
      intensity: this.config.lightIntensity,
      scene: A(this, K)
    })), Z(this, tt, new Ta({
      enableShadows: this.config.enableShadows,
      aspect: A(this, ce).width / A(this, ce).height,
      lights: A(this, ue),
      scene: A(this, K)
    })), Z(this, it, new Ma({ scene: A(this, K) })), this.onInitComplete();
  }
  connect(e) {
    Z(this, ne, e), A(this, ne).postMessage({
      action: "initBuffer",
      diceBuffer: this.diceBufferView.buffer
    }, [this.diceBufferView.buffer]), A(this, ne).onmessage = (t) => {
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
    this.config = e, t.enableShadows !== this.config.enableShadows && (Object.values(A(this, ue)).forEach((i) => i.dispose()), Z(this, ue, Gt(
      {
        enableShadows: this.config.enableShadows,
        shadowTransparency: this.config.shadowTransparency,
        intensity: this.config.lightIntensity,
        scene: A(this, K)
      }
    ))), t.scale !== this.config.scale && Object.values(A(this, j)).forEach(({ mesh: i }) => {
      var s;
      if (i) {
        const { x: r = 1, y: n = 1, z: a = 1 } = (s = i == null ? void 0 : i.metadata) == null ? void 0 : s.baseScale;
        i.scaling = new R(
          this.config.scale * r,
          this.config.scale * n,
          this.config.scale * a
        );
      }
    }), t.shadowTransparency !== this.config.shadowTransparency && (A(this, ue).directional.shadowGenerator.darkness = this.config.shadowTransparency), t.lightIntensity !== this.config.lightIntensity && (A(this, ue).directional.intensity = 0.65 * this.config.lightIntensity, A(this, ue).hemispheric.intensity = 0.4 * this.config.lightIntensity);
  }
  // all this does is start the render engine.
  render(e) {
    A(this, se).runRenderLoop(this.renderLoop.bind(this)), A(this, ne).postMessage({
      action: "resumeSimulation",
      newStartPoint: e
    });
  }
  renderLoop() {
    if (A(this, ge) && A(this, ge) === Object.keys(A(this, j)).length) {
      if (!A(this, $e))
        if (Z(this, $e, !0), A(this, ne).postMessage({ action: "stopSimulation" }), this.onRollComplete(), this.config.highlightResult) {
          const e = typeof this.config.highlightResult == "object" && this.config.highlightResult !== null ? this.config.highlightResult.durationMs ?? 3500 : 3500;
          Z(this, be, setTimeout(() => {
            A(this, se).stopRenderLoop(), Z(this, be, null);
          }, e + 200));
        } else {
          A(this, se).stopRenderLoop();
          return;
        }
      A(this, K).render();
    } else
      A(this, K).render();
  }
  async loadTheme(e) {
    const { theme: t, basePath: i, material: s, meshFilePath: r, meshName: n } = e;
    if (await A(this, it).load({ theme: t, basePath: i, material: s }), !Object.keys(A(this, rt)).includes(n)) {
      A(this, rt)[n] = r;
      const a = await ze.loadModels({ meshFilePath: r, meshName: n }, A(this, K));
      if (!a)
        throw new Error("No colliders returned from the 3D mesh file. Low poly colliders are expected to be in the same file as the high poly dice and the mesh name contains the word 'collider'");
      A(this, ne).postMessage({
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
    !Object.keys(A(this, j)).length && !A(this, ge) || (A(this, be) && (clearTimeout(A(this, be)), Z(this, be, null)), Z(this, $e, !1), this.diceBufferView.byteLength && this.diceBufferView.fill(0), A(this, je).forEach((e) => clearTimeout(e)), A(this, se).stopRenderLoop(), Object.values(A(this, j)).forEach((e) => {
      var t;
      (t = e.glowCleanup) == null || t.call(e), e.mesh && e.mesh.dispose();
    }), Z(this, j, {}), Z(this, Ye, 0), Z(this, ge, 0), A(this, Fe).clear(), A(this, K).render());
  }
  add(e) {
    ze.loadDie(e, A(this, K)).then((t) => {
      A(this, je).push(setTimeout(() => {
        ft(this, pt, si).call(this, t);
      }, Ve(this, Ye)._++ * this.config.delay));
    });
  }
  addNonDie(e) {
    A(this, se).activeRenderLoops.length === 0 && this.render(!1);
    const { id: t, value: i, ...s } = e, r = {
      id: t,
      value: i,
      config: s
    };
    A(this, j)[t] = r, setTimeout(() => {
      A(this, je).push(setTimeout(() => {
        this.handleAsleep(r);
      }, Ve(this, Ye)._++ * this.config.delay));
    }, 10);
  }
  remove(e) {
    const t = A(this, j)[e.id];
    t.hasOwnProperty("d10Instance") && (A(this, j)[t.d10Instance.id].mesh && (A(this, j)[t.d10Instance.id].mesh.dispose(), A(this, ne).postMessage({
      action: "removeDie",
      id: t.d10Instance.id
    })), delete A(this, j)[t.d10Instance.id], Ve(this, ge)._--), A(this, j)[e.id].mesh && A(this, j)[e.id].mesh.dispose(), delete A(this, j)[e.id], Ve(this, ge)._--, A(this, K).render(), this.onDieRemoved(e.rollId);
  }
  updatesFromPhysics(e) {
    this.diceBufferView = new Float32Array(e);
    let t = 1;
    for (let i = 0, s = this.diceBufferView[0]; i < s; i++) {
      if (!Object.keys(A(this, j)).length)
        continue;
      const r = A(this, j)[`${this.diceBufferView[t]}`];
      if (!r) {
        console.log("Error: die not available in scene to animate");
        break;
      }
      if (this.diceBufferView[t + 1] === -1)
        this.handleAsleep(r);
      else {
        const n = this.diceBufferView[t + 1], a = this.diceBufferView[t + 2], o = this.diceBufferView[t + 3], l = this.diceBufferView[t + 4], f = this.diceBufferView[t + 5], h = this.diceBufferView[t + 6], c = this.diceBufferView[t + 7];
        r.mesh.position.set(n, a, o), r.mesh.rotationQuaternion.set(l, f, h, c);
      }
      t = t + 8;
    }
    requestAnimationFrame(() => {
      A(this, ne).postMessage({
        action: "stepSimulation",
        diceBuffer: this.diceBufferView.buffer
      }, [this.diceBufferView.buffer]);
    });
  }
  async handleAsleep(e) {
    var i, s, r;
    e.asleep = !0, await ze.getRollResult(e, A(this, K), this.config);
    const t = typeof this.config.highlightResult == "object" && ((i = this.config.highlightResult) == null ? void 0 : i.mode) || "glow";
    if (this.config.highlightResult && e.mesh && t !== "light" && ft(this, mt, ai).call(this, e), e.d10Instance || e.dieParent) {
      if ((s = e == null ? void 0 : e.d10Instance) != null && s.asleep || (r = e == null ? void 0 : e.dieParent) != null && r.asleep) {
        const n = e.config.sides === 100 ? e : e.dieParent, a = e.config.sides === 10 ? e : e.d10Instance;
        n.rawValue && (n.value = n.rawValue), n.rawValue = n.value, n.value = n.value + a.value, this.onRollResult({
          rollId: n.config.rollId,
          value: n.value
        });
      }
    } else
      e.config.sides === 10 && e.value === 0 && (e.value = 10), this.onRollResult({
        rollId: e.config.rollId,
        value: e.value
      });
    Ve(this, ge)._++;
  }
  resize(e) {
    const t = A(this, ce).width = e.width, i = A(this, ce).height = e.height;
    A(this, tt).create({ aspect: t / i }), A(this, se).resize();
  }
}
j = new WeakMap(), Ye = new WeakMap(), ge = new WeakMap(), $e = new WeakMap(), be = new WeakMap(), Ze = new WeakMap(), Fe = new WeakMap(), je = new WeakMap(), ce = new WeakMap(), se = new WeakMap(), K = new WeakMap(), ut = new WeakMap(), ue = new WeakMap(), tt = new WeakMap(), it = new WeakMap(), ne = new WeakMap(), rt = new WeakMap(), pt = new WeakSet(), si = async function(e) {
  A(this, se).activeRenderLoops.length === 0 && this.render(e.newStartPoint);
  const t = {
    ...e,
    assetPath: this.config.assetPath,
    enableShadows: this.config.enableShadows,
    scale: this.config.scale,
    lights: A(this, ue)
  }, i = new ze(t, A(this, K));
  return A(this, j)[i.id] = i, A(this, ne).postMessage({
    action: "addDie",
    options: {
      sides: e.sides,
      scale: this.config.scale,
      id: i.id,
      newStartPoint: e.newStartPoint,
      theme: e.theme,
      meshName: e.meshName
    }
  }), e.sides === 100 && e.data !== "single" && (i.d10Instance = await ze.loadDie({ ...t, dieType: "d10", sides: 10, id: i.id + 1e4 }, A(this, K)).then((s) => {
    const r = new ze(s, A(this, K));
    return r.dieParent = i, r;
  }), A(this, j)[`${i.d10Instance.id}`] = i.d10Instance, A(this, ne).postMessage({
    action: "addDie",
    options: {
      sides: 10,
      scale: this.config.scale,
      id: i.d10Instance.id,
      theme: e.theme,
      meshName: e.meshName
    }
  })), i;
}, _t = new WeakSet(), ni = function() {
  if (A(this, Ze))
    return A(this, Ze);
  const e = new oe("numberFlare", A(this, K), { blurKernelSize: 24 });
  return e.intensity = 1, e.customEmissiveColorSelector = (t, i, s, r) => {
    const n = A(this, Fe).get(t.uniqueId);
    if (!n) {
      r.set(0, 0, 0, 0);
      return;
    }
    const a = (Date.now() - n.start) / n.duration;
    if (a >= 1) {
      A(this, Fe).delete(t.uniqueId), r.set(0, 0, 0, 0);
      return;
    }
    const o = a < 0.12 ? a / 0.12 : 1 - ((a - 0.12) / 0.88) ** 2, l = n.peak * Math.max(0, o);
    r.set(n.r * l, n.g * l, n.b * l, 1);
  }, Z(this, Ze, e), e;
}, mt = new WeakSet(), ai = function(e) {
  const t = typeof this.config.highlightResult == "object" && this.config.highlightResult !== null ? this.config.highlightResult : {}, { r: i, g: s, b: r } = Aa(t.color ?? "#ffeecc");
  ft(this, _t, ni).call(this), A(this, Fe).set(e.mesh.uniqueId, {
    start: Date.now(),
    duration: t.durationMs ?? 3500,
    peak: t.intensity ?? 0.9,
    r: i,
    g: s,
    b: r
  });
};
export {
  ba as default
};
//# sourceMappingURL=world.onscreen.js.map
