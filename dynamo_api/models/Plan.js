'use strict';
var dynamo = require('dynamodb');
const Joi = require('joi');

//dynamo.AWS.config.loadFromPath('credentials.json');
var dynamo = require('dynamodb');

dynamo.AWS.config.update({
  accessKeyId: require("../../../backend_bicibici_admin/config").accessKeyId, 
  secretAccessKey: require("../../../backend_bicibici_admin/config").secretAccessKey, 
  region: require("../../../backend_bicibici_admin/config").Region});
  
var Plan = dynamo.define('Plan', {
    hashKey : 'PlanID',
   
    // add the timestamp attributes (updatedAt, createdAt)
    timestamps : true,
   
    schema : {
      PlanID : Joi.number(),
      Cost   : Joi.number(),
      Duration    : Joi.number()
    }
  });

  
  Plan.config({tableName: 'Plan'});

  module.exports = dynamo.model("Plan",Plan);

  