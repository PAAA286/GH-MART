// Authentication page animations and interactions
document.addEventListener('DOMContentLoaded', function() {
    console.log('Auth animations loaded');
    
    // Add floating elements to background
    createFloatingElements();
    
    // Add input focus effects
    setupInputAnimations();
    
    // Add form submission animations
    setupFormAnimations();
    
    // Add password visibility toggle
    setupPasswordToggle();
});

function createFloatingElements() {
    const authContainer = document.querySelector('.auth-container');
    if (!authContainer) return;
    
    // Create floating elements
    for (let i = 0; i < 3; i++) {
        const element = document.createElement('div');
        element.className = 'floating-element';
        authContainer.appendChild(element);
    }
}

function setupInputAnimations() {
    const inputs = document.querySelectorAll('.form-group input');
    
    inputs.forEach(input => {
        // Add focus/blur events
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check if input has value on page load
        if (input.value !== '') {
            input.parentElement.classList.add('focused');
        }
        
        // Add input validation effects
        input.addEventListener('input', function() {
            validateInput(this);
        });
    });
}

function validateInput(input) {
    const formGroup = input.parentElement;
    
    // Remove previous validation classes
    formGroup.classList.remove('success', 'error');
    
    // Basic validation
    if (input.value.trim() === '') {
        formGroup.classList.add('error');
        return false;
    }
    
    // Email validation for email fields
    if (input.type === 'email' || input.name.includes('email')) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
            formGroup.classList.add('error');
            return false;
        }
    }
    
    // Password validation
    if (input.type === 'password') {
        if (input.value.length < 6) {
            formGroup.classList.add('error');
            return false;
        }
    }
    
    formGroup.classList.add('success');
    return true;
}

function setupFormAnimations() {
    const forms = document.querySelectorAll('.auth-form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // Validate all inputs first
            const inputs = this.querySelectorAll('input[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!validateInput(input)) {
                    isValid = false;
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                
                // Shake animation for invalid form
                this.style.animation = 'shake 0.5s ease';
                setTimeout(() => {
                    this.style.animation = '';
                }, 500);
                
                return;
            }
            
            // Show loading animation
            const submitButton = this.querySelector('.btn-auth');
            if (submitButton) {
                submitButton.classList.add('loading');
                submitButton.disabled = true;
            }
        });
    });
}

function setupPasswordToggle() {
    // Create password toggle buttons
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    
    passwordInputs.forEach(input => {
        const formGroup = input.parentElement;
        const toggleButton = document.createElement('button');
        toggleButton.type = 'button';
        toggleButton.innerHTML = '👁️';
        toggleButton.className = 'password-toggle';
        toggleButton.style.cssText = `
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            cursor: pointer;
            font-size: 1rem;
            opacity: 0.5;
            transition: opacity 0.3s ease;
        `;
        
        toggleButton.addEventListener('mouseenter', () => {
            toggleButton.style.opacity = '1';
        });
        
        toggleButton.addEventListener('mouseleave', () => {
            toggleButton.style.opacity = '0.5';
        });
        
        toggleButton.addEventListener('click', () => {
            if (input.type === 'password') {
                input.type = 'text';
                toggleButton.innerHTML = '🔒';
            } else {
                input.type = 'password';
                toggleButton.innerHTML = '👁️';
            }
        });
        
        formGroup.style.position = 'relative';
        input.style.paddingRight = '40px';
        formGroup.appendChild(toggleButton);
    });
}

// Additional animation effects
function animateButton(button) {
    button.style.animation = 'pulse 0.5s ease';
    setTimeout(() => {
        button.style.animation = '';
    }, 500);
}

// Export functions for use in other files
window.authAnimations = {
    validateInput,
    animateButton
};