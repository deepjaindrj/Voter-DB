import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  LogOut, 
  Menu, 
  X,
  ChevronRight 
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Voters',
    href: '/voters',
    icon: Users,
  },
  {
    name: 'Add Voter',
    href: '/voters/new',
    icon: UserPlus,
  },
];

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const SidebarContent = ({ isMobile = false }) => (
    <div className="flex h-full flex-col">
      {/* Logo/Brand */}
      <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
        <div className="flex items-center">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600">
            <LayoutDashboard className="h-5 w-5 text-white" />
          </div>
          {(isExpanded || isMobile) && (
            <span className="ml-3 text-lg font-semibold text-gray-900">
              Admin Panel
            </span>
          )}
        </div>
        {isMobile && (
          <button
            onClick={() => setIsMobileOpen(false)}
            className="p-1 text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => isMobile && setIsMobileOpen(false)}
              className={`sidebar-link ${
                isActive ? 'sidebar-link-active' : 'sidebar-link-inactive'
              }`}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {(isExpanded || isMobile) && (
                <span className="ml-3">{item.name}</span>
              )}
              {(isExpanded || isMobile) && isActive && (
                <ChevronRight className="ml-auto h-4 w-4" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-gray-200 p-2">
        <button
          onClick={handleLogout}
          className="sidebar-link sidebar-link-inactive w-full"
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {(isExpanded || isMobile) && (
            <span className="ml-3">Logout</span>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="fixed top-4 left-4 z-50 rounded-lg bg-white p-2 shadow-lg"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile sidebar */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div 
            className="fixed inset-0 bg-gray-600 bg-opacity-75"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="animate-slide-in fixed inset-y-0 left-0 w-64 bg-white shadow-xl">
            <SidebarContent isMobile />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div 
        className={`hidden lg:fixed lg:inset-y-0 lg:flex lg:flex-col bg-white border-r border-gray-200 transition-all duration-300 ${
          isExpanded ? 'lg:w-64' : 'lg:w-16'
        }`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <SidebarContent />
      </div>
    </>
  );
};

export default Sidebar;