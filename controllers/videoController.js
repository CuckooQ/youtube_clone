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

export const postUpload = async (req, res) => {
    const {
        body: {
            title, 
            description,
        },
        file: {
            path
        }
    } = req;

     const newVideo = await Video.create({
        fileUrl: path,
        title,
        description,
     });
    
    res.redirect(routes.videos+routes.detail(newVideo.id));
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
