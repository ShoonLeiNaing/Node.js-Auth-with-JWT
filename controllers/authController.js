import User from '../models/userModel.js'
import {registerValidation} from '../utils/validation.js'
import Joi from '@hapi/joi'

export const register=(req,res)=>{
    //validation 
    const {error} = registerValidation(req.body); 
    if(error){
        return res.status(400).send(error.details[0].message)
    }

    //creating new user
    const user = new User({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
    })
    user.save()
    .then((data)=>{
        res.status(201).send(user)
    })
    .catch((err)=>{
        console.log(err)
    })
    
}