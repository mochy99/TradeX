let timeSeriesDay = [];
let timeSeriesIntaDay = [];
let timeSeriesDaily = [];
let timeSeriesFull = [];
let timeSeriesMonth = [];
let timeSeriesYear = [];
const formattedDateData = [];
let updatedPrice;
let sellState = false;
$(document).ready(function() {
    const symbol = $('#symbol').text();
    const balance = parseFloat($('#currentBalance').text());
    const limit = parseFloat($('#limit').text());
    const quantity = $('#quantity');
    const money = $('#money');
    const errorMoney = $('.errorMoney');
    const errorQuantity = $('.errorQuantity');
    const price = parseFloat($("#price").text().replace("$",""));
    const submit = $('#submit');
    const cancel = $('#cancel');
    const hundredBtn = $('#100');
    const fiveHundredBtn = $('#500');
    const thousandBtn = $('#1000');
    const twoThousandBtn = $('#2000');
    const fiveThousandBtn = $('#5000');
    
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
        if (money.val() && isFloat(money.val()) &&  money.val() <= balance ) {
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
        console.log(moneyVal);
        console.log(totalQuantity);
        console.log(balance);
        console.log(sellState);
        if ($(this).val() && isFloat($(this).val()) ) { 
            if (sellState) {
                if ($(this).val() <= totalQuantity) {
                    errorQuantity.text("");
                    submit.removeClass('pending');
                } else {
                    money.val("");
                    errorQuantity.text("Please input valid quantity");
                     submit.addClass('pending');
                }
            } else {
                if (moneyVal <= balance) {
                    errorQuantity.text("");
                    submit.removeClass('pending');
                } else {
                    money.val("");
                    errorQuantity.text("Please input valid quantity");
                     submit.addClass('pending');
                }
                money.val(moneyVal.toFixed(2) > 0 ? moneyVal.toFixed(2) : "");
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
        && ((!sellState && (money.val()) && (quantity.val()))
        || (sellState && quantity.val()))) {    
            let state = !sellState ? 'buy' : 'sell'; 
            dataInf = [state, parseFloat(quantity.val()), updatedPrice, symbol, parseFloat(quantity.val() * updatedPrice)];
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
        window.location.href = '../main/main.php';
    })

    // Function interval of time series
    $(document.body).on('click', '#day, #month, #year, #full', function() {
        $(this).addClass("clicked").removeClass('unclicked');
        let id = $(this).attr('id');
        let btn = 'button.time:not(#' + id + ')';
        $(btn).addClass("unclicked").removeClass('clicked');
        
    })

    $('#month').on('click', function() {    
        if (timeSeriesMonth) {
            requestDailyTimeSeries("Monthly Time Series",timeSeriesMonth);            
        } else {
            timeSeriesChart("Monthly Time Series",timeSeriesMonth);
        }
        
        console.log(timeSeriesMonth);        
    })
    $('#year').on('click', function() {
        if (timeSeriesYear) {
            requestDailyTimeSeries("Yearly Time Series",timeSeriesYear);            
        } else {
            timeSeriesChart("Yearly Time Series",timeSeriesYear);
        }
        
    })
    $('#full').on('click', function() {
        if (timeSeriesFull) {
            requestDailyTimeSeries("Time Series",timeSeriesFull);            
        } else {
            timeSeriesChart("Time Series",timeSeriesFull);
        }
    })

    const url = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" + symbol +"&interval=5min&apikey=Y8XIWI0EEDT64QKU";
    //const url = '../data/intraday_test.json'; //for testing
    $.ajax({
        type: "GET",
        url: url,
        dataType: "json", 
        success: function (data) {
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
            
        },
        error: function () {
            $("#graph").text("We could not load the graph at this time. Check back soon.");
        }
    });
    
    function requestDailyTimeSeries(title,dataBase) {
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
                timeSeriesChart(title,dataBase);          
            },
            error: function () {
                $("#graph").text("We could not load the graph at this time. Check back soon.");
            }
        });
    }
    
})