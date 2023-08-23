import { useState } from "react";
import Content from "../components/content/Content";
import Header from "../components/header/Header";
import SideBar from "../components/sidebar/Sidebar";
import "./Home.css";
import {PageManager} from "../components/utils/PageManager";

export default function Home() {
  // const [pageManager, setcontentSelection] = useState(new PageManager());
  let pageManager = new PageManager();
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
          <Content pageManager = {pageManager} />
        </main>
      </div>
    </div>
  );
}

