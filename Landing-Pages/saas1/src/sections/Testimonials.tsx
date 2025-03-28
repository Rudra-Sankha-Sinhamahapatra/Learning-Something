import Image from "next/image";
import avatar1 from "@/assets/avatar-1.png";
import avatar2 from "@/assets/avatar-2.png";
import avatar3 from "@/assets/avatar-3.png";
import avatar4 from "@/assets/avatar-4.png";
import avatar5 from "@/assets/avatar-5.png";
import avatar6 from "@/assets/avatar-6.png";
import avatar7 from "@/assets/avatar-7.png";
import avatar8 from "@/assets/avatar-8.png";
import avatar9 from "@/assets/avatar-9.png";
import test from "node:test";
import { twMerge } from "tailwind-merge";

const testimonials = [
  {
    text: "As a seasoned designer always on the lookout for innovative tools, Framer.com instantly grabbed my attention.",
    imageSrc: avatar1.src,
    name: "Jamie Rivera",
    username: "@jamietechguru00",
  },
  {
    text: "Our team's productivity has skyrocketed since we started using this tool. ",
    imageSrc: avatar2.src,
    name: "Josh Smith",
    username: "@jjsmith",
  },
  {
    text: "This app has completely transformed how I manage my projects and deadlines.",
    imageSrc: avatar3.src,
    name: "Morgan Lee",
    username: "@morganleewhiz",
  },
  {
    text: "I was amazed at how quickly we were able to integrate this app into our workflow.",
    imageSrc: avatar4.src,
    name: "Casey Jordan",
    username: "@caseyj",
  },
  {
    text: "Planning and executing events has never been easier. This app helps me keep track of all the moving parts, ensuring nothing slips through the cracks.",
    imageSrc: avatar5.src,
    name: "Taylor Kim",
    username: "@taylorkimm",
  },
  {
    text: "The customizability and integration capabilities of this app are top-notch.",
    imageSrc: avatar6.src,
    name: "Riley Smith",
    username: "@rileysmith1",
  },
  {
    text: "Adopting this app for our team has streamlined our project management and improved communication across the board.",
    imageSrc: avatar7.src,
    name: "Jordan Patels",
    username: "@jpatelsdesign",
  },
  {
    text: "With this app, we can easily assign tasks, track progress, and manage documents all in one place.",
    imageSrc: avatar8.src,
    name: "Sam Dawson",
    username: "@dawsontechtips",
  },
  {
    text: "Its user-friendly interface and robust features support our diverse needs.",
    imageSrc: avatar9.src,
    name: "Casey Harper",
    username: "@casey09",
  },
];

const firstColumn = testimonials.slice(0,3);
const secondColumn = testimonials.slice(3,6);
const thirdColumn = testimonials.slice(6,9);

const TestimonialsColumn = (props: {className?: string, testimonials: typeof testimonials}) => (
  <div className={twMerge("flex flex-col  gap-8 mt-12 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]", props.className)}>
          {props.testimonials.map(({text,imageSrc,name,username})=>(
            <div className="card" key={username}>
              <div>{text}</div>
              <div className="mt-6 flex flex-row gap-2">
                <Image src={imageSrc} alt={name} width={40} height={40} className="rounded-full" />
                <div className="flex flex-col">
                  <div className="font-medium tracking-tight leading-5">{name}</div>
                  <div className="tracking-tight leading-5">{username}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
)

export const Testimonials = () => {
  return <section className="md:py-20 py-8 bg-white">
    <div className="container">
      <div className="flex flex-col items-center justify-center">
    <div className="text-sm inline-flex border border-[#222]/10 px-3 py-1 rounded-lg tracking-tight">
          Version 2.0 is here
        </div>
        <h1 className="heading-1 mt-6">What Our Users Say</h1>
        <p className="description-1 w-full max-w-[550px]">From Intuitive design to powerful features, our app has become an essential tool for users around the world.</p>
        </div>
        <div className="flex max-md:flex-col justify-center gap-8">
        <TestimonialsColumn testimonials={firstColumn} />
        <TestimonialsColumn testimonials={secondColumn} className="hidden md:flex" />
        <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:flex" />
        </div>
    </div>
  </section>;
};
