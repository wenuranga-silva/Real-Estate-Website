import { Link } from "@inertiajs/react";

import ApplicationLogo from "@/Components/ApplicationLogo";
import playStore from '../../assets/images/playstore.svg';
import appStore from '../../assets/images/appstore.svg';
import FaceBookIcon from "./Icons/FaceBookIcon";
import TwitterIcon from "./Icons/TwitterIcon";
import YoutubeIcon from "./Icons/YoutubeIcon";
import InstagramIcon from "./Icons/InstagramIcon";

export default function Footer({cities}) {

    return (

        <footer className="flex flex-col shadow-black shadow-2xl bg-slate-50 px-10 pb-10 md:flex-row md:justify-between mt-8 pt-7">

            <div className="flex flex-col mx-auto items-start w-full md:max-w-1/3">

                <h1 className="font-_Lato bg-gradient-to-bl via-primary from-tertiary to-secondary text-lg text-transparent bg-clip-text font-semibold mb-4 text-center">Quick Links</h1>

                <div className="flex items-start">

                    <div className="flex flex-col justify-start">
                        <Link className="px-2 py-1 ml-1 text-black hover:text-primary dark:text-white">Home</Link>
                        <Link className="px-2 py-1 ml-1 text-black hover:text-primary dark:text-white">Apartments</Link>
                        <Link className="px-2 py-1 ml-1 text-black hover:text-primary dark:text-white">Land</Link>
                        <Link className="px-2 py-1 ml-1 text-black hover:text-primary dark:text-white">About</Link>
                        <Link className="px-2 py-1 ml-1 text-black hover:text-primary dark:text-white">Add AD</Link>
                        <Link className="px-2 py-1 ml-1 text-black hover:text-primary dark:text-white">Terms and Conditions</Link>
                        <Link className="px-2 py-1 ml-1 text-black hover:text-primary dark:text-white">Privacy Policy</Link>
                    </div>

                    <div className="flex flex-col ml-8">

                        <h1 className="font-_Lato bg-gradient-to-bl via-primary from-tertiary to-secondary text-lg text-transparent bg-clip-text font-semibold mb-4 text-center">Follow Us On </h1>

                        <div className="flex flex-col items-center">

                            <Link className="text-[#1877F2] hover:text-primary duration-100 ease mb-5">
                                <FaceBookIcon width={'1.5em'} height={'1.5em'} className={' hover:w-[1.65em] hover:h-[1.65em] duration-100 ease'}/>
                            </Link>

                            <Link className="text-[#08a0e9] hover:text-primary duration-100 ease mb-5">
                                <TwitterIcon width={'1.5em'} height={'1.5em'} className={' hover:w-[1.65em] hover:h-[1.65em] duration-100 ease'}/>
                            </Link>

                            <Link className="text-[#FF0000] hover:text-primary duration-100 ease mb-5">
                                <YoutubeIcon width={'1.5em'} height={'1.5em'} className={' hover:w-[1.65em] hover:h-[1.65em] duration-100 ease '}/>
                            </Link>

                            <Link className="text-[#833AB4] hover:text-primary duration-100 ease mb-5">
                                <InstagramIcon width={'1.5em'} height={'1.5em'} className={' hover:w-[1.65em] hover:h-[1.65em] duration-100 ease '}/>
                            </Link>
                        </div>

                    </div>
                </div>

            </div>

            <div className="flex flex-col mx-auto items-start w-full md:max-w-1/3 md:ml-3">

                <h1 className="font-_Lato bg-gradient-to-bl via-primary from-tertiary to-secondary text-lg text-transparent bg-clip-text font-semibold mb-4 text-center">Top Cities</h1>

                <div className="grid grid-cols-2 gap-4">

                    {cities.map((city, index) => (

                        <Link key={index} className="px-2 py-1 ml-1 text-black hover:text-primary dark:text-white">

                            {city.name}
                        </Link>
                    ))}
                </div>

            </div>

            <div className="flex flex-col mx-auto items-start w-full md:max-w-1/3 md:ml-3 relative">

                <ApplicationLogo className="max-w-72 mx-auto" />

                <img src={playStore} alt="image" className="max-w-44 absolute bottom-[-30px] left-[200px] cursor-pointer" />
                <img src={appStore} alt="image" className="max-w-44 absolute bottom-[-30px] cursor-pointer" />
            </div>
        </footer>
    );

}
