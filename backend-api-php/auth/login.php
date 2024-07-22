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

$secret_key = JWT_SECRETKEY;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get input data
    $input = json_decode(file_get_contents('php://input'), true);
    $email = isExist($input['email']);
    $password = isExist($input['password']);

    if( empty( $email ) || empty( $password ) ) {
        echo json_encode(array('status' => 'error', 'message' => 'All fields are required!'));
        exit();
    } else if( !isValidEmail( $email ) ) {
        echo json_encode(array('status' => 'error', 'message' => 'Invalid Email Id format!'));
        exit();
    }

    // SQL query to check if email exists
    $sql = "SELECT * FROM users WHERE email = '$email' AND password = '$password'";
    $result = $conn->query($sql);

    if ( isset( $result->num_rows ) && $result->num_rows == 1) {
        // Verify password
        $user = $result->fetch_assoc();
        $payload = array(
            "userid"    => $user['user_id'],
            "name"      => $user['name'],
            "expiry"    => time() + 3600 // Expires in 1 hour
        );
        $jwt = JWT::encode($payload, $secret_key, 'HS256');

        echo json_encode(array('status' => 'success', 'token' => $jwt));
    } else {
        // User not found
        echo json_encode(array('status' => 'error', 'message' => 'Invalid email or password'));
    }
} else {
    // Method not allowed
    echo json_encode(array('status' => 'error', 'message' => 'Method not allowed'));
}

$conn->close();

?>
