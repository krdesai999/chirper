export const content = {
  login: "login",
  signUp: "signUp",
  blogs: "blogs",
};

export var pageManager = {
  loggedIn: false,
  currentContent: content.login,
};

export const contentActions = {
  tologin: "toLogin",
  toSignUp: "toSignUp",
  toBlogs: "toBlogs",
};

export function contentReducer(pageManager, action) {
  switch (action.type) {

    // Content change to login
    case contentActions.tologin:
      if (!pageManager.loggedIn)
        return { ...pageManager, currentContent: content.login };
      return pageManager;

    // Content change to sign up
    case contentActions.toSignUp:
      if (!pageManager.loggedIn)
        return { ...pageManager, currentContent: content.signUp };
      return pageManager;

    // Content change To blogs
    case contentActions.toBlogs:
      if (!pageManager.loggedIn) {
        if (
          action.payload.from === content.login ||
          action.payload.from === content.signUp
        ) {
          return { ...pageManager, currentContent: content.blogs };
        } else return { ...pageManager, currentContent: content.login };
      } else if (pageManager.loggedIn) {
        return { ...pageManager, currentContent: content.blogs };
      }
      return pageManager;
      
    default:
      return pageManager;
  }
}