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
var highlights=[];
var soccerama = new Soccerama('wIMWFKl2nxNH5M1IhKq0MkCqo2S1zOPWjbee0r5Jnpaq0UWERrP5GovGLucy', 'v2.0');
var con = mysql.createConnection({
  host: "localhost", // ip address of server running mysql
  user: "root", // user name to your mysql database
  password: "" ,// corresponding password
    database: "boibet"
});



io.on('connection', function (socket) {

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

    soccerama.get('countries').then( function(data){
    countries=data.data;
con.connect(function(err) {
  if (err) throw err;
  //con.query('DROP TABLE IF EXISTS `thecountries`', function (err, res) {
      //if (err) throw err;
  //})
  var sql = "create table thecountries (countryid INT, countryname Text, PRIMARY KEY(countryid))";

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

}
function updatefixtures() {
    
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

  var q='DROP TABLE IF EXISTS countries';
    con.query(q, function (err,res) {
        if (err) throw err;
        soccerama.get('countries').then( function(data){
    //id in the params field will replace {id} in the endpoint
    //competitions: true, will add include=competitions in query string
   // console.log(data.data);
    countries=data.data;
  var sql = "CREATE TABLE if not exists countries (countryid int ,countryname VARCHAR(255), primary key(countryid))";
  con.query(sql, function (err,result) {
      if (err) throw err;
     var countrynames = countries.map(function (country) { return country.name; });
      var countryids = countries.map(function (countryid) { return countryid.id; });
      var TABLE = 'countries';
          for (var i = 0; i < countrynames.length; i++) {
              con.query('insert into '+ TABLE +' (countryid, countryname) values ("' + countryids[i] + '", "' + countrynames[i] + '")', function (err, results) {
                if (err) throw err;


             })
          }

              fetchdbdata();
  })
});

    })

}

function bookmarkers(){
  var q='DROP TABLE IF EXISTS bookmarkers';
  con.query(q,function (err, res) {
      if (err) throw err;
        soccerama.get('bookmakers').then( function(data){
    bookmarkers=data.data;
  var sql = "CREATE TABLE if not exists bookmarkers (bookmarkerid int ,bookmarkername VARCHAR(255), primary key (bookmarkerid))";
  con.query(sql, function (err,result) {
      if (err) throw err;

     var id = bookmarkers.map(function (bookmarkerid) { return bookmarkerid.id; });
     var name = bookmarkers.map(function (bookmarkername) { return bookmarkername.name; });

      for (var i = 0; i < id.length; i++) {
              var TABLE='bookmarkers';
              con.query('insert into '+ TABLE +' (bookmarkerid, bookmarkername) values ("' + id[i] + '", "' + name[i] + '")', function (err, results) {
                if (err) throw err;
             })
          }

  })

});
  })
}
function updatehighlights(){
      var q='DROP TABLE IF EXISTS highlights';
  con.query(q,function (err, res) {
      if (err) throw err;
        soccerama.get('highlights').then( function(data){
    highlights=data.data;
  var sql = "CREATE TABLE if not exists highlights (id int auto_increment primary key ,fixtureid int ,location VARCHAR(255),datecreated text)";
  con.query(sql, function (err,result) {
      if (err) throw err;

     var fixid = highlights.map(function (fixture) { return fixture.fixture_id; });

     var name = highlights.map(function (name) { return name.location; });
     var date = highlights.map(function (c) { return c.created_at.date; });


      for (var i = 0; i < fixid.length; i++) {

              var TABLE='highlights';
              con.query('insert into '+ TABLE +' (id, fixtureid, location, datecreated) values ("' +null + '", "' + fixid[i] + '", "' + name[i] + '", "'+date[i]+'")', function (err, results) {
                if (err) throw err;
             })
          }

  })

});
  })
}
function fetchdbdata(){

var sql ='select * from countries';
con.query(sql,function (err,resp) {
    if(err) throw err;

    console.log(JSON.stringify(resp));
})
}

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
    country();
    bookmarkers();
    updatehighlights();
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});
