import routes from "./routes";

export const localMiddleware = (req, res, next) => {
    res.locals.siteName = "Youtube Clone";
    res.locals.routes = routes;
    next();
}