// Плавная прокрутка пунктов меню

function lightScroll() {
    let menuPanel = document.querySelector('ul'),
        menuItems = document.querySelectorAll('li > a'),
        overlay = document.querySelector('.overlay');

    menuItems.forEach((item) => {
        item.classList.add('menu-item');
    });

    menuPanel.addEventListener('click', (event) => {
        event.preventDefault();
        //чтобы прокрутка не работала при открытом модальном окне
        if (!overlay.classList.contains('activeOverlay')) {

            if (event.target && event.target.classList.contains('menu-item')) {                
                
                document.querySelector(event.target.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
}

module.exports = lightScroll;