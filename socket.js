module.exports = (io, mexp, socket)=>{
    
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
}