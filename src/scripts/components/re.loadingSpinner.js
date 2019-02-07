export default class {
	constructor(canvasElement = null, options = {}) {
		if (!canvasElement) {
			throw new Error("LoadingSpinner must be initialized with a valid 'canvas' element!");
		}

		this._canvas = canvasElement;
		this._context = this._canvas.getContext('2d');
		this._spinCanvas = document.createElement('canvas');
		this._spinContext = this._spinCanvas.getContext('2d');

		this._spinCanvas.width = 300;
		this._spinCanvas.height = 300;

		this._state = {
			opacity: 0,
			fadingIn: false,
			fadingOut: false,

			curFrame: 0
		};
		this._PI180 = (Math.PI / 180);

		//Default options
		this._options = {
			fillColor: "#000000",
			borderColor: "#F0F0F0",

			easingFunc: null
		};
		//Merge passed in options over defaults
		this._options = { ...this._options, ...options };
	}

	set show(value) {
		if ((value) && (this._state.opacity === 0)) {
			//Was just now set to 'true', start showing
			this._state.fadingIn = true;
		} else if ((!value) && (this._state.opacity === 100)) {
			//Was just now set to 'false', start hiding
			this._state.fadingOut = true;
		}
	}

	Render() {
		if (this._state.fadingIn) {
			this._state.opacity += 5;
			if (this._state.opacity >= 100) {
				this._state.opacity = 100;
				this._state.fadingIn = false;
			}
		}
		if (this._state.fadingOut) {
			this._state.opacity -= 5;
			if (this._state.opacity <= 0) {
				this._state.opacity = 0;
				this._state.fadingOut = false;
			}
		}

		if (this._state.opacity > 0) {
			this._state.curFrame++;
			if (this._state.curFrame === 150) {
				this._state.curFrame = 0;
			}
			
			this._spinContext.setTransform(1, 0, 0, 1, 0, 0);
			this._spinContext.clearRect(0, 0, 300, 300);

			this._spinContext.globalAlpha = (this._state.opacity / 100);

			let rotation = 45;
			if (this._options.easingFunc !== null) {
				rotation = this._options.easingFunc(this._state.curFrame, 45, 720, 150);
			} else {
				//Default to Linear progression
				//change * time / duration + start
				rotation = 720 * this._state.curFrame / 150 + 45;
			}
			if (rotation >= 360) {
				rotation -= 360;
			}
			this._spinContext.translate(150, 150);
			this._spinContext.rotate(this._PI180 * rotation);
			this._spinContext.translate(-150, -150);

			this._spinContext.fillStyle = this._options.fillColor;
			this._spinContext.strokeStyle = this._options.borderColor;
			this._spinContext.lineWidth = 2;
			this._spinContext.beginPath();
			this._spinContext.moveTo(100, 100);
			this._spinContext.lineTo(200, 100);
			this._spinContext.lineTo(200, 200);
			this._spinContext.lineTo(100, 200);
			this._spinContext.closePath();
			this._spinContext.fill();
			this._spinContext.stroke();
			
			let drawX = ((this._canvas.width - 300) / 2);
			let drawY = ((this._canvas.height - 150) / 2);
			this._context.drawImage(this._spinCanvas, drawX, drawY, 300, 150);
		}
	}
}
