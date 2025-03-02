import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/zoom';

// import required modules
import { Zoom, FreeMode, Navigation, Thumbs } from 'swiper/modules';
import ArrowLeftIcon from './Icons/ArrowLeftIcon';
import ArrowRightIcon from './Icons/ArrowRightIcon';

export default function ImageSlider({ images }) {

    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <div className='!max-w-[95vW] md:!max-w-3xl lg:!max-w-xl shadow-md lg:p-2'>

            <Swiper
                loop={true}
                spaceBetween={10}
                thumbs={{ swiper: thumbsSwiper }}
                lazy={true}
                modules={[ Zoom, FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
                navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                }}
                onBeforeInit={(swiper) => {

                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                }}
            >

                <button ref={prevRef} className="cursor-pointer px-4 py-2 text-lg shadow-md z-50 text-primary rounded-full absolute top-1/2 left-3 translate-y-1/2 bg-white transition-all duration-200 hover:bg-primary/80 hover:text-white">

                    <ArrowLeftIcon width={'1.3em'} height={'1.3em'} /> {/* Left arrow */}
                </button>

                <button ref={nextRef} className="cursor-pointer px-4 py-2 text-lg shadow-md z-50 text-primary rounded-full absolute top-1/2 right-3 translate-y-1/2 bg-white transition-all duration-200 hover:bg-primary/80 hover:text-white">
                    <ArrowRightIcon width={'1.3em'} height={'1.3em'} /> {/* Right arrow */}
                </button>

                {images && images.map((val, index) => (

                    <SwiperSlide key={index}>

                        <div className="swiper-zoom-container">
                            <img src={val.image_url} alt='property image' loading="lazy" />
                        </div>
                        <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                    </SwiperSlide>
                ))}


            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={5}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >

                {images && images.map((val, index) => (

                    <SwiperSlide key={index}>

                        <img src={val.image_url} loading="lazy" className='cursor-pointer' />

                        <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                    </SwiperSlide>
                ))}



            </Swiper>
        </div>
    );
}

