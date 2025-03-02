import Frontend from "@/Layouts/Frontend";
import { Head, router } from "@inertiajs/react";
import SwiperCardLay from "@/Components/SwiperCardLay";

import downloadApp from '../../../assets/images/download_app.png';
import playStore from '../../../assets/images/playstore.svg';
import appStore from '../../../assets/images/appstore.svg';
import hero from '../../../assets/images/hero1.jpg';
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Footer from "@/Components/Footer";
import { Card, CardBody, Select, SelectItem, Spinner, Tab, Tabs } from "@heroui/react";
import HomeIcon from "@/Components/Icons/HomeIcon";
import AreaIcon from "@/Components/Icons/AreaIcon";
import TextInput from "@/Components/TextInput";
import SearchIcon from "@/Components/Icons/SearchIcon";
import TypeIcon from "@/Components/Icons/TypeIcon";
import BedIcon from "@/Components/Icons/BedIcon";


export default function Home({ hotDeals, hotDealsLands, cities }) {

    /// search
    const [propertyType, setPropertyType] = useState('any');
    const [propertyBedRooms, setPropertyBedRooms] = useState('any');
    const [propertyArea, setPropertyArea] = useState('any');
    const [landType, setLandType] = useState('any');
    const [landArea, setLandArea] = useState('any');

    const [searchInput, setSearchInput] = useState('');
    const [searchText, setSearchText] = useState('');

    const [searchResult, setSearchResult] = useState([]);
    const isSearch = useRef(true); /// set false when user select search key
    const [showLoading, setShowLoading] = useState(false);

    /// search functions
    const search = (e, key) => {

        e.preventDefault();

        let url = new URL(route('search', key));

        if (key === 'property') {

            if (propertyType !== 'any') {

                url.searchParams.append('type', propertyType);
            }

            if (propertyArea !== 'any') {

                url.searchParams.append('area', propertyArea);
            }

            if (propertyBedRooms !== 'any') {

                url.searchParams.append('bedrooms', propertyBedRooms);
            }

        } else {

            if (landType !== 'any') {

                url.searchParams.append('type', landType);
            }

            if (landArea !== 'any') {

                url.searchParams.append('area', landArea);
            }
        }

        searchText !== '' ? url.searchParams.append('_search', searchText) : '';

        router.visit(url);
    }

    useEffect(() => {

        if (searchText !== '' && isSearch.current) {

            let cancelToken = axios.CancelToken.source();

            setShowLoading(true);
            axios.get(route('search.keys', searchText) ,{ cancelToken: cancelToken.token })
                .then((response) => {

                    if (response.data.length > 0) {

                        setSearchResult(response.data);
                    }

                    setShowLoading(false);
                })
                .catch((error) => {

                    setShowLoading(false);
                    console.log(error);
                });
        } else {

            setSearchResult([]);
            isSearch.current = true;
            return;
        }

    }, [searchText]);

    useEffect(() => {

        const handler = setTimeout(() => {

            if (searchInput !== searchText) {

                setSearchText(searchInput);
            }

        }, 1000);

        return () => {

            clearTimeout(handler);
        };
    }, [searchInput]);

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

    return (

        <Frontend>

            <Head title="Home" />

            <div className="flex w-full justify-center pt-5 pb-20 px-4 relative">

                <img src={hero} alt="banner" />

                <div className="absolute left-1/2 top-1/3 -translate-x-1/2 p-3 rounded-md backdrop-blur-sm shadow-md w-full md:max-w-3xl">

                    <div className="flex w-full flex-col">

                        <Tabs aria-label="searchAndFilters" size={'lg'}>

                            <Tab key="photos" title={
                                <div className="flex items-center space-x-2">
                                    <HomeIcon width={'1.3em'} height={'1.3em'} />
                                    <span>Home /Apartments</span>
                                </div>
                            }>
                                <Card>
                                    <CardBody>

                                        <div className="flex relative">
                                            <TextInput value={searchInput} onChange={(e) => setSearchInput(e.target.value)} className="w-full pr-[55px]" placeholder="Search by City" />
                                            <button className="ml-[-48px] px-3 rounded-md shadow-slate-500 shadow-md my-1  bg-primary z-50 text-white" onClick={(e) => search(e, 'property')}>
                                                {/* <i className="text-lg fa-solid fa-magnifying-glass"></i> */}
                                                <SearchIcon width={'1.3em'} height={'1.3em'} />
                                            </button>

                                            <Spinner size='md' color="primary" className={`z-50 ml-[-95px] ${showLoading ? 'block' : 'hidden'} `} />
                                            {/* <img className={` w-12 z-50 ml-[-97px] ${showLoading ? 'block' : 'hidden'}`} src="/upload/loading_.svg" alt="loading" /> */}

                                            <div className={`${searchResult.length > 0 ? 'block' : 'hidden'} absolute top-12 right-0 left-0 z-50 bg-white text-black shadow-md rounded-md shadow-slate-500 mx-3 `}>
                                                <ul className="m-2">
                                                    {searchResult && searchResult.map((val, index) => (

                                                        <li key={index} className="p-2 hover:bg-primary duration-100 ease cursor-pointer" onClick={(e) => setOnClick(e, val.name)}>{val.name}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="mt-3 flex">
                                            <div className="mr-2 w-1/3">
                                                <label className="font-_Oswald font-medium text-black dark:text-white flex gap-1 mb-1">
                                                    Type
                                                    <TypeIcon />
                                                </label>
                                                <div className="flex">
                                                    <Select
                                                        aria-labelledby="Types"
                                                        placeholder="Any"
                                                        onChange={(e) => setPropertyType(e.target.value)}
                                                    >
                                                        <SelectItem key="any" >Any</SelectItem>
                                                        <SelectItem key="home">Home</SelectItem>
                                                        <SelectItem key="apartment">Apartment</SelectItem>
                                                        <SelectItem key="commercial">Commercial</SelectItem>
                                                        <SelectItem key="bungalows">Bungalows</SelectItem>
                                                        <SelectItem key="villas">Villas</SelectItem>
                                                    </Select>
                                                    {/* <i className="fa-solid fa-chevron-down group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"></i> */}
                                                </div>
                                            </div>

                                            <div className="mx-2 w-1/3">
                                                <label className="font-_Oswald font-medium text-black dark:text-white flex gap-1 mb-1">
                                                    Bedrooms
                                                    <BedIcon />
                                                </label>
                                                <div className="flex">
                                                    <Select
                                                        placeholder="Any"
                                                        aria-labelledby="Bedrooms"
                                                        onChange={(e) => setPropertyBedRooms(e.target.value)}
                                                    >
                                                        <SelectItem key="any">Any</SelectItem>
                                                        <SelectItem key="2">2+ Rooms</SelectItem>
                                                        <SelectItem key="3">3+ Rooms</SelectItem>
                                                        <SelectItem key="4">4+ Rooms</SelectItem>
                                                    </Select>
                                                    {/* <i className="fa-solid fa-chevron-down group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"></i> */}
                                                </div>
                                            </div>

                                            <div className="mx-2 w-1/3">
                                                <label className="font-_Oswald font-medium text-black dark:text-white flex gap-1 mb-1">
                                                    Area
                                                    <AreaIcon width={'1.3em'} height={'1.3em'} />
                                                    {/* <i className="fa-solid fa-up-right-and-down-left-from-center ml-2"></i> */}
                                                </label>
                                                <div className="flex">
                                                    <Select
                                                        placeholder="Any"
                                                        aria-labelledby="Areas"
                                                        onChange={(e) => setPropertyArea(e.target.value)}
                                                    >
                                                        <SelectItem key="any">Any</SelectItem>
                                                        <SelectItem key="small">Small (800-1200 sqft)</SelectItem>
                                                        <SelectItem key="medium">Medium (1201-2000 sqft)</SelectItem>
                                                        <SelectItem key="large">Large (2001  sqft)</SelectItem>
                                                    </Select>
                                                    {/* <i className="fa-solid fa-chevron-down group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"></i> */}
                                                </div>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Tab>

                            <Tab key="music" title={
                                <div className="flex items-center space-x-2">
                                    <AreaIcon width={'1.3em'} height={'1.3em'} />
                                    <span>Lands</span>
                                </div>
                            }>
                                <Card>
                                    <CardBody>

                                        <div className="flex relative">
                                            <TextInput value={searchInput} onChange={(e) => setSearchInput(e.target.value)} className="w-full pr-[55px]" placeholder="Search by City" />
                                            <button className="ml-[-48px] px-3 rounded-md shadow-slate-500 shadow-md my-1  bg-primary z-50 text-white" onClick={(e) => search(e, 'property')}>
                                                {/* <i className="text-lg fa-solid fa-magnifying-glass"></i> */}
                                                <SearchIcon width={'1.3em'} height={'1.3em'} />
                                            </button>

                                            <Spinner size='md' color="primary" className={`z-50 ml-[-95px] ${showLoading ? 'block' : 'hidden'} `} />
                                            {/* <img className={` w-12 z-50 ml-[-97px] ${showLoading ? 'block' : 'hidden'}`} src="/upload/loading_.svg" alt="loading" /> */}

                                            <div className={`${searchResult.length > 0 ? 'block' : 'hidden'} absolute top-12 right-0 left-0 z-50 bg-white text-black shadow-md rounded-md shadow-slate-500 mx-3 `}>
                                                <ul className="m-2">
                                                    {searchResult && searchResult.map((val, index) => (

                                                        <li key={index} className="p-2 hover:bg-primary duration-100 ease cursor-pointer" onClick={(e) => setOnClick(e, val.name)}>{val.name}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="mt-3 flex">

                                            <div className="mr-2 w-1/2">
                                                <span className="font-_Oswald font-medium text-black dark:text-white flex gap-1 mb-1">

                                                    Type
                                                    <TypeIcon />
                                                    {/* <i className="fa-solid fa-tree-city ml-2"></i> */}
                                                </span>
                                                <div className="relative flex">
                                                    <Select
                                                        aria-labelledby="land type"
                                                        placeholder="Any"
                                                        onChange={(e) => setLandType(e.target.value)}
                                                    >
                                                        <SelectItem key="any">Any</SelectItem>
                                                        <SelectItem key="residential">Residential</SelectItem>
                                                        <SelectItem key="commercial">Commercial</SelectItem>
                                                        <SelectItem key="agricultural">Agricultural</SelectItem>
                                                        <SelectItem key="industrial">Industrial</SelectItem>
                                                    </Select>
                                                    {/* <i className="fa-solid fa-chevron-down group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"></i> */}
                                                </div>
                                            </div>

                                            <div className="mx-2 w-1/2">
                                                <span className="font-_Oswald font-medium text-black dark:text-white flex gap-1 mb-1">
                                                    Area
                                                    <AreaIcon width={'1.3em'} height={'1.3em'} />
                                                    {/* <i className="fa-solid fa-up-right-and-down-left-from-center ml-2"></i> */}
                                                </span>
                                                <div className="flex">
                                                    <Select
                                                        aria-labelledby="land area"
                                                        placeholder="Any"
                                                        onChange={(e) => setLandArea(e.target.value)}
                                                    >
                                                        <SelectItem key="any">Any</SelectItem>
                                                        <SelectItem key="small">10+ Perches</SelectItem>
                                                        <SelectItem key="medium">20+ Perches</SelectItem>
                                                        <SelectItem key="large">30+ Perches</SelectItem>
                                                    </Select>
                                                    {/* <i className="fa-solid fa-chevron-down group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"></i> */}
                                                </div>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Tab>
                        </Tabs>

                    </div>

                </div>

            </div>

            <div className="md:px-4 mt-5 md:mt-8 flex flex-col">

                <div className="max-w-fit mx-auto">
                    <h1 className="font-_Lato bg-gradient-to-bl via-primary from-tertiary to-secondary text-transparent bg-clip-text text-2xl font-semibold mb-8 text-center secHead">Homes And Apartments</h1>
                </div>
                <SwiperCardLay type={'property'} cardData={hotDeals} />
            </div>

            <div className="md:px-4 mt-7 md:mt-16 flex flex-col">

                <div className="max-w-fit mx-auto">
                    <h1 className="font-_Lato bg-gradient-to-bl via-primary from-tertiary to-secondary text-transparent bg-clip-text text-2xl font-semibold mb-8 text-center secHead">Lands</h1>
                </div>
                <SwiperCardLay type={'land'} cardData={hotDealsLands} />
            </div>

            <div className="mt-10 flex flex-col">

                <div className="max-w-fit mx-auto">
                    <h1 className="font-_Lato bg-gradient-to-bl via-primary from-tertiary to-secondary text-transparent bg-clip-text text-2xl font-semibold mb-8 text-center secHead">Download Our App</h1>
                </div>

                <figure className="w-full mx-3 md:mx-0 flex justify-center relative">

                    <img src={playStore} alt="image" className="max-w-44 absolute bottom-[-30px] mr-[450px] cursor-pointer" />
                    <img src={appStore} alt="image" className="max-w-44 absolute bottom-[-30px] cursor-pointer" />

                    <img src={downloadApp} alt="image" className="mx-auto w-full md:max-w-[80%]" />
                </figure>
            </div>

            <Footer cities={cities} />

        </Frontend>

    );

}
