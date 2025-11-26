# Setup PostgreSQL Database on Render.com

## Problem
Your app is currently using SQLite, which is a file-based database. On Render.com, the filesystem is **ephemeral** (temporary), meaning:
- Files can be lost when the service restarts
- Files are not shared across deployments
- Products you add disappear after restarts

## Solution
Use **PostgreSQL** - a persistent database that survives restarts and deployments.

---

## Step 1: Create PostgreSQL Database on Render

1. Go to your **Render Dashboard**: https://dashboard.render.com
2. Click **"New +"** button (top right)
3. Select **"PostgreSQL"**
4. Fill in the details:
   - **Name**: `teaproject-db` (or any name you prefer)
   - **Database**: `teaproject_db` (or any name)
   - **User**: `teaproject_user` (or any name)
   - **Region**: Choose closest to you
   - **PostgreSQL Version**: Latest (15 or 16)
   - **Plan**: **Free** (for testing)
5. Click **"Create Database"**
6. Wait for the database to be created (takes 1-2 minutes)

---

## Step 2: Get Database Connection String

1. Click on your newly created PostgreSQL database
2. Go to **"Connections"** tab
3. Find **"Internal Database URL"** (for services in the same account)
4. Copy the **Internal Database URL** - it looks like:
   ```
   postgresql://teaproject_user:password@dpg-xxxxx-a/teaproject_db
   ```

---

## Step 3: Link Database to Your Web Service

### Option A: Automatic Linking (Recommended)
1. Go to your **Web Service** (the Django app)
2. Go to **"Settings"** tab
3. Scroll down to **"Service Connections"**
4. Click **"Link Database"**
5. Select your PostgreSQL database
6. Click **"Link"**

Render will automatically add the `DATABASE_URL` environment variable.

### Option B: Manual Environment Variable
1. Go to your **Web Service** → **"Settings"** → **"Environment"**
2. Click **"Add Environment Variable"**
3. **Name**: `DATABASE_URL`
4. **Value**: Paste the Internal Database URL you copied
5. Click **"Save Changes"**

---

## Step 4: Update Build Command

Your Build Command should include migrations:

```
pip install -r requirements.txt && python manage.py migrate --noinput && python manage.py collectstatic --noinput --clear
```

---

## Step 5: Redeploy

1. After linking the database, Render will automatically redeploy
2. Or manually trigger a deploy: Go to **"Manual Deploy"** → **"Deploy latest commit"**

---

## Step 6: Verify It Works

1. After deployment completes, visit your site
2. Sign in or register a new account
3. Add a product in the admin panel
4. Check if the product appears on the home page
5. **Restart your service** (to test persistence)
6. Check again - the product should still be there!

---

## Troubleshooting

### Error: "no such table"
- Make sure migrations ran: Check the build logs
- Manually run migrations in Build Command

### Error: "connection refused"
- Verify `DATABASE_URL` is set correctly
- Check if database is running (green status)
- Make sure you're using **Internal Database URL** (not External)

### Products still disappearing
- Verify `DATABASE_URL` environment variable exists
- Check build logs to confirm migrations ran
- Make sure you're using the linked database, not SQLite

---

## Important Notes

- **Free tier databases** on Render may spin down after inactivity (15 minutes)
- First request after spin-down may take 30-60 seconds to wake up
- For production, consider upgrading to a paid plan

---

## Local Development

For local development, the app will still use SQLite (since `DATABASE_URL` won't be set locally).

To use PostgreSQL locally:
1. Install PostgreSQL on your computer
2. Create a local database
3. Set `DATABASE_URL` in your local `.env` file:
   ```
   DATABASE_URL=postgresql://user:password@localhost:5432/dbname
   ```

