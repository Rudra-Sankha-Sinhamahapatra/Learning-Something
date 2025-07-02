"use client"
import StarIcon from "@/assets/images/star.svg"
import Image from "next/image";
import ashwini from "@/assets/images/avatar-ashwin-santiago.jpg"
import lula from "@/assets/images/avatar-lula-meyers.jpg"
import florence from "@/assets/images/avatar-florence-shaw.jpg"

const features = [
    "Asset Library",
    "Code Preview",
    "Flow Mode",
    "Smart Sync",
    "Auto Layout",
    "Fast Search",
    "Smart Guides",
];

const images = [
    {
        name: "ashwini",
        image: ashwini
    },
    {
        name: "lula",
        image: lula
    },
    {
        name: "florence",
        image: florence
    }
]

export default function Features() {
    return <div className="my-24 flex flex-col justify-center items-center space-y-12">
        <div className="flex gap-2 rounded-full px-2 py-1 border border-lime-400 w-fit">
            <StarIcon className="fill-lime-400" />
            FEATURES
        </div>
        <div className="flex flex-col text-6xl">
            Where power meets
            <span className="text-lime-400 text-center">simplicity</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            <div className="features-card">
                <div className="flex items-center mb-6 mt-12">
                    {images.map((image, index) => {
                        const borderColors = ["border-blue-500", "border-purple-500", "border-orange-500"];
                        const marginLefts = index > 0 ? "-ml-4" : "";

                        return (
                            <Image
                                key={index}
                                src={image.image}
                                alt={image.name}
                                width={60}
                                height={60}
                                className={`rounded-full border-4 ${borderColors[index]} ${marginLefts} relative z-${10 + index}`}
                            />
                        )
                    })}
                    <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center -ml-4 relative z-40">
                        <span className="text-white text-xl">⋯</span>
                    </div>
                </div>
                <h3 className="feat-card-h1 mt-24">Real-time <br /> Collaboration</h3>
                <p className="feat-card-p1">Work together seamlessly with <br /> conflict-free team editing</p>
            </div>

            <div className="features-card">
                <h2 className="text-3xl text-neutral-600 font-bold text-center my-6 tracking-wide">We're achieved <br />
                    <span className="bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">incredible</span> <br />
                    growth this year
                </h2>

                <h3 className="feat-card-h1 mt-16">Interactive <br /> Prototyping</h3>
                <p className="feat-card-p1">Engage your clients with prototypes <br /> that react to user actions</p>
            </div>

            <div className="features-card">
                <div className="flex justify-center gap-2 mt-12">
                    <div className="rounded-2xl bg-neutral-300 px-8 py-4 text-gray-800">
                        shift
                    </div>
                    <div className="rounded-2xl bg-neutral-300 py-4 px-6 text-gray-800">
                        alt
                    </div>
                    <div className="rounded-2xl bg-neutral-300 py-4 px-6 text-gray-800">
                        C
                    </div>
                </div>
                <h3 className="feat-card-h1 mt-24">Keyboard Quick <br /> Actions</h3>
                <p className="feat-card-p1">Powerful commands to help you <br /> create designs more quickly</p>
            </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
            {features.map((feature, index) => (
                <div
                    key={index}
                    className="bg-neutral-900 rounded-2xl flex gap-2 border border-slate-300 
                 px-4 py-2 box-border
                 w-1/3 md:w-1/4 lg:w-1/6"
                >
                    <div className="rounded-full bg-lime-400">
                        <StarIcon className="fill-black" />
                    </div>
                    {feature}
                </div>
            ))}

        </div>
    </div>;
}
