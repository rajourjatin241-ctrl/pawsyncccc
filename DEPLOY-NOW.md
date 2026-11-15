# 🚀 Deploy PawSync RIGHT NOW

Follow these steps in order. I'll give you exact values to copy/paste.

---

## STEP 1: MongoDB Atlas (Database) — 5 minutes

### 1.1 Create Account & Cluster
1. Open: https://www.mongodb.com/cloud/atlas/register
2. Sign up with Google (fastest)
3. Click **"Build a Database"**
4. Choose **"M0 FREE"** cluster
5. Provider: **AWS**, Region: **us-east-1** (or closest to you)
6. Cluster Name: **pawsync** (or leave default)
7. Click **"Create"**

### 1.2 Create Database User
1. You'll see "Security Quickstart"
2. Authentication Method: **Username and Password**
3. Username: `pawsync`
4. Password: Click **"Autogenerate Secure Password"** → **COPY IT AND SAVE IT**
   - Example: `xK9mP2nQ7vL4wR8z`
5. Click **"Create User"**

### 1.3 Add IP Address
1. Still on Security Quickstart
2. Click **"Add My Current IP Address"**
3. **ALSO** click **"Add a Different IP Address"**
   - IP Address: `0.0.0.0/0`
   - Description: `Allow all (for Render)`
4. Click **"Finish and Close"**

### 1.4 Get Connection String
1. Click **"Connect"** button on your cluster
2. Choose **"Connect your application"**
3. Driver: **Node.js**, Version: **5.5 or later**
4. **COPY** the connection string (looks like this):
   ```
   mongodb+srv://pawsync:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. **Replace** `<password>` with your actual password from step 1.2
6. **Add** `/pawsync` before the `?` (this is your database name):
   ```
   mongodb+srv://pawsync:xK9mP2nQ7vL4wR8z@cluster0.xxxxx.mongodb.net/pawsync?retryWrites=true&w=majority
   ```

**✅ SAVE THIS STRING — YOU'LL NEED IT IN STEP 2**

---

## STEP 2: Render (Backend) — 5 minutes

### 2.1 Create Account & Connect GitHub
1. Open: https://dashboard.render.com/register
2. Sign up with GitHub (easiest)
3. Authorize Render to access your repos

### 2.2 Create Web Service
1. Click **"New +"** (top right) → **"Web Service"**
2. Connect repository: **pawsyncccc**
   - If you don't see it, click **"Configure account"** → give Render access
3. Click **"Connect"** next to pawsyncccc

### 2.3 Configure Service
Fill in these EXACT values:

**Basic Settings:**
- **Name**: `pawsync-api`
- **Region**: Oregon (US West) or closest to you
- **Branch**: `main`
- **Root Directory**: `server`
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `node index.js`

**Plan:**
- **Instance Type**: `Free`

### 2.4 Add Environment Variables
Scroll down to **"Environment Variables"** → Click **"Add Environment Variable"** for each:

```
Key: NODE_ENV
Value: production
```

```
Key: MONGODB_URI
Value: [PASTE YOUR MONGODB CONNECTION STRING FROM STEP 1.4]
```

```
Key: JWT_SECRET
Value: pawsync_prod_jwt_secret_2024_xyz_random
```

```
Key: ADMIN_USERNAME
Value: admin
```

```
Key: ADMIN_PASSWORD
Value: pawsync2024
```

### 2.5 Deploy
1. Click **"Create Web Service"** (bottom)
2. Wait 3-5 minutes (watch the logs — you'll see "Building..." then "Deploy succeeded")
3. **COPY YOUR BACKEND URL** from the top (looks like):
   ```
   https://pawsync-api-xxxx.onrender.com
   ```

**✅ SAVE THIS URL — YOU'LL NEED IT IN STEP 3**

### 2.6 Seed Database
1. Once deployed, click **"Shell"** tab (top navigation)
2. Wait for shell to connect
3. Type: `node seed.js` and press Enter
4. You should see: "✅ Seeded 6 pets and 1 admin user"

---

## STEP 3: Vercel (Frontend) — 3 minutes

### 3.1 Create Account
1. Open: https://vercel.com/signup
2. Sign up with GitHub (must use GitHub)
3. Authorize Vercel

### 3.2 Import Project
1. Click **"Add New..."** → **"Project"**
2. Find **"pawsyncccc"** → Click **"Import"**

### 3.3 Configure Project
**Framework Preset**: Should auto-detect as **Vite** ✅

**Root Directory**: `.` (leave as is)

**Build Settings**:
- Build Command: `npm run build` ✅
- Output Directory: `dist` ✅
- Install Command: `npm install` ✅

### 3.4 Add Environment Variables
Click **"Environment Variables"** (expand if needed):

```
Name: VITE_API_URL
Value: [PASTE YOUR RENDER URL FROM STEP 2.5]
```
Example: `https://pawsync-api-xxxx.onrender.com`

### 3.5 Deploy
1. Click **"Deploy"**
2. Wait 2-3 minutes
3. You'll see 🎉 confetti when done
4. Click **"Continue to Dashboard"**
5. Click on your deployment URL (looks like):
   ```
   https://pawsyncccc.vercel.app
   ```

**✅ YOUR APP IS NOW LIVE!**

---

## STEP 4: Update API Proxy — 1 minute

We need to update one config file with your real Render URL:

### In your code editor:
1. Open: `/Users/jatinrajour/Desktop/pawsync/vercel.json`
2. Find line 7: `"destination": "https://pawsync-api.onrender.com/api/:path*"`
3. Replace with YOUR Render URL:
   ```json
   "destination": "https://pawsync-api-xxxx.onrender.com/api/:path*"
   ```

### Push the change:
```bash
cd /Users/jatinrajour/Desktop/pawsync
git add vercel.json
git commit -m "fix: use production API URL"
git push pawsyncccc main
```

Vercel will auto-redeploy in ~1 minute.

---

## ✅ DONE! Test Your App

Visit your Vercel URL: `https://pawsyncccc.vercel.app`

**Test these:**
1. Scroll to "Meet Our Furry Friends" — pets should load from database
2. Click **"Adopt Me"** on any pet → fill form → submit
3. Click **🐾 chat bubble** (bottom-right) → talk to AI
4. Scroll to "Strategic Support Needed" → submit contact form
5. Scroll to "NGO Collaboration" → click "Partner With Us" → submit

---

## 🎉 You're Live!

**Frontend**: https://pawsyncccc.vercel.app
**Backend**: https://pawsync-api-xxxx.onrender.com
**Database**: MongoDB Atlas

**Total Cost**: $0/month (all free tiers)

---

## 🔧 If Something Breaks

**Pets don't load?**
- Wait 30 seconds (Render free tier spins down after 15min idle)
- Check Render logs: Dashboard → pawsync-api → Logs tab

**CORS errors?**
- Make sure `VITE_API_URL` in Vercel has NO trailing slash
- Check backend is running: visit `https://your-render-url.onrender.com/api/health`

**Forms don't submit?**
- Check browser console (F12) for errors
- Verify Render env vars are set correctly

---

## 🔑 Admin Access

Get a JWT token:
```bash
curl -X POST https://your-render-url.onrender.com/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"username":"admin","password":"pawsync2024"}'
```

Use the token to see all adoption applications:
```bash
curl https://your-render-url.onrender.com/api/applications \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN'
```
