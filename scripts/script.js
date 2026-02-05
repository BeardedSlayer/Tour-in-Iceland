

const tourSlider = new Swiper('.tourProgramSlider', {
    loop: true,
    effect: 'fade',
    fadeEffect: {crossFade: true},
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    allowTouchMove: false,
});

const reviewsSlider = new Swiper('.reviewsSlider', {
    loop: false,
    effect: 'fade',
    fadeEffect: {crossFade: true},
    navigation: {
        nextEl: '.swiper-button-next-review',
        prevEl: '.swiper-button-prev-review',
    },
    allowTouchMove: true,
});

const playBtn = document.querySelector('.main-picture button');
const iframe = document.getElementById('youtubeFrame');
const btnElement = document.querySelector('.main-picture button');


if (playBtn && iframe) {
    playBtn.addEventListener('click', function () {

        btnElement.style.display = 'none';

        const videoSrc = iframe.getAttribute('data-src');

        const newSrc = videoSrc + "?autoplay=1&enablejsapi=1";

        iframe.src = newSrc;

        iframe.style.display = 'block';
        iframe.style.zIndex = "10";
    });
}


const gallerySwiper = new Swiper('.gallerySlider', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,

    pagination: {
        el: '.gallery-pagination',
        clickable: true,
    },

    navigation: {
        nextEl: '.gallery-next',
        prevEl: '.gallery-prev',
    },
});


$(document).ready(function () {
    $('.gallerySlider').magnificPopup({
        delegate: 'a.image-popup',
        type: 'image',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1]
        },
        mainClass: 'mfp-fade',
        removalDelay: 160
    });
});

$(document).ready(function() {
    $('input[name="phone"]').mask('+375 00 00-00-000');
});




$(document).ready(function() {
    let selectedPeople = null;

    $('.form-button').on('click', function() {
        $('.form-button').removeClass('active');
        $(this).addClass('active');
        selectedPeople = $(this).text();

        $('#error-people').hide();
    });

    $('input').on('input', function() {
        $('#error-fields').hide();
        $(this).removeClass('input-error');
    });

    $('.section-form').on('submit', function(e) {
        e.preventDefault();

        $('.error-text').hide();
        $('input').removeClass('input-error');
        let hasError = false;

        const name = $('input[name="name"]').val();
        const phone = $('input[name="phone"]').val();

        if (!selectedPeople) {
            $('#error-people').text('Пожалуйста, выберите количество человек').show();
            hasError = true;
        }

        if (!name || !phone) {
            $('#error-fields').text('Пожалуйста, заполните все поля').show();

            if (!name) $('input[name="name"]').addClass('input-error');
            if (!phone) $('input[name="phone"]').addClass('input-error');

            hasError = true;
        }

        if (hasError) {
            return;
        }

        $.ajax({
            method: "POST",
            url: "https://testologia.ru/checkout",
            data: { name: name, phone: phone, people: selectedPeople },
            success: function(msg) {
                if (msg.success === 1) {
                    alert('Спасибо! Заявка отправлена!');
                    $('input[name="name"]').val('');
                    $('input[name="phone"]').val('');
                    $('.form-button').removeClass('active');
                    selectedPeople = null;
                } else {
                    alert('Ошибка отправки!');
                }
            }
        });
    });
});

const burger = document.querySelector('.burger');
const navMenu = document.querySelector('.header-elements');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    navMenu.classList.toggle('active');

    document.body.classList.toggle('lock-scroll');
});

document.querySelectorAll('.header-elements a').forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('lock-scroll');
    });
});
