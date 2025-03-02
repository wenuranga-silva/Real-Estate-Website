import Card from "@/Components/Card";
import CustomTopBar from "@/Components/CustomTopBar";
import { DeleteIcon } from "@/Components/Icons/DeleteIcon";
import InputError from "@/Components/InputError";
import Loading from "@/Components/Loading";
import PrimaryButton from "@/Components/PrimaryButton";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router, useForm } from "@inertiajs/react";
import { useState } from "react";
import { useDropzone } from 'react-dropzone';
import toast, { Toaster } from "react-hot-toast";

export default function Index({ land }) {

    /// for loading animation
    const [showLoading, setShowLoading] = useState(false);

    /// drag & drop images
    const [displayFiles, setDisplayFiles] = useState([]);
    const {
        acceptedFiles,
        fileRejections,
        getRootProps,
        getInputProps
    } = useDropzone({
        accept: {
            'image/jpeg': [],
            'image/png': [],
            'image/webp': [],
            'image/jpg': [],
        },
        maxSize: 2000000,
        onDrop: (acceptedFiles) => {

            setData('files', [...acceptedFiles]);
            setDisplayFiles([...acceptedFiles]);
        },
    });

    const acceptedFileItems = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    const fileRejectionItems = fileRejections.map(({ file, errors }) => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
            <ul>
                {errors.map(e => (
                    <li key={e.code}>{e.message}</li>
                ))}
            </ul>
        </li>
    ));

    /// insert form setup
    const { data, setData, post, processing, errors, clearErrors } = useForm({

        landID: land.id,
        files: []
    });

    const submitForm = (e) => {

        e.preventDefault();

        setShowLoading(true);
        post(route('admin.landImages.store'), {

            onSuccess: () => {

                setDisplayFiles([]);
                setData('files', []);
                clearErrors();
                setShowLoading(false);

                toast.success((t) => (

                    <span className="flex">
                        Image Added Successfully.
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

    /// delete images
    const submitDelete = (e, imageId) => {

        e.preventDefault();

        const userConfirmation = confirm("Do you want to DELETE ?");

        if (!userConfirmation) {

            return;
        }

        setShowLoading(true);
        router.delete(route('admin.landImages.destroy' ,imageId), {

            onSuccess: () => {

                setShowLoading(false);

                toast.success((t) => (

                    <span className="flex">
                        Image Deleted Successfully.
                        <button className="text-orange-600 pl-3" onClick={() => toast.dismiss(t.id)}>
                            Close
                        </button>
                    </span>
                ));

            },
            onError: () => {

                setShowLoading(false);
                toast.error((t) => (

                    <span className="flex">
                        Failed ! Please Try Again.
                        <button className="text-orange-600 pl-3" onClick={() => toast.dismiss(t.id)}>
                            Close
                        </button>
                    </span>
                ));

            }
        });

    };


    return (

        <AdminLayout menuActive={'property'}
            topBar={
                <CustomTopBar title={'Land - Images'} _url={route('admin.land.index')}>
                    All Lands
                </CustomTopBar>
            }
        >

            <Head title="Land" />

            <Card className="p-2 md:p-4">

                <form onSubmit={submitForm} className="mb-10 mt-5">

                    <div className="container flex flex-col items-center border-dashed border-2 border-primary rounded-md p-4 mb-10">
                        <div
                            {...getRootProps({
                                className: 'dropzone cursor-pointer bg-white shadow-md hover:bg-gray-100 p-6 rounded-md w-full text-center',
                            })}
                        >
                            <input {...getInputProps()} />
                            <p className="text-gray-600">Drag 'n' drop images (.webp, .png, .jpg ,.jpeg) here, or click to select files</p>
                        </div>
                        <aside className="mt-4 w-full">
                            <h4 className="font-semibold">Images</h4>
                            <ul>{displayFiles.length > 0 ? acceptedFileItems : <code>No Images !</code>}</ul>
                            <h4>{fileRejectionItems.length > 0 ? 'Rejected files' : ''}</h4>
                            <ul>{fileRejectionItems}</ul>
                        </aside>

                        {errors.files && <InputError message={errors.files} className=" !text-lg" />}
                    </div>

                    <div className="flex justify-around mt-5 mb-10">

                        <PrimaryButton disabled={processing} type="submit" className="w-fit">{processing ? 'Processing ...' : 'Add Land Images'}</PrimaryButton>

                    </div>

                </form>


            </Card>

            <Card>

                <h2 className="mx-auto text-secondary text-lg font-_Lato">Images - {land.title}</h2>

                <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-8 mt-4">

                    {land.land_images.map((image) => (

                        <div key={image.id} className="relative">
                            <img src={image.image_url} className="max-h-fit max-w-60 md:max-w-72 rounded-md" />
                            <button onClick={e => submitDelete(e, image.id)} className="p-3.5 text-lg absolute top-3 right-3 text-white bg-slate-600 hover:bg-slate-300/70 hover:text-red-600 transition ease-in duration-200 shadow-md rounded-full">

                                <DeleteIcon />
                                {/* <i className="fa-solid fa-trash text-lg "></i> */}
                            </button>
                        </div>
                    ))}

                    {land.land_images.length == 0 ? <code>No Images For This Land !</code> : ''}

                </div>

            </Card>

            <Loading show={showLoading} />
            <Toaster />

        </AdminLayout>

    );

}
