import RE_Easing from './utils/re.easing.js'
import RE_Timer from './utils/re.timer.js'

import RE_LoadingSpinner from './components/re.loadingSpinner.js'

export default class RaptorEngine {
	constructor(canvasElement = null, options = {}) {
		if (!canvasElement) {
			throw new Error("RaptorEngine must be initialized with a valid 'canvas' element!");
		}

		this._options = {
			debugging: (process.env.NODE_ENV !== "production"),

			zoom: 3,
			visibility: 3,

			mapDataFile: "",
			mapData: {},
			mapBackgroundColor: "#000000",

			tileFocus: {
				x: 0,
				y: 0
			},
			tileDefaultColor: "#F0F0F0"
		};
		this._options = { ...this._options, ...options };
		
		this._easing = new RE_Easing();
		this._timer = null;
		if (this._options.debugging) {
			this._timer = new RE_Timer();
		}
		this._loadingSpinner = new RE_LoadingSpinner(canvasElement, {
			fillColor: this._options.mapBackgroundColor,
			borderColor: this._options.tileDefaultColor
		});
		
		this.Log("Engine Initialized");
		this.Log(this._options);
	}

	Log(output) {
		if (this._options.debugging) {
			console.log(output);
		}
	}
}
