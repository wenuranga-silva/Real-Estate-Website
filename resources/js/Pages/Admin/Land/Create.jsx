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
import SecondaryButton from "@/Components/SecondaryButton";
import AdminLayout from "@/Layouts/AdminLayout";
import InputError from "@/Components/InputError";
import JoditEditor from 'jodit-react';
import AutoCompleteSelect from "@/Components/AutoCompleteSelect";
import { AutocompleteItem } from "@heroui/react";


export default function Create({ states }) {


    /// for description
    const editor = useRef(null);
    const [content, setContent] = useState('');

    /// for loading animation
    const [showLoading, setShowLoading] = useState(false);

    /// for select dropdowns
    const [cities, setCities] = useState([{ id: '', name: 'Select State First' }]);

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

                        response.data.cities && response.data.cities.length > 0 ? setCities(response.data.cities) : setCities([{ id: '', name: 'No Data Found' }]);
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

    /// insert form setup
    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({

        title: '',
        description: '',
        price: '',
        type: 'industrial',
        visibility: 'show',
        area: '',
        // ignore state
        state: '',
        city: '',
        googleMapLink: '',
    });

    const submitForm = (e) => {

        e.preventDefault();

        setShowLoading(true);
        post(route('admin.land.store'), {

            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {

                clearErrors();
                reset();
                setContent('');
                setCities([{ id: '', name: 'Select State First' }]);
                setShowLoading(false);
                toast.success((t) => (

                    <span className="flex">
                        Land Added Successfully.
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


    return (

        <AdminLayout menuActive={'property'}
            topBar={
                <CustomTopBar title={'Add Land'} _url={route('admin.land.index')}>
                    All Lands
                </CustomTopBar>
            }
        >

            <Head title="Lands" />

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
                            <InputLabel className=" !text-md !text-black" >Area Sqft</InputLabel>
                            <TextInput value={data.area} onChange={(e) => setData('area', e.target.value)} type='number' />

                            {errors.area && <InputError message={errors.area} />}
                        </div>

                        <div className="flex flex-col w-full md:w-1/2 mb-10">
                            <InputLabel className=" !text-md !text-black" >Price (Total) <code className="text-red-700">*</code></InputLabel>
                            <TextInput type='number' value={data.price} onChange={(e) => setData('price', e.target.value)} required />

                            {errors.price && <InputError message={errors.price} />}
                        </div>

                    </div>

                    <div className="flex flex-col md:flex-row">

                        <div className="flex flex-col w-full md:mr-4 lg:mr-7 mb-10">
                            <InputLabel className=" !text-md !text-black" >Type <code className="text-red-700">*</code></InputLabel>
                            <select value={data.type} onChange={(e) => setData('type', e.target.value)} className="rounded-md focus:outline-none  focus:border-primary focus:ring-1 focus:ring-primary" required>
                                <option value="industrial">Industrial</option>
                                <option value="commercial">Commercial</option>
                                <option value="agricultural">Agricultural</option>
                                <option value="residential">Residential</option>
                            </select>

                            {errors.type && <InputError message={errors.type} />}
                        </div>

                        <div className="flex flex-col w-full mb-10">
                            <InputLabel className=" !text-md !text-black" >Visibility <code className="text-red-700">*</code></InputLabel>
                            <select value={data.visibility} onChange={(e) => setData('visibility', e.target.value)} className="rounded-md focus:outline-none  focus:border-primary focus:ring-1 focus:ring-primary" required>
                                <option value="show">Show</option>
                                <option value="hide">Hide</option>
                            </select>

                            {errors.visibility && <InputError message={errors.visibility} />}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row">

                        <div className="flex flex-col w-full md:mr-3 lg:mr-6 mb-10">

                            <InputLabel className=" !text-md !text-black" >State <code className="text-red-700">*</code></InputLabel>
                            <AutoCompleteSelect title={'State'} onSelectionChange={(key) => onChangeState(key)}>

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
                            <AutoCompleteSelect title={'City'} onSelectionChange={(key) => setData('city', key)} >

                                {cities && cities.map((val) => (

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

                        <div className="flex flex-col w-full mb-10">
                            <InputLabel className=" !text-md !text-black" >Google Map Link</InputLabel>
                            <TextInput value={data.googleMapLink} onChange={(e) => setData('googleMapLink', e.target.value)} />

                            {errors.googleMapLink && <InputError message={errors.googleMapLink} />}
                        </div>
                    </div>

                    <div className="flex justify-around mt-5 mb-10">

                        <PrimaryButton disabled={processing} type="submit" className="w-fit">{processing ? 'Processing ...' : 'Add Land'}</PrimaryButton>
                        <SecondaryButton disabled={processing} onClick={() => reset()} className="w-fit">Reset</SecondaryButton>

                    </div>

                </form>

            </Card>


            <Loading show={showLoading} />
            <Toaster />
        </AdminLayout>

    );

}
