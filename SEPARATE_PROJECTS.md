# Separate Backend and Frontend Projects

This project is now split into **two separate projects** that share the same MySQL database.

## 📁 Project Structure

```
faceprepcourses-main/          # Frontend Project
├── src/                       # React frontend code
├── public/                    # Static assets
├── package.json              # Frontend dependencies
└── README.md                 # Frontend documentation

backend/                      # Backend Project (separate)
├── server.js                 # Express API server
├── package.json              # Backend dependencies
├── setup.sql                 # Database schema
└── README.md                 # Backend documentation
```

## 🔗 Shared Database

Both projects connect to the **same MySQL database**:

- **Database**: `u461595815_fpc`
- **User**: `u461595815_fpcadmin`
- **Host**: `localhost`

## 🚀 Running Both Projects

### Option 1: Separate Terminals

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm start
# API runs on http://localhost:3000
```

**Terminal 2 - Frontend:**
```bash
npm install
npm run dev
# Frontend runs on http://localhost:5173
```

### Option 2: Separate Repositories

You can push them to separate GitHub repositories:

1. **Frontend Repository**: Contains only frontend code
2. **Backend Repository**: Contains only backend code

Both will connect to the same database when deployed.

## 📦 Deployment

### Backend Deployment

1. Deploy `backend/` folder to Node.js hosting
2. Set environment variables
3. Run `npm install` and `npm start`
4. Backend API will be available at your hosting URL

### Frontend Deployment

1. Build frontend: `npm run build`
2. Deploy `dist/` folder to static hosting
3. Set `VITE_API_URL` environment variable to backend URL
4. Frontend will connect to backend API

## 🔧 Configuration

### Backend (.env in backend/)
```env
DB_HOST=localhost
DB_NAME=u461595815_fpc
DB_USER=u461595815_fpcadmin
DB_PASS=f7McCB4#6IE!
PORT=3000
```

### Frontend (.env in root)
```env
VITE_API_URL=http://localhost:3000
VITE_USE_API=true
```

For production, update `VITE_API_URL` to your backend API URL.

## ✅ Benefits of Separation

1. **Independent Deployment**: Deploy frontend and backend separately
2. **Scalability**: Scale frontend and backend independently
3. **Team Collaboration**: Frontend and backend teams can work separately
4. **Technology Flexibility**: Can change backend/frontend tech stack independently
5. **Clear Separation**: Clear boundaries between frontend and backend

## 📝 Git Setup

### Option 1: Single Repository (Monorepo)
Keep both in one repo with separate folders.

### Option 2: Separate Repositories
- `faceprep-campus-frontend` - Frontend only
- `faceprep-campus-backend` - Backend only

Both repositories will reference the same database configuration.

## 🔐 Security

- Backend handles all database operations
- Frontend only makes API calls (no direct database access)
- Environment variables keep credentials secure
- CORS configured in backend for frontend access
