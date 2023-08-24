import { useState, useReducer, createContext } from "react";
import Content from "../components/content/Content";
import Header from "../components/header/Header";
import SideBar from "../components/sidebar/Sidebar";
import "./Home.css";
import {
  content,
  contentActions,
  pageManager,
} from "../components/utils/PageManager";

function contentReducer(pageManager, action) {
  console.log("Some action: ", action.type);
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
          return pageManager;
        } else return { ...pageManager, currentContent: content.login };
      } else if (pageManager.loggedIn) {
        return { ...pageManager, currentContent: content.blogs };
      }
      return pageManager;

    default:
      return pageManager;
  }
}

export const ContentContext = createContext();
export const ContentUpdateContext = createContext();

export default function Home() {
  const [contentManager, contentDispatch] = useReducer(
    contentReducer,
    pageManager
  );

  return (
    <div className="Home">
      {/* Header */}
      <div className="headerContainer bg-opacity-1 bg-blue-900 w-full">
        <Header />
      </div>

      {/* Sidebar & content */}
      <div className="mainContainer grid md:grid-cols-6">
        {/* Sidebar */}
        <div className="sidebarContainer hidden md:block md:col-span-1 bg-gray-300">
          <SideBar />
        </div>

        {/* Content */}
        <main className="contentContainer md:col-span-5 flex justify-center bg-gray-500">
          <ContentContext.Provider value={contentManager}>
            <ContentUpdateContext.Provider value={contentDispatch}>
              <Content />
            </ContentUpdateContext.Provider>
          </ContentContext.Provider>
        </main>
      </div>
    </div>
  );
}
