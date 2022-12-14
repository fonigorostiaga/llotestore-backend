const mongoose=require('mongoose')

const productoModel=mongoose.Schema({
    uid:{
        type:String,
        required:true
    },
    nombre:{
        type:String,
        required:true
    },
    descripcion:{
        type:String,
        required:true
    },
    codigo:{
        type:String,
        required:true
    },
    precio:{
        type:Number,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    imagen:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('productos',productoModel)