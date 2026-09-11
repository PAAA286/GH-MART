// Contact page interactions and animations
document.addEventListener('DOMContentLoaded', function() {
    console.log('Contact page loaded');
    
    // Initialize contact page
    initContactPage();
    
    // Setup form validation and submission
    setupContactForm();
    
    // Add interactive elements
    setupInteractiveElements();
    
    // Setup scroll animations
    setupScrollAnimations();
});

function initContactPage() {
    // Add floating animation to elements
    addFloatingAnimations();
    
    // Setup input animations
    setupInputAnimations();
    
    // Initialize map if available
    initMap();
}

function addFloatingAnimations() {
    // Add subtle floating animation to info items
    const infoItems = document.querySelectorAll('.info-item');
    
    infoItems.forEach((item, index) => {
        item.style.animationDelay = `${0.4 + (index * 0.1)}s`;
        
        // Add hover effect
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(10px)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0)';
        });
    });
}

function setupInputAnimations() {
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        // Add focus/blur events
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
            animateLabel(this, true);
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
                animateLabel(this, false);
            }
        });
        
        // Check if input has value on page load
        if (input.value !== '') {
            input.parentElement.classList.add('focused');
            animateLabel(input, true);
        }
    });
}

function animateLabel(input, isFocused) {
    const label = input.previousElementSibling;
    if (label && label.tagName === 'LABEL') {
        if (isFocused) {
            label.style.transform = 'translateY(-5px)';
            label.style.color = 'var(--primary-color)';
        } else {
            label.style.transform = 'translateY(0)';
            label.style.color = 'var(--dark-color)';
        }
    }
}

function setupContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (validateForm()) {
            // Show loading state
            showLoading();
            
            // Simulate form submission
            simulateFormSubmission();
        }
    });
    
    // Add real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            validateField(this);
        });
    });
}

function validateForm() {
    let isValid = true;
    const inputs = document.querySelectorAll('.contact-form input[required], .contact-form textarea[required]');
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const formGroup = field.parentElement;
    
    // Remove previous error messages
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Remove validation classes
    formGroup.classList.remove('success', 'error');
    
    // Check required fields
    if (field.hasAttribute('required') && value === '') {
        formGroup.classList.add('error');
        showError(field, 'This field is required');
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && value !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            formGroup.classList.add('error');
            showError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    // Phone validation
    if (field.name === 'phone' && value !== '') {
        const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(value)) {
            formGroup.classList.add('error');
            showError(field, 'Please enter a valid phone number');
            return false;
        }
    }
    
    // If all validations pass
    formGroup.classList.add('success');
    return true;
}

function showError(field, message) {
    const formGroup = field.parentElement;
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.style.cssText = 'color: var(--danger-color); font-size: 0.9rem; margin-top: 0.5rem;';
    errorElement.textContent = message;
    formGroup.appendChild(errorElement);
    
    // Shake animation for error
    formGroup.style.animation = 'shake 0.5s ease';
    setTimeout(() => {
        formGroup.style.animation = '';
    }, 500);
}

function simulateFormSubmission() {
    const submitBtn = document.querySelector('.submit-btn');
    const formData = new FormData(document.querySelector('.contact-form'));
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Remove loading state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
        // Show success message
        showSuccessMessage();
        
        // Reset form
        document.querySelector('.contact-form').reset();
        
        // Remove focused classes
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('focused', 'success');
        });
        
    }, 2000);
}

function showSuccessMessage() {
    // Remove existing success message
    const existingSuccess = document.querySelector('.success-message');
    if (existingSuccess) {
        existingSuccess.remove();
    }
    
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <i class="fas fa-check-circle" style="font-size: 2rem; margin-bottom: 1rem;"></i>
        <h3>Message Sent Successfully!</h3>
        <p>Thank you for contacting us. We'll get back to you within 24 hours.</p>
    `;
    
    // Insert before form
    const formContainer = document.querySelector('.contact-form-container');
    formContainer.insertBefore(successMessage, formContainer.firstChild);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        successMessage.style.animation = 'fadeOut 0.5s ease forwards';
        setTimeout(() => {
            successMessage.remove();
        }, 500);
    }, 5000);
}

function showLoading() {
    // Add loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;
    
    loadingOverlay.innerHTML = `
        <div class="spinner" style="width: 50px; height: 50px; border: 5px solid #f3f3f3; border-top: 5px solid var(--primary-color); border-radius: 50%; animation: spin 1s linear infinite;"></div>
    `;
    
    document.body.appendChild(loadingOverlay);
    
    // Add spin animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
            20%, 40%, 60%, 80% { transform: translateX(10px); }
        }
    `;
    document.head.appendChild(style);
}

function hideLoading() {
    const loadingOverlay = document.querySelector('.loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.remove();
    }
}

function setupInteractiveElements() {
    // Add click animation to social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Pulse animation
            this.style.animation = 'pulse 0.5s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
            
            // Open link in new tab after animation
            setTimeout(() => {
                window.open(this.href, '_blank');
            }, 200);
        });
    });
    
    // Add copy-to-clipboard functionality for contact info
    const contactInfos = document.querySelectorAll('.info-content p');
    contactInfos.forEach(info => {
        info.style.cursor = 'pointer';
        info.title = 'Click to copy';
        
        info.addEventListener('click', function() {
            const textToCopy = this.textContent;
            navigator.clipboard.writeText(textToCopy).then(() => {
                // Show copied notification
                showNotification('Copied to clipboard!', 'success');
                
                // Pulse animation
                this.style.animation = 'pulse 0.5s ease';
                setTimeout(() => {
                    this.style.animation = '';
                }, 500);
            });
        });
    });
}

function setupScrollAnimations() {
    // Add intersection observer for scroll animations
    const animatedElements = document.querySelectorAll('.info-item, .form-group, .social-links, .map-container');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        // Pause animations initially
        element.style.animationPlayState = 'paused';
        observer.observe(element);
    });
}

function initMap() {
    // This would be replaced with your actual map initialization code
    // For now, we'll just add a loaded class to trigger animations
    const mapContainer = document.querySelector('.map-container');
    if (mapContainer) {
        setTimeout(() => {
            mapContainer.classList.add('loaded');
        }, 1000);
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" style="background: none; border: none; font-size: 1.2rem; cursor: pointer;">×</button>
    `;
    
    // Add styles if not already added
    if (!document.querySelector('.notification-styles')) {
        const styles = document.createElement('style');
        styles.className = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                bottom: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 8px;
                color: white;
                z-index: 1000;
                display: flex;
                align-items: center;
                gap: 10px;
                opacity: 0;
                transform: translateY(100%);
                transition: opacity 0.3s, transform 0.3s;
            }
            .notification-success { background-color: var(--success-color); }
            .notification-error { background-color: var(--danger-color); }
            .notification-info { background-color: var(--primary-color); }
            .notification.show {
                opacity: 1;
                transform: translateY(0);
            }
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Add to page and animate in
    document.body.appendChild(notification);
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}