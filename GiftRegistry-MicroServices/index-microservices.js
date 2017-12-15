var express = require('express');
var app = express();
var https = require('https');
var fs = require('fs');
var bodyParser = require('body-parser');

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

var MysqlCache = require('mysql-cache')

var cache = new MysqlCache({
    host:            'localhost',
    user:            'root',
    password:        'root',
    database:        'registry',
    cacheProvider:   'LRU',
});

cache.connect(err => {
    if (err) {
        throw err // Catch any nasty errors!
    }
    console.log('cache connected');

    // Lets run some queries now!
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

https.createServer({
      key: fs.readFileSync('key.pem'),
      cert: fs.readFileSync('cert.pem'),
      passphrase: 'wysiwyg'
    }, app).listen(5052);



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
      console.log("SELECT * FROM users where Username ='"+username+"' and Pass = '"+password+"'");
      con1.query("SELECT * FROM users where Username ='"+username+"' and Pass = '"+password+"'", function (err, result, fields) {
        if (err) throw err;
        resolve(result);
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
      //console.log("SELECT * FROM catalog");
      cache.query("SELECT * FROM catalog", function (err, result, fields) {
        if (err) throw err;
        console.log("\033[92m"+fields.hash + " is the cache key\033[0m");
        resolve(result);
        if(cache.hits == 0)
          {
            console.log("\033[92mcache miss\033[0m");
          }
          else{
            console.log("\033[94mcache hit\033[0m");
          }
      });
    });
  });
  return promise;

}

