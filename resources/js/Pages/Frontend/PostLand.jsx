import Footer from "@/Components/Footer";
import GoogleMap from "@/Components/GoogleMap";
import ImageSlider from "@/Components/ImageSlider";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SwiperCardLay from "@/Components/SwiperCardLay";
import TextInput from "@/Components/TextInput";
import Frontend from "@/Layouts/Frontend";
import { Button, Card, Chip } from "@heroui/react";
import { Head, useForm } from "@inertiajs/react";
import { useEffect } from "react";

export default function PostLand({ result, cities, latest }) {

    // simplify price
    const simpliPrice = (price) => {

        if (price >= 1000000) {

            return (price / 1000000).toFixed(1) + "M"
        } else if (price >= 1000) {

            return (price / 1000).toFixed(1) + "K"
        } else {

            return price.toFixed(2)
        }

    }

    // calculate discount
    const calcDiscount = (price, discount = null) => {

        let finalPrice;

        if (discount) {

            finalPrice = price - discount
        } else {

            finalPrice = price
        }

        return finalPrice;

    }

    /// forms
    const { data, setData, post, errors } = useForm ({

        propertyId: result.id,
        ownerMail: '',
        clientMail: '',
        message: '',
        type: 'land'
    });

    useEffect(() => {

        setData('ownerMail' ,result.owners.email);
    }, [result.owners.email]);

    const sendMail = (e) => {

        e.preventDefault();

        post(route('sendMail') ,{

            preserveScroll: true,
            preserveState: true
        });

    }

    return (

        <Frontend>

            <Head title={'Prime-Homes'} />

            <div className="flex flex-col items-center px-2 gap-2 mt-5 lg:flex-row lg:items-stretch">

                <div>

                    <ImageSlider images={result.land_images} />

                </div>

                <div className="mt-2 lg:mt-0 w-full">

                    {result.location && <Card className="w-[98vW] lg:w-full rounded-sm shadow-small pt-4 pb-8">

                        <h1 className="px-4 text-2xl font-semibold mb-5 mt-4">Map View</h1>

                        <div>

                            <GoogleMap url={result.location} />

                        </div>

                    </Card>}

                    {!result.location && <Card className="md:w-[90vW] lg:w-full rounded-sm shadow-small py-4">

                        <h1 className="px-4 text-2xl font-semibold mb-3.5 mt-3 text-primary">{result.title} - {result.city.name}</h1>

                        <div className="px-2 pt-3 flex justify-start items-center text-lg">

                            {result.offers[0] && <del className="text-gray-500 font-bold text-2xl">LKR {simpliPrice(result.price)} &nbsp;</del>}

                            <h1 className="px-4 text-2xl font-semibold mb-3.5 mt-3 ">
                                LKR {calcDiscount(result.price, result.offers[0] ? result.offers[0].discount_value : null)}

                                {result.status === 'rent' && ' - Per Month'}
                            </h1>
                        </div>

                        <div >

                            <div className="flex flex-wrap gap-5 justify-start py-3 px-4">

                                <div className="flex flex-col items-center gap-y-2 py-3 px-2.5 rounded-sm w-40 shadow-sm bg-primary/40">
                                    <h2 className="font-semibold text-center">Type</h2>
                                    <code>{result.land_type}</code>
                                </div>

                                <div className="flex flex-col items-center gap-y-2 py-3 px-2.5 rounded-sm w-40 shadow-sm bg-primary/40">
                                    <h2 className="font-semibold text-center">Land Area</h2>
                                    <code>{Number(result.area / 272.3).toFixed(2)} prech</code>
                                </div>

                            </div>

                        </div>

                    </Card>}

                </div>
            </div>

            <div className="flex flex-col items-center justify-center px-2 gap-2 my-5 lg:flex-row lg:items-stretch">

                <Card className="w-[98vW] lg:w-[60vW] my-5 mx-auto py-4 rounded-sm shadow-small">

                    {result.location && <div>
                        <h1 className="px-4 text-2xl font-semibold mb-3.5 mt-3 text-primary">{result.title} - {result.city.name}</h1>

                        <div className="px-2 pt-3 flex justify-start items-center text-lg">

                            {result.offers[0] && <del className="text-gray-500 font-bold text-2xl">LKR {simpliPrice(result.price)} &nbsp;</del>}

                            <h1 className="px-4 text-2xl font-semibold mb-3.5 mt-3 ">
                                LKR {calcDiscount(result.price, result.offers[0] ? result.offers[0].discount_value : null)}

                                {result.status === 'rent' && ' - Per Month'}
                            </h1>
                        </div>

                        <div >

                            <div className="flex flex-wrap gap-5 justify-start py-3 px-4">

                                <div className="flex flex-col items-center gap-y-2 py-3 px-2.5 rounded-sm w-40 shadow-sm bg-primary/40">
                                    <h2 className="font-semibold text-center">Type</h2>
                                    <code>{result.land_type}</code>
                                </div>

                                <div className="flex flex-col items-center gap-y-2 py-3 px-2.5 rounded-sm w-40 shadow-sm bg-primary/40">
                                    <h2 className="font-semibold text-center">Land Area</h2>
                                    <code>{Number(result.area / 272.3).toFixed(2)} prech</code>
                                </div>

                            </div>

                        </div>
                    </div>}

                    <h1 className="px-4 text-2xl font-semibold mb-5 mt-3">Property Details</h1>

                    <div className="px-4" dangerouslySetInnerHTML={{ __html: result.description }}>
                    </div>

                </Card>

                <div className={`mt-5 lg:mt-0 lg:w-[40vW]`}>

                    <Card className="w-[98vW] lg:w-full mx-auto py-4 rounded-sm shadow-small">

                        <h1 className="px-4 text-2xl font-semibold mb-3.5 mt-3">Contact The Seller</h1>

                        <div className="px-4">

                            <div className="flex flex-col my-2 gap-3 justify-start">

                                <Chip color="primary">
                                    <h1 className="text-lg mb-3.5 mt-3">E-mail - {result.owners.email}</h1>
                                </Chip>

                                {result.owners.phone_number && <Chip color="primary">
                                    <h1 className="text-lg mb-3.5 mt-3">Tel - {result.owners.phone_number}</h1>
                                </Chip>}
                            </div>

                            <div className="mt-5">
                                <h1 className="text-xl font-semibold mb-3.5 mt-3 text-center">Or Send Quick Message</h1>

                                <form onSubmit={sendMail}>
                                    <div className="flex flex-col w-full mb-5">
                                        <InputLabel className=" !text-md !text-black" >E-mail <code className="text-red-700">*</code></InputLabel>
                                        <TextInput type='email' value={data.clientMail} onChange={ e => setData('clientMail' ,e.target.value) } required />

                                        {errors.clientMail && <InputError message={errors.clientMail} />}
                                    </div>

                                    <div className="flex flex-col w-full mb-7">
                                        <InputLabel className=" !text-md !text-black" >Message <code className="text-red-700">*</code></InputLabel>
                                        <textarea className="border-black focus:border-primary focus:ring-primary" value={data.message} onChange={ e => setData('message' ,e.target.value) } required />

                                        {errors.message && <InputError message={errors.message} />}
                                    </div>

                                    <div className="flex flex-col items-center">
                                        <code>Add your contact details to ensure ease of communication !</code>
                                        <Button type="submit" variant="flat" className="bg-primary text-white shadow-md rounded-sm text-lg w-fit">Send</Button>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </Card>
                </div>
            </div>

            <div className="md:px-4 mt-5 md:mt-8 flex flex-col">

                <div className="max-w-fit mx-auto">
                    <h1 className="font-_Lato bg-gradient-to-bl via-primary from-tertiary to-secondary text-transparent bg-clip-text text-2xl font-semibold mb-8 text-center secHead">Newly Added Lands</h1>
                </div>
                <SwiperCardLay type={'land'} cardData={latest} />
            </div>

            <Footer cities={cities} />

        </Frontend>
    );
}
