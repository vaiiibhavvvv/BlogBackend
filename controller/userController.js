import bcrypt, { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import {User} from '../model/User';
//export  {login, userRegister, getUserDetails};

 const JWT_KEY = process.env.JWT_KEY;

export const userRegister = async(req ,res) => {
    try {
        const {username,email,password} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){  res.status(400).json({message: 'User already exist' }); }

        const hashPassword = await bcrypt.hash(password,10);
        const newUser = new User({
            username,
            email,
            password: hashPassword
        });

        await newUser.save();
        req.status(201).json({message: 'User registered successully'});

    } catch (error) {
        res.status(500).json({message: 'Server error',error});
    }
};

export const login = async (req,res) => {
    try {
        
            const {email,password} = req.body;
        
            const user = User.findOne({email});
        
            if(!user) {
                res.status(404).json({message:"User not found"});
            }
        
            const isUser = await bcrypt.compare(password,user.password);
        
            if(!isUser) {
                res.status(400).json({message: 'Invalid credentials'});
            }
        
        // Generate token
            const token = jwt.sign({userId: user._id}, JWT_KEY,{expiresIn: '1h'});
            res.status(200).json({message:'Login successful',token});
        
    } catch (error) {
            res.status(500).json({message: 'Server erorr'},error);
    }

}

// Fetch User details {protected routes}


export const getUserDetails = async (req,res) => {
    try {
        
        const {userId} = req.body;

        const user = await User.findOne({userId}).select('-password');
        if(!user) {
            return res.status(404).json({message:'User not found'});
        }
    
        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({message:'Server error'},error);
    }
};
