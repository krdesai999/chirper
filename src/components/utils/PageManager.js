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
      return prevPageManager;

    // Content change to sign up
    case contentActions.toSignUp:
      if (!prevPageManager.loggedIn) {
        return { ...prevPageManager, currentContent: content.signUp };
      }
      return prevPageManager;

    // Content change To blogs
    case contentActions.toBlogs:
      // Not logged in
      if (!prevPageManager.loggedIn) {
        // Logging in
        if (action.payload.from === content.login) {
          return login("a", "b")
            ? { ...prevPageManager, currentContent: content.blogs }
            : { ...prevPageManager, currentContent: content.login };
        }
        // Signing up
        else if (action.payload.from === content.signUp) {
          return signUp("a", "b")
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
