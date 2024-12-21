import {User} from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/genrateToken.js";
import express from "express";

export async function signup(req,res) {
    try{
        //get user input
        const {email,password,username}=req.body;
        if(!email || !password || !username){
            return res.status(400).json({success:false,message:"All feilds are required"})
        }
    
    
    //validate email
        const emailRegex=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({success:false,message:"Invalid email"})
        }
    
    //validate password
        if(password.length<6){
            return res.status(400).json({success:false,message:"Password must be atleast 6 characters"})
        }
    
    //check if user already exists
        const existingUserByEmail=await User.findOne({email:email})
        if(existingUserByEmail){
            return res.status(400).json({success:false,message:"User with this email already exists"})
        }
    
    //check if username already exists
        const existingUserByUsername=await User.findOne({username:username})
        if(existingUserByUsername){return res.status(400).json({success:false,message:"User with this username already exists"})}

        //salt -bcrypt
        const salt=await bcrypt.genSalt(10);

        //hashing password
        const passwordHash=await bcrypt.hash(password,salt)

        //random profile pic
        const PROFILE_PIC=['/avatar1.png','/avatar2.png','/avatar3.png']
        const image=PROFILE_PIC[Math.floor(Math.random()*PROFILE_PIC.length)]
    
        //create new user
        const newUser=new User({email,password:passwordHash,username,image})
    
        //generate token and set cookie
        
        generateTokenAndSetCookie(newUser._id,res)
        
        //save user to db
        await newUser.save()


        //send response
        res.status(201).json({success:true,user:{...newUser._doc,password:""}})
        
        
    
    
    }catch(error){
        console.log("Error in signup controller"+error)
        res.status(500).json({success:false,message:"Internal server error"})
    }
}

export async function login(req,res) {
    try{
        //get user input
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({success:false,message:"All feilds are required"})
        }
        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({success:false,message:"Invalid credentials"})
        }
        //compare password
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({success:false,message:"Invalid credentials"})
        }
        //generate token and set cookie
        generateTokenAndSetCookie(user._id,res)
        //send response
        res.status(200).json({success:true,user:{...user._doc,password:""}})
    }catch(error){
        console.log("Error in login controller"+error)
        res.status(500).json({success:false,message:"Internal server error"})
    }
}

export async function logout(req,res) {
    try{
        res.clearCookie('token.netflix.anonymous')
        res.json({success:true,message:"Logged out successfully"})
}catch(error){
    console.log("Error in logout controller"+error)
    res.status(500).json({success:false,message:"Internal server error"})
}}
export async function authCheck(req,res) {
    try{
        res.status(200).json({success:true,user:req.user})
    }catch(error){
        console.log("Error in authCheck controller"+error.message)
        res.status(500).json({success:false,message:"Internal server error"})
    }
}