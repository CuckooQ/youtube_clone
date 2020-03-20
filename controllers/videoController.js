import routes from "../routes";
import Video from "../models/Video";

export const search = (req, res) => {
    const {
        query: {
            searchText
        }   
    } = req;
    
    res.render("search", {
        pageTitle: "Search", 
        searchText,
        videos,
    });
};

export const getUpload = (req, res) => {
    res.render("upload", {pageTitle: "Upload"});
};

export const postUpload = (req, res) => {
    const {
        body: {
            file,
            title,
            description,
        }
    } = req;

    // TODO Video Upload 
    
    res.redirect(routes.videos+routes.detail(0));
}

export const detail = (req, res) => {
    const {
        params: id,
    } = req;
    
    res.render("videoDetail", {pageTitle: "Video Detail"});
};

export const editVideo = (req, res) => {
    res.render("videoEdit", {pageTitle: "Video Edit"});
};

export const deleteVideo = (req, res) => {
    res.render("videoDelete", {pageTitle: "Video Delete"});
};
