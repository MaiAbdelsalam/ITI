import { todo } from "@/lib/models/todo";
import { NextResponse } from "next/server"

export async function GET(req,{params}) {
    try{
        const {id}=await params
        const tod=await todo.findById(id)
        return NextResponse.json(tod,{status:200})
    }
    catch(error){
        return NextResponse.json(error,{status:500})
    }
}

export async function PUT(req,{params}) {
    try{
        const {id}= params
        const{title,author}=await req.json();
        const updatetodo={title,author};
        const todoupdated = await todo.findByIdAndUpdate(id, updatetodo, { new: true });
        return NextResponse.json(todoupdated,{status:200})
    }
    catch(error){
        return NextResponse.json(error,{status:500})
    }    
}

export async function DELETE({params}) {
    try{
        const {id}= params
        await todo.findByIdAndDelete(id);
        return NextResponse.json({ message: "Deleted"},{status:200})
    }
    catch(error){
        return NextResponse.json(error,{status:500})
    }    
}


