var express = require('express');
var router = express.Router();
var loginController = require('../views/login');


module.exports = function(app){
    app.get("*", (req,res)=>{
        console.log("showing wildcard")
        res.send("😞 Este espacio aun no esta disponible")
    });
    var StationList = require('../../dynamo_api/controllers/listController.js');
    app.post("/tasks", StationList.create_station);
}