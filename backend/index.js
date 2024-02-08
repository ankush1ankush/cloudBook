const cors = require('cors')
const mongooseToConnect = require('./db');
const express = require('express')
const fetchuser =require("../backend/middleware/fetchuser")
mongooseToConnect();
const app = express()
const port = 5000


app.use(cors())


app.use(express.json());

app.get('/',fetchuser, (req,res) => {

if(req.isAuthenticated)
{
    return res.status(200).json({message:"user is Authenticated"});
}else{

    return  res.status(401).json({message:"user is unAuthenticated"})
}

  
})
// available routes..... there could be more than it 
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})