'use strict';
var AWS = require("aws-sdk");
var Station = require('../models/listModels.js');

var dynamo = require('dynamodb');
dynamo.AWS.config.update({
  accessKeyId: require("../../../backend_bicibici_admin/config").accessKeyId, 
  secretAccessKey: require("../../../backend_bicibici_admin/config").secretAccessKey, 
  region: require("../../../backend_bicibici_admin/config").Region});

var docClient = new AWS.DynamoDB.DocumentClient();


exports.create_station = function(req,res) {

  /*if(!req.body) {
    return res.status(400).send({
        message: "Note content can not be empty"
    });
}*/

// Create a Station
var station = new Station(
  {
    StationID : 1,
    Address   : "Station1",
    Latitude    : 12121,
    Longitude     : 1212,
    TotalSlots   :121,
  }
);
/*
        docClient.put(station, function(err, data) {
          if (err) {
              console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
              } 
          else {
              console.log("Added item:", JSON.stringify(data, null, 2));
              }
        }); 
*/
station.save(function (err) {
  console.log('created account in DynamoDB', station.get('StationID'));
  console.log(err);
});
}






  
