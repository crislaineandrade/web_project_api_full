import mongoose from 'mongoose';
import 'dotenv/config'
export default async function connectDatabase() {
  try {
    await mongoose.connect(`${process.env.MONGOCONNECTION}`, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log('Mongo db connected');
  } catch (error) {
    console.log('Mongo db NOT connected');
  }
}
