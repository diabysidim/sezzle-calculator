/* this App is going to make use of the library socket.io to create 
    a calculator that can be accessed live by multiple users*/


const path = require("path");
const bodyParser = require("body-parser");
const dbConnection =  require("./db/connection");

const cookieParser =  require("cookie-parser");
// setting express App
const express =  require("express");

// MathJs Library
const mexp = require('math-expression-evaluator');
const App = express();

// importing routes
const routes      = require("./routes/routes");
const loginRoutes      = require("./routes/login-registration");
const roomRoutes      = require("./routes/room");
const userRoutes      = require("./routes/user");

const httpSocket          = require("./socket");

// security and performance library
const expressSanitizer= require('express-sanitizer');
 const   compression     = require('compression');
 const    helmet          = require('helmet');
 require('dotenv').config()


// using http to settup an express server
const httpServer = require("http").createServer(App);

// import socket.io library
const io =  require("socket.io")(httpServer)


// serving the static directory for the html page
const public =  path.join(__dirname, "public")
const views = path.join(__dirname, "public/views");

dbConnection();
App.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );
App.use(cookieParser(process.env.COOKIE_KEY))
App.use(expressSanitizer());

App.use(express.static(public))
App.use(bodyParser.urlencoded({extended: false}));
App.use(bodyParser.json());
App.set("views", views);
App.set('view engine', 'ejs');
App.use(compression());

App.use(routes);
App.use(loginRoutes);
App.use(roomRoutes);
App.use(userRoutes);





// socket communication
io.on("connection", (socket)=>{

    httpSocket(io, mexp, socket);
})



// setting port and listening to requests
const port = process.env.PORT || 3000

httpServer.listen(port, ()=>{

    console.log("server started");
})