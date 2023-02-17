import { SceneLoader, type Scene } from '@babylonjs/core';
import { GLTFFileLoader } from '@babylonjs/loaders/glTF';

export class BJSLoader {
	constructor(private readonly scene: Scene) {}
	async loadAssets() {
		GLTFFileLoader.HomogeneousCoordinates = true;
		await SceneLoader.AppendAsync('/assets/BoomBox/', 'BoomBox.gltf', this.scene);
	}
}
