'use strict';
var dynamo = require('dynamodb');
const Joi = require('joi');

//dynamo.AWS.config.loadFromPath('credentials.json');
var dynamo = require('dynamodb');

dynamo.AWS.config.update({
  accessKeyId: require("../../../backend_bicibici_admin/config").accessKeyId, 
  secretAccessKey: require("../../../backend_bicibici_admin/config").secretAccessKey, 
  region: require("../../../backend_bicibici_admin/config").Region});
  
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

  