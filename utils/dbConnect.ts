import mongoose from "mongoose";

const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL as string);
        console.log("Connected to database.")
    } catch(error) {
        throw new Error ("Error conencting to database.")

    }
}

export default connect;