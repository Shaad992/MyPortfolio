document.addEventListener('DOMContentLoaded', function() {

    const navButtons = document.querySelectorAll('.nav-button');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.toLowerCase();
            
            switch(buttonText) {
                case 'skill':
                    const skillsSection = document.getElementById('skills-section');
                    skillsSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                    break;
                case 'project':
                    window.location.href = 'project.html';
                    break;
                case 'contact us':
                    window.location.href = 'contact.html';
                    break;
                case 'about us':
                    window.location.href = 'about.html';
                    break;
                default:
                    console.log('Button clicked: ' + buttonText);
            }
        });
    });
    
    navButtons.forEach(button => {
        button.addEventListener('focus', function() {
            this.style.outline = '2px solid #ffd700';
            this.style.outlineOffset = '2px';
        });
        
        button.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });

    const contactForm = document.querySelector('.contact-form');
    const successMessage = document.querySelector('.success-message');

    if (contactForm && successMessage) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
           const formData = new FormData(this);
            
            
            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    
                    contactForm.style.display = 'none';
                    successMessage.style.display = 'block';
                    
    
                    contactForm.reset();
                    
              setTimeout(() => {
                        contactForm.style.display = 'block';
                        successMessage.style.display = 'none';
                    }, 5000);
                } else {
                    alert('There was an error sending your message. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error sending your message. Please try again.');
            })
            .finally(() => {
               submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }
    
    initTypingAnimation();
    initVisitorCounter();
    initBackToTop();
    enhanceFormSubmission();
});

function initTypingAnimation() {
    const typingElement = document.getElementById('typing-text');
    const cursorElement = document.querySelector('.typing-cursor');
    
    if (!typingElement) return;
    
    const texts = [
        "Naushad Ahmad",
        "Web Developer", 
        "Problem Solver",
        "Mobile Coder"
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
        
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
        
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {

            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }
        
        setTimeout(type, typingSpeed);
    }
    
    setTimeout(type, 1000);
}

function initVisitorCounter() {
    const counterElement = document.getElementById('visit-count');
    
    if (!counterElement) return;
    
    let count = localStorage.getItem('visitorCount');
    
    if (!count) {
    
        count = Math.floor(Math.random() * 40) + 80;
    } else {
        count = parseInt(count);
    }
    
    
    count++;
    localStorage.setItem('visitorCount', count.toString());
    
    
    animateCounter(counterElement, count);
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toString().padStart(2, '0');
    }, 30);
}


function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
   backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function enhanceFormSubmission() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
    
        const inputs = contactForm.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                if (this.value.trim() !== '') {
                    this.classList.add('has-value');
                } else {
                    this.classList.remove('has-value');
                }
            });
            
            if (input.value.trim() !== '') {
                input.classList.add('has-value');
            }
        });
    }
}
