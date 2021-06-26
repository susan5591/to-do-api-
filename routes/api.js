const Joi = require('joi')
const express = require('express');
const mongoose = require("mongoose");

const router = express.Router();
const apimodel = require('../models/apimodel');
const { string } = require('joi');

mongoose.set('useFindAndModify', false);

/* 
searchin title of todo with full strings or just the substring
using the regular expression
.*t.* means any title that contains it's substring.
"i" is for making it not case sensitive.

to check arr.lenth is empty or not
data.length === 0
!data.length 

here the input is given as :
http://localhost:3000/todo/search?title=query
if the query is empty the if condition is executed
if the query contains any substring that is present in title then the description of title with that substring is shown in json format
if the query string doesn't contain any strings present in titles, then the else condition is executed.
*/
router.get('/search', async function(req,res){    
    console.log(req.query.title)    
    if(req.query.title.length==0){
        return res.status(400).json("Search Empty")
    }   
    else{
        var regex = new RegExp(req.query.title,'i');
        let data = await apimodel.find({title:regex});        
        if(data.length===0){
            return res.status(404).send("Searched Data not found")                
        }else{
            return res.send(data);
        } 
    }                      
})

//getting all
router.get('/',async(req,res)=>{
    try{
        const apiData = await apimodel.find();
        res.json(apiData);
    }catch(err){
        res.status(404).send("Data not found")
    }
})

//getting one
// title:res.apiData.title
router.get('/:id',async(req,res)=>{
    try{
        const apiData = await apimodel.findById(req.params.id)
        
        res.json(apiData);
    }catch(err){
        res.status(404).send("Data not found id")
    }
})


//creating
router.post('/',async(req,res)=>{
    const{error} = validateToDo(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const apiData = new apimodel({
        title:req.body.title,
        description:req.body.description
    })
    try{
        const newData = await apiData.save();
        res.status(201).json(newData);
    }catch(err){
        res.status(201).json({message:err.message})
    }
})

//updating
router.patch('/:id',async(req,res)=>{
    try{
        const{error} = validateToDo(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        const apiData = await apimodel.findByIdAndUpdate(req.params.id,{
            title:req.body.title,
            description:req.body.description
            },{new:true});
        if(!apiData) return res.status(404).send("The data with the given id is not found")
        res.send(apiData);
    }catch(err){
        res.status(404).send("Data not found to update")
    }
    
}) 
    

//deleting
router.delete('/:id',async(req,res)=>{
    try{
        const apiData = await apimodel.findByIdAndRemove(req.params.id);
        res.json({message:'message deleted'})
    }catch(err){
        res.status(404).json({message:err.message})
    }
})


/* 
object destructure
for validating the schema when given data i.e while updating and posting
joi is npm module to validate schema
 */
function validateToDo(todo){
    const schema = Joi.object({
        title:Joi.string().min(3).max(30).required(),
        description:Joi.string().min(5).max(100).required()
    })
    return schema.validate(todo)
}


module.exports = router