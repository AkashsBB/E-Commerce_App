import { Minus, Plus, Trash } from "lucide-react";
import { useCartStore } from "../store/useCartStore";
import React from 'react';

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCartStore();
  const [isRemoving, setIsRemoving] = React.useState(false);

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => removeFromCart(item._id), 300);
  };

  return (
    <div 
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden transition-all duration-300 ${
        isRemoving ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}
    >
      <div className='p-4 md:p-6'>
        <div className='flex flex-col md:flex-row gap-4 md:gap-6'>
          {/* Product Image */}
          {item.image && (
            <div className='shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700'>
              <img 
                className='w-full h-full object-cover' 
                src={item.image} 
                alt={item.name}
              />
            </div>
          )}

          {/* Product Info */}
          <div className='flex-1 min-w-0'>
            <div className='flex flex-col h-full'>
              <div className='flex-1'>
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white font-display'>
                  {item.name}
                </h3>
                {item.description && (
                  <p className='mt-1 text-sm text-gray-600 dark:text-gray-300 line-clamp-2'>
                    {item.description}
                  </p>
                )}
              </div>

              <div className='mt-4 pt-4 border-t border-gray-100 dark:border-gray-700'>
                <div className='flex flex-wrap items-center justify-between gap-4'>
                  {/* Quantity Controls */}
                  <div className='flex items-center space-x-3'>
                    <button
                      onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                      className='inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors'
                      aria-label='Decrease quantity'
                    >
                      <Minus size={16} />
                    </button>
                    <span className='text-base font-medium text-gray-900 dark:text-white w-6 text-center'>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className='inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors'
                      aria-label='Increase quantity'
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  {/* Price */}
                  <div className='text-right'>
                    <p className='text-lg font-bold text-secondary-600 dark:text-white'>
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </p>
                    {item.quantity > 1 && (
                      <p className='text-sm text-gray-500 dark:text-white'>
                        ₹{item.price.toLocaleString('en-IN')} each
                      </p>
                    )}
                  </div>
                </div>

                {/* Remove Button */}
                <div className='mt-3'>
                  <button
                    onClick={handleRemove}
                    className='inline-flex items-center text-sm font-medium text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors'
                  >
                    <Trash size={16} className='mr-1.5' />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;