var http_util = require('../../util/http_util');
var aws_util = require('../../util/aws_util');

module.exports = function (app) {
    app.get("/login", (req, res)=>{
        buildLoginPage(req,res,"");
    });
}



exports.checkLoginAccount = function(req, resp){

   // Use node query string module to parse login form post data.
   var query_string = require('querystring');

   // If client use post method to request.
    if (req.method == 'POST') {

       var req_body = '';

        req.on('data', function (data) {
            req_body += data;

            
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
            aws_util.Login(user_name,password);

            // If user name and password is correct.
            if(user_name === 'admin' && password === 'joven')
            {
                resp.writeHead(200, {'Content-Type':'text/html'});

                // Assign page title.
                var page_title = "Login success";

                // Assign page navigation menu data.
                var page_menu = http_util.pageMenu();

                // Assign page content.
                var page_content = "<font color=red>User name and password is correct, login success.</font>";

                // Build login success page.
                var login_success_page = http_util.buildPage(page_title, page_menu, page_content);

                

                // Send login success page html source data to response.
                resp.end(login_success_page);
            }else
            {
               // If user name and password is not correct.
               req.user_name = user_name;
               req.password = password;

               // Return login form page back to response.
            buildLoginPage(req, resp, 'Usuario y contrasena incorrectas.')
            }
        });
    }
}

function buildLoginPage(req, resp, error_message) {

    http_util.getUrlParams(req, resp);

    var page_title = "Login Page";

    var page_menu = http_util.pageMenu();

    var login_form = "<h3>BiciBiciLogin</h3>";

    if(error_message!=='' && error_message!==null && error_message!==undefined)
   {
      login_form += "<font color=red>" + error_message + "</font><br/><br/>";
   }

   login_form += "<form method='post' action='/check-login'>" +
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
exports.checkLoginAccount = function(req, resp){

   var query_string = require('querystring');

   // If client use post method to request.
    if (req.method == 'POST') {

       var req_body = '';

        req.on('data', function (data) {
            req_body += data;

            
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
            aws_util.Login(user_name,password);

            // If user name and password is correct.
            if(user_name === 'admin' && password === 'joven')
            {
                resp.writeHead(200, {'Content-Type':'text/html'});

                // Assign page title.
                var page_title = "Login success";

                // Assign page navigation menu data.
                var page_menu = http_util.pageMenu();

                // Assign page content.
                var page_content = "<font color=red>User name and password is correct, login success.</font>";

                // Build login success page.
                var login_success_page = http_util.buildPage(page_title, page_menu, page_content);

                

                // Send login success page html source data to response.
                resp.end(login_success_page);
            }else
            {
               // If user name and password is not correct.
               req.user_name = user_name;
               req.password = password;

               // Return login form page back to response.
            buildLoginPage(req, resp, 'Usuario y contrasena incorrectas.')
            }
        });
    }
}


function buildLoginPage(req, resp, error_message) {

    http_util.getUrlParams(req, resp);

    var page_title = "Login Page";

    var page_menu = http_util.pageMenu();

    var login_form = "<h3>BiciBiciLogin</h3>";

    if(error_message!=='' && error_message!==null && error_message!==undefined)
   {
      login_form += "<font color=red>" + error_message + "</font><br/><br/>";
   }

   login_form += "<form method='post' action='/check-login'>" +
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


