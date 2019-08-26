const express = require("express");
const app = express();
var bodyParser = require('body-parser')


// parse application/x-www-form-urlencoded


require("./routes/views")(app);

require("./dynamo_api/routes/listRoutes.js")(app);
app.listen(3010, ()=>{
    console.log("Express ha iniciado correctamente!");
});