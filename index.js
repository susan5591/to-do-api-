const express = require('express');
const mongoose = require('mongoose');
const apimodel = require('./models/apimodel');
const register = require('./models/register');

mongoose.connect('mongodb://localhost/todo',{ useNewUrlParser: true , useUnifiedTopology: true })
const db= mongoose.connection;
db.on('error',(error)=>console.error(error));  
db.once('open',()=>console.log("Connected to Database"))

    const app = express();

    app.use(express.json());

    const apiRouter = require('./routes/api');
    app.use('/todos/',apiRouter)

    const registerRouter = require('./routes/register');
    app.use('/register/',registerRouter)


app.listen(3000,()=> console.log("Server has started"));