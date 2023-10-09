$(document).ready(function() {
    let totalQuantity = 0;
    let totalValue = 0;
    let totalCurrentValue = 0;
    let percentChange;
    let timeSeriesIntaDay = [];
    let timeSeriesDaily = [];
    let timeSeriesFull = [];
    let timeSeriesMonth = [];
    let timeSeriesYear = [];
    let historyTransactions = [];
    const formattedDateData = [];
    let updatedPrice;
    let sellState = false;
    const symbol = $('#symbol').text();
    const balance = parseFloat($('#currentBalance').text());
    const quantity = $('#quantity');
    const money = $('#money');
    const errorMoney = $('.errorMoney');
    const errorQuantity = $('.errorQuantity');
    const submit = $('#submit');
    const cancel = $('#cancel');
    const hundredBtn = $('#100');
    const fiveHundredBtn = $('#500');
    const thousandBtn = $('#1000');
    const twoThousandBtn = $('#2000');
    const fiveThousandBtn = $('#5000');
    const keyName = "Full" + symbol;
    const today = new Date().getDate();

    // Fetch user inf and history transactions
    $.ajax({
        type: "GET",
        url: "../server/userInf++.php",
        dataType: "json",
        success: function(response) {
            userInf = response[0];
            userTransactions = response[1];
            fetchDaily();
        },
        error: function(err) {
            console.log(err);
        }
    })

    // Fetch database for intraday
    function fetchDaily() {
        const oneHourInMilliseconds = 1000 * 60;
        const currentTime = new Date().getTime();
    
        if (!localStorage.getItem(symbol) || currentTime - JSON.parse(localStorage.getItem(symbol)).timestamp > oneHourInMilliseconds) {
            const url = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" + symbol + "&interval=5min&apikey=Y8XIWI0EEDT64QKU";

            $.ajax({
                type: "GET",
                url: url,
                dataType: "json",
                success: function (data) {
                    const newData = { source: data, timestamp: currentTime };
                    localStorage.setItem(symbol, JSON.stringify(newData));
                    formatDaily(data);
                    history(userTransactions);
                    attachEventHandlers();
                    displayQuantity(totalQuantity);
                },
                error: function () {
                    $("#graph").text("We could not load the graph at this time. Check back soon.");
                }
            });
        } else {
            const storedData = JSON.parse(localStorage.getItem(symbol)).source;
            formatDaily(storedData);
            history(userTransactions);
            attachEventHandlers();
            displayQuantity(totalQuantity);
        }

        function attachEventHandlers() {
            // Handle event when clicking the "buy" button
            $('#add').click(function () {
                $('.main').addClass('blur');
                $('#buy').removeClass('hidden');
            });
        
            // Handle event when clicking the "sell" button
            $('#sell').click(function () {
                $('.main').addClass('blur');
                $('#buy').removeClass('hidden');
                sellState = true;
                $('#available').addClass('hidden');
                $('#available-sell').removeClass('hidden');
                $('#submit').text('Sell');
            });
        }
        
        function displayQuantity(quantity) {
            $('.quantity').text('Quantity: ' + quantity);
        }
    }

    // Format data Daily 
    function formatDaily (data) {
        timeSeriesIntaDay= data["Time Series (5min)"];
        let lastTime = new Date().getDay();
        for (const date in timeSeriesIntaDay) {
            const entry = timeSeriesIntaDay[date];
            const day = new Date(date).getDate();
            if ((lastTime - day) < 1) {
                const timestamp = new Date(date).getTime();
                const open = parseFloat(entry["1. open"]);
                const high = parseFloat(entry["2. high"]);
                const low = parseFloat(entry["3. low"]);
                const close = parseFloat(entry["4. close"]);
                const volume = parseFloat(entry["5. volume"]);

                formattedDateData.push([timestamp, open, high, low, close, volume]);
            }    
        }
        formattedDateData.sort((a, b) => a[0] - b[0]);
        updatedPrice =formattedDateData[formattedDateData.length -1][2];
        timeSeriesChart("Time Series",formattedDateData);
    }

    // Display history transaction
    function history(data) {
        let html = "";

        for (const transaction of data) {
            if (transaction && transaction['symbol'] == symbol) {
                const date = transaction['transactionDate'];
                const quantity = parseFloat(transaction['quantity']) * -1;
                const price = parseFloat(transaction['price']);
                const id = transaction['transactionID'];
                const value = transaction['value'];

                totalQuantity += quantity;
                totalValue += quantity * price;
                historyTransactions.push([id, date, quantity, price, value]);
                let content;
                let color;
                content = (quantity < 0) ? 'Sell':'Buy';
                color = (quantity < 0) ? 'neg':'pos';
                html += '<div class="container">'
                    + '<h1>' + content + '</h1>'
                    + '<h3>' + date + '</h3>'
                    + '<div class="box">' 
                    + '<div class="' + color + ' value">' + price + '</div>'
                    + '<div class="' + color + '">'  + quantity + '</div>'
                    + '</div>'
                    + '</div>';
            }
        }

        totalQuantity = totalQuantity;
        totalValue = Math.round(totalValue * 100) / 100;
        totalCurrentValue = totalQuantity * updatedPrice;
        percentChange = Math.round(totalCurrentValue / totalValue * 10000) / 100;

        $('.asset').text("Total value " + totalCurrentValue + ' (' + percentChange + '%)');
        $('#history').html(html);

    }
    // Handle event when clicking back btn
    $('#back').click(function() {
        window.location.href = "../main/market.php";
    })
    
    
    // Change css class of box money
    $('#money').parent().removeClass('container');
    // Handle the amount money button.
    hundredBtn.click(function(){
        money.val(hundredBtn.val());
        calQuantity();
        errorMoney.text('');
    })
    fiveHundredBtn.click(function(){
        money.val(fiveHundredBtn.val());
        calQuantity();
        errorMoney.text('');
    })
    thousandBtn.click(function(){
        money.val(thousandBtn.val());
        calQuantity();
        errorMoney.text('');
    })
    twoThousandBtn.click(function(){
        money.val(twoThousandBtn.val());
        calQuantity();
        errorMoney.text('');
    })
    fiveThousandBtn.click(function(){
        money.val(fiveThousandBtn.val());
        calQuantity();
        errorMoney.text('');
    })
    

    // Handle blur in money input
    money.on('keyup', function() {
        errorMoney.text("");
        if (money.val() && isFloat(money.val()) &&  ((sellState && money.val() <= balance) || (money.val() <= totalValue)) ) {
            calQuantity();
        } else {
            quantity.val('');
            errorMoney.text("Please input valid amount of money");
            submit.addClass('pending');
        }
    });

    // Calculate the quantity corresponding to the money input.
    function calQuantity() {
        let quantityVal = money.val() / updatedPrice;
            quantity.val(quantityVal.toFixed(2) > 0 ? quantityVal.toFixed(2) : "");
            errorMoney.text("");
            submit.removeClass('pending');
    }
    
    // Handle blur in quantity input
    quantity.on('keyup', function() {
        console.log('hi');
        errorQuantity.text("");
        let moneyVal = $(this).val() * updatedPrice;

        if ($(this).val() && isFloat($(this).val()) ) { 
            if ((sellState && $(this).val() <= totalQuantity) || moneyVal <= balance) {
                errorQuantity.text("");
                submit.removeClass('pending');
            } else {
                money.val("");
                errorQuantity.text("Please input valid quantity");
                    submit.addClass('pending');
            }   
        } else {
            money.val("");
            errorQuantity.text("Please input valid quantity");
            submit.addClass('pending');
        }
    });

    // Check validation of inputs
    submit.on('click', function() {
        if(!isNaN(money.val()) && !isNaN(quantity.val())
        && ((!sellState && (money.val() <= balance) && quantity.val())
        || (sellState && quantity.val() && quantity.val() <= totalQuantity))) {    
            let state = !sellState ? 'buy' : 'sell'; 
            dataInf = [state, parseFloat(quantity.val()), updatedPrice, symbol, money.val()];
            console.log(dataInf);
            //Send and update data by ajax
            $.ajax({
                url: '../server/processPayment.php',
                type: 'POST',
                data: { inf: dataInf },
                success: function (response) {   
                    inf = response.split(",");
                    description = !sellState
                                ? "You purchased successfully " + quantity.val() + " " + symbol
                                : "You sold successfully " + quantity.val() + " " + symbol;
                    sellState = false;
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
            if (!sellState && (money.val() > balance)) {
                console.log("Exceed the balance!");
                errorMoney.text("Exceed the balance!");
            } else if (sellState && quantity.val > totalQuantity) {
                errorQuantity.text("Exceed the current quantity");
                console.log("Exceed the current!");
            } else {
                checkBlank(money,errorMoney);
                checkBlank(quantity, errorQuantity);
            }
        }
        
    })
    
    // Function cancel btn
    cancel.on('click', function() {
        $('.main').removeClass('blur');
        $('#buy').addClass('hidden');
        money.val("");
        quantity.val("");
        errorMoney.text("");
        errorQuantity.text("");
    })
    // Function close btn
    $('.close').click(function() {
        window.location.href = '../main/main.php';
    })

    // Function interval of time series
    $(document.body).on('click', '#day, #month, #year, #full', function() {
        $(this).addClass("clicked").removeClass('unclicked');
        let id = $(this).attr('id');
        let btn = 'button.time:not(#' + id + ')';
        $(btn).addClass("unclicked").removeClass('clicked');
        
    })

    $('#day').on('click', function() {    
        timeSeriesChart("Time Series",formattedDateData);  
    })
    $('#month').on('click', function() {    
        if (localStorage.getItem(keyName) && JSON.parse(localStorage.getItem(keyName)).date != today ) {
            requestDailyTimeSeries("Monthly Time Series",timeSeriesMonth);            
        } else {
            timeSeriesChart("Monthly Time Series",JSON.parse(localStorage.getItem(keyName)).month);
        }    
    })
    $('#year').on('click', function() {
        if (localStorage.getItem(keyName) && JSON.parse(localStorage.getItem(keyName)).date != today) {
            requestDailyTimeSeries("Yearly Time Series",timeSeriesYear);            
        } else {
            timeSeriesChart("Yearly Time Series",JSON.parse(localStorage.getItem(keyName)).year);
        }   
    })
    $('#full').on('click', function() {
        if (localStorage.getItem(keyName) && JSON.parse(localStorage.getItem(keyName)).date != today) {
            requestDailyTimeSeries("Time Series",timeSeriesFull);            
        } else {
            timeSeriesChart("Time Series",JSON.parse(localStorage.getItem(keyName)).full);
        }
    })

    
    
    function requestDailyTimeSeries(title,dataBase) {
        console.log(localStorage.getItem(keyName));
        
        const link = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + symbol + "&outputsize=full&apikey=Y8XIWI0EEDT64QKU";
        $.ajax({
            type: "GET",
            url: link,
            dataType: "json", 
            success: function (data) {
                timeSeriesDaily = data["Time Series (Daily)"];
                const currentMonth = new Date().getMonth();
                const currentYear = new Date().getFullYear();
                for (const date in timeSeriesDaily) {
                    const entry = timeSeriesDaily[date];
                    const time = date.split("-");
                    const month = parseInt(time[1]);
                    const yearVal = parseInt(time[0]);
    
                    const timestamp = new Date(date).getTime();
                    const open = parseFloat(entry["1. open"]);
                    const high = parseFloat(entry["2. high"]);
                    const low = parseFloat(entry["3. low"]);
                    const close = parseFloat(entry["4. close"]);
                    const volume = parseFloat(entry["5. volume"]);
                    if ((currentMonth ==  month) && (currentYear == yearVal)) {
                        timeSeriesMonth.push([timestamp, open, high, low, close, volume]);
                        timeSeriesYear.push([timestamp, open, high, low, close, volume]);
                        timeSeriesFull.push([timestamp, open, high, low, close, volume]);
                    } else if (currentYear == yearVal) {
                        timeSeriesYear.push([timestamp, open, high, low, close, volume]);
                        timeSeriesFull.push([timestamp, open, high, low, close, volume]);
                    } else {
                        timeSeriesFull.push([timestamp, open, high, low, close, volume]);
                    }               
                }
                timeSeriesMonth.sort((a, b) => a[0] - b[0]);
                timeSeriesYear.sort((a, b) => a[0] - b[0]);
                timeSeriesFull.sort((a, b) => a[0] - b[0]); 
                localStorage.setItem(keyName, JSON.stringify({month: timeSeriesMonth, year: timeSeriesYear, full: timeSeriesFull, date: today}))
                console.log(localStorage.getItem(keyName));
                timeSeriesChart(title,dataBase);          
            },
            error: function () {
                $("#graph").text("We could not load the graph at this time. Check back soon.");
            }
        });
        
       
    }

    
    $('#backMain').on('click', function() {
        window.location.href = "../main/main.php";
    })

    
   
    
})
