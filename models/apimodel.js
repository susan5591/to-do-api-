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
    is_Deleted:{
        type:Boolean,
        default:false,
        select:false
    }
});

module.exports = mongoose.model('apimodel',apiSchema)