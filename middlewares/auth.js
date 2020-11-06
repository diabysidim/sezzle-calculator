const User = require("../db/models/User");
const jwt   = require("jsonwebtoken");

// auth middleware will verify user token 

module.exports  =  async (req, res, next)=>{

    res.locals.currentUser=null;

    try{
        const token = req.cookies.token;
        const decoded= await jwt.verify(token, process.env.TOKEN_KEY);
        const user = await User.findOne({_id: decoded.id, "tokens.token": token });
    
            
            
    

        
        res.set('Cache-Control', 'no-store')

        if(!user && (req.route.path !=="/login" && req.route.path !== "/register" && req.route.path !== "/404")){

           
            return res.status(401).redirect("/login")
            
        }

        if(user && (req.route.path ==="/login" || req.route.path === "/register" )) {
           
            return res.redirect("/")}


        req.user = user;
        res.locals.currentUser=req.user;
        req.token =token;

        next();

    }
    catch (err){

        if(req.route.path ==="/login" || req.route.path === "/register" || req.route.path === "/404" ) {
           
            return next();}

        res.redirect("/login")
        console.log(err)
        
        
        }  

}