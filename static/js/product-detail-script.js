// Product Detail Page Script

// Sample product data (same as listing page)
const products = [
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        price: 79.99,
        originalPrice: 99.99,
        images: ["https://via.placeholder.com/600", "https://via.placeholder.com/600", "https://via.placeholder.com/600"],
        category: "electronics",
        rating: 4.5,
        reviews: 234,
        badge: "Best Seller",
        features: ["Noise cancellation", "30-hour battery", "Comfortable fit", "Premium sound quality"],
        description: "Experience premium audio quality with our Wireless Bluetooth Headphones. Designed for comfort and performance, these headphones feature advanced noise cancellation technology that blocks out distractions, allowing you to focus on your music, calls, or podcasts. With an impressive 30-hour battery life, you can enjoy uninterrupted listening throughout your day. The ergonomic design ensures a comfortable fit even during extended wear, while the premium sound drivers deliver crystal-clear audio across all frequencies. Perfect for commuters, professionals, and music enthusiasts who demand the best.",
        specifications: {
            "Battery Life": "30 hours",
            "Connectivity": "Bluetooth 5.0",
            "Weight": "250g",
            "Frequency Response": "20Hz - 20kHz",
            "Noise Cancellation": "Active"
        },
        inStock: true,
        stockQuantity: 15
    },
    {
        id: 2,
        name: "Organic Cotton T-Shirt",
        price: 24.99,
        originalPrice: null,
        images: ["https://via.placeholder.com/600", "https://via.placeholder.com/600"],
        category: "clothing",
        rating: 4.2,
        reviews: 89,
        badge: "New",
        features: ["100% organic cotton", "Eco-friendly", "Machine washable", "Multiple colors"],
        description: "Made from 100% organic cotton, this comfortable t-shirt is perfect for everyday wear. Our commitment to sustainability means this garment is produced using eco-friendly methods that reduce environmental impact. The soft, breathable fabric feels great against your skin, while the classic fit ensures it looks good on everyone. Available in multiple colors to match your style, this t-shirt is machine washable and designed to last. Join the movement towards sustainable fashion without compromising on comfort or style.",
        specifications: {
            "Material": "100% Organic Cotton",
            "Care": "Machine washable",
            "Fit": "Classic",
            "Colors Available": "8",
            "Origin": "Fair trade certified"
        },
        inStock: true,
        stockQuantity: 50
    },
    {
        id: 3,
        name: "Smart Home Security Camera",
        price: 129.99,
        originalPrice: 179.99,
        images: ["https://via.placeholder.com/600", "https://via.placeholder.com/600", "https://via.placeholder.com/600", "https://via.placeholder.com/600"],
        category: "electronics",
        rating: 4.7,
        reviews: 456,
        badge: null,
        features: ["1080p HD", "Night vision", "Motion detection", "Mobile app control"],
        description: "Keep your home safe with our Smart Home Security Camera. Featuring 1080p HD video quality, you'll get crystal-clear footage day and night. The advanced night vision technology ensures you can see what's happening even in complete darkness, while motion detection alerts you instantly when activity is detected. Control everything from your smartphone with our intuitive mobile app, which allows you to view live feeds, review recordings, and adjust settings from anywhere in the world. Easy to install and set up, this camera provides peace of mind for you and your family.",
        specifications: {
            "Resolution": "1080p HD",
            "Night Vision": "Up to 30ft",
            "Field of View": "110 degrees",
            "Storage": "Cloud & Local",
            "Power": "AC adapter included"
        },
        inStock: true,
        stockQuantity: 8
    },
    {
        id: 4,
        name: "Artisan Hand-Poured Soy Candle",
        price: 24.99,
        originalPrice: null,
        images: ["https://via.placeholder.com/600", "https://via.placeholder.com/600"],
        category: "home",
        rating: 4.8,
        reviews: 312,
        badge: null,
        features: ["100% natural soy wax", "40+ hour burn time", "Eco-friendly wick", "Lavender scent"],
        description: "Transform your space with the warm, inviting glow of our Artisan Hand-Poured Soy Candle. Each candle is carefully crafted using 100% natural soy wax, which burns cleaner and longer than traditional paraffin candles. With over 40 hours of burn time, this candle will fill your home with the calming scent of lavender and cedarwood for weeks to come. The eco-friendly wooden wick creates a gentle crackling sound that adds to the cozy atmosphere. Hand-poured by skilled artisans, each candle is unique and made with care. Perfect for creating a relaxing ambiance in your home, office, or as a thoughtful gift.",
        specifications: {
            "Wax Type": "100% Natural Soy",
            "Burn Time": "40+ hours",
            "Wick": "Eco-friendly wooden",
            "Scent": "Lavender & Cedarwood",
            "Size": "8 oz"
        },
        inStock: true,
        stockQuantity: 25
    },
    {
        id: 5,
        name: "Premium Coffee Maker",
        price: 149.99,
        originalPrice: 199.99,
        images: ["https://via.placeholder.com/600", "https://via.placeholder.com/600", "https://via.placeholder.com/600"],
        category: "home",
        rating: 4.4,
        reviews: 178,
        badge: "Sale",
        features: ["Programmable timer", "12-cup capacity", "Auto shut-off", "Reusable filter"],
        description: "Start your day right with our Premium Coffee Maker. This advanced brewing system features a programmable timer so you can wake up to freshly brewed coffee every morning. With a generous 12-cup capacity, it's perfect for families or entertaining guests. The automatic shut-off feature provides peace of mind, while the reusable filter saves money and reduces waste. Built with durability in mind, this coffee maker delivers consistent, delicious coffee cup after cup.",
        specifications: {
            "Capacity": "12 cups",
            "Timer": "24-hour programmable",
            "Filter": "Reusable",
            "Auto Shut-off": "Yes",
            "Warranty": "2 years"
        },
        inStock: true,
        stockQuantity: 12
    },
    {
        id: 6,
        name: "Leather Crossbody Bag",
        price: 89.99,
        originalPrice: null,
        images: ["https://via.placeholder.com/600", "https://via.placeholder.com/600"],
        category: "clothing",
        rating: 4.6,
        reviews: 145,
        badge: null,
        features: ["Genuine leather", "Adjustable strap", "Multiple compartments", "Classic design"],
        description: "Elevate your style with our Leather Crossbody Bag. Crafted from genuine leather, this timeless accessory combines elegance with functionality. The adjustable strap allows for comfortable wear at your preferred length, while multiple compartments keep your essentials organized. The classic design ensures it complements any outfit, from casual to formal. Perfect for everyday use, this bag is built to last and will become a staple in your wardrobe.",
        specifications: {
            "Material": "Genuine Leather",
            "Dimensions": "10\" x 8\" x 3\"",
            "Strap": "Adjustable",
            "Compartments": "3",
            "Color": "Brown, Black"
        },
        inStock: true,
        stockQuantity: 20
    },
    {
        id: 7,
        name: "Fitness Tracker Watch",
        price: 199.99,
        originalPrice: null,
        images: ["https://via.placeholder.com/600", "https://via.placeholder.com/600", "https://via.placeholder.com/600"],
        category: "electronics",
        rating: 4.3,
        reviews: 567,
        badge: "Best Seller",
        features: ["Heart rate monitor", "GPS tracking", "Water resistant", "7-day battery"],
        description: "Take your fitness journey to the next level with our Fitness Tracker Watch. This advanced wearable device tracks your heart rate in real-time, helping you optimize your workouts and monitor your health. Built-in GPS accurately tracks your runs, walks, and bike rides without needing your phone. With water resistance up to 50 meters, you can wear it while swimming or in the shower. The impressive 7-day battery life means you can track your activity all week without charging.",
        specifications: {
            "Battery": "7 days",
            "Water Resistance": "50m",
            "GPS": "Built-in",
            "Heart Rate": "Continuous monitoring",
            "Display": "1.4\" AMOLED"
        },
        inStock: true,
        stockQuantity: 30
    },
    {
        id: 8,
        name: "Bestselling Novel Collection",
        price: 34.99,
        originalPrice: null,
        images: ["https://via.placeholder.com/600", "https://via.placeholder.com/600"],
        category: "books",
        rating: 4.9,
        reviews: 892,
        badge: "Best Seller",
        features: ["3-book set", "Hardcover", "Free bookmark", "Gift box included"],
        description: "Immerse yourself in these captivating stories with our Bestselling Novel Collection. This carefully curated 3-book set features award-winning titles that have captured the hearts of readers worldwide. Each book is beautifully bound in hardcover, making this collection perfect for your personal library or as a thoughtful gift. The set comes with a complimentary bookmark and is presented in an elegant gift box, ready to give or display.",
        specifications: {
            "Format": "Hardcover",
            "Books": "3",
            "Pages": "~300 each",
            "Language": "English",
            "Gift Box": "Included"
        },
        inStock: true,
        stockQuantity: 45
    },
    {
        id: 9,
        name: "Ergonomic Office Chair",
        price: 249.99,
        originalPrice: 299.99,
        images: ["https://via.placeholder.com/600", "https://via.placeholder.com/600", "https://via.placeholder.com/600"],
        category: "home",
        rating: 4.5,
        reviews: 234,
        badge: null,
        features: ["Lumbar support", "Adjustable height", "Swivel base", "Breathable mesh"],
        description: "Work in comfort with our Ergonomic Office Chair. Designed with your health in mind, this chair features advanced lumbar support that adapts to your spine's natural curve, reducing back pain and improving posture. The adjustable height and swivel base give you complete control over your seating position, while the breathable mesh back keeps you cool during long work sessions. Whether you're working from home or in the office, this chair provides the support you need for productive, comfortable workdays.",
        specifications: {
            "Weight Capacity": "300 lbs",
            "Height Range": "17\" - 21\"",
            "Material": "Mesh & Nylon",
            "Warranty": "5 years",
            "Assembly": "Required"
        },
        inStock: true,
        stockQuantity: 8
    },
    {
        id: 10,
        name: "Wireless Phone Charger",
        price: 19.99,
        originalPrice: null,
        images: ["https://via.placeholder.com/600", "https://via.placeholder.com/600"],
        category: "electronics",
        rating: 4.1,
        reviews: 123,
        badge: null,
        features: ["Fast charging", "Universal compatibility", "LED indicator", "Sleek design"],
        description: "Simplify your charging routine with our Wireless Phone Charger. This sleek, modern charger uses advanced fast-charging technology to power up your device quickly and efficiently. With universal compatibility, it works with all Qi-enabled smartphones. The LED indicator lets you know when your device is charging, and the slim design fits seamlessly into any space. Say goodbye to tangled cables and enjoy the convenience of wireless charging.",
        specifications: {
            "Output": "15W",
            "Compatibility": "Qi-enabled devices",
            "LED": "Yes",
            "Cable Length": "3ft",
            "Warranty": "1 year"
        },
        inStock: true,
        stockQuantity: 60
    },
    {
        id: 11,
        name: "Yoga Mat Premium",
        price: 39.99,
        originalPrice: null,
        images: ["https://via.placeholder.com/600", "https://via.placeholder.com/600"],
        category: "home",
        rating: 4.7,
        reviews: 267,
        badge: null,
        features: ["Non-slip surface", "Extra thick", "Eco-friendly material", "Carrying strap"],
        description: "Enhance your yoga practice with our Premium Yoga Mat. The non-slip surface provides superior grip, keeping you stable in even the most challenging poses. At extra thickness, this mat offers superior cushioning for your joints, making it perfect for all types of yoga and exercise. Made from eco-friendly materials, you can feel good about your purchase while protecting the environment. The included carrying strap makes it easy to transport to and from your yoga class or home practice space.",
        specifications: {
            "Thickness": "6mm",
            "Material": "Eco-friendly TPE",
            "Dimensions": "72\" x 24\"",
            "Weight": "2.5 lbs",
            "Carrying Strap": "Included"
        },
        inStock: true,
        stockQuantity: 35
    },
    {
        id: 12,
        name: "Designer Sunglasses",
        price: 129.99,
        originalPrice: 179.99,
        images: ["https://via.placeholder.com/600", "https://via.placeholder.com/600", "https://via.placeholder.com/600"],
        category: "clothing",
        rating: 4.6,
        reviews: 189,
        badge: "Sale",
        features: ["UV protection", "Polarized lenses", "Lightweight frame", "Case included"],
        description: "Protect your eyes in style with our Designer Sunglasses. These premium sunglasses feature 100% UV protection to shield your eyes from harmful rays, while polarized lenses reduce glare for clearer vision. The lightweight frame ensures all-day comfort, and the classic design never goes out of style. Complete with a protective case, these sunglasses are the perfect accessory for sunny days, whether you're at the beach, driving, or simply enjoying the outdoors.",
        specifications: {
            "UV Protection": "100%",
            "Lenses": "Polarized",
            "Frame": "Lightweight",
            "Case": "Included",
            "Warranty": "1 year"
        },
        inStock: true,
        stockQuantity: 18
    }
];

