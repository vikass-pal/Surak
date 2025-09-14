import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/home-dashboard',
      icon: 'Home',
      description: 'Overview and alerts'
    },
    {
      label: 'Report Hazard',
      path: '/hazard-reporting-form',
      icon: 'AlertTriangle',
      description: 'Submit incident report'
    },
    {
      label: 'Hazard Map',
      path: '/interactive-hazard-map',
      icon: 'Map',
      description: 'Interactive visualization'
    },
    {
      label: 'Analytics',
      path: '/social-media-analytics',
      icon: 'BarChart3',
      description: 'Social media monitoring'
    }
  ];

  const isActivePath = (path) => location?.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-card">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Shield" size={20} color="white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-foreground leading-none">
                  SurakshaX
                </span>
                <span className="text-xs text-muted-foreground leading-none">
                  Emergency Response
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`group relative flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 hover-lift ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon 
                  name={item?.icon} 
                  size={16} 
                  color={isActivePath(item?.path) ? 'currentColor' : 'currentColor'} 
                />
                <span>{item?.label}</span>
                
                {/* Tooltip */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md shadow-modal opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-60">
                  {item?.description}
                </div>
              </Link>
            ))}
          </nav>

          {/* Emergency Action Button - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant="destructive"
              size="sm"
              iconName="AlertTriangle"
              iconPosition="left"
              className="emergency-btn"
              onClick={() => window.location.href = '/hazard-reporting-form'}
            >
              Emergency Report
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="relative"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 right-0 bg-card border-b border-border shadow-modal z-40">
            <nav className="px-4 py-4 space-y-2">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={closeMobileMenu}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActivePath(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon 
                    name={item?.icon} 
                    size={18} 
                    color="currentColor" 
                  />
                  <div className="flex flex-col">
                    <span>{item?.label}</span>
                    <span className="text-xs opacity-75">{item?.description}</span>
                  </div>
                </Link>
              ))}
              
              {/* Mobile Emergency Button */}
              <div className="pt-4 border-t border-border">
                <Button
                  variant="destructive"
                  fullWidth
                  iconName="AlertTriangle"
                  iconPosition="left"
                  className="emergency-btn"
                  onClick={() => {
                    closeMobileMenu();
                    window.location.href = '/hazard-reporting-form';
                  }}
                >
                  Emergency Report
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>
      {/* Mobile Emergency Floating Action Button */}
      <div className="lg:hidden fixed bottom-6 right-6 z-30">
        <Button
          variant="destructive"
          size="lg"
          iconName="AlertTriangle"
          className="emergency-btn rounded-full w-14 h-14 shadow-lg"
          onClick={() => window.location.href = '/hazard-reporting-form'}
        >
          <span className="sr-only">Emergency Report</span>
        </Button>
      </div>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-25 z-30"
          onClick={closeMobileMenu}
        />
      )}
    </>
  );
};

export default Header;