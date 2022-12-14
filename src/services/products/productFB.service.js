const admin = require("firebase-admin");
const serviceAccount = require("../../../llotestudio-keys.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

class MethodsFB{
    constructor(productos,carritos){
        this.productos=productos,
        this.carritos=carritos
    }

    async newProd(data){
        const db=admin.firestore()
        const query=db.collection(this.productos)
        let doc=query.doc() 
        await doc.create(data)

    }
    async getAllProds(){
        const db=admin.firestore()
        const query=db.collection(this.productos)
        const data=await query.get()
        const prods=data.docs
        const arrProds=prods.map(item=>{return item.data()})    
        return arrProds
    }
    async getOneProd(data){
        const db=admin.firestore()
        const query=db.collection(this.productos)
        const prod=await query.get(data)
        const producto=prod.data()
        return producto
    }
    async createCart(data){
        const db=admin.firestore()
        const query=db.collection(this.carritos)
        let doc=query.doc()
        await doc.create(data)
        console.log('cart added to FB')
    }
    async prodToCart(cart,data){
        const db=admin.firestore()
        const query=db.collection(this.carritos)
        const carrito=query.doc({cart})
        console.log(carrito)
    }
    
}

const instanceFB=new MethodsFB('productos','carritos')

module.exports=instanceFB