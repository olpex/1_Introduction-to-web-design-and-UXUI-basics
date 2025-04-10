// JavaScript для головної сторінки

document.addEventListener('DOMContentLoaded', function() {
    // Слайдер відгуків
    initTestimonialsSlider();
});

// Функція ініціалізації слайдера відгуків
function initTestimonialsSlider() {
    // Додаткові відгуки для слайдера
    const testimonials = [
        {
            content: "Цей курс допоміг мені зрозуміти основні принципи веб-дизайну та UX/UI. Особливо сподобалися практичні завдання, які дозволили одразу застосувати отримані знання.",
            name: "Олена Петренко",
            role: "Початківець у веб-дизайні",
            avatar: "images/testimonials/student1.svg"
        },
        {
            content: "Дуже структурований та зрозумілий матеріал. Завдяки цьому курсу я зміг швидко опанувати основи UX/UI дизайну та почати працювати над власними проектами.",
            name: "Максим Коваленко",
            role: "Фронтенд-розробник",
            avatar: "images/testimonials/student2.svg"
        },
        {
            content: "Найкращий ресурс для вивчення веб-дизайну українською мовою! Інтерактивні приклади та глосарій термінів дуже допомагають у навчанні.",
            name: "Анна Шевченко",
            role: "Графічний дизайнер",
            avatar: "images/testimonials/student3.svg"
        }
    ];

    let currentSlide = 0;
    const slider = document.querySelector('.testimonials-slider');
    const dots = document.querySelectorAll('.testimonial-dot');
    const prevBtn = document.querySelector('.testimonial-nav-btn:first-child');
    const nextBtn = document.querySelector('.testimonial-nav-btn:last-child');

    // Функція для відображення поточного слайду
    function showSlide(index) {
        // Створюємо HTML для поточного відгуку
        const testimonial = testimonials[index];
        const testimonialHTML = `
            <div class="testimonial-item">
                <p class="testimonial-content">${testimonial.content}</p>
                <div class="testimonial-author">
                    <div class="author-avatar">
                        <img src="${testimonial.avatar}" alt="Фото студента">
                    </div>
                    <div class="author-info">
                        <div class="author-name">${testimonial.name}</div>
                        <div class="author-role">${testimonial.role}</div>
                    </div>
                </div>
            </div>
        `;

        // Оновлюємо вміст слайдера з анімацією
        slider.style.opacity = 0;
        setTimeout(() => {
            slider.innerHTML = testimonialHTML;
            slider.style.opacity = 1;
        }, 300);

        // Оновлюємо активну точку
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        // Зберігаємо поточний індекс слайду
        currentSlide = index;
    }

    // Обробники подій для кнопок навігації
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            let prevSlide = currentSlide - 1;
            if (prevSlide < 0) prevSlide = testimonials.length - 1;
            showSlide(prevSlide);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            let nextSlide = currentSlide + 1;
            if (nextSlide >= testimonials.length) nextSlide = 0;
            showSlide(nextSlide);
        });
    }

    // Обробники подій для точок навігації
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
        });
    });

    // Автоматична зміна слайдів кожні 5 секунд
    setInterval(function() {
        let nextSlide = currentSlide + 1;
        if (nextSlide >= testimonials.length) nextSlide = 0;
        showSlide(nextSlide);
    }, 5000);
}