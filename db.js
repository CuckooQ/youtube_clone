import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/youtube-clone", {
    useNewUrlParser: true,
    useFindAndModify: false,
});

const dbConnection =mongoose.connection;

const handleOpen = () => {
    console.log("Connected to DB");
}

dbConnection.once("open", handleOpen);