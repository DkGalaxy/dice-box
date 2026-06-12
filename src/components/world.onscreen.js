import { Vector3 } from '@babylonjs/core/Maths/math.vector'
import { GlowLayer } from '@babylonjs/core/Layers/glowLayer'
import { createEngine } from './world/engine'
import { createScene } from './world/scene'
import { createCamera } from './world/camera'
import { createLights } from './world/lights'
import Container from './Container'
import Dice from './Dice'
import ThemeLoader from './ThemeLoader'

// '#rrggbb' -> {r,g,b} components in 0..1, used by the number-flare envelope
const hexToRgb = (hex) => {
	const h = hex.replace('#', '')
	return {
		r: parseInt(h.slice(0, 2), 16) / 255,
		g: parseInt(h.slice(2, 4), 16) / 255,
		b: parseInt(h.slice(4, 6), 16) / 255,
	}
}

class WorldOnscreen {
	config
	initialized = false
	#dieCache = {}
	#count = 0
	#sleeperCount = 0
	#rollCompleteFired = false
	#glowLoopStopTimer = null
	#glowLayer = null
	#flares = new Map()
	#dieRollTimer = []
	#canvas
	#engine
	#scene
	#camera
	#lights
	#container
	#themeLoader
	#physicsWorkerPort
	#meshList = {}
	noop = () => {}
	diceBufferView = new Float32Array(8000)

	constructor(options){
		this.onInitComplete = options.onInitComplete || this.noop
		this.onThemeLoaded = options.onThemeLoaded || this.noop
		this.onRollResult = options.onRollResult || this.noop
		this.onRollComplete = options.onRollComplete || this.noop
		this.onDieRemoved = options.onDieRemoved || this.noop
		this.initialized = this.initScene(options)
	}

