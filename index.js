import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import blogRoutes from './routes/blogRoutes.js'
import path from 'path'


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


//db connect
mongoose.connect('mongodb+srv://ShoonLei:SerwayVuille16@cluster0.vx0au.mongodb.net/testingDatabase?retryWrites=true&w=majority',
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

