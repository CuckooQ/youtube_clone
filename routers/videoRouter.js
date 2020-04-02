import express from "express";
import routes from "../routes";
import {
    search, 
    getUpload,
    postUpload, 
    detail, 
    getEditVideo, 
    postEditVideo,
    deleteVideo,
} from "../controllers/videoController";
import {multerMiddleware, onlyPrivate} from "../middlewares";

const videoRouter = express.Router();

videoRouter.get(routes.search, search);
videoRouter.get(routes.upload, onlyPrivate, getUpload);
videoRouter.post(routes.upload, onlyPrivate, multerMiddleware, postUpload);
videoRouter.get(routes.detail(), detail);
videoRouter.get(routes.editVideo(), onlyPrivate, getEditVideo);
videoRouter.post(routes.editVideo(), onlyPrivate, multerMiddleware, postEditVideo);
videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideo);

export default videoRouter;