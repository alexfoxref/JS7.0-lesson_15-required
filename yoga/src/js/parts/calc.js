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

    persons.addEventListener('change', function() {
        this.value = this.value.replace(/[\D]|^0/g, '');
        personsSum = +this.value;

        total = (daysSum + personsSum) * 4000;

        if (restDays.value == '' || persons.value == '') {
            totalValue.innerHTML = 0;
        } else {
            let totalStr = total * place.options[place.selectedIndex].value + '';

            animatedNum(totalStr, totalValue);
        }
    });

    // анимация цифр

    function animatedNum(str, element) {
        let index = 0,
            count = 0;

        function getNum(str) {
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
                // .catch((err) => console.log(err))
        }

        function getOneNum(str) {
            return new Promise((resolve, reject) => {
                if (index < str.length) {
                    if (count <= +str[index]) {
                        resolve(str);
                    } else {
                        index++;
                        (index < str.length) ? count = 0 : count = ''
                        resolve(str);
                    }
                } else {
                    // reject('конец числа');
                    index = 0;
                    count = 0;
                }
            })
        }

        function waitTimeout(ms) {
            return new Promise(resolve => {
                setTimeout(resolve, ms);
            })
        }

        getNum(str);
    }

    restDays.addEventListener('change', function() {
        this.value = this.value.replace(/[\D]|^0/g, '');
        daysSum = +this.value;

        total = (daysSum + personsSum) * 4000;

        if (persons.value == '' || restDays.value == '') {
            totalValue.innerHTML = 0;
        } else {
            let totalStr = total * place.options[place.selectedIndex].value + '';
            
            animatedNum(totalStr, totalValue);

        }
    });

    place.addEventListener('change', function() {
        if (restDays.value == '' || persons.value == '') {
            totalValue.innerHTML = 0;
        } else {
            let a = total,
                totalStr = a * this.options[this.selectedIndex].value + '';

            animatedNum(totalStr, totalValue);

        }
    });
}

module.exports = calc;