// Cart page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Quantity decrease buttons
    document.querySelectorAll('.decrease').forEach(button => {
        button.addEventListener('click', function() {
            const itemId = this.dataset.itemId;
            const input = this.nextElementSibling;
            if (input.value > 1) {
                input.value = parseInt(input.value) - 1;
                updateCartItem(itemId, input.value);
            }
        });
    });
    
    // Quantity increase buttons
    document.querySelectorAll('.increase').forEach(button => {
        button.addEventListener('click', function() {
            const itemId = this.dataset.itemId;
            const input = this.previousElementSibling;
            input.value = parseInt(input.value) + 1;
            updateCartItem(itemId, input.value);
        });
    });
    
    // Quantity input change
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', function() {
            const itemId = this.closest('.item-quantity').querySelector('.quantity-btn').dataset.itemId;
            updateCartItem(itemId, this.value);
        });
    });
    
    // Remove item buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const itemId = this.dataset.itemId;
            removeCartItem(itemId);
        });
    });
});

function updateCartItem(itemId, quantity) {
    fetch(`/cart/update/${itemId}/`, {
        method: 'POST',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `quantity=${quantity}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Cart updated') {
            // Update the item total
            const itemElement = document.querySelector(`.cart-item[data-item-id="${itemId}"]`);
            if (itemElement) {
                itemElement.querySelector('.item-total').textContent = data.item_total;
            }
            
            // Update the cart total
            document.querySelectorAll('.summary-row.total .currency').forEach(el => {
                el.textContent = data.total;
            });
            
            // Update cart count in navigation
            updateCartCount(data.cart_items_count);
            
            showNotification('Cart updated', 'success');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showNotification('Error updating cart', 'error');
    });
}

function removeCartItem(itemId) {
    fetch(`/cart/remove/${itemId}/`, {
        method: 'POST',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRFToken': getCookie('csrftoken'),
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Product removed from cart') {
            // Remove the item from the DOM
            const itemElement = document.querySelector(`.cart-item[data-item-id="${itemId}"]`);
            if (itemElement) {
                itemElement.remove();
            }
            
            // Update the cart total
            document.querySelectorAll('.summary-row.total .currency').forEach(el => {
                el.textContent = data.total;
            });
            
            // Update cart count in navigation
            updateCartCount(data.cart_items_count);
            
            // If cart is empty, show empty cart message
            if (data.cart_items_count === 0) {
                document.querySelector('.cart-items').innerHTML = `
                    <div class="empty-cart">
                        <p>Your cart is empty.</p>
                        <a href="/products/" class="btn btn-primary">Continue Shopping</a>
                    </div>
                `;
                document.querySelector('.cart-summary').style.display = 'none';
            }
            
            showNotification('Item removed from cart', 'success');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showNotification('Error removing item from cart', 'error');
    });
}