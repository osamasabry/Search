var AI = require('../Model/AI');
var TN = require('../Model/TN');
var CountryBasedAI = require('../Model/country_based_AI');
var CountryBasedTN = require('../Model/country_based_TN');

var Country = require('../Model/countries');



var Data={};
var AllData=[];
var getTNData=[];

var TNData=[];

var FindData=[];

var DataBySearch = [];

module.exports = {
	SearchByName:function(req,res){
	 	//var Searchquery = req.body.search;
		 AI.aggregate([
			{ "$project": {
				"_id": 0,
				"key": "$AI_Code",
				"value": "$AI_Name",
				"type": "AI"
			}
		}]).exec(function(err, ai) {
				if (err){
					return res.send({
						message: err
					});
				} else {
					Data = ai;
					findTN();
				}
		})
		function findTN(){
			TN.aggregate([
				{ "$project": {
					"_id": 0,
					"key": "$TN_Code",
					"value": "$TN_Name",
					"type": "TN",
					"aicode": "$TN_ActiveIngredients"
				}
			}]).exec(function(err, tn) {

				if (err){
	    			return res.send({
					message: err
					});
		    	} else {
		    		Data = Object.assign(Data, tn);
		    		res.send(Data);
				}
			})
		}
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
	},

	checkDataAI:function(req,res){
		FindData =[];
		AI.findOne({AI_Code: Number(req.body.AI_Code)},function(err, ai){
			if (err){
	    		res.send({
					message: err
				});
	    	} else {
	    		FindData.push({AI:true});
	    		CheckCountryBasedAI()
	    	}
		})

		function CheckCountryBasedAI(){
			var Searchquery = req.body.country_ids;
			CountryBasedAI.find({$and:[ {'CountryBasedAI_Country_ID':{$in:Searchquery}}, 
				{'CountryBasedAI_AI_Code':Number(req.body.AI_Code)} ]})
				.populate({ path: 'CountryBasedAICountry', select: 'Country_Name' })
				.select('CountryBasedAI_Country_ID')
				.exec(function(err, countrybasedai){
				if (err){
		    		res.send({
						message: err
					});
		    	} else {
		    		var Countries=[];
		    		for (var i = 0; i < countrybasedai.length; i++) {
		    			Countries.push({
		    				CountryCode:countrybasedai[i].CountryBasedAICountry.Country_Code,
		    				CountryName:countrybasedai[i].CountryBasedAICountry.Country_Name
		    			});
					}
					FindData.push({Countries: Countries});
				}
		    	res.send( FindData);
			})

		}
	},

	checkDataTN:function(req,res){
		FindData =[];
		TN.findOne({TN_Code: Number(req.body.TN_Code)},function(err, tn){
			if (err){
	    		res.send({
					message: err
				});
	    	} else {
	    		FindData.push({tn:true});
	    		CheckCountryBasedTN()
	    	}
		})

		function CheckCountryBasedTN(){
			var Searchquery = req.body.country_ids;
			CountryBasedTN.find({$and:[ {'CountryBasedTN_Country_ID':{$in:Searchquery}}, 
				{'CountryBasedTN_TN_Code':Number(req.body.TN_Code)} ]})
				.populate({ path: 'CountryBasedTNCountry', select: 'Country_Name' })
				.select('CountryBasedTN_Country_ID')
				.exec(function(err, countrybasedtn){
				if (err){
		    		res.send({
						message: err
					});
		    	} else {
		    		var Countries=[];
		    		for (var i = 0; i < countrybasedtn.length; i++) {
		    			Countries.push({
		    				CountryCode:countrybasedtn[i].CountryBasedTNCountry.Country_Code,
		    				CountryName:countrybasedtn[i].CountryBasedTNCountry.Country_Name
		    			});
					}
					FindData.push({Countries: Countries});
				}
		    	res.send(FindData);
			})

		}
	},

	checkDataBySearch:function(req,res){
		var Searchquery = req.body.search;
		AI.find({AI_Name:{$regex:Searchquery}})
		.select('AI_Code AI_Name')
		.exec(function(err, ai) {
			if (err){
	    		return response.send({
					user : request.user ,
					message: err
				});
	    	}else {
				DataBySearch.push(ai);
				getTNData()
			}

			function getTNData(){
				TN.find({TN_Name:{$regex:Searchquery}})
				.select('TN_Code TN_Name')
				.exec(function(err, tn) {
					if (err){
			    		return response.send({
							user : request.user ,
							message: err
						});
			    	}else {
						DataBySearch.push(tn);
					}
					res.send(DataBySearch);
				})
			}
		})
	},

	getDataAI:function(req,res){
		AllData=[];
		AI.findOne({AI_Code: Number(req.body.AI_Code)},function(err, ai){
			if (err){
	    		res.send({
					message: err
				});
	    	} else {
	    		AllData.push({AIData:ai});
	    		getTN();
	    	}
		})

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


	

}

