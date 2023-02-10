import {
	BoundingBoxGizmo,
	Color3,
	MeshBuilder,
	StandardMaterial,
	Texture,
	UtilityLayerRenderer,
	Vector4
} from '@babylonjs/core';

export class BJSGizmo {
	constructor(private readonly untilLayer: UtilityLayerRenderer) {}

	private createBox() {
		const mat = new StandardMaterial('mat');
		const texture = new Texture('https://assets.babylonjs.com/environments/numbers.jpg');
		mat.diffuseTexture = texture;
		const columns = 6;
		const rows = 1;
		const faceUV = new Array(6);
		for (let i = 0; i < 6; i++) {
			faceUV[i] = new Vector4(i / columns, 0, (i + 1) / columns, 1 / rows);
		}
		// const faceUV = new Array(6).map((v, i) => {
		// 	return new Vector4(i / columns, 0, (i + 1) / columns, 1 / rows);
		// });

		const options = {
			faceUV,
			wrap: true
		};
		const box = MeshBuilder.CreateBox('box', options);
		box.material = mat;
		return box;
	}

	run() {
		const gizmo = new BoundingBoxGizmo(Color3.FromHexString('#fd60ba'), this.untilLayer);
		gizmo.ignoreChildren = true;
		// gizmo.scaleBoxSize = 0.02;
		gizmo.fixedDragMeshScreenSize = true;

		const box = this.createBox();

		// const bb = BoundingBoxGizmo.MakeNotPickableAndWrapInBoundingBox(box);
		gizmo.attachedMesh = box;
		gizmo.onScaleBoxDragObservable.add(() => {
			console.log('scaleDrag');
		});
		gizmo.onScaleBoxDragEndObservable.add(() => {
			console.log('scaleEnd');
		});
		gizmo.onRotationSphereDragObservable.add(() => {
			console.log('rotDrag');
		});
		gizmo.onRotationSphereDragEndObservable.add(() => {
			console.log('rotEnd');
		});
	}
}
