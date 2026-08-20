// ===== СЛАЙД-ШОУ =====
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;
let slideInterval;

// Показать слайд
function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
}

// Изменить слайд
function changeSlide(direction) {
    let newIndex = currentSlide + direction;
    if (newIndex >= totalSlides) newIndex = 0;
    if (newIndex < 0) newIndex = totalSlides - 1;
    showSlide(newIndex);
    resetInterval();
}

// Перейти к слайду
function goToSlide(index) {
    showSlide(index);
    resetInterval();
}

// Следующий слайд
function nextSlide() {
    changeSlide(1);
}

// Сбросить интервал
function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
}

// Запустить автоматическую смену слайдов
slideInterval = setInterval(nextSlide, 5000);

// Свайп для мобильных устройств
let touchStartX = 0;
let touchEndX = 0;
const slideshow = document.querySelector('.slideshow');

slideshow.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
}, {passive: true});

slideshow.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, {passive: true});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            changeSlide(1); // Свайп влево
        } else {
            changeSlide(-1); // Свайп вправо
        }
    }
}

// ===== ПЛАВНАЯ ПРОКРУТКА =====
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Плавная прокрутка для навигации
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        scrollToSection(targetId);
    });
});

// ===== ОТПРАВКА ФОРМЫ =====
function submitForm(event) {
    event.preventDefault();
    
    // Здесь можно добавить отправку данных на сервер
    alert('Спасибо! Ваша заявка принята.\n\nМы перезвоним вам в ближайшее время!');
    event.target.reset();
}

// ===== АНИМАЦИЯ ПРИ СКРОЛЛЕ =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Наблюдать за карточками услуг
document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// Наблюдать за статистикой
document.querySelectorAll('.stat-item').forEach(stat => {
    stat.style.opacity = '0';
    stat.style.transform = 'translateY(20px)';
    stat.style.transition = 'all 0.6s ease 0.2s';
    observer.observe(stat);
});

// ===== ЭФФЕКТ ДЛЯ ШАПКИ ПРИ СКРОЛЛЕ =====
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
    }
});

// ===== ИНИЦИАЛИЗАЦИЯ =====
console.log('🐺 Сайт грузчиков "Ну, погоди!" загружен');
console.log('📞 Телефон: +7 (843) 123-45-67');