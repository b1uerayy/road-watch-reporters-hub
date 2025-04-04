
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, MapPin, User, BarChart, Home, Camera } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { currentUser } from '../utils/mockData';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <MapPin className="text-white h-5 w-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-gray-900">Road Watch</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <NavLink to="/" icon={<Home size={18} />} label="Home" />
          <NavLink to="/report" icon={<Camera size={18} />} label="Report" />
          <NavLink to="/map" icon={<MapPin size={18} />} label="Map" />
          <NavLink to="/stats" icon={<BarChart size={18} />} label="Stats" />
          <Link to="/profile" className="flex items-center px-3 py-2 rounded-full overflow-hidden border border-gray-200 hover:bg-gray-50 transition-colors ml-2">
            <img 
              src={currentUser.profileImage} 
              alt={currentUser.name} 
              className="w-7 h-7 rounded-full mr-2 object-cover"
            />
            <span className="text-sm font-medium">{currentUser.name}</span>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 animate-fade-in">
          <div className="container mx-auto px-4 py-2 space-y-1">
            <MobileNavLink to="/" icon={<Home size={18} />} label="Home" onClick={toggleMenu} />
            <MobileNavLink to="/report" icon={<Camera size={18} />} label="Report" onClick={toggleMenu} />
            <MobileNavLink to="/map" icon={<MapPin size={18} />} label="Map" onClick={toggleMenu} />
            <MobileNavLink to="/stats" icon={<BarChart size={18} />} label="Stats" onClick={toggleMenu} />
            <MobileNavLink to="/profile" icon={<User size={18} />} label="Profile" onClick={toggleMenu} />
          </div>
        </div>
      )}
    </header>
  );
};

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, icon, label }) => (
  <Link to={to} className="flex items-center space-x-1 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
    {icon}
    <span>{label}</span>
  </Link>
);

interface MobileNavLinkProps extends NavLinkProps {
  onClick: () => void;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, icon, label, onClick }) => (
  <Link 
    to={to} 
    className="flex items-center space-x-2 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
    onClick={onClick}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </Link>
);

export default Header;
