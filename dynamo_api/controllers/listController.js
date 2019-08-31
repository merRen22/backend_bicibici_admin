'use strict';
const uuidv1 = require('uuid/v1');
var Station = require('../models/Station.js');
var Bikes = require('../models/Bike.js');
var Plans = require('../models/Plan.js');
var Accounts = require('../models/Accounts.js');
var dynamo = require('dynamodb');
dynamo.AWS.config.update({
  accessKeyId: require("../../config").accessKeyId,
  secretAccessKey: require("../../config").secretAccessKey,
  region: require("../../config").Region
});

//STATION

exports.createStation = function (req, res) {

  if (!req.body) {
    return res.status(400).send({
      message: "Note content can not be empty"
    });
  }

  // Create a Station
  var station = new Station(
    {
      uuidStation: uuidv1(),
      address: req.body.address,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      totalSlots: req.body.totalSlots
    }
  );

  station.save(function (err) {
    if (err) {
      console.log(err);
      res.send(JSON.stringify({ message: "Registro Incorrecto" }));
    }
    else {
      res.send(JSON.stringify({ message: "Registro Correcto" }));
    }
  });
}

exports.updateStation = function (req, res) {

  if (!req.body) {
    return res.status(400).send({
      message: "Note content can not be empty"
    });
  }

  // Create a Station
  Station.update({
    uuidStation: req.body.uuidStation,
    address: req.body.address,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    totalSlots: req.body.totalSlots
  }, function (err) {
    if (err) {
      console.log(err);
      res.send(JSON.stringify({ message: "Actualización Incorrecta" }));
    }
    else {
      res.send(JSON.stringify({ message: "Actualización Correcta" }));
    }


  });
}

exports.getStationByUuid = function (req, res) {
  Station.query(req.body.uuidStation).exec(function (err, resp) {
    console.log('----------------------------------------------------------------------');
    if (err) {
      console.log('Error running query', err);
      res.send({
        message: "Note content can not be empty"
      })
    }
    else {
      console.log(resp.Items);
      res.send(resp);
    }
  });
}


exports.getStationByAddress = function (req, res) {

  Station.scan().where('address').contains(req.body.address).exec(function (err, resp) {
    console.log('----------------------------------------------------------------------');
    if (err) {
      console.log('Error running query', err);
      res.send({
        message: "Error"
      })
    }
    else {
      console.log(resp.Items);
      res.send(resp);
    }
  });
}

exports.deleteStationByUuid = function (req, res) {

  Station.query(req.body.uuidStation).exec(function (err, resp) {
    if (err) {
      console.log('Error running query', err);
      res.send({
        message: "Ingrese un uuidStation correcto"
      })
    }
    else {
      if (resp.Count == "1") {
        Station.destroy(req.body.uuidStation, function (err) {
          if (err) {
            res.send({ message: "No se pudo eliminar la estación" });
          }
          else {
            res.send({ message: "Estación Eliminada" });
          }
        });
      }
      else {
        res.send({ message: "No existe una estación con el uuid indicado" });
      }
    }
  });
}

exports.deleteStationByAddress = function (req, res) {

  Station.scan().where('address').contains(req.body.address).exec(function (err, resp) {
    if (err) {
      console.log('Error running query', err);
      res.send({
        message: "Error buscando la estacion"
      })
    }
    else {
      if (resp.Count == "1") {
        Station.destroy(req.body.uuidStation, function (err) {
          if (err) {
            res.send({ message: "No se pudo eliminar la estación" });
          }
          else {
            res.send({ message: "Estación Eliminada" });
          }
        });
      }
      else {
        res.send({ message: "No existe una estación con la direccion indicada" });
      }
    }
  });
}

exports.getStations = function (body, callback) {
  Station.scan().loadAll().exec(function (err, resp) {
    console.log('----------------------------------------------------------------------');
    if (err) {
      console.log('Error running query', err);
    }
    else {
      console.log(resp.Items);
      callback.send(resp);
    }
  });
}

exports.get_page_station = function (req, res) {
  console.log(req.params.pageId)
  Station.scan().limit(req.params.pageId).exec(function (err, resp) {
    console.log('----------------------------------------------------------------------');
    if (err) {
      console.log('Error running query', err);
    }
    else {
      console.log(resp);
      res.send(resp.Items)
    }
  });
}

//BIKES

exports.getBikes = function (body, callback) {

  Bikes.scan().loadAll().exec(function (err, resp) {
    console.log('----------------------------------------------------------------------');
    if (err) {
      console.log('Error running query', err);
    }
    else {
      console.log(resp.Items);
      callback.send(resp);
    }
  });
}

exports.getBikeByUuid = function (req, res) {

  Bikes.query(req.body.uuidBike).exec(function (err, resp) {
    console.log('----------------------------------------------------------------------');
    if (err) {
      console.log('Error running query', err);
    }
    else {
      console.log(resp);
      res.send(resp);
    }
  });
}

exports.deleteBikeByUuid = function (req, res) {

  /*if(!req.body) {
  return res.status(400).send({
      message: "Note content can not be empty"
  });
}*/
  Bikes.destroy(req.body.uuidBike, function (err) {
    if (err) {
      res.send({ message: "Error" });
    }
    res.send({ message: "Bicileta Eliminada" });
  });
}

exports.createBike = function (req, res) {
  var code = uuidv1()
  var bike = new Bikes(
    {
      uuidBike: code,
      available: 1,
      isIntervened: 0,
      isMoving: 0,
      latitude: 0.0,
      longitude: 0.0,
    }
  );

  bike.save(function (err) {
    if (err) {
      console.log(err);
      res.send(JSON.stringify({ message: "Registro Incorrecto" }));
    }
    else {
      res.send(JSON.stringify({ message: code }));
    }


  });
}

