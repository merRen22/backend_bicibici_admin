'use strict';
var dynamo = require('dynamodb');
const Joi = require('joi');

//dynamo.AWS.config.loadFromPath('credentials.json');
var dynamo = require('dynamodb');

dynamo.AWS.config.update({
  accessKeyId: require("../../config.json").accessKeyId, 
  secretAccessKey: require("../../config.json").secretAccessKey, 
  region: require("../../config.json").Region});
  
var Station = dynamo.define('Stations', {
    hashKey : 'Address',
   
    // add the timestamp attributes (updatedAt, createdAt)
    timestamps : true,
   
    schema : {
      Address   : Joi.string(),
      Latitude    : Joi.number(),
      Longitude     : Joi.number(),
      TotalSlots   : Joi.number(),
      createdAt : Joi.date()
    }
  });

  
  Station.config({tableName: 'Stations'});

  module.exports = dynamo.model("Stations",Station);

  