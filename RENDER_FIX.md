# Render Backend Deployment - Quick Fix

## 🔴 Problem

Render backend is failing with:
```
Error: Cannot find module '/opt/render/project/src/backend/dist/server.js'
```

**Root Cause**: The build command only installs dependencies (`yarn`) but doesn't compile TypeScript.

---

## ✅ Solution: Update Render Build Settings

### Go to Render Dashboard

1. **Open**: [render.com/dashboard](https://render.com/dashboard)
2. **Select**: Your backend service (`brand-visibility-backend`)
3. **Click**: "Settings" tab

### Update Build & Start Commands

**Current (Wrong)**:
```
Build Command: yarn
Start Command: yarn start
```

**Change to (Correct)**:
```
Build Command: npm install && npm run build
Start Command: npm start
```

**Or if using yarn**:
```
Build Command: yarn && yarn build  
Start Command: yarn start
```

### Save and Redeploy

1. **Click**: "Save Changes"
2. **Go to**: "Manual Deploy" → "Deploy latest commit"
3. **Wait**: ~2-3 minutes for new deployment

---

## 📝 What This Fixes

The updated build command will:
1. ✅ Install dependencies (`npm install`)
2. ✅ Compile TypeScript (`npm run build` → runs `tsc`)
3. ✅ Create `dist/server.js` file
4. ✅ Start command can then find and run the compiled file

---

## 🧪 After Deployment

Test the backend:
```
https://brand-visibility-backend-qeqz.onrender.com/api/health
```

Should return:
```json
{
  "status": "healthy",
  "timestamp": "2025-12-12T..."
}
```

---

## 🎯 Complete Configuration

**For reference, your Render settings should be:**

```
Service Name: brand-visibility-backend
Root Directory: backend
Build Command: npm install && npm run build
Start Command: npm start
Environment: Node
Node Version: 22.16.0 (or leave default)
```

**Environment Variables:**
```
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://frontend-c1tzznhfs-gaurav4149singh-2336s-projects.vercel.app
```

---

## 🔄 Alternative: Add render.yaml

If you prefer infrastructure as code, create this file in project root:

`render.yaml`:
```yaml
services:
  - type: web
    name: brand-visibility-backend
    runtime: node
    rootDir: backend
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: PORT
        value: 5000
      - key: NODE_ENV
        value: production
      - key: CORS_ORIGIN
        value: https://frontend-c1tzznhfs-gaurav4149singh-2336s-projects.vercel.app
```

Then redeploy.

---

**The fix is simple: Just update the build command in Render settings!** 🚀
