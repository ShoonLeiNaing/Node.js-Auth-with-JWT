import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        min:6,
        max:128,
    },
    email:{
        type:String,
        required:true,
        min:6,
        max:128,
    },
    password:{
        type:String,
        required:true,
        min:6,
    },
},{timestamps:true})

const User=mongoose.model('User',userSchema)
export default User;