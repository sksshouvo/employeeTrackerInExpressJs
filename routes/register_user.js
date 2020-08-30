var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb'); MongoClient;
var url = "mongodb://localhost:27017/";
var md5 = require('md5');
var randomstrings = require("randomstring");

/* GET users listing. */
router.post('/', function(req, res, next) {
  MongoClient.connect(url,{ useUnifiedTopology: true }, (err, db)=>{
    if (err) throw err;
    var dbo = db.db("emp_tracker");
    var myobj = {name: req.body.name, company:req.body.company, email:req.body.email, password:md5(req.body.password), _tokens:randomstrings.generate(), role:"owner"};
    dbo.collection("users").aggregate(
      [{$match:{email:req.body.email}}]
    ).toArray((err, result)=>{
      if(err) throw err;
      if(result==""){
        dbo.collection("users").insertOne(myobj, (err, result)=>{
          if (err) throw err;
          res.send("1 Docuemnt Inserted");
          db.close();
        });
      }else{
        res.send("Data Already Exist");
      }
    });
  });
});

module.exports = router;
