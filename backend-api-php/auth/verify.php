<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Access-Control-Max-Age: 86400');   
header('Content-Type: application/json');


// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit();
}

require_once('../config.php');
require_once('../dbConfig.php');
require_once('../vendor/autoload.php'); // Include JWT library

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$secret_key = JWT_SECRETKEY;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get input data
    $input = json_decode(file_get_contents('php://input'), true);
    $token = isExist($input['token']);

    if( empty( $token ) ) {
        echo json_encode(array('status' => 'error', 'message' => 'All fields are required!'));
        exit();
    }

    try {
        // Decode JWT token
        $decoded = JWT::decode($token, new Key($secret_key, 'HS256'));

        $user_id = isset($decoded->userid) ? $decoded->userid : ''; 
        $expiry = isset( $decoded->expiry ) ? $decoded->expiry : time();

        if( empty( $user_id ) ) {
            echo json_encode(array('status' => 'success', 'message' => 'Token verified!'));
            return;
        }

        if( $expiry <= time() ) {
            echo json_encode(array('status' => 'error', 'message' => 'Token expired!'));
            http_response_code(401);
            return;
        }

        // SQL query to check if email exists
        $sql = "SELECT * FROM users WHERE user_id = '$user_id'";
        $result = $conn->query($sql);

        if ($result->num_rows == 1) {
            echo json_encode(array('status' => 'success', 'message' => 'Token verified!'));
        } else {
            echo json_encode(array('status' => 'error', 'message' => 'Invalid token!'));
        }
    

    } catch (Exception $e) {
        // Token is invalid or expired
        http_response_code(401);
        echo json_encode(array('status' => 'error', 'message' => $e->getMessage()));
    }

} else {
    // Method not allowed
    echo json_encode(array('status' => 'error', 'message' => 'Method not allowed'));
}

$conn->close();

?>
