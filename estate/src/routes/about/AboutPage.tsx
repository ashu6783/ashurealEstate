import { Users, Award, Home, BarChart, Star, MessageSquare, MapPin, Calendar, Shield } from 'lucide-react';

// Testimonial type
type Testimonial = {
  name: string;
  location: string;
  text: string;
  rating: number;
};

const AboutPage = () => {
  // Testimonials data
  const testimonials: Testimonial[] = [
    {
      name: "Alex Rivera",
      location: "Beverly Hills",
      text: "CrestKeys helped me find my dream home in just two weeks. Their AI recommendations were spot on!",
      rating: 5
    },
    {
      name: "Emma Thompson",
      location: "Manhattan",
      text: "The team's expertise in luxury properties is unmatched. They found me a penthouse that exceeded all my expectations.",
      rating: 5
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[#8b8b8b] text-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About CrestKeys</h1>
          <p className="text-lg md:text-xl max-w-2xl mb-12">
            Transforming real estate experiences through innovation, personalized service, 
            and AI-powered solutions since 2008.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10">
            <div className="bg-[#1f1f1f] bg-opacity-10 p-8 rounded-lg">
              <div className="flex items-center mb-4">
                <Home className="text-blue-300 mr-3" size={24} />
                <h3 className="text-xl font-semibold">2000+ Properties</h3>
              </div>
              <p className="text-blue-100">
                Browse our extensive collection of premium listings across the country.
              </p>
            </div>

            <div className="bg-[#1f1f1f] bg-opacity-10 p-8 rounded-lg">
              <div className="flex items-center mb-4">
                <Users className="text-blue-300 mr-3" size={24} />
                <h3 className="text-xl font-semibold">10,000+ Happy Clients</h3>
              </div>
              <p className="text-blue-100">
                Join thousands of satisfied customers who found their perfect home with us.
              </p>
            </div>

            <div className="bg-[#1f1f1f] bg-opacity-10 p-8 rounded-lg">
              <div className="flex items-center mb-4">
                <Award className="text-blue-300 mr-3" size={24} />
                <h3 className="text-xl font-semibold">200+ Awards</h3>
              </div>
              <p className="text-blue-100">
                Recognized for excellence in real estate services and innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 px-6 bg-gray-100">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Values</h2>
          <div className="h-1 w-24 bg-[#8b8b8b] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <Shield className="text-blue-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Trust & Integrity</h3>
            <p className="text-gray-600">
              We believe in transparent, honest relationships with our clients. Every property 
              listing undergoes rigorous verification to ensure accuracy.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <Users className="text-blue-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Client-Centered Approach</h3>
            <p className="text-gray-600">
              Your needs come first. We listen carefully to understand your preferences 
              and priorities, tailoring our recommendations accordingly.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <BarChart className="text-blue-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Innovation & Excellence</h3>
            <p className="text-gray-600">
              We continuously push boundaries with AI-powered tools and data analytics 
              to provide superior property matches and market insights.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-6 bg-gray-100">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Client Testimonials</h2>
          <div className="h-1 w-24 bg-blue-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < testimonial.rating ? "text-yellow-400" : "text-gray-300"}
                    fill={i < testimonial.rating ? "#FBBF24" : "none"}
                  />
                ))}
              </div>
              <p className="text-gray-600 italic mb-6">"{testimonial.text}"</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-semibold">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                  <div className="flex items-center text-gray-500 text-sm">
                    <MapPin size={12} className="mr-1" />
                    {testimonial.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose CrestKeys</h2>
          <div className="h-1 w-24 bg-blue-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="mb-8 flex items-start">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-6">
                <Shield className="text-blue-600" size={22} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Trusted by Thousands</h3>
                <p className="text-gray-600">
                  With over 10,000 satisfied clients and a 98% customer satisfaction rate, 
                  our reputation speaks for itself.
                </p>
              </div>
            </div>

            <div className="mb-8 flex items-start">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-6">
                <Calendar className="text-blue-600" size={22} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">16+ Years of Experience</h3>
                <p className="text-gray-600">
                  Our seasoned team brings decades of combined expertise in the real estate market.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-6">
                <MessageSquare className="text-blue-600" size={22} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Personalized Support</h3>
                <p className="text-gray-600">
                  Our team is available 24/7 to guide you through every step of your property journey.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-8 text-white">
            <h3 className="text-2xl font-semibold mb-6">Ready to Find Your Dream Property?</h3>
            <p className="mb-8">
              Join thousands of satisfied clients who found their perfect home with CrestKeys
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition w-full sm:w-auto">
                Browse Properties
              </button>
              <button className="border border-white text-white py-3 px-6 rounded-lg hover:bg-white hover:text-gray-900 transition w-full sm:w-auto">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16 px-6 bg-[#8b8b8b] text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Let's Start Your Property Journey Together
          </h2>
          <p className="text-lg md:text-xl mb-10">
            Whether you're buying, selling, or just exploring options, our team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="bg-white text-blue-900 font-semibold py-3 px-8 rounded-lg hover:bg-blue-100 transition w-full sm:w-auto">
              Schedule a Consultation
            </button>
            <button className="border border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-blue-900 transition w-full sm:w-auto">
              View Our Properties
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
