let limit0 = 4;
let limit1 = 4;
let limit2 = 4;
let data;
// Loading Top Gainers and Losers database
loadingContent(); 

$(document).ready(function () {
    
    // Handle events when clicking each of item
    $(document.body).on('click', '.item', function() {
        let symbol = $(this).attr('id');
        let price = $(this).find('.price').text();
        let amount = $(this).find('#amount').text();
        let percentage = $(this).find('#percentage').text();
        console.log({ symbol: symbol, price: price, amount: amount, percentage: percentage });
        $.ajax({
            type: "POST",
            url: "../server/catchItem.php", 
            data: { symbol: symbol, price: price, amount: amount, percentage: percentage },
            success: function(response) {
                console.log("Data sent successfully");
                console.log("Response from server:", response);
                
                // Navigate to item.php after successful AJAX request
                window.location.href = response;
            },
            
            error: function() {
                console.log("Error fetching data from item.php");
            }
        });
    });

    //Navigation to other pages
    $('.profile').click(function() {
        window.location.href = "main.php";
    });
    $('.setting').click(function() {
        window.location.href = "setting.php";
    });
    $(".trend").removeClass('inactive');

    // Handle event show more or less
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
    

    // Handle events and retrieve data when the user inputs in search box
    // NOT DONE YET
    $('#search').click(function() {
        let keyWord = $('#keyword').val();
        $.ajax({
            type: "GET",
            url: "../data/listing_status.csv", 
            dataType: "text",
            success: function (csvData) {
    
                // Convert the CSV data into an array of objects
                const lines = csvData.split('\n');
                const headers = lines[0].split(',');
                const stocksData = [];

                for (let i = 1; i < lines.length; i++) {
                    const currentLine = lines[i].split(',');
                    const stockData = {};
                    for (let j = 0; j < 4; j++) {
                        stockData[headers[j]] = currentLine[j];
                    }
                    stocksData.push(stockData);
                }
                console.log(stocksData);

                // $('.close').after().html(searching(listing));
                // $('#result').removeClass('hidden').addClass('visible');
                // $('#topList').removeClass('visible').addClass('hidden');
            },
            error: function () {
                console.log("Error fetching data from loadingListing.php");
            }
        });
    })

    // Handle the behavior when clicking to close the search field
    $('.close').click(function() {
        $('.close').after().html("");
        $('#topList').removeClass('hidden').addClass('visible');
        $('#result').removeClass('visible').addClass('hidden');
    })

})  

//-----------------------HELPER-------------------------
// Fetch information from database
function loadingContent() {
    const link = "https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=demo";
    $.ajax({
        type: "GET",
        url: link, 
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
};

// Loading the dynamic data from API and dislaying it on the page
function loading(listing, limit) {
    let html = '';
    for (i = 0; i < limit; i++) {
        let stock = listing[i];
        let className = 'pos';
        className = (stock['change_amount'] < 0) ? "neg" : className;
        
        // Concatenate the HTML string without semicolons at the end of each line
        html += 
            '<section action="catchItem.php" class="item" id ="' +stock['ticker'] +'">' +
            '<div class="inf">' +
            '<div>' + stock['ticker'] + '</div>' +
            '<img src="../image/Logo-Tesla.jpg">' +
            '</div>' +
            '<div class="price">$' + stock['price'] + '</div>' +
            '<div class="inf">' +
            '<div id= "amount" class="' + className + '">' + stock['change_amount'] + '</div>' +
            '<div id= "percentage" class="' + className + '">' + stock['change_percentage'] + '</div>' +
            '</div>' +
            '</section>';
    
    }
    return html;
}

// NOT DONE YET
function bestMatch(data) {
    //algorithm for best searching <Binary search>
}
function searching(list) {
    let html = '';
    for (i = 0; i < list.length; i++) {
        let item = listing[i];
        
        // Concatenate the HTML string without semicolons at the end of each line
        html += 
            '<div class="container">' +
            '<h2>' + item['symbol'] +'</h2>' +
            '<div class="right">' + item['assetType'] + '</div>' +
            '<div class="right">' + item['exchange'] + '</div>' +
            '<div class="neg">' + item['name'] +'</div>'
            "</div>";
    }
    return html;
};