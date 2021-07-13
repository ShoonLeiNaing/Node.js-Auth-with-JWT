import Blog from '../models/blogModel.js'
import fs from 'fs'


export const getBlogs =(req,res)=>{
    Blog.find().sort({createdAt:-1})
    .then(data=>{
        res.status(200).send(data)
    })
    .catch(err=>{
        res.status(400).send(err.message)
    })
}

export const createBlog=(req,res)=>{
    console.log(req.file.path);
    const blog=new Blog({
        title:req.body.title,
        body:req.body.body,
        image:req.file.path,
    })
    blog.save()
    .then((data)=>{
        res.status(201).send(data)
    })
    .catch((err)=>{
        res.status(400).send(err.message)
    })
}

export const getBlogDetail=(req,res)=>{
    Blog.findById(req.params.id)
    .then(data=>{
        res.status(200).send(data)
    })
    .catch(err=>{
        res.status(400).send(err.message)
    })
}

export const deleteBlog=(req,res)=>{
    Blog.findOneAndDelete({_id:req.params.id})
    .then((data)=>{
        res.status(200).send("Blod deleted successfully")
        fs.unlink(data.image,err=>{
            if(err)
                console.log(err)
        })
    })
    .catch((err)=>{
        res.status(400).send(err.message)
    })
}

export const updateBlog=async (req,res)=>{
    const blog=await Blog.findById(req.params.id)
    req.body.image=req.file?req.file.path:blog.image;
    if(req.file){
        fs.unlink(blog.image,(err)=>{
            if(err)
                console.log(err)
        })
    }
    Blog.findOneAndUpdate({_id:req.params.id},req.body,{new:true})
    .then(data=>{
        res.status(200).send(data)
    })
    .catch(err=>{
        res.status(400).send(err.message)
    })
}

