import $ from 'jquery'
import Cookie from 'js-cookie'

const setting = {
	sleep: 0,
	sleepSize: 1,
	sleepImg: 1
}

export default init()

function init() {
	getCookieSleep()
	changeSleep()
}
function getCookieSleep() {
	const sleep = Cookie.get('sleep') || 0
	if(sleep == 1) {
		setting.sleepSize = Cookie.get('sleepSize') || 1
		setting.sleepImg = Cookie.get('sleepImg') || 1
	}
	setting.sleep = sleep
	return sleep
}

$(document).on('click', '.button-sleep',  function() {
	setting.sleep = setting.sleep == 1 ? 0 : 1
	changeSleep()
	return Cookie.set('sleep', setting.sleep, {
		expires: 30
	})

})

function changeSleep() {
	if(setting.sleep == 1) {
		$('body').addClass('is-sleep')
		$('.button-sleep').text('Нормальная версия')
		$('body').css('font-size', 16 * setting.sleepSize + 'px')
		getActiveFontSize()
		getActiveImage()
		if(setting.sleepImg == 0) {
			$('body').addClass('no-image')
		}
		else {
			$('body').removeClass('no-image')
		}
	}
	else {
		$('body').removeClass('is-sleep')
		$('.button-sleep').text('Версия для слабовидящих')
		$('body').css('font-size', '16px')
	}
}
function getActiveImage() {
	$('.sleep__img span').eq(0).removeClass('active')
	$('.sleep__img span').eq(1).removeClass('active')
	if(setting.sleepImg == 1) {
		$('.sleep__img span').eq(0).addClass('active')
	}
	else {
		$('.sleep__img span').eq(1).addClass('active')
	}
}
function getActiveFontSize() {
	$('.sleep__fonts span').eq(0).removeClass('active')
	$('.sleep__fonts span').eq(1).removeClass('active')
	$('.sleep__fonts span').eq(2).removeClass('active')
	switch(parseFloat(setting.sleepSize)) {
		case (1): {
			$('.sleep__fonts span').eq(0).addClass('active')
			break
		}
		case(1.25): {
			$('.sleep__fonts span').eq(1).addClass('active')
			break
		}
		case(1.5): {
			$('.sleep__fonts span').eq(2).addClass('active')
			break
		}
		default: {
			$('.sleep__fonts span').eq(0).addClass('active')
		}
	}
}
$('.sleep__img span').click(function() {
	const item = $(this).index()
	setting.sleepImg = item == 0 ? 1 : 0
	Cookie.set('sleepImg', setting.sleepImg, {
		expires: 30
	})
	changeSleep()
})
$('.sleep__fonts span').click(function() {
	const item = $(this).index()
	switch(item) {
		case (0): {
			setting.sleepSize = 1 
			break
		}
		case (1): {
			setting.sleepSize = 1.25
			break	
		}
		case(2): {
			setting.sleepSize = 1.5
			break
		}
		default: {
			setting.sleepSize = 1
		}
	}
	Cookie.set('sleepSize', setting.sleepSize, {
		expires: 30
	})
	changeSleep()
})