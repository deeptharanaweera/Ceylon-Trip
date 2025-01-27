import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { IoShareSocial } from "react-icons/io5";
import { useParams } from "react-router-dom";
import Hotels from "../components/Hotels";
import InfoSection from "../components/InfoSection";
import PlacesToVisit from "../components/PlacesToVisit";

function ViewTrip() {
    const { tripId } = useParams();
    const [trip, setTrip] = useState([]);

    useEffect(() => {
        tripId && GetTripData();
    }, [tripId])

    const GetTripData = async () => {
        const docRef = doc(db, 'AITrips', tripId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document: ", docSnap.data());
            setTrip(docSnap.data());
        }
        else {
            console.log("No such document!");
        }
    }
    return (
        <div className=" md:p-10 lg:p-10 xl:p-10  md:px-20 lg:px-20 xl:px-28 relative  mt-[70px] md:mt-[80px]">
            {/* Info Section */}
            <InfoSection trip={trip} />
            {/* Hotels */}
            <Hotels trip={trip}/>

            {/* Places to visit */}
            <PlacesToVisit trip={trip}/>


            <div className="bg-blue-500 flex flex-col items-center rounded-full w-20 h-20 hover:scale-110 transition-all hover:text-6xl absolute bottom-0 right-0 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
                <button className="bg-transparent text-4xl border-none "><IoShareSocial /></button>
            </div>
        </div>
    )
}

export default ViewTrip