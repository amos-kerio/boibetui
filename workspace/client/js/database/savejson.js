var MongoClient = require('mongodb').MongoClient;

var bookmarkers=[];
var countries=[];
var continents=[];
var jsonData=[];

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
    soccerama.get('fixtures/between/{from}/{to}',{from:'2018-10-20',to:'2018-10-27',localTeam: true,visitorTeam: true}).then( function(resp){
        var  page= resp.meta.pagination.total_pages;
    jsonData=resp.data;
    console.log('Fixtures collected');
    console.log(page);
     MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db(database);
       var fixtures={};
      for (var i=0;i<jsonData.length;i++) {
           fixtures[i] =jsonData[i];
      }
      var time=new Date();
      var validdata={time, fixtures};
  dbo.collection("Fixtures").insertOne(validdata, function(err, res) {
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
addbookmarkes();
addContries();
addcontinents();
addFixtures();
addhighlights();
addLeagues();
addSeasons();
addMarkets();
addlivescores();