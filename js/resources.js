// JavaScript для сторінки ресурсів

document.addEventListener('DOMContentLoaded', function() {
    // Перемикання між вкладками
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Видаляємо активний клас з усіх кнопок та панелей
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Додаємо активний клас до натиснутої кнопки
            this.classList.add('active');
            
            // Показуємо відповідну панель
            const tabId = this.dataset.tab;
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Анімація появи карток ресурсів
    const resourceCards = document.querySelectorAll('.resource-card');
    
    resourceCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('fade-in');
        }, index * 100);
    });
    
    // Додаємо стилі для анімації
    const style = document.createElement('style');
    style.textContent = `
        .resource-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .resource-card.fade-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Відкриття посилань у новій вкладці
    const externalLinks = document.querySelectorAll('.resource-link');
    
    externalLinks.forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });
});