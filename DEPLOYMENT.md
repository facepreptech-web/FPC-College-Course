# Deployment Guide

This guide covers deploying both the **Frontend** and **Backend** separately.

## 🗄️ Shared Database Setup

Both projects use the **same MySQL database**. Set this up first:

1. Run `backend/setup.sql` in your MySQL database (phpMyAdmin)
2. Database: `u461595815_fpc`
3. User: `u461595815_fpcadmin`

## 🚀 Backend Deployment

### Step 1: Upload Backend

Upload the `backend/` folder to your Node.js hosting.

### Step 2: Install Dependencies

```bash
cd backend
npm install
```

### Step 3: Set Environment Variables

In your hosting panel, set:
```
DB_HOST=localhost
DB_NAME=u461595815_fpc
DB_USER=u461595815_fpcadmin
DB_PASS=f7McCB4#6IE!
PORT=3000
```

### Step 4: Start Backend

Set start command: `node server.js`

Backend API will be available at: `https://your-backend-url.com`

## 🎨 Frontend Deployment

### Step 1: Build Frontend

```bash
npm run build
```

This creates a `dist/` folder.

### Step 2: Configure API URL

Create `.env.production` or set in hosting:
```env
VITE_API_URL=https://your-backend-url.com
VITE_USE_API=true
```

### Step 3: Deploy Frontend

Upload `dist/` folder contents to your static hosting (Vercel, Netlify, or traditional web server).

### Step 4: Configure Routing

For SPA routing, configure your server to serve `index.html` for all routes.

## 📋 Deployment Checklist

### Backend
- [ ] Database tables created (`backend/setup.sql`)
- [ ] Backend folder uploaded
- [ ] Dependencies installed (`npm install`)
- [ ] Environment variables set
- [ ] Backend server running
- [ ] Test API: `https://your-backend-url.com/health`

### Frontend
- [ ] Frontend built (`npm run build`)
- [ ] `VITE_API_URL` configured
- [ ] `dist/` folder uploaded
- [ ] Server configured for SPA routing
- [ ] Test frontend connects to backend

## 🌐 Example Deployment

### Backend
- **URL**: `https://api.faceprep.com` or `https://lightyellow-kudu-847304.hostingersite.com/api`
- **Port**: 3000 (or hosting assigned port)

### Frontend
- **URL**: `https://faceprep.com` or `https://lightyellow-kudu-847304.hostingersite.com`
- **API URL**: Points to backend URL

## 🔧 Environment Variables Summary

### Backend (backend/.env)
```env
DB_HOST=localhost
DB_NAME=u461595815_fpc
DB_USER=u461595815_fpcadmin
DB_PASS=f7McCB4#6IE!
PORT=3000
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-url.com
VITE_USE_API=true
```

## 🆘 Troubleshooting

### Backend Issues
- **Database connection failed**: Check environment variables
- **Port already in use**: Change PORT in environment variables
- **API not accessible**: Check if Node.js is enabled on hosting

### Frontend Issues
- **API calls failing**: Check `VITE_API_URL` is correct
- **CORS errors**: Backend CORS is configured, check backend is running
- **404 on routes**: Configure server to serve `index.html` for all routes

## 📞 Support

For deployment issues, contact:
- **Email**: connect@faceprep.in
- **Phone**: +91 79043 18695
