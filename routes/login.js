const express = require('express');
const mongoose = require("mongoose");
const Joi = require('joi')
const bcrypt = require('bcrypt')

const route = express.Router();
const Login = require('../models/register');

route.post('/', async(req,res)=>{
    const{error} = loginValidate(req.body);
    if(error) return res.status(400).send(error.details[0].message); 

    /* 
        to check if the input email is present in the database or not,
        if no such user is present, then if condition is executed 
        Here user object contains all the data of the user that matches that email  
    */      
    let user = await Login.findOne({email:req.body.email}); 
    if(!user) return res.status(400).send("Invalid email or password");    

    /* 
        bcrypt is going to get the salt from user.password and 
        pass it in input password and compare those hash passwords and return true or false.
    */ 
    bcrypt.compare(req.body.password,user.password,(err,result)=>{
        if(err){
            return res.status(400).send("Invalid email or password one"); 
        }
        if(result){
            return res.status(200).json({message:"Login successful"});
        }
        res.status(400).send("Invalid email or password two");  
    })
})
 
function loginValidate(req){
    const schema = Joi.object({
        email:Joi.string().min(5).max(255).required().email(),
        password:Joi.string().min(8).required()
    })
    return schema.validate(req)
}

module.exports = route