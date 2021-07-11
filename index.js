import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import blogRoutes from './routes/blogRoutes.js'
import authRoutes from './routes/authRoutes.js'

const app = express();
const port = 4000;

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

//routes
app.get('/',(req,res)=>{
    res.send("Hello this is running")
})
app.use('/upload',express.static('upload'))
app.use('/blog',blogRoutes)
app.use('/user',authRoutes)

//db connect
mongoose.connect(process.env.MONGODB_URL,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
})
.then(()=>{
    app.listen(port,()=>console.log(`Server is running on port ${port}`))
})
.catch((err)=>{
    console.log(err)
})

