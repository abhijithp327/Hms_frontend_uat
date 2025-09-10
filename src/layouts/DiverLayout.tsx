import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import React, { useState } from 'react';
import { Outlet } from "react-router-dom";

const DiverLayout: React.FC = () => {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    return (
        <div className="h-screen flex overflow-hidden bg-gray-100">
            
            {/* Sidebar Component */}
            <Sidebar
                isOpen={sidebarOpen}
                onClose={closeSidebar}
                onToggle={toggleSidebar}
            />

            {/* Main content area - Dynamic padding based on sidebar state */}
            <div className={`flex flex-col w-0 flex-1 overflow-hidden transition-all duration-300 ${
                sidebarOpen ? 'lg:pl-64' : 'lg:pl-16'
            }`}>

                {/* Topbar Component */}
                <Topbar
                    onMenuClick={toggleSidebar} 
                    
                />

                {/* Page content - where your routes will render */}
                <main className="flex-1 relative overflow-y-auto focus:outline-none">
                    <div className="">
                        {/* <div className="max-w-9xl mx-auto px-2 sm:px-4 lg:px-6"> */}
                            <Outlet />
                        {/* </div> */}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default DiverLayout;