'use strict';
var dynamo = require('dynamodb');
const Joi = require('joi');

//dynamo.AWS.config.loadFromPath('credentials.json');
var dynamo = require('dynamodb');

dynamo.AWS.config.update({
  accessKeyId: require("../../../backend_bicibici_admin/config").accessKeyId, 
  secretAccessKey: require("../../../backend_bicibici_admin/config").secretAccessKey, 
  region: require("../../../backend_bicibici_admin/config").Region});
  

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
  

  