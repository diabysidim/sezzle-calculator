const auth = require("./middlewares/auth");

const Router = require("express").Router();

Router.get("/", auth, (req, res)=>{

    res.render("index")
})


Router.get("/login", (req, res)=>{

    res.render("login")
})


module.exports = Router;