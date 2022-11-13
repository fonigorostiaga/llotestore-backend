const express=require('express')
require('dotenv').config()
const indexRouter=require('./src/routes/index')
const fs=require('fs')

const app=express()

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

module.exports=app