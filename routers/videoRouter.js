import express from "express";
import routes from "../routes";
import {
    search, 
    getUpload,
    postUpload, 
    detail, 
    getEditVideo, 
    postEditVideo,
    deleteVideo} from "../controllers/videoController";
import {multerMiddleware} from "../middlewares";

const videoRouter = express.Router();

videoRouter.get(routes.search, search);
videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, multerMiddleware, postUpload);
videoRouter.get(routes.detail(), detail);
videoRouter.get(routes.editVideo(), getEditVideo);
videoRouter.post(routes.editVideo(), multerMiddleware, postEditVideo);
videoRouter.get(routes.deleteVideo, deleteVideo);

export default videoRouter;