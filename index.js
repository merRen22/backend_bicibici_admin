const express = require("express");
const app = express();

require("./routes/views")(app);
require("./routes/special")(app);

app.listen(3010, ()=>{
    console.log("Express ha iniciado correctamente!");
});