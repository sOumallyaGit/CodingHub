import express from "express";

const authRoutes = express.Router();

// register route
authRoutes.post("/register");

authRoutes.post("/login");

authRoutes.post("/logout");

authRoutes.get("/check");


export default authRoutes;