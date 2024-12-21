import React from 'react';
import { Check } from 'lucide-react';

export function Pricing() {
  return (
    <section className="py-20 px-4 bg-[#1a1a1a]/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-mono text-center mb-4">Simple Pricing</h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Choose the perfect plan for your X presence
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PriceCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PriceCard({ name, price, description, features, highlighted }: {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}) {
  return (
    <div className={`
      p-6 rounded-lg backdrop-blur-sm border
      ${highlighted 
        ? 'bg-blue-500/10 border-blue-500/50' 
        : 'bg-[#1a1a1a]/50 border-[#333]'
      }
    `}>
      <h3 className="text-2xl font-semibold mb-2">{name}</h3>
      <div className="mb-4">
        <span className="text-4xl font-bold">${price}</span>
        <span className="text-gray-400">/month</span>
      </div>
      <p className="text-gray-400 mb-6">{description}</p>
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <Check className="w-5 h-5 text-blue-400" />
            <span className="text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>
      <button className={`
        w-full mt-6 px-6 py-3 rounded-lg transition-all
        ${highlighted
          ? 'bg-blue-500 hover:bg-blue-600'
          : 'bg-[#252525] hover:bg-[#303030] border border-[#333]'
        }
      `}>
        Get Started
      </button>
    </div>
  );
}

const plans = [
  {
    name: "Starter",
    price: "29",
    description: "Perfect for personal accounts",
    features: [
      "1 X account",
      "100 AI-generated posts/month",
      "Basic analytics",
      "Manual post approval",
      "Email support"
    ]
  },
  {
    name: "Pro",
    price: "79",
    description: "For growing influencers",
    features: [
      "3 X accounts",
      "500 AI-generated posts/month",
      "Advanced analytics",
      "Auto-scheduling",
      "Priority support",
      "Custom AI training"
    ],
    highlighted: true
  },
  {
    name: "Business",
    price: "199",
    description: "For teams and businesses",
    features: [
      "10 X accounts",
      "Unlimited AI-generated posts",
      "Premium analytics",
      "API access",
      "24/7 support",
      "Custom features"
    ]
  }
];