import {getBlogs,createBlog,getBlogDetail,deleteBlog,updateBlog} from '../controllers/blogController.js'
import express from 'express'
import fileUpload from '../utils/fileUpload.js'

const router = express.Router()

router.get('/',getBlogs);
router.get('/:id',getBlogDetail);
router.post('/',fileUpload.single('image'),createBlog);
router.put('/:id',fileUpload.single('image'),updateBlog);
router.delete('/:id',deleteBlog);

export default router;