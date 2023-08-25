
$(document).ready(function() {
    $('#back').click(function() {
        window.location.href = "market.php";
        console.log('hi');
    })
    
    const stockSymbol = $('h1').text();
    const url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + stockSymbol + "&outputsize=full&apikey=Y8XIWI0EEDT64QKU";

    $.ajax({
        type: "GET",
        url: url,
        dataType: "json", 
        success: function (data) {
            const timeSeriesDaily = data["Time Series (Daily)"];
            console.log(data);
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
            console.log(formattedData);
            // Create the Highcharts chart
            Highcharts.stockChart("graph", {
                rangeSelector: {
                    selected: 1
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
                
                series: [{
                    type: 'candlestick',
                    name: 'Stock Price',
                    data: formattedData,
                    tooltip: {
                        valueDecimals: 2
                      }
                }]
            });
        },

        error: function () {
            $("#graph").text("We could not load the graph at this time. Check back soon.");
        }
    });
    
})