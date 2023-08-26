$(document).ready(function() {
    const symbol = $('#symbol').text();
    const balance = parseFloat($('#currentBalance').text());
    const money = $('#money');
    const quantity = $('#quantity');
    const errorMoney = $('.errorMoney');
    const errorQuantity = $('.errorQuantity');
    const price = parseFloat($("#price").text().replace("$",""));
    const submit = $('#submit');
    const cancel = $('#cancel');
    // Handle event when clicking back btn
    $('#back').click(function() {
        window.location.href = "market.php";
    })
    
    // Handle event when click buy btn
    $('#add').click(function() {    
        $('.main').addClass('blur');
        $('#buy').removeClass('hidden');
    })


    

    // Handle blur in money input
    money.on('keyup', function() {
        errorMoney.text("");
        if (money.val() && !isNaN(money.val()) &&  money.val() <= balance) {
            let quantityVal = $(this).val() / price;
            quantity.val(quantityVal.toFixed(2) > 0 ? quantityVal.toFixed(2) : "");
            errorMoney.text("");
            submit.removeClass('pending');
        } else {
            quantity.val('');
            errorMoney.text("Please input valid amount of money");
            submit.addClass('pending');
        }
    });
    
    // Handle blur in quantity input
    quantity.on('keyup', function() {
        errorQuantity.text("");
        let moneyVal = $(this).val() * price;
        if ($(this).val() && !isNaN($(this).val()) && moneyVal <= balance) {    
            money.val(moneyVal.toFixed(2) > 0 ? moneyVal.toFixed(2) : "");
            errorQuantity.text("");
            submit.removeClass('pending');
        } else {
            money.val("");
            errorQuantity.text("Please input valid quantity");
            submit.addClass('pending');
        }
    });

    // Check validation of inputs
    submit.on('click', function() {
        if(!isNaN(money.val()) && !isNaN(quantity.val())
        && (money.val()) && (quantity.val())) {    
            console.log(symbol) ;       
            dataInf = ["buy", parseFloat(quantity.val()), price, symbol];
            console.log(dataInf);
            // Send and update data by ajax
            $.ajax({
                url: 'processDeposit.php',
                type: 'POST',
                data: { inf: dataInf },
                success: function (response) {
                    
                    inf = response.split(",");
                    console.log(inf);
                    description = "You purchased successfullly " + quantity.val() + " " + symbol;
                    $('#buy').addClass('hidden');
                    $('#notice').removeClass('hidden');
                    $('.status').text('Transaction approved!');
                    $('.description').text(description);
                    $('#balance').text(inf[1]);
                    $('#transactionNumber').text(inf[0]);
                },
                error: function (err) {
                    $('#buy').addClass('hidden');
                    $('#notice').removeClass('hidden');
                    $('.status').text('Transaction failed!');
                    $('.box').addClass('hidden');
                    console.error(err);
                }
            }); 
        } else {
            checkBlank(money,errorMoney);
            checkBlank(quantity, errorQuantity);
        }
        
    })
    
    // Function cancel btn
    cancel.on('click', function() {
        $('.main').removeClass('blur');
        $('#buy').addClass('hidden');
    })
    // Function close btn
    $('.close').click(function() {
        window.location.href = 'mainPage.php';
    })

    // const stockSymbol = $('h1').text();
    // const url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + stockSymbol + "&outputsize=full&apikey=Y8XIWI0EEDT64QKU";

    // $.ajax({
    //     type: "GET",
    //     url: url,
    //     dataType: "json", 
    //     success: function (data) {
    //         const timeSeriesDaily = data["Time Series (Daily)"];
    //         console.log(data);
    //         const formattedData = [];
    //         let max = 0;
    //         let min = 0;
    //         let sum

    //         for (const date in timeSeriesDaily) {
    //             const entry = timeSeriesDaily[date];
    //             const timestamp = new Date(date).getTime();
    //             const open = parseFloat(entry["1. open"]);
    //             const high = parseFloat(entry["2. high"]);
    //             const low = parseFloat(entry["3. low"]);
    //             const close = parseFloat(entry["4. close"]);
    //             max = (max < high) ? high : max;
    //             min = (min > low) ? high : min;

    //             formattedData.push([timestamp, open, high, low, close]);
    //         }

    //         // Sort the data by timestamp in ascending order
    //         formattedData.sort((a, b) => a[0] - b[0]);
    //         console.log(formattedData);
    //         // Create the Highcharts chart
    //         Highcharts.stockChart("graph", {
    //             rangeSelector: {
    //                 selected: 1
    //             },
    //             title: {
    //                 text: stockSymbol
    //             },
    //             xAxis: {
    //                 type: 'datetime'
    //             },
    //             yAxis: {
    //                 title: {
    //                     text: 'Price'
    //                 }
    //             },
                
    //             series: [{
    //                 name: 'Stock Price',
    //                 data: formattedData,
    //                 tooltip: {
    //                     valueDecimals: 2
    //                 }
    //             }], 
               
    //         });
    //     },

    //     error: function () {
    //         $("#graph").text("We could not load the graph at this time. Check back soon.");
    //     }
    // });
    
})