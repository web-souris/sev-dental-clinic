import $ from 'jquery'


$(document).ready(function() {
  ymaps.ready(init);
})

function init(){
  // Создание карты.
  var myMap = new ymaps.Map("map", {
    // Координаты центра карты.
    // Порядок по умолчанию: «широта, долгота».
    // Чтобы не определять координаты центра карты вручную,
    // воспользуйтесь инструментом Определение координат.
    center: [44.593430, 33.550899],
    // Уровень масштабирования. Допустимые значения:
    // от 0 (весь мир) до 19.
    zoom: 17,
  });
  myMap.behaviors.disable('scrollZoom')
  var myPlacemark = new ymaps.Placemark([44.593430, 33.550899], {}, {
    iconLayout: 'default#image',
    iconImageHref: '/img/nav.png',
  });
  myMap.geoObjects.add(myPlacemark);
}