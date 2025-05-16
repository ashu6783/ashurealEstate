import { useContext } from 'react';
import { motion } from 'framer-motion';
import SearchBar from '../../components/searchbar/SearchBar';
import { AuthContext } from '../../context/AuthContext';

function HomePage() {
  const { currentUser } = useContext(AuthContext);

  const featuredProperties=[
   {
    id: 1,
    title: "Luxury Villa in Beverly Hills",
    description: "Modern design with premium amenities",
    price: "$2,500,000",
    image: "/property-1.jpg",
    alt: "Luxury Villa",
  },
  {
    id: 2,
    title: "Modern Apartment in NYC",
    description: "Close to Central Park with skyline view",
    price: "$1,200,000",
    image: "/property-2.jpg",
    alt: "Modern Apartment",
  },
  {
    id: 3,
    title: "Beach House in Malibu",
    description: "Wake up to the sound of waves",
    price: "$3,800,000",
    image: "/property-3.jpg",
    alt: "Mountain House",
  },
  ]
  
  // Variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };
  
  const statsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: 'spring',
        staggerChildren: 0.2,
        delayChildren: 0.8
      }
    }
  };
  
  const statItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: 'spring', 
        stiffness: 100,
        duration: 0.8
      }
    }
  };
  
  // Image hover effect
  const imageHoverVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.4, ease: "easeInOut" }
    }
  };
  
  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-white to-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
          {/* Left Content Section */}
          <motion.div 
            className="flex-1 md:flex-[3]"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex flex-col gap-8 md:pr-8">
              <motion.div className="space-y-4" variants={itemVariants}>
                <motion.h1 
                  className="text-5xl lg:text-7xl font-bold text-gray-800 leading-tight"
                  variants={itemVariants}
                >
                  Find{" "}
                  <motion.span 
                    className="text-blue-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                  >
                    Real Estate
                  </motion.span>{" "}
                  & Get Your Dream Place
                </motion.h1>
                <motion.p 
                  className="text-lg md:text-xl text-gray-600 max-w-2xl"
                  variants={itemVariants}
                >
                  Welcome to AshuEstate and Co., where your dream home becomes a reality.
                  We specialize in connecting you with the perfect property,
                  tailored to your unique needs and lifestyle.
                </motion.p>
              </motion.div>
              
              {/* Search Bar with Animation */}
              <motion.div 
                className="py-6"
                variants={itemVariants}
                whileInView={{ y: [20, 0], opacity: [0, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <SearchBar />
              </motion.div>
              
              {/* Stats Section with Animation */}
              <motion.div 
                className="hidden sm:grid grid-cols-3 gap-6 mt-8 py-8 border-t border-gray-200"
                variants={statsVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                <motion.div 
                  className="text-center p-4 bg-white bg-opacity-50 hover:bg-white hover:shadow-lg rounded-xl transition-all duration-300"
                  variants={statItemVariants}
                  whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                >
                  <motion.h1 
                    className="text-4xl lg:text-5xl font-bold text-blue-600"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    16+
                  </motion.h1>
                  <h2 className="text-lg font-medium mt-2 text-gray-700">Years of Experience</h2>
                </motion.div>
                <motion.div 
                  className="text-center p-4 bg-white bg-opacity-50 hover:bg-white hover:shadow-lg rounded-xl transition-all duration-300"
                  variants={statItemVariants}
                  whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                >
                  <motion.h1 
                    className="text-4xl lg:text-5xl font-bold text-blue-600"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    200
                  </motion.h1>
                  <h2 className="text-lg font-medium mt-2 text-gray-700">Awards Gained</h2>
                </motion.div>
                <motion.div 
                  className="text-center p-4 bg-white bg-opacity-50 hover:bg-white hover:shadow-lg rounded-xl transition-all duration-300"
                  variants={statItemVariants}
                  whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                >
                  <motion.h1 
                    className="text-4xl lg:text-5xl font-bold text-blue-600"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    2000+
                  </motion.h1>
                  <h2 className="text-lg font-medium mt-2 text-gray-700">Properties Ready</h2>
                </motion.div>
              </motion.div>
              
              {/* User Welcome Message if Logged In */}
              {currentUser && (
                <motion.div 
                  className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                >
                  <p className="text-lg text-blue-800">
                    Welcome back, <span className="font-bold">{currentUser.name}</span>! Continue your property search where you left off.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
          
          {/* Right Image Gallery Section */}
          <motion.div 
            className="hidden md:block flex-[2]"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="grid grid-cols-1 gap-6 h-full">
              <motion.div 
                className="overflow-hidden rounded-2xl shadow-xl"
                variants={imageHoverVariants}
                initial="rest"
                whileHover="hover"
              >
                <motion.img 
                  src="/bgg.png" 
                  alt="Luxury Home" 
                  className="w-full h-full object-cover" 
                />
              </motion.div>
              <div className="grid grid-cols-2 gap-6">
                <motion.div 
                  className="overflow-hidden rounded-2xl shadow-xl bg-blue-600 flex items-center justify-center p-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="text-center text-white">
                    <h3 className="text-2xl font-bold mb-2">Ready to explore?</h3>
                    <p className="mb-4">Discover our premium listings</p>
                    <motion.button 
                      className="px-6 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Browse Now
                    </motion.button>
                  </div>
                </motion.div>
                
                {/* Added new card for balance */}
                <motion.div 
                  className="overflow-hidden rounded-2xl shadow-xl bg-gray-800 flex items-center justify-center p-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.6 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="text-center text-white">
                    <h3 className="text-2xl font-bold mb-2">Need help?</h3>
                    <p className="mb-4">Talk to our experts</p>
                    <motion.button 
                      className="px-6 py-2 bg-white text-gray-800 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Contact Us
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Added Featured Properties Section */}
        <motion.div
          className="mt-16 pt-8 border-t border-gray-200"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-3xl font-bold text-gray-800 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Featured Properties
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ y: -10 }}
              >
                <div className="h-48 overflow-hidden">
                  <motion.img 
                    src={property.image} 
                    alt={property.alt || "Property Image"}
                    className="w-full h-full object-cover"
                    variants={imageHoverVariants}
                    initial="rest"
                    whileHover="hover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800"> {property.title}</h3>
                  <p className="text-gray-600 mt-2">{property.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-blue-600 font-semibold text-lg">{property.price}</span>
                    <motion.button 
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium"
                      whileHover={{ scale: 1.05, backgroundColor: "#2563EB" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Details
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="mt-10 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <motion.button 
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium text-lg"
              whileHover={{ scale: 1.05, backgroundColor: "#2563EB" }}
              whileTap={{ scale: 0.95 }}
            >
              View All Properties
            </motion.button>
          </motion.div>
        </motion.div>
        
        {/* Added Call to Action Section */}
        <motion.div
          className="mt-16 py-12 px-8 bg-gray-800 rounded-2xl text-white"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <motion.h2 
                className="text-3xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Ready to find your dream home?
              </motion.h2>
              <motion.p 
                className="text-gray-300 max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Join thousands of satisfied customers who found their perfect property with AshuEstate and Co.
              </motion.p>
            </div>
            <motion.div
              className="mt-6 md:mt-0"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <motion.button 
                className="px-8 py-3 bg-white text-gray-800 rounded-lg font-bold text-lg"
                whileHover={{ scale: 1.05, backgroundColor: "#f3f4f6" }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started Today
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default HomePage;