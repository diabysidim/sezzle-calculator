
const { addUser, removeUser, usersInRoom, storeLogs, addToLogs } = require("./utils/activeUsers");


module.exports = (io, mexp, socket)=>{
     
    socket.on("join", async ({username, room}, cb)=>{
        
        const user = await addUser(socket.id, username, room);
        socket.join(room);
        if(user.user){
            socket.emit("messageReceived", `Hello welcome ${username} to ${room} room`);
            io.to(room).emit("usersInRoom", usersInRoom(room))
            socket.broadcast.to(room).emit("messageReceived", `${username} has joined the room!!`)
        }  

        cb(user);     
    })

    socket.on("message", async (message, {username, room}, cb)=>{

        const msg = `${username}: ${message}`
        socket.broadcast.to(room).emit("messageReceived", msg);
        const number = await addToLogs(room, {userMessages: {username:username, timestamp:1, text:message}});
        console.log(number)
        cb(msg);
        
    })

    socket.on("evaluate", async  (expression, {username, room}, cb)=>{

        try{

            // try to evaluate the expression
            const result =  mexp.eval(expression); 

           const message= `${username} evaluted  ${expression}  =  ${result}`
            socket.broadcast.to(room).emit("messageReceived", message) 
            
            const number = await addToLogs(room, {userMessages: {username:username, timestamp:1, text:message}});
         
            cb(message);
        }
        catch(err){
            // if error send error message
            const msg  =  "ERROR!! the following expression cannot be evaluted: " + expression
            cb(msg)
        }
       

    })
    

    socket.on("disconnect", async ()=>{

        try{
            
        const user =  await removeUser(socket.id);
        if(user) io.emit("Left", `${user.username} just left the room` )
        }
        catch(e){
            console.log(e)
        }
        
    })
}