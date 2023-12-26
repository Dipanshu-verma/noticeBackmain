import mongoose from "mongoose";

const userSchema  =  mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true, unique:true},
    password:{type:String,required:true},
    phone_number:{type:String,required:true},
    department:{type:String,required:true},
    notices:[{type:mongoose.Schema.Types.ObjectId, ref:'notices'}]
})

const UserModel =  mongoose.model("masaiuser",userSchema);
export default UserModel;
