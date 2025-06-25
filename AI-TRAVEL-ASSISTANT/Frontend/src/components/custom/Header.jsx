import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { googleLogout } from '@react-oauth/google';
import { useNavigate, Link } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';

function Header() {
  const [openDialog, setOpenDialog] = useState(false);
  const user = JSON.parse(localStorage.getItem('user')) || null;
  const navigation = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      console.log("User data found in localStorage:", JSON.parse(userData));
    }
  }, []);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      GetUserProfile(codeResponse);
    },
    onError: (error) => console.log(error),
  });

  const GetUserProfile = (tokeninfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokeninfo.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokeninfo.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        console.log("USER", response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        setOpenDialog(false);
        // window.location.reload(); // REMOVE THIS LINE
        // Optionally, you can navigate or update state if needed
      });
  };

  return (
    <div className='p-3 shadow-sm flex items-center justify-between px-5'>
      <img src="/logo.svg" alt="Application Logo" />
      <div>
        {user ?
          <div className='flex items-center gap-5'>
            <Link to="/create-trip">
              <Button variant="outline" className="rounded-full">+Create Trip</Button>
            </Link>
            <Link to="/MyTrips">
              <Button variant="outline" className="rounded-full">MyTrips</Button>
            </Link>
            <Popover>
              <PopoverTrigger asChild>
                <img
                  src="/profile.png"
                  alt="User Avatar"
                  className="h-[35px] w-[35px] rounded-full border border-black ml-5 cursor-pointer"
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2
                  className='cursor-pointer'
                  onClick={() => {
                    googleLogout();
                    localStorage.removeItem('user');
                    localStorage.removeItem('tripFormData');
                       localStorage.removeItem('tripPlace');

                    navigation('/');
                  }}
                >
                  LogOut
                </h2>
              </PopoverContent>
            </Popover>
          </div>
          :
          <>
            <Button className='bg-black text-white hover:bg-gray-800' onClick={() => setOpenDialog(true)}>Sign In</Button>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogContent className="max-w-md rounded-xl bg-white text-black">
                <DialogHeader>
                  <DialogTitle></DialogTitle>
                  <img
                    src="/logo.svg"
                    alt="Login"
                    className="w-20 h-20 mx-auto"
                  />
                  <h2 className="font-bold text-2xl mt-7 hover:bg-gray-900 ">
                    Sign in with Google
                  </h2>
                  <DialogDescription>
                    <span>
                      Sign in to the App with Google Authentication securely
                    </span>
                  </DialogDescription>
                  <Button
                    onClick={login}
                    className="bg-black text-white w-full mt-5 hover:bg-gray-500 transition flex items-center justify-center gap-2"
                  >
                    <FcGoogle className="h-7 w-7" />
                    Sign in with Google
                  </Button>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </>
        }
      </div>
    </div>
  )
}

export default Header