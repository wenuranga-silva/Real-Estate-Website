import Card from "@/Components/Card";
import CustomTopBar from "@/Components/CustomTopBar";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Loading from "@/Components/Loading";
import ModalDialog from "@/Components/ModalDialog";
import PrimaryButton from "@/Components/PrimaryButton";
import AdminLayout from "@/Layouts/AdminLayout";
import { useDisclosure } from "@heroui/react";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Index({ property, amenities }) {

    /// for loading animation
    const [showLoading, setShowLoading] = useState(false);

    /// dialog
    const addModel = useDisclosure();


    /// forms
    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({

        propertyId: property.id,
        feature: '',
    });

    const submitAddForm = (e) => {

        e.preventDefault();

        setShowLoading(true);
        post(route('admin.propertyAmenitie.store'), {

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

    };

    /// delete form setup
    const submitDelete = (e, propertyAmenitieId) => {

        e.preventDefault();

        const userConfirmation = confirm("Do you want to DELETE ?");

        if (!userConfirmation) {

            return;
        }

        setShowLoading(true);
        router.delete(route('admin.propertyAmenitie.destroy', [propertyAmenitieId]), {

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
                <CustomTopBar title={'Property - Amenities'} _url={route('admin.property.index')}>
                    All Properties
                </CustomTopBar>
            }
        >

            <Head title="Property" />

            <Card>

                <div className="flex">

                    <h2 className="mx-auto text-secondary text-lg font-_Lato">{property.title}</h2>
                    <PrimaryButton onClick={() => addModel.onOpen()}>Add Amenitie</PrimaryButton>
                </div>

                <table className="table table-auto w-full mt-7 rounded-md overflow-hidden shadow-lg">
                    <thead className="divide-y divide-slate-800 bg-slate-200">
                        <tr>
                            <th className="p-2 md:pl-4 text-left">#</th>
                            <th className="p-2 text-left">Feature</th>
                            <th className="p-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-300 bg-white">


                        {property.property_amenities.map((amenitie, index) => (

                            <tr key={index} className="hover:bg-slate-100 transition-colors duration-300 ease-in">

                                <td className="p-2 md:pl-4 whitespace-nowrap">{index + 1}</td>
                                <td className="p-2 md:pl-4 whitespace-nowrap">{amenitie.amenitie.name}</td>
                                <td className="p-2 md:pl-4 whitespace-nowrap">

                                    <Link onClick={e => submitDelete(e, amenitie.id)} className=" mx-2 p-2 text-orange-600 bg-white hover:shadow-md rounded-sm hover:text-orange-600 hover:border-orange-600 transition-all duration-500 ease-in  " >Delete</Link>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>

                {property.length == 0 ? <code className="text-primary p-5">No Data Found</code> : ''}

            </Card>

            {/* Modal Dialog For Add Amenitie */}
            <ModalDialog title={'Add Amenities'} isOpen={addModel.isOpen}
                onOpenChange={addModel.onOpenChange}>

                <form onSubmit={submitAddForm}>

                    <div className="flex flex-col mb-5">
                        <InputLabel value={'Feature :'} className=" mb-2 !text-md !text-black" />
                        <select value={data.feature} onChange={(e) => setData('feature', e.target.value)} className="rounded-md focus:outline-none  focus:border-primary focus:ring-1 focus:ring-primary md:min-w-80" required>

                            <option value=''>
                                Select
                            </option>
                            {amenities.map((amenitie, index) => (

                                <option key={index} value={amenitie.id}>
                                    {amenitie.name}
                                </option>
                            ))}

                        </select>
                        {errors.feature && <InputError message={errors.feature} />}
                    </div>

                    <PrimaryButton disabled={processing} type="submit">{processing ? 'Processing ... ' : 'Submit'}</PrimaryButton>

                </form>
            </ModalDialog>


            <Loading show={showLoading} />
            <Toaster />

        </AdminLayout>

    );

}
