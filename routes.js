import e from "express";

// global
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";

// users
const USERS = "/users";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";

// videos
const VIDEOS = "/videos";
const SEARCH = "/search";
const UPLOAD = "/upload";
const EDIT_VIDEO = "/:id/edit";
const DELETE_VIDEO = "/:id/delete";

// common
const DETAIL = "/:id";

// Github
const GITHUB = "/auth/github";
const GITHUB_CALLBACK = "/auth/github/callback";

// routes
const routes = {
    home: HOME,
    join: JOIN,
    login: LOGIN,
    logout: LOGOUT,
    detail: (id) => {
        if(id){
            return `/${id}`;
        }else{
            return DETAIL;
        }
    },
    users: USERS,
    editProfile: EDIT_PROFILE,
    changePassword: CHANGE_PASSWORD,
    videos: VIDEOS,
    search: SEARCH,
    upload: UPLOAD,
    editVideo: (id) => {
        if(id) {
            return `/videos/${id}/edit`;
        }else{
            return EDIT_VIDEO;
        }
    },
    deleteVideo: (id) => {
        if(id){
            return `/videos/${id}/delete`;
        } else{
            return DELETE_VIDEO;
        }
    },
    github: GITHUB,
    githubCallback: GITHUB_CALLBACK,
}

export default routes;