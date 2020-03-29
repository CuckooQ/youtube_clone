import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
});

const dbConnection = mongoose.connection;

const handleOpen = () => {
    console.log("Connected to DB");
}

dbConnection.once("open", handleOpen);