// Sample reviews data
const sampleReviews = [
    {
        author: "Sarah M.",
        rating: 5,
        date: "2024-01-15",
        title: "Excellent quality!",
        text: "I absolutely love this product. It exceeded my expectations in every way. Highly recommend!",
        helpful: 12,
        verified: true
    },
    {
        author: "John D.",
        rating: 4,
        date: "2024-01-10",
        title: "Great value for money",
        text: "Good product overall. Works as described. The only minor issue is the packaging could be better.",
        helpful: 8,
        verified: true
    },
    {
        author: "Emily R.",
        rating: 5,
        date: "2024-01-08",
        title: "Perfect!",
        text: "Exactly what I was looking for. Fast shipping and great customer service. Will buy again!",
        helpful: 15,
        verified: true
    }
];

let currentProduct = null;
let currentImageIndex = 0;
let quantity = 1;

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    loadProduct();
    setupTabs();
    setupQuantityControls();
    setupActions();
    loadReviews();
});

// Load product from URL parameter
function loadProduct() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id')) || 1;
    
    // Find product or use first one as default
    currentProduct = products.find(p => p.id === productId) || products[0];
    
    if (!currentProduct) {
        currentProduct = products[0];
    }
    
    renderProduct();
}

// Render product details
function renderProduct() {
    // Update breadcrumb
    const breadcrumbCategory = document.getElementById('breadcrumbCategory');
    const breadcrumbProduct = document.getElementById('breadcrumbProduct');
    if (breadcrumbCategory) breadcrumbCategory.textContent = currentProduct.category;
    if (breadcrumbProduct) breadcrumbProduct.textContent = currentProduct.name;
    
    // Update title
    const productTitle = document.getElementById('productTitle');
    if (productTitle) productTitle.textContent = currentProduct.name;
    
    // Update price
    const currentPrice = document.getElementById('currentPrice');
    const originalPrice = document.getElementById('originalPrice');
    const discountBadge = document.getElementById('discountBadge');
    
    if (currentPrice) {
        currentPrice.textContent = `$${currentProduct.price.toFixed(2)}`;
    }
    
    if (currentProduct.originalPrice) {
        if (originalPrice) {
            originalPrice.textContent = `$${currentProduct.originalPrice.toFixed(2)}`;
            originalPrice.style.display = 'inline';
        }
        if (discountBadge) {
            const discount = Math.round(((currentProduct.originalPrice - currentProduct.price) / currentProduct.originalPrice) * 100);
            discountBadge.textContent = `-${discount}%`;
            discountBadge.style.display = 'inline-block';
        }
    } else {
        if (originalPrice) originalPrice.style.display = 'none';
        if (discountBadge) discountBadge.style.display = 'none';
    }
    
    // Update rating
    const productStars = document.getElementById('productStars');
    const ratingText = document.getElementById('ratingText');
    if (productStars) {
        productStars.textContent = generateStars(currentProduct.rating);
    }
    if (ratingText) {
        ratingText.textContent = `${currentProduct.rating.toFixed(1)} (${currentProduct.reviews} reviews)`;
    }
    
    // Update features
    const keyFeaturesList = document.getElementById('keyFeaturesList');
    if (keyFeaturesList) {
        keyFeaturesList.innerHTML = currentProduct.features.map(feature => 
            `<li>${feature}</li>`
        ).join('');
    }
    
    // Update images
    renderImages();
    
    // Update description
    const fullDescription = document.getElementById('fullDescription');
    if (fullDescription && currentProduct.description) {
        fullDescription.innerHTML = `<p>${currentProduct.description}</p>`;
    }
    
    // Update specifications
    const specsTable = document.getElementById('specsTable');
    if (specsTable && currentProduct.specifications) {
        specsTable.innerHTML = Object.entries(currentProduct.specifications)
            .map(([key, value]) => `
                <tr>
                    <td>${key}</td>
                    <td>${value}</td>
                </tr>
            `).join('');
    }
    
    // Update stock status
    const stockStatus = document.getElementById('stockStatus');
    if (stockStatus) {
        if (currentProduct.inStock) {
            stockStatus.innerHTML = `
                <span class="in-stock">✓ In Stock</span>
                ${currentProduct.stockQuantity < 10 ? `<span class="delivery-info" style="color: #f59e0b;">Only ${currentProduct.stockQuantity} left!</span>` : ''}
            `;
        } else {
            stockStatus.innerHTML = `<span style="color: #ef4444;">Out of Stock</span>`;
        }
    }
}

