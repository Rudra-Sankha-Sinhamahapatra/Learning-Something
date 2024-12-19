export function Hero() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 text-center">
      <div className="inline-block bg-[#1a1a1a]/50 px-4 py-1 rounded-full mb-6 backdrop-blur-sm border border-[#333]">
        <p className="text-sm text-orange-400">Just a stupid side project</p>
      </div>
      
      <h1 className="text-5xl md:text-7xl font-mono mb-6">
        Manage your links
        <br />
        <span className="text-orange-400">faster and better!</span>
      </h1>
      
      <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
        Not a revolutionary project, just a simple way to share
        your links faster and optimize your workflow :)
      </p>
      
      <div className="flex items-center justify-center gap-4">
        <button className="px-6 py-3 bg-[#1a1a1a] hover:bg-[#252525] rounded-lg transition-all border border-[#333]">
          Sign In
        </button>
        <button className="px-6 py-3 bg-[#D4965B] hover:bg-[#e0a66c] rounded-lg transition-all">
          Sign Up
        </button>
      </div>
    </div>
  );
}