import React, {useEffect, useState} from 'react';
import HamburgerMenu from '../components/HamburgerMenu';
import { SidebarItem } from '../types/sidebarItem';
import SidebarComponent from '../components/SidebarComponent';
import { Outlet, useLocation } from "react-router-dom";

// Create a functional component
const Dashboard: React.FC = () => {

  const location = useLocation();
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 1024);
  const defaultTitle:string = "DevTools Hub";
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
    }else{
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
    <div className='flex flex-col lg:flex-row max-h-screen'>
      <div className='flex flex-row lg:flex-col justify-center lg:justify-start items-center w-dvw lg:min-w-56 lg:max-w-56 bg-gray-700 min-h-14 lg:h-dvh px-4 lg:pt-5'>
        <HamburgerMenu sidebar_items={sidebar_items} />
        <div className='text-gray-100 text-xl lg:text-2xl font-semibold lg:font-bold mx-auto'>{title}</div>
        <div className='hidden lg:flex flex-col lg:mt-10 max-w-44'>
          {sidebar_items.map((item, index) => {
            return <SidebarComponent key={index} title={item.title} component={item.component} />
          })}
        </div>
      </div>
      <Outlet/>
    </div>
  );
};

export default Dashboard;
