import express from "express";
import routes from "../routes";
import {
    home, 
    getJoin, 
    postJoin,
    getLogin, 
    postLogin,
    logout,
    getGithubLogin,
    postGithubLogin
} from "../controllers/globalController";
import { onlyPublic, onlyPrivate } from "../middlewares";
import passport from "passport";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);
globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);
globalRouter.get(routes.logout, onlyPrivate, logout);
globalRouter.get(routes.github, getGithubLogin);
globalRouter.get(
    routes.githubCallback, 
    passport.authenticate("github", {failureRedirect: routes.login}),
    postGithubLogin,
);

    export default globalRouter;