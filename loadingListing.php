<?php
// error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// start new session
session_start();

require 'config.php';
?>
<?php
$json = file_get_contents('https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=Y8XIWI0EEDT64QKU');

$data = json_decode($json,true);

$mostActivelyTraded = $data['most_actively_traded'];
$topGainers = $data['top_gainers'];
$topLosers = $data['top_losers'];
$listName = [$mostActivelyTraded, $topGainers, $topLosers]; 
function loading($listing, $limit) {
    for ($i = 0; $i < $limit; $i++) {
        $stock = $listing[$i];
        echo "<section class=\"item\">";
        echo "<div class=\"inf\">";
        echo "<div>" . $stock['ticker'] . "</div>";
        echo "<img src=\"image/Logo-Tesla.jpg\">";
        echo "</div>";
        echo "<div class=\"price\">$" . $stock['price'] . "</div>";
        echo "<div class=\"inf\">";
        
        $class = "pos"; // Initialize the $class variable
        
        $class = ($stock['change_amount'] < 0) ? "neg" : $class;
        echo "<div class=\"" . $class . "\">" . $stock['change_amount'] . "</div>";
        echo "<div class=\"" . $class . "\">" . $stock['change_percentage'] . "</div>";
        echo "</div>";
        echo "</section>";
    }
}
if (isset($_POST['index']) && isset($_POST['limit'])) {
    $i = $_POST['index'];
    $limit = intval($_POST['limit']);   
    if (isset($i) && ($limit + 8) <= 20) {
        $limit += 8;
        loading($listName[$i], $limit);
    } else {
        loading($listName[$i], $limit);
    }
}




?>