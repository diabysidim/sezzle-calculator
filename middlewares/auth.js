const User = require("../db/models/User");
const jwt   = require("jsonwebtoken");

// auth middleware will verify user token 

module.exports  =  async (req, res, next)=>{

    try{
        const token = req.header("Authorization").replace("Bearer ", "");
        const decoded= jwt.verify(token, "sezzleCalculatorToken");
        const user = await Login.findOne({_id: decoded.id, "tokens.token": token });

        if(!user){

            res.redirect("/login")
            throw new Error("no user found");
            
        }

        req.user = user;
        req.token =token;

        next();

    }
    catch (err){
        res.redirect("/login")
        console.log(err)
        
        
        }  

}