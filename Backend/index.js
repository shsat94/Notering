const connectToMongo= require('./db');
const express = require('express')
const app = express()
const port = 5000
connectToMongo();

app.use(express.json());

//Avialable Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`App is running on the port ${port}`)
  })
