import mongoose, { ConnectOptions, Mongoose} from "mongoose";

const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL as string, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        } as ConnectOptions);
        console.log("Mongo connection is successful")
    } catch(error) {
        throw new Error ("Error conencting to database.")

    }
}

export default connect;