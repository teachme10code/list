/*global console: false, require: false  */
var express = require('express');
var mysql = require('mysql');
var proConRoutes = require('./routes/ProConRoutes');
var urlencode = require('urlencode');
var json = require('json-middleware');
var bodyParser = require('body-parser');
var config = require("./config");

//Create and configure app
var app = express();
app.set('port', (process.env.PORT || 3000));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());


//Configure routes
app.get('/login', proConRoutes.login);
app.post('/logout', proConRoutes.logout);

app.post('/proConTopic', proConRoutes.postProConTopic);
app.put('/proConTopic', proConRoutes.putProConTopic);
app.get('/proConTopic', proConRoutes.getProConTopic);
app.delete('/proConTopic', proConRoutes.deleteProConTopic);

app.post('/proConList', proConRoutes.postProConList);
app.put('/proConList', proConRoutes.putProConList);
app.get('/proConList', proConRoutes.getProConList);
app.delete('/proConList', proConRoutes.deleteProConList);

app.get('/proConResults', proConRoutes.getProConResults);

app.post('/proConListItem', proConRoutes.postProConListItem);
app.put('/proConListItem', proConRoutes.putProConListItem);
app.get('/proConListItem', proConRoutes.getProConListItem);
app.delete('/proConListItem', proConRoutes.deleteProConListItem);

app.put('/userPreferences', proConRoutes.putUserPreferences);
app.get('/userPreferences', proConRoutes.getUserPreferences);

  
var pool = mysql.createPool(config.database);

function handle_database(req, res) {
  "use strict";
  pool.getConnection(function (err, connection) {
    if (err) {
      connection.release();
      res.json({"code" : 100, "status" : "Error in connection database"});
      return;
    }

    console.log('connected as id ' + connection.threadId);

    connection.query("select * from pro_con_data", function (err, rows) {
      connection.release();
      if (!err) {
        res.json(rows);
      }
    });

    connection.on('error', function (err) {
      res.json({"code" : 100, "status" : "Error in connection database"});
      return;
    });
  });
} //handle_database

function useOk(client) {
  "use strict";

  var totalQueries = 3;
  function queryCallback(err, results) {
      if (err && err.number !== mysql.ERROR_TABLE_EXISTS_ERROR) {
        console.log("ERROR: " + err.message);
        throw err;
      }
      totalQueries -= 1;
      console.log("table ready");
      if (totalQueries === 0)
      {
        console.log("Releasing client");
        client.release(); 
      }
  } //queryCallback

  // UserId
  // PW
  client.query(
    'CREATE TABLE user' +
      '(user_id INT(11) AUTO_INCREMENT, ' +
      'user_name VARCHAR(255), ' +
      'password VARCHAR(255), ' +
      'PRIMARY KEY (user_id));',
      queryCallback);

  // UserId
  // TopicId
  // Topic Description
  client.query(
    'CREATE TABLE topic' +
      '(topic_id INT(11) AUTO_INCREMENT, ' +
      'user_id INT(11), ' +
      'description VARCHAR(255), ' +
      'PRIMARY KEY (topic_id));',
      queryCallback);

  // TopicId
  // Pro/Con
  // Description
  // Weight
  client.query(
    'CREATE TABLE pro_con_data' +
      '(id INT(11) AUTO_INCREMENT, ' +
      'user_id INT(11), ' +
      'topic_id INT(11), ' +
      'type ENUM(\'PRO\', \'CON\'), ' +
      'description VARCHAR(255), ' +
      'weight INT(11), ' +
      'PRIMARY KEY (id));',
      queryCallback);
}


function dbCreated(connection) {
  "use strict";
  console.log("DB succesfully created!");

  connection.query('USE ' + config.database.database, function (err, results) {
    if (err) {
      console.log("ERROR: " + err.message);
      throw err;
    }
    useOk(connection);
  });
}


function init_database() {
  "use strict";
  pool.getConnection(function (err, connection) {
    if (err) {
      console.log("Error in connection database");
      console.log(err);
      return;
    }

    console.log('connected as id ' + connection.threadId);

    connection.query('CREATE DATABASE ' + config.database.database, function (err, results) {
      if (err && err.number !== mysql.ERROR_DB_CREATE_EXISTS) {
        console.log("ERROR: " + err.message);
        throw err;
      }
      console.log("database created OR already exists.");
      dbCreated(connection);
    });

    connection.on('error', function (err) {
      console.log("Error in connection database");
      return;
    });
  });
}

init_database();

// app.get("/", function (req, res) {
//   "use strict";
//   handle_database(req, res);
// });


//Start server
var server = app.listen(app.get('port'), function () {
  "use strict";
  var host = server.address().address,
    port = server.address().port;

  console.log('ProCon Server app listening at http://%s:%s', host, port);

});