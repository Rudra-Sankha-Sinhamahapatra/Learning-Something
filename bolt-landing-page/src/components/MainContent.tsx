import React from 'react';

export const MainContent: React.FC = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] relative z-10">
      <h1 className="text-white text-6xl font-bold mb-4 text-center">
        What do you want to build?
      </h1>
      <p className="text-gray-400 text-xl mb-8">
        Prompt, run, edit, and deploy full-stack web apps.
      </p>
      <div className="w-full max-w-2xl bg-gray-800/50 rounded-lg p-4 mb-8">
        <input
          type="text"
          placeholder="How can Bolt help you today?"
          className="w-full bg-transparent text-white border-none outline-none"
        />
      </div>
      <div className="flex flex-wrap gap-4 justify-center">
        {['Start a blog with Astro', 'Build a mobile app with NativeScript', 'Create a docs site with Vitepress',
          'Scaffold UI with shadcn', 'Draft a presentation with Slidev', 'Code a video with Remotion'].map((text) => (
          <button
            key={text}
            className="bg-gray-800/50 text-white px-4 py-2 rounded-full hover:bg-gray-700/50 transition-colors"
          >
            {text}
          </button>
        ))}
      </div>
    </main>
  );
};