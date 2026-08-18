// 问题魔瓶模块
document.addEventListener('DOMContentLoaded', function() {
    initBottle();
});

function initBottle() {
    const bottle = document.querySelector('.bottle');
    const cubeDisplay = document.querySelector('.cube-display');
    const cube3d = document.querySelector('.cube-3d');
    const cubeFront = document.querySelector('.cube-front');
    const cubeBack = document.querySelector('.cube-back');
    const questionDisplay = document.querySelector('.question-display');
    const questionText = document.querySelector('.question-text');
    const nextBtn = document.querySelector('.btn-next');

    // 问题列表
    const questions = [
        '如果给你读心术的超能力，你会拿它来干什么？',
        '你更喜欢大城市的繁华还是山野的清净？',
        '两天前，我才看到日历19号是七夕，想做个有趣的东西给你，有点黔驴技穷了，做出来简陋了点儿。哈哈 传统不能丢，520的时候有，今天也得有。',
        '你最想去旅游的地方是哪里？',
        'empty',  // 空方块彩蛋占位
        '你希望我们什么时候见面？'
    ];
    
    // 颜色列表
    const colors = [
        'var(--color-red)',
        'var(--color-orange)',
        'var(--color-yellow)',
        'var(--color-green)',
        'var(--color-blue)',
        'var(--color-purple)',
        'var(--color-pink)',
        'var(--color-gold)'
    ];
    
    let usedQuestions = [];
    let currentQuestion = null;
    
    // 点击瓶子
    bottle.addEventListener('click', () => {
        if (usedQuestions.length >= questions.length) return;
        
        // 摇晃动画
        bottle.classList.add('shaking');
        
        // 随机选择问题
        const availableQuestions = questions.filter((_, index) => !usedQuestions.includes(index));
        const randomIndex = Math.floor(Math.random() * availableQuestions.length);
        const questionIndex = questions.indexOf(availableQuestions[randomIndex]);
        currentQuestion = questionIndex;
        
        // 随机颜色
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        // 设置方块颜色
        cubeFront.style.background = `linear-gradient(135deg, ${randomColor}, ${randomColor})`;
        
        // 摇晃结束后显示方块
        setTimeout(() => {
            bottle.classList.remove('shaking');
            
            // 重置方块状态
            gsap.killTweensOf(cubeDisplay);
            gsap.set(cubeDisplay, { y: -200, scale: 0.5, opacity: 0 });
            cubeDisplay.style.visibility = 'visible';
            cubeDisplay.style.pointerEvents = 'auto';
            
            // 方块从瓶口飞出动画
            gsap.to(cubeDisplay, {
                y: 0,
                scale: 1,
                opacity: 1,
                duration: 0.8,
                ease: 'back.out(1.7)'
            });
        }, 1500);
    });
    
    // 点击方块翻转
    cubeDisplay.addEventListener('click', () => {
        if (cube3d.classList.contains('flipped')) return;
        
        cube3d.classList.add('flipped');
        
        // 显示问题文字
        setTimeout(() => {
            questionDisplay.classList.add('active');
            
            // 打字机效果
            if (currentQuestion === 4) {
                // 空方块彩蛋
                typeWriter(questionText, '这个方块什么都没有，但我希望你笑了 😊', 80);
            } else if (currentQuestion === 5) {
                // 最后一个问题 - 先显示问题，2秒后追加显示
                typeWriter(questionText, questions[currentQuestion], 80).then(() => {
                    setTimeout(() => {
                        questionText.textContent += '\n\n我希望是现在 哈哈';
                    }, 2000);
                });
            } else {
                typeWriter(questionText, questions[currentQuestion], 80);
            }
            
            // 更新计数
            usedQuestions.push(currentQuestion);
        }, 800);
    });
    
    // 再抽一个按钮
    nextBtn.addEventListener('click', () => {
        // 重置状态
        cube3d.classList.remove('flipped');
        questionDisplay.classList.remove('active');
        questionText.textContent = '';
        
        // 隐藏方块
        gsap.to(cubeDisplay, {
            y: -200,
            scale: 0.5,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.in',
            onComplete: () => {
                cubeDisplay.style.visibility = 'hidden';
                cubeDisplay.style.pointerEvents = 'none';
            }
        });
        
        // 特殊问题效果
        if (currentQuestion === 4) {
            // 空方块彩蛋 - 全屏飘落流星
            createHeartParticles();
        }
    });
    
    // 创建流星粒子
    function createHeartParticles() {
        const container = document.querySelector('.bottle-container');
        
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const star = document.createElement('div');
                star.className = 'shooting-star';
                star.innerHTML = '✦';
                star.style.position = 'absolute';
                star.style.right = '-30px';
                star.style.top = Math.random() * 60 + '%';
                star.style.fontSize = Math.random() * 12 + 8 + 'px';
                star.style.color = '#fff';
                star.style.textShadow = '0 0 6px #fff, 0 0 12px #ffd700, 0 0 20px #ffd700';
                star.style.pointerEvents = 'none';
                star.style.zIndex = '100';
                star.style.opacity = '0';
                
                container.appendChild(star);
                
                // 流星斜向划过动画
                gsap.fromTo(star,
                    { opacity: 1, x: 0, y: 0 },
                    {
                        x: -(window.innerWidth + 100),
                        y: window.innerHeight * 0.6,
                        opacity: 0,
                        duration: Math.random() * 0.8 + 0.6,
                        ease: 'power1.in',
                        onComplete: () => star.remove()
                    }
                );
            }, i * 150);
        }
    }
    
    // 金光闪烁
    function createGoldFlash() {
        const flash = document.createElement('div');
        flash.style.position = 'fixed';
        flash.style.top = '0';
        flash.style.left = '0';
        flash.style.width = '100%';
        flash.style.height = '100%';
        flash.style.background = 'radial-gradient(circle, rgba(255,215,0,0.8) 0%, transparent 70%)';
        flash.style.zIndex = '1000';
        flash.style.pointerEvents = 'none';
        
        document.body.appendChild(flash);
        
        gsap.fromTo(flash, 
            { opacity: 0 },
            { 
                opacity: 1, 
                duration: 0.3,
                yoyo: true,
                repeat: 3,
                onComplete: () => flash.remove()
            }
        );
    }
    
    // 方块浮动动画
    const cubes = document.querySelectorAll('.cube');
    cubes.forEach((cube, index) => {
        gsap.to(cube, {
            y: '+=10',
            rotation: 360,
            duration: 3 + index * 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    });
}