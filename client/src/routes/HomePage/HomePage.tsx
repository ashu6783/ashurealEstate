import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import CTASection from "../../components/card/CTA";
import StatsCard from "../../components/home/StatsCard";
import InfiniteMovingCard, { Property } from "../../components/home/featuredProperties";
import { Meteors } from "../../components/ui/Meteors";
import { PinContainer } from "../../components/ui/PinContainer";
import { Link } from "react-router-dom";

function HomePage() {
  const { currentUser } = useContext(AuthContext);

  const featuredProperties: Property[] = [
    { id: 1, title: "Luxury Villa in Beverly Hills", description: "Modern design with premium amenities", price: "$2,500,000" },
    { id: 2, title: "Modern Apartment in NYC", description: "Close to Central Park with skyline view", price: "$1,200,000" },
    { id: 3, title: "Beach House in Malibu", description: "Wake up to the sound of waves", price: "$3,800,000" },
  ];

  const stats = [
    { value: "16+", label: "Years of Experience" },
    { value: "200", label: "Awards Gained" },
    { value: "2000+", label: "Properties Ready" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#171b2c] to-[#4d4b1e] text-white relative">
      <Meteors number={30} className="absolute inset-0 z-0" />

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start md:items-center">
          <div className="md:col-span-7 flex flex-col gap-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Find{" "}
              <span className="bg-gradient-to-r from-[#d4b838] via-[#FFD700] to-[#e0aa22] bg-clip-text text-transparent font-extrabold">
                Real Estate
              </span>{" "}
              & Get Your Dream Place
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
              Welcome to CrestKeys, where your dream home becomes a reality.
              We specialize in connecting you with the perfect property tailored to your needs.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {stats.map((stat, i) => (
                <StatsCard key={i} {...stat} />
              ))}
            </div>

            {currentUser && (
              <div className="mt-6 p-4 bg-yellow-100 text-yellow-900 rounded-lg border border-yellow-300">
                <p className="text-lg">
                  Welcome back,{" "}
                  <span className="font-bold text-[#B8860B]">{currentUser.username}</span>! Continue your property search.
                </p>
              </div>
            )}
          </div>

          <div className="md:col-span-5 flex justify-center mt-7 sm:mt-0 sm:mb-2  items-center">
            <PinContainer title="CrestKeys" href="/list" containerClassName="relative">
              <div className="flex flex-col p-4 w-[20rem] h-[24rem] bg-gradient-to-br from-[#1f2937] via-[#111827] to-[#374151] rounded-2xl shadow-lg border border-white/10 overflow-hidden">
                <img
                  src="/bgg.webp"
                  alt="Dream Property"
                  className="w-full h-40 object-cover rounded-xl mb-4"
                />
                <h3 className="font-bold text-xl text-white mb-2">
                  Find Your Dream Home
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  Explore premium properties tailored to your lifestyle. Modern villas, urban apartments, and beachfront homes—all in one place.
                </p>
                <Link
                  to="/list"
                  className="mt-auto inline-block bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 text-black font-semibold py-2 px-4 rounded-lg text-center hover:scale-105 transition-transform"
                >
                  Browse Properties
                </Link>
              </div>
            </PinContainer>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">Featured Properties</h2>
          <InfiniteMovingCard properties={featuredProperties} speed="normal" />
        </div>

        <div className="mt-16">
          <CTASection />
        </div>
      </div>

      <footer className="mt-16 py-8 bg-gray-900 text-white text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Built with ❤️ by Ashu.</p>
      </footer>
    </div>
  );
}

export default HomePage;
