// Формы AJAX

function form() {
    let form = document.querySelector('.main-form'),
        contactForm = document.getElementById('form'),
        input = form.getElementsByTagName('input'),
        contactInput = contactForm.getElementsByTagName('input'),
        statusMessage = document.createElement('div'),
        overlayForm = document.querySelector('.overlay-form'),
        popupFormTitle = document.querySelector('.popup-form-title'),
        popupFormStatus = document.querySelector('.popup-form-status');

    statusMessage.classList.add('status-img');

    let sendForm = (form, input) => {
        //объект стандартных интерпретаций ответа сервера
        let message = {
            loading: 'Загрузка...',
            loadingImg: `<img src="src/img/refresh-button.svg" width="40" height="40" alt="Загрузка...">`,
            success: 'Спасибо за вашу заявку!',
            successImg: `<img src="src/img/thumbs-up.svg" width="40" height="40" alt="Спасибо за вашу заявку!">`,
            successImgBig: `<img src="src/img/thumbs-up.svg" width="200" height="200" alt="Спасибо за вашу заявку!">`,
            failure: 'Что-то пошло не так...',
            failureImg: `<img src="src/img/delete-button.svg" width="40" height="40" alt="Что-то пошло не так...">`,
            failureImgBig: `<img src="src/img/delete-button.svg" width="200" height="200" alt="Что-то пошло не так...">`
        };

        form.addEventListener('submit', e => {
            e.preventDefault();
            //добавляем картинку в форму и удаляем класс анимации всплывающего окна формы
            form.appendChild(statusMessage);
            overlayForm.classList.remove('fade-form');
            //устанавливаем позицию для картинки
            if (form == contactForm) {
                statusMessage.style.top = '67%';
                statusMessage.style.left = '43%';
            } else {
                statusMessage.style.top = '58%';
                statusMessage.style.left = '54%';
            }

            //загрузка
            let loadingPost = () => {
                //класс для условия остановки анимации
                statusMessage.classList.add('loading');
                statusMessage.innerHTML = message.loadingImg;
                //js анимация вращения картинки
                let count = 0,
                    loadingAnimation = setInterval(() => {
                        statusMessage.style.transform = `rotate(${++count}deg)`;
                        if (!statusMessage.classList.contains('loading')) {
                            statusMessage.style.transform = `rotate(0deg)`;
                            clearInterval(loadingAnimation);
                        }
                    }, 10);
            }

            //формируем запрос в формате json
            let postData = (data) => {
                return new Promise((resolve, reject) => {
                    let request = new XMLHttpRequest();

                    request.open('POST', 'server.php');
                    request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
                    
                    //слушатель на начало загрузки
                    request.addEventListener('loadstart', () => {
                        loadingPost();
                    });
                    //слушатель на изменение состояния запроса
                    request.addEventListener('readystatechange', () => {
        
                        if (request.readyState === 4) {
                            if (request.status == 200) {
                                resolve('success');
                            } else {
                                reject('failure');
                            }
                        } 
                    });

                    request.send(data);
                })
            }
            
            //создаем данные в формате json
            let formData = new FormData(form),
                obj = {};
            formData.forEach((value, key) => {
                obj[key] = value;
            });
            let json = JSON.stringify(obj);

            //функция действий при успехе и при неуспехе
            let requestEvent = (st) => {
                let bindModal = (displayStatus, overlayMethod, popupMethod, overflowStatus) => {
                    overlayForm.style.display = displayStatus;
                    overlayForm.classList[overlayMethod]('fade-form');
                    popupFormStatus[popupMethod](image);
                    document.body.style.overflow = overflowStatus;
                }

                //класс для условия остановки анимации
                statusMessage.classList.remove('loading');
                //вставляем нужную картинку
                statusMessage.innerHTML = message[`${st}Img`];
                //модальное окно с нужной надписью и картинкой
                popupFormTitle.textContent = message[`${st}`];
                let image = document.createElement('div');
                image.innerHTML = message[`${st}ImgBig`];
                image.classList.add('popup-form-img');
                bindModal('block', 'add', 'appendChild', 'hidden');
                //закрываем модальное окно по клику в любое место и убираем обработчик событий
                let removeListener = () => {
                    bindModal('none', 'remove', 'removeChild', '');
                    document.body.removeEventListener('click', removeListener);
                    if (form.contains(statusMessage)) {
                        statusMessage.innerHTML = '';
                        form.removeChild(statusMessage);
                    }
                }

                document.body.addEventListener('click', removeListener);
            }

            //setTimeout
            let waitTimeout = (ms) => {
                return new Promise(resolve => {
                    setTimeout(resolve, ms)
                })
            }

            //окончание запроса
            let endPost = () => {
                for (let i = 0; i < input.length; i++) {
                    input[i].value = '';
                    input[i].addEventListener('input', () => {
                        if (form.contains(statusMessage)) {
                            statusMessage.innerHTML = '';
                            form.removeChild(statusMessage);
                        }
                    });
                }
            }

            postData(json)
                    .then((succ) => {
                        waitTimeout(1000)
                            .then(() => {requestEvent(succ)})
                    })
                    .catch((err) => {
                        waitTimeout(3000)
                            .then(() => {
                                requestEvent(err);
                                console.error('Сервер не отвечает');
                            })
                    })
                    .then(() => {
                        endPost()
                    })
        });
    }

    sendForm(form, input);
    sendForm(contactForm, contactInput);
}

module.exports = form;