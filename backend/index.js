const cors = require('cors')
const mongooseToConnect = require('./db');
const express = require('express')
mongooseToConnect();
const app = express()
const port = 5000


app.use(cors())


app.use(express.json());
app.get('/', (req,res) => {
  res.send('Ravi your app is succesfully working very hard');
})
// available routes..... there could be more than it 
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})