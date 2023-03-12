import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDb has connected successfully".bgCyan.white);
  } catch (error) {
    console.log(`mongodb connnection error ${error}`.bgRed.white);
  }
};

export default connectDB;
