const express=require('express')
const router=express.Router()
const fileProductos=require('../../../clase')

router.get('/',async(_req,res)=>{
    try {
        const productos=await fileProductos.getAll()
        res.status(200).send(productos)
    } catch (error) {
        
    }
})

router.get('/:id', async(req,res)=>{
        
        try {
            const {id}=req.params;
            const producto=await fileProductos.getById(id)
            res.status(200).json(producto)
        } catch (error) {
            
        }
})

router.post('/', async(req,res)=>{
    try {
        const {body}=req
        const product={...body,timeStamp:Date.now()}
        await fileProductos.addProd(product)
        const productos=await fileProductos.getAll()
        const productoNuevo=productos[(productos.length)-1]
        res.status(200).json(productoNuevo)
    } catch (error) {
        
    }
})

router.put('/:id', async(req,res)=>{
    try {
        const {id}=req.params
        const {body}=req
        const productosModificados= await fileProductos.putByID(id,body)
        res.status(200).send(productosModificados)
    } catch (error) {
        
    }
})

router.delete('/:id',async(req,res)=>{
    try {
        const {id}=req.params
        const deleted= await fileProductos.deleteById(id)
        res.status(200).json({
            result:"success",
            deleted:deleted
        })

    } catch (error) {
        
    }
})
module.exports=router