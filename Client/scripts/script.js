import repaint_avatar from "./repaint_avatars.js"

let Data2Serv = {
    nikname : '', login : '', gender : 0, 
    ear: 0, skin: 0, chin: 0, mouth: 0, eye: 0, nose: 0, hair: 0
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
    const bodyEl = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    const backimgEl = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    const earEl = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    const chinEl = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    const mouthEl = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    const eyeEl = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    const noseEl = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    const hairEl = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    faceEl.setAttribute('href', 'images/avatar_img/sprite_avatar_man.svg#face1')
    bodyEl.setAttribute('href', 'images/avatar_img/sprite_avatar_man.svg#body1')
    backimgEl.setAttribute('href', 'images/avatar_img/sprite_avatar_other.svg#backimage1')
    earEl.setAttribute('href',repaint.ear)
    chinEl.setAttribute('href',repaint.chin)
    mouthEl.setAttribute('href',repaint.mouth)
    eyeEl.setAttribute('href',repaint.eye)
    noseEl.setAttribute('href',repaint.nose)
    hairEl.setAttribute('href',repaint.hair)
    svgEl.appendChild(backimgEl)
    svgEl.appendChild(bodyEl)
    svgEl.appendChild(earEl)
    svgEl.appendChild(faceEl)
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
    switch (page) {
        case 0 : {
            startWinEl.style.display = 'flex';
            registrationWinEl.style.display = 'none';
            loginWinEl.style.display = 'none';
            noteWinEl.style.display = 'none';
            personalEl.style.display = 'none';
            break;
        }
        case 1 : {
            startWinEl.style.display = 'none';
            registrationWinEl.style.display = 'flex';
            loginWinEl.style.display = 'none';
            noteWinEl.style.display = 'none';  
            personalEl.style.display = 'none';
            Render_avatar(repaint_avatar(Data2Serv), 0); 
            break;
        }
        case 2 : {
            startWinEl.style.display = 'none';
            registrationWinEl.style.display = 'none';
            loginWinEl.style.display = 'flex';
            noteWinEl.style.display = 'none';  
            personalEl.style.display = 'none';
            break;
        }                
        case 3 : { 
            startWinEl.style.display = 'none';
            registrationWinEl.style.display = 'none';
            loginWinEl.style.display = 'none';
            noteWinEl.style.display = 'flex'; 
            personalEl.style.display = 'none';   
            Render_avatar(repaint_avatar(Data2Serv), 1);     
            break;
        }       
        case 4 : { 
            startWinEl.style.display = 'none';
            registrationWinEl.style.display = 'none';
            loginWinEl.style.display = 'none';
            noteWinEl.style.display = 'none'; 
            personalEl.style.display = 'flex';   
            Render_avatar(repaint_avatar(Data2Serv), 1);     
            break;
        }                
    }
}

