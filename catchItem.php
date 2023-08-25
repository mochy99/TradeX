<?php
// error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);
session_start();
?>
<?php
    $_SESSION['symbol'] = $_POST['symbol'];
    $_SESSION["price"] = $_POST['price'];
    $_SESSION["amount"] = $_POST['amount'];
    $_SESSION["percentage"] = $_POST['percentage'];
    echo 'item.php';
?>

