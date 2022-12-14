
const socket=io()
let productos=[]
socket.on('UPDATE_DATA',data=>{
    productos=data
    updateProducts(productos)
    console.log(productos)

})
const updateProducts=(products)=>{
    productosToHtml=''
    products.forEach(i => {
        productosToHtml=productosToHtml+`<div class="card" style="width: 18rem;">
        <img src="..." class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${i.nombre}</h5>
          <p class="card-text">${i.descripcion}</p>
          <p>${i.precio}</p>
          
        </div>
      </div>

      `
    });
    document.querySelector(".cardsContainer").innerHTML=productosToHtml
}



const newProduct=()=>{
    const nombre=document.querySelector('#nombre').value;
    const codigo=document.querySelector('#codigo').value;
    const descripcion=document.querySelector('#descripcion').value;
    const precio=document.querySelector('#precio').value;
    const imagen=document.querySelector('#imagen').value;
    const stock=document.querySelector('#stock').value;
    if(!nombre||!codigo||!descripcion||!precio||!imagen||!stock){
        alert('te faltan datos')
        return
    }
    const prodObj={nombre, codigo, descripcion, precio, imagen, stock, timeStamp:Date.now()}
    socket.emit('NEW_PRODUCT_TO_SERVER',prodObj)
    document.querySelector('#nombre').value='';
    document.querySelector('#codigo').value='';
    document.querySelector('#descripcion').value='';
    document.querySelector('#precio').value='';
    document.querySelector('#imagen').value='';
    document.querySelector('#stock').value='';
}



socket.on('NEW_PRODUCTS_FROM_SERVER',data=>{
    updateProducts(data)
})




