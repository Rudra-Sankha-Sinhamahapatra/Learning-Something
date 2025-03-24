import Check from "@/assets/check.svg";
import {twMerge} from "tailwind-merge";

const pricingTiers = [
  {
    title: "Free",
    monthlyPrice: 0,
    buttonText: "Get started for free",
    popular: false,
    inverse: false,
    features: [
      "Up to 5 project members",
      "Unlimited tasks and projects",
      "2GB storage",
      "Integrations",
      "Basic support",
    ],
  },
  {
    title: "Pro",
    monthlyPrice: 9,
    buttonText: "Sign up now",
    popular: true,
    inverse: true,
    features: [
      "Up to 50 project members",
      "Unlimited tasks and projects",
      "50GB storage",
      "Integrations",
      "Priority support",
      "Advanced support",
      "Export support",
    ],
  },
  {
    title: "Business",
    monthlyPrice: 19,
    buttonText: "Sign up now",
    popular: false,
    inverse: false,
    features: [
      "Up to 5 project members",
      "Unlimited tasks and projects",
      "200GB storage",
      "Integrations",
      "Dedicated account manager",
      "Custom fields",
      "Advanced analytics",
      "Export capabilities",
      "API access",
      "Advanced security features",
    ],
  },
];

export const Pricing = () => {
  return (
    <section className="md:py-20 py-8 flex items-center justify-center bg-white">
      <div className="container flex flex-col items-center justify-center">
        <h2 className="heading-1">Pricing</h2>
        <p className="description-1 w-full max-w-[500px]">
          Free Forever. Upgrade for unlimited tasks, better security, and
          exclusive features
        </p>
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-8  mt-16  max-w-[1800px] mx-auto lg:items-end">
          {pricingTiers.map((tier, index) => {
            return (
              <div
                key={index}
                className={twMerge("rounded-3xl p-6 md:p-8  lg:p-10 shadow-[0_7px_14px_#EAEAEA] border border-[#F1F1F1] w-[320px]  h-fit flex flex-col", 
                  tier.inverse ? "border-black bg-black text-white" : "text-black bg-white border-white"
                )}
              >
                <div className="flex justify-between mb-8">
                <h3 className="text-gray-400 text-lg font-bold">
                  {tier.title}
                </h3>
               {tier.popular? <button className="border rounded-lg  px-2 py-1 border-gray-400 text-sm bg-gradient-to-r from-pink-300 via-green-400 to-blue-400 text-transparent bg-clip-text font-bold">Most Popular</button> : null}
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tighter leading-none">
                    ${tier.monthlyPrice}
                  </span>
                  <span className="text-gray-400 tracking-tight font-bold">
                    {" "}
                    /month
                  </span>
                </div>
                <button
                  className={`${
                    tier.title === "Pro"
                      ? "bg-white text-black"
                      : "bg-black text-white"
                  } font-medium rounded-md px-4 py-2 mt-6 w-full`}
                >
                  {tier.buttonText}
                </button>
                <ul className="mt-6 flex flex-col gap-5">
                  {tier.features.map((feature: string) => (
                    <li className="flex items-center text-sm font-normal" key={feature}>
                      <Check className="w-4 h-4 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
