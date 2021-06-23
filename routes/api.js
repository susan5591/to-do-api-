const express = require('express');
const router = express('router');

const apimodel = require('../models/apimodel');


async function getToDo(req,res,next){
    let apiData
    try{
        apiData = await apimodel.findById(req.params.id);
        if(!apiData) return res.status(404).json({message:"Cannot find the serached ToDo"})
    }catch(err){
        return res.status(500).json({message:err.message})
    }
    res.apiData = apiData
    next()
}
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
router.get('/:id',(req,res)=>{
    try{
        res.json(res.apiData);
    }catch(err){
        res.status(404).json({messgae:err.message})
    }
},getToDo)


//creating
router.post('/',async(req,res)=>{
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
router.patch('/:id',getToDo,async(req,res)=>{
    if(req.body.title !=null){
        res.apiData.title = req.body.title;
    }
    if(req.body.description !=null) {
        res.apiData.description = req.body.description;
    }
    try{
        const updateApiData = await res.apiData.save();
        res.json(updateApiData)
    }catch(err){
        res.status(400).json({message:err.message})
    }
})


//deleting
router.delete('/:id',getToDo,async(req,res)=>{
    try{
        await res.apiData.remove();
        res.json({message:'message deleted'})
    }catch(err){
        res.status(404).json({message:err.message})
    }
})

/* 
searchin title of todo with full strings or just the substring
using the regular expression
.*t.* means any title that contains it's substring.
"i" is for making it not case sensitive.

to check arr.lenth is empty or not
arr.length === 0
!arr.length
*/

router.get('/search/:title',async function(req,res){
    try{
        var regex = new RegExp(req.params.title,'i');
        let data = await apimodel.find({title:regex});        
        if(data.length===0){
            res.status(404).send("Data not found")
            
        }else{
            res.status(400).json(data);
        } 
    }catch(err){
        // console.error(err)
        return res.status(500).send("Enter the data")
    }        
})

// router.get('/search/:title',(req,res)=>{
//     async function getTitle(){
//         const title = await apimodel
//             .find({title:/.*t.*/i});
//         console.log(title);
//     }
//     getTitle(); 
// }) 

// async function getTitle(){
//     const title = await apimodel
//         .find({title:/.*.*/i});
//     console.log(title);
// }
// getTitle(); 

module.exports = router