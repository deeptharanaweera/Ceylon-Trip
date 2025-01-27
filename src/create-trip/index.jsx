import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader
} from "@/components/ui/dialog";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelList } from "@/constants/options";
import { chatSession } from "@/service/AIModal";
import { db } from "@/service/firebaseConfig";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";


function CreateTrip() {
  const [errorMessageDays, setErrorMessageDays] = useState('');
  const [errorMessageLocation, setErrorMessageLocation] = useState('');
  const [errorMessageBudget, setErrorMessageBudget] = useState('');
  const [errorMessageTraveler, setErrorMessageTraveler] = useState('');

  const [formData, setFormData] = useState([]);
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    })
  }

  // Validate noOfDays
  useEffect(() => {
    if (formData?.noOfDays > 5) {
      setErrorMessageDays("You can't select more than 5 days");
    } else if (formData?.noOfDays < 1) {
      setErrorMessageDays("You can't select less than 1 days");
    }
    else if (formData.noOfDays === "") {
      setErrorMessageDays("Please select the number of days");
    } else {
      setErrorMessageDays(""); // Clear the error message if valid
    }
  }, [formData?.noOfDays]);

  // Validate Location
  useEffect(() => {
    if (formData.Location === "") {
      setErrorMessageLocation("Please select a destination");
    } else {
      setErrorMessageLocation(""); // Clear the error message if valid
    }
  }, [formData?.Location]);

  // Validate budget
  useEffect(() => {
    if (formData.budget === "") {
      setErrorMessageBudget("Please select your budget");
    } else {
      setErrorMessageBudget(""); // Clear the error message if valid
    }
  }, [formData?.budget]);

  // Validate traveler
  useEffect(() => {
    if (formData.traveler === "") {
      setErrorMessageTraveler("Please select your travel team");
    } else {
      setErrorMessageTraveler(""); // Clear the error message if valid
    }
  }, [formData?.traveler]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  })


  const OnGenerateTrip = async () => {
    const user = localStorage.getItem('user');

    if (!user) {
      setOpenDialog(true);
      return;
    }
    let hasError = false;

    // Validate number of days
    if (!formData?.noOfDays || formData.noOfDays === "") {
      setErrorMessageDays("Please select the number of days");
      hasError = true;
    } else if (formData.noOfDays > 5) {
      setErrorMessageDays("You can't select more than 5 days");
      hasError = true;
    } else {
      setErrorMessageDays(""); // Clear the error message for days
    }

    // Validate location
    if (!formData?.Location || formData.Location === "") {
      setErrorMessageLocation("Please select a destination");
      hasError = true;
    } else {
      setErrorMessageLocation(""); // Clear the error message for location
    }

    // Validate budget
    if (!formData?.budget || formData.budget === "") {
      setErrorMessageBudget("Please select your Budget");
      hasError = true;
    } else {
      setErrorMessageBudget(""); // Clear the error message for location
    }

    // Validate traveler
    if (!formData?.traveler || formData.traveler === "") {
      setErrorMessageTraveler("Please select your travel team");
      hasError = true;
    } else {
      setErrorMessageTraveler(""); // Clear the error message for location
    }

    if (!hasError) {
      setLoading(true);
      const FINAL_PROMPT = AI_PROMPT
        .replace('{location}', formData?.Location?.label)
        .replace('{totalDays}', formData?.noOfDays)
        .replace('{traveler}', formData?.traveler)
        .replace('{budget}', formData?.budget)
        .replace('{totalDays}', formData?.noOfDays)


      const result = await chatSession.sendMessage(FINAL_PROMPT);
      setLoading(false);
      SaveAiTrip(result?.response?.text())
      // Proceed with generating the trip
    }
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString();
    const currentDate = new Date().toISOString();
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
      createdAt: currentDate,
    });
    navigate('/view-trip/' + docId)
    setLoading(false);
  }

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json',
      }
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      OnGenerateTrip();
    })
  }
  const [place, setPlace] = useState('');

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-50 px-5  mt-[70px] md:mt-[150px]'>
      <h1 className="font-poppins font-bold text-[#853b01] mb-5">Plan Your Perfect Trip with Ease 🌴🏖️</h1>
      <h2 className="font-sans font-bold text-4xl">Tell us a bit about your travel preferences</h2>
      <p className="font-poppins text-l text-gray-500">Our AI will create a personalized trip plan just for you. It’s quick, easy, and tailored to your unique needs!</p>

      <div className="flex flex-col mt-10 md:mt-20 md:gap-10 gap-6">
        <div className="flex flex-col">
          <label htmlFor="" className="text-xl font-semibold font-poppins mb-2">What is your destination? </label>
          <GooglePlacesAutocomplete
            className=''
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => { setPlace(v); handleInputChange('Location', v) },
            }}
          />
          {/* <input
            placeholder="Enter the location"
            onChange={(e) => handleInputChange('Location', e.target.value)}
            className="border border-[#853b01] rounded-md px-4 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#853b01] focus:border-transparent"
          /> */}
          {errorMessageLocation && <p style={{ color: 'red', marginTop: '4px' }}>{errorMessageLocation}</p>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="text-xl font-semibold font-poppins mb-2">How many days are you planning your trip ?  </label>
          <input
            placeholder="Ex. 5"
            type="number"
            className="border border-[#853b01] rounded-md px-4 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#853b01] focus:border-transparent"
            onChange={(e) => handleInputChange('noOfDays', e.target.value)}
          />
          {errorMessageDays && <p style={{ color: 'red', marginTop: '4px' }}>{errorMessageDays}</p>}
        </div>
        <div>
          <h1 htmlFor="" className="text-xl font-semibold font-poppins mb-2">Choose your budget? </h1>
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:mt-5 ">
            {SelectBudgetOptions.map((item, index) => (
              <div key={index}
                onClick={() => handleInputChange('budget', item.title)}
                className={` justify-start items-center gap-2 p-5 border border-[#853b01] rounded-lg cursor-pointer hover:shadow-lg ${formData?.budget == item.title && 'bg-[#713c14f6] text-white border-2 border-[#853b01]'}`}>
                {/* <img src={item.icon} className="w-20" /> */}
                <div className="flex gap-2">
                  <p className="md:text-xl font-bold">{item.title}</p>
                  <p>{item.icon}</p>
                </div>
                <p className={`text-gray-500 text-sm md:text-lg ${formData?.budget == item.title && 'text-white'}`}>{item.description}</p>
              </div>
            ))}
          </div>
          {errorMessageBudget && <p style={{ color: 'red', marginTop: '4px' }}>{errorMessageBudget}</p>}
        </div>

        <div>
          <h1 htmlFor="" className="text-xl font-semibold font-poppins mb-2">How many people travel with you ? </h1>
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5 md:mt-5">
            {SelectTravelList.map((item, index) => (
              <div key={index}
                onClick={() => handleInputChange('traveler', item.people)}
                className={`p-5 border rounded-lg cursor-pointer border-[#853b01] hover:shadow-lg ${formData?.traveler == item.people && ' bg-[#713c14f6] text-white border-2 border-[#853b01]'}`}>
                <div className="flex flex-col justify-center items-center w-full">
                  <img src={item.icon} className="w-20" />
                  <p className="md:text-xl font-bold">{item.title}</p>
                <p className={`text-gray-500 text-sm md:text-lg ${formData?.traveler == item.people && 'text-white'}`}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          {errorMessageTraveler && <p style={{ color: 'red', marginTop: '4px' }}>{errorMessageTraveler}</p>}
        </div>

        <div className="flex justify-end mt-5 mb-10">
          <button disabled={loading} onClick={OnGenerateTrip} className="text-white text-xl flex items-center gap-3 justify-center">{loading ? <> Generating <AiOutlineLoading3Quarters className="w-7 h-7 animate-spin" /></> : "Generate Trip"}</button>
        </div>
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="flag.png" alt="" className="w-20" />
              <h2 className="text-2xl font-semibold text-black mt-7">Sign in with <span className="text-blue-700">G</span><span className="text-red-700">o</span><span className="text-yellow-500">o</span><span className="text-blue-700">g</span><span className="text-green-600">l</span><span className="text-red-700">e</span></h2>
              <p className="text-black">Sign in to the website with Google authentication securely</p>
              <button
                onClick={login}
                className='w-full border-2 font-bold mt-5 flex items-center gap-3 justify-center'
              >
                <FcGoogle className="w-7 h-7" />
                Sign In with Google
              </button>

            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>


    </div>
  )
}

export default CreateTrip

