'use strict';
var dynamo = require('dynamodb');
const Joi = require('joi');

//dynamo.AWS.config.loadFromPath('credentials.json');
var dynamo = require('dynamodb');

dynamo.AWS.config.update({
  accessKeyId: require("../../../backend_bicibici_admin/config").accessKeyId, 
  secretAccessKey: require("../../../backend_bicibici_admin/config").secretAccessKey, 
  region: require("../../../backend_bicibici_admin/config").Region});
  

  var Bike = dynamo.define('tBikes', {
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

  
  Bike.config({tableName: 'tBikes'});
  module.exports = dynamo.model("tBikes",Bike);

  