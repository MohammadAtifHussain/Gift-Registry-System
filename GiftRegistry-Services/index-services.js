var express = require('express');
var app = express();
var https = require('https');
var fs = require('fs');
var bodyParser = require('body-parser');
var compression = require('compression');

app.use(compression({threshold: 0}));
var mysql = require('mysql');
var crypto = require("crypto");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "registry"
});

var con1 = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "registry"
});

con1.connect(function(err) {
    if (err) throw err

});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

https.createServer({
      key: fs.readFileSync('key.pem'),
      cert: fs.readFileSync('cert.pem'),
      passphrase: 'wysiwyg'
    }, app).listen(5051);

var cookieParser = require('cookie-parser')


var getUserDetails = function(username, password){
  var promise = new Promise(function(resolve, reject){
    if(con === null){
      con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "registry"
      });
    }
    con.connect(function(err) {
      if (err) throw err;
      console.log("SELECT * FROM users where Username ='"+username+"' and Pass = '"+password+"'");
      con.query("SELECT * FROM users where Username ='"+username+"' and Pass = '"+password+"'", function (err, result, fields) {
        if (err) throw err;
        resolve(result);
      });
    });
  });
  return promise;

}

var enterUserDetails = function(firstname, lastname,username,email,password){
  var promise = new Promise(function(resolve, reject){
    if(con === null){
      con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "registry"
      });
    }
    con.connect(function(err) {
      if (err) throw err;
      console.log("INSERT INTO users VALUES('"+username+"','"+firstname+"','"+lastname+"','"+password+"','user','"+email+"')");
      con.query("INSERT INTO users VALUES('"+username+"','"+firstname+"','"+lastname+"','"+password+"','user','"+email+"')", function (err, result, fields) {
        if (err) throw err;
        resolve(result);
      });
    });
  });
  return promise;

}

var forgotPassword = function(username){
  var promise = new Promise(function(resolve, reject){
    if(con === null){
      con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "registry"
      });
    }
    con.connect(function(err) {
      if (err) throw err;
      console.log("SELECT * FROM users where Username ='"+username+"'");
      con.query("SELECT * FROM users where Username ='"+username+"'", function (err, result, fields) {
        if (err) throw err;
        resolve(result);
      });
    });
  });
  return promise;

}

var changePassword = function(username, password){
  var promise = new Promise(function(resolve, reject){
    if(con === null){
      con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "registry"
      });
    }
    con.connect(function(err) {
      if (err) throw err;
      console.log("UPDATE users SET Pass='"+password+"' where Username ='"+username+"'");
      con.query("UPDATE users SET Pass='"+password+"' where Username ='"+username+"'", function (err, result, fields) {
        if (err) throw err;
        resolve(result);
      });
    });
  });
  return promise;

}

var viewProfile = function(username){
  var promise = new Promise(function(resolve, reject){
    if(con === null){
      con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "registry"
      });
    }
    con.connect(function(err) {
      if (err) throw err;
      console.log("SELECT * FROM users WHERE username='"+username+"'");
      con.query("SELECT * FROM users WHERE username='"+username+"'", function (err, result, fields) {
        if (err) throw err;
        resolve(result);
      });
    });
  });
  return promise;

}

var editProfile = function(username,firstname,lastname,email){
  var promise = new Promise(function(resolve, reject){
    if(con === null){
      con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "registry"
      });
    }
    con.connect(function(err) {
      if (err) throw err;
      console.log("UPDATE users SET firstname='"+firstname+"' ,lastname='"+lastname+"' ,Email_Id='"+email+"' where Username='"+username+"'");
      con.query("UPDATE users SET firstname='"+firstname+"' ,lastname='"+lastname+"' ,Email_Id='"+email+"' where Username='"+username+"'", function (err, result, fields) {
        if (err) throw err;
        resolve(result);
      });
    });
  });
  return promise;

}

var getCatalogDetails = function(username, password){
  var promise = new Promise(function(resolve, reject){
    if(con === null){
      con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "registry"
      });
    }
    con.connect(function(err) {
      if (err) throw err;
      console.log("SELECT * FROM catalog");
      con.query("SELECT * FROM catalog", function (err, result, fields) {
        if (err) throw err;
        resolve(result);
      });
    });
  });
  return promise;

}

