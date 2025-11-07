import mongoose from "mongoose";
const CoursesSchema=new mongoose.Schema({
    title:{type:String , required:true},
    code:{type:String , required:true},
    credits:{type:Number , required:true},
    instructor:{type:String , required:true},
    students:[{type:mongoose.Schema.Types.ObjectId ,ref:'Student' ,required:false}],

});

export default mongoose.model('Courses',CoursesSchema)