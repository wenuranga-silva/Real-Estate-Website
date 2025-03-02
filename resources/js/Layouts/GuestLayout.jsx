import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import user_img from '../../assets/images/user.png';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';


export default function GuestLayout({ children }) {

    return (
        <div className="flex min-h-screen items-center justify-around bg-gray-100 p-2 pt-6 sm:pt-0 bg-gradient-to-t from-primary to-secondary">

            <div className='w-1/2 md:2/3 p-2 md:p-4 bg-transparent'>

                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 4500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay ,Pagination, Navigation]}
                    className="mySwiper"
                >

                    <SwiperSlide>

                        <div className='mb-12 p-3 bg-white shadow-lg rounded-md relative'>

                            <img src={user_img} alt="user avatar" className='absolute shadow-md rounded-full bottom-[-45px] left-1/2 translate-x-[-50%] z-50 ' />

                            <p className='bg-white first-letter:pl-9 mb-6 mt-3'>
                                The standard chunk of Lorem Ipsum used
                                since the 1500s is reproduced below for
                                those interested. Sections 1.10.32 and
                                1.10.33 from "de Finibus Bonorum et
                                Malorum" by Cicero are also reproduced
                                in their exact original form, accompanied</p>

                            <code className='pr-4 flex justify-end text-primary text-lg italic'>User</code>

                        </div>
                    </SwiperSlide>

                    <SwiperSlide>

                        <div className='p-3 mb-12 bg-white shadow-md rounded-md relative'>

                            <img src={user_img} alt="user avatar" className='absolute shadow-md rounded-full bottom-[-45px] left-1/2 translate-x-[-50%]' />

                            <p className='bg-white first-letter:pl-9 mb-6 mt-3'>The standard chunk of Lorem Ipsum used
                                since the 1500s is reproduced below for
                                those interested. Sections 1.10.32 and
                                1.10.33 from "de Finibus Bonorum et
                                Malorum" by Cicero are also reproduced
                                in their exact original form, accompanied</p>

                            <code className='flex justify-end pr-4 text-primary text-lg italic'>User</code>

                        </div>
                    </SwiperSlide>
                </Swiper>

            </div>

            <div className="m-2 w-full flex flex-col  overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md md:max-w-sm lg:max-w-md sm:rounded-lg">

                <div className='mx-auto mb-6'>
                    <Link href="/">
                        <ApplicationLogo className="logo_max" />
                    </Link>
                </div>

                {children}
            </div>
        </div>
    );
}
