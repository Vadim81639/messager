import {loadUserProfile, removeToken} from "./api.js"
import {showMsg} from "./msg.js"

addEventListener('DOMContentLoaded', async () => {
    const userProfile = await loadUserProfile()
    if (!userProfile) {
        // console.log('===>>> ' + userProfile.nik_name)
// showMsg('Ошибка сервера','Нет связи с сервером', 3, 'ОК', 'Повторить');
        
        const connect = await showMsg('Ошибка сервера','Нет связи с сервером', 3, 'ОК', 'Повторить');
        if (connect == 0) {
            removeToken();
            window.location.href = "index.html";
        }
        if (connect == 1) {
            loadUserProfile()
        }
        console.log(connect);
    }

    const logoutEl = document.querySelector('.registration-form__btn--logout')
        logoutEl.addEventListener('click', () => {
            removeToken();
            window.location.href = "index.html";
        })
})