var express = require('express');
var router = express.Router();


module.exports = function(app){
    
    var listController = require('../controllers/listController.js');
 
    //Station
    app.post("/stations/create", listController.createStation);

    app.post("/stations/update", listController.updateStation);

    app.get("/stations/list",listController.getStations);   

    app.post("/stations/list/uuid",listController.getStationByUuid);   

    app.post("/stations/list/address",listController.getStationByAddress);

    app.post("/stations/delete/uuid",listController.deleteStationByUuid);

    app.post("/stations/delete/address",listController.deleteStationByAddress);
    

    //Bikes

    app.post("/bikes/create", listController.createBike);

    app.get("/bikes/list",listController.getBikes);  

    app.post("/bikes/list/uuid",listController.getBikeByUuid);   

    app.post("/bikes/delete",listController.deleteBikeByUuid);

    app.post("/bikes/update",listController.updateBike);

    //Plans

    app.get("/plans/list",listController.get_all_plans);  

    app.post("/plans/list/name",listController.getPlansByName);  

    app.post("/plans/create", listController.create_plan);

    app.post("/plans/get",listController.get_plan_by_uuid);   

    app.post("/plans/delete",listController.delete_plan);

    app.post("/plans/update",listController.updatePlan);

    //Accounts

    app.get("/accounts/list",listController.getAccounts);  

    app.post("/accounts/create", listController.createAccount);

    app.post("/accounts/get",listController.getAccountByType);   

    app.post("/accounts/delete",listController.deleteAccountByEmail);

    app.get("*", (req,res)=>{
        res.send({ message :"😞 Este espacio aun no esta disponible" })
    });
}