
const User = require("../db/models/User");
const Router = require("express").Router();
const auth = require("../middlewares/auth");


Router.get("/login", auth, (req, res)=>{

    return res.render("login");
})

// login
Router.post("/login", auth, async (req, res)=>{

    const {userName,password} = req.body
    if(userName===""|| password==="") throw new Error("username or password empty");
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

    if(req.body && (req.body.userName==="" || req.body.password===""|| req.body.firstName==="")) throw new Error("info missing")
    try{

        const user= await User.register(req.body);
        const token =  await user.generateToken();
        await user.save();
        res.cookie("token", token );
        return res.status(200).send(user)
       

    }
    catch(err){
        return res.status(400).send("username Taken")
       
    }
})

Router.post("/logout", auth, async (req, res)=>{

    try {
        
        req.user.tokens = req.user.tokens.filter((token)=>{ token.token !== req.token})
        res.cookie().clearCookie();
        await req.user.save();
        
        return res.redirect('/login')

    } catch (error) {
        console.log(error);
        return res.redirect("/")

    }


})


Router.post("/logoutall", auth, async (req, res)=>{

    try {
        
        req.user.tokens = [];
        await req.user.save();
        res.cookie().clearCookie();
        return res.redirect('/login')

    } catch (error) {

        console(error);
        return res.redirect("/")

    }


})


module.exports = Router;