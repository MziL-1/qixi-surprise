// 旅行地点模块
document.addEventListener('DOMContentLoaded', function() {
    initMemory();
});

function initMemory() {
    const cards = document.querySelectorAll('.memory-card');
    const cardsContainer = document.querySelector('.memory-cards');
    const message = document.querySelector('.memory-message');
    
    // 加载卡片背景图片
    cards.forEach(card => {
        const bgUrl = card.getAttribute('data-bg');
        if (bgUrl) {
            const front = card.querySelector('.card-front');
            if (front) {
                front.style.backgroundImage = `url(${bgUrl})`;
            }
        }
    });
    
    // 点击翻面
    cards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });
    
    // 滚动到最后显示文字
    cardsContainer.addEventListener('scroll', () => {
        const scrollLeft = cardsContainer.scrollLeft;
        const maxScroll = cardsContainer.scrollWidth - cardsContainer.clientWidth;
        
        if (scrollLeft >= maxScroll - 50) {
            message.classList.add('visible');
        } else {
            message.classList.remove('visible');
        }
    });
}