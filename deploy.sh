#!/bin/bash

# Brand Visibility Analyzer - Deployment Script
# This script helps you deploy backend and frontend in the correct order

echo "🚀 Brand Visibility Analyzer - Deployment Helper"
echo "=================================================="
echo ""

# Step 1: Build backend
echo "📦 Step 1/5: Building backend..."
cd backend
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Backend build failed! Fix errors and try again."
    exit 1
fi
echo "✅ Backend build successful!"
echo ""

# Step 2: Build frontend  
echo "📦 Step 2/5: Building frontend..."
cd ../frontend
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Frontend build failed! Fix errors and try again."
    exit 1
fi
echo "✅ Frontend build successful!"
echo ""

# Step 3: Backend deployment instructions
echo "🌐 Step 3/5: Deploy Backend to Render"
echo "--------------------------------------"
echo ""
echo "1. Go to: https://render.com"
echo "2. Click: 'New +' → 'Web Service'"
echo "3. Connect your GitHub repository"
echo "4. Configure:"
echo "   - Root Directory: backend"
echo "   - Build Command: npm install && npm run build"
echo "   - Start Command: npm start"
echo "5. Add Environment Variables:"
echo "   - PORT=5000"
echo "   - NODE_ENV=production"
echo "   - CORS_ORIGIN=https://your-vercel-url.vercel.app (update later)"
echo "6. Click 'Create Web Service'"
echo "7. Wait for deployment and copy your backend URL"
echo ""
read -p "Enter your Render backend URL (e.g., https://xxx.onrender.com): " BACKEND_URL

if [ -z "$BACKEND_URL" ]; then
    echo "❌ Backend URL is required!"
    exit 1
fi

echo ""
echo "✅ Backend URL saved: $BACKEND_URL"
echo ""

# Step 4: Update frontend environment
echo "⚙️  Step 4/5: Updating frontend environment..."
echo "NEXT_PUBLIC_BACKEND_URL=$BACKEND_URL" > .env.local
echo "✅ Frontend .env.local updated with backend URL"
echo ""

# Step 5: Frontend deployment instructions
echo "🌐 Step 5/5: Deploy Frontend to Vercel"
echo "--------------------------------------"
echo ""
echo "Run this command to deploy:"
echo ""
echo "  cd frontend"
echo "  vercel --prod"
echo ""
echo "After deployment:"
echo "1. Copy your Vercel URL"
echo "2. Go back to Render dashboard"
echo "3. Update CORS_ORIGIN environment variable with your Vercel URL"
echo "4. Save and wait for auto-redeploy"
echo ""
echo "🎉 Your application will be live!"
echo ""
