import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobaAPI";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function BeachPlaceCard({ place, index }) {
  const [photoUrl, setPhotoUrl] = useState([]);

  useEffect(() => {
    place && GetPlacePhoto();
  }, [place]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: place?.placeName
    };
    const result = await GetPlaceDetails(data).then(resp => {
      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[0].name);
      setPhotoUrl(PhotoUrl);
    })
  };
  return (
        <Link to={`https://www.google.com/maps/search/?api=1&query=${place?.placeName}`} target="_blank" key={index} className="bg-white rounded-xl border-2 shadow-lg hover:scale-105 transition-all cursor-pointer">
          <img src={photoUrl ? photoUrl : "/Asset 2xxxhdpi.png"} alt="Place" className="w-full h-[250px] object-cover rounded-t-xl" />
          <div className="p-2 px-4 flex flex-col gap-2">
            <div className="lg:flex flex md:flex justify-between w-full">
              <div className="flex justify-center items-center">
                {/* <SiGooglemaps className="text-md text-gray-600" />
                      <h2 className="text-md text-gray-600">{item?.address}</h2> */}
              </div>
              <div className="">
                <p className="font-semibold text-gray-600">⭐{place?.rating} stars</p>
              </div>
            </div>
            <div className="">
              <h2 className="text-xl font-semibold font-poppins text-black">{place.placeName}</h2>
              <p className="text-sm font-poppins text-gray-500">{place?.placeDetails}</p>
            </div>
            <div className="mb-2">
              <div className="flex flex-col items-start justify-start gap-1">
                <div className="flex justify-center items-center gap-2">
                  <h2 className="text-xl font-bold text-orange-500">Adult </h2>
                  <span className="bg-blue-600 px-2 rounded-xl text-white">{place?.ticketPricing?.adult}</span>
                </div>
                <div className="flex justify-center items-center gap-2">
                  <h2 className="text-xl font-bold text-orange-500">Child </h2>
                  <span className="bg-blue-600 px-2 rounded-xl text-white">{place?.ticketPricing?.child}</span>
                </div>

              </div>
            </div>
          </div>
        </Link>
  )
}

export default BeachPlaceCard