# 🚀 Quick Deploy Checklist

Follow these steps in order. Total time: ~15 minutes.

## ☑️ Step 1: MongoDB Atlas (5 min)

1. Sign up: https://www.mongodb.com/cloud/atlas/register
2. Create free M0 cluster → AWS → us-east-1
3. Security → Database Access → Add user: `pawsync` / (generate password)
4. Security → Network Access → Add IP: `0.0.0.0/0`
5. Click **Connect** → **Connect your application** → Copy connection string
6. **SAVE THIS**: `mongodb+srv://pawsync:<password>@cluster0.xxxxx.mongodb.net/pawsync?retryWrites=true&w=majority`
   - Replace `<password>` with your actual password
   - Make sure the database name is `pawsync` at the end

---

## ☑️ Step 2: Push to GitHub (1 min)

```bash
cd /Users/jatinrajour/Desktop/pawsync
git push origin main
```

---

## ☑️ Step 3: Deploy Backend to Render (5 min)

1. Sign up: https://dashboard.render.com
2. Click **New +** → **Web Service**
3. Connect GitHub → Select `pawsync` repo
4. Settings:
   - **Name**: `pawsync-api`
   - **Root Directory**: `server`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
   - **Plan**: Free
5. Click **Advanced** → Add Environment Variables:
   ```
   NODE_ENV = production
   MONGODB_URI = <paste your Atlas connection string>
   JWT_SECRET = pawsync_prod_secret_2024_random_xyz
   ADMIN_USERNAME = admin
   ADMIN_PASSWORD = <choose a strong password>
   ```
6. Click **Create Web Service**
7. **WAIT** 3-5 minutes (watch the logs)
8. **COPY** your backend URL: `https://pawsync-api-xxxx.onrender.com`

### Seed the production database:

Once deployed, go to Render dashboard → Your service → **Shell** tab:

```bash
node seed.js
```

---

## ☑️ Step 4: Deploy Frontend to Vercel (3 min)

1. Sign up: https://vercel.com (sign in with GitHub)
2. Click **Add New** → **Project**
3. Import `pawsync` repo
4. Settings (should auto-detect Vite):
   - **Framework**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Environment Variables**:
   ```
   VITE_API_URL = <paste your Render URL>
   ```
   Example: `https://pawsync-api-xxxx.onrender.com`
6. Click **Deploy**
7. **WAIT** 2-3 minutes
8. **DONE!** Click the deployment URL to see your app

---

## ☑️ Step 5: Update API URL in code (1 min)

Edit `vercel.json` line 7:

```json
"destination": "https://pawsync-api-xxxx.onrender.com/api/:path*"
```

Replace with your **actual Render URL**, then:

```bash
git add vercel.json
git commit -m "fix: use production API URL"
git push
```

Vercel will auto-redeploy in 1 minute.

---

## ✅ Test Your Deployment

1. Visit your Vercel URL
2. Scroll to "Meet Our Furry Friends" — pets should load
3. Click **Adopt Me** → fill form → submit
4. Click the **🐾 chat bubble** (bottom right) → talk to AI
5. Scroll down → submit contact form
6. Check Render logs to see requests coming in

---

## 🎉 You're Live!

**Frontend**: `https://pawsync-xxxx.vercel.app`  
**Backend**: `https://pawsync-api-xxxx.onrender.com`  
**Database**: MongoDB Atlas (free tier)

**Total cost**: $0/month

---

## 🔧 Troubleshooting

**Pets don't load?**
- Check Render logs for errors
- Verify `VITE_API_URL` in Vercel settings matches Render URL
- Make sure backend is awake (free tier spins down after 15min — first load takes 30s)

**Forms don't submit?**
- Check browser console for CORS errors
- Verify backend CORS allows your Vercel domain (already configured)

**Can't login as admin?**
- Make sure you ran `node seed.js` in Render shell
- Check `ADMIN_PASSWORD` env var in Render

---

Need help? Check **DEPLOYMENT.md** for the full guide.
