import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobaAPI";
import React, { useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { FaCoins } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";



function InfoSection({ trip }) {

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  const [photoUrl, setPhotoUrl] = useState([]);

  useEffect(() => {
    if (trip) {
      GetPlacePhoto();
    }
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: `Popular travel spots in ${trip?.userSelection?.Location?.label} 10 photos`
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
    <div className="">
      <div className="flex flex-col justify-center items-start">
        <h1 className="font-bold font-poppins xl:mb-5 p-3 xl:text-[60px] text-3xl">{trip?.userSelection?.Location?.label}</h1>
        {/* <img src={photoUrl[7]} alt="" className="w-full h-[400px] object-cover xl:rounded-r-xl rounded-tr-xl rounded-tl-xl" /> */}
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
                  <img src={url} alt={`Place ${index + 1}`} className="w-full xl:h-[400px] h-[300px] object-cover xl:rounded-r-xl xl:rounded-tr-xl xl:rounded-tl-xl" />
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* <CarouselPrevious />
            <CarouselNext /> */}
          </Carousel>
        ) : (
          <div className="w-full h-[400px] border xl:rounded-r-xl rounded-tr-xl rounded-tl-xl flex items-center justify-center">
              <svg aria-hidden="true" className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
          </div>
        )}


        <div className="flex border-2 border-[#6a3002] xl:rounded-bl-xl md:rounded-bl-xl xl:rounded-br-xl md:rounded-br-xl w-full xl:h-auto h-14 gap-0 xl:w-1/2 bg-gray-100">
          <div className="flex justify-center gap-2 xl:gap-3 xl:p-2 p-1 border-r-2 border-[#6a3002] w-full">
            <FaCoins className="text-[#6a3002] text-xl xl:text-3xl" />
            <p className="text-md xl:text-xl font-semibold">{trip?.userSelection?.budget} Budget</p>
          </div>
          <div className="flex justify-center gap-2 xl:gap-3 p-2 w-full">
            <FaCalendarAlt className="text-[#6a3002] text-xl xl:text-3xl" />
            <p className="text-md xl:text-xl font-semibold">{trip?.userSelection?.noOfDays} Days</p>
          </div>
          <div className="flex justify-center gap-2 xl:gap-3 p-2 border-l-2 border-[#6a3002] w-full">
            <IoPerson className="text-[#6a3002] text-xl xl:text-3xl" />
            <p className="text-md xl:text-xl font-semibold">{trip?.userSelection?.traveler}</p>
          </div>
        </div>

      </div>

    </div>
  )
}

export default InfoSection