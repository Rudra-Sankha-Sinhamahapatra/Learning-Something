import Link from "next/link";
import { NavOptions } from "../components/navOptions";

export default function Projects() {
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
              <Link href="/dashboard" className="px-3 py-2 text-sm font-medium text-white hover:bg-blue-800 rounded-md">
                Dashboard
              </Link>
              <Link href="/projects" className="px-3 py-2 text-sm font-medium text-white bg-blue-800 rounded-md">
                Projects
              </Link>
              <Link href="/team" className="px-3 py-2 text-sm font-medium text-white hover:bg-blue-800 rounded-md">
                Team
              </Link>
              <Link href="/calendar" className="px-3 py-2 text-sm font-medium text-white hover:bg-blue-800 rounded-md">
                Calendar
              </Link>
              <Link href="/settings" className="px-3 py-2 text-sm font-medium text-white hover:bg-blue-800 rounded-md">
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
              <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
              <p className="mt-1 text-sm text-gray-600">Manage your active projects and initiatives</p>
            </div>
            <button className="mt-4 md:mt-0 px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
              New Project
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-lg font-medium text-gray-900">Active Projects</h3>
          </div>
          <div className="p-6">
            <div className="text-center py-12 text-gray-500">
              No projects yet. Create your first project to get started.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 