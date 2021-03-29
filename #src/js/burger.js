// Бургер основого меню в шапке сайта
$('.icon-menu').click(function (event) {
	$(this).toggleClass('active');
	$('.menu__body').toggleClass('active');
	if ($(this).hasClass('active')) {
		$('body').data('scroll', $(window).scrollTop());
	}
	$('body').toggleClass('lock');
	if (!$(this).hasClass('active')) {
		$('body,html').scrollTop(parseInt($('body').data('scroll')));
	}
});

// Бургер бокового меню
$('.menu-page__body').slideUp(0)

$('.menu-page__burger').click(function (event) {
	$(this).toggleClass('active')
	if ($(this).hasClass('active')) {
		$('.menu-page__body').slideDown(300)
	} else {
		$('.menu-page__body').slideUp(300)
	}
});