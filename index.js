const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/todo',{ useNewUrlParser: true , useUnifiedTopology: true });
const db= mongoose.connection;
db.on('error',(error)=>console.error(error));  
db.once('open',()=>console.log("Connected to Database"))

    const app = express();

    app.use(express.json());

    const apiRouter = require('./routes/api');
    app.use('/todo',apiRouter)

    app.listen(3000,()=> console.log("Server has started"));