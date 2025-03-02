
export default function ArrowRightIcon({  props ,width ,height ,className  }) {


    return (

        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width} height={height} viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round"
            className={`lucide lucide-arrow-big-right-dash ${className}`}
            {...props}
        >
            <path d="M5 9v6" />
            <path d="M9 9h3V5l7 7-7 7v-4H9V9z" />
        </svg>
    );
}
