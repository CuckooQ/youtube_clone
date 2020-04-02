import express from "express";
import routes from "../routes";
import {
    home, 
    getJoin, 
    postJoin,
    getLogin, 
    postLogin,
    logout
} from "../controllers/globalController";
import { onlyPublic } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);
globalRouter.get(routes.login,getLogin);
globalRouter.post(routes.login,postLogin);
globalRouter.get(routes.logout, logout);

export default globalRouter;