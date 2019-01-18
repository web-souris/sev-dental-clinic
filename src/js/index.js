import $ from "jquery"
import Cookie from 'js-cookie'


//Переменные сайта
var setting = {
	cookie: false,
	header: null,
	scroll: 0,
	sleep: {
		status: false,
	}
}

//Инициализация сервера
init()

//Запуск скриптов
$(document).ready(() => {
	$('.button-cookie').click(clickCookieAccept())
	$('.header__menu').click(() => {
		$('.menu').slideToggle()
	})
	
})
//Скролл
$(document).scroll(() => {
	scrollHeader()
	setting.scroll = $(document).scrollTop()
})

//Инициализация
function init() {
	if(cookieAccept()) {
		setting.cookie = true
		$('.cookie').hide()
	}

	cloneHeader()
}

//Клонирование шапки
function cloneHeader() {
	setting.header = $('header').clone()
	setting.header.addClass('header-fixed')
	setting.header.appendTo('body')
}

//Скрол шапки
function scrollHeader() {
	if(setting.scroll >= 250 && setting.scroll > $(document).scrollTop()) {
		$('.header-fixed').slideDown()
	}
	else {
		$('.header-fixed').slideUp()
	}
}

//поиск разрешение куков
function cookieAccept() {
	return Cookie.get('cookie-accept')
}

//Разрешение на куки
function clickCookieAccept() {
	setting.cookie = true
	Cookie.set('cookie-accept', 1, {
		expires: 30
	})
	$('.cookie').hide()
}