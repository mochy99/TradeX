const regExpUpper = /[A-Z]/g;
const regExpLower = /[a-z]/g;
const regExpChar = /[a-zA-Z ]+/g;
const regExpEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const regExpDigit = /[0-9]/g;
const regExpSpecial =/[^a-zA-Z0-9 ]+/g;
const regExpDate = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;


// Check validation of the input type number
// String -> Boolean
// Return true i if it is interger
function isInteger(number) {
    return Boolean(Number.isInteger(parseInt(number)) && number.length < 12) ;
}

// Check validation of the input type number
// String -> Boolean
// Return true i if it is float
function isFloat(number) {
    return Boolean(!Number.isNaN(parseFloat(number)) && number.length < 12) ;
}

// Check validation of string value
// String -> Boolean
// Return true if it is valid (not include digit or special characters)
function validatedName(name) {
    if (name && (name.match(regExpDigit) || name.match(regExpSpecial))) {
        return false;
    } else {
        return true;
    }
}

// Check validation of the date value
// Date -> Boolean
// Return true if it is valid
function validatedDate(date) {
    if (date && date.match(regExpDate) || !date || date === "0000-00-00") {
        return true;
    } else {
        return false;
    }
}


// Capitalize the first letter
// Input -> Capitalize the first letter of each word 
function capitalize(name) {
    let value = name.val().toLowerCase();
    let length = name.val().length;
    for (let i =0; i < length; i++) {
        if (i===0) {
            value = value.slice(0,1).toUpperCase() + value.slice(1);
        }
        if (value[i] === " " && value[i+1] !== " ") {
            value = value.slice(0, i+1) 
                    + value.slice(i+1,i+2).toUpperCase() 
                    + value.slice(i+2);
        }
    }
    name.val(value);
}

// Check blank field
function checkBlank(field, errorMsg) {
    if (!field.val()) {
        errorMsg.text('*Required');
    } else {
        errorMsg.text() === '*Required' ? errorMsg.text('') : null;   
    }
}

// Create the Highcharts chart
function timeSeriesChart(title,data) {

    Highcharts.chart("graph", {
        chart: {
            zoomType: 'x',
            backgroundColor: "transparent"
        },
        title: {
            text: title,
            align: 'center',
            style: {
                color: "white"
            }
        },
        legend: {
            itemStyle: {
                color: '#ffffff'
            }
        },
        xAxis: {
            type: 'datetime',
            gridLineWidth: 0, 
            labels: {
                style: {
                    color: 'white' 
                }
            }
        },

        yAxis: {
            title: {
                text: 'Price', 
                style: {
                    color: 'white' 
                }
            }, 
            gridLineWidth: 0, 
            lineColor: {
                linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                stops: [
                    [0, 'white'], // Start color
                    [1, 'blue']   // End color
                ]
            },
            labels: {
                style: {
                    color: 'white' 
                }
            },

        },
        plotOptions: {
            area: {
                fillColor: {
                    color: "white"
                },
                marker: {
                    radius: 2
                },
                lineWidth: 3,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
        },
        series: [{
            name: 'Stock Price',
            type : "area",
            color: {
                linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                stops: [
                    [0, 'rgb(220, 79, 248)'], 
                    [1, 'rgb(70, 195, 249)'] 
                ]
            },
            fillColor: {
                linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                stops: [
                    [0, 'rgba(220, 79, 248, 0.0)'], // Start color with opacity
                    [1, 'rgba(70, 195, 249, 0.0)']  // End color with opacity
                ]
            },
            data: data,
            tooltip: {
                valueDecimals: 2,
                backgroundColor: '#FCFFC5',
                borderColor: 'black',
                borderRadius: 10,
                borderWidth: 3
            }
        }], 
        credits: {
            enabled: false 
        },
        exporting: {
            buttons: {
                contextButton: {
                    enabled: false
                }
            } 
        },   
    });
    
}

 // Format data Daily 
 function formatDaily (data) {
    timeSeriesIntaDay= data["Time Series (5min)"];
    let lastTime = new Date().getDay();
    let formattedDateData = [];
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
    return formattedDateData;
    
}