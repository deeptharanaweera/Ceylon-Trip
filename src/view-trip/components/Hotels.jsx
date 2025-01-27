import { Skeleton } from "@/components/ui/skeleton";
import HotelCardItem from "./HotelCardItem";


function Hotels({ trip }) {
    return (
        <div className="xl:py-20 py-10 px-3">
            <p className="xl:text-2xl md:text-2xl text-xl text-gray-500">Here the</p>
            <h1 className="font-bold font-poppins text-[40px] md:text-[65px] xl:text-[65px] text-yellow-500">Recommended <span className="text-[#6a3002]">Hotels</span> <span className="text-xl md:text-3xl xl:text-3xl text-black">for you</span></h1>
            <p className="text-xl md:text-2xl xl:text-2xl text-orange-500">selection is up to you</p>

            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-5  xl:mt-10">
                {trip?.tripData?.hotels ? (
                    trip.tripData.hotels.map((hotel, index) => (
                        <HotelCardItem hotel={hotel} key={index} />
                    ))
                ) : (
                    <div className="flex md:flex-row xl:flex-row flex-col gap-5">
                        {Array(4).fill().map((_, index) => (
                            <div key={index} className="flex flex-col space-y-2">
                                <Skeleton className="h-[350px] w-full rounded-xl" />
                                <div className="space-y-2">
                                    <Skeleton className="h-2 w-full" />
                                    <Skeleton className="h-2 w-[350px]" />
                                    <Skeleton className="h-5 w-full" />
                                    <Skeleton className="h-1 w-full my-2" />
                                    <Skeleton className="h-2 w-[340px]" />
                                </div>
                            </div>
                        ))}
                    </div>


                )}
            </div>

        </div>
    )
}

export default Hotels