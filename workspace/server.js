

//var databases= require('./client/js/database/createcollections');

  var date=new Date();
  var datestring = date.toDateString().replace(/ /g,"_");

const express = require('express');
const mysql=require('mysql');
const app = express();
var con = mysql.createConnection({
  host: "localhost", // ip address of server running mysql
  user: "root", // user name to your mysql database
  password: "" ,// corresponding password
    database: "boibet"
});

var mydata;
  var tablel1='premierleaguefixtures'+datestring;
var sql='select * from '+tablel1+' where htvalue<>0.00 order by date limit 6 ';
con.query(sql, function (err, resp) {
    if (err) throw err;
    mydata= resp;
})
var leagueonedata;
  var table='leagueonefixtures'+datestring;
var sql='select * from '+table+' where htvalue<>0.00 order by date limit 6';
con.query(sql, function (err, resp) {
    if (err) throw err;
    leagueonedata= resp;
})
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Boibet',users:mydata, leagueone: leagueonedata
  })
});

app.get('/image', function (req, res) {
    res.render('images');
})
const server = app.listen(7000, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});