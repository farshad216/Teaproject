# Render.com Setup Instructions

## Render Dashboard Configuration

### 1. Root Directory
**Leave this EMPTY** (or don't set it)
- Your project root is the repository root
- All files are at the root level

### 2. Build Command
**Leave this EMPTY** or use:
```
pip install -r requirements.txt
```
*(Note: Render automatically installs from requirements.txt, but you can specify this if needed)*

**OR** if you want to be explicit:
```
pip install -r requirements.txt && python manage.py collectstatic --noinput
```

### 3. Start Command
**Leave this EMPTY**
- Render will automatically use the `web` command from your `Procfile`
- Your Procfile already has: `web: gunicorn ecommerce_project.wsgi --log-file -`

### 4. Environment Variables
**REQUIRED - Add these variables:**

#### Required Variables:

1. **SECRET_KEY** (REQUIRED)
   - **Name:** `SECRET_KEY`
   - **Value:** Generate a secure key using:
     ```bash
     python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
     ```
   - Or use any long random string (at least 50 characters)

2. **DJANGO_SUPERUSER_PASSWORD** (REQUIRED for admin access)
   - **Name:** `DJANGO_SUPERUSER_PASSWORD`
   - **Value:** Your desired admin password (choose a strong password)
   - Example: `MySecureAdminPass123!`

#### Optional Variables (but recommended):

3. **DJANGO_SUPERUSER_USERNAME** (Optional)
   - **Name:** `DJANGO_SUPERUSER_USERNAME`
   - **Value:** Your admin username
   - Default: `admin` (if not set)

4. **DJANGO_SUPERUSER_EMAIL** (Optional)
   - **Name:** `DJANGO_SUPERUSER_EMAIL`
   - **Value:** Your admin email
   - Default: `admin@example.com` (if not set)

5. **RENDER_EXTERNAL_HOSTNAME** (Optional - Auto-set by Render)
   - **Name:** `RENDER_EXTERNAL_HOSTNAME`
   - **Value:** Usually auto-set by Render, but you can leave it empty

6. **DEBUG** (Optional - for debugging)
   - **Name:** `DEBUG`
   - **Value:** `False` (for production) or `True` (to see error details)
   - Default: `False`

## Summary - What to Fill:

### Root Directory:
```
(Leave empty)
```

### Build Command:
```
(Leave empty - Render uses Procfile)
```
OR
```
pip install -r requirements.txt
```

### Start Command:
```
(Leave empty - Render uses Procfile)
```

### Environment Variables:
Add these **3 required** variables:

| Variable Name | Value | Notes |
|--------------|-------|-------|
| `SECRET_KEY` | (Generate using command above) | Required |
| `DJANGO_SUPERUSER_PASSWORD` | (Your admin password) | Required for admin |
| `DJANGO_SUPERUSER_USERNAME` | `admin` | Optional (defaults to "admin") |
| `DJANGO_SUPERUSER_EMAIL` | `your-email@example.com` | Optional |

## After Setup:

1. Click **Save Changes** or **Deploy**
2. Render will automatically:
   - Install dependencies from `requirements.txt`
   - Run migrations (from Procfile `release` command)
   - Collect static files (from Procfile `release` command)
   - Create your superuser (from Procfile `release` command)
   - Start the web server (from Procfile `web` command)

3. Once deployed, access:
   - **Website:** `https://teaproject.onrender.com`
   - **Admin:** `https://teaproject.onrender.com/admin/`
   - **Login with:** Username from `DJANGO_SUPERUSER_USERNAME` (or "admin") and password from `DJANGO_SUPERUSER_PASSWORD`

## Quick Copy-Paste Values:

**SECRET_KEY** (run this locally to generate):
```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

**DJANGO_SUPERUSER_PASSWORD:**
```
(Choose your own strong password)
```

**DJANGO_SUPERUSER_USERNAME:**
```
admin
```

**DJANGO_SUPERUSER_EMAIL:**
```
admin@example.com
```

