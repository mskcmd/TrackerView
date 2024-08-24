import mongoose from 'mongoose';

const dbURI = process.env.DB_URI;
console.log("DB_URI:", process.env.DB_URI);

if (!dbURI) {
    throw new Error("DB_URI is not defined in the environment variables");
}

export async function connectDB(): Promise<void> {
    try {
        if (typeof dbURI !== 'string') {
            throw new Error("DB_URI is not a string");
        }
        await mongoose.connect(dbURI, {});
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}
