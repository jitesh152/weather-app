<?php 
    define('JWT_SECRETKEY', 'WEATHER_API');

    function isValidEmail ( $email ) {
        return filter_var($email, FILTER_VALIDATE_EMAIL);
    }

    function isPost ( $name, $default = '' ) {
        return isset( $_POST[ $name ] ) ? $_POST[ $name ] : $default;
    }

    function isExist ( $name, $default = '' ) {
        return isset( $name ) ? $name : $default;
    }
?>