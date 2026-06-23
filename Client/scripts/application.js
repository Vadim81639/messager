import {loadUserProfile, removeToken} from "./api.js"
import {showMsg} from "./msg.js"

addEventListener('DOMContentLoaded', async () => {
    const profileBtn = document.querySelector('.btn__profile')

    const logoutEl = document.querySelector('.registration-form__btn--logout')
    const profileEl = document.querySelector('.profile')

    const userProfile = await loadUserProfile()
    if (!userProfile) {
        const connect = await showMsg('Ошибка сервера','Нет связи с сервером', 3, 'ОК', 'Повторить');
        if (connect == 0) {
            removeToken();
            window.location.href = "index.html";
        }
        if (connect == 1) {
            await loadUserProfile()
        }
        console.log(connect);
    }

    profileBtn.addEventListener('click', () => {
        profileEl.style.display = 'flex'
        console.log('sdsd');
    })
    
    logoutEl.addEventListener('click', () => {
        removeToken();
        window.location.href = "index.html";
    })
})