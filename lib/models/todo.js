import mongoose, { Schema } from "mongoose";
const todoSchema=new mongoose.Schema({
    title:{type:String,  required: [true, "Title is required"], minlength: [4, "Title must be at least 4 characters"],
        maxlength: [50, "Title can't exceed 50 characters"],
        trim: true},
    author:{type:String,  required: [true, "author is required"], minlength: [3, "author must be at least 4 characters"],
        maxlength: [50, "author can't exceed 50 characters"],
        trim: true}
})

export const todo = mongoose.models.todo || mongoose.model("todo", todoSchema);
