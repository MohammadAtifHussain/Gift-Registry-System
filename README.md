nodejs-gift-registry-website
=============
A responsive and scalable gift registry web application in Node.js based on Service-Oriented-Architecture and RESTful Web Services. 

*	Created dynamic web UI and its functionalities using CSS3, jQuery and Bootstrap. 
*	Created 3 separate servers for running the client, services and micro-services. 
*	Built RESTful APIs to handle the basic web site functionalities 
*	Used MySQL database for creating and storing customer data. 
*	Provided web site security using TSL/SSL. 
*	Used Nodejs compression library to provide compression at both the service and micro-service layers. 
*	Implemented Memcache at the service layer to cache results of queries.


Pre-requisites - 
-------
1. Should have node installed. [Follow this](#installing-node-js)
2. Should have MySQL installed. [Follow this](#installing-mysql)
3. Setting up TSL/SSL and generating certificates. [Incomplete](#installing-mysql)
3. Download and install CORS extension on chrome. Download from here - https://chrome.google.com/webstore/detail/cors-toggle/jioikioepegflmdnbocfhgmpmopmjkim?hl=en

Usage - 
-------
1. Download the git repository. 
2. Run .sql in SQL Workbench. 
3. Open the 3 folders - GiftRegistry, GiftRegistry-Services, GiftRegistry-Microservices. 
4. Open 3 cmd windows and run the following code on all three - 

```cmd
npm install
npm start
```

If everything is running succesfully, you should see

```cmd
$ npm start

> giftregistry@1.0.0 start /Users/Project/GiftRegistry
> nodemon index.js

[nodemon] 1.12.1
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node index.js`
```

### Installing Node js
1. Visit - https://nodejs.org/en/
2. Download for your relevant OS. 

### Installing MySQL
1. Install MySQL - https://www.mysql.com/
2. Install MySQL Workbench - https://dev.mysql.com/downloads/workbench/
3. Setup MySQL Workbench by creating a new connection. Set the username and password as root and root. 
