import mongoose from "mongoose";
import { config } from "dotenv";
config()

async function connectToDB(){
    try {
        const {connection} = await mongoose.connect(process.env.MONGODB_URL)

        console.log(`Connected with DB: ${connection.host}`);
    } catch (error) {
        console.log(`Error in connecting with DB :${error}`);
        process.exit(1)
    }
}

export default connectToDB