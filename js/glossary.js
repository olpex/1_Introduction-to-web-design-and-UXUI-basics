// JavaScript для сторінки глосарію

document.addEventListener('DOMContentLoaded', function() {
    // Елементи інтерфейсу
    const searchInput = document.getElementById('glossary-search-input');
    const alphabetButtons = document.querySelectorAll('.alphabet-btn');
    const glossaryTerms = document.querySelectorAll('.glossary-term');
    const glossarySections = document.querySelectorAll('.glossary-section');
    
    // Функція пошуку термінів
    function searchTerms(query) {
        const normalizedQuery = query.toLowerCase().trim();
        
        // Якщо пошуковий запит порожній, показуємо всі терміни
        if (normalizedQuery === '') {
            glossaryTerms.forEach(term => {
                term.style.display = 'block';
            });
            
            glossarySections.forEach(section => {
                section.style.display = 'block';
            });
            
            // Активуємо кнопку "Всі"
            alphabetButtons.forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('data-letter') === 'all') {
                    btn.classList.add('active');
                }
            });
            
            return;
        }
        
        // Приховуємо всі секції спочатку
        glossarySections.forEach(section => {
            section.style.display = 'none';
        });
        
        // Шукаємо терміни, що відповідають запиту
        let foundTerms = false;
        
        glossaryTerms.forEach(term => {
            const termTitle = term.querySelector('.term-title').textContent.toLowerCase();
            const termContent = term.querySelector('.term-content').textContent.toLowerCase();
            
            if (termTitle.includes(normalizedQuery) || termContent.includes(normalizedQuery)) {
                term.style.display = 'block';
                term.closest('.glossary-section').style.display = 'block';
                foundTerms = true;
            } else {
                term.style.display = 'none';
            }
        });
        
        // Деактивуємо всі кнопки алфавіту при пошуку
        alphabetButtons.forEach(btn => {
            btn.classList.remove('active');
        });
    }
    
    // Функція фільтрації за літерою
    function filterByLetter(letter) {
        // Очищаємо поле пошуку
        searchInput.value = '';
        
        if (letter === 'all') {
            // Показуємо всі терміни
            glossaryTerms.forEach(term => {
                term.style.display = 'block';
            });
            
            glossarySections.forEach(section => {
                section.style.display = 'block';
            });
        } else {
            // Показуємо тільки терміни, що починаються з вибраної літери
            glossarySections.forEach(section => {
                const sectionLetter = section.id.split('-')[1];
                
                if (sectionLetter === letter) {
                    section.style.display = 'block';
                    section.querySelectorAll('.glossary-term').forEach(term => {
                        term.style.display = 'block';
                    });
                } else {
                    section.style.display = 'none';
                }
            });
        }
    }
    
    // Обробник події для поля пошуку
    searchInput.addEventListener('input', function() {
        searchTerms(this.value);
    });
    
    // Обробник події для кнопок алфавіту
    alphabetButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Знімаємо активний клас з усіх кнопок
            alphabetButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Додаємо активний клас до натиснутої кнопки
            this.classList.add('active');
            
            // Фільтруємо терміни за вибраною літерою
            filterByLetter(this.getAttribute('data-letter'));
        });
    });
    
    // Додаємо функціональність для якірних посилань
    document.querySelectorAll('.term-title').forEach(title => {
        title.addEventListener('click', function() {
            const termId = this.parentElement.id;
            window.location.hash = termId;
        });
    });
    
    // Перевіряємо, чи є хеш в URL при завантаженні сторінки
    if (window.location.hash) {
        const targetTerm = document.querySelector(window.location.hash);
        if (targetTerm) {
            // Прокручуємо до терміну з невеликою затримкою
            setTimeout(() => {
                targetTerm.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                // Додаємо ефект підсвічування
                targetTerm.classList.add('highlight');
                setTimeout(() => {
                    targetTerm.classList.remove('highlight');
                }, 2000);
            }, 500);
        }
    }
});