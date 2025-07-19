//Library Imports
import express from "express"
import dotenv from "dotenv"

//Route Imports

//dotenv configuration
dotenv.config();

//app initialization
const app = express();

const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`)
})