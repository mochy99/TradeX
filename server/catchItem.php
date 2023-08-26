<?php
include_once "../template/error.php";
include_once "../template/session.php";
?>
<?php
    $_SESSION['symbol'] = $_POST['symbol'];
    $_SESSION["price"] = $_POST['price'];
    $_SESSION["amount"] = $_POST['amount'];
    $_SESSION["percentage"] = $_POST['percentage'];
    echo '../market/item.php';
?>

