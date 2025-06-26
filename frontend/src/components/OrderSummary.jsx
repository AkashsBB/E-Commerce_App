import { motion } from 'framer-motion';
import { useCartStore } from '../store/useCartStore';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import axios from '../lib/axios';
import React from 'react';

const stripePromise = loadStripe(
  'pk_test_51QvAr6SGBTtKXQr6lp4VvuLp8EVkHAzecUrPNiZyEOxSJqfa1n49T9PZx68MtPPNLDrvVQ0TbVStRhnzGqV2AVND00j7jtdJhe'
);

const OrderSummary = () => {
  const { total, subtotal, coupon, isCouponApplied, cart } = useCartStore();
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [paymentSuccess, setPaymentSuccess] = React.useState(false);

  const savings = subtotal - total;
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formattedSubtotal = formatCurrency(subtotal);
  const formattedTotal = formatCurrency(total);
  const formattedSavings = formatCurrency(savings);

  const handlePayment = async () => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    
    try {
      const stripe = await stripePromise;
      const res = await axios.post('/payments/create-checkout-session', {
        products: cart,
        couponCode: coupon ? coupon.code : null,
      });

      const session = res.data;
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error('Error:', result.error);
        toast.error('Payment processing failed. Please try again.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('An error occurred during payment processing');
    } finally {
      setIsProcessing(false);
    }
  };

  if (paymentSuccess) {
    return (
      <motion.div 
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-center py-6">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
            <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Order Confirmed!
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Thank you for your purchase. Your order has been received.
          </p>
          <div className="mt-6">
            <Link
              to="/orders"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              View Orders
              <ArrowRight className="ml-2 -mr-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 pb-4 border-b border-gray-100 dark:border-gray-700">
        Order Summary
      </h2>

      <div className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {formattedSubtotal}
            </span>
          </div>

          {savings > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-300">Discount</span>
              <span className="font-medium text-primary-600 dark:text-primary-400">
                -{formattedSavings}
              </span>
            </div>
          )}

          <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
            <span className="text-base font-semibold text-gray-900 dark:text-white">
              Total
            </span>
            <span className="text-gray-900 dark:text-white text-xl font-bold">
              {formattedTotal}
            </span>
          </div>
        </div>

        <motion.button
          onClick={handlePayment}
          disabled={isProcessing}
          className={`w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-xl text-base font-medium text-white ${
            isProcessing
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700'
          } shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
          whileHover={!isProcessing ? { scale: 1.02 } : {}}
          whileTap={!isProcessing ? { scale: 0.98 } : {}}
        >
          {isProcessing ? (
            'Processing...'
          ) : (
            <>
              Proceed to Payment
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </motion.button>

        <div className="text-center mt-4">
          <Link
            to="/"
            className="text-gray-900 dark:text-white inline-flex items-center text-sm font-medium"
          >
            <ArrowLeft className="mr-1.5 h-4 w-4" />
            Continue Shopping
          </Link>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
          <p className="mt-3 text-center text-xs text-gray-500 dark:text-gray-400">
            Secured by Stripe. Your payment information is encrypted.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSummary;
