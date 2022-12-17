const mongoose=require('mongoose')

const connection=async()=>{
    const MONGO_URL=process.env.MONGO_URL

    const MONGO_CONFIG={
        useNewUrlParser:true,
        useUnifiedTopology:true
    }
    try {
        await mongoose.connect(MONGO_URL,MONGO_CONFIG)
        console.info('mongoose connected')
    } catch (error) {
        
    }
}