var enterItemInCatalog = function(name, category, brand, price, color){
  var promise = new Promise(function(resolve, reject){
    if(con === null){
      con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "registry"
      });
    }
    con.connect(function(err) {
      if (err) throw err;
      console.log("INSERT INTO catalog VALUES(DEFAULT,'"+name+"','"+category+"','"+brand+"',"+price+",'"+color+"')");
      con.query("INSERT INTO catalog VALUES(DEFAULT,'"+name+"','"+category+"','"+brand+"',"+price+",'"+color+"')", function (err, result, fields) {
        if (err) throw err;
        resolve(result);
      });
    });
  });
  return promise;

}

var updateItemInCatalog = function(id, name, category, brand, price, color){
  var promise = new Promise(function(resolve, reject){
    if(con === null){
      con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "registry"
      });
    }
    con.connect(function(err) {
      if (err) throw err;
      console.log("UPDATE catalog SET ProductName='"+name+"' ,ProductCategory='"+category+"' ,ProductBrand='"+brand+"' ,ProductPrice="+price+" ,ProductColor='"+color+"' where ProductId="+id);
      con.query("UPDATE catalog SET ProductName='"+name+"' ,ProductCategory='"+category+"' ,ProductBrand='"+brand+"' ,ProductPrice="+price+" ,ProductColor='"+color+"' where ProductId="+id, function (err, result, fields) {
        if (err) throw err;
        resolve(result);
      });
    });
  });
  return promise;

}

var deleteItemInCatalog = function(id){
  var promise = new Promise(function(resolve, reject){
    if(con === null){
      con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "registry"
      });
    }
    con.connect(function(err) {
      if (err) throw err;
      console.log("DELETE FROM catalog WHERE ProductId="+id);
      con.query("DELETE FROM catalog WHERE ProductId='"+id+"'", function (err, result, fields) {
        if (err) throw err;
        resolve(result);
      });
    });
  });
  return promise;

}

var enterRegistryItem = function(username,id,name,category,brand,price,color){
  var promise = new Promise(function(resolve, reject){
    if(con === null){
      con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "registry"
      });
    }
    con.connect(function(err) {
      if (err) throw err;
      console.log("INSERT INTO userregistry VALUES('"+username+"',"+id+",'"+name+"','"+category+"','"+brand+"',"+price+",'"+color+"','None')");
      con.query("INSERT INTO userregistry VALUES('"+username+"',"+id+",'"+name+"','"+category+"','"+brand+"',"+price+",'"+color+"','None')", function (err, result, fields) {
        if (err) throw err;
        resolve(result);
      });
    });
  });
  return promise;

}

var deleteRegistryItem= function(id){
  var promise = new Promise(function(resolve, reject){
    if(con === null){
      con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "registry"
      });
    }
    con.connect(function(err) {
      if (err) throw err;
      console.log("DELETE FROM userregistry WHERE ProductId="+id);
      con.query("DELETE FROM userregistry WHERE ProductId="+id, function (err, result, fields) {
        if (err) throw err;
        resolve(result);
      });
    });
  });
  return promise;

}

var viewRegistry= function(username){
  var promise = new Promise(function(resolve, reject){
    if(con === null){
      con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "registry"
      });
    }
    con.connect(function(err) {
      if (err) throw err;
      console.log("SELECT * FROM userregistry WHERE username='"+username+"'");
      con.query("SELECT * FROM userregistry WHERE username='"+username+"'", function (err, result, fields) {
        if (err) throw err;
        resolve(result);
      });
    });
  });
  return promise;

}
/*
var shareRegistryPublic= function(myusername,friendusername){
  var promise = new Promise(function(resolve, reject){
    if(con === null){
      con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "registry"
      });
    }
    con.connect(function(err) {
      if (err) throw err;
      console.log("INSERT INTO share VALUES('"+myusername+"','"+friendusername+"')");
      con.query("INSERT INTO share VALUES('"+myusername+"','"+friendusername+"')", function (err, result, fields) {
        if (err) throw err;
        resolve(result);
      });
    });
  });
  return promise;

}
*/
var selectFriendRegistry= function(friendusername){
  var promise = new Promise(function(resolve, reject){
    if(con === null){
      con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "registry"
      });
    }
    con.connect(function(err) {
      if (err) throw err;
      console.log("SELECT myusername from share where friendusername='"+friendusername+"'");
      con.query("SELECT myusername from share where friendusername='"+friendusername+"'", function (err, result, fields) {
        if (err) throw err;
        resolve(result);
      });
    });
  });
  return promise;

}

