import { Link } from "@inertiajs/react";


export default function LinkDefault({className='' ,children ,...props}) {

    return (

        <Link {...props} className={` p-2 text-primary bg-white border-primary hover:shadow-md rounded-sm hover:text-white hover:bg-primary transition-all duration-500 ease-in ${className}`}>
            {children}
        </Link>

    );

}
