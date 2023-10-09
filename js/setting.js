$(document).ready(function() {
    $('#inf').click(function() {
        window.location.href = "../setting/personalInf.php";
    });
    $('#sercurity').click(function() {
        window.location.href = "../setting/changePass.php";
    });
    $('#deposit').click(function() {
        window.location.href = "../setting/deposit.php";
    });
    $('#withdraw').click(function() {
        window.location.href = "../setting/withdraw.php";
    });
    $('#logout').click(function() {
        window.location.href = "../signup/login.php";
        localStorage.clear();
    });
    $('.profile').click(function() {
        window.location.href = "../main/main.php";
    });
    $('.trend').click(function() {
        window.location.href = "../main/market.php";
    });
    $('.setting').removeClass('inactive');

});