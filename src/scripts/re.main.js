import RE_Easing from './utils/re.easing.js'
import RE_Timer from './utils/re.timer.js'

import RE_LoadingSpinner from './components/re.loadingSpinner.js'

import RE_Tile from './components/re.tile.js'

const DEBUGLEVEL = {
	INFO: 0,
	WARNING: 1,
	ERROR: 2
};

const TRANSITIONTYPES = {
	NONE: 0,
	FADE: 1,
	MOVE: 2,
	ZOOM: 3
};

class RaptorEngine {
	constructor(canvasElement = null, options = {}) {
		this.MINZOOM = 1;
		this.MAXZOOM = 5;
		this.ZOOMSCALEINCREMENT = 2;

		this._isRunning = false;

		//Default options
		this._options = {
			debugging: (process.env.NODE_ENV !== "production"),
			debuggingLevel: DEBUGLEVEL.WARNING,

			mapDataFile: "",
			mapBackgroundColor: "#000000",

			tileDefaultColor: "#F0F0F0"
		};
		//Merge passed in options over defaults
		this._options = { ...this._options, ...options };

		//Cached vars for map building
		this._map = {
			data: null,
			isBuilding: false,
			tileSize: 0,
			tileQuarterSize: 0,
			tileHalfSize: 0,
			tileDoubleSize: 0,
			tilesW: 0,
			tilesH: 0,
			offsetX: 0,
			pixelsW: 0,
			pixelsH: 0,
			tiles: []
		};

		this._state = {
			loading: false,
			curPosition: {
				x: 0,
				y: 0
			},
			focusedTile: null,

			zoom: 3,
			opacity: 0,
			sightRange: 3,

			transitionQueue: []
		};
		
		if (!canvasElement) {
			this._Log(DEBUGLEVEL.ERROR, "No 'canvas' specified!");
			throw new Error("RaptorEngine must be initialized with a valid 'canvas' element!");
		}
		if (this._options.mapDataFile === "") {
			this._Log(DEBUGLEVEL.WARNING, "No 'mapDataFile' specified in the initialization options!");
		}
		this._canvas = canvasElement;
		this._context = this._canvas.getContext('2d');
		this._fullCanvas = document.createElement('canvas');
		this._fullContext = this._fullCanvas.getContext('2d');
		this._canvasSize = { };
		this._canvasSize.w = this._canvas.width = this._canvas.offsetWidth;
		this._canvasSize.h = this._canvas.height = this._canvas.offsetHeight;
		
		this._easing = new RE_Easing();
		this._timer = null;
		if (this._options.debugging) {
			this._timer = new RE_Timer(canvasElement);
		}
		this._loadingSpinner = new RE_LoadingSpinner(canvasElement, {
			fillColor: this._options.mapBackgroundColor,
			borderColor: this._options.tileDefaultColor,
			easingFunc: this._easing.EaseInOutQuad
		});
		
		this._Log(DEBUGLEVEL.INFO, "Engine Initialized");

		this._BuildMapLayout();
	}

	get options() {
		return this._options;
	}
	set options(newOptions) {
		let needToRebuild = false;
		let oldOptions = this._options;
		this._options = { ...this._options, ...newOptions };

		//Compare changes to see if the map structure needs to be rebuilt
		if (this._options.mapDataFile !== oldOptions.mapDataFile) {
			needToRebuild = true;
		}

		if (needToRebuild) {
			this._BuildMapLayout();
		}
	}

	_Log(type, output) {
		if ((this._options.debugging) && (this._options.debuggingLevel <= type)) {
			switch (type) {
				case DEBUGLEVEL.INFO:
					console.log("%cINFO: %c" + output, "font-weight:800;", "font-weight:400;");
					break;
				case DEBUGLEVEL.WARNING:
					console.log("%cWARNING: %c" + output, "font-weight:800;color:#A17727;", "font-weight:400;");
					break;
				case DEBUGLEVEL.ERROR:
					console.log("%cERROR: %c" + output, "font-weight:800;color:#A12727;", "font-weight:400;");
					break;
			}
		}
	}

