'use strict';
var dynamo = require('dynamodb');
const Joi = require('joi');

//dynamo.AWS.config.loadFromPath('credentials.json');
var dynamo = require('dynamodb');

dynamo.AWS.config.update({
  accessKeyId: require("../../../backend_bicibici_admin/config").accessKeyId, 
  secretAccessKey: require("../../../backend_bicibici_admin/config").secretAccessKey, 
  region: require("../../../backend_bicibici_admin/config").Region});
  

  var Bike = dynamo.define('Bicycle', {
    hashKey : 'BicycleID',
   
    // add the timestamp attributes (updatedAt, createdAt)
    timestamps : true,
   
    schema : {
      Bicycle : Joi.number(),
      Available : Joi.number(),
      IsIntervened : Joi.number(),
      IsMoving : Joi.number(),
      Latitude : Joi.number(),
      Longitude : Joi.number()
      
    }
  });

  
  Bike.config({tableName: 'Bicycle'});
  module.exports = dynamo.model("Bicycle",Bike);
  

  