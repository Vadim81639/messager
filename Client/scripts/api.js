const server_url = 'http://127.0.0.1:8000'

export async function registerUser(regData, pswrd) {
    const userData = {
        login: regData.login, 
        password: pswrd,      
        nik_name: regData.nikname,      // минимум 3 символа
        gender: regData.gender,                       // 0, 1 или 2
        avatars: [regData.ear, regData.dress, regData.chin, regData.mouth, regData.eye, regData.nose, regData.hair], 
    };

    // Детальная отладка
    console.log('  Отправляем JSON:', JSON.stringify(userData, null, 2))
    console.log('  Типы полей:');
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

export async function loginUser(login_, pass_) {
    console.log('тут');

    console.log(login_);
    console.log(pass_);    
    const loginData = {
        login: login_, 
        password: pass_
    };
    console.log(loginData.login);
    console.log(loginData.password);
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

        // document.getElementById('result').innerHTML = `
        //     <strong>Вход выполнен!</strong><br>
        //     Токен получен и сохранён
        // `;

        return result;

    } catch (error) {
        console.error('❌ Ошибка входа:', error);
        document.getElementById('result').innerHTML = `
            <span style="color:red;">Ошибка: ${error.message}</span>
        `;
    }
}

// Функция для авторизованных запросов
export async function authorizedFetch(url, options = {}) {
    const token = getToken();
    
    if (!token) {
        throw new Error('Нет токена авторизации');
    }

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...options.headers
    };

    const response = await fetch(`${server_url}${url}`, {
        ...options,
        headers
    });

    if (response.status === 401) {
        // Токен недействителен - удаляем
        removeToken();
        throw new Error('Сессия истекла, войдите заново');
    }

    return response;
}


// me
export async function loadUserProfile() {
    if (!getToken()) {
        console.log('Пользователь не авторизован');
        return;
    }
    
    try {
        const response = await authorizedFetch('/me');
        const userData = await response.json();
        console.log('Данные пользователя:', userData);
        return userData;
    } catch (error) {
        console.error('Ошибка загрузки профиля:', error);
    }
}

// Получение токена
export function getToken() {
    return localStorage.getItem('authToken');
}

// Удаление токена (выход)
export function removeToken() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('tokenTimestamp');
    console.log('🔓 Токен удалён');
}