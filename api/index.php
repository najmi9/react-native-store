<?php
// Get the email and password from the request body
$email = $_POST['email'];
$password = $_POST['password'];

// Check if the email and password are valid
if ($email === 'user@gmail.com' && $password === '123456') {
  // The email and password are correct, so set the user ID

  // Return a JSON response with the user ID
  echo json_encode(['token' => 'jwt token']);
} else {
  // The email and/or password are incorrect, so return an error message
  http_response_code(401);
  echo json_encode(['error' => 'Invalid email or password']);
}

echo json_encode(['error' => 'Test error']);
?>
