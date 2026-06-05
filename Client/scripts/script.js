// import Delivery from  "./start_form.js";

let avatar = [0,0,0,0,0,0,0]

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
            console.log('messager');
            break;
        }        
    }
}

addEventListener('DOMContentLoaded', () => {
    const butLoginEl = document.querySelector('.registration-form__btn--login');
    const butRegEl = document.querySelector('.registration-form__btn--reg');    
    const butBackEls = document.querySelectorAll('.btn__data-back');
    // const butGenEl = document.querySelector('.wrapper-avatar__generate-btn')
    const butCustomEl = document.querySelector('.wrapper-avatar__content--btn')
    const rangeEarsInput = document.querySelector('.avatar-custom--ears .avatar-custom__range');    
    const rangeSkinInput = document.querySelector('.avatar-custom--skin .avatar-custom__range');
    const rangeChinInput = document.querySelector('.avatar-custom--chin .avatar-custom__range');
    const rangeMouthInput = document.querySelector('.avatar-custom--mouth .avatar-custom__range');
    const rangeEyeInput = document.querySelector('.avatar-custom--eye .avatar-custom__range');
    const rangeNoseInput = document.querySelector('.avatar-custom--nose .avatar-custom__range');
    const rangeHairInput = document.querySelector('.avatar-custom--hair .avatar-custom__range');

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
    // butGenEl.addEventListener('click', () => {

    // })
    butCustomEl.addEventListener('click', () => {
        console.log('dasdsd');
        init(3)
        
    })

rangeEarsInput.addEventListener('input', () => {
        avatar[0] = rangeEarsInput.value-1;
        EarsValEl.textContent = avatar[0]
        console.log(avatar[0]);
    });

rangeSkinInput.addEventListener('input', () => {
        avatar[1] = rangeSkinInput.value-1;
        SkinValEl.textContent = avatar[1]
        console.log(avatar[1]);
    });
    
rangeChinInput.addEventListener('input', () => {
        avatar[2] = rangeChinInput.value-1;
        ChinValEl.textContent = avatar[2]
        console.log(avatar[2]);
    });
    
rangeMouthInput.addEventListener('input', () => {
        avatar[3] = rangeMouthInput.value-1;
        MouthValEl.textContent = avatar[3]
        console.log(avatar[3]);
    });
    
rangeEyeInput.addEventListener('input', () => {
        avatar[4] = rangeEyeInput.value-1;
        EyeValEl.textContent = avatar[4]
        console.log(avatar[4]);
    });
    
rangeNoseInput.addEventListener('input', () => {
        avatar[5] = rangeNoseInput.value-1;
        NoseValEl.textContent = avatar[5]
        console.log(avatar[5]);
    });
    
rangeHairInput.addEventListener('input', () => {
        avatar[6] = rangeHairInput.value-1;
        HairValEl.textContent = avatar[6]
        console.log(avatar[6]);
    });

})

