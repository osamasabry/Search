var express = require('express');
var router = express.Router();
var customer = require('../Controller/customerController');
var user = require('../Controller/userController');

var account = require('../Controller/accountController');
var SearchCTRL = require('../Controller/SearchController');

var AI = require('../Model/AI');


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
        // await (SearchCTRL.SearchByName(req,res));
      AI.find({})
      .select('AI_Code AI_Name')
      .exec(function(err, ai) {
      if (err){
          return res.send({
          message: err
        });
        } else {
      //    for (var i = 0; i < ai.length; i++) {
      //      Data.push({
          //     key: ai[i].AI_Code,
          //     value: ai[i].AI_Name,
          //     type:'AI'
          // });
      //    }
          // Data.push({AIData:ai});
          res.send(ai);
        // findTN();
      }
    })
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


module.exports = router;
