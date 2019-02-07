/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scripts_re_main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scripts/re.main.js */ \"./src/scripts/re.main.js\");\n\r\n\r\nwindow.STL = (window.STL || {});\r\nwindow.STL.DEBUGLEVEL = (window.STL.DEBUGLEVEL || _scripts_re_main_js__WEBPACK_IMPORTED_MODULE_0__[\"DEBUGLEVEL\"]);\r\nwindow.STL.RaptorEngine = (window.STL.RaptorEngine || _scripts_re_main_js__WEBPACK_IMPORTED_MODULE_0__[\"RaptorEngine\"]);\r\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/scripts/components/re.loadingSpinner.js":
/*!*****************************************************!*\
  !*** ./src/scripts/components/re.loadingSpinner.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (class {\r\n\tconstructor(canvasElement = null, options = {}) {\r\n\t\tif (!canvasElement) {\r\n\t\t\tthrow new Error(\"LoadingSpinner must be initialized with a valid 'canvas' element!\");\r\n\t\t}\r\n\r\n\t\tthis._canvas = canvasElement;\r\n\t\tthis._context = this._canvas.getContext('2d');\r\n\t\tthis._spinCanvas = document.createElement('canvas');\r\n\t\tthis._spinContext = this._spinCanvas.getContext('2d');\r\n\r\n\t\tthis._spinCanvas.width = 300;\r\n\t\tthis._spinCanvas.height = 300;\r\n\r\n\t\tthis._state = {\r\n\t\t\topacity: 0,\r\n\t\t\tfadingIn: false,\r\n\t\t\tfadingOut: false,\r\n\r\n\t\t\tcurFrame: 0\r\n\t\t};\r\n\t\tthis._PI180 = (Math.PI / 180);\r\n\r\n\t\t//Default options\r\n\t\tthis._options = {\r\n\t\t\tfillColor: \"#000000\",\r\n\t\t\tborderColor: \"#F0F0F0\",\r\n\r\n\t\t\teasingFunc: null\r\n\t\t};\r\n\t\t//Merge passed in options over defaults\r\n\t\tthis._options = { ...this._options, ...options };\r\n\t}\r\n\r\n\tset show(value) {\r\n\t\tif ((value) && (this._state.opacity === 0)) {\r\n\t\t\t//Was just now set to 'true', start showing\r\n\t\t\tthis._state.fadingIn = true;\r\n\t\t} else if ((!value) && (this._state.opacity === 100)) {\r\n\t\t\t//Was just now set to 'false', start hiding\r\n\t\t\tthis._state.fadingOut = true;\r\n\t\t}\r\n\t}\r\n\r\n\tRender() {\r\n\t\tif (this._state.fadingIn) {\r\n\t\t\tthis._state.opacity += 5;\r\n\t\t\tif (this._state.opacity >= 100) {\r\n\t\t\t\tthis._state.opacity = 100;\r\n\t\t\t\tthis._state.fadingIn = false;\r\n\t\t\t}\r\n\t\t}\r\n\t\tif (this._state.fadingOut) {\r\n\t\t\tthis._state.opacity -= 5;\r\n\t\t\tif (this._state.opacity <= 0) {\r\n\t\t\t\tthis._state.opacity = 0;\r\n\t\t\t\tthis._state.fadingOut = false;\r\n\t\t\t}\r\n\t\t}\r\n\r\n\t\tif (this._state.opacity > 0) {\r\n\t\t\tthis._state.curFrame++;\r\n\t\t\tif (this._state.curFrame === 150) {\r\n\t\t\t\tthis._state.curFrame = 0;\r\n\t\t\t}\r\n\t\t\t\r\n\t\t\tthis._spinContext.setTransform(1, 0, 0, 1, 0, 0);\r\n\t\t\tthis._spinContext.clearRect(0, 0, 300, 300);\r\n\r\n\t\t\tthis._spinContext.globalAlpha = (this._state.opacity / 100);\r\n\r\n\t\t\tlet rotation = 45;\r\n\t\t\tif (this._options.easingFunc !== null) {\r\n\t\t\t\trotation = this._options.easingFunc(this._state.curFrame, 45, 720, 150);\r\n\t\t\t} else {\r\n\t\t\t\t//Default to Linear progression\r\n\t\t\t\t//change * time / duration + start\r\n\t\t\t\trotation = 720 * this._state.curFrame / 150 + 45;\r\n\t\t\t}\r\n\t\t\tif (rotation >= 360) {\r\n\t\t\t\trotation -= 360;\r\n\t\t\t}\r\n\t\t\tthis._spinContext.translate(150, 150);\r\n\t\t\tthis._spinContext.rotate(this._PI180 * rotation);\r\n\t\t\tthis._spinContext.translate(-150, -150);\r\n\r\n\t\t\tthis._spinContext.fillStyle = this._options.fillColor;\r\n\t\t\tthis._spinContext.strokeStyle = this._options.borderColor;\r\n\t\t\tthis._spinContext.lineWidth = 2;\r\n\t\t\tthis._spinContext.beginPath();\r\n\t\t\tthis._spinContext.moveTo(100, 100);\r\n\t\t\tthis._spinContext.lineTo(200, 100);\r\n\t\t\tthis._spinContext.lineTo(200, 200);\r\n\t\t\tthis._spinContext.lineTo(100, 200);\r\n\t\t\tthis._spinContext.closePath();\r\n\t\t\tthis._spinContext.fill();\r\n\t\t\tthis._spinContext.stroke();\r\n\t\t\t\r\n\t\t\tlet drawX = ((this._canvas.width - 300) / 2);\r\n\t\t\tlet drawY = ((this._canvas.height - 150) / 2);\r\n\t\t\tthis._context.drawImage(this._spinCanvas, drawX, drawY, 300, 150);\r\n\t\t}\r\n\t}\r\n});\r\n\n\n//# sourceURL=webpack:///./src/scripts/components/re.loadingSpinner.js?");

/***/ }),

