
export default function AreaIcon({  props ,width ,height ,className  }) {

    return (

        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width} height={height} viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round"
            className={`icon icon-tabler icons-tabler-outline icon-tabler-square-half ${className}`}
            {...props}
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 4v16" />
            <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
            <path d="M12 13l7.5 -7.5" />
            <path d="M12 18l8 -8" />
            <path d="M15 20l5 -5" />
            <path d="M12 8l4 -4" />
        </svg>
    );
}
