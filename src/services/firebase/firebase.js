const admin = require("firebase-admin");
const serviceAccount = require("./llotestudio-keys.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  const updateDocs=async()=>{
    const db=admin.firestore();
    const productos=db.collection('productos')
    try {
        let doc=productos.doc()
        await doc.create({
            _id: "6391d2629cacbae2eeb7a43c",
            nombre: 'Remera Arya Llote',
            descripcion: 'Remera 100% algodon de algodon con cuello abierto y la imagen de Arya Llote, salvadora de los 7 reinos',
            codigo: 'remeras',
            precio: 1500,
            stock: 15,
            imagen: 'remeraHombre.png',
            __v: 0
          })
        doc=productos.doc()
        await doc.create({
            _id:"6391d27e9cacbae2eeb7a43f",
            nombre: 'Remera LloteStudio',
            descripcion: 'Remera Hombre oversize 100% algodon con estampado LloteStudio Naranja',
            codigo: 'remeras',
            precio: 1500,
            stock: 15,
            imagen: 'remeraLlote.png',
            __v: 0
          })
        doc=productos.doc()
        await doc.create(    {
            _id:"6391d2a29cacbae2eeb7a442",
            nombre: 'Remera Leonardo Da Llote',
            descripcion: 'Remera oversize, 100% algodon con estampado de Leonardo Da Llote',
            codigo: 'remeras',
            precio: 1500,
            stock: 15,
            imagen: 'remeraHombreDaVinci.png',
            __v: 0
          })
        doc=productos.doc()
        await doc.create({
            _id: "6391d2c09cacbae2eeb7a445",
            nombre: 'Remera LloteStudio Azul',
            descripcion: 'Remera oversize 100% algodon con estampado LloteStudio a color en base azul',
            codigo: 'remeras',
            precio: 1500,
            stock: 15,
            imagen: 'remeraHombreLloteAzul.png',
            __v: 0
          })
        doc=productos.doc()
        await doc.create(    {
            _id: "6391d2db9cacbae2eeb7a448",
            nombre: 'Remera Llote and chill',
            descripcion: 'Remera oversize 100% algodon con estampado LloteStudio chillin',
            codigo: 'remeras',
            precio: 1500,
            stock: 15,
            imagen: 'remeralloteChill.png',
            __v: 0
          })
        doc=productos.doc()
        await doc.create(    {
            _id: "6391d2f59cacbae2eeb7a44b",
            nombre: 'Remera Llote cubico',
            descripcion: 'Remera oversize 100% algodon con estampado LloteStudio cubico',
            codigo: 'remeras',
            precio: 1500,
            stock: 15,
            imagen: 'remeraCubnico.png',
            __v: 0
          })
        doc=productos.doc()
        await doc.create(    {
            _id: "6391d3069cacbae2eeb7a44e",
            nombre: 'Remera Llote Lluvia',
            descripcion: 'Remera OverSize 100% algodon con estampado de Llote Messi',
            codigo: 'remeras',
            precio: 1500,
            stock: 15,
            imagen: 'remeraLluvia.png',
            __v: 0
          })
        doc=productos.doc()
        await doc.create(    {
            _id:"6391d31f9cacbae2eeb7a451",
            nombre: 'Remera Pixelada',
            descripcion: 'Remera oversize 100% algodon con estampado LloteStudio Pixelado',
            codigo: 'remeras',
            precio: 1500,
            stock: 15,
            imagen: 'remeraPixelada.png',
            __v: 0
          })
        doc=productos.doc()
        await doc.create(    {
            _id: "6391d3339cacbae2eeb7a454",
            nombre: 'Buzo San Llotin',
            descripcion: 'Buzo cangurito con capucha, color gris, imagen de San Llotin que te ayudara a buscar a tu media Llotenaranja',
            codigo: 'buzos',
            precio: 1500,
            stock: 15,
            imagen: 'reemeraLlotin.png',
            __v: 0
          })
          doc=productos.doc()
          await doc.create(    {
            _id:"6391d35f9cacbae2eeb7a457",
            nombre: 'Buzo San Llotin',
            descripcion: 'Buzo cangurito con capucha, color blanco, imagen de San Llotin que te ayudara a buscar a tu media Llotenaranja',
            codigo: 'buzos',
            precio: 1500,
            stock: 15,
            imagen: 'buzoSanLlotinBlanco.png',
            __v: 0
          })

    } catch (error) {
        console.log(error)
    }
  }
updateDocs()