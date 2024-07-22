<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
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

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
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

        $cityID   = isExist($input['cityID']);

        if( empty( $user_id ) ) {
            echo json_encode(array('status' => 'success', 'message' => 'Invalid token!'));
            return;
        }

        if( $expiry <= time() ) {
            echo json_encode(array('status' => 'error', 'message' => 'Token expired!'));
            http_response_code(401);
            return;
        }

        if( empty( $cityID ) ) {
            echo json_encode(array('status' => 'error', 'message' => 'City ID is required!'));
            exit();
        } 

        $deleteSql = "DELETE FROM cities WHERE city_id = '$cityID' AND user_id = '$user_id'";
        
        if ($conn->query($deleteSql) === TRUE) {
            echo json_encode(array('status' => 'success', 'message' => 'City deleted successfully!'));
        } else {
            echo json_encode(array('status' => 'error', 'message' => 'Error on deleting city: ' . $conn->error));
        }
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
