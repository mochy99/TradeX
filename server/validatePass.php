<?php
include_once "../server/userInf+.php";
?>

<?php
$password = $_POST["data"];

if ($password === $user["password"]) {
    echo $response = true;
} else {
    echo $response = false;
}
?>