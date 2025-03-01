import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-16">
      <div className="max-w-xl w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-blue-600 animate-bounce">
            404
          </h1>
        </div>
        
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Page not found
          </h2>
          
          <div className="h-1 w-28 bg-blue-600 mx-auto rounded-full"></div>
          
          <p className="text-gray-600 text-lg">
            Oops! The page you're looking for seems to have gone on a coffee break.
            Let's get you back on track!
          </p>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-gray-100 text-gray-500">
                Navigate to
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="shine-button px-8 py-3 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors duration-200 w-full sm:w-auto"
            >
              Go Home
            </Link>
            <Link
              to="/jobs"
              className="shine-button px-8 py-3 rounded-md bg-white text-blue-600 font-medium border border-blue-600 hover:bg-blue-50 transition-colors duration-200 w-full sm:w-auto"
            >
              View Jobs
            </Link>
          </div>
        </div>

        <style>{`
          .shine-button {
            position: relative;
            overflow: hidden;
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
        `}</style>
      </div>
    </div>
  );
};

export default NotFoundPage; 