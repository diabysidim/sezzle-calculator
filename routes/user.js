
const Room = require("../db/models/Room");
const User = require("../db/models/User");
const auth = require("../middlewares/auth");
const Router = require("express").Router();



//get user by id

Router.get("/users/:id", auth,  async (req, res)=>{

    try{

        const user =  await User.findOne({_id:req.params.id});
        if(user)  return res.render("user", {user:user} );
        else throw new Error("user not found")
    }
    catch(err){

        console.log(err);
        return res.redirect("/404")
    }
   
})

// delete users

Router.delete("/users/:id", auth, async (req, res)=>{
        
    try{

        await Room.deleteMany({owner:  req.user._id })
        const user = await User.deleteOne({_id: req.user._id})
        return res.status(200).send(user)
    }
    catch(e){
        return res.status(500).send("there was a problem deleting the room");
    }
    

})

// patch user

Router.patch("/users/:id", auth, async (req, res)=>{
    
try{
    if(req.body && (req.body.userName==="" || req.body.password===""|| req.body.firstName==="")) throw new Error("info missing");
    const user = await User.findOneAndUpdate({_id: req.user._id}, {$set:req.body})
   
    return res.status(200).send(user);
}
catch(e){
    console.log(e)
    return res.status(400).send("there was an error deleting the user");
}


})

// get user's room

Router.get("/:id/rooms", auth,  async (req, res)=>{

    try{
        const rooms = await Room.find({owner:req.params.id}).populate("owner");

        res.render("rooms", {user: req.user, rooms: rooms });
    }
    catch(err){

        console.log(err);
        res.redirect("/")
    }
   
})


//wildcards
Router.get("*", (req, res)=>{
    return res.redirect("/404")
})

module.exports = Router;