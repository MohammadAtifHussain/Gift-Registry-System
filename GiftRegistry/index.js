var express = require('express')
var https = require('https')
var app = express()
var compression = require('compression')
var fs = require('fs')

app.use(express.static(__dirname + '/public'));
app.use(compression({threshold: 0}));
// app.use(compression({filter: shouldCompress}))
//
// function shouldCompress (req, res) {
//    if (req.headers['x-no-compression']) {
//        // don't compress responses with this request header
//        return false
//    }
//
//   // fallback to standard filter function
//    return compression.filter(req, res)
//  }

// var request = require('request');
// var zlib = require('zlib');
//
//     var headers = {
//       'Accept-Encoding': 'gzip'
//     };
//
//     request({url:'http://localhost:5000/', 'headers': headers})
//         .pipe(zlib.createGunzip()) // unzip
//         .pipe(process.stdout); // do whatever you want with the stream


// app.use((req, res, next) => {
//     res.append('Content-Encoding:gzip');
//     next();
// });


https.createServer({
      key: fs.readFileSync('key.pem'),
      cert: fs.readFileSync('cert.pem'),
      passphrase: 'wysiwyg'
    }, app).listen(5000);



app.get('/', function(req, res){
  res.writeHead({
     'Content-Encoding': 'gzip',
     'warning': "with content type charset encoding will be added by default"
  });
  res.sendFile('index.html');

  // var unirest = require("unirest");
  //
  // var unirestreq = unirest("POST", "http://localhost:5050/submit");
  //
  //
  //
  // unirestreq.query({
  //   "username": "",
  //   "password": "amit2007"
  // });
  //
  // unirestreq.headers({
  //   "postman-token": "a391d81e-63af-06ff-329c-34c622827f97",
  //   "cache-control": "no-cache"
  // });
  //
  //
  // unirestreq.end(function (unirestres) {
  //   if (unirestres.error) throw new Error(unirestres.error);
  //
  //   console.log(unirestres.body);
  // });

});

app.get('/admin', function(req, res){
  res.sendFile('signup.html');

});

app.use(function(req, res) {
     res.status(400);
     res.sendFile(__dirname + '/public/error.html');
  });

// app.listen(5000, function(){
//   console.log('Example app listening on port 5000!');
//
// });