var viewFriendRegistry= function(username){
  var promise = new Promise(function(resolve, reject){
    if(con === null){
      con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "registry"
      });
    }
    console.log("SELECT * from userregistry where username='"+username+"'");
    con1.query("SELECT * from userregistry where username='"+username+"'", function (err, result, fields) {
      if (err) throw err;
      resolve(result);
    });
  });
  return promise;

}

var assignItem= function(username,friendusername,id){
  var promise = new Promise(function(resolve, reject){
    if(con === null){
      con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "registry"
      });
    }
    console.log("UPDATE USERREGISTRY SET purchaser='"+friendusername+"' where username='"+username+"' and ProductId="+id+"");
    con1.query("UPDATE USERREGISTRY SET purchaser='"+friendusername+"' where username='"+username+"' and ProductId="+id+"", function (err, result, fields) {
      if (err) throw err;
      resolve(result);
    });
  });
  return promise;

}

var sharePublic= function(){
  var promise = new Promise(function(resolve, reject){
    if(con === null){
      con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "registry"
      });
    }
    console.log("'"+friendusername+"' where username='"+username+"' and ProductId="+id+"");
    con1.query("UPDATE USERREGISTRY SET purchaser='"+friendusername+"' where username='"+username+"' and ProductId="+id+"", function (err, result, fields) {
      if (err) throw err;
      resolve(result);
    });
  });
  return promise;

}

var token = null;
var counter = 0;

app.post('/submit', function(req, res){

    //token =  crypto.randomBytes(10).toString('hex');
    var unirest = require("unirest");
    https://localhost:5052/submit-microservice?username="+req.query.username+"&password="+req.query.password
    var unirestreq = unirest("POST", "https://localhost:5052/submit-microservice?username="+req.query.username+"&password="+req.query.password);

    unirestreq.headers({
      "postman-token": "d6014a1f-6a10-8999-b3f1-e52f94432bc6",
      "cache-control": "no-cache",
      "content-type": "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW"
    });

    unirestreq.strictSSL(false).end(function (unirestres) {
      if (unirestres.error) throw new Error(unirestres.error);
      res.format({
           'application/json': function(){
             if(unirestres.body.Role){

               token =  crypto.randomBytes(10).toString('hex');
               unirestres.body.token = token;
             }
             else{
               token=null;
            }
              counter = 0;
              res.send(unirestres.body);

           }
         });
      console.log(res.body);
    });

});

app.post('/signup', function(req, res){

  // if(req.query.token!=token){
  //   console.log("Token not found. ");
  //   res.format({
  //        'application/json': function(){
  //           var response1 = {"string":"User not authenticated." };
  //           res.send(response1);
  //        }
  //      });
  // }
  // else{
  var unirest = require("unirest");
  var unirestreq = unirest("POST", "https://localhost:5052/signup-microservice?username="+req.query.username+"&password="+req.query.password+"&firstname="+req.query.firstname+"&lastname="+req.query.lastname+"&email="+req.query.email);

  unirestreq.headers({
    "postman-token": "d6014a1f-6a10-8999-b3f1-e52f94432bc6",
    "cache-control": "no-cache",
    "content-type": "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW"
  });

  unirestreq.strictSSL(false).end(function (unirestres) {
    if (unirestres.error) throw new Error(runirestes.error);
    res.format({
         'application/json': function(){
            res.send(unirestres.body);
         }
       });
    console.log(unirestres.body);
  });
  //
  //
  // var request = require("request");
  //
  // var options = { method: 'POST',
  //   url: "https://localhost:5052/signup-microservice?username="+req.query.username+"&password="+req.query.password+"&firstname="+req.query.firstname+"&lastname="+req.query.lastname+"&email="+req.query.email,
  //   headers:
  //    { 'postman-token': 'c05b3647-8e39-a742-b797-4aeff1fc8d23',
  //      'cache-control': 'no-cache',
  //      'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' }};
  //
  // request(options, function (error, response, body) {
  //   if (error) throw new Error(error);
  //   res.format({
  //    'application/json': function(){
  //       res.send(body);
  //    }
  //  });
  //   console.log(body);
  // });
  //
  //
  //
  //
  //


  // var settings = {
  //   "async": true,
  //   "crossDomain": true,
  //   "url": "https://localhost:5052/signup-microservice?username="+req.query.username+"&password="+req.query.password+"&firstname="+req.query.firstname+"&lastname="+req.query.lastname+"&email="+req.query.email,
  //   "method": "POST",
  //   "headers": {
  //     "cache-control": "no-cache",
  //     "postman-token": "ac4c0af7-c823-b83f-4b44-8b751393d7c7"
  //   }
  // }
  //
  // $.ajax(settings).done(function (response) {
  //   $('#exampleModal').modal('hide');
  //   alert("Reload Page for changes to be displayed.  ");
  //   console.log("response",response);
  //   res.format({
  //    'application/json': function(){
  //       res.send(response);
  //    }
  //  });
  // });


  // console.log("Client called /signup");
  // var result = null;
  //
  // enterUserDetails(req.query.firstname, req.query.lastname, req.query.username, req.query.email, req.query.password).then(function(dataresult){
  //   result = dataresult;
  //     console.log("Result is: ",dataresult)
  //     res.format({
  //      'application/json': function(){
  //         res.send(dataresult);
  //      }
  //    });
  //
  //
  // }).then(function(){
  //   con = null;
  // });
  // console.log("req.body", JSON.stringify(req.query, null, 2));
});

