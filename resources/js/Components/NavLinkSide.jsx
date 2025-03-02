import { Link } from "@inertiajs/react";

export default function NavLinkSide({
    active = false,
    className = '',
    children,
    ...props
    }) {

    return (

        <Link {...props}
            className={`py-2 px-3 mb-3 flex items-center hover:text-white  hover:bg-primary hover:shadow-md rounded-sm transition-all duration-500 ease-in font-_Lato ${active ? ' bg-primary text-white shadow-md ' : ' ' }`}
        >
            {children}
        </Link>
    );

}
