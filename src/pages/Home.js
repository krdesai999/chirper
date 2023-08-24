import { useState, useReducer } from "react";
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
  switch (action) {
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
      if (!pageManager.loggedIn)
        return { ...pageManager, currentContent: content.login };
      else if (pageManager.loggedIn)
        return { ...pageManager, currentContent: content.blogs };
      return pageManager;

    default:
      return pageManager;
  }
}

export default function Home() {
  const [content, contentDispatch] = useReducer(contentReducer, pageManager);
  // let pageManager = new PageManager();
  return (
    <div className="Home">
      <div className="headerContainer bg-opacity-1 bg-blue-900 w-full">
        <Header />
      </div>
      <div className="mainContainer grid md:grid-cols-6">
        <div className="sidebarContainer hidden md:block md:col-span-1 bg-gray-300">
          <SideBar />
        </div>
        <main className="contentContainer md:col-span-5 flex justify-center bg-gray-500">
          <Content pageManager={content} pageDispatch={contentDispatch} />
        </main>
      </div>
    </div>
  );
}
