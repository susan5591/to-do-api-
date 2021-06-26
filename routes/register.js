const mongoose = require('mongoose')
const Joi = require('joi')
const bcrypt = require('bcrypt')
const express = require('express')

const router = express.Router()
const Register  = require('../models/register')


/* 
to register with the password save in hash 
bcrypt module is a npm module to convert normal string (in this, password) to hash.
salt = 10, helps to add extra chareacter for hash so that it will be hard to decode the password
 */
router.post('/',async(req,res)=>{    
    const salt = await bcrypt.genSalt(10);
    bcrypt.hash("password",salt, async function(err,hash){
        if(err){

            return res.status(500).json({error:err});
        }
        else{                             
            const { error } = registerValidate(req.body);
            if (error) return res.status(400).send(error.details[0].message);
             
            /* 
            to check if the user with same email exist or not during registration.
            findOne function is used to check the email if it is repeated or not
            if condition is executed when the email with registerd is found in the database
             */
            let register = await Register.findOne({email:req.body.email}) 
            if(register) return res.status(400).send('User already registered.')
             
            register = new Register({
                name: req.body.name,
                email: req.body.email,
                password: hash
            })
            await register.save()             
            .then(result=>{
                console.log(result);
                res.status(201).json({ messaege:"user created"});
            })
            .catch(err=>{
                console.log("else") 
                // res.status(500).json({error:err});
                res.send("Error in database or the collection")
            });
        }
    })

})

/* router.post('/',async(req,res)=>{
    const {error} = registerValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let register = await Register.findOne({email:req.body.email});
    if(register) return res.status(500).send("Email already registered.")

    register = new Register({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    })
    try{
        const result = await register.save();
        res.status(201).json(result);
    }catch(err){
        res.status(201).json({message:err.message})
    }
})
     */


function registerValidate(regis){
    const schema = Joi.object({
        name:Joi.string().min(3).max(50).required(),
        email:Joi.string().min(5).max(255).required().email(),
        password:Joi.string(

        ).min(8).required()
    })
    return schema.validate(regis)
}

module.exports = router