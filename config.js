/*global module:false, process:false */
if (process.env.PORT) {
  module.exports = {
    database: {
      connectionLimit : 10,
      host     : 'us-cdbr-iron-east-02.cleardb.net',
      user     : 'b75bfcf3786269',
      password : 'bea3c4f5',
      database :  'heroku_15e42a6a8ca6198',
      debug    :  false
    }
  };
} else {
  module.exports = {
    database: {
      connectionLimit : 100, //important
      host     : 'localhost',
      user     : 'root',
      password : '',
      debug    :  false
    }
  };
}

