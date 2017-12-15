var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "user_data"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM users", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});

// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/mydb";
//
// // MongoClient.connect(url, function(err, db) {
// //   if (err) throw err;
// //   console.log("Database created!");
// //   db.close();
// // });
//
// // MongoClient.connect(url, function(err, db) {
// //   if (err) throw err;
// //   db.createCollection("customers", function(err, res) {
// //     if (err) throw err;
// //     console.log("Collection created!");
// //     db.close();
// //   });
// // });
//
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var myobj = { name: "Company Inc", address: "Highway 37" };
//   db.collection("customers").insertOne(myobj, function(err, res) {
//     if (err) throw err;
//     console.log("1 document inserted");
//     db.close();
//   });
// });
