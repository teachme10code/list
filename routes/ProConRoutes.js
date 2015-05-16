/*global console: false, exports: false, require: false  */
var mysql = require('mysql');
var config = require("../config");

var pool = mysql.createPool(config.database);

var Topic = function (topicId, description, userId) {
    "use strict";
    this.topicId = topicId;
    this.description = description;
    this.userId = userId;
  };

var ProConEnum = Object.freeze({"PRO": 1, "CON": 2});

var ProConItem = function (topicId, itemType, description, weight) {
    "use strict";
    this.topicId = topicId;
    this.itemType = itemType;
    this.description = description;
    this.weight = weight;
  };

var ProConData = function (topic, proList, conList) {
    "use strict";
    this.topic = topic;
    this.proList = proList;
    this.conList = conList;
  };

//REVISIT - Properly handle responses for error cases
function connectAndUseDB(req, res, next, crudMethod) {
  "use strict";
  pool.getConnection(function (err, connection) {
    if (err) {
      connection.release();
      res.json({"code" : 100, "status" : "Error in connection database"});
      return;
    }

    console.log('connected as id ' + connection.threadId);

    connection.query('USE pro_con_db', function (err, results) {
      if (err) {
        console.log("ERROR: " + err.message);
        throw err;
      }
      crudMethod(connection);
    });

    connection.on('error', function (err) {
      res.json({"code" : 100, "status" : "Error in connection database"});
      return;
    });
  });
} //connectAndUseDB

exports.login = function (req, res, next) {
  "use strict";
  console.log("Calling method");
  res.send("Unimplemented!!!");
  next();
};

exports.logout = function (req, res, next) {
  "use strict";
  console.log("Calling method");
  res.send("Unimplemented!!!");
  next();
};

//Create a new topic
exports.postProConTopic = function (req, res, next) {
  "use strict";
  //REVISIT - Return 400 if malformed request
  var proConData,
    desc = req.body.description,
    userId = req.body.userId;

  console.log(req.body.description);
  console.log(req.body.userId);

  //REVISIT - Verify userId is a user in the system
  function createTopic(connection) {
    connection.query(
      'INSERT INTO topic' +
        ' SET user_id = ?' +
        ', description = ?',
      [ userId, desc],
      function (err, results) {
        if (err) {
          //REVISIT - Return internal error 
          console.log("ERROR: " + err.message);
          throw err;
        }
        console.log("The topic id was " + results.insertId);
        res.json({"topicId" : results.insertId});
        connection.release();
        next();
      }
    );
  } //createTopic

  connectAndUseDB(req, res, next, createTopic);
};

//query = pro, con, none should return all
exports.putProConTopic = function (req, res, next) {
  "use strict";
  console.log("Calling method");
  res.send("Unimplemented!!!");
  next();
};

//query = userId, topicId 
exports.getProConTopic = function (req, res, next) {
  "use strict";
  var useTopicId = false,
    userId, topicId, userData = [];

  console.log(req.query.userId);
  console.log(req.query.topicId);
  userId = req.query.userId;
  if (typeof req.query.topicId !== 'undefined') {
    useTopicId = true; 
    topicId = req.query.topicId;
  }

  //REVISIT - Require userId otherwise send back 400

  //REVISIT - Verify userId is a user in the system
  function readTopic(connection) {

    function readTopicCallback(err, rows) {
      connection.release();
      if (!err) {
        res.json(rows);
        next();
      }
    }

    if (useTopicId === true) {
      connection.query("SELECT * FROM topic WHERE topic_id=" + topicId + "AND user_id=" + userId,  readTopicCallback);
    } else {
      connection.query("SELECT * FROM topic WHERE user_id=" + userId, readTopicCallback);
    }
  } //readTopic

  connectAndUseDB(req, res, next, readTopic);
};

exports.deleteProConTopic = function (req, res, next) {
  "use strict";
  console.log("Calling method");
  res.send("Unimplemented!!!");
  next();
};

//query = pro, con, none should return all
exports.postProConList = function (req, res, next) {
  "use strict";
  console.log("Calling method");
  //console.log(req.body);
  //console.log(req);
  console.log(req.body);
  console.log(req.body.proList);
  console.log(req.body.conList);
  // if ("pro" === listType) {
  //   //proConAppData.proList = 
  //   //res.send(proList);
  //   console.log(req.body);
  // } else if ("con" === listType) {
  //   //res.send(conList);
  // } else {
  //   //res.send(proConAppData);
  // }
  res.send("Unimplemented");
  next();
};

