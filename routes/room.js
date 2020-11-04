
const Room = require("../db/models/Room");
const User = require("../db/models/User");
const auth = require("../middlewares/auth");
const Router = require("express").Router();


Router.get("/rooms/new", auth, async (req, res)=>{

    res.render("new-room");
})



Router.get("/room", auth, async (req, res)=>{

    res.render("room");
})


Router.get("/rooms/:id", auth, async (req, res)=>{


    const room = await Room.findOne({_id: req.params.id})

    return res.status(200).send(room);
    res.render("room", {room: room} );
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

Router.delete("/rooms/:id", auth, async (req, res)=>{
        
        try{
            const room = await Room.deleteOne({_id:req.params.id, owner: req.user._id})
            return res.redirect("/rooms")
        }
        catch(e){
            return res.render("room", {roomInfo: req.body, error:"there was a problem deleting the room"});
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