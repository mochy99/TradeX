let limit0 = 4;
let limit1 = 4;
let limit2 = 4;
let data;
//fetch Top Gainers and Losers
const link = "https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=Y8XIWI0EEDT64QKU";
$.ajax({
    type: "POST",
    url: "requestAPI.php", 
    data: { url: link},
    dataType: "json",
    success: function (response) {
        data = response;
        $('#0').html(loading(data.most_actively_traded, limit0));
        $('#1').html(loading(data.top_gainers, limit1));
        $('#2').html(loading(data.top_losers, limit2));
    },
    error: function () {
        console.log("Error fetching data from loadingListing.php");
    }
});
const searchLink = 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=t&apikey=Y8XIWI0EEDT64QKU';
$.ajax({
    type: "POST",
    url: "requestAPI.php", 
    data: { url: searchLink},
    dataType: "json",
    success: function (response) {
        console.log(response);
    },
    error: function () {
        console.log("Error fetching data from loadingListing.php");
    }
});
$(document).ready(function () {
    
    $('#mostActivelyTraded').click(function() {
        if (limit0 < 20) {
            limit0 += 8;
            $('#0').html(loading(data.most_actively_traded, limit0));   
        } else {
            limit0 = 4;
            $('#0').html(loading(data.most_actively_traded, limit0));
            $(this).html("More options <span class=\"material-symbols-outlined\" >arrow_forward</span>");
        }
        if (limit0 === 20) {
            $(this).html("Show less <span class=\"material-symbols-outlined\" >arrow_forward</span>");
        }
    })

    $('#topGainers').click(function() {
        if (limit1 < 20) {
            limit1 += 8;
            $('#1').html(loading(data.top_gainers, limit1));   
        } else {
            limit1 = 4;
            $('#1').html(loading(data.top_gainers, limit1));
            $(this).html("More options <span class=\"material-symbols-outlined\" >arrow_forward</span>");
        }
        if (limit1 === 20) {
            $(this).html("Show less <span class=\"material-symbols-outlined\" >arrow_forward</span>");
        }
    })

    $('#topLosers').click(function() {
        if (limit2 < 20) {
            limit2 += 8;
            $('#2').html(loading(data.top_losers, limit2));   
        }else {
            limit2 = 4;
            $('#2').html(loading(data.top_losers, limit2));
            $(this).html("More options <span class=\"material-symbols-outlined\" >arrow_forward</span>");
        }
        if (limit2 === 20) {
            $(this).html("Show less <span class=\"material-symbols-outlined\" >arrow_forward</span>");
        }
        
    })  

    $('.search').keyup(function() {

    })
});

function loading(listing, limit) {
    let html = '';
    for (i = 0; i < limit; i++) {
        let stock = listing[i];
        let className = 'pos';
        className = (stock['change_amount'] < 0) ? "neg" : className;
        
        // Concatenate the HTML string without semicolons at the end of each line
        html += 
            "<section class=\"item\">" +
            "<div class=\"inf\">" +
            "<div>" + stock['ticker'] + "</div>" +
            "<img src=\"image/Logo-Tesla.jpg\">" +
            "</div>" +
            "<div class=\"price\">$" + stock['price'] + "</div>" +
            "<div class=\"inf\">" +
            "<div class=\"" + className + "\">" + stock['change_amount'] + "</div>" +
            "<div class=\"" + className + "\">" + stock['change_percentage'] + "</div>" +
            "</div>" +
            "</section>";
    
    }
    return html;
}