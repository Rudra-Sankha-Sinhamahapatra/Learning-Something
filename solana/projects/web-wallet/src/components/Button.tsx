
interface ButtonProps {
    name: string;
    onClick: () => void;
    className?: string;
}

const Button = ({ name, onClick, className = ""}:ButtonProps) => {
     return (
        <button
        className={`bg-blue-500 hover:bg-blue-600 text-white font-medium rounded
            transition-colors ${className}`}
            onClick={onClick}
        >
           {name}
        </button>
     )
}

export default Button;