/***/ "./src/scripts/components/re.tile.js":
/*!*******************************************!*\
  !*** ./src/scripts/components/re.tile.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (class {\r\n\tconstructor(options = {}) {\r\n\t\tthis._options = {\r\n\t\t\tposition: {\r\n\t\t\t\tx: 0,\r\n\t\t\t\ty: 0\r\n\t\t\t},\r\n\t\t\tpixelBounds: {\r\n\t\t\t\tx: 0,\r\n\t\t\t\ty: 0,\r\n\t\t\t\tw: 0,\r\n\t\t\t\th: 0\r\n\t\t\t},\r\n\t\t\tstate: {\r\n\t\t\t\tfocused: false,\r\n\t\t\t\toccupied: false\r\n\t\t\t},\r\n\t\t\ttexture: {\r\n\r\n\t\t\t}\r\n\t\t};\r\n\t\tthis._options = { ...this._options, ...options };\r\n\t}\r\n\r\n\tget x() {\r\n\t\treturn this._options.position.x;\r\n\t}\r\n\tget y() {\r\n\t\treturn this._options.position.y;\r\n\t}\r\n\tget bounds() {\r\n\t\treturn this._options.pixelBounds;\r\n\t}\r\n\r\n\tget focused() {\r\n\t\treturn this._options.state.focused;\r\n\t}\r\n\tset focused(value) {\r\n\t\tthis._options.state.focused = value;\r\n\t}\r\n\r\n\tget occupied() {\r\n\t\treturn this._options.state.occupied;\r\n\t}\r\n\tset occupied(value) {\r\n\t\tthis._options.state.occupied = value;\r\n\t}\r\n});\r\n\n\n//# sourceURL=webpack:///./src/scripts/components/re.tile.js?");

/***/ }),

/***/ "./src/scripts/re.main.js":
/*!********************************!*\
  !*** ./src/scripts/re.main.js ***!
  \********************************/
