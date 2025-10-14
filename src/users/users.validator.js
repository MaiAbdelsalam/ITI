import validatorMiddleware from "../middelwares/validator.middelware.js";
import usersSchema from "./user.schema.js";
import { body,param } from "express-validator";
import CustomError from "../utils/customError.js";

class UsersValidation{
    createOne=[body('name').notEmpty().withMessage('enter userName')
        .isLength({min:2,max:50}).withMessage('validation length short must between 2 to 50 char'),
        body('password').notEmpty().withMessage('enter password')
        .isLength({min:6,max:20}).withMessage('password length between 1 to 20 char'),
        body('email').notEmpty().withMessage('enter email')
        .isEmail().withMessage('enter valid email')
        .custom(async(val,{req})=>{
            const user=await usersSchema.findOne({email:val})
            if(user) throw new Error('user email is already exist')
            return true;
        }),
    validatorMiddleware]

    updateOne=[
        param('id').isMongoId().withMessage( new CustomError('invalid user id',400)),
        body('name').optional()
        .isLength({min:2,max:50}).withMessage('validation length short must between 2 to 50 char'),
        body('email').optional()
        .isEmail().withMessage('enter valid email')
        .custom(async(val,{req})=>{
            const user=await usersSchema.findOne({email:val})
            if(user && user._id.toString() !== req.params.id) throw new Error('user email is already exist')
            return true;
        }),
        body('password').optional()
        .isLength({min:6,max:20}).withMessage('password length between 1 to 20 char')
        ,validatorMiddleware]

    getOne=[param('id').isMongoId().withMessage( new CustomError('invalid post id',400))
        ,validatorMiddleware];

    deleteOne=[param('id').isMongoId().withMessage( new CustomError('invalid post id',400))
        ,validatorMiddleware]

}
const usersValidation=new UsersValidation
export default usersValidation