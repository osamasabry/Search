var Account = require('../Model/account_user');
var crypto = require('crypto-js');

// var nextCode = 0;


// // exports.login=function(req,res){

// // 	var Name = req.body.name;
// // 	var algorithm = 'aes-256-ctr';
// // 	// var pass = req.body.password;
// // 	// var bytes  = crypto.AES.decrypt(pass.toString(), 'ali');
// // 	// var plaintext = bytes.toString(crypto.enc.Utf8);
 
// // 	// console.log(pass);
// // 	// console.log(plaintext);
// // 	// console.log(Name);

// // 	var Password = crypto.AES.decrypt(algorithm,req.body.password);

// // 	console.log(Password);


// // 	// Account.findOne({AccountUser_UserName:Name},function(err,account){
// // 	// 	if (err) {
// // 	// 		return res.status(500).send();
// // 	// 	}
// // 	// 	if (!account) {
// // 	// 		return res.status(404).send();
// // 	// 	}

// // 	// 	var bytes  = crypto.AES.decrypt(account.Password.toString(), 'ali');
// // 	// 	var plaintext = bytes.toString(crypto.enc.Utf8);
// // 	// 	if(pass == plaintext){
// // 	// 		console.log(plaintext);
// // 	// 		res.redirect('./home');
// // 	// 		return res.status(200).send(account);	
// // 	// 	}else{
// // 	// 		return res.status(404).send();
			
// // 	// 	}

// // 	// })
// // }


