var url='mongodb://127.0.0.1:27017/boibetdb'
var MongoClient = require('mongodb').MongoClient;
 MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("boibetdb");
  dbo.createCollection("Bookmakers", function(err, res) {
    if (err) throw err;

    });
     dbo.createCollection("Countries", function (err,res) {
        if (err) throw err;

  });
  dbo.createCollection("Continents", function (err,res) {
            if (err) throw err;
        });
     dbo.createCollection("Leagues", function (err,res) {
            if (err) throw err;
        });
     dbo.createCollection("Seasons", function (err,res) {
            if (err) throw err;
        });
     dbo.createCollection("Highlights", function (err,res) {
            if (err) throw err;
        });
     dbo.createCollection("Livescores", function (err,res) {
            if (err) throw err;
        });
     dbo.createCollection("Fixtures", function (err,res) {
            if (err) throw err;

        });
     dbo.createCollection("Markets", function (err,res) {
            if (err) throw err;
      console.log("Collections Created")
        });

});
var savedata =require('./savejson');