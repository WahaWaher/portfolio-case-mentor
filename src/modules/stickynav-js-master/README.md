jQuery StickyNav Plugin <sup>1.0.0</sup>
-------
_Плагин фиксированной навигации._

## Пакетные менеджеры:
```sh
# Bower
bower install --save stickynav-js
```

## Подключение:

1. Подключить jQuery и jquery.stickynav.js
```html
<!-- jQuery -->
<script src="libs/jquery/dist/jquery.min.js"></script>

<!-- jquery.stickynav.js -->
<script src="dist/jquery.stickynav.js"></script>
```

2. Инициализировать плагин на HTML-элементе навигации:
```javascript
$('.example-nav').stickyNav({
	// Параметры...
});
```

## Примеры использования:
Страница с примерами demo/index.html

## Параметры:

Опция | Тип | Поум. | Описание
------ | ------ | ---------- | --------
`mode` | string | 'default' | Режимы:<br><br>**`'default'`** - клонированному эл-ту навигации задается `position: fixed; top: 0; left: 0, right: 0;`. Скрытие и появление панели осущ. jq-методами `show()` и `hide()`.<br><br>**`'custom'`** - css-свойства клонированного эл-та навигации задаются вручную через класс `stickyClass`. Скрытие и появление панели осущ. с помощью класса `visibleClass` (css-свойства задаются вручную)
`stickyClass` | string | 'sticky-nav' | CSS-класс, который будет задан клонированному эл-ту навигации.
`visibleClass` | string | 'visible' | CSS-класс, который будет задан клонированному эл-ту навигации в момент прилипания.
`scrollFrom` | jQuery DOM Object | string | $(this) | HTML-элемент, относительно которого будет рассчитано значение св-ва `scrollTop`. `'document'` - относительно документа.
`scrollTop` | number | 0 | Кол-во прокрученных пикселей относительно верхней границы элемента `scrollFrom`, при которых произойдет прилипание.
`offWidth` | number | 767 | Ширина видимой области окна браузера в пикселях, при которой отключается прилипание (Desktop first).


## Функции обратного вызова:

Callback | Аргументы | Поум. | Описание
------ | ---- | ------- | -----------
`beforeInit` | \[sets:object\] | n/a | Перед инициализацией.
`afterInit` | \[sets:object\] | n/a | После инициализации.
`beforeShow` | \[sets:object \] | n/a | Перед показом нав. панели.
`afterShow` | \[sets:object \] | n/a | После показа нав. панели.
`beforeHide` | \[sets:object \] | n/a | Перед скрытием нав. панели.
`afterHide` | \[sets:object \] | n/a | После скрытия нав. панели.

```javascript
$('.example-nav').stickyNav({
	beforeInit: function(sets) {},
	afterInit:  function(sets) {},
	beforeShow: function(sets) {},
	afterShow:  function(sets) {},
	beforeHide: function(sets) {},
	afterHide:  function(sets) {}
});
```
## Публичные методы:
Метод | Описание
----------- | -----------
`init` | Инициализация
`reinit` | Реинициализация
`destroy` | Вернуть состояние до инита
`show` | Показать прилипающую навигацию
`hide` | Скрыть прилипающую навигацию

```javascript
// Инициализация
var options = {};
$('.example-nav').stickyNav('init', options);

// Реинициализация
$('.example-nav').stickyNav('reinit'); // Реинит с текущими параметрами

var newOptions = {}; // Объект с новыми параметрами
$('.example-nav').stickyNav('reinit', newOptions); // Реинит с новыми параметрами

// Вернуть состояние элементa/ов до инита
$('.example-nav').stickyNav('destroy');

// Показать прилипающую навигацию
$('.example-nav').stickyNav('show');

// Скрыть прилипающую навигацию
$('.example-nav').stickyNav('hide');
```

## Заметки:
### Дата-атрибуты:
Параметры в data-атрибуте имеют наивысший приоритет. Они переопределят параметры по умолчанию, а так же пользовательские параметры заданные при инициализации.
```javascript
	// Инициализация
	$('.example-nav').stickyNav();
```
```html
	<!-- Переопределение параметров через Data-атрибут: -->
	<header class="example-nav" data-stickynav="{
		offWidth: 1024
	}"></header>
```

