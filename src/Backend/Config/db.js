import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("URI:", process.env.MONGODB_URI);

    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB Connected");
  } catch (error) {
    console.error("FULL ERROR:");
    console.error(error);
  }
};

export default connectDB;
