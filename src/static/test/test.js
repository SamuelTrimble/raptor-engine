let ISO = {};
let run = function() {
	ISO.engine = new STL.RaptorEngine(document.getElementById("retest"), {
		debuggingLevel: STL.DEBUGLEVEL.INFO,
		mapDataFile: "testMap.json",
		mapBackgroundColor: "#262626",
		tileDefaultColor: "#276CB9"
	});
	ISO.engine.Start();

	window.addEventListener('keydown', (evt) => {
		switch (evt.key) {
			case "Right":
			case "ArrowRight":
				ISO.engine.MoveRight();
				break;
			case "Down":
			case "ArrowDown":
				if (evt.shiftKey) {
					ISO.engine.ZoomOut();
				} else {
					ISO.engine.MoveDown();
				}
				break;
			case "Left":
			case "ArrowLeft":
				ISO.engine.MoveLeft();
				break;
			case "Up":
			case "ArrowUp":
				if (evt.shiftKey) {
					ISO.engine.ZoomIn();
				} else {
					ISO.engine.MoveUp();
				}
				break;
		}
	});
};
if ((document.readyState === "complete") || ((document.readyState !== "loading") && (!document.documentElement.doScroll))) {
	run();
} else {
	document.addEventListener("DOMContentLoaded", run);
}
