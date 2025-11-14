import { todo } from "@/lib/models/todo";
import { NextResponse } from "next/server";
import { dbConnections } from "../../../lib/dbConnections";
import { title } from "process";
dbConnections()
export async function GET() {
    try {
        const todos=await todo.find()
        return NextResponse.json(todos,{status:200})
    }
    catch(error){
        console.log("error ti get",error)
        return NextResponse.json({message:error.message},{status:400})   
    }    
}

export async function POST(req) {
    try{
        const{title,author}=await req.json();
        const newtodo=await todo.create({title,author})
        return NextResponse.json({message:"todo created"},{status:201})
    }
    catch(error){
        return NextResponse.json({message:error.message},{status:400})   
    }
}