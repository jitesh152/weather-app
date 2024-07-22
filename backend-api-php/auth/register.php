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

$secret_key = JWT_SECRETKEY;

if ( $_SERVER['REQUEST_METHOD'] === 'POST' ) {
    // Get input data
    $input  = json_decode(file_get_contents('php://input'), true);
    $name   = isExist($input['name']);
    $phone  = isExist($input['phone']);
    $password = isExist($input['password'], time()); // Hash password
    $email  = isExist($input['email']);

    if( empty( $email ) || empty( $phone ) || empty( $name ) ) {
        echo json_encode(array('status' => 'error', 'message' => 'All fields are required!'));
        exit();
    } else if( !isValidEmail( $email ) ) {
        echo json_encode(array('status' => 'error', 'message' => 'Invalid Email Id format!'));
        exit();
    }

    // Check if email already exists
    $check_sql = "SELECT * FROM users WHERE email = '$email'";
    $check_result = $conn->query($check_sql);
    $time = time();

    if ($check_result->num_rows > 0) {
        // email already exists
        echo json_encode(array('status' => 'error', 'message' => 'Email already exists'));
    } else {
        // Insert new user into database
        $insert_sql = "INSERT INTO users (name, password, email, phone, created_at) VALUES ('$name', '$password', '$email', '$phone', '$time')";
        
        if ($conn->query($insert_sql) === TRUE) {
            // User registered successfully
            $userId = $conn->insert_id;

            // Generate JWT token
            $payload = array(
                "userid"    => $userId,
                "name"      => $name,
                "expiry"    => time() + 3600 // Expires in 1 hour
            );
            $jwt = JWT::encode($payload, $secret_key, 'HS256');
            
            echo json_encode(array('status' => 'success', 'token' => $jwt));
        } else {
            // Registration failed
            echo json_encode(array('status' => 'error', 'message' => 'Error registering user: ' . $conn->error));
        }
    }
} else {
    // Method not allowed
    echo json_encode(array('status' => 'error', 'message' => 'Method not allowed'));
}

$conn->close();

?>
