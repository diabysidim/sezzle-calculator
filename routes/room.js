
const Room = require("../db/models/Room");
const User = require("../db/models/User");
const auth = require("../middlewares/auth");
const Router = require("express").Router();





// get rooms
Router.get("/rooms", auth, async (req, res)=>{

    try{


        const rooms = await Room.find({}).populate("owner");

        res.render("rooms", {user:req.user, rooms: rooms });
    }
    catch(err){

        console.log(err);
        res.redirect("/")
    }
    
})

// add room

Router.post("/rooms", auth, async (req, res)=>{
    try{

        const {name, description} = req.body;

        if(name==="") throw new Error("name empty");

        const room = await Room.createRoom(name, description, req.user._id);
        
        return res.status(200).send(room);
    }
    catch(e){

        console.log(e);

         return res.status(400).send("error while adding a room");
    }
    
})

// get room creation form
Router.get("/rooms/new", auth, (req, res)=>{

    res.render("new-room", {user:req.user});
})

// get general chat room
Router.get("/rooms/general", auth, async (req, res)=>{

    try{
        const room = await Room.findOne({name:"General"}) 

        res.render("room", {user: req.user, room:room.name});
    }
    catch(err){

        console.log(err);
        res.redirect("/")
    }
    
})

// get room by id
Router.get("/rooms/:id", auth, async (req, res)=>{

    try{
        const room = await Room.findOne({_id: req.params.id})

        res.render("room", {user: req.user, room:room.name});
    }
    catch(err){

        console.log(err);
        res.redirect("/")
    }
   
    
})



Router.delete("/rooms/:id", auth, async (req, res)=>{
        
        try{
            const room = await Room.deleteOne({_id:req.params.id, owner: req.user._id})
            return res.status(200).send(req.user)
        }
        catch(e){
            return res.status(500).send("thre  was an error while deleting the room");
        }
        

})



module.exports = Router;