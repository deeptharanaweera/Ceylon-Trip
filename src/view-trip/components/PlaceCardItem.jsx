
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobaAPI";
import { useEffect, useState } from "react";
import { IoMdPricetags, IoMdTime } from "react-icons/io";
import { Link } from "react-router-dom";

function PlaceCardItem({ place }) {
        const [photoUrl, setPhotoUrl] = useState([]);
    
        useEffect(() => {
                place&&GetPlacePhoto();
        }, [place]);
    
        const GetPlacePhoto = async () => {
            const data = {
                textQuery: place?.placeName
            };
    
            const result = await GetPlaceDetails(data).then(resp=>{
                const PhotoUrl= PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[0].name);
                setPhotoUrl(PhotoUrl);
            })
        };
    return (
        <Link className="flex flex-col md:flex-row xl:flex-row w-full justify-between items-center border rounded-2xl shadow-xl">
            <div className="w-full md:w-3/4 xl:w-3/4">
                <img src={photoUrl?photoUrl:"/images (9).jpeg"} alt="Place Image" className="w-full rounded-t-2xl md:rounded-tr-none xl:rounded-tr-none md:rounded-l-2xl xl:rounded-l-2xl object-cover h-[250px] md:h[400px] xl:h-[400px]" />
            </div>
            <div className="w-full mx-10 flex p-4 md:p-0 xl:p-0 flex-col h-full items-start">
                <h2 className="md:text-xl xl:text-xl text-orange-500 font-semibold ">⭐⭐⭐{place.rating} Rates</h2>
                <h1 className="font-bold text-[28px] xl:text-[40px] py-2 md:py-5 xl:py-5 text-black">{place?.placeName}</h1>
                <p className="md:text-xl xl:text-xl font-poppins text-gray-600">{place?.placeDetails}</p>
                <div className="flex items-center  gap-2 bg-gray-200 py-2 px-4 rounded-xl my-2 md:my-5 xl:my-5 ">
                    <IoMdTime className="md:text-4xl xl:text-4xl text-red-600"/>
                    <p className="md:text-xl xl:text-xl font font-semibold flex items-center justify-center text-black">{place?.travelTime}</p>
                </div>
                <div className="flex justify-between items-center gap-2 bg-blue-600 p-2 rounded-xl md:my-5 xl:my-5 ">
                    <IoMdPricetags  className="text-2xl md:text-4xl xl:text-4xl text-green-500"/>
                    <h2 className="md:text-xl xl:text-xl font-poppins text-white font-semibold flex items-center justify-center">Ticket : </h2>
                    <p className="md:text-xl xl:text-xl font font-semibold flex items-center justify-center text-black bg-white rounded-xl py-1 px-5">{place?.ticketPricing}</p>
                </div>
            </div>
        </Link>
    )
}

export default PlaceCardItem