"use client"
import quantumLogo from "@/assets/images/quantum.svg";
import acmeLogo from "@/assets/images/acme-corp.svg";
import echoValleyLogo from "@/assets/images/echo-valley.svg";
import pulseLogo from "@/assets/images/pulse.svg";
import outsideLogo from "@/assets/images/outside.svg";
import apexLogo from "@/assets/images/apex.svg";
import celestialLogo from "@/assets/images/celestial.svg";
import twiceLogo from "@/assets/images/twice.svg";
import { motion } from "framer-motion"

const logos = [
    { name: "Quantum", image: quantumLogo },
    { name: "Acme Corp", image: acmeLogo },
    { name: "Echo Valley", image: echoValleyLogo },
    { name: "Pulse", image: pulseLogo },
    { name: "Outside", image: outsideLogo },
    { name: "Apex", image: apexLogo },
    { name: "Celestial", image: celestialLogo },
    { name: "Twice", image: twiceLogo },
];

export default function LogoTicker() {
    return <div className="pb-12">
        <div className="container mx-auto">
            <p className="text-gray-400 text-md text-center mb-12">Already chosen by these market leaders</p>
            <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
                <motion.div
                    className="flex items-center justify-center gap-16 opacity-50 whitespace-nowrap"
                    animate={{
                        translateX: "-50%"
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                        repeatType: "loop"
                    }}
                >
                    {logos.map((logo, index) => (
                        <div key={index} className="flex items-center justify-center flex-shrink-0">
                            <logo.image
                                alt={logo.name}
                                className="h-8 w-auto"
                            />
                        </div>
                    ))}
                    {logos.map((logo, index) => (
                        <div key={`duplicate-${index}`} className="flex items-center justify-center flex-shrink-0">
                            <logo.image
                                alt={logo.name}
                                className="h-8 w-auto"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    </div>;
}
