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