import type { ReactNode } from "react";
import { toast } from "react-toastify";

interface CopyButtonProps {
    name:string;
    label: ReactNode;
    tooltipContent:string;
    className?: string;
    setState?: (value: boolean) => void;
}

const CopyButton = ({
    name,
    label,
    tooltipContent,
    className = "",
}:CopyButtonProps) => {
     const handleCopy = async () => {
        try {
           await navigator.clipboard.writeText(name);
           toast.success("Copied to clipboard !");
        } catch (error) {
            toast.error("Failed to copy to clipboard");
        }
     };

     return (
        <button
        className={` p-2 rounded hover:bg-gray-100 ${className}`}
        onClick={handleCopy}
        data-toolclip-content={tooltipContent}
        >
           {label}
        </button>
     )
}

export default CopyButton;