import routes from "./routes";

export const localMiddleware = (req, res, next) => {
    res.locals.siteName = "Youtube Clone";
    res.locals.routes = routes;
    res.locals.user = {
        id: 0,
        isAuthenticated: true,
    }
    next();
}