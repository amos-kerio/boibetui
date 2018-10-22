//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
//
var http = require('http');
var path = require('path');

var async = require('async');
var socketio = require('socket.io');
var express = require('express');
var mysql = require('mysql');
var Soccerama = require('soccerama').Soccerama;

//
// ## SimpleServer `SimpleServer(obj)`
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
var router = express();
var server = http.createServer(router);
var io = socketio.listen(server);

router.use(express.static(path.resolve(__dirname, 'client')));
var messages = [];
var sockets = [];
var countries=[];
var fixtures=[];
var soccerama = new Soccerama('wIMWFKl2nxNH5M1IhKq0MkCqo2S1zOPWjbee0r5Jnpaq0UWERrP5GovGLucy', 'v2.0');
var con = mysql.createConnection({
  host: "localhost", // ip address of server running mysql
  user: "root", // user name to your mysql database
  password: "" ,// corresponding password
    database: "boibet"
});



io.on('connection', function (socket) {
    updatedb();
    console.log("Updated")
    messages.forEach(function (data) {
      socket.emit('message', data);
      //updatedb();
    });

    sockets.push(socket);

    socket.on('disconnect', function () {
      sockets.splice(sockets.indexOf(socket), 1);
      updateRoster();
    });

    socket.on('message', function (msg) {
      var text = String(msg || '');

      if (!text)
        return;

      socket.get('name', function (err, name) {
        var data = {
          name: name,
          text: text
        };

        broadcast('message', data);
        messages.push(data);
      });
    });

    socket.on('identify', function (name) {
      socket.set('name', String(name || 'Anonymous'), function (err) {
        updateRoster();

      });
    });
  });
function updatedb() {

var con = mysql.createConnection({
  host: "localhost", // ip address of server running mysql
  user: "root", // user name to your mysql database
  password: "" ,// corresponding password
    database: "boibet"
});
    soccerama.get('countries').then( function(data){
    countries=data.data;
con.connect(function(err) {
  if (err) throw err;
  //con.query('DROP TABLE IF EXISTS `thecountries`', function (err, res) {
      //if (err) throw err;
  //})
  var sql = "create table thecountries (countryid INT, countryname Text, PRIMARY KEY(countryid))";
  con.query(sql, function (err,result) {
      if (err) throw err;
     var countrynames = countries.map(function (country) { return country.name; });
      var countryids = countries.map(function (countryid) { return countryid.id; });

          for (var i = 0; i < countrynames.length; i++) {

                 // var sql="insert into table countries (countyid,countryname) VALUES ('countryids[i]','countrynames[i]')"
            //var datasql = "INSERT INTO countries (countryid,countryname) VALUES (''+countryids[i]','countrynames[i]'"
              var TABLE='thecountries';
             //var query=`insert into countries (countryid,countryname) VALUES ('1','kenya')`//${countryids[i]}${countrynames[i]}
              con.query('insert into '+ TABLE +' (countryid, countryname) values ("' + countryids[i] + '", "' + countrynames[i] + '")', function (err, results) {
                if (err) throw err;

             })


          }
  })
});
});

}
function updateRoster() {
  async.map(
    sockets,
    function (socket, callback) {
      socket.get('name', callback);
    },
    function (err, names) {
      broadcast('roster', names);
    }
  );
}

function broadcast(event, data) {
  sockets.forEach(function (socket) {
    socket.emit(event, data);
  });
}

function country(){
    soccerama.get('countries').then( function(data){
    //id in the params field will replace {id} in the endpoint
    //competitions: true, will add include=competitions in query string
   // console.log(data.data);
    countries=data.data;
    //console.log(data.data);
    // connect to the database.
con.connect(function(err) {
  if (err) throw err;
  var sql = "CREATE TABLE if not exists mycountries (countryid int ,countryname VARCHAR(255), primary key(countryid))";
  con.query(sql, function (err,result) {
      if (err) throw err;
     var countrynames = countries.map(function (country) { return country.name; });
      var countryids = countries.map(function (countryid) { return countryid.id; });


     var mycountries=JSON.stringify(countrynames);

          for (var i = 0; i < countrynames.length; i++) {

                 // var sql="insert into table countries (countyid,countryname) VALUES ('countryids[i]','countrynames[i]')"
            //var datasql = "INSERT INTO countries (countryid,countryname) VALUES (''+countryids[i]','countrynames[i]'"
              var TABLE='mycountries';
             //var query=`insert into countries (countryid,countryname) VALUES ('1','kenya')`//${countryids[i]}${countrynames[i]}
              con.query('insert into '+ TABLE +' (countryid, countryname) values ("' + countryids[i] + '", "' + countrynames[i] + '")', function (err, results) {
                if (err) throw err;

             })
          }

              console.log("Values Inserted!");


  })
});
});


}


server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
    country();
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});
