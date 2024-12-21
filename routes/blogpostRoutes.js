import express from 'express';
import {createPost,getAllPosts,getPostById,updatePost,likePost,commentPost,deletePost } from '../controller/blogPostController.js';
import { authorization } from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/',authorization,createPost);
router.get('/',getAllPosts);
router.get('/:id',getPostById);
router.put('/:id',authorization,updatePost);
router.delete('/:id',authorization,deletePost);
router.post('/:id/like',authorization,likePost);
router.post('/:id/comment',authorization,commentPost);

export default router;
