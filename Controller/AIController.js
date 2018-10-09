var AI = require('../Model/AI');
var crypto = require('crypto-js');

var DataAI=[];
// var nextCode = 0;
 module.exports={
	 SearchAi:function(req,res){
	 	var Searchquery = req.body.search;
	 	console.log(Searchquery);
		AI.find({AI_Name:{ $regex: new RegExp("^" + Searchquery.toLowerCase(), "i") }})
			.select('AI_Code AI_Name')
			.exec(function(err, ai) {
			if (err){
	    		return res.send({
					message: err
				});
	    	}

	    	if (ai.length == 0) {
				return res.send({
					message: 'No ai Found !!'
				});
	    	} else {
	    		for (var i = 0; i < ai.length; i++) {
	    			DataAI.push({
					    key: ai[i].AI_Code,
					    value: ai[i].AI_Name
					});
	    		}
				return  res.json(DataAI);
				
			}
		})
	 }
}

// function SearchAi (req){

// 	console.log("oooo");

// }