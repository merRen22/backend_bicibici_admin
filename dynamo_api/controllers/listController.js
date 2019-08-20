var AWS = require("aws-sdk");
var listModels = require('../models/listModels');
AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:3010"
});

var docClient = new AWS.DynamoDB.DocumentClient();


exports.create_station = function(req,res) {
  var Model;
  listModels.GetModel("Station",function(err, result){
    if(err){
        console.log(user_name);
        //buildLoginPage(req, resp, 'Usuario y/o contrasena incorrectas.');
     //res.send(result);
          }
    else
    {
        Model = result;
        docClient.put(params, function(err, data) {
          if (err) {
              console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
              } 
          else {
              console.log("Added item:", JSON.stringify(data, null, 2));
              }
        }); 

    }
      });
}






  
