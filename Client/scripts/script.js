// import Delivery from  "./start_form.js";

const init = (page) => {
    const wrapEl = document.querySelector('.wrapper-grid')
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
            wrapEl.style.gridTemplateColumns = 'auto';
            console.log('start');
            break;
        }
        case 1 : {
            startWinEl.style.display = 'none';
            registrationWinEl.style.display = 'flex';
            loginWinEl.style.display = 'none';
            noteWinEl.style.display = 'none';     
            wrapEl.style.gridTemplateColumns = 'auto';       
            console.log('registr');
            break;
        }
        case 2 : {
            startWinEl.style.display = 'none';
            registrationWinEl.style.display = 'none';
            loginWinEl.style.display = 'flex';
            noteWinEl.style.display = 'none';  
            wrapEl.style.gridTemplateColumns = 'auto';          
            console.log('login');
            break;
        }                
        case 3 : {
            startWinEl.style.display = 'none';
            registrationWinEl.style.display = 'none';
            loginWinEl.style.display = 'none';
            noteWinEl.style.display = 'flex';         
            wrapEl.style.gridTemplateColumns = 'auto';      
            console.log('messager');
            break;
        }        
    }
}

addEventListener('DOMContentLoaded', () => {
    const butLoginEl = document.querySelector('.registration-form__btn--login');
    const butRegEl = document.querySelector('.registration-form__btn--reg');    
    const butBackEls = document.querySelectorAll('.btn__data-back');
    const butGenEl = document.querySelector('.wrapper-avatar__generate-btn')
    const butCustomEl = document.querySelector('.wrapper-avatar__content--btn')
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

    })
    butCustomEl.addEventListener('click', () => {
        init(3)
        console.log('dasdsd');
    })
})

