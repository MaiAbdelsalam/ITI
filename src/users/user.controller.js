import usersSchema from "./user.schema.js";
import asyncHandler  from 'express-async-handler';

class UserController{
    getAll=async(req,res,next)=>{
        const users=await usersSchema.find();
        res.status(200).json({users:users});

    }
    getOne=asyncHandler(async(req,res,next)=>{
        const users=await usersSchema.findById(req.params.id);
        if(!users) return res.status(400).send({message:'user not found'})
        res.status(200).json({users:users});
    })
    createOne=asyncHandler(async(req,res)=>{
        const users=await usersSchema.create({
            name:req.body.name ,
            email:req.body.email,
            password:req.body.password
        });
        res.status(201).json({users:users});
    })
    updateOne=asyncHandler(async(req,res)=>{
        const users=await usersSchema.findByIdAndUpdate(req.params.id,{
            name:req.body.name ,
            email:req.body.email,
            password:req.body.password 
        },
        {new:true});
        if(!users) return res.status(404).send({message:'error user not found'})
        res.status(200).json({users:users})
    })


    deleteOne=asyncHandler(async(req,res,next)=>{
        const users=await usersSchema.findByIdAndDelete(req.params.id);
        if(!users) return res.status(404).send({message:`Data Not Found`})
        // const todos=await todoShcema.deleteMany({userId:users._id});
        res.status(204).json({users:users})
    })
}
const userController=new UserController();
export default userController;