import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser, { urlencoded } from "body-parser";
import morgan from "morgan";

const app = express();

app.use(helmet());

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(morgan("dev"));

export default app;