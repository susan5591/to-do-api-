const mongoose = require('mongoose')

mongoose.set('useCreateIndex', true);
const registerSchema = new mongoose.Schema({
    name:{
        type:String,
        minlength:3,
        maxlength:50,
    },
    email:{
        type:String,
        unique:true, 
        required:true,
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        maxlength:1024
    }

})

/* function registerValidate(register){
    const schema = Joi.object({
        name:Joi.string().min(3).max(50).required(),
        email:Joi.string().min(5).max(255).required().email(),
        password:Joi.string().min(8).required()
    })
    return schema.validate(register)
} */


module.exports =  mongoose.model('register',registerSchema);
