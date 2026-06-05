import repaint_avatar from "./repaint_avatars.js"

let avatar = {
    ear: 0, skin: 0, chin: 0, mouth: 0, eye: 0, nose: 0, hair: 0
}

let avatar_svg_path = {
    ear: '', skin: '', chin: '', mouth: '', eye: '', nose: '', hair: ''   
}

const Render_avatar = (repaint, win) => {
    // Выбираем правильный контейнер в зависимости от окна
    let avawinEl;
    
    if (win === 0) {
        avawinEl = document.querySelector('.wrapper-registration .wrapper-avatar__content');
    } else if (win === 1) {
        avawinEl = document.querySelector('.wrapper-note .wrapper-avatar__content');
    }
    console.log('Контейнер для win=' + win + ':', avawinEl);
    avawinEl.innerHTML = '';
    
    // Создаем SVG
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

    // // Сначала фон (кожа) - будет внизу
    // const skinEl = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    // skinEl.setAttribute('width', '100%');
    // skinEl.setAttribute('height', '100%');
    // // skinEl.style.fill = repaint.ear;
    // svgEl.appendChild(skinEl);
    
    // Потом все части аватара
    const parts = ['ear', 'chin', 'mouth', 'eye', 'nose', 'hair'];
    parts.forEach(part => {
        if (repaint[part]) {
            const useEl = document.createElementNS('http://www.w3.org/2000/svg', 'use');
            useEl.setAttribute('href', repaint.chin);//`images/avatar_img/sprite_avatar_man.svg#ear1`);
            // useEl.setAttribute('class', 'images/sprite.svg#icon-close')// `avatar-${part}`);
            svgEl.appendChild(useEl);
        }
    });
    
    avawinEl.appendChild(svgEl);
    console.log('Рендер в окне ' + win + ' завершен');
}

const init = (page) => {
    const startWinEl = document.querySelector('.wrapper-start');
    const registrationWinEl = document.querySelector('.wrapper-registration');
    const loginWinEl = document.querySelector('.wrapper-login');
    const noteWinEl = document.querySelector('.wrapper-note');
    switch (page) {
        case 0 : {
            startWinEl.style.display = 'flex';
            registrationWinEl.style.display = 'none';
            loginWinEl.style.display = 'none';
            noteWinEl.style.display = 'none';
            console.log('start');
            break;
        }
        case 1 : {
            startWinEl.style.display = 'none';
            registrationWinEl.style.display = 'flex';
            loginWinEl.style.display = 'none';
            noteWinEl.style.display = 'none';  
            Render_avatar(repaint_avatar(avatar), 0); 
            console.log('registr');
            break;
        }
        case 2 : {
            startWinEl.style.display = 'none';
            registrationWinEl.style.display = 'none';
            loginWinEl.style.display = 'flex';
            noteWinEl.style.display = 'none';  
            console.log('login');
            break;
        }                
        case 3 : { 
            startWinEl.style.display = 'none';
            registrationWinEl.style.display = 'none';
            loginWinEl.style.display = 'none';
            noteWinEl.style.display = 'flex';    
            Render_avatar(repaint_avatar(avatar), 1);     
            console.log('avatar');
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
              
    console.log('butCustomEl:', butCustomEl)
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
            console.log('1231');
            }
            else {
                init(0)                
            console.log('1cxzvcxv231');
            }
        });
    });

    butGenEl.addEventListener('click', () => {
        //
        console.log('генератор');
    })

    butCustomEl.addEventListener('click', () => {
        console.log('dasdsd');
        init(3)        
    })

    rangeEarsInput.addEventListener('input', () => {
            avatar.ear = rangeEarsInput.value - 1;
            EarsValEl.textContent = avatar.ear + 1;
            Render_avatar(repaint_avatar(avatar), 1);
            console.log(avatar.ear);
        });

    rangeSkinInput.addEventListener('input', () => {
            avatar.skin = rangeSkinInput.value - 1;
            SkinValEl.textContent = avatar.skin + 1
            Render_avatar(repaint_avatar(avatar), 1);
            console.log(avatar.skin);
        });
        
    rangeChinInput.addEventListener('input', () => {
            avatar.chin = rangeChinInput.value - 1;
            ChinValEl.textContent = avatar.chin + 1
            Render_avatar(repaint_avatar(avatar), 1);
            console.log(avatar.chin);
        });
        
    rangeMouthInput.addEventListener('input', () => {
            avatar.mouth = rangeMouthInput.value - 1;
            MouthValEl.textContent = avatar.mouth + 1
            Render_avatar(repaint_avatar(avatar), 1);
            console.log(avatar.mouth);
        });
        
    rangeEyeInput.addEventListener('input', () => {
            avatar.eye = rangeEyeInput.value - 1;
            EyeValEl.textContent = avatar.eye + 1
            Render_avatar(repaint_avatar(avatar), 1);
            console.log(avatar.eye);
        });
        
    rangeNoseInput.addEventListener('input', () => {
            avatar.nose = rangeNoseInput.value - 1;
            NoseValEl.textContent = avatar.nose + 1
            Render_avatar(repaint_avatar(avatar), 1);
            console.log(avatar.nose);
        });
        
    rangeHairInput.addEventListener('input', () => {
            avatar.hair = rangeHairInput.value - 1;
            HairValEl.textContent = avatar.hair + 1
            Render_avatar(repaint_avatar(avatar), 1);
            console.log(avatar.hair);
        });
})