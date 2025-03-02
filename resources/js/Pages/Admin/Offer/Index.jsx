import Card from "@/Components/Card";
import CustomTopBar from "@/Components/CustomTopBar";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import Select from 'react-select';

import React, { useEffect, useState } from 'react';
// Import Swiper React components
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import Loading from "@/Components/Loading";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import LinkDefault from "@/Components/LinkDefault";
import SecondaryButton from "@/Components/SecondaryButton";

export default function Index({ type, offers }) {

    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const [price, setPrice] = useState(offers.price || 0);
    const [offerPresentage, setOfferPresentage] = useState(0);
    const [finalPrice, setFinalPrice] = useState(0);
    const [_offerPresentage, _setOfferPresentage] = useState(0);
    const [_finalPrice, _setFinalPrice] = useState(0);

    /// for loading animation
    const [showLoading, setShowLoading] = useState(false);

    /// for edit form
    const [showEditForm, setShowEditForm] = useState(false);

    //console.log(offers);
    /// insert form
    const { data, setData, post, processing, errors, clearErrors } = useForm({

        id: offers.id, /// property id
        startDate: '',
        endDate: '',
        discount: '',
        type: type
    });

    /// edit form
    const { data: _data, setData: _setData, put, processing: _processing, errors: _errors, clearErrors: _clearErrors } = useForm({

        id: offers.id, /// property id
        offerId: '',
        startDate: '',
        endDate: '',
        discount: '',
        type: type,
        visibility: '',
    });

    /// add form submit
    const submit = (e) => {

        e.preventDefault();
        setShowLoading(true);
        post(route('admin.offer.store'), {

            onSuccess: () => {

                clearErrors();
                setShowLoading(false);
                setData('startDate', '');
                setData('endDate', '');
                setData('discount', 0);
                toast.success((t) => (

                    <span className="flex">
                        Offer Added Successfully.
                        <button className="pl-3 text-orange-600" onClick={() => toast.dismiss(t.id)}>
                            Close
                        </button>
                    </span>
                ));
            },
            onError: () => {

                setShowLoading(false);
            }
        });

    }

    /// edit form submit
    const submitEditForm = (e) => {

        e.preventDefault();

        setShowLoading(true);
        put(route('admin.offer.update', _data.id), {

            onSuccess: () => {

                _clearErrors();
                setShowEditForm(false);
                document.getElementById('addOffer').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                toast.success((t) => (

                    <span className="flex">
                        Offer Updated Successfully.
                        <button className="pl-3 text-orange-600" onClick={() => toast.dismiss(t.id)}>
                            Close
                        </button>
                    </span>
                ));
            },

        });

        setShowLoading(false);

    };

    /// calculate  ,offer
    // useEffect(() => {

    //     const newDiscount = data.discount;
    //     const newPrice = (offers.price).toFixed(2);
    //     const newOfferPresentage = ((newDiscount / newPrice) * 100).toFixed(2);
    //     const newFinalPrice = (newPrice - newDiscount).toFixed(2);

    //     setPrice(newPrice);
    //     setData('discount', newDiscount);
    //     setFinalPrice(newFinalPrice);
    //     setOfferPresentage(newOfferPresentage);

    // }, [priceRate]);

    useEffect(() => {

        const _discount = data.discount;
        const newPrice = offers.price;
        const newOfferPresentage = ((_discount / newPrice) * 100).toFixed(2);
        const newFinalPrice = (newPrice - _discount).toFixed(2);

        setPrice(newPrice);
        setFinalPrice(newFinalPrice);
        setOfferPresentage(newOfferPresentage);

    }, [data.discount]);

    useEffect(() => {

        const _discount = _data.discount;
        const newPrice = offers.price;
        const newOfferPresentage = ((_discount / newPrice) * 100).toFixed(2);
        const newFinalPrice = (newPrice - _discount).toFixed(2);

        setPrice(newPrice);
        _setFinalPrice(newFinalPrice);
        _setOfferPresentage(newOfferPresentage);

    }, [_data.discount]);


    /// scroll
    const scrollToAddOffer = () => {

        const element = document.getElementById('addOffer');

        if (element) {

            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {

            console.error('Element with ID "addOffer" not found.');
        }
    };

    /// fill edit form
    const fillEditForm = (e, offerId) => {

        e.preventDefault();

        setShowLoading(true);
        setShowEditForm(true);

        axios.get(route('admin.offer.show', [offerId]))
            .then((response) => {

                if (response.status == 200) {

                    _setData({
                        'id': offers.id,
                        'type': type,
                        'offerId': response.data.id,
                        'discount': response.data.discount_value,
                        'startDate': response.data.start_date,
                        'endDate': response.data.end_date,
                        'visibility': response.data.visibility
                    });

                    const ele = document.getElementById('editOffer');

                    ele.scrollIntoView({

                        behavior: 'smooth',
                        block: 'start',
                    });


                } else {

                    setShowEditForm(false);
                    toast.error((t) => (

                        <span className="flex">
                            Error Please try again !
                            <button className="pl-3 text-orange-600" onClick={() => toast.dismiss(t.id)}>
                                Close
                            </button>
                        </span>
                    ));
                }
            })
            .catch((error) => {

                setShowEditForm(false);
                toast.error((t) => (

                    <span className="flex">
                        {error.message}
                        <button className="pl-3 text-orange-600" onClick={() => toast.dismiss(t.id)}>
                            Close
                        </button>
                    </span>
                ));
            });

        setShowLoading(false);

    };

    return (

        <AdminLayout menuActive={'property'}
            topBar={
                <CustomTopBar
                    title={'All Offers '}
                    _url={type === 'property' ? route('admin.property.index') : route('admin.land.index')} >
                    All {type === 'property' ? 'Property' : 'Lands'}
                </CustomTopBar>
            }
        >

            <Head title="Offer" />

            <Card>

                <div className="flex flex-col items-center md:flex-row">

                    <code className="ml-5">{offers.title}</code>

                    <div className="flex flex-col ml-auto md:flex-row">
                        <PrimaryButton
                            onClick={scrollToAddOffer}
                            type="button"
                            className="mb-3 ml-4"
                        >
                            Add New Offer
                        </PrimaryButton>
                    </div>
                </div>

                <div className="flex flex-col">

                    <Card className="w-full mt-5 md:w-3/4">

                        <code>Images </code>

                        <Swiper
                            style={{
                                '--swiper-navigation-color': '#fff',
                                '--swiper-pagination-color': '#fff',
                            }}
                            loop={true}
                            spaceBetween={10}
                            navigation={true}
                            thumbs={{ swiper: thumbsSwiper }}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="mySwiper2"
                        >

                            {offers.property_images?.map((image) => (

                                <SwiperSlide key={image.id}>
                                    <img src={image.image_url} />
                                </SwiperSlide>

                            ))}

                            {offers.land_images?.map((image) => (

                                <SwiperSlide key={image.id}>
                                    <img src={image.image_url} />
                                </SwiperSlide>

                            ))}

                        </Swiper>

                        <Swiper
                            onSwiper={setThumbsSwiper}
                            loop={true}
                            spaceBetween={10}
                            slidesPerView={4}
                            freeMode={true}
                            watchSlidesProgress={true}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="mySwiper"
                        >

                            {offers.property_images?.map((image) => (

                                <SwiperSlide key={image.id}>
                                    <img src={image.image_url} />
                                </SwiperSlide>

                            ))}

                            {offers.land_images?.map((image) => (

                                <SwiperSlide key={image.id}>
                                    <img src={image.image_url} />
                                </SwiperSlide>

                            ))}

                        </Swiper>
                    </Card>

                    <Card className="w-full mt-5 md:w-3/4">

                        <code id="addOffer" className="text-secondary">Current Offers</code>

                        <table className="table w-full mt-3 overflow-hidden rounded-md shadow-lg table-auto">
                            <thead className="divide-y divide-slate-800 bg-slate-200">
                                <tr>
                                    <th className="p-2 text-left md:pl-4">#</th>
                                    <th className="p-2 text-left">Start Date</th>
                                    <th className="p-2 text-left">End Date</th>
                                    <th className="p-2 text-left">Discount</th>
                                    <th className="p-2 text-left">Visibility</th>
                                    <th className="p-2 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-300">

                                {offers.offers.map((offer, i) => (

                                    <tr key={i} id={offer.id}>

                                        <td className="p-2">{i + 1}</td>
                                        <td className="p-2">{offer.start_date}</td>
                                        <td className="p-2">{offer.end_date}</td>
                                        <td className="p-2">{offer.discount_value}</td>
                                        <td className="p-2">{new Date(offer.end_date) > new Date() ? offer.visibility : 'Closed'}</td>
                                        <td className="p-2">

                                            {new Date(offer.end_date) > new Date() ? <LinkDefault onClick={(e) => fillEditForm(e, offer.id)} >Edit</LinkDefault> : ''}
                                        </td>
                                    </tr>

                                ))}


                            </tbody>
                        </table>

                        {offers.offers.length == 0 ? <code className="p-5 text-primary">No Data Found</code> : ''}

                    </Card>

                    {/* Add Offer */}
                    <Card className="w-full mt-5 lg:w-3/4">

                        <code className="text-secondary">Add Offer </code>

                        <form onSubmit={submit}>

                            <div className="flex flex-col mt-4 mb-8" >
                                <InputLabel className=" !text-md !text-black" >Start Date <code className="text-red-700">*</code></InputLabel>
                                <TextInput type="date" value={data.startDate} onChange={(e) => setData('startDate', e.target.value)} required />

                                {errors.startDate && <InputError message={errors.startDate} />}
                            </div>

                            <div className="flex flex-col mb-8">
                                <InputLabel className=" !text-md !text-black" >End Date <code className="text-red-700">*</code></InputLabel>
                                <TextInput type="date" value={data.endDate} onChange={(e) => setData('endDate', e.target.value)} required />

                                {errors.endDate && <InputError message={errors.endDate} />}
                            </div>

                            <div className="flex flex-col mb-10">
                                <InputLabel className=" !text-md !text-black" >Discount <code className="text-red-700">*</code></InputLabel>
                                <TextInput type="number" value={data.discount} onChange={(e) => setData('discount', e.target.value)} required />

                                {errors.discount && <InputError message={errors.discount} />}
                            </div>

                            <div className="flex flex-col mb-10">

                                <code>Current Price (LKR) : {price}</code>
                                <code>Offer as % : {offerPresentage != 0 ? offerPresentage : 'Not Yet'}</code>
                                <code>Final Price (LKR) - : {finalPrice != 0 ? finalPrice : price} </code>
                            </div>

                            <div className="flex justify-around mt-5 mb-10">

                                <PrimaryButton disabled={processing} type="submit" className="w-fit">{processing ? 'Processing ...' : 'Add Offer'}</PrimaryButton>
                            </div>
                        </form>
                    </Card>

                    {/* Update Offer */}
                    {showEditForm && <Card className="w-full mt-5 lg:w-3/4">

                        <code className="text-secondary" id="editOffer">Edit Offer </code>

                        <form onSubmit={submitEditForm}>

                            <div className="flex flex-col mt-4 mb-8" >
                                <InputLabel className=" !text-md !text-black" >Start Date <code className="text-red-700">*</code></InputLabel>
                                <TextInput type="date" value={_data.startDate} onChange={(e) => _setData('startDate', e.target.value)} required />

                                {_errors.startDate && <InputError message={_errors.startDate} />}
                            </div>

                            <div className="flex flex-col mb-8">
                                <InputLabel className=" !text-md !text-black" >End Date <code className="text-red-700">*</code></InputLabel>
                                <TextInput type="date" value={_data.endDate} onChange={(e) => _setData('endDate', e.target.value)} required />

                                {_errors.endDate && <InputError message={_errors.endDate} />}
                            </div>

                            <div className="flex flex-col mb-5">
                                <InputLabel value={'Visibility :'} className=" !text-md !text-black" />
                                <select value={_data.visibility} onChange={(e) => _setData('visibility', e.target.value)} className="rounded-md md:w-96 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" required>
                                    <option value="show">Show</option>
                                    <option value="hide">Hide</option>
                                </select>
                                {_errors.visibility && <InputError message={_errors.visibility} />}
                            </div>

                            <div className="flex flex-col mb-10">
                                <InputLabel className=" !text-md !text-black" >Discount ({_data.currency}) <code className="text-red-700">*</code></InputLabel>
                                <TextInput type="number" value={_data.discount} onChange={(e) => _setData('discount', e.target.value)} required />

                                {_errors.discount && <InputError message={_errors.discount} />}
                            </div>

                            <div className="flex flex-col mb-10">

                                <code>Current Price ({_data.currency}) : {price}</code>
                                <code>Offer as % : {_offerPresentage != 0 ? _offerPresentage : 'Not Yet'}</code>
                                <code>Final Price ({_data.currency}) - : {_finalPrice != 0 ? _finalPrice : price} </code>
                            </div>

                            <div className="flex justify-around mt-5 mb-10">

                                <PrimaryButton disabled={_processing} type="submit" className="w-fit">{_processing ? 'Processing ...' : 'Edit Offer'}</PrimaryButton>
                                <SecondaryButton onClick={() => setShowEditForm(false)} disabled={_processing} type="button" className="w-fit">{_processing ? 'Processing ...' : 'Cancel'}</SecondaryButton>
                            </div>
                        </form>
                    </Card>}

                </div>

            </Card>

            <Loading show={showLoading} />
            <Toaster />

        </AdminLayout>

    );

}
