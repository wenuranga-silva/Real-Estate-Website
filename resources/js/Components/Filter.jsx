'use client'

import { useEffect, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, Select, TransitionChild } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import InputLabel from './InputLabel';
import TextInput from './TextInput';
import clsx from 'clsx'

export default function Filter({ show = false, closeFun, updateFilter, filterOptions, reset, save ,resetPageNumber}) {

    const [open, setOpen] = useState(false);

    useEffect(() => {

        setOpen(show);
    }, [show]);

    const closePanel = () => {

        setOpen(false);
        closeFun();
    }

    /// save and seach
    const saveOptions = () => {

        closePanel();
        save();
        resetPageNumber();
    }

    // update filter options
    const handleChange = (key, value) => {

        updateFilter(key, value);
    }

    // clear filter options
    const resetFilterOptions = () => {

        reset()
    }

    return (
        <Dialog open={open} onClose={closePanel} className="relative z-50">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
            />

            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <DialogPanel
                            transition
                            className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
                        >
                            <TransitionChild>
                                <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 duration-500 ease-in-out data-[closed]:opacity-0 sm:-ml-10 sm:pr-4">
                                    <button
                                        type="button"
                                        onClick={() => closePanel()}
                                        className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                    >
                                        <span className="absolute -inset-2.5" />
                                        <span className="sr-only">Close panel</span>
                                        <XMarkIcon aria-hidden="true" className="size-6" />
                                    </button>
                                </div>
                            </TransitionChild>
                            <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                <div className="px-4 sm:px-6 shadow-md pb-3">
                                    <DialogTitle className=" text-lg font-_Lato text-gray-900">{filterOptions.keyType == 'property' ? 'Home /Apartment' : 'Land'}</DialogTitle>

                                    <div className="flex justify-end">

                                        <button className="py-2 px-3 rounded-md shadow-slate-500/30 shadow-md my-1 transition duration-200  bg-primary z-30 text-white hover:shadow-lg" onClick={() => saveOptions()}>
                                            Save
                                        </button>

                                        <button className="py-2 mx-5 px-3 rounded-md shadow-slate-500/30 shadow-md my-1 z-30 transition duration-200 text-orange-600 hover:shadow-lg" onClick={() => resetFilterOptions()}>
                                            Reset
                                        </button>
                                    </div>
                                </div>
                                <div className="relative mt-6 flex-1 sm:px-6">

                                    <div className='flex justify-around md:mx-4 pb-5'>

                                        <button className={` w-1/2 py-2 mx-2 px-3 rounded-md shadow-slate-500/30 shadow-md my-1 transition duration-200 z-30 hover:shadow-lg font-_Lato ${filterOptions.keyType == 'property' ? ' bg-primary text-white ' : 'text-black'}`} onClick={() => handleChange('keyType', 'property')}>
                                            Home /Apartment
                                        </button>

                                        <button className={` w-1/2 py-2 mx-2 px-3 rounded-md shadow-slate-500/30 shadow-md my-1 z-30 transition duration-200 hover:shadow-lg font-_Lato ${filterOptions.keyType == 'land' ? ' bg-primary text-white ' : 'text-black'}`} onClick={() => handleChange('keyType', 'land')}>
                                            Land
                                        </button>
                                    </div>

                                    {filterOptions.keyType == 'property' && <div className='bg-slate-100/90 shadow-md rounded-md'>

                                        <div className="flex flex-col w-full p-1">

                                            <InputLabel className=" !text-md !text-black mb-1 mt-2" >
                                                Type
                                            </InputLabel>

                                            <Select
                                                value={filterOptions.propertyType}
                                                onChange={(e) => handleChange('propertyType', e.target.value)}
                                                className={clsx(
                                                    'mt-2 mb-6 block w-full cursor-pointer appearance-none rounded-md border-none bg-white dark:bg-slate-200/50 py-1.5 px-3 text-sm/6 text-black dark:text-white',
                                                    'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary/25',
                                                    '*:text-black'
                                                )}
                                            >
                                                <option value="any">Any</option>
                                                <option value="home">Home</option>
                                                <option value="apartment">Apartment</option>
                                                <option value="commercial">Commercial</option>
                                                <option value="bungalows">Bungalows</option>
                                                <option value="villas">Villas</option>
                                            </Select>

                                            <InputLabel className=" !text-md !text-black mb-1 mt-2" >
                                                Status
                                            </InputLabel>

                                            <Select
                                                value={filterOptions.propertyStatus}
                                                onChange={(e) => handleChange('propertyStatus', e.target.value)}
                                                className={clsx(
                                                    'mt-2 mb-6 block w-full cursor-pointer appearance-none rounded-md border-none bg-white dark:bg-slate-200/50 py-1.5 px-3 text-sm/6 text-black dark:text-white',
                                                    'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary/25',
                                                    '*:text-black'
                                                )}
                                            >
                                                <option value="any">Any</option>
                                                <option value="sale">Sales</option>
                                                <option value="rent">Rentals</option>
                                            </Select>

                                            <InputLabel className=" !text-md !text-black flex" >
                                                Bedrooms
                                            </InputLabel>

                                            <Select
                                                value={filterOptions.propertyBedRooms}
                                                onChange={(e) => handleChange('propertyBedRooms', e.target.value)}
                                                className={clsx(
                                                    'mt-2 mb-4 block w-full cursor-pointer appearance-none rounded-md border-none bg-white dark:bg-slate-200/50 py-1.5 px-3 text-sm/6 text-black dark:text-white',
                                                    'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary/25',
                                                    '*:text-black'
                                                )}
                                            >
                                                <option value="any">Any</option>
                                                <option value="2">2+ Rooms</option>
                                                <option value="3">3+ Rooms</option>
                                                <option value="4">4+ Rooms</option>
                                            </Select>

                                            <InputLabel className=" !text-md !text-black" >
                                                Area
                                            </InputLabel>

                                            <Select
                                                value={filterOptions.propertyArea}
                                                onChange={(e) => handleChange('propertyArea', e.target.value)}
                                                className={clsx(
                                                    'mt-2 mb-4 block w-full cursor-pointer appearance-none rounded-md border-none bg-white dark:bg-slate-200/50 py-1.5 px-3 text-sm/6 text-black dark:text-white',
                                                    'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary/25',
                                                    '*:text-black'
                                                )}
                                            >
                                                <option value="any">Any</option>
                                                <option value="small">Small (800-1200 sqft)</option>
                                                <option value="medium">Medium (1201-2000 sqft)</option>
                                                <option value="large">Large (2001  sqft)</option>
                                            </Select>

                                            <InputLabel className=" !text-md !text-black mb-1 mt-2" >
                                                Min Price
                                            </InputLabel>

                                            <TextInput value={filterOptions.minPrice} onChange={(e) => handleChange('minPrice', e.target.value)} type='number' min='0' className="mb-4 border-none" required />

                                            <InputLabel className=" !text-md !text-black mb-1 mt-2" >
                                                Max Price
                                            </InputLabel>

                                            <TextInput value={filterOptions.maxPrice} onChange={(e) => handleChange('maxPrice', e.target.value)} type='number' min='0' className="mb-4 border-none" required />

                                        </div>
                                    </div>}

                                    {filterOptions.keyType == 'land' && <div className='bg-slate-100/90 shadow-md rounded-md'>

                                        <div className="flex flex-col w-full p-1">

                                            <InputLabel className=" !text-md !text-black mb-1 mt-2" >
                                                Type
                                            </InputLabel>

                                            <Select
                                                value={filterOptions.landType}
                                                onChange={(e) => handleChange('landType', e.target.value)}
                                                className={clsx(
                                                    'mt-2 mb-4 block w-full cursor-pointer appearance-none rounded-md border-none bg-white dark:bg-slate-200/50 py-1.5 px-3 text-sm/6 text-black dark:text-white',
                                                    'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary/25',
                                                    '*:text-black'
                                                )}
                                            >
                                                <option value="any">Any</option>
                                                <option value="residential">Residential</option>
                                                <option value="commercial">Commercial</option>
                                                <option value="agricultural">Agricultural</option>
                                                <option value="industrial">Industrial</option>
                                            </Select>

                                            <InputLabel className=" !text-md !text-black mb-1 mt-2" >
                                                Area
                                            </InputLabel>

                                            <Select
                                                value={filterOptions.landArea}
                                                onChange={(e) => handleChange('landArea', e.target.value)}
                                                className={clsx(
                                                    'mt-2 mb-4 block w-full cursor-pointer appearance-none rounded-md border-none bg-white dark:bg-slate-200/50 py-1.5 px-3 text-sm/6 text-black dark:text-white',
                                                    'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary/25',
                                                    '*:text-black'
                                                )}
                                            >
                                                <option value="any">Any</option>
                                                <option value="small">10+ Perches</option>
                                                <option value="medium">20+ Perches</option>
                                                <option value="large">30+ Perches</option>
                                            </Select>

                                            <InputLabel className=" !text-md !text-black mb-1 mt-2" >
                                                Min Price
                                            </InputLabel>

                                            <TextInput value={filterOptions.minPrice} onChange={(e) => handleChange('minPrice', e.target.value)} type='number' min='0' className="mb-4 border-none" required />

                                            <InputLabel className=" !text-md !text-black mb-1 mt-2" >
                                                Max Price
                                            </InputLabel>

                                            <TextInput value={filterOptions.maxPrice} onChange={(e) => handleChange('maxPrice', e.target.value)} type='number' min='0' className="mb-4 border-none" required />

                                        </div>
                                    </div>}
                                </div>


                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </div>
        </Dialog>
    )
}
