import { CallToActionComp } from "@/components/CallToActionComp";

export default function CallToAction() {
    return (
        <div className="relative bg-black py-24 overflow-hidden">
            <div className="flex whitespace-nowrap animate-scroll">
                {/* First set of repeated content */}
                <CallToActionComp/>
                {/* Second set for seamless looping */}
                <CallToActionComp/>
            </div>
        </div>
    )
}
