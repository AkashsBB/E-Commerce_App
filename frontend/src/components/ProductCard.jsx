import React from 'react';
import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import { useUserStore } from "../store/useUserStore";
import { useCartStore } from "../store/useCartStore";

const ProductCard = ({ product }) => {
  const { user } = useUserStore();
  const { addToCart } = useCartStore();
  const [isHovered, setIsHovered] = React.useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!user) {
      toast.error("Please login to add products to cart", { id: "login" });
      return;
    }
    addToCart(product);
    toast.success("Added to cart!");
  };

  return (
    <div 
      className={`relative flex flex-col h-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden transition-all duration-300 transform ${
        isHovered ? 'shadow-card-hover -translate-y-1' : 'shadow-card'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className='p-6 flex-1 flex flex-col'>
        {/* Product Name */}
        <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 h-14 font-display'>
          {product.name}
        </h3>
        
        {/* Description */}
        {product.description && (
          <p className='text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 flex-1'>
            {product.description}
          </p>
        )}
        
        {/* Price and Add to Cart */}
        <div className='mt-4 pt-4 border-t border-gray-100 dark:border-gray-700'>
          <div className='flex items-center justify-between'>
            <div>
              <span className='text-gray-900 dark:text-white text-2xl font-bold'>
                ₹{product.price.toLocaleString('en-IN')}
              </span>
            </div>
            <button
              onClick={handleAddToCart}
              className={`flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 ${
                isHovered 
                  ? 'bg-primary-600 hover:bg-primary-700' 
                  : 'bg-gradient-to-r from-primary-500 to-accent-500 hover:opacity-90'
              }`}
              aria-label='Add to cart'
            >
              <ShoppingCart size={18} className='mr-2' />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
