require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database configuration - Using environment variables
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'u461595815_fpc',
  user: process.env.DB_USER || 'u461595815_fpcadmin',
  password: process.env.DB_PASS || '',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Test database connection
pool.getConnection()
  .then(connection => {
    console.log('✅ Database connected successfully');
    console.log(`   Host: ${dbConfig.host}`);
    console.log(`   Database: ${dbConfig.database}`);
    connection.release();
  })
  .catch(err => {
    console.error('❌ Database connection failed:', err.message);
    console.error('   Check your .env file for correct database credentials');
  });

// Routes

// Get all colleges with courses and semesters
app.get('/colleges', async (req, res) => {
  try {
    const [colleges] = await pool.query('SELECT * FROM colleges ORDER BY name');
    
    for (let college of colleges) {
      const [courses] = await pool.query(
        'SELECT * FROM courses WHERE college_id = ? ORDER BY name',
        [college.id]
      );
      
      for (let course of courses) {
        const [semesters] = await pool.query(
          'SELECT * FROM semesters WHERE course_id = ? ORDER BY semester',
          [course.id]
        );
        course.semesters = semesters;
      }
      
      college.courses = courses;
    }
    
    res.json(colleges);
  } catch (error) {
    console.error('Error fetching colleges:', error);
    res.status(500).json({ error: 'Failed to fetch colleges' });
  }
});

// Create a new college
app.post('/colleges', async (req, res) => {
  try {
    const { name, location } = req.body;
    
    if (!name || !location) {
      return res.status(400).json({ error: 'Name and location are required' });
    }
    
    const [result] = await pool.query(
      'INSERT INTO colleges (name, location) VALUES (?, ?)',
      [name, location]
    );
    
    res.json({ id: result.insertId, message: 'College created successfully' });
  } catch (error) {
    console.error('Error creating college:', error);
    res.status(500).json({ error: 'Failed to create college' });
  }
});

// Update a college
app.put('/colleges/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location } = req.body;
    
    if (!name || !location) {
      return res.status(400).json({ error: 'Name and location are required' });
    }
    
    await pool.query(
      'UPDATE colleges SET name = ?, location = ? WHERE id = ?',
      [name, location, id]
    );
    
    res.json({ message: 'College updated successfully' });
  } catch (error) {
    console.error('Error updating college:', error);
    res.status(500).json({ error: 'Failed to update college' });
  }
});

// Delete a college
app.delete('/colleges/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    await pool.query('DELETE FROM colleges WHERE id = ?', [id]);
    
    res.json({ message: 'College deleted successfully' });
  } catch (error) {
    console.error('Error deleting college:', error);
    res.status(500).json({ error: 'Failed to delete college' });
  }
});

// Create a new course
app.post('/colleges/:collegeId/courses', async (req, res) => {
  try {
    const { collegeId } = req.params;
    const { name } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: 'Course name is required' });
    }
    
    const [result] = await pool.query(
      'INSERT INTO courses (college_id, name) VALUES (?, ?)',
      [collegeId, name]
    );
    
    res.json({ id: result.insertId, message: 'Course created successfully' });
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ error: 'Failed to create course' });
  }
});

// Update a course
app.put('/courses/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: 'Course name is required' });
    }
    
    await pool.query('UPDATE courses SET name = ? WHERE id = ?', [name, id]);
    
    res.json({ message: 'Course updated successfully' });
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({ error: 'Failed to update course' });
  }
});

// Delete a course
app.delete('/courses/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    await pool.query('DELETE FROM courses WHERE id = ?', [id]);
    
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ error: 'Failed to delete course' });
  }
});

// Create a new semester
app.post('/courses/:courseId/semesters', async (req, res) => {
  try {
    const { courseId } = req.params;
    const { semester, topics } = req.body;
    
    if (!semester || !topics) {
      return res.status(400).json({ error: 'Semester number and topics are required' });
    }
    
    const [result] = await pool.query(
      'INSERT INTO semesters (course_id, semester, topics) VALUES (?, ?, ?)',
      [courseId, semester, topics]
    );
    
    res.json({ id: result.insertId, message: 'Semester created successfully' });
  } catch (error) {
    console.error('Error creating semester:', error);
    res.status(500).json({ error: 'Failed to create semester' });
  }
});

// Update a semester
app.put('/semesters/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { semester, topics } = req.body;
    
    if (!semester || !topics) {
      return res.status(400).json({ error: 'Semester number and topics are required' });
    }
    
    await pool.query(
      'UPDATE semesters SET semester = ?, topics = ? WHERE id = ?',
      [semester, topics, id]
    );
    
    res.json({ message: 'Semester updated successfully' });
  } catch (error) {
    console.error('Error updating semester:', error);
    res.status(500).json({ error: 'Failed to update semester' });
  }
});

// Delete a semester
app.delete('/semesters/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    await pool.query('DELETE FROM semesters WHERE id = ?', [id]);
    
    res.json({ message: 'Semester deleted successfully' });
  } catch (error) {
    console.error('Error deleting semester:', error);
    res.status(500).json({ error: 'Failed to delete semester' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}`);
});

module.exports = app;

