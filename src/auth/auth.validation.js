import validatorMiddleware from "../middelwares/validator.middelware.js";
import usersSchema from "../users/user.schema.js";
import { body,param } from "express-validator";
import bcrypt from "bcryptjs";

class AuthValidation{
   static signUp=[
    body('name').notEmpty().withMessage('enter userName')
        .isLength({min:2,max:50}).withMessage('validation length short must between 2 to 50 char'),
        body('password').notEmpty().withMessage('enter password')
        .isLength({min:8,max:20}).withMessage('password length between 1 to 20 char')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/),
        body('confirmPassword').notEmpty().withMessage('enter confirmPassword')
        .isLength({min:8,max:20}).withMessage('password length between 1 to 20 char')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/)
        .custom((val ,{req})=>{
            if (val !== req.body.password) throw new Error('password and confirmPassword not match');
            return true
        })
        ,
        body('email').notEmpty().withMessage('enter email')
        .isEmail().withMessage('enter valid email')
        .custom(async(val,{req})=>{
            const user=await usersSchema.findOne({email:val})
            if(user) throw new Error('user email is already exist')
            return true;
        })
    ,validatorMiddleware]
    static logIn=[
        body('email').notEmpty().withMessage('enter email')
        .isEmail().withMessage('enter valid email'),
        body('password').notEmpty().withMessage('enter password')
        .isLength({min:6,max:20}).withMessage('password length between 1 to 20 char')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/)

        ,validatorMiddleware]
    


}
export default AuthValidation