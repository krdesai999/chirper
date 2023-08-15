import { useState } from "react";
import Content from "../components/content/Content";
import Header from "../components/header/Header";
import SideBar from "../components/sidebar/Sidebar";

export default function Main() {
  const [contentSelection, setcontentSelection] = useState({});


  return (
    <div className="main ">
        <div className="headerContainer">
          <Header />
        </div>
        <div className="sidebarContainer">
          <SideBar/>
        </div>
        <div className="contentContainer">
          <Content />
        </div>
    </div>
  );
}

