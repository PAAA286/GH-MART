// Profile page interactions and animations
document.addEventListener('DOMContentLoaded', function() {
    console.log('Profile page loaded');
    
    // Initialize profile page
    initProfilePage();
    
    // Setup interactive elements
    setupProfileInteractions();
    
    // Load user data (simulated)
    loadUserData();
});

function initProfilePage() {
    // Add animation to profile elements
    animateProfileElements();
    
    // Setup edit functionality
    setupEditProfile();
    
    // Setup order history interactions
    setupOrderHistory();
}

function animateProfileElements() {
    // Animate stats counter
    animateStats();
    
    // Add hover effects to interactive elements
    addHoverEffects();
    
    // Setup scroll animations
    setupScrollAnimations();
}

function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const targetValue = parseInt(stat.textContent);
        let currentValue = 0;
        const duration = 2000; // 2 seconds
        const steps = 60; // 60 frames
        const increment = targetValue / steps;
        const stepTime = duration / steps;
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= targetValue) {
                clearInterval(timer);
                stat.textContent = targetValue;
            } else {
                stat.textContent = Math.round(currentValue);
            }
        }, stepTime);
    });
}

function addHoverEffects() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.profile-card, .stat-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });
}

function setupScrollAnimations() {
    // Add intersection observer for scroll animations
    const animatedElements = document.querySelectorAll('.profile-card, .order-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

function setupEditProfile() {
    const editBtn = document.querySelector('.edit-profile-btn');
    const saveBtn = document.querySelector('.save-profile-btn');
    const cancelBtn = document.querySelector('.cancel-edit-btn');
    const infoItems = document.querySelectorAll('.info-value');
    
    if (!editBtn) return;
    
    editBtn.addEventListener('click', function() {
        // Switch to edit mode
        enableEditMode();
    });
    
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            // Save changes
            saveProfileChanges();
            disableEditMode();
        });
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            // Cancel editing
            disableEditMode();
        });
    }
}

function enableEditMode() {
    // Show edit buttons, hide view buttons
    document.querySelectorAll('.edit-profile-btn, .logout-btn').forEach(btn => {
        btn.style.display = 'none';
    });
    
    document.querySelectorAll('.save-profile-btn, .cancel-edit-btn').forEach(btn => {
        btn.style.display = 'flex';
    });
    
    // Convert info items to editable inputs
    const infoItems = document.querySelectorAll('.info-item:not(.non-editable) .info-value');
    
    infoItems.forEach(item => {
        const currentValue = item.textContent;
        const fieldName = item.parentElement.querySelector('.info-label').textContent.toLowerCase().replace(' ', '-');
        
        item.innerHTML = `
            <input type="text" class="edit-input" value="${currentValue}" 
                   data-field="${fieldName}" style="width: 100%; padding: 0.5rem; border: 2px solid #e9ecef; border-radius: 6px;">
        `;
    });
    
    // Show notification
    showNotification('Edit mode enabled. Make your changes and click Save.', 'info');
}

function disableEditMode() {
    // Show view buttons, hide edit buttons
    document.querySelectorAll('.edit-profile-btn, .logout-btn').forEach(btn => {
        btn.style.display = 'flex';
    });
    
    document.querySelectorAll('.save-profile-btn, .cancel-edit-btn').forEach(btn => {
        btn.style.display = 'none';
    });
    
    // Revert inputs back to text
    const editInputs = document.querySelectorAll('.edit-input');
    
    editInputs.forEach(input => {
        const parent = input.closest('.info-value');
        parent.textContent = input.value;
    });
}

function saveProfileChanges() {
    // Collect edited values
    const changes = {};
    const editInputs = document.querySelectorAll('.edit-input');
    
    editInputs.forEach(input => {
        changes[input.dataset.field] = input.value;
    });
    
    // Simulate API call
    showNotification('Saving changes...', 'info');
    
    setTimeout(() => {
        // Simulate successful save
        showNotification('Profile updated successfully!', 'success');
        
        // Update the displayed values
        for (const [field, value] of Object.entries(changes)) {
            const labelElement = document.querySelector(`.info-label:contains("${field.replace('-', ' ')}")`);
            if (labelElement) {
                const valueElement = labelElement.nextElementSibling;
                if (valueElement) {
                    valueElement.textContent = value;
                }
            }
        }
    }, 1500);
}

function setupOrderHistory() {
    const orderItems = document.querySelectorAll('.order-item');
    
    orderItems.forEach(order => {
        order.addEventListener('click', function(e) {
            if (!e.target.closest('.order-details')) return;
            
            // Toggle order details
            const details = this.querySelector('.order-full-details');
            if (details) {
                details.style.display = details.style.display === 'none' ? 'block' : 'none';
            } else {
                // Show loading and fetch order details
                showOrderDetails(this);
            }
        });
    });
}

function showOrderDetails(orderElement) {
    const orderId = orderElement.dataset.orderId;
    
    // Show loading state
    orderElement.style.opacity = '0.7';
    
    // Simulate API call to get order details
    setTimeout(() => {
        orderElement.style.opacity = '1';
        
        // Add details section
        const detailsHtml = `
            <div class="order-full-details" style="grid-column: 1 / -1; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #eee;">
                <h4 style="margin-bottom: 0.5rem;">Order Details</h4>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                    <div>
                        <strong>Items:</strong>
                        <ul style="margin: 0.5rem 0 0 1rem;">
                            <li>Product 1 × 2 - GH₵50.00</li>
                            <li>Product 2 × 1 - GH₵30.00</li>
                        </ul>
                    </div>
                    <div>
                        <strong>Shipping Address:</strong>
                        <p style="margin: 0.5rem 0;">123 Main St, Accra, Ghana</p>
                    </div>
                    <div>
                        <strong>Payment Method:</strong>
                        <p style="margin: 0.5rem 0;">Credit Card ****1234</p>
                    </div>
                </div>
            </div>
        `;
        
        orderElement.insertAdjacentHTML('beforeend', detailsHtml);
    }, 500);
}

function loadUserData() {
    // Simulate loading user data
    showLoading();
    
    setTimeout(() => {
        // Simulated user data
        const userData = {
            orders: 5,
            reviews: 3,
            joined: '2023-01-15',
            lastLogin: new Date().toLocaleString()
        };
        
        // Update stats
        document.querySelector('[data-stat="orders"]').textContent = userData.orders;
        document.querySelector('[data-stat="reviews"]').textContent = userData.reviews;
        
        hideLoading();
    }, 1000);
}

function showLoading() {
    // Add loading indicator
    const loadingHtml = `
        <div class="loading-overlay" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(255,255,255,0.8); display: flex; justify-content: center; align-items: center; z-index: 1000;">
            <div class="spinner" style="width: 50px; height: 50px; border: 5px solid #f3f3f3; border-top: 5px solid var(--primary-color); border-radius: 50%; animation: spin 1s linear infinite;"></div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', loadingHtml);
}

function hideLoading() {
    const loadingOverlay = document.querySelector('.loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.remove();
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
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 8px;
                color: white;
                z-index: 1000;
                display: flex;
                align-items: center;
                gap: 10px;
                opacity: 0;
                transform: translateX(100%);
                transition: opacity 0.3s, transform 0.3s;
            }
            .notification-success { background-color: var(--success-color); }
            .notification-error { background-color: var(--danger-color); }
            .notification-info { background-color: var(--primary-color); }
            .notification.show {
                opacity: 1;
                transform: translateX(0);
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Add to page and animate in
    document.body.appendChild(notification);
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Utility function for contains selector
if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || 
                                Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
        var el = this;
        do {
            if (el.matches(s)) return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}