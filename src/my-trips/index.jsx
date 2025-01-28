import Footer from "@/components/custom/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/service/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserTripCardItem from "./components/UserTripCardItem";


function MyTrips() {
    const navigation = useNavigate();
    const [userTrips, setUserTrips] = useState([]);

    useEffect(() => {
        GetUserTrip();
    }, []);

    const GetUserTrip = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigation('/');
            return;
        }

        // Fetch data once and update state in a batch
        const q = query(collection(db, 'AITrips'), where('userEmail', '==', user?.email));
        const querySnapshot = await getDocs(q);
        const trips = []; // Temporary array to store trips

        querySnapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data());
            trips.push(doc.data());
        });

        setUserTrips(trips); // Update state only once
    };

    return (
        <div>
        <div className="p-5 md:p-10 lg:p-10 xl:p-10 md:px-20 lg:px-20 xl:px-28 mt-[70px] md:mt-[80px]">
            <h1 className="font-bold font-poppins text-[40px] md:text-[65px] xl:text-[65px] text-yellow-500">
                My <span className="text-[#6a3002]">Trips</span>
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mt-5 md:mt-10 xl:mt-10">
                {userTrips.length>0 ? (
                    userTrips.map((trip, index) => (
                        <UserTripCardItem key={index} trip={trip} />
                    ))
                ):(
                    <div className="flex md:flex-row xl:flex-row flex-col gap-5">
                        {Array(4).fill().map((_, index) => (
                            <div key={index} className="flex flex-col space-y-2">
                                <Skeleton className="h-[250px] w-full rounded-xl" />
                                <div className="space-y-2">
                                    <Skeleton className="h-2 w-full" />
                                    <Skeleton className="h-2 w-[350px]" />
                                    <Skeleton className="h-5 w-full" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
            <Footer/>
        </div>
    );
}

export default MyTrips;
