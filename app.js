const express = require ('express')
const app = express()
const morgan = require ('morgan')
const route = require('./routes/route')


app.use(express.json())
app.use(morgan('tiny'))
app.use('/v1/api', route )


app.listen('8080',()=>{
    console.log('The server is running in port 8080')
})