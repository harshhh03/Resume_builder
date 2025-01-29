import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            The <span className="text-purple-600">Resume</span> to get your Dream Job
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Create and manage professional resumes. Free to Download.
          </p>
          <div className="space-y-4 md:space-y-0 md:space-x-4">
            {user ? (
              <Link
                to="/resume/new"
                className="inline-flex items-center px-8 py-3 rounded-lg bg-purple-600 text-white text-lg font-medium 
                         hover:bg-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Create New Resume
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="inline-flex items-center px-8 py-3 rounded-lg bg-purple-600 text-white text-lg font-medium 
                           hover:bg-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center px-8 py-3 rounded-lg bg-white text-purple-600 text-lg font-medium 
                           hover:bg-purple-50 transform hover:scale-105 transition-all duration-200 shadow-lg border border-purple-200"
                >
                  Login
                </Link>
              </>
            )}
          </div>
          <div className="mt-12 grid grid-cols-5 gap-4 items-center opacity-70">
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-6 object-contain" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png" alt="Facebook" className="h-6 object-contain" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" className="h-6 object-contain" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="h-6 object-contain" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/e/e9/Apple_Logo.svg" alt="Apple" className="h-6 object-contain" />
          </div>
        </div>
        <div className="hidden md:block">
          <img src="./src/components/images/home.jpg" alt="Resume Templates" className="w-full" />
        </div>
      </div>
    </div>
  );
}