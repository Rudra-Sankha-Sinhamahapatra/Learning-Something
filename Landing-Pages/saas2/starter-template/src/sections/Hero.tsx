"use client"
import Image from "next/image";
import designImage1 from "@/assets/images/design-example-1.png"
import designImage2 from "@/assets/images/design-example-2.png"
import MousePointer from "@/assets/images/mouse-pointer.svg"

export default function Hero() {
    return <div className="flex mt-12 relative justify-center items-start min-h-[600px] overflow-hidden">
        <div className="absolute -left-24 top-4">
            <Image
                src={designImage1}
                alt="designImage1"
                height={300}
                width={300}
                className="hidden mt-12 lg:flex" />
        </div>
        <div className="flex flex-col items-center space-y-8 justify-center w-full max-w-none overflow-hidden  px-4">

            <div className="relative flex items-center">
                <div className="inline-flex border-none rounded-full bg-gradient-to-r from-fuchsia-400 to-pink-400 px-4 py-2 w-fit track-tighter text-black font-medium text-sm">
                    ✨ $7.5M seed round raised
                </div>
                <div className="hidden lg:flex absolute -right-44 -top-0">
                    <MousePointer
                        className="w-5 h-5"
                    />
                </div>
            </div>

            <h1 className="flex flex-col text-center text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium w-full tracking-tighter lg:tracking-wide leading-tight">
                Impactful design,
                <span>created effortlessly</span>
            </h1>

            <p className="text-lg text-gray-400 text-center w-full md:w-[600px] mx-auto leading-relaxed">
                Design tools should'nt show you down. Layers combines powerful features with an intuitive interface that keeps you in your creative flow
            </p>
            <div className="relative flex items-center">
                <form className="flex justify-between bg-transparent border border-gray-400 hover:border-white rounded-full  max-w-[400px] focus-within:border-white transition-colors">
                    <input placeholder="Enter your email" className="bg-transparent border-none p-4 max-w-[300px] focus:outline-none focus:ring-0 " type="email" />
                    <button className="rounded-full px-6 text-sm transition-colors whitespace-nowrap bg-lime-500 text-black border-none hover:bg-lime-400 m-2">
                        Sign Up
                    </button>
                </form>
                <div className="hidden lg:flex absolute -left-44 top-1/2 transform -translate-y-1/2">
                    <MousePointer className="w-5 h-5" />
                </div>
            </div>
        </div>
        <div className="absolute -right-24 top-0">
            <Image
                src={designImage2}
                alt="DesignImage2"
                height={300}
                width={300}
                className="lg:flex hidden mr-0" />
        </div>
    </div>;
}
