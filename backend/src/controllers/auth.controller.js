import bcrypt from "bcryptjs"
import {db} from "../libs/db.js"
import { UserRole } from "../generated/prisma/index.js";
import jwt from "jsonwebtoken";

export const register = async(req,res)=>{
    const {email, password , name} = req.body;

    try {
        const existingUser = await db.user.findUnique({
            where : {
                email
            }
        });

        if(existingUser){
            return res.status(400).json({
                error : "User already exists",
                success : false
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await db.user.create({
            data : {
                email,
                password:hashedPassword,
                name,
                role:UserRole.USER
            }
        });

        const token = jwt.sign({
            id:newUser.id
        },process.env.JWT_SECRET,{
            expiresIn : "7d"
        });

        res.cookie("jwt", token , {
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_ENV !== "development",
            maxAge:1000*60*60*24*7 //7 days
        });

        res.status(201).json({
            message:"User created successfully",
            user:{
                id:newUser.id,
                email:newUser.email,
                name:newUser.name,
                role:newUser.role,
                image:newUser.image
            }
        })

    } catch (error) {
        console.error("Error Creating user",error);
        res.status(500).json({
            error : "Error creating user",
            success : false
        })
    }
}

export const login = async(req,res)=>{
     const {email, password} = req.body;
     try {
        const user = await db.user.findUnique({
            where:{
                email
            }
        });
        if(!user){
            return res.status(401).json({
                error:"User not found",
            })
        }

        const iSMatch = await bcrypt.compare(password , user.password);

        if(!iSMatch){
            return res.status(401).json({
                error : "Invalid credentials"
            })
        }

        const token = jwt.sign({id:user.id},process.env.JWT_SECRET,{
            expiresIn:"7d"
        });

        res.cookie("jwt", token , {
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_ENV !== "development",
            maxAge:1000*60*60*24*7 //7 days
        });

        res.status(201).json({
            success : true,
            message:"User logged in successfully",
            user:{
                id:user.id,
                email:user.email,
                name:user.name,
                role:user.role,
                image:user.image
            }
        })



     } catch (error) {
        console.error("Error Logging in user",error);
        res.status(500).json({
            error : "Error logging in user",
            success : false
        })
     }
}

export const logout = async(req,res)=>{
    try {
        res.clearCookie("jwt",{
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_ENV !== "development"
        });

        res.status(200).json({
            success:true,
            message:"user logged out successfully"
        });


    } catch (error) {
        console.error("Error Logging out user",error);
        res.status(500).json({
            error : "Error logging out user",
            success : false
        })
    }
}
 
export const check = async(req,res)=>{
    try {
        res.status(200).json({
            success : true,
            message : "User authenticated Successfully",
            user : req.user
        });
    } catch (error) {
        console.error("Error checking out user",error);
        res.status(500).json({
            error : "Error checking out user",
            success : false
        })
    }
}