async function getHello() {
    try {
        const response = await fetch('http://127.0.0.1:8000/hello', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            // credentials: 'include'   // раскомментируй, если используешь cookies / авторизацию
        });

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);           // { hello: "world" }
        
        // Пример: вывод на страницу
        document.getElementById('result').innerHTML = JSON.stringify(data, null, 2);

    } catch (error) {
        console.error('Ошибка запроса:', error);
    }
}

async function sendData() {
    // Данные для отправки
    const dataToSend = {
        name: "Алексей",
        value: 42,
        description: "Пример данных"
    };

    try {
        const response = await fetch('http://127.0.0.1:8000/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend)  // преобразуем объект в JSON-строку
        });

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }

        const result = await response.json();
        console.log('Ответ сервера:', result);
        
        // Вывод на страницу
        document.getElementById('result').innerHTML = JSON.stringify(result, null, 2);
        
        return result;
    } catch (error) {
        console.error('Ошибка отправки данных:', error);
    }
}

async function getCurrentUser() {
    const token = localStorage.getItem('token'); // или sessionStorage, или где ты хранишь токен

    if (!token) {
        console.error("Токен отсутствует");
        return;
    }

    try {
        const response = await fetch('http://127.0.0.1:8000/me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            if (response.status === 401) {
                console.error("Токен недействителен или истёк");
                // Можно сделать редирект на логин
            }
            throw new Error(`Ошибка: ${response.status}`);
        }

        const user = await response.json();
        console.log("Данные пользователя:", user);
        
        // Здесь можно обновить интерфейс пользователя
        return user;

    } catch (error) {
        console.error("Ошибка запроса:", error);
    }
}

async function logout() {
    const token = localStorage.getItem('token');
    
    if (token) {
        await fetch('http://127.0.0.1:8000/logout', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    }
    
    localStorage.removeItem('token');   // обязательно!
    // window.location.href = '/login.html'; // или редирект
}


document.getElementById('myForm').addEventListener('submit', async (event) => {
    event.preventDefault();  // отменяем стандартную отправку формы
    
    // Собираем данные из формы
    const formData = new FormData(event.target);
    const dataToSend = {
        name: formData.get('name'),
        value: parseInt(formData.get('value')),
        description: formData.get('description') || null
    };
    
    try {
        const response = await fetch('http://127.0.0.1:8000/submit-typed', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend)
        });
        
        const result = await response.json();
        document.getElementById('result').innerHTML = JSON.stringify(result, null, 2);
        
        // Очищаем форму при успешной отправке
        if (result.status === 'success') {
            event.target.reset();
        }
    } catch (error) {
        console.error('Ошибка:', error);
        document.getElementById('result').innerHTML = 'Ошибка отправки данных';
    }
});

// Вызвать функцию при загрузке страницы
document.addEventListener('DOMContentLoaded', getHello);