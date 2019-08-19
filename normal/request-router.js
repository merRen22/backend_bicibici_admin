var http = require('http');

var http_util = require('../util/http_util');

var home_module = require('../routes/views/home');

var login_module = require('../routes/views/login');

var register_module = require('../routes/views/register');


var http_server_callback_function = function(req, resp){

   // Parse query strings.
   http_util.getUrlParams(req, resp);

   // Get request url path value.
   var url_path = req.query_url.pathname;

   // Invoke different module's function by different request path.
    if(url_path === '/')
    {
        home_module.showHomePage(req, resp);
    }else if(url_path === '/login' )
   {
   }else if(url_path === '/check-login')
   {
        login_module.checkLoginAccount(req, resp);
   }else if(url_path === '/register')
    {
        register_module.showRegisterPage(req, resp);
    }else if(url_path === '/register-submit')
    {
        register_module.registerSubmit(req, resp);
    }else
   {
      resp.writeHead(404, {'Content-Type' : 'text/html'});
      resp.end("Request url is not valid : " + req.url.toString());
   }
}
