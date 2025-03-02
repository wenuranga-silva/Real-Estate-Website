import Card from "@/Components/Card";
import CustomTopBar from "@/Components/CustomTopBar";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import LinkDefault from "@/Components/LinkDefault";
import Loading from "@/Components/Loading";
import ModalDialog from "@/Components/ModalDialog";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AdminLayout from "@/Layouts/AdminLayout";
import { useDisclosure } from "@heroui/react";
import { Head, Link, router, useForm } from "@inertiajs/react";
import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Index({ amenities }) {

    /// for loading animation
    const [showLoading, setShowLoading] = useState(false);

    /// dialog
    const addModel = useDisclosure();
    const editModel = useDisclosure();

    // forms
    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({

        feature: '',
        icon: null
    });

    /// edit form setup
    const { data: e_data, setData: e_setData, put, processing: e_prosessing, reset: e_reset, errors: e_errors, clearErrors: e_clearErrors } = useForm({

        id: '',
        feature: '',
        icon: null
    })

    /// store and update methods
    const submitAddForm = (e) => {

        e.preventDefault();

        setShowLoading(true);
        post(route('admin.amenitie.store'), {

            forceFormData: true,
            onSuccess: () => {

                reset();
                clearErrors();
                setShowLoading(false);

                toast.success((t) => (

                    <span className="flex">
                        Feature Added Successfully !
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
    }

    const submitEditForm = async (e) => {

        e.preventDefault();

        setShowLoading(true);
        const formData = new FormData();
        formData.append('id', e_data.id);
        formData.append('feature', e_data.feature);
        formData.append('icon', e_data.icon);
        formData.append('_method', 'PUT');

        try {

            const response = await axios.post(route('admin.amenitie.update', e_data.id), formData, {

                headers: {

                    'Content-Type': 'multipart/form-data',
                }
            });

            if (response.status === 200) {

                router.visit(route('admin.amenitie.index'), {

                    only: ['amenities'],
                })

                toast.success((t) => (

                    <span className="flex">
                        Feature Updated Successfully.
                        <button className="text-orange-600 pl-3" onClick={() => toast.dismiss(t.id)}>
                            Close
                        </button>
                    </span>
                ));

                e_clearErrors();
                e_reset();
                setShowLoading(false);
                editModel.onClose();
            }
        } catch (error) {

            e_clearErrors();
            if (error.response && error.response.data.errors) {

                const validation_errors = error.response.data.errors;

                Object.keys(validation_errors).forEach(key => {

                    setError(key, validation_errors[key][0]);
                });

            } else {

                toast.error((t) => (

                    <span className="flex">
                        {error.message}
                        <button className="text-orange-600 pl-3" onClick={() => toast.dismiss(t.id)}>
                            Close
                        </button>
                    </span>
                ));
            }
        }

    }

    const fillUpdateForm = (e, amenitie) => {

        e.preventDefault();

        setShowLoading(true);
        axios.get(route('admin.get.amenitie', amenitie))
            .then((response) => {

                editModel.onOpen();
                e_setData({

                    'id': response.data.id,
                    'feature': response.data.name,
                    'icon': response.data.icon
                });
                setShowLoading(false);
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

    /// delete form setup
    const submitDelete = (e, amenitie) => {

        e.preventDefault();

        const userConfirmation = confirm("Do you want to DELETE ?");

        if (!userConfirmation) {

            return;
        }

        setShowLoading(true);
        router.delete(route('admin.amenitie.destroy', amenitie), {

            onSuccess: () => {

                setShowLoading(false);
                toast.success((t) => (

                    <span className="flex">
                        Feature Deleted Successfully.
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
    }

    return (

        <AdminLayout menuActive={'property'}
            topBar={
                <CustomTopBar title={'All Amenities'} >
                </CustomTopBar>
            }
        >

            <Head title="Amenities" />

            <Card>

                <div className="flex justify-end">

                    <PrimaryButton onClick={() => addModel.onOpen()}>Add Amenitie</PrimaryButton>
                </div>

                <table className="table table-auto w-full mt-7 rounded-md overflow-hidden shadow-lg">
                    <thead className="divide-y divide-slate-800 bg-slate-200">
                        <tr>
                            <th className="p-2 md:pl-4 text-left">#</th>
                            <th className="p-2 text-left">Feature</th>
                            <th className="p-2 text-left">Icon</th>
                            <th className="p-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-300 bg-white">


                        {amenities.map((amenitie, index) => (

                            <tr key={index} className="hover:bg-slate-100 transition-colors duration-300 ease-in">

                                <td className="p-2 md:pl-4 whitespace-nowrap">{index + 1}</td>
                                <td className="p-2 md:pl-4 whitespace-nowrap">{amenitie.name}</td>
                                <td className="p-2 md:pl-4 whitespace-nowrap text-lg">
                                    <img src={amenitie.icon} alt="icon" />
                                </td>
                                <td className="p-2 md:pl-4 whitespace-nowrap">

                                    <LinkDefault className=" mx-2 px-3 " onClick={(e) => fillUpdateForm(e, amenitie.id)} >Edit</LinkDefault>
                                    <Link onClick={e => submitDelete(e, amenitie.id)} className=" mx-2 p-2 text-orange-600 bg-white hover:shadow-md rounded-sm hover:text-orange-600 hover:border-orange-600 transition-all duration-500 ease-in  " >Delete</Link>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>

                {amenities.length == 0 ? <code className="text-primary p-5">No Data Found</code> : ''}

            </Card>

            {/* Modal Dialog For Add Amenitie */}
            <ModalDialog title={'Add Amenities'} isOpen={addModel.isOpen}
                onOpenChange={addModel.onOpenChange}>

                <form onSubmit={submitAddForm} >

                    <div className="flex flex-col mb-5">
                        <InputLabel value={'Feature :'} className=" mb-2 !text-md !text-black" />
                        <TextInput value={data.feature} onChange={(e) => setData('feature', e.target.value)} className=" md:min-w-96 " required />
                        {errors.feature && <InputError message={errors.feature} />}
                    </div>

                    <div className="flex flex-col mb-5">
                        <InputLabel value={'Icon (.svg) :'} className=" mb-2 !text-md !text-black" />
                        <input type="file" onChange={(e) => setData('icon', e.target.files[0])} className=" md:min-w-96 " />
                        {errors.icon && <InputError message={errors.icon} />}
                    </div>


                    <PrimaryButton type="submit">{processing ? 'Processing ... ' : 'Submit'}</PrimaryButton>

                </form>
            </ModalDialog>

            {/* Modal Dialog For Edit Amenitie */}
            <ModalDialog title={'Edit Amenities'} isOpen={editModel.isOpen}
                onOpenChange={editModel.onOpenChange}>

                <form onSubmit={submitEditForm}>

                    <div className="flex flex-col mb-5">
                        <InputLabel value={'Feature :'} className=" mb-2 !text-md !text-black" />
                        <TextInput value={e_data.feature} onChange={(e) => e_setData('feature', e.target.value)} className=" md:min-w-96 " required />
                        {e_errors.feature && <InputError message={e_errors.feature} />}
                    </div>

                    <div className="flex flex-col mb-5">
                        <InputLabel value={'Icon :'} className=" mb-2 !text-md !text-black" />
                        <input type="file" onChange={(e) => e_setData('icon', e.target.files[0])} className=" md:min-w-96 " />
                        {e_errors.icon && <InputError message={e_errors.icon} />}
                    </div>

                    <PrimaryButton type="submit">{e_prosessing ? 'Processing ... ' : 'Submit'}</PrimaryButton>

                </form>
            </ModalDialog>

            <Loading show={showLoading} />
            <Toaster />
        </AdminLayout>

    );

}
