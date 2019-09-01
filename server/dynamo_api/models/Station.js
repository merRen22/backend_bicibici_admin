'use strict';
var dynamo = require('dynamodb');
const Joi = require('joi');

//dynamo.AWS.config.loadFromPath('credentials.json');
var dynamo = require('dynamodb');

dynamo.AWS.config.update({
  accessKeyId: require("../../config.json").accessKeyId, 
  secretAccessKey: require("../../config.json").secretAccessKey, 
  region: require("../../config.json").Region});
  
var Station = dynamo.define('tStations', {
    hashKey : 'uuidStation',
   
    // add the timestamp attributes (updatedAt, createdAt)
    timestamps : true,
   
    schema : {
      uuidStation : Joi.string(),
      address   : Joi.string(),
      latitude    : Joi.number(),
      longitude     : Joi.number(),
      totalSlots   : Joi.number(),
      createdAt : Joi.date()
    }
  });

  
  Station.config({tableName: 'tStations'});

  module.exports = dynamo.model("tStations",Station);

  