# Render.com Configuration Fields - Exact Values

## Complete Field-by-Field Configuration

### 1. Root Directory
```
(Leave empty - blank)
```
**Why:** Your project is in the root of the repository, not a subdirectory.

---

### 2. Build Command
```
pip install -r requirements.txt
```
**Why:** This installs all Python dependencies. Keep it simple - migrations and superuser creation will run in Pre-Deploy Command.

---

### 3. Start Command
```
gunicorn ecommerce_project.wsgi:application --bind 0.0.0.0:$PORT
```
**Why:** This starts your Django application using gunicorn. The `$PORT` variable is automatically provided by Render.

---

### 4. Pre-Deploy Command ⚠️ **CRITICAL FOR SUPERUSER CREATION**
```
python manage.py migrate --noinput && python manage.py collectstatic --noinput --clear && python manage.py create_superuser_if_none
```
**Why:** 
- This runs **BEFORE** the start command
- Runs database migrations
- Collects static files
- **Creates the superuser automatically**
- This is more reliable than the Procfile release command

---

### 5. Environment Variables

Click **Add Environment Variable** for each of these:

#### Required Variables:

| Variable Name | Value | Notes |
|--------------|-------|-------|
| `SECRET_KEY` | `(Generate one - see below)` | **REQUIRED** - Django secret key |
| `DJANGO_SUPERUSER_PASSWORD` | `(Your chosen password)` | **REQUIRED** - Admin password |
| `DJANGO_SUPERUSER_USERNAME` | `admin` | **REQUIRED** - Admin username |
| `DJANGO_SUPERUSER_EMAIL` | `admin@example.com` | Optional but recommended |
| `DEBUG` | `False` | Set to `True` only for debugging |

#### How to Generate SECRET_KEY:

Run this command locally (in your project directory):
```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

Copy the output and paste it as the value for `SECRET_KEY`.

#### Example Environment Variables:

```
SECRET_KEY = django-insecure-abc123xyz789... (your generated key)
DJANGO_SUPERUSER_USERNAME = admin
DJANGO_SUPERUSER_EMAIL = admin@example.com
DJANGO_SUPERUSER_PASSWORD = YourSecurePassword123!
DEBUG = False
```

---

### 6. Secret Files
```
(Leave empty - not needed)
```
**Why:** You're using environment variables instead, which is simpler.

---

### 7. Health Check Path
```
/healthz
```
**OR leave empty** (the default is fine)

**Why:** This is optional. Render will check this endpoint to see if your app is running.

---

### 8. Auto-Deploy
```
✅ Enabled (checked)
```
**Why:** This automatically deploys when you push to GitHub. Keep it enabled for convenience.

---

### 9. Build Filters

#### Included Paths:
```
(Leave empty - will include all paths by default)
```

#### Ignored Paths:
```
(Leave empty - or add if you have files you don't want to trigger deploys)
```

---

## Quick Copy-Paste Summary

### Build Command:
```
pip install -r requirements.txt
```

### Start Command:
```
gunicorn ecommerce_project.wsgi:application --bind 0.0.0.0:$PORT
```

### Pre-Deploy Command:
```
python manage.py migrate --noinput && python manage.py collectstatic --noinput --clear && python manage.py create_superuser_if_none
```

### Environment Variables (Add these 5):
1. `SECRET_KEY` = (generate using command above)
2. `DJANGO_SUPERUSER_USERNAME` = `admin`
3. `DJANGO_SUPERUSER_EMAIL` = `admin@example.com`
4. `DJANGO_SUPERUSER_PASSWORD` = (your password)
5. `DEBUG` = `False`

---

## Why Pre-Deploy Command Instead of Procfile?

Since superuser creation failed before, using **Pre-Deploy Command** is more reliable because:
- ✅ It's explicitly configured in Render's UI
- ✅ It runs before the web server starts
- ✅ It's easier to see in logs
- ✅ Render guarantees it runs before the start command

The Procfile `release` command should still work, but Pre-Deploy Command is more explicit and reliable.

---

## After Setting These Values

1. Click **Save Changes** at the bottom
2. Render will automatically trigger a new deployment
3. Go to **Logs** tab and watch for:
   - Build phase: Installing dependencies
   - **Pre-Deploy phase: Running migrations and creating superuser**
   - Web phase: Starting gunicorn

4. Look for this in logs:
   ```
   ==> Running pre-deploy command...
   Operations to perform:
     Apply all migrations...
   Running migrations:
     Applying products.0001_initial... OK
   ...
   Collecting static files...
   Successfully created superuser: admin (is_staff=True, is_superuser=True)
   ```

5. Once deployed, test admin login:
   - URL: `https://teaproject.onrender.com/admin/`
   - Username: `admin` (or your `DJANGO_SUPERUSER_USERNAME` value)
   - Password: Your `DJANGO_SUPERUSER_PASSWORD` value

---

## Troubleshooting

### If Pre-Deploy Command doesn't run:
1. Make sure you clicked **Save Changes**
2. Check that there are no syntax errors in the command
3. Look in logs for any error messages

### If superuser still not created:
1. Check logs for error messages from `create_superuser_if_none`
2. Verify `DJANGO_SUPERUSER_PASSWORD` is set correctly (no extra spaces)
3. Check that `DJANGO_SUPERUSER_USERNAME` is set

### If you see "Superuser already exists":
- This means a user with that username exists but might not be a superuser
- The updated command should upgrade them, but if not, you may need to delete the user first (requires shell access or database access)

---

## Final Checklist

Before saving:
- [ ] Root Directory: Empty
- [ ] Build Command: `pip install -r requirements.txt`
- [ ] Start Command: `gunicorn ecommerce_project.wsgi:application --bind 0.0.0.0:$PORT`
- [ ] **Pre-Deploy Command: `python manage.py migrate --noinput && python manage.py collectstatic --noinput --clear && python manage.py create_superuser_if_none`**
- [ ] Environment Variables: All 5 variables added
- [ ] `SECRET_KEY` is generated and set
- [ ] `DJANGO_SUPERUSER_PASSWORD` is set
- [ ] Health Check Path: `/healthz` or empty
- [ ] Auto-Deploy: Enabled

After saving:
- [ ] Watch logs for Pre-Deploy command execution
- [ ] Verify "Successfully created superuser" message appears
- [ ] Test admin login

