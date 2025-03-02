import { Link, router } from "@inertiajs/react";
import MapIcon from "./Icons/MapIcon";
import BookmarkIcon from "./Icons/BookmarkIcon";
import AreaIcon from "./Icons/AreaIcon";
import BookmarkSolidIcon from "./Icons/BookmarkSolidIcon";

export default function LandCard({ _land }) {

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

            finalPrice = (price - discount)
        } else {

            finalPrice = price
        }

        return simpliPrice(finalPrice);

    }

    const truncateTitle = (title) => {

        return title.length > 60 ? title.substring(0, 60) + ' ...' : title
    }

    //// calculate perch
    const calcPerch = (sqft) => {

        return (sqft / 272.25).toFixed(1) + ' Perch';
        /// 1 Perch => 272.25 sqft
    }

    ////
    const addToFavourite = (id) => {

        router.post(route('favourite.store'), {
            id: id,
            type: 'land'
        }, {
            preserveScroll: true,
        });
    }

    ////
    const removeFromFavourite = (id) => {

        router.delete(route('favourite.destroy', [id, 'land']), {
            preserveScroll: true,
        });
    }

    return (

        <div className="shadow-md rounded-md !max-w-72">

            <Link href={route('post' ,['land' ,_land.id])}>
                <figure className="relative">
                    <div className="absolute right-0 overflow-hidden bg-white/80 px-2 py-1">
                        <code className="font-bold text-secondary flex"><MapIcon width={'1.3em'} height={'1.3em'} /> {_land.city.name}</code>
                    </div>
                    <img src={_land.land_images[0]?.image_url} className="w-fit h-48 object-cover rounded-t-md" loading="lazy" alt="property image" />
                </figure>
            </Link>

            <div className="relative flex flex-col">

                <div className="absolute top-[-14px] w-full flex shadow-md bg-white/80 px-2 py-1">
                    <code className="mx-auto text-secondary font-bold">{_land.land_type}</code>
                    {!_land.IsFavourited && <button className="absolute right-0 top-0 px-3 py-1 text-secondary font-bold" onClick={() => addToFavourite(_land.id)}>

                        <BookmarkIcon width={'1.3em'} height={'1.3em'} />
                    </button>}

                    {_land.IsFavourited && <button className="absolute right-0 top-0 px-3 py-1 text-secondary font-bold" onClick={() => removeFromFavourite(_land.id)}>

                        <BookmarkSolidIcon width={'1.3em'} height={'1.3em'} />
                    </button>}
                </div>

                <div className="px-2 pt-7 flex justify-between">
                    <code className="flex"><AreaIcon width={'1.3em'} height={'1.3em'} className={' mr-2'} /> {calcPerch(_land.area)}</code>
                </div>

                <div className="px-2 pt-3 flex justify-center text-lg">

                    {_land.offers[0] && <del className="text-gray-500">LKR {simpliPrice(_land.price)} &nbsp;</del>}

                    <code className="font-_Oswald font-semibold text-primary">
                        LKR {calcDiscount(_land.price, _land.offers[0] ? _land.offers[0].discount_value : null)}
                    </code>
                </div>

                <Link href={route('post' ,['land' ,_land.id])} className="px-2 mt-3 mb-3 hyphens-auto break-words font-semibold text-blue-500">
                    {truncateTitle(_land.title)}
                </Link>

            </div>

        </div>
    );

}
