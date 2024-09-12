const express=require('express')
const app=express();
const bodyParser=require("body-parser");
const fileUpload=require("express-fileupload")
const errorMiddleware=require("./middleware/error")
const cookieParser=require('cookie-parser');
// config
const path=require("path")
if(process.env.NODE_ENV!=="PRODUCTION"){
    require('dotenv').config({path:'backend/config/config.env'});
}
app.use(express.json());
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload())
app.use(express.json({ limit: '10mb' })); // Increase limit as per your requirement
app.use(express.urlencoded({ limit: '10mb', extended: true }));
// route imports
const product=require("./routes/productRoute");
const user=require("./routes/userRoute");
const order=require("./routes/orderRoute");
const payment=require("./routes/paymentRoute");
// const dashboard=require("../frontend/build");
 
app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order); 
app.use("/api/v1",payment); 


app.use(express.static(path.join(__dirname,"../frontend/build")))
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend/build/index.html"))
    
})
// middleware for errors
app.use(errorMiddleware);

module.exports = app