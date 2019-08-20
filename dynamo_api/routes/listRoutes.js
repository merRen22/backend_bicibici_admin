module.exports = function(app) {
    var StationList = require('../controllers/listController');
  
    // todoList Routes
    app.route('/tasks')
      .post(StationList.create_station);
  

  };