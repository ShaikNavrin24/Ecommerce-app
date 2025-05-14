const express=require("express")
const cors=require("cors")
const connectDB=require('./config/db')
require('dotenv').config()
const router=require("./routes/index")
const app=express()
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}))
const cookieParser=require('cookie-parser')
app.use(express.json())
app.use(cookieParser())
app.use("/api",router)
const PORT=8080
connectDB()
app.listen(PORT,()=>{
    console.log("Server is running")
})