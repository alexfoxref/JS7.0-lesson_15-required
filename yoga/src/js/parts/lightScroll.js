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
        if (!overlay.classList.contains('activeOverlay')) {
            let target = event.target;

            if (target && target.classList.contains('menu-item')) {                
                for (let i = 0; i < menuItems.length; i++) {
                    if (target == menuItems[i]) {
                        document.querySelector(menuItems[i].getAttribute('href')).scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            }
        }
    });
}

module.exports = lightScroll;