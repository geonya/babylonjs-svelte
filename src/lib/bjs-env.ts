import {
	Color3,
	Color4,
	CubeTexture,
	MeshBuilder,
	StandardMaterial,
	Texture,
	type Scene
} from '@babylonjs/core';

export class BJSEnv {
	constructor(private readonly scene: Scene) {}

	setDefaultEnv() {
		this.scene.clearColor = new Color4(0.5, 0.8, 0.5, 1);
		const skybox = MeshBuilder.CreateBox('skybox', { size: 1 }, this.scene);
		const skyboxMaterial = new StandardMaterial('skybox', this.scene);
		skyboxMaterial.backFaceCulling = false;
		skyboxMaterial.reflectionTexture = new CubeTexture('assets/skybox4/skybox4', this.scene);
		skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
		skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
		skyboxMaterial.specularColor = new Color3(0, 0, 0);
		skybox.material = skyboxMaterial;
	}
}