app.post('/getCatalogDetails', function(req, res){

  if(token==null){
    console.log("Token not found. ");
    res.format({
         'application/json': function(){
            var response1 = {"string":"User not authenticated. Your session has expired. You need to log in again. " };
            res.send(response1);
         }
       });
  }
  else{
      var unirest = require("unirest");
      var unirestreq = unirest("POST", "https://localhost:5052/getCatalogDetails-microservices");

      unirestreq.headers({
        "postman-token": "d6014a1f-6a10-8999-b3f1-e52f94432bc6",
        "cache-control": "no-cache",
        "content-type": "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW"
      });

      unirestreq.strictSSL(false).end(function (unirestres) {
        if (unirestres.error) throw new Error(unirestres.error);
        res.format({
             'Content-Encoding':'gzip',
             'application/json': function(){
                res.send(unirestres.body);
             }
           });
        //var newres = res;
        //newres.setHeader('Content-Encoding','gzip');
        //var stringify = require('json-stringify-safe');

        //console.log("response object: "+stringify(newres._headers,null,2));
        //console.log(res.body);
      });
    }
});

app.post('/enterItemInCatalog', function(req, res){

  if(token==null){
    console.log("Token not found. ");
    res.format({
         'application/json': function(){
            var response1 = {"string":"User not authenticated. Your session has expired. You need to log in again. " };
            res.send(response1);
         }
       });
  }
  else{
  var unirest = require("unirest");
  var unirestreq = unirest("POST", "https://localhost:5052/enterItemInCatalog-microservices?name="+req.query.name+"&category="+req.query.category+"&brand="+req.query.brand+"&price="+req.query.price+"&color="+req.query.color);

  unirestreq.headers({
    "postman-token": "d6014a1f-6a10-8999-b3f1-e52f94432bc6",
    "cache-control": "no-cache",
    "content-type": "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW"
  });

  unirestreq.strictSSL(false).end(function (unirestres) {
    if (unirestres.error) throw new Error(unirestres.error);
    res.format({
         'application/json': function(){
            res.send(unirestres.body);
         }
       });
    console.log(res.body);
  });
  }
  console.log("req.body", JSON.stringify(req.query, null, 2));
});

