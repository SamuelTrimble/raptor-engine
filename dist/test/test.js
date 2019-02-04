let ISO = {};
let run = function() {
	ISO.engine = new STL.RaptorEngine(document.getElementById("retest"), {
		debugging: true,
		debuggingLevel: STL.DEBUGLEVEL.INFO,
		zoom: 3,
		visibility: 3,
		mapDataFile: "testMap.json",
		mapBackgroundColor: "#262626",
		tileDefaultColor: "#276CB9"
	});
	ISO.engine.Start();
};
if ((document.readyState === "complete") || ((document.readyState !== "loading") && (!document.documentElement.doScroll))) {
	run();
} else {
	document.addEventListener("DOMContentLoaded", run);
}
