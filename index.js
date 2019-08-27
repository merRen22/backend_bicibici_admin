const express = require("express");
const app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded



require("./dynamo_api/routes/listRoutes.js")(app);
app.listen(3010, ()=>{
    console.log("Express ha iniciado correctamente!");
});