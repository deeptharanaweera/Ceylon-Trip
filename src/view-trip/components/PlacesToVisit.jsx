import { Skeleton } from "@/components/ui/skeleton";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import PlaceCardItem from "./PlaceCardItem";
function PlacesToVisit({ trip }) {
    
    return (
        <div className="p-3">
            <div>
                <h1 className="font-semibold font-poppins text-[40px] md:text-[65px] xl:text-[65px] text-yellow-500">See Your <span className="text-[40px] md:text-[65px] xl:text-[65px] font-bold text-[#6a3002]">Plan</span></h1>
                <p className="xl:text-xl font-poppins text-gray-500">This plan  helps for allocate time effectively, ensuring you can visit  desired locations without rushing or missing out.</p>
            </div>

            <div className="my-5 md:my-8 xl:my-8">
            {trip.tripData?.itinerary? (
                trip.tripData?.itinerary.map((item, index) => (
                    <Accordion type="single" key={index} collapsible className="py-5">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>
                                <div className="flex flex-col justify-start items-start">
                                <h2 className="text-xl md:text-xl xl:text-2xl font-bold font-poppins">{item?.day}</h2>
                                <p className="text-md md:text-xl xl:text-xl font-poppins ">Best To Visit-<span className="font-bold">{item?.bestTimeToVisit}</span></p>
                                </div>
                            </AccordionTrigger>
                            {item.plan?.map((place, index)=>(
                            <AccordionContent key={index} className='px-3 md:px-32 xl:px-32 py-5 md:py-10 xl:py-10'>
                                <PlaceCardItem place={place}/>
                            </AccordionContent>
                            ))}
                        </AccordionItem>
                    </Accordion>
                )) 
            ) : (
                <div className="flex  flex-col gap-5">
                        {Array(2).fill().map((_, index) => (
                            <div key={index} className="flex flex-col space-y-2 ">
                                <Skeleton className="h-[90px]  rounded-xl" />
                                
                            </div>
                        ))}
                    </div>
            )}
            </div>

        </div>
    )
}

export default PlacesToVisit