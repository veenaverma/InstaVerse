import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import User from "../models/user.js";

const login=async(request,response)=>{
    const {email,password}=request.body;  //post request data is available in the request.body
    try{
        const oldUser = await User.findOne({email});
        if(!oldUser){
            return response.status(400).json({message:"User does not exist"});
        }

        const isPasswordValid=await bcrypt.compare(password,oldUser.password);

        if(!isPasswordValid)
        {
            return response.status(400).json({message:"Invalid password"})
        }

        const token = jwt.sign({ email:oldUser.email, id:oldUser._id },"1234",{ expiresIn:"1h" });
        response.status(200).json({ result:oldUser, token })
    }
    catch{
        response.status(500).json({message:"something went wrong"});
    }
};

const signup=async(request,response)=>{
    const {username, email, password, confirmPassword} =request.body;

    try{
        const oldUser = await User.findOne({email});
        if(oldUser){
            return response.status(400).json({message:"Email already exists"});
        }

        if(password!==confirmPassword)
        {
            return response.status(400).json({message:"Passwords do not match"});         
        }
        
        

    const encryptedPassword = await bcrypt.hash(password,12);
    const result = await User.create({username,email,password:encryptedPassword});
    const token = jwt.sign({email:result.email, id: result._id},"1234",{expiresIn:"1h"});
    
    response.status(201).json({result,token});
        
    }
    catch(error){
        console.log(error);
        response.status(500).json({message:"Somethin went wrong"});
    }
};

export {login,signup};