import Card from "@/Components/Card";
import CustomTopBar from "@/Components/CustomTopBar";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import { useEffect, useMemo, useRef, useState } from "react";

import InputLabel from "@/Components/InputLabel";
import ModalDialog from "@/Components/ModalDialog";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import toast, { Toaster } from "react-hot-toast";
import InputError from "@/Components/InputError";
import axios from "axios";
import Pagination_ from "@/Components/Pagination_";
import { Button, useDisclosure } from "@heroui/react";
import Loading from "@/Components/Loading";
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
import PlusIcon from "@/Components/Icons/PlusIcon";

export default function Index({ states }) {


    //// for search
    const isInitialRender = useRef(true);
    const [pageNumber, setPageNumber] = useState('');
    const [searchInput, setSearchInput] = useState(usePage().props.search || '');
    const [searchText, setSearchText] = useState(usePage().props.search || '');
    const [loading, setShowLoading] = useState(false);


    //// store form & modal setup
    const addModel = useDisclosure();
    const editModel = useDisclosure();

    //// search functions here .......
    //// make search url
    let searchUrl = useMemo(() => {

        let url = new URL(route('admin.state.index'));

        if (searchText.trim() !== '') {

            url.searchParams.append('search', searchText);
        } else {

            url.searchParams.delete('search');
        }

        if (pageNumber != '') {

            url.searchParams.append('page', pageNumber);
        } else {

            url.searchParams.delete('page');
        }

        return url;
    }, [pageNumber, searchText]);

    //// timer for search input
    useEffect(() => {

        const handler = setTimeout(() => {

            if (searchText !== searchInput) {

                setSearchText(searchInput);
                setPageNumber(1);
            }
        }, 2000);

        return () => {

            clearTimeout(handler);
        };
    }, [searchInput]);

    //// make search request
    useEffect(() => {

        if (isInitialRender.current) {

            isInitialRender.current = false;
            return;
        }

        if (searchText || pageNumber) {

            setShowLoading(true);
            router.visit(searchUrl, {
                only: ['states'],
                preserveScroll: true,
                preserveState: true,
                onFinish: () => {

                    setShowLoading(false);
                },
            });
        }

    }, [searchUrl]);

    //// store state data
    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({

        state: '',
        visibility: 'show',
    })

    const submitForm = (e) => {

        e.preventDefault();
        post(route('admin.state.store'), {

            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {

                reset();
                addModel.onClose();
                clearErrors();
                toast.success((t) => (

                    <span className="flex">
                        State Added Successfully.
                        <button className="text-orange-600 pl-3" onClick={() => toast.dismiss(t.id)}>
                            Close
                        </button>
                    </span>
                ));
            }
        });
    };

    //// update state data
    const { data: _data, setData: _setData, put, processing: _processing, errors: _errors, reset: _reset, clearErrors: _clearErrors } = useForm({

        state: '',
        state_id: '',
        visibility: 'show',
    })

    //// fill update form --- onclick
    const fillData = (id) => {

        axios.get(route('admin.state.show', id))
            .then((response) => {

                editModel.onOpen();

                _setData({
                    state: response.data.name,
                    state_id: response.data.id,
                    visibility: response.data.visibility
                });
            })
            .catch((error) => {

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
        put(route('admin.state.update', _data.state_id), {

            onSuccess: () => {

                editModel.onClose();
                _reset();

                toast.success((t) => (
                    <span className="flex">
                        State Updated.
                        <button className="text-orange-600 pl-3" onClick={() => toast.dismiss(t.id)}>
                            Close
                        </button>
                    </span>
                ));
            }
        });
    };

    return (

        <AdminLayout menuActive={'location'}
            topBar={
                <CustomTopBar title={`All states`} onClick={(e) => { e.preventDefault(); addModel.onOpen() }}>
                    <PlusIcon width={'1.3em'} height={'1.3em'} className={'mr-3'}/> Add State
                </CustomTopBar>
            }
        >

            <Head title="States" />

            <Card className="md:p-5">

                <div className="flex items-center  mb-5">

                    <div className="w-64 md:w-full mr-5">

                        <InputLabel value={'Search :'} className=" !text-base mr-3 !text-black" />
                        <div className="flex">
                            <TextInput value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder="Search here ..." className=" !rounded-sm w-full" />
                            <Loading show={loading} className="ml-[-45px]" />
                        </div>
                    </div>

                </div>

                <Table aria-label="Table with cells">

                    <TableHeader>
                        <TableColumn key='#' align={"start"}>
                            #
                        </TableColumn>

                        <TableColumn key='state' align={"start"}>
                            State
                        </TableColumn>

                        <TableColumn key='visibility' align={"start"}>
                            Visibility
                        </TableColumn>

                        <TableColumn key='actions' align={"center"}>
                            Actions
                        </TableColumn>
                    </TableHeader>

                    <TableBody>

                        {states && states.data.map((val, index) => (

                            <TableRow key={index} className="hover:bg-primary/20">

                                <TableCell className="rounded-l-md">{states.from + index}</TableCell>
                                <TableCell>{val.name}</TableCell>
                                <TableCell>

                                    <Chip className="capitalize" color={val.visibility == 'show' ? 'success' : 'danger'} size="sm" variant="flat">
                                        {val.visibility}
                                    </Chip>
                                </TableCell>
                                <TableCell className="rounded-r-md">

                                    <div className="relative flex justify-center items-center gap-3">

                                        <Button className="data-[hover=true]:bg-primary/55 !px-2 min-w-11" variant="light" onPress={() => { fillData(val.id) }}>
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

                {states.data.length != 0 ? <Pagination_ from={states.from} to={states.to} updatePageNum={(n) => n ? setPageNumber(n) : ''} perPage={15} total={states.total} initialPage={pageNumber} /> : ''}

                {states ? states.data.length == 0 ? <code className="text-primary p-5">No Data Found</code> : '' : ''}

            </Card>


            {/* Modal Dialog For Add State */}

            <ModalDialog title={'Add State'} isOpen={addModel.isOpen}
                onOpenChange={addModel.onOpenChange}>

                <form onSubmit={submitForm}>

                    <div className="flex flex-col mb-5">
                        <InputLabel value={'State :'} className=" !text-md !text-black" />
                        <TextInput required value={data.state} onChange={(e) => setData('state', e.target.value)} />
                        {errors.state && <InputError message={errors.state} />}
                    </div>

                    <div className="flex flex-col mb-5">
                        <InputLabel value={'Visibility :'} className=" !text-md !text-black" />
                        <select value={data.visibility} onChange={(e) => setData('visibility', e.target.value)} className="md:w-96 rounded-md focus:outline-none  focus:border-primary focus:ring-1 focus:ring-primary" required>
                            <option value="show">Show</option>
                            <option value="hide">Hide</option>
                        </select>
                        {errors.visibility && <InputError message={errors.visibility} />}
                    </div>

                    <PrimaryButton disabled={processing} type="submit">{processing ? 'Processing ...' : 'Add State'}</PrimaryButton>

                </form>
            </ModalDialog>

            {/* Modal Dialog For update State */}
            <ModalDialog title={'Update State'} isOpen={editModel.isOpen}
                onOpenChange={editModel.onOpenChange}>

                <form onSubmit={submitEditForm}>

                    <div className="flex flex-col mb-5">
                        <InputLabel value={'State :'} className=" !text-md !text-black" />
                        <TextInput value={_data.state} onChange={(e) => _setData('state', e.target.value)} />
                        {_errors.state && <InputError message={_errors.state} />}
                        <TextInput hidden value={_data.state_id} onChange={(e) => _setData('state_id', e.target.value)} />
                    </div>

                    <div className="flex flex-col mb-5">
                        <InputLabel value={'Visibility :'} className=" !text-md !text-black" />
                        <select value={_data.visibility} onChange={(e) => _setData('visibility', e.target.value)} className="md:w-96 rounded-md focus:outline-none  focus:border-primary focus:ring-1 focus:ring-primary" required>
                            <option value="show">Show</option>
                            <option value="hide">Hide</option>
                        </select>
                        {_errors.visibility && <InputError message={_errors.visibility} />}
                    </div>

                    <PrimaryButton disabled={_processing} type="submit">{_processing ? 'Processing ...' : 'Update State'}</PrimaryButton>

                </form>
            </ModalDialog>

            <Toaster />
        </AdminLayout>

    );

}
