"use client"
import StarIcon from "@/assets/images/star.svg"
import { motion } from "framer-motion"
import React from "react";
import Image from "next/image"

const integrations = [
    { name: "Figma", Icon: "/figma-logo.svg", description: "Figma is a collaborative interface design tool." },
    { name: "Notion", Icon: "/notion-logo.svg", description: "Notion is an all-in-one workspace for notes and docs." },
    { name: "Slack", Icon: "/slack-logo.svg", description: "Slack is a powerful team communication platform." },
    { name: "Relume", Icon: "/relume-logo.svg", description: "Relume is a no-code website builder and design system." },
    { name: "Framer", Icon: "/framer-logo.svg", description: "Framer is a professional website prototyping tool." },
    { name: "GitHub", Icon: "/github-logo.svg", description: "GitHub is the leading platform for code collaboration." },
];

const firstColumn = integrations.slice(0,3);
const secondColumn = integrations.slice(3,6);

interface Integrations {
    name:string;
    Icon: string;
    description: string;
}

const IntegrationsColumn = (props: {
    className?: string;
    integrations: Integrations[];
    duration?: number
}) =>  (
    <div className={props.className}>
       <motion.div
       animate={{
        translateY: "-50%"
       }}
       transition={{
        repeat: Infinity,
        repeatType: 'loop',
        duration: props.duration || 10,
        ease:"linear"
       }}

       className="flex flex-col gap-8 pb-6 max-md2:items-center"
       >
       {[...new Array(2)].fill(0).map((_,index) => (
        <React.Fragment key={index}>
        {props.integrations.map(({ name,Icon,description }) => (
            <div className="bg-neutral-900 border border-white/10 w-60 flex flex-col gap-4 justify-center items-center px-4 py-2 rounded-3xl p-6" key={name}>
            <div>
                <Image src={Icon} alt={`${name} icon`} className="size-24" width={24} height={24}/>
            </div>
             <div className="text-white font-medium">{name}</div>
             <div className="text-gray-400 text-center text-sm">{description}</div>
            </div>
        ))}
        </React.Fragment>
       ))}
       </motion.div>
    </div>
)

export default function Integrations() {
    return <div className="flex max-md:flex-col gap-4 my-24  mx-auto oveflow-hidden">
     <div className="flex flex-col ml-24 lg:mr-32 xl:mr-52 my-auto">
        <div className="border border-lime-400 rounded-full flex gap-2 px-2 py-1 w-fit">
         <StarIcon className="fill-lime-400"/>
         INTEGRATIONS
        </div>
        <div className="space-y-4 mt-4 w-full">
            <h2 className="text-6xl leading-12">Plays well with <br /> <span className="text-lime-400">others</span></h2>
            <p className="text-gray-400 leading-12">Layers seamlessly connects with your favourite tools making <br /> it easy to plug into any workflow and collaborate across <br /> platforms</p>
        </div>
     </div>
     <div className="[mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[738px] max-md:h-[400px] overflow-hidden flex max-md:flex-col max-md:justify-center gap-8 mt-12">
     <IntegrationsColumn integrations={firstColumn} duration={15} className="max-md2:hidden"/>
     <IntegrationsColumn integrations={secondColumn} duration={19} className="max-md2:hidden"/>
     <IntegrationsColumn integrations={integrations} duration={15} className="md2:hidden"/>
     </div>
    </div>
}
