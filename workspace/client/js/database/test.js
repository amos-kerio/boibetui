const request = require('request');
var fixtures=[];

var mysql=require('mysql');
var con = mysql.createConnection({
  host: "localhost", // ip address of server running mysql
  user: "root", // user name to your mysql database
  password: "" ,// corresponding password
    database: "boibet"
});
function premierleague() {
    request('https://soccer.sportmonks.com/api/v2.0/fixtures/between/2018-10-25/2018-11-30?api_token=wIMWFKl2nxNH5M1IhKq0MkCqo2S1zOPWjbee0r5Jnpaq0UWERrP5GovGLucy&leagues=8&include=localTeam,visitorTeam,flatOdds',
        { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  //console.log(body.data);;
    fixtures=body.data;
  var date=new Date();
  var datestring = date.toDateString().replace(/ /g,"_");
  var table='premierleaguefixtures'+datestring;
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

function leagueone() {
    request('https://soccer.sportmonks.com/api/v2.0/fixtures/between/2018-10-25/2018-11-30?api_token=wIMWFKl2nxNH5M1IhKq0MkCqo2S1zOPWjbee0r5Jnpaq0UWERrP5GovGLucy&leagues=12&include=localTeam,visitorTeam,flatOdds',
        { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  //console.log(body.data);;
    fixtures=body.data;
  var date=new Date();
  var datestring = date.toDateString().replace(/ /g,"_");
  var table='leagueonefixtures'+datestring;
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
     request('https://soccer.sportmonks.com/api/v2.0/fixtures/between/2018-10-25/2018-11-30?api_token=wIMWFKl2nxNH5M1IhKq0MkCqo2S1zOPWjbee0r5Jnpaq0UWERrP5GovGLucy&leagues=2&include=localTeam,visitorTeam,flatOdds',
        { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  //console.log(body.data);;
    fixtures=body.data;

  var date=new Date();
  var datestring = date.toDateString().replace(/ /g,"_");
  var table='championsleaguefixtures'+datestring;
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
    request('https://soccer.sportmonks.com/api/v2.0/fixtures/between/2018-10-25/2018-11-30?api_token=wIMWFKl2nxNH5M1IhKq0MkCqo2S1zOPWjbee0r5Jnpaq0UWERrP5GovGLucy&leagues=14&include=localTeam,visitorTeam,flatOdds',
        { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  //console.log(body.data);;
    fixtures=body.data;

  var date=new Date();
  var datestring = date.toDateString().replace(/ /g,"_");
  var table='leaguetwofixtures'+datestring;
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
       request('https://soccer.sportmonks.com/api/v2.0/livescores?api_token=wIMWFKl2nxNH5M1IhKq0MkCqo2S1zOPWjbee0r5Jnpaq0UWERrP5GovGLucy&include=localTeam,visitorTeam',
        { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  //console.log(body.data);;
    fixtures=body.data;

  var date=new Date();
  var datestring = date.toDateString().replace(/ /g,"_");
  var table='leaguetwofixtures'+datestring;
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
//leagueone();
//championsleague();
premierleague();
leaguetwo();