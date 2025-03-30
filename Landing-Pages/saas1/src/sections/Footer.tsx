import Logo from "@/assets/logosaas.png"
import Image from "next/image"
import instagram from "@/assets/social-insta.svg"
import linkedin from "@/assets/social-linkedin.svg"
import pin from "@/assets/social-pin.svg"
import x from "@/assets/social-x.svg"
import youtube from "@/assets/social-youtube.svg"

export const Footer = () => {
  const socialIcons = [
    {
      src: instagram,
      alt: "instagram",
    },
    {
      src: linkedin,
      alt: "linkedin",
    },
    {
      src: pin,
      alt: "pin",
    },
    {
      src: x,
      alt: "x",
    },
    {
      src: youtube,
      alt: "youtube",
    }
  ]

  return <footer className="bg-black text-white py-20">
    <div className="container">
      <div className="flex flex-col justify-center items-center">
        <div className="inline-flex rounded-md relative before:absolute before:content-[''] before:top-2 before:left-0 before:right-0 before:bottom-0 before:blur-xl before:bg-[linear-gradient(to_right,#F87BFF,#FB92CF,#FFDD99,#C2F0B1,#2FDBFE)]">
          <Image src={Logo} alt="logo" className="h-12 w-auto relative z-10"/>
        </div>
        <div className="flex max-md:flex-col max-md:justify-center gap-8 mt-8 max-md:ml-4">
          <a href="#" className="text-white/80 transition-colors">About</a>
          <a href="#" className="text-white/80 transition-colors">Pricing</a>
          <a href="#" className="text-white/80 transition-colors">Contact</a>
          <a href="#" className="text-white/80 transition-colors">Terms</a>
          <a href="#" className="text-white/80 transition-colors">Privacy</a>
          <a href="#" className="text-white/80 transition-colors">Features</a>
        </div>
        <div className="flex gap-6 mt-8">
          {socialIcons.map((icon, index) => (
            <a 
              href="#" 
              key={index}
              className="h-10 w-10 flex items-center justify-center rounded-full"
            >
              <icon.src className="h-8 w-8"/>
            </a>
          ))}
        </div>
        <p className="text-white/80  text-lg mt-8 tracking-tight">© 2025 Rudra Sankha. All rights reserved.</p>
      </div>
    </div>
  </footer>;
};
