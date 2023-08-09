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

$getTime=time();
$time = date("His-Ymh",$getTime);
$transactionID =  $time . 'DP' . $userID;
$symbol ='DP';
$quantity = 1;
if ($data[0] === 'deposit') {
    $balance = $balance + $data[2];
    updateDeposit();
} else {
    $balance = $balance - $data[2];
    $transactionID =  $time . 'WD' . $userID;
    $symbol ='WD';
    $quantity = -1;
    updateWithdraw();
}



// Update transaction on database
$updateTransactionStmt = $conn->prepare("INSERT transactions (transactionID, userID, symbol, transactionType, quantity, price) 
VALUES (?,?,?,?,?,?)");
$updateTransactionStmt->bind_param('sissid', $transactionID, $userID, $symbol, $data[0], $quantity, $data[2]);
$updateTransactionStmt->execute();
$updateTransactionStmt->close();

// Update balance and another inf deposit
function updateDeposit() {
    global $matched, $conn, $balance, $data, $email, $transactionID;
    $updateAllStmt = $conn->prepare("UPDATE users SET balance=?, fname=?, lname=?,  cardName=?, cardNum=?, mExp=?, yExp=?, cvv=?  WHERE email=?");
    $updateStmt = $conn->prepare("UPDATE users SET balance=?, fname=?, lname=? WHERE email=?");
    
    if ($matched) {
        if ($data[1] == 'true') {
            $updateAllStmt->bind_param("dssssiiss", $balance, $data[3], $data[4], $data[5], $data[6], $data[7], $data[8], $data[9], $email);
            $updateAllStmt->execute();
        } else {
            $updateStmt->bind_param("dsss", $balance, $data[3], $data[4], $email);
            $updateStmt->execute();
        }
        echo $response = $transactionID . ',' . $balance ;
    } else {
        echo $response = 'failed';
    }
    
    
    $updateAllStmt->close();
    $updateStmt->close();
}

//Update balance withdraw
function updateWithdraw() {
    global $conn, $balance, $data, $email, $transactionID;
    $updateStmt = $conn->prepare("UPDATE users SET balance=? WHERE email=?");
    
    $updateStmt->bind_param("ds", $balance, $email);
    $updateStmt->execute();
    $updateStmt->close();
        
    echo $response = $transactionID . ',' . $balance ;

    
}

$conn->close();
?>
