import mongoose from "mongoose"
export async function dbConnections(){
    try{
       await mongoose.connect('mongodb://127.0.0.1:27017/test');
       console.log("connected to db")
    }
    catch(error){
        console.log(error.message);
        process.exit(1)
    }
}