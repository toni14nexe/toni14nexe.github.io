import sqlLink from './sqlLink'
var SQLlink = sqlLink.sqlLink();

export default{
    Main(){
        return SQLlink
    },
    
    SignUp(){
        return SQLlink + 'addUser.php'
    },

    ForgotPassword(){
        return SQLlink + 'resetPassword.php'
    },

    NewPassword(){
        return SQLlink + 'newPassword.php'
    },

    LogIn(){
        return SQLlink + 'logIn.php'
    },

    CheckUser(){
        return SQLlink + 'checkUser.php'
    },

    Search(){
        return SQLlink + 'search.php'
    },

    ChangePassword(){
        return SQLlink + 'changePassword.php'
    },

    ChangeProfileImage(){
        return SQLlink + 'changeProfilImage.php'
    },

    UpdateOrderCode(){
        return SQLlink + 'updateOrderCode.php'
    },

    RemoveOrderCodes(){
        return SQLlink + 'removeOrderCodes.php'
    }
}