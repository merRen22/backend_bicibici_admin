'use strict';
var dynamo = require('dynamodb');
const Joi = require('joi');

//dynamo.AWS.config.loadFromPath('credentials.json');
var dynamo = require('dynamodb');
dynamo.AWS.config.update({
  accessKeyId: require("../../../backend_bicibici_admin/config").accessKeyId, 
  secretAccessKey: require("../../../backend_bicibici_admin/config").secretAccessKey, 
  region: require("../../../backend_bicibici_admin/config").Region});
var Station = dynamo.define('Station', {
    hashKey : 'StationID',
   
    // add the timestamp attributes (updatedAt, createdAt)
    timestamps : true,
   
    schema : {
      StationID : Joi.number(),
      Address   : Joi.string(),
      Latitude    : Joi.number(),
      Longitude     : Joi.number(),
      TotalSlots   : Joi.number(),
      
    }
  });


  Station.config({tableName: 'Station'});
  module.exports = dynamo.model("Station",Station);

  