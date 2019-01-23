import $ from "jquery";
import Cookie from "js-cookie";
import lazyLoad from "jquery-lazyload";
import magnificPopup from "magnific-popup";
import scrollbar from "jquery.scrollbar";
import carousel from "./carousel";
import sleep from "./sleep";
import mask from "jquery.maskedinput/src/jquery.maskedinput";

//Переменные сайта
var setting = {
	cookie: false,
	header: null,
	scroll: 0
};

//Инициализация сервера
init();

//Запуск скриптов
$(document).ready(() => {
	$(".header__menu").click(() => {
		$(".menu").slideToggle();
	});
	$("img.lazy").lazyload({
		effect: "fadeIn"
	});
	$(".scrollbar-inner").scrollbar({});
	$('#phone').mask("+7 (999) 999-99-99")
	modalOnWindow()
});


//Ресайз
$(document).resize(function() {
	$(".scrollbar-inner").scrollbar({});
	modalOnWindow()
});

//Скролл
$(document).scroll(() => {
	scrollHeader();
	setting.scroll = $(document).scrollTop();
	activeSection();
});

//Инициализация
function init() {
	if (cookieAccept() == 1) {
		setting.cookie = true;
		$(".cookie").hide();
	}

	cloneHeader();
}

//Клонирование шапки
function cloneHeader() {
	setting.header = $("header").clone();
	setting.header.addClass("header-fixed");
	setting.header.appendTo("body");
}

//Скрол шапки
function scrollHeader() {
	if (setting.scroll >= 250 && setting.scroll > $(document).scrollTop()) {
		$(".header-fixed").slideDown();
	} else {
		$(".header-fixed").slideUp();
	}
}

//Клик на пункт меню
$(".menu__nav a").click(function(e) {
	e.preventDefault();
	$(".menu").slideUp();
	var link = $(this).attr("href");
	var item = $(link).offset().top;
	$("body, html").animate(
		{
			scrollTop: item
		},
		500
	);
	return false;
});

//Активная секция
function activeSection() {
	$(".section").each(function(i) {
		if ($(this).position().top <= setting.scroll) {
			var id = '"#' + $(this).attr("id") + '"';
			$(".menu a.active").removeClass("active");
			$(".menu a[href=" + id + "]").addClass("active");
		}
	});
}

//поиск разрешение куков
function cookieAccept() {
	return Cookie.get("cookie-accept");
}

//Разрешение на куки
$(".button-cookie").click(function() {
	setting.cookie = true;
	Cookie.set("cookie-accept", 1, {
		expires: 30
	});
	$(".cookie").hide();
});

//Переключение услуг
$(".uslugi__item").click(function() {
	$(".uslugi__item").removeClass("active");
	$(this).addClass("active");
	const index = $(this).index();
	$(".uslugi__text").removeClass("active");
	$(".uslugi__text")
		.eq(index)
		.addClass("active");
});

//Открытие сертификатов
$(".get-certificate").each(function() {
	const items = [];
	$(this)
		.parent()
		.parent()
		.parent()
		.children(".doctor__images")
		.find("img")
		.each(function() {
			items.push({
				src: $(this).attr("src"),
				title: $(this).attr("alt"),
				type: "image"
			});
		});
	console.log(items);
	$(this).magnificPopup({
		items: items,
		gallery: {
			enabled: true
		}
	});
});

//Табы доктора
$(".doctor__tab span").click(function() {
	if (
		$(this)
			.parent()
			.children(".doctor__text")
			.css("display") == "block"
	) {
		$(this)
			.parent()
			.children(".doctor__text")
			.slideUp();
	} else {
		$(".doctor__text").slideUp();
		$(this)
			.parent()
			.children(".doctor__text")
			.slideDown();
	}
});


$(document).mouseup(function (e) {
	var elem = $('.modal');
	var elems = $('.modal__wrap');
	if (!elems.is(e.target)
			&& elems.has(e.target).length === 0) {
			$('.modal').fadeOut();
	}
});

$('.modal-open').click(function() {
	const theme = $(this).attr('data-theme')
	$('.modal__input input[name=theme]').val(theme)
	$('.modal').fadeIn()
	modalOnWindow()
})

function modalOnWindow() {
	console.log($('.modal__wrap').height() + ' '+ $(window).height())
	if($(window).height() < $('.modal__wrap').height()) {
		$('.modal').addClass('modal_fullscreen')
	}
	else {
		$('.modal').removeClass('modal_fullscreen')
	}
}