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