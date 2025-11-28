<?php
require_once 'config.php';

setCORSHeaders();
$pdo = getDBConnection();
$method = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'] ?? '';

// Parse path to get IDs
preg_match('/colleges\/(\d+)\/courses/', $uri, $collegeMatches);
$collegeId = $collegeMatches[1] ?? null;

preg_match('/courses\/(\d+)/', $uri, $courseMatches);
$courseId = $courseMatches[1] ?? null;

switch ($method) {
    case 'POST':
        // Create a new course (for /colleges/:collegeId/courses)
        if (!$collegeId) {
            sendError('College ID is required', 400);
        }
        
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($data['name'])) {
            sendError('Course name is required', 400);
        }
        
        try {
            $stmt = $pdo->prepare('INSERT INTO courses (college_id, name) VALUES (?, ?)');
            $stmt->execute([$collegeId, $data['name']]);
            
            sendJSON([
                'id' => $pdo->lastInsertId(),
                'message' => 'Course created successfully'
            ], 201);
        } catch (PDOException $e) {
            sendError('Failed to create course: ' . $e->getMessage(), 500);
        }
        break;
        
    case 'PUT':
        // Update a course
        if (!$courseId) {
            sendError('Course ID is required', 400);
        }
        
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($data['name'])) {
            sendError('Course name is required', 400);
        }
        
        try {
            $stmt = $pdo->prepare('UPDATE courses SET name = ? WHERE id = ?');
            $stmt->execute([$data['name'], $courseId]);
            
            sendJSON(['message' => 'Course updated successfully']);
        } catch (PDOException $e) {
            sendError('Failed to update course: ' . $e->getMessage(), 500);
        }
        break;
        
    case 'DELETE':
        // Delete a course
        if (!$courseId) {
            sendError('Course ID is required', 400);
        }
        
        try {
            $stmt = $pdo->prepare('DELETE FROM courses WHERE id = ?');
            $stmt->execute([$courseId]);
            
            sendJSON(['message' => 'Course deleted successfully']);
        } catch (PDOException $e) {
            sendError('Failed to delete course: ' . $e->getMessage(), 500);
        }
        break;
        
    default:
        sendError('Method not allowed', 405);
        break;
}
?>
