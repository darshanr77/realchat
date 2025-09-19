import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:false
    },
    password:{
        type:String,
        required:true,
        unique:false
    },
    profilePic:{
        type:String,
        default:""
    },
},
    {timestamps:true} //created at and updated at
);



const User = mongoose.model("User",userSchema);


export default User;