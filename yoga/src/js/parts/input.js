//Ограничение ввода в поля телефон

function input() {
    let siteInputs = document.querySelectorAll('input[name="phone"]');

    document.addEventListener('input', (event) => {
        siteInputs.forEach((item) => {
            if (event.target && event.target == item) {
                //формируем ввод
                item.value = '+' + item.value
                    .replace(/[^\d]/g, ``)
                    .replace(/\d{12,}/, `${item.value.replace(/[^\d]/g, ``).slice(0, 11)}`);
                //удаляем плюс
                item.addEventListener('keydown', (event) => {
                    if (event.keyCode == 8 && item.value == '+') {
                        event.preventDefault();
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