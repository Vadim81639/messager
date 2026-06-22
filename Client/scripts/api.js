const server_url = 'http://127.0.0.1:8000';

export async function registerUser(regData, pswrd) {
    const userData = {
        login: regData.login,
        password: pswrd,
        nik_name: regData.nikname,
        gender: regData.gender,
        avatars: [regData.ear, regData.dress, regData.chin, regData.mouth, regData.eye, regData.nose, regData.hair],
    };

    console.log('📤 Отправляем:', JSON.stringify(userData, null, 2));

    try {
        const response = await fetch(`${server_url}/new-reg`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            // ✅ Возвращаем объект с ошибкой, а не выбрасываем
            return {
                success: false,
                error: errorData.detail || `Ошибка: ${response.status}`,
                status: response.status
            };
        }

        const result = await response.json();
        console.log('✅ Регистрация успешна:', result);
        
        // ✅ Возвращаем успех
        return {
            success: true,
            data: result
        };

    } catch (error) {
        console.error('❌ Ошибка регистрации:', error);
        
        // ✅ Возвращаем объект с ошибкой
        return {
            status: 404,
            success: false,
            error: error.message || 'Сервер недоступен. Проверьте подключение.',
            networkError: true
        };
    }
}

export async function loginUser(login_, pass_) {
    console.log('🔐 Попытка входа:', login_);
    
    const loginData = {
        login: login_,
        password: pass_
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
            // ✅ Возвращаем объект с ошибкой
            return {
                success: false,
                error: errorData.detail || `Ошибка: ${response.status}`,
                status: response.status
            };
        }

        const result = await response.json();
        console.log('✅ Вход успешен:', result);

        // Сохраняем токен
        if (result.token) {
            localStorage.setItem('authToken', result.token);
        }

        // ✅ Возвращаем успех
        return {
            success: true,
            token: result.token,
            user: result.user || null
        };

    } catch (error) {
        console.error('❌ Ошибка входа:', error);
        
        // ✅ Возвращаем объект с ошибкой
        return {
            success: false,
            error: error.message || 'Сервер недоступен. Проверьте подключение.',
            networkError: true
        };
    }
}

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
        removeToken();
        throw new Error('Сессия истекла, войдите заново');
    }

    return response;
}

export async function loadUserProfile() {
    const token = getToken();
    
    if (!token) {
        console.log('🔴 Пользователь не авторизован');
        return null; // ✅ Возвращаем null, а не undefined
    }
    
    try {
        const response = await authorizedFetch('/me');
        
        if (!response.ok) {
            console.error('❌ Ошибка загрузки профиля:', response.status);
            return null;
        }
        
        const userData = await response.json();
        console.log('👤 Данные пользователя:', userData);
        return userData;
        
    } catch (error) {
        console.error('❌ Ошибка загрузки профиля:', error);
        return null; // ✅ Возвращаем null при ошибке
    }
}

export function getToken() {
    return localStorage.getItem('authToken');
}

export function removeToken() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('tokenTimestamp');
    console.log('🔓 Токен удалён');
}