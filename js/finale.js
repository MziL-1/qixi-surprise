// 终章告白模块
document.addEventListener('DOMContentLoaded', function() {
    initFinale();
});

function initFinale() {
    const confessionText = document.querySelector('.confession-text');
    const finaleButtons = document.querySelector('.finale-buttons');
    const primaryBtn = document.querySelector('.btn-primary');
    const secondaryBtn = document.querySelector('.btn-secondary');
    const fireworksCanvas = document.getElementById('fireworks-canvas');
    
    let escapeCount = 0;
    const maxEscapes = 3;
    
    // 告白文字内容
    const confessionContent = `从认识你的那天起，
我的世界就多了一种颜色。

我喜欢听你说话，
喜欢你笑的样子，
喜欢你认真做事时微微皱眉的样子。

我不知道未来会怎样，
但我知道，
我想和你一起走下去。

七夕快乐，
这是我为你准备的小世界。`;
    
    // 打字机效果
    setTimeout(() => {
        confessionText.classList.add('visible');
        typeWriter(confessionText, confessionContent, 80).then(() => {
            // 显示按钮
            finaleButtons.classList.add('visible');
        });
    }, 1000);
    
    // 主按钮点击 - 我也喜欢你
    primaryBtn.addEventListener('click', () => {
        celebrate();
    });
    
    // 次按钮点击 - 让我再想想
    secondaryBtn.addEventListener('click', () => {
        if (escapeCount < maxEscapes) {
            // 按钮逃跑
            escapeButton();
            escapeCount++;
        } else {
            // 最后变成"好啦好啦，我也喜欢你"
            secondaryBtn.textContent = '好啦好啦，我也喜欢你 ❤️';
            secondaryBtn.classList.remove('btn-secondary');
            secondaryBtn.classList.add('btn-primary');
            
            // 点击后庆祝
            secondaryBtn.addEventListener('click', () => {
                celebrate();
            }, { once: true });
        }
    });
    
    // 按钮逃跑
    function escapeButton() {
        const container = document.querySelector('.finale-container');
        const containerRect = container.getBoundingClientRect();
        
        // 随机位置
        const maxX = containerRect.width - secondaryBtn.offsetWidth;
        const maxY = containerRect.height - secondaryBtn.offsetHeight;
        
        const newX = Math.random() * maxX;
        const newY = Math.random() * maxY;
        
        gsap.to(secondaryBtn, {
            x: newX - containerRect.width / 2,
            y: newY - containerRect.height / 2,
            duration: 0.3,
            ease: 'power2.out'
        });
    }
    
    // 庆祝动画
    function celebrate() {
        // 隐藏按钮
        finaleButtons.classList.remove('visible');
        
        // 创建庆祝文字
        const celebrateText = document.createElement('div');
        celebrateText.className = 'celebrate-text';
        celebrateText.innerHTML = '那我们在一起吧！🎉';
        document.querySelector('.finale-container').appendChild(celebrateText);
        
        // 烟花动画
        createFireworks();
        
        // 爱心粒子
        createHeartExplosion();
        
        // 5秒后显示最终信息
        setTimeout(() => {
            celebrateText.remove();
            
            const finalText = document.createElement('div');
            finalText.className = 'celebrate-text';
            finalText.innerHTML = '❤️';
            finalText.style.fontSize = '100px';
            document.querySelector('.finale-container').appendChild(finalText);
            
            gsap.fromTo(finalText, 
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, duration: 1, ease: 'elastic.out(1, 0.3)' }
            );
        }, 5000);
    }
    
    // 创建烟花
    function createFireworks() {
        if (!fireworksCanvas) return;
        
        const ctx = fireworksCanvas.getContext('2d');
        fireworksCanvas.width = window.innerWidth;
        fireworksCanvas.height = window.innerHeight;
        
        const fireworks = [];
        const particles = [];
        
        // 颜色数组
        const colors = ['#e74c3c', '#f1c40f', '#3498db', '#2ecc71', '#9b59b6', '#e91e63'];
        
        // 创建烟花
        function createFirework() {
            const x = Math.random() * fireworksCanvas.width;
            const y = fireworksCanvas.height;
            const targetY = Math.random() * fireworksCanvas.height * 0.5;
            
            fireworks.push({
                x: x,
                y: y,
                targetY: targetY,
                speed: 5 + Math.random() * 3,
                color: colors[Math.floor(Math.random() * colors.length)]
            });
        }
        
        // 更新烟花
        function updateFireworks() {
            for (let i = fireworks.length - 1; i >= 0; i--) {
                const firework = fireworks[i];
                firework.y -= firework.speed;
                
                if (firework.y <= firework.targetY) {
                    // 爆炸
                    for (let j = 0; j < 50; j++) {
                        const angle = Math.random() * Math.PI * 2;
                        const speed = Math.random() * 5 + 2;
                        
                        particles.push({
                            x: firework.x,
                            y: firework.y,
                            speedX: Math.cos(angle) * speed,
                            speedY: Math.sin(angle) * speed,
                            color: firework.color,
                            alpha: 1,
                            size: 2
                        });
                    }
                    
                    fireworks.splice(i, 1);
                }
            }
        }
        
        // 更新粒子
        function updateParticles() {
            for (let i = particles.length - 1; i >= 0; i--) {
                const particle = particles[i];
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                particle.speedY += 0.1; // 重力
                particle.alpha -= 0.02;
                particle.size *= 0.98;
                
                if (particle.alpha <= 0) {
                    particles.splice(i, 1);
                }
            }
        }
        
        // 绘制
        function draw() {
            ctx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
            
            // 绘制烟花
            fireworks.forEach(firework => {
                ctx.beginPath();
                ctx.arc(firework.x, firework.y, 3, 0, Math.PI * 2);
                ctx.fillStyle = firework.color;
                ctx.fill();
            });
            
            // 绘制粒子
            particles.forEach(particle => {
                ctx.save();
                ctx.globalAlpha = particle.alpha;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.fill();
                ctx.restore();
            });
        }
        
        // 动画循环
        let fireworkCount = 0;
        const maxFireworks = 10;
        
        function animate() {
            if (fireworkCount < maxFireworks) {
                if (Math.random() < 0.1) {
                    createFirework();
                    fireworkCount++;
                }
            }
            
            updateFireworks();
            updateParticles();
            draw();
            
            if (fireworks.length > 0 || particles.length > 0 || fireworkCount < maxFireworks) {
                requestAnimationFrame(animate);
            }
        }
        
        animate();
    }
    
    // 爱心爆炸
    function createHeartExplosion() {
        const container = document.querySelector('.finale-container');
        const hearts = [];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.innerHTML = '❤️';
                heart.style.position = 'absolute';
                heart.style.left = '50%';
                heart.style.top = '50%';
                heart.style.fontSize = Math.random() * 30 + 10 + 'px';
                heart.style.pointerEvents = 'none';
                heart.style.zIndex = '100';
                heart.style.transform = 'translate(-50%, -50%)';
                
                container.appendChild(heart);
                hearts.push(heart);
                
                // 随机方向飞出
                const angle = Math.random() * Math.PI * 2;
                const distance = 200 + Math.random() * 300;
                const targetX = Math.cos(angle) * distance;
                const targetY = Math.sin(angle) * distance;
                
                gsap.to(heart, {
                    x: targetX,
                    y: targetY,
                    rotation: Math.random() * 360,
                    scale: 0,
                    opacity: 0,
                    duration: 2 + Math.random(),
                    ease: 'power2.out',
                    onComplete: () => heart.remove()
                });
            }, i * 50);
        }
    }
}