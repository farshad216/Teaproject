# Quick Start Guide

## Fast Setup (5 minutes)

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Setup Database
```bash
python manage.py migrate
```

### 3. Create Admin User
```bash
python manage.py createsuperuser
```
Enter username, email, and password when prompted.

### 4. Run Server
```bash
python manage.py runserver
```

### 5. Access Your Site
- **Frontend**: http://127.0.0.1:8000/
- **Admin Panel**: http://127.0.0.1:8000/admin/

## Adding Your First Product

1. Go to http://127.0.0.1:8000/admin/
2. Login with your superuser credentials
3. Click **Categories** → **Add Category**
   - Name: "Electronics"
   - Click **Save**
4. Click **Products** → **Add Product**
   - Fill in product details
   - Upload a product image
   - Click **Save**
5. View your product at http://127.0.0.1:8000/

That's it! You're ready to start adding products.

