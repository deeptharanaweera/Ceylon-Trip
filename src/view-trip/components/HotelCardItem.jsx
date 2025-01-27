import Autoplay from "embla-carousel-autoplay";

import {
    Carousel,
    CarouselContent,
    CarouselItem
} from "@/components/ui/carousel";
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobaAPI';
import React, { useEffect, useState } from 'react';
import { SiGooglemaps } from 'react-icons/si';
import { Link } from 'react-router-dom';

function HotelCardItem({ hotel, index }) {
    const plugin = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: true })
    )

    const [photoUrl, setPhotoUrl] = useState([]);

    useEffect(() => {
        if (hotel) {
            GetPlacePhoto();
        }
    }, [hotel]);

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: hotel?.hotelName
        };

        try {
            const result = await GetPlaceDetails(data);
            const places = result.data.places;

            if (places && places.length > 0) {
                const allPhotoUrls = []; // Temporary array to store photo URLs

                places.forEach(place => {
                    if (place.photos && place.photos.length > 0) {
                        const photoUrls = place.photos.map(photo =>
                            PHOTO_REF_URL.replace('{NAME}', photo.name)
                        );
                        allPhotoUrls.push(...photoUrls); // Add URLs to the temporary array
                    }
                });

                setPhotoUrl(allPhotoUrls); // Update the state with all photo URLs
            } else {
                console.log('No places found.');
                setPhotoUrl([]); // Clear the state if no places are found
            }
        } catch (error) {
            console.error('Error fetching place details:', error);
        }
    };

    return (
        <Link to={'https://www.google.com/maps/search/?api=1&query=' + hotel?.hotelName + hotel?.address} target="_blank" key={index} className="bg-white rounded-xl border-2 shadow-lg hover:scale-105 transition-all cursor-pointer">
            {/* <img src={photoUrl} alt="" className="w-full rounded-t-xl" /> */}
            {photoUrl.length > 0 ? (
                <Carousel
                    plugins={[plugin.current]}
                    className="w-full "
                    onMouseEnter={plugin.current.stop}
                    onMouseLeave={plugin.current.reset}
                >
                    <CarouselContent className="-ml-2 md:-ml-4">
                        {photoUrl.map((url, index) => (
                            <CarouselItem key={index} className="pl-2 md:pl-4">
                                <img src={url} alt={`Place ${index + 1}`} className="w-full h-[300px] object-cover xl:rounded-t-xl rounded-t-xl" />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    {/* <CarouselPrevious />
                        <CarouselNext /> */}
                </Carousel>
            ) : (
                <div className="w-full h-[300px]">
                    
                </div>
            )}  
            <div className="p-2 px-4  flex flex-col gap-2">
                <div className="lg:flex flex md:flex justify-between w-full">
                    <div className="flex justify-center items-center">
                        <SiGooglemaps className="text-md text-gray-600" />
                        <h2 className="text-md text-gray-600">{hotel?.address}</h2>
                    </div>
                    <div className="">
                        <p className="font-semibold text-gray-600">⭐{hotel?.rating} stars</p>
                    </div>
                </div>
                <div className="">
                    <h2 className="text-xl font-semibold font-poppins text-black">{hotel?.hotelName}</h2>
                    <p className="text-sm font-poppins text-gray-500">{hotel?.description}</p>
                </div>

                <hr className="h-1 rounded-full bg-gray-200 m-3" />

                <div className="mb-5">
                    <div className="flex items-center justify-start gap-1">
                        {/* <BsCurrencyDollar className="text-xl font-bold text-red-600" /> */}
                        <h2 className="text-xl font-bold text-orange-500">{hotel?.price}</h2>
                        {/* <IoMdTime className="text-xl font-bold text-gray-600" /> */}
                    </div>
                </div>

            </div>
        </Link>
    )
}

export default HotelCardItem