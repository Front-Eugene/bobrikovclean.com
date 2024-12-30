//FORM
const TOKEN = "8161595089:AAFeeHPCHG5M_0ZmpClI4-dpHoKxAQIbSVk",
    CHAT_ID = "-1002476942152",
    URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`,
    phoneInput = document.getElementById('phone');

phoneInput.addEventListener('keydown', function (event) {
    if (event.key.match(/[a-zа-я]/i) && event.key !== 'Backspace') {
        event.preventDefault(); // Prevent typing any letters except Backspace
    }
});

let lastSubmitTime = 0;
const submitInterval = 30000; // 30 секунд в миллисекундах


document.querySelectorAll('.tg-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Сохраняем ссылку на this
        const currentForm = this;

        // Проверяем, прошло ли уже 30 секунд с момента последней отправки
        const currentTime = new Date().getTime();
        if (currentTime - lastSubmitTime < submitInterval) {
            alert('Пожалуйста, подождите 30 секунд перед отправкой следующей заявки.');
            return;
        }

        let message = `<b>Заявка с сайта</b>\n`;
        message += `<b>https://bobrikovclean.com</b>\n`;
        message += `<b>Имя:</b> ${currentForm.name.value} \n`;
        message += `<b>Телефон:</b> ${currentForm.phone.value} \n`;

        let windowShow = document.querySelector('.window-wrap')

        // Валидация имени и номера телефона
        if (currentForm.name === '' || currentForm.phone === '') {
            alert('Имя и номер телефона обязательны для заполнения');
            return; // Остановить отправку формы, если валидация не пройдена
        }

        axios.post(URI_API, {
            chat_id: CHAT_ID,
            parse_mode: 'html',
            text: message
        })
            .then(function (res) {
                currentForm.name.value = '';
                currentForm.phone.value = '';
                form.setAttribute('disabled', '');

                // window.location.href = 'src/pages/thanks.html';
                window.location.href = 'https://front-eugene.github.io/bobrikovclean.com/src/pages/thanks.html';

                // windowShow.classList.add('window-show')

                // setTimeout(function () {
                //     windowShow.classList.remove('window-show');
                // }, 2000);

                // let noBtn = form.querySelector('.click-btn');
                // noBtn.addEventListener('click', function () {
                //     noBtn.classList.add('remove');
                //     noBtn.disabled = true;
                // });

                // Обновляем время последней отправки
                lastSubmitTime = currentTime;
            })
            .catch(function (error) {
                console.error('Ошибка отправки сообщения в Telegram:', error);
                // Обработать ошибку здесь, если необходимо
            });
    });
});