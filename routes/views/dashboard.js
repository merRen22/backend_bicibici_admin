var http_util = require('../../util/http_util');
var aws_util = require('../../util/aws_util');
var dynamo_api = require('../../dynamo_api/routes/listRoutes.js');

module.exports = function (app) {
    app.get("/dashboard", (req, res)=>{
        console.log("Ingresar get");
        //buildDashboardPage(req,res,"");
        getCurrentUser(req,res);
    });
    
}

function getCurrentUser(req,resp){
    let login = aws_util.getCurrentUser(function(err, result){
        if(err){
            console.log("sesion expirada");
         buildLoginPage(req, resp, 'Sesion expirada');
         //res.send(result);
        }
        else
        {
            buildDashboardPage(req, resp,"");
            resp.redirect('/dashboard');
           // res.send(result);
        } 
        
    });
    
}



function buildDashboardPage(req, resp, error_message) {

    http_util.getUrlParams(req, resp);

    var page_title = "Dashboard Admin";

    var page_menu = http_util.pageMenuHome();

    var login_form = "<h3>BiciBici Dashboard</h3>";
    if(error_message!=='' && error_message!==null && error_message!==undefined)
   //nombre usuario
   

   login_form += "<h3>" + + "</h3>";

   login_form += "<form method='post' action='/task'>" +
   "User Name : <input type='text' name='user_name' value='{user_name}'/><br/><br/>" +
   "Password :<input type='password' name='password' value='{password}'/><br/><br/>" +
   "<input type='submit' value='Login'/><br/><br/>" +
   "</form>";
    var login_page_data = http_util.buildPage(page_title, page_menu, login_form);

    resp.writeHead(200, {'Content-Type':'text/html'});

    resp.end(login_page_data);
}

function buildLoginPage(req, resp, error_message) {

    http_util.getUrlParams(req, resp);

    var page_title = "Login Page";

    var page_menu = http_util.pageMenuLogin();

    var login_form = "<h3>BiciBiciLogin</h3>";
    if(error_message!=='' && error_message!==null && error_message!==undefined)
   {
      login_form += "<font color=red>" + error_message + "</font><br/><br/>";
   }
   login_form += "<form method='post' action='/login'>" +
        "User Name : <input type='text' name='user_name' value='{user_name}'/><br/><br/>" +
        "Password :<input type='password' name='password' value='{password}'/><br/><br/>" +
        "<input type='submit' value='Login'/><br/><br/>" +
        "</form>";

    if(req.user_name==null || req.user_name==undefined)
    {
        req.user_name = '';
    }

    if(req.password==null || req.password==undefined)
    {
        req.password = '';
    }

    login_form = login_form.replace("{user_name}", req.user_name);

    login_form = login_form.replace("{password}", req.password);

    var login_page_data = http_util.buildPage(page_title, page_menu, login_form);

    resp.writeHead(200, {'Content-Type':'text/html'});
    
    resp.end(login_page_data);
}