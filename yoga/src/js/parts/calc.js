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