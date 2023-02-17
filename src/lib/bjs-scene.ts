import { ArcRotateCamera, HemisphericLight, Scene, Vector3, type Engine } from '@babylonjs/core';

export class BJSScene {
	private _scene: Scene;

	constructor(private readonly engine: Engine, private readonly canvas: HTMLCanvasElement) {
		this._scene = new Scene(this.engine);
		this.scene.createDefaultCameraOrLight(true, true, true);
		const camera: ArcRotateCamera = this.scene.activeCamera as ArcRotateCamera;
		camera.useAutoRotationBehavior = true;
		camera.setPosition(new Vector3(0, -0.02, 0.1));
		this.scene.lights[0].dispose();
		new HemisphericLight('light', new Vector3(0.1, 0.1, 0.1), this.scene);
	}
	get scene(): Scene {
		return this._scene;
	}
}
