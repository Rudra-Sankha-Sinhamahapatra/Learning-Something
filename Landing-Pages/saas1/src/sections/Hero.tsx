import ArrowIcon from "@/assets/arrow-right.svg";
import cylinderImage from "@/assets/cylinder.png";
import  cogImage from "@/assets/cog.png";
import noodleImage from "@/assets/noodle.png";
import Image from "next/image";

export const Hero = () => {
  return <section className="pt-8 pb-20 md:pt-5 md:pb-10 bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#183EC2,#EAEEFE_100%)] overflow-x-clip">
    <div className="container">
      <div className="md:flex items-center">
      <div className="md:w-[478px]">
        <div className="text-sm inline-flex border border-[#222]/10 px-3 py-1 rounded-lg tracking-tight">
          Version 2.0 is here
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text mt-6">Pathway to Productivity</h1>
        <p className="text-xl text-[#010D3E] tracking-tight mt-6">
          Celebrate the joy of accomplishment with an app designed to track your progress, motivate your efforts, and celebrate your success
        </p>
        <div className="flex gap-1 items-center mt-[30px]">
          <button className="btn"> <span>Get for free</span></button>
          <button className="btn btn-text gap-1"> <span>Learn More</span>
          <ArrowIcon className="h-5 w-5 my-auto"/>
          </button>
        </div>
      </div>
      <div className="mt-20 md:mt-0 md:h-[678px] md:flex-1 relative">
        <Image src={cogImage} alt="cogImage" className="md:absolute md:h-full md:w-auto md:max-w-none md:-left-6 lg:left-0"></Image>
        <Image src={cylinderImage} height={220} width={220} alt="CylinderImage" className="hidden md:block -top-8 -left-32 md:absolute"></Image>
        <Image src={noodleImage} alt="noodle image" width={220} className="hidden lg:block absolute top-[524px] left-[448px] rotate-[30deg]"></Image>
      </div>
      </div>
    </div>
  </section>
};
