import anime from 'animejs/lib/anime.es.js';

export default class {
	constructor(el, settings) {
		this.el = el;
		this.settings;
	}

	slide(direction = '-') {
		anime({
			targets: this.el,
			translateX: `${direction}=${this.el.offsetWidth}`,
			//duration: this.settings.duration
		});
	}
}