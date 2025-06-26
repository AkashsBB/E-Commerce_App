import { motion } from 'framer-motion';
import CategoryItem from "../components/CategoryItem";

const categories = [
  { 
    href: "/backpack", 
    name: "Backpack", 
    imageUrl: "/backpack.jpg",
    bgGradient: "from-pink-500 to-primary-500"
  },
  { 
    href: "/bicycle", 
    name: "Bicycle", 
    imageUrl: "/bicycle.jpg",
    bgGradient: "from-purple-500 to-secondary-500"
  },
  { 
    href: "/boots", 
    name: "Boots", 
    imageUrl: "/boots.jpg",
    bgGradient: "from-accent-500 to-purple-500"
  },
  { 
    href: "/glasses", 
    name: "Glasses", 
    imageUrl: "/glasses.jpg",
    bgGradient: "from-primary-500 to-purple-600"
  },
  { 
    href: "/phone", 
    name: "Phone", 
    imageUrl: "/phone.jpg",
    bgGradient: "from-secondary-500 to-pink-500"
  },
  { 
    href: "/toys", 
    name: "Toys", 
    imageUrl: "/toys.jpg",
    bgGradient: "from-purple-600 to-accent-600"
  },
];

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-gray-600 dark:text-gray-300 mb-4">
            Discover Amazing Products
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore our curated collection of high-quality products that fit your lifestyle
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group"
            >
              <CategoryItem
                category={category}
                className={`bg-gradient-to-br ${category.bgGradient} hover:shadow-lg transition-all duration-300`}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;