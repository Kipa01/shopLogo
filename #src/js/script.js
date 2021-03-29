$(document).ready(function () {
   @@include("wNumb.min.js")
   @@include("burger.js")
   @@include("dinamic-adaptive.js")
   @@include("slick.min.js")
   @@include("slider.js")
   @@include("tabs.js")
   @@include("nouislider.js")
   $('.quantity').each(function () {
      let spinner = $(this),
         input = spinner.find('.quantity-product__counter'),
         btnUp = spinner.find('.quantity-product__arrow--plus'),
         btnDown = spinner.find('.quantity-product__arrow--minus'),
         min = input.attr('min'),
         max = input.attr('max');
      btnUp.click(function () {
         let oldValue = parseFloat(input.val());
         if (oldValue >= max) {
            var newVal = oldValue;
         } else {
            var newVal = oldValue + 1;
         }
         spinner.find("input").val(newVal);
         spinner.find("input").trigger("change");
      });

      btnDown.click(function () {
         let oldValue = parseFloat(input.val());
         if (oldValue <= min) {
            var newVal = oldValue;
         } else {
            var newVal = oldValue - 1;
         }
         spinner.find("input").val(newVal);
         spinner.find("input").trigger("change");
      });
   })
   if ($(window).width() < 991) {
      $('.menu-page__link--parent').click(function () {
         $(this).parent().toggleClass('active') // добавляем класс родителю menu-page__link--parent
         $(this).next().toggleClass('active') // добавляем класс следущему элементу после menu-page__link--parent
      })
   } else {
      // При наводе на ссылку с выпадающем меню сохраняется hover этой ссылки
      $('.menu-page__item').hover(
         function () {
            $(this).find('.submenu-page__item').addClass('active')
            $(this).find('.submenu-page__item').closest('.menu-page__item').addClass('active')
         }, function () {
            $(this).find('.submenu-page__item').removeClass('active')
            $(this).find('.submenu-page__item').closest('.menu-page__item').removeClass('active')
         }
      )
   }

   // Плавное открытие блока с чекбоксами
   $('.search-page__categories').slideUp(0)
   $('.search-page__title').click(function (event) {
      $(this).toggleClass('active')
      if ($(this).hasClass('active')) {
         $('.search-page__categories').slideDown(300)
      } else {
         $('.search-page__categories').slideUp(300)
      }
   });

   // При нажатии на чекбокс включается счетчик выбранных категорий и "везде" изменяется на "выбрано: 'колиечство активных чекбоксов'"
   let checkboxCategories = document.querySelectorAll('.categories-search__checkbox') // создаем массим из элементов с классом categories-search__checkbox
   for (let i = 0; i < checkboxCategories.length; i++) { // идем по нашему массиву
      const checkboxCategory = checkboxCategories[i]
      checkboxCategory.addEventListener("change", function (e) { // при событии "change" делаем ...
         checkboxCategory.classList.toggle('active')
         let checkboxActiveCategories = document.querySelectorAll('.categories-search__checkbox.active') // создаем массим из активных элементов с классом categories-search__checkbox
         if (checkboxActiveCategories.length > 0) { // если длина массива больше нуля( т.е. есть хотя бы один активный чекбокс), то делаем...
            $('.search-page__title').addClass('categories')
            let searchQuantity = document.querySelector('.search-page__quantity')
            searchQuantity.innerHTML = searchQuantity.getAttribute('data-text') + ' ' + checkboxActiveCategories.length
         } else {
            $('.search-page__title').removeClass('categories')
         }
      })
   }
   // Nouislider 
   let priceSlider = document.querySelector('.price-filter__slider'),
      priceStart = document.getElementById('price-start'),
      priceEnd = document.getElementById('price-end')
   noUiSlider.create(priceSlider, { // создание слайдера
      start: [0, 200000], // значения которые отображаются при загрузке
      connect: true,
      tooltips: [wNumb({ decimals: 0 }), wNumb({ decimals: 0 })], // значения при перемещении ползунков, decimals - количество знаков после запятой
      range: {
         'min': [0],
         'max': [200000]
      }
   });
   // ползунки принимают значение, которое вписывают в input
   priceStart.addEventListener("change", setPriceValues)
   priceEnd.addEventListener("change", setPriceValues)
   function setPriceValues() {
      let startPriceValue, endPriceValue
      if (priceStart.value != "") {
         startPriceValue = priceStart.value
      }
      if (priceEnd.value != "") {
         endPriceValue = priceEnd.value
      }
      priceSlider.noUiSlider.set([startPriceValue, endPriceValue])
   }
   // Плавное открытие блока с чекбоксами в блоке с фильтрами
   $('.section-filter__body--spoller').slideUp(0)
   $('.section-filter__title--spoller').click(function (event) {
      $(this).toggleClass('active')
      if ($(this).hasClass('active')) {
         $(this).next().slideDown(300)
      } else {
         $(this).next().slideUp(300)
      }
   });
   // Плавное открытие фильтра на разрешении 990 и ниже
   if ($(window).width() < 991) {
      $('.filter__content').slideUp(0)
      $('.filter__title').click(function (event) {
         $(this).toggleClass('active')
         if ($(this).hasClass('active')) {
            $('.filter__content').slideDown(300)
         } else {
            $('.filter__content').slideUp(300)
         }
      });
   }
   // Select
   $('.options-container').slideUp(0)
   const selected = document.querySelector(".selected");
   const optionsContainer = document.querySelector(".options-container");
   const optionsList = document.querySelectorAll(".option");

   $('.selected').click(function () {
      $(this).prev().toggleClass("active")
      $(".actions-catalog__order").toggleClass("active")
      $(this).toggleClass('active')
   });
   $('.option').click(function () {
      if ($(this).parent().hasClass("active")) {
         $(this).parent().next().removeClass("active")
         $(".actions-catalog__order").removeClass("active")
      }
   });
   optionsList.forEach(o => {
      o.addEventListener("click", () => {
         selected.innerHTML = o.querySelector("label").innerHTML;
         optionsContainer.classList.remove("active");
      });
   });

   $('.options-container--show').slideUp(0)
   const selectedShow = document.querySelector(".selected--show");
   const optionsContainerShow = document.querySelector(".options-container--show");
   const optionsListShow = document.querySelectorAll(".option--show");

   $('.selected--show').click(function () {
      $(this).prev().toggleClass("active")
      $(".navi-catalog__show").toggleClass("active")
      $(this).toggleClass('active')
   });
   $('.option--show').click(function () {
      if ($(this).parent().hasClass("active")) {
         $(this).parent().next().removeClass("active")
         $(".navi-catalog__show").removeClass("active")
      }
   });
   optionsListShow.forEach(o => {
      o.addEventListener("click", () => {
         selectedShow.innerHTML = o.querySelector("label").innerHTML;
         optionsContainerShow.classList.remove("active");
      });
   });

   // Quantity
   // $('.quantity-product__arrow').on('click', function () {

   // });
});