var mongoose = require('mongoose');
// var bcrypt   = require('bcrypt-nodejs');

var rxp_AccountUserSchema = mongoose.Schema({
   
		AccountUser_Code        :Number,
        AccountUser_UserName    :String,
        AccountUser_Password    :String,
		AccountUser_Account_ID  :Number,
});

rxp_AccountUserSchema.methods.verifyPassword = function(password) {
    if(password.localeCompare(this.AccountUser_Password) == 0)
        return 1;
    else
        return 0;
};


module.exports = mongoose.model('rxp_account_user', rxp_AccountUserSchema);
