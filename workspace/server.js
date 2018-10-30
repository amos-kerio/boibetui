

//var databases= require('./client/js/database/test');
var MongoClient = require('mongodb').MongoClient;
var url='mongodb://127.0.0.1:27017/boibetdb';
  var date=new Date();
  var datestring = date.toDateString().replace(/ /g,"_");
  var fixtures=[];
var ltnames=[];
var vtnames=[];
var ltscore=[];
var vtscore=[];

var today=new Date();
var yesterday = new Date(today);
yesterday.setDate(today.getDate()-1);
     month = '' + (yesterday.getMonth() + 1),
        day = '' + yesterday.getDate(),
        year = yesterday.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    var yesterdaydate=[year, month, day].join('-');

const express = require('express');
const mysql=require('mysql');

const app = express();
app.use(express.static(__dirname + 'public'))
var con = mysql.createConnection({
  host: "localhost", // ip address of server running mysql
  user: "root", // user name to your mysql database
  password: "" ,// corresponding password
    database: "boibet"
});

var mydata;
  var tablel1='fixtures'+datestring;
var sql='select * from '+tablel1+' where htvalue<>0.00  limit 10';
con.query(sql, function (err, resp) {
    if (err) throw err;
    mydata= resp;
})


var leaguelist;
var sql='select * from leagues where leagueid in (8,9,12,85,23,24,88) order by name desc limit 20';
con.query(sql, function (err, resp) {
    if (err) throw err;
    leaguelist= resp;
    //console.log(leaguelist);
})

var leagueonedata;
  var table='leagueonefixtures'+datestring;
var sql='select * from '+table+' where htvalue<>0.00 order by date limit 6';
con.query(sql, function (err, resp) {
    if (err) throw err;
    leagueonedata= resp;
})

var livescores;
  var table='livescores'+datestring;
var sql='select * from '+table+' where localteamgoals <> 0 order by visitorteam ';
con.query(sql, function (err, resp) {
    if (err) throw err;
    livescores= resp;
})
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Boibet',users:mydata, leagueone: leagueonedata, livescores:livescores, leagues: leaguelist})
});

app.get('/image', function (req, res) {
    res.render('images');
})
const server = app.listen(7000, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});