export default{
    checkFirstname(firstname){
        if(firstname == null) return 'Empty firstname!'
        else if(firstname.length == 0) return 'Empty firstname!'
        else if(firstname.length < 3) return 'Too short firstname!'
        else if(firstname.length > 30) return 'Too long firstname!'
        else return null
    },

    checkLastname(lastname){
        if(lastname == null) return 'Empty lastname!'
        else if(lastname.length == 0) return 'Empty lastname!'
        else if(lastname.length < 3) return 'Too short lastname!'
        else if(lastname.length > 30) return 'Too long lastname!'
        else return null
    },

    checkEmail(email){
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(email == null) return 'Empty email!'
        if(email.length == 0) return 'Empty email!'
        if(email.length > 100) return 'Too long email!'
        else if(email.match(validRegex)) return null
        else return 'Invalid email!'
    },

    checkPassword(password){
        var message = 'Password missing: '
        if(password == null) return 'Empty password!'
        else if(password.length == 0) return 'Empty password!'
        else if(password.length < 8) return 'Too short password!'
        else if(password.length > 30) return 'Too long password!'
        if(!password.match(/[A-Z]/g)) message += 'capital letter'
        if(!password.match(/[a-z]/g)){
            if(message.length > 18) message += ', '
            message += 'lowercase letter'
        }
        if(!password.match(/[0-9]/g)){
            if(message.length > 18) message += ', '
            message += 'number'
        }
        if(message.length > 18) return message
        return null
    },

    checkPasswordLength(password){
        if(password == null) return 'Empty password!'
        else if(password.length == 0) return 'Empty password!'
        else if(password.length < 8) return 'Too short password!'
    },

    checkPasswordConfirm(password, passwordConfirm){
        if(passwordConfirm == null) return 'Empty field!'
        else if(passwordConfirm.length == 0) return 'Empty field!'
        else if(password != passwordConfirm) return 'Passwords do not match!'
        return null
    },

    checkCode(code){
        if(code == null) return 'Empty field! Verify code has been sent to your email!'
        else if(code.length == 0) return 'Empty field! Verify code has been sent to your email!'
        else if(code.length < 20) return 'Wrong input! Verify code is too short!'
        return null
    }
}