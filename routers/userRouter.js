import express from "express";
import routes from "../routes";
import {detail, editProfile, changePassword} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get(routes.detail(), detail);
userRouter.get(routes.editProfile, editProfile);
userRouter.get(routes.changePassword, changePassword);

export default userRouter;
