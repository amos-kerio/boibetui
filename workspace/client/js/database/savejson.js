var MongoClient = require('mongodb').MongoClient;
var mysql=require('mysql');
var request= require('request');

var con = mysql.createConnection({
  host: "localhost", // ip address of server running mysql
  user: "root", // user name to your mysql database
  password: "" ,// corresponding password
    database: "boibet"
});
var bookmarkers=[];
var countries=[];
var continents=[];
var jsonData=[];
var fixtures=[];
var Soccerama = require('soccerama').Soccerama;
var soccerama = new Soccerama('wIMWFKl2nxNH5M1IhKq0MkCqo2S1zOPWjbee0r5Jnpaq0UWERrP5GovGLucy', 'v2.0');
var url = "mongodb://localhost:27017/boibetdb";
var database='boibetdb';
function addbookmarkes() {
    soccerama.get('bookmakers').then( function(data){
    bookmarkers=data.data;
    console.log('collected');

     MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db(database);
       var allbookmarkers={};
      for (var i=0;i<bookmarkers.length;i++) {
           allbookmarkers[i] =bookmarkers[i];
      }
      var time=new Date();
      var data={time, allbookmarkers};
  dbo.collection("Bookmakers").insertOne(data, function(err, res) {
    if (err) throw err;
    console.log(" document inserteds");
    //db.close();
  });
});

});

}
function addContries(){
    soccerama.get('countries').then( function(data){
    countries=data.data;
    console.log('collected');

     MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db(database);
       var thecountries={};
      for (var i=0;i<countries.length;i++) {
           thecountries[i] =countries[i];
      }
      var time=new Date();
      var data={time, thecountries};
  dbo.collection("Countries").insertOne(data, function(err, res) {
    if (err) throw err;
    console.log(" Countries added");
    //db.close();
  });
});

});
}
function addcontinents(){
    soccerama.get('continents').then( function(resp){
    jsonData=resp.data;
    console.log('continents collected');

     MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db(database);
       var continents={};
      for (var i=0;i<jsonData.length;i++) {
           continents[i] =jsonData[i];
      }
      var time=new Date();
      var validdata={time, continents};
  dbo.collection("Continents").insertOne(validdata, function(err, res) {
    if (err) throw err;
    console.log(" Continents Added");
    //db.close();
  });
});

});
}
function addFixtures(){
var today=new Date();
var yesterday = new Date(today);
yesterday.setDate(today.getDate()-1);
     month = '' + (yesterday.getMonth() + 1),
        day = '' + yesterday.getDate(),
        year = yesterday.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    var date1=[year, month, day].join('-');

    request('https://soccer.sportmonks.com/api/v2.0/fixtures/date/'+date1+'?api_token=wIMWFKl2nxNH5M1IhKq0MkCqo2S1zOPWjbee0r5Jnpaq0UWERrP5GovGLucy&leagues=5,8,9,12,14,20,23,24,27,30,32,35,38,42,82,85,175&include=localTeam,visitorTeam,flatOdds',
        { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
    fixtures=body.data;
console.log(fixtures);
     MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db(database);
       var fixture={};
      for (var i=0;i<fixtures.length;i++) {
           fixture[i] = fixtures[i];
      }
      var time=new Date();
      var validdata={time, fixture};
  dbo.collection("Fixtures"+date1).insert(validdata, function(err, res) {
    if (err) throw err;
    console.log(" Fixtures Added");
    //db.close();
  });
});

});
}
function addhighlights(){
     soccerama.get('highlights').then( function(resp){
    var highlightsdata=resp.data;
    console.log('Highlights collected');

     MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db(database);
       var highlights={};
      for (var i=0;i<highlightsdata.length;i++) {
           highlights[i] =highlightsdata[i];
      }
      var time=new Date();
      var validdata={time, highlights};
  dbo.collection("Highlights").insertOne(validdata, function(err, res) {
    if (err) throw err;
    console.log(" Highlights Added");
    //db.close();
  });
});

});
}
function addLeagues(){
     soccerama.get('leagues').then( function(resp){
    var legdata=resp.data;
    console.log('Leagues collected');

     MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db(database);
       var leagues={};
      for (var i=0;i<legdata.length;i++) {
           leagues[i] =legdata[i];
      }
      var time=new Date();
      var validdata={time, leagues};
  dbo.collection("Leagues").insertOne(validdata, function(err, res) {
    if (err) throw err;
    console.log(" Leagues Added");
    //db.close();
  });
});

});
}
function addSeasons(){
     soccerama.get('seasons').then( function(resp){
    var seasondata=resp.data;
    console.log('Seasons collected');

     MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db(database);
       var seasons={};
      for (var i=0;i<seasondata.length;i++) {
           seasons[i] =seasondata[i];
      }
      var time=new Date();
      var validdata={time, seasons};
  dbo.collection("Seasons").insertOne(validdata, function(err, res) {
    if (err) throw err;
    console.log(" Seasons Added");
    //db.close();
  });
});

});
}
function addMarkets(){
     soccerama.get('markets').then( function(resp){
    var mktdata=resp.data;
    console.log('Markets collected');

     MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db(database);
       var markets={};
      for (var i=0;i<mktdata.length;i++) {
           markets[i] =mktdata[i];
      }
      var time=new Date();
      var validdata={time, markets};
  dbo.collection("Markets").insertOne(validdata, function(err, res) {
    if (err) throw err;
    console.log(" Markets Added");
    //db.close();
  });
});

});
}
function addlivescores() {
     soccerama.get('livescores').then( function(resp){
    var lsdata=resp.data;
    console.log('Livescores collected');

     MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db(database);
       var livescores={};
      for (var i=0;i<lsdata.length;i++) {
           livescores[i] =lsdata[i];
      }
      var time=new Date();
      var validdata={time, livescores};
  dbo.collection("Livescores").insertOne(validdata, function(err, res) {
    if (err) throw err;
    console.log(" Livescores Added");
    //db.close();
  });
});

});
}
function saveFixtures(){
    soccerama.get('fixtures/date/{date}',{date:'2018-10-24',localTeam:true, visitorTeam:true, flatOdds:true}).then( function(data){
    fixtures=data.data;

    // connect to the database.
con.connect(function(err) {
  if (err) throw err;
  var date=new Date();
  var datestring = date.toDateString().replace(/ /g,"_");;
  var table='fixtures'+datestring;
  var sql = "CREATE TABLE if not exists "+table+" (fixtureid int,leagueid int,seasonid int,localteamid int, visitorteamid int,localteam VARCHAR(255),visitorteam text,htvalue DECIMAL (4, 2) ,drawvalue DECIMAL (4, 2) ,vtvalue DECIMAL (4, 2), primary key (fixtureid))";
  con.query(sql, function (err,result) {
      if (err) throw err;
     var fixid = fixtures.map(function (fixture) { return fixture.id; });
       var leagueid = fixtures.map(function (fixture) { return fixture.league_id; });
          var seasonid = fixtures.map(function (fixture) { return fixture.season_id; });
      var lt = fixtures.map(function (local) { return local.localTeam.data.name; });
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

                           con.query('insert into '+ table +' (fixtureid,leagueid,seasonid,localteamid,visitorteamid ,localteam, visitorteam,htvalue,drawvalue,vtvalue) values ("' + fixid[n] + '", "' +leagueid[n] + '", "' +seasonid[n]+ '", "' +ltid[n]+ '", "' +vtid[n]+'", "' + lt[n] + '", "'+vt[n]+'", "' + x1+'", "' + x2+'", "' + x3+'")', function (err, results) {
                             if (err) throw err;

                          })
                       }

                           console.log("Values Inserted!");



});
            });
});
}
function savepremierleaguefix(){
  soccerama.get('fixtures/between/{from}/{to}',{from:'2018-10-25',to:'2018-10-31',localTeam:true, visitorTeam:true, flatOdds:true}).then( function(data){
    fixtures=data.data;

    // connect to the database.
con.connect(function(err) {
  if (err) throw err;
  var date=new Date();
  var datestring = date.toDateString().replace(/ /g,"_");;
  var table='plfixtures'+datestring;
  var sql = "CREATE TABLE if not exists "+table+" (fixtureid int,leagueid int,seasonid int,localteamid int, visitorteamid int,localteam VARCHAR(255),visitorteam text,htvalue DECIMAL (4, 2) ,drawvalue DECIMAL (4, 2) ,vtvalue DECIMAL (4, 2), primary key (fixtureid))";
  con.query(sql, function (err,result) {
      if (err) throw err;
     var fixid = fixtures.map(function (fixture) { return fixture.id; });
       var leagueid = fixtures.map(function (fixture) { return fixture.league_id; });
          var seasonid = fixtures.map(function (fixture) { return fixture.season_id; });
      var lt = fixtures.map(function (local) { return local.localTeam.data.name; });
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

                           con.query('insert into '+ table +' (fixtureid,leagueid,seasonid,localteamid,visitorteamid ,localteam, visitorteam,htvalue,drawvalue,vtvalue) values ("' + fixid[n] + '", "' +leagueid[n] + '", "' +seasonid[n]+ '", "' +ltid[n]+ '", "' +vtid[n]+'", "' + lt[n] + '", "'+vt[n]+'", "' + x1+'", "' + x2+'", "' + x3+'")', function (err, results) {
                             if (err) throw err;

                          })
                       }

                           console.log("Values Inserted!");



});
            });
});
}
//addbookmarkes();
//addContries();
//addcontinents();
addFixtures();
//addhighlights();
//addLeagues();
//addSeasons();
//addMarkets();
//addlivescores();
//saveFixtures();
//savepremierleaguefix();