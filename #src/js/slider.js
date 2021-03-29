// ======== Стандартная настройка слайдера ========

$('.mainslider__body').slick({
  adaptiveHeight: true,
  arrows: false,
  dots: true,
  dotsClass: 'mainslider__dots',
  infinite: false,
  customPaging: function (slick, index) { // вывод картинки слайда в соответсвующую по индексу точку
    let mainsliderImage = $(slick.$slides[index]).find('img').attr('src')
    const mainsliderCurrentIndex = index + 1
    return '<img src="' + mainsliderImage + '" alt="" /><button>' + mainsliderCurrentIndex + '</button>'
  }
});

$('.items-products').slick({
  arrows: false,
  infinite: false,
  adaptiveHeight: true
});

$('.brands-slider__box').slick({
  arrows: false,
  infinite: true,
  slidesToShow: 5,
  responsive: [
    {
      breakpoint: 990,
      settings: {
        slidesToShow: 4,
      }
    },
    {
      breakpoint: 820,
      settings: {
        slidesToShow: 3,
      }
    },
    {
      breakpoint: 660,
      settings: {
        slidesToShow: 2,
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      }
    },
  ]
});

$('.images-product__mainslider').slick({
  slidesToShow: 1,
  arrows: false,
  fade: true,
  infinite: false,
  asNavFor: '.images-product__subslider',
});

$('.images-product__subslider').slick({
  slidesToShow: 4,
  arrows: false,
  infinite: false,
  asNavFor: '.images-product__mainslider',
});

$('.images-product__subslider').on('click', '.slick-slide', function (event) { // при клике на нижний слайдер срабатывает перелистывание в основном слайдере
  event.preventDefault();
  var goToSingleSlide = $(this).data('slick-index');

  $('.images-product__mainslider').slick('slickGoTo', goToSingleSlide);
});

// ======== /Стандартная настройка слайдера ========

// ======== Вывод номера текущего слайда и их количества(не работает при первой инициализации) ========

let currentSlideOfPopularSlider = document.querySelector('.products-slider__info--current')
let countSlidesOfPopularSlider = document.querySelector('.products-slider__info--count')

$('.items-products').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
  let slidesCount = slick.slideCount // записываем в перменную кол-во слайдов
  const slideCurrent = nextSlide + 1 // при beforeChange nextSlide выдает индекс текущего слайда(в js начинается отсчет с нуля, поэтому добавляем единицу)
  currentSlideOfPopularSlider.innerHTML = slideCurrent
  countSlidesOfPopularSlider.innerHTML = "/ " + slidesCount
});

// ======== /Стандартная настройка слайдера ========

$('.products-slider__arrow--next').on('click', function () {
  $('.items-products').slick('slickNext')
});
$('.products-slider__arrow--prev').on('click', function () {
  $('.items-products').slick('slickPrev')
});

$('.brands-slider__arrow--next').on('click', function () {
  $('.brands-slider__box').slick('slickNext')
});
$('.brands-slider__arrow--prev').on('click', function () {
  $('.brands-slider__box').slick('slickPrev')
});