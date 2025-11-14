import mongoose from "mongoose";

async function connectDB() {
  try {
    const db = await mongoose.connect(
      "mongodb+srv://meerapm2021_db_user:1234@cluster0.soclfkk.mongodb.net/todo"
    );
    console.log("connected to database");
  } catch (error) {
    console.log(error, "error connecting database");
  }
}

export default connectDB;
