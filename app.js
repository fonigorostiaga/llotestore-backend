const express=require('express')
require('dotenv').config()
const indexRouter=require('./src/routes/index')
const fs=require('fs')
const app=express()
const {Server:ioServer}=require('socket.io')
const {Server:HttpServer}=require('http')
const http=new HttpServer(app)
const io=new ioServer(http)
const fileProductos=require('./clase')
const carritosCreados=require('./claseCarrito')
const mongoose=require('mongoose')
const productoModel=require('./src/models/productos.model')
const carritoModel=require('./src/models/carrito.models')


const connection=async()=>{
    const MONGO_URL=process.env.MONGO_URL

    const MONGO_CONFIG={
        useNewUrlParser:true,
        useUnifiedTopology:true
    }
    try {
        await mongoose.connect(MONGO_URL,MONGO_CONFIG)
        console.info('mongoose connected')
    } catch (error) {
        
    }
}
const productosArray=[]
connection()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api',indexRouter)

app.get('/health',(_req,res)=>{
    res.status(200).json({
        health:"up",
        success:true,
        environment:process.env.ENVIRONMENT
    })
})

app.use(express.static(__dirname+'/public'))

app.get('/',(_req,res)=>{
    res.sendFile('index',{root:__dirname})
})
io.on('connection',async(socket)=>{
    console.log('new client connected')
    
    const productos=await productoModel.find()
    socket.emit('UPDATE_DATA',productos)

    socket.on('NEW_PRODUCT_TO_SERVER',async (data)=>{
        const productoNuevo=new productoModel(data)
        const productSave=await productoNuevo.save()
        const nuevosProds=await productoModel.find()
        io.sockets.emit('NEW_PRODUCTS_FROM_SERVER', nuevosProds)
    })
    socket.on('NEW_CART_TO_SERVER',async (data)=>{
        const nuevoUser=new carritoModel(data)
        const usuario=await nuevoUser.save()
        const usuarioActivo=await carritoModel.find({user:data.user},{_id:true, user:true})
        io.sockets.emit('NEW_CART_FROM_SERVER', usuarioActivo)
            console.log(usuarioActivo)        
    })
    socket.on('NEW_PRODUCT_TO_CART',async(data)=>{
        const selectedProd=await productoModel.find({_id:data.data}, {nombre:true, codigo:true,_id:true, imagen:true, descripcion:true})
        const cart= data.usuarioCreado._id
        const selectedCart=await carritoModel.find({_id:cart})
        const cartProds=selectedCart[0].productos
        cartProds.push(selectedProd[0])
        await carritoModel.updateOne({_id:cart},{$set:{productos:cartProds}})
        
    })
})

module.exports=http