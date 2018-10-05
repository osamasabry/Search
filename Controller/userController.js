var user = require('../Model/user');
var crypto = require('crypto-js');

var nextCode = 0;
// var multer=require('multer');

// var upload=multer({dest:'uploads/'});

// var type=upload.single('upfile');

// var fs=require('fs');

// exports.createUser=function(req,res,NextID){

// 	var entry = new user (
// 		{
// 			User_Code 		    :NextID ,
// 			User_Name 			:req.body.name,
// 			User_DisplayName 	:req.body.disp_name,
// 			User_Employee_ID 	:req.body.emp_id,
// 			// Address:req.body.address
// 			User_Password:crypto.AES.encrypt(req.body.password,'ali'),
// 		}
// 	);

// 	entry.save();

// 	res.send(true);
// }




// exports.getid=function(req,res){
	
// 	return new Promise((resolve, reject) => {
// 		user.getLastCode(function(err,user){
// 			if (user) 
// 				resolve( Number(user.User_Code)+1);
// 			else
// 				resolve(1);
// 		})
// 	})
// }	

// exports.getusers=function(req,res){

// 	user.find({},function(err,user){

// 		if (err) {

// 			return res.status(500).send();

// 		}

// 		if (!user) {

// 			return res.status(404).send();

// 		}

// 		if (user) {

// 			return res.status(200).send(user);

// 		}
// 	})
// }


exports.login=function(req,res){

	var Name = req.body.name;
	var pass = req.body.password;
	var bytes  = crypto.AES.decrypt(pass.toString(), 'ali');
	var plaintext = bytes.toString(crypto.enc.Utf8);
 
	console.log(pass);
	console.log(plaintext);
	console.log(Name);

	var Password = crypto.AES.decrypt(req.body.password,'ali');

	user.findOne({Name:Name},function(err,user){
		if (err) {
			return res.status(500).send();
		}
		if (!user) {
			return res.status(404).send();
		}

		var bytes  = crypto.AES.decrypt(user.Password.toString(), 'ali');
		var plaintext = bytes.toString(crypto.enc.Utf8);
		if(pass == plaintext){
			console.log(plaintext);
			res.redirect('./home');
			return res.status(200).send(user);	
		}else{
			return res.status(404).send();
			
		}

	})
}


