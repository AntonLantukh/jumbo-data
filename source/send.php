<?
  if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $to = 'lantukhanton@gmail.com';
    $subject = 'Обратный звонок';
    $message = '
      <html>
        <head>
          <title>'.$subject.'</title>
        </head>
          <body>
            <p>Имя: '.htmlspecialchars($_POST['name']).'</p>
            <p>Телефон: '.htmlspecialchars($_POST['phone']).'</p>
            <p>Телефон: '.htmlspecialchars($_POST['mail']).'</p>
            <p>Текст сообщения: '.htmlspecialchars($_POST['text']).'</p>
        </body>
      </html>';
    $headers  = "Content-type: text/html; charset=utf-8 \r\n";
    $headers .= "From: Отправитель <no-reply@jumbodata.ru>\r\n";
    mail($to, $subject, $message, $headers);
    $redirect = isset($_SERVER['HTTP_REFERER'])? $_SERVER['HTTP_REFERER']:'redirect-form.html';
    header("Location: $redirect");
    exit();
  }
?>
