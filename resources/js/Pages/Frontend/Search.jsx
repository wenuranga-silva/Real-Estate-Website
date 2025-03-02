import Footer from "@/Components/Footer";
import LandCard from "@/Components/LandCard";
import PropertyCard from "@/Components/PropertyCard";
import TextInput from "@/Components/TextInput";
import Frontend from "@/Layouts/Frontend";
import { Head, router, usePage } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Filter from "@/Components/Filter";
import FilterIcon from "@/Components/Icons/FilterIcon";
import SearchIcon from "@/Components/Icons/SearchIcon";
import { Spinner } from "@heroui/react";
import Pagination_ from "@/Components/Pagination_";
import Loading from "@/Components/Loading";

export default function Search({ cities, selectedpropertyType, results, msg }) {


    /// search
    const { url } = usePage();
    const searchParams = new URLSearchParams(url.split('?')[1]); // Extract query parameters

    //// filter options
    const initialFilterOptions = {

        keyType: selectedpropertyType,
        propertyType: 'any',
        propertyBedRooms: 'any',
        propertyArea: 'any',
        propertyStatus: 'any',
        landType: 'any',
        landArea: 'any',
        minPrice: '',
        maxPrice: '',
    };

    const [filterOptions, setFilterOptions] = useState({

        keyType: selectedpropertyType,
        propertyType: selectedpropertyType == 'property' ? searchParams.get('type') || 'any' : 'any',
        propertyBedRooms: selectedpropertyType == 'property' ? searchParams.get('bedrooms') || 'any' : 'any',
        propertyArea: selectedpropertyType == 'property' ? searchParams.get('area') || 'any' : 'any',
        propertyStatus: selectedpropertyType == 'property' ? searchParams.get('status') || 'any' : 'any',
        landType: selectedpropertyType == 'land' ? searchParams.get('type') || 'any' : 'any',
        landArea: selectedpropertyType == 'land' ? searchParams.get('area') || 'any' : 'any',
        minPrice: searchParams.get('minPrice') || '',
        maxPrice: searchParams.get('maxPrice') || '',
    });


    ///// for search
    const [searchInput, setSearchInput] = useState(searchParams.get('_search') || "");
    const [searchText, setSearchText] = useState(searchParams.get('_search') || "");
    const [pageNumber, setPageNumber] = useState('');

    const [searchResult, setSearchResult] = useState([]);
    const isSearch = useRef(false); /// set false when user select search key
    const [showLoading, setShowLoading] = useState(false);

    const [showFilter, setShowFilter] = useState(false);

    /// search functions
    const search = () => {

        let url = new URL(route('search', filterOptions.keyType));

        if (filterOptions.keyType === 'property') {

            if (filterOptions.propertyType !== 'any') {

                url.searchParams.append('type', filterOptions.propertyType);
            }

            if (filterOptions.propertyArea !== 'any') {

                url.searchParams.append('area', filterOptions.propertyArea);
            }

            if (filterOptions.propertyBedRooms !== 'any') {

                url.searchParams.append('bedrooms', filterOptions.propertyBedRooms);
            }

            if (filterOptions.propertyStatus !== 'any') {

                url.searchParams.append('status', filterOptions.propertyStatus);
            }

        } else {

            if (filterOptions.landType !== 'any') {

                url.searchParams.append('type', filterOptions.landType);
            }

            if (filterOptions.landArea !== 'any') {

                url.searchParams.append('area', filterOptions.landArea);
            }
        }

        if (filterOptions.minPrice > 0) {

            url.searchParams.append('min', filterOptions.minPrice);
        }

        if (filterOptions.maxPrice > 0) {

            url.searchParams.append('max', filterOptions.maxPrice);
        }

        pageNumber !== '' ? url.searchParams.append('page', pageNumber) : '';

        searchText !== '' ? url.searchParams.append('_search', searchInput) : '';

        setShowLoading(true);
        router.visit(url, {

            preserveState: true,
            preserveScroll: true,
            onFinish: () => {

                setShowLoading(false);
                window.scrollTo({ top: 30, behavior: 'smooth' });
            }
        });
    }

    useEffect(() => {

        if (searchText !== '' && isSearch.current) {

            setShowLoading(true);
            axios.get(route('search.keys', searchText))
                .then((response) => {

                    if (response.data.length > 0) {

                        setSearchResult(response.data);
                    }

                    setShowLoading(false);
                })
                .catch((error) => {

                    console.log(error);
                    setShowLoading(false);
                });
        } else {

            setSearchResult([]);
            isSearch.current = true;
        }

    }, [searchText]);

    useEffect(() => {

        const handler = setTimeout(() => {

            setSearchText(searchInput);

        }, 1200);

        return () => {

            clearTimeout(handler);
        };
    }, [searchInput]);

    useEffect(() => {

        if (pageNumber !== '' && pageNumber !== searchParams.get('page')) {

            search();
        }
    }, [pageNumber]);

    /// hide result set dialog when user click out side
    useEffect(() => {

        document.addEventListener('click', function () {
            setSearchResult([])
        });

        return () => {

            document.addEventListener('click', function () {
                setSearchResult([])
            });
        };
    }, []);

    ///
    const setOnClick = (e, val) => {

        e.preventDefault();

        isSearch.current = false;
        setSearchInput(val);
        setSearchText(val);
        setSearchResult([]);
    }

    //// update filter options
    const updateFilterOptions = (key, value) => {

        setFilterOptions((prev) => ({

            ...prev,
            [key]: value,
        }));
    }

    /// reset filter options
    const resetFilterOptions = () => {

        setFilterOptions(initialFilterOptions);
    }

    return (

        <Frontend >

            <Head title={selectedpropertyType} />

            <div className="flex justify-center mt-10 mx-10 relative">

                <button className="mr-5 px-3 rounded-md shadow-slate-500/30 shadow-md my-1  bg-primary z-30 text-white flex gap-1 items-center" onClick={() => setShowFilter(true)}>
                    Filters
                    <FilterIcon width={'1.3em'} height={'1.3em'} />
                </button>

                <TextInput value={searchInput} onChange={(e) => setSearchInput(e.target.value)} className="w-full pr-[55px] md:max-w-xl" placeholder="Search by City" />

                <button className={`ml-[-48px] px-3 rounded-md shadow-slate-500 shadow-md my-1  bg-primary z-30 text-white ${!showLoading ? 'block' : 'hidden'}`} onClick={(e) => { setPageNumber(1);search(e) } }>

                    <SearchIcon width={'1.3em'} height={'1.3em'} />
                </button>

                <Spinner size='md' color="primary" className={`z-50 ml-[-95px] ${showLoading ? 'block' : 'hidden'} `} />
                {/* <img className={` w-11 z-30 ml-[-45px] ${showLoading ? 'block' : 'hidden'}`} src="/upload/loading_.svg" alt="loading" /> */}

                <div className={`${searchResult.length > 0 ? 'block' : 'hidden'} absolute top-12 right-auto left-auto z-50 w-full md:max-w-xl bg-white text-black shadow-md rounded-md shadow-slate-500 mx-3 `}>
                    <ul className="m-2">
                        {searchResult && searchResult.map((val, index) => (

                            <li key={index} className="p-2 hover:bg-primary duration-100 ease cursor-pointer" onClick={(e) => setOnClick(e, val.name)}>{val.name}</li>
                        ))}
                    </ul>
                </div>

            </div>

            <div className="flex justify-around gap-x-5 gap-y-10 flex-wrap mt-10">

                {msg == 'empty' && <code className="text-primary text-lg m-1 self-center"> No result found. </code>}

                {selectedpropertyType === 'property' && results.data.map((data, index) => (

                    <PropertyCard key={index} _property={data} />
                ))}

                {selectedpropertyType === 'land' && results.data.map((data, index) => (

                    <LandCard key={index} _land={data} />
                ))}
            </div>

            {msg != "empty" && <Pagination_ className=" my-12" from={results.from} to={results.to} total={results.total} perPage={20} updatePageNum={(number) => { number ? setPageNumber(number) : '' }} initialPage={pageNumber}/>}

            <Footer cities={cities} />

            <Loading show={showLoading} size="lg" />
            <Filter show={showFilter} reset={resetFilterOptions} closeFun={() => setShowFilter(false)} filterOptions={filterOptions} updateFilter={updateFilterOptions} save={search} resetPageNumber={() => setPageNumber(1)} />
        </Frontend>

    );

}
