import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, DollarSign, ArrowRight, X, Home, Building, Sailboat } from "lucide-react";

const types = ["buy", "rent", "vacation"];
const popularCities = ["New York", "Los Angeles", "Chicago", "Miami", "San Francisco"];

function SearchBar() {
  const [query, setQuery] = useState({
    type: "buy",
    city: "",
    minPrice: "",
    maxPrice: "",
    showSuggestions: false
  });
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setQuery(prev => ({ ...prev, showSuggestions: false }));
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const switchType = (val: string) => {
    setQuery(prev => ({ ...prev, type: val }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(prev => ({ 
      ...prev, 
      [e.target.name]: e.target.value,
      showSuggestions: e.target.name === "city" && e.target.value !== "" 
    }));
  };

  const handleSelectCity = (city: string) => {
    setQuery(prev => ({ ...prev, city, showSuggestions: false }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const searchParams = new URLSearchParams();
    
    if (query.type) searchParams.append("type", query.type);
    if (query.city) searchParams.append("city", query.city);
    if (query.minPrice) searchParams.append("minPrice", query.minPrice.toString());
    if (query.maxPrice) searchParams.append("maxPrice", query.maxPrice.toString());
    
    navigate(`/list?${searchParams.toString()}`);
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case "buy": return <Home className="mr-2" size={18} />;
      case "rent": return <Building className="mr-2" size={18} />;
      case "vacation": return <Sailboat className="mr-2" size={18} />;
      default: return <Home className="mr-2" size={18} />;
    }
  };

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-xl p-6 max-w-6xl mx-auto"
    >
      <motion.div 
        className="flex flex-wrap gap-3 mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {types.map((type) => (
          <motion.button
            key={type}
            onClick={() => switchType(type)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`py-3 px-6 text-base font-medium capitalize rounded-xl transition duration-200 flex items-center
              ${
                query.type === type
                  ? "bg-[#B8860B] text-white shadow-md shadow-blue-200"
                  : "bg-[#1b1919] text-white hover:bg-[#1b1919]"
              }
            `}
          >
            {getTypeIcon(type)}
            {type}
          </motion.button>
        ))}
      </motion.div>
      
      <form onSubmit={handleSearch}>
        <motion.div 
          layout
          className="flex flex-col md:flex-row gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex-1 relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#B8860B]">
              <MapPin size={20} />
            </div>
            <input
              type="text"
              name="city"
              placeholder="City or neighborhood"
              onChange={handleChange}
              value={query.city}
              onFocus={() => setQuery(prev => ({ ...prev, showSuggestions: prev.city !== "" }))}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
            />
            
            {/* City suggestions */}
            <AnimatePresence>
              {query.showSuggestions && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute left-0 right-0 top-full mt-1 bg-white rounded-xl shadow-lg z-10 overflow-hidden"
                >
                  <div className="p-2">
                    {popularCities
                      .filter(city => city.toLowerCase().includes(query.city.toLowerCase()))
                      .map((city) => (
                        <motion.div
                          key={city}
                          whileHover={{ backgroundColor: "#f3f4f6" }}
                          className="px-4 py-2 cursor-pointer rounded-lg flex items-center"
                          onClick={() => handleSelectCity(city)}
                        >
                          <MapPin size={16} className="text-gray-400 mr-2" />
                          <span>{city}</span>
                        </motion.div>
                      ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {(expanded || window.innerWidth >= 768) && (
            <>
              <div className="flex-1 relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#B8860B]">
                  <DollarSign size={20} />
                </div>
                <input
                  type="number"
                  name="minPrice"
                  min={0}
                  placeholder="Min Price"
                  onChange={handleChange}
                  value={query.minPrice}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
                />
              </div>
              
              <div className="flex-1 relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#B8860B]">
                  <DollarSign size={20} />
                </div>
                <input
                  type="number"
                  name="maxPrice"
                  min={0}
                  placeholder="Max Price"
                  onChange={handleChange}
                  value={query.maxPrice}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
                />
              </div>
            </>
          )}
          
          <div className="flex gap-2">
            {window.innerWidth < 768 && (
              <motion.button
                type="button"
                onClick={() => setExpanded(!expanded)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 flex-none bg-[#B8860B] hover:bg-gray-200 rounded-xl flex justify-center items-center transition text-gray-700"
              >
                {expanded ? <X size={20} /> : <ArrowRight size={20} />}
              </motion.button>
            )}
            
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-14 h-14 flex-none bg-[#B8860B] hover:bg-[#B8860B] rounded-xl flex justify-center items-center transition shadow-lg shadow-blue-200"
            >
              <Search size={20} className="text-white" />
            </motion.button>
          </div>
        </motion.div>
      </form>
    </motion.div>
  );
}

export default SearchBar;