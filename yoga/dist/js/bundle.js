/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/parts/calc.js":
/*!******************************!*\
  !*** ./src/js/parts/calc.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Calc

function calc() {
    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = +persons.value,
        daysSum = +restDays.value,
        total = 0;

    totalValue.innerHTML = 0;

 function getOneNum(str) {
            return new Promise(resolve => {
                if (index < str.length) {
                    if (count <= +str[index]) {
                        resolve(str);
                    } else {
                        index++;
                        (index < str.length) ? count = 0 : count = ''
                        resolve(str);
                    }
                } else {
                    index = 0;
                    count = 0;
                }
            })
        }

    // анимация цифр
    let animatedNum = (str, element) => {
        let index = 0,
            count = 0;

        let getOneNum = str => {
            return new Promise(resolve => {
                if (index < str.length) {
                    if (count <= +str[index]) {
                        resolve(str);
                    } else {
                        index++;
                        (index < str.length) ? count = 0 : count = ''
                        resolve(str);
                    }
                } else {
                    index = 0;
                    count = 0;
                }
            })
        }

        let waitTimeout = ms => {
            return new Promise(resolve => {
                setTimeout(resolve, ms);
            })
        }

        let getNum = (str) => {
            getOneNum(str)
                .then((res) => {
                    if (index == 0) {
                        element.textContent = count
                    } else {
                        element.textContent = `${res.slice(0, index)}${count}`
                    }
                    count++;
                })
                .then(() => {
                    waitTimeout(20)
                        .then(() => {
                            getNum(str)
                        })
                })
        }

        getNum(str);
    }

    document.body.addEventListener('change', e => {
        if (e.target && e.target.classList.contains('counter-block-input')) {
            daysSum = +e.target.value;

            total = (daysSum + personsSum) * 4000;

            if (persons.value == '' || restDays.value == '') {
                totalValue.innerHTML = 0;
            } else {
                let totalStr = total * place.options[place.selectedIndex].value + '';
                
                animatedNum(totalStr, totalValue);
            }
        }
        if (e.target && e.target == place) {
            if (restDays.value == '' || persons.value == '') {
                totalValue.innerHTML = 0;
            } else {
                let a = total,
                    totalStr = a * e.target.options[e.target.selectedIndex].value + '';
    
                animatedNum(totalStr, totalValue);
            }
        }
    });

    document.body.addEventListener('input', e => {
        if (e.target && e.target.classList.contains('counter-block-input')) {
            e.target.value = e.target.value.replace(/[\D]|^0/g, '');
        }
    });
}

module.exports = calc;

/***/ }),

/***/ "./src/js/parts/form.js":
/*!******************************!*\
  !*** ./src/js/parts/form.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

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

/***/ }),

/***/ "./src/js/parts/input.js":
/*!*******************************!*\
  !*** ./src/js/parts/input.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

//Ограничение ввода в поля телефон

function input() {
    let siteInputs = document.querySelectorAll('input[name="phone"]');

    document.body.addEventListener('input', e => {
        siteInputs.forEach((item) => {
            if (e.target && e.target == item) {
                //формируем ввод
                item.value = '+' + item.value
                    .replace(/[^\d]/g, ``)
                    .replace(/\d{12,}/, `${item.value.replace(/[^\d]/g, ``).slice(0, 11)}`);
                //удаляем плюс
                item.addEventListener('keydown', e => {
                    if (e.keyCode == 8 && item.value == '+') {
                        e.preventDefault();
                        item.value = '';
                    }
                });
                //выводим рекомендацию ...
                if (item.value.length != 12) {
                    item.placeholder = 'Введите 11 цифр телефона';
                } else {
                    item.placeholder = 'Ваш телефон';
                }
                // ... при потере фокуса инпута
                item.addEventListener('blur', () => {
                    if (item.value.length > 0 && item.value.length < 12) {
                        item.value = '';
                    }
                }); 
            }
        });
    });    
}       

module.exports = input;

/***/ }),

/***/ "./src/js/parts/lightScroll.js":
/*!*************************************!*\
  !*** ./src/js/parts/lightScroll.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

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

/***/ }),

/***/ "./src/js/parts/modal.js":
/*!*******************************!*\
  !*** ./src/js/parts/modal.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

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

/***/ }),

/***/ "./src/js/parts/slider.js":
/*!********************************!*\
  !*** ./src/js/parts/slider.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

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

/***/ }),

/***/ "./src/js/parts/tabs.js":
/*!******************************!*\
  !*** ./src/js/parts/tabs.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Tabs

function tabs() {
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');
    
    let hideTabContent = a => {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }
    
    hideTabContent(1);
    
    let showTabContent = b => {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }
    
    info.addEventListener('click', e => {
        let target = e.target;
    
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });
}

module.exports = tabs;

/***/ }),

/***/ "./src/js/parts/timer.js":
/*!*******************************!*\
  !*** ./src/js/parts/timer.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Timer

function timer() {
    // Задали дату окончания
    let deadline = '2019-06-10';

    // Определяем сколько осталось часов, минут и секнд до даты
    let getTimeRemaining = endtime => {
        let t = Date.parse(endtime) - Date.parse(new Date());

        if (t > 0) {
            let seconds = Math.floor((t/1000) % 60),
                minutes = Math.floor((t/1000/60) % 60),
                hours = Math.floor((t/1000/60/60) % 24),
                days = Math.floor(t/1000/60/60/24);

            return {
                'total' : t + '',
                'days' : days + '',
                'hours' : hours + '',
                'minutes' : minutes + '',
                'seconds' : seconds + ''
            };
        } else {
            return {
                'total' : '0',
                'days' : '0',
                'hours' : '0',
                'minutes' : '0',
                'seconds' : '0'
            }
        }   
    }

    // Задаем часы
    let setClock = (id, endtime) => {
        let timer = document.getElementById(id),
            days = timer.querySelector('.days'),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds');

        let updateClock = () => {
            let t = getTimeRemaining(endtime);

            for (let key in t) {
                if (t[key].length < 2 && key != 'days') {
                    t[key] = '0' + t[key];
                }
            }
            switch (t.days) {
                case '0':
                    t.days = '';
                    break;
                case '1':
                    t.days += ' day';
                    break;
                default:
                    t.days += ' days';
                    break;
            }

            days.textContent = t.days;
            hours.textContent = t.hours;
            minutes.textContent = t.minutes;
            seconds.textContent = t.seconds;

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }

        let timeInterval = setInterval(updateClock, 1000);
    }

    setClock('timer', deadline);
}

module.exports = timer;

/***/ }),

/***/ "./src/js/script.js":
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

window.addEventListener('DOMContentLoaded', () => {

    'use strict';

    let calc = __webpack_require__(/*! ./parts/calc.js */ "./src/js/parts/calc.js"),
        form = __webpack_require__(/*! ./parts/form.js */ "./src/js/parts/form.js"),
        input = __webpack_require__(/*! ./parts/input.js */ "./src/js/parts/input.js"),
        lightScroll = __webpack_require__(/*! ./parts/lightScroll.js */ "./src/js/parts/lightScroll.js"),
        modal = __webpack_require__(/*! ./parts/modal.js */ "./src/js/parts/modal.js"),
        slider = __webpack_require__(/*! ./parts/slider.js */ "./src/js/parts/slider.js"),
        tabs = __webpack_require__(/*! ./parts/tabs.js */ "./src/js/parts/tabs.js"),
        timer = __webpack_require__(/*! ./parts/timer.js */ "./src/js/parts/timer.js");

    calc();
    form();
    lightScroll();
    modal();
    slider();
    tabs();
    timer();
    input();
});

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map