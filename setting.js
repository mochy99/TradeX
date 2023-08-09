$(document).ready(function() {
    $('#inf').click(function() {
        window.location.href = "personalInf.html";
    });
    $('#sercurity').click(function() {
        window.location.href = "changePass.html";
    });
    $('#deposit').click(function() {
        window.location.href = "deposit.html";
    });
    $('#withdraw').click(function() {
        window.location.href = "withdraw.html";
    });
    $('#support').click(function() {
        window.location.href = "support.html";
    });
    $('#logout').click(function() {
        window.location.href = "login.php";
    });
    $('.profile').click(function() {
        window.location.href = "mainPage.php";
        console.log('hello')
    });
    $('.trend').click(function() {
        window.location.href = "market.php";
    });

});