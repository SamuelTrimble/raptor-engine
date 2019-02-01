export default class {
	constructor(canvasElement) {
		if (!canvasElement) {
			throw new Error("LoadingSpinner must be initialized with a valid 'canvas' element!");
		}

		this._canvas = canvasElement;
		this._context = this._canvas.getContext('2d');

		this._isRunning = false;
		this._intervalTimer = null;

		this._filterStrength = 20;
		this._frameTime = 0;
		this._lastLoop = new Date();
		this._thisLoop = new Date();

		this._curFPS = "N/A";
	}

	get running() {
		return this._isRunning;
	}

	Start() {
		this._isRunning = true;

		this._intervalTimer = setInterval(() => {
			this._curFPS = (1000 / this._frameTime).toFixed(2);
		}, 1000);
	}
	Stop() {
		this._isRunning = false;
		
		clearInterval(this._intervalTimer);
		this._intervalTimer = null;
	}
	Tick() {
		this._thisLoop = new Date();

		let thisFrame = this._thisLoop - this._lastLoop;
		this._frameTime += (thisFrame - this._frameTime) / this._filterStrength;

		this._lastLoop = this._thisLoop;
	}
	Render() {
		this._context.font = "18px sans-serif";
		this._context.fillStyle = "#000000";
		this._context.fillText("FPS: " + this._curFPS, 7, 21);
		this._context.fillStyle = "#FFFFFF";
		this._context.fillText("FPS: " + this._curFPS, 5, 19);
	}
}
