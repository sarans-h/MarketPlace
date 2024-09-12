
const app=require('./app');
const cloudinary=require('cloudinary');
// config

if(process.env.NODE_ENV!=="PRODUCTION"){
    require('dotenv').config({path:'backend/config/config.env'});
}

const connectDatabase=require("./config/databse");

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

// handling uncaught exception like(console.log(youtubr)//youtube is not defined)
process.on('uncaughtException',err=>{
    console.log(`error: ${err.message}`);
    console.log("Shutting Down Server due to uncaught exception");
    process.exit(1)
})
// console.log(youtube);


// connect to database
connectDatabase();
const server=app.listen(process.env.PORT,()=>{
    console.log("server is running at",process.env.PORT);
    
})


// unhandled promise rejection
process.on('unhandledRejection',err=>{
    console.log(`error: ${err.message}`);
    console.log("Shutting Down Server due to unHandled promise rejection");
    server.close(()=>{
        process.exit(1)
    })
})


console.log("i am the backend");
