import { useContext } from 'react';
import { motion } from 'framer-motion';
import SearchBar from '../../components/searchbar/SearchBar';
import { AuthContext } from '../../context/AuthContext';

function HomePage() {
  const { currentUser } = useContext(AuthContext);

  const featuredProperties = [
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
  ];
  
  // Simplified animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#171b2c] to-[#4d4b1e]">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
          {/* Left Content Section */}
          <motion.div 
            className="flex-1 md:flex-[3]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col gap-8 md:pr-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                  Find{" "}
                  <span className="bg-gradient-to-r from-[#d4b838] via-[#FFD700] to-[#e0aa22] bg-clip-text text-transparent font-extrabold">
                    Real Estate
                  </span>{" "}
                  & Get Your Dream Place
                </h1>
                <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
                  Welcome to AshuEstate and Co., where your dream home becomes a reality.
                  We specialize in connecting you with the perfect property,
                  tailored to your unique needs and lifestyle.
                </p>
              </div>
              
              {/* Search Bar */}
              <div className="py-6">
                <SearchBar />
              </div>
              
              {/* Stats Section with Simpler Animation */}
              <motion.div 
                className="hidden sm:grid grid-cols-3 gap-6 mt-8 py-8 border-t border-gray-200"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeIn}
              >
                <div className="text-center p-4 bg-white bg-opacity-50 hover:bg-white rounded-xl transition-all duration-300">
                  <h1 className="text-4xl lg:text-5xl font-bold text-[#B8860B]">16+</h1>
                  <h2 className="text-lg font-medium mt-2 text-gray-700">Years of Experience</h2>
                </div>
                <div className="text-center p-4 bg-white bg-opacity-50 hover:bg-white rounded-xl transition-all duration-300">
                  <h1 className="text-4xl lg:text-5xl font-bold text-[#B8860B]">200</h1>
                  <h2 className="text-lg font-medium mt-2 text-gray-700">Awards Gained</h2>
                </div>
                <div className="text-center p-4 bg-white bg-opacity-50 hover:bg-white rounded-xl transition-all duration-300">
                  <h1 className="text-4xl lg:text-5xl font-bold text-[#B8860B]">2000+</h1>
                  <h2 className="text-lg font-medium mt-2 text-gray-700">Properties Ready</h2>
                </div>
              </motion.div>
              
              {/* User Welcome Message if Logged In */}
              {currentUser && (
                <motion.div 
                  className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-lg text-[#292009]">
                    Welcome back, <span className="font-bold text-[#B8860B]">{currentUser.username}</span>! Continue your property search where you left off.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
          
          {/* Right Image Gallery Section */}
          <motion.div 
            className="hidden md:block flex-[2]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 gap-6 h-full">
              <div className="overflow-hidden rounded-2xl shadow-xl transition-transform duration-300 hover:scale-[1.02]">
                <img 
                  src="/bgg.webp" 
                  alt="Luxury Home" 
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Featured Properties Section */}
        <motion.div
          className="mt-16 pt-8 border-t border-gray-200"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Featured Properties
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={property.image} 
                    alt={property.alt || "Property Image"}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800">{property.title}</h3>
                  <p className="text-gray-600 mt-2">{property.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-[#B8860B] font-semibold text-lg">{property.price}</span>
                    <button 
                      className="px-4 py-2 bg-[#B8860B] text-white rounded-lg text-sm font-medium hover:bg-[#c7a03c] transition-colors duration-300"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <button 
              className="px-8 py-3 bg-[#B8860B] text-white rounded-lg font-medium text-lg hover:bg-[#c7a03c] transition-colors duration-300"
            >
              View All Properties
            </button>
          </div>
        </motion.div>
        
        {/* Call to Action Section */}
        <motion.div
          className="mt-16 py-12 px-8 bg-gray-800 rounded-2xl text-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-4">
                Ready to find your dream home?
              </h2>
              <p className="text-gray-300 max-w-xl">
                Join thousands of satisfied customers who found their perfect property with AshuEstate and Co.
              </p>
            </div>
            <div className="mt-6 md:mt-0">
              <button 
                className="px-8 py-3 bg-white text-gray-800 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors duration-300"
              >
                Get Started Today
              </button>
            </div>
          </div>
        </motion.div>
      </div>
      <footer className="mt-16 py-8 bg-gray-900 text-white text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Build with ❤️ by Ashu.
        </p>
      </footer>
    </div>
  );
}

export default HomePage;