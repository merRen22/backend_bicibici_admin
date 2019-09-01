'use strict';
var dynamo = require('dynamodb');
const Joi = require('joi');

//dynamo.AWS.config.loadFromPath('credentials.json');
var dynamo = require('dynamodb');

dynamo.AWS.config.update({
  accessKeyId: require("../../config.json").accessKeyId, 
  secretAccessKey: require("../../config.json").secretAccessKey, 
  region: require("../../config.json").Region});
  
var Account = dynamo.define('tAccounts', {
    hashKey : 'uuidAccount',
   
    // add the timestamp attributes (updatedAt, createdAt)
    timestamps : true,
   
    schema : {
        uuidAccount : Joi.string(),
        email   : Joi.string(),
        password    : Joi.string(),
        typeAccount : Joi.string(),
        createdAt : Joi.date()
    }
  });

  
  Account.config({tableName: 'tAccounts'});

  module.exports = dynamo.model("tAccounts",Account);

  