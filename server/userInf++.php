<?php
include_once "userInf+.php";
?>
<?php
$conn =  new mysqli(DBHOST, DBUSER, DBPASS, DBNAME);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " .$conn->connect_error);
}

// Create prepare and bind
$stmtTransaction = $conn->prepare("SELECT * FROM transactionCopy WHERE userID=?");
$stmtTransaction->bind_param("i", $user['userID']);

// Execute the query
$stmtTransaction->execute();

// Get the result
$result = $stmtTransaction->get_result();
$transactions = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        array_push($transactions,$row);
    }
};

$stmtTransaction->close();
$conn->close();
$response = [$user, $transactions];

$responseJson = json_encode($response); // Convert the array to a JSON-encoded string
echo $responseJson; // Echo the JSON-encoded string
?>
