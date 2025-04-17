"use client";

import ProductImage from "@/assets/product-image.png";
import tubeImage from "@/assets/tube.png";
import pyramidImage from "@/assets/pyramid.png";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export const ProductShowcase = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      ref={sectionRef}
      className="md:py-20 py-8  md:flex items-center md:justify-center min-h-[70vh] overflow-x-clip"
    >
      <div className="container">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full max-w-[500px] text-center mb-8 md:mb-12">
            <div className="text-sm inline-flex border border-[#222]/10 px-3 py-1 rounded-lg tracking-tight mb-6">
              Boost your productivity
            </div>
            <h1 className="heading-1">
              A more effective way to track progress
            </h1>
            <p className="description-1">
              Celebrate the joy of accomplishment with an app designed to track
              your progress and motivate your efforts
            </p>
          </div>
          <div className="relative w-[95%] md:w-[85%] max-w-[1400px] mx-auto mt-10">
            <div className="hidden md:block absolute top-40 -left-12 z-10 w-32 rotate-[-10deg]">
              <motion.img
                src={tubeImage.src}
                alt="tubeImage"
                className="w-full h-auto"
                style={{ translateY }}
              />
            </div>
            <div className="w-full">
              <Image
                src={ProductImage}
                alt="productImage"
                className="w-full h-auto"
              />
            </div>
            <div className="hidden md:block absolute -top-10 -right-16 z-10  md:w-32">
              <motion.img
                src={pyramidImage.src}
                alt="pyramidImage"
                className="w-full h-auto"
                style={{ translateY }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
