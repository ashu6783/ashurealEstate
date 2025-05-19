import { motion } from 'framer-motion';
import { Users, Award, Home, BarChart, Star, MessageSquare, MapPin, Calendar, Shield } from 'lucide-react';

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const scaleUp = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: { duration: 0.5 }
    }
};



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
            <motion.section
                className="relative bg-[#8b8b8b] text-white py-24 px-6"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
            >
                <div className="max-w-6xl mx-auto">
                    <motion.h1
                        className="text-5xl font-bold mb-6"
                        variants={fadeIn}
                    >
                        About CrestKeys
                    </motion.h1>
                    <motion.p
                        className="text-xl max-w-2xl mb-12"
                        variants={fadeIn}
                    >
                        Transforming real estate experiences through innovation, personalized service, and AI-powered solutions since 2008.
                    </motion.p>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
                        variants={staggerContainer}
                    >
                        <motion.div
                            className="bg-[#1f1f1f] bg-opacity-10 p-8 rounded-lg backdrop-blur-sm"
                            variants={scaleUp}
                        >
                            <div className="flex items-center mb-4">
                                <Home className="text-blue-300 mr-3" size={24} />
                                <h3 className="text-xl font-semibold">2000+ Properties</h3>
                            </div>
                            <p className="text-blue-100">Browse our extensive collection of premium listings across the country.</p>
                        </motion.div>

                        <motion.div
                            className="bg-[#1f1f1f] bg-opacity-10 p-8 rounded-lg backdrop-blur-sm"
                            variants={scaleUp}
                        >
                            <div className="flex items-center mb-4">
                                <Users className="text-blue-300 mr-3" size={24} />
                                <h3 className="text-xl font-semibold">10,000+ Happy Clients</h3>
                            </div>
                            <p className="text-blue-100">Join thousands of satisfied customers who found their perfect home with us.</p>
                        </motion.div>

                        <motion.div
                            className="bg-[#1f1f1f] bg-opacity-10 p-8 rounded-lg backdrop-blur-sm"
                            variants={scaleUp}
                        >
                            <div className="flex items-center mb-4">
                                <Award className="text-blue-300 mr-3" size={24} />
                                <h3 className="text-xl font-semibold">200+ Awards</h3>
                            </div>
                            <p className="text-blue-100">Recognized for excellence in real estate services and innovation.</p>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.section>


            {/* Our Values Section */}
            <motion.section
                className="py-24 px-6 bg-gray-100"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
            >
                <div className="max-w-6xl mx-auto">
                    <motion.div className="text-center mb-16">
                        <motion.h2
                            className="text-4xl font-bold text-gray-800 mb-4"
                            variants={fadeIn}
                        >
                            Our Values
                        </motion.h2>
                        <motion.div
                            className="h-1 w-24 bg-[#8b8b8b] mx-auto mb-8"
                            variants={scaleUp}
                        ></motion.div>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                        variants={staggerContainer}
                    >
                        <motion.div
                            className="bg-white p-8 rounded-lg shadow-md"
                            variants={scaleUp}
                        >
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                                <Shield className="text-blue-600" size={28} />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">Trust & Integrity</h3>
                            <p className="text-gray-600">
                                We believe in transparent, honest relationships with our clients. Every property listing undergoes rigorous verification to ensure accuracy.
                            </p>
                        </motion.div>

                        <motion.div
                            className="bg-white p-8 rounded-lg shadow-md"
                            variants={scaleUp}
                        >
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                                <Users className="text-blue-600" size={28} />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">Client-Centered Approach</h3>
                            <p className="text-gray-600">
                                Your needs come first. We listen carefully to understand your preferences and priorities, tailoring our recommendations accordingly.
                            </p>
                        </motion.div>

                        <motion.div
                            className="bg-white p-8 rounded-lg shadow-md"
                            variants={scaleUp}
                        >
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                                <BarChart className="text-blue-600" size={28} />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">Innovation & Excellence</h3>
                            <p className="text-gray-600">
                                We continuously push boundaries with AI-powered tools and data analytics to provide superior property matches and market insights.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.section>



            {/* Testimonials Section */}
            <motion.section
                className="py-24 px-6 bg-gray-100"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
            >
                <div className="max-w-6xl mx-auto">
                    <motion.div className="text-center mb-16">
                        <motion.h2
                            className="text-4xl font-bold text-gray-800 mb-4"
                            variants={fadeIn}
                        >
                            Client Testimonials
                        </motion.h2>
                        <motion.div
                            className="h-1 w-24 bg-blue-600 mx-auto mb-8"
                            variants={scaleUp}
                        ></motion.div>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                        variants={staggerContainer}
                    >
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                className="bg-white p-8 rounded-lg shadow-md"
                                variants={scaleUp}
                            >
                                <div className="flex mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={20}
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
                                            <MapPin size={14} className="mr-1" />
                                            {testimonial.location}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            {/* Why Choose Us Section */}
            <motion.section
                className="py-24 px-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
            >
                <div className="max-w-6xl mx-auto">
                    <motion.div className="text-center mb-16">
                        <motion.h2
                            className="text-4xl font-bold text-gray-800 mb-4"
                            variants={fadeIn}
                        >
                            Why Choose CrestKeys
                        </motion.h2>
                        <motion.div
                            className="h-1 w-24 bg-blue-600 mx-auto mb-8"
                            variants={scaleUp}
                        ></motion.div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            className="order-2 md:order-1"
                            variants={fadeIn}
                        >
                            <motion.div
                                className="mb-8 flex"
                                variants={fadeIn}
                            >
                                <div className="mr-6">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                        <Shield className="text-blue-600" size={24} />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Trusted by Thousands</h3>
                                    <p className="text-gray-600">
                                        With over 10,000 satisfied clients and a 98% customer satisfaction rate, our reputation speaks for itself.
                                    </p>
                                </div>
                            </motion.div>

                            <motion.div
                                className="mb-8 flex"
                                variants={fadeIn}
                            >
                                <div className="mr-6">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                        <Calendar className="text-blue-600" size={24} />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">16+ Years of Experience</h3>
                                    <p className="text-gray-600">
                                        Our seasoned team brings decades of combined expertise in the real estate market.
                                    </p>
                                </div>
                            </motion.div>

                            <motion.div
                                className="flex"
                                variants={fadeIn}
                            >
                                <div className="mr-6">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                        <MessageSquare className="text-blue-600" size={24} />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Personalized Support</h3>
                                    <p className="text-gray-600">
                                        Our team is available 24/7 to guide you through every step of your property journey.
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            className="order-1 md:order-2 bg-gray-900 rounded-lg p-8 text-white"
                            variants={scaleUp}
                        >
                            <h3 className="text-2xl font-semibold mb-6">Ready to Find Your Dream Property?</h3>
                            <p className="mb-8">
                                Join thousands of satisfied clients who found their perfect home with CrestKeys
                            </p>
                            <motion.div
                                className="flex space-x-4"
                            >
                                <motion.button
                                    className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Browse Properties
                                </motion.button>
                                <motion.button
                                    className="bg-transparent border border-white text-white py-3 px-6 rounded-lg hover:bg-white hover:text-gray-900 transition duration-300"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Contact Us
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Contact CTA Section */}
            <motion.section
                className="py-24 px-6 bg-[#8b8b8b] text-white text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
            >
                <div className="max-w-4xl mx-auto">
                    <motion.h2
                        className="text-4xl font-bold mb-6"
                        variants={fadeIn}
                    >
                        Let's Start Your Property Journey Together
                    </motion.h2>
                    <motion.p
                        className="text-xl mb-10"
                        variants={fadeIn}
                    >
                        Whether you're buying, selling, or just exploring options, our team is here to help.
                    </motion.p>
                    <motion.div
                        className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 justify-center"
                    >
                        <motion.button
                            className="bg-white text-blue-900 font-semibold py-3 px-8 rounded-lg hover:bg-blue-100 transition duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Schedule a Consultation
                        </motion.button>
                        <motion.button
                            className="bg-transparent border border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-blue-900 transition duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            View Our Properties
                        </motion.button>
                    </motion.div>
                </div>
            </motion.section>
        </div>
    );
};

export default AboutPage;