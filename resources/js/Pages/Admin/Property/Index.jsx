import Card from "@/Components/Card";
import CustomTopBar from "@/Components/CustomTopBar";
import Pagination_ from "@/Components/Pagination_";
import SearchAdmin from "@/Components/SearchAdmin";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useRef, useState } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Chip,
    Tooltip,
    Button,
    Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, cn
} from "@heroui/react";
import { EditIcon } from "@/Components/Icons/EditIcon";
import { DeleteIcon } from "@/Components/Icons/DeleteIcon";
import SettingIcon from "@/Components/Icons/SettingIcon";
import ImageIcon from "@/Components/Icons/ImageIcon";
import PuzzleIcon from "@/Components/Icons/PuzzleIcon";
import OfferIcon from "@/Components/Icons/OfferIcon";
import PlusIcon from "@/Components/Icons/PlusIcon";


export default function Index({ properties }) {

    //// for search and ......
    const [pageNumber, setPageNumber] = useState('');
    const isInitialRender = useRef(true);
    const [loading, setLoading] = useState(false);

    const search = (url ,n) => {

        if (!isInitialRender.current) {

            setLoading(true);
            setPageNumber(n);
            router.visit(url, {

                only: ['properties'],
                preserveScroll: true,
                preserveState: true,
                onFinish: () => {

                    setLoading(false);
                }
            });
        } else {

            isInitialRender.current = false;
        }

    };


    return (

        <AdminLayout menuActive={'property'}
            topBar={
                <CustomTopBar title={'All Properties'} _url={route('admin.property.create')}>
                    <PlusIcon width={'1.3em'} height={'1.3em'} className={' mr-3'}/> Add Property
                </CustomTopBar>
            }
        >

            <Head title="Property" />

            <Card className="md:p-5 ">


                <SearchAdmin pageNumber={pageNumber} loading={loading} finalUrl={(searchUrl ,n) => search(searchUrl ,n)} _url={route('admin.property.index')} placeholder="Search by state ,city ,title ..." />

                <Table aria-label="Table with cells">

                    <TableHeader>
                        <TableColumn key='#' align={"start"}>
                            #
                        </TableColumn>

                        <TableColumn key='title' align={"start"}>
                            Title
                        </TableColumn>

                        <TableColumn key='type' align={"start"}>
                            Type
                        </TableColumn>

                        <TableColumn key='location' align={"start"}>
                            Location
                        </TableColumn>

                        <TableColumn key='availability' align={"start"}>
                            Availability
                        </TableColumn>

                        <TableColumn key='actions' align={"center"}>
                            Actions
                        </TableColumn>
                    </TableHeader>

                    <TableBody>

                        {properties.data.map((val, index) => (

                            <TableRow key={index} className="hover:bg-primary/20">

                                <TableCell className="rounded-l-md">{properties.from + index}</TableCell>
                                <TableCell>{val.title}</TableCell>
                                <TableCell>{val.type}</TableCell>
                                <TableCell>

                                    {val.city.state.name} - {val.city.name}
                                </TableCell>
                                <TableCell>

                                    <Chip className="capitalize" color={val.availability == 'available' ? 'success' : 'danger'} size="sm" variant="flat">
                                        {val.availability}
                                    </Chip>
                                </TableCell>
                                <TableCell className="rounded-r-md">

                                    <div className="relative flex justify-center items-center gap-3">

                                        <Dropdown>
                                            <DropdownTrigger>

                                                <Button className="data-[hover=true]:bg-primary/55 !px-2 min-w-11" variant="light">
                                                    <span className="text-lg text-default-400 hover:text-white cursor-pointer active:opacity-50 w-full h-full flex justify-center items-center">

                                                        <SettingIcon />
                                                    </span>
                                                </Button>
                                            </DropdownTrigger>
                                            <DropdownMenu aria-label="Dropdown menu with description" variant="faded">

                                                <DropdownItem
                                                    as={Link}
                                                    href={route('admin.property.edit', val.id)}
                                                    className="py-3"
                                                    key="edit"
                                                    startContent={<EditIcon width={'1.4em'} height={'1.4em'} />}
                                                >
                                                    Edit Property
                                                </DropdownItem>

                                                <DropdownItem
                                                    as={Link}
                                                    href={route('admin.propertyImage.show', val.id)}
                                                    key="image"
                                                    className="py-3"
                                                    startContent={<ImageIcon width={'1.3em'} height={'1.3em'} />}
                                                >
                                                    Property Images
                                                </DropdownItem>

                                                <DropdownItem
                                                    as={Link}
                                                    href={route('admin.propertyAmenitie.show', val.id)}
                                                    key="amenitie"
                                                    className="py-3"
                                                    startContent={<PuzzleIcon width={'1em'} height={'1em'} />}
                                                >
                                                    Amenities
                                                </DropdownItem>

                                                <DropdownItem
                                                    as={Link}
                                                    href={route('admin.offer.index', [val.id, 'property'])}
                                                    key="offer"
                                                    className="py-3"
                                                    startContent={<OfferIcon width={'1.2em'} height={'1.2em'} />}
                                                >
                                                    Offers
                                                </DropdownItem>

                                            </DropdownMenu>
                                        </Dropdown>

                                    </div>
                                </TableCell>
                            </TableRow>

                        ))}

                    </TableBody>
                </Table>

                {properties.data.length != 0 ? <Pagination_ from={properties.from} to={properties.to} updatePageNum={(n) => n ? setPageNumber(n) : ''} perPage={15} total={properties.total} initialPage={pageNumber}/> : ''}

                {properties.data.length == 0 ? <code className="text-primary p-5">No Data Found</code> : ''}
            </Card>

        </AdminLayout>

    );

}
