import { AnimatePresence, motion } from 'framer-motion';
import {
  CheckCircle,
  ChevronDown,
  Globe,
  Leaf,
  LogIn,
  Shield,
  Star,
  UserPlus
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const heroImages = [
  {
    src: 'https://orapiasia.com/wp-content/uploads/sustainable-cleaning-products.jpg',
    title: 'Sustainable Cleanliness',
    subtitle: 'Transforming Communities, One Clean Step at a Time',
    impact: '1M+ Sq. Km Cleaned',
    icon: <Leaf className="text-green-500" />
  },
  {
    src: 'https://communityempowermentfund.org/wp-content/uploads/2019/05/Screen-Shot-2019-05-21-at-1.31.23-PM-1.jpg',
    title: 'Community Empowerment',
    subtitle: 'Uniting People for a Cleaner, Healthier Future',
    impact: '500K+ Volunteers',
    icon: <Globe className="text-blue-500" />
  },
  {
    src: 'https://www.ox.ac.uk/sites/files/oxford/styles/ow_medium_feature/s3/field/field_image_main/shutterstock_767486674%20%281%29.jpg?itok=WTWlg6Oa',
    title: 'Innovative Solutions',
    subtitle: 'Cutting-Edge Technology for Environmental Preservation',
    impact: '200+ Smart Initiatives',
    icon: <Shield className="text-purple-500" />
  }
];

const FeatureCard = ({ icon, title, description }) => (
  <motion.div
    whileHover={{ scale: 1.05, rotate: 1 }}
    className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-xl border border-blue-100 space-y-4 transform transition-all"
  >
    <div className="flex items-center space-x-4">
      {icon}
      <h3 className="text-xl font-bold text-gray-800">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const ModernLandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearInterval(intervalId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen">
      {/* Navbar */}
      <motion.nav 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Star className="text-green-600" size={32} />
            <h1 className="text-3xl font-bold text-green-800 tracking-wider">
              VISHUDDH AI
            </h1>
          </div>
          <div className="flex items-center space-x-8">
            {['Schemes', 'Awards', 'Gallery', 'SAP2024', 'Progress'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-gray-700 hover:text-green-600 font-medium transition-colors"
              >
                {item}
              </a>
            ))}
            <div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate('/login')}
                className="bg-green-800 text-white px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-green-400"
              >
                <LogIn size={18} />
                <span>Login</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate('/signup')}
                className="bg-green-800 text-white px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-green-400"
              >
                <UserPlus size={18} />
                <span>Sign Up</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>


      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ 
                duration: .6,
                ease: 'easeInOut'
              }}
              className="absolute inset-0"
            >
              <div className="absolute inset-0 bg-black/40" />
              <img 
                src={heroImages[currentSlide].src} 
                alt="Background" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-6xl mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-7xl font-extrabold mb-6 drop-shadow-xl">
              A Clean Nation is a Healthy Nation
            </h2>
            <p className="text-2xl mb-10 max-w-3xl mx-auto opacity-90 drop-shadow-md">
              Empowering communities through innovative cleanliness solutions and sustainable practices
            </p>

            <div className="flex justify-center space-x-6">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-white text-green-800 px-8 py-4 rounded-full 
                  flex items-center space-x-3 font-semibold shadow-xl 
                  hover:bg-blue-50 transition-all"
              >
                <UserPlus size={24} />
                <span>Join the Movement</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="border-2 border-white text-white px-8 py-4 
                  rounded-full flex items-center space-x-3 font-semibold 
                  hover:bg-white/20 transition-all"
              >
                <CheckCircle size={24} />
                <span>Our Impact</span>
              </motion.button>
            </div>

            {/* Slide Indicator & Dynamic Info */}
            <div className="mt-16 flex justify-center items-center space-x-6">
              {heroImages.map((_, index) => (
                <motion.div
                  key={index}
                  animate={{
                    width: index === currentSlide ? '2rem' : '0.5rem',
                    backgroundColor: index === currentSlide ? 'white' : 'rgba(255,255,255,0.5)'
                  }}
                  className="h-2 rounded-full cursor-pointer"
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>

            {/* Dynamic Slide Info */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="mt-8 flex justify-center items-center space-x-6 text-white"
              >
                <div className="flex items-center space-x-3">
                  {heroImages[currentSlide].icon}
                  <div>
                    <h3 className="text-2xl font-bold">
                      {heroImages[currentSlide].title}
                    </h3>
                    <p className="text-sm opacity-80">
                      {heroImages[currentSlide].subtitle}
                    </p>
                  </div>
                </div>
                <div className="h-8 w-px bg-white/30" />
                <div>
                  <p className="text-2xl font-bold">
                    {heroImages[currentSlide].impact}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Scroll Down Indicator */}
        <motion.div
          animate={{ 
            y: [0, 10, 0],
            opacity: [1, 0.5, 1]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity 
          }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white"
        >
          <ChevronDown size={36} />
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Our Innovative Approach
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Leveraging cutting-edge technology and community engagement to create lasting environmental change
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Leaf size={36} className="text-green-500" />}
              title="Sustainable Solutions"
              description="Implementing eco-friendly technologies and practices that reduce environmental impact."
            />
            <FeatureCard 
              icon={<Globe size={36} className="text-blue-500" />}
              title="Community Empowerment"
              description="Engaging local communities through education, training, and collaborative initiatives."
            />
            <FeatureCard 
              icon={<Shield size={36} className="text-purple-500" />}
              title="Smart Monitoring"
              description="Utilizing AI and IoT technologies to track and improve cleanliness in real-time."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernLandingPage;