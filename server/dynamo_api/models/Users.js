'use strict';
var dynamo = require('dynamodb');
const Joi = require('joi');

//dynamo.AWS.config.loadFromPath('credentials.json');
var dynamo = require('dynamodb');

dynamo.AWS.config.update({
  accessKeyId: require("../../config.json").accessKeyId, 
  secretAccessKey: require("../../config.json").secretAccessKey, 
  region: require("../../config.json").Region});
  
var Station = dynamo.define('tUsers', {
    hashKey : 'uuidUser',
   
    // add the timestamp attributes (updatedAt, createdAt)
    timestamps : true,
   
    schema : {
      uuidUser : Joi.string(),
      activo   : Joi.number()
    }
  });

  
  Station.config({tableName: 'tUsers'});

  module.exports = dynamo.model("tUsers",Station);

  