import { Skeleton } from "@/components/ui/skeleton";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { IoIosArrowUp } from "react-icons/io";
import { useInView } from "react-intersection-observer";
import BeachPlaceCard from "./BeachPlaceCard";




function Hero() {
  const [showScroll, setShowScroll] = useState(false);

  const tripId = '1737990301974';
  const [place, setPlace] = useState([]);

  useEffect(() => {
    tripId && GetTripData();
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [tripId])

  const GetTripData = async () => {
    const docRef = doc(db, 'Sri_Lanka_Travel_Places', tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document: ", docSnap.data());
      setPlace(docSnap.data());
    }
    else {
      console.log("No such document!");
    }
  }




  const { ref: section1Ref, inView: section1InView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  const { ref: section2Ref, inView: section2InView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  const { ref: section3Ref, inView: section3InView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  const { ref: section4Ref, inView: section4InView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  const { ref: section5Ref, inView: section5InView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )
  return (
    <div className=" mt-[64px] relative">

      <div className="relative">
        <div>
          <Carousel
            plugins={[plugin.current]}
            className="w-full "
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              <CarouselItem><img src="/woman-taking-photo-morning-mist-phu-lang-ka-phayao-thailand.png" className="h-[220px] md:h-[570px] w-full object-cover" /></CarouselItem>
              <CarouselItem><img src="/scenic-sl.jpg" className="h-[220px] md:h-[570px] w-full object-cover" /></CarouselItem>
              <CarouselItem><img src="/pexels-akthar-595196.jpg" className="h-[220px] md:h-[570px] w-full object-cover" /></CarouselItem>
              <CarouselItem><img src="/pexels-malindabandaralk-16508234.jpg" className="h-[220px] md:h-[570px] w-full object-cover" /></CarouselItem>
              <CarouselItem><img src="/1674104582293.jpeg" className="h-[220px] md:h-[570px] w-full object-cover" /></CarouselItem>
            </CarouselContent>
          </Carousel>
        </div>
        <div className="bg-transparent  flex flex-col items-center md:w-2/3 px-0 md:absolute mx-4 md:mx-0 md::top-3/4 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/4 text-center md:z-5">
          <div className="bg-white opacity-75 rounded-tr-[150px] rounded-tl-[150px] pb-4  md:pb-10">
            <h1 className="font-italic font-semibold lg:text-[32px] md:text-[50px] text-center ">
              <span className="text-[#6a3002] text-[38px] md:text-[64px] font-bold">
                Discover Your Next Trip With <span className="text-yellow-400 text-[70px] md:text-[100px] font-bold">AI</span>
              </span>

            </h1>
            <h1 className="font-italic font-semibold text-[25px] md:text-[50px] text-center">Discover personalized itineraries and top destinations to your preferences.</h1>
          </div>
          <p className="font-poppins text-justify md:text-center text-gray-600 bg-white md:text-xl">
            Plan your dream trip effortlessly with our AI-powered travel planner. Discover personalized itineraries, top destinations, and hidden gems tailored to your preferences. From accommodations to activities, let our intelligent assistant create a seamless and unforgettable travel experience for you.
          </p>
          <Link to={'/create-trip'} className=" text-xl font-bold text-white bg-[#853b01] px-10 py-4 outline-none hover:bg-[#6a3002] hover:text-white rounded-xl mt-6 mb-10">
            Start your journey today!
          </Link>
        </div>
      </div>
      <div className="md:h-[400px]">

      </div>

      <div ref={section1Ref}
        className={`sm:px-10 md:px-32 lg:px-56 xl:px-50 px-5 mb-20  transition-opacity duration-1000 ease-linear ${section1InView
          ? "translate-y-0 opacity-100"
          : "translate-y-[50px] opacity-0"
          }`}
      >
        <h1 className="font-bold font-poppins text-[35px] md:text-[65px] xl:text-[65px] text-yellow-500">Beautiful <span className="text-[#6a3002]">Beaches</span></h1>
        <p className="text-md md:text-xl xl:text-xl text-gray-500">Sri Lanka, often referred to as the "Pearl of the Indian Ocean," is home to some of the most stunning beaches in the world. With golden sands, turquoise waters, and a warm tropical climate, the island offers a beach experience like no other. Here are some of the most captivating beaches you can explore</p>
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-5  xl:mt-10">
          {place?.placeData?.itinerary?.categories?.beach ? (
            place?.placeData?.itinerary?.categories?.beach.map((beach, index) => (
              <BeachPlaceCard place={beach} key={index} />

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
          )
          }
        </div>
      </div>

      <div ref={section2Ref}
        className={`sm:px-10 md:px-32 lg:px-56 xl:px-50 px-5 mb-20  transition-opacity duration-1000 ease-linear ${section2InView
          ? "translate-y-0 opacity-100"
          : "translate-y-[50px] opacity-0"
          }`}>
        <h1 className="font-bold font-poppins text-[35px] md:text-[65px] xl:text-[65px] text-yellow-500">Historical <span className="text-[#6a3002]">Places</span></h1>
        <p className="text-md md:text-xl xl:text-xl text-gray-500">Sri Lanka, a land rich in history and culture, is home to a wealth of historical sites that showcase its ancient civilizations, religious heritage, and colonial influences. These sites offer a fascinating glimpse into the island s vibrant past, making it a must-visit destination for history enthusiasts. Here are some of the most iconic historical places in Sri Lanka</p>
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-5  xl:mt-10">
          {place?.placeData?.itinerary?.categories?.historical ? (
            place?.placeData?.itinerary?.categories?.historical.map((historical, index) => (
              <BeachPlaceCard place={historical} key={index} />

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
          )
          }
        </div>
      </div>



      <div ref={section3Ref}
        className={`sm:px-10 md:px-32 lg:px-56 xl:px-50 px-5 mb-20  transition-opacity duration-1000 ease-linear ${section3InView
          ? "translate-y-0 opacity-100"
          : "translate-y-[50px] opacity-0"
          }`}>
        <h1 className="font-bold font-poppins text-[35px] md:text-[65px] xl:text-[65px] text-yellow-500">Look Our <span className="text-[#6a3002]">Nature</span></h1>
        <p className="text-md md:text-xl xl:text-xl text-gray-500">Sri Lanka, known as the "Emerald Isle," is a treasure trove of natural beauty. From lush rainforests and misty mountains to pristine beaches and wildlife-rich parks, the island offers an unparalleled experience for nature lovers. Here are some of the most stunning natural attractions in Sri Lanka</p>
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-5  xl:mt-10">
          {place?.placeData?.itinerary?.categories?.nature ? (
            place?.placeData?.itinerary?.categories?.nature.map((historical, index) => (
              <BeachPlaceCard place={historical} key={index} />

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
          )
          }
        </div>
      </div>

      <div ref={section4Ref}
        className={`sm:px-10 md:px-32 lg:px-56 xl:px-50 px-5 mb-20  transition-opacity duration-1000 ease-linear ${section4InView
          ? "translate-y-0 opacity-100"
          : "translate-y-[50px] opacity-0"
          }`}>
        <h1 className="font-bold font-poppins text-[35px] md:text-[65px] xl:text-[65px] text-yellow-500">Old <span className="text-[#6a3002]">Infrastructure</span></h1>
        <p className="text-md md:text-xl xl:text-xl text-gray-500">Sri Lanka’s old infrastructure reflects its rich history, showcasing the ingenuity of ancient civilizations, colonial influences, and a deep connection to nature. These structures, some of which remain functional, are a testament to the island’s architectural brilliance and engineering skills</p>
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-5  xl:mt-10">
          {place?.placeData?.itinerary?.categories?.infrastructure ? (
            place?.placeData?.itinerary?.categories?.infrastructure.map((historical, index) => (
              <BeachPlaceCard place={historical} key={index} />

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
          )
          }
        </div>
      </div>

      <div ref={section5Ref}
        className={`sm:px-10 md:px-32 lg:px-56 xl:px-50 px-5 mb-20  transition-opacity duration-1000 ease-linear ${section5InView
          ? "translate-y-0 opacity-100"
          : "translate-y-[50px] opacity-0"
          }`}>
        <h1 className="font-bold font-poppins text-[35px] md:text-[65px] xl:text-[65px] text-yellow-500">Religious  <span className="text-[#6a3002]">Heritage</span></h1>
        <p className="text-md md:text-xl xl:text-xl text-gray-500">Sri Lanka, often referred to as the "Land of Serendipity," is a spiritual haven with a rich tapestry of religious traditions. The island is home to a diverse range of sacred sites representing Buddhism, Hinduism, Christianity, and Islam, each showcasing profound devotion, intricate architecture, and centuries-old traditions.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-5  xl:mt-10">
          {place?.placeData?.itinerary?.categories?.religious ? (
            place?.placeData?.itinerary?.categories?.religious.map((historical, index) => (
              <BeachPlaceCard place={historical} key={index} />

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
          )
          }
        </div>
      </div>
      {/* Scroll to Top Button */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 bg-yellow-500 border-none text-white px-4 py-4 rounded-full shadow-lg hover:scale-110 transition-all"
          aria-label="Scroll to top"
        >
          <IoIosArrowUp className="md:text-4xl font-bold" />
        </button>
      )}
      <Footer />
    </div>
  )
}

export default Hero