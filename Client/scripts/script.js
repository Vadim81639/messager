    import repaint_avatar from "./repaint_avatars.js"
    import { loginUser, registerUser, getToken, loadUserProfile, removeToken } from "./api.js"
    import {showMsg} from "./msg.js"

    let Data2Serv = {
        nikname : '', login : '', gender : 0, agreeChecked : false,
        head: 0, body: 0, dress: 0, ear: 0, chin: 0, mouth: 0, eye: 0, nose: 0, hair: 0
    }

    const regFormEl = document.querySelector('.submit-reg')
    const loginFormEl = document.querySelector('.submit-login')

    const generateNum = (n) => {
        return Math.floor(Math.random() * n);
    }

    const Render_avatar = (repaint, win) => {
        let avawinEl;
        if (win === 0) {
            avawinEl = document.querySelector('.wrapper-registration .wrapper-avatar__content');
        } else if (win === 1) {
            avawinEl = document.querySelector('.wrapper-note .wrapper-avatar__content');
        }
        avawinEl.innerHTML = '';
        const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svgEl.classList.add('avatar-sprite');
        svgEl.setAttribute('width', '100%');
        svgEl.setAttribute('height', '100%');
        svgEl.setAttribute('viewBox', '0 0 100 100');
        const faceEl = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        const headEl = document.createElementNS('http://www.w3.org/2000/svg', 'use');    
        const bodyEl = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        const dressEl = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        const backimgEl = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        const earEl = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        const chinEl = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        const mouthEl = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        const eyeEl = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        const noseEl = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        const hairEl = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        bodyEl.setAttribute('href',repaint.body)
        headEl.setAttribute('href',repaint.head)    
        dressEl.setAttribute('href',repaint.dress)  
        backimgEl.setAttribute('href', 'images/avatar_img/sprite_avatar_other.svg#backimage1')
        earEl.setAttribute('href',repaint.ear)
        chinEl.setAttribute('href',repaint.chin)
        mouthEl.setAttribute('href',repaint.mouth)
        eyeEl.setAttribute('href',repaint.eye)
        noseEl.setAttribute('href',repaint.nose)
        hairEl.setAttribute('href',repaint.hair)
        svgEl.appendChild(backimgEl)
        svgEl.appendChild(bodyEl)
        svgEl.appendChild(dressEl)    
        svgEl.appendChild(earEl)
        svgEl.appendChild(headEl)
        svgEl.appendChild(chinEl)
        svgEl.appendChild(mouthEl)
        svgEl.appendChild(eyeEl)
        svgEl.appendChild(noseEl)
        svgEl.appendChild(hairEl)
        avawinEl.appendChild(svgEl);
    }

    const init = (page) => {
    const startWinEl = document.querySelector('.wrapper-start');
    const registrationWinEl = document.querySelector('.wrapper-registration');
    const loginWinEl = document.querySelector('.wrapper-login');
    const noteWinEl = document.querySelector('.wrapper-note');
    const personalEl = document.querySelector('.wrapper-personal-data')
    // const appEl = document.querySelector('.wrapper-app-main')
    switch (page) {
        case 0 : {
            startWinEl.style.display = 'flex';
            registrationWinEl.style.display = 'none';
            loginWinEl.style.display = 'none';
            noteWinEl.style.display = 'none';
            personalEl.style.display = 'none';
            // window.location.href = "index.html"
            // appEl.style.display = 'none';
            break;
        }
        case 1 : {
            startWinEl.style.display = 'none';
            registrationWinEl.style.display = 'flex';
            loginWinEl.style.display = 'none';
            noteWinEl.style.display = 'none';  
            personalEl.style.display = 'none';
            // appEl.style.display = 'none';
            Render_avatar(repaint_avatar(Data2Serv), 0); 
            break;
        }
        case 2 : {
            startWinEl.style.display = 'none';
            registrationWinEl.style.display = 'none';
            loginWinEl.style.display = 'flex';
            noteWinEl.style.display = 'none';  
            personalEl.style.display = 'none';
            // appEl.style.display = 'none';
            break;
        }                
        case 3 : { 
            startWinEl.style.display = 'none';
            registrationWinEl.style.display = 'none';
            loginWinEl.style.display = 'none';
            noteWinEl.style.display = 'flex'; 
            personalEl.style.display = 'none';   
            // appEl.style.display = 'none';
            Render_avatar(repaint_avatar(Data2Serv), 1);     
            break;
        }       
        case 4 : { 
            startWinEl.style.display = 'none';
            registrationWinEl.style.display = 'none';
            loginWinEl.style.display = 'none';
            noteWinEl.style.display = 'none'; 
            personalEl.style.display = 'flex';   
            // appEl.style.display = 'none';
            break;
        }       
        case 5 : {
            startWinEl.style.display = 'none';
            registrationWinEl.style.display = 'none';
            loginWinEl.style.display = 'none';
            noteWinEl.style.display = 'none'; 
            personalEl.style.display = 'none';   
            // appEl.style.display = 'flex';
            window.location.href = "app_page.html"
            console.log('autorizations');
            break
        }
    }
    }

    addEventListener('DOMContentLoaded', async () => {
        // кнопки
        showMsg('msg head','msg text',1);

        const butLoginEl = document.querySelector('.registration-form__btn--login');
        const butRegEl = document.querySelector('.registration-form__btn--reg');    
        const butBackEls = document.querySelectorAll('.btn__data-back');
        const butGenEl = document.querySelector('.registration-form__btn--generator')
        const butCustomEl = document.querySelector('.wrapper-avatar__content--btn')
        const radioManEl = document.querySelector('.custom-radio__field--male')
        const radioWomanEl = document.querySelector('.custom-radio__field--female')   
        const linkPersonal = document.querySelector('.custom-checkbox__label-link--personal-data')
        const checkAgreeEl = document.querySelector('.custom-checkbox__field--agree')
        // const logoutEl = document.querySelector('.registration-form__btn--logout')
        // регуляторы аватарки
        const rangeEarsInput = document.querySelector('.avatar-custom--ears .avatar-custom__range');    
        const rangeDressInput = document.querySelector('.avatar-custom--dress .avatar-custom__range');
        const rangeChinInput = document.querySelector('.avatar-custom--chin .avatar-custom__range');
        const rangeMouthInput = document.querySelector('.avatar-custom--mouth .avatar-custom__range');
        const rangeEyeInput = document.querySelector('.avatar-custom--eye .avatar-custom__range');
        const rangeNoseInput = document.querySelector('.avatar-custom--nose .avatar-custom__range');
        const rangeHairInput = document.querySelector('.avatar-custom--hair .avatar-custom__range');
        // значения регуляторов
        const EarsValEl = document.querySelector('.avatar-custom--ears .avatar-custom__value');
        const DressValEl = document.querySelector('.avatar-custom--dress .avatar-custom__value');
        const ChinValEl = document.querySelector('.avatar-custom--chin .avatar-custom__value');
        const MouthValEl = document.querySelector('.avatar-custom--mouth .avatar-custom__value');
        const EyeValEl = document.querySelector('.avatar-custom--eye .avatar-custom__value');
        const NoseValEl = document.querySelector('.avatar-custom--nose .avatar-custom__value');
        const HairValEl = document.querySelector('.avatar-custom--hair .avatar-custom__value');          

        const avatar_generate = () => {
        Data2Serv.ear = generateNum(5)
        Data2Serv.chin = generateNum(5)
        Data2Serv.eye = generateNum(5)
        Data2Serv.hair = generateNum(5)
        Data2Serv.mouth = generateNum(5)
        Data2Serv.nose = generateNum(5)
        Data2Serv.dress = generateNum(5)
        rangeEarsInput.value = Data2Serv.ear + 1
        rangeDressInput.value = Data2Serv.dress + 1
        rangeChinInput.value = Data2Serv.chin + 1
        rangeMouthInput.value = Data2Serv.mouth + 1
        rangeEyeInput.value = Data2Serv.eye + 1
        rangeNoseInput.value = Data2Serv.nose + 1
        rangeHairInput.value = Data2Serv.hair + 1
        EarsValEl.textContent = Data2Serv.ear + 1
        DressValEl.textContent = Data2Serv.dress + 1
        ChinValEl.textContent = Data2Serv.chin + 1
        MouthValEl.textContent = Data2Serv.mouth + 1
        EyeValEl.textContent = Data2Serv.eye + 1
        NoseValEl.textContent = Data2Serv.nose + 1
        HairValEl.textContent = Data2Serv.hair + 1
        Render_avatar(repaint_avatar(Data2Serv), 1);
        }
    
        const userProfile = await loadUserProfile()
        if (userProfile) {
            init(5) 
            console.log('===>>> ' + userProfile.nik_name)
        } else {avatar_generate(); init(0); }
        
        butRegEl.addEventListener('click', () => {
            init(1)
        })

        butLoginEl.addEventListener('click', () => {
            init(2)
        })

        butBackEls.forEach(button => {
            button.addEventListener('click', () => {
                if (button.classList.contains('btn__data-back-reg')) {
                init(1);
                }
                else {
                    init(0)                
                }
            });
        });

        butGenEl.addEventListener('click', () => {
            avatar_generate()
        })

        butCustomEl.addEventListener('click', () => {
            init(3)        
        })

        radioManEl.addEventListener('click', () => {
            Data2Serv.gender = 0
            Render_avatar(repaint_avatar(Data2Serv), 0);
            console.log('man');
        })

        radioWomanEl.addEventListener('click', () => {
            Data2Serv.gender = 1
            Render_avatar(repaint_avatar(Data2Serv), 0);
            console.log('woman');
        })

        linkPersonal.addEventListener('click', () => {
            init(4)
        })

        checkAgreeEl.addEventListener('change', () => {
            if (checkAgreeEl.checked) {
                Data2Serv.agreeChecked = true
                console.log('Согласие получено');
            } else {
                Data2Serv.agreeChecked = false
                console.log('Согласие отозвано');
            }
        })        

        rangeEarsInput.addEventListener('input', () => {
                Data2Serv.ear = rangeEarsInput.value - 1;
                EarsValEl.textContent = Data2Serv.ear + 1;
                Render_avatar(repaint_avatar(Data2Serv), 1);
            });

        rangeDressInput.addEventListener('input', () => {
                Data2Serv.dress = rangeDressInput.value - 1;
                DressValEl.textContent = Data2Serv.dress + 1
                Render_avatar(repaint_avatar(Data2Serv), 1);
            });
            
        rangeChinInput.addEventListener('input', () => {
                Data2Serv.chin = rangeChinInput.value - 1;
                ChinValEl.textContent = Data2Serv.chin + 1
                Render_avatar(repaint_avatar(Data2Serv), 1);
            });
            
        rangeMouthInput.addEventListener('input', () => {
                Data2Serv.mouth = rangeMouthInput.value - 1;
                MouthValEl.textContent = Data2Serv.mouth + 1
                Render_avatar(repaint_avatar(Data2Serv), 1);
            });
            
        rangeEyeInput.addEventListener('input', () => {
                Data2Serv.eye = rangeEyeInput.value - 1;
                EyeValEl.textContent = Data2Serv.eye + 1
                Render_avatar(repaint_avatar(Data2Serv), 1);
            });
            
        rangeNoseInput.addEventListener('input', () => {
                Data2Serv.nose = rangeNoseInput.value - 1;
                NoseValEl.textContent = Data2Serv.nose + 1
                Render_avatar(repaint_avatar(Data2Serv), 1);
            });
            
        rangeHairInput.addEventListener('input', () => {
                Data2Serv.hair = rangeHairInput.value - 1;
                HairValEl.textContent = Data2Serv.hair + 1
                Render_avatar(repaint_avatar(Data2Serv), 1);
            });
        renderTable();        
    
    })    

    const handleRegSubmit = (e) => {
        e.preventDefault()
        const nicknameFieldEl = document.querySelector('#_nik-name')
        const loginFieldEl = document.querySelector('#_login')
        const passwordFieldEl = document.querySelector('#_password')
        const confirm_passwordFieldEl = document.querySelector('#confirm_password')
        if (passwordFieldEl.value !== confirm_passwordFieldEl.value) {
            console.log('пароли не совпадают');
            return
        } else 
            console.log('пароли совпадают');

        if (!Data2Serv.agreeChecked) return console.log('нет подписи согласия на обработку данных')
        Data2Serv.nikname = nicknameFieldEl.value
        Data2Serv.login = loginFieldEl.value
        console.log(Data2Serv.nikname);
        registerUser(Data2Serv, passwordFieldEl.value)    
    }

    const handleLoginSubmit = async (e) => {
        e.preventDefault()
        const loginEl = document.querySelector('#login_auth')
        const passEl = document.querySelector('#pass_auth')
        
        const result = await loginUser(loginEl.value, passEl.value)
        
        // Проверяем, успешно ли всё
        if (result && result.token) {
            console.log('✅ Всё ок!');
            init(5); // Переход в основное приложение
        } else {
            console.log('❌ Ошибка входа');
            alert('Неверный логин или пароль');
        }
    }

    regFormEl.addEventListener("submit", handleRegSubmit);
    loginFormEl.addEventListener("submit", handleLoginSubmit);