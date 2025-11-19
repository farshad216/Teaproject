// E-Commerce Product Listing Page Script

// Sample product data
const products = [
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        price: 79.99,
        originalPrice: 99.99,
        image: "https://via.placeholder.com/300",
        category: "electronics",
        rating: 4.5,
        reviews: 234,
        badge: "Best Seller",
        features: ["Noise cancellation", "30-hour battery", "Comfortable fit", "Premium sound quality"]
    },
    {
        id: 2,
        name: "Organic Cotton T-Shirt",
        price: 24.99,
        originalPrice: null,
        image: "https://via.placeholder.com/300",
        category: "clothing",
        rating: 4.2,
        reviews: 89,
        badge: "New",
        features: ["100% organic cotton", "Eco-friendly", "Machine washable", "Multiple colors"]
    },
    {
        id: 3,
        name: "Smart Home Security Camera",
        price: 129.99,
        originalPrice: 179.99,
        image: "https://via.placeholder.com/300",
        category: "electronics",
        rating: 4.7,
        reviews: 456,
        badge: null,
        features: ["1080p HD", "Night vision", "Motion detection", "Mobile app control"]
    },
    {
        id: 4,
        name: "Artisan Hand-Poured Soy Candle",
        price: 24.99,
        originalPrice: null,
        image: "https://via.placeholder.com/300",
        category: "home",
        rating: 4.8,
        reviews: 312,
        badge: null,
        features: ["100% natural soy wax", "40+ hour burn time", "Eco-friendly wick", "Lavender scent"]
    },
    {
        id: 5,
        name: "Premium Coffee Maker",
        price: 149.99,
        originalPrice: 199.99,
        image: "https://via.placeholder.com/300",
        category: "home",
        rating: 4.4,
        reviews: 178,
        badge: "Sale",
        features: ["Programmable timer", "12-cup capacity", "Auto shut-off", "Reusable filter"]
    },
    {
        id: 6,
        name: "Leather Crossbody Bag",
        price: 89.99,
        originalPrice: null,
        image: "https://via.placeholder.com/300",
        category: "clothing",
        rating: 4.6,
        reviews: 145,
        badge: null,
        features: ["Genuine leather", "Adjustable strap", "Multiple compartments", "Classic design"]
    },
    {
        id: 7,
        name: "Fitness Tracker Watch",
        price: 199.99,
        originalPrice: null,
        image: "https://via.placeholder.com/300",
        category: "electronics",
        rating: 4.3,
        reviews: 567,
        badge: "Best Seller",
        features: ["Heart rate monitor", "GPS tracking", "Water resistant", "7-day battery"]
    },
    {
        id: 8,
        name: "Bestselling Novel Collection",
        price: 34.99,
        originalPrice: null,
        image: "https://via.placeholder.com/300",
        category: "books",
        rating: 4.9,
        reviews: 892,
        badge: "Best Seller",
        features: ["3-book set", "Hardcover", "Free bookmark", "Gift box included"]
    },
    {
        id: 9,
        name: "Ergonomic Office Chair",
        price: 249.99,
        originalPrice: 299.99,
        image: "https://via.placeholder.com/300",
        category: "home",
        rating: 4.5,
        reviews: 234,
        badge: null,
        features: ["Lumbar support", "Adjustable height", "Swivel base", "Breathable mesh"]
    },
    {
        id: 10,
        name: "Wireless Phone Charger",
        price: 19.99,
        originalPrice: null,
        image: "https://via.placeholder.com/300",
        category: "electronics",
        rating: 4.1,
        reviews: 123,
        badge: null,
        features: ["Fast charging", "Universal compatibility", "LED indicator", "Sleek design"]
    },
    {
        id: 11,
        name: "Yoga Mat Premium",
        price: 39.99,
        originalPrice: null,
        image: "https://via.placeholder.com/300",
        category: "home",
        rating: 4.7,
        reviews: 267,
        badge: null,
        features: ["Non-slip surface", "Extra thick", "Eco-friendly material", "Carrying strap"]
    },
    {
        id: 12,
        name: "Designer Sunglasses",
        price: 129.99,
        originalPrice: 179.99,
        image: "https://via.placeholder.com/300",
        category: "clothing",
        rating: 4.6,
        reviews: 189,
        badge: "Sale",
        features: ["UV protection", "Polarized lenses", "Lightweight frame", "Case included"]
    }
];

let filteredProducts = [...products];
let cartCount = 0;

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    renderProducts(products);
    setupFilters();
    setupSorting();
    setupSearch();
    updateResultsCount();
});

// Render products grid
function renderProducts(productsToRender) {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    grid.innerHTML = '';

    productsToRender.forEach(product => {
        const card = createProductCard(product);
        grid.appendChild(card);
    });
}

