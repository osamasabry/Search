var mongoose=require('mongoose');

var schema =mongoose.Schema;

var customerSchema=new schema({

	Name:String,
	Email:String,
	Phone:String,
	Password:String,

	date:{type:Date,default:Date.now}

});

module.exports=mongoose.model('customer',customerSchema);