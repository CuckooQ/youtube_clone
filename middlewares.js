import routes from "./routes";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser, { urlencoded } from "body-parser";
import morgan from "morgan";
import multer from "multer";

export const localMiddleware = (req, res, next) => {
    res.locals.siteName = "Youtube Clone";
    res.locals.routes = routes;
    res.locals.user = req.user || {};
    next();
}

export const helmetMiddleware = helmet();

export const cookieParserMiddleware = cookieParser();

// body parser for parse to json
export const bodyParserMiddleware = bodyParser.json();

// body parser for url encording 
export const bodyParserUrlEncodeMiddleware = bodyParser.urlencoded({extended: true}); 

// develop type morgan logging
export const morganMiddleware = morgan("dev");

// multer for uploading file to videos folder
const uploadVideoMulter = multer({dest: "videos/"});

// only single file upload available, name: file
export const multerMiddleware = uploadVideoMulter.single("file");
