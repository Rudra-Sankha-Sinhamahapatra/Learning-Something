"use client";

import starImage from "@/assets/star.png";
import springImage from "@/assets/spring.png";
import ArrowRight from "@/assets/arrow-right.svg";
import { motion,useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const CallToAction = () => {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target:sectionRef,
    offset:["start end","end start"]
  });
  
  const translateY = useTransform(scrollYProgress,[0,1],[150,-150]);

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-white to-[#D2DCFF] overflow-x-clip">
      <div className="container">
        <div className="md:flex flex-row justify-center w-full">
          <div className="md:flex flex-col relative">
            <h1 className="heading-1">Sign up for free today</h1>
            <p className="description-1 mt-5 max-w-[550px]">
              Celebrate the joy of accomplishment with an app designed to track
              your progress, motivate your efforts, and celebrate your success
            </p>
            <motion.img
              src={starImage.src}
              alt="star"
              className="hidden md:block h-72 w-72 absolute -left-[250px] -top-[100px]"
              style={{translateY}}
            />
            <div className="flex gap-4 mt-8 justify-center">
              <button className="btn btn-primary">Get for Free</button>
              <button className="btn btn-text gap-1">
                Learn More <ArrowRight className="h-5 w-5 my-auto" />
              </button>
            </div>
            <motion.img
              src={springImage.src}
              alt="spring"
              className="hidden md:block h-72 w-72 absolute -right-[250px] -bottom-[100px]"
              style={{translateY}}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
