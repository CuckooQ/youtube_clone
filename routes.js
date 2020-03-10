// global
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";

// users
const USERS = "/users";
const USER_DETAIL = (id) => {
    return `/${id}`;
};
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";

// videos
const VIDEOS = "/videos";
const SEARCH = "/search";
const UPLOAD = "/upload";
const VIDEO_DETAIL = (id) => {
    return `/${id}`;
}
const EDIT_VIDEO = "/:id/edit";
const DELETE_VIDEO = "/:id/delete";

// routes
const routes = {
    home: HOME,
    join: JOIN,
    login: LOGIN,
    logout: LOGOUT,
    users: USERS,
    userDetail: USER_DETAIL,
    editProfile: EDIT_PROFILE,
    changePassword: CHANGE_PASSWORD,
    videos: VIDEOS,
    search: SEARCH,
    upload: UPLOAD,
    videoDetail: VIDEO_DETAIL,
    editVideo: EDIT_VIDEO,
    deleteVideo: DELETE_VIDEO,
}

export default routes;