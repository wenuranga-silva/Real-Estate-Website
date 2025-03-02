
export default function ArrowLeftIcon({ props, width, height, className }) {

    return (

        <svg xmlns="http://www.w3.org/2000/svg"
            width={width} height={height} viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`lucide lucide-arrow-big-left-dash ${className}`}
            {...props}
        >
            <path d="M19 15V9" />
            <path d="M15 15h-3v4l-7-7 7-7v4h3v6z" />
        </svg>
    );
}
