import Card from "@/Components/Card";
import CustomTopBar from "@/Components/CustomTopBar";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";
import { useEffect, useMemo, useRef, useState } from "react";

import Loading from "@/Components/Loading";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import PrimaryButton from "@/Components/PrimaryButton";
import AdminLayout from "@/Layouts/AdminLayout";
import InputError from "@/Components/InputError";
import JoditEditor from "jodit-react";
import AutoCompleteSelect from "@/Components/AutoCompleteSelect";
import { AutocompleteItem } from "@heroui/react";

export default function Edit({ property, states, cities }) {


    /// for description
    const editor = useRef(null);
    const [content, setContent] = useState('' || property.description);

    /// for loading animation
    const [showLoading, setShowLoading] = useState(false);

    const [cityData, setCityData] = useState(cities || [{ id: '', name: 'No Data Found' }]);
    const onChangeState = (key) => {

        if (key != '' && key != null) {

            setShowLoading(true);
            axios.get(route('admin.property.cities', key))
                .then((response) => {

                    setShowLoading(false);
                    if (response.data.error != '') {

                        toast.error((t) => (

                            <span className="flex">
                                {response.data.error}
                                <button className="text-orange-600 pl-3" onClick={() => toast.dismiss(t.id)}>
                                    Close
                                </button>
                            </span>
                        ));
                    } else {

                        response.data.cities && response.data.cities.length > 0 ? setCityData(response.data.cities) : setCityData([{ id: '', name: 'No Data Found' }]);
                    }
                })
                .catch((error) => {

                    setShowLoading(false);

                    toast.error((t) => (

                        <span className="flex">
                            {error.message}
                            <button className="text-orange-600 pl-3" onClick={() => toast.dismiss(t.id)}>
                                Close
                            </button>
                        </span>
                    ));
                });
        }
    };

    /// insert form setup
    const { data, setData, put, processing, errors, clearErrors } = useForm({

        id: property.id,
        title: property.title,
        description: property.description,
        price: property.price,
        type: property.type,
        status: property.status,
        visibility: property.visibility,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        area: property.area_sqft ? property.area_sqft : '',
        landArea: property.land_sqft ? property.land_sqft : '',
        numberOfFloors: property.numberOfFloors,
        ageOfBuilding: property.ageOfBuilding,
        // ignore country and state
        state: property.city.state.id,
        city: property.city.id,
        address: property.address ? property.address : '',
        googleMapLink: property.location ? property.location : '',
        availability: property.availability
    });

    const [priceDesc ,setPriceDesc] = useState('');

    const submitForm = (e) => {

        e.preventDefault();

        setShowLoading(true);
        put(route('admin.property.update', data.id), {

            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {

                clearErrors();
                setShowLoading(false);
                toast.success((t) => (

                    <span className="flex">
                        Property Updated Successfully.
                        <button className="text-orange-600 pl-3" onClick={() => toast.dismiss(t.id)}>
                            Close
                        </button>
                    </span>
                ));
            },
            onError: () => {

                setShowLoading(false);
            }
        });
    };

    const config = useMemo(() => ({

        readonly: false,
        placeholder: 'Start typing...',
        buttons: [
            'bold', 'italic', 'underline', 'strikethrough',
            '|',
            'ul', 'ol', 'outdent', 'indent',
            '|',
            'font', 'fontsize', 'paragraph',
            '|',
            //'image', 'table', 'link',
            //'|',
            'undo', 'redo', 'hr', 'eraser',
        ],
        showCharsCounter: true,
        showWordsCounter: true,

    }), []);

    useEffect(() => {

        setData('description', content);

    }, [content]);

    useEffect(() => {

        if (data.status == 'sale') {

            setPriceDesc('');
        } else {

            setPriceDesc('- Per Month');
        }

    }, [data.status]);

    return (

        <AdminLayout menuActive={'property'}
            topBar={
                <CustomTopBar title={'Add Property'} _url={route('admin.property.index')}>
                    All Properties
                </CustomTopBar>
            }
        >

            <Head title="Edit Property" />

            <Card>

                <form onSubmit={submitForm} className="mb-10 mt-5">

                    <div className="flex flex-col mb-10">
                        <InputLabel className=" !text-md !text-black" >Title <code className="text-red-700">*</code></InputLabel>
                        <TextInput value={data.title} onChange={(e) => setData('title', e.target.value)} required />

                        {errors.title && <InputError message={errors.title} />}
                    </div>

                    <div className="flex flex-col mb-10">
                        <InputLabel className=" !text-md !text-black" >Description <code className="text-red-700">*</code></InputLabel>
                        <JoditEditor
                            ref={editor}
                            value={content}
                            config={config}
                            tabIndex={1}
                            onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                            onChange={newContent => { }}
                        />

                        {errors.description && <InputError message={errors.description} />}
                    </div>

                    <div className="flex flex-col md:flex-row justify-center items-center">

                        <div className="flex flex-col w-full md:w-1/2 md:mr-5 mb-10">
                            <InputLabel className=" !text-md !text-black" >Status <code className="text-red-700">*</code></InputLabel>
                            <select value={data.status} onChange={(e) => setData('status', e.target.value)} className="rounded-md focus:outline-none  focus:border-primary focus:ring-1 focus:ring-primary" required>
                                <option value="sale">Sale</option>
                                <option value="rent">Rent</option>
                            </select>

                            {errors.status && <InputError message={errors.status} />}
                        </div>

                        <div className="flex flex-col w-full md:w-1/2 mb-10">
                            <InputLabel className=" !text-md !text-black" >Price {priceDesc}<code className="text-red-700">*</code></InputLabel>
                            <TextInput type='number' value={data.price} onChange={(e) => setData('price', e.target.value)} required />

                            {errors.price && <InputError message={errors.price} />}
                        </div>

                    </div>

                    <div className="flex flex-col md:flex-row">

                        <div className="flex flex-col w-full md:w-1/2 md:mr-5 mb-10">
                            <InputLabel className=" !text-md !text-black" >Type <code className="text-red-700">*</code></InputLabel>
                            <select value={data.type} onChange={(e) => setData('type', e.target.value)} className="rounded-md focus:outline-none  focus:border-primary focus:ring-1 focus:ring-primary" required>
                                <option value="home">Home</option>
                                <option value="apartment">Apartment</option>
                                <option value="commercial">Commercial</option>
                                <option value="bungalows">Bungalows</option>
                                <option value="villas">Villas</option>
                            </select>

                            {errors.type && <InputError message={errors.type} />}
                        </div>

                        <div className="flex flex-col w-full md:w-1/2 mb-10">
                            <InputLabel className=" !text-md !text-black" >Visibility <code className="text-red-700">*</code></InputLabel>
                            <select value={data.visibility} onChange={(e) => setData('visibility', e.target.value)} className="rounded-md focus:outline-none  focus:border-primary focus:ring-1 focus:ring-primary" required>
                                <option value="show">Show</option>
                                <option value="hide">Hide</option>
                            </select>

                            {errors.visibility && <InputError message={errors.visibility} />}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row">

                        <div className="flex flex-col w-full md:w-1/2 md:mr-5 mb-10">
                            <InputLabel className=" !text-md !text-black" >Age Of Building <code className="text-red-700">*</code></InputLabel>
                            <select value={data.ageOfBuilding} onChange={(e) => setData('ageOfBuilding', e.target.value)} className="rounded-md focus:outline-none  focus:border-primary focus:ring-1 focus:ring-primary" required>
                                <option value="0">Newly Developed</option>
                                <option value="1">1+</option>
                                <option value="2">2+</option>
                                <option value="5">5+</option>
                                <option value="10">10+</option>
                            </select>

                            {errors.ageOfBuilding && <InputError message={errors.ageOfBuilding} />}
                        </div>

                        <div className="flex flex-col w-full md:w-1/2 mb-10">
                            <InputLabel className=" !text-md !text-black" >Number Of Floors</InputLabel>
                            <TextInput value={data.numberOfFloors} onChange={(e) => setData('numberOfFloors', e.target.value)} type='number' min="0" required />

                            {errors.numberOfFloors && <InputError message={errors.numberOfFloors} />}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row">

                        <div className="flex flex-col w-full md:w-1/2 md:mr-5 mb-10">
                            <InputLabel className=" !text-md !text-black" >Bedrooms <code className="text-red-700">*</code></InputLabel>
                            <TextInput value={data.bedrooms} onChange={(e) => setData('bedrooms', e.target.value)} type='number' min="0" required />
                        </div>

                        <div className="flex flex-col w-full md:w-1/2 mb-10">
                            <InputLabel className=" !text-md !text-black" >Bathrooms <code className="text-red-700">*</code></InputLabel>
                            <TextInput value={data.bathrooms} onChange={(e) => setData('bathrooms', e.target.value)} type='number' min="0" required />

                            {errors.bathrooms && <InputError message={errors.bathrooms} />}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row">

                        <div className="flex flex-col w-full md:w-1/2 md:mr-5 mb-10">
                            <InputLabel className=" !text-md !text-black" >Area - sqft (Property) </InputLabel>
                            <TextInput value={data.area} onChange={(e) => setData('area', e.target.value)} type='number' min="0" />

                            {errors.area && <InputError message={errors.area} />}
                        </div>

                        <div className="flex flex-col w-full md:w-1/2 mb-10">
                            <InputLabel className=" !text-md !text-black" >Land Area - sqft </InputLabel>
                            <TextInput value={data.landArea} onChange={(e) => setData('landArea', e.target.value)} type='number' min="0" />

                            {errors.landArea && <InputError message={errors.landArea} />}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row">


                        <div className="flex flex-col w-full md:mr-3 lg:mr-6 mb-10">

                            <InputLabel className=" !text-md !text-black" >State <code className="text-red-700">*</code></InputLabel>

                            <AutoCompleteSelect title={'State'} onSelectionChange={(key) => onChangeState(key)} defaultSelectedKey={String(data.state)}>

                                {states && states.map((val) => (

                                    <AutocompleteItem
                                        key={val.id}
                                    >

                                        {val.name}
                                    </AutocompleteItem>
                                ))}
                            </AutoCompleteSelect>
                        </div>

                        <div className="flex flex-col w-full mb-10">

                            <InputLabel className=" !text-md !text-black" >City <code className="text-red-700">*</code></InputLabel>

                            <AutoCompleteSelect title={'City'} onSelectionChange={(key) => setData('city', key)} defaultSelectedKey={String(data.city)}>

                                {cityData && cityData.map((val) => (

                                    <AutocompleteItem
                                        key={val.id}
                                    >

                                        {val.name}
                                    </AutocompleteItem>
                                ))}
                            </AutoCompleteSelect>

                            {errors.city && <InputError message={errors.city} />}
                        </div>

                    </div>

                    <div className="flex flex-col md:flex-row">

                        <div className="flex flex-col w-full md:mr-4 lg:mr-7 mb-10">
                            <InputLabel className=" !text-md !text-black" >Address</InputLabel>
                            <TextInput value={data.address} onChange={(e) => setData('address', e.target.value)} />

                            {errors.address && <InputError message={errors.address} />}
                        </div>

                        <div className="flex flex-col w-full mb-10">
                            <InputLabel className=" !text-md !text-black" >Google Map Link</InputLabel>
                            <TextInput value={data.googleMapLink} onChange={(e) => setData('googleMapLink', e.target.value)} />

                            {errors.googleMapLink && <InputError message={errors.googleMapLink} />}
                        </div>
                    </div>

                    <div className="flex flex-col w-full mb-10">
                        <InputLabel className=" !text-md !text-black" >Availability <code className="text-red-700">*</code></InputLabel>
                        <select value={data.availability} onChange={(e) => setData('availability', e.target.value)} className="rounded-md focus:outline-none  focus:border-primary focus:ring-1 focus:ring-primary" required>
                            <option value="available">Available</option>
                            <option value="sold">Sold</option>
                        </select>

                        {errors.availability && <InputError message={errors.availability} />}
                    </div>

                    <div className="flex justify-around mt-5 mb-10">

                        <PrimaryButton disabled={processing} type="submit" className="w-fit">{processing ? 'Processing ...' : 'Update Property'}</PrimaryButton>
                    </div>

                </form>

            </Card>


            <Loading show={showLoading} />
            <Toaster />
        </AdminLayout>

    );

}
