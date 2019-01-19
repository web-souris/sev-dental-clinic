import $ from 'jquery'
import owlCarousel from 'owl.carousel'
import { isNumber } from 'util';

const carousel = $('.carousel').owlCarousel({
	items: 1,
	dots: false,
	autoplay: false,
	autoplayHoverPause: true,
	autoplayTimeout: 5000,
	onInitialize: function() {
		const items = $('.carousel .slide').length
		const navigation = `<div class="slide__dost">
		<span class="slide__active-slide">1</span>
		<span class="slide__slider-length">/ ${items}</span>
		</div>
		<div class="slide__buttons">
		<div class="slide__nav slide__nav_prev">
		<i class="fa fa-angle-left"></i>
		</div>
		<div class="slide__nav slide__nav_next">
		<i class="fa fa-angle-right"></i>
		</div>
		</div>`
		$('.slide__navigation').html(navigation)
	},
	onChange: function(event) {
		const item = event.property.value + 1
		const val =  isNumber(item) ? item : 1
		$('.slide__active-slide').text(val)
	}
})
$('.slide__nav_next').click(function() {
	carousel.trigger('next.owl.carousel')
})
$('.slide__nav_prev').click(function() {
	carousel.trigger('prev.owl.carousel')
})
export default carousel