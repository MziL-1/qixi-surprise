// 粒子系统
class ParticleSystem {
    constructor(canvasId, options = {}) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.options = {
            particleCount: options.particleCount || 100,
            color: options.color || 'white',
            size: options.size || 2,
            speed: options.speed || 0.5,
            twinkle: options.twinkle !== false,
            meteor: options.meteor !== false,
            ...options
        };
        
        this.resize();
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    init() {
        this.particles = [];
        for (let i = 0; i < this.options.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * this.options.size + 1,
                speedX: (Math.random() - 0.5) * this.options.speed,
                speedY: (Math.random() - 0.5) * this.options.speed,
                alpha: Math.random(),
                alphaSpeed: (Math.random() - 0.5) * 0.02,
                color: this.options.color
            });
        }
    }
    
    drawParticle(particle) {
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(255, 255, 255, ${particle.alpha})`;
        this.ctx.fill();
    }
    
    updateParticle(particle) {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // 边界检测
        if (particle.x < 0) particle.x = this.canvas.width;
        if (particle.x > this.canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = this.canvas.height;
        if (particle.y > this.canvas.height) particle.y = 0;
        
        // 闪烁效果
        if (this.options.twinkle) {
            particle.alpha += particle.alphaSpeed;
            if (particle.alpha <= 0 || particle.alpha >= 1) {
                particle.alphaSpeed = -particle.alphaSpeed;
            }
        }
    }
    
    drawMeteor() {
        if (!this.options.meteor) return;
        
        // 随机创建流星
        if (Math.random() < 0.01) {
            const startX = Math.random() * this.canvas.width;
            const startY = Math.random() * this.canvas.height * 0.5;
            
            this.ctx.beginPath();
            this.ctx.moveTo(startX, startY);
            this.ctx.lineTo(startX + 100, startY + 100);
            this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
            
            // 流星拖尾
            for (let i = 0; i < 10; i++) {
                this.ctx.beginPath();
                this.ctx.arc(startX - i * 10, startY - i * 10, 1, 0, Math.PI * 2);
                this.ctx.fillStyle = `rgba(255, 255, 255, ${0.8 - i * 0.08})`;
                this.ctx.fill();
            }
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 绘制粒子
        this.particles.forEach(particle => {
            this.updateParticle(particle);
            this.drawParticle(particle);
        });
        
        // 绘制流星
        this.drawMeteor();
        
        requestAnimationFrame(() => this.animate());
    }
}

// 初始化星空粒子系统
document.addEventListener('DOMContentLoaded', function() {
    // 第一屏星空
    const starCanvas = document.getElementById('star-canvas');
    if (starCanvas) {
        new ParticleSystem('star-canvas', {
            particleCount: 100,
            size: 1.5,
            speed: 0.3,
            twinkle: true,
            meteor: true
        });
    }
    
    // 第五屏星空
    const starryCanvas = document.getElementById('starry-canvas');
    if (starryCanvas) {
        new ParticleSystem('starry-canvas', {
            particleCount: 150,
            size: 2,
            speed: 0.2,
            twinkle: true,
            meteor: true
        });
    }
});

// 爱心粒子系统
class HeartParticle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 10 + 5;
        this.speedX = (Math.random() - 0.5) * 5;
        this.speedY = (Math.random() - 0.5) * 5;
        this.gravity = 0.1;
        this.alpha = 1;
        this.color = `hsl(${Math.random() * 60 + 330}, 100%, 50%)`;
    }
    
    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        
        // 绘制心形
        const topCurveHeight = this.size * 0.3;
        ctx.moveTo(this.x, this.y + topCurveHeight);
        
        // 左曲线
        ctx.bezierCurveTo(
            this.x, this.y,
            this.x - this.size / 2, this.y,
            this.x - this.size / 2, this.y + topCurveHeight
        );
        
        // 左下
        ctx.bezierCurveTo(
            this.x - this.size / 2, this.y + (this.size + topCurveHeight) / 2,
            this.x, this.y + (this.size + topCurveHeight) / 1.5,
            this.x, this.y + this.size
        );
        
        // 右下
        ctx.bezierCurveTo(
            this.x, this.y + (this.size + topCurveHeight) / 1.5,
            this.x + this.size / 2, this.y + (this.size + topCurveHeight) / 2,
            this.x + this.size / 2, this.y + topCurveHeight
        );
        
        // 右曲线
        ctx.bezierCurveTo(
            this.x + this.size / 2, this.y,
            this.x, this.y,
            this.x, this.y + topCurveHeight
        );
        
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
    
    update() {
        this.speedY += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= 0.01;
    }
}

// 烟花粒子系统
class FireworkParticle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = Math.random() * 3 + 1;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 2;
        this.speedX = Math.cos(angle) * speed;
        this.speedY = Math.sin(angle) * speed;
        this.alpha = 1;
        this.gravity = 0.05;
        this.friction = 0.99;
    }
    
    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
    
    update() {
        this.speedX *= this.friction;
        this.speedY *= this.friction;
        this.speedY += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= 0.015;
    }
}