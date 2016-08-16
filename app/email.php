<?php
    $error = False;

    if( !isset($_POST['name']) ||
        !isset($_POST['email'])
    ){
        $error = True;
    }

    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
    $string_exp = "/^[A-Za-z .'-]+$/";

    $name =$_POST["name"];
    $email =$_POST["email"];
    $post_subject =$_POST["subject"];
    $message =$_POST["message"];

    if( !preg_match( $email_exp, $email ) ||
        !preg_match( $string_exp, $name ) ||
        !preg_match( $string_exp, $post_subject ) ||
        !preg_match( $string_exp, $message )
    ){
        $error = True;
    }

    $subject = "Southern Industrial Services Contact Form - From $email - $post_subject";
    $body = "<html><body><p>$message</p><p>From $email</p></body></html>";

    $to = "info@sistesting.com";

    $headers = "From: $email \r\n";
    $headers .= "Reply-To: $email \r\n";
    $headers .= "Signed-by: sistesting.com \r\n";
    $headers .= "MIME-Version: 1.0 \r\n";
    $headers .= "Content-Type: text/html; charset=utf-8 \r\n";

    if( $error == False ){
        mail( $to, $subject, $body, $headers );
        header("Location: http://sistesting.com/#/context_us_success");
    } else {
        header("Location: http://sistesting.com/#/context_us_error");
    }
?>
