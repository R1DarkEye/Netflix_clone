import jwt from 'jsonwebtoken';
import { ENV_VARS } from '../config/envVar.js';

export const generateTokenAndSetCookie=(userId,res)=>{
    //jwt token
    const token=jwt.sign({userId},ENV_VARS.JWT_SECRET,{expiresIn:'7d'})
    

    //cookie(name,value,options)
    res.cookie('token.netflix.anonymous',token,{
        maxAge:7*24*60*60*1000, //7 days
        httpOnly:true, //cookie cannot be accessed by client side script
        sameSite:true, //cookie will only be sent in same site
        secure:ENV_VARS.NODE_ENV !== 'development', //development mode

    })
    return token;
}