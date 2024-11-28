import React from "react";
import { SidebarItem } from "../types/sidebarItem";
import { Link } from "react-router-dom";

const SidebarComponent: React.FC<SidebarItem> = ({ title, component}) => {
    return (
        <div className="mb-4 lg:mb-6 w-full"> 
            <Link className="w-full inline-block" to={component}>
                <div className="bg-gray-700 flex justify-center items-center w-full text-base lg:bg-gray-100 text-gray-100 lg:text-gray-700 px-3 lg:px-6 lg:py-2 py-1 rounded-lg lg:text-xl m-auto lg:hover:bg-gray-50 lg:hover:text-gray-900 lg:hover:shadow-lg lg:font-semibold">{title}</div>
            </Link>
        </div>
    );
}

export default SidebarComponent;