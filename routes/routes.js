const User = require("../db/models/User");
const auth = require("../middlewares/auth");


const Router = require("express").Router();

Router.get("/", auth, (req, res)=>{

    return res.render("index", {user:req.user});
})

Router.get("/404", auth, (req, res)=>{

    return res.render("404", {currentUser: req.user})
})






module.exports = Router;