// Адаптивный js Slider

function slider() {
    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot'),
        wrap = document.querySelector('.wrap');

    wrap.style.height = slides[slideIndex - 1].getBoundingClientRect().height;

    showSlides(slideIndex);

    function showSlides(n) {
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

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    prev.addEventListener('click', () => {
        plusSlides(-1);
    });

    next.addEventListener('click', () => {
        plusSlides(1);
    });

    dotsWrap.addEventListener('click', event => {
        dots.forEach((item, index) => {
            if (event.target && event.target == item) {
                currentSlide(index + 1);
            }
        });
    });
}

module.exports = slider;