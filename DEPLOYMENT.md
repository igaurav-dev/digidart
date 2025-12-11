# Deployment Guide

Complete deployment instructions for Brand Visibility Analyzer

## Table of Contents
1. [Backend Deployment (Render)](#backend-deployment-render)
2. [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
3. [Alternative: Railway (Backend)](#alternative-railway-backend)
4. [Environment Configuration](#environment-configuration)
5. [Troubleshooting](#troubleshooting)

---

## Backend Deployment (Render)

### Step 1: Prepare Your Repository
1. Push your code to GitHub
2. Ensure `backend/package.json` has correct build scripts:
   ```json
   {
     "scripts": {
       "build": "tsc",
       "start": "node dist/server.js"
     }
   }
   ```

### Step 2: Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub

### Step 3: Create New Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Select your repository

### Step 4: Configure Service
- **Name**: `brand-visibility-backend`
- **Root Directory**: `backend`
- **Environment**: `Node`
- **Region**: Choose closest to your users
- **Branch**: `main`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`

### Step 5: Set Environment Variables
Click "Environment" and add:
```
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://your-app.vercel.app
```

> ⚠️ **Important**: Update `CORS_ORIGIN` after deploying frontend

### Step 6: Deploy
1. Click "Create Web Service"
2. Wait for build to complete (5-10 minutes)
3. Note your backend URL: `https://brand-visibility-backend.onrender.com`

### Step 7: Test Backend
```bash
curl https://brand-visibility-backend.onrender.com/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2025-12-11T18:18:39.000Z"
}
```

---

## Frontend Deployment (Vercel)

### Method 1: Vercel CLI (Recommended)

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Navigate to Frontend
```bash
cd frontend
```

#### Step 3: Login to Vercel
```bash
vercel login
```

#### Step 4: Deploy
```bash
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Choose your account
- Link to existing project? **N**
- Project name? `brand-visibility-analyzer`
- Directory? `./`
- Override settings? **N**

#### Step 5: Set Environment Variable
```bash
vercel env add NEXT_PUBLIC_BACKEND_URL production
```
Enter: `https://your-backend.onrender.com`

#### Step 6: Deploy to Production
```bash
vercel --prod
```

Your app will be live at: `https://brand-visibility-analyzer.vercel.app`

### Method 2: Vercel Dashboard

#### Step 1: Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub

#### Step 2: Import Project
1. Click "New Project"
2. Import your GitHub repository
3. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

#### Step 3: Environment Variables
Add in Vercel dashboard:
```
NEXT_PUBLIC_BACKEND_URL=https://your-backend.onrender.com
```

#### Step 4: Deploy
Click "Deploy" and wait for completion

---

## Alternative: Railway (Backend)

### Step 1: Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub

### Step 2: Create New Project
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your repository

### Step 3: Configure Service
1. Click "Settings"
2. Set **Root Directory**: `/backend`
3. Add environment variables:
   ```
   PORT=5000
   NODE_ENV=production
   CORS_ORIGIN=https://your-app.vercel.app
   ```

### Step 4: Add Custom Start Command
In Settings → Deploy:
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`

### Step 5: Generate Domain
1. Go to "Settings" → "Networking"
2. Click "Generate Domain"
3. Note your URL: `https://your-app.up.railway.app`

---

## Environment Configuration

### Production Environment Variables

#### Backend (Render/Railway)
```bash
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://brand-visibility-analyzer.vercel.app
```

#### Frontend (Vercel)
```bash
NEXT_PUBLIC_BACKEND_URL=https://brand-visibility-backend.onrender.com
```

### Updating CORS After Frontend Deployment

1. Go to Render/Railway dashboard
2. Navigate to your backend service
3. Update `CORS_ORIGIN` with your Vercel URL
4. Redeploy backend service

---

## Post-Deployment Steps

### 1. Update Backend CORS
After deploying frontend, update backend `CORS_ORIGIN`:
```bash
# In Render/Railway dashboard
CORS_ORIGIN=https://your-actual-vercel-url.vercel.app
```

### 2. Redeploy Frontend
After updating backend URL:
```bash
vercel --prod
```

### 3. Test End-to-End
1. Visit your frontend URL
2. Submit a brand analysis
3. Verify results page displays correctly
4. Check browser console for errors

### 4. Monitor Logs

**Render Logs:**
- Go to your service → "Logs" tab
- Monitor for errors

**Vercel Logs:**
```bash
vercel logs [deployment-url]
```

---

## Troubleshooting

### CORS Errors

**Symptom**: Browser console shows CORS policy errors

**Solution**:
1. Verify `CORS_ORIGIN` in backend matches frontend URL exactly
2. Include protocol (`https://`)
3. No trailing slash
4. Redeploy backend after changes

### 404 on API Calls

**Symptom**: API calls return 404

**Check**:
1. Verify `NEXT_PUBLIC_BACKEND_URL` includes `/api` in your code
2. Backend URL is correct
3. Backend is running (check Render/Railway dashboard)

### Build Failures

**Backend Build Fails**:
```bash
# Check that backend/tsconfig.json exists
# Verify all dependencies in package.json
# Check Render/Railway build logs for specific errors
```

**Frontend Build Fails**:
```bash
# Ensure NEXT_PUBLIC_BACKEND_URL is set
# Check for TypeScript errors locally first
# Review Vercel build logs
```

### Environment Variables Not Working

**Frontend**:
- Ensure variable starts with `NEXT_PUBLIC_`
- Redeploy after adding variables
- Clear build cache in Vercel

**Backend**:
- Verify variable names match code
- Restart service after adding variables
- Check for typos

### Slow Initial Response (Render Free Tier)

**Issue**: First request after inactivity is slow

**Explanation**: Render free tier spins down after 15 minutes of inactivity

**Solutions**:
1. Upgrade to paid plan ($7/month)
2. Use a service like UptimeRobot to ping your API
3. Accept cold starts (15-30 seconds)

### Data Persistence Issues

**Issue**: Submissions disappear after restart

**Explanation**: Render/Railway may reset filesystem on redeploy

**Solutions**:
1. Use external database (PostgreSQL, MongoDB)
2. Use cloud storage (AWS S3, Google Cloud Storage)
3. Accept data loss on free tier for demo purposes

---

## Production Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] Environment variables configured
- [ ] CORS properly configured
- [ ] End-to-end test completed
- [ ] Error monitoring setup (optional)
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active (automatic on Vercel/Render)
- [ ] Logs reviewed for errors
- [ ] Performance tested

---

## Scaling Considerations

### For Production Use:

1. **Database**: Replace JSON file storage with PostgreSQL or MongoDB
2. **Caching**: Add Redis for frequently accessed data
3. **CDN**: Use Vercel's built-in CDN for assets
4. **Rate Limiting**: Implement API rate limiting
5. **Monitoring**: Add Sentry or similar for error tracking
6. **Analytics**: Integrate Google Analytics or Plausible
7. **Backup**: Implement regular database backups

---

## Support Resources

- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **Railway Docs**: https://docs.railway.app
- **Next.js Deployment**: https://nextjs.org/docs/deployment

---

**Ready for production! 🚀**
