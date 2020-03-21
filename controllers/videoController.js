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
        // TODO Create Error Dialog
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

export const getEditVideo = async (req, res) => {
    const {
        params: {
            id,
        },
    } = req;

    try{
        const video = await Video.findById(id);
        
        res.render("videoEdit", {
            pageTitle: "Video Edit",
            video,
        });
    } catch (e) {
        res.redirect(routes.home);
    }
};

export const postEditVideo = async (req, res) => {
    const {
        params: {
            id,
        },
        body: {
            title,
            description,
        }
    } = req;

    try{
        await Video.findOneAndUpdate({_id: id}, {title, description});
        res.redirect(routes.videos + routes.detail(id));
    } catch (e) {
       // TODO Edit Error Dialog
    }

    res.redirect(routes.videos + routes.detail(id));
};

export const deleteVideo = async (req, res) => {
    const { 
        params: {
            id,
        }
    } = req;

    try{
        const video = await Video.findOneAndRemove({_id: id});
    } catch(e) {
       // TODO Delete Error Dialog
    }

    res.redirect(routes.home);
};
