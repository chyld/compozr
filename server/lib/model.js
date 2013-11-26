var __ = require('lodash');
var db = global.db;

var Model = function(table, data){
  var generateUpsertSql = function(){
    var id;
    var sql = {};
    sql.allCols = db.schemas[table];
    sql.usrCols = [];
    sql.usrVals = [];

    if(data.id){
      id = data.id;
      delete data.id;
    }

    for(var property in data){
      var isColumn = __.any(sql.allCols, function(column){return column === property;});
      if(isColumn){
        sql.usrCols.push(property);
        sql.usrVals.push(data[property]);
      }
    }

    var params  = __.map(sql.usrVals, function(v, i){return '$' +        (i+1);});
    var allCols = sql.allCols.join(',');

    if(id){
      sql.text = 'update ' + table + ' set (' + sql.usrCols.join(',') + ') = (' + params + ') where id=' + id + ' returning ' + allCols;
    } else {
      sql.text = 'insert into ' + table + ' (' + sql.usrCols.join(',') + ') values (' + params + ') returning ' + allCols;
    }

    return sql;
  };

// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //

  var generateSelectSql = function(num){
    var limit = '';
    if(num) limit = ' limit ' + num;
    var sql = 'select * from ' + table + limit;
    return sql;
  };

// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //

  var generateDeleteSql = function(){
    var sql = 'delete from ' + table + ' where id=' + data.id;
    return sql;
  };

// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //

  this.save = function(resultFn){
    var sql = generateUpsertSql();
    var rows = [];

    db.query(sql.text, sql.usrVals,
      function(err){
        resultFn(err);
      },
      function(row, res){
        rows.push(row);
      },
      function(res){
        resultFn(null, rows);
      });
  };

// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //

  this.find = function(num, resultFn){
    var sql = generateSelectSql(num);
    var rows = [];

    db.query(sql, [],
      function(err){
        resultFn(err);
      },
      function(row, res){
        rows.push(row);
      },
      function(res){
        resultFn(null, rows);
      });
  };

// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //

  this.destroy = function(resultFn){
    var sql = generateDeleteSql();
    var rows = [];

    db.query(sql, [],
      function(err){
        resultFn(err);
      },
      function(row, res){
        rows.push(row);
      },
      function(res){
        resultFn(null, rows);
      });
  };
};

module.exports = Model;
