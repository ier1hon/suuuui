document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            navLinks.classList.remove('active');
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    const trailerBtn = document.querySelector('.trailer-btn');
    const modal = document.querySelector('.modal');
    const closeModal = document.querySelector('.close-modal');
    
    trailerBtn.addEventListener('click', function() {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
    
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    const snowfall = document.querySelector('.snowfall');
    const snowflakeCount = 100;
    
    for (let i = 0; i < snowflakeCount; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        
        const size = Math.random() * 5 + 2;
        const posX = Math.random() * window.innerWidth;
        const delay = Math.random() * 5;
        const duration = Math.random() * 5 + 5;
        const opacity = Math.random() * 0.5 + 0.5;
        
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        snowflake.style.left = `${posX}px`;
        snowflake.style.animationDelay = `${delay}s`;
        snowflake.style.animationDuration = `${duration}s`;
        snowflake.style.opacity = opacity;
        
        snowfall.appendChild(snowflake);
    }
    
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.about-content, .character-card, .philosophy-item, .gallery-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); 
    
    document.querySelectorAll('.character-card').forEach(card => {
        card.addEventListener('click', function() {
            const characterName = this.getAttribute('data-character');
            const modal = document.getElementById(`${characterName}-modal`);
            
            if (modal) {
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    document.querySelectorAll('.close-character-modal').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            this.closest('.character-modal').style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });

    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('character-modal')) {
            e.target.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    const scrollQuote = document.querySelector('.scroll-quote');
    if (scrollQuote) {
        scrollQuote.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    document.querySelectorAll('.season-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2 + 0.3}s`;
    });
});

document.querySelectorAll('.map-marker').forEach(marker => {
    marker.addEventListener('click', function() {
        const location = this.getAttribute('data-location');
        alert(`Вы выбрали: ${location}\n${this.querySelector('.marker-tooltip').textContent}`);
    });
});


document.querySelectorAll('.star').forEach(star => {
    star.addEventListener('click', function() {
        const rating = this.getAttribute('data-rating');
        const stars = document.querySelectorAll('.star');
        
        stars.forEach((s, index) => {
            if (index < rating) {
                s.classList.add('active');
            } else {
                s.classList.remove('active');
            }
        });
        
        console.log(`Оценка: ${rating}/5`);
    });
});

document.querySelector('.feedback-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = this.querySelector('.form-input').value;
    const feedback = this.querySelector('.form-textarea').value;
    const rating = document.querySelectorAll('.star.active').length;
    
    if (name && feedback && rating > 0) {
        alert(`Спасибо, ${name}! Ваш отзыв сохранён. Оценка: ${rating}/5`);
        this.reset();
        document.querySelectorAll('.star').forEach(star => {
            star.classList.remove('active');
        });
    } else {
        alert('Пожалуйста, заполните все поля и поставьте оценку!');
    }
});