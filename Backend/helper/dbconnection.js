import mongoose from 'mongoose';

const connectDB = async () => {
  const localDB =  process.env.DATABASE_NAME;
  try {
    await mongoose.connect(localDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('MongoDB connection failed:', err);
    process.exit(1);
  }
};

export default connectDB;
