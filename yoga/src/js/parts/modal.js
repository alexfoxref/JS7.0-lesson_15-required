// Модальные окна

function modal() {
    let popup = document.querySelector('.overlay > *'),
        fade = document.querySelectorAll('.fade')[8],
        overlay = document.querySelector('.overlay'),
        isActiveBtn;

    let bindModal = (displayStatus, overflowStatus, el) => {
        if (displayStatus == 'block') {isActiveBtn = el};
        if (!el) {el = isActiveBtn};

        el.classList.remove('more-splash');
        overlay.style.display = displayStatus;
        document.body.style.overflow = overflowStatus;
    };

    let shadow = 0;
    let bindHover = (event, hoverWidth) => {
        document.body.addEventListener(event, e => {
            if (e.target && (e.target.classList.contains('more') || e.target.classList.contains('description-btn'))) {
                e.preventDefault();
                shadow = hoverWidth;
                e.target.style.boxShadow = `0 0 ${shadow}px #c78030`;
            }
        });
    };

    bindHover('mouseover', 10);
    bindHover('mouseout', 0);

    document.body.addEventListener('click', e => {

        if (e.target && (e.target.classList.contains('more') || e.target.classList.contains('description-btn'))) {
            //удаляем любую анимацию по-умолчанию
            bindModal('block', 'hidden', e.target);
            fade.classList.remove('fade');

            if (/Msie|Edge/i.test(navigator.userAgent)) {
                //добавляем css анимацию
                e.target.classList.add('more-splash');
                fade.classList.add('fade');
            } else if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
                return
            } else {
                //добавляем js анимацию
                //начальное положение
                overlay.style.top = '50%';
                overlay.style.left = '50%';
                overlay.style.width = '0%';
                overlay.style.height = '0%';
                popup.style.left = '-50%';
                e.target.style.boxShadow = `0 0 ${10 + shadow}px #c78030`;

                //js анимация
                let overlayAnimation = (pos1, pos2, int) => {
                    let frameOverlay = () => {
                        let plus = 1;

                        overlay.style.top = `${parseInt(overlay.style.top) - plus}%`;
                        overlay.style.left = `${parseInt(overlay.style.left) - plus}%`;
                        overlay.style.width = `${parseInt(overlay.style.width) + 2 * plus}%`;
                        overlay.style.height = `${parseInt(overlay.style.height) + 2 * plus}%`;
                        e.target.style.boxShadow = `0 0 ${(10 + ++shadow)}px #c78030`;

                        if (parseInt(overlay.style.top) <= pos1) {
                            clearInterval(id);

                            let framePopup = () => {
                                let plus = 1;

                                popup.style.left = `${parseInt(popup.style.left) + 2 * plus}%`;
                            
                                if (parseInt(popup.style.left) >= pos2) {
                                    clearInterval(id);
                                    shadow = 0;
                                    e.target.style.boxShadow = `0 0 ${shadow}px #c78030`;
                                }
                            }
                            id = setInterval(framePopup, int);
                        }
                    }
                    let id = setInterval(frameOverlay, int);
                }
                overlayAnimation(0, 50, 5);
            }
        }

        if (e.target && e.target.classList.contains('popup-close')) {
            bindModal('none', '');
            popup.querySelector('input').placeholder = 'Ваш телефон';
        }
    });
}

module.exports = modal;