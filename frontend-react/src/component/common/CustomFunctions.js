
export const isValidEmail = (email) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

export const validatePhoneNumber = (phoneNumber) => {
    const re = /^\d{10}$/;
    return re.test(phoneNumber);
}

export const minLengthValidation = (password, minLength = 6) => {
    return password.length >= minLength;
}

export const isStrongPassword = (password) => {
    // Define regex patterns for validation
    const regexUpperCase = /[A-Z]/; // At least one uppercase letter
    const regexLowerCase = /[a-z]/; // At least one lowercase letter
    const regexDigit = /[0-9]/; // At least one digit
    const regexSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/; // At least one special character
    const regexCommonPatterns = /(123|abc|password)/i; // Avoid common patterns

    // Check length (minimum 8 characters)
    if (password.length < 8) {
        return false;
    }

    // Check for uppercase, lowercase, digit, and special character
    if (!regexUpperCase.test(password) ||
        !regexLowerCase.test(password) ||
        !regexDigit.test(password) ||
        !regexSpecialChar.test(password)) {
        return false;
    }

    // Check for common patterns
    if (regexCommonPatterns.test(password)) {
        return false;
    }

    // All checks passed, password is strong
    return true;
}