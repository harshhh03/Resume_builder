import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

export function Register() {
  const { register: registerUser } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    registerUser.mutate(data);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
              <p className="text-gray-600 mt-2">Start your journey to a better career</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    {...register('firstName', { required: 'First name is required' })}
                    className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 
                             focus:ring-2 focus:ring-purple-500 focus:border-transparent
                             transition-colors duration-200"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    {...register('lastName', { required: 'Last name is required' })}
                    className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 
                             focus:ring-2 focus:ring-purple-500 focus:border-transparent
                             transition-colors duration-200"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  {...register('email', { required: 'Email is required' })}
                  className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 
                           focus:ring-2 focus:ring-purple-500 focus:border-transparent
                           transition-colors duration-200"
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  {...register('password', { 
                    required: 'Password is required',
                    minLength: { value: 6, message: 'Password must be at least 6 characters' }
                  })}
                  className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 
                           focus:ring-2 focus:ring-purple-500 focus:border-transparent
                           transition-colors duration-200"
                  placeholder="Min 6 characters"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={registerUser.isPending}
                className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium
                         hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 
                         focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200
                         disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {registerUser.isPending ? 'Creating account...' : 'Create Account'}
              </button>

              <div className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-purple-600 hover:text-purple-700 font-medium">
                  Sign in
                </Link>
              </div>
            </form>
          </div>
        </div>
        <div className="hidden md:block">
          <img 
            src="./src/components/images/register.jpg" 
            alt="Sign Up" 
            className="w-full max-w-md mx-auto"
          />
        </div>
      </div>
    </div>
  );
}