/*! exports provided: DEBUGLEVEL, RaptorEngine */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DEBUGLEVEL\", function() { return DEBUGLEVEL; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RaptorEngine\", function() { return RaptorEngine; });\n/* harmony import */ var _utils_re_easing_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/re.easing.js */ \"./src/scripts/utils/re.easing.js\");\n/* harmony import */ var _utils_re_timer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/re.timer.js */ \"./src/scripts/utils/re.timer.js\");\n/* harmony import */ var _components_re_loadingSpinner_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/re.loadingSpinner.js */ \"./src/scripts/components/re.loadingSpinner.js\");\n/* harmony import */ var _components_re_tile_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/re.tile.js */ \"./src/scripts/components/re.tile.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nconst DEBUGLEVEL = {\r\n\tINFO: 0,\r\n\tWARNING: 1,\r\n\tERROR: 2\r\n};\r\n\r\nconst TRANSITIONTYPES = {\r\n\tNONE: 0,\r\n\tFADE: 1,\r\n\tMOVE: 2,\r\n\tZOOM: 3\r\n};\r\n\r\nclass RaptorEngine {\r\n\tconstructor(canvasElement = null, options = {}) {\r\n\t\tthis.MINZOOM = 1;\r\n\t\tthis.MAXZOOM = 5;\r\n\t\tthis.ZOOMSCALEINCREMENT = 2;\r\n\r\n\t\tthis._isRunning = false;\r\n\r\n\t\t//Default options\r\n\t\tthis._options = {\r\n\t\t\tdebugging: (\"development\" !== \"production\"),\r\n\t\t\tdebuggingLevel: DEBUGLEVEL.WARNING,\r\n\r\n\t\t\tmapDataFile: \"\",\r\n\t\t\tmapBackgroundColor: \"#000000\",\r\n\r\n\t\t\ttileDefaultColor: \"#F0F0F0\"\r\n\t\t};\r\n\t\t//Merge passed in options over defaults\r\n\t\tthis._options = { ...this._options, ...options };\r\n\r\n\t\t//Cached vars for map building\r\n\t\tthis._map = {\r\n\t\t\tdata: null,\r\n\t\t\tisBuilding: false,\r\n\t\t\ttileSize: 0,\r\n\t\t\ttileQuarterSize: 0,\r\n\t\t\ttileHalfSize: 0,\r\n\t\t\ttileDoubleSize: 0,\r\n\t\t\ttilesW: 0,\r\n\t\t\ttilesH: 0,\r\n\t\t\toffsetX: 0,\r\n\t\t\tpixelsW: 0,\r\n\t\t\tpixelsH: 0,\r\n\t\t\ttiles: []\r\n\t\t};\r\n\r\n\t\tthis._state = {\r\n\t\t\tloading: false,\r\n\t\t\tcurPosition: {\r\n\t\t\t\tx: 0,\r\n\t\t\t\ty: 0\r\n\t\t\t},\r\n\t\t\tfocusedTile: null,\r\n\r\n\t\t\tzoom: 3,\r\n\t\t\topacity: 0,\r\n\t\t\tsightRange: 3,\r\n\r\n\t\t\ttransitionQueue: []\r\n\t\t};\r\n\t\t\r\n\t\tif (!canvasElement) {\r\n\t\t\tthis._Log(DEBUGLEVEL.ERROR, \"No 'canvas' specified!\");\r\n\t\t\tthrow new Error(\"RaptorEngine must be initialized with a valid 'canvas' element!\");\r\n\t\t}\r\n\t\tif (this._options.mapDataFile === \"\") {\r\n\t\t\tthis._Log(DEBUGLEVEL.WARNING, \"No 'mapDataFile' specified in the initialization options!\");\r\n\t\t}\r\n\t\tthis._canvas = canvasElement;\r\n\t\tthis._context = this._canvas.getContext('2d');\r\n\t\tthis._fullCanvas = document.createElement('canvas');\r\n\t\tthis._fullContext = this._fullCanvas.getContext('2d');\r\n\t\tthis._canvasSize = { };\r\n\t\tthis._canvasSize.w = this._canvas.width = this._canvas.offsetWidth;\r\n\t\tthis._canvasSize.h = this._canvas.height = this._canvas.offsetHeight;\r\n\t\t\r\n\t\tthis._easing = new _utils_re_easing_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n\t\tthis._timer = null;\r\n\t\tif (this._options.debugging) {\r\n\t\t\tthis._timer = new _utils_re_timer_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](canvasElement);\r\n\t\t}\r\n\t\tthis._loadingSpinner = new _components_re_loadingSpinner_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](canvasElement, {\r\n\t\t\tfillColor: this._options.mapBackgroundColor,\r\n\t\t\tborderColor: this._options.tileDefaultColor,\r\n\t\t\teasingFunc: this._easing.EaseInOutQuad\r\n\t\t});\r\n\t\t\r\n\t\tthis._Log(DEBUGLEVEL.INFO, \"Engine Initialized\");\r\n\r\n\t\tthis._BuildMapLayout();\r\n\t}\r\n\r\n\tget options() {\r\n\t\treturn this._options;\r\n\t}\r\n\tset options(newOptions) {\r\n\t\tlet needToRebuild = false;\r\n\t\tlet oldOptions = this._options;\r\n\t\tthis._options = { ...this._options, ...newOptions };\r\n\r\n\t\t//Compare changes to see if the map structure needs to be rebuilt\r\n\t\tif (this._options.mapDataFile !== oldOptions.mapDataFile) {\r\n\t\t\tneedToRebuild = true;\r\n\t\t}\r\n\r\n\t\tif (needToRebuild) {\r\n\t\t\tthis._BuildMapLayout();\r\n\t\t}\r\n\t}\r\n\r\n\t_Log(type, output) {\r\n\t\tif ((this._options.debugging) && (this._options.debuggingLevel <= type)) {\r\n\t\t\tswitch (type) {\r\n\t\t\t\tcase DEBUGLEVEL.INFO:\r\n\t\t\t\t\tconsole.log(\"%cINFO: %c\" + output, \"font-weight:800;\", \"font-weight:400;\");\r\n\t\t\t\t\tbreak;\r\n\t\t\t\tcase DEBUGLEVEL.WARNING:\r\n\t\t\t\t\tconsole.log(\"%cWARNING: %c\" + output, \"font-weight:800;color:#A17727;\", \"font-weight:400;\");\r\n\t\t\t\t\tbreak;\r\n\t\t\t\tcase DEBUGLEVEL.ERROR:\r\n\t\t\t\t\tconsole.log(\"%cERROR: %c\" + output, \"font-weight:800;color:#A12727;\", \"font-weight:400;\");\r\n\t\t\t\t\tbreak;\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n\r\n\tasync _GetMapData() {\r\n\t\ttry {\r\n\t\t\tlet response = await fetch(this._options.mapDataFile, {\r\n\t\t\t\tmethod: 'GET',\r\n\t\t\t\theaders: {\r\n\t\t\t\t\t'Content-type': 'application/json'\r\n\t\t\t\t}\r\n\t\t\t});\r\n\t\t\tlet result = await response.json();\r\n\r\n\t\t\tthis._map.data = result;\r\n\t\t\treturn true;\r\n\t\t} catch (err) {\r\n\t\t\tthis._Log(DEBUGLEVEL.ERROR, \"Retrieving map data failed!\");\r\n\t\t\tthis._Log(DEBUGLEVEL.ERROR, err);\r\n\t\t\treturn false;\r\n\t\t}\r\n\t}\r\n\r\n\tasync _BuildMapLayout() {\r\n\t\tthis._Log(DEBUGLEVEL.INFO, \"Building map layout...\");\r\n\r\n\t\tthis._state.loading = true;\r\n\r\n\t\tif (this._state.opacity === 1) {\r\n\t\t\t//Fade out current map before rebuilding\r\n\t\t\tthis._QueueTransition(TRANSITIONTYPES.FADE, 1, 0, 0, 60, this._easing.Linear, this._BuildMapLayout.bind(this));\r\n\t\t\treturn;\r\n\t\t}\r\n\r\n\t\tthis._map.isBuilding = true;\r\n\r\n\t\t//Try to load the map data\r\n\t\tif (!await this._GetMapData()) {\r\n\t\t\tthis._map.isBuilding = false;\r\n\t\t\treturn;\r\n\t\t}\r\n\r\n\t\t//Set default state from map data\r\n\t\tthis._state.curPosition.x = this._map.data.start.x;\r\n\t\tthis._state.curPosition.y = this._map.data.start.y;\r\n\t\tthis._state.zoom = this._map.data.start.zoom;\r\n\t\tthis._state.sightRange = this._map.data.start.sightRange;\r\n\r\n\t\t//Update cached map sizing vars\r\n\t\tthis._map.tileSize = this._map.data.tileSize;\r\n\t\tthis._map.tileQuarterSize = (this._map.tileSize / 4);\r\n\t\tthis._map.tileHalfSize = (this._map.tileSize / 2);\r\n\t\tthis._map.tileDoubleSize = (this._map.tileSize * 2);\r\n\t\tthis._map.tilesW = this._map.data.tileMap[0].length;\r\n\t\tthis._map.tilesH = this._map.data.tileMap.length;\r\n\t\tthis._map.offsetX = (this._map.tilesW * this._map.tileSize);\r\n\t\tthis._map.pixelsW = (this._map.tilesW * this._map.tileSize) + this._map.tileDoubleSize + this._map.offsetX;\r\n\t\tthis._map.pixelsH = (this._map.tilesH * this._map.tileSize) + this._map.tileSize;\r\n\r\n\t\t//Clear any queued transitions from previous map data\r\n\t\tthis._state.transitionQueue.length = 0;\r\n\r\n\t\t//Fade in when done building\r\n\t\tthis._state.opacity = 0;\r\n\t\tthis._QueueTransition(TRANSITIONTYPES.FADE, 0, 1, 60, 60, this._easing.Linear, () => {\r\n\t\t\tthis._state.loading = false;\r\n\t\t});\r\n\r\n\t\t//Clear any current tiles and rebuild them\r\n\t\t//(Clear each row array of columns then clear the array of rows)\r\n\t\tfor (let i = 0; i < this._map.tiles.length; i++) {\r\n\t\t\tthis._map.tiles[i].length = 0;\r\n\t\t}\r\n\t\tthis._map.tiles.length = 0;\r\n\r\n\t\t//Build map tiles in typical row scan fashion, top -> bottom & left -> right\r\n\t\tfor (let y = 0; y < this._map.tilesH; y++) {\r\n\t\t\tthis._map.tiles.push([]);\r\n\t\t\tfor (let x = 0; x < this._map.tilesW; x++) {\r\n\t\t\t\tif (this._map.data.tileMap[y][x] === 1) {\r\n\t\t\t\t\tlet tilePx = this._GridToPixels(x, y);\r\n\t\t\t\t\tlet newTile = new _components_re_tile_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"]({\r\n\t\t\t\t\t\tposition: {\r\n\t\t\t\t\t\t\tx, y\r\n\t\t\t\t\t\t},\r\n\t\t\t\t\t\tpixelBounds: {\r\n\t\t\t\t\t\t\tx: tilePx.x,\r\n\t\t\t\t\t\t\ty: tilePx.y,\r\n\t\t\t\t\t\t\tw: this._map.tileDoubleSize,\r\n\t\t\t\t\t\t\th: this._map.tileSize\r\n\t\t\t\t\t\t},\r\n\t\t\t\t\t\tstate: {\r\n\t\t\t\t\t\t\tfocused: ((x === this._state.curPosition.x) && (y === this._state.curPosition.y))\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t});\r\n\r\n\t\t\t\t\tif (newTile.focused) {\r\n\t\t\t\t\t\tthis._state.focusedTile = newTile;\r\n\t\t\t\t\t}\r\n\r\n\t\t\t\t\tthis._map.tiles[y].push(newTile);\r\n\t\t\t\t} else {\r\n\t\t\t\t\tthis._map.tiles[y].push(null);\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\t}\r\n\r\n\t\t//Build the full map canvas with the tiles\r\n\t\tthis._fullCanvas.width = this._map.pixelsW;\r\n\t\tthis._fullCanvas.height = this._map.pixelsH;\r\n\r\n\t\tthis._fullContext.setTransform(1, 0, 0, 1, 0, 0);\r\n\t\tthis._fullContext.fillStyle = this._options.mapBackgroundColor;\r\n\t\tthis._fullContext.fillRect(0, 0, this._map.pixelsW, this._map.pixelsH);\r\n\r\n\t\tthis._fullContext.fillStyle = this._options.tileDefaultColor;\r\n\t\tthis._fullContext.strokeStyle = this._options.mapBackgroundColor;\r\n\t\tthis._fullContext.lineWidth = 2;\r\n\r\n\t\tfor (let y = 0; y < this._map.tilesH; y++) {\r\n\t\t\tfor (let x = 0; x < this._map.tilesW; x++) {\r\n\t\t\t\tlet tile = this._map.tiles[y][x];\r\n\t\t\t\tif (tile !== null) {\r\n\t\t\t\t\tlet px = tile.bounds.x;\r\n\t\t\t\t\tlet py = tile.bounds.y;\r\n\r\n\t\t\t\t\tthis._fullContext.beginPath();\r\n\t\t\t\t\tthis._fullContext.moveTo(px, py + this._map.tileHalfSize);\r\n\t\t\t\t\tthis._fullContext.lineTo(px + this._map.tileSize, py);\r\n\t\t\t\t\tthis._fullContext.lineTo(px + this._map.tileDoubleSize, py + this._map.tileHalfSize);\r\n\t\t\t\t\tthis._fullContext.lineTo(px + this._map.tileSize, py + this._map.tileSize);\r\n\t\t\t\t\tthis._fullContext.closePath();\r\n\t\t\t\t\tthis._fullContext.fill();\r\n\t\t\t\t\tthis._fullContext.stroke();\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\t}\r\n\r\n\t\tthis._map.isBuilding = false;\r\n\r\n\t\tthis._Log(DEBUGLEVEL.INFO, \"Finished building map layout.\");\r\n\t}\r\n\r\n\t_GridToPixels(x, y) {\r\n\t\tlet xPos = (x * this._map.tileSize) - (y * this._map.tileSize) + this._map.offsetX;\r\n\t\tlet yPos = (x * this._map.tileHalfSize) + (y * this._map.tileHalfSize);\r\n\r\n\t\treturn { x: xPos, y: yPos };\r\n\t}\r\n\t_TileAt(x, y) {\r\n\t\tif (y < 0) return null;\r\n\t\tif (y >= this._map.tiles.length) return null;\r\n\t\tif (x < 0) return null;\r\n\t\tif (x >= this._map.tiles[y].length) return null;\r\n\r\n\t\treturn this._map.tiles[y][x];\r\n\t}\r\n\r\n\t_TransitionExistsInQueue(type) {\r\n\t\tfor (let t = 0; t < this._state.transitionQueue.length; t++) {\r\n\t\t\tif (this._state.transitionQueue[t].type === type) {\r\n\t\t\t\treturn true;\r\n\t\t\t}\r\n\t\t}\r\n\t\treturn false;\r\n\t}\r\n\t_QueueTransition(type, startValue, endValue, delay, duration, easingFunc, callbackFunc) {\r\n\t\tlet newT = {\r\n\t\t\ttype: type,\r\n\t\t\tstart: startValue,\r\n\t\t\tend: endValue,\r\n\t\t\tdelay: delay,\r\n\t\t\tduration: duration,\r\n\t\t\ttime: 0,\r\n\t\t\teasingFunc: easingFunc,\r\n\t\t\tcallbackFunc: callbackFunc\r\n\t\t};\r\n\t\tthis._state.transitionQueue.push(newT);\r\n\t}\r\n\t\r\n\t_RenderFrame() {\r\n\t\tthis._context.fillStyle = this._options.mapBackgroundColor;\r\n\t\tthis._context.fillRect(0, 0, this._canvasSize.w, this._canvasSize.h);\r\n\r\n\t\t//Draw map to on-screen canvas\r\n\t\tif (!this._map.isBuilding) {\r\n\t\t\t//Center view on currently focused tile\r\n\t\t\tlet curTile = this._state.focusedTile;\r\n\t\t\tlet pixelFocus = this._GridToPixels(curTile.x, curTile.y);\r\n\t\t\tlet scale = .25;\r\n\t\t\tfor (let z = this._state.zoom; z > this.MINZOOM; z--) {\r\n\t\t\t\tscale *= this.ZOOMSCALEINCREMENT;\r\n\t\t\t}\r\n\t\t\tlet opacity = this._state.opacity;\r\n\r\n\t\t\tif (this._state.transitionQueue.length > 0) {\r\n\t\t\t\tlet curTransition = this._state.transitionQueue[0];\r\n\r\n\t\t\t\tif (curTransition.delay > 0) {\r\n\t\t\t\t\tcurTransition.delay--;\r\n\t\t\t\t} else {\r\n\t\t\t\t\tcurTransition.time++;\r\n\r\n\t\t\t\t\tswitch (curTransition.type) {\r\n\t\t\t\t\t\tcase TRANSITIONTYPES.FADE:\r\n\t\t\t\t\t\t\tif (curTransition.time < curTransition.duration) {\r\n\t\t\t\t\t\t\t\t//Not finished yet. Get value based on where we are in the transition.\r\n\t\t\t\t\t\t\t\topacity = curTransition.easingFunc(curTransition.time, curTransition.start, (curTransition.end - curTransition.start), curTransition.duration);\r\n\t\t\t\t\t\t\t} else {\r\n\t\t\t\t\t\t\t\t//Finished. Use ending value.\r\n\t\t\t\t\t\t\t\topacity = curTransition.end;\r\n\r\n\t\t\t\t\t\t\t\tthis._state.opacity = curTransition.end;\r\n\t\t\t\t\t\t\t}\r\n\t\t\t\t\t\t\tbreak;\r\n\t\t\t\t\t\tcase TRANSITIONTYPES.MOVE:\r\n\t\t\t\t\t\t\tlet newPixelFocus = this._GridToPixels(curTransition.end.x, curTransition.end.y);\r\n\t\t\t\t\t\t\tif (curTransition.time < curTransition.duration) {\r\n\t\t\t\t\t\t\t\t//Not finished yet. Get value based on where we are in the transition.\r\n\t\t\t\t\t\t\t\tpixelFocus.x = curTransition.easingFunc(curTransition.time, pixelFocus.x, (newPixelFocus.x - pixelFocus.x), curTransition.duration);\r\n\t\t\t\t\t\t\t\tpixelFocus.y = curTransition.easingFunc(curTransition.time, pixelFocus.y, (newPixelFocus.y - pixelFocus.y), curTransition.duration);\r\n\t\t\t\t\t\t\t} else {\r\n\t\t\t\t\t\t\t\t//Finished. Use ending value and update current state.\r\n\t\t\t\t\t\t\t\tpixelFocus = newPixelFocus;\r\n\r\n\t\t\t\t\t\t\t\tthis._state.focusedTile.focused = false;\r\n\t\t\t\t\t\t\t\tthis._state.focusedTile = curTransition.end;\r\n\t\t\t\t\t\t\t\tthis._state.curPosition.x = curTransition.end.x;\r\n\t\t\t\t\t\t\t\tthis._state.curPosition.y = curTransition.end.y;\r\n\t\t\t\t\t\t\t}\r\n\t\t\t\t\t\t\tbreak;\r\n\t\t\t\t\t\tcase TRANSITIONTYPES.ZOOM:\r\n\t\t\t\t\t\t\tlet newZoomScale = .25;\r\n\t\t\t\t\t\t\tfor (let z = curTransition.end; z > this.MINZOOM; z--) {\r\n\t\t\t\t\t\t\t\tnewZoomScale *= this.ZOOMSCALEINCREMENT;\r\n\t\t\t\t\t\t\t}\r\n\t\t\t\t\t\t\tif (curTransition.time < curTransition.duration) {\r\n\t\t\t\t\t\t\t\t//Not finished yet. Get value based on where we are in the transition.\r\n\t\t\t\t\t\t\t\tscale = curTransition.easingFunc(curTransition.time, scale, (newZoomScale - scale), curTransition.duration);\r\n\t\t\t\t\t\t\t} else {\r\n\t\t\t\t\t\t\t\t//Finished. Use ending value.\r\n\t\t\t\t\t\t\t\tscale = newZoomScale;\r\n\r\n\t\t\t\t\t\t\t\tthis._state.zoom = curTransition.end;\r\n\t\t\t\t\t\t\t}\r\n\t\t\t\t\t\t\tbreak;\r\n\t\t\t\t\t}\r\n\r\n\t\t\t\t\tif (curTransition.time === curTransition.duration) {\r\n\t\t\t\t\t\tif (curTransition.callbackFunc !== null) {\r\n\t\t\t\t\t\t\tcurTransition.callbackFunc();\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t\tthis._state.transitionQueue.shift();\r\n\t\t\t\t\t}\r\n\t\t\t\t}\r\n\t\t\t}\r\n\r\n\t\t\t//Shift to center of tile\r\n\t\t\tpixelFocus.x += this._map.tileSize;\r\n\t\t\tpixelFocus.y += this._map.tileHalfSize;\r\n\r\n\t\t\tlet sourceX = (pixelFocus.x - ((this._canvasSize.w / scale) / 2));\r\n\t\t\tlet sourceY = (pixelFocus.y - ((this._canvasSize.h / scale) / 2));\r\n\t\t\tlet sourceW = (this._canvasSize.w / scale);\r\n\t\t\tlet sourceH = (this._canvasSize.h / scale);\r\n\r\n\t\t\tthis._context.globalAlpha = opacity;\r\n\t\t\tthis._context.drawImage(this._fullCanvas, sourceX, sourceY, sourceW, sourceH, 0, 0, this._canvasSize.w, this._canvasSize.h);\r\n\t\t\tthis._context.globalAlpha = 1;\r\n\t\t}\r\n\r\n\t\t//Draw loading spinner above map\r\n\t\tthis._loadingSpinner.show = (this._map.isBuilding || this._state.loading);\r\n\t\tthis._loadingSpinner.Render();\r\n\r\n\t\t//Draw debugging info above everything else\r\n\t\tif (this._timer !== null) {\r\n\t\t\tthis._timer.Tick();\r\n\t\t\tthis._timer.Render();\r\n\t\t}\r\n\r\n\t\tif (this._isRunning) {\r\n\t\t\trequestAnimationFrame(this._RenderFrame.bind(this));\r\n\t\t}\r\n\t}\r\n\r\n\tget position() {\r\n\t\treturn this._state.curPosition;\r\n\t}\r\n\t_Move(x, y) {\r\n\t\tlet prevTile = this._state.focusedTile;\r\n\t\tlet newTile = this._TileAt(this._state.curPosition.x + x, this._state.curPosition.y + y);\r\n\t\tif (newTile === null) return false;\r\n\t\tif (newTile.occupied) return false;\r\n\r\n\t\tif (!this._TransitionExistsInQueue(TRANSITIONTYPES.MOVE)) {\r\n\t\t\tthis._QueueTransition(TRANSITIONTYPES.MOVE, prevTile, newTile, 0, 15, this._easing.EaseInOutQuad, null);\r\n\t\t}\r\n\r\n\t\treturn true;\r\n\t}\r\n\tMoveRight() {\r\n\t\treturn this._Move(1, 0);\r\n\t}\r\n\tMoveDown() {\r\n\t\treturn this._Move(0, 1);\r\n\t}\r\n\tMoveLeft() {\r\n\t\treturn this._Move(-1, 0);\r\n\t}\r\n\tMoveUp() {\r\n\t\treturn this._Move(0, -1);\r\n\t}\r\n\r\n\tget zoom() {\r\n\t\treturn this._state.zoom;\r\n\t}\r\n\t_Zoom(z) {\r\n\t\tlet newZoom = this._state.zoom + z;\r\n\t\tif (!this._TransitionExistsInQueue(TRANSITIONTYPES.ZOOM)) {\r\n\t\t\tif ((newZoom <= this.MAXZOOM) && (newZoom >= this.MINZOOM)) {\r\n\t\t\t\tthis._QueueTransition(TRANSITIONTYPES.ZOOM, this._state.zoom, newZoom, 0, 15, this._easing.Linear, null);\r\n\t\t\t\treturn true;\r\n\t\t\t}\r\n\t\t}\r\n\t\treturn false;\r\n\t}\r\n\tZoomIn() {\r\n\t\treturn this._Zoom(1);\r\n\t}\r\n\tZoomOut() {\r\n\t\treturn this._Zoom(-1);\r\n\t}\r\n\r\n\tStart() {\r\n\t\tthis._isRunning = true;\r\n\r\n\t\tif (this._timer !== null) {\r\n\t\t\tthis._timer.Start();\r\n\t\t}\r\n\t\trequestAnimationFrame(this._RenderFrame.bind(this));\r\n\t}\r\n\tStop() {\r\n\t\tthis._isRunning = false;\r\n\r\n\t\tif (this._timer !== null) {\r\n\t\t\tthis._timer.Stop();\r\n\t\t}\r\n\t}\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./src/scripts/re.main.js?");

