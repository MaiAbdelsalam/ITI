import usersShcema from "../users/user.schema.js";
import asyncHandler  from 'express-async-handler';
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";
import CustomError from "../utils/customError.js";
class AuthService{
    signUp=asyncHandler(async(req,res,next)=>{
        const user=await usersShcema.create({
            name:req.body.name,
            email:req.body.email,
            password:await bcrypt.hash(req.body.password,13)
        })
        const token=createToken(user._id)
        res.status(201).json({data:user,token})
    })

    logIn=asyncHandler(async(req,res,next)=>{
        const user=await usersShcema.findOne({email:req.body.email})
        if(!user || !(await  bcrypt.compare(req.body.password,user.password))) throw new CustomError('incorrect email or password',401)
        const token=createToken(user._id)
        res.status(200).json({user:user,token})
    })

    protectRoutes=asyncHandler(async(req,res,next)=>{
        // console.log(req.headers)
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token=req.headers.authorization.split(" ")[1]
            console.log(token)
        }
        if(!token){
            throw new CustomError('you are not login to get access this route', 401)
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)
        console.log(decoded)
        const currentUser=await usersShcema.findById(decoded.userId)
        if(!currentUser) throw new CustomError(`the user that belong to this token does no longer exist `,401)
        if(currentUser.passwordChangedAt){
            const passwordChangedTimeStamp=parseInt(currentUser.passwordChangedAt.getTime() / 1000,10)
            if(passwordChangedTimeStamp > decoded.iat){
                throw new CustomError("user recnetly changed his password please login again",401)
            }
            // console.log(passwordChangedTimeStamp,decoded.iat)
        } 
        req.user=currentUser
        next()
    });

    allowedTo=(...roles)=>
       asyncHandler(async(req,res,next)=>{
            if(!roles.includes(req.user.role)){
               throw new CustomError("you are not allowed access this route",403)
            }
            next()
        })
}
const authService=new AuthService();
export default authService;