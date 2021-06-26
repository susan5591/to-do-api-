const express = require('express');
const mongoose = require('mongoose');
const apiRouter = require('./routes/api');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');

//connection to the database
mongoose.connect('mongodb://localhost/todo',{ useNewUrlParser: true , useUnifiedTopology: true })
const db= mongoose.connection;
db.on('error',(error)=>console.error(error));  
db.once('open',()=>console.log("Connected to Database"))

const app = express();
app.use(express.json());
app.use('/api/todos/',apiRouter)
app.use('/api/register/',registerRouter)
app.use('/api/login/',loginRouter)


app.listen(3000,()=> console.log("Server has started"));