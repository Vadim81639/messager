export const showMsg = (head, text, status = 0) => {
    const image = ['none', 'info', 'warning', 'error'];

    const msgCard = document.querySelector('.message-card');
    const msgHead = document.querySelector('.message-card__head');
    const msgImg = document.querySelector('.message-card__img');
    const msgText = document.querySelector('.message-card__text');
    const msgBtn = document.querySelector('.message-card__button');
    
    // Очищаем иконку
    if (msgImg) {
        msgImg.innerHTML = '';
    }

    if (status > 0 && status <= 3) {
        if (msgImg) {
            msgImg.style.display = 'flex';
            
            // 1. Создаем SVG
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('width', '100%');
            svg.setAttribute('height', '100%');
            svg.setAttribute('viewBox', '0 0 24 24');
            
            // 2. Создаем USE
            const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
            const iconName = image[status] || 'info';
            // use.setAttribute('href', `images/sprite.svg#icon-${iconName}`);
            // или если хотите всегда icon-close:
            use.setAttribute('href', 'images/sprite.svg#icon-close');
            
            // 3. USE помещаем ВНУТРЬ SVG
            svg.appendChild(use);
            
            // 4. SVG помещаем ВНУТРЬ msgImg
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

    // Удаляем старые обработчики
    const newBtn = msgBtn.cloneNode(true);
    msgBtn.parentNode.replaceChild(newBtn, msgBtn);
    
    newBtn.addEventListener('click', () => {
        msgCard.style.display = 'none';
        console.log('clk');
    });
};