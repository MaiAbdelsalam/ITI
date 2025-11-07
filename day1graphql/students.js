import mongoose from "mongoose";
const StudentsSchema=new mongoose.Schema({
    name:{type:String , required:true},
    email:{type:String , required:true},
    age:{type:Number , required:true},
    major:{type:String , required:false},
    courses:[{type:mongoose.Schema.Types.ObjectId ,ref:'Courses' ,required:false}],
});

export default mongoose.model('Student',StudentsSchema)