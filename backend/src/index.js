//Library Imports
import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

//Route Imports
import authRoutes from "./routes/auth.routes.js";
import problemRoutes from "./routes/problem.routes.js"

//dotenv configuration
dotenv.config();

//app initialization
const app = express();

//express middlewares
app.use(express.json());
app.use(cookieParser())

//Home Route
app.get("/",(req,res)=>{
    res.send("Welcome To Coding Hub")
})

// Auth Route 
app.use("/api/v1/auth",authRoutes);  

// Problem Route
app.use("/api/v1/problems",problemRoutes)

const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`)
})