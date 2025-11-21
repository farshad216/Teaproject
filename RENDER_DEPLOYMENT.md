# Render.com Deployment Guide

## Quick Setup Steps

### 1. Environment Variables
In your Render.com dashboard, add these environment variables:

- `SECRET_KEY`: Generate a secure secret key (you can use: `python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"`)
- `RENDER_EXTERNAL_HOSTNAME`: This is automatically set by Render (optional, but recommended)

### 2. Create Admin Superuser (For Free Tier - No Shell Access)
Since Render free tier doesn't have shell access, we'll use environment variables to auto-create a superuser:

1. Go to your Render dashboard
2. Click on your web service
3. Go to the "Environment" tab
4. Add these environment variables:

   - `DJANGO_SUPERUSER_USERNAME`: Your desired admin username (default: `admin`)
   - `DJANGO_SUPERUSER_EMAIL`: Your admin email (default: `admin@example.com`)
   - `DJANGO_SUPERUSER_PASSWORD`: Your admin password (REQUIRED - choose a strong password)

5. After adding these variables, redeploy your service (or it will auto-deploy)
6. The superuser will be created automatically during deployment

**Important**: Make sure `DJANGO_SUPERUSER_PASSWORD` is set, otherwise the superuser won't be created.

### 3. Access Admin Panel
Once the superuser is created, you can access the admin at:
- `https://teaproject.onrender.com/admin/`

### 4. Upload Products
1. Log in to the admin panel
2. Go to **Products** → **Add Product**
3. Fill in product details and upload images
4. Click **Save**

## Troubleshooting

### 500 Error
- Check Render logs for specific error messages
- Ensure `SECRET_KEY` environment variable is set
- Verify migrations ran successfully
- Check that static files were collected

### Admin Not Working
- Make sure you created a superuser (see step 2 above)
- Check that migrations ran: `python manage.py migrate`
- Verify the database is accessible

### Static Files Not Loading
- Static files are automatically collected during deployment via the `release` command in Procfile
- If issues persist, check Render logs for collectstatic errors

### Images Not Displaying
- Media files are served via Django in production
- Ensure the `media` folder has proper permissions
- Check that images are uploaded correctly in admin

## File Structure
- `Procfile`: Defines release and web commands
- `requirements.txt`: Python dependencies
- `build.sh`: Build script (optional, Procfile handles it)

## Support
If you encounter issues, check the Render logs in your dashboard for detailed error messages.

