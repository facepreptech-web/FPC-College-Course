<?php
/**
 * Main API Router
 * Routes requests to appropriate endpoints
 */

require_once 'config.php';

setCORSHeaders();

$method = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'];
$path = parse_url($uri, PHP_URL_PATH);

// Remove base path if needed (e.g., /php/api/index.php or /api/index.php)
$path = str_replace('/php/api/index.php', '', $path);
$path = str_replace('/php/api', '', $path);
$path = str_replace('/api/index.php', '', $path);
$path = str_replace('/api', '', $path);
$path = trim($path, '/');

// Route to appropriate endpoint
if ($path === 'health' || $path === '') {
    // Health check
    sendJSON(['status' => 'ok', 'message' => 'API is running']);
} elseif (preg_match('/^colleges\/?(\d+)?\/?courses\/?(\d+)?\/?semesters\/?(\d+)?$/', $path, $matches)) {
    // Handle nested routes: /colleges/:id/courses/:id/semesters/:id
    require_once 'semesters.php';
} elseif (preg_match('/^colleges\/?(\d+)?\/?courses\/?(\d+)?$/', $path, $matches)) {
    // Handle: /colleges/:id/courses or /courses/:id
    require_once 'courses.php';
} elseif (preg_match('/^colleges\/?(\d+)?$/', $path, $matches)) {
    // Handle: /colleges or /colleges/:id
    require_once 'colleges.php';
} elseif (preg_match('/^courses\/?(\d+)?\/?semesters\/?(\d+)?$/', $path, $matches)) {
    // Handle: /courses/:id/semesters or /courses/:id/semesters/:id
    require_once 'semesters.php';
} elseif (preg_match('/^courses\/?(\d+)?$/', $path, $matches)) {
    // Handle: /courses or /courses/:id
    require_once 'courses.php';
} elseif (preg_match('/^semesters\/?(\d+)?$/', $path, $matches)) {
    // Handle: /semesters or /semesters/:id
    require_once 'semesters.php';
} else {
    sendError('Endpoint not found', 404);
}
?>