addEventListener('DOMContentLoaded', () => {
    // кнопки
    const butLoginEl = document.querySelector('.registration-form__btn--login');
    const butRegEl = document.querySelector('.registration-form__btn--reg');    
    const butBackEls = document.querySelectorAll('.btn__data-back');
    const butGenEl = document.querySelector('.registration-form__btn--generator')
    const butCustomEl = document.querySelector('.wrapper-avatar__content--btn')
    const radioManEl = document.querySelector('.custom-radio__field--male')
    const radioWomanEl = document.querySelector('.custom-radio__field--female')   
    const linkPersonal = document.querySelector('.custom-checkbox__label-link--personal-data')
    // регуляторы аватарки
    const rangeEarsInput = document.querySelector('.avatar-custom--ears .avatar-custom__range');    
    const rangeSkinInput = document.querySelector('.avatar-custom--skin .avatar-custom__range');
    const rangeChinInput = document.querySelector('.avatar-custom--chin .avatar-custom__range');
    const rangeMouthInput = document.querySelector('.avatar-custom--mouth .avatar-custom__range');
    const rangeEyeInput = document.querySelector('.avatar-custom--eye .avatar-custom__range');
    const rangeNoseInput = document.querySelector('.avatar-custom--nose .avatar-custom__range');
    const rangeHairInput = document.querySelector('.avatar-custom--hair .avatar-custom__range');
    // значения регуляторов
    const EarsValEl = document.querySelector('.avatar-custom--ears .avatar-custom__value');
    const SkinValEl = document.querySelector('.avatar-custom--skin .avatar-custom__value');
    const ChinValEl = document.querySelector('.avatar-custom--chin .avatar-custom__value');
    const MouthValEl = document.querySelector('.avatar-custom--mouth .avatar-custom__value');
    const EyeValEl = document.querySelector('.avatar-custom--eye .avatar-custom__value');
    const NoseValEl = document.querySelector('.avatar-custom--nose .avatar-custom__value');
    const HairValEl = document.querySelector('.avatar-custom--hair .avatar-custom__value');          

    init(0);

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
        Data2Serv.ear = generateNum(5)
        Data2Serv.chin = generateNum(5)
        Data2Serv.eye = generateNum(5)
        Data2Serv.hair = generateNum(5)
        Data2Serv.mouth = generateNum(5)
        Data2Serv.nose = generateNum(5)
        Data2Serv.skin = generateNum(5)
        rangeEarsInput.value = Data2Serv.ear + 1
        rangeSkinInput.value = Data2Serv.skin + 1
        rangeChinInput.value = Data2Serv.chin + 1
        rangeMouthInput.value = Data2Serv.mouth + 1
        rangeEyeInput.value = Data2Serv.eye + 1
        rangeNoseInput.value = Data2Serv.nose + 1
        rangeHairInput.value = Data2Serv.hair + 1
        EarsValEl.textContent = Data2Serv.ear + 1
        SkinValEl.textContent = Data2Serv.skin + 1
        ChinValEl.textContent = Data2Serv.chin + 1
        MouthValEl.textContent = Data2Serv.mouth + 1
        EyeValEl.textContent = Data2Serv.eye + 1
        NoseValEl.textContent = Data2Serv.nose + 1
        HairValEl.textContent = Data2Serv.hair + 1
        Render_avatar(repaint_avatar(Data2Serv), 1);
    })

    butCustomEl.addEventListener('click', () => {
        init(3)        
    })

    radioManEl.addEventListener('click', () => {
        Data2Serv.gender = 0
        // console.log('man');
    })

    radioWomanEl.addEventListener('click', () => {
        Data2Serv.gender = 1
        // console.log('woman');
    })

    linkPersonal.addEventListener('click', () => {
        init(4)
    })

    rangeEarsInput.addEventListener('input', () => {
            Data2Serv.ear = rangeEarsInput.value - 1;
            EarsValEl.textContent = Data2Serv.ear + 1;
            Render_avatar(repaint_avatar(Data2Serv), 1);
        });

    rangeSkinInput.addEventListener('input', () => {
            Data2Serv.skin = rangeSkinInput.value - 1;
            SkinValEl.textContent = Data2Serv.skin + 1
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
    const checkAgreeEl = document.querySelector('.custom-checkbox__field--agree')
    const nicknameFieldEl = document.querySelector('#_nik-name')
    const loginFieldEl = document.querySelector('#_login')
    const passwordFieldEl = document.querySelector('#_password')
    const confirm_passwordFieldEl = document.querySelector('#confirm_password')
    let agreeChecked = false
    checkAgreeEl.addEventListener('change', () => {
        if (checkAgreeEl.checked) {
            agreeChecked = true
            // console.log('Согласие получено');
        } else {
            agreeChecked = false
            // console.log('Согласие отозвано');
        }
    })    
    
    if (!agreeChecked) return console.log('нет подписи согласия на обработку данных')
    
 // Сразу отправляем на сервер но ник и логин записать в локал стореж и оставлять в полях
    // sendToServer({
    //     nikname: document.querySelector('#_nik-name').value,
    //     login: document.querySelector('#_login').value,
    //     password: password,  // сразу в запрос
    //     gender: Data2Serv.gender,
    //     avatar: Data2Serv
    // });
}

const handleLoginSubmit = (e) => {
    e.preventDefault()
}

regFormEl.addEventListener("submit", handleRegSubmit);
loginFormEl.addEventListener("submit", handleLoginSubmit);