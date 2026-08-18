// 默契测试模块
document.addEventListener('DOMContentLoaded', function() {
    initQuiz();
});

function initQuiz() {
    const questions = document.querySelectorAll('.quiz-question');
    const options = document.querySelectorAll('.option');
    const progressBar = document.querySelector('.progress-bar');
    const resultText = document.querySelector('.result-text');
    const resultLevel = document.querySelector('.result-level');
    const resultDesc = document.querySelector('.result-desc');
    const quizResult = document.querySelector('.quiz-result');
    
    let currentQuestion = 0;
    let correctCount = 0;
    const totalQuestions = questions.length;
    
    // 预设答案（你的答案）：C, C, C（索引2）
    const myAnswers = [2, 2, 2];
    
    // 默契等级配置
    const levels = [
        { min: 3, level: '心有灵犀', desc: '嘿嘿，咱俩选的一毛一样，很有默契了 ✨' },
        { min: 2, level: '默契十足', desc: '简直了，跟我想的差不多 💫' },
        { min: 1, level: '有点默契', desc: '有点默契 还能更有默契一点 🌙' },
        { min: 0, level: '零默契', desc: '没一样的，哈哈，有趣 🌟' }
    ];
    
    // 初始化
    updateProgress();
    
    // 选项点击事件
    options.forEach((option, index) => {
        option.addEventListener('click', () => {
            // 获取当前题目和选项索引
            const questionIndex = Math.floor(index / 4);
            const optionIndex = index % 4;
            
            // 对比答案
            if (optionIndex === myAnswers[questionIndex]) {
                correctCount++;
            }
            
            // 选中效果
            option.classList.add('selected');
            
            // 其他选项淡出
            const currentOptions = option.parentElement.querySelectorAll('.option');
            currentOptions.forEach((opt, i) => {
                if (i !== optionIndex) {
                    opt.classList.add('unselected');
                }
            });
            
            // 切换到下一题
            setTimeout(() => {
                currentQuestion++;
                
                if (currentQuestion < totalQuestions) {
                    // 隐藏当前题目
                    questions[currentQuestion - 1].classList.remove('active');
                    questions[currentQuestion - 1].classList.add('exit-left');
                    
                    // 显示下一题
                    questions[currentQuestion].classList.add('active');
                    
                    // 更新进度条
                    updateProgress();
                } else {
                    // 显示结果
                    showResult();
                }
            }, 800);
        });
    });
    
    // 更新进度条
    function updateProgress() {
        const progress = (currentQuestion / totalQuestions) * 100;
        progressBar.style.width = `${progress}%`;
    }
    
    // 显示结果
    function showResult() {
        // 隐藏所有题目
        questions.forEach(q => q.classList.remove('active'));
        
        // 根据正确数确定等级
        let result = levels[3]; // 默认零默契
        for (const level of levels) {
            if (correctCount >= level.min) {
                result = level;
                break;
            }
        }
        
        // 更新结果内容
        resultLevel.textContent = result.level;
        resultDesc.textContent = result.desc;
        
        // 显示结果
        setTimeout(() => {
            quizResult.classList.add('active');
        }, 500);
    }
}