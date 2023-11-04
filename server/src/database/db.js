import dotenv from 'dotenv';
dotenv.config();
import { connect } from 'mongoose';
const { MONGO_URI } = process.env;

const connection = async () => {
  try {
    await connect(MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
  }
};

export default connection;
