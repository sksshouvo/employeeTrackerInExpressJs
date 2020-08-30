var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
const fileUpload = require('express-fileupload');
var MongoClient = require('mongodb'); MongoClient;
var url = "mongodb://localhost:27017/";
var md5 = require('md5');


router.use(fileUpload());
/* GET home page. */
router.post('/', function(req, res, next) {
  var sent_tokens = req.body._tokens;
  if(sent_tokens!=""){
    MongoClient.connect(url,{ useUnifiedTopology: true }, (err, db)=>{
      if (err) throw err;
      var dbo = db.db("emp_tracker");
      dbo.collection("users").findOne({_tokens:sent_tokens}, (err, result)=>{
         if(err) throw err;
         if(result!=null && sent_tokens == result._tokens){
           
          if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
          }
        
          // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
          let sampleFile = req.files.files;
        
          // Use the mv() method to place the file somewhere on your server
          var destination = './public/images/screenshots/'+result.email; 
          var full_path = './public/images/screenshots/'+result.email+'/'+sampleFile.name;
          fs.access(destination, function(error) {
            if (error) {
              fs.mkdir(destination, { recursive: true }, function(err) {
                if (err) {
                  console.log(err)
                } else {
                  sampleFile.mv(full_path, function(err) {
                    if (err) throw err;
                    var details = {status: true};
                    res.send(details);
                  });
                }
              })
            } else {
              sampleFile.mv(full_path, function(err) {
                if (err) throw err;
                var details = {status: true};
                res.send(details);
              });
            }
          })
         
         }
      })
    });
  }

});

module.exports = router;
