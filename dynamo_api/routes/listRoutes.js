var express = require('express');
var router = express.Router();
var loginController = require('../../routes/views/login');


module.exports = function(app){
 
    var StationList = require('../controllers/listController.js');
    
    app.post("/stations/create", StationList.create_station);

    app.get("/stations/get",StationList.get_station);

    app.get("/stations/list",StationList.get_all_station);      

    app.post("/stations/delete",StationList.delete_station);

    app.get("/bikes/list",StationList.get_all_bikes);  

    app.post("/bikes/create", StationList.create_bike);

    app.get("/bikes/get",StationList.get_bike);   

    app.post("/bikes/delete",StationList.delete_bike);

    app.get("*", (req,res)=>{
        console.log("showing wildcard")
        res.send("😞 Este espacio aun no esta disponible")
    });
}