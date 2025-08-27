import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, X, Bed, Bath, Home, Building, ArrowDownUp } from "lucide-react";

interface FilterProps {
  onFilter: (filters: Record<string, string | number>) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilter }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    type: searchParams.get("type") || "",
    city: searchParams.get("city") || "",
    property: searchParams.get("property") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    bedroom: searchParams.get("bedroom") || "",
    bathroom: searchParams.get("bathroom") || "",
  });

  const propertyTypes = [
    { value: "apartment", label: "Apartment", icon: <Building size={16} /> },
    { value: "house", label: "House", icon: <Home size={16} /> },
    { value: "condo", label: "Condo", icon: <Building size={16} /> },
    { value: "land", label: "Land", icon: <ArrowDownUp size={16} /> },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleApply = () => {
    onFilter(filters);
    const cleaned: Record<string, string> = {};
    Object.entries(filters).forEach(([k, v]) => {
      if (v !== "") cleaned[k] = v.toString();
    });
    setSearchParams(cleaned);
  };

  const handleReset = () => {
    const resetFilters = {
      type: "",
      city: "",
      property: "",
      minPrice: "",
      maxPrice: "",
      bedroom: "",
      bathroom: "",
    };
    setFilters(resetFilters);
    setSearchParams({});
    onFilter(resetFilters);
  };

  const hasActiveFilters = Object.values(filters).some(f => f !== "");

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="relative flex-1 min-w-[150px]">
          <Search size={18} className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            name="city"
            value={filters.city}
            onChange={handleChange}
            placeholder="City or neighborhood"
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-700"
          />
        </div>

        <select
          name="type"
          value={filters.type}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-3 py-2"
        >
          <option value="">Any Type</option>
          <option value="buy">Buy</option>
          <option value="rent">Rent</option>
          <option value="vacation">Vacation</option>
        </select>

        <select
          name="property"
          value={filters.property}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-3 py-2"
        >
          <option value="">Any Property</option>
          {propertyTypes.map(p => (
            <option key={p.value} value={p.value}>{p.label}</option>
          ))}
        </select>

        <select
          name="bedroom"
          value={filters.bedroom}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-3 py-2"
        >
          <option value="">Any Beds</option>
          {[1,2,3,4].map(n => <option key={n} value={n}>{n}+ Beds</option>)}
        </select>

        <select
          name="bathroom"
          value={filters.bathroom}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-3 py-2"
        >
          <option value="">Any Baths</option>
          {[1,2,3,4].map(n => <option key={n} value={n}>{n}+ Baths</option>)}
        </select>

        <input
          type="number"
          name="minPrice"
          value={filters.minPrice}
          onChange={handleChange}
          placeholder="Min $"
          className="w-[100px] border border-gray-300 rounded-lg px-3 py-2"
        />

        <input
          type="number"
          name="maxPrice"
          value={filters.maxPrice}
          onChange={handleChange}
          placeholder="Max $"
          className="w-[100px] border border-gray-300 rounded-lg px-3 py-2"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleApply}
          className="bg-yellow-700 text-white px-4 py-2 rounded-lg hover:bg-yellow-800"
        >
          Apply
        </button>

        {hasActiveFilters && (
          <button
            onClick={handleReset}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            Reset
          </button>
        )}
      </div>

      {hasActiveFilters && (
        <div className="mt-3 flex flex-wrap gap-2">
          {Object.entries(filters).map(([key, value]) => {
            if (!value) return null;
            return (
              <span key={key} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full flex items-center gap-1 text-sm">
                {key === "bedroom" && <Bed size={14} />}
                {key === "bathroom" && <Bath size={14} />}
                {key}: {value}
                <X
                  className="cursor-pointer"
                  size={14}
                  onClick={() => {
                    const newFilters = { ...filters, [key]: "" };
                    setFilters(newFilters);
                    const newParams = new URLSearchParams(searchParams);
                    newParams.delete(key);
                    setSearchParams(newParams);
                    onFilter(newFilters);
                  }}
                />
              </span>
            )
          })}
        </div>
      )}
    </div>
  );
};

export default Filter;
