// JavaScript для сторінки практичних завдань

document.addEventListener('DOMContentLoaded', function() {
    // Фільтрація завдань за складністю
    const difficultyButtons = document.querySelectorAll('.difficulty-btn');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const practiceCards = document.querySelectorAll('.practice-card');
    
    let currentDifficulty = 'all';
    let currentCategory = 'all';
    
    // Функція для фільтрації завдань
    function filterPracticeCards() {
        practiceCards.forEach(card => {
            const cardDifficulty = card.dataset.difficulty;
            const cardCategories = card.dataset.category.split(' ');
            
            const matchesDifficulty = currentDifficulty === 'all' || cardDifficulty === currentDifficulty;
            const matchesCategory = currentCategory === 'all' || cardCategories.includes(currentCategory);
            
            if (matchesDifficulty && matchesCategory) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }
    
    // Обробники подій для кнопок фільтрації за складністю
    difficultyButtons.forEach(button => {
        button.addEventListener('click', function() {
            difficultyButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            currentDifficulty = this.dataset.difficulty;
            filterPracticeCards();
        });
    });
    
    // Обробники подій для кнопок фільтрації за категорією
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            currentCategory = this.dataset.category;
            filterPracticeCards();
        });
    });
    
    // Модальні вікна
    const modalCloseButtons = document.querySelectorAll('.modal-close');
    const taskModals = document.querySelectorAll('.task-modal');
    
    // Закриття модального вікна при кліку на кнопку закриття
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', function() {
            window.location.hash = '';
        });
    });
    
    // Закриття модального вікна при кліку поза його вмістом
    taskModals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                window.location.hash = '';
            }
        });
    });
    
    // Закриття модального вікна при натисканні клавіші Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && window.location.hash) {
            window.location.hash = '';
        }
    });
    
    // Обробка форм відправки завдань
    const submissionForms = document.querySelectorAll('.submission-form');
    
    submissionForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Тут буде код для обробки відправки форми
            alert('Дякуємо за відправку завдання! Ваша робота буде перевірена.');
            
            // Очищаємо форму
            this.reset();
            
            // Закриваємо модальне вікно
            setTimeout(() => {
                window.location.hash = '';
            }, 1000);
        });
    });
    
    // Інтерактивний редактор коду
    const editorTabs = document.querySelectorAll('.editor-tab');
    const editorPanes = document.querySelectorAll('.editor-pane');
    const htmlCode = document.getElementById('html-code');
    const cssCode = document.getElementById('css-code');
    const resultFrame = document.getElementById('result-frame');
    const runCodeBtn = document.getElementById('run-code');
    const resetCodeBtn = document.getElementById('reset-code');
    
    // Зберігаємо початковий код
    const initialHtmlCode = htmlCode.value;
    const initialCssCode = cssCode.value;
    
    // Перемикання між вкладками редактора
    editorTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            
            // Видаляємо активний клас з усіх вкладок і панелей
            editorTabs.forEach(t => t.classList.remove('active'));
            editorPanes.forEach(p => p.classList.remove('active'));
            
            // Додаємо активний клас до вибраної вкладки і панелі
            this.classList.add('active');
            document.getElementById(`${tabName}-editor`) || document.getElementById(`${tabName}-pane`).classList.add('active');
        });
    });
    
    // Функція для запуску коду
    function runCode() {
        const html = htmlCode.value;
        const css = cssCode.value;
        
        const resultDocument = resultFrame.contentDocument || resultFrame.contentWindow.document;
        resultDocument.open();
        resultDocument.write(`
            ${html}
            <style>${css}</style>
        `);
        resultDocument.close();
    }
    
    // Запускаємо код при натисканні кнопки
    runCodeBtn.addEventListener('click', runCode);
    
    // Скидаємо код до початкового стану
    resetCodeBtn.addEventListener('click', function() {
        htmlCode.value = initialHtmlCode;
        cssCode.value = initialCssCode;
        runCode();
    });
    
    // Запускаємо код при завантаженні сторінки
    runCode();
    
    // Анімація появи карток завдань при завантаженні сторінки
    practiceCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('fade-in');
        }, index * 100);
    });
    
    // Додаємо стилі для анімації
    const style = document.createElement('style');
    style.textContent = `
        .practice-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease, display 0.3s ease;
        }
        
        .practice-card.fade-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});