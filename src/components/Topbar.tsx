import React from 'react';
import {
    Menu,
    Bell,
    Search,
    User,
    ChevronDown,
} from 'lucide-react';


interface TopbarProps {
    onMenuClick: () => void;
}


const Topbar: React.FC<TopbarProps> = ({ onMenuClick }) => {
    return (
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-gradient-to-r from-primaryBlue to-primary">
            
            {/* Mobile menu button */}
            <button
                onClick={onMenuClick}
                className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
            >
                <Menu className="h-6 w-6" />
            </button>

            {/* Search bar */}
            <div className="flex-1 px-4 flex justify-between items-center sm:px-6 lg:px-8">
                <div className="flex-1 flex">
                    <div className="w-full flex md:ml-0">
                        <div className="relative w-full text-gray-400 focus-within:text-gray-600 max-w-lg">
                            <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-primaryBlue"  />
                            </div>
                            <input
                                className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm rounded-md bg-gray-50"
                                placeholder="Search"
                                type="search"
                            />
                        </div>
                    </div>
                </div>

                {/* Right side items */}
                <div className="ml-4 flex items-center md:ml-6 space-x-2 sm:space-x-4">
                    {/* Notifications */}
                    <button className="p-1 rounded-full text-white hover:text-primaryBlue focus:outline-none focus:ring-2 ring-white focus:ring-offset-2 focus:ring-primary relative">
                        <Bell className="h-6 w-6" />
                        <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                    </button>

                    {/* Profile dropdown */}
                    <div className="ml-3 relative">
                        <div className="flex items-center cursor-pointer hover:bg-primary rounded-lg p-2 transition-colors duration-150">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                <User className="h-5 w-5 text-white" />
                            </div>
                            <div className="ml-3 hidden sm:block">
                                <div className="text-sm font-medium text-white">John Doe</div>
                                <div className="text-xs text-gray-50">Admin</div>
                            </div>
                            <ChevronDown className="ml-2 h-4 w-4 text-gray-100 hidden sm:block" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Topbar;