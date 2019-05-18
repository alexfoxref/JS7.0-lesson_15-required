//Ограничение ввода в поля телефон

function input() {
    let siteInputs = document.querySelectorAll('input[name="phone"]');

    for (let i = 0; i < siteInputs.length; i++) {
        siteInputs[i].addEventListener('input', () => {
            let str = siteInputs[i].value;
            while (/[^\+\d]/.test(str)) {
                str = str.replace(/[^\+\d]/g, '');
                siteInputs[i].value = str;
            }
        });
    }
}

module.exports = input;