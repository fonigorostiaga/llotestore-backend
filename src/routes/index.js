const express=require('express')
const productRouter=require('./productos/product.router')
const carritoRouter=require('./productos/carrito.router')
const router=express.Router()

router.get('/health',(_req,res)=>{
    res.status(200).json({
        success:true,
        health:"up",
        environment:process.env.ENVIRONMENT,
        route:"api"
    })
})
.use('/productos',productRouter)
.use('/carrito',carritoRouter)
module.exports=router