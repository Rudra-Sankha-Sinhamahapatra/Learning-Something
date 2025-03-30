'use client';

import { useState } from "react";
import { trpc } from "../_trpc/client";


interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function TodoList() {
  const [newTodo, setNewTodo] = useState("");
  
  const utils = trpc.useUtils();
  const todos = trpc.getTodos.useQuery();
  const addTodo = trpc.createTodo.useMutation({
    onSuccess: () => {
      utils.getTodos.invalidate();
      setNewTodo("");
    }
  });
  const updateTodo = trpc.updateTodo.useMutation({
    onSuccess: () => utils.getTodos.invalidate()
  });
  const deleteTodo = trpc.deleteTodo.useMutation({
    onSuccess: () => utils.getTodos.invalidate()
  });

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      addTodo.mutate({ title: newTodo.trim() });
    }
  };

  const handleToggleTodo = (id: string, completed: boolean) => {
    updateTodo.mutate({ id, completed: !completed });
  };

  const handleDeleteTodo = (id: string) => {
    deleteTodo.mutate({ id });
  };

  if (todos.isLoading) {
    return (
      <div className="max-w-3xl mx-auto p-8 flex justify-center items-center h-64">
        <div className="animate-pulse flex space-x-3">
          <div className="h-3 w-3 bg-blue-700 rounded-full"></div>
          <div className="h-3 w-3 bg-blue-700 rounded-full"></div>
          <div className="h-3 w-3 bg-blue-700 rounded-full"></div>
        </div>
      </div>
    );
  }

  if (todos.isError) {
    return (
      <div className="max-w-3xl mx-auto my-10 p-6 bg-red-100 border border-red-300 rounded-lg">
        <p className="text-red-700 font-medium">Error loading tasks: {todos.error.message}</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto rounded-xl shadow-md border border-gray-200 overflow-hidden">
      <div className="bg-blue-700 px-8 py-4">
        <h2 className="text-xl font-semibold text-white">Your Tasks</h2>
      </div>
      
      <div className="p-8 bg-white">
        <form onSubmit={handleAddTodo} className="mb-8 flex">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-3 text-gray-800 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={addTodo.isPending}
            className="bg-blue-700 text-white px-6 py-3 text-sm font-medium rounded-r-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
          >
            {addTodo.isPending ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Adding
              </span>
            ) : "Add Task"}
          </button>
        </form>
        
        {todos.data && todos.data.length > 0 ? (
          <div className="bg-white rounded-lg">
            <div className="flex justify-between items-center mb-4 px-2">
              <h3 className="font-medium text-gray-800">All Tasks ({todos.data.length})</h3>
              <div className="text-sm text-gray-600">
                {todos.data.filter(t => t.completed).length} of {todos.data.length} completed
              </div>
            </div>
            <ul className="divide-y divide-gray-200">
              {todos.data.map((todo: Todo) => (
                <li key={todo.id} className="flex items-center justify-between py-4 px-3 hover:bg-blue-50 rounded-lg transition-colors">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleToggleTodo(todo.id, todo.completed)}
                      className="mr-3 h-5 w-5 rounded border-gray-300 text-blue-700 focus:ring-blue-500"
                    />
                    <div>
                      <span className={`text-sm font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                        {todo.title}
                      </span>
                      <p className="text-xs text-gray-600 mt-0.5">
                        Added {new Date(todo.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleDeleteTodo(todo.id)}
                      className="text-gray-500 hover:text-red-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
                      aria-label="Delete"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="text-center py-16 px-4 rounded-lg bg-gray-50 border border-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="mt-6 text-lg font-medium text-gray-800">No tasks yet</p>
            <p className="mt-2 text-sm text-gray-600">Add your first task to get started</p>
          </div>
        )}
      </div>
    </div>
  );
} 