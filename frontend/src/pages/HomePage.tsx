import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Zap, Users } from 'lucide-react';

const HomePage = () => {
  const [showContactPopup, setShowContactPopup] = useState(false);

  // Control body scroll when popup is open
  useEffect(() => {
    if (showContactPopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showContactPopup]);

  return (
    <div className="space-y-32">
      {/* Hero Section */}
      <section className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 min-h-[90vh] flex items-center justify-center">
          <div className="text-center space-y-8">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block mb-4 text-black-600">Find Your Dream Job</span>
              <span className="block text-blue-600 gradient-shine-blue">All At A Place</span>
            </h1>
            
            <p className="max-w-md mx-auto text-base text-gray-500 sm:text-lg md:text-xl md:max-w-3xl">
              Access thousands of job opportunities from multiple sources in a single platform. 
              Save time and find the perfect role faster.
            </p>
            <div className="max-w-md mx-auto sm:flex sm:justify-center">
              <div className="rounded-md shadow">
                <Link
                  to="/jobs"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
                >
                  Browse Jobs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Why Choose JobHub?
            </h2>
          </div>
          <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="flex justify-center">
                <Globe className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-gray-900">Multiple Sources</h3>
              <p className="mt-2 text-gray-500">
                Access job posts from various platforms in one unified interface
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center">
                <Zap className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-gray-900">Real-time Updates</h3>
              <p className="mt-2 text-gray-500">
                Get instant notifications for new job postings matching your criteria
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center">
                <Users className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-gray-900">Smart Matching</h3>
              <p className="mt-2 text-gray-500">
                AI-powered job recommendations based on your profile and preferences
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-white pb-0 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Simple, Transparent Pricing
            </h2>
          </div>
          <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="border rounded-lg p-8 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:z-30 relative z-10">
              <h3 className="text-xl font-bold text-gray-900">Basic</h3>
              <p className="mt-4 text-gray-500">Perfect for getting started</p>
              <p className="mt-8">
                <span className="text-4xl font-extrabold text-gray-900">Free</span>
              </p>
              <ul className="mt-8 space-y-4">
                <li className="flex items-center">
                  <span className="text-green-500">✓</span>
                  <span className="ml-2">Basic job search</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500">✓</span>
                  <span className="ml-2">Email alerts</span>
                </li>
              </ul>
              <div className="relative overflow-hidden rounded-md mt-8">
                <Link 
                  to="/login"
                  className="shine-button w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 select-none focus:outline-none focus:ring-0 active:outline-none inline-block text-center" 
                >
                  Get Started
                </Link>
              </div>
            </div>
            <div className="border rounded-lg p-8 bg-blue-600 text-white shadow-lg transform scale-105 hover:scale-110 transition-all duration-300 hover:-translate-y-2 hover:z-30 relative z-20">
              <h3 className="text-xl font-bold">Pro</h3>
              <p className="mt-4 opacity-90">Most popular choice</p>
              <p className="mt-8">
                <span className="text-4xl font-extrabold">$9.99</span>
                <span className="ml-2">/month</span>
              </p>
              <ul className="mt-8 space-y-4">
                <li className="flex items-center">
                  <span>✓</span>
                  <span className="ml-2">Everything in Basic</span>
                </li>
                <li className="flex items-center">
                  <span>✓</span>
                  <span className="ml-2">Advanced filters</span>
                </li>
                <li className="flex items-center">
                  <span>✓</span>
                  <span className="ml-2">Priority notifications</span>
                </li>
              </ul>
              <div className="relative overflow-hidden rounded-md mt-8">
                <Link 
                  to="/pay"
                  className="shine-button w-full py-3 px-4 border border-white rounded-md shadow-sm text-base font-medium text-blue-600 bg-white hover:bg-gray-50 select-none focus:outline-none focus:ring-0 active:outline-none inline-block text-center" 
                >
                  Subscribe Now
                </Link>
              </div>
            </div>
            <div className="border rounded-lg p-8 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:z-30 relative z-10">
              <h3 className="text-xl font-bold text-gray-900">Enterprise</h3>
              <p className="mt-4 text-gray-500">For large organizations</p>
              <p className="mt-8">
                <span className="text-4xl font-extrabold text-gray-900">Custom</span>
              </p>
              <ul className="mt-8 space-y-4">
                <li className="flex items-center">
                  <span className="text-green-500">✓</span>
                  <span className="ml-2">Everything in Pro</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500">✓</span>
                  <span className="ml-2">API access</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500">✓</span>
                  <span className="ml-2">Dedicated support</span>
                </li>
              </ul>
              <div className="relative overflow-hidden rounded-md mt-8">
                <button 
                  className="shine-button w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 select-none focus:outline-none focus:ring-0 active:outline-none" 
                  onClick={() => setShowContactPopup(true)}
                >
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Sales Popup */}
      {showContactPopup && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative">
            <button
              onClick={() => setShowContactPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </button>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Sales</h3>
            <p className="text-gray-600 mb-4">
              Please email us at:{' '}
              <a href="mailto:samrathreddy04@gmail.com" className="text-blue-600 hover:text-blue-700">
                samrathreddy04@gmail.com
              </a>
            </p>
            <p className="text-gray-600 mb-6">
              Typical response time: 24-48 hours
            </p>
            <button
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
              onClick={() => setShowContactPopup(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold">JobHub</h3>
              <p className="text-gray-400">Finding your dream job made simple</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Testimonials</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Guides</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">API Status</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800">
            <p className="text-center text-gray-400">© 2025 JobHub. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Add this CSS at the end of the component */}
      <style>{`
        .shine-button {
          position: relative;
          overflow: hidden;
          -webkit-tap-highlight-color: transparent;
        }
        .shine-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            120deg,
            transparent,
            rgba(255, 255, 255, 0.6),
            transparent
          );
          transition: all 0.6s ease;
        }
        .shine-button:hover::before {
          left: 100%;
        }
        .shine-button:focus {
          outline: none !important;
          box-shadow: none !important;
        }

        .gradient-shine {
          background: linear-gradient(
            to right,
            #333 20%,
            #222 30%,
            #444 70%,
            #333 80%
          );
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shine 3s linear infinite;
        }

        .gradient-shine-blue {
          background: linear-gradient(
            to right,
            #2563eb 20%,
            #3b82f6 30%,
            #60a5fa 70%,
            #2563eb 80%
          );
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shine 3s linear infinite;
        }

        @keyframes shine {
          0% {
            background-position: 200% center;
          }
          100% {
            background-position: -200% center;
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;