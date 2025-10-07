import postSchema from "./posts.schema.js";
import asyncHandler  from 'express-async-handler';

class PostsController{
    getAll=asyncHandler(async(req,res,next)=>{
        const filterData={}
        if(req.params.userId) filterData.userId=req.params.userId
        const posts=await postSchema.find(filterData);
        res.status(200).json({posts:posts});
    })
    getOne=asyncHandler(async(req,res,next)=>{
        const posts=await postSchema.findById(req.params.id);
        if(!posts) return res.status(400).send({message:'error'})
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
        console.log("Request Body:", req.body); // 🧪 خطوة مهمة للتأكد إن الـ body واصلة

        const posts=await postSchema.findByIdAndUpdate(req.params.id,{
            title:req.body.title ,
            content:req.body.content,
            userId:req.body.userId 
        },
        {new:true});
        if(!posts) return res.status(404).send({message:'error post not found'})
        res.status(200).json({posts:posts})
    })


    deleteOne=asyncHandler(async(req,res,next)=>{
        const posts=await postSchema.findByIdAndDelete(req.params.id);
        if(!posts) return res.status(404).send({message:`post Not Found`})
        // const todos=await todoShcema.deleteMany({userId:users._id});
        res.status(204).json({posts:posts})
    })
}
const postsController=new PostsController();
export default postsController;