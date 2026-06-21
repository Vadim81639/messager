import {removeToken} from "./api.js"

addEventListener('DOMContentLoaded', async () => {
    const logoutEl = document.querySelector('.registration-form__btn--logout')
        logoutEl.addEventListener('click', () => {
            removeToken();
            window.location.href = "index.html";
        })
})