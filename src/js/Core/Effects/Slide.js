import anime from 'animejs/lib/anime.es.js';

export default class {
	constructor(el, settings) {
		this.el = el;
		this.settings = settings;
	}

	showSlide(direction = '-') {
		anime({
			targets: this.el,
			translateX: `${direction}=${this.el.offsetWidth}`,
			duration: this.settings.duration,
			easing: this.settings.easing
		});
	}

	slideBack() {
		anime({
			targets: this.el,
			translateX: `-${this.el.offsetWidth}`,
			duration: 0,
		});
	}
}