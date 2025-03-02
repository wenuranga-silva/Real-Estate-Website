import React, { useState } from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarMenuToggle,
    NavbarMenuItem,
    NavbarMenu,
    NavbarContent,
    NavbarItem,
    Button,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from "@heroui/react";
import ApplicationLogo from "./ApplicationLogo";
import { Link, usePage } from "@inertiajs/react";
import ProfileDropDown from "./ProfileDropDown";
import BookmarkIcon from "./Icons/BookmarkIcon";
import LogoutIcon from "./Icons/LogoutIcon";


export default function Navigation() {

    const [theme, setTheme] = useState('light');
    const [isMenuOpen, setIsMenuOpen] = useState(false);


    /// get user roles
    const { auth } = usePage().props;
    const userRoles = auth?.user?.roles || []; // Get roles

    const isAdmin = userRoles.some(role => role.name === 'admin') || userRoles.some(role => role.name === 'agent');


    return (
        // <div className="m-2 shadow-lg rounded-md">
        <Navbar isBordered shouldHideOnScroll isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} className="rounded-md shadow-md my-2 mx-auto  max-w-[98%]">
            <NavbarContent className="md:hidden" justify="start">
                <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
            </NavbarContent>

            <NavbarContent className="md:hidden pr-3" justify="center">
                <NavbarBrand>
                    <ApplicationLogo className="h-auto max-w-36 mr-auto" />
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden md:flex gap-4" justify="center">
                <NavbarBrand>

                    <ApplicationLogo className="h-auto max-w-36 mr-auto" />
                </NavbarBrand>

                <NavbarItem>

                    <Link aria-current="home" href={route('search', 'property')} className="text-medium hover:text-primary transition-all ease-in duration-300">
                        Home /Apartments
                    </Link>
                </NavbarItem>
                <NavbarItem isActive >
                    <Link aria-current="page" href={route('search', 'land')} className="text-medium hover:text-primary transition-all ease-in duration-300">
                        Lands
                    </Link>
                </NavbarItem>

                {/* <NavbarItem >
                    <Link aria-current="page" href={route('search', 'land')} className="text-medium hover:text-primary transition-all ease-in duration-300">
                        Post Ads
                    </Link>
                </NavbarItem> */}

            </NavbarContent>

            <NavbarContent justify="end">
                <NavbarItem className={` ${auth.user ? 'hidden' : 'flex'}`}>


                    <Button as={Link} href={route('login')} color="primary" className="min-w-fit rounded-md text-black" variant="flat" >

                        Login
                    </Button>
                </NavbarItem>
                <NavbarItem className={`hidden ${auth.user ? 'hidden' : 'lg:flex'}`}>

                    <Button as={Link} href={route('register')} color="primary" className="min-w-fit rounded-md text-black" variant="flat" >

                        Sign Up
                    </Button>
                </NavbarItem>

                {auth.user && <NavbarItem className="flex">

                    <ProfileDropDown />
                </NavbarItem>}

                {auth.user && <NavbarItem className="flex mr-3">

                    <Link href={route('favourite.index')} className="p-3 shadow-md rounded-full hover:text-white hover:bg-primary hover:shadow-lg duration-200 transition-colors ease-in">

                        <BookmarkIcon width={'1.4em'} height={'1.4em'} />
                    </Link>
                </NavbarItem>}

                <NavbarItem>

                    {/* <Button color="primary" className="min-w-fit rounded-md" variant="flat" onPress={() => theme == 'light' ? setTheme('dark') : setTheme('light')}>

                        {theme == 'light' ? <i className="fa-solid fa-moon text-primary dark:text-white"></i> : <i className="fa-regular fa-sun text-primary dark:text-white"></i>}
                    </Button> */}
                </NavbarItem>
            </NavbarContent>

            <NavbarMenu>

                <NavbarMenuItem key={'profile'} className="mt-5">
                    <Link
                        className="w-full"
                        href={route('profile.edit')}
                        size="lg"
                    >
                        Profile
                    </Link>
                </NavbarMenuItem>

                {isAdmin && <NavbarMenuItem key={'dashboard'} className="mt-4">
                    <Link
                        className="w-full"
                        href={route('admin.cpanel')}
                        size="lg"
                    >
                        Dashboard
                    </Link>
                </NavbarMenuItem>}

                <NavbarMenuItem key={'home'} className="mt-4">
                    <Link
                        className="w-full"
                        href={route('search' ,'property')}
                        size="lg"
                    >
                        Home /Apartments
                    </Link>
                </NavbarMenuItem>

                <NavbarMenuItem key={'land'} className="mt-5">
                    <Link
                        className="w-full"
                        href={route('search' ,'land')}
                        size="lg"
                    >
                        Lands
                    </Link>
                </NavbarMenuItem>

                {/* <NavbarMenuItem key={'ads'} className="mt-5">
                    <Link
                        className="w-full"
                        href={route('search' ,'land')}
                        size="lg"
                    >
                        Post Ads
                    </Link>
                </NavbarMenuItem> */}

                <NavbarMenuItem key={'logout'} className="mt-4 text-danger-500">
                    <Link
                        href={route('logout')}
                        method="post"
                        className="flex"
                        size={'lg'}
                    >

                        <LogoutIcon width={'1.3em'} height={'1.3em'} />
                        <span>Logout</span>
                    </Link>
                </NavbarMenuItem>

            </NavbarMenu>
        </Navbar>
        // </div>
    );
}



