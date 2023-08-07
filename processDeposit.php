<?php
// error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

session_start();
require 'config.php';


$data = $_POST['inf'];
$email = $_SESSION['email'];


// Create connection
$conn = new mysqli(DBHOST, DBUSER, DBPASS, DBNAME);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$matched = true;
// Check card information (match name, number, exp, cvv, limit) -> $matched = Bool

// Check the current balance of user
$balanceStmt = $conn->prepare("SELECT userID, balance FROM users WHERE email=?");
$balanceStmt->bind_param("s", $email);
$balanceStmt->execute();


$result = $balanceStmt->get_result();
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $GLOBALS['userID'] = $row['userID'];
    $GLOBALS['balance'] = $row['balance'];
}

$balanceStmt->close();
$balance = $balance + $data[1];

// Create and update the transaction
// Create transaction id
$getTime=time();
$time = date("HisYmh",$getTime);
$transactionID =  $time . 'DP' . $userID;
$symbol ='DP';
$transactionType = 'deposit';
$quantity = 1;
// Update transaction on database
$updateTransactionStmt = $conn->prepare("INSERT transactions (transactionID, userID, symbol, transactionType, quantity, price) 
VALUES (?,?,?,?,?,?)");
$updateTransactionStmt->bind_param('sissid', $transactionID, $userID, $symbol, $transactionType, $quantity, $data[1]);
$updateTransactionStmt->execute();
$updateTransactionStmt->close();

// Update balance and another inf
$updateAllStmt = $conn->prepare("UPDATE users SET balance=?, fname=?, lname=?,  cardName=?, cardNum=?, mExp=?, yExp=?, cvv=?  WHERE email=?");
$updateStmt = $conn->prepare("UPDATE users SET balance=?, fname=?, lname=? WHERE email=?");

if ($matched) {
    if ($data[0]) {
        $updateAllStmt->bind_param("dssssiiss", $balance, $data[2], $data[3], $data[4], $data[5], $data[6], $data[7], $data[8], $email);
        $updateAllStmt->execute();
    } else {
        $updateStmt->bind_param("isss", $balance, $data[2], $data[3], $email);
        $updateStmt->execute();
    }
    echo $response = $transactionID . ',' . $balance ;
} else {
    echo $response = 'failed';
}


$updateAllStmt->close();
$updateStmt->close();
$conn->close();
?>
