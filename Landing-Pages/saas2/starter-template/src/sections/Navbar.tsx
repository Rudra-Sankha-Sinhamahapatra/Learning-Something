"use client"

import Logo from '@/assets/images/logo.svg'
import Link from 'next/link';
import Menu from '@/assets/images/menu.svg'
import { useRouter } from 'next/navigation';

const navLinks = [
    { label: "Home", href: "#" },
    { label: "Features", href: "#features" },
    { label: "Integrations", href: "#integrations" },
    { label: "FAQs", href: "#faqs" },
];

const buttonLinks = [
    {label:"Log In", href:"#login"},
    {label: "Sign Up",href:"#signup"}
]

export default function Navbar() {
    const router = useRouter();

    return (
        <nav className='w-full px-4 sm:px-6 py-4'>
      <div className="border border-white/20 rounded-full px-6 py-2 flex flex-row items-center justify-between  max-w-[70%] mx-auto mt-6">
               <div className="min-w-[120px] flex-shrink-0">
            <Logo 
              className="w-auto h-auto"
            />
          </div>

        <div className='hidden lg:flex items-center gap-6 xl:gap-8 flex-shrink-0'>
        {navLinks.map((navItem,index) => {
          return <Link
           href={navItem.href}
            key={index}
            className='text-sm text-white/70 hover:text-white transition-colors whitespace-nowrap'
            > 
         {navItem.label}
          </Link>
        })}
        </div>

        <div className='hidden md:flex items-center gap-3 flex-shrink-0'>
          {buttonLinks.map((buttonItem,index) => {
            return <button
             className={`rounded-full px-4 py-2 text-sm transition-colors whitespace-nowrap
                 ${buttonItem.label==="Sign Up"?
                    "bg-lime-500 text-black border-none hover:bg-lime-400"
                    :"text-white/70 border border-white/20 hover:text-white hover:border-white" }`}
             key={index}
             onClick={()=>{
              router.push(`/${buttonItem.href}`)
             }}
             >
              {buttonItem.label}
            </button>
          })}
        </div>
        <div className='md:hidden flex-shrink-0'>
        <Menu className="w-6 h-6 fill-white cursor-pointer" />
        </div>
        </div>
        </nav>
    )
  }