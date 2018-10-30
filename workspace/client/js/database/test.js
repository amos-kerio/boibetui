const request = require('request');
var livescore=[];
var leagues=[];
var mysql=require('mysql');
var token='1HIWV1BjmPtmSOMzwSKRJHyQY2iAat4sGMD6NwNNMZhzgspMyNP7bx43Srlj';
var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    var datetoday=[year, month, day].join('-');
var con = mysql.createConnection({
  host: "localhost", // ip address of server running mysql
  user: "root", // user name to your mysql database
  password: "" ,// corresponding password
    database: "boibet"
});
function premierleague() {
/*
* league 1 table
*  h3(style={color:'#fff'})  League One Fixtures
                                        table(class="table table-dark table-hover")
                                            tr
                                                th
                                                th
                                                th
                                                th(style={color:"yellow"}) Home
                                                th(style={color:"yellow"}) Draw
                                                th(style={color:"yellow"}) Away
                                            each leagues in leagueone
                                             tr
                                                 td !{leagues.date}
                                                 td !{leagues.localteam}
                                                 td !{leagues.visitorteam}
                                                 td !{leagues.htvalue}
                                                 td(style={color:"yellow"}) !{leagues.drawvalue}
                                                 td !{leagues.vtvalue}*/
  var date=new Date();
  var datestring = date.toDateString().replace(/ /g,"_");
  var table='premierleaguefixtures'+datestring;
    con.query('drop table if exists '+table,function (err,res) {
        if (err)throw  err;
    })
    request('https://soccer.sportmonks.com/api/v2.0/fixtures/between/'+datetoday+'/2018-11-30?api_token='+token+'&leagues=8&include=localTeam,visitorTeam,flatOdds',
        { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  //console.log(body.data);;
    fixtures=body.data;
  var sql = "CREATE TABLE if not exists "+table+" (fixtureid int,leagueid int,seasonid int,localteamid int, visitorteamid int,`date` text,localteam VARCHAR(255),visitorteam text,htvalue DECIMAL (4, 2) ,drawvalue DECIMAL (4, 2) ,vtvalue DECIMAL (4, 2), primary key (fixtureid))";
  con.query(sql, function (err,result) {
      if (err) throw err;
     var fixid = fixtures.map(function (fixture) { return fixture.id; });
       var leagueid = fixtures.map(function (fixture) { return fixture.league_id; });
          var seasonid = fixtures.map(function (fixture) { return fixture.season_id; });
      var lt = fixtures.map(function (local) { return local.localTeam.data.name; });
         var startdate = fixtures.map(function (sdate) { return sdate.time.starting_at.date; });
       var ltid = fixtures.map(function (local) { return local.localTeam.data.id; });
       var vt = fixtures.map(function (visitor) { return visitor.visitorTeam.data.name; });
        var vtid = fixtures.map(function (visitor) { return visitor.visitorTeam.data.id; });
     var odds = fixtures.map(function (odds) { return odds.flatOdds.data });

            for (var n=0;n<odds.length;n++) {
                var object = odds[n];
                var books = object[0];

                var x1,x2,x3;
                for (var x=0;x<15; ++x){
                    if (typeof(books)=='undefined') {
                     //console.log("No values")
                       x1 = 0;
                     x2=0;
                     x3=0
                    }
                    else {
                        var mb = books.odds;
                        x1 = mb[0].value;
                        x2 = mb[1].value;
                        x3 = mb[2].value;
                    }
                }
                console.log(x1+ " X "+x2+"  "+x3);

                           con.query('insert into '+ table +' (fixtureid,leagueid,seasonid,localteamid,visitorteamid ,`date`,localteam, visitorteam,htvalue,drawvalue,vtvalue) values ("' + fixid[n] + '", "' +leagueid[n] + '", "' +seasonid[n]+ '", "' +ltid[n]+ '", "' +vtid[n]+'", "'+startdate[n] +'", "'+ lt[n] + '", "'+vt[n]+'", "' + x1+'", "' + x2+'", "' + x3+'")', function (err, results) {
                             if (err) throw err;

                          })
                       }

                           console.log("Values Inserted!");



});
});
}
function theleagues() {
      request('https://soccer.sportmonks.com/api/v2.0/leagues?api_token='+token,
        { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  console.log(body.data);;
    leagues=body.data;
  var table='leagues';
  var sql = "CREATE TABLE if not exists "+table+" (leagueid int,countryid int,name VARCHAR(255), primary key (leagueid))";
  con.query(sql, function (err,result) {
      if (err) throw err;
      var legid = leagues.map(function (fixture) {
          return fixture.id;
      });
        var countryid = leagues.map(function (fixture) {
          return fixture.country_id;
      });
      var name = leagues.map(function (fixture) {
          return fixture.name;
      });
      for (var n = 0; n < leagues.length; n++) {
          con.query('insert into ' + table + ' (leagueid,countryid,name) values ("' + legid[n] + '", "' +countryid[n]+ '", "' +name[n] + '")', function (err, results) {
              if (err) throw err;

          })
      }
  });

                           console.log("Values Inserted!");



});

}
function leagueone() {
      var date=new Date();
  var datestring = date.toDateString().replace(/ /g,"_");
  var table='leagueonefixtures'+datestring;
  con.query('drop table if exists '+table, function (err) {
      if (err) throw err;
  });
    request('https://soccer.sportmonks.com/api/v2.0/fixtures/between/'+datetoday+'/2018-11-30?api_token='+token+'&leagues=12&include=localTeam,visitorTeam,flatOdds',
        { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  //console.log(body.data);;
    fixtures=body.data;

  var sql = "CREATE TABLE if not exists "+table+" (fixtureid int,leagueid int,seasonid int,localteamid int, visitorteamid int,`date` text,localteam VARCHAR(255),visitorteam text,htvalue DECIMAL (4, 2) ,drawvalue DECIMAL (4, 2) ,vtvalue DECIMAL (4, 2), primary key (fixtureid))";
  con.query(sql, function (err,result) {
      if (err) throw err;
     var fixid = fixtures.map(function (fixture) { return fixture.id; });
       var leagueid = fixtures.map(function (fixture) { return fixture.league_id; });
          var seasonid = fixtures.map(function (fixture) { return fixture.season_id; });
      var lt = fixtures.map(function (local) { return local.localTeam.data.name; });
         var startdate = fixtures.map(function (sdate) { return sdate.time.starting_at.date; });
       var ltid = fixtures.map(function (local) { return local.localTeam.data.id; });
       var vt = fixtures.map(function (visitor) { return visitor.visitorTeam.data.name; });
        var vtid = fixtures.map(function (visitor) { return visitor.visitorTeam.data.id; });
     var odds = fixtures.map(function (odds) { return odds.flatOdds.data });

            for (var n=0;n<odds.length;n++) {
                var object = odds[n];
                var books = object[0];

                var x1,x2,x3;
                for (var x=0;x<15; ++x){
                    if (typeof(books)=='undefined') {
                     //console.log("No values")
                       x1 = 0;
                     x2=0;
                     x3=0
                    }
                    else {
                        var mb = books.odds;
                        x1 = mb[0].value;
                        x2 = mb[1].value;
                        x3 = mb[2].value;
                    }
                }
                console.log(x1+ " X "+x2+"  "+x3);

                           con.query('insert into '+ table +' (fixtureid,leagueid,seasonid,localteamid,visitorteamid ,`date`,localteam, visitorteam,htvalue,drawvalue,vtvalue) values ("' + fixid[n] + '", "' +leagueid[n] + '", "' +seasonid[n]+ '", "' +ltid[n]+ '", "' +vtid[n]+'", "'+startdate[n] +'", "'+ lt[n] + '", "'+vt[n]+'", "' + x1+'", "' + x2+'", "' + x3+'")', function (err, results) {
                             if (err) throw err;

                          })
                       }

                           console.log("Values Inserted!");



});
            });

}
function championsleague(){

  var date=new Date();
  var datestring = date.toDateString().replace(/ /g,"_");
  var table='championsleaguefixtures'+datestring;
  con.query('drop table if exists ' + table, function (err) {
      if (err) throw err;
  });
     request('https://soccer.sportmonks.com/api/v2.0/fixtures/between/'+datetoday+'/2018-11-30?api_token='+token+'&leagues=2&include=localTeam,visitorTeam,flatOdds',
        { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  //console.log(body.data);;
    fixtures=body.data;

  var sql = "CREATE TABLE if not exists "+table+" (fixtureid int,leagueid int,seasonid int,localteamid int, visitorteamid int,`date` text,localteam VARCHAR(255),visitorteam text,htvalue DECIMAL (4, 2) ,drawvalue DECIMAL (4, 2) ,vtvalue DECIMAL (4, 2), primary key (fixtureid))";
  con.query(sql, function (err,result) {
      if (err) throw err;
     var fixid = fixtures.map(function (fixture) { return fixture.id; });
       var leagueid = fixtures.map(function (fixture) { return fixture.league_id; });
          var seasonid = fixtures.map(function (fixture) { return fixture.season_id; });
      var lt = fixtures.map(function (local) { return local.localTeam.data.name; });
         var startdate = fixtures.map(function (sdate) { return sdate.time.starting_at.date; });
       var ltid = fixtures.map(function (local) { return local.localTeam.data.id; });
       var vt = fixtures.map(function (visitor) { return visitor.visitorTeam.data.name; });
        var vtid = fixtures.map(function (visitor) { return visitor.visitorTeam.data.id; });
     var odds = fixtures.map(function (odds) { return odds.flatOdds.data });

            for (var n=0;n<odds.length;n++) {
                var object = odds[n];
                var books = object[0];

                var x1,x2,x3;
                for (var x=0;x<15; ++x){
                    if (typeof(books)=='undefined') {
                     //console.log("No values")
                       x1 = 0;
                     x2=0;
                     x3=0
                    }
                    else {
                        var mb = books.odds;
                        x1 = mb[0].value;
                        x2 = mb[1].value;
                        x3 = mb[2].value;
                    }
                }
                console.log(x1+ " X "+x2+"  "+x3);

                           con.query('insert into '+ table +' (fixtureid,leagueid,seasonid,localteamid,visitorteamid ,`date`,localteam, visitorteam,htvalue,drawvalue,vtvalue) values ("' + fixid[n] + '", "' +leagueid[n] + '", "' +seasonid[n]+ '", "' +ltid[n]+ '", "' +vtid[n]+'", "'+startdate[n] +'", "'+ lt[n] + '", "'+vt[n]+'", "' + x1+'", "' + x2+'", "' + x3+'")', function (err, results) {
                             if (err) throw err;

                          })
                       }

                           console.log("Values Inserted!");



});
});

}
function leaguetwo(){

  var date=new Date();
  var datestring = date.toDateString().replace(/ /g,"_");
  var table='leaguetwofixtures'+datestring;
  con.query('drop table if exists '+table, function (err) {
      if (err) throw err;
  });
    request('https://soccer.sportmonks.com/api/v2.0/fixtures/between/'+datetoday+'/2018-11-30?api_token='+token+'&leagues=14&include=localTeam,visitorTeam,flatOdds',
        { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  //console.log(body.data);;
    fixtures=body.data;

  var sql = "CREATE TABLE if not exists "+table+" (fixtureid int,leagueid int,seasonid int,localteamid int, visitorteamid int,`date` text,localteam VARCHAR(255),visitorteam text,htvalue DECIMAL (4, 2) ,drawvalue DECIMAL (4, 2) ,vtvalue DECIMAL (4, 2), primary key (fixtureid))";
  con.query(sql, function (err,result) {
      if (err) throw err;
     var fixid = fixtures.map(function (fixture) { return fixture.id; });
       var leagueid = fixtures.map(function (fixture) { return fixture.league_id; });
          var seasonid = fixtures.map(function (fixture) { return fixture.season_id; });
      var lt = fixtures.map(function (local) { return local.localTeam.data.name; });
         var startdate = fixtures.map(function (sdate) { return sdate.time.starting_at.date; });
       var ltid = fixtures.map(function (local) { return local.localTeam.data.id; });
       var vt = fixtures.map(function (visitor) { return visitor.visitorTeam.data.name; });
        var vtid = fixtures.map(function (visitor) { return visitor.visitorTeam.data.id; });
     var odds = fixtures.map(function (odds) { return odds.flatOdds.data });

            for (var n=0;n<odds.length;n++) {
                var object = odds[n];
                var books = object[0];

                var x1,x2,x3;
                for (var x=0;x<15; ++x){
                    if (typeof(books)=='undefined') {
                     //console.log("No values")
                       x1 = 0;
                     x2=0;
                     x3=0
                    }
                    else {
                        var mb = books.odds;
                        x1 = mb[0].value;
                        x2 = mb[1].value;
                        x3 = mb[2].value;
                    }
                }
                console.log(x1+ " X "+x2+"  "+x3);

                           con.query('insert into '+ table +' (fixtureid,leagueid,seasonid,localteamid,visitorteamid ,`date`,localteam, visitorteam,htvalue,drawvalue,vtvalue) values ("' + fixid[n] + '", "' +leagueid[n] + '", "' +seasonid[n]+ '", "' +ltid[n]+ '", "' +vtid[n]+'", "'+startdate[n] +'", "'+ lt[n] + '", "'+vt[n]+'", "' + x1+'", "' + x2+'", "' + x3+'")', function (err, results) {
                             if (err) throw err;

                          })
                       }

                           console.log("Values Inserted!");



});
});


}
function livescores(){

  var date=new Date();
  var datestring = date.toDateString().replace(/ /g,"_");
  var table='livescores'+datestring;
       request('https://soccer.sportmonks.com/api/v2.0/livescores?api_token='+token+'&include=localTeam,visitorTeam',
        { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  //console.log(body.data);;
    livescore=body.data;

  var sql = "CREATE TABLE if not exists "+table+" (livescoreid int,localteamid int, visitorteamid int,`date` text,localteam VARCHAR(255),visitorteam text,localteamgoals  int ,visitorteamgoals int , primary key (livescoreid))";
  con.query(sql, function (err,result) {
      if (err) throw err;
     var id = livescore.map(function (ls) { return ls.id; });
       var leagueid = livescore.map(function (league) { return league.league_id; });
          var seasonid = livescore.map(function (sn) { return sn.season_id; });
      var lt = livescore.map(function (local) { return local.localTeam.data.name; });
         var startdate = livescore.map(function (sdate) { return sdate.time.starting_at.date; });
       var ltid = livescore.map(function (local) { return local.localTeam.data.id; });
       var vt = livescore.map(function (visitor) { return visitor.visitorTeam.data.name; });
        var vtid = livescore.map(function (visitor) { return visitor.visitorTeam.data.id; });
        var ltcsore=livescore.map(function (ltscore) { return ltscore.scores.localteam_score; });
        var vtscore=livescore.map(function (vts) { return vts.scores.visitorteam_score; });
for ( var n =0; n<livescore.length;++n) {

    con.query('insert into ' + table + ' (livescoreid,localteamid,visitorteamid ,`date`,localteam, visitorteam,localteamgoals,visitorteamgoals) values ("' + id[n] + '", "' + ltid[n] + '", "' + vtid[n] + '", "' + startdate[n] + '", "' + lt[n] + '", "' + vt[n] + '", "' + ltcsore[n] + '", "' + vtscore[n] + '")', function (err, results) {
        if (err) throw err;

    })
}
                       });



                           console.log("Values Inserted!");



});
}
function fixturestoday() {
      request('https://soccer.sportmonks.com/api/v2.0/fixtures/date/'+datetoday+'?api_token='+token+'&leagues=5,8,9,12,14,20,23,24,27,30,32,35,38,42,82,85,175&include=localTeam,visitorTeam,flatOdds',
        { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  //console.log(body.data);;
    fixtures=body.data;

  var date=new Date();
  var datestring = date.toDateString().replace(/ /g,"_");
  var table='fixtures'+datestring;
  var sql = "CREATE TABLE if not exists "+table+" (fixtureid int,leagueid int,seasonid int,localteamid int, visitorteamid int,`time` text,localteam VARCHAR(255),visitorteam text,htvalue DECIMAL (4, 2) ,drawvalue DECIMAL (4, 2) ,vtvalue DECIMAL (4, 2), primary key (fixtureid))";
  con.query(sql, function (err,result) {
      if (err) throw err;
     var fixid = fixtures.map(function (fixture) { return fixture.id; });
       var leagueid = fixtures.map(function (fixture) { return fixture.league_id; });
          var seasonid = fixtures.map(function (fixture) { return fixture.season_id; });
      var lt = fixtures.map(function (local) { return local.localTeam.data.name; });
         var startdate = fixtures.map(function (sdate) { return sdate.time.starting_at.date; });
       var ltid = fixtures.map(function (local) { return local.localTeam.data.id; });
       var vt = fixtures.map(function (visitor) { return visitor.visitorTeam.data.name; });
        var vtid = fixtures.map(function (visitor) { return visitor.visitorTeam.data.id; });
     var odds = fixtures.map(function (odds) { return odds.flatOdds.data });
 var timestamp = fixtures.map(function (ts) { return ts.time.starting_at.timestamp });
            for (var n=0;n<odds.length;n++) {
                var object = odds[n];
                var books = object[0];

                var x1,x2,x3;
                for (var x=0;x<15; ++x){
                    if (typeof(books)=='undefined') {
                     //console.log("No values")
                       x1 = 0;
                     x2=0;
                     x3=0
                    }
                    else {
                        var mb = books.odds;
                        x1 = mb[0].value;
                        x2 = mb[1].value;
                        x3 = mb[2].value;
                    }
                }
               var date = new Date(timestamp[n]*1000);

// Hours part from the timestamp
var hours = date.getHours();
// Minutes part from the timestamp
var minutes = "0" + date.getMinutes();

// Will display time in 10:30:23 format
var formattedTime = hours + ':' + minutes.substr(-2);
console.log(formattedTime);
                           con.query('insert into '+ table +' (fixtureid,leagueid,seasonid,localteamid,visitorteamid ,`time`,localteam, visitorteam,htvalue,drawvalue,vtvalue) values ("' + fixid[n] + '", "' +leagueid[n] + '", "' +seasonid[n]+ '", "' +ltid[n]+ '", "' +vtid[n]+'", "'+formattedTime +'", "'+ lt[n] + '", "'+vt[n]+'", "' + x1+'", "' + x2+'", "' + x3+'")', function (err, results) {
                             if (err) throw err;

                          })
                       }

                           console.log("Values Inserted!");



});
});

}
leagueone();
championsleague();
premierleague()
leaguetwo();
//fixturestoday();
//livescores();
//theleagues();
var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    var date=[year, month, day].join('-');
    console.log(date);


var today=new Date();
var yesterday = new Date(today);
yesterday.setDate(today.getDate()-1);
     month = '' + (yesterday.getMonth() + 1),
        day = '' + yesterday.getDate(),
        year = yesterday.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    var date1=[year, month, day].join('-');