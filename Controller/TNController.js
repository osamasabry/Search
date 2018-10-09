var TN = require('../Model/TN');
// var crypto = require('crypto-js');
var DataTN=[];

 exports.SearchTN=function(req,res){
 	var Searchquery = req.body.search;
	TN.find({TN_Name:{ $regex: new RegExp("^" + Searchquery.toLowerCase(), "i") }})
		.select('TN_Code TN_Name')
		.exec(function(err, tn) {
		if (err){
    		return res.send({
				message: err
			});
    	}

    	if (tn.length == 0) {
			return res.send({
				message: 'No tn Found !!'
			});
    	} else {
			for (var i = 0; i < tn.length; i++) {
    			DataTN.push({
				    key: tn[i].TN_Code,
				    value: tn[i].TN_Name
				});
    		}
			return res.DataTN

		}
	})
 }


