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
    const{error} = registerValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let register = await Register.findOne({email:req.body.email}) 
    if(register) return res.status(400).send('User already registered.');

    const salt = 10;
    register = new Register({
        name: req.body.name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password,salt)
    })
    await register.save()             
    .then(result=>{
        console.log(result);
        res.status(201).json({ messaege:"user created"});
    })
    .catch(err=>{
        console.log("else") 
        res.status(500).json({error:err});
        // res.send("Error in database or the collection")
    });

})
/* 
to Validate the input from the users.
Joi is an npm module that helps to validate the string.
*/
function registerValidate(regis){
    const schema = Joi.object({
        name:Joi.string().min(3).max(50).required(),
        email:Joi.string().min(5).max(255).required().email(),
        password:Joi.string().min(8).required()
    })
    return schema.validate(regis)
}



module.exports = router