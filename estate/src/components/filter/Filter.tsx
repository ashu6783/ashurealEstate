import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, SlidersHorizontal, Home, Building, ArrowDownUp, Bed, Bath } from "lucide-react";

function Filter({ isCompact = false }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [query, setQuery] = useState({
    type: searchParams.get("type") || "",
    city: searchParams.get("city") || "",
    property: searchParams.get("property") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    bedroom: searchParams.get("bedroom") || "",
    bathroom: searchParams.get("bathroom") || "",
  });

  // Handle screen resize and update layout
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Close filters panel when screen resizes to desktop
      if (!mobile) {
        setIsFiltersOpen(false);
      }
    };
    
    // Set initial state
    handleResize();
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilter = () => {
    const cleanedQuery: Record<string, string> = {};
    Object.entries(query).forEach(([key, value]) => {
      if (value && value.trim() !== "") {
        cleanedQuery[key] = value.trim();
      }
    });
    setSearchParams(cleanedQuery);
    setIsFiltersOpen(false);
  };

  const handleReset = () => {
    setQuery({
      type: "",
      city: "",
      property: "",
      minPrice: "",
      maxPrice: "",
      bedroom: "",
      bathroom: "",
    });
    setSearchParams({});
    setIsFiltersOpen(false);
  };

  // Property types for filter selection
  const propertyTypes = [
    { value: "apartment", label: "Apartment", icon: <Building size={16} /> },
    { value: "house", label: "House", icon: <Home size={16} /> },
    { value: "condo", label: "Condo", icon: <Building size={16} /> },
    { value: "land", label: "Land", icon: <ArrowDownUp size={16} /> },
  ];

  const hasActiveFilters = Object.values(query).some(value => value !== "");

  return (
    <div className="relative w-full">
      {/* Main Container */}
      <motion.div 
        className={`bg-white rounded-xl shadow-md ${isCompact ? 'p-3 md:p-4' : 'p-4 md:p-6'}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header with Result Summary - only show in standard mode */}
        {!isCompact && (
          <div className="flex justify-between items-center mb-4">
            <motion.h1 
              className="text-lg md:text-xl font-medium text-gray-800 truncate"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Properties in <span className="font-bold text-[#886B0B] ">{searchParams.get("city") || "All Cities"}</span>
            </motion.h1>

            {/* Mobile Filter Button */}
            <motion.button
              onClick={() => setIsFiltersOpen(true)}
              className="md:hidden flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg font-medium text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SlidersHorizontal size={16} />
              Filters {hasActiveFilters && <span className="w-4 h-4 bg-blue-600 rounded-full text-white text-xs flex items-center justify-center">!</span>}
            </motion.button>
          </div>
        )}

        {/* Search Input and Controls Container */}
        <motion.div 
          className={`flex flex-wrap gap-2 ${isCompact ? '' : 'md:flex-row'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {/* Search Bar */}
          <div className={`relative flex-grow min-w-[180px] ${isCompact ? 'w-full md:w-auto' : ''}`}>
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={18} />
            </div>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="City or neighborhood"
              onChange={handleChange}
              value={query.city}
              className={`w-full pl-9 pr-4 ${isCompact ? 'py-2 text-sm' : 'py-2.5 md:py-3'} border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#B8860B]`}
            />
          </div>

          {/* Desktop Filter Controls - Condensed in compact mode */}
          <div className={`hidden md:flex flex-wrap gap-2 ${isCompact ? 'flex-1 justify-between' : ''}`}>
            <select
              name="type"
              id="type"
              onChange={handleChange}
              value={query.type}
              className={`${isCompact ? 'px-3 py-2 text-xs w-24' : 'px-4 py-3'} border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#B8860B]`}
            >
              <option value="">Any Type</option>
              <option value="buy">Buy</option>
              <option value="rent">Rent</option>
              <option value="vacation">Vacation</option>
            </select>

            <select
              name="property"
              id="property"
              onChange={handleChange}
              value={query.property}
              className={`${isCompact ? 'px-3 py-2 text-xs w-24' : 'px-4 py-3'} border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#B8860B]`}
            >
              <option value="">Any Property</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="condo">Condo</option>
              <option value="land">Land</option>
            </select>

            <select
              name="bedroom"
              id="bedroom"
              onChange={handleChange}
              value={query.bedroom}
              className={`${isCompact ? 'px-3 py-2 text-xs w-24' : 'px-4 py-3'} border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#B8860B]`}
            >
              <option value="">Any Beds</option>
              <option value="1">1+ Beds</option>
              <option value="2">2+ Beds</option>
              <option value="3">3+ Beds</option>
              <option value="4">4+ Beds</option>
            </select>

            <div className="flex gap-2">
              <input
                type="number"
                id="minPrice"
                name="minPrice"
                placeholder="Min $"
                min="0"
                onChange={handleChange}
                value={query.minPrice}
                className={`${isCompact ? 'w-20 px-3 py-2 text-xs' : 'w-24 px-4 py-3'} border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#B8860B]`}
              />
              <input
                type="number"
                id="maxPrice"
                name="maxPrice"
                placeholder="Max $"
                min="0"
                onChange={handleChange}
                value={query.maxPrice}
                className={`${isCompact ? 'w-20 px-3 py-2 text-xs' : 'w-24 px-4 py-3'} border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#B8860B]`}
              />
            </div>

            <div className="flex gap-2">
              <motion.button
                onClick={handleFilter}
                className={`${isCompact ? 'px-3 py-2 text-xs' : 'px-5 py-3'} bg-[#B8860B] text-white font-medium rounded-lg shadow-md shadow-blue-100`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Search
              </motion.button>

              {hasActiveFilters && (
                <motion.button
                  onClick={handleReset}
                  className={`${isCompact ? 'px-3 py-2 text-xs' : 'px-5 py-3'} bg-gray-100 text-gray-700 font-medium rounded-lg`}
                  whileHover={{ scale: 1.05, backgroundColor: "#f3f4f6" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Reset
                </motion.button>
              )}
            </div>
          </div>
          
          {/* Mobile Search & Filter Buttons for Compact Mode */}
          {isMobile && (
            <div className="flex gap-2 w-full">
              <motion.button
                onClick={handleFilter}
                className="bg-[#B8860B] text-white font-medium rounded-lg py-2 px-4 flex-1 flex items-center justify-center"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Search
              </motion.button>
              
              <motion.button
                onClick={() => setIsFiltersOpen(true)}
                className="flex items-center justify-center gap-1 bg-blue-50 text-[#B8860B] px-3 py-2 rounded-lg font-medium text-sm"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <SlidersHorizontal size={16} />
                Filters
                {hasActiveFilters && <span className="w-4 h-4 bg-[#B8860B] rounded-full text-white text-xs flex items-center justify-center ml-1">!</span>}
              </motion.button>
            </div>
          )}
        </motion.div>

        {/* Current Active Filters Pills - Show only if filters are applied */}
        {hasActiveFilters && (
          <motion.div 
            className={`flex flex-wrap gap-2 ${isCompact ? 'mt-2' : 'mt-4'}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {Object.entries(query).map(([key, value]) => {
              if (value) {
                let label = "";
                let icon = null;
                
                switch(key) {
                  case "city": label = "Location: "; break;
                  case "type": label = "Type: "; break;
                  case "property": label = "Property: "; break;
                  case "minPrice": label = "Min $: "; break;
                  case "maxPrice": label = "Max $: "; break;
                  case "bedroom": 
                    label = ""; 
                    icon = <Bed size={14} className="mr-1" />;
                    break;
                  case "bathroom": 
                    label = ""; 
                    icon = <Bath size={14} className="mr-1" />;
                    break;
                  default: label = `${key}: `;
                }
                
                return (
                  <motion.span 
                    key={key}
                    className={`bg-blue-50 text-[#B8860B] px-2 py-1 rounded-full ${isCompact ? 'text-xs' : 'text-sm'} flex items-center gap-1`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {icon}
                    {label}
                    {value}
                    {(key === "bedroom" || key === "bathroom") && "+"}
                    <X 
                      size={14} 
                      className="cursor-pointer ml-1"
                      onClick={() => {
                        setQuery(prev => ({ ...prev, [key]: "" }));
                        const newParams = new URLSearchParams(searchParams);
                        newParams.delete(key);
                        setSearchParams(newParams);
                      }}
                    />
                  </motion.span>
                );
              }
              return null;
            })}
            
            {/* Clear All Button - Only show if multiple filters are applied */}
            {Object.values(query).filter(v => v !== "").length > 1 && (
              <motion.button
                onClick={handleReset}
                className={`bg-gray-100 hover:bg-gray-200 text-gray-600 px-2 py-1 rounded-full ${isCompact ? 'text-xs' : 'text-sm'} flex items-center gap-1`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Clear All
              </motion.button>
            )}
          </motion.div>
        )}
      </motion.div>

      {/* Mobile Filters Panel */}
      <AnimatePresence>
        {isFiltersOpen && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              // Close panel when clicking outside
              if (e.target === e.currentTarget) {
                setIsFiltersOpen(false);
              }
            }}
          >
            <motion.div 
              className="bg-white absolute bottom-0 left-0 right-0 max-h-[90%] rounded-t-2xl overflow-auto"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="sticky top-0 bg-white p-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-xl font-bold">Filters</h2>
                <button 
                  onClick={() => setIsFiltersOpen(false)}
                  className="p-2 rounded-full bg-gray-100"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Drag indicator */}
              <div className="flex justify-center my-2">
                <div className="w-16 h-1 bg-gray-300 rounded-full"></div>
              </div>
              
              {/* Filter Groups */}
              <div className="p-4 pb-24 space-y-6">
                {/* Location */}
                <div className="space-y-2">
                  <label className="font-medium">Location</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <Search size={18} />
                    </div>
                    <input
                      type="text"
                      id="mobile-city"
                      name="city"
                      placeholder="City or neighborhood"
                      onChange={handleChange}
                      value={query.city}
                      className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                {/* Type */}
                <div className="space-y-2">
                  <label className="font-medium">Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button 
                      className={`p-3 border rounded-lg flex items-center justify-center gap-2 ${query.type === 'buy' ? 'bg-blue-50 border-blue-200 text-blue-600' : 'border-gray-200'}`}
                      onClick={() => setQuery(prev => ({ ...prev, type: prev.type === 'buy' ? '' : 'buy' }))}
                    >
                      <Home size={18} />
                      Buy
                    </button>
                    <button 
                      className={`p-3 border rounded-lg flex items-center justify-center gap-2 ${query.type === 'rent' ? 'bg-blue-50 border-blue-200 text-blue-600' : 'border-gray-200'}`}
                      onClick={() => setQuery(prev => ({ ...prev, type: prev.type === 'rent' ? '' : 'rent' }))}
                    >
                      <Building size={18} />
                      Rent
                    </button>
                    <button 
                      className={`p-3 border rounded-lg flex items-center justify-center gap-2 ${query.type === 'vacation' ? 'bg-blue-50 border-blue-200 text-blue-600' : 'border-gray-200'}`}
                      onClick={() => setQuery(prev => ({ ...prev, type: prev.type === 'vacation' ? '' : 'vacation' }))}
                    >
                      <Home size={18} />
                      Vacation
                    </button>
                  </div>
                </div>
                
                {/* Property Type */}
                <div className="space-y-2">
                  <label className="font-medium">Property Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    {propertyTypes.map(type => (
                      <button 
                        key={type.value}
                        className={`p-3 border rounded-lg flex items-center justify-center gap-2 ${query.property === type.value ? 'bg-blue-50 border-blue-200 text-blue-600' : 'border-gray-200'}`}
                        onClick={() => setQuery(prev => ({ ...prev, property: prev.property === type.value ? '' : type.value }))}
                      >
                        {type.icon}
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Bedrooms */}
                <div className="space-y-2">
                  <label className="font-medium">Bedrooms</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 2, 3, 4].map(num => (
                      <button 
                        key={`bed-${num}`}
                        className={`p-3 border rounded-lg flex items-center justify-center ${query.bedroom === num.toString() ? 'bg-blue-50 border-blue-200 text-blue-600' : 'border-gray-200'}`}
                        onClick={() => setQuery(prev => ({ ...prev, bedroom: prev.bedroom === num.toString() ? '' : num.toString() }))}
                      >
                        <Bed size={16} className="mr-1" />
                        {num}+
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Bathrooms */}
                <div className="space-y-2">
                  <label className="font-medium">Bathrooms</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 2, 3, 4].map(num => (
                      <button 
                        key={`bath-${num}`}
                        className={`p-3 border rounded-lg flex items-center justify-center ${query.bathroom === num.toString() ? 'bg-blue-50 border-blue-200 text-blue-600' : 'border-gray-200'}`}
                        onClick={() => setQuery(prev => ({ ...prev, bathroom: prev.bathroom === num.toString() ? '' : num.toString() }))}
                      >
                        <Bath size={16} className="mr-1" />
                        {num}+
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Price Range */}
                <div className="space-y-3">
                  <label className="font-medium">Price Range</label>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Min Price</label>
                      <input
                        type="number"
                        name="minPrice"
                        placeholder="Any"
                        min="0"
                        onChange={handleChange}
                        value={query.minPrice}
                        className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Max Price</label>
                      <input
                        type="number"
                        name="maxPrice"
                        placeholder="Any"
                        min="0"
                        onChange={handleChange}
                        value={query.maxPrice}
                        className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Fixed bottom action bar */}
              <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 flex gap-3">
                <motion.button
                  onClick={handleReset}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Reset All
                </motion.button>
                <motion.button
                  onClick={handleFilter}
                  className="flex-1 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md shadow-blue-100"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Apply Filters
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Filter;