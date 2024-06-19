document.addEventListener('DOMContentLoaded', function() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

    function updateCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        const cartList = document.querySelector('.cart__list');
        if (cartList) {
            cartList.innerHTML = '';
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart__item', 'animate__animated', 'animate__fadeIn');

                const cartItemTitle = document.createElement('span');
                cartItemTitle.classList.add('cart__item-title');
                cartItemTitle.textContent = item.name;

                const cartItemRemove = document.createElement('button');
                cartItemRemove.classList.add('cart__item-remove');
                cartItemRemove.textContent = 'Удалить';
                cartItemRemove.addEventListener('click', () => {
                    removeFromCart(item.id);
                });

                cartItem.appendChild(cartItemTitle);
                cartItem.appendChild(cartItemRemove);
                cartList.appendChild(cartItem);
            });
        }
    }

    function addToCart(id, name) {
        cart.push({ id, name });
        updateCart();
    }

    function removeFromCart(id) {
        const index = cart.findIndex(item => item.id === id);
        if (index !== -1) {
            cart.splice(index, 1);
            updateCart();
        }
    }

    // Обработка кнопки "Добавить в корзину" на странице меню
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-item');
            const name = button.closest('.menu__item').querySelector('.menu__item-title').textContent;
            addToCart(id, name);
        });
    });

    // Регистрация
    const registerForm = document.querySelector('.register__form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Сохранение данных регистрации локально
            localStorage.setItem('user', JSON.stringify({ name, email, password }));

            // Вместо реального запроса на сервер, который сохраняет данные, мы просто отобразим сообщение
            alert('Регистрация завершена успешно!');

            // Очистим форму после регистрации
            registerForm.reset();
        });
    }

    // Вход
    const loginForm = document.querySelector('.login__form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            // Проверка, существует ли пользователь в localStorage
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (storedUser && storedUser.email === email && storedUser.password === password) {
                currentUser = storedUser;
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                alert('Вход выполнен успешно!');
                loginForm.reset();
                // Можно перенаправить на другую страницу или показать приветственное сообщение
            } else {
                alert('Неверный email или пароль!');
            }
        });
    }

    // Проверка, зарегистрирован ли пользователь локально
    if (currentUser) {
        // Если пользователь зарегистрирован, можно отобразить его имя или выполнить другие действия
        console.log(`Здравствуйте, ${currentUser.name}!`);
    }

    updateCart();
});
