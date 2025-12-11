# Quick Deployment Guide - Backend First

## ✅ Pre-Deployment Checklist

- ✅ Backend builds successfully (`npm run build`)
- ✅ Frontend builds successfully (`npm run build`)
- ✅ No errors found
- ✅ Real data integration working

---

## 🚀 Step 1: Deploy Backend to Render (5-10 minutes)

### Option A: Using Render Dashboard (Easiest)

1. **Go to** [render.com](https://render.com) and sign up/login with GitHub

2. **Click** "New +" → "Web Service"

3. **Connect your repository**:
   - Authorize Render to access your GitHub
   - Select the `digidarts_project` repository

4. **Configure the service**:
   ```
   Name: brand-visibility-backend
   Root Directory: backend
   Environment: Node
   Build Command: npm install && npm run build
   Start Command: npm start
   ```

5. **Add Environment Variables** (click "Advanced"):
   ```
   PORT = 5000
   NODE_ENV = production
   CORS_ORIGIN = https://brand-visibility-analyzer.vercel.app
   ```
   
   > Note: You'll update CORS_ORIGIN later with actual Vercel URL

6. **Click** "Create Web Service"

7. **Wait** for deployment (~5-10 minutes)
   - Watch the logs
   - Wait for "Live" status

8. **Copy your backend URL**: 
   - Example: `https://brand-visibility-backend-xxx.onrender.com`
   - **SAVE THIS URL!**

### Test Your Backend

Open this URL in browser:
```
https://your-backend-url.onrender.com/api/health
```

You should see:
```json
{
  "status": "healthy",
  "timestamp": "2025-12-11T..."
}
```

---

## 🎯 Step 2: Update Frontend Environment

After backend is deployed, update your frontend:

1. **Update** `/frontend/.env.local`:
   ```env
   NEXT_PUBLIC_BACKEND_URL=https://your-actual-render-url.onrender.com
   ```
   (Replace with the URL from Step 1)

2. **Verify** the file is saved

---

## 🚀 Step 3: Deploy Frontend to Vercel

### Option A: Using Vercel CLI

1. **Navigate to frontend**:
   ```bash
   cd frontend
   ```

2. **Login to Vercel** (if not already):
   ```bash
   vercel login
   ```
   - Follow the authentication steps

3. **Deploy**:
   ```bash
   vercel --prod
   ```

4. **Answer prompts**:
   ```
   ? Set up and deploy? Yes
   ? Which scope? [Your account]
   ? Link to existing project? No
   ? Project name? brand-visibility-analyzer
   ? Directory? ./
   ? Override settings? No
   ```

5. **Wait** for deployment (~2-3 minutes)

6. **Copy your Vercel URL**:
   - Example: `https://brand-visibility-analyzer-xxx.vercel.app`

### Option B: Using Vercel Dashboard

1. **Go to** [vercel.com/new](https://vercel.com/new)

2. **Import** your Git repository

3. **Configure**:
   ```
   Framework: Next.js
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: (leave default)
   ```

4. **Add Environment Variable**:
   ```
   NEXT_PUBLIC_BACKEND_URL = https://your-render-backend-url.onrender.com
   ```

5. **Click** "Deploy"

6. **Wait** for deployment

7. **Copy** your Vercel URL

---

## 🔄 Step 4: Update Backend CORS

After frontend is deployed:

1. **Go back to Render dashboard**
2. **Select** your backend service
3. **Go to** Environment
4. **Edit** `CORS_ORIGIN`:
   ```
   CORS_ORIGIN=https://your-actual-vercel-url.vercel.app
   ```
   (Use the exact URL from Step 3)

5. **Save** changes
6. **Wait** for auto-redeploy (~1-2 minutes)

---

## ✅ Step 5: Test Live Application

1. **Open** your Vercel URL in browser

2. **Test the form**:
   - Brand: "Nike"
   - Website: "https://www.nike.com"
   - Email: "test@example.com"

3. **Submit** and verify:
   - ✅ Form submits (may take 15-30 seconds first time - Render cold start)
   - ✅ Redirects to results page
   - ✅ Metrics display
   - ✅ Charts render
   - ✅ Dark mode works

---

## 🎉 You're Live!

**Frontend**: `https://your-app.vercel.app`  
**Backend**: `https://your-app.onrender.com`

---

## 🐛 Common Issues

**"CORS error"**:
- Verify CORS_ORIGIN in Render matches Vercel URL exactly
- Include `https://`
- No trailing slash

**"Backend not responding"**:
- First request takes 15-30 seconds (cold start on free tier)
- Check Render logs for errors
- Verify environment variables are set

**"Build failed"**:
- Check build logs in Render/Vercel
- Ensure all dependencies are in package.json
- Verify build commands are correct

---

## 📝 Deployment Commands Summary

```bash
# Build locally first (verify no errors)
cd backend && npm run build
cd ../frontend && npm run build

# Deploy backend to Render (via dashboard)
# Get backend URL: https://xxx.onrender.com

# Update frontend .env.local
echo "NEXT_PUBLIC_BACKEND_URL=https://xxx.onrender.com" > frontend/.env.local

# Deploy frontend to Vercel
cd frontend
vercel --prod
# Get frontend URL: https://xxx.vercel.app

# Update backend CORS (in Render dashboard)
# CORS_ORIGIN=https://xxx.vercel.app
```

---

**Need help?** Check the logs in Render and Vercel dashboards!
