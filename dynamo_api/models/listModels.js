var dynamo = require('dynamodb');

dynamo.AWS.config.loadFromPath('credentials.json');
dynamo.AWS.config.update({accessKeyId: 'AKID', secretAccessKey: 'SECRET', region: "us-east-1"});

var Station = dynamo.define('Station', {
    hashKey : 'StationID',
   
    // add the timestamp attributes (updatedAt, createdAt)
    timestamps : true,
   
    schema : {
      Address   : Joi.string(),
      Latitude    : dynamo.types.number(),
      Longitude     : dynamo.types.number(),
      TotalSlots   : dynamo.types.number(),
      
    }
  });

  module.exports=  Station.config({tableName: 'Station'});
