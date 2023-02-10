import {
	ArcRotateCamera,
	HemisphericLight,
	Light,
	Scene,
	Vector3,
	type Engine
} from '@babylonjs/core';

import type { CameraOptions } from './types';

export class BJSScene {
	private _scene: Scene;

	constructor(private readonly engine: Engine) {
		this._scene = new Scene(this.engine);
		// this._scene.createDefaultEnvironment(this.createEnvOptions(this._scene));

		const cameraOptions = {
			camAlpha: 1,
			camBeta: 1,
			camDist: 3,
			camTarget: Vector3.Zero()
		};
		this.createCamera('camera1', this._scene, cameraOptions);
		this.createLight(this._scene);
	}
	get scene(): Scene {
		return this._scene;
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
		const light = new HemisphericLight('light1', new Vector3(0, 1, 0), scene);
		return light;
	}

	private createEnvOptions(scene: Scene) {
		// return envOptions;
	}
}
