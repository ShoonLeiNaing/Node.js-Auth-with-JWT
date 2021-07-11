import multer,{diskStorage} from 'multer';

const MIME_TYPE = {
    "image/jpg": "jpg",
    "image/png": "png",
    "image/jpeg": "jpeg",
  };

const fileUpload=multer({
    limits:500000,
    storage:diskStorage({
        destination:(req,file,cb)=>{
            cb(null,'upload/')
        },
        filename:(req,file,cb)=>{
            cb(null,Date.now()+"-"+file.originalname)
        }
    }),
    fileFilter:(req,file,cb)=>{
        const isValid = !!MIME_TYPE[file.mimetype];
        const error = isValid
          ? null
          : new Error("Please upload only valid file types");
        cb(error, isValid);
    }
})

// const fileUpload = multer({dest:'upload/'})

export default fileUpload;


