$(document).ready(function() {
    const old = $('#oldPass');
    const newPass = $('#newPass');
    const confirmPass = $('#confirmPass');
    const showOld = $('#showOld');
    const showNew = $('#showNew');
    const length = $('#length');
    const upperCase = $('#uppercase');
    const lowerCase = $('#lowercase');
    const digit = $('#digit');
    const special = $('#special');
    const errorOld = $('.errorMsg-old');
    const errorNew = $('.errorMsg-new');
    const errorConfirm = $('.errorMsg-confirm');
    const submit = $('#submit');
    let isValidated = false;
    
    // When clicking the exit button
    $('#exit').click(function() {
        window.location.href = '../main/setting.php';
    });

    // Function to show/hide the current password on button click.
    showOld.on('click', function() {
        old.attr('type', showOld.prop('checked') ? 'text' : 'password');
    });

    // Function to show/hide the new password on button click.
    showNew.on('click', function() {
        const newPasswordType = showNew.prop('checked') ? 'text' : 'password';
        newPass.attr('type', newPasswordType);
        confirmPass.attr('type', newPasswordType);
    });

    // Event handler for old password blur: Validates input string, updates error message.
    old.on('focusout', function() {
        $('h1').text('Change Password');
        $.ajax({
            url: '../server/validatePass.php',
            type: 'POST',
            data: { data: old.val() },
            success: function(response) {
                console.log(response);
            if (response.trim() === '1') {
                errorOld.text("");
                newPass.prop('disabled', false);
                confirmPass.prop('disabled', false);
            } else {
                errorOld.text("*Incorrect password");
                newPass.prop('disabled', true);
                confirmPass.prop('disabled', true);
            }
        },
        error: function(err) {
            console.log(err);
        }
        });
    });

    // Event handler for new password blur: Validates input string against conditions.
    newPass.on('keyup', function() {
        errorNew.text("");
        isValidated = validateCond(newPass.val());
    });

    // Event handler for confirm password blur: Compares passwords, updates submit button color, and securely updates the database.
    confirmPass.on('keyup', function() {
        errorConfirm.text("");
        if (newPass.val() === confirmPass.val() && isValidated && newPass.val() !== old.val()) {
            submit.removeClass('pending').addClass('not-pending');
        }
    });

    // Update the new password into the database when clicking the submit button
    submit.on('click', function() {
        errorNew.text("");
        errorConfirm.text("");
        if (newPass.val() === confirmPass.val() && isValidated && newPass.val() !== old.val()) {
            $.ajax({
                url: '../server/updatePassword.php',
                type: 'POST',
                data: { password: newPass.val(), login : "none" },
                success: function(response) {
                    console.log(response);
                    $('h1').text(response);
                    old.val('');
                    newPass.val('');
                    confirmPass.val('');
                    submit.removeClass('pending').addClass('not-pending');
                },
                error: function(err) {
                    console.error(err);
                }
            });
        } else if (!old.val()) {
            errorOld.text("Please enter your current password");
        } else if (newPass.val() === old.val()) {
            errorNew.text("*Please select a different one from the current password.");
            submit.removeClass('not-pending').addClass('pending');
        } else if (newPass.val() !== confirmPass.val()) {
            errorConfirm.text("*Passwords do not match");
            submit.removeClass('not-pending').addClass('pending');
        } else {
            submit.removeClass('not-pending').addClass('pending');
        }
    });


    /*------------------HELPER----------------*/
    function validateCond(value) {
    
        let isEnoughLength = value.length >= 8;
        let isUpperCase = included(value, regExpUpper, upperCase);
        let isLowerCase = included(value, regExpLower, lowerCase);
        let isDigit = included(value, regExpDigit, digit);
        let isSpecial = included(value, regExpSpecial, special);
        if (isEnoughLength){
            length.removeClass('not-contained').addClass('valid');
        } else {
           length.removeClass('valid').addClass('not-contained');
        }
        if (isEnoughLength && isUpperCase && isLowerCase && isDigit && isSpecial) {
            return true;
        } else {
            return false;
        }
        
    }
    
    function included(str, regExp, target) {
        if (str.match(regExp)) {
            target.removeClass('not-contained').addClass('valid');
            return true;
        } else {
            target.removeClass('valid').addClass('not-contained');
            return false;
        }
    }

});


