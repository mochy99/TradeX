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
            if (userTransactions) {
                portfolio(userTransactions);
                dashBoard("Dash board", dataGraph);
            } else {
                $('#portfolio').text('No history transaction');
            }
            
            
            // Display balance and asset
            $('#balance').text("Deposit: $" + userInf.balance);
            $('#asset').text("Total: $" + asset.toString()) ;
            
            
        },
        error: function(err) {
            console.log(err);
        }
    })
    
    // Function draw the chart
    function dashBoard(title,dataBase) {
        const startColor = [236,233,254];
        const endColor = [140, 92, 247];
        const numSteps = dataBase.length;

        const stepSize = [
            (endColor[0] - startColor[0]) / numSteps,
            (endColor[1] - startColor[1]) / numSteps,
            (endColor[2] - startColor[2]) / numSteps
        ];

        const intermediateColors = [];

        for (let i = 0; i < numSteps; i++) {
            const r = Math.round(startColor[0] + stepSize[0] * i);
            const g = Math.round(startColor[1] + stepSize[1] * i);
            const b = Math.round(startColor[2] + stepSize[2] * i);
            intermediateColors.push(`rgb(${r},${g},${b})`);
        }
        
        Highcharts.chart('graph', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                backgroundColor: "transparent",
                
            },
            exporting: {
                buttons: {
                    contextButton: {
                        enabled: false
                    }
                } 
            },
            title: {
                text: title,
                align: 'center',
                style: {
                    color: '#ffffff'
                } 
            },
            legend: {
                itemStyle: {
                    color: '#ffffff'
                }
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
                        enabled: false, 
                    },
                    borderColor: "transparent",
                    showInLegend: true,
                    colors: intermediateColors
                }
            },
            series: [{
                name: 'Stock',
                colorByPoint: true,
                data: dataBase
            }],
            credits: {
                enabled: false 
            },
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
            }
            
        }
        

        let html = "";
        for (const stock in filteredData) {
            let value = filteredData[stock][2];
            let quantity = filteredData[stock][0];
            if (value && stock !=="WD" && stock !=='DP') {
                value = value * -1;
                quantity = quantity * -1;
                asset += value;
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
        asset = Math.round(asset * 100) /100;
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
    $('#add').on('click', function () {
        window.location.href = "market.php";
        console.log('hi')
    })
    // ('.highcharts-background').css('background-image', 'linear-gradient(175deg, rgba(45, 85, 139, 0.5), rgba(45, 9, 98, 0.3))');
});