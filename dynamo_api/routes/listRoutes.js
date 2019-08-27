var express = require('express');
var router = express.Router();


module.exports = function(app){
    
    var listController = require('../controllers/listController.js');
 
    //Station
    app.post("/stations/create", listController.createStation);

    app.post("/stations/update", listController.updateStation);

    app.get("/stations/list",listController.getStations);   

    app.post("/stations/name",listController.getStationByName);

    //app.get("/stations/page/:pageId",listController.get_page_station);   

    app.post("/stations/delete",listController.deleteStationByAddress);

    //Bikes

    app.get("/bikes/list",listController.get_all_bikes);  

    app.post("/bikes/create", listController.create_bike);

    app.post("/bikes/get",listController.get_bike_by_id);   

    app.post("/bikes/delete",listController.delete_bike);

    //Plans

    app.get("/plans/list",listController.get_all_plans);  

    app.post("/plans/create", listController.create_plan);

    app.post("/plans/get",listController.get_plan_by_id);   

    app.post("/plans/delete",listController.delete_plan);

    //Accounts

    app.get("/accounts/list",listController.getAccounts);  

    app.post("/accounts/create", listController.createAccount);

    app.post("/accounts/get",listController.getAccountByType);   

    app.post("/accounts/delete",listController.deleteAccountByEmail);

    app.get("*", (req,res)=>{
        res.send({ message :"😞 Este espacio aun no esta disponible" })
    });
}