export const search = (req, res) => {
    res.render("search");
};

export const upload =(req, res) => {
    res.render("upload");
};

export const detail = (req, res) => {
    res.render("videoDetail");
};

export const editVideo = (req, res) => {
    res.render("videoEdit");
};

export const deleteVideo = (req, res) => {
    res.render("videoDelete");
};
