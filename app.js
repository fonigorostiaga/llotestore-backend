const express=require('express')
require('dotenv').config()
const indexRouter=require('./src/routes/index')
const fs=require('fs')
const app=express()
const {Server:ioServer}=require('socket.io')
const {Server:HttpServer}=require('http')
const http=new HttpServer(app)
const io=new ioServer(http)
const mongoConnect=require('./src/services/mongo/connect.mongo')
const productMdb=require('./src/services/products/productMDB.service')
const {v4:uuidV4}=require('uuid')
const cartMdb=require('./src/services/carts/cartsMdb.service')
mongoConnect()


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
    const productos=await productMdb.getAllProds()   
    socket.emit('UPDATE_DATA',productos)
    
    socket.on('NEW_PRODUCT_TO_SERVER',async (data)=>{
        const newData={...data,uid:uuidV4()}
        await productMdb.create(newData)
        const nuevosProds=await productMdb.getAllProds()
        io.sockets.emit('NEW_PRODUCTS_FROM_SERVER', nuevosProds)
    })
    socket.on('NEW_CART_TO_SERVER',async (data)=>{
        const cart={...data,uid:uuidV4()}
        await cartMdb.createCart(cart)

        const usuarioActivo=await cartMdb.findCart({user:data.user},{_id:true, user:true})

        io.sockets.emit('NEW_CART_FROM_SERVER', usuarioActivo)
    })
    socket.on('NEW_PRODUCT_TO_CART',async(data)=>{
        await cartMdb.prodToCart(data)
        
    })
})

module.exports=http