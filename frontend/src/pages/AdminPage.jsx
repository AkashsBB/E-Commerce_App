import React, { useState, useEffect } from 'react';
import { 
  BarChart, 
  PlusCircle, 
  ShoppingBasket, 
  Package,
  Users,
  Settings,
  LogOut,
  Home,
  ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/useUserStore';
import ProductsList from '../components/ProductsList';
import CreateProductsForm from '../components/CreateProductForm';
import { useProductStore } from '../store/useProductStore';

const tabs = [
  { 
    id: 'create', 
    label: 'Add Product', 
    icon: PlusCircle,
    description: 'Add new products to your store',
    color: 'from-purple-500 to-primary-500',
  },
  { 
    id: 'products', 
    label: 'Products', 
    icon: Package,
    description: 'Manage your product inventory',
    color: 'from-primary-500 to-accent-500',
  },
  { 
    id: 'analytics', 
    label: 'Analytics', 
    icon: BarChart,
    description: 'View sales and performance metrics',
    color: 'from-accent-500 to-purple-600',
  },
  { 
    id: 'users', 
    label: 'Users', 
    icon: Users,
    description: 'Manage user accounts and permissions',
    color: 'from-purple-600 to-primary-600',
  },
];

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { fetchAllProducts } = useProductStore();
  const { logout } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const activeTabData = tabs.find(tab => tab.id === activeTab) || tabs[0];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Sidebar */}
      <motion.div 
        className={`bg-white dark:bg-gray-800 shadow-lg ${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 flex flex-col`}
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          {isSidebarOpen ? (
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-accent-600">
              Admin Panel
            </h2>
          ) : (
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-600 to-accent-600"></div>
          )}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ArrowLeft 
              className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${!isSidebarOpen && 'rotate-180'}`} 
            />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <li key={tab.id}>
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r text-white shadow-md'
                        : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                    } ${activeTab === tab.id ? tab.color : ''}`}
                  >
                    <Icon className="h-5 w-5" />
                    {isSidebarOpen && (
                      <span className="ml-3 font-medium">{tab.label}</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5" />
            {isSidebarOpen && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white dark:bg-gray-800 shadow-sm z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {activeTabData.label}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {activeTabData.description}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  to="/"
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  title="Back to Store"
                >
                  <Home className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </Link>
                <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Settings className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4 sm:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {activeTab === 'create' && <CreateProductsForm />}
              {activeTab === 'products' && <ProductsList />}
              {activeTab === 'analytics' && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 h-64 flex items-center justify-center">
                  <div className="text-center">
                    <BarChart className="h-12 w-12 mx-auto text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">Analytics Dashboard</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Coming soon...</p>
                  </div>
                </div>
              )}
              {activeTab === 'users' && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 h-64 flex items-center justify-center">
                  <div className="text-center">
                    <Users className="h-12 w-12 mx-auto text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">User Management</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Coming soon...</p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
