
const User = require("../db/models/User");
const Router = require("express").Router();
const auth = require("../middlewares/auth");


Router.get("/login", auth, (req, res)=>{

    console.log(req.cookies)
    return res.render("login");
})

Router.post("/login", auth, async (req, res)=>{

    const {userName,password} = req.body
    try{

        const user = await User.login(userName, password);
        const token = await user.generateToken()
        await user.save();
        res.cookie("token", token );
        return res.status(200).send({user, token});

    }
    catch(err){
        
        return res.status(400).send("the username or password is not valid");

    }
    


})

Router.get("/register", auth, (req, res)=>{

    return res.render("register");
})


Router.post("/register",auth, async (req, res) =>{

    try{

        const user= await User.register(req.body);
        const token =  await user.generateToken();
        await user.save();
        res.cookie("token", token );
        return res.send(user)
        if(user) return res.render("index", {user:user})
        else throw new Error("there was a problem creating the user")

    }
    catch(err){
        return res.send("username Taken")
        return res.redirect("/register", {user: req.body})
    }
})

Router.post("/logout", auth, async (req, res)=>{

    try {
        
        console.log("in loggout")
        req.user.tokens = req.user.tokens.filter((token)=>{ token.token !== req.token})
        res.cookie().clearCookie();
        await req.user.save();
        
        return res.status(200).send("logged out")

    } catch (error) {
        console.log(error);
        return res.status(500).send("unable to Logout")

    }


})


Router.post("/logoutall", auth, async (req, res)=>{

    try {
        
        req.user.tokens = [];
        await req.user.save();
        res.cookie().clearCookie();
        return res.status(200).send("logged out to all")

    } catch (error) {

        console(error);
        return res.status(500).send("unable to Logout")

    }


})


module.exports = Router;