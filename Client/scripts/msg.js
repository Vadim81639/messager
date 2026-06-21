export const showMsg = (head, text, status = 0, btn1 = '', btn2 = '', btn3 = '') => {
    return new Promise((resolve) => {
        if (!btn1) btn1='OK'
        const image = ['none', 'info', 'warning', 'error'];
        const msgCard = document.createElement('div');
        const boxEl = document.createElement('div');
        const msgHead = document.createElement('h2');
        const msgContentEl = document.createElement('div');
        const msgImg = document.createElement('div');
        const msgText = document.createElement('p');
        const msgBtnWrap = document.createElement('div');
        const msgBtn1 = document.createElement('button');
        const msgBtn2 = document.createElement('button');
        const msgBtn3 = document.createElement('button');

        msgCard.classList.add('message-card');
        boxEl.classList.add('message-card__box');
        msgHead.classList.add('message-card__head');
        msgContentEl.classList.add('message-card__content');
        msgImg.classList.add('message-card__img');
        msgText.classList.add('message-card__text');
        msgBtnWrap.classList.add('message-card__msgBtnWrap');
        msgBtn1.classList.add('message-card__button', 'btn');
        msgBtn2.classList.add('message-card__button', 'btn');
        msgBtn3.classList.add('message-card__button', 'btn');

        msgContentEl.appendChild(msgImg);
        msgContentEl.appendChild(msgText);
        boxEl.appendChild(msgHead);
        boxEl.appendChild(msgContentEl);
        boxEl.appendChild(msgBtnWrap);
        msgBtnWrap.appendChild(msgBtn1);

        if (btn2) msgBtnWrap.appendChild(msgBtn2);
        if (btn3) msgBtnWrap.appendChild(msgBtn3);
        msgCard.appendChild(boxEl);
        document.body.appendChild(msgCard);

        msgBtn1.textContent = btn1;
        msgBtn2.textContent = btn2;
        msgBtn3.textContent = btn3;

        if (msgImg) { msgImg.innerHTML = '' }

        if (status > 0 && status <= 3) {
            if (msgImg) {
                msgImg.style.display = 'flex';
                const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                svg.setAttribute('width', '100%');
                svg.setAttribute('height', '100%');
                svg.setAttribute('viewBox', '0 0 24 24');
                const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
                const iconName = image[status] || 'none';
                use.setAttribute('href', `images/generals.svg#msg-${iconName}`);
                svg.appendChild(use);
                msgImg.appendChild(svg);
                console.log(`Иконка добавлена: ${iconName}`);
            }
        } else {
            if (msgImg) {
                msgImg.style.display = 'none';
            }
        }

        msgCard.style.display = 'flex';
        msgHead.textContent = head;
        msgText.textContent = text;

        const closeMessage = (result) => {
            msgCard.remove(); 
            console.log(`Выбрано: ${result}`);
            resolve(result); 
        };

        msgBtn1.addEventListener('click', () => {
            closeMessage(0);
        });

        if (btn2) {
            msgBtn2.addEventListener('click', () => {
                closeMessage(1); 
            });
        }

        if (btn3) {
            msgBtn3.addEventListener('click', () => {
                closeMessage(2); 
            });
        }

        msgCard.addEventListener('click', (e) => {
            if (e.target === msgCard) {
                closeMessage(-1); 
            }
        });
    });
};