	async _GetMapData() {
		try {
			let response = await fetch(this._options.mapDataFile, {
				method: 'GET',
				headers: {
					'Content-type': 'application/json'
				}
			});
			let result = await response.json();

			this._map.data = result;
			return true;
		} catch (err) {
			this._Log(DEBUGLEVEL.ERROR, "Retrieving map data failed!");
			this._Log(DEBUGLEVEL.ERROR, err);
			return false;
		}
	}

	async _BuildMapLayout() {
		this._Log(DEBUGLEVEL.INFO, "Building map layout...");

		this._state.loading = true;

		if (this._state.opacity === 1) {
			//Fade out current map before rebuilding
			this._QueueTransition(TRANSITIONTYPES.FADE, 1, 0, 0, 60, this._easing.Linear, this._BuildMapLayout.bind(this));
			return;
		}

		this._map.isBuilding = true;

		//Try to load the map data
		if (!await this._GetMapData()) {
			this._map.isBuilding = false;
			return;
		}

		//Set default state from map data
		this._state.curPosition.x = this._map.data.start.x;
		this._state.curPosition.y = this._map.data.start.y;
		this._state.zoom = this._map.data.start.zoom;
		this._state.sightRange = this._map.data.start.sightRange;

		//Update cached map sizing vars
		this._map.tileSize = this._map.data.tileSize;
		this._map.tileQuarterSize = (this._map.tileSize / 4);
		this._map.tileHalfSize = (this._map.tileSize / 2);
		this._map.tileDoubleSize = (this._map.tileSize * 2);
		this._map.tilesW = this._map.data.tileMap[0].length;
		this._map.tilesH = this._map.data.tileMap.length;
		this._map.offsetX = (this._map.tilesW * this._map.tileSize);
		this._map.pixelsW = (this._map.tilesW * this._map.tileSize) + this._map.tileDoubleSize + this._map.offsetX;
		this._map.pixelsH = (this._map.tilesH * this._map.tileSize) + this._map.tileSize;

		//Clear any queued transitions from previous map data
		this._state.transitionQueue.length = 0;

		//Fade in when done building
		this._state.opacity = 0;
		this._QueueTransition(TRANSITIONTYPES.FADE, 0, 1, 60, 60, this._easing.Linear, () => {
			this._state.loading = false;
		});

		//Clear any current tiles and rebuild them
		//(Clear each row array of columns then clear the array of rows)
		for (let i = 0; i < this._map.tiles.length; i++) {
			this._map.tiles[i].length = 0;
		}
		this._map.tiles.length = 0;

		//Build map tiles in typical row scan fashion, top -> bottom & left -> right
		for (let y = 0; y < this._map.tilesH; y++) {
			this._map.tiles.push([]);
			for (let x = 0; x < this._map.tilesW; x++) {
				if (this._map.data.tileMap[y][x] === 1) {
					let tilePx = this._GridToPixels(x, y);
					let newTile = new RE_Tile({
						position: {
							x, y
						},
						pixelBounds: {
							x: tilePx.x,
							y: tilePx.y,
							w: this._map.tileDoubleSize,
							h: this._map.tileSize
						},
						state: {
							focused: ((x === this._state.curPosition.x) && (y === this._state.curPosition.y))
						}
					});

					if (newTile.focused) {
						this._state.focusedTile = newTile;
					}

					this._map.tiles[y].push(newTile);
				} else {
					this._map.tiles[y].push(null);
				}
			}
		}

		//Build the full map canvas with the tiles
		this._fullCanvas.width = this._map.pixelsW;
		this._fullCanvas.height = this._map.pixelsH;

		this._fullContext.setTransform(1, 0, 0, 1, 0, 0);
		this._fullContext.fillStyle = this._options.mapBackgroundColor;
		this._fullContext.fillRect(0, 0, this._map.pixelsW, this._map.pixelsH);

		this._fullContext.fillStyle = this._options.tileDefaultColor;
		this._fullContext.strokeStyle = this._options.mapBackgroundColor;
		this._fullContext.lineWidth = 2;

		for (let y = 0; y < this._map.tilesH; y++) {
			for (let x = 0; x < this._map.tilesW; x++) {
				let tile = this._map.tiles[y][x];
				if (tile !== null) {
					let px = tile.bounds.x;
					let py = tile.bounds.y;

					this._fullContext.beginPath();
					this._fullContext.moveTo(px, py + this._map.tileHalfSize);
					this._fullContext.lineTo(px + this._map.tileSize, py);
					this._fullContext.lineTo(px + this._map.tileDoubleSize, py + this._map.tileHalfSize);
					this._fullContext.lineTo(px + this._map.tileSize, py + this._map.tileSize);
					this._fullContext.closePath();
					this._fullContext.fill();
					this._fullContext.stroke();
				}
			}
		}

		this._map.isBuilding = false;

		this._Log(DEBUGLEVEL.INFO, "Finished building map layout.");
	}

