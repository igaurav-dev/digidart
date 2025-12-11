# Google Custom Search API Setup Guide

## 🔑 Getting Your Free API Credentials

### Step 1: Get Google API Key (5 minutes)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **API Key**
5. Copy your API key
6. Click **Edit API Key** → **API restrictions**
7. Select **Restrict  key**
8. Choose **Custom Search API** from the dropdown
9. Save

### Step 2: Create Custom Search Engine (5 minutes)

1. Go to [Programmable Search Engine](https://programmablesearchengine.google.com/)
2. Click **Add** or **Create a search engine**
3. Configure:
   - **Sites to search**: Select "Search the entire web"
   - **Name**: "Brand Visibility Analyzer"
4. Click **Create**
5. Note your **Search engine ID** (cx parameter)
6. Go to **Setup** → Enable **Search the entire web**

### Step 3: Enable the API

1. Go back to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** → **Library**
3. Search for "Custom Search API"
4. Click on it and click **Enable**

### Step 4: Add to Your Backend

1. Open `/backend/.env` file
2. Add your credentials:
```env
GOOGLE_API_KEY=YOUR_API_KEY_HERE
GOOGLE_SEARCH_ENGINE_ID=YOUR_SEARCH_ENGINE_ID_HERE
PORT=5001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

3. Restart your backend server

## 📊 What You Get

### With Google API (Recommended)
- ✅ **Real search result counts** for brands
- ✅ **Actual competitor domains** from search results
- ✅ **Accurate search volume estimates**
- ✅ **100 free queries per day**

### Without Google API (Fallback Mode)
- ⚠️ **Website metadata extraction** (title, description, keywords)
- ⚠️ **Estimated search volumes** based on heuristics  
- ⚠️ **Generic competitor names**
- ✅ **Still functional**, just less accurate

## 💰 Free Tier Limits

- **100 queries per day** for free
- **Perfect for testing and small projects**
- Upgrade to paid if you need more queries

## 🔒 Security Note

- Never commit your `.env` file to git (already in `.gitignore`)
- Keep your API keys secure  
- Restrict API key to only Custom Search API

## ✅ Verification

Test your setup:
```bash
curl "https://www.googleapis.com/customsearch/v1?key=YOUR_API_KEY&cx=YOUR_SEARCH_ENGINE_ID&q=test"
```

You should see JSON search results!

## 🆘 Troubleshooting

**Error: "API key not valid"**
- Check you copied the full API key
- Ensure Custom Search API is enabled
- Verify API key restrictions allow Custom Search API

**Error: "Invalid Value"**  
- Check your Search Engine ID is correct
- Ensure "Search the entire web" is enabled in search engine settings

**Error: "Quota exceeded"**
- You've used your 100 free queries for today
- Wait 24 hours or upgrade to paid tier

## 📚 Documentation

- [Custom Search API Docs](https://developers.google.com/custom-search/v1/overview)
- [Pricing](https://developers.google.com/custom-search/v1/overview#Pricing)
