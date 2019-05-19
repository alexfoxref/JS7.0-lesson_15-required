// Адаптивный js Slider

function slider() {
    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot'),
        wrap = document.querySelector('.wrap');

    let showSlides = n => {
        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach((item) => {
            item.style.display = 'block';
            item.classList.remove('fade');
            item.style.transform = `translateX(${-100 * (slideIndex - 1)}%)`;
        });

        dots.forEach(item => {item.classList.remove('dot-active')});
        dots[slideIndex - 1].classList.add('dot-active');
    }

    let plusSlides = n => {
        showSlides(slideIndex += n);
    }

    let currentSlide = n => {
        showSlides(slideIndex = n);
    }

    document.body.addEventListener('click', e => {
        if (e.target && e.target.classList.contains('prev') || e.target.classList.contains('arrow-left')) {
            plusSlides(-1);
        };
        if (e.target && e.target.classList.contains('next') || e.target.classList.contains('arrow-right')) {
            plusSlides(1);
        };
        dots.forEach((item, index) => {
            if (e.target && e.target == item) {
                currentSlide(index + 1);
            }
        });
    });

    showSlides(slideIndex);
}

module.exports = slider;