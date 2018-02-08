$(function () {

	$('.btn_call').click(function (e) {
		e.preventDefault();
        $('.mod').toggleClass('mod_active');
        $('.mod__overlay').toggleClass('mod__overlay_active');
    });

	$('.mod__overlay').click(function () {
        $('.mod').toggleClass('mod_active');
        $('.mod__overlay').toggleClass('mod__overlay_active');
    });

// Scroll
    $('.go_to').click( function(){ // ловим клик по ссылке с классом go_to
	    var scroll_el = $(this).attr('href'); // возьмем содержимое атрибута href, должен быть селектором, т.е. например начинаться с # или .
	    if ($(scroll_el).length != 0) { // проверим существование элемента чтобы избежать ошибки
	        $('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 600); // анимируем скроолинг к элементу scroll_el
	    }
	    return false; // выключаем стандартное действие
	});


// Form send
    $('[data-submit]').on('click', function(e){
        e.preventDefault();
        $(this).parent('form').submit();
    })
    $.validator.addMethod(
        "regex",
        function(value, element, regexp) {
            var re = new RegExp(regexp);
            return this.optional(element) || re.test(value);
        },
        "Please check your input."
    );
    function valEl(el){

        el.validate({
            rules:{
                tel:{
                    required:true,
                    regex: '^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$'
                },
                name:{
                    required:true
                },
                email:{
                    required:true,
                    email:true
                }
            },
            messages:{
                tel:{
                    required:'Поле обязательно для заполнения',
                    regex:'Телефон может содержать символы + - ()'
                },
                name:{
                    required:'Поле обязательно для заполнения',
                },
                email:{
                    required:'Поле обязательно для заполнения',
                    email:'Неверный формат E-mail'
                }
            },
            submitHandler: function (form) {
                $('#loader').fadeIn();
                var $form = $(form);
                var $formId = $(form).attr('id');
                switch($formId){
                    case'goToNewPage':
                        $.ajax({
                            type: 'POST',
                            url: $form.attr('action'),
                            data: $form.serialize(),
                        })
                            .always(function (response) {
                                //ссылка на страницу "спасибо" - редирект
                                location.href='https://wayup.in/lm/landing-page-marathon/success';
                                //отправка целей в Я.Метрику и Google Analytics
                                ga('send', 'event', 'masterklass7', 'register');
                                yaCounter27714603.reachGoal('lm17lead');
                            });
                        break;
                    case'popupResult':
                        $.ajax({
                            type: 'POST',
                            url: $form.attr('action'),
                            data: $form.serialize(),
                        })
                            .always(function (response) {
                                setTimeout(function (){
                                    $('#loader').fadeOut();
                                },0);
                                setTimeout(function (){
                                    $('#overlay').fadeIn();
                                    $form.trigger('reset');
                                    //строки для остлеживания целей в Я.Метрике и Google Analytics
                                },0);
                                $('#overlay, .mod__overlay').on('click', function(e) {
                                    $('#overlay').fadeOut();
                                    $('.mod').removeClass('mod_active');
        							$('.mod__overlay').removeClass('mod__overlay_active');
                                });


                            });
                        break;
                }
                return false;
            }
        })
    }

    $('.js-form').each(function() {
        valEl($(this));
    });
    $('[data-scroll]').on('click', function(){
        $('html, body').animate({
            scrollTop: $( $.attr(this, 'data-scroll') ).offset().top
        }, 2000);
        event.preventDefault();
    })	

});
