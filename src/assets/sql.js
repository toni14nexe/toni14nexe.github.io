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

    UpdateOrderCode(){
        return SQLlink + 'updateOrderCode.php'
    },

    RemoveOrderCodes(){
        return SQLlink + 'removeOrderCodes.php'
    },

    PlaceOrder(){
        return SQLlink + 'placeOrder.php'
    },

    FinishOrder(){
        return SQLlink + 'finishOrder.php'
    },

    WaiterFinish(){
        return SQLlink + 'waiterFinish.php'
    },

    WaiterCancel(){
        return SQLlink + 'waiterCancel.php'
    },

    ChefFinish(){
        return SQLlink + 'chefFinish.php'
    },

    ChefCancel(){
        return SQLlink + 'chefCancel.php'
    },

    PaidOrder(){
        return SQLlink + 'paidOrder.php'
    },

    ResetAdminPassword(){
        return SQLlink + 'resetAdminPassword.php'
    },

    AddEmployee(){
        return SQLlink + 'addEmployee.php'
    },

    DeleteEmployee(){
        return SQLlink + 'deleteEmployee.php'
    }
}