### Переопределение параметров по умолчанию:
```javascript
	// Переопределение параметров по умолчанию:
	$.fn.stickyNav.defaults = {};
	
	// Например:
	$.fn.stickyNav.defaults = {
		offWidth: 479 // изменит станд. значение пар-ра offWidth
	};
```
### Анимация:
- при `mode: 'default'`<br>
_Предварительно расширить jQuery методом .animateCss()<br>
(взято с [документации Animate.css](https://github.com/daneden/animate.css#usage))_
```javascript
$('.example-nav').stickyNav({
	// mode: 'default',
	afterShow: function(sets) {
		/* Анимация появления, JQ */
		sets.stickyElem.hide().fadeIn();
		
		/* Анимация появления, Animate.css */
		sets.stickyElem.animateCss('bounceInDown', function() {
			sets.stickyElem.show();
		});
	},
	afterHide: function(sets) {
		/* Анимация исчезновения, JQ */
		sets.stickyElem.show().fadeOut();
		
		/* Анимация исчезновения, Animate.css */
		sets.stickyElem.show().animateCss('fadeOut', function() {
			sets.stickyElem.hide();
		});
	}
});
```
- при `mode: 'custom'`
```css
.sticky-nav {
	position: fixed;
	top: -100px; right: 0; left: 0;
	opacity: 0;
	transition: all .5s;
}
.visible {
	top: 0;
	opacity: 1;
}

/* Пар-ры анимации: */
.animation-options {
	animation-duration: .85s; /* Продолжительность */
	animation-delay: 0s; /* Задержка */
}
```
```javascript
$('.example-nav').stickyNav({
	mode: 'custom',
	stickyClass: 'sticky-nav animation-options',
	visibleClass: 'visible',
});
```
## Зависимости:
- [jQuery](http://jquery.com/download/)

## Требования
- jQuery версия 1.9.1 или выше

## История изменений:

## Лицензия (MIT)
Copyright (c) 2018 Sergey Kravchenko

Данная лицензия разрешает лицам, получившим копию данного программного обеспечения и сопутствующей документации (в дальнейшем именуемыми «Программное Обеспечение»), безвозмездно использовать Программное Обеспечение без ограничений, включая неограниченное право на использование, копирование, изменение, слияние, публикацию, распространение, сублицензирование и/или продажу копий Программного Обеспечения, а также лицам, которым предоставляется данное Программное Обеспечение, при соблюдении следующих условий:

Указанное выше уведомление об авторском праве и данные условия должны быть включены во все копии или значимые части данного Программного Обеспечения.

ДАННОЕ ПРОГРАММНОЕ ОБЕСПЕЧЕНИЕ ПРЕДОСТАВЛЯЕТСЯ «КАК ЕСТЬ», БЕЗ КАКИХ-ЛИБО ГАРАНТИЙ, ЯВНО ВЫРАЖЕННЫХ ИЛИ ПОДРАЗУМЕВАЕМЫХ, ВКЛЮЧАЯ ГАРАНТИИ ТОВАРНОЙ ПРИГОДНОСТИ, СООТВЕТСТВИЯ ПО ЕГО КОНКРЕТНОМУ НАЗНАЧЕНИЮ И ОТСУТСТВИЯ НАРУШЕНИЙ, НО НЕ ОГРАНИЧИВАЯСЬ ИМИ. НИ В КАКОМ СЛУЧАЕ АВТОРЫ ИЛИ ПРАВООБЛАДАТЕЛИ НЕ НЕСУТ ОТВЕТСТВЕННОСТИ ПО КАКИМ-ЛИБО ИСКАМ, ЗА УЩЕРБ ИЛИ ПО ИНЫМ ТРЕБОВАНИЯМ, В ТОМ ЧИСЛЕ, ПРИ ДЕЙСТВИИ КОНТРАКТА, ДЕЛИКТЕ ИЛИ ИНОЙ СИТУАЦИИ, ВОЗНИКШИМ ИЗ-ЗА ИСПОЛЬЗОВАНИЯ ПРОГРАММНОГО ОБЕСПЕЧЕНИЯ ИЛИ ИНЫХ ДЕЙСТВИЙ С ПРОГРАММНЫМ ОБЕСПЕЧЕНИЕМ.