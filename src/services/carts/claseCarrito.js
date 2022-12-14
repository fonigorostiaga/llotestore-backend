const fs=require('fs')
class Carrito{
    constructor(archivo){
        this.archivo=archivo
    }
    async createNewCarrito(){
        try {
            const data=await fs.promises.readFile(this.archivo,"utf-8")
            const dataJson=JSON.parse(data)
            const id=dataJson.length+1
            const carrito={id:id,timeStamp:Date.now(),productos:[]}
            dataJson.push(carrito)
            await fs.promises.writeFile(this.archivo, JSON.stringify(dataJson,null,2))
           return carrito
        } catch (error) {
            const id=1
            const carrito={id:id,timeStamp:Date.now(),productos:[]}
            await fs.promises.writeFile(this.archivo,JSON.stringify([carrito],null,2))
            return carrito
        }
    }
    async getProductsFromCart(id){
        try {
            const data=await fs.promises.readFile(this.archivo,"utf-8")
        const dataJson=JSON.parse(data)
        const cartConsulted=dataJson.find(i=>i.id==id)
        const cartProducts=cartConsulted.productos
        return cartProducts
        } catch (error) {
            console.log("el carrito que buscas no funciona")   
        }
    }
    async addProdsToCart(id,prod){
        try {
            const data=await fs.promises.readFile(this.archivo,"utf-8")
            const dataJson=JSON.parse(data)
            dataJson[id-1].productos.push(prod)
            await fs.promises.writeFile(this.archivo,JSON.stringify(dataJson,null,2))
            return dataJson[id-1]
             
        } catch (error) {
            console.log("hay un error en tu pedido, por favor revisalo")
        }
    }
    async deleteProdFromCart(id, prod){
        try {
            const data=await fs.promises.readFile(this.archivo,"utf-8")
            const dataJson=JSON.parse(data)
            
            const cart=dataJson[id-1]
            const newCartProds=cart.productos.filter(i=>i.id!=prod)
            cart.productos=newCartProds
            dataJson[id-1]=cart
            await fs.promises.writeFile(this.archivo,JSON.stringify(dataJson,null,2))
            return dataJson[id-1]
        } catch (error) {
            console.log(error.message)
        }
    }
    async deleteCart(id){
        try {
            const data=await fs.promises.readFile(this.archivo,"utf-8")
            const dataJson=JSON.parse(data)
            const newCarts=dataJson.filter(i=>i.id!=id)
            for(let i=0;i<newCarts.length;i++){
                newCarts[i].id=i+1
            }
            await fs.promises.writeFile(this.archivo,JSON.stringify(newCarts,null,2))
        } catch (error) {
            console.log(error.message)
        }
    }
}

const carritosCreados=new Carrito('./carrito.txt')

module.exports=carritosCreados

