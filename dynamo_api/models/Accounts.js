'use strict';
var dynamo = require('dynamodb');
const Joi = require('joi');

//dynamo.AWS.config.loadFromPath('credentials.json');
var dynamo = require('dynamodb');

dynamo.AWS.config.update({
  accessKeyId: require("../../../backend_bicibici_admin/config").accessKeyId, 
  secretAccessKey: require("../../../backend_bicibici_admin/config").secretAccessKey, 
  region: require("../../../backend_bicibici_admin/config").Region});
  
var Account = dynamo.define('Accounts', {
    hashKey : 'Email',
   
    // add the timestamp attributes (updatedAt, createdAt)
    timestamps : true,
   
    schema : {
        Email   : Joi.string(),
        Password    : Joi.string(),
        TypeAccount : Joi.string(),
        createdAt : Joi.date()
    }
  });

  
  Account.config({tableName: 'Accounts'});

  module.exports = dynamo.model("Accounts",Account);

  