var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb'); MongoClient;
var url = "mongodb://localhost:27017/";
var md5 = require('md5');
var randomstrings = require("randomstring");
/* GET users listing. */
router.get('/:email?/:password?', function(req, res, next) {
  MongoClient.connect(url,{ useUnifiedTopology: true }, (err, db)=>{
    if (err) throw err;
    var dbo = db.db("emp_tracker");
    var random_token = randomstrings.generate();
    dbo.collection("users").findOne({email:req.params.email, password:req.params.password}, (err, result)=>{
       if(err) throw err;
       if(result!=null){
    dbo.collection("users").updateOne({email:req.params.email, password:req.params.password}, {$set:{_tokens:random_token}}, function(err, result2){if(err) throw err });
       var logged_in = true;
       }else{
       var logged_in = false;
       }
    dbo.collection("users").findOne({email:req.params.email, password:req.params.password}, (err, result3)=>{
       var all_data = {logged_in:logged_in, user_data:result3};
       res.send(all_data);
   });
  })
 });
});


module.exports = router;
