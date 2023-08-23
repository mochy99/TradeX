
$(document).ready(function () {
    limit0 = 4;
    limit1 = 4;
    limit2 = 4;

    // 
    $('#mostActivelyTraded').click(function() {
        console.log('hello');
        $.ajax({
            type: "POST",
            url: "loadingListing.php",
            data: { index: '0', limit: limit0}, 
            success: function (response) {
                console.log(response);
                $('#0').html(response);
                limit0 += 4;
            },
            error: function () {
                console.log("Error fetching data from loadingListing.php");
            }
        });
        
    })

    $('#topGainers').click(function() {
        console.log('hello');
        $.ajax({
            type: "POST",
            url: "loadingListing.php",
            data: { index: '1', limit: limit1}, 
            success: function (response) {
                console.log(response);
                $('#1').html(response);
                limit1 += 4;
            },
            error: function () {
                console.log("Error fetching data from loadingListing.php");
            }
        });
        
    })

    $('#topLosers').click(function() {
        console.log('hello');
        $.ajax({
            type: "POST",
            url: "loadingListing.php",
            data: { index: '2', limit: limit2}, 
            success: function (response) {
                console.log(response);
                $('#2').html(response);
                limit2 += 4;
            },
            error: function () {
                console.log("Error fetching data from loadingListing.php");
            }
        });
        
    })
    


    $(document).on('click', '.gainer-container, .loser-container', function () {
        const stockSymbol = $(this).attr('id');
        console.log(stockSymbol);
        const url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + stockSymbol + "&outputsize=full&apikey=Y8XIWI0EEDT64QKU";

        $.ajax({
            type: "GET",
            url: url,
            dataType: "json", // Set the dataType to "json" to parse JSON data
            success: function (data) {
                const timeSeriesDaily = data["Time Series (Daily)"];

                const formattedData = [];

                for (const date in timeSeriesDaily) {
                    const entry = timeSeriesDaily[date];
                    const timestamp = new Date(date).getTime();
                    const open = parseFloat(entry["1. open"]);
                    const high = parseFloat(entry["2. high"]);
                    const low = parseFloat(entry["3. low"]);
                    const close = parseFloat(entry["4. close"]);

                    formattedData.push([timestamp, open, high, low, close]);
                }

                // Sort the data by timestamp in ascending order
                formattedData.sort((a, b) => a[0] - b[0]);

                // Create the Highcharts chart
                const chart = document.getElementById("chart-container");
                Highcharts.stockChart(chart, {
                    rangeSelector: {
                        selected: 1
                    },
                    chart: {
                        backgroundColor: 'transparent',
                    },
                    title: {
                        text: stockSymbol
                    },
                    xAxis: {
                        type: 'datetime'
                    },
                    yAxis: {
                        title: {
                            text: 'Price'
                        }
                    },
                    plotOptions: {
                        candlestick: {
                            color: 'red',
                            upColor: 'blue',
                            lineColor: 'red',
                            upLineColor: 'green'
                        }
                    },
                    series: [{
                        type: 'candlestick',
                        name: 'Stock Price',
                        data: formattedData,
                    }]
                });
            },

            error: function () {
                console.log("Error fetching data for stock symbol:", stockSymbol);
            }
        });
    });
});
