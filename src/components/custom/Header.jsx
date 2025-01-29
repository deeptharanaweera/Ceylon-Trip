import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoClose, IoMenu } from "react-icons/io5";

function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [openDialog, setOpenDialog] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    console.log(user);
  });

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  });

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json',
      }
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      window.location.reload();
    });
  };

  return (
    <div className={`fixed top-0 left-0 right-0 z-10 md:flex px-5 ${menuOpen ? 'h-auto' : 'h-auto '} transition-all duration-300 shadow-sm justify-between items-center px-1 py-1 md:px-5 md:py-3 w-full bg-yellow-500`}>
      <div className="w-full flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <a href="/">
            <img src="/Asset 2xxxhdpi.png" alt="" className="w-20" />
          </a>
          <div className="hidden md:flex justify-center items-end gap-2">
            <h2 className="font-bold text-5xl text-white">Ceylon</h2>
            <p className="font-italic font-bold text-4xl text-black">Trip</p>
          </div>
        </div>
        <div className="flex justify-center items-center gap-2">
          <button className="md:hidden text-xl text-black bg-white" onClick={() => setMenuOpen(!menuOpen)}>
            <IoMenu />
          </button>
          {user ? (
            <Popover className="">
              <PopoverTrigger className="bg-transparent rounded-full w-12 h-12 p-0 border-2 border-blue-600 block md:hidden"><img src={user?.picture} alt="" className="rounded-full " /></PopoverTrigger>
              <PopoverContent>
                <div>
                  <h2 className="text-lg font-bold text-black font-poppins">{user?.name}</h2>
                  <p className="text-sm text-gray-500 font-poppins">{user?.email}</p>
                  <button onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }} className="bg-red-600 w-full text-white text-lg font-bold p-2 mt-5 hover:bg-red-700">Log out</button>
                </div>
              </PopoverContent>
            </Popover>

          ) : (
            <div>

            </div>
          )}
        </div>
      </div>

      <div className={` flex-col md:flex md:flex-row md:items-center justify-end md:justify-end  ${menuOpen ? 'flex' : 'hidden'} w-full mt-5 md:mt-0`}>
        {user ? (
          <div className="flex justify-end md:flex-row md:justify-end items-center w-full gap-5">
            {user && window.location.pathname !== "/create-trip" && (
              <a href="/create-trip">
                <button className="bg-[#6a3002] border-none text-white font-bold cursor-pointer hover:bg-[#4f2b0e] w-42">
                  Generate Trip
                </button>
              </a>
            )}
            {user && window.location.pathname !== "/my-trips" && (
              <a href="/my-trips">
                <button className="bg-blue-600 text-white font-bold cursor-pointer hover:bg-blue-700 w-28">My Trips</button>
              </a>
            )}
            <Popover >
              <PopoverTrigger className="bg-transparent rounded-full w-14 h-14 p-0 border-2 border-blue-600 hidden md:block "><img src={user?.picture} alt="" className="rounded-full " /></PopoverTrigger>
              <PopoverContent>
                <div>
                  <h2 className="text-lg font-bold text-black font-poppins">{user?.name}</h2>
                  <p className="text-sm text-gray-500 font-poppins">{user?.email}</p>
                  <button onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }} className="bg-red-600 w-full text-white text-lg font-bold p-2 mt-5 hover:bg-red-700">Log out</button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <button onClick={() => setOpenDialog(true)} className="bg-white text-black font-bold border border-black cursor-pointer hover:bg-black hover:text-white w-28">Login</button>
        )}
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <div>
                <div className="flex justify-end items-center">
                  <button onClick={() => setOpenDialog(false)} className="bg-white cursor-pointer border-none "><IoClose className="text-2xl" /></button>
                </div>
                <img src="/Asset 2xxxhdpi.png" alt="" className="" />
                <h2 className="text-2xl font-semibold text-black mt-7">Sign in with <span className="text-blue-700">G</span><span className="text-red-700">o</span><span className="text-yellow-500">o</span><span className="text-blue-700">g</span><span className="text-green-600">l</span><span className="text-red-700">e</span></h2>
                <p className="text-black">Sign in to the website with Google authentication securely</p>
                <button
                  onClick={login}
                  className='w-full bg-white border-2 border-black font-bold mt-5 flex items-center gap-3 justify-center'
                >
                  <FcGoogle className="w-7 h-7" />
                  Sign In with Google
                </button>
              </div>

            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
