const mongoose = require('mongoose');


const contachSchema = mongoose.Schema({
    title:{
        type:String,
        trim:true
    },
    description:{
        type:String,
        trim:true
    },
    media:{
        type:String,
        trim:true
    },
    status:{
        type:String,
        enum:['open','progress','completed'],
        default:'open'
    }
}, { timestamps: true })

const contactModal = mongoose.model('contact', contachSchema);
module.exports = contactModal;