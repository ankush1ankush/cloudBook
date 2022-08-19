// making api
const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User')
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = "kakosa@34";
// creating a user using : POST "/api/auth/createuser" 
router.post('/createuser',[
    body('name','Enter a valid Name!').isLength({ min: 5 }),
    body('email','Enter a valid email!').isEmail(),
    body('password','Enter a good password').isLength({ min: 5 }),
],async (req,res)=>{

    // if there is any error , return bad request  and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
        let user = await User.findOne({email:req.body.email})
        // checking wheter user already exits in database or not if exits than comeing out of program and returing message.
            if (user){
                return res.status(400).json({error : "Sorry user with this email already exits"});
            }
        // making password decrypted and adding some security to password
        const salt =await bcrypt.genSaltSync(12);        
        const secPassword =await bcrypt.hash(req.body.password,salt);
        // if user is new  than 
        user = await User.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email,
        });
        // by using jwt making user more secure 
        const data = {
            user :{
                id:user.id
            }
        }
        
        const authToken = jwt.sign(data,JWT_SECRET);
        // console.log(authToken);
        res.send({authToken});
    }catch(error){
        console.error(error.message);
        res.status(500).send("something went wronge please check connection");
    }
})
// login  a user using : POST "/api/auth/login" 
router.post('/login',[
    body('email','Enter a valid email!').isEmail(),
    body('password','Enter a good password').isLength({ min: 5 }),
],async (req,res)=>{
    // if there is any error , return bad request  and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email,password} = req.body;
    try{
        let user = await User.findOne({email});
        // checking email is present in database or not if yes then go further otherwse out of code
        if (!user){
            return res.status(400).json({error : "Please try to login with right credential"});
        }
        //   compareing password 
        let passwordCompare =await bcrypt.compare(password,user.password);
        if (!passwordCompare){
            return res.status(400).json({error : "Please try to login with right credential"});
        }
        // checking password is correct then go further otherwse out of code
        // by using jwt making user more secure 
        const data = {
            user :{
                id:user.id
            }
        } 
        const authToken = jwt.sign(data,JWT_SECRET);
        res.send({authToken});
    }catch(error){
        console.error(error.message);
        res.status(500).send("something went wronge please check connection");
    }
})
// making end point of geting data using Post req....
router.post('/getuser',fetchuser,async (req,res)=>{
try {
     userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);

} catch (error) {
    console.error(error.message)
    res.status(500).send("Interal Server Error");
}
})
module.exports = router;


 