export default class {
	constructor(canvasElement = null, options = {}) {
		if (!canvasElement) {
			throw new Error("LoadingSpinner must be initialized with a valid 'canvas' element!");
		}

		this._canvas = canvasElement;
		this._context = this._canvas.getContext('2d');

		this._options = {
			fillColor: "#000000",
			borderColor: "#F0F0F0"
		};
		this._options = { ...this._options, ...options };
	}
}