exports.updateBike = function (req, res) {

  /*if(!req.body) {
    return res.status(400).send({
        message: "Note content can not be empty"
    });
}*/

  // Create a Station

  Bikes.update({
    uuidBike: req.body.uuidBike,
    isIntervened: req.body.IsIntervened,
    longuitude: req.body.Longuitude,
    available: req.body.Available,
    isMoving: req.body.IsMoving,
    latitude: req.body.Latitude
  }, function (err) {
    if (err) {
      console.log(err);
      res.send(JSON.stringify({ message: "Actualización Incorrecta" }));
    }
    else {
      res.send(JSON.stringify({ message: "Actualización Correcta" }));
    }


  });
}
//PLANS

exports.get_all_plans = function (body, callback) {

  Plans.scan().loadAll().exec(function (err, resp) {
    console.log('----------------------------------------------------------------------');
    if (err) {
      console.log('Error running query', err);
    }
    else {
      console.log(resp.Items);
      callback.send(resp);
    }
  });
}

exports.getPlansByName = function (req, callback) {

  Plans.scan().where('name').contains(req.body.name).loadAll().exec(function (err, resp) {
    console.log('----------------------------------------------------------------------');
    if (err) {
      console.log('Error running query', err);
    }
    else {
      console.log(resp.Items);
      callback.send(resp);
    }
  });
}

exports.get_plan_by_uuid = function (req, res) {

  Plans.query(req.body.uuidPlan).exec(function (err, resp) {
    console.log('----------------------------------------------------------------------');
    if (err) {
      console.log('Error running query', err);
    }
    else {
      console.log(resp);
      res.send(resp);
    }
  });
}

exports.delete_plan = function (req, res) {

  Plans.destroy(req.body.uuidPlan, function (err) {
    res.send(
      { message: "Estación Eliminada" });
  });
}

exports.create_plan = function (req, res) {
  if (!req.body) {
    return res.status(400).send({
      message: "Ingrese los datos del plan"
    });
  }


  // Create a Station
  var plan = new Plans(
    {
      uuidPlan: uuidv1(),
      name: req.body.name,
      cost: req.body.cost,
      duration: req.body.duration
    }
  );

  plan.save(function (err) {
    if (err) {
      console.log(err);
      res.send(JSON.stringify({ message: "Registro Incorrecto" }));
    }
    else {
      res.send(JSON.stringify({ message: "Registro Correcto" }));
    }


  });
}

exports.updatePlan = function (req, res) {

  Plans.update({
    uuidPlan: req.body.uuidPlan,
    name: req.body.name,
    cost: req.body.cost,
    duration: req.body.duration
  }, function (err) {
    if (err) {
      console.log(err);
      res.send(JSON.stringify({ message: "Actualización Incorrecta" }));
    }
    else {
      res.send(JSON.stringify({ message: "Actualización Correcta" }));
    }
  });
}


//Accounts

exports.createAccount = function (req, res) {

  if (!req.body) {
    return res.status(400).send({
      message: "Account content can not be empty"
    });
  }
  var account = new Accounts(
    {
      uuidAccount: uuidv1(),
      email: req.body.email,
      password: req.body.password,
      typeAccount: req.body.typeAccount,
      createdAt: req.body.createdAt
    }
  );

  account.save(function (err) {
    if (err) {
      console.log(err);
      res.send(JSON.stringify({ message: "Registro Incorrecto" }));
    }
    else {
      res.send(JSON.stringify({ message: "Registro Correcto" }));
    }


  });
}

exports.getAccountsByMail = function (req, res) {
  Accounts.scan().where('email').contains(req.body.email).exec(function (err, resp) {
    console.log('----------------------------------------------------------------------');
    if (err) {
      console.log('Error running query', err);
      res.send({ message: "Account not found" })
    }
    else {
      console.log(resp.Items);
      res.send(resp);
    }
  });
}

exports.get_account_by_uuid = function (req, res) {
  Accounts.query(req.body.uuidAccount).exec(function (err, resp) {
    console.log('----------------------------------------------------------------------');
    if (err) {
      console.log('Error running query', err);
      res.send({ message: "Account not found" })
    }
    else {
      console.log(resp.Items);
      res.send(resp);
    }
  });
}

exports.updateAccount = function (req, res) {
  Accounts.update({
    uuidAccount: req.body.uuidAccount,
    email: req.body.email,
    password: req.body.password,
    typeAccount: req.body.typeAccount,
  }, function (err) {
    if (err) {
      console.log(err);
      res.send(JSON.stringify({ message: "Actualización Incorrecta" }));
    }
    else {
      res.send(JSON.stringify({ message: "Actualización Correcta" }));
    }
  });
}

exports.deleteAccountByUuid = function (req, res) {

  /*if(!req.body) {
  return res.status(400).send({
      message: "Note content can not be empty"
  });
}*/
  Accounts.destroy(req.body.uuidAccount, function (err) {
    res.send(JSON.stringify({ message: "Cuenta Eliminada" }));
  });
}


exports.getAccounts = function (body, callback) {
  Accounts.scan().loadAll().exec(function (err, resp) {
    console.log('----------------------------------------------------------------------');
    if (err) {
      console.log('Error running query', err);
      res.send({ message: "Error" })
    }
    else {
      console.log(resp.Items);
      callback.send(resp);
    }
  });
}

