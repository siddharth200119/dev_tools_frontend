import React, { useState } from 'react';
import { SidebarItem } from '../types/sidebarItem';
import SidebarComponent from './SidebarComponent';

type HamburgerMenuProps = {
    sidebar_items: SidebarItem[];
};

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ sidebar_items }) => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className='lg:hidden'>
            <div className="grid z-20 relative justify-items-center gap-1 max-h-12" onClick={() => { setOpen(prev => !prev) }}>
                <span className={`h-1 w-6 rounded-full transition ${open ? "rotate-45 translate-y-2 bg-gray-700" : "bg-gray-100"}`}></span>
                <span className={`h-1 w-6 rounded-full transition ${open ? "scale-x-0 bg-gray-700" : "bg-gray-100"}`}></span>
                <span className={`h-1 w-6 rounded-full transition ${open ? "-rotate-45 -translate-y-2 bg-gray-700" : "bg-gray-100"}`}></span>
            </div>
            <div className={`fixed z-10 top-0 left-0 min-h-dvh transition-all duration-300 pt-20 bg-gray-100 overflow-hidden shadow-md ${open ? "max-w-40 lg:max-w-60" : "max-w-0"}`}>
                <div className='min-w-40'>
                    <div className="w-32 m-auto">
                        {sidebar_items.map((item, index) => {
                            return <SidebarComponent key={index} title={item.title} component={item.component} />
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HamburgerMenu;