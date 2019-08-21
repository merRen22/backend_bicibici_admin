module.exports = function(app) {
    var StationList = require('../controllers/listController');
    console.log("ROUTE POST")
    // todoList Routes
    app.route('/tasks')
      .post(StationList.create_station);
  

  };