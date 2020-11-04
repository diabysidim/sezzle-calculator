
const User = require("../db/models/User");
const auth = require("../middlewares/auth");
const Router = require("express").Router();



Router.get("/users/:id", auth,  async (req, res)=>{

    try{

        const user =  await User.findOne({_id:req.params.id});
        if(user)  return res.render("user", user );
        else throw new Error("user not found")
    }
    catch(err){

        console.log(err);
        return res.redirect("/404")
    }
   
})

Router.delete("/users/:id", auth, async (req, res)=>{
        
    try{
        const user = await User.deleteOne({_id: req.user._id})
        return res.status(200).send("user deleted")
    }
    catch(e){
        return res.status(500).send("there was a problem deleting the room");
    }
    

})

Router.patch("/users/:id", auth, async (req, res)=>{
    
try{
    const user = await User.findOneAndUpdate({_id: req.user._id}, {$set:req.body})
   
    return res.status(200).send(user);
}
catch(e){
    console.log(e)
    return res.status(400).send("there was an error deleting the user");
}


})


Router.get("*", (req, res)=>{
    return res.redirect("/404")
})

module.exports = Router;