import User from '../models/userModel.js'
import {registerValidation,loginValidation} from '../utils/validation.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


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
        res.status(400).send(err.message)
    })
}

export const login=async (req,res)=>{
    //validation
    const {error}=loginValidation(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    //checking email
    const user= await User.findOne({email:req.body.email})
    if(!user){
        return res.status(400).send("User with that email doesn't exist")
    }
    //checking password
    const valid=await bcrypt.compare(req.body.password, user.password)
    if(!valid){
        res.status(400).send("Email or Password is invalid")
    }
    //creating and assigning token
    const token=jwt.sign({_id:user.id},process.env.TOKEN)
    res.header("auth-token",token).send(token)

    // res.status(200).send("Logged in")
}
