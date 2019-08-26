'use strict';
var Station = require('../models/Station.js');
var Bikes = require('../models/Bike.js');
var dynamo = require('dynamodb');
dynamo.AWS.config.update({
  accessKeyId: require("../../config").accessKeyId, 
  secretAccessKey: require("../../config").secretAccessKey, 
  region: require("../../config").Region});

//STATION

exports.create_station = function(req,res) {

  if(!req.body) {
    return res.status(400).send({
        message: "Note content can not be empty"
    });
}

// Create a Station
var station = new Station(
  {
    StationID : req.body.StationID,
    Address   : req.body.Address,
    Latitude    : req.body.Latitude,
    Longitude     : req.body.Longitude,
    TotalSlots   :req.body.TotalSlots,
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
            res.send('created account in DynamoDB');
        }
    
  
});
}

exports.get_station_by_Id = function(req,res) {
    Station.query(req.body.StationID).exec(function (err, resp) {
        console.log('----------------------------------------------------------------------');
        if(err) {
          console.log('Error running query', err);
        } 
        else{
            console.log(resp.Items);
            res.send(resp);
        }
  });
}


exports.get_station_by_name = function(req,res) {

  Station.scan().where('Address').contains(req.body.Address).exec(function (err, resp) {
      console.log('----------------------------------------------------------------------');
      if(err) {
        console.log('Error running query', err);
      } 
      else{
          console.log(resp.Items);
          res.send(resp);
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

exports.get_page_station = function(req,res) {
    console.log(req.params.pageId)
    Station.scan().limit(req.params.pageId).exec(function (err, resp) {
        console.log('----------------------------------------------------------------------');
        if(err) {
          console.log('Error running query', err);
        } 
        else{
            console.log(resp);
            res.send(resp.Items)
        }
  });
}

//BIKES

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
 
exports.get_bike = function(req,res) {

    Bikes.query(parseInt(req.params.StationID)).exec(function (err, resp) {
        console.log('----------------------------------------------------------------------');
        if(err) {
          console.log('Error running query', err);
        } 
        else{
            console.log(resp);
            res.send(resp);
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
  