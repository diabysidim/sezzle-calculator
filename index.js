/* this app is going to make use of the library socket.io to create 
    a calculator that can be accessed live by multiple users*/


const path = require("path");
const bodyParser = require("body-parser");
const dbConnection =  require("./db/connection");

const cookieParser =  require("cookie-parser");
// setting express app
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


// using http to settup an express server
const httpServer = require("http").createServer(App);

// import socket.io library
const io =  require("socket.io")(httpServer)


// serving the static directory for the html page
const public =  path.join(__dirname, "public")
const views = path.join(__dirname, "public/views");

dbConnection();
App.use(cookieParser("my little secret"))
App.use(express.static(public))
App.use(bodyParser.urlencoded({extended: false}));
App.use(bodyParser.json());
App.set("views", views);
App.set('view engine', 'ejs');


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