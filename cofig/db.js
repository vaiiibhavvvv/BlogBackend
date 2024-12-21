import mongoose from "mongoose";

export const connectDB = mongoose.connect(process.env.MONGO_URI|| "mongodb_url",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> console.log('Database connected successfully'))
.catch((error) => console.log('Database connection failed',error));