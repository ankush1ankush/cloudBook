const jwt = require('jsonwebtoken');
const JWT_SECRET = "kakosa@34";
const fetchuser = (req,res,next)=>{
    // get the user from the jwt token and add id to req object
    try{
        const token = req.header('auth-token');
        if (!token){
            req.isAuthenticated = false
            next();

           
        }else{
       
            const data = jwt.verify(token,JWT_SECRET);
            req.user = data.user;
            req.isAuthenticated = true;
            //console.log("hello");
            next();
        }
           
        
    } catch(error){
        console.log("error is in fetch user >>> ", error);
    }
}
module.exports = fetchuser;