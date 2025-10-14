import CustomError from "../utils/customError.js";
import postSchema from "./posts.schema.js";
import asyncHandler  from 'express-async-handler';
import {isValidObjectId}  from "mongoose";

class PostsController{
    getAll=asyncHandler(async(req,res,next)=>{
        const filterData={}
        if(req.params.userId) filterData.userId=req.params.userId
        const posts=await postSchema.find(filterData);
        res.status(200).json({posts:posts});
    })
    
    getOne=asyncHandler(async(req,res,next)=>{
        const { id } = req.params;
        if (!isValidObjectId(id)) {
          throw new CustomError("Invalid id", 400);
        }
        const posts=await postSchema.findById(req.params.id);
        if(!posts) throw new CustomError('post not found',404)
        res.status(200).json({posts:posts});
    })
    createOne=asyncHandler(async(req,res)=>{
        const posts=await postSchema.create(
            {
                title:req.body.title ,
                content:req.body.content,
                userId:req.body.userId 
            }
        );
        res.status(201).json({posts:posts});
    })

    updateOne=asyncHandler(async(req,res)=>{
        console.log("Request Body:", req.body); 
        const { id } = req.params;
        if (!isValidObjectId(id)) {
          throw new CustomError("Invalid id", 400);
        }
        const posts=await postSchema.findByIdAndUpdate(req.params.id,{
            title:req.body.title ,
            content:req.body.content,
            userId:req.body.userId 
        },
        {new:true});
        
        if(!posts) throw new CustomError('post not found',404)
        res.status(200).json({posts:posts})
    })


    deleteOne=asyncHandler(async(req,res,next)=>{
        const posts=await postSchema.findByIdAndDelete(req.params.id);
        if(!posts) throw new CustomError('post not found',404)
        // const todos=await todoShcema.deleteMany({userId:users._id});
        res.status(204).json({posts:posts})
    })
}
const postsController=new PostsController();
export default postsController;