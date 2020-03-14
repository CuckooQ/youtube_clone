export const search = (req, res) => {
    const {
        query: {
            searchText
        }   
    } = req;
    res.render("search", {pageTitle: "Search", searchText});
};

export const upload =(req, res) => {
    res.render("upload", {pageTitle: "Upload"});
};

export const detail = (req, res) => {
    res.render("videoDetail", {pageTitle: "Video Detail"});
};

export const editVideo = (req, res) => {
    res.render("videoEdit", {pageTitle: "Video Edit"});
};

export const deleteVideo = (req, res) => {
    res.render("videoDelete", {pageTitle: "Video Delete"});
};
