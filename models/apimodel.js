const mongoose = require('mongoose');

const apiSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    writtenDate:{
        type:Date,
        required:true,
        default:Date.now
    },
    //select helps to hide this column from the users while displayin the output
    is_Deleted:{
        type:Boolean,
        default:false,
        select:false
    }
});

module.exports = mongoose.model('apimodel',apiSchema)