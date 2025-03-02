import { Spinner } from "@heroui/react";

export default function Loading({ show = false ,className = '' ,size = 'md'}) {

    if (!show) {

        return ;
    }

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-5">

            <Spinner size={ size } color="primary" className={` ${className} `}/>
        </div>
    );
}
