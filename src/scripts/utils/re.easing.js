export default class {
	constructor() {}

	/*
		t: current time
		s: starting value
		c: change in value
		d: duration time
	*/

	Linear(t, s, c, d) {
		return c * t / d + s;
	}

	EaseInOutQuad(t, s, c, d) {
		t /= (d / 2);
		if (t < 1) return c / 2 * t * t + s;
		t--;
		return -c / 2 * (t * (t - 2) - 1) + s;
	}
}
