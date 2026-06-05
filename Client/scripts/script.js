import repaint_avatar from "./repaint_avatars.js"

let avatar = {
    ear: 0, skin: 0, chin: 0, mouth: 0, eye: 0, nose: 0, hair: 0
}

let avatar_svg_path = {
    ear: '', skin: '', chin: '', mouth: '', eye: '', nose: '', hair: ''   
}

const Render_avatar = (repaint, win) => {
    // тут рендер
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
            Render_avatar(repaint_avatar(avatar, 'registr'), 0); 
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
            Render_avatar(repaint_avatar(avatar, 'avatar'), 1);     
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
            avatar.ear = rangeEarsInput.value-1;
            EarsValEl.textContent = avatar.ear;
            Render_avatar(repaint_avatar(avatar, 'Ears'), 1);
            console.log(avatar.ear);
        });

    rangeSkinInput.addEventListener('input', () => {
            avatar.skin = rangeSkinInput.value-1;
            SkinValEl.textContent = avatar.skin
            Render_avatar(repaint_avatar(avatar, 'Skin'), 1);
            console.log(avatar.skin);
        });
        
    rangeChinInput.addEventListener('input', () => {
            avatar.chin = rangeChinInput.value-1;
            ChinValEl.textContent = avatar.chin
            Render_avatar(repaint_avatar(avatar, 'Chin'), 1);
            console.log(avatar.chin);
        });
        
    rangeMouthInput.addEventListener('input', () => {
            avatar.mouth = rangeMouthInput.value-1;
            MouthValEl.textContent = avatar.mouth
            Render_avatar(repaint_avatar(avatar, 'Mouth'), 1);
            console.log(avatar.mouth);
        });
        
    rangeEyeInput.addEventListener('input', () => {
            avatar.eye = rangeEyeInput.value-1;
            EyeValEl.textContent = avatar.eye
            Render_avatar(repaint_avatar(avatar, 'Eye'), 1);
            console.log(avatar.eye);
        });
        
    rangeNoseInput.addEventListener('input', () => {
            avatar.nose = rangeNoseInput.value-1;
            NoseValEl.textContent = avatar.nose
            Render_avatar(repaint_avatar(avatar, 'Nose'), 1);
            console.log(avatar.nose);
        });
        
    rangeHairInput.addEventListener('input', () => {
            avatar.hair = rangeHairInput.value-1;
            HairValEl.textContent = avatar.hair
            Render_avatar(repaint_avatar(avatar, 'Hair'), 1);
            console.log(avatar.hair);
        });
})