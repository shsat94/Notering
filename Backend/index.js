const connectToMongo= require('./db');
const express = require('express')
const cors = require('cors')
const app = express()
const port =process.env.PORT ||5000
connectToMongo();

app.use(cors());
app.use(express.json());

//Avialable Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))
app.use('/api/forgetpass',require('./routes/forgetpass'))


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`App is running on the port ${port}`)
  })
