var AI = require('../Model/AI');
var TN = require('../Model/TN');

var Data=[];

module.exports = {
	 SearchByName:function(req,res){
	 	var Searchquery = req.body.search;

		AI.find({AI_Name:{ $regex: new RegExp("^" + Searchquery.toLowerCase(), "i") }})
			.select('AI_Code AI_Name')
			.exec(function(err, ai) {
			if (err){
	    		return res.send({
					message: err
				});
	    	} else {
	    		for (var i = 0; i < ai.length; i++) {
	    			Data.push({
					    key: ai[i].AI_Code,
					    value: ai[i].AI_Name,
					    type:'AI'
					});
	    		}
				findTN();
			}
		})
		function findTN(){
			TN.find({TN_Name:{ $regex: new RegExp("^" + Searchquery.toLowerCase(), "i") }})
				.select('TN_Code TN_Name TN_ActiveIngredients')
				.exec(function(err, tn) {

				if (err){
	    			return res.send({
					message: err
					});
		    	} else {
		    		console.log(tn)
		    		for (var i = 0; i < tn.length; i++) {
		    			Data.push({
						    key: tn[i].TN_Code,
						    value: tn[i].TN_Name,
						    type:'TN',
						    ai: tn[i].TN_ActiveIngredients[0],
						});
		    		}
		    		res.send(Data);
				}
			})
		}
	 }
}

