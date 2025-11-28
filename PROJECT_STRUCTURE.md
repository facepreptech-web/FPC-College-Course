# Project Structure - Separate Backend & Frontend

## 📦 Two Separate Projects

### Frontend Project (Current Directory)
- **Location**: Root directory (`faceprepcourses-main/`)
- **Type**: React/TypeScript SPA
- **Purpose**: User interface and admin panel
- **Database Access**: Via API calls only (no direct DB access)

### Backend Project (Separate)
- **Location**: `backend/` folder (can be moved to separate repo)
- **Type**: Node.js/Express API
- **Purpose**: Database operations and REST API
- **Database Access**: Direct MySQL connection

## 🔗 Shared Database

Both projects connect to the **same MySQL database**:

```
┌─────────────┐         ┌──────────────┐
│  Frontend   │────────▶│   Backend    │
│  (React)    │  API    │  (Node.js)   │
└─────────────┘  Calls  └──────┬───────┘
                               │
                               ▼
                        ┌──────────────┐
                        │   MySQL DB    │
                        │ u461595815_fpc│
                        └──────────────┘
```

## 📁 File Organization

### Frontend Files
```
faceprepcourses-main/
├── src/              # Frontend source code
│   ├── components/   # React components
│   ├── pages/        # Page components
│   ├── context/      # State management
│   ├── services/     # API service layer
│   └── data/         # Initial data
├── public/           # Static assets
├── package.json      # Frontend dependencies
├── vite.config.ts    # Vite configuration
└── README.md         # Frontend documentation
```

### Backend Files
```
backend/
├── server.js         # Express API server
├── package.json      # Backend dependencies
├── setup.sql        # Database schema
├── .env.example     # Environment template
├── .gitignore       # Git ignore rules
└── README.md         # Backend documentation
```

## 🚀 Running Separately

### Backend (Terminal 1)
```bash
cd backend
npm install
npm start
# Runs on http://localhost:3000
```

### Frontend (Terminal 2)
```bash
npm install
npm run dev
# Runs on http://localhost:5173
# Connects to backend at http://localhost:3000
```

## 📝 Configuration

### Backend Environment (backend/.env)
```env
DB_HOST=localhost
DB_NAME=u461595815_fpc
DB_USER=u461595815_fpcadmin
DB_PASS=f7McCB4#6IE!
PORT=3000
```

### Frontend Environment (.env)
```env
VITE_API_URL=http://localhost:3000
VITE_USE_API=true
```

## 🌐 Deployment Options

### Option 1: Same Server, Different Ports
- Backend: `https://yourdomain.com:3000`
- Frontend: `https://yourdomain.com`

### Option 2: Different Subdomains
- Backend: `https://api.yourdomain.com`
- Frontend: `https://yourdomain.com`

### Option 3: Different Servers
- Backend: Deploy to Node.js hosting
- Frontend: Deploy to static hosting (Vercel, Netlify)
- Both connect to same database

## ✅ Benefits

1. **Independent Development**: Work on frontend/backend separately
2. **Independent Deployment**: Deploy when ready, not together
3. **Scalability**: Scale frontend and backend independently
4. **Team Collaboration**: Different teams can work on each
5. **Technology Flexibility**: Can change tech stack independently

## 🔐 Security

- Frontend has **no direct database access**
- All database operations go through backend API
- Backend handles authentication and authorization
- Environment variables keep credentials secure
