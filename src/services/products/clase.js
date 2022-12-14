const fs=require('fs')

class Productos{
    constructor(archivo){
        this.archivo=archivo
    }
    async addProd(prod){
        try {
            const data=await fs.promises.readFile(this.archivo,'utf-8')
            const dataJson=JSON.parse(data)
            const id=dataJson.length+1
            prod={...prod,id:id}
            dataJson.push(prod)
            await fs.promises.writeFile(this.archivo,JSON.stringify(dataJson,null,2))
            
        } catch (error) {
            const id=1
            prod={...prod,id:id}
            await fs.promises.writeFile(this.archivo, JSON.stringify([prod],null,2))
            
        }
    }
    async getById(id){
        try {
            const data=await fs.promises.readFile(this.archivo,"utf-8")
            const jsonData=JSON.parse(data)
            const elementofiltrado=jsonData.find(item=>item.id==id)
            if(elementofiltrado==undefined){
                return null       
            }else{
                return elementofiltrado
            }
        } catch (error) {
            console.log(error)

        }
    }
    async getAll(){
        try{
        const data=await fs.promises.readFile(this.archivo,"utf-8")
        const jsonData=JSON.parse(data)
        return jsonData 
    }catch(error){
        throw new Error(error)
    }
    }
    async deleteById(id){
        try{
            const data=await fs.promises.readFile(this.archivo,"utf-8");
            const jsonData=JSON.parse(data)
            const deleted = jsonData.find(i=>i.id==id)
            const products = jsonData.filter(i=>i.id!=id)
            for(let i=1;i<=products.length;i++){
                products[i-1].id=i
            }
            await fs.promises.writeFile(this.archivo,JSON.stringify(products,null,2))
            return deleted
    
        }catch(error){
            console.log("el elemendo que intentas eliminar no existe")
        }
    }
    async putByID(id,obj){
        try {
            const data=await fs.promises.readFile(this.archivo,"utf-8");
            const jsonData=JSON.parse(data)
            const product = jsonData.find(i=>i.id==id)
            const nuevoID=parseInt(id)
            const prodModify = {...product, ...obj,id:nuevoID}
            const products = jsonData.filter(i=>i.id!=id)
            products.push(prodModify)
            await fs.promises.writeFile(this.archivo,JSON.stringify(products,null,2))
            return products
            
        } catch (error) {
            throw new Error

        }
    }
}

const fileProductos=new Productos('./productos.txt')


module.exports=fileProductos