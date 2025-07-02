"use client"
import StarIcon from "@/assets/images/star.svg";

const text = `You're racing to create exceptional work, but traditional design tools slow you down with unnecessary complexity and steep learning curves.`;

export default function Introduction() {
    return <div className="mt-24 flex flex-col justify-center items-center">
        <div className="flex gap-2 rounded-full w-fit px-2 py-1 border border-lime-400">
            <StarIcon className="fill-lime-400 w-5 h-full" />
            <p className="text-lime-400">INTRODUCING LAYERS</p>
        </div>
        <div className="text-white text-6xl text-center mx-auto w-[80%] md:w-[72%] lg:w-[62%] my-12 overflow-hidden">
            Your creative process deserves better. <span className="text-gray-400">{text}</span>
            <span className="text-lime-500">That's why we built Layers</span>
        </div>
    </div>
}