app.post('/updateItemInCatalog', function(req, res){

  if(token==null){
    console.log("Token not found. ");
    res.format({
         'application/json': function(){
            var response1 = {"string":"User not authenticated. Your session has expired. You need to log in again. " };
            res.send(response1);
         }
       });
  }
  else{
  var unirest = require("unirest");
  var unirestreq = unirest("POST", "https://localhost:5052/updateItemInCatalog-microservices?id="+req.query.id+"&name="+req.query.name+"&category="+req.query.category+"&brand="+req.query.brand+"&price="+req.query.price+"&color="+req.query.color);

  unirestreq.headers({
    "postman-token": "d6014a1f-6a10-8999-b3f1-e52f94432bc6",
    "cache-control": "no-cache",
    "content-type": "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW"
  });

  unirestreq.strictSSL(false).end(function (unirestres) {
    if (unirestres.error) throw new Error(unirestres.error);
    res.format({
         'application/json': function(){
            res.send(unirestres.body);
         }
       });
    console.log(res.body);
  });
}

  //
  // console.log("Client called /enterItemInCatalog");
  // var result = null;
  // console.log("req.query for item : ",req.query);
  //
  // updateItemInCatalog(req.query.id,req.query.name,req.query.category,req.query.brand,req.query.price,req.query.color).then(function(dataresult){
  //   result = dataresult;
  //     console.log("Result is: ",dataresult)
  //     res.format({
  //      'application/json': function(){
  //         res.send(dataresult);
  //      }
  //    });
  //
  //
  // }).then(function(){
  //   con = null;
  // });
  console.log("req.body", JSON.stringify(req.query, null, 2));
});

app.post('/deleteItemInCatalog', function(req, res){

  if(token==null){
    console.log("Token not found. ");
    res.format({
         'application/json': function(){
            var response1 = {"string":"User not authenticated. Your session has expired. You need to log in again. " };
            res.send(response1);
         }
       });
  }
  else{

  var unirest = require("unirest");
  var unirestreq = unirest("POST", "https://localhost:5052/deleteItemInCatalog-microservices?id="+req.query.id);

  unirestreq.headers({
    "postman-token": "d6014a1f-6a10-8999-b3f1-e52f94432bc6",
    "cache-control": "no-cache",
    "content-type": "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW"
  });

  unirestreq.strictSSL(false).end(function (unirestres) {
    if (unirestres.error) throw new Error(unirestres.error);
    res.format({
         'application/json': function(){
            res.send(unirestres.body);
         }
       });
    console.log(res.body);
  });
}
  console.log("req.body", JSON.stringify(req.query, null, 2));
});

app.post('/forgotPassword', function(req, res){

  var unirest = require("unirest");
  var unirestreq = unirest("POST", "https://localhost:5052/forgotPassword-microservices?username="+req.query.username);

  unirestreq.headers({
    "postman-token": "d6014a1f-6a10-8999-b3f1-e52f94432bc6",
    "cache-control": "no-cache",
    "content-type": "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW"
  });

  unirestreq.strictSSL(false).end(function (unirestres) {
    if (unirestres.error) throw new Error(unirestres.error);
    res.format({
         'application/json': function(){
            res.send(unirestres.body);
         }
       });
    console.log(res.body);
  });


  console.log("req.body", JSON.stringify(req.query, null, 2));
});

app.post('/changePassword', function(req, res){

  var unirest = require("unirest");
  var unirestreq = unirest("POST", "https://localhost:5052/changePassword-microservices?username="+req.query.username+"&password="+req.query.password);

  unirestreq.headers({
    "postman-token": "d6014a1f-6a10-8999-b3f1-e52f94432bc6",
    "cache-control": "no-cache",
    "content-type": "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW"
  });

  unirestreq.strictSSL(false).end(function (unirestres) {
    if (unirestres.error) throw new Error(unirestres.error);
    res.format({
         'application/json': function(){
            res.send(unirestres.body);
         }
       });
    console.log(res.body);
  });

  console.log("req.body", JSON.stringify(req.query, null, 2));
});

app.post('/viewProfile', function(req, res){

  if(token==null){
    console.log("Token not found. ");
    res.format({
         'application/json': function(){
            var response1 = {"string":"User not authenticated. Your session has expired. You need to log in again. " };
            res.send(response1);
         }
       });
  }
  else{
  var unirest = require("unirest");
  var unirestreq = unirest("POST", "https://localhost:5052/viewprofile-microservices?username="+req.query.username);

  unirestreq.headers({
    "postman-token": "d6014a1f-6a10-8999-b3f1-e52f94432bc6",
    "cache-control": "no-cache",
    "content-type": "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW"
  });

  unirestreq.strictSSL(false).end(function (unirestres) {
    if (unirestres.error) throw new Error(unirestres.error);
    res.format({
         'application/json': function(){
            res.send(unirestres.body);
         }
       });
    console.log(res.body);
  });
  }
  console.log("req.body", JSON.stringify(req.query, null, 2));
});


