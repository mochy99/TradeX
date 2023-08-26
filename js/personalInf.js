$(document).ready(function() {
    const userName = $('#userName');
    const fName = $('#firstName');
    const lName = $('#lastName');
    const gender = $('#gender');
    const phone = $('#phoneNumber');
    const dob = $('#dob');
    let editing = false;
 
    // when clicking the edit button
    $('.edit').click(function() {
        if (editing) {
            validate();     
        } else {
            $('h1').text("Personal Information");
            $('select').prop('disabled', false);
            $('input[type!="email"]').prop('disabled', false);
            $('.icon ').text('save');
            editing = true;
        }    
    });

    //when clicking the exit button
    $('#exit').click(function() {
        window.location.href = '../main/setting.php';
    })

    /*----------------HELPERS----------------*/
    function validate() {
        let isValidatedFistName = Boolean(validatedName(fName.val()) || !fName.val());
        let isValidatedLastName = Boolean(validatedName(lName.val()) || !lName.val());
        let isValidatedPhoneNum = Boolean(isInteger(phone.val()) || !phone.val());
        let isValidatedDate = Boolean(validatedDate(dob.val()) || !dob.val());;
        console.log(isValidatedFistName);
        console.log(isValidatedLastName);
        console.log(isValidatedPhoneNum);
        console.log(isValidatedDate);
        if (isValidatedFistName && isValidatedLastName
            && isValidatedPhoneNum && isValidatedDate) {
            // handle html elements
            $('select').prop('disabled', true);
            $('input[type!="email"]').prop('disabled', true);
            $('.icon').text('edit');
            $('.errorMsg-fName').text('');
            $('.errorMsg-lName').text('');
            $('.errorMsg-phone').text('');
            $('.errorMsg-dob').text('');
            editing = false;
    
            // capitalize the fName and lName
            capitalize(fName);
            capitalize(lName);
    
            // format dob if val is null
            formatDate(dob);
    
            // update information into database
            postInf();
        } else{
            eachEle();
        } 
        // function checking each of element
        function eachEle() {
            
            if (!isValidatedFistName) {
                $('.errorMsg-fName').text('*Invalid input');
            } else {
                $('.errorMsg-fName').text('');
            }
            if (!isValidatedLastName) {
                $('.errorMsg-lName').text('*Invalid input');
            }  else {
                $('.errorMsg-lName').text('');
            }
            if (!isValidatedPhoneNum) {
                $('.errorMsg-phone').text('*Invalid input');
            } else {
                $('.errorMsg-phone').text('');
            }
            if(!isValidatedDate) {
                $('.errorMsg-dob').text('*Invalid input');
            } else {
                $('.errorMsg-dob').text('');
            }
        }
    }
    
    // function format the date value
    function formatDate(date) {
        if (!date.val()) {
            date.val('0000-00-00');
        }
    }    
    
    // function to post information 
    function postInf() {
        let dataInf = [];
        dataInf.push($('#firstName').val());
        dataInf.push($('#lastName').val());
        dataInf.push($('#gender').val());
        dataInf.push($('#phoneNumber').val());
        dataInf.push($('#dob').val());
    
        $.ajax({
            url: '../server/updateUserInf.php',
            type: 'POST',
            data: { inf: dataInf },
            success: function (reply) {
                console.log(reply);
               $('h1').text(reply);
            },
            error: function (err) {
                console.error(err);
            }
        });
    }
        
})





