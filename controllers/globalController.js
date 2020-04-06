import Video from "../models/Video";
import User from "../models/User";
import routes from "../routes";
import passport from "passport";

export const home =  async (req, res) => {
    let videos = [];

    try{
        const tmpVideos = await Video.find({}).sort({_id: -1});
        tmpVideos.forEach((video)=>{
            videos.push(video);
        });
    } catch(e){
        console.log(e);
    }

    res.render("home", {
        pageTitle: "Home", 
        videos,
    });
};

export const getJoin = (req, res) => {
    res.render("join", {
        pageTitle: "Join",
    });
};

export const postJoin = async (req, res, next) => {
    const {
        body: {
            name,
            email,
            password,
            confirmPassword,
        }
    } = req;

    if(password !== confirmPassword){
        res.status=400;
        res.render("join", {
            pageTitle: "Join",
        });
    }else{
        try{
            const user = await User({
                name,
                email,
            });
            await User.register(user, password);
            next();
        }
        catch(e) {
            res.redirect(routes.home);
        }   
    }
};

export const getLogin = (req, res) => {
    res.render("login", {
        pageTitle: "Login",
    });
};

export const postLogin = passport.authenticate("local", {
    failureRedirect: routes.login,
    successRedirect: routes.home,
});

export const getGithubLogin = passport.authenticate("github");

export const postGithubLogin = (req, res) => {
    res.send(routes.home);
}

export const githubLoginCallback = (accessToken, refreshToken, profile, cb) => {
    console.log(accessToken, refreshToken, profile, cb);
}

export const logout = (req, res) => {
    req.logout();
    res.redirect(routes.home);
};
