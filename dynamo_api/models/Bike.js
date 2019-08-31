'use strict';
var dynamo = require('dynamodb');
const Joi = require('joi');

//dynamo.AWS.config.loadFromPath('credentials.json');
var dynamo = require('dynamodb');

dynamo.AWS.config.update({
  accessKeyId: require("../../config.json").accessKeyId, 
  secretAccessKey: require("../../config.json").secretAccessKey, 
  region: require("../../config.json").Region});
  

  var Bike = dynamo.define('tBicycles', {
    hashKey : 'uuidBike',
   
    // add the timestamp attributes (updatedAt, createdAt)
    timestamps : true,
   
    schema : {
      uuidBike : Joi.string(),
      available : Joi.number(),
      isIntervened : Joi.number(),
      isMoving : Joi.number(),
      latitude : Joi.number(),
      longitude : Joi.number(),
      createdAt : Joi.date()
    }
  });

  
  Bike.config({tableName: 'tBicycles'});
  module.exports = dynamo.model("tBicycles",Bike);

  