app.post('/editProfile', function(req, res){

  if(token==null){
    console.log("Token not found. ");
    res.format({
         'application/json': function(){
            var response1 = {"string":"User not authenticated. Your session has expired. You need to log in again. " };
            res.send(response1);
         }
       });
  }
  else{
  var unirest = require("unirest");
  var unirestreq = unirest("POST", "https://localhost:5052/editProfile-microservices?username="+req.query.username+"&firstname="+req.query.firstname+"&lastname="+req.query.lastname+"&emailid="+req.query.emailid);

  unirestreq.headers({
    "postman-token": "d6014a1f-6a10-8999-b3f1-e52f94432bc6",
    "cache-control": "no-cache",
    "content-type": "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW"
  });

  unirestreq.strictSSL(false).end(function (unirestres) {
    if (unirestres.error) throw new Error(unirestres.error);
    res.format({
         'application/json': function(){
            res.send(unirestres.body);
         }
       });
    console.log(res.body);
  });
  }

  console.log("req.body", JSON.stringify(req.query, null, 2));
});

app.post('/enterRegistryItem', function(req, res){

  if(token==null){
    console.log("Token not found. ");
    res.format({
         'application/json': function(){
            var response1 = {"string":"User not authenticated. Your session has expired. You need to log in again. " };
            res.send(response1);
         }
       });
  }
  else{
  var unirest = require("unirest");
  var unirestreq = unirest("POST", "https://localhost:5052/enterRegistryItem-microservices?username="+req.query.username+
  "&id="+req.query.id+
  "&name="+req.query.name+
  "&category="+req.query.category+
  "&brand="+req.query.brand+
  "&price="+req.query.price+
  "&color="+req.query.color);

  unirestreq.headers({
    "postman-token": "d6014a1f-6a10-8999-b3f1-e52f94432bc6",
    "cache-control": "no-cache",
    "content-type": "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW"
  });

  unirestreq.strictSSL(false).end(function (unirestres) {
    if (unirestres.error) throw new Error(unirestres.error);
    res.format({
         'application/json': function(){
            res.send(unirestres.body);
         }
       });
    console.log(res.body);
  });
  }

  console.log("req.body", JSON.stringify(req.query, null, 2));
});


app.post('/viewRegistry', function(req, res){

  if(token==null){
    console.log("Token not found. ");
    res.format({
         'application/json': function(){
            var response1 = {"string":"User not authenticated. Your session has expired. You need to log in again. " };
            res.send(response1);
         }
       });
  }
  else{

  var unirest = require("unirest");
  var unirestreq = unirest("POST", "https://localhost:5052/viewRegistry-microservices?username="+req.query.username);

  unirestreq.headers({
    "postman-token": "d6014a1f-6a10-8999-b3f1-e52f94432bc6",
    "cache-control": "no-cache",
    "content-type": "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW"
  });

  unirestreq.strictSSL(false).end(function (unirestres) {
    if (unirestres.error) throw new Error(unirestres.error);
    res.format({
         'application/json': function(){
            res.send(unirestres.body);
         }
       });
    console.log(res.body);
  });
  }

  console.log("req.body", JSON.stringify(req.query, null, 2));
});

