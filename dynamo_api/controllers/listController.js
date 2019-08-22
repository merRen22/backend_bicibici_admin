'use strict';
var Station = require('../models/Station.js');
var Bikes = require('../models/Bike.js');
var dynamo = require('dynamodb');
dynamo.AWS.config.update({
  accessKeyId: require("../../../backend_bicibici_admin/config").accessKeyId, 
  secretAccessKey: require("../../../backend_bicibici_admin/config").secretAccessKey, 
  region: require("../../../backend_bicibici_admin/config").Region});




exports.create_station = function(req,res) {

  /*if(!req.body) {
    return res.status(400).send({
        message: "Note content can not be empty"
    });
}*/

// Create a Station
var station = new Station(
  {
    StationID : 1,
    Address   : "Station1",
    Latitude    : 12121,
    Longitude     : 1212,
    TotalSlots   :121,
  }
);

    station.save(function (err) {
        if(err)
        {
            console.log(err);
            res.send(err);
        }
        else
        {
            res.send('created account in DynamoDB', station.get('StationID'));
        }
    
  
});
}

exports.get_station = function(body,callback) {
    console.log('created account in DynamoDB');
   
    Station.query(body.StationID).exec(function (err, resp) {
        console.log('----------------------------------------------------------------------');
        if(err) {
          console.log('Error running query', err);
        } 
        else{
            console.log(resp.Items);
            callback.send(resp);
        }
  });
}

  exports.delete_station = function(req,res) {

    /*if(!req.body) {
    return res.status(400).send({
        message: "Note content can not be empty"
    });
}*/
    Station.destroy(1,function (err) {
        res.send("Estación Eliminada");
      });
  }


  exports.get_all_station = function(body,callback) {
    Station.scan().loadAll().exec(function (err, resp) {
        console.log('----------------------------------------------------------------------');
        if(err) {
          console.log('Error running query', err);
        } 
        else{
            console.log(resp.Items);
            callback.send(resp);
        }
  });
}

exports.get_all_bikes = function(body,callback) {
   
    Bikes.scan().loadAll().exec(function (err, resp) {
        console.log('----------------------------------------------------------------------');
        if(err) {
          console.log('Error running query', err);
        } 
        else{
            console.log(resp.Items);
            callback.send(resp);
        }
  });
}
 
exports.get_bike = function(body,callback) {
    console.log('created account in DynamoDB');
   
    Bikes.query(1).exec(function (err, resp) {
        console.log('----------------------------------------------------------------------');
        if(err) {
          console.log('Error running query', err);
        } 
        else{
            console.log(resp.Items);
            callback.send(resp);
        }
  });
}

  exports.delete_bike = function(req,res) {

    /*if(!req.body) {
    return res.status(400).send({
        message: "Note content can not be empty"
    });
}*/
Bikes.destroy(1,function (err) {
        res.send("Estación Eliminada");
      });
  }

  exports.create_bike = function(req,res) {

    /*if(!req.body) {
      return res.status(400).send({
          message: "Note content can not be empty"
      });
  }*/
  
  // Create a Station
  var bike = new Bike(
    {
        Id : 1,
        IsIntervened : 1,
        Longuitude : -234324321,
        Available : 1,
        IsMoving : 1,
        Latitude : -234234,

    }
  );
  
      bike.save(function (err) {
          if(err)
          {
              console.log(err);
              res.send(err);
          }
          else
          {
              res.send('created account in DynamoDB', bike.get('Id'));
          }
      
    
  });
  }
  