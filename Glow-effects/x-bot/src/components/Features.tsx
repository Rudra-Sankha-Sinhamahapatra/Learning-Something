import React from 'react';
import { Bot, Brain, Sparkles, Clock, BarChart3, Shield, Zap, MessageCircle, Settings } from 'lucide-react';

export function Features() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-mono text-center mb-4">Powerful Features</h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Everything you need to maintain an authentic and engaging presence on X
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-[#1a1a1a]/50 p-6 rounded-lg backdrop-blur-sm border border-[#333] hover:border-blue-500/50 transition-colors">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}

const features = [
  {
    icon: <Bot className="w-6 h-6 text-blue-400" />,
    title: "AI Persona",
    description: "Create a unique voice that matches your personality and brand"
  },
  {
    icon: <Brain className="w-6 h-6 text-blue-400" />,
    title: "Smart Learning",
    description: "AI adapts to your style by analyzing your previous posts"
  },
  {
    icon: <Sparkles className="w-6 h-6 text-blue-400" />,
    title: "Content Generation",
    description: "Generate engaging posts that resonate with your audience"
  },
  {
    icon: <Clock className="w-6 h-6 text-blue-400" />,
    title: "Smart Scheduling",
    description: "Post at optimal times based on audience activity"
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-blue-400" />,
    title: "Analytics",
    description: "Track engagement and optimize your content strategy"
  },
  {
    icon: <Shield className="w-6 h-6 text-blue-400" />,
    title: "Content Safety",
    description: "AI-powered content filtering and safety checks"
  },
  {
    icon: <Zap className="w-6 h-6 text-blue-400" />,
    title: "Quick Response",
    description: "Auto-engage with your audience at the right moments"
  },
  {
    icon: <MessageCircle className="w-6 h-6 text-blue-400" />,
    title: "Thread Creation",
    description: "Automatically create engaging thread sequences"
  },
  {
    icon: <Settings className="w-6 h-6 text-blue-400" />,
    title: "Full Control",
    description: "Customize every aspect of your automated presence"
  }
];