import { usePage } from "@inertiajs/react";
import { useEffect, useMemo, useRef, useState } from "react";
import InputLabel from "./InputLabel";
import TextInput from "./TextInput";
import { Spinner } from "@heroui/react";


export default function SearchAdmin({ _url, finalUrl, pageNumber, placeholder = "Search here ...", className = '', loading = false }) {

    //// search funtions
    const [searchInput, setSearchInput] = useState(usePage().props.search || '');
    const [searchText, setSearchText] = useState(usePage().props.search || '');
    const [pageN, setPageN] = useState(pageNumber || 1);

    let searchUrl = useMemo(() => {

        let url = new URL(_url);

        if (searchText.trim() !== '') {

            url.searchParams.append('search', searchText);
        } else {

            url.searchParams.delete('search');
        }

        if (pageN != '') {

            url.searchParams.append('page', pageN);
        } else {

            url.searchParams.delete('page');
        }

        return url;
    }, [pageN, searchText]);

    useEffect(() => {

        setPageN(pageNumber);
    }, [pageNumber]);


    useEffect(() => {

        const handler = setTimeout(() => {

            if (searchInput !== searchText) {

                setSearchText(searchInput);
                setPageN(1);
            }
        }, 2000);

        return () => {

            clearTimeout(handler);
        };
    }, [searchInput]);

    useEffect(() => {

        finalUrl(searchUrl ,pageN);

    }, [searchUrl]);

    return (


        <div className={`flex items-center  mb-5 ${className}`}>

            <div className="w-64 md:w-full mr-5">

                <InputLabel value={'Search :'} className=" !text-base mr-3 !text-black" />
                <div className="flex items-center">

                    <TextInput value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder={placeholder} className=" !rounded-sm w-full" />
                    <Spinner size={ 'md' } color="primary" className={`ml-[-45px]  ${loading ? 'block' : 'hidden'} `}/>
                </div>
            </div>
        </div>

    );

}

