$(document).ready(function() {
    let userInf;
    let userTransactions;
    let asset = 0;
    const filteredData = {}; 
    const dataGraph = [];
    $('.profile').removeClass('inactive');
    $('.trend').click(function() {
        window.location.href = "market.php";
    });
    $('.setting').click(function() {
        window.location.href = "setting.php";
    });
    // Fetch all information of users
    $.ajax({
        type: "GET",
        url: "../server/userInf++.php",
        dataType: "json",
        success: function(response) {
            userInf = response[0];
            userTransactions = response[1];
            console.log(!userTransactions);
            if (!userTransactions) {
                portfolio(userTransactions);
                dashBoard("Dash board", dataGraph);
            } else {
                $('#portfolio').text('No history transaction');
            }
            
            
            // Display balance and asset
            $('#balance').text("Your available balance " + userInf.balance);
            $('#asset').text(asset.toString()) ;
            
            
        },
        error: function(err) {
            console.log(err);
        }
    })
    
    // Function draw the chart
    function dashBoard(title,dataBase) {
        Highcharts.chart('graph', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: title,
                align: 'center'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>${point.percentage:.1f}</b>'
            },
            accessibility: {
                point: {
                    valuePrefix: '$'
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: 'Stock',
                colorByPoint: true,
                data: dataBase
            }]
        });
        
        
    }
    // Function hanlde porfolio
    function portfolio(data) {
        // Initialize an object to store the portfolio summary
    
        for (const transaction of data) {
            if (transaction && transaction['symbol']) {
                const symbol = transaction['symbol'];
                const quantity = parseFloat(transaction['quantity']);
                const price = parseFloat(transaction['price']);
                const value = parseFloat(transaction['value']);
    
                if (!filteredData[symbol]) {
                    filteredData[symbol] = [quantity, price, value];
                } else {
                    filteredData[symbol][0] += quantity;
                    filteredData[symbol][2] += value ;
                }
               
                console.log(filteredData);
            }
            
        }
        

        let html = "";
        for (const stock in filteredData) {
            console.log(filteredData[stock][2]);
            let value = filteredData[stock][2];
            console.log(value);
            let quantity = filteredData[stock][0];
            if (value && stock !=="WD" && stock !=='DP') {
                value = value * -1;
                quantity = quantity * -1;
                asset += value;
                console.log(asset);
                html += '<div class="container" id="' + stock + '">'
                    + '<h3>' + stock + '</h3>'
                    + '<div class="box">' 
                    + '<div class="pos">' + value + '</div>'
                    + '<div>' + quantity + '</div>'
                    + '</div>'
                    + '</div>';
                dataGraph.push({name: stock, y: value});
                
            }       
        }
        $('#portfolio').html(html);
    }

    // Function click each item
    $(document.body).on('click', '.container', function() {
        let symbol = $(this).attr('id');
        let value = $(this).find('.value').text();
        let quantity = $(this).find('.quantity').text();
        $.ajax({
            type: "POST",
            url: "../server/catchPortfolio.php", 
            data: { symbol: symbol, value: value, quantity: quantity},
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
    

    // Function for add investment btn
    $('#id').on('click', function () {
        window.location.href = "market.php";
    })

    const link = "https://www.alphavantage.co/query?function=LISTING_STATUS&apikey=FYS7XBGA2EO90BBJ";
    $.ajax({
        type: "GET",
        url: link, 
        dataType: "json",
        success: function (response) {
            console.log(response)
        },
        error: function () {
            console.log("Error fetching data from loadingListing.php");
        }
    });
});