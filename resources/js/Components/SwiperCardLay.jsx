import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';
import { useRef } from "react";
import PropertyCard from './PropertyCard';
import LandCard from './LandCard';
import ArrowLeftIcon from './Icons/ArrowLeftIcon';
import ArrowRightIcon from './Icons/ArrowRightIcon';

export default function SwiperCardLay({ cardData, type }) {

    const prevRef1 = useRef(null);
    const nextRef1 = useRef(null);

    return (

        <Swiper
            navigation={{
                prevEl: prevRef1.current,
                nextEl: nextRef1.current,
            }}
            onBeforeInit={(swiper) => {

                swiper.params.navigation.prevEl = prevRef1.current;
                swiper.params.navigation.nextEl = nextRef1.current;
            }} modules={[Navigation]} slidesPerView={'auto'}

            spaceBetween={30} className="mySwiper !max-w-full">

            <button ref={prevRef1} className="cursor-pointer px-4 py-2 text-lg shadow-md z-50 text-primary rounded-full absolute top-1/2 left-3 translate-y-1/2 bg-white transition-all duration-200 hover:bg-primary/80 hover:text-white">

                <ArrowLeftIcon width={'1.3em'} height={'1.3em'}/> {/* Left arrow */}
            </button>

            <button ref={nextRef1} className="cursor-pointer px-4 py-2 text-lg shadow-md z-50 text-primary rounded-full absolute top-1/2 right-3 translate-y-1/2 bg-white transition-all duration-200 hover:bg-primary/80 hover:text-white">
                <ArrowRightIcon width={'1.3em'} height={'1.3em'}/> {/* Right arrow */}
            </button>

            {type === 'property' && cardData.map((data, index) => (

                <SwiperSlide key={index} className="!w-auto mb-4">

                    <PropertyCard _property={data} />
                </SwiperSlide>

            ))}

            {type === 'land' && cardData.map((data, index) => (

                <SwiperSlide key={index} className="!w-auto mb-4">

                    <LandCard _land={data} />
                </SwiperSlide>

            ))}

        </Swiper>

    );

}
