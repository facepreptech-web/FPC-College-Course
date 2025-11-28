# FACEPrep Campus Frontend

React/TypeScript frontend application for exploring college course curricula. This frontend connects to the separate backend API.

## 🚀 Features

- **College Management**: Browse and manage partner institutions
- **Course Management**: View and manage courses for each college
- **Semester Curriculum**: Detailed semester-wise curriculum information
- **Admin Panel**: Full CRUD operations for colleges, courses, and semesters
- **Responsive Design**: Modern UI with Tailwind CSS and shadcn/ui

## 📁 Project Structure

```
faceprepcourses-main/
├── src/
│   ├── components/        # React components
│   ├── pages/             # Page components
│   ├── context/           # React context (data management)
│   ├── services/          # API service layer
│   └── data/              # Initial data
├── public/                # Static assets
├── backend/               # Backend API (separate project)
└── ...
```

## 🛠️ Technologies

- **Frontend**: React, TypeScript, Vite
- **UI**: Tailwind CSS, shadcn/ui, Radix UI
- **State Management**: React Context API
- **Backend**: Separate Node.js API (see `backend/` folder)

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm
- Backend API server running (see `backend/README.md`)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd faceprepcourses-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables** (optional - defaults are set)
   
   Create `.env` file in root:
   ```env
   VITE_API_URL=http://localhost:3000
   VITE_USE_API=true
   ```
   
   For production, use your backend API URL:
   ```env
   VITE_API_URL=https://lightyellow-kudu-847304.hostingersite.com/api
   VITE_USE_API=true
   ```

4. **Start development server**
   ```bash
npm run dev
```

## 🌐 Backend Connection

This application uses an **integrated backend** (`server.js`) that serves both the API and frontend.

### How It Works

- **Development**: 
  - Frontend dev server runs on port `8080` (Vite)
  - Backend API runs on port `3000` (`server.js`)
  - Frontend makes API calls to `http://localhost:3000`

- **Production**:
  - Single `server.js` serves both frontend (static files) and API
  - Frontend uses relative URLs (same origin) for API calls
  - All routes handled by the same server

### Running Locally

1. **Development mode** (separate servers):
   ```bash
   # Terminal 1: Start backend API
   npm run server:dev
   
   # Terminal 2: Start frontend dev server
   npm run dev
   ```

2. **Production mode** (single server):
   ```bash
   # Build frontend
   npm run build
   
   # Start integrated server (serves frontend + API)
   npm start
   ```

### Database Configuration

The `server.js` uses environment variables for database connection. Create a `.env` file:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=u461595815_fpc
DB_USER=u461595815_fpcadmin
DB_PASS=your_database_password
PORT=3000
```

**For localhost development**, defaults are set in `server.js`.  
**For production**, set these environment variables in your hosting panel.

## 📝 Available Scripts

- `npm run dev` - Start frontend development server (port 8080)
- `npm run build` - Build frontend for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm start` - Start integrated server (serves frontend + API on port 3000)
- `npm run server` - Same as `npm start`
- `npm run server:dev` - Start server with auto-reload (nodemon)

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm start
```

This creates a `dist` folder and starts the integrated server that serves both frontend and API.

### Deployment Configuration

For platforms like Hostinger, Vercel, or Netlify:

1. **Build Command**: `npm run build`
2. **Start Command**: `npm start`
3. **Output Directory**: `dist` (optional, server.js serves it)
4. **Node Version**: 18+ or 22.x

### Environment Variables (Production)

Set these in your hosting panel:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=u461595815_fpc
DB_USER=u461595815_fpcadmin
DB_PASS=your_database_password
PORT=3000
```

**Note**: The frontend automatically uses the same server for API calls in production (no `VITE_API_URL` needed).

## 🔐 Admin Access

- **URL**: `/admin/login`
- Contact administrator for login credentials

## 📚 Documentation

- **Backend API**: See `backend/README.md`
- **Database Setup**: See `README_DATABASE.md`
- **Deployment**: See `DEPLOYMENT.md`
- **Project Structure**: See `PROJECT_STRUCTURE.md`

## 🔧 Configuration

### API URL

The frontend automatically detects the environment:

- **Development**: Uses `http://localhost:3000` (when running `npm run dev`)
- **Production**: Uses relative URLs (same origin, since `server.js` serves both)

You can override with `VITE_API_URL` environment variable if needed.

### CRUD Operations

All CRUD operations (Create, Read, Update, Delete) for:
- ✅ Colleges
- ✅ Courses  
- ✅ Semesters

Are handled through the integrated `server.js` API and work seamlessly with the database.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is private and proprietary.

## 📞 Contact

- **Email**: connect@faceprep.in
- **Phone**: +91 79043 18695
- **Location**: No.12, Lakshmi Nagar, Thottipalayam Pirivu, Avinashi Road, Coimbatore-641014.
