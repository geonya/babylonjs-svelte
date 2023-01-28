import {
	Engine,
	Scene,
	MeshBuilder,
	Vector3,
	HemisphericLight,
	Camera,
	ArcRotateCamera,
	Light,
	Mesh
} from 'babylonjs';

export class Babylon {
	engine: Engine;
	scene: Scene;
	camera: Camera | undefined;
	light: Light | undefined;
	sphere: Mesh | undefined;

	constructor(public canvas: HTMLCanvasElement) {
		this.engine = new Engine(canvas, true);
		this.scene = new Scene(this.engine);
	}

	createScene(): void {
		this.setupCamera();
		this.setupLight();
		this.createSphere();
		this.setupGround();
	}
	private setupCamera() {
		let camAlpha = 0,
			camBeta = 1.26,
			camDist = 10,
			camTarget = new Vector3(0, 0, 0);
		this.camera = new ArcRotateCamera('camera1', camAlpha, camBeta, camDist, camTarget, this.scene);
		this.camera.attachControl(this.canvas, false);
	}

	private setupLight() {
		this.light = new HemisphericLight('light', new Vector3(0, 1, 0), this.scene);
		this.light.intensity = 0.7;
	}

	private createSphere() {
		this.sphere = MeshBuilder.CreateSphere('sphere', { diameter: 2, segments: 32 }, this.scene);
		this.sphere.position.y = 1;
	}
	private setupGround() {
		MeshBuilder.CreateGround('ground', { width: 5, height: 5 }, this.scene);
	}

	action(): void {
		// chrome audio warning fix
		this.engine.getAudioContext()?.resume();
		this.engine.runRenderLoop(() => this.scene.render());
	}
}
