'use strict';
var dynamo = require('dynamodb');
const Joi = require('joi');

//dynamo.AWS.config.loadFromPath('credentials.json');
var dynamo = require('dynamodb');

dynamo.AWS.config.update({
  accessKeyId: require("../../config.json").accessKeyId, 
  secretAccessKey: require("../../config.json").secretAccessKey, 
  region: require("../../config.json").Region});
  
var Plan = dynamo.define('tPlans', {
    hashKey : 'uuidPlan',
   
    // add the timestamp attributes (updatedAt, createdAt)
    timestamps : true,
   
    schema : {
      uuidPlan : Joi.string(),
      name : Joi.string(),
      cost   : Joi.number(),
      duration    : Joi.number(),
      createdAt : Joi.date()
    }
  });

  
  Plan.config({tableName: 'tPlans'});

  module.exports = dynamo.model("tPlans",Plan);

  