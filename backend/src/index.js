//Library Imports
import express from "express"
import dotenv from "dotenv"

//Route Imports
import authRoutes from "./routes/auth.routes.js";

//dotenv configuration
dotenv.config();

//app initialization
const app = express();

//express middlewares
app.use(express.json());

//Home Route
app.get("/",(req,res)=>{
    res.send("Welcome To Coding Hub")
})

// Auth Route 
app.use("/api/v1/auth",authRoutes);    

const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`)
})