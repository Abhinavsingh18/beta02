import React from 'react';
import { Menu, X, Palette, Brush, Users, ChevronRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const GREEN_COLOR = '#52e500';
const HOVER_GREEN = '#47c700';

const RangManchLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Navbar */}
      <nav className="fixed w-full bg-black/80 backdrop-blur-md border-b border-gray-800 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div style={{ color: GREEN_COLOR }} className="text-2xl font-bold">
            RangManch
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-400 hover:text-gray-100 transition-colors">Features</a>
            <a href="#about" className="text-gray-400 hover:text-gray-100 transition-colors">About</a>
            <a href="#community" className="text-gray-400 hover:text-gray-100 transition-colors">Community</a>
            <Link 
              to="/Login" 
              style={{ backgroundColor: GREEN_COLOR }}
              className="px-6 py-2 text-black rounded-full transition-all hover:opacity-90"
            >
              Signin
            </Link>
          </div>

          <button className="md:hidden text-gray-400" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-black border-t border-gray-800">
            <div className="flex flex-col p-4 gap-4">
              <a href="#features" className="text-gray-400 hover:text-gray-100">Features</a>
              <a href="#about" className="text-gray-400 hover:text-gray-100">About</a>
              <a href="#community" className="text-gray-400 hover:text-gray-100">Community</a>
              <button 
                style={{ backgroundColor: GREEN_COLOR }}
                className="px-6 py-2 text-black rounded-full hover:opacity-90"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Where Creativity <span style={{ color: GREEN_COLOR }}>Meets AI</span>
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Empower your artistic journey with AI-driven tools and a vibrant creative community
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button 
              style={{ backgroundColor: GREEN_COLOR }} 
              className="group px-8 py-3 text-black rounded-full transition-all hover:opacity-90"
            >
              Start Creating
              <ChevronRight className="inline ml-2 transition-transform group-hover:translate-x-1" />
            </button>
            <button 
              style={{ borderColor: GREEN_COLOR, color: GREEN_COLOR }} 
              className="px-8 py-3 border-2 rounded-full transition-all hover:bg-white/5"
            >
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-900" id="features">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Unleash Your <span style={{ color: GREEN_COLOR }}>Creative Potential</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Palette style={{ color: GREEN_COLOR }} className="w-8 h-8" />,
                title: "AI Color Palettes",
                description: "Generate perfect color combinations for your artwork using advanced AI algorithms"
              },
              {
                icon: <Brush style={{ color: GREEN_COLOR }} className="w-8 h-8" />,
                title: "Style Analysis",
                description: "Get instant feedback and suggestions to enhance your artistic style"
              },
              {
                icon: <Users style={{ color: GREEN_COLOR }} className="w-8 h-8" />,
                title: "Creative Community",
                description: "Connect with fellow artists and share your creative journey"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                style={{ borderColor: 'rgba(82, 229, 0, 0.1)' }}
                className="p-6 rounded-xl bg-black border hover:-translate-y-1 transition-all"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
                <button 
                  style={{ color: GREEN_COLOR }} 
                  className="mt-4 flex items-center group"
                >
                  Learn more 
                  <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          {[
            { value: "10K+", label: "Active Artists" },
            { value: "1M+", label: "Artworks Created" },
            { value: "50K+", label: "AI-Generated Palettes" }
          ].map((stat, index) => (
            <div key={index} className="p-6">
              <div style={{ color: GREEN_COLOR }} className="text-4xl font-bold mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6" id="about">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            About <span style={{ color: GREEN_COLOR }}>RangManch</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            RangManch is more than just a platform—it's a creative ecosystem where 
            technology enhances artistic expression. Our AI-powered tools help you 
            explore new possibilities while staying true to your unique vision.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div style={{ color: GREEN_COLOR }} className="text-2xl font-bold">
              RangManch
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-gray-100 transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-gray-100 transition-colors">Terms</a>
              <a href="#" className="text-gray-400 hover:text-gray-100 transition-colors">Contact</a>
            </div>
            <div className="text-gray-600">© 2024 RangManch. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RangManchLanding;
