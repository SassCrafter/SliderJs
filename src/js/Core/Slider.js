import Effect from './Effects/Slide.js';

export default class {
	constructor(sliderId, settings) {
		this.sliderId = sliderId;
		this.defaultSettings = {
			duration: 300,
			loop: false,
			easing: 'linear',
			effect: 'slide',
			navigation: null,
			pagination: null,
		};
		this.settings = {...this.defaultSettings, ...settings || {}};
		console.log(this.settings);
		this.init();
		this.reset();
		this.effect = new Effect(this.sliderWrapper, this.settings);
	}

	reset() {
		if (!this.settings.loop) {
			this.currentSlideId = 0;
		} else {
			this.currentSlideId = 1;
		}
	}


	init() {
		this.sliderContainer = document.getElementById(this.sliderId);
		this.sliderWrapper = this.sliderContainer.querySelector('.slider__wrapper');
		this.slides = this.sliderContainer.querySelectorAll('.slider__slide');
		if (this.settings.navigation) {
			const navigation = this.settings.navigation;
			const nextBtn = this.sliderContainer.querySelector(`#${navigation.nextBtnId}`);
			const prevBtn = this.sliderContainer.querySelector(`#${navigation.prevBtnId}`);
			nextBtn.addEventListener('click', this.showNextSlide.bind(this));
			prevBtn.addEventListener('click', this.showPrevSlide.bind(this));
		}

	}

	setEventListeners() {
		// Navigation
		
	}

	showNextSlide() {
		this.currentSlideId += 1;
		if (this.currentSlideId < this.slides.length) {
			this.effect.slide();
		} else {
			this.currentSlideId = this.slides.length - 1;
		}
		console.log(this.currentSlideId);
	}

	showPrevSlide() {
		this.currentSlideId -= 1;
		if (this.currentSlideId >= 0) {
			console.log('Prev')
			this.effect.slide('+');
		} else {
			this.currentSlideId = 0;
		}
		console.log(this.currentSlideId);
	}
}