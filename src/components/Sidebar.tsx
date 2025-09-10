import React from 'react';
import { Link, NavLink, useLocation } from "react-router-dom";
import {
    X,
    Home,
    BarChart3,
    Users,
    Settings,
    User,
    Package,
    FileText,
    Calendar,
    Mail,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    onToggle: () => void;
}

interface SidebarItem {
    id: number;
    icon: React.ElementType;
    label: string;
    active?: boolean;
    route?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onToggle }) => {

    const location = useLocation();

    const sidebarItems: SidebarItem[] = [
        { id: 1, icon: Home, label: 'Dashboard', route: '/diver', active: true },
        { id: 2, icon: FileText, label: 'All Reports', route: '/diver-reports' },
        { id: 3, icon: BarChart3, label: 'Diving Job Report', route: '/diver-job-reports' },
        { id: 4, icon: Users, label: 'Join Duty Slip', route: '/diver-duty-slip' },
        { id: 5, icon: Package, label: 'Leave Application', route: '/diver-leave-application' },
        { id: 6, icon: FileText, label: 'Marine Fouling Report', route: '/diver-marine-fouling-report' },
        { id: 7, icon: Calendar, label: 'Tool List / Delivery Note', route: '/diver-tool-list-delivery' },
        { id: 8, icon: Settings, label: 'Settings', route: '/diver-settings' },
    ];

    return (
        <>
            {/* Desktop Sidebar */}
            <div className={`hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 transition-all duration-300 ${isOpen ? 'lg:w-64' : 'lg:w-16'
                }`}>
                <div className="bg-gradient-to-r from-primary to-primaryBlue flex flex-col flex-grow  border-r border-gray-200 pt-5 pb-4 overflow-y-auto">
                    {/* Logo and Toggle Button */}
                    <div className="flex items-center justify-between px-4">
                        <div className={`flex items-center flex-shrink-0 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 lg:hidden'
                            }`}>
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <Package className="h-5 w-5 text-white" />
                            </div>
                            <span className="ml-2 text-xl font-semibold text-white">Dashboard</span>
                        </div>

                        {/* Desktop Toggle Button */}
                        <button
                            onClick={onToggle}
                            className={`p-1 rounded-md hover:bg-black transition-all duration-200 ${!isOpen ? 'mx-auto' : ''
                                }`}
                            title={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
                        >
                            {isOpen ? (
                                <ChevronLeft className="h-5 w-5 text-white" />
                            ) : (
                                <ChevronRight className="h-5 w-5 text-white" />
                            )}
                        </button>
                    </div>

                    {/* Collapsed Logo (when sidebar is closed) */}
                    {!isOpen && (
                        <div className="flex items-center justify-center px-4 mt-4">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                <Package className="h-5 w-5 text-white" />
                            </div>
                        </div>
                    )}

                    {/* Navigation */}
                    <nav className="mt-8 flex-1 px-2 space-y-1">
                        {sidebarItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <NavLink
                                    key={item.id}
                                    to={item.route || "#"}
                                    end={item.route === '/'}
                                    className={({ isActive }) =>
                                        `group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${isActive
                                            ? 'bg-blue-100 text-blue-900'
                                            : 'text-white hover:bg-blue-100 hover:text-blue-900'
                                        } ${!isOpen ? 'justify-center' : ''}`
                                    }
                                    title={!isOpen ? item.label : ''}
                                >
                                    <Icon
                                        className={`flex-shrink-0 h-5 w-5 ${isOpen ? 'mr-3' : ''
                                            }`}
                                    />
                                    <span
                                        className={`transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 lg:hidden'
                                            }`}
                                    >
                                        {item.label}
                                    </span>
                                </NavLink>
                            );
                        })}
                    </nav>

                    {/* User Profile */}
                    <div className={`flex-shrink-0 flex border-t border-gray-200 p-4 ${!isOpen ? 'justify-center' : ''
                        }`}>
                        <div className="flex items-center">
                            <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center">
                                <User className="h-5 w-5 text-white" />
                            </div>
                            <div className={`ml-3 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 lg:hidden'
                                }`}>
                                <p className="text-sm font-medium text-white">John Doe</p>
                                <p className="text-xs text-gray-50">john@example.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar */}
            <div className={`lg:hidden fixed inset-0 flex z-40 ${isOpen ? '' : 'pointer-events-none'}`}>
                {/* Overlay */}
                <div
                    className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'
                        }`}
                    onClick={onClose}
                />

                {/* Sidebar */}
                <div className={`relative flex-1 flex flex-col max-w-xs w-full bg-white transform transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}>
                    {/* Close button */}
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                        <button
                            onClick={onClose}
                            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        >
                            <X className="h-6 w-6 text-white" />
                        </button>
                    </div>

                    <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center px-4">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <Package className="h-5 w-5 text-white" />
                            </div>
                            <span className="ml-2 text-xl font-semibold text-gray-900">Dashboard</span>
                        </div>

                        {/* Navigation */}
                        <nav className="mt-5 px-2 space-y-1">
                            {sidebarItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = location.pathname === item.route;
                                
                                return (
                                    <NavLink
                                        key={item.id}
                                        to={item.route || "#"}
                                        end={item.route === '/'}
                                        className={({ isActive }) =>
                                            `group flex items-center px-2 py-2 text-base font-medium rounded-md transition-colors duration-150 ${isActive
                                                ? 'bg-blue-100 text-blue-900'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                            }`
                                        }
                                        onClick={onClose}
                                    >
                                        <Icon
                                            className={`mr-4 flex-shrink-0 h-6 w-6 ${isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                                                }`}
                                        />
                                        {item.label}
                                    </NavLink>
                                );
                            })}
                        </nav>
                    </div>

                    {/* User Profile */}
                    <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                                <User className="h-6 w-6 text-white" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-700">John Doe</p>
                                <p className="text-xs text-gray-500">john@example.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;