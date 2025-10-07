import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
  title: {type:String,required:true},
  content: {type:String,required:true},
  userId: {type:mongoose.Schema.Types.ObjectId, ref:"users",required:true},
  },{
    timestamps: true,
  });
  postSchema.pre(/^find/ , function(next){
    this.populate({path:'userId',select:'name email -_id'})
    next()
})
  export default mongoose.model('posts',postSchema);

