var pg = require('pg');
var util = require('util');
var events = require('events');
var __ = require('lodash');
var db;

var Db = function(){
  events.EventEmitter.call(this);
  this.pool = [];
  this.schemas = {};
};

util.inherits(Db, events.EventEmitter);
global.db = db = new Db();
module.exports = global.db;

// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //

Db.prototype.createPool = function(connectionString, num){
  for(var i = 0; i < num; i++){

    (function(client){
      client.connect(function(err){
        if(err){
          console.error(err);
        } else {
          console.info('Postgres listening : %d', client.processID);
          db.pool.push({client:client, isActive:false});
          if(db.pool.length === num) db.emit('pool-ready');
        }
      });
    })(new pg.Client(connectionString));

  }
};

// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //

Db.prototype.cacheSchema = function(){
  var tables = ['posts'];

  for(var i = 0; i < tables.length; i++){

    (function(table){
      db.getColumns(table, function(columns){
        db.schemas[table] = columns;
        console.log('--------------------------------------');
        console.log(tables.length);
        console.log(db.schemas);
        if(Object.keys(db.schemas).length === tables.length) db.emit('schema-ready');
      });
    })(tables[i]);

  }
};

// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //

Db.prototype.getColumns = function(table, resultFn){
  var columns = [];

  this.query('select column_name from information_schema.columns where table_name = $1', [table],
    function(err){
      console.error(err);
    },
    function(row, res){
      columns.push(row.column_name);
    },
    function(res){
      resultFn(columns);
    });
};

// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //

Db.prototype.query = function(text, values, errFn, rowFn, endFn){
  var connection = this.getConnection();

  connection.client.query({text:text, values:values})
  .on('error', function(err){
    connection.isActive = false;
    errFn(err);
  })
  .on('row', rowFn)
  .on('end', function(res){
    connection.isActive = false;
    endFn(res);
  });
};

// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //

Db.prototype.getConnection = function(){
  var connection = __.find(db.pool, function(connection){return !connection.isActive;});

  connection.isActive = true;
  return connection;
};

// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //
