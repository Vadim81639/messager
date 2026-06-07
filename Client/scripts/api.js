const server_url = 'http://127.0.0.1:8000'

export async function registerUser(regData, pswrd) {
    const userData = {
        login: regData.login, 
        password: pswrd,      
        nik_name: regData.nikname,      // минимум 3 символа
        gender: regData.gender,                       // 0, 1 или 2
        avatars: [regData.ear, regData.skin, regData.chin, regData.mouth, regData.eye, regData.nose, regData.hair], 
    };

    // Детальная отладка
    console.log('📤 Отправляем JSON:', JSON.stringify(userData, null, 2))
    console.log('📤 Типы полей:');
    console.log('  login:', typeof userData.login, userData.login);
    console.log('  password:', typeof userData.password, userData.password);
    console.log('  nik_name:', typeof userData.nikname, userData.nikname);
    console.log('  gender:', typeof userData.gender, userData.gender);
    console.log('  avatars:', userData.avatars, 'длина:', userData.avatars.length);

    try {
        const response = await fetch(`${server_url}/new-reg`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || `Ошибка: ${response.status}`);
        }

        const result = await response.json();
        console.log('✅ Пользователь успешно зарегистрирован:', result);
        
        // Вывод на страницу (если есть элемент с id="result")
        const resultElement = document.getElementById('result');
        if (resultElement) {
            resultElement.innerHTML = `
                <strong>Регистрация прошла успешно!</strong><br>
                ID пользователя: ${result.id}
            `;
        }

        return result;

    } catch (error) {
        console.error('❌ Ошибка регистрации:', error);
        
        const resultElement = document.getElementById('result');
        if (resultElement) {
            resultElement.innerHTML = `<span style="color:red;">Ошибка: ${error.message}</span>`;
        }
    }
}

export async function loginUser() {
    const loginData = {
        login: "testuser123",
        password: "password123"
    };

    try {
        const response = await fetch(`${server_url}/log-in`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.detail || `Ошибка: ${response.status}`);
        }

        const result = await response.json();
        
        console.log('✅ Успешный вход:', result);

        // Сохраняем токен
        localStorage.setItem('authToken', result.token);

        document.getElementById('result').innerHTML = `
            <strong>Вход выполнен!</strong><br>
            Токен получен и сохранён
        `;

        return result;

    } catch (error) {
        console.error('❌ Ошибка входа:', error);
        document.getElementById('result').innerHTML = `
            <span style="color:red;">Ошибка: ${error.message}</span>
        `;
    }
}