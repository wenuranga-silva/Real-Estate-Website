import { Pagination } from "@heroui/react";
import { useEffect, useState } from "react";

export default function Pagination_({ from, to, total, perPage, updatePageNum, className = ' ', msg = true, initialPage = 1 }) {

    const totalPages = Math.ceil(total / perPage);
    const [currentPage, setCurrentPage] = useState(initialPage == '' ? 1 : initialPage);

    useEffect(() => {

        setCurrentPage(initialPage);
    }, [initialPage]);

    return (

        <div className={`flex flex-col items-center justify-center my-6 ${className} `}>

            <code className={` mb-5 ${msg ? 'block' : 'hidden'} `}>
                Showing {from} To {to} Of {total} Results.
            </code>

            <Pagination showControls page={currentPage} total={totalPages} onChange={(pageNumber) => updatePageNum(pageNumber)} />
        </div>
    );
}











// export default function Pagination_({ from ,to ,total ,links ,updatePageNum }) {

//     return (

//         <div className="flex flex-col items-center mt-6">

//             <code>
//                 Showing {from} To {to} Of {total} Results.
//             </code>

//             <nav className="mx-auto mt-6 mb-4">
//                 {links.map((link, index) => {

//                     return (

//                         <button
//                             disabled={link.active || !link.url}
//                             key={index}
//                             dangerouslySetInnerHTML={{ __html: link.label }}
//                             className={`py-1 px-2 mx-2 mb-6 rounded-sm hover:shadow-md hover:text-white hover:bg-primary bg-slate-300 ${link.active
//                                 ? "!bg-primary !text-white shadow-md "
//                                 : " "
//                                 } ${!link.url
//                                     ? " cursor-not-allowed !bg-gray-200 "
//                                     : " "
//                                 }`}
//                             onClick={() => updatePageNum(link.url)}
//                         ></button>
//                     );

//                 })}
//             </nav>

//         </div>

//     );

// }
