const mongoose = require('mongoose');
const { Schema } = mongoose;





const UserSchema = new Schema({
    name:{
        type:String,
        required:true,
        lowercase:true,
        min:[3,`Minimum three letter must be in your name Like "Ram"`],
        maxlength : 30
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        uniqe:true,
        maxlength : 30
    },
    date :{
        type: Date,
        default :Date.now
    },
    password:{
        type:String,
        required:true,
        maxlength:100,
        uniqe:true
    },
   
});

const User = mongoose.model('user',UserSchema);
module.exports= User;