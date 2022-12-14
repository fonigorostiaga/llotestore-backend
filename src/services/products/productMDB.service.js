const mongoose=require('mongoose')
const productoModel=require('../mongo/models/productos.model')

class ProductsMDB{
    constructor(){}

    async create(data){
        const newProd=new productoModel(data)
        return await newProd.save()
    }
    async getAllProds(){
        const prods= await productoModel.find() 
        return prods
    }
    async selectProd(prod, vars){
        const selectedProd=await productoModel.find(prod,vars)
        return selectedProd
    }
}

const productMdb=new ProductsMDB()
module.exports=productMdb