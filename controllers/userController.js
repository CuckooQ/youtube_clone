export const detail = (req, res) => {
    const {
        params: {id}
    } = req;
    res.render("userDetail", {pageTitle: "User Detail"});
 };

export const editProfile = (req, res) => {
    res.render("editProfile", {pageTitle: "Edit Profile"});
 };

export const changePassword = (req, res) => {
    res.render("changePassword", {pageTitle: "Change Password"});
 };
 