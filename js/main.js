// Основний JavaScript файл для проекту "Вступ до веб-дизайну та основи UX/UI"

document.addEventListener('DOMContentLoaded', function() {
    // Мобільне меню
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (mobileMenuToggle && navList) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navList.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Плавний скролінг для якірних посилань
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Закриваємо мобільне меню, якщо воно відкрите
                if (mobileMenuToggle && mobileMenuToggle.classList.contains('active')) {
                    mobileMenuToggle.classList.remove('active');
                    navList.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
                
                // Скролінг до елемента з урахуванням висоти шапки
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Анімація елементів при скролінгу
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.overview-card, .path-step, .feature-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight * 0.9) {
                element.classList.add('fade-in');
            }
        });
    };
    
    // Запускаємо анімацію при завантаженні сторінки
    animateOnScroll();
    
    // Запускаємо анімацію при скролінгу
    window.addEventListener('scroll', animateOnScroll);
    
    // Фіксована шапка з тінню при скролінгу
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.main-header');
        
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});