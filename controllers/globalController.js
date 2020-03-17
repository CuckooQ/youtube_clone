import {videos} from "../db";
import routes from "../routes";

export const home = (req, res) => {
    res.render("home", {
        pageTitle: "Home", 
        videos,
    });
};

export const getJoin = (req, res) => {
    res.render("join", {pageTitle: "Join"});
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
        res.render("join", {pageTitle: "Join"});
    }else{
        // TODO Register User
        // TODO Login
        res.redirect(routes.home);
    }
};

export const login = (req, res) => {
    res.render("login", {pageTitle: "Login"});
};

export const logout = (req, res) => {
    res.render("logout", {pageTitle: "Logout"});
};
