import { useState, useReducer, createContext } from "react";
import Content from "../components/content/Content";
import Header from "../components/header/Header";
import SideBar from "../components/sidebar/Sidebar";
import "./Home.css";
import {
  pageManager,
  contentReducer
} from "../components/utils/PageManager";

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
        <Header contentManager = { contentManager } contentDispatch = { contentDispatch } />
      </div>

      {/* Sidebar & content */}
      <div className="mainContainer grid md:grid-cols-6">
        {/* Sidebar */}
        <div className="sidebarContainer hidden md:block md:col-span-1 bg-gray-300">
          <SideBar contentManager = {contentManager} contentDispatch={contentDispatch} />
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
