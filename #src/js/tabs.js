$('.nav-tabs__item').click(function () {
	var tabName = $(this).attr('name-tab');
	$(this).addClass('active').siblings().removeClass('active');
	$('.tabs__body .' + tabName).addClass('active').siblings().removeClass('active');
});