app.post('/deleteRegistryItem', function(req, res){

  if(token==null){
    console.log("Token not found. ");
    res.format({
         'application/json': function(){
            var response1 = {"string":"User not authenticated. Your session has expired. You need to log in again. " };
            res.send(response1);
         }
       });
  }
  else{
  var unirest = require("unirest");
  var unirestreq = unirest("POST", "https://localhost:5052/deleteRegistryItem-microservices?id="+req.query.id);

  unirestreq.headers({
    "postman-token": "d6014a1f-6a10-8999-b3f1-e52f94432bc6",
    "cache-control": "no-cache",
    "content-type": "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW"
  });

  unirestreq.strictSSL(false).end(function (unirestres) {
    if (unirestres.error) throw new Error(unirestres.error);
    res.format({
         'application/json': function(){
            res.send(unirestres.body);
         }
       });
    console.log(res.body);
  });
  }
  console.log("req.body", JSON.stringify(req.query, null, 2));
});
/*
app.post('/shareRegistryPublic', function(req, res){

  if(token==null){
    console.log("Token not found. ");
    res.format({
         'application/json': function(){
            var response1 = {"string":"User not authenticated. Your session has expired. You need to log in again. " };
            res.send(response1);
         }
       });
  }
  else{
  var unirest = require("unirest");
  var unirestreq = unirest("POST", "https://localhost:5052/shareRegistryPublic-microservices?myusername="+req.query.myusername+"&friendusername="+req.query.friendusername);

  unirestreq.headers({
    "postman-token": "d6014a1f-6a10-8999-b3f1-e52f94432bc6",
    "cache-control": "no-cache",
    "content-type": "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW"
  });

  unirestreq.strictSSL(false).end(function (unirestres) {
    if (unirestres.error) throw new Error(unirestres.error);
    res.format({
         'application/json': function(){
            res.send(unirestres.body);
         }
       });
    console.log(res.body);
  });
  }
    console.log("req.body", JSON.stringify(req.query, null, 2));
  });
*/
app.post('/shareRegistry', function(req, res){

  if(token==null){
    console.log("Token not found. ");
    res.format({
         'application/json': function(){
            var response1 = {"string":"User not authenticated. Your session has expired. You need to log in again. " };
            res.send(response1);
         }
       });
  }
  else{
  var unirest = require("unirest");
  var unirestreq = unirest("POST", "https://localhost:5052/shareRegistry-microservices?myusername="+req.query.myusername+"&friendusername="+req.query.friendusername);

  unirestreq.headers({
    "postman-token": "d6014a1f-6a10-8999-b3f1-e52f94432bc6",
    "cache-control": "no-cache",
    "content-type": "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW"
  });

  unirestreq.strictSSL(false).end(function (unirestres) {
    if (unirestres.error) throw new Error(unirestres.error);
    res.format({
         'application/json': function(){
            res.send(unirestres.body);
         }
       });
    console.log(res.body);
  });
  }
    console.log("req.body", JSON.stringify(req.query, null, 2));
  });

app.post('/selectFriendRegistry', function(req, res){

  if(token==null){
    console.log("Token not found. ");
    res.format({
         'application/json': function(){
            var response1 = {"string":"User not authenticated. Your session has expired. You need to log in again. " };
            res.send(response1);
         }
       });
  }
  else{
  var unirest = require("unirest");
  var unirestreq = unirest("POST", "https://localhost:5052/selectFriendRegistry-microservices?friendusername="+req.query.friendusername);

  unirestreq.headers({
    "postman-token": "d6014a1f-6a10-8999-b3f1-e52f94432bc6",
    "cache-control": "no-cache",
    "content-type": "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW"
  });

  unirestreq.strictSSL(false).end(function (unirestres) {
    if (unirestres.error) throw new Error(unirestres.error);
    res.format({
         'application/json': function(){
            res.send(unirestres.body);
         }
       });
    console.log(res.body);
  });
  }
  console.log("req.body", JSON.stringify(req.query, null, 2));
});

app.post('/viewFriendRegistry', function(req, res){

  if(token==null){
    console.log("Token not found. ");
    res.format({
         'application/json': function(){
            var response1 = {"string":"User not authenticated. Your session has expired. You need to log in again. " };
            res.send(response1);
         }
       });
  }
  else{
    var unirest = require("unirest");
    var unirestreq = unirest("POST", "https://localhost:5052/viewFriendRegistry-microservices?friendusername="+req.query.friendusername);

    unirestreq.headers({
      "postman-token": "d6014a1f-6a10-8999-b3f1-e52f94432bc6",
      "cache-control": "no-cache",
      "content-type": "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW"
    });

    unirestreq.strictSSL(false).end(function (unirestres) {
      if (unirestres.error) throw new Error(unirestres.error);
      res.format({
           'application/json': function(){
              res.send(unirestres.body);
           }
         });
      console.log(res.body);
    });
    }
  console.log("req.body", JSON.stringify(req.query, null, 2));
});

app.post('/assignItem', function(req, res){
  if(token==null){
    console.log("Token not found. ");
    res.format({
         'application/json': function(){
            var response1 = {"string":"User not authenticated. Your session has expired. You need to log in again. " };
            res.send(response1);
         }
       });
  }
  else{
      var unirest = require("unirest");
      var unirestreq = unirest("POST", "https://localhost:5052/assignItem-microservices?username="+req.query.username+"&friendusername="+req.query.friendusername+"&id="+req.query.id);

      unirestreq.headers({
        "postman-token": "d6014a1f-6a10-8999-b3f1-e52f94432bc6",
        "cache-control": "no-cache",
        "content-type": "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW"
      });

      unirestreq.strictSSL(false).end(function (unirestres) {
        if (unirestres.error) throw new Error(unirestres.error);
        res.format({
             'application/json': function(){
                res.send(unirestres.body);
             }
           });
        console.log(res.body);
      });
    }
  console.log("req.body", JSON.stringify(req.query, null, 2));
});

