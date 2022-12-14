const carritoModel=require('../mongo/models/carrito.models')
const productMdb=require('../products/productMDB.service')

class CartMdb{
    constructor(){}

    async createCart(data){
        const cart=new carritoModel(data)
        return await cart.save()
    }
    async findCart(user, pars){
        const cart=await carritoModel.find(user,pars)
        return cart
    }
    async prodToCart(data){
        const selectedProd=await productMdb.selectProd({uid:data.data}, {nombre:true, codigo:true,_id:true, imagen:true, descripcion:true})
        const cart= data.usuarioCreado._id
        const selectedCart=await carritoModel.find({_id:cart})
        const cartProds=selectedCart[0].productos
        cartProds.push(selectedProd[0])
        await carritoModel.updateOne({_id:cart},{$set:{productos:cartProds}})

    }
}

const cartMdb=new CartMdb()

module.exports=cartMdb