'use strict';
var dynamo = require('dynamodb');
const Joi = require('joi');

//dynamo.AWS.config.loadFromPath('credentials.json');
var dynamo = require('dynamodb');

dynamo.AWS.config.update({
  accessKeyId: require("../../config.json").accessKeyId, 
  secretAccessKey: require("../../config.json").secretAccessKey, 
  region: require("../../config.json").Region});
  
var Report = dynamo.define('tReports', {
    hashKey : 'uuidReport',
    timestamps : true,
   
    schema : {
      uuidReport : Joi.string(),
      date   : Joi.string(),
      description    : Joi.string(),
      latitude     : Joi.number(),
      longitude     : Joi.number(),
      state   : Joi.number(),
      uuidBike : Joi.string()
    }
  });

  
  Report.config({tableName: 'tReports'});

  module.exports = dynamo.model("tReports",Report);

  