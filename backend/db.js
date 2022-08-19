const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/mynotebook";
const mongooseToConnect = () =>{
    mongoose.connect(mongoURI,(()=>console.log("connection succssful...")));
}
module.exports = mongooseToConnect;
