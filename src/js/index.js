import $ from "jquery"
import Cookie from 'js-cookie'


//Переменные сайта
var setting = {
	cookie: false,
	sleep: {
		status: false,
		
	}
}

//Инициализация сервера
init()

//Запуск скриптов
$(document).ready(() => {
	$('.button-cookie').click(clickCookieAccept())
})

//Инициализация
function init() {
	if(cookieAccept()) {
		setting.cookie = true
		$('.cookie').hide()
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