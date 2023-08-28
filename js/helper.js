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
            backgroundColor: "rgba(45, 85, 139, 0.5)"
        },
        title: {
            text: title,
            align: 'center',
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            title: {
                text: 'Price'
            }, 
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
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
                series: {
                    color: '#FFFFFF' // Set your desired color here
                },
                threshold: null
            }
        },
        series: [{
            name: 'Stock Price',
            data: data,
            tooltip: {
                valueDecimals: 2,
                backgroundColor: '#FCFFC5',
                borderColor: 'black',
                borderRadius: 10,
                borderWidth: 3
            }
        }],    
    });
    Highcharts.theme = {
        colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572',
                 '#FF9655', '#FFF263', '#6AF9C4'],
        chart: {
            backgroundColor: {
                linearGradient: [0, 0, 500, 500],
                stops: [
                    [0, 'rgb(255, 255, 255)'],
                    [1, 'rgb(240, 240, 255)']
                ]
            },
        },
        title: {
            style: {
                color: '#000',
                font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
            }
        },
        subtitle: {
            style: {
                color: '#666666',
                font: 'bold 12px "Trebuchet MS", Verdana, sans-serif'
            }
        },
        legend: {
            itemStyle: {
                font: '9pt Trebuchet MS, Verdana, sans-serif',
                color: 'black'
            },
            itemHoverStyle:{
                color: 'gray'
            }
        }
    };
    // Apply the theme
    Highcharts.setOptions(Highcharts.theme);
}
