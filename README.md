# Brand Visibility Analyzer

A full-stack web application that analyzes brand visibility metrics including search scores, keyword rankings, competitor analysis, and search volume insights.

![Brand Visibility Analyzer](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue) ![Express](https://img.shields.io/badge/Express-4.18-green)

## 🚀 Features

- **📊 Comprehensive Analytics**: Get detailed brand visibility metrics including search scores (0-100)
- **🔍 Keyword Analysis**: Discover top keywords driving traffic with volume distribution
- **🏆 Competitor Insights**: Compare your brand against market competitors
- **📈 Visual Charts**: Interactive bar charts for keyword volume visualization
- **🌓 Dark/Light Mode**: Toggle between themes with localStorage persistence
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **✅ Form Validation**: Client-side and server-side validation with helpful error messages
- **🧪 Tested**: Comprehensive unit tests for frontend and backend

## 🛠️ Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Recharts** - Data visualization
- **CSS Modules** - Component-scoped styling

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type safety
- **UUID** - Unique ID generation
- **JSON File Storage** - Simple data persistence

### Testing & Quality
- **Jest** - Testing framework
- **React Testing Library** - Component testing
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 📁 Project Structure

```
digidarts_project/
├── frontend/
│   ├── app/
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Home page
│   │   ├── results/[id]/page.tsx   # Results page
│   │   └── globals.css             # Global styles
│   ├── components/
│   │   ├── BrandForm.tsx            # Form component
│   │   ├── MetricsDashboard.tsx     # Metrics display
│   │   ├── CompetitorTable.tsx      # Competitor table
│   │   ├── KeywordChart.tsx         # Recharts bar chart
│   │   ├── ThemeToggle.tsx          # Dark/light mode toggle
│   │   ├── LoadingSpinner.tsx       # Loading state
│   │   └── ui/                      # Reusable UI components
│   ├── utils/
│   │   ├── api.ts                   # API client
│   │   └── validation.ts            # Validation utilities
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── server.ts                # Express server
│   │   ├── routes/
│   │   │   └── submission.routes.ts
│   │   ├── services/
│   │   │   ├── metrics.service.ts   # Metrics generation
│   │   │   └── storage.service.ts   # JSON storage
│   │   ├── middleware/
│   │   │   ├── validation.middleware.ts
│   │   │   └── error.middleware.ts
│   │   └── types/
│   │       └── index.ts             # TypeScript types
│   ├── data/
│   │   └── submissions.json         # Data storage
│   └── package.json
└── README.md
```

## 🏃 Local Development

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Start development server:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```bash
cp .env.local.example .env.local
```

4. Update `.env.local`:
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

5. Start development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

## 🧪 Running Tests

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📡 API Documentation

### POST /api/submit
Submit brand details for analysis

**Request Body:**
```json
{
  "brandName": "string (2-100 chars)",
  "brandWebsite": "string (valid URL)",
  "email": "string (valid email)"
}
```

**Response:**
```json
{
  "id": "uuid",
  "brandName": "string",
  "brandWebsite": "string",
  "email": "string",
  "metrics": {
    "searchScore": 75,
    "topKeywords": ["keyword1", "keyword2"],
    "monthlySearchVolume": 50000,
    "competitorLevel": "High",
    "competitorAnalysis": [...],
    "keywordVolumes": [...]
  },
  "submittedAt": "2025-12-11T18:18:39.000Z"
}
```

### GET /api/submission/:id
Retrieve submission by ID

**Response:** Same as POST /api/submit

### GET /api/health
Health check endpoint

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-12-11T18:18:39.000Z"
}
```

## 🚢 Deployment

### Deploy Backend to Render

1. Create account at [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment Variables**:
     ```
     PORT=5000
     NODE_ENV=production
     CORS_ORIGIN=https://your-frontend.vercel.app
     ```
5. Click "Create Web Service"

### Deploy Frontend to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Navigate to frontend directory:
```bash
cd frontend
```

3. Deploy:
```bash
vercel
```

4. Set environment variable in Vercel dashboard:
```
NEXT_PUBLIC_BACKEND_URL=https://your-backend.onrender.com
```

5. Redeploy with production settings:
```bash
vercel --prod
```

## 🌐 Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env.local)
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

## 🎨 Features Showcase

### Dark/Light Mode
- Automatic theme detection based on system preferences
- Manual toggle with localStorage persistence
- Smooth transitions between themes

### Form Validation
- Real-time validation feedback
- Email format validation
- URL format validation
- Required field validation

### Metrics Visualization
- Color-coded search scores (Low/Medium/High)
- Progress bars for visual feedback
- Responsive grid layout
- Interactive keyword tags

### Competitor Analysis
- Sortable table with rankings
- Score-based performance bars
- Market share percentages

## 📝 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For questions or support, please open an issue in the GitHub repository.

---

**Built with ❤️ using Next.js and Express**
