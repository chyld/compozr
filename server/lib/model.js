var __ = require('lodash');
var db = global.db;

var Model = function(table, data){
  var generateUpsertSql = function(){
    var id = data.id;
    var sql = {};
    sql.allCols = db.schemas[table];
    sql.usrCols = [];
    sql.usrVals = [];

    delete data.id;
    delete data.created_at;
    delete data.updated_at;

    for(var property in data){
      var isColumn = __.any(sql.allCols, function(column){return column === property;});
      if(isColumn){
        sql.usrCols.push(property);
        sql.usrVals.push(data[property]);
      }
    }


console.log('---------QUERY----------');
console.log('---------QUERY----------');
console.log('---------QUERY----------');


    var params  = __.map(sql.usrVals, function(v, i){return '$' + (i+1);});
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

  var processQuery = function(text, vars, resultFn){
    var rows = [];

    db.query(text, vars,
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

  this.save = function(resultFn){
    var sql = generateUpsertSql();
    processQuery(sql.text, sql.usrVals, resultFn);
  };

// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //

  this.find = function(num, resultFn){
    var sql = generateSelectSql(num);
    processQuery(sql, [], resultFn);
  };

// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //

  this.destroy = function(resultFn){
    var sql = generateDeleteSql();
    processQuery(sql, [], resultFn);
  };
};

module.exports = Model;
