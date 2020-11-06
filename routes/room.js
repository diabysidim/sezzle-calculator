
const Room = require("../db/models/Room");
const User = require("../db/models/User");
const auth = require("../middlewares/auth");
const Router = require("express").Router();






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



Router.post("/rooms", auth, async (req, res)=>{
    try{
        const room = await Room.createRoom(req.body.name, req.user._id);
        
        return res.redirect("/rooms/"+ room._id);
    }
    catch(e){

        console.log(e);

         return res.render("new-room", {roomInfo: req.body, error:"there was a problem creating the room"});
    }
    
})


Router.get("/rooms/new", auth, async (req, res)=>{

    res.render("new-room", {user:req.user});
})

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
            return res.status(200).send("room deleted")
        }
        catch(e){
            return res.status(500).send("thre  was an error while deleting the room");
        }
        

})

Router.patch("/rooms/:id", auth, async (req, res)=>{
        
    try{
        const room = await Room.findOneAndUpdate({_id:req.params.id, owner: req.user._id}, {$set:req.body})
        console.log(room);
        return res.redirect("/rooms/"+room._id)
    }
    catch(e){
        console.log(e)
        return res.render("room", {roomInfo: req.body, error:"there was a problem deleting the room"});
    }
    

})

module.exports = Router;