// JavaScript для сторінки прикладів

document.addEventListener('DOMContentLoaded', function() {
    // Фільтрація прикладів
    const filterButtons = document.querySelectorAll('.filter-btn');
    const exampleCards = document.querySelectorAll('.example-card');
    
    // Функція для фільтрації прикладів
    function filterExamples(category) {
        exampleCards.forEach(card => {
            const cardCategories = card.dataset.category.split(' ');
            
            if (category === 'all' || cardCategories.includes(category)) {
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
    
    // Обробники подій для кнопок фільтрації
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Видаляємо активний клас з усіх кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Додаємо активний клас до натиснутої кнопки
            this.classList.add('active');
            
            // Фільтруємо приклади за категорією
            const category = this.dataset.filter;
            filterExamples(category);
        });
    });
    
    // Модальні вікна
    const modalCloseButtons = document.querySelectorAll('.modal-close');
    const modals = document.querySelectorAll('.example-modal');
    
    // Закриття модального вікна при кліку на кнопку закриття
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.example-modal');
            window.location.hash = '';
        });
    });
    
    // Закриття модального вікна при кліку поза його вмістом
    modals.forEach(modal => {
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
    
    // Анімація появи карток прикладів при завантаженні сторінки
    exampleCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('fade-in');
        }, index * 100);
    });
    
    // Додаємо стилі для анімації
    const style = document.createElement('style');
    style.textContent = `
        .example-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease, display 0.3s ease;
        }
        
        .example-card.fade-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});