const mongoose=require('mongoose')

const carritoModel=mongoose.Schema({
    uid:{
        type:String,
        required:true
    },
    user:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    nombreCompleto:{
        type:String,
        required:true
    },
    timeStamp:{
        type:String,
        required:true
    },
    productos:{
        type:Array, 
        required:true, 
        default:[]
    }
})

module.exports=mongoose.model('carritos',carritoModel)