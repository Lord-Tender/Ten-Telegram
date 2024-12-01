const express = require('express');
const app = express()
const launchBot = require('./Bots/launch.bot')
require('dotenv').config()
const mongoose = require('mongoose')
const port = process.env.PORT
let uri = process.env.URI

launchBot()

app.listen(port, () => {
    console.log('Server is running at port: ' + port)
    mongoose.connect(uri)
        .then(() => {
            console.log('Connected to Database')
        })
        .catch((err)=>{
            console.log("Error connecting to database" + err)
        })
})