var enterItemInCatalog = function(name, category, brand, price, color){

      cache.flush(err => {
        if (err) {
            throw new Error(err)
        }
        console.log('\033[94mcache flushed!\033[0m')
    });

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

      cache.flush(err => {
        if (err) {
            throw new Error(err)
        }
        console.log('\033[94mcache flushed!\033[0m')
    });

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
      cache.flush(err => {
        if (err) {
            throw new Error(err)
        }
        console.log('\033[94mcache flushed!\033[0m')
    });
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
      console.log("INSERT INTO userregistry VALUES('"+username+"',"+id+",'"+name+"','"+category+"','"+brand+"',"+price+",'"+color+"','None','private')");
      con.query("INSERT INTO userregistry VALUES('"+username+"',"+id+",'"+name+"','"+category+"','"+brand+"',"+price+",'"+color+"','None','private')", function (err, result, fields) {
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

var shareRegistry= function(myusername,friendusername){
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
      con.query("Select * from users where Role=user",function(err,result,fields)
      {
        var temp = result;
        console.log(result);
        console.log(fields);
      console.log("INSERT INTO share VALUES('"+myusername+"','"+friendusername+"')");
      con.query("INSERT INTO share VALUES('"+myusername+"','"+friendusername+"')", function (err, result, fields) {
        if (err) throw err;
        resolve(result);
      });
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

var findPublicRegistry= function(username){
  var promise = new Promise(function(resolve, reject){
    if(con === null){
      con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "registry"
      });
    }
    console.log("SELECT * from userregistry where visibility='public'");
    con1.query("SELECT * from userregistry where visibility='public'", function (err, result, fields) {
      if (err) throw err;
      resolve(result);
    });
  });
  return promise;

}


var makePublicRegistry= function(username){
  var promise = new Promise(function(resolve, reject){
    if(con === null){
      con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "registry"
      });
    }
    console.log("UPDATE USERREGISTRY SET visibility='public' where username='"+username+"'");
    con1.query("UPDATE USERREGISTRY SET visibility='public' where username='"+username+"'", function (err, result, fields) {
      if (err) throw err;
      resolve(result);
    });
  });
  return promise;

}
var token = null;
var counter = 0;

app.post('/submit-microservice', function(req, res){

  //token =  crypto.randomBytes(10).toString('hex');
  console.log("Client called /submit");
  var result = null;

  getUserDetails(req.query.username, req.query.password).then(function(dataresult){

    result = dataresult;
    //console.log("Result is: ",dataresult);
    if(dataresult[0]==null){
      res.format({
       'application/json': function(){
          var message = {"string":"User not authenticated. "}
          res.send(message);
       }
     });
    }
    else{
        token =  crypto.randomBytes(10).toString('hex');
    if(dataresult[0].Role=="admin"){
      //console.log("Result is: ",dataresult)
      res.format({
       'application/json': function(){
          //token =  crypto.randomBytes(10).toString('hex');
          res.send(dataresult[0]);
       }
     });
    }
    if(dataresult[0].Role=="user"){
      //console.log("Result is: ",dataresult)
      res.format({
       'application/json': function(){
          res.send(dataresult[0]);
       }
     });
    }
  }
  }).then(function(){
    con = null;
  });
  //console.log("req.body", JSON.stringify(req.query, null, 2));
});

app.post('/signup-microservice', function(req, res){
  console.log("Client called /signup");
  //console.log("req",JSON.stringify(req, null, 2));
  var result = null;
  //console.log("Client called /signup2");
  enterUserDetails(req.query.firstname, req.query.lastname, req.query.username, req.query.email, req.query.password).then(function(dataresult){
    //console.log("Client called /signup2");
    result = dataresult;
      //console.log("Result is: ",dataresult)
      res.format({
       'application/json': function(){
          res.send(dataresult);
       }
     });


  }).then(function(){
    con = null;
  });
  //console.log("req.body", JSON.stringify(req.query, null, 2));
});

app.post('/getCatalogDetails-microservices', function(req, res){

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
  console.log("Client called /getCatalogDetails-microservices");
  var result = null;

  getCatalogDetails().then(function(dataresult){
    result = dataresult;
      //console.log("Result is: ",dataresult)
      res.format({
       'application/json': function(){
          res.send(dataresult);
       }
     });


  }).then(function(){
    con = null;
  });
  }
  //console.log("req.body", JSON.stringify(req.query, null, 2));
});

app.post('/enterItemInCatalog-microservices', function(req, res){

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
  console.log("Client called /enterItemInCatalog");
  var result = null;
  //console.log("req.query for item : ",req.query);

  enterItemInCatalog(req.query.name,req.query.category,req.query.brand,req.query.price,req.query.color).then(function(dataresult){
    result = dataresult;
      //console.log("Result is: ",dataresult)
      res.format({
       'application/json': function(){
          res.send(dataresult);
       }
     });


  }).then(function(){
    con = null;
  });
  }
  //console.log("req.body", JSON.stringify(req.query, null, 2));
});

app.post('/updateItemInCatalog-microservices', function(req, res){

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
  console.log("Client called /enterItemInCatalog");
  var result = null;
  //console.log("req.query for item : ",req.query);

  updateItemInCatalog(req.query.id,req.query.name,req.query.category,req.query.brand,req.query.price,req.query.color).then(function(dataresult){
    result = dataresult;
      //console.log("Result is: ",dataresult)
      res.format({
       'application/json': function(){
          res.send(dataresult);
       }
     });


  }).then(function(){
    con = null;
  });
  }
  //console.log("req.body", JSON.stringify(req.query, null, 2));
});

