# Database Seeding Instructions

## Problem
The seed script is trying to connect to `localhost`, but your database is on a remote hosting server.

## Solutions

### Option 1: Seed via phpMyAdmin (Easiest)

1. **Log in to phpMyAdmin** (via your hosting control panel)
2. **Select your database**: `u461595815_fpc`
3. **Go to SQL tab**
4. **Run the seed script manually** or use the SQL import feature

### Option 2: Run Seed Script on Server

If you have SSH access to your hosting server:

1. **Upload the `backend/` folder** to your server
2. **SSH into your server**
3. **Navigate to backend folder**:
   ```bash
   cd backend
   ```
4. **Create `.env` file** with:
   ```env
   DB_HOST=localhost
   DB_NAME=u461595815_fpc
   DB_USER=u461595815_fpcadmin
   DB_PASS=f7McCB4#6IE!
   ```
5. **Run seed script**:
   ```bash
   npm install
   npm run seed
   ```

### Option 3: Use Remote Database Host (If Enabled)

If your hosting provider allows remote MySQL connections:

1. **Get remote database host** from your hosting panel
2. **Create `.env` file** in `backend/` folder:
   ```env
   DB_HOST=your_remote_host_here
   DB_NAME=u461595815_fpc
   DB_USER=u461595815_fpcadmin
   DB_PASS=f7McCB4#6IE!
   PORT=3306
   ```
3. **Run seed script**:
   ```bash
   cd backend
   npm run seed
   ```

**Note**: Most hosting providers disable remote MySQL access for security. Check your hosting panel for remote access settings.

### Option 4: Manual Data Entry via Admin Panel

After deploying the backend and frontend:

1. **Access admin panel**: `/admin/login`
2. **Add colleges, courses, and semesters** manually through the admin interface

## Recommended Approach

For production databases, **Option 1 (phpMyAdmin)** or **Option 2 (Server SSH)** are the safest and most reliable methods.

