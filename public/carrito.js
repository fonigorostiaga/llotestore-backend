const socket=io()
let usuarioCreado={user:"",_id:""}
const espacioUsuario=document.querySelector(".espacioCreacionuser")

const crearUser=()=>{
  const user=document.querySelector("#user").value
  const email=document.querySelector("#email").value
  const nombreCompleto=document.querySelector("#nombreCompleto").value
  const newUser={user, email, nombreCompleto, timeStamp:Date.now()}
  usuarioCreado=newUser
  espacioUsuario.innerHTML=`<h1>Hola ${newUser.nombreCompleto}</h1>`
  socket.emit('NEW_CART_TO_SERVER',newUser)
}
socket.on('NEW_CART_FROM_SERVER',data=>{

  usuarioCreado={...usuarioCreado,_id:data[0]._id}
})

if(usuarioCreado.user==""){
  espacioUsuario.innerHTML=`<div>
  <div class="mb-3">
    <label for="user" class="form-label">Usuario</label>
    <input type="text" name='user'class="form-control" id="user" aria-describedby="emailHelp">
  </div>
  <div class="mb-3">
    <label for="email" class="form-label">Email</label>
    <input type="email" name="email" class="form-control" id="email">
  </div>
  <div class="mb-3">
      <label for="nombre" class="form-label">Nombre Completo</label>
      <input type="nombre" name="nombre" class="form-control" id="nombreCompleto">
    </div>
  <button onclick="crearUser()" class="btn btn-primary">Submit</button>
</div></div>`
}else{
  espacioUsuario.innerHTML=`<p>${usuarioCreado.user}</p>`
}
socket.on('UPDATE_DATA',data=>{
  productos=data
  updateProducts(productos)
})

const updateProducts=(products)=>{
        productosToHtml=''
        products.forEach(i => {
            productosToHtml=productosToHtml+`<div class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">${i.nombre}</h5>
              <p class="card-text">${i.descripcion}</p>
              <p>precio: $${i.precio}</p>
              <button onclick='addToCart("${i.uid}")' class="btn btn-primary">Add to Cart</button>
            </div>
          </div>
    
          `
        });
        document.querySelector(".contenedorCards").innerHTML=productosToHtml
    }


const addToCart=(data)=>{
socket.emit('NEW_PRODUCT_TO_CART',{data, usuarioCreado})
}