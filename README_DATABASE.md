# Database Setup Instructions

**Note**: This database is shared between the **Backend API** and **Frontend** projects. Both projects connect to the same MySQL database.

## Step 1: Create Database Tables

1. Log in to your hosting control panel
2. Go to **Databases** → **MySQL Databases**
3. Click on **phpMyAdmin** or use the SQL import feature
4. Select your database: `u461595815_fpc`
5. Go to the **SQL** tab
6. Copy and paste the contents of `backend/setup.sql`
7. Click **Go** to execute

This will create three tables:
- `colleges` - Stores college information
- `courses` - Stores course information (linked to colleges)
- `semesters` - Stores semester information (linked to courses)

## Step 2: Deploy Node.js API Server

### Option A: Upload via File Manager

1. **Upload the `backend/` folder** to your Node.js hosting root directory
2. **Install dependencies** (via SSH or hosting terminal):
   ```bash
   cd backend
   npm install
   ```
3. **Set environment variables** in your hosting panel:
   - `DB_HOST=localhost`
   - `DB_NAME=u461595815_fpc`
   - `DB_USER=u461595815_fpcadmin`
   - `DB_PASS=f7McCB4#6IE!`
   - `PORT=3000` (or your hosting's assigned port)
4. **Set start command** in hosting panel:
   ```
   node backend/server.js
   ```
   Or if you need to specify the path:
   ```
   cd backend && node server.js
   ```

### Option B: Using Git/Deployment

1. Push your code to a Git repository
2. Connect your hosting to the repository
3. Set **build command**: `cd backend && npm install`
4. Set **start command**: `cd backend && node server.js`
5. Configure environment variables in hosting panel

## Step 3: Configure Frontend

1. Create a `.env` file in the root of your project:
   ```env
   VITE_API_URL=https://lightyellow-kudu-847304.hostingersite.com/api
   VITE_USE_API=true
   ```
   
   **Note:** The API URL is already set as default in `src/services/api.ts`, so it will work even without setting this variable.

## Step 4: Test the Connection

1. Visit `https://your-domain.com/api/health` - should return `{"status":"ok"}`
2. The frontend will automatically try to connect to the database API
3. If the API is not available, it will fall back to localStorage

## API Endpoints

- `GET /colleges` - Get all colleges with courses and semesters
- `POST /colleges` - Create a new college
- `PUT /colleges/:id` - Update a college
- `DELETE /colleges/:id` - Delete a college
- `POST /colleges/:collegeId/courses` - Add a course to a college
- `PUT /courses/:id` - Update a course
- `DELETE /courses/:id` - Delete a course
- `POST /courses/:courseId/semesters` - Add a semester to a course
- `PUT /semesters/:id` - Update a semester
- `DELETE /semesters/:id` - Delete a semester
- `GET /health` - Health check endpoint

## File Structure for Deployment

```
your-hosting-root/
├── backend/
│   ├── server.js          (Node.js API server)
│   ├── package.json       (Dependencies)
│   └── .env              (Environment variables - set in hosting panel)
├── dist/                 (Your built React app)
└── ... (other files)
```

## Common Hosting Configurations

### Vercel/Netlify
- Set build command: `npm run build`
- Set start command: `cd backend && node server.js`
- Add environment variables in dashboard

### Railway/Render
- Set start command: `cd backend && node server.js`
- Add environment variables in dashboard
- May need to configure port from environment

### Traditional Node.js Hosting
- Upload `backend/` folder
- Run `npm install` in `backend/` directory
- Set start command to `node backend/server.js`
- Configure environment variables

## Troubleshooting

1. **API not responding**: Check if Node.js is enabled and server is running
2. **Database connection error**: Verify environment variables are set correctly
3. **CORS errors**: The API includes CORS middleware, but check if your hosting requires additional configuration
4. **Port issues**: Some hosting providers assign ports automatically - check your hosting docs

## Security Note

- Never commit `.env` files to Git
- Set environment variables in your hosting panel
- Consider adding authentication to the API endpoints in production
- Use HTTPS in production
