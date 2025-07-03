"use client"
import StarIcon from "@/assets/images/star.svg"
import PlusIcon from "@/assets/images/plus.svg"
import { useState } from "react";

const faqs = [
    {
        question: "How is Layers different from other design tools?",
        answer: "Unlike traditional design tools, Layers prioritizes speed and simplicity without sacrificing power. Our intelligent interface adapts to your workflow, reducing clicks and keeping you in your creative flow.",
    },
    {
        question: "Is there a learning curve?",
        answer: "Layers is designed to feel intuitive from day one. Most designers are productive within hours, not weeks. We also provide interactive tutorials and comprehensive documentation to help you get started.",
    },
    {
        question: "How do you handle version control?",
        answer: "Every change in Layers is automatically saved and versioned. You can review history, restore previous versions, and create named versions for important milestones.",
    },
    {
        question: "Can I work offline?",
        answer: "Yes! Layers includes a robust offline mode. Changes sync automatically when you're back online, so you can keep working anywhere.",
    },
    {
        question: "How does Layers handle collaboration?",
        answer: "Layers is built for collaboration. You can invite team members to your projects, share feedback, and work together in real-time.",
    },
];

export default function Faqs() {
    const [expandedIndex,setExpandedIndex] = useState<number | null>(null);

    const toggleFaq = (index:number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    }

    return <div className="my-12 flex flex-col justify-center items-center mx-auto">
       <div className="rounded-full border  border-lime-400 px-3 py-1.5 flex gap-2 text-lime-400 w-fit mb-8">
        <StarIcon className="fill-lime-400"/>
        FAQS
       </div>
       <h2 className="text-6xl text-center mb-24">
        Questions? We've <br />
        got <span className="text-lime-400">answers</span>
       </h2>

       <div className="space-y-6 lg:w-[50%] sm2:w-[80%]  sm:w-[100%]">
       {faqs.map((faq,index) =>
         <div key={index} className="border border-gray-300 rounded-2xl bg-neutral-900 overflow-hidden transition-all duration-500 ease-out">
            <div className="flex justify-between items-start gap-12 p-6 cursor-pointer"
            onClick={() => toggleFaq(index)}
            >
            <h3 className="text-lg text-white font-medium leading-relaxed">{faq.question}</h3>
            <PlusIcon className={`text-lime-400 transition-transform duration-500 ease-out flex-shrink-0 w-6 h-6 ${
                expandedIndex === index ? 'rotate-45' : 'rotate-0'
            }`}/>
            </div>
            <div className={`transition-all duration-700 ease-in-out overflow-hidden ${
                expandedIndex === index 
                    ? 'max-h-48 opacity-100' 
                    : 'max-h-0 opacity-0'
            }`}>
                <div className="px-6 pb-6">
            <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
            </div>
            </div>
            <div>

            </div>
            </div>
    )}
       </div>
    </div>;
}
