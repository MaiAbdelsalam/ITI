import mongoose from "mongoose";
import validator from "validator";
const StudentsSchema=new mongoose.Schema({
    name:{type:String , required:true},
    email:{type:String , required:true,
        validate:{
            validator:validator.isEmail,
            message:"is not valid"
        }, unique:true
    },
    age:{type:Number , required:true,
        min:[16,"must lowertahan 16"]
    },
    major:{type:String , required:false},
    courses:[{type:mongoose.Schema.Types.ObjectId ,ref:'Courses' ,required:false}],
});
StudentsSchema.virtual('Course',{localField:'_id',foreignField:'students',ref:'Courses'})

export default mongoose.model('Student',StudentsSchema)