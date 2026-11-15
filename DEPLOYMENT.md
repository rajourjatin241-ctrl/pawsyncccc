# PawSync Deployment Guide 🚀

## Prerequisites
- GitHub account (you already have the repo)
- Vercel account (sign up with GitHub at vercel.com)
- Render account (sign up at render.com)
- MongoDB Atlas account (sign up at mongodb.com/cloud/atlas)

---

## Step 1: Set Up MongoDB Atlas (Database)

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create a free M0 cluster (512MB, forever free)
3. Choose AWS / us-east-1 (or closest to you)
4. Create a database user:
   - Username: `pawsync`
   - Password: (generate a secure one, save it)
5. Network Access → Add IP: `0.0.0.0/0` (allow all — Render needs this)
6. Get connection string:
   - Click "Connect" → "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://pawsync:<password>@cluster0.xxxxx.mongodb.net/pawsync?retryWrites=true&w=majority`)
   - Replace `<password>` with your actual password
   - Replace `myFirstDatabase` or the database name with `pawsync`

**Save this connection string — you'll need it for Render.**

---

## Step 2: Deploy Backend to Render

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repo: `pawsync`
4. Configure:
   - **Name**: `pawsync-api`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
   - **Plan**: Free
5. Add Environment Variables (click "Advanced" → "Add Environment Variable"):
   ```
   NODE_ENV = production
   PORT = 10000
   MONGODB_URI = <your MongoDB Atlas connection string from Step 1>
   JWT_SECRET = <generate a random 32-character string>
   ADMIN_USERNAME = admin
   ADMIN_PASSWORD = <choose a secure password>
   ```
6. Click **"Create Web Service"**
7. Wait 3-5 minutes for the build to complete
8. **Copy your backend URL** (looks like: `https://pawsync-api.onrender.com`)

### Seed the production database

Once deployed, run this in your terminal:

```bash
curl -X POST https://pawsync-api.onrender.com/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"username":"admin","password":"YOUR_ADMIN_PASSWORD"}'
```

If it returns an error about "User not found", you need to seed:

**Option A** — Via Render dashboard:
1. Go to your service → "Shell" tab
2. Run: `node seed.js`

**Option B** — Seed locally then import:
1. Export your local MongoDB:
   ```bash
   mongodump --db pawsync --out ./dump
   ```
2. Import to Atlas using MongoDB Compass or mongoimport

---

## Step 3: Deploy Frontend to Vercel

1. Push your latest code to GitHub:
   ```bash
   git add .
   git commit -m "chore: add deployment configs"
   git push origin main
   ```

2. Go to https://vercel.com/new
3. Import your `pawsync` GitHub repo
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (leave as root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add Environment Variables:
   ```
   VITE_API_URL = <your Render backend URL from Step 2>
   ```
   Example: `VITE_API_URL = https://pawsync-api.onrender.com`
6. Click **"Deploy"**
7. Wait 2-3 minutes
8. **Your app is live!** (e.g., `https://pawsync.vercel.app`)

---

## Step 4: Update vercel.json

The `vercel.json` already has an API proxy rule, but update it with your actual Render URL:

Edit `/vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://pawsync-api.onrender.com/api/:path*"
    }
  ]
}
```

Replace `pawsync-api.onrender.com` with your actual Render URL, then:

```bash
git add vercel.json
git commit -m "fix: update API URL in vercel.json"
git push
```

Vercel will auto-redeploy.

---

## Step 5: Verify Everything Works

1. Visit your Vercel URL (e.g., `https://pawsync.vercel.app`)
2. Check that pets load (scroll to "Meet Our Furry Friends")
3. Click "Adopt Me" on a pet → submit the form
4. Click the 🐾 chat bubble → talk to the AI
5. Scroll to "Strategic Support Needed" → submit contact form
6. Check Render logs to see incoming requests

---

## Troubleshooting

### Frontend loads but pets don't show
- Check Render backend logs: `https://dashboard.render.com` → your service → Logs
- Verify `VITE_API_URL` in Vercel matches your Render URL
- Check CORS: backend should allow your Vercel domain (already configured)

### "Cannot connect to MongoDB"
- MongoDB Atlas → Network Access → make sure `0.0.0.0/0` is allowed
- Verify connection string has correct username/password/database name

### Backend takes 30+ seconds to wake up
- Free tier on Render spins down after 15min of inactivity
- First request takes ~30s to wake up (this is normal)
- Upgrade to paid tier ($7/mo) for always-on

### Admin login fails
- Make sure you ran `seed.js` on production MongoDB
- Check `ADMIN_USERNAME` and `ADMIN_PASSWORD` env vars in Render

---

## Cost Summary

✅ **Total: $0/month**
- MongoDB Atlas M0: Free (512MB)
- Render Free Tier: Free (spins down after 15min idle)
- Vercel Hobby: Free (unlimited bandwidth)

To keep backend always-on: upgrade Render to $7/month.

---

## Admin API Access

Get a JWT token:
```bash
curl -X POST https://pawsync-api.onrender.com/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"username":"admin","password":"YOUR_ADMIN_PASSWORD"}'
```

Use the token to access admin endpoints:
```bash
curl -X GET https://pawsync-api.onrender.com/api/applications \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN'
```

---

You're all set! 🎉
