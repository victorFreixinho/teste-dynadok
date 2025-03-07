import mongoose from "mongoose";

const connectToDatabase = async () => {
    await mongoose.connect(process.env.MONGODB_URI || '');
};

export {connectToDatabase }