<?php
require_once 'config.php';

setCORSHeaders();
$pdo = getDBConnection();
$method = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'] ?? '';

// Parse path to get courseId or semester ID
preg_match('/courses\/(\d+)\/semesters/', $uri, $courseMatches);
$courseId = $courseMatches[1] ?? null;

preg_match('/semesters\/(\d+)/', $uri, $semesterMatches);
$semesterId = $semesterMatches[1] ?? null;

switch ($method) {
    case 'POST':
        // Create a new semester (for /courses/:courseId/semesters)
        if (!$courseId) {
            sendError('Course ID is required', 400);
        }
        
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($data['semester']) || !isset($data['topics'])) {
            sendError('Semester number and topics are required', 400);
        }
        
        try {
            $stmt = $pdo->prepare('INSERT INTO semesters (course_id, semester, topics) VALUES (?, ?, ?)');
            $stmt->execute([$courseId, $data['semester'], $data['topics']]);
            
            sendJSON([
                'id' => $pdo->lastInsertId(),
                'message' => 'Semester created successfully'
            ], 201);
        } catch (PDOException $e) {
            sendError('Failed to create semester: ' . $e->getMessage(), 500);
        }
        break;
        
    case 'PUT':
        // Update a semester
        if (!$semesterId) {
            sendError('Semester ID is required', 400);
        }
        
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($data['semester']) || !isset($data['topics'])) {
            sendError('Semester number and topics are required', 400);
        }
        
        try {
            $stmt = $pdo->prepare('UPDATE semesters SET semester = ?, topics = ? WHERE id = ?');
            $stmt->execute([$data['semester'], $data['topics'], $semesterId]);
            
            sendJSON(['message' => 'Semester updated successfully']);
        } catch (PDOException $e) {
            sendError('Failed to update semester: ' . $e->getMessage(), 500);
        }
        break;
        
    case 'DELETE':
        // Delete a semester
        if (!$semesterId) {
            sendError('Semester ID is required', 400);
        }
        
        try {
            $stmt = $pdo->prepare('DELETE FROM semesters WHERE id = ?');
            $stmt->execute([$semesterId]);
            
            sendJSON(['message' => 'Semester deleted successfully']);
        } catch (PDOException $e) {
            sendError('Failed to delete semester: ' . $e->getMessage(), 500);
        }
        break;
        
    default:
        sendError('Method not allowed', 405);
        break;
}
?>
