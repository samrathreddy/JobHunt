import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/jobhub';

// Log connection string (without credentials)
const logConnectionString = () => {
  const connectionString = MONGODB_URI.toString();
  if (connectionString.includes('@')) {
    const parts = connectionString.split('@');
    console.log(`Connecting to MongoDB: ${parts[1]}`);
  } else {
    console.log(`Connecting to MongoDB: ${connectionString}`);
  }
};

logConnectionString();

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000, // Timeout after 10s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    });
    console.log(`MongoDB Connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    // Don't exit process, allow retry
    console.log('Will retry connection...');
  }
};

// Initial connection
connectDB();

// Handle connection events
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
  console.log('Attempting to reconnect...');
  setTimeout(connectDB, 5000); // Try to reconnect after 5 seconds
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected, attempting to reconnect...');
  setTimeout(connectDB, 5000);
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected successfully');
});

export default mongoose.connection;