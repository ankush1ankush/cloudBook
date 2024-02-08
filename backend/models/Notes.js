const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
    user : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type:String,
        required:true,
        lowercase:true,
        min:[3,`Minimum three letter must be in your name Like "Ram"`],
        maxlength : 30
    },
    tag:{
        type:String,
        default:"General"
    },
    date :{
        type: Date,
        default :Date.now
    },
    description:{
        type:String,
        required:true,
        maxlength:14,
        uniqe:true
    }
});

 


module.exports=mongoose.model('notes',NoteSchema);