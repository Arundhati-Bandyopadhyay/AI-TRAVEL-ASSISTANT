import React, { useEffect, useState } from "react";
import { getPlaceDetails } from "../../../Service/GlobalApi";
const PHOTO_REF_URL =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key=" +
  import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function InfoSection({ trip }) {
  const [photoUrls, setPhotoUrls] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    trip && getPlacePhoto();
  }, [trip]);

  const getPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
    };
    try {
      const result = await getPlaceDetails(data);
      const urls = result.data.places[0].photos.map((photo) => {
        return PHOTO_REF_URL.replace("{NAME}", photo.name);
      });
      setPhotoUrls(urls);
      setCurrent(0); // Reset to first photo on new trip
    } catch (error) {
      console.error(error);
    }
  };

  const prevPhoto = () => {
    setCurrent((prev) => (prev === 0 ? photoUrls.length - 1 : prev - 1));
  };

  const nextPhoto = () => {
    setCurrent((prev) => (prev === photoUrls.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full">
      {/* Full-width background for the image slider */}
      <div
        className="w-screen relative left-1/2 right-1/2 -mx-[50vw] flex items-center justify-center py-2 bg-gray-100"
        style={{ minHeight: 400 }}
      >
        {photoUrls.length > 0 && (
          <>
            <button
              onClick={prevPhoto}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black text-white bg-opacity-90 rounded-full p-4 shadow-lg hover:bg-opacity-100 z-10"
              aria-label="Previous photo"
              style={{ fontSize: 36, fontWeight: "bold" }}
            >
              &#8592;
            </button>
            <div className="flex items-center justify-center w-full h-[400px]">
              <div
                className="flex items-center justify-center h-full max-h-[400px] w-full max-w-[900px] mx-auto rounded-xl border-4 border-gray-300 bg-gray-50"
                style={{ aspectRatio: "16/9" }}
              >
                <img
                  src={photoUrls[current]}
                  alt={`Trip photo ${current + 1}`}
                  className="h-full w-full object-contain rounded-xl"
                  style={{ background: "transparent" }}
                />
              </div>
            </div>
            <button
              onClick={nextPhoto}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black text-white bg-opacity-90 rounded-full p-4 shadow-lg hover:bg-opacity-100 z-10"
              aria-label="Next photo"
              style={{ fontSize: 36, fontWeight: "bold" }}
            >
              &#8594;
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
              {photoUrls.map((_, idx) => (
                <span
                  key={idx}
                  className={`w-2 h-2 rounded-full ${
                    idx === current ? "bg-blue-500" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="my-5 flex flex-col gap-2">
        <h2 className="text-2xl font-bold">
          {trip?.userSelection?.location?.label}
        </h2>
        <div className="flex items-center gap-5">
          <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 ">
            📅{trip?.userSelection?.noOfDays} Days
          </h2>
          <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 ">
            💰{trip?.userSelection?.budget}
          </h2>
          <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 ">
            🥂No of Traveler:{trip?.userSelection?.travelers}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default InfoSection;
