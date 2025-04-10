// JavaScript для сторінки теорії

document.addEventListener('DOMContentLoaded', function() {
    // Ініціалізація змінних для відстеження прогресу
    let completedTopics = JSON.parse(localStorage.getItem('completedTopics')) || [];
    const topicLinks = document.querySelectorAll('.topic-list a');
    const moduleLinks = document.querySelectorAll('.module-list > li > a');
    const progressBar = document.querySelector('.progress');
    const progressText = document.querySelector('.progress-tracker p');
    let currentProgress = 0;
    
    // Обробка кліків на кнопки розгортання/згортання модулів
    const toggleButtons = document.querySelectorAll('.btn-toggle-module');
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const moduleContent = this.closest('.module-section').querySelector('.module-content');
            moduleContent.classList.toggle('collapsed');
            
            // Зміна іконки
            const icon = this.querySelector('i');
            if (moduleContent.classList.contains('collapsed')) {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
                this.setAttribute('aria-label', 'Розгорнути модуль');
            } else {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
                this.setAttribute('aria-label', 'Згорнути модуль');
            }
        });
    });
    
    // Обробка кліків на кнопки "Позначити як прочитане"
    const completeButtons = document.querySelectorAll('.btn-check-complete');
    completeButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('completed');
            if (this.classList.contains('completed')) {
                this.textContent = 'Прочитано ✓';
                // Тут можна додати код для збереження прогресу
            } else {
                this.textContent = 'Позначити як прочитане';
            }
        });
    });
    
    // Обробка кліків на кнопку "Почати тест"
    const quizButtons = document.querySelectorAll('.btn-start-quiz');
    quizButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('Функціонал тестування знаходиться в розробці.');
        });
    });
    
    // Обробники подій для кнопок "Позначити як прочитане"
    completeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const topic = this.closest('.topic');
            const topicId = topic.id;
            
            if (!completedTopics.includes(topicId)) {
                completedTopics.push(topicId);
                localStorage.setItem('completedTopics', JSON.stringify(completedTopics));
                
                // Оновлюємо стилі та прогрес
                this.textContent = 'Прочитано ✓';
                this.classList.add('completed');
                updateProgress();
                highlightCompletedTopics();
                
                // Перевіряємо, чи всі теми модуля прочитані
                checkModuleCompletion(topicId);
            }
        });
        
        // Перевіряємо, чи тема вже позначена як прочитана
        const topic = button.closest('.topic');
        if (topic && completedTopics.includes(topic.id)) {
            button.textContent = 'Прочитано ✓';
            button.classList.add('completed');
        }
    });
    
    // Плавний скролінг до тем при кліку на посилання
    topicLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Розгортаємо модуль, якщо він згорнутий
                const moduleSection = targetElement.closest('.module-section');
                const moduleContent = moduleSection.querySelector('.module-content');
                
                if (moduleContent.classList.contains('collapsed')) {
                    moduleContent.classList.remove('collapsed');
                    const toggle = moduleSection.querySelector('.btn-toggle-module');
                    const icon = toggle.querySelector('i');
                    icon.classList.remove('fa-chevron-down');
                    icon.classList.add('fa-chevron-up');
                    toggle.setAttribute('aria-label', 'Згорнути модуль');
                }
                
                // Скролінг до теми
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Підсвічуємо активне посилання
                topicLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Плавний скролінг до модулів
    moduleLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Скролінг до модуля
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Підсвічуємо активне посилання
                moduleLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Кнопка початку тесту
    const startQuizButton = document.querySelector('.btn-start-quiz');
    if (startQuizButton) {
        startQuizButton.addEventListener('click', function() {
            // Перевіряємо, чи всі теми модуля прочитані
            const moduleSection = this.closest('.module-section');
            const moduleId = moduleSection.id;
            const topics = moduleSection.querySelectorAll('.topic');
            let allTopicsCompleted = true;
            
            topics.forEach(topic => {
                if (!completedTopics.includes(topic.id)) {
                    allTopicsCompleted = false;
                }
            });
            
            if (allTopicsCompleted) {
                // Відкриваємо модальне вікно з тестом
                showQuizModal(moduleId);
            } else {
                alert('Будь ласка, прочитайте всі теми модуля перед проходженням тесту.');
            }
        });
    }
    
    // Функція для оновлення прогресу
    function updateProgress() {
        const totalTopics = document.querySelectorAll('.topic').length;
        currentProgress = (completedTopics.length / totalTopics) * 100;
        
        progressBar.style.width = currentProgress + '%';
        progressText.textContent = Math.round(currentProgress) + '% завершено';
    }
    
    // Функція для підсвічування прочитаних тем у навігації
    function highlightCompletedTopics() {
        topicLinks.forEach(link => {
            const topicId = link.getAttribute('href').substring(1);
            if (completedTopics.includes(topicId)) {
                link.classList.add('completed');
            }
        });
    }
    
    // Функція для перевірки завершення модуля
    function checkModuleCompletion(topicId) {
        // Визначаємо, до якого модуля належить тема
        const moduleId = topicId.split('-')[0].replace('topic', 'module');
        const moduleSection = document.getElementById(moduleId);
        
        if (moduleSection) {
            const topics = moduleSection.querySelectorAll('.topic');
            let allTopicsCompleted = true;
            
            topics.forEach(topic => {
                if (!completedTopics.includes(topic.id)) {
                    allTopicsCompleted = false;
                }
            });
            
            if (allTopicsCompleted) {
                // Розблоковуємо наступний модуль
                const nextModuleId = 'module' + (parseInt(moduleId.replace('module', '')) + 1);
                const nextModule = document.getElementById(nextModuleId);
                
                if (nextModule) {
                    const moduleContent = nextModule.querySelector('.module-content');
                    const lockedMessage = moduleContent.querySelector('.module-locked-message');
                    
                    if (lockedMessage) {
                        lockedMessage.remove();
                    }
                    
                    // Додаємо повідомлення про розблокування
                    const unlockedMessage = document.createElement('div');
                    unlockedMessage.className = 'module-unlocked-message';
                    unlockedMessage.textContent = 'Модуль розблоковано! Натисніть, щоб розгорнути.';
                    moduleContent.appendChild(unlockedMessage);
                }
            }
        }
    }
    
    // Функція для відображення модального вікна з тестом
    function showQuizModal(moduleId) {
        // Створюємо модальне вікно
        const modal = document.createElement('div');
        modal.className = 'quiz-modal';
        
        // Визначаємо питання для тесту залежно від модуля
        let quizQuestions = [];
        
        if (moduleId === 'module1') {
            quizQuestions = [
                {
                    question: 'Що з перерахованого НЕ є компонентом веб-дизайну?',
                    options: [
                        'Візуальний дизайн',
                        'Інтерфейс користувача (UI)',
                        'Серверне програмування',
                        'Досвід користувача (UX)'
                    ],
                    correctAnswer: 2
                },
                {
                    question: 'Хто створив першу версію HTML та Всесвітню павутину?',
                    options: [
                        'Стів Джобс',
                        'Тім Бернерс-Лі',
                        'Білл Гейтс',
                        'Марк Цукерберг'
                    ],
                    correctAnswer: 1
                },
                {
                    question: 'Який з наведених трендів НЕ є актуальним у сучасному веб-дизайні?',
                    options: [
                        'Мінімалізм',
                        'Використання Flash-анімацій',
                        'Темні теми',
                        'Мікровзаємодії'
                    ],
                    correctAnswer: 1
                },
                {
                    question: 'Що використовували веб-дизайнери для створення макетів сторінок до появи CSS?',
                    options: [
                        'JavaScript',
                        'Таблиці',
                        'Фрейми',
                        'Обидва B і C'
                    ],
                    correctAnswer: 3
                },
                {
                    question: 'Яка цитата належить Стіву Джобсу?',
                    options: [
                        '"Дизайн — це не те, як щось виглядає. Дизайн — це те, як щось працює."',
                        '"Простота — найвища форма складності."',
                        '"Хороший дизайн очевидний. Великий дизайн прозорий."',
                        '"Дизайн — це не лише те, як щось виглядає і відчувається. Дизайн — це те, як щось працює."'
                    ],
                    correctAnswer: 0
                }
            ];
        }
        
        // Створюємо вміст модального вікна
        let currentQuestionIndex = 0;
        let correctAnswers = 0;
        
        function renderQuestion() {
            const question = quizQuestions[currentQuestionIndex];
            
            modal.innerHTML = `
                <div class="quiz-container">
                    <div class="quiz-header">
                        <h3>Тест: ${moduleId.replace('module', 'Модуль ')}</h3>
                        <span class="quiz-progress">Питання ${currentQuestionIndex + 1} з ${quizQuestions.length}</span>
                        <button class="quiz-close-btn">&times;</button>
                    </div>
                    <div class="quiz-content">
                        <div class="quiz-question">
                            <p>${question.question}</p>
                        </div>
                        <div class="quiz-options">
                            ${question.options.map((option, index) => `
                                <div class="quiz-option">
                                    <input type="radio" name="answer" id="option${index}" value="${index}">
                                    <label for="option${index}">${option}</label>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="quiz-footer">
                        <button class="btn btn-primary quiz-submit-btn">Відповісти</button>
                    </div>
                </div>
            `;
            
            // Додаємо обробники подій
            modal.querySelector('.quiz-close-btn').addEventListener('click', function() {
                document.body.removeChild(modal);
            });
            
            modal.querySelector('.quiz-submit-btn').addEventListener('click', function() {
                const selectedOption = modal.querySelector('input[name="answer"]:checked');
                
                if (selectedOption) {
                    const selectedAnswer = parseInt(selectedOption.value);
                    const isCorrect = selectedAnswer === question.correctAnswer;
                    
                    if (isCorrect) {
                        correctAnswers++;
                    }
                    
                    // Показуємо результат відповіді
                    showAnswerResult(isCorrect, question.correctAnswer);
                } else {
                    alert('Будь ласка, виберіть відповідь.');
                }
            });
        }
        
        function showAnswerResult(isCorrect, correctAnswer) {
            const options = modal.querySelectorAll('.quiz-option');
            
            options.forEach((option, index) => {
                const input = option.querySelector('input');
                const label = option.querySelector('label');
                
                input.disabled = true;
                
                if (index === correctAnswer) {
                    option.classList.add('correct-answer');
                } else if (input.checked && index !== correctAnswer) {
                    option.classList.add('wrong-answer');
                }
            });
            
            const submitBtn = modal.querySelector('.quiz-submit-btn');
            submitBtn.textContent = currentQuestionIndex < quizQuestions.length - 1 ? 'Наступне питання' : 'Завершити тест';
            
            submitBtn.removeEventListener('click', submitBtn.clickHandler);
            submitBtn.addEventListener('click', function() {
                currentQuestionIndex++;
                
                if (currentQuestionIndex < quizQuestions.length) {
                    renderQuestion();
                } else {
                    showQuizResults();
                }
            });
        }
        
        function showQuizResults() {
            const percentage = (correctAnswers / quizQuestions.length) * 100;
            let resultMessage = '';
            
            if (percentage >= 80) {
                resultMessage = 'Відмінно! Ви чудово засвоїли матеріал.';
            } else if (percentage >= 60) {
                resultMessage = 'Добре! Ви засвоїли основні концепції.';
            } else {
                resultMessage = 'Варто повторити матеріал і спробувати ще раз.';
            }
            
            modal.innerHTML = `
                <div class="quiz-container">
                    <div class="quiz-header">
                        <h3>Результати тесту</h3>
                        <button class="quiz-close-btn">&times;</button>
                    </div>
                    <div class="quiz-content results">
                        <div class="result-score">
                            <div class="score-circle">
                                <span>${correctAnswers}/${quizQuestions.length}</span>
                            </div>
                            <p>${Math.round(percentage)}%</p>
                        </div>
                        <p class="result-message">${resultMessage}</p>
                    </div>
                    <div class="quiz-footer">
                        <button class="btn btn-primary quiz-close-results-btn">Закрити</button>
                    </div>
                </div>
            `;
            
            modal.querySelector('.quiz-close-btn').addEventListener('click', function() {
                document.body.removeChild(modal);
            });
            
            modal.querySelector('.quiz-close-results-btn').addEventListener('click', function() {
                document.body.removeChild(modal);
            });
        }
        
        // Додаємо стилі для модального вікна
        const style = document.createElement('style');
        style.textContent = `
            .quiz-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1001;
            }
            
            .quiz-container {
                background-color: white;
                border-radius: var(--border-radius);
                width: 90%;
                max-width: 600px;
                box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
                overflow: hidden;
            }
            
            .quiz-header {
                background-color: var(--primary-color);
                color: white;
                padding: 15px 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .quiz-header h3 {
                margin: 0;
                color: white;
            }
            
            .quiz-progress {
                font-size: 0.9rem;
            }
            
            .quiz-close-btn {
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
            }
            
            .quiz-content {
                padding: 30px;
            }
            
            .quiz-question p {
                font-size: 1.1rem;
                font-weight: 600;
                margin-bottom: 20px;
            }
            
            .quiz-options {
                display: flex;
                flex-direction: column;
                gap: 15px;
            }
            
            .quiz-option {
                padding: 15px;
                border: 1px solid var(--gray-300);
                border-radius: var(--border-radius);
                cursor: pointer;
                transition: all 0.2s ease;
            }
            
            .quiz-option:hover {
                background-color: var(--gray-100);
            }
            
            .quiz-option input {
                margin-right: 10px;
            }
            
            .correct-answer {
                background-color: rgba(40, 167, 69, 0.1);
                border-color: #28a745;
            }
            
            .wrong-answer {
                background-color: rgba(220, 53, 69, 0.1);
                border-color: #dc3545;
            }
            
            .quiz-footer {
                padding: 15px 20px;
                border-top: 1px solid var(--gray-300);
                text-align: right;
            }
            
            .results {
                text-align: center;
            }
            
            .result-score {
                margin-bottom: 20px;
            }
            
            .score-circle {
                width: 100px;
                height: 100px;
                border-radius: 50%;
                background-color: var(--primary-color);
                color: white;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 1.5rem;
                font-weight: 700;
                margin: 0 auto 10px;
            }
            
            .result-message {
                font-size: 1.1rem;
                font-weight: 600;
                margin-top: 20px;
            }
        `;
        
        document.head.appendChild(style);
        
        // Додаємо модальне вікно до body і відображаємо перше питання
        document.body.appendChild(modal);
        renderQuestion();
    }
});