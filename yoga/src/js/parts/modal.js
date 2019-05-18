// Модальные окна

function modal() {
    let more = document.querySelector('.more'),
        close = document.querySelector('.popup-close'),
        popup = document.querySelector('.overlay > *'),
        tabBtns = document.querySelectorAll('.description-btn'),
        fade = document.querySelectorAll('.fade')[8]
        overlay = document.querySelector('.overlay'),
        statusMessage = document.createElement('div');

    document.body.addEventListener('click', (event) => {
        for (let i = 0; i < tabBtns.length; i++) {
            
            if (event.target && (event.target == more || event.target == tabBtns[i])) {
                event.preventDefault();
                more.classList.remove('more-splash');
                tabBtns[i].classList.remove('more-splash');
                fade.classList.remove('fade');

                if (/Msie|Edge/i.test(navigator.userAgent)) {
                    more.classList.add('more-splash');
                    tabBtns[i].classList.add('more-splash');
                    fade.classList.add('fade');
                } else if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
                    //js анимация
                    overlay.style.top = '50%';
                    overlay.style.left = '50%';
                    overlay.style.width = '0%';
                    overlay.style.height = '0%';
                    popup.style.left = '-50%';
                    let shadow = 10;

                    if (event.target == more) {
                        more.style.boxShadow = `0 0 ${shadow}px #c78030`;
                    }
                    if (event.target == tabBtns[i]) {
                        tabBtns[i].style.boxShadow = `0 0 ${shadow}px #c78030`;
                    }

                    function overlayAnimation (pos1, pos2, int) {
                        let id = setInterval(frameOverlay, int);

                        function frameOverlay() {
                            let plus = 1;

                            overlay.style.top = `${parseInt(overlay.style.top) - plus}%`;
                            overlay.style.left = `${parseInt(overlay.style.left) - plus}%`;
                            overlay.style.width = `${parseInt(overlay.style.width) + 2 * plus}%`;
                            overlay.style.height = `${parseInt(overlay.style.height) + 2 * plus}%`;
                            if (event.target == more) {
                                more.style.boxShadow = `0 0 ${++shadow}px #c78030`;
                            }
                            if (event.target == tabBtns[i]) {
                                tabBtns[i].style.boxShadow = `0 0 ${++shadow}px #c78030`;
                            }

                            if (parseInt(overlay.style.top) <= pos1) {
                                clearInterval(id);

                                id = setInterval(framePopup, int);

                                function framePopup() {
                                    let plus = 1;

                                    popup.style.left = `${parseInt(popup.style.left) + 2 * plus}%`;
                                
                                    if (parseInt(popup.style.left) >= pos2) {
                                        clearInterval(id);
                                        if (event.target == more) {
                                            shadow = 0;
                                            more.style.boxShadow = `0 0 ${shadow}px #c78030`;                                        }
                                        if (event.target == tabBtns[i]) {
                                            shadow = 0;
                                            tabBtns[i].style.boxShadow = `0 0 ${shadow}px #c78030`;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if (event.target == more) {
                        overlayAnimation(3, 44, 20);
                    }
                    if (event.target == tabBtns[i]) {
                        overlayAnimation(0, 50, 5);
                        shadow = 10;
                        tabBtns[i].style.boxShadow = `0 0 ${shadow}px #c78030`;
                    }
                }

                overlay.style.display = 'block';
                document.body.style.overflow = 'hidden';
                overlay.classList.add('activeOverlay');
            }
        }
    });

    // скрываем при нажатии на крестик
    close.addEventListener('click', () => {
    overlay.style.display = 'none';
    more.classList.remove('more-splash');
    for (let i = 0; i < tabBtns.length; i++) {
        tabBtns[i].classList.remove('more-splash');
    }
    document.body.style.overflow = '';
    overlay.classList.remove('activeOverlay');
    //удаляем сообщение блока ajax
    if (form.contains(statusMessage)) {
        statusMessage.innerHTML = '';
        form.removeChild(statusMessage);
    }

    });
    // скрываем при нажатии в область вне модального окна
    overlay.addEventListener('click', (event) => {
        if (event.target && !popup.contains(event.target)) {
            overlay.style.display = 'none';
            more.classList.remove('more-splash');
            for (let i = 0; i < tabBtns.length; i++) {
                tabBtns[i].classList.remove('more-splash');
            }
            document.body.style.overflow = '';
            overlay.classList.remove('activeOverlay');
            //удаляем сообщение блока ajax
            if (form.contains(statusMessage)) {
                statusMessage.innerHTML = '';
                form.removeChild(statusMessage);
            }
        }
    });
}

module.exports = modal;