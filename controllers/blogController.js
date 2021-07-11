import Blog from '../models/blogModel.js'


export const getBlogs =(req,res)=>{
    Blog.find()
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        console.log(err)
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
        res.json(data)
    })
    .catch((err)=>{
        console.log(err)
    })
}

export const getBlogDetail=(req,res)=>{
    Blog.findById(req.params.id)
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        console.log(err)
    })
}

export const deleteBlog=(req,res)=>{
    Blog.findOneAndDelete(req.params.id)
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        console.log(err)
    })
}

export const updateBlog=(req,res)=>{
    Blog.findOneAndUpdate({_id:req.params.id},req.body,{new:true})
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        console.log(err)
    })
}

export const imageUpload=(req,res)=>{
    console.log(req.file);
    res.send("Done")
    // res.status(201).json({"image":"uploaded"})

}