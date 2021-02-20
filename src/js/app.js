import Slider from './Core/Slider.js';

import '../sass/style.scss';


const slider = new Slider('slider', {
	navigation: {
		nextBtnId: 'next-btn',
		prevBtnId: 'prev-btn',
	}
});