const express=require('express')
const router=express.Router()
const fileProductos=require('../../../clase')
const carritos=require('../../../claseCarrito')
router.post('/',async(_req,res)=>{
    try {
        const nuevoCarrito=await carritos.createNewCarrito()
        res.status(200).json(nuevoCarrito)
    } catch (error) {
        res.status(500).json({
            error:"error"
        })
    }
})
router.get('/:id/productos',async(req,res)=>{
    try {
        const {id}=req.params
        const cartConsulted=await carritos.getProductsFromCart(id)
        if(cartConsulted.length==0){
            res.status(200).send("no tenes productos en el carrito")
        }else{
            res.status(200).send(cartConsulted)
        }
    } catch (error) {
        res.status(500).json({
            error:"error"
        })
    }
})
router.post('/:id/productos/:id_prod',async(req,res)=>{
    try {
        const {id,id_prod}=req.params
        const producto=await fileProductos.getById(id_prod);
        if(producto){
         const cartModified=await carritos.addProdsToCart(id,producto)
         res.status(200).json(cartModified)}
         else{
            res.status(500).json({
                error:"error"
            })
         }
    } catch (error) {
        res.status(500).json({
            error:"error"
        })
    }
})

router.delete('/:id/productos/:id_prod', async(req,res)=>{
    try {
            const {id,id_prod}=req.params
            const producto=await fileProductos.getById(id_prod);
        if(producto){
            const data=await carritos.deleteProdFromCart(id, id_prod)
            res.status(200).json({
                deleted:producto,
                productsInCart:data
            })
        }else{
            res.status(500).json({
                error:"error"
            })
        }
    } catch (error) {
        res.status(500).json({
            error:"error"
        })
    }
})
router.delete('/:id',async(req,res)=>{
    try {
        const {id}=req.params
        const deletedProds=await carritos.getProductsFromCart(id)
        const deletedCart={id:id,productos:deletedProds}
        await carritos.deleteCart(id)
        res.status(200).json({
            deleted:deletedCart
        })

    } catch (error) {
        res.status(500).json({
            error:"error"
        })
    }
})

module.exports=router