const express = require("express");
const app = express();

require("./routes/views")(app);

require("./dynamo_api/routes/listRoutes.js")(app);
app.listen(3010, ()=>{
    console.log("Express ha iniciado correctamente!");
});