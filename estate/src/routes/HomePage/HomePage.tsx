import { useContext, lazy, Suspense, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import FeaturedProperties from '../../components/card/featuredProperties';
import CTASection from '../../components/card/CTA';
const SearchBar = lazy(() => import('../../components/searchbar/SearchBar'));


const preloadImages = (urls:string[]) =>{
  urls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href=url;
    document.head.appendChild(link);
  });
}

function HomePage() {

  const { currentUser } = useContext(AuthContext);

  useEffect(()=>{
    preloadImages([
        '/bgg.webp',
      '/property-1.jpg',
      '/property-2.jpg',
      '/property-3.jpg'
    ])
  })

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#171b2c] to-[#4d4b1e]">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
          <div className="flex-1 md:flex-[3]">
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
                  Welcome to CrestKeys, where your dream home becomes a reality.
                  We specialize in connecting you with the perfect property,
                  tailored to your unique needs and lifestyle.
                </p>
              </div>

              <div className="py-6">
                <Suspense fallback={<div className="h-14 bg-gray-100 animate-pulse rounded-lg"></div>}>
                  <SearchBar />
                </Suspense>
              </div>

              <div className="hidden sm:grid grid-cols-3 gap-6 mt-8 py-8 border-t border-gray-200">
                <div className="text-center p-4 bg-white bg-opacity-50 hover:bg-white rounded-xl transition-colors duration-300">
                  <h2 className="text-4xl lg:text-5xl font-bold text-[#B8860B]">16+</h2>
                  <p className="text-lg font-medium mt-2 text-gray-700">Years of Experience</p>
                </div>
                <div className="text-center p-4 bg-white bg-opacity-50 hover:bg-white rounded-xl transition-colors duration-300">
                  <h2 className="text-4xl lg:text-5xl font-bold text-[#B8860B]">200</h2>
                  <p className="text-lg font-medium mt-2 text-gray-700">Awards Gained</p>
                </div>
                <div className="text-center p-4 bg-white bg-opacity-50 hover:bg-white rounded-xl transition-colors duration-300">
                  <h2 className="text-4xl lg:text-5xl font-bold text-[#B8860B]">2000+</h2>
                  <p className="text-lg font-medium mt-2 text-gray-700">Properties Ready</p>
                </div>
              </div>

              {currentUser && (
                <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-lg text-[#292009]">
                    Welcome back, <span className="font-bold text-[#B8860B]">{currentUser.username}</span>! Continue your property search where you left off.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="hidden md:block flex-[2]">
            <div className="grid grid-cols-1 gap-6 h-full">
              <div className="overflow-hidden rounded-2xl shadow-xl">
                <img
                  src="/bgg.webp"
                  srcSet="/bgg-400.webp 400w, /bgg-800.webp 800w, /bgg.webp 1200w"
                  sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
                  alt="Luxury Home"
                  className="w-full h-full object-cover"
                  width="600"
                  height="800"
                  fetchPriority="high"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Use the separated FeaturedProperties component */}
        <FeaturedProperties properties={featuredProperties} />

        {/* Use the separated CTASection component */}
        <CTASection />
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