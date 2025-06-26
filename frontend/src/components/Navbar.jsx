import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ShoppingCart, 
  LogOut, 
  Lock, 
  Menu, 
  X,
  User,
  Home as HomeIcon
} from 'lucide-react';
import { useUserStore } from '../store/useUserStore';
import { useCartStore } from '../store/useCartStore';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useUserStore();
  const { cart } = useCartStore();
  const location = useLocation();
  const isAdmin = user?.role === 'admin';
  const cartItemCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', label: 'Home', icon: <HomeIcon className="h-5 w-5" /> },
    user && { to: '/cart', label: 'Cart', icon: <ShoppingCart className="h-5 w-5" />, count: cartItemCount },
    isAdmin && { to: '/admin', label: 'Dashboard', icon: <Lock className="h-5 w-5" /> },
  ].filter(Boolean);

  const authLinks = user ? (
    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
      <button
        onClick={() => {
          logout();
          setIsOpen(false);
        }}
        className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 rounded-lg"
      >
        <LogOut className="h-5 w-5" />
        <span>Sign out</span>
      </button>
    </div>
  ) : (
    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
      <Link
        to="/login"
        className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 rounded-lg text-center"
      >
        Log in
      </Link>
      <Link
        to="/signup"
        className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 rounded-lg shadow-md text-center"
      >
        Sign up
      </Link>
    </div>
  );

  return (
    <header 
      className={`fixed w-full z-50 ${scrolled ? 'bg-white/90 dark:bg-gray-900/90 shadow-md' : 'bg-white dark:bg-gray-900'}`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 mx-auto max-w-7xl">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              className="bg-white text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600 whitespace-nowrap hover:opacity-90 transition-opacity"
            >
              E-Commerce
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} icon={link.icon} count={link.count}>
                {link.label}
              </NavLink>
            ))}
            <div className="flex items-center ml-4 space-x-2">
              {authLinks}
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <MobileNavLink key={link.to} to={link.to} icon={link.icon} count={link.count}>
                {link.label}
              </MobileNavLink>
            ))}
            <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
              {authLinks}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

//  NavLink component
const NavLink = ({ to, children, icon, count }) => (
  <Link
    to={to}
    className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 rounded-lg"
  >
    {icon && <span className="mr-2">{icon}</span>}
    <span>{children}</span>
    {count > 0 && (
      <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-primary-600 rounded-full">
        {count}
      </span>
    )}
  </Link>
);

// Mobile NavLink component
const MobileNavLink = ({ to, children, icon, count }) => (
  <Link
    to={to}
    className="flex items-center px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 rounded-lg"
  >
    {icon && <span className="mr-3">{icon}</span>}
    <span>{children}</span>
    {count > 0 && (
      <span className="ml-auto inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold leading-none text-white bg-primary-600 rounded-full">
        {count}
      </span>
    )}
  </Link>
);

export default Navbar;