app.post('/deleteItemInCatalog-microservices', function(req, res){

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
  console.log("Client called /deleteItemInCatalog-microservices");
  var result = null;
  //console.log("req.query for item : ",req.query);

  deleteItemInCatalog(req.query.id).then(function(dataresult){
    result = dataresult;
      //console.log("Result is: ",dataresult)
      res.format({
       'application/json': function(){
          res.send(dataresult);
       }
     });


  }).then(function(){
    con = null;
    });
  }
  //console.log("req.body", JSON.stringify(req.query, null, 2));
});
app.post('/forgotPassword-microservices', function(req, res){

  console.log("Client called /forgotPassword");
  var result = null;
  //console.log("req.query for item : ",req.query);
  var id = null;

  forgotPassword(req.query.username).then(function(dataresult){
    //console.log("typeof(dataresult)",JSON.stringify(dataresult[0].Email_Id, null, 2));
    result = dataresult;
    id = crypto.randomBytes(6).toString('hex');


    var nodemailer = require('nodemailer');
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'wysiwyg.wpl.project',
        pass: 'wysiwyg.wpl.project$10'
      }
    });

    var mailOptions = {
      from: 'wysiwyg.wpl.project@gmail.com',
      to: dataresult[0].Email_Id,
      subject: 'New Password Details for username: '+dataresult[0].Username,
      text: 'Your new password is: '+ id
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });




      //console.log("Result is: ",dataresult)
      res.format({
       'application/json': function(){
          dataresult[0].newpassword = id;
          //console.log("dataresult updated password: ",JSON.stringify(dataresult, null, 2));
          res.send(dataresult);
       }
     });


  }).then(function(){
    con = null;
  });
  //console.log("req.body", JSON.stringify(req.query, null, 2));
});

app.post('/changePassword-microservices', function(req, res){


  console.log("Client called /changePassword");
  var result = null;
  //console.log("req.query for item : ",req.query);
  var id = null;

  changePassword(req.query.username,req.query.password).then(function(dataresult){
    result = dataresult;

      //console.log("Result is: ",dataresult)
      res.format({
       'application/json': function(){
          //console.log("dataresult updated password: ",JSON.stringify(dataresult, null, 2));
          res.send(dataresult);
       }
     });


  }).then(function(){
    con = null;
  });
  //console.log("req.body", JSON.stringify(req.query, null, 2));
});

app.post('/viewprofile-microservices', function(req, res){

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
  console.log("Client called /viewProfile");
  var result = null;
  //console.log("req.query for item : ",req.query);
  var id = null;

  viewProfile(req.query.username).then(function(dataresult){
    //console.log("typeof(dataresult)",JSON.stringify(dataresult[0].Email_Id, null, 2));
    result = dataresult;


      //console.log("Result is: ",dataresult)
      res.format({
       'application/json': function(){
          //console.log("dataresult updated password: ",JSON.stringify(dataresult, null, 2));
          res.send(dataresult);
       }
     });


  }).then(function(){
    con = null;
  });
  }
  //console.log("req.body", JSON.stringify(req.query, null, 2));
});


app.post('/editProfile-microservices', function(req, res){

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
  console.log("Client called /editProfile");
  var result = null;
  //console.log("req.query for item : ",req.query);
  var id = null;

  editProfile(req.query.username,req.query.firstname,req.query.lastname,req.query.emailid).then(function(dataresult){
    //console.log("typeof(dataresult)",JSON.stringify(dataresult[0].Email_Id, null, 2));
    result = dataresult;


      //console.log("Result is: ",dataresult)
      res.format({
       'application/json': function(){
          //console.log("dataresult updated Profile: ",JSON.stringify(dataresult, null, 2));
          res.send(dataresult);
       }
     });


  }).then(function(){
    con = null;
  });
  }
  //console.log("req.body", JSON.stringify(req.query, null, 2));
});

app.post('/enterRegistryItem-microservices', function(req, res){

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
  console.log("Client called /enterRegistryItem");
  var result = null;
  //console.log("req.query for item : ",req.query);
  var id = null;

  enterRegistryItem(req.query.username,req.query.id,req.query.name,req.query.category,req.query.brand,req.query.price,req.query.color).then(function(dataresult){
    //console.log("typeof(dataresult)",JSON.stringify(dataresult[0].Email_Id, null, 2));
    result = dataresult;


      //console.log("Result is: ",dataresult)
      res.format({
       'application/json': function(){
          //console.log("dataresult updated Profile: ",JSON.stringify(dataresult, null, 2));
          res.send(dataresult);
       }
     });


  }).then(function(){
    con = null;
  });
  }
  //console.log("req.body", JSON.stringify(req.query, null, 2));
});


