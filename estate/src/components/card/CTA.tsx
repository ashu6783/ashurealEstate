import React from 'react';

const CTASection: React.FC = () => {
  return (
    <div className="mt-16 py-12 px-8 bg-gray-800 rounded-2xl text-white">
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
            className="px-8 py-3 bg-black text-white rounded-lg font-bold text-lg hover:bg-black transition-colors duration-300"
          >
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default CTASection;