// Render product images
function renderImages() {
    const mainImage = document.getElementById('mainProductImage');
    const thumbnailGallery = document.getElementById('thumbnailGallery');
    
    const images = currentProduct.images || [currentProduct.image || "https://via.placeholder.com/600"];
    
    if (mainImage) {
        mainImage.src = images[0];
        mainImage.alt = currentProduct.name;
    }
    
    if (thumbnailGallery) {
        thumbnailGallery.innerHTML = images.map((img, index) => `
            <div class="thumbnail ${index === 0 ? 'active' : ''}" onclick="changeImage(${index})">
                <div style="width: 100%; height: 100%; background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #64748b; font-size: 12px;">
                    Image ${index + 1}
                </div>
            </div>
        `).join('');
    }
}

// Change main image
function changeImage(index) {
    const images = currentProduct.images || [currentProduct.image || "https://via.placeholder.com/600"];
    const mainImage = document.getElementById('mainProductImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    if (mainImage && images[index]) {
        mainImage.src = images[index];
    }
    
    thumbnails.forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });
    
    currentImageIndex = index;
}

// Setup tabs
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.getAttribute('data-tab');
            
            // Remove active class from all
            tabButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked
            btn.classList.add('active');
            const targetTab = document.getElementById(`${tabName}Tab`);
            if (targetTab) {
                targetTab.classList.add('active');
            }
        });
    });
}

