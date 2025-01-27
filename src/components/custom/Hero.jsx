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
import BeachPlaceCard from "./BeachPlaceCard";




function Hero() {
  //   const [aiPlaceDetails, setAiPlaceDetails] = useState(null);
  //   const apiKey = import.meta.env.VITE_TRIP_PLAN_GEMINI_API_KEY;
  //   const genAI = new GoogleGenerativeAI(apiKey);

  //   const model = genAI.getGenerativeModel({
  //       model: "gemini-2.0-flash-exp",
  //   });

  //   const generationConfig = {
  //       temperature: 1,
  //       topP: 0.95,
  //       topK: 40,
  //       maxOutputTokens: 8192,
  //       responseMimeType: "application/json",
  //   };

  //   const fetchItinerary =async()=> {
  //     const chatSession = model.startChat({
  //         generationConfig,
  //         history: [
  //             {
  //                 role: "user",
  //                 parts: [
  //                     { text: "Sri Lanka, all famouse travel places itinerary, categorise with beach, forest and etc with placeName, Place Details, Place image url, Geo coordinates, ticket pricing, rating,  in JSON format.\n\n" },
  //                 ],
  //             },
  //             {
  //                 role: "model",
  //                 parts: [
  //                     { text: "```json\n{\n  \"itinerary\": {\n    \"categories\": {\n      \"beach\": [\n        {\n          \"placeName\": \"Mirissa Beach\",\n          \"placeDetails\": \"A beautiful crescent-shaped beach on the south coast, known for its golden sand, surfing waves, and whale watching opportunities.\",\n          \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Mirissa_Beach_Sri_Lanka.jpg/800px-Mirissa_Beach_Sri_Lanka.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 5.9480,\n            \"longitude\": 80.4615\n          },\n          \"ticketPricing\": {\n            \"adult\": \"Free\",\n            \"child\": \"Free\"\n          },\n          \"rating\": 4.4\n        },\n        {\n          \"placeName\": \"Unawatuna Beach\",\n          \"placeDetails\": \"A popular beach known for its calm waters, coral reefs, and laid-back atmosphere. Ideal for swimming and snorkeling.\",\n          \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Unawatuna_beach_Sri_Lanka_2015-09-02.jpg/800px-Unawatuna_beach_Sri_Lanka_2015-09-02.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 6.0136,\n            \"longitude\": 80.2505\n          },\n          \"ticketPricing\": {\n            \"adult\": \"Free\",\n            \"child\": \"Free\"\n          },\n          \"rating\": 4.3\n        },\n        {\n          \"placeName\": \"Hikkaduwa Beach\",\n          \"placeDetails\": \"A vibrant beach town known for its coral sanctuaries, surfing, and lively nightlife. Popular for snorkeling, diving, and sunbathing.\",\n          \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Hikkaduwa_beach_Sri_Lanka.jpg/800px-Hikkaduwa_beach_Sri_Lanka.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 6.1426,\n            \"longitude\": 80.1030\n          },\n          \"ticketPricing\": {\n            \"adult\": \"Free\",\n            \"child\": \"Free\"\n          },\n          \"rating\": 4.2\n        },\n        {\n          \"placeName\": \"Arugam Bay\",\n          \"placeDetails\": \"A world-renowned surf destination on the east coast, famous for its consistent waves and laid-back surf culture.\",\n          \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Arugam_bay_beach_sri_lanka.jpg/800px-Arugam_bay_beach_sri_lanka.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 6.8418,\n            \"longitude\": 81.8340\n          },\n          \"ticketPricing\": {\n            \"adult\": \"Free\",\n            \"child\": \"Free\"\n          },\n           \"rating\": 4.5\n        },\n         {\n           \"placeName\": \"Bentota Beach\",\n           \"placeDetails\": \"A long stretch of golden sand, known for its calm waters, water sports, and luxury resorts. Popular for families and relaxation.\",\n            \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Bentota_Beach_Sri_Lanka.jpg/800px-Bentota_Beach_Sri_Lanka.jpg\",\n            \"geoCoordinates\": {\n                \"latitude\": 6.4288,\n                \"longitude\": 80.0058\n            },\n             \"ticketPricing\": {\n                \"adult\": \"Free\",\n                \"child\": \"Free\"\n             },\n            \"rating\": 4.3\n          }\n      ],\n      \"historical\": [\n        {\n          \"placeName\": \"Sigiriya Rock Fortress\",\n          \"placeDetails\": \"An ancient rock fortress and palace ruins, rising dramatically from the central plains. Known for its impressive frescoes and stunning panoramic views.\",\n          \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Sigiriya_Sri_Lanka.jpg/800px-Sigiriya_Sri_Lanka.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 7.9579,\n            \"longitude\": 80.7541\n          },\n          \"ticketPricing\": {\n            \"adult\": \"USD 30\",\n            \"child\": \"USD 15\"\n          },\n          \"rating\": 4.7\n        },\n        {\n          \"placeName\": \"Temple of the Tooth (Sri Dalada Maligawa)\",\n          \"placeDetails\": \"A sacred Buddhist temple in Kandy, housing the relic of the tooth of the Buddha. A significant pilgrimage site and a beautiful example of Kandyan architecture.\",\n          \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Sri_Dalada_Maligawa_Kandy_Sri_Lanka_Night_View_2.jpg/800px-Sri_Dalada_Maligawa_Kandy_Sri_Lanka_Night_View_2.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 7.2932,\n            \"longitude\": 80.6402\n          },\n          \"ticketPricing\": {\n            \"adult\": \"LKR 2000\",\n            \"child\": \"LKR 1000\"\n          },\n          \"rating\": 4.6\n        },\n        {\n          \"placeName\": \"Galle Fort\",\n          \"placeDetails\": \"A historic Dutch fort built in the 17th century, now a UNESCO World Heritage site. Features colonial-era buildings, charming streets, and beautiful coastal views.\",\n          \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Galle_fort.jpg/800px-Galle_fort.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 6.0276,\n            \"longitude\": 80.2170\n          },\n          \"ticketPricing\": {\n            \"adult\": \"Free\",\n            \"child\": \"Free\"\n          },\n          \"rating\": 4.5\n        },\n        {\n          \"placeName\": \"Polonnaruwa Ancient City\",\n          \"placeDetails\": \"The second oldest kingdom of Sri Lanka, featuring well-preserved ruins of palaces, temples, and stupas. A UNESCO World Heritage site.\",\n          \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Polonnaruwa_ancient_city_Sri_Lanka.jpg/800px-Polonnaruwa_ancient_city_Sri_Lanka.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 7.9523,\n            \"longitude\": 81.0023\n          },\n          \"ticketPricing\": {\n            \"adult\": \"USD 25\",\n            \"child\": \"USD 12.50\"\n          },\n          \"rating\": 4.5\n        },\n        {\n          \"placeName\": \"Anuradhapura Ancient City\",\n          \"placeDetails\": \"One of Sri Lanka's ancient capitals, with numerous well-preserved ruins of temples, stupas, and monasteries.\",\n          \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Ruwanwelisaya.jpg/800px-Ruwanwelisaya.jpg\",\n           \"geoCoordinates\": {\n            \"latitude\": 8.3333,\n            \"longitude\": 80.4000\n          },\n           \"ticketPricing\": {\n            \"adult\": \"USD 25\",\n             \"child\": \"USD 12.50\"\n           },\n          \"rating\": 4.4\n        }\n      ],\n      \"nature\": [\n        {\n          \"placeName\": \"Yala National Park\",\n          \"placeDetails\": \"Sri Lanka's most famous national park, known for its high density of leopards, elephants, and diverse birdlife. Offers thrilling safari experiences.\",\n          \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Leopard_in_Yala_National_Park.jpg/800px-Leopard_in_Yala_National_Park.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 6.4012,\n            \"longitude\": 81.4903\n          },\n          \"ticketPricing\": {\n            \"adult\": \"USD 40\",\n            \"child\": \"USD 20\"\n          },\n          \"rating\": 4.5\n        },\n        {\n          \"placeName\": \"Ella Rock\",\n          \"placeDetails\": \"A prominent cliff in Ella offering stunning views of the surrounding hill country, including the Ella Gap. A popular hiking destination.\",\n          \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Ella_Rock_Sri_Lanka.jpg/800px-Ella_Rock_Sri_Lanka.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 6.8580,\n            \"longitude\": 81.0536\n          },\n          \"ticketPricing\": {\n            \"adult\": \"Free\",\n            \"child\": \"Free\"\n          },\n          \"rating\": 4.6\n        },\n        {\n          \"placeName\": \"Adam's Peak (Sri Pada)\",\n          \"placeDetails\": \"A sacred mountain with a footprint-shaped indentation at the summit, believed to be that of Buddha, Shiva, or Adam, depending on religious beliefs. A popular pilgrimage site.\",\n          \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Adams_peak_mountain_Sri_Lanka.jpg/800px-Adams_peak_mountain_Sri_Lanka.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 6.8155,\n            \"longitude\": 80.4951\n          },\n          \"ticketPricing\": {\n            \"adult\": \"LKR 500\",\n            \"child\": \"LKR 250\"\n          },\n          \"rating\": 4.4\n        },\n        {\n          \"placeName\": \"Horton Plains National Park\",\n          \"placeDetails\": \"A protected area of montane grassland and cloud forest, famous for World's End, a dramatic escarpment with stunning views.\",\n          \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Horton_Plains_National_Park_World_End.JPG/800px-Horton_Plains_National_Park_World_End.JPG\",\n          \"geoCoordinates\": {\n            \"latitude\": 6.7975,\n            \"longitude\": 80.8251\n          },\n          \"ticketPricing\": {\n            \"adult\": \"USD 20\",\n            \"child\": \"USD 10\"\n          },\n          \"rating\": 4.5\n        },\n        {\n          \"placeName\": \"Pinnawala Elephant Orphanage\",\n          \"placeDetails\": \"An orphanage and breeding ground for Asian elephants, offering visitors the chance to observe and interact with these magnificent animals.\",\n          \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Pinnawala_Elephant_Orphanage_Sri_Lanka.jpg/800px-Pinnawala_Elephant_Orphanage_Sri_Lanka.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 7.2948,\n            \"longitude\": 80.4047\n          },\n          \"ticketPricing\": {\n            \"adult\": \"LKR 3000\",\n            \"child\": \"LKR 1500\"\n          },\n          \"rating\": 4.3\n        },\n         {\n          \"placeName\": \"Knuckles Mountain Range\",\n          \"placeDetails\": \"A mountain range with dramatic peaks, cloud forests, and diverse wildlife. Offers challenging hiking trails and stunning panoramic views.\",\n          \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Knuckles_Mountain_Range_Sri_Lanka.jpg/800px-Knuckles_Mountain_Range_Sri_Lanka.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 7.4472,\n            \"longitude\": 80.8356\n          },\n          \"ticketPricing\": {\n            \"adult\": \"LKR 1000\",\n            \"child\": \"LKR 500\"\n          },\n           \"rating\": 4.4\n          }\n      ],\n      \"infrastructure\": [\n        {\n          \"placeName\": \"Nine Arch Bridge\",\n          \"placeDetails\": \"A beautiful colonial-era railway bridge, known for its nine arches and lush surrounding scenery, located near Ella.\",\n          \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Nine_Arch_Bridge_Sri_Lanka.jpg/800px-Nine_Arch_Bridge_Sri_Lanka.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 6.8728,\n            \"longitude\": 81.0405\n          },\n          \"ticketPricing\": {\n            \"adult\": \"Free\",\n            \"child\": \"Free\"\n          },\n          \"rating\": 4.5\n        }\n      ],\n      \"religious\": [\n        {\n           \"placeName\": \"Dambulla Cave Temple\",\n           \"placeDetails\": \"A complex of cave temples featuring numerous Buddha statues and vibrant murals, dating back to the 1st century BC.\",\n           \"placeImageUrl\":\"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Dambulla_Cave_Temple_Sri_Lanka.jpg/800px-Dambulla_Cave_Temple_Sri_Lanka.jpg\",\n           \"geoCoordinates\":{\n            \"latitude\": 7.8520,\n            \"longitude\": 80.6515\n           },\n          \"ticketPricing\": {\n              \"adult\": \"LKR 2000\",\n              \"child\": \"LKR 1000\"\n            },\n          \"rating\": 4.5\n        },\n        {\n          \"placeName\": \"Jaya Sri Maha Bodhi\",\n           \"placeDetails\": \"A sacred fig tree in Anuradhapura, believed to be a sapling of the Bodhi tree under which the Buddha attained enlightenment. A major pilgrimage site.\",\n            \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Jaya_Sri_Maha_Bodhi%2C_Anuradhapura.jpg/800px-Jaya_Sri_Maha_Bodhi%2C_Anuradhapura.jpg\",\n             \"geoCoordinates\":{\n              \"latitude\": 8.3424,\n              \"longitude\": 80.3991\n            },\n            \"ticketPricing\":{\n                \"adult\": \"Free\",\n                \"child\": \"Free\"\n              },\n            \"rating\": 4.3\n        }\n      ]\n    }\n  }\n}\n```" },
  //                 ],
  //             },
  //         ],
  //     });

  //     const result = await chatSession.sendMessage("Sri Lanka, all famouse travel places itinerary, categorise with beach, forest and etc with placeName, Place Details, Place image url, Geo coordinates, ticket pricing, rating,  in JSON format.");
  //     // console.log(response.response.text());
  //     SaveAiTrip(result?.response?.text());
  // }
  //   useEffect(()=>{
  //     if(aiPlaceDetails === null){

  //       fetchItinerary();
  //     }
  //   },[apiKey])
  // console.log(aiPlaceDetails)



  // const SaveAiTrip = async (aiPlaceDetails) => {

  //     const docId = Date.now().toString();
  //     const currentDate = new Date().toISOString();
  //     await setDoc(doc(db, "Sri_Lanka_Travel_Places", docId), {

  //       placeData: JSON.parse(aiPlaceDetails),
  //       id: docId,
  //       createdAt: currentDate,
  //     });

  //   }


  const tripId = '1737990301974';
  const [place, setPlace] = useState([]);

  useEffect(() => {
    tripId && GetTripData();
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






  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )
  return (
    <div className=" mt-[64px]">

      <div className="relative">
        <div>
          <Carousel
            plugins={[plugin.current]}
            className="w-full "
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              <CarouselItem><img src="/scenic-sl.jpg" className="h-[220px] md:h-auto w-full object-cover" /></CarouselItem>
              <CarouselItem><img src="/scenic-sl.jpg" className="h-[220px] md:h-auto w-full object-cover" /></CarouselItem>
              <CarouselItem><img src="/scenic-sl.jpg" className="h-[220px] md:h-auto w-full object-cover" /></CarouselItem>
              <CarouselItem><img src="/scenic-sl.jpg" className="h-[220px] md:h-auto w-full object-cover" /></CarouselItem>
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

      <div className="sm:px-10 md:px-32 lg:px-56 xl:px-50 px-5 mb-20">
        <h1 className="font-bold font-poppins text-[40px] md:text-[65px] xl:text-[65px] text-yellow-500">Beautiful <span className="text-[#6a3002]">Beaches</span></h1>
        <p className="text-xl md:text-xl xl:text-xl text-gray-500">Sri Lanka, often referred to as the "Pearl of the Indian Ocean," is home to some of the most stunning beaches in the world. With golden sands, turquoise waters, and a warm tropical climate, the island offers a beach experience like no other. Here are some of the most captivating beaches you can explore</p>
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-5  xl:mt-10">
          {place?.placeData?.itinerary?.categories?.beach.map((beach, index) => (
            <BeachPlaceCard place={beach} key={index} />

          ))}
        </div>
      </div>

      <div className="sm:px-10 md:px-32 lg:px-56 xl:px-50 px-5 mb-20">
        <h1 className="font-bold font-poppins text-[40px] md:text-[65px] xl:text-[65px] text-yellow-500">Historical <span className="text-[#6a3002]">Places</span></h1>
        <p className="text-xl md:text-xl xl:text-xl text-gray-500">Sri Lanka, a land rich in history and culture, is home to a wealth of historical sites that showcase its ancient civilizations, religious heritage, and colonial influences. These sites offer a fascinating glimpse into the island s vibrant past, making it a must-visit destination for history enthusiasts. Here are some of the most iconic historical places in Sri Lanka</p>
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-5  xl:mt-10">
          {place?.placeData?.itinerary?.categories?.historical.map((historical, index) => (
            <BeachPlaceCard place={historical} key={index} />

          ))}
        </div>
      </div>

      

      <div className="sm:px-10 md:px-32 lg:px-56 xl:px-50 px-5 mb-20">
        <h1 className="font-bold font-poppins text-[40px] md:text-[65px] xl:text-[65px] text-yellow-500">Look Our <span className="text-[#6a3002]">Nature</span></h1>
        <p className="text-xl md:text-xl xl:text-xl text-gray-500">Sri Lanka, known as the "Emerald Isle," is a treasure trove of natural beauty. From lush rainforests and misty mountains to pristine beaches and wildlife-rich parks, the island offers an unparalleled experience for nature lovers. Here are some of the most stunning natural attractions in Sri Lanka</p>
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-5  xl:mt-10">
          {place?.placeData?.itinerary?.categories?.nature.map((historical, index) => (
            <BeachPlaceCard place={historical} key={index} />

          ))}
        </div>
      </div>

      <div className="sm:px-10 md:px-32 lg:px-56 xl:px-50 px-5 mb-20">
        <h1 className="font-bold font-poppins text-[40px] md:text-[65px] xl:text-[65px] text-yellow-500">Old <span className="text-[#6a3002]">Infrastructure</span></h1>
        <p className="text-xl md:text-xl xl:text-xl text-gray-500">Sri Lanka’s old infrastructure reflects its rich history, showcasing the ingenuity of ancient civilizations, colonial influences, and a deep connection to nature. These structures, some of which remain functional, are a testament to the island’s architectural brilliance and engineering skills</p>
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-5  xl:mt-10">
          {place?.placeData?.itinerary?.categories?.infrastructure.map((historical, index) => (
            <BeachPlaceCard place={historical} key={index} />

          ))}
        </div>
      </div>

      <div className="sm:px-10 md:px-32 lg:px-56 xl:px-50 px-5 mb-20">
        <h1 className="font-bold font-poppins text-[40px] md:text-[65px] xl:text-[65px] text-yellow-500">Religious  <span className="text-[#6a3002]">Heritage</span></h1>
        <p className="text-xl md:text-xl xl:text-xl text-gray-500">Sri Lanka, often referred to as the "Land of Serendipity," is a spiritual haven with a rich tapestry of religious traditions. The island is home to a diverse range of sacred sites representing Buddhism, Hinduism, Christianity, and Islam, each showcasing profound devotion, intricate architecture, and centuries-old traditions.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-5  xl:mt-10">
          {place?.placeData?.itinerary?.categories?.religious.map((historical, index) => (
            <BeachPlaceCard place={historical} key={index} />

          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Hero