app.post('/deleteToken', function(req, res){
  token=null;
  var unirest = require("unirest");
  var unirestreq = unirest("POST", "https://localhost:5052/deleteToken-microservices");

  unirestreq.headers({
    "postman-token": "d6014a1f-6a10-8999-b3f1-e52f94432bc6",
    "cache-control": "no-cache",
    "content-type": "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW"
  });

  unirestreq.strictSSL(false).end(function (unirestres) {
    if (unirestres.error) throw new Error(unirestres.error);
    var responseObject = {"string":"User has been succesfully logged out. Token has been deleted. "}
    res.format({
         'application/json': function(){
            res.send(responseObject);
         }
       });
    console.log(res.body);
  });
  console.log("Token has been deleted. ");
});

app.post('/makePublicRegistry', function(req, res){

      var unirest = require("unirest");
      var unirestreq = unirest("POST", "https://localhost:5052/makePublicRegistry-microservices?username="+req.query.username);

      unirestreq.headers({
        "postman-token": "d6014a1f-6a10-8999-b3f1-e52f94432bc6",
        "cache-control": "no-cache",
        "content-type": "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW"
      });

      unirestreq.strictSSL(false).end(function (unirestres) {
        if (unirestres.error) throw new Error(unirestres.error);
        res.format({
             'application/json': function(){
                res.send(unirestres.body);
             }
           });
        console.log(res.body);
      });
  console.log("req.body", JSON.stringify(req.query, null, 2));
});

app.post('/findPublicRegistry', function(req, res){

  if(token==null){
    console.log("Token not found. ");
    res.format({
         'application/json': function(){
            var response1 = {"string":"User not authenticated. Your session has expired. You need to log in again. " };
            res.send(response1);
         }
       });
  }
  else{
  var unirest = require("unirest");
  var unirestreq = unirest("POST", "https://localhost:5052/findPublicRegistry-microservices");

  unirestreq.headers({
    "postman-token": "d6014a1f-6a10-8999-b3f1-e52f94432bc6",
    "cache-control": "no-cache",
    "content-type": "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW"
  });

  unirestreq.strictSSL(false).end(function (unirestres) {
    if (unirestres.error) throw new Error(unirestres.error);
    res.format({
         'application/json': function(){
            res.send(unirestres.body);
         }
       });
    console.log(res.body);
  });
  }
  console.log("req.body", JSON.stringify(req.query, null, 2));
});

app.post('/selectPublicRegistry', function(req, res){

  if(token==null){
    console.log("Token not found. ");
    res.format({
         'application/json': function(){
            var response1 = {"string":"User not authenticated. Your session has expired. You need to log in again. " };
            res.send(response1);
         }
       });
  }
  else{
  var unirest = require("unirest");
  var unirestreq = unirest("POST", "https://localhost:5052/selectPublicRegistry-microservices");

  unirestreq.headers({
    "postman-token": "d6014a1f-6a10-8999-b3f1-e52f94432bc6",
    "cache-control": "no-cache",
    "content-type": "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW"
  });

  unirestreq.strictSSL(false).end(function (unirestres) {
    if (unirestres.error) throw new Error(unirestres.error);
    res.format({
         'application/json': function(){
            res.send(unirestres.body);
         }
       });
    console.log(res.body);
  });
  }
  console.log("req.body", JSON.stringify(req.query, null, 2));
});


var counterTimer;
function task() {
  counter = counter+1;
  if(counter==200){
    token = null;
    clearTimeout(counterTimer);
  }
  console.log("Time lapsed: "+counter*5+" seconds. Token will be destroyed in "+(200-counter)*5+" seconds. ");
  console.log("Token=",token);
  counterTimer = setTimeout(task, 5000);
}

task();

// app.listen(5051, function(){
//   console.log('Example app listening on port 5051!');
//
// });