// Create product card element
function createProductCard(product) {
    const card = document.createElement('a');
    card.href = `product-detail.html?id=${product.id}`;
    card.className = 'product-card';
    card.setAttribute('data-product-id', product.id);

    const discount = product.originalPrice 
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    card.innerHTML = `
        <div class="product-card-image">
            ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            <div style="width: 100%; height: 100%; background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%); display: flex; align-items: center; justify-content: center; color: #64748b;">
                Product Image
            </div>
        </div>
        <div class="product-card-info">
            <h3 class="product-card-name">${product.name}</h3>
            <div class="product-card-price">
                $${product.price.toFixed(2)}
                ${product.originalPrice ? `<span style="font-size: 1rem; color: #64748b; text-decoration: line-through; margin-left: 10px;">$${product.originalPrice.toFixed(2)}</span>` : ''}
            </div>
            <div class="product-card-rating">
                <span class="stars">${generateStars(product.rating)}</span>
                <span>${product.rating.toFixed(1)} (${product.reviews})</span>
            </div>
            <button class="quick-add-btn" onclick="event.preventDefault(); addToCart(${product.id})">
                🛒 Add to Cart
            </button>
        </div>
    `;

    return card;
}

// Generate star rating display
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '★'.repeat(fullStars);
    if (hasHalfStar) stars += '☆';
    const emptyStars = 5 - Math.ceil(rating);
    stars += '☆'.repeat(emptyStars);
    return stars;
}

// Setup filters
function setupFilters() {
    const filterToggle = document.getElementById('filterToggle');
    const filterPanel = document.getElementById('filterPanel');
    const priceRange = document.getElementById('priceRange');
    const priceDisplay = document.getElementById('priceDisplay');
    const applyFiltersBtn = document.querySelector('.apply-filters');

    if (filterToggle && filterPanel) {
        filterToggle.addEventListener('click', () => {
            filterPanel.classList.toggle('active');
        });
    }

    if (priceRange && priceDisplay) {
        priceRange.addEventListener('input', (e) => {
            priceDisplay.textContent = `$0 - $${e.target.value}`;
        });
    }

    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', applyFilters);
    }
}

// Apply filters
function applyFilters() {
    const priceRange = document.getElementById('priceRange');
    const maxPrice = priceRange ? parseFloat(priceRange.value) : 500;
    const categoryCheckboxes = document.querySelectorAll('.filter-group input[type="checkbox"][value]');
    const ratingCheckboxes = document.querySelectorAll('.filter-group input[type="checkbox"][value="4"], .filter-group input[type="checkbox"][value="3"]');

    let filtered = [...products];

    // Price filter
    filtered = filtered.filter(p => p.price <= maxPrice);

    // Category filter
    const selectedCategories = Array.from(categoryCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);
    
    if (selectedCategories.length > 0) {
        filtered = filtered.filter(p => selectedCategories.includes(p.category));
    }

    // Rating filter
    const selectedRatings = Array.from(ratingCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => parseFloat(cb.value));
    
    if (selectedRatings.length > 0) {
        const minRating = Math.min(...selectedRatings);
        filtered = filtered.filter(p => p.rating >= minRating);
    }

    filteredProducts = filtered;
    renderProducts(filteredProducts);
    updateResultsCount();
}

// Setup sorting
function setupSorting() {
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            sortProducts(e.target.value);
        });
    }
}

// Sort products
function sortProducts(sortBy) {
    const sorted = [...filteredProducts];

    switch(sortBy) {
        case 'price-low':
            sorted.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sorted.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
            sorted.sort((a, b) => b.id - a.id);
            break;
        case 'rating':
            sorted.sort((a, b) => b.rating - a.rating);
            break;
        case 'name-asc':
            sorted.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            sorted.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'bestsellers':
        default:
            // Keep original order or sort by reviews
            sorted.sort((a, b) => b.reviews - a.reviews);
            break;
    }

    renderProducts(sorted);
}

// Setup search
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            if (query === '') {
                filteredProducts = [...products];
                renderProducts(filteredProducts);
            } else {
                filteredProducts = products.filter(p => 
                    p.name.toLowerCase().includes(query) ||
                    p.category.toLowerCase().includes(query)
                );
                renderProducts(filteredProducts);
            }
            updateResultsCount();
        });
    }
}

// Update results count
function updateResultsCount() {
    const resultsCount = document.getElementById('resultsCount');
    if (resultsCount) {
        resultsCount.textContent = `Showing ${filteredProducts.length} of ${products.length} products`;
    }
}

// Add to cart
function addToCart(productId) {
    cartCount++;
    const cartCountEl = document.querySelector('.cart-count');
    if (cartCountEl) {
        cartCountEl.textContent = cartCount;
    }
    
    // Show notification
    showNotification('Product added to cart!');
    
    // Store in localStorage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push({...product, quantity: 1});
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-weight: 600;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Load cart count on page load
window.addEventListener('load', () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cartCount = cart.length;
    const cartCountEl = document.querySelector('.cart-count');
    if (cartCountEl) {
        cartCountEl.textContent = cartCount;
    }
});

