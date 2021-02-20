import Slide from './Effects/Slide.js';

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
		this.slideEffect = new Slide(this.sliderWrapper, this.settings);
		this.isAlloweClick = true;
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
		this.slides = Array.from(this.sliderContainer.querySelectorAll('.slider__slide'));
		// If navigation buttons 
		if (this.settings.navigation) {
			const navigation = this.settings.navigation;
			const nextBtn = this.sliderContainer.querySelector(`#${navigation.nextBtnId}`);
			const prevBtn = this.sliderContainer.querySelector(`#${navigation.prevBtnId}`);
			nextBtn.addEventListener('click', this.showNextSlide.bind(this));
			prevBtn.addEventListener('click', this.showPrevSlide.bind(this));
		}

		// If loop
		if (this.settings.loop) {
			this.cloneFirstAndLastSlide();
		}

	}

	cloneFirstAndLastSlide() {
		const firstClone = this.slides[0].cloneNode(true);
		const lastClone = this.slides[this.slides.length - 1].cloneNode(true);
		// Update dom and slides array
		const parent = this.slides[0].parentNode;
		this.sliderWrapper.appendChild(firstClone);
		this.sliderWrapper.insertBefore(lastClone, this.slides[0]);
		this.slides.push(firstClone);
		this.slides.unshift(lastClone);
		parent.style.transform = `translateX(-${this.sliderWrapper.offsetWidth}px)`
	}

	setEventListeners() {
		// Navigation
		
	}

	showNextSlide() {
		if (this.isAlloweClick) {
			this.isAlloweClick = false;
			setTimeout(() => this.isAlloweClick = true, 300);
			this.currentSlideId += 1;
			if (this.currentSlideId < this.slides.length) {
				this.slideEffect.showSlide();
			}
			if (this.currentSlideId === this.slides.length) {
				console.log('Slide back')
				this.slideEffect.slideBack();
				this.slideEffect.showSlide();
				this.currentSlideId = this.slides.length - 1;
				this.reset();
			}
		}
	}

	showPrevSlide() {
		this.currentSlideId -= 1;
		if (this.currentSlideId >= 0) {
			console.log('Prev')
			this.slideEffect.showSlide('+');
		} else {
			this.currentSlideId = this.slides.length - 1;
		}
		console.log(this.currentSlideId);
	}
}