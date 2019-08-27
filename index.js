const express = require("express");
const app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// parse application/x-www-form-urlencoded


require("./routes/views")(app);

require("./dynamo_api/routes/listRoutes.js")(app);
app.listen(3010, ()=>{
    console.log("Express ha iniciado correctamente!");
});