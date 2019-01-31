export default class {
	constructor() {
		this._filterStrength = 20;
		this._frameTime = 0;
		this._lastLoop = new Date();
		this._thisLoop = new Date();

		this._curFPS = "N/A";
	}

	get FPS() {
		return this._curFPS;
	}

	Start() {
		setInterval(() => {
			this._curFPS = (1000 / this._frameTime).toFixed(2);
		}, 1000);
	}
	Tick() {
		this._thisLoop = new Date();

		let thisFrame = this._thisLoop - this._lastLoop;
		this._frameTime += (thisFrame - this._frameTime) / this._filterStrength;

		this._lastLoop = this._thisLoop;
	}
}
