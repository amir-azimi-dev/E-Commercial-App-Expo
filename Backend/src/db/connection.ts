import mongoose from "mongoose";

const connectToDB = async (): Promise<void> => {
    try {
        if (!mongoose.connection.readyState) {
            await mongoose.connect(process.env.MONGO_DB_URI || "mongodb://127.0.0.1:27017/e-commerce");
        }

        console.log("\n\n----------------------");
        console.log("MongoDB connected successfully!")

    } catch (error) {
        console.log(error);
    }
};

export default connectToDB;