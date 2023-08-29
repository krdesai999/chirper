import { login, signUp } from "../User/UserManagement";

export const content = {
  login: "login",
  signUp: "signUp",
  blogs: "blogs",
};

export const pageManager = {
  loggedIn: false,
  currentContent: content.login,
};

export const contentActions = {
  tologin: "toLogin",
  toSignUp: "toSignUp",
  toBlogs: "toBlogs",
};

export function contentReducer(prevPageManager, action) {
  switch (action.type) {
    // Content change to login
    case contentActions.tologin:
      if (!prevPageManager.loggedIn) {
        return { ...prevPageManager, currentContent: content.login };
      }
      else {
        return { ...prevPageManager, loggedIn: true, currentContent: content.blogs }
      }

    // Content change to sign up
    case contentActions.toSignUp:
      if (!prevPageManager.loggedIn) {
        return { ...prevPageManager, currentContent: content.signUp };
      }
      else {
        return { ...prevPageManager, loggedIn: true, currentContent: content.blogs }
      }

    // Content change To blogs
    case contentActions.toBlogs:
      // Not logged in
      if (!prevPageManager.loggedIn) {
        // Logging in
        if (action.payload.from === content.login) {
          console.log(action.payload.data);
          return login(
            action.payload.data.userName,
            action.payload.data.password
          )
            ? { ...prevPageManager, loggedIn: true, currentContent: content.blogs }
            : { ...prevPageManager, currentContent: content.login };
        }
        // Signing up
        else if (action.payload.from === content.signUp) {
          console.log(action.payload.data);
          return signUp(
            action.payload.data.userName,
            action.payload.data.password,
            action.payload.data.attributes
          )
            ? { ...prevPageManager, currentContent: content.blogs }
            : { ...prevPageManager, currentContent: content.signUp };
        }
        // Unknown
        else return { ...prevPageManager, currentContent: content.login };
      }
      // Already logged in
      else if (prevPageManager.loggedIn) {
        return { ...prevPageManager, currentContent: content.blogs };
      }
      return prevPageManager;

    default:
      return prevPageManager;
  }
}
