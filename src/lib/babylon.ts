import * as BABYLON from '@babylonjs/core';
import * as BABYLON_PROCEDURAL_TEXTURES from '@babylonjs/procedural-textures';

export class Babylon {
	engine: BABYLON.Engine;

	constructor(public canvas: HTMLCanvasElement) {
		this.engine = new BABYLON.Engine(canvas, true);
	}

	public createScene(engine: BABYLON.Engine): Promise<BABYLON.Scene> {
		const scene = new BABYLON.Scene(engine);
		return new Promise((resolve) => {
			const camera = this.setupCamera(scene);
			const envOptions = this.createEnvOptions(scene);
			const light = this.createLight(scene);
			scene.addCamera(camera);
			scene.addLight(light);
			scene.createDefaultEnvironment(envOptions);
			resolve(scene);
		});
	}
	private setupCamera(scene: BABYLON.Scene) {
		const camOptions = {
			camAlpha: 0,
			camBeta: -Math.PI / 4,
			camDist: 350,
			camTarget: new BABYLON.Vector3(0, 0, 0)
		};

		const camera = new BABYLON.ArcRotateCamera(
			'camera1',
			camOptions.camAlpha,
			camOptions.camBeta,
			camOptions.camDist,
			camOptions.camTarget,
			scene
		);
		camera.attachControl(this.canvas, false);
		return camera;
	}

	private createStar() {
		return;
	}
	private createEnvOptions(scene: BABYLON.Scene) {
		const starFieldPT = this.createStarField(scene);
		const envOptions: Partial<BABYLON.IEnvironmentHelperOptions> = {
			skyboxSize: 512,
			createGround: false,
			skyboxTexture: starFieldPT,
			environmentTexture: starFieldPT
		};

		return envOptions;
	}
	private createStarField(scene: BABYLON.Scene) {
		const starFieldPT = new BABYLON_PROCEDURAL_TEXTURES.StarfieldProceduralTexture(
			'starFieldPT',
			512,
			scene
		);
		starFieldPT.coordinatesMode = BABYLON.Texture.FIXED_EQUIRECTANGULAR_MODE;
		starFieldPT.darkmatter = 1.5;
		starFieldPT.distfading = 0.75;
		return starFieldPT;
	}
	private createLight(scene: BABYLON.Scene) {
		const light = new BABYLON.PointLight('startLight', BABYLON.Vector3.Zero(), scene);
		light.intensity = 2;
		light.diffuse = new BABYLON.Color3(0.98, 0.9, 1);
		light.specular = new BABYLON.Color3(1, 0.9, 0.5);
		return light;
	}

	public run(): void {
		// chrome audio warning fix
		this.engine.getAudioContext()?.resume();
		this.engine.hideLoadingUI();
		this.engine.runRenderLoop(async () => {
			const scene = await this.createScene(this.engine);
			scene.render();
		});

		window.addEventListener('resize', () => {
			this.engine.resize();
		});
	}
}
