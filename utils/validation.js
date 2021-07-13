import Joi from '@hapi/joi'

export const registerValidation=(data)=>{
    const schema=Joi.object({
        username:Joi.string().min(6).required(),
        email:Joi.string().min(6).required().email(),
        password:Joi.string(),
    })
    return schema.validate(data)
}

export const loginValidation=(data)=>{
    const schema=Joi.object({
        email:Joi.string().required().email(),
        password:Joi.string(),
    })
    return schema.validate(data)
}