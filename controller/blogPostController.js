import {BlogPost} from '../model/blogPost.js';
import {User} from '../model/User.js'

// Create new blog post
const createPost = async (req,res) => {
    try {
        const {title,content} = req.body;

        const newPost = new BlogPost({
            title, content,
             author: req.userId,
        });

        const savePost = await newPost.save();
        res.status(201).json(savePost);

    } catch (error) {
        res.status(500).json({message: 'Server error',error});
    }
};

// Get all blog posts

const getAllPosts = async (req,res) => {
    try {
        const posts = await BlogPost.find().populate('author','username email').sort({createdAt: -1});
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({message: 'Server error',error});
    }
};

// Get a single blog post

const getPostById = async (req,res) => {
   try {
    const {id} = req.body;
    const post = await BlogPost.findById(id).populate('author','username email');
    if(!post) {
        return res.status(404).json({message: 'Post not found'});
    }
    res.status(200).json(post);
   } catch (error) {
        res.status(500).json({message:'Server failed',error});
   }
}

// Update a blog

const updatePost = async(req,res) => {
    try {
        const {id} = req.params;
    const {title, content} = req.body;

    const post = await BlogPost.findById(id);
        if(!post){
            return res.status(404).json({message: 'Post not found'});
        }

        if(post.author.toString() !== req.userId){
            return res.status(403).json({message:'You are not authorized to edit this post'});
        }

        post.title = title || post.title;
        post.content = title || post.title;
        const savePost = await post.save();
        res.status(200).json(updatePost);

    } catch (error) {
        res.status(500).json({message: 'Server error',error});
    }

};

// Delete a blog

const deletePost = async (req,res) => {
    try {
        const {id} = req.params;
        const post = await BlogPost.findById(id);

        if(!post) {
            return res.status(404).json({message: 'Post not found'});

        }

        if(post.author.toString !== req.userId){
            return res.status(403).json({message: 'You are not authorized'});
        }

        await post.remove();
        res.status(500).json({message:'Post deleted'});

    } catch (error) {
        res.status(500).json({message: 'Server error',error});

    }
};

// Add like to the post

const likekPost = async(req,res) => {
    try {
        const {id} = req.params;
    
    const post = await BlogPost.findById({id});
    if(!post){
        res.status(404).json({message: 'post not found'});
    }

    if(!post.likes.includes(req.userId)){
        post.likes.push(req.userId);
        await post.save();
    }
    res.status(200).json({message: 'Post liked',likes:post.likes.length});
    } catch (error) {
        res.status(500).json({message: 'Server error',error});
    }
};

// Add a comment to the post

const commentPost = async (req,res) => {
    try {
        const {id} = req.params
        const {comment} = req.body;

        const post = await BlogPost.findById({id});
        if(!post){
            res.staus(404).json({message:'Post not found'});
        }

        const newComment = {
            user: req.userId,
            comment,
            createdAt: new Date()
        }

        post.comment.push(newComment);
        await post.save();
        res.status(200).json(post.comment);

    } catch (error) {
        res.status(500).json({message:'Server error',error});
    }
}