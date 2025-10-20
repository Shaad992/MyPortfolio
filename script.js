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
});
