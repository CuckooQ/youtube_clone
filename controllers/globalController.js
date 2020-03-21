import Video from "../models/Video";
import routes from "../routes";

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

export const postJoin = (req, res) => {
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
        // TODO Register User
        // TODO Login
        res.redirect(routes.home);
    }
};

export const getLogin = (req, res) => {
    res.render("login", {
        pageTitle: "Login",
    });
};

export const postLogin = (req, res) => {
    const {
        body: {
            email,
            password,
        }
    } = req;
    
    // TODO Login
    res.redirect(routes.home);
};

export const logout = (req, res) => {
    // TODO logout
    res.redirect(routes.login);
};
