'use strict';
var dynamo = require('dynamodb');
const Joi = require('joi');

//dynamo.AWS.config.loadFromPath('credentials.json');
var dynamo = require('dynamodb');

dynamo.AWS.config.update({
  accessKeyId: require("../../../backend_bicibici_admin/config").accessKeyId, 
  secretAccessKey: require("../../../backend_bicibici_admin/config").secretAccessKey, 
  region: require("../../../backend_bicibici_admin/config").Region});
  
var Plan = dynamo.define('tPlans', {
    hashKey : 'uuidPlan',
   
    // add the timestamp attributes (updatedAt, createdAt)
    timestamps : true,
   
    schema : {
      uuidPlan : Joi.string(),
      Cost   : Joi.number(),
      Duration    : Joi.number(),
      createdAt : Joi.date()
    }
  });

  
  Plan.config({tableName: 'tPlans'});

  module.exports = dynamo.model("tPlans",Plan);

  