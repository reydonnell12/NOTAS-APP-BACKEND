import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const dbURI = process.env.MONGODB_URI; //bring the secret address of the .env
    mongoose.connect(dbURI); //try to open the DB door
    console.log(`all is correct`); //if he success let us know
  } catch (error) {
    console.log(`error to connect ${error}`);
    process.exit(1); // if does not work close de server
  }
};