app.post('/viewRegistry-microservices', function(req, res){

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
  console.log("Client called /viewRegistry");
  var result = null;
  //console.log("req.query for item : ",req.query);
  var id = null;

  viewRegistry(req.query.username).then(function(dataresult){
    //console.log("typeof(dataresult)",JSON.stringify(dataresult[0].Email_Id, null, 2));
    result = dataresult;


      //console.log("Result is: ",dataresult)
      res.format({
       'application/json': function(){
          //console.log("dataresult all items from registry: ",JSON.stringify(dataresult, null, 2));
          res.send(dataresult);
       }
     });


  }).then(function(){
    con = null;
  });
  }
  //console.log("req.body", JSON.stringify(req.query, null, 2));
});

app.post('/deleteRegistryItem-microservices', function(req, res){
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
  console.log("Client called /deleteRegistryItem");
  var result = null;
  //console.log("req.query for item : ",req.query);
  var id = null;

  deleteRegistryItem(req.query.id).then(function(dataresult){
    //console.log("typeof(dataresult)",JSON.stringify(dataresult[0].Email_Id, null, 2));
    result = dataresult;


      console.log("Result is: ",dataresult)
      res.format({
       'application/json': function(){
          //console.log("dataresult deleted item from registry: ",JSON.stringify(dataresult, null, 2));
          res.send(dataresult);
       }
     });


  }).then(function(){
    con = null;
  });
  }
  //console.log("req.body", JSON.stringify(req.query, null, 2));
});

app.post('/shareRegistry-microservices', function(req, res){
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
  console.log("Client called /shareRegistry");
  var result = null;
  //console.log("req.query for item : ",req.query);
  var id = null;

  shareRegistry(req.query.myusername,req.query.friendusername).then(function(dataresult){
    //console.log("typeof(dataresult)",JSON.stringify(dataresult[0].Email_Id, null, 2));
    result = dataresult;


      //console.log("Result is: ",dataresult)
      res.format({
       'application/json': function(){
          //console.log("dataresult shared registry with: ",JSON.stringify(dataresult, null, 2));
          res.send(dataresult);
       }
     });


  }).then(function(){
    con = null;
  });
  }
  //console.log("req.body", JSON.stringify(req.query, null, 2));
});
/*
app.post('/shareRegistryPublic-microservices', function(req, res){
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
  console.log("Client called /shareRegistryPublic");
  var result = null;
  console.log("req.query for item : ",req.query);
  var id = null;

  shareRegistryPublic(req.query.myusername,req.query.friendusername).then(function(dataresult){
    //console.log("typeof(dataresult)",JSON.stringify(dataresult[0].Email_Id, null, 2));
    result = dataresult;


      console.log("Result is: ",dataresult)
      res.format({
       'application/json': function(){
          console.log("dataresult shared registry with: ",JSON.stringify(dataresult, null, 2));
          res.send(dataresult);
       }
     });


  }).then(function(){
    con = null;
  });
  }
  console.log("req.body", JSON.stringify(req.query, null, 2));
});
*/
app.post('/selectFriendRegistry-microservices', function(req, res){
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
  console.log("Client called /selectFriendRegistry");
  var result = null;
  //console.log("req.query for item : ",req.query);
  var id = null;

  selectFriendRegistry(req.query.friendusername).then(function(dataresult){
    //console.log("typeof(dataresult)",JSON.stringify(dataresult[0].Email_Id, null, 2));
    result = dataresult;


      //console.log("Result is: ",dataresult)
      res.format({
       'application/json': function(){
          //console.log("dataresult shared registry of friend: ",JSON.stringify(dataresult, null, 2));
          res.send(dataresult);
       }
     });


  }).then(function(){
    con = null;
  });
  }
  //console.log("req.body", JSON.stringify(req.query, null, 2));
});

