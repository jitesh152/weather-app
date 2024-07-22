<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Access-Control-Max-Age: 86400');   
header('Content-Type: application/json');

require_once('../dbConfig.php');
require_once('../config.php');
require_once('../vendor/autoload.php'); // Include JWT library

use Firebase\JWT\JWT;

// JWT secret key (should be stored securely)
$secret_key = JWT_SECRETKEY;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get input data
    $input = json_decode(file_get_contents('php://input'), true);
    $token = $input['token']; // JWT token
    $newPassword = password_hash($input['newPassword'], PASSWORD_DEFAULT); // Hash new password
    $newEmail = $input['newEmail'];

    // Decode JWT token
    try {
        $decoded = JWT::decode($token, $secret_key, array('HS256'));
        $userId = $decoded->user_id;

        // Update user information in database
        $sql = "UPDATE users SET password = '$newPassword', email = '$newEmail' WHERE id = $userId";
        
        if ($conn->query($sql) === TRUE) {
            // User updated successfully
            echo json_encode(array('status' => 'success'));
        } else {
            // Update failed
            echo json_encode(array('status' => 'error', 'message' => 'Error updating user: ' . $conn->error));
        }
    } catch (Exception $e) {
        // Invalid token or unauthorized access
        echo json_encode(array('status' => 'error', 'message' => 'Unauthorized access'));
    }
} else {
    // Method not allowed
    echo json_encode(array('status' => 'error', 'message' => 'Method not allowed'));
}

$conn->close();

?>



<?php

header('Content-Type: application/json');

require_once('db_config.php');
require_once('vendor/autoload.php'); // Include JWT library

use Firebase\JWT\JWT;

// JWT secret key (should be stored securely)
$secret_key = "your_secret_key";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get input data
    $input = json_decode(file_get_contents('php://input'), true);
    $token = $input['token']; // JWT token

    // Decode JWT token
    try {
        $decoded = JWT::decode($token, $secret_key, array('HS256'));
        $userId = $decoded->user_id;

        // Delete user from database
        $sql = "DELETE FROM users WHERE id = $userId";
        
        if ($conn->query($sql) === TRUE) {
            // User deleted successfully
            echo json_encode(array('status' => 'success'));
        } else {
            // Deletion failed
            echo json_encode(array('status' => 'error', 'message' => 'Error deleting user: ' . $conn->error));
        }
    } catch (Exception $e) {
        // Invalid token or unauthorized access
        echo json_encode(array('status' => 'error', 'message' => 'Unauthorized access'));
    }
} else {
    // Method not allowed
    echo json_encode(array('status' => 'error', 'message' => 'Method not allowed'));
}

$conn->close();

?>
