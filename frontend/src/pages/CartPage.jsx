import { Link } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import CartItem from '../components/CartItem';
import OrderSummary from '../components/OrderSummary';

const CartPage = () => {
  const { cart } = useCartStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-accent-600 mb-2">
            Your Shopping Cart
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {cart.length === 0 
              ? "Your cart is currently empty" 
              : `You have ${cart.length} item${cart.length !== 1 ? 's' : ''} in your cart`}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {cart.length === 0 ? (
              <EmptyCartUI />
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Cart Items
                  </h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {cart.map((item) => (
                    <CartItem key={item._id} item={item} />
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {cart.length > 0 && (
            <motion.div
              className="lg:sticky lg:top-8 lg:h-fit"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <OrderSummary />
              
              <motion.div 
                className="mt-6"
                whileHover={{ x: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/"
                  className="text-gray-900 dark:text-white flex items-center text-sm font-medium"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Continue Shopping
                </Link>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

const EmptyCartUI = () => (
  <motion.div
    className="flex flex-col items-center justify-center py-16 px-6 text-center bg-white dark:bg-gray-800 rounded-2xl shadow-lg"
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4 }}
  >
    <div className="p-6 bg-primary-50 dark:bg-primary-900/20 rounded-full mb-6">
      <ShoppingCart className="h-16 w-16 text-primary-500 dark:text-primary-400" />
    </div>
    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
      Your cart is empty
    </h3>
    <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md">
      Looks like you haven't found what you're looking for. Explore our products and find something special!
    </p>
    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
      <Link
        to="/"
        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200"
      >
        Start Shopping
      </Link>
    </motion.div>
  </motion.div>
);

export default CartPage;