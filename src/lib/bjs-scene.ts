import {
	ArcRotateCamera,
	Color3,
	Light,
	PointLight,
	Scene,
	Texture,
	Vector3,
	type Engine,
	type IEnvironmentHelperOptions
} from '@babylonjs/core';
import { StarfieldProceduralTexture } from '@babylonjs/procedural-textures';
import type { CameraOptions } from './types';

export class BJSScene {
	private _scene: Scene;

	constructor(private readonly engine: Engine) {
		this._scene = new Scene(this.engine);
		this._scene.createDefaultEnvironment(this.createEnvOptions(this._scene));
		const cameraOptions = {
			camAlpha: 0,
			camBeta: -Math.PI / 4,
			camDist: 200,
			camTarget: new Vector3(0, 0, 0)
		};
		this.createCamera('camera1', this._scene, cameraOptions);
		this.createLight(this._scene);
	}
	get scene(): Scene {
		return this._scene;
	}

	private createStarField(scene: Scene) {
		const starFieldPT = new StarfieldProceduralTexture('starFieldPT', 512, scene);
		starFieldPT.coordinatesMode = Texture.FIXED_EQUIRECTANGULAR_MODE;
		starFieldPT.darkmatter = 1.5;
		starFieldPT.distfading = 0.75;
		return starFieldPT;
	}

	private createCamera(name: string, scene: Scene, options?: CameraOptions) {
		const camera = new ArcRotateCamera(
			name,
			options.camAlpha,
			options.camBeta,
			options.camDist,
			options.camTarget,
			scene
		);
		camera.attachControl(true);
		return camera;
	}

	private createLight(scene: Scene): Light {
		const light = new PointLight('startLight', Vector3.Zero(), scene);
		light.intensity = 2;
		light.diffuse = new Color3(0.98, 0.9, 1);
		light.specular = new Color3(1, 0.9, 0.5);
		return light;
	}

	private createEnvOptions(scene: Scene) {
		const starFieldPT = this.createStarField(scene);
		const envOptions: Partial<IEnvironmentHelperOptions> = {
			skyboxSize: 512,
			createGround: false,
			skyboxTexture: starFieldPT,
			environmentTexture: starFieldPT
		};

		return envOptions;
	}
}
