var customer = require('../Model/customer');
var crypto = require('crypto-js');

// var multer=require('multer');

// var upload=multer({dest:'uploads/'});

// var type=upload.single('upfile');

// var fs=require('fs');

exports.createCustomer=function(type,req,res){

	var entry = new customer(
		{
			Name:req.body.name,
			Email:req.body.email,
			Phone:req.body.phone,
			// Address:req.body.address
			Password:crypto.AES.encrypt(req.body.password,'osama'),

		}
	);

	entry.save();

	res.redirect('./');
}

exports.newCustomer=function(req,res){


	res.render('newcustomer',{title:'New Customer'});
}