// Setup quantity controls
function setupQuantityControls() {
    const qtyDecrease = document.getElementById('qtyDecrease');
    const qtyIncrease = document.getElementById('qtyIncrease');
    const quantityInput = document.getElementById('quantity');
    
    if (qtyDecrease) {
        qtyDecrease.addEventListener('click', () => {
            if (quantity > 1) {
                quantity--;
                if (quantityInput) quantityInput.value = quantity;
            }
        });
    }
    
    if (qtyIncrease) {
        qtyIncrease.addEventListener('click', () => {
            const max = currentProduct?.stockQuantity || 10;
            if (quantity < max) {
                quantity++;
                if (quantityInput) quantityInput.value = quantity;
            }
        });
    }
    
    if (quantityInput) {
        quantityInput.addEventListener('change', (e) => {
            quantity = parseInt(e.target.value) || 1;
            const max = currentProduct?.stockQuantity || 10;
            if (quantity > max) {
                quantity = max;
                quantityInput.value = max;
            }
            if (quantity < 1) {
                quantity = 1;
                quantityInput.value = 1;
            }
        });
    }
}

// Setup action buttons
function setupActions() {
    const addToCartBtn = document.getElementById('addToCartBtn');
    const buyNowBtn = document.getElementById('buyNowBtn');
    const wishlistBtn = document.getElementById('wishlistBtn');
    const shareBtn = document.getElementById('shareBtn');
    
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            addToCart();
        });
    }
    
    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', () => {
            addToCart();
            alert('Redirecting to checkout...');
        });
    }
    
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', () => {
            wishlistBtn.style.color = wishlistBtn.style.color === 'red' ? '' : 'red';
            showNotification('Added to wishlist!');
        });
    }
    
    if (shareBtn) {
        shareBtn.addEventListener('click', () => {
            if (navigator.share) {
                navigator.share({
                    title: currentProduct.name,
                    text: `Check out ${currentProduct.name} for $${currentProduct.price}!`,
                    url: window.location.href
                });
            } else {
                navigator.clipboard.writeText(window.location.href);
                showNotification('Link copied to clipboard!');
            }
        });
    }
}

