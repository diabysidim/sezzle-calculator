const Room = require("../db/models/Room");
const LogList = require("./log");
let activeUsers = [];
let activeRooms= [];


const addUser  = async (id, username, room)=>{
    
            //initialize log
    
            let logs=[]

            try{
               
                // check if the room is active and has chat logs in memory

                const index = activeRooms.findIndex(activeRoom => activeRoom.name === room);

                // the room is not active

                if(index < 0){

                    // get the logs from the db
                    const roomdb =  await Room.findOne({name:room});
                    // create a log data structure (linkedlist)
                    const log = new LogList();
                    // update the created log with the log from the db
                    logs = roomdb.logs.map(log=>log)
                    log.toList(logs);
                    // create a room object and add it to the active room array
                    const roomObj = {name: room, log: log }
                    activeRooms.push(roomObj)
                   
                } 
                else{

                    
                    //room is active 
                    // get logs from memory
                    logs = activeRooms[index] && activeRooms[index].log.toArray()
                    

                }

                // add user to the activeUsers Array
                activeUsers.push({id, username, room});
                // return the user 
                return {user: {username, room, logs:logs}  }
            }
            catch(err){
                
                // if error return error
                console.log(err)
                return{error:err}
            }
           
       
       
    

}

const removeUser  = (id)=>{
    
    // remove user from the active user list
    let userObj;

    // find user by socketid and remove him
    activeUsers = activeUsers.filter(user=>{
        if(user.id === id) userObj = user;
        return user.id!== id})
    
    if(userObj && usersInRoom(userObj.room).length ===0) { removeRoom(userObj.room)};
    return userObj;

}

const usersInRoom = (room)=>{

    // get users in a room
   return  activeUsers.filter(user=>(user.room===room));
}

const addToLogs = (roomName, log)=>{
    
    // add log to the logList

    const index = activeRooms.findIndex((room)=>{
        return room.name === roomName});
    if(index >= 0){

        activeRooms[index].log.addLog(log);
        return index;
    }
    else{

        return index;
    }

}


const removeRoom = async (roomName) =>{

    // remove user from the list 
    try{

        const store = await storeLogs(roomName);
        if(store > 0) activeRooms = activeRooms.filter(room=>room.name !== roomName)
        else throw new Error("the log was not stored");

    }
    catch(e){

        console.log(e)
    }
}

const storeLogs= async (roomName)=>{

    // store logs to the database

    // check if room in activeRooms
    const index = activeRooms.findIndex((room)=>(room.name === roomName))

    
    if(index >= 0){

        // remove room from active rooms
        const logs = activeRooms[index].log.toArray();

        activeRooms.slice(index, 1);
        
        try{

            // update database
            const RoomLogs =  await Room.findOneAndUpdate({name:roomName}, {$set:{logs: logs}})
            return 1; 

        }
        catch(err){

            console.log(err);
            return -2; 

        }
        
    }
    else{

        return -1;
    }
}



module.exports={
    addUser,
    removeUser,
    usersInRoom,
    storeLogs,
    addToLogs

}

