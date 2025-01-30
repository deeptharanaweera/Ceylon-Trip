import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobaAPI";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { SiActualbudget } from "react-icons/si";
import { Link } from "react-router-dom";
import logo from '/Asset 2xxxhdpi.png';

function UserTripCardItem({ trip }) {
    const [photoUrl, setPhotoUrl] = useState([]);
        
            useEffect(() => {
                    trip&&GetPlacePhoto();
            }, [trip]);
        
            const GetPlacePhoto = async () => {
                const data = {
                    textQuery: trip?.tripData?.location
                };
        
                const result = await GetPlaceDetails(data).then(resp=>{
                    const PhotoUrl= PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[0].name);
                    setPhotoUrl(PhotoUrl);
                })
            };
    return (
        <Link to={'/view-trip/'+ trip?.id} className="bg-white rounded-xl border-2 shadow-lg hover:scale-105 transition-all cursor-pointer ">
            <img src={photoUrl?photoUrl: logo} alt="" className="w-full rounded-t-xl object-cover h-[250px] md:h[250px] xl:h-[250px]"/>
            <div className="p-2 px-4  flex flex-col gap-2 w-full">
                <div className="lg:flex flex md:flex justify-between w-full">
                    <div className="flex justify-between w-full items-center gap-2 ">
                        <p className="flex justify-center items-center  bg-[#00FFFF] py-1 px-1 rounded-xl text-black w-1/3">{trip?.tripData?.duration}</p>
                        <p className="flex justify-center items-center  bg-[#00FF00] py-1 md:px-1 rounded-xl text-black w-1/3">{trip?.tripData?.travelers}</p>
                        <p className="flex justify-center items-center gap-1 bg-[#FFFF00] py-1 px-1 rounded-xl text-black w-1/3"><SiActualbudget />{trip?.tripData?.budget}</p>
                    </div>
                </div>
                <div className="py-2 flex flex-col gap-1">
                    <h2 className="text-2xl font-bold font-poppins text-black">{trip?.tripData?.location}</h2>
                    <div className="flex items-center gap-2">
                        <FaRegCalendarAlt className="text-xl font-bold text-red-600" />
                        <h2 className="text-xl font-bold text-orange-500">{dayjs(trip?.createdAt).format('YYYY-MM-DD')}</h2>
                    </div>
                </div>
                
            </div>
        </Link>
    )
}

export default UserTripCardItem