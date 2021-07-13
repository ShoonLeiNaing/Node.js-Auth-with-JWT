import jwt from 'jsonwebtoken'

export const verifyToken=(req,res,next)=>{
    const token=req.header('auth-token')
    if(!token){
        return res.status(402).send("Access Denied")
    }
    try{
         const tokenValid = jwt.verify(token,process.env.TOKEN)
         req.user = tokenValid;
         next();
    }
    catch{
        res.status(402).send("Invalid Token")
    }
}