	_GridToPixels(x, y) {
		let xPos = (x * this._map.tileSize) - (y * this._map.tileSize) + this._map.offsetX;
		let yPos = (x * this._map.tileHalfSize) + (y * this._map.tileHalfSize);

		return { x: xPos, y: yPos };
	}
	_TileAt(x, y) {
		if (y < 0) return null;
		if (y >= this._map.tiles.length) return null;
		if (x < 0) return null;
		if (x >= this._map.tiles[y].length) return null;

		return this._map.tiles[y][x];
	}

	_TransitionExistsInQueue(type) {
		for (let t = 0; t < this._state.transitionQueue.length; t++) {
			if (this._state.transitionQueue[t].type === type) {
				return true;
			}
		}
		return false;
	}
	_QueueTransition(type, startValue, endValue, delay, duration, easingFunc, callbackFunc) {
		let newT = {
			type: type,
			start: startValue,
			end: endValue,
			delay: delay,
			duration: duration,
			time: 0,
			easingFunc: easingFunc,
			callbackFunc: callbackFunc
		};
		this._state.transitionQueue.push(newT);
	}
	
	_RenderFrame() {
		this._context.fillStyle = this._options.mapBackgroundColor;
		this._context.fillRect(0, 0, this._canvasSize.w, this._canvasSize.h);

		//Draw map to on-screen canvas
		if (!this._map.isBuilding) {
			//Center view on currently focused tile
			let curTile = this._state.focusedTile;
			let pixelFocus = this._GridToPixels(curTile.x, curTile.y);
			let scale = .25;
			for (let z = this._state.zoom; z > this.MINZOOM; z--) {
				scale *= this.ZOOMSCALEINCREMENT;
			}
			let opacity = this._state.opacity;

			if (this._state.transitionQueue.length > 0) {
				let curTransition = this._state.transitionQueue[0];

				if (curTransition.delay > 0) {
					curTransition.delay--;
				} else {
					curTransition.time++;

					switch (curTransition.type) {
						case TRANSITIONTYPES.FADE:
							if (curTransition.time < curTransition.duration) {
								//Not finished yet. Get value based on where we are in the transition.
								opacity = curTransition.easingFunc(curTransition.time, curTransition.start, (curTransition.end - curTransition.start), curTransition.duration);
							} else {
								//Finished. Use ending value.
								opacity = curTransition.end;

								this._state.opacity = curTransition.end;
							}
							break;
						case TRANSITIONTYPES.MOVE:
							let newPixelFocus = this._GridToPixels(curTransition.end.x, curTransition.end.y);
							if (curTransition.time < curTransition.duration) {
								//Not finished yet. Get value based on where we are in the transition.
								pixelFocus.x = curTransition.easingFunc(curTransition.time, pixelFocus.x, (newPixelFocus.x - pixelFocus.x), curTransition.duration);
								pixelFocus.y = curTransition.easingFunc(curTransition.time, pixelFocus.y, (newPixelFocus.y - pixelFocus.y), curTransition.duration);
							} else {
								//Finished. Use ending value and update current state.
								pixelFocus = newPixelFocus;

								this._state.focusedTile.focused = false;
								this._state.focusedTile = curTransition.end;
								this._state.curPosition.x = curTransition.end.x;
								this._state.curPosition.y = curTransition.end.y;
							}
							break;
						case TRANSITIONTYPES.ZOOM:
							let newZoomScale = .25;
							for (let z = curTransition.end; z > this.MINZOOM; z--) {
								newZoomScale *= this.ZOOMSCALEINCREMENT;
							}
							if (curTransition.time < curTransition.duration) {
								//Not finished yet. Get value based on where we are in the transition.
								scale = curTransition.easingFunc(curTransition.time, scale, (newZoomScale - scale), curTransition.duration);
							} else {
								//Finished. Use ending value.
								scale = newZoomScale;

								this._state.zoom = curTransition.end;
							}
							break;
					}

					if (curTransition.time === curTransition.duration) {
						if (curTransition.callbackFunc !== null) {
							curTransition.callbackFunc();
						}
						this._state.transitionQueue.shift();
					}
				}
			}

			//Shift to center of tile
			pixelFocus.x += this._map.tileSize;
			pixelFocus.y += this._map.tileHalfSize;

			let sourceX = (pixelFocus.x - ((this._canvasSize.w / scale) / 2));
			let sourceY = (pixelFocus.y - ((this._canvasSize.h / scale) / 2));
			let sourceW = (this._canvasSize.w / scale);
			let sourceH = (this._canvasSize.h / scale);

			this._context.globalAlpha = opacity;
			this._context.drawImage(this._fullCanvas, sourceX, sourceY, sourceW, sourceH, 0, 0, this._canvasSize.w, this._canvasSize.h);
			this._context.globalAlpha = 1;
		}

		//Draw loading spinner above map
		this._loadingSpinner.show = (this._map.isBuilding || this._state.loading);
		this._loadingSpinner.Render();

		//Draw debugging info above everything else
		if (this._timer !== null) {
			this._timer.Tick();
			this._timer.Render();
		}

		if (this._isRunning) {
			requestAnimationFrame(this._RenderFrame.bind(this));
		}
	}

