# Django E-Commerce Project Setup Guide

This is a Django-based e-commerce project that allows you to manage products through the Django admin interface.

## Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

## Installation Steps

### 1. Navigate to the Project Directory

```bash
cd django_ecommerce
```

### 2. Create a Virtual Environment (Recommended)

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**Mac/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Run Migrations

Create the database tables:

```bash
python manage.py makemigrations
python manage.py migrate
```

### 5. Create a Superuser (Admin Account)

```bash
python manage.py createsuperuser
```

Follow the prompts to create your admin username, email, and password.

### 6. Run the Development Server

```bash
python manage.py runserver
```

The server will start at `http://127.0.0.1:8000/`

## Accessing the Admin Panel

1. Go to `http://127.0.0.1:8000/admin/`
2. Log in with your superuser credentials
3. You'll see:
   - **Categories** - Manage product categories
   - **Products** - Add, edit, and manage products

## Adding Products via Admin

### Step 1: Create Categories (Optional but Recommended)

1. Go to Admin → Categories → Add Category
2. Enter:
   - **Name**: e.g., "Electronics", "Clothing", "Home & Living"
   - **Slug**: Auto-generated from name (or customize)
   - **Description**: Optional

### Step 2: Add Products

1. Go to Admin → Products → Add Product
2. Fill in the required fields:

   **Basic Information:**
   - **Name**: Product name (e.g., "Wireless Bluetooth Headphones")
   - **Slug**: Auto-generated from name (or customize)
   - **Category**: Select a category

   **Description:**
   - **Short Description**: Brief summary (1-2 sentences)
   - **Description**: Full product description (2-3 paragraphs)

   **Pricing:**
   - **Price**: Current price (required)
   - **Original Price**: Leave blank or enter if product is on sale

   **Images:**
   - **Primary Image**: Main product image (required)
   - **Image 2, 3, 4**: Additional product images (optional)

   **Product Details:**
   - **Features**: Enter one feature per line, or comma-separated
     ```
     Noise cancellation
     30-hour battery
     Comfortable fit
     Premium sound quality
     ```
   - **Specifications**: Enter as key:value pairs, one per line
     ```
     Battery Life: 30 hours
     Connectivity: Bluetooth 5.0
     Weight: 250g
     Frequency Response: 20Hz - 20kHz
     ```

   **Status & Rating:**
   - **Badge**: Select "Best Seller", "New", "Sale", or leave blank
   - **In Stock**: Check if product is available
   - **Stock Quantity**: Number of items in stock
   - **Rating**: Average rating (0-5)
   - **Review Count**: Number of reviews

   **SEO** (Optional):
   - **Meta Title**: For SEO
   - **Meta Description**: For SEO

3. Click **Save**

## Viewing Your Products

- **Product Listing**: `http://127.0.0.1:8000/`
- **Product Detail**: `http://127.0.0.1:8000/product/<product-slug>/`

## Features

✅ **Admin Interface**: Full CRUD operations for products and categories
✅ **Product Management**: Add products with images, pricing, features, and specifications
✅ **Category Management**: Organize products by categories
✅ **Image Upload**: Support for multiple product images
✅ **Filtering & Sorting**: Built-in filtering and sorting on the product listing page
✅ **Search**: Search products by name, description, or category
✅ **Responsive Design**: Works on mobile, tablet, and desktop

## Project Structure

```
django_ecommerce/
├── manage.py
├── requirements.txt
├── ecommerce_project/
│   ├── settings.py
│   ├── urls.py
│   └── ...
├── products/
│   ├── models.py      # Product and Category models
│   ├── admin.py       # Admin configuration
│   ├── views.py       # View functions
│   └── urls.py        # URL routing
├── templates/
│   ├── base.html
│   └── products/
│       ├── product_list.html
│       └── product_detail.html
├── static/
│   ├── css/
│   │   └── ecommerce-styles.css
│   └── js/
│       ├── ecommerce-script.js
│       └── product-detail-script.js
└── media/
    └── products/      # Uploaded product images
```

## Troubleshooting

### Issue: Images not displaying
- Make sure `MEDIA_ROOT` and `MEDIA_URL` are configured in settings.py (already done)
- Ensure the `media` folder exists
- Check file permissions

### Issue: Static files not loading
- Run `python manage.py collectstatic` (for production)
- In development, static files should work automatically

### Issue: Can't access admin
- Make sure you created a superuser: `python manage.py createsuperuser`
- Check that migrations ran successfully: `python manage.py migrate`

### Issue: Slug conflicts
- Slugs must be unique. If you get an error, modify the slug manually in the admin

## Next Steps (Optional Enhancements)

1. **User Authentication**: Add user accounts and login
2. **Shopping Cart**: Implement a proper cart model
3. **Reviews**: Add a Review model for customer reviews
4. **Orders**: Create an Order model for purchases
5. **Payment Integration**: Add payment processing
6. **Email Notifications**: Send order confirmations
7. **Product Variants**: Add size, color options
8. **Wishlist**: Allow users to save favorite products

## Production Deployment

Before deploying to production:

1. Set `DEBUG = False` in settings.py
2. Change `SECRET_KEY` to a secure random value
3. Set `ALLOWED_HOSTS` to your domain
4. Use a production database (PostgreSQL recommended)
5. Set up proper static file serving
6. Use environment variables for sensitive data
7. Enable HTTPS

## Support

For Django documentation, visit: https://docs.djangoproject.com/

