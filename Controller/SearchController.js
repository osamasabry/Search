var AI = require('../Model/AI');
var TN = require('../Model/TN');
var CountryBasedAI = require('../Model/country_based_AI');
var CountryBasedTN = require('../Model/country_based_TN');


var Data=[];
var AllData=[];
var getTNData=[];

var TNData=[];
module.exports = {
	SearchByName:function(req,res){
	 	//var Searchquery = req.body.search;

		AI.find({})
			.select('AI_Code AI_Name')
			.exec(function(err, ai) {
			if (err){
	    		return res.send({
					message: err
				});
	    	} else {
	    // 		for (var i = 0; i < ai.length; i++) {
	    // 			Data.push({
					//     key: ai[i].AI_Code,
					//     value: ai[i].AI_Name,
					//     type:'AI'
					// });
	    // 		}
	    		Data.push({AIData:ai});
	    		res.send(Data);
				// findTN();
			}
		})
		// function findTN(){
		// 	TN.find({})
		// 		.select('TN_Code TN_Name TN_ActiveIngredients')
		// 		.exec(function(err, tn) {

		// 		if (err){
	 //    			return res.send({
		// 			message: err
		// 			});
		//     	} else {
		//     		for (var i = 0; i < tn.length; i++) {
		//     			Data.push({
		// 				    key: tn[i].TN_Code,
		// 				    value: tn[i].TN_Name,
		// 				    type:'TN',
		// 				    ai: tn[i].TN_ActiveIngredients[0],
		// 				});
		//     		}
		//     		res.send(Data);
		// 		}
		// 	})
		// }
	},

	getAllData:function(req,res){

		AI.findOne({AI_Code: Number(req.body.AI_Code)},function(err, ai){
			if (err){
	    		res.send({
					message: err
				});
	    	} else {
	    		AllData.push({AIData:ai});

	    		getCountryBasedAI();

	    		getTN();

	    	}
		})

		function getCountryBasedAI (){

			CountryBasedAI.findOne({CountryBasedAI_AI_Code: Number(req.body.AI_Code)},function(err, countrybasedai){
				if (err){
		    		res.send({
						message: err
					});
		    	} else {
		    		AllData.push({CountryBasedAIData:countrybasedai});
		    	}
			})
		}

		function getTN(){
			TN.find({TN_ActiveIngredients:{$in:[req.body.AI_Code]}})
				.select('TN_Code TN_Name')
				.exec(function(err, tn) {
				if (err){
		    		return res.send({
						message: err
					});
		    	} else {
		    		for (var i = 0; i < tn.length; i++) {
		    			getTNData.push({
						    key: tn[i].TN_Code,
						    value: tn[i].TN_Name,
						});
		    		}
		    		AllData.push({TNData:getTNData});
		    		res.send(AllData);
		    	}
			})
		}

	},

	getSingleTN:function(req,res){

		TN.findOne({TN_Code: Number(req.body.TN_Code)},function(err, tn){
			if (err){
	    		res.send({
					message: err
				});
	    	} else {
	    		TNData.push({tndata:tn});
	    		getCountryBasedTN()
	    	}
		})

		function getCountryBasedTN(){

			CountryBasedTN.findOne({CountryBasedTN_TN_Code: Number(req.body.TN_Code)},function(err, countrybasedtn){
				if (err){
		    		res.send({
						message: err
					});
		    	} else {
		    		TNData.push({CountryBasedTNData:countrybasedtn});
		    		res.send(TNData);
		    	}
			})

		}
	}
}