app.post('/viewFriendRegistry-microservices', function(req, res){
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
  console.log("Client called /viewFriendRegistry");
  var result = null;
  //console.log("req.query for item : ",req.query);
  var id = null;

  viewFriendRegistry(req.query.friendusername).then(function(dataresult){
    //console.log("typeof(dataresult)",JSON.stringify(dataresult[0].Email_Id, null, 2));
    result = dataresult;


      console.log("Result is: ",dataresult)
      res.format({
       'application/json': function(){
          //console.log("dataresult shared registry items of friend: ",JSON.stringify(dataresult, null, 2));
          con = null;
          res.send(dataresult);
       }
     });


  }).then(function(){
    con = null;
  });
  }
  //console.log("req.body", JSON.stringify(req.query, null, 2));
});

app.post('/assignItem-microservices', function(req, res){
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
  console.log("Client called /assignItem");
  var result = null;
  //console.log("req.query for item : ",req.query);
  var id = null;

  assignItem(req.query.username,req.query.friendusername,req.query.id).then(function(dataresult){
    //console.log("typeof(dataresult)",JSON.stringify(dataresult[0].Email_Id, null, 2));
    result = dataresult;


      //console.log("Result is: ",dataresult)
      res.format({
       'application/json': function(){
          //console.log("dataresult assigned registry items of friend: ",JSON.stringify(dataresult, null, 2));
          con = null;
          res.send(dataresult);
       }
     });


  }).then(function(){
    con = null;
  });
  }
  //console.log("req.body", JSON.stringify(req.query, null, 2));
});

app.post('/deleteToken-microservices', function(req, res){
  token=null;
  res.format({
       'application/json': function(){
          var response1 = {"string":"User has been succesfully logged out. Token has been deleted. " };
          res.send(response1);
       }
     });
  console.log("Token has been deleted. ");
});

app.post('/makePublicRegistry-microservices', function(req, res){

  console.log("Client called /makePublicRegistry");
  var result = null;
  //console.log("req.query for item : ",req.query);
  var id = null;

  makePublicRegistry(req.query.username).then(function(dataresult){
    //console.log("typeof(dataresult)",JSON.stringify(dataresult[0].Email_Id, null, 2));
    result = dataresult;


      //console.log("Result is: ",dataresult)
      res.format({
       'application/json': function(){
          //console.log("dataresult assigned registry items of friend: ",JSON.stringify(dataresult, null, 2));
          con = null;
          res.send(dataresult);
       }
     });


  }).then(function(){
    con = null;
  });
  //console.log("req.body", JSON.stringify(req.query, null, 2));
});

app.post('/selectPublicRegistry-microservices', function(req, res){
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
  console.log("Client called /selectPublicRegistry");
  var result = null;
  //console.log("req.query for item : ",req.query);
  var id = null;

  selectPublicRegistry().then(function(dataresult){
    //console.log("typeof(dataresult)",JSON.stringify(dataresult[0].Email_Id, null, 2));
    result = dataresult;


      //console.log("Result is: ",dataresult)
      res.format({
       'application/json': function(){
          //console.log("dataresult shared registry of friend: ",JSON.stringify(dataresult, null, 2));
          res.send(dataresult);
       }
     });


  }).then(function(){
    con = null;
  });
  }
  //console.log("req.body", JSON.stringify(req.query, null, 2));
});

app.post('/findPublicRegistry-microservices', function(req, res){
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
  console.log("Client called /findPublicRegistry");
  var result = null;
  //console.log("req.query for item : ",req.query);
  var id = null;

  findPublicRegistry().then(function(dataresult){
    //console.log("typeof(dataresult)",JSON.stringify(dataresult[0].Email_Id, null, 2));
    result = dataresult;


      //console.log("Result is: ",dataresult)
      res.format({
       'application/json': function(){
          //console.log("dataresult shared registry of friend: ",JSON.stringify(dataresult, null, 2));
          res.send(dataresult);
       }
     });


  }).then(function(){
    con = null;
  });
  }
  //console.log("req.body", JSON.stringify(req.query, null, 2));
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
