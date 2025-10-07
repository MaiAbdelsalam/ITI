import validatorMiddleware from "../middelwares/validator.middelware.js";
import userSchema from "../users/user.schema.js";
import postSchema from "./posts.schema.js";
import { body,param } from "express-validator";

class PostsValidation{
    createOne=[body('title').notEmpty().withMessage('enter title')
        .isLength({min:2,max:50}).withMessage('validation length short must between 2 to 50 char'),
        body('content').notEmpty().withMessage('enter content')
        .isLength({min:6,max:200}).withMessage('password length between 1 to 20 char'),
        body('userId').notEmpty().withMessage('enter userid')
        .isMongoId().withMessage('invalid user id')
        .custom(async(val,{req})=>{
            const user=await userSchema.findById(val)
            if(!user) throw new Error('user not found')
            return true;
        }),
    validatorMiddleware]

    updateOne=[
        param('id').isMongoId().withMessage('invalid user id'),
        body('title').optional()
        .isLength({min:2,max:50}).withMessage('validation length short must between 2 to 50 char'),
        body('content').optional()
        .isLength({min:2,max:200}).withMessage('validation length short must between 2 to 50 char'),
        body('userId').optional()
        .isMongoId().withMessage('enter valid userId')
        .custom(async(val,{req})=>{
            const user=await userSchema.findById(val)
            if(!user) throw new Error('userId is not exist')
            return true;
        })
        ,validatorMiddleware]

    getOne=[param('id').isMongoId().withMessage('invalid user id')
        ,validatorMiddleware];

    deleteOne=[param('id').isMongoId().withMessage('invalid user id')
        ,validatorMiddleware]

}
const postsValidation=new PostsValidation
export default postsValidation