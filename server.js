import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import {userRoutes} from './routes/userRoutes.js';
import {blogPostRoutes} from './routes/blogpostRoutes.js';
import { connectDB } from './cofig/db.js';
const app = express();
app.use(cors());

dotenv.config();

// Connect to database
connectDB();

// Routes
app.use('/api/users',userRoutes)
app.use('/api/blogPost',blogPostRoutes);

const PORT = 3000 || process.env.PORT;

// Start the server
app.listen(PORT,() => {
    console.log(`Server is up and running on ${PORT}`);
});

app.get('/',(req,res)=> {
    const message = "hello World";
    res.send(`<h1>${message}</h1>`);
});


