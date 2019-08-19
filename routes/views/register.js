var http_util = require('../../util/http_util');

module.exports = function (app) {
    app.get("/register", (req, res)=>{
        buildRegisterPage(req,res,"")
    });
}

exports.showRegisterPage = function (req, resp) {
    buildRegisterPage(req, resp, "");
}


exports.registerSubmit = function (req, resp) {

    resp.writeHead(200, {'Content-Type':'text/html'});

    var page_title = "Register Success";

    var page_menu = http_util.pageMenu();

    var page_content = "User info registration success.";

    var page_data = http_util.buildPage(page_title, page_menu, page_content);

    resp.end(page_data);
}



function buildRegisterPage(req, resp, error_message) {

    http_util.getUrlParams(req, resp);

    var page_title = "Register Page";

    var page_menu = http_util.pageMenu();

    var register_form = "<h3>Ingrese datos de Usuario.</h3>";

    if(error_message!=='' && error_message!==null && error_message!==undefined)
    {
        register_form += "<font color=red>" + error_message + "</font><br/><br/>>";
    }

    register_form += "<form method='post' action='/register-submit'>" +
        "User Name : <input type='text' name='user_name' value='{user_name}'/><br/><br/>" +
        "Password :<input type='password' name='password' value='{password}'/><br/><br/>" +
        "Email :<input type='text' name='email' value='{email}'/><br/><br/>" +
        "<input type='submit' value='Register'/><br/><br/>" +
        "</form>";

    if(req.user_name==null || req.user_name==undefined)
    {
        req.user_name = '';
    }

    if(req.password==null || req.password==undefined)
    {
        req.password = '';
    }

    if(req.email==null || req.email==undefined)
    {
        req.email = '';
    }

    register_form = register_form.replace("{user_name}", req.user_name);

    register_form = register_form.replace("{password}", req.password);

    register_form = register_form.replace("{email}", req.email);

    var register_page_data = http_util.buildPage(page_title, page_menu, register_form);

    resp.writeHead(200, {'Content-Type':'text/html'});

    resp.end(register_page_data);
}