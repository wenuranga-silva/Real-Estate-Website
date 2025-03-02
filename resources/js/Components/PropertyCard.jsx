import { Link, router } from "@inertiajs/react";
import MapIcon from "./Icons/MapIcon";
import BookmarkIcon from "./Icons/BookmarkIcon";
import AreaIcon from "./Icons/AreaIcon";
import BedIcon from "./Icons/BedIcon";
import BathIcon from "./Icons/BathIcon";
import BookmarkSolidIcon from "./Icons/BookmarkSolidIcon";

export default function PropertyCard({ _property }) {

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

        return simpliPrice(finalPrice);

    }

    const truncateTitle = (title) => {

        return title.length > 60 ? title.substring(0, 60) + ' ...' : title
    }

    ////
    const addToFavourite = (id) => {

        router.post(route('favourite.store'), {
            id: id,
            type: 'property'
        } ,{
            preserveScroll: true,
        });
    }

    ////
    const removeFromFavourite = (id) => {

        router.delete(route('favourite.destroy' ,[id ,'property']),{
            preserveScroll: true,
        });
    }

    return (

        <div className="shadow-md rounded-md !max-w-72">

            <Link href={route('post' ,['property' ,_property.id])}>

                <figure className="relative">
                    <div className="absolute right-0 overflow-hidden bg-white/80 px-2 py-1">
                        <code className="font-bold text-secondary flex"><MapIcon width={'1.3em'} height={'1.3em'} /> {_property.city.name}</code>
                    </div>
                    <img src={_property.property_images[0]?.image_url} className="w-fit h-48 object-cover rounded-t-md" loading="lazy" alt="property image" />
                </figure>
            </Link>

            <div className="relative flex flex-col">

                <div className="absolute top-[-14px] w-full flex shadow-md bg-white/80 px-2 py-1">
                    <code className="mx-auto text-secondary font-bold">{_property.type} - {_property.status}</code>
                    {!_property.IsFavourited && <button className="absolute right-0 top-0 px-3 py-1 text-secondary font-bold" onClick={() => addToFavourite(_property.id)}>
                        <BookmarkIcon width={'1.3em'} height={'1.3em'} />
                    </button>}

                    {_property.IsFavourited && <button className="absolute right-0 top-0 px-3 py-1 text-secondary font-bold" onClick={() => removeFromFavourite(_property.id)}>
                        <BookmarkSolidIcon width={'1.3em'} height={'1.3em'} />
                    </button>}
                </div>

                <div className="px-2 pt-7 flex justify-between">
                    <code className="flex"><AreaIcon className={' mr-2'} width={'1.3em'} height={'1.3em'} /> {Number(_property.area_sqft).toFixed(0)} sqft</code>
                    <code className="flex"><BedIcon className={' mr-2'} width={'1.3em'} height={'1.3em'} /> {_property.bedrooms}</code>
                    <code className="flex"><BathIcon className={' mr-2'} width={'1.3em'} height={'1.3em'} /> {_property.bathrooms}</code>
                </div>

                <div className="px-2 pt-3 flex justify-center text-lg">

                    {_property.offers[0] && <del className="text-gray-500">LKR {simpliPrice(_property.price)} &nbsp;</del>}

                    <code className="font-_Oswald font-semibold text-primary">
                        LKR {calcDiscount(_property.price, _property.offers[0] ? _property.offers[0].discount_value : null)}

                        {_property.status === 'rent' && ' - Per Month'}
                    </code>
                </div>

                <Link href={route('post' ,['property' ,_property.id])} className="px-2 mt-3 mb-3 hyphens-auto break-words font-semibold text-blue-500">
                    {truncateTitle(_property.title)}
                </Link>

            </div>

        </div>
    );

}
