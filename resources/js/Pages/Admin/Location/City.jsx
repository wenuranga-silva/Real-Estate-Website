import Card from "@/Components/Card";
import CustomTopBar from "@/Components/CustomTopBar";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Loading from "@/Components/Loading";
import ModalDialog from "@/Components/ModalDialog";
import Pagination_ from "@/Components/Pagination_";
import PrimaryButton from "@/Components/PrimaryButton";
import SearchAdmin from "@/Components/SearchAdmin";
import TextInput from "@/Components/TextInput";
import AdminLayout from "@/Layouts/AdminLayout";
import { AutocompleteItem, Button, useDisclosure } from "@heroui/react";
import { Head, router, useForm } from "@inertiajs/react";
import axios from "axios";
import { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Chip,
    Tooltip,
} from "@heroui/react";
import { EditIcon } from "@/Components/Icons/EditIcon";
import AutoCompleteSelect from "@/Components/AutoCompleteSelect";
import PlusIcon from "@/Components/Icons/PlusIcon";


export default function Index({ cities, states }) {

    /// for loading animation
    const [showLoading, setShowLoading] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);

    //// forms & modal setup
    const addModel = useDisclosure();
    const editModel = useDisclosure();
    const [selectedState, setSelectedState] = useState('');

    //// for search and ......
    const [pageNumber, setPageNumber] = useState('');
    const isInitialRender = useRef(true);

    const search = (url ,n) => {

        if (!isInitialRender.current) {

            setSearchLoading(true);
            setPageNumber(n);
            router.visit(url, {

                only: ['cities'],
                preserveScroll: true,
                preserveState: true,
                onFinish: () => {

                    setSearchLoading(false);
                }
            });
        } else {

            isInitialRender.current = false;
            setSearchLoading(false);
        }

    };

    // insert data
    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({

        city: '',
        state_id: '',
        visibility: 'show',
    });

    const submitAddForm = (e) => {

        e.preventDefault();

        setShowLoading(true);
        post(route('admin.city.store'), {

            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {

                reset();
                clearErrors();
                addModel.onClose();
                setShowLoading(false);
                toast.success((t) => (

                    <span className="flex">
                        City Added Successfully.
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

    // update form
    const { data: _data, setData: _setData, put, processing: _processing, errors: _errors, reset: _reset, clearErrors: _clearErrors } = useForm({

        id: '',
        city: '',
        state_id: '',
        visibility: 'show',
    });

    const fillUpdateForm = (id) => {

        setShowLoading(true);
        axios.get(route('admin.city.show', id))
            .then((response) => {

                editModel.onOpen();
                _setData({

                    id: response.data.id,
                    city: response.data.name,
                    state_id: response.data.state_id,
                    visibility: response.data.visibility,
                });

                setSelectedState(response.data.state.name);
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
    };

    const submitEditForm = (e) => {

        e.preventDefault();
        setShowLoading(true);
        put(route('admin.city.update', _data.id), {

            onSuccess: () => {

                _reset();
                _clearErrors();
                editModel.onClose();
                setShowLoading(false);

                toast.success((t) => (

                    <span className="flex">
                        Country Added Successfully.
                        <button className="text-orange-600 pl-3" onClick={() => toast.dismiss(t.id)}>
                            Close
                        </button>
                    </span>
                ));
            },
            onError: () => {

                setShowLoading(false);
            },

        });
    };

    return (

        <AdminLayout menuActive={'location'}
            topBar={
                <CustomTopBar title={'All Cities'} onClick={(e) => { e.preventDefault(); addModel.onOpen(); }} >
                    <PlusIcon width={'1.3em'} height={'1.3em'} className={'mr-3'}/> Add City
                </CustomTopBar>
            }
        >

            <Head title="City" />


            <Card className="md:p-5">

                <SearchAdmin pageNumber={pageNumber} finalUrl={(searchUrl ,n) => search(searchUrl ,n)} _url={route('admin.city.index')} loading={searchLoading} />


                <Table aria-label="Example table with custom cells">

                    <TableHeader>
                        <TableColumn key='#' align={"start"}>
                            #
                        </TableColumn>

                        <TableColumn key='state' align={"start"}>
                            State
                        </TableColumn>

                        <TableColumn key='city' align={"start"}>
                            City
                        </TableColumn>

                        <TableColumn key='visibility' align={"start"}>
                            Visibility
                        </TableColumn>

                        <TableColumn key='actions' align={"center"}>
                            Actions
                        </TableColumn>
                    </TableHeader>

                    <TableBody>

                        {cities && cities.data.map((val, index) => (

                            <TableRow key={index} className="hover:bg-primary/20">

                                <TableCell className="rounded-l-md">{cities.from + index}</TableCell>
                                <TableCell>{val.state.name}</TableCell>
                                <TableCell>{val.name}</TableCell>
                                <TableCell>

                                    <Chip className="capitalize" color={val.visibility == 'show' ? 'success' : 'danger'} size="sm" variant="flat">
                                        {val.visibility}
                                    </Chip>
                                </TableCell>
                                <TableCell className="rounded-r-md">

                                    <div className="relative flex justify-center items-center gap-3">

                                        <Button className="data-[hover=true]:bg-primary/55 !px-2 min-w-11" variant="light" onPress={() => { fillUpdateForm(val.id) }}>
                                            <Tooltip content="Edit" className="w-full h-full">
                                                <span className="text-lg text-default-400 hover:text-white cursor-pointer active:opacity-50 w-full h-full flex justify-center items-center">
                                                    <EditIcon />
                                                </span>
                                            </Tooltip>
                                        </Button>

                                        {/* <Button className="data-[hover=true]:bg-danger/50 !px-2 min-w-11" variant="light" >
                                            <Tooltip content="Delete" className="w-full h-full">
                                                <span className="text-lg text-danger hover:text-white cursor-pointer active:opacity-50 w-full h-full flex justify-center items-center">
                                                    <DeleteIcon />
                                                </span>
                                            </Tooltip>
                                        </Button> */}
                                    </div>
                                </TableCell>
                            </TableRow>

                        ))}

                    </TableBody>
                </Table>

                {cities.data.length != 0 ? <Pagination_ perPage={15} updatePageNum={(number) => number ? setPageNumber(number) : ''} from={cities.from} to={cities.to} total={cities.total} initialPage={pageNumber}/> : ''}

                {cities.data.length == 0 ? <code className="text-primary p-5">No Data Found</code> : ''}
            </Card>


            {/* Modal Dialog For store City */}
            <ModalDialog title={'Add City'} isOpen={addModel.isOpen}
                onOpenChange={addModel.onOpenChange}>


                <form onSubmit={submitAddForm}>

                    <div className="flex flex-col mb-5">
                        <InputLabel value={'City Name :'} className=" !text-md !text-black" />
                        <TextInput required value={data.city} onChange={(e) => setData('city', e.target.value)} />
                        {errors.city && <InputError message={errors.city} />}
                    </div>

                    <div className="flex flex-col mb-5">

                        <InputLabel value={'States :'} className=" mb-2 !text-md !text-black" />

                        <AutoCompleteSelect title={'State'} onSelectionChange={(key) => setData('state_id', key)} >

                            {states && states.map((val) => (

                                <AutocompleteItem
                                    key={val.id}
                                >

                                    {val.name}
                                </AutocompleteItem>
                            ))}
                        </AutoCompleteSelect>

                        {errors.state_id && <InputError message={errors.state_id} />}
                    </div>

                    <div className="flex flex-col mb-5">
                        <InputLabel value={'Visibility :'} className=" !text-md !text-black" />
                        <select value={data.visibility} onChange={(e) => setData('visibility', e.target.value)} className="md:w-96 rounded-md focus:outline-none  focus:border-primary focus:ring-1 focus:ring-primary" required>
                            <option value="show">Show</option>
                            <option value="hide">Hide</option>
                        </select>
                        {errors.visibility && <InputError message={errors.visibility} />}
                    </div>

                    <PrimaryButton type="submit" disabled={processing}>Add City</PrimaryButton>

                </form>
            </ModalDialog>

            {/* Modal Dialog For Update City */}
            <ModalDialog title={'Update City'} isOpen={editModel.isOpen}
                onOpenChange={editModel.onOpenChange}>


                <form onSubmit={submitEditForm}>

                    <div className="flex flex-col mb-5">
                        <InputLabel value={'City Name :'} className=" !text-md !text-black" />
                        <TextInput required value={_data.city} onChange={(e) => _setData('city', e.target.value)} />
                        <TextInput hidden required value={_data.id} onChange={(e) => _setData('id', e.target.value)} />
                        {_errors.city && <InputError message={_errors.city} />}
                    </div>

                    <div className="flex flex-col mb-5">

                        <InputLabel value={'States :'} className=" mb-2 !text-md !text-black" />

                        <AutoCompleteSelect title={'State'} defaultInputValue={selectedState}
                            onSelectionChange={(key) => _setData('state_id', key)} >

                            {states && states.map((val) => (

                                <AutocompleteItem
                                    key={val.id}
                                >

                                    {val.name}
                                </AutocompleteItem>
                            ))}
                        </AutoCompleteSelect>

                        {_errors.state_id && <InputError message={_errors.state_id} />}
                    </div>

                    <div className="flex flex-col mb-5">
                        <InputLabel value={'Visibility :'} className=" !text-md !text-black" />
                        <select value={_data.visibility} onChange={(e) => _setData('visibility', e.target.value)} className="md:w-96 rounded-md focus:outline-none  focus:border-primary focus:ring-1 focus:ring-primary" required>
                            <option value="show">Show</option>
                            <option value="hide">Hide</option>
                        </select>
                        {_errors.visibility && <InputError message={_errors.visibility} />}
                    </div>

                    <PrimaryButton type="submit" disabled={_processing}>Update City</PrimaryButton>

                </form>
            </ModalDialog>

            <Loading show={showLoading} size="lg"/>

            <Toaster />
        </AdminLayout>

    );

}
