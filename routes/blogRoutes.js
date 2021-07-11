import {getBlogs,createBlog,getBlogDetail,deleteBlog,updateBlog,imageUpload} from '../controllers/blogController.js'
import express from 'express'
import fileUpload from '../utils/fileUpload.js'

const router = express.Router()

router.get('/',getBlogs);
router.get('/:id',getBlogDetail);
router.post('/create',fileUpload.single('file'),createBlog);
router.put('/:id',updateBlog);
router.delete('/:id',deleteBlog);

export default router;