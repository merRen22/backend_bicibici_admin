module.exports = function(app){
    app.get("*", (req,res)=>{
        console.log("showing wildcard")
        res.send("😞 Este especio aun no esta disponible")
    });
}