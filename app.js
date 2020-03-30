import express from "express";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import routes from "./routes";
import {
    localMiddleware, 
    helmetMiddleware,
    cookieParserMiddleware,
    bodyParserMiddleware,
    bodyParserUrlEncodeMiddleware,
    morganMiddleware, 
} from "./middlewares";
import passport from "passport";
import "./passport";

const app = express();

// view engine
app.set("view engine", "pug");

// static folder
app.use("/static", express.static("static"));

// middlewares
app.use(helmetMiddleware);
app.use(cookieParserMiddleware);
app.use(bodyParserMiddleware);
app.use(bodyParserUrlEncodeMiddleware);
app.use(morganMiddleware);
app.use(passport.initialize());
app.use(passport.session());
app.use(localMiddleware);

// routing
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;