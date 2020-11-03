/* this app is going to make use of the library socket.io to create 
    a calculator that can be accessed live by multiple users*/


const path = require("path")
const bodyParser = require("body-parser");
const mongoose =  require("mongoose");
// setting express app
const express =  require("express");

// MathJs Library
const mexp = require('math-expression-evaluator');




const App = express();



// using http to settup an express server
const httpServer = require("http").createServer(App);

// import socket.io library
const io =  require("socket.io")(httpServer)


// serving the static directory for the html page
const public =  path.join(__dirname, "public")
const views = path.join(__dirname, "public/views");



App.use(express.static(public))
App.use(bodyParser.urlencoded({extended: false}));
App.set("views", views);

App.set('view engine', 'ejs');
App.use(require("./routes"));



let count=0;
io.on("connection", (socket)=>{
    
    console.log("new user connected")
    socket.emit("message", "welcome to sezzle calculator")

    socket.on("message", (message)=>{

        io.emit("message", message);
    })
    
    
    socket.on("evaluate", (expression, cb)=>{

        try{

            // try to evaluate the expression
            const result =  mexp.eval(expression); 
            console.log(result);

            cb(result);
            socket.broadcast.emit("message", "a user: " + expression + " = " + result) 

        }
        catch(err){
            // if error send error message
            const msg  =  "ERROR!! the following expression cannot be evaluted: " + expression
            cb(msg)
        }
       

    })

    socket.broadcast.emit("joined", "a new user has joined" )

    socket.on("disconnect", ()=>{

        io.emit("Left", "a user just left")
    })
})



// setting port and listening to requests
const port = process.env.PORT || 3000

httpServer.listen(port, ()=>{

    console.log("server started");
})