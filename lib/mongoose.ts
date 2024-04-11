import mongoose from 'mongoose';

let isConnected: boolean = false;


export const connectToDatabase = async () => {
    mongoose.set('strictQuery', true);

    if (!process.env.MONGODB_URL) {
        return console.log('MONGODB_URI is not defined');
    }
    if (isConnected) {
        return console.log('=> using existing database connection');
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName: 'devflow'
        })
        isConnected = true;
    } catch (error) {
        console.log('=> mongodb database connection failed', error);
    }
}