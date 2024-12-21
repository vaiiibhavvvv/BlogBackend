import jwt from 'jsonwebtoken';

const JWT_KEY = process.env.JWT_KEY;

export const authorization = (req,res,next) => {
    const token = req.header('Authorization');
    if(!token){
        res.status(401).json({message: 'Authentication failed nigga'});
    }
    try {
        const decode = jwt.verify(token,JWT_KEY);
        req.userId = decode.userId;
        next();
    } catch (error) {
        res.status(401).json({message: 'Token is invalid'});
    }
};