/***/ }),

/***/ "./src/scripts/utils/re.easing.js":
/*!****************************************!*\
  !*** ./src/scripts/utils/re.easing.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (class {\r\n\tconstructor() {}\r\n\r\n\t/*\r\n\t\tt: current time\r\n\t\ts: starting value\r\n\t\tc: change in value\r\n\t\td: duration time\r\n\t*/\r\n\r\n\tLinear(t, s, c, d) {\r\n\t\treturn c * t / d + s;\r\n\t}\r\n\r\n\tEaseInOutQuad(t, s, c, d) {\r\n\t\tt /= (d / 2);\r\n\t\tif (t < 1) return c / 2 * t * t + s;\r\n\t\tt--;\r\n\t\treturn -c / 2 * (t * (t - 2) - 1) + s;\r\n\t}\r\n});\r\n\n\n//# sourceURL=webpack:///./src/scripts/utils/re.easing.js?");

/***/ }),

/***/ "./src/scripts/utils/re.timer.js":
/*!***************************************!*\
  !*** ./src/scripts/utils/re.timer.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (class {\r\n\tconstructor(canvasElement) {\r\n\t\tif (!canvasElement) {\r\n\t\t\tthrow new Error(\"LoadingSpinner must be initialized with a valid 'canvas' element!\");\r\n\t\t}\r\n\r\n\t\tthis._canvas = canvasElement;\r\n\t\tthis._context = this._canvas.getContext('2d');\r\n\r\n\t\tthis._isRunning = false;\r\n\t\tthis._intervalTimer = null;\r\n\r\n\t\tthis._filterStrength = 20;\r\n\t\tthis._frameTime = 0;\r\n\t\tthis._lastLoop = new Date();\r\n\t\tthis._thisLoop = new Date();\r\n\r\n\t\tthis._curFPS = \"N/A\";\r\n\t}\r\n\r\n\tget running() {\r\n\t\treturn this._isRunning;\r\n\t}\r\n\r\n\tStart() {\r\n\t\tthis._isRunning = true;\r\n\r\n\t\tthis._intervalTimer = setInterval(() => {\r\n\t\t\tthis._curFPS = (1000 / this._frameTime).toFixed(2);\r\n\t\t}, 1000);\r\n\t}\r\n\tStop() {\r\n\t\tthis._isRunning = false;\r\n\t\t\r\n\t\tclearInterval(this._intervalTimer);\r\n\t\tthis._intervalTimer = null;\r\n\t}\r\n\tTick() {\r\n\t\tthis._thisLoop = new Date();\r\n\r\n\t\tlet thisFrame = this._thisLoop - this._lastLoop;\r\n\t\tthis._frameTime += (thisFrame - this._frameTime) / this._filterStrength;\r\n\r\n\t\tthis._lastLoop = this._thisLoop;\r\n\t}\r\n\tRender() {\r\n\t\tthis._context.font = \"18px sans-serif\";\r\n\t\tthis._context.fillStyle = \"#000000\";\r\n\t\tthis._context.fillText(\"FPS: \" + this._curFPS, 7, 21);\r\n\t\tthis._context.fillStyle = \"#FFFFFF\";\r\n\t\tthis._context.fillText(\"FPS: \" + this._curFPS, 5, 19);\r\n\t}\r\n});\r\n\n\n//# sourceURL=webpack:///./src/scripts/utils/re.timer.js?");

/***/ })

/******/ });