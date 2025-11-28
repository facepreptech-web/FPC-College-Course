<?php
require_once 'config.php';

setCORSHeaders();
$pdo = getDBConnection();
$method = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'] ?? '';

// Parse path to get ID if present
preg_match('/colleges\/(\d+)/', $uri, $matches);
$id = $matches[1] ?? null;

switch ($method) {
    case 'GET':
        // Get all colleges with courses and semesters
        try {
            $stmt = $pdo->query('SELECT * FROM colleges ORDER BY name');
            $colleges = $stmt->fetchAll();
            
            foreach ($colleges as &$college) {
                // Get courses for this college
                $stmt = $pdo->prepare('SELECT * FROM courses WHERE college_id = ? ORDER BY name');
                $stmt->execute([$college['id']]);
                $courses = $stmt->fetchAll();
                
                foreach ($courses as &$course) {
                    // Get semesters for this course
                    $stmt = $pdo->prepare('SELECT * FROM semesters WHERE course_id = ? ORDER BY semester');
                    $stmt->execute([$course['id']]);
                    $course['semesters'] = $stmt->fetchAll();
                }
                
                $college['courses'] = $courses;
            }
            
            sendJSON($colleges);
        } catch (PDOException $e) {
            sendError('Failed to fetch colleges: ' . $e->getMessage(), 500);
        }
        break;
        
    case 'POST':
        // Create a new college
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($data['name']) || !isset($data['location'])) {
            sendError('Name and location are required', 400);
        }
        
        try {
            $stmt = $pdo->prepare('INSERT INTO colleges (name, location) VALUES (?, ?)');
            $stmt->execute([$data['name'], $data['location']]);
            
            sendJSON([
                'id' => $pdo->lastInsertId(),
                'message' => 'College created successfully'
            ], 201);
        } catch (PDOException $e) {
            sendError('Failed to create college: ' . $e->getMessage(), 500);
        }
        break;
        
    case 'PUT':
        // Update a college
        if (!$id) {
            sendError('College ID is required', 400);
        }
        
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($data['name']) || !isset($data['location'])) {
            sendError('Name and location are required', 400);
        }
        
        try {
            $stmt = $pdo->prepare('UPDATE colleges SET name = ?, location = ? WHERE id = ?');
            $stmt->execute([$data['name'], $data['location'], $id]);
            
            sendJSON(['message' => 'College updated successfully']);
        } catch (PDOException $e) {
            sendError('Failed to update college: ' . $e->getMessage(), 500);
        }
        break;
        
    case 'DELETE':
        // Delete a college
        if (!$id) {
            sendError('College ID is required', 400);
        }
        
        try {
            $stmt = $pdo->prepare('DELETE FROM colleges WHERE id = ?');
            $stmt->execute([$id]);
            
            sendJSON(['message' => 'College deleted successfully']);
        } catch (PDOException $e) {
            sendError('Failed to delete college: ' . $e->getMessage(), 500);
        }
        break;
        
    default:
        sendError('Method not allowed', 405);
        break;
}
?>
