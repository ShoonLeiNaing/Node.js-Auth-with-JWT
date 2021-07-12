import User from '../models/userModel.js'
import {registerValidation} from '../utils/validation.js'
import bcrypt from 'bcrypt'


export const register=async (req,res)=>{
    //validation 
    const {error} = registerValidation(req.body); 
    if(error){
        return res.status(400).send(error.details[0].message)
    }

    //checking email
    const emailExist =await User.findOne({email:req.body.email})
    if(emailExist){
        return res.status(400).send("User already existed with that email")
    }

    //hashing password
    const salt=await bcrypt.genSalt(10)
    const hashPassword=await bcrypt.hash(req.body.password,salt)

    //creating new user
    const user = new User({
        username:req.body.username,
        email:req.body.email,
        password:hashPassword,
    })
    user.save()
    .then((data)=>{
        res.status(201).send(user)
    })
    .catch((err)=>{
        console.log(err)
    })
    
}