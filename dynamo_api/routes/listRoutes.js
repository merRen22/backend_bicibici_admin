var express = require('express');
var router = express.Router();
var loginController = require('../../routes/views/login');

module.exports = function(app){
    
    var StationList = require('../controllers/listController.js');
 
    //Station
    app.post("/stations/create", StationList.create_station);

    app.get("/stations/list",StationList.get_all_station);   

    app.post("/stations/name",StationList.get_station_by_name);

    app.get("/stations/page/:pageId",StationList.get_page_station);   

    app.post("/stations/delete",StationList.delete_station);

    //Bikes

    app.get("/bikes/list",StationList.get_all_bikes);  

    app.post("/bikes/create", StationList.create_bike);

    app.post("/bikes/get",StationList.get_bike_by_id);   

    app.post("/bikes/delete",StationList.delete_bike);

    //Plans

    app.get("/plans/list",StationList.get_all_plans);  

    app.post("/plans/create", StationList.create_plan);

    app.post("/plans/get",StationList.get_plan_by_id);   

    app.post("/plans/delete",StationList.delete_plan);


    app.get("*", (req,res)=>{
        console.log("showing wildcard")
        res.send("😞 Este espacio aun no esta disponible")
    });
}