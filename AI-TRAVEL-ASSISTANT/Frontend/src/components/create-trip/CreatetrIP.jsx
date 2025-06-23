import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore"; 
import { db } from "@/Service/firebase.config";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelLesList,
} from "../Constants/Options";
import { Button } from "@/components/ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { FaSpinner } from "react-icons/fa"; // Add this import at the top
import { useNavigate } from "react-router-dom";


function CreatetrIP() {
  const navigate=useNavigate();
  const [loading, setLoading] = useState(false);
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({});
  const [modal, setModal] = useState({ open: false, message: "" });
  const [openDialog, setOpenDialog] = useState(false);
  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

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
        OnGenerateTrip();
      });
      
  };
  const OnGenerateTrip = async () => {
    setLoading(true);
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      setLoading(false);
      return;
    }
    if (
      !formData.location ||
      !formData.noOfDays ||
      !formData.budget ||
      !formData.travelers
    ) {
      setModal({ open: true, message: "Please fill all the fields" });
      setLoading(false);
      return;
    } else if (formData.noOfDays > 20) {
      setModal({
        open: true,
        message: "Please select the number of days for the trip less than 20",
      });
      setLoading(false);
      return;
    } else if (formData.noOfDays <=2) {
      setModal({
        open: true,
        message: "Please select the number of days for the trip greater/equal to 2",
      });
      setLoading(false);
      return;
    }

    try {
      const FINAL_PROMPT = AI_PROMPT.replace(
        "{location}",
        formData?.location.label
      )
        .replace("{noOfDays}", formData?.noOfDays)
        .replace("{budget}", formData?.budget)
        .replace("{travelers}", formData.travelers);

      console.log("Final Prompt:", FINAL_PROMPT);

      const response = await fetch("https://ai-travel-assistant-55dp.onrender.com/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: FINAL_PROMPT }),
      });
      const data = await response.json();
      console.log("Response:", data);
      SaveAiTrip(data);

      if (data.result) {
        console.log("AI Response:", data.result);
        // setModal({ open: true, message: data.result });
      }
    } catch (error) {
      setModal({
        open: true,
        message: `Failed to get AI response: ${error.message}`,
      });
    }
  };
  const SaveAiTrip= async (TripData) => {
    setLoading(true);
 const user = JSON.parse(localStorage.getItem("user"));   
 const docId=Date.now().toString();
await setDoc(doc(db, "AITrips", docId), {
  userSelection:formData,
  tripData: TripData,
  userEmail: user?.email,
  id: docId,
});
setLoading(false);
navigate('/view-trip/'+docId);
  }

  return (
    <div className="relative">
      {/* Modal */}
      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"></div>
          <div className="relative bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full flex flex-col items-center z-10">
            <p className="text-lg text-center mb-6">{modal.message}</p>
            <Button
              onClick={() => setModal({ open: false, message: "" })}
              className="bg-black text-white px-6 py-2 rounded-lg"
            >
              Close
            </Button>
          </div>
        </div>
      )}

      <div className="mx-auto mt-10 max-w-5xl px-4 sm:px-10 md:px-16 lg:px-32">
        <h2 className="font-bold text-3xl">
          Tell us your travel preferences 🏕️🏖️
        </h2>
        <p className="mt-3 text-xl text-gray-500">
          Just provide some basic information about your tour and our trip
          planner will generate a customized itinerary based on your
          preferences.
        </p>

        <div>
          <div className="mt-20 flex flex-col gap-10">
            <h2 className="font-medium text-xl">
              What is your destination of choice?
            </h2>
            <GooglePlacesAutocomplete
              className="mt-2"
              apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
              selectProps={{
                place,
                onChange: (value) => {
                  setPlace(value);
                  handleChange("location", value);
                },
              }}
            />

            <div>
              <h2 className="font-medium text-xl my-3">
                How many days are you planning your trip?
              </h2>
              <Input
                className="my-5"
                placeholder={"Ex.3"}
                type="number"
                onChange={(e) => handleChange("noOfDays", e.target.value)}
              />
            </div>
          </div>
          <div>
            <h2 className="font-medium text-xl my-5">What is your budget?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5">
              {SelectBudgetOptions.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleChange("budget", item.title)}
                  className={`p-4 border border-gray-500 rounded-lg hover:shadow-xl cursor-pointer 
                  ${
                    formData.budget === item.title
                      ? "bg-blue-200 border-black"
                      : ""
                  }`}
                >
                  <h2 className="text-4xl">{item.icon}</h2>
                  <h2 className="font-bold text-l">{item.title}</h2>
                  {formData.budget === item.title && (
                    <h2 className="text-gray-500">{item.desc}</h2>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-medium text-xl my-3">
              Who do you want to travel with?
            </h2>
            <div className="grid grid-cols-3 gap-5 mt-5">
              {SelectTravelLesList.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleChange("travelers", item.people)}
                  className={`p-4 border border-gray-500 rounded-lg hover:shadow-xl cursor-pointer 
                  ${
                    formData.travelers === item.people
                      ? "bg-blue-200 border-black"
                      : ""
                  }`}
                >
                  <h2 className="text-4xl">{item.icon}</h2>
                  <h2 className="font-bold text-l">{item.title}</h2>
                  {/* Show desc only if selected */}
                  {formData.travelers === item.people && (
                    <h2 className="text-gray-500">{item.desc}</h2>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            onClick={OnGenerateTrip}
            className="my-10 bg-black text-white px-8 py-3 rounded-lg shadow-lg hover:bg-gray-900 transition flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Loading...
              </>
            ) : (
              "Generate Trip"
            )}
          </Button>

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
                  className="bg-black text-white w-full mt-5 hover:bg-gray-500 transition"
                >
                  <FcGoogle className="h-7 w-7" />
                  Sign in with Google
                </Button>
              </DialogHeader>
              {/* <Button onClick={() => setOpenDialog(false)} className="mt-4 bg-black text-white">
                Close
              </Button> */}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default CreatetrIP;
