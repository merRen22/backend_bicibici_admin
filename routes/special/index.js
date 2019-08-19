var express = require('express');
var router = express.Router();
var loginController = require('../../routes/views/login');
module.exports = function(app){
    app.get("*", (req,res)=>{
        console.log("showing wildcard")
        res.send("😞 Este espacio aun no esta disponible")
    });
   
}