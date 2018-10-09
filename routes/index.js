var express = require('express');
var router = express.Router();
var customer = require('../Controller/customerController');
var user = require('../Controller/userController');

var account = require('../Controller/accountController');
// var AI = require('../Controller/AIController');

var TN = require('../Controller/TNController');

// var kkkkk = new AIController("../Controller/AIController");

var ggggg = require('../Controller/AIController');

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



router.post('/search', type,function(req, res) {

	ggggg.getServices();
      // var data = [];
      // var Search = async (function (){
      //   var AIData = await (AI.SearchAi(req,res));
      //   console.log(AIData);
      //   // var TNData = await (TN.SearchTN(req,res));
      //   return "AIData";
    // });

    // Search();

//     AI.SearchAi().then(function(req,AIData) {
//     console.log( AIData);
//     return res.send(AIData);
// });


});

module.exports = router;
