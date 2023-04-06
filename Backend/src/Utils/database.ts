import mongoose from "mongoose";

const connectDB = async (uri: string) => {
  try {
    const connect = await mongoose.connect(uri);

    console.log(`MongoDB is connected to ${connect.connection.host} `);
  } catch (e) {
    console.log(`Error Occured: ${e}`);
  }
};

export default connectDB;
