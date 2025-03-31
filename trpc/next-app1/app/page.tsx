import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Organize Your Life with
          <span className="text-blue-600"> TaskFlow</span>
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Your personal task management solution. Simple, efficient, and beautiful way to keep track of what matters most.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/signup"
            className="px-8 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Get Started
          </Link>
          <Link 
            href="/login"
            className="px-8 py-3 text-lg font-semibold text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Login
          </Link>
        </div>

        {/* Features Section */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300">
            <div className="text-blue-600 text-2xl mb-4">📝</div>
            <h3 className="text-xl font-semibold mb-2">Task Management</h3>
            <p className="text-gray-600">Create, organize, and track your tasks with ease</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300">
            <div className="text-blue-600 text-2xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-2">Goal Setting</h3>
            <p className="text-gray-600">Set and achieve your goals with our intuitive interface</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300">
            <div className="text-blue-600 text-2xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
            <p className="text-gray-600">Monitor your progress and celebrate achievements</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 py-8 text-center text-gray-600">
        <p>© 2024 TaskMaster. All rights reserved.</p>
      </footer>
    </div>
  );
}
