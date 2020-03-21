import routes from "../routes";
import Video from "../models/Video";

export const search = (req, res) => {
    const {
        query: {
            searchText,
        }   
    } = req;
    
    res.render("search", {
        pageTitle: "Search", 
        searchText,
        videos,
    });
};

export const getUpload = (req, res) => {
    res.render("upload", {
        pageTitle: "Upload",
    });
};

export const postUpload = async (req, res) => {
    const {
        body: {
            title, 
            description,
        },
        file: {
            path,
        }
    } = req;
    console.log(path);
    try{
        const newVideo = await Video.create({
            fileUrl: path,
            title,
            description,
        });
        
        res.redirect(routes.videos+routes.detail(newVideo.id));
    } catch (e){
        // TODO Disavailable Create VIdeo Dialog
        res.redirect(routes.home);
    }
}

export const detail = async (req, res) => {
    const {
        params: {
            id,
        },
    } = req;

    try{
        const video = await Video.findById(id);
        
        res.render("videoDetail", {
            pageTitle: "Video Detail", 
            video,
        });
    } catch (e) {
        // TODO Not Found Dialog 
        res.redirect(routes.home);
    }
};

export const editVideo = (req, res) => {
    res.render("videoEdit", {
        pageTitle: "Video Edit",
    });
};

export const deleteVideo = (req, res) => {
    res.render("videoDelete", {
        pageTitle: "Video Delete",
    });
};
