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

require_once('../dbConfig.php');
require_once('../config.php');
require_once('../vendor/autoload.php'); // Include JWT library

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

// JWT secret key (should be stored securely)
$secret_key = JWT_SECRETKEY;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get input data
    $input = json_decode(file_get_contents('php://input'), true);
    $token = isExist($input['token']); // JWT token

    if( empty( $token ) ) {
        echo json_encode(array('status' => 'error', 'message' => 'Unauthorized access!'));
        exit();
    }

    // Decode JWT token
    try {
        $decoded = JWT::decode($token, new Key($secret_key, 'HS256'));
        $user_id = isset($decoded->userid) ? $decoded->userid : ''; 
        $expiry = isset( $decoded->expiry ) ? $decoded->expiry : time();


        if( empty( $user_id ) ) {
            echo json_encode(array('status' => 'success', 'message' => 'Invalid token!'));
            return;
        }

        if( $expiry <= time() ) {
            echo json_encode(array('status' => 'error', 'message' => 'Token expired!'));
            http_response_code(401);
            return;
        }

        // Check if email already exists
        $check_sql = "SELECT * FROM users WHERE user_id = '$user_id'";
        $check_result = $conn->query($check_sql);
        $time = time();

        if ($check_result->num_rows == 0) {
            echo json_encode(array('status' => 'error', 'message' => 'Invalid User ID!'));
            http_response_code(401);
            exit();           
        }

        $stmt = $pdo->query( "SELECT * FROM cities WHERE user_id = '$user_id'" );
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode(array('status' => 'success', 'cities' => $data));

    } catch (Exception $e) {
        echo json_encode(array('status' => 'error', 'message' => 'Unauthorized access'));
        http_response_code(401);
    }
} else {
    // Method not allowed
    echo json_encode(array('status' => 'error', 'message' => 'Method not allowed'));
    http_response_code(401);
}

$conn->close();

?>
