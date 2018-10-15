var express = require('express');
var router = express.Router();
var customer = require('../Controller/customerController');
var user = require('../Controller/userController');

var account = require('../Controller/accountController');
var SearchCTRL = require('../Controller/SearchController');



var passport = require('passport');


var multer=require('multer');

var upload=multer({dest:'uploads/'});

var type=upload.single('upfile');

var async = require('asyncawait/async');
var await = require('asyncawait/await');


router.post('/login', type,function(req, res, next) {
      passport.authenticate('login', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.send(info); }
        req.logIn(user, function(err) {
          if (err) { return next(info); }
          return res.send(user);
        });
      })(req, res, next);
});



router.post('/searchAIandTN', type,function(req, res) {
      var Search = async (function (){
        await (SearchCTRL.SearchByName(req,res));
    });
    Search();
});


router.post('/getData', type,function(req, res) {
      var getData = async (function (){
        await (SearchCTRL.getAllData(req,res));
    });
    getData();
});


router.post('/getTN', type,function(req, res) {
      var getTN = async (function (){
        await (SearchCTRL.getSingleTN(req,res));
    });
    getTN();
});


router.post('/findData', type,function(req, res) {
      var findData = async (function (){
        if (req.body.type=='AI') 
          await (SearchCTRL.checkDataAI(req,res));
        else if(req.body.type=='TN')
          await (SearchCTRL.checkDataTN(req,res));
        else
          await (SearchCTRL.checkDataBySearch(req,res));
    });
    findData();
});

router.post('/displayData', type,function(req, res) {
      var findData = async (function (){
        if (req.body.type=='MasterAI') 
          await (SearchCTRL.getDataAI(req,res));
        else if(req.body.type=='MasterTN')
          await (SearchCTRL.getDataTN(req,res));
        else if(req.body.type=='CountryAI')
          await (SearchCTRL.getDataCountryAI(req,res));
        else if(req.body.type=='CountryTN')
          await (SearchCTRL.getDataCountryTN(req,res));
    });
    findData();
});


module.exports = router;
