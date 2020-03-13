import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser, { urlencoded } from "body-parser";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import routes from "./routes";
import {localMiddleware} from "./middlewares";

const app = express();

// view engine
app.set("view engine", "pug");

// middlewares
app.use(helmet());

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(morgan("dev"));

app.use(localMiddleware);

// routing
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;