<?php
include_once "../template/error.php";
include_once "../template/session.php";
?>
<?php
    $_SESSION['symbol'] = $_POST['symbol'];
    // $_SESSION['value'] = $_POST['value'];
    // $_SESSION['quantity'] = $_POST['quantity'];
    echo '../portfolio/portfolio.php';
?>