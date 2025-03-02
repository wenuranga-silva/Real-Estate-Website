import Footer from "@/Components/Footer";
import AreaIcon from "@/Components/Icons/AreaIcon";
import HomeIcon from "@/Components/Icons/HomeIcon";
import LandCard from "@/Components/LandCard";
import Loading from "@/Components/Loading";
import Pagination_ from "@/Components/Pagination_";
import PropertyCard from "@/Components/PropertyCard";
import Frontend from "@/Layouts/Frontend";
import { Card, CardBody, Tab, Tabs } from "@heroui/react";
import { Head, router } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Favourite({ cities, properties, lands }) {

    const [pageNumber, setPageNumber] = useState('');
    const [pageNumberLand, setPageNumberLand] = useState('');
    const [showLoading ,setShowLoading] = useState(false);

    /// search functions
    // properties
    const search = () => {

        setShowLoading(true);
        let url = new URL(route('favourite.index'));

        url.searchParams.append('page', pageNumber);

        router.visit(url, {

            only: ['properties'],
            preserveState: true,
            preserveScroll: true,
            onFinish: () => {

                setShowLoading(false);

                window.scrollTo({ top: 30, behavior: 'smooth' });
            }
        });
    }

    useEffect(() => {

        if (pageNumber != '') {

            search();
        }

    }, [pageNumber]);

    // lands
    const searchLands = () => {

        setShowLoading(true);
        let url = new URL(route('favourite.index'));

        url.searchParams.append('page', pageNumberLand);

        router.visit(url, {

            only: ['lands'],
            preserveState: true,
            preserveScroll: true,
            onFinish: () => {

                setShowLoading(false);
                window.scrollTo({ top: 30, behavior: 'smooth' });
            }
        });
    }

    useEffect(() => {

        if (pageNumberLand != '') {

            searchLands();
        }

    }, [pageNumberLand]);

    return (

        <Frontend>

            <Head title="Favourites" />

            <div className="flex w-full flex-col mt-4 mb-5">
                <Tabs
                    aria-label="Options"
                    classNames={{
                        tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                        cursor: "w-full bg-[#008080]",
                        tab: "max-w-fit px-0 h-12",
                        tabContent: "group-data-[selected=true]:text-[#00A36C] text-lg",
                    }}
                    color="primary"
                    variant="underlined"
                >
                    <Tab
                        key="home"
                        title={
                            <div className="flex items-center space-x-2">
                                <HomeIcon />
                                <span>Homes /Apartments</span>
                            </div>
                        }
                    >

                        <Card className="shadow-md">
                            <CardBody>

                                <div className="flex justify-around gap-x-5 gap-y-10 flex-wrap mt-2 mb-10">

                                    {properties && properties.data.map((data, index) => (

                                        <PropertyCard key={index} _property={data.property} />
                                    ))}
                                </div>

                                {<Pagination_ className=" my-12" from={properties.from} to={properties.to} total={properties.total} perPage={16} updatePageNum={(number) => { number ? setPageNumber(number) : '' }} initialPage={pageNumber} />}

                            </CardBody>
                        </Card>
                    </Tab>
                    <Tab
                        key="lands"
                        title={
                            <div className="flex items-center space-x-2">
                                <AreaIcon />
                                <span>Lands</span>
                            </div>
                        }
                    >

                        <Card className="shadow-md">
                            <CardBody>

                                <div className="flex justify-around gap-x-5 gap-y-10 flex-wrap mt-2 mb-10">

                                    {lands && lands.data.map((data, index) => (

                                        <LandCard key={index} _land={data.land} />
                                    ))}
                                </div>

                                {<Pagination_ className=" my-12" from={lands.from} to={lands.to} total={lands.total} perPage={16} updatePageNum={(number) => { number ? setPageNumberLand(number) : '' }} initialPage={pageNumberLand} />}

                            </CardBody>
                        </Card>
                    </Tab>
                </Tabs>
            </div>

            <Footer cities={cities} />
            <Loading show={showLoading} size="lg" />

        </Frontend>
    );

}
