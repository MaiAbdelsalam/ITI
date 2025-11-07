import mongoose from "mongoose";

const BookSchema=new mongoose.Schema({
    title:{type:String , required:true},
    price:{type:Number , required:true},
    author:{type: mongoose.Schema.Types.ObjectId, ref: 'Author'},
});

export default mongoose.model('Book',BookSchema)