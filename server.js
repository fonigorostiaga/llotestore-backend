const http=require('./app')

const PORT=process.env.PORT
http.listen(PORT,()=>console.info(`Server up and running in port ${PORT}`))