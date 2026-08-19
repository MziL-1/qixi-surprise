// 星空许愿模块
document.addEventListener('DOMContentLoaded', function () {
    initWish();
});

function initWish() {
    const wishStar = document.querySelector('.wish-star');
    const wishInputContainer = document.querySelector('.wish-input-container');
    const wishInput = document.querySelector('.wish-input');
    const wishBtn = document.querySelector('.btn-wish');
    const wishMessage = document.querySelector('.wish-message');
    const starryCanvas = document.getElementById('starry-canvas');
    const wishForm = document.getElementById('wish-form');

    // 初始化 Formspree Ajax
    window.formspree = window.formspree || function () {
        (formspree.q = formspree.q || []).push(arguments);
    };
    formspree('initForm', {
        formElement: '#wish-form',
        formId: 'mljrowlb'
    });

    // 点击星星
    wishStar.addEventListener('click', () => {
        // 星星放大动画
        gsap.to(wishStar, {
            scale: 1.5,
            duration: 0.5,
            ease: 'power2.out'
        });

        // 显示输入框
        setTimeout(() => {
            wishInputContainer.classList.add('active');
            wishInput.focus();
        }, 500);
    });

    // 许愿按钮
    wishBtn.addEventListener('click', submitWish);

    // 回车提交
    wishInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            submitWish();
        }
    });

    // 提交愿望
    function submitWish() {
        const wishText = wishInput.value.trim();
        if (!wishText) return;

        // 设置隐藏表单的值
        const hiddenInput = wishForm.querySelector('input[name="wish"]');
        if (hiddenInput) {
            hiddenInput.value = wishText;
        }

        // 通过 Formspree Ajax 提交
        wishForm.requestSubmit();

        // 创建飞入的星星
        createFlyingWish(wishText);

        // 隐藏输入框
        wishInputContainer.classList.remove('active');
        wishInput.value = '';

        // 显示愿望信息
        setTimeout(() => {
            wishMessage.classList.add('visible');

            // 显示我的愿望
            typeWriter(wishMessage, '你的愿望已发向星空，由MZL星君接收 嘻嘻！', 80);
        }, 2000);

        // 重置星星大小
        gsap.to(wishStar, {
            scale: 1,
            duration: 0.5,
            delay: 1
        });
    }

    // 创建飞入的星星
    function createFlyingWish(text) {
        const flyingWish = document.createElement('div');
        flyingWish.className = 'flying-wish';
        flyingWish.innerHTML = '⭐';
        flyingWish.title = text;

        // 随机目标位置
        const targetX = (Math.random() - 0.5) * 400;
        const targetY = (Math.random() - 0.5) * 400;

        flyingWish.style.setProperty('--fly-x', `${targetX}px`);
        flyingWish.style.setProperty('--fly-y', `${targetY}px`);

        // 初始位置
        flyingWish.style.position = 'absolute';
        flyingWish.style.left = '50%';
        flyingWish.style.top = '50%';
        flyingWish.style.transform = 'translate(-50%, -50%)';
        flyingWish.style.zIndex = '10';

        document.querySelector('.starry-container').appendChild(flyingWish);

        // 动画完成后添加到星空
        setTimeout(() => {
            flyingWish.remove();
            addStarToCanvas(targetX, targetY);
        }, 2000);
    }

    // 添加星星到Canvas
    function addStarToCanvas(x, y) {
        if (!starryCanvas) return;

        const ctx = starryCanvas.getContext('2d');
        const centerX = starryCanvas.width / 2;
        const centerY = starryCanvas.height / 2;

        // 绘制新星星
        function drawStar() {
            ctx.beginPath();
            ctx.arc(centerX + x, centerY + y, 3, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 215, 0, 0.8)';
            ctx.fill();

            // 闪烁效果
            ctx.beginPath();
            ctx.arc(centerX + x, centerY + y, 5, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 215, 0, 0.3)';
            ctx.fill();
        }

        drawStar();
    }
}