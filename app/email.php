<?php
  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $post_subject = $_POST["subject"];
    $message = $_POST["message"];

    $subject = "Southern Industrial Services Contact Form - From $email - $post_subject";
    $body = "<html><body><p>$message</p><p>From $email</p></body></html>";

    $to = "info@sistesting.com";

    $headers = "From: $email \r\n";
    $headers .= "Reply-To: $email \r\n";
    $headers .= "Signed-by: sistesting.com \r\n";
    $headers .= "MIME-Version: 1.0 \r\n";
    $headers .= "Content-Type: text/html; charset=utf-8 \r\n";


    header("Content-Type: application/json; charset=utf-8");
    $error = NULL;

    try {
      mail($to, $subject, $body, $headers);
    } catch(Exception $e) {
      $error = $e->getMessage();
    }

    if ($error != NULL) {
      header("HTTP/1.1 500");
      echo json_encode(array(
        "error" => $error
      ));
    } else {
      header("HTTP/1.1 204");
    }
  }
?>
