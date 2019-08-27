'use strict';
var Station = require('../models/Station.js');
var Bikes = require('../models/Bike.js');
var Plans = require('../models/Plan.js');
var dynamo = require('dynamodb');
dynamo.AWS.config.update({
  accessKeyId: require("../../../backend_bicibici_admin/config").accessKeyId, 
  secretAccessKey: require("../../../backend_bicibici_admin/config").secretAccessKey, 
  region: require("../../../backend_bicibici_admin/config").Region});



//STATION

exports.createStation = function(req,res) {

  if(!req.body) {
    return res.status(400).send({
        message: "Note content can not be empty"
    });
}

// Create a Station
var station = new Station(
  {
    //StationID : req.body.StationID,
    Address   : req.body.Address,
    Latitude    : req.body.Latitude,
    Longitude     : req.body.Longitude,
    TotalSlots   :req.body.TotalSlots
  }
);

    station.save(function (err) {
        if(err)
        {
            console.log(err);
            res.send(JSON.stringify({ message: "Registro Incorrecto" }));
        }
        else
        {
            res.send(JSON.stringify({ message: "Registro Correcto" }));
        }
    
  
});
}

exports.updateStation = function(req,res) {

  if(!req.body) {
    return res.status(400).send({
        message: "Note content can not be empty"
    });
}

// Create a Station
 Station.update({
    //StationID : req.body.StationID,
    Address   : req.body.Address,
    Latitude    : req.body.Latitude,
    Longitude     : req.body.Longitude,
    TotalSlots   :req.body.TotalSlots
  },function (err) {
        if(err)
        {
            console.log(err);
            res.send(JSON.stringify({ message: "Actualización Incorrecta" }));
        }
        else
        {
            res.send(JSON.stringify({ message: "Actualización Correcta" }));
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


exports.getStationByName = function(req,res) {

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

  exports.deleteStationByAddress = function(req,res) {

    /*if(!req.body) {
    return res.status(400).send({
        message: "Note content can not be empty"
    });
}*/
    Station.destroy(req.body.Address,function (err) {
        res.send("Estación Eliminada");
      });
  }


  exports.getStations = function(body,callback) {
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
 
exports.get_bike_by_id = function(req,res) {

    Bikes.query(req.body.Id).exec(function (err, resp) {
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
Bikes.destroy(req.body.Id,function (err) {
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
        Id : req.body.Id,
        IsIntervened : req.body.IsIntervened,
        Longuitude : req.body.Longuitude,
        Available : req.body.Available,
        IsMoving : req.body.IsMoving,
        Latitude : req.body.Latitude

    }
  );
  
      bike.save(function (err) {
          if(err)
          {
              console.log(err);
              res.send(JSON.stringify({ message: "Registro Incorrecto" }));
          }
          else
          {
            res.send(JSON.stringify({ message: "Registro Correcto" }));
          }
      
    
  });
  }
  
  //PLANS

  exports.get_all_plans = function(body,callback) {
   
    Plans.scan().loadAll().exec(function (err, resp) {
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

exports.get_plan_by_id = function(req,res) {

  Plans.query(req.body.PlanID).exec(function (err, resp) {
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

exports.delete_plan = function(req,res) {

Plans.destroy(req.body.PlanID,function (err) {
      res.send(
        { message :"Estación Eliminada" });
    });
}

exports.create_plan = function(req,res) {

  if(!req.body) {
    return res.status(400).send({
        message: "Ingrese los datos del plan"
    });
}

// Create a Station
var plan = new Plan(
  {
    PlanID : req.body.PlanID,
    Cost   : req.body.Cost,
    Duration    : req.body.Duration

  }
);

    plan.save(function (err) {
        if(err)
        {
            console.log(err);
            res.send(JSON.stringify({ message: "Registro Incorrecto" }));
        }
        else
        {
          res.send(JSON.stringify({ message: "Registro Correcto" }));
        }
    
  
});
}


//Accounts

exports.createAccount = function(req,res) {

  if(!req.body) {
    return res.status(400).send({
        message: "Account content can not be empty"
    });
}
var account = new Account(
  {
        Email   : req.body.Email,
        Password    : req.body.Password,
        TypeAccount : req.body.TypeAccount,
        createdAt : req.body.createdAt
  }
);

account.save(function (err) {
        if(err)
        {
            console.log(err);
            res.send(JSON.stringify({ message: "Registro Incorrecto" }));
        }
        else
        {
            res.send(JSON.stringify({ message: "Registro Correcto" }));
        }
    
  
});
}

exports.getAccountByEmail = function(req,res) {
    Account.query(req.body.Email).exec(function (err, resp) {
        console.log('----------------------------------------------------------------------');
        if(err) {
          console.log('Error running query', err);
          res.send({message : "Account not found"})
        } 
        else{
            console.log(resp.Items);
            res.send(resp);
        }
  });
}


exports.getAccountByType = function(req,res) {

  Account.scan().where('TypeAccount').contains(req.body.TypeAccount).exec(function (err, resp) {
      console.log('----------------------------------------------------------------------');
      if(err) {
        console.log('Error running query', err);
        res.send({message : "Account not found"})
      } 
      else{
          console.log(resp.Items);
          res.send(resp);
      }
});
}

  exports.deleteAccountByEmail = function(req,res) {

    /*if(!req.body) {
    return res.status(400).send({
        message: "Note content can not be empty"
    });
}*/
    Account.destroy(req.body.Address,function (err) {
        res.send("Estación Eliminada");
      });
  }


  exports.getAccounts = function(body,callback) {
    Account.scan().loadAll().exec(function (err, resp) {
        console.log('----------------------------------------------------------------------');
        if(err) {
          console.log('Error running query', err);
          res.send({message : "Error"})
        } 
        else{
            console.log(resp.Items);
            callback.send(resp);
        }
  });
}

