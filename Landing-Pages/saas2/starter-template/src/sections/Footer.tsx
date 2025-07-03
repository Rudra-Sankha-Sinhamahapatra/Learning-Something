"use client"
import Logo from "@/assets/images/logo.svg"
import Link from "next/link";

const footerLinks = [
    { href: "#", label: "Contact" },
    { href: "#", label: "Privacy Policy" },
    { href: "#", label: "Terms & Conditions" },
];

export default function Footer() {
    return <div className="my-12 flex flex-col gap-6 justify-center items-center md:gap-0 md:flex-row  md:justify-between mx-6">
    <Logo/>
    <div className="flex gap-6">
    {footerLinks.map((link,index) => 
    <Link key={index} href={link.href} className="text-gray-400 text-md">
     {link.label}
    </Link>
    )}
    </div>
    </div>;
}
