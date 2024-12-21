import  jwt  from "jsonwebtoken";
import {User} from "../models/user.model.js";
import { ENV_VARS } from "../config/envVar.js";

export const protectRoute=async (req,res,next)=>{
        try {
            const token=req.cookies["token.netflix.anonymous"];

            if(!token){
                return res.status(401).json({success:"false",message:"Not authorized"});        
            }
            const decoded=jwt.verify(token,ENV_VARS.JWT_SECRET);
            if(!decoded){
                return res.status(401).json({success:"false",message:"Not authorized"}); 
            }
            
            const user=await User.findById(decoded.userId).select("-password");//deselcting password

            if(!user){
                return res.status(404).json({success:"false",message:"user not found"}); 
            }
            req.user=user;
            next();

        }catch(error){
            console.log("error in protect middleware ",error);
            return res.status(500).json({success:"false",message:"Internal server error"});
        }
}