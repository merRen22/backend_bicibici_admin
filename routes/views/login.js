var http_util = require('../../util/http_util');
var aws_util = require('../../util/aws_util');

module.exports = function (app) {
    app.get("/login", (req, res)=>{
        buildLoginPage(req,res,"");
    });
    app.post("/login", (req,res)=>{
        console.log("Ingresar post");
        checkLoginAccount(req,res);
        
    });
}



checkLoginAccount = function(req, resp){

   // Use node query string module to parse login form post data.
   var query_string = require('querystring');
    console.log(req.method);
   // If client use post method to request.
    if (req.method == 'POST') {

       var req_body = '';

        req.on('data', function (data) {
            req_body += data;
            console.log(data);
            
            if (req_body.length > 1e6)
                req.connection.destroy();
        });

        req.on('end', function () { 
            var post_data = query_string.parse(req_body);
            // Get user name from post data.
            var user_name = post_data["user_name"];
            // Get password from post data.
            var password = post_data["password"];
            aws_util.init();

            let login = aws_util.Login2(post_data, function(err, result){
                if(err){
                    console.log("error");
                    req.user_name = user_name;
                    req.password = password;
                    
                    console.log(user_name);
                    console.log(req.password = password)    ;
                    // Return login form page back to response.
                 buildLoginPage(req, resp, 'Usuario y/o contrasena incorrectas.');
                 //res.send(result);
                }
                else
                {
                    //buildDashboardPage(req, resp,"");
                    resp.redirect('/dashboard');
                   // res.send(result);
                } 
                
            })
        
            
            
        });
    }
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

function buildDashboardPage(req, resp, error_message) {

    http_util.getUrlParams(req, resp);

    var page_title = "Dashboard Admin";

    var page_menu = http_util.pageMenuHome();

    var login_form = "<h3>BiciBici Dashboard</h3>";
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

