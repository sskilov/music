$(function() {

	$('.navigation__burger').click(function(){
		$('.menu').toggleClass('menu_opened');
	});

    $('.go_to').click( function(){ // ловим клик по ссылке с классом go_to
    var scroll_el = $(this).attr('href'); // возьмем содержимое атрибута href, должен быть селектором, т.е. например начинаться с # или .
    if ($(scroll_el).length != 0) { // проверим существование элемента чтобы избежать ошибки
        $('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 600); // анимируем скроолинг к элементу scroll_el
    }
    return false; // выключаем стандартное действие
	});


        // paralaxMouse


    if($(window).width() > 960)
    {
        $('body').parallax({
            'elements': [
                {
                    'selector': '.intro',
                    'properties': {
                        'x': {
                            'right': {
                                'initial': 0,
                                'multiplier': 0.006,
                                'unit': 'px',
                                'invert': false
                            }
                        },
                        // 'y': {
                        //     'top': {
                        //         'initial': 0,
                        //         'multiplier': 0.02,
                        //         'unit': 'px',
                        //         'invert': false
                        //     }
                        // }
                    }
                }
            ]
        });
    } else {
        // change functionality for larger screens
    }

     $(".owl-carousel").owlCarousel({
        items: 1 ,
        nav: true,
        loop: true,
        navText: ["",""]
     });

    $(window).on('load', function () {
        var $preloader = $('#preloader'),
            $spinner   = $preloader.find('.loader');
        $spinner.fadeOut();
        $preloader.delay(350).fadeOut('slow');
    });

    $(window).scroll(function() {
        $('.discography').each(function(){
            var imagePos = $(this).offset().top;

            var topOfWindow = $(window).scrollTop();
            if (imagePos < topOfWindow+100) {
                $(this).addClass("disc_anim");
            }
        });
    });

});
