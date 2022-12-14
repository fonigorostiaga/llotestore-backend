const mongoose =require('mongoose')
const _=require('loadsh')
require('dotenv').config()

const mongoConnect= async ()=>{
    let MONGO_URI;
    const MONGO_USER=process.env.MONGO_USER
    const MONGO_PASS=process.env.MONGO_PASS
    const MONGO_DB_NAME=process.env.MONGO_DB_NAME
    const MONGO_QUERY=process.env.MONGO_QUERY
    const MONGO_HOST=process.env.MONGO_HOST
    if(_.isNil(MONGO_USER)){
        MONGO_URI=`${process.env.MONGO_URI}/${MONGO_DB_NAME}`;
    }else{
        MONGO_URI=`mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}/${MONGO_DB_NAME}?${MONGO_QUERY}`
    }
    console.log()

    await mongoose.connect(MONGO_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    console.info('mongo Connected')
}

module.exports= mongoConnect