	get position() {
		return this._state.curPosition;
	}
	_Move(x, y) {
		let prevTile = this._state.focusedTile;
		let newTile = this._TileAt(this._state.curPosition.x + x, this._state.curPosition.y + y);
		if (newTile === null) return false;
		if (newTile.occupied) return false;

		if (!this._TransitionExistsInQueue(TRANSITIONTYPES.MOVE)) {
			this._QueueTransition(TRANSITIONTYPES.MOVE, prevTile, newTile, 0, 15, this._easing.EaseInOutQuad, null);
		}

		return true;
	}
	MoveRight() {
		return this._Move(1, 0);
	}
	MoveDown() {
		return this._Move(0, 1);
	}
	MoveLeft() {
		return this._Move(-1, 0);
	}
	MoveUp() {
		return this._Move(0, -1);
	}

	get zoom() {
		return this._state.zoom;
	}
	_Zoom(z) {
		let newZoom = this._state.zoom + z;
		if (!this._TransitionExistsInQueue(TRANSITIONTYPES.ZOOM)) {
			if ((newZoom <= this.MAXZOOM) && (newZoom >= this.MINZOOM)) {
				this._QueueTransition(TRANSITIONTYPES.ZOOM, this._state.zoom, newZoom, 0, 15, this._easing.Linear, null);
				return true;
			}
		}
		return false;
	}
	ZoomIn() {
		return this._Zoom(1);
	}
	ZoomOut() {
		return this._Zoom(-1);
	}

	Start() {
		this._isRunning = true;

		if (this._timer !== null) {
			this._timer.Start();
		}
		requestAnimationFrame(this._RenderFrame.bind(this));
	}
	Stop() {
		this._isRunning = false;

		if (this._timer !== null) {
			this._timer.Stop();
		}
	}
}

export { DEBUGLEVEL, RaptorEngine };
