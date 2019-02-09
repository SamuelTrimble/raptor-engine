export default class {
	constructor(options = {}) {
		this._options = {
			position: {
				x: 0,
				y: 0
			},
			pixelBounds: {
				x: 0,
				y: 0,
				w: 0,
				h: 0
			},
			state: {
				focused: false,
				occupied: false
			},
			texture: null
		};
		this._options = { ...this._options, ...options };
	}

	get x() {
		return this._options.position.x;
	}
	get y() {
		return this._options.position.y;
	}
	get bounds() {
		return this._options.pixelBounds;
	}

	get focused() {
		return this._options.state.focused;
	}
	set focused(value) {
		this._options.state.focused = value;
	}

	get occupied() {
		return this._options.state.occupied;
	}
	set occupied(value) {
		this._options.state.occupied = value;
	}
	
	get texture() {
		return this._options.texture;
	}
}
