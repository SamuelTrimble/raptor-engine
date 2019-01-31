let ISO = {};
let run = function() {
	ISO.engine = new STL.RaptorEngine(document.getElementById("retest"), {
		zoom: 3,
		visibility: 3,
		mapBackgroundColor: "#262626",
		tileDefaultColor: "#276CB9"
	});
};
if ((document.readyState === "complete") || ((document.readyState !== "loading") && (!document.documentElement.doScroll))) {
	run();
} else {
	document.addEventListener("DOMContentLoaded", run);
}
