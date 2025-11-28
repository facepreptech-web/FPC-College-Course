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

This frontend requires the **FACEPrep Campus Backend API** to be running.

### Backend Setup

The backend is in the `backend/` folder. To run it:

```bash
cd backend
npm install
npm start
```

The backend will run on `http://localhost:3000`

### Database

Both frontend and backend connect to the **same MySQL database**:
- **Database**: `u461595815_fpc`
- **User**: `u461595815_fpcadmin`
- **Host**: `localhost`

The backend handles all database operations. The frontend only makes API calls.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates a `dist` folder with optimized production files.

### Deploy Options

1. **Static Hosting** (Vercel, Netlify, etc.)
   - Upload `dist` folder
   - Set environment variable `VITE_API_URL` to your backend URL

2. **Traditional Hosting**
   - Upload `dist` folder contents to web server
   - Configure server to serve index.html for all routes

### Environment Variables

Make sure to set `VITE_API_URL` in your hosting environment to point to your backend API.

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

The frontend connects to the backend API. Update `VITE_API_URL` in `.env`:

- **Local**: `http://localhost:3000`
- **Production**: `https://lightyellow-kudu-847304.hostingersite.com/api`

### Fallback

If the API is unavailable, the frontend falls back to localStorage for data storage.

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