	// initialize the babylon scene
	async initScene(config) {
		this.#canvas  = config.canvas
		this.#canvas.width = config.width
		this.#canvas.height = config.height

		// set the config from World
		this.config = config.options

		// setup babylonJS scene
		this.#engine  = createEngine(this.#canvas )
		this.#scene = createScene({engine:this.#engine })
		this.#camera  = createCamera({engine:this.#engine, scene: this.#scene})
		this.#lights  = createLights({
			enableShadows: this.config.enableShadows,
			shadowTransparency: this.config.shadowTransparency,
			intensity: this.config.lightIntensity,
			scene: this.#scene
		})

		// create the box that provides surfaces for shadows to render on
		this.#container  = new Container({
			enableShadows: this.config.enableShadows,
			aspect: this.#canvas.width / this.#canvas.height,
			lights: this.#lights,
			scene: this.#scene
		})

		this.#themeLoader = new ThemeLoader({scene: this.#scene})

		// init complete - let the world know
		this.onInitComplete()
	}

	connect(port){
		this.#physicsWorkerPort = port

		this.#physicsWorkerPort.postMessage({
			action: "initBuffer",
			diceBuffer: this.diceBufferView.buffer
		}, [this.diceBufferView.buffer])

		this.#physicsWorkerPort.onmessage = (e) => {
			switch (e.data.action) {
				case "updates": // dice status/position updates from physics worker
					this.updatesFromPhysics(e.data.diceBuffer)
					break;

				default:
					console.error("action from physicsWorker not found in offscreen worker")
					break;
			}
		}
	}

	updateConfig(options){
		const prevConfig = this.config
		this.config = options
		// check if shadows setting has changed
		if(prevConfig.enableShadows !== this.config.enableShadows) {
			// regenerate the lights
			Object.values(this.#lights ).forEach(light => light.dispose())
			this.#lights = createLights(
				{
					enableShadows: this.config.enableShadows,
					shadowTransparency: this.config.shadowTransparency,
					intensity: this.config.lightIntensity,
					scene: this.#scene
				}
			)
		}
		if(prevConfig.scale !== this.config.scale) {
			Object.values(this.#dieCache).forEach(({mesh}) => {
				if(mesh){
					const {x = 1,y = 1,z = 1} = mesh?.metadata?.baseScale
					mesh.scaling = new Vector3(
						this.config.scale * x,
						this.config.scale * y,
						this.config.scale * z
					)
				}
			})
		}
		if(prevConfig.shadowTransparency !== this.config.shadowTransparency) {
			this.#lights.directional.shadowGenerator.darkness = this.config.shadowTransparency
		}
		if(prevConfig.lightIntensity !== this.config.lightIntensity) {
			this.#lights.directional.intensity = .65 * this.config.lightIntensity
			this.#lights.hemispheric.intensity = .4 * this.config.lightIntensity
		}
	}

	// all this does is start the render engine.
	render(newStartPoint) {
		this.#engine.runRenderLoop(this.renderLoop.bind(this))
		this.#physicsWorkerPort.postMessage({
			action: "resumeSimulation",
			newStartPoint
		})
	}

	renderLoop() {
		// if no dice are awake then stop the render loop and save some CPU power
		if(this.#sleeperCount && this.#sleeperCount === Object.keys(this.#dieCache).length) {
			if (!this.#rollCompleteFired) {
				this.#rollCompleteFired = true

				// stop the physics engine
				this.#physicsWorkerPort.postMessage({ action: "stopSimulation" })

				// trigger callback that roll is complete
				this.onRollComplete()

				if (this.config.highlightResult) {
					// Keep the render loop alive for the glow duration — never call
					// stopRenderLoop + runRenderLoop as that re-initialises the canvas.
					// A setTimeout stops the loop cleanly once glows have faded.
					const hlDuration = (typeof this.config.highlightResult === 'object' && this.config.highlightResult !== null)
						? (this.config.highlightResult.durationMs ?? 3500)
						: 3500
					this.#glowLoopStopTimer = setTimeout(() => {
						this.#engine.stopRenderLoop()
						this.#glowLoopStopTimer = null
					}, hlDuration + 200)
				} else {
					this.#engine.stopRenderLoop()
					return
				}
			}
			// keep rendering so the point-light fade (registerBeforeRender) can run
			this.#scene.render()
		}
		// otherwise keep on rendering
		else {
			this.#scene.render()
		}
	}

	async loadTheme(options) {
		const {theme, basePath, material, meshFilePath, meshName} = options
		await this.#themeLoader.load({theme,basePath,material})

		if(!Object.keys(this.#meshList).includes(meshName)){
			this.#meshList[meshName] = meshFilePath
			const colliders = await Dice.loadModels({meshFilePath,meshName}, this.#scene)

			if(!colliders){
				throw new Error("No colliders returned from the 3D mesh file. Low poly colliders are expected to be in the same file as the high poly dice and the mesh name contains the word 'collider'")
			}

			this.#physicsWorkerPort.postMessage({
				action: "loadModels",
				options: {
					colliders,
					meshName
				}
			})
		}

		this.onThemeLoaded({id: theme})
	}

	clear() {
		if(!Object.keys(this.#dieCache).length && !this.#sleeperCount) {
			return
		}
		// cancel the glow-loop stop timer if it's still pending
		if (this.#glowLoopStopTimer) {
			clearTimeout(this.#glowLoopStopTimer)
			this.#glowLoopStopTimer = null
		}
		this.#rollCompleteFired = false
		if(this.diceBufferView.byteLength){
			this.diceBufferView.fill(0)
		}
		this.#dieRollTimer.forEach(timer=>clearTimeout(timer))
		// stop anything that's currently rendering
		this.#engine.stopRenderLoop()
		// remove all dice — also dispose any active point-light glow
		Object.values(this.#dieCache).forEach(die => {
			die.glowCleanup?.()
			if(die.mesh)
				die.mesh.dispose()
		})

		// reset storage
		this.#dieCache = {}
		this.#count = 0
		this.#sleeperCount = 0
		this.#flares.clear()

		// step the animation forward
		this.#scene.render()
	}

	add(options) {
		Dice.loadDie(options, this.#scene).then(resp => {
			this.#dieRollTimer.push(setTimeout(() => {
				this.#add(resp)
			}, this.#count++ * this.config.delay))
		})
	}

	addNonDie(die){
		if(this.#engine.activeRenderLoops.length === 0) {
			this.render(false)
		}
		const {id, value, ...rest} = die
		const newDie = {
			id,
			value,
			config: rest
		}
		this.#dieCache[id] = newDie

		setTimeout(()=>{
			this.#dieRollTimer.push(setTimeout(() => {
				this.handleAsleep(newDie)
			}, this.#count++ * this.config.delay))
		}, 10)
	}

	// add a die to the scene
	async #add(options) {
		if(this.#engine.activeRenderLoops.length === 0) {
			this.render(options.newStartPoint)
		}
		const diceOptions = {
			...options,
			assetPath: this.config.assetPath,
			enableShadows: this.config.enableShadows,
			scale: this.config.scale,
			lights: this.#lights,
		}

		const newDie = new Dice(diceOptions, this.#scene)

		// save the die just created to the cache
		this.#dieCache[newDie.id] = newDie

		// tell the physics engine to roll this die type - which is a low poly collider
		this.#physicsWorkerPort.postMessage({
			action: "addDie",
			options: {
				sides: options.sides,
				scale: this.config.scale,
				id: newDie.id,
				newStartPoint: options.newStartPoint,
				theme: options.theme,
				meshName: options.meshName,
			}
		})

		// for d100's we need to add an additional d10 and pair it up with the d100 just created
		if(options.sides === 100 && options.data !== 'single') {
			newDie.d10Instance = await Dice.loadDie({...diceOptions, dieType: 'd10', sides: 10, id: newDie.id + 10000}, this.#scene).then( response =>  {
				const d10Instance = new Dice(response, this.#scene)
				d10Instance.dieParent = newDie
				return d10Instance
			})
			this.#dieCache[`${newDie.d10Instance.id}`] = newDie.d10Instance
			this.#physicsWorkerPort.postMessage({
				action: "addDie",
				options: {
					sides: 10,
					scale: this.config.scale,
					id: newDie.d10Instance.id,
					theme: options.theme,
					meshName: options.meshName
				}
			})
		}

		return newDie
	}

	remove(data) {
		const dieData = this.#dieCache[data.id]

		if(dieData.hasOwnProperty('d10Instance')){
			if(this.#dieCache[dieData.d10Instance.id].mesh){
				this.#dieCache[dieData.d10Instance.id].mesh.dispose()
				this.#physicsWorkerPort.postMessage({
					action: "removeDie",
					id: dieData.d10Instance.id
				})
			}
			delete this.#dieCache[dieData.d10Instance.id]
			this.#sleeperCount--
		}

		if(this.#dieCache[data.id].mesh){
			this.#dieCache[data.id].mesh.dispose()
		}
		delete this.#dieCache[data.id]
		this.#sleeperCount--

		this.#scene.render()
		this.onDieRemoved(data.rollId)
	}

	updatesFromPhysics(buffer) {
		this.diceBufferView = new Float32Array(buffer)
		let bufferIndex = 1

	for (let i = 0, len = this.diceBufferView[0]; i < len; i++) {
		if(!Object.keys(this.#dieCache).length){
			continue
		}
		const die = this.#dieCache[`${this.diceBufferView[bufferIndex]}`]
		if(!die) {
			console.log("Error: die not available in scene to animate")
			break
		}
		if(this.diceBufferView[bufferIndex + 1] === -1) {
			this.handleAsleep(die)
		} else {
			const px = this.diceBufferView[bufferIndex + 1]
			const py = this.diceBufferView[bufferIndex + 2]
			const pz = this.diceBufferView[bufferIndex + 3]
			const qx = this.diceBufferView[bufferIndex + 4]
			const qy = this.diceBufferView[bufferIndex + 5]
			const qz = this.diceBufferView[bufferIndex + 6]
			const qw = this.diceBufferView[bufferIndex + 7]

			die.mesh.position.set(px, py, pz)
			die.mesh.rotationQuaternion.set(qx, qy, qz, qw)
		}

		bufferIndex = bufferIndex + 8
	}

	requestAnimationFrame(()=>{
		this.#physicsWorkerPort.postMessage({
			action: "stepSimulation",
			diceBuffer: this.diceBufferView.buffer
		}, [this.diceBufferView.buffer])
	})
	}

	async handleAsleep(die){
		// mark this die as asleep
		die.asleep = true

		// get the roll result for this die; pass config so optional features (highlightResult) can activate
		await Dice.getRollResult(die, this.#scene, this.config)

		// Feature: number flare — bloom the winning die via the GlowLayer.
		// Mode 'glow' (default) | 'both' use the flare here; 'light' skips it and
		// leaves the point-light flare in Dice.#spawnFaceGlow in charge instead.
		const hlMode = (typeof this.config.highlightResult === 'object' && this.config.highlightResult?.mode) || 'glow'
		if (this.config.highlightResult && die.mesh && hlMode !== 'light') {
			this.#startFlare(die)
		}

		if(die.d10Instance || die.dieParent) {
			if(die?.d10Instance?.asleep || die?.dieParent?.asleep) {
				const d100 = die.config.sides === 100 ? die : die.dieParent
				const d10 = die.config.sides === 10 ? die : die.d10Instance
				if(d100.rawValue){
					d100.value = d100.rawValue
				}
				d100.rawValue = d100.value
				d100.value = d100.value + d10.value

				this.onRollResult({
					rollId: d100.config.rollId,
					value : d100.value
				})
			}
		} else {
			if(die.config.sides === 10 && die.value === 0) {
				die.value = 10
			}
			this.onRollResult({
				rollId: die.config.rollId,
				value: die.value
			})
		}
		this.#sleeperCount++
	}

	// Feature: number flare — lazily create the GlowLayer the first time a flare fires.
	// The selector runs per rendered mesh during the glow pass; non-flaring meshes
	// return transparent (cheap) so only winning dice bloom. The envelope gives a
	// fast attack then a long quadratic ease-out — that's the "flare" shape.
	#ensureGlowLayer() {
		if (this.#glowLayer) return this.#glowLayer
		const glow = new GlowLayer('numberFlare', this.#scene, { blurKernelSize: 24 })
		glow.intensity = 1.0
		glow.customEmissiveColorSelector = (mesh, subMesh, material, result) => {
			const f = this.#flares.get(mesh.uniqueId)
			if (!f) { result.set(0, 0, 0, 0); return }
			const t = (Date.now() - f.start) / f.duration
			if (t >= 1) { this.#flares.delete(mesh.uniqueId); result.set(0, 0, 0, 0); return }
			const env = t < 0.12 ? (t / 0.12) : (1 - ((t - 0.12) / 0.88) ** 2)
			const k = f.peak * Math.max(0, env)
			result.set(f.r * k, f.g * k, f.b * k, 1)
		}
		this.#glowLayer = glow
		return glow
	}

	// Register a winning die to flare. color / intensity / durationMs reuse highlightResult.
	#startFlare(die) {
		const opt = (typeof this.config.highlightResult === 'object' && this.config.highlightResult !== null)
			? this.config.highlightResult : {}
		const { r, g, b } = hexToRgb(opt.color ?? '#ffeecc')
		this.#ensureGlowLayer()
		this.#flares.set(die.mesh.uniqueId, {
			start: Date.now(),
			duration: opt.durationMs ?? 3500,
			peak: opt.intensity ?? 0.9,
			r, g, b,
		})
	}

	resize(options) {
		const width = this.#canvas.width = options.width
		const height = this.#canvas.height = options.height
		this.#container.create({aspect: width / height})
		this.#engine.resize()
	}
}

export default WorldOnscreen