//query = pro, con, none should return all
exports.putProConList = function (req, res, next) {
  "use strict";
  console.log("Calling method");
  res.send("Unimplemented!!!");
  next();
};

//query = pro, con, none should return all
exports.getProConList = function (req, res, next) {
  "use strict";
  var listType = req.query.listType,
    userId = req.query.userId,
    topicId = req.query.topicId; 

  function readProConData(connection) {
    function readProConDataCallback(err, rows) {
      connection.release();
      if (!err) {
        res.json(rows);
        next();
      }
    }

    if ("pro" === listType) {
      connection.query("SELECT * FROM pro_con_data WHERE type=PRO AND topic_id=" + topicId + "AND user_id=" + userId,  readProConDataCallback);
    } else if ("con" === listType) {
      connection.query("SELECT * FROM pro_con_data WHERE type=CON AND topic_id=" + topicId + "AND user_id=" + userId,  readProConDataCallback);
    } else {
      connection.query("SELECT * FROM pro_con_data WHERE topic_id=" + topicId + "AND user_id=" + userId,  readProConDataCallback);
    }
  } //readProConData

  connectAndUseDB(req, res, next, readProConData);
};

//query = pro, con, none should return all
exports.deleteProConList = function (req, res, next) {
  "use strict";
  console.log("Calling method");
  res.send("Unimplemented!!!");
  next();
};

exports.getProConResults = function (req, res, next) {
  "use strict";
  console.log("Calling method");
  var results = {"results": "DO IT!!!!"};
  res.send(results);
  next();
};

//List Item CRUD methods
//Update name, weight, etc
exports.postProConListItem = function (req, res, next) {
  "use strict";

  //REVISIT - Return 400 if malformed request
  var userId = req.body.userId,
    topicId = req.body.topicId,
    type = req.body.type,  
    desc = req.body.description,
    weight = req.body.weight;

  console.log(req.body.description);
  console.log(req.body.userId);

      // '(id INT(11) AUTO_INCREMENT, ' +
      // 'user_id INT(11), ' +
      // 'topic_id INT(11), ' +
      // 'type ENUM(\'PRO\', \'CON\'), ' +
      // 'description VARCHAR(255), ' +
      // 'weight INT(11), ' +
  //REVISIT - Verify userId is a user in the system
  function createProConData(connection) {
    connection.query(
      'INSERT INTO pro_con_data' +
        ' SET user_id = ?' +
        ', topic_id = ?' +
        ', type = ?' +
        ', description = ?' +
        ', weight = ?',
      [ userId, topicId, type, desc, weight],
      function (err, results) {
        if (err) {
          //REVISIT - Return internal error 
          console.log("ERROR: " + err.message);
          throw err;
        }
        console.log("The id was " + results.insertId);
        res.json({"id" : results.insertId});
        connection.release();
        next();
      }
    );
  } //createTopic

  connectAndUseDB(req, res, next, createProConData);
};


//item = { id:123, name:"name", weight:3}
//List Item CRUD methods
//Update name, weight, etc
exports.putProConListItem = function (req, res, next) {
  "use strict";
  console.log("Calling method");
  res.send("Unimplemented!!!");
  next();
};

exports.getProConListItem = function (req, res, next) {
  "use strict";
  var userId = req.query.userId;
  var itemId = req.query.itemId; 

  console.log(userId);
  console.log(itemId);

  function readProConListItem(connection) {
    function readProConListItemCallback(err, rows) {
      connection.release();
      if (!err) {
        res.json(rows);
        next();
      }
    }

    connection.query("SELECT * FROM pro_con_data WHERE id=" + itemId
      + "AND user_id=" + userId,
      readProConListItemCallback);
  } //readProConData

  connectAndUseDB(req, res, next, readProConListItem);
};

exports.deleteProConListItem = function (req, res, next) {
  "use strict";
  console.log("Calling method");
  res.send("Unimplemented!!!");
  next();
};


//REVISIT - Might want other CRUD methods for post and delete
exports.getUserPreferences = function (req, res, next) {
  "use strict";
  console.log("Calling method");
  res.send("Unimplemented!!!");
  next();
};

exports.putUserPreferences = function (req, res, next) {
  "use strict";
  console.log("Calling method");
  res.send("Unimplemented!!!");
  next();
};
