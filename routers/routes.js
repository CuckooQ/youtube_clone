// home
const HOME = '/'
const LOGIN = '/login'
const GITHUB_LOGIN = '/auth/github'
const GITHUB_CALLBACK = '/auth/github/callback'
const FACEBOOK_LOGIN = '/auth/facebook'
const FACEBOOK_CALLBACK = '/auth/facebook/callback'
const LOGOUT = '/logout'
const JOIN = '/join'
const SEARCH = '/search'

// common
const DETAIL = '/:id'
const EDIT = `${DETAIL}/edit`
const DELETE = `${DETAIL}/delete`

// users
const USERS = '/users'
const EDIT_PROFILE = '/edit-profile'
const CHANGE_PASSWORD = '/change-password'
const ME = '/me'

// videos
const VIDEOS = '/videos'
const UPLOAD_VIDEO = '/upload'

// API
const API = '/api'
const REGISTER_VIEW = '/:id/view'
const ADD_COMMENT = '/:id/comment'

const routes = {
  home: HOME,
  login: LOGIN,
  logout: LOGOUT,
  githubLogin: GITHUB_LOGIN,
  githubCallback: GITHUB_CALLBACK,
  facebookLogin: FACEBOOK_LOGIN,
  facebookCallback: FACEBOOK_CALLBACK,
  join: JOIN,
  search: SEARCH,
  users: USERS,
  userDetail: (id) => {
    if (id !== undefined) {
      return `${USERS}/${id}`
    } else {
      return DETAIL
    }
  },
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  me: ME,
  videos: VIDEOS,
  videoDetail: (id) => {
    if (id !== undefined) {
      return `${VIDEOS}/${id}`
    } else {
      return DETAIL
    }
  },
  videoEdit: (id) => {
    if (id) {
      return `${VIDEOS}/${id}/edit`
    } else {
      return EDIT
    }
  },
  videoDelete: (id) => {
    if (id) {
      return `${VIDEOS}/${id}/delete`
    } else {
      return DELETE
    }
  },
  videoUpload: UPLOAD_VIDEO,
  api: API,
  regiesterView: REGISTER_VIEW,
  addComment: ADD_COMMENT
}

export default routes
