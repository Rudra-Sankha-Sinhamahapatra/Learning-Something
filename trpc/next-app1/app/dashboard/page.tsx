import { NavOptions } from "../components/navOptions";
import TodoList from "../components/Todo";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200 bg-blue-700 text-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/">
                <h1 className="text-2xl font-bold">TaskFlow</h1>
              </Link>
              <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-blue-800 text-white rounded-full">Beta</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-1">
              <Link 
                href="/dashboard" 
                className="px-3 py-2 text-sm font-medium text-white bg-blue-800 rounded-md"
              >
                Dashboard
              </Link>
              <Link 
                href="/projects" 
                className="px-3 py-2 text-sm font-medium text-white hover:bg-blue-800 rounded-md"
              >
                Projects
              </Link>
              <Link 
                href="/team" 
                className="px-3 py-2 text-sm font-medium text-white hover:bg-blue-800 rounded-md"
              >
                Team
              </Link>
              <Link 
                href="/calendar" 
                className="px-3 py-2 text-sm font-medium text-white hover:bg-blue-800 rounded-md"
              >
                Calendar
              </Link>
              <Link 
                href="/settings" 
                className="px-3 py-2 text-sm font-medium text-white hover:bg-blue-800 rounded-md"
              >
                Settings
              </Link>
            </nav>
            <NavOptions />
          </div>
        </div>
      </header>
      
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Task Manager</h1>
              <p className="mt-1 text-sm text-gray-600">Streamline your workflow and boost productivity</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex space-x-3">
              <button className="px-4 py-2 text-sm font-medium text-blue-700 bg-white border border-blue-300 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
                Filter Tasks
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
                New Project
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-medium text-gray-900">Active Tasks</h3>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">12</span>
            </div>
            <p className="mt-1 text-sm text-gray-600">Tasks in progress</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-medium text-gray-900">Completed</h3>
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">24</span>
            </div>
            <p className="mt-1 text-sm text-gray-600">Tasks completed this week</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-medium text-gray-900">Upcoming</h3>
              <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">7</span>
            </div>
            <p className="mt-1 text-sm text-gray-600">Tasks due soon</p>
          </div>
        </div>
        
        <TodoList />
      </main>
    </div>
  );
}
