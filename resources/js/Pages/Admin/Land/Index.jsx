import Card from "@/Components/Card";
import CustomTopBar from "@/Components/CustomTopBar";
import { EditIcon } from "@/Components/Icons/EditIcon";
import ImageIcon from "@/Components/Icons/ImageIcon";
import OfferIcon from "@/Components/Icons/OfferIcon";
import PlusIcon from "@/Components/Icons/PlusIcon";
import SettingIcon from "@/Components/Icons/SettingIcon";
import Pagination_ from "@/Components/Pagination_";
import SearchAdmin from "@/Components/SearchAdmin";
import AdminLayout from "@/Layouts/AdminLayout";
import { Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import { Head, Link, router } from "@inertiajs/react";
import { useRef, useState } from "react";


export default function Index({ lands }) {

    //// for search and ......
    const [pageNumber, setPageNumber] = useState('');
    const isInitialRender = useRef(true);
    const [loading, setLoading] = useState(true);

    const search = (url ,n) => {

        if (!isInitialRender.current) {

            setLoading(true);
            setPageNumber(n);
            router.visit(url, {

                only: ['lands'],
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
                <CustomTopBar title={'All Lands'} _url={route('admin.land.create')}>
                    <PlusIcon width={'1.3em'} height={'1.3em'} className={'mr-3'}/> Add Lands
                </CustomTopBar>
            }
        >

            <Head title="Lands" />

            <Card className="md:p-5">

                <SearchAdmin loading={loading} pageNumber={pageNumber} finalUrl={(searchUrl ,n) => search(searchUrl ,n)} _url={route('admin.land.index')} placeholder="Search by state ,city ,title ..." />

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

                        {lands && lands.data.map((val, index) => (

                            <TableRow key={index} className="hover:bg-primary/20">

                                <TableCell className="rounded-l-md">{lands.from + index}</TableCell>
                                <TableCell>{val.title}</TableCell>
                                <TableCell>{val.land_type}</TableCell>
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
                                                    href={route('admin.land.edit', val.id)}
                                                    className="py-3"
                                                    key="edit"
                                                    startContent={<EditIcon width={'1.4em'} height={'1.4em'} />}
                                                >
                                                    Edit Land
                                                </DropdownItem>

                                                <DropdownItem
                                                    as={Link}
                                                    href={route('admin.landImages.show', val.id)}
                                                    key="image"
                                                    className="py-3"
                                                    startContent={<ImageIcon width={'1.3em'} height={'1.3em'} />}
                                                >
                                                    Land Images
                                                </DropdownItem>

                                                <DropdownItem
                                                    as={Link}
                                                    href={route('admin.offer.index', [val.id, 'land'])}
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

                {lands.data.length != 0 ? <Pagination_ from={lands.from} to={lands.to} total={lands.total} perPage={15} updatePageNum={(n) => n ? setPageNumber(n) : ''} initialPage={pageNumber}/> : ''}

                {lands.data.length == 0 ? <code className="text-primary p-5">No Data Found</code> : ''}
            </Card>


        </AdminLayout>

    );

}
