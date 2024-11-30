import React, { useEffect, useState } from 'react';
import HamburgerMenu from '../components/HamburgerMenu';
import { SidebarItem } from '../types/sidebarItem';
import SidebarComponent from '../components/SidebarComponent';
import { Outlet, useLocation } from "react-router-dom";

// Create a functional component
const Dashboard: React.FC = () => {

  const location = useLocation();
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 1024);
  const defaultTitle: string = "DevTools Hub";
  const [title, setTitle] = useState<string>(defaultTitle)
  const sidebar_items: SidebarItem[] = [
    {
      title: "JSON Editor",
      component: "json_editor",
    },
    // {
    //   title: "RegEx Tester",
    //   component: "regex_tester",
    // }
  ];
  const handleResize = () => {
    const isNowMobile = window.innerWidth < 1024;
    setIsMobile(isNowMobile);
  };
  useEffect(() => {
    if (isMobile) {
      sidebar_items.forEach((item) => {
        if (location.pathname === "/" + item.component) {
          console.log(item.title);
          setTitle(item.title);
        }
      });
    } else {
      setTitle(defaultTitle);
    }
  }, [isMobile, location.pathname]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="grid grid-cols-12 max-h-screen min-h-full">
      {/* Sidebar */}
      <div className="col-span-12 lg:col-span-2 bg-gray-700 flex flex-row lg:flex-col justify-center lg:justify-start items-center min-h-14 lg:h-screen px-4 lg:pt-5">
        <HamburgerMenu sidebar_items={sidebar_items} />
        <div className="text-gray-100 text-xl lg:text-2xl font-semibold lg:font-bold mx-auto">
          {title}
        </div>
        <div className="hidden lg:flex flex-col lg:mt-10 max-w-44">
          {sidebar_items.map((item, index) => (
            <SidebarComponent key={index} title={item.title} component={item.component} />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="col-span-12 lg:col-span-10">
        <Outlet />
      </div>
    </div>

  );
};

export default Dashboard;
