// 主入口文件
document.addEventListener('DOMContentLoaded', function() {
    // 初始化页面
    initNavigation();
    initBackgroundGradient();
    initBGM();
    initScrollAnimations();
});

// 导航点
function initNavigation() {
    const navDots = document.querySelectorAll('.nav-dot');
    const pages = document.querySelectorAll('.page');
    
    // 点击导航点跳转
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            pages[index].scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // 监听滚动，更新导航点状态
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        
        pages.forEach((page, index) => {
            const pageTop = page.offsetTop;
            const pageBottom = pageTop + page.offsetHeight;
            
            if (scrollPosition >= pageTop && scrollPosition < pageBottom) {
                navDots.forEach(dot => dot.classList.remove('active'));
                navDots[index].classList.add('active');
            }
        });
    });
}

// 背景渐变
function initBackgroundGradient() {
    const body = document.body;
    
    window.addEventListener('scroll', () => {
        const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        
        // 根据滚动位置调整背景颜色
        if (scrollPercent < 0.2) {
            body.style.background = 'linear-gradient(180deg, #0a0e27, #1a0a2e)';
        } else if (scrollPercent < 0.4) {
            body.style.background = 'linear-gradient(180deg, #1a0a2e, #2d1b3d)';
        } else if (scrollPercent < 0.6) {
            body.style.background = 'linear-gradient(180deg, #2d1b3d, #3d1b2d)';
        } else if (scrollPercent < 0.8) {
            body.style.background = 'linear-gradient(180deg, #3d1b2d, #4a2b3d)';
        } else {
            body.style.background = 'linear-gradient(180deg, #4a2b3d, #5a3b4d)';
        }
    });
}

// 背景音乐
function initBGM() {
    const bgm = document.getElementById('bgm');
    const bgmToggle = document.getElementById('bgm-toggle');
    
    // 点击按钮切换音乐
    bgmToggle.addEventListener('click', () => {
        if (bgm.paused) {
            bgm.play();
            bgmToggle.textContent = '🔊';
        } else {
            bgm.pause();
            bgmToggle.textContent = '🔇';
        }
    });
    
    // 尝试自动播放（可能会被浏览器拦截）
    document.addEventListener('click', () => {
        if (bgm.paused) {
            bgm.play().catch(() => {
                // 自动播放被阻止，保持静音状态
            });
        }
    }, { once: true });
}

// 滚动动画
function initScrollAnimations() {
    // 使用 IntersectionObserver 控制各模块入场动画（基于视口位置，不依赖滚动事件）
    const createObserver = (selector, fromVars, toVars) => {
        const el = document.querySelector(selector);
        if (!el) return;
        gsap.set(el, fromVars);
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    gsap.to(el, { ...toVars, duration: toVars.duration || 1 });
                } else {
                    gsap.set(el, fromVars);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(el.closest('.page') || el);
    };
    
    // 问题魔瓶
    createObserver('.bottle', 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'back.out(1.7)' }
    );
    
    // 旅行地点
    createObserver('.memory-container',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
    );
    
    // 心动测试
    createObserver('.quiz-container',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
    );
    
    // 星空许愿
    createObserver('.wish-star',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' }
    );
    
    // 终章告白
    createObserver('.confession-text',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 }
    );
}

// 打字机效果
function typeWriter(element, text, speed = 80) {
    return new Promise((resolve) => {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                resolve();
            }
        }
        
        type();
    });
}

// 随机位置
function getRandomPosition(min, max) {
    return Math.random() * (max - min) + min;
}

// 检查元素是否在视口中
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}