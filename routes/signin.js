var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb'); MongoClient;
var url = "mongodb://localhost:27017/";
var md5 = require('md5');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signin', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  MongoClient.connect(url,{ useUnifiedTopology: true }, (err, db)=>{
    if (err) throw err;
    var dbo = db.db("emp_tracker");
    dbo.collection("users").findOne({email:req.body.email, password:md5(req.body.password)}, (err, result)=>{
       if(err) throw err;
       if(result!=null){
        var logged_in = true;
       }else{
        var logged_in = false;
       }
      console.log(result);
      res.render('signin', {logged_in:logged_in});
    })
  });
});

module.exports = router;