// import { Link } from "@inertiajs/react";
// import ApplicationLogo from "./ApplicationLogo";
// import { useEffect, useState } from "react";
// import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'


// export default function Navigation({ country = null, currency = null }) {

//     const [theme, setTheme] = useState('light');
//     const [isOpenNav, setIsOpenNav] = useState(false);


//     useEffect(() => {

//         if (theme == 'dark') {

//             document.documentElement.classList.add('dark');
//             document.documentElement.classList.remove('light');
//         } else {

//             document.documentElement.classList.add('light');
//             document.documentElement.classList.remove('dark');
//         }

//     }, [theme]);

//     return (

//         <div className="flex items-center px-3 py-1 mx-3 my-1 bg-white rounded-md shadow-md md:mx-4 dark:bg-black/70">

//             <ApplicationLogo className="h-auto max-w-36 mr-auto" />

//             <nav className="flex mx-auto">

//                 <Link href="" className={`px-2 py-1 ml-1 rounded-md navLink text-blck dark:text-white ${route().current('home') ? ' navActive' : ' '}`}>
//                     Home
//                 </Link>


//                 <Popover>
//                     <PopoverButton className="px-2 py-1 ml-1 rounded-md navLink text-blck dark:text-white">
//                         Services
//                         <i className="pl-2 fa-solid fa-chevron-down"></i>
//                     </PopoverButton>
//                     <PopoverPanel
//                         transition
//                         anchor="bottom"
//                         className="divide-y shadow-lg divide-white/5 rounded-lg bg-slate-50/90 dark:bg-black text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
//                     >
//                         <div className="flex p-3 dark:bg-black">

//                             <div className="mx-3">
//                                 <h2 className="text-lg font-semibold text-primary/50 dark:text-primary">Buy</h2>

//                                 <Link className="block px-3 py-2 font-semibold transition rounded-md hover:shadow-md dark:text-white hover:bg-primary" href="#">
//                                     Home
//                                 </Link>
//                                 <Link className="block px-3 py-2 font-semibold transition rounded-md hover:shadow-md dark:text-white hover:bg-primary" href="#">
//                                     Apartment
//                                 </Link>
//                                 <Link className="block px-3 py-2 font-semibold transition rounded-md hover:shadow-md dark:text-white hover:bg-primary" href="#">
//                                     Land
//                                 </Link>
//                             </div>

//                             <div className="mx-3">
//                                 <h2 className="text-lg font-semibold text-primary/50 dark:text-primary">Rent</h2>

//                                 <Link className="block px-3 py-2 font-semibold transition rounded-md hover:shadow-md dark:text-white hover:bg-primary" href="#">
//                                     Home
//                                 </Link>
//                                 <Link className="block px-3 py-2 font-semibold transition rounded-md hover:shadow-md dark:text-white hover:bg-primary" href="#">
//                                     Apartment
//                                 </Link>
//                                 <Link className="block px-3 py-2 font-semibold transition rounded-md hover:shadow-md dark:text-white hover:bg-primary" href="#">
//                                     Land
//                                 </Link>
//                             </div>

//                             <div className="mx-3">
//                                 <h2 className="text-lg font-semibold text-primary/50 dark:text-primary">Sell</h2>

//                                 <Link className="block px-3 py-2 font-semibold transition rounded-md hover:shadow-md dark:text-white hover:bg-primary" href="#">
//                                     Home
//                                 </Link>
//                                 <Link className="block px-3 py-2 font-semibold transition rounded-md hover:shadow-md dark:text-white hover:bg-primary" href="#">
//                                     Apartment
//                                 </Link>
//                                 <Link className="block px-3 py-2 font-semibold transition rounded-md hover:shadow-md dark:text-white hover:bg-primary" href="#">
//                                     Land
//                                 </Link>
//                             </div>

//                         </div>

//                     </PopoverPanel>
//                 </Popover>

//                 <Link href="" className="px-2 py-1 ml-1 rounded-md navLink text-blck dark:text-white">
//                     Help
//                 </Link>

//                 <Link className="px-2 py-1 ml-1 rounded-md navLink text-blck dark:text-white">
//                     About
//                 </Link>

//                 <Link className="px-2 py-1 ml-1 rounded-md flex items-center text-blck dark:text-white">


//                     <code className="pr-2">{currency.c_code}</code>
//                     <img className="max-w-12" src={country.flag} alt="country" />
//                 </Link>
//             </nav>

//             <div className="ml-auto">

//                 <Link href="" className="px-2 py-1 ml-1 rounded-md navLink text-blck dark:text-white">Login</Link>

//                 <button className="p-2 px-3 ml-2 rounded-md themeIcons" onClick={() => theme == 'light' ? setTheme('dark') : setTheme('light')}>

//                     {theme == 'light' ? <i className="fa-solid fa-moon text-primary dark:text-white"></i> : <i className="fa-regular fa-sun text-primary dark:text-white"></i>}
//                 </button>

//                 <button onClick={() => setIsOpenNav(!isOpenNav)} className="p-2 px-3 ml-8 mr-2 rounded-md md:hidden themeIcons">

//                     {isOpenNav == false ? <i className="fa-solid fa-bars-staggered text-primary dark:text-white"></i> :
//                         <i className="fa-solid fa-xmark text-primary dark:text-white"></i>}
//                 </button>
//             </div>
//         </div>

//     )
// }