// Add to cart
function addToCart() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartItem = {
        ...currentProduct,
        quantity: quantity
    };
    cart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    const cartCountEl = document.querySelector('.cart-count');
    if (cartCountEl) {
        cartCountEl.textContent = cart.length;
    }
    
    showNotification('Product added to cart!');
}

// Load reviews
function loadReviews() {
    const overallRating = document.getElementById('overallRating');
    const overallStars = document.getElementById('overallStars');
    const totalReviews = document.getElementById('totalReviews');
    const reviewsList = document.getElementById('reviewsList');
    
    if (!currentProduct) return;
    
    const avgRating = currentProduct.rating;
    const reviewCount = currentProduct.reviews;
    
    if (overallRating) overallRating.textContent = avgRating.toFixed(1);
    if (overallStars) overallStars.textContent = generateStars(avgRating);
    if (totalReviews) totalReviews.textContent = reviewCount;
    
    if (reviewsList) {
        reviewsList.innerHTML = sampleReviews.map(review => `
            <div class="review-item">
                <div class="review-header">
                    <div>
                        <span class="review-author">${review.author}</span>
                        ${review.verified ? '<span style="color: #10b981; margin-left: 10px;">✓ Verified Purchase</span>' : ''}
                    </div>
                    <span class="review-date">${review.date}</span>
                </div>
                <div class="stars">${generateStars(review.rating)}</div>
                <h4 style="margin: 10px 0 5px 0;">${review.title}</h4>
                <p class="review-text">${review.text}</p>
                <div style="margin-top: 10px; color: #64748b; font-size: 0.9rem;">
                    Helpful (${review.helpful})
                </div>
            </div>
        `).join('');
    }
}

// Generate stars
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '★'.repeat(fullStars);
    if (hasHalfStar) stars += '☆';
    const emptyStars = 5 - Math.ceil(rating);
    stars += '☆'.repeat(emptyStars);
    return stars;
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

// Load cart count on page load
window.addEventListener('load', () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartCountEl = document.querySelector('.cart-count');
    if (cartCountEl) {
        cartCountEl.textContent = cart.length;
    }
});

