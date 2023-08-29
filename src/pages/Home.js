import { useState, useReducer, createContext } from "react";
import Content from "../components/content/Content";
import Header from "../components/header/Header";
import SideBar from "../components/sidebar/Sidebar";
import "./Home.css";
import { Outlet } from "react-router";

export const ContentContext = createContext();
export const ContentUpdateContext = createContext();

export default function Home() {

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
          <SideBar/>
        </div>

        {/* Content */}
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
