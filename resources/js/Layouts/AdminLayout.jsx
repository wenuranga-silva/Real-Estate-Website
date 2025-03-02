import ApplicationLogo from "@/Components/ApplicationLogo";
import ArrowDownIcon from "@/Components/Icons/ArrowDownIcon";
import ArrowLeftIcon from "@/Components/Icons/ArrowLeftIcon";
import ArrowRightIcon from "@/Components/Icons/ArrowRightIcon";
import DashboardIcon from "@/Components/Icons/DashboardIcon";
import HomeIcon from "@/Components/Icons/HomeIcon";
import MapIcon from "@/Components/Icons/MapIcon";
import PermissionIcon from "@/Components/Icons/PermissionIcon";
import NavLinkSide from "@/Components/NavLinkSide";
import ProfileDropDown from "@/Components/ProfileDropDown";
import { Button } from "@heroui/react";
import { usePage } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";


export default function AdminLayout({ menuActive = '', topBar = '', children }) {


    /// set sub menu state
    const [activeSubMenu, setActiveSubMenu] = useState(null || menuActive);

    // set main menu show hide
    const [menuOpen, setMenuOpen] = useState(true);

    // menu toggle icon & function

    const toggleSubMenu = (key, e) => {

        e.preventDefault();
        setActiveSubMenu((prevActiveSubMenu) => (prevActiveSubMenu === key ? null : key));
    };

    const toggleMenu = () => {

        setMenuOpen(!menuOpen);
    };

    /// handle menu open close according to the device width
    useEffect(() => {

        const handleResize = () => {

            if (window.innerWidth < 768) {

                setMenuOpen(false);
            } else {

                setMenuOpen(true);
            }
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {

            window.removeEventListener("resize", handleResize);
        };

    }, []);

    /// get user roles
    const { auth } = usePage().props;
    const isAdmin = auth.user.roles.some(role => role.name === 'admin');

    return (

        <div className="w-full flex h-screen !overflow-hidden">

            <div className={`relative h-screen w-[260px] p-2 flex-col shadow-lg overflow-y-auto transition-all duration-500 ease-in ${menuOpen ? 'flex' : 'hidden'}`}>

                <ApplicationLogo className='w-[200px]' />

                <hr className="my-2" />

                <nav>

                    <div className="menu">
                        <code className="mb-2 text-secondary">General</code>

                        <ul className="w-full">
                            {/* <li className="w-full">
                                <NavLinkSide active={route().current('admin.cpanel')} href={route('admin.cpanel')}>
                                    <DashboardIcon width={'1.3em'} height={'1.3em'} className={'mr-3'}/>
                                    <span>Dashboard</span>
                                </NavLinkSide>
                            </li> */}

                            <li className="w-full" >
                                <NavLinkSide active={route().current('admin.property*') || route().current('admin.land*') || route().current('admin.amenitie*')} onClick={(e) => toggleSubMenu('property', e)}>
                                    <HomeIcon width={'1.3em'} height={'1.3em'} className={' mr-2'} />
                                    <span>Property</span>
                                    <ArrowDownIcon width={'1.3em'} height={'1.3em'} className={' ml-auto'} />
                                </NavLinkSide>

                                <ul className={`w-full pl-4 pr-2 ${activeSubMenu === 'property' ? ' block' : ' hidden'}`}>
                                    <li>
                                        <NavLinkSide active={route().current('admin.property*')} href={route('admin.property.index')}>
                                            <span>Home - Apartment</span>
                                        </NavLinkSide>
                                    </li>

                                    <li>
                                        <NavLinkSide active={route().current('admin.land*')} href={route('admin.land.index')}>
                                            <span>Lands</span>
                                        </NavLinkSide>
                                    </li>

                                    {isAdmin && <li>
                                        <NavLinkSide active={route().current('admin.amenitie.*')} href={route('admin.amenitie.index')}>
                                            <span>Amenitie</span>
                                        </NavLinkSide>
                                    </li>}
                                </ul>
                            </li>

                            {isAdmin && <li className="w-full" >
                                <NavLinkSide active={route().current('admin.state.*') || route().current('admin.city.*')} onClick={(e) => toggleSubMenu('location', e)}>
                                    <MapIcon width={'1.3em'} height={'1.3em'} className={' mr-2'} />
                                    <span>Location</span>
                                    <ArrowDownIcon width={'1.3em'} height={'1.3em'} className={' ml-auto'} />
                                </NavLinkSide>

                                <ul className={`w-full pl-4 pr-2 ${activeSubMenu === 'location' ? ' block' : ' hidden'}`}>

                                    <li>
                                        <NavLinkSide active={route().current('admin.state.*')} href={route('admin.state.index')}>
                                            <span>State</span>
                                        </NavLinkSide>
                                    </li>

                                    <li>
                                        <NavLinkSide active={route().current('admin.city.*')} href={route('admin.city.index')}>
                                            <span>City</span>
                                        </NavLinkSide>
                                    </li>

                                </ul>
                            </li>}

                            {isAdmin && <li className="w-full">
                                <NavLinkSide active={route().current('admin.cpanel')} href={route('admin.cpanel')}>
                                    <PermissionIcon width={'1.3em'} height={'1.3em'} className={'mr-3'} />
                                    <span>Permissions</span>
                                </NavLinkSide>
                            </li>}

                            {route().current('admin.offer.*') && <li className="w-full">
                                <NavLinkSide active={true} href={''}>
                                    <DashboardIcon width={'1.3em'} height={'1.3em'} className={' mr-2'} />
                                    <span>Offers</span>
                                </NavLinkSide>
                            </li>}
                        </ul>
                    </div>

                </nav>

                <div className="pt-10 mt-auto ml-4 mb-4">

                    <hr className="mb-5" />

                    <ProfileDropDown />


                </div>

            </div>

            <main className={`w-full overflow-y-auto transition-all duration-500 ease-in `}>

                <div className="flex items-center p-2 shadow-md topBar">

                    <Button onPress={() => toggleMenu()} className="min-w-3 bg-slate-200 shadow-md hover:bg-primary hover:text-white !outline-none rounded-md transition-all duration-300 ease-in">

                        <ArrowLeftIcon width={'1.7em'} height={'1.7em'} className={` ${menuOpen ? 'block' : 'hidden'}`} />
                        <ArrowRightIcon width={'1.7em'} height={'1.7em'} className={` ${!menuOpen ? 'block' : 'hidden'}`} />
                    </Button>

                    {topBar}

                </div>

                {children}

            </main>
        </div>

    );

}
