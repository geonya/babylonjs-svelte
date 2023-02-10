import { Engine } from '@babylonjs/core';

export class BJSEngine {
	private _engine: Engine;
	constructor(private readonly canvas: HTMLCanvasElement) {
		this._engine = new Engine(this.canvas, true);
	}
	get engine() {
		return this._engine;
	}
}
