'use strict';
var dynamo = require('dynamodb');
const Joi = require('joi');

//dynamo.AWS.config.loadFromPath('credentials.json');
var dynamo = require('dynamodb');

dynamo.AWS.config.update({
  accessKeyId: require("../../config.json").accessKeyId, 
  secretAccessKey: require("../../config.json").secretAccessKey, 
  region: require("../../config.json").Region});
  

  var Bike = dynamo.define('Bike', {
    hashKey : 'Id',
   
    // add the timestamp attributes (updatedAt, createdAt)
    timestamps : true,
   
    schema : {
      Available : Joi.number(),
      IsIntervened : Joi.number(),
      IsMoving : Joi.number(),
      Latitude : Joi.number(),
      Longitude : Joi.number(),
      
    }
  });

  
  Bike.config({tableName: 'Bike'});
  module.exports = dynamo.model("Bike",Bike);
  

  