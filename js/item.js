
$(document).ready(function() {
    let timeSeriesDaily = [];
    let timeSeriesFull = [];
    let timeSeriesMonth = [];
    let timeSeriesYear = [];
    let formattedDateData = [];
    let updatedPrice;
    const symbol = $('#symbol').text();
    const balance = parseFloat($('#currentBalance').text());
    const quantity = $('#quantity');
    const money = $('#money');
    const errorMoney = $('.error-money');
    const errorQuantity = $('.errorQuantity');
    const submit = $('#submit');
    const cancel = $('#cancel');
    const keyName = "Full" + symbol;
    const today = new Date().getTime();
    const oneHourInMilliseconds = 1000 * 60;
    
    // Handle event when clicking back btn
    $('#back').click(function() {
        window.location.href = "../main/market.php";
    })
    
    // Handle event when click buy btn
    $('#add').click(function() {    
        $('.main').addClass('blur');
        $('#buy').removeClass('hidden');
    })
    // Change css class of box money
    $('#money').parent().removeClass('container');
    // Handle the amount money button.
    $('.select-money').on('click', function() {
        let value = parseFloat($(this).attr('value'));
        if (value <= balance) {
            money.val(value);
            calQuantity();
            
            submit.removeClass('pending');
            errorMoney.text("");
            errorQuantity.text("");
        } else {
            money.val('');
            quantity.val('');
            errorMoney.text("Invalid amount of money");
            submit.addClass('pending');
            console.log('false')
        } 
    })
    

     // Handle blur in money input
     money.on('keyup', function() {
        errorMoney.text("");
        if (money.val() && isFloat(money.val()) &&   money.val() <= balance) {
            calQuantity();
        } else {
            quantity.val('');
            errorMoney.text("Invalid amount of money");
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
        let moneyVal = Math.round($(this).val() * updatedPrice * 100) / 100;
        console.log(moneyVal)
        if ($(this).val() && isFloat($(this).val()) && moneyVal <= balance) { 
            money.val(moneyVal);
            errorQuantity.text("");
            submit.removeClass('pending');
        
        } else {
            money.val("");
            errorQuantity.text("Invalid quantity");
            submit.addClass('pending');
        }
    });

    // Check validation of inputs
    submit.on('click', function() {
        if(!isNaN(money.val()) && !isNaN(quantity.val())
        && (money.val() && quantity.val())) {    
            let state =  'buy'; 
            dataInf = [state, parseFloat(quantity.val()), updatedPrice, symbol, parseFloat(money.val())];
            console.log(dataInf);
            //Send and update data by ajax
            $.ajax({
                url: '../server/processPayment.php',
                type: 'POST',
                data: { inf: dataInf },
                success: function (response) {   
                    inf = response.split(",");
                    description = "You purchased successfully " + quantity.val() + " " + symbol;
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
            if (money.val() > balance) {
                errorMoney.text("Exceed the balance!");
            }  else {
                checkBlank(money,errorMoney);
                checkBlank(quantity, errorQuantity);
            }
        }
        
    })
    
    // Function cancel btn
    cancel.on('click', function() {
        $('.main').removeClass('blur');
        $('#buy').addClass('hidden');
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
        timeSeriesChart("Time Series",JSON.parse(localStorage.getItem(symbol)).source);  
    })
    $('#month').on('click', function() {    
        if (!localStorage.getItem(keyName) || today - JSON.parse(localStorage.getItem(keyName)).date > 1000*60*12) {
            requestDailyTimeSeries("Monthly Time Series",timeSeriesMonth); 
            console.log('first');           
        } else {
            timeSeriesChart("Monthly Time Series",JSON.parse(localStorage.getItem(keyName)).month);
            console.log('local');
        }    
    })
    $('#year').on('click', function() {
        if (!localStorage.getItem(keyName) ||  today - JSON.parse(localStorage.getItem(keyName)).date > 1000*60*12) {
            requestDailyTimeSeries("Yearly Time Series",timeSeriesYear);            
        } else {
            timeSeriesChart("Yearly Time Series",JSON.parse(localStorage.getItem(keyName)).year);
        }   
    })
    $('#full').on('click', function() {
        if (!localStorage.getItem(keyName) ||  today - JSON.parse(localStorage.getItem(keyName)).date > 1000*60*12) {
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
                
                timeSeriesChart(title,dataBase);          
            },
            error: function () {
                $("#graph").text("We could not load the graph at this time. Check back soon.");
            }
        });
      
    }
    
    
    if (!localStorage.getItem(symbol) || today - JSON.parse(localStorage.getItem(symbol)).date > oneHourInMilliseconds) {
        const url = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" + symbol +"&interval=5min&apikey=Y8XIWI0EEDT64QKU";
        console.log("first");
        $.ajax({
            type: "GET",
            url: url,
            dataType: "json", 
            success: function (data) {
                formattedDateData = formatDaily(data);
                localStorage.setItem(symbol, JSON.stringify({source: formattedDateData, date: today}))
                updatedPrice =formattedDateData[formattedDateData.length -1][2];
                timeSeriesChart("Time Series",formattedDateData);
                
            },
            error: function () {
                $("#graph").text("We could not load the graph at this time. Check back soon.");
            }
        });
    } else {
        console.log('local');
        console.log(JSON.parse(localStorage.getItem(symbol)));
        let storedData = JSON.parse(localStorage.getItem(symbol)).source;
        updatedPrice =storedData[storedData.length -1][2];
        timeSeriesChart("Time Series",storedData);
    }
})