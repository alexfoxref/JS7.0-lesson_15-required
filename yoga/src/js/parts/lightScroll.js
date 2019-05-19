// Плавная прокрутка пунктов меню

function lightScroll() {
    let menuItems = document.querySelectorAll('li > a');

    menuItems.forEach(item => {
        item.classList.add('menu-item');
    });

    document.body.addEventListener('click', e => {
        if (e.target && e.target.classList.contains('menu-item')) {                
            e.preventDefault();

            document.querySelector(e.target.getAttribute('href')).